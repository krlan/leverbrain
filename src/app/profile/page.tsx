"use client";

import { useEffect, useMemo, useState } from 'react'
import { ExternalLink, Bookmark, Wallet } from 'lucide-react'
import { useQuery } from 'convex/react'
import { useSolanaWallet } from '@/contexts/SolanaWalletContext'
import { api } from '../../../convex/_generated/api'
import {
  getExplorerAddressUrl,
  getExplorerTransactionUrl,
  getRecentWalletTransactions,
  type WalletTransaction,
} from '@/lib/solanaRpc'

function formatAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-6)}`
}

function getAvatarInitials(address: string) {
  // Derive 2-char initials from the wallet address
  return address.slice(0, 2).toUpperCase()
}

function formatDelta(delta: number | null) {
  if (delta === null) return 'N/A'
  if (delta === 0) return '0 SOL'
  const sign = delta > 0 ? '+' : ''
  return `${sign}${delta.toFixed(4)} SOL`
}

function formatTimestamp(timestamp: number | null) {
  if (!timestamp) return 'Pending'
  return new Date(timestamp * 1000).toLocaleString()
}

export default function Profile() {
  const { connected, walletAddress, walletLabel, rpcEndpoint, rpcProvider, network } = useSolanaWallet()
  const [transactions, setTransactions] = useState<WalletTransaction[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const purchases = useQuery(
    api.skills.getPurchasesByBuyer,
    connected && walletAddress ? { buyerWallet: walletAddress } : 'skip'
  )

  const explorerItems = useMemo(
    () => transactions.map((tx) => ({
      ...tx,
      url: getExplorerTransactionUrl(tx.signature, network),
    })),
    [transactions, network]
  )

  useEffect(() => {
    if (!connected || !walletAddress) {
      setTransactions([])
      setError(null)
      return
    }

    const controller = new AbortController()
    let mounted = true

    const loadTransactions = async () => {
      setLoading(true)
      setError(null)
      try {
        const recentTransactions = await getRecentWalletTransactions({
          endpoint: rpcEndpoint,
          walletAddress,
          limit: 8,
          signal: controller.signal,
        })
        if (mounted) setTransactions(recentTransactions)
      } catch (fetchError) {
        if (fetchError instanceof DOMException && fetchError.name === 'AbortError') return
        console.error('Failed to load recent wallet transactions', fetchError)
        if (mounted) {
          setError(fetchError instanceof Error ? fetchError.message : 'Failed to load wallet transactions.')
          setTransactions([])
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }

    void loadTransactions()
    return () => { mounted = false; controller.abort() }
  }, [connected, walletAddress, rpcEndpoint])

  return (
    <div className="profile-page">
      <div className="container">
        <section className="profile-shell">
          {!connected || !walletAddress ? (
            <section className="profile-connect-card">
              <Wallet size={18} />
              <h2>Connect your wallet</h2>
              <p>
                Use the top-right Connect button to load profile details and transaction history.
              </p>
            </section>
          ) : (
            <section className="profile-surface">
              {/* ── Identity Banner ── */}
              <div className="profile-identity">
                <div className="profile-avatar" aria-hidden="true">
                  {getAvatarInitials(walletAddress)}
                </div>
                <div className="profile-identity-info">
                  <p className="profile-identity-name">{walletLabel}</p>
                  <p className="profile-identity-network">{network}</p>
                  <span className="profile-address-pill">
                    {formatAddress(walletAddress)}
                    <a
                      href={getExplorerAddressUrl(walletAddress, network)}
                      target="_blank"
                      rel="noreferrer"
                      className="profile-explorer-link"
                      aria-label="View on explorer"
                    >
                      <ExternalLink size={11} />
                    </a>
                  </span>
                </div>
              </div>

              {/* ── Stats Row ── */}
              <div className="profile-stats-row">
                <div className="profile-stat-block">
                  <span className="profile-stat-label">Downloads</span>
                  <span className="profile-stat-value">{purchases?.length ?? '—'}</span>
                </div>
                <div className="profile-stat-block">
                  <span className="profile-stat-label">Provider</span>
                  <span className="profile-stat-value">{rpcProvider}</span>
                </div>
                <div className="profile-stat-block">
                  <span className="profile-stat-label">RPC Endpoint</span>
                  <span className="profile-stat-value" title={rpcEndpoint}>
                    {rpcEndpoint.replace('https://', '').split('/')[0]}
                  </span>
                </div>
                <div className="profile-stat-block">
                  <span className="profile-stat-label">Network</span>
                  <span className="profile-stat-value">{network}</span>
                </div>
              </div>

              {/* ── Stream ── */}
              <section className="profile-stream">
                {/* Download Receipts */}
                <article className="profile-stream-block">
                  <div className="profile-transactions-head">
                    <h2>Download receipts</h2>
                  </div>

                  {purchases === undefined ? (
                    <span className="profile-loading">Loading receipts...</span>
                  ) : purchases.length === 0 ? (
                    <p className="profile-empty-list">No recorded downloads for this wallet yet.</p>
                  ) : (
                    <div className="profile-transaction-list">
                      {purchases.map((purchase) => (
                        <article key={purchase._id} className="profile-transaction-card">
                          <div className="profile-transaction-row">
                            <span className="profile-status profile-status--confirmed">confirmed</span>
                            {purchase.txSignature === 'free_skill' ? (
                              <span className="profile-meta-chip">Free</span>
                            ) : (
                              <a
                                href={getExplorerTransactionUrl(purchase.txSignature, network)}
                                target="_blank"
                                rel="noreferrer"
                                className="profile-explorer-link"
                              >
                                Tx <ExternalLink size={11} />
                              </a>
                            )}
                          </div>
                          <p><strong>{purchase.skillName}</strong></p>
                          <p className="profile-signature">{purchase.txSignature}</p>
                          <div className="profile-transaction-meta">
                            <span>{purchase.skillAuthor ? `@${purchase.skillAuthor}` : purchase.skillId}</span>
                            {purchase.pdaAddress !== 'free_skill_pda' && (
                              <a
                                href={getExplorerAddressUrl(purchase.pdaAddress, network)}
                                target="_blank"
                                rel="noreferrer"
                                className="profile-explorer-link"
                              >
                                PDA <ExternalLink size={11} />
                              </a>
                            )}
                            <span>{purchase.purchasedAt ? new Date(purchase.purchasedAt).toLocaleString() : '—'}</span>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </article>

                {/* Wallet Activity */}
                <article className="profile-stream-block">
                  <div className="profile-transactions-head">
                    <h2>Wallet activity</h2>
                    {loading && <span className="profile-loading">Loading...</span>}
                  </div>

                  {error && <p className="profile-error">{error}</p>}
                  {!loading && !error && explorerItems.length === 0 && (
                    <p className="profile-empty-list">No recent transactions found on {network}.</p>
                  )}

                  <div className="profile-chain-list">
                    {explorerItems.map((tx) => (
                      <article key={tx.signature} className="profile-chain-item">
                        <div className="profile-chain-top">
                          <span className={`profile-status profile-status--${tx.status}`}>{tx.status}</span>
                          <span className="profile-chain-time">{formatTimestamp(tx.timestamp)}</span>
                        </div>
                        <div className="profile-chain-signature-wrap">
                          <p className="profile-chain-signature">{tx.signature}</p>
                          <a href={tx.url} target="_blank" rel="noreferrer" className="profile-explorer-link">
                            Explorer <ExternalLink size={11} />
                          </a>
                        </div>
                        <div className="profile-chain-meta">
                          <span>Slot {tx.slot}</span>
                          <span>{formatDelta(tx.balanceDeltaSol)}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                </article>
              </section>
            </section>
          )}
        </section>
      </div>
    </div>
  )
}
