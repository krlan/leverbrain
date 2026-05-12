export type SolanaNetwork = 'devnet' | 'testnet' | 'mainnet-beta'
export type RpcProvider = 'alchemy' | 'custom' | 'public'

export const LEVERBRAIN_PROGRAM_ID = '6EPCjtg65KPyag5UPpjLZgpUS2FBveotqWukULDPoMea'

interface SolanaRuntimeConfig {
  network: SolanaNetwork
  rpcEndpoint: string
  rpcProvider: RpcProvider
  alchemyConfigured: boolean
}

const PUBLIC_ENDPOINTS: Record<SolanaNetwork, string> = {
  devnet: 'https://api.devnet.solana.com',
  testnet: 'https://api.testnet.solana.com',
  'mainnet-beta': 'https://api.mainnet-beta.solana.com',
}

const ALCHEMY_ENDPOINTS: Record<SolanaNetwork, string> = {
  devnet: 'https://solana-devnet.g.alchemy.com/v2',
  testnet: 'https://solana-testnet.g.alchemy.com/v2',
  'mainnet-beta': 'https://solana-mainnet.g.alchemy.com/v2',
}

function normalizeNetwork(rawNetwork: string | undefined): SolanaNetwork {
  if (!rawNetwork) {
    return 'devnet'
  }

  const normalized = rawNetwork.toLowerCase().trim()
  if (normalized === 'mainnet' || normalized === 'mainnet-beta') {
    return 'mainnet-beta'
  }
  if (normalized === 'testnet') {
    return 'testnet'
  }
  return 'devnet'
}

function buildAlchemyEndpoint(network: SolanaNetwork, apiKey: string): string {
  return `${ALCHEMY_ENDPOINTS[network]}/${apiKey}`
}

export function getSolanaRuntimeConfig(): SolanaRuntimeConfig {
  const network = normalizeNetwork(process.env.NEXT_PUBLIC_SOLANA_NETWORK)
  const customRpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_URL?.trim()
  const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY?.trim()

  if (customRpcUrl) {
    return {
      network,
      rpcEndpoint: customRpcUrl,
      rpcProvider: 'custom',
      alchemyConfigured: Boolean(alchemyApiKey),
    }
  }

  if (alchemyApiKey) {
    return {
      network,
      rpcEndpoint: buildAlchemyEndpoint(network, alchemyApiKey),
      rpcProvider: 'alchemy',
      alchemyConfigured: true,
    }
  }

  return {
    network,
    rpcEndpoint: PUBLIC_ENDPOINTS[network],
    rpcProvider: 'public',
    alchemyConfigured: false,
  }
}
