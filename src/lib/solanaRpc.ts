import type { SolanaNetwork } from '../config/solana'

interface RpcSuccess<T> {
  jsonrpc: '2.0'
  id: number
  result: T
}

interface RpcFailure {
  jsonrpc: '2.0'
  id: number
  error: {
    code: number
    message: string
  }
}

type RpcResponse<T> = RpcSuccess<T> | RpcFailure

interface SignatureRecord {
  signature: string
  slot: number
  blockTime: number | null
  confirmationStatus: 'processed' | 'confirmed' | 'finalized' | null
  err: unknown
}

interface TransactionMeta {
  preBalances?: number[]
  postBalances?: number[]
}

interface ParsedAccountKey {
  pubkey?: string
}

interface TransactionResult {
  meta?: TransactionMeta | null
  transaction?: {
    message?: {
      accountKeys?: Array<string | ParsedAccountKey>
    }
  }
}

export interface WalletTransaction {
  signature: string
  slot: number
  timestamp: number | null
  status: 'failed' | 'processed' | 'confirmed' | 'finalized'
  balanceDeltaSol: number | null
}

async function rpcRequest<T>(
  endpoint: string,
  method: string,
  params: unknown[],
  signal?: AbortSignal
): Promise<T> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method,
      params,
    }),
    signal,
  })

  if (!response.ok) {
    throw new Error(`RPC request failed (${response.status}) for method ${method}`)
  }

  const payload = await response.json() as RpcResponse<T>
  if ('error' in payload) {
    throw new Error(`RPC error (${payload.error.code}): ${payload.error.message}`)
  }

  return payload.result
}

function keyToAddress(key: string | ParsedAccountKey): string | null {
  if (typeof key === 'string') {
    return key
  }
  return key.pubkey ?? null
}

function parseBalanceDeltaSol(
  tx: TransactionResult,
  walletAddress: string
): number | null {
  const accountKeys = tx.transaction?.message?.accountKeys
  const preBalances = tx.meta?.preBalances
  const postBalances = tx.meta?.postBalances

  if (!accountKeys || !preBalances || !postBalances) {
    return null
  }

  const accountIndex = accountKeys.findIndex((key) => keyToAddress(key) === walletAddress)
  if (accountIndex < 0) {
    return null
  }

  const pre = preBalances[accountIndex]
  const post = postBalances[accountIndex]
  if (typeof pre !== 'number' || typeof post !== 'number') {
    return null
  }

  return (post - pre) / 1_000_000_000
}

export async function getRecentWalletTransactions(args: {
  endpoint: string
  walletAddress: string
  limit?: number
  signal?: AbortSignal
}): Promise<WalletTransaction[]> {
  const { endpoint, walletAddress, signal } = args
  const limit = Math.max(1, Math.min(args.limit ?? 8, 20))

  const signatures = await rpcRequest<SignatureRecord[]>(
    endpoint,
    'getSignaturesForAddress',
    [walletAddress, { limit }],
    signal
  )

  const transactions = await Promise.all(
    signatures.map(async (record) => {
      const tx = await rpcRequest<TransactionResult | null>(
        endpoint,
        'getTransaction',
        [record.signature, { encoding: 'jsonParsed', maxSupportedTransactionVersion: 0 }],
        signal
      )

      const balanceDeltaSol = tx ? parseBalanceDeltaSol(tx, walletAddress) : null

      return {
        signature: record.signature,
        slot: record.slot,
        timestamp: record.blockTime,
        status: record.err
          ? 'failed'
          : (record.confirmationStatus ?? 'confirmed'),
        balanceDeltaSol,
      } satisfies WalletTransaction
    })
  )

  return transactions
}

export function getExplorerTransactionUrl(signature: string, network: SolanaNetwork): string {
  if (network === 'mainnet-beta') {
    return `https://explorer.solana.com/tx/${signature}`
  }
  return `https://explorer.solana.com/tx/${signature}?cluster=${network}`
}

export function getExplorerAddressUrl(address: string, network: SolanaNetwork): string {
  if (network === 'mainnet-beta') {
    return `https://explorer.solana.com/address/${address}`
  }
  return `https://explorer.solana.com/address/${address}?cluster=${network}`
}
