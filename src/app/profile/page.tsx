"use client";

import { useEffect, useMemo, useState } from 'react'
import { ExternalLink, Wallet, Check, AlertCircle, Edit3, Globe, Twitter } from 'lucide-react'
import { useQuery, useMutation } from 'convex/react'
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

function slugifyHandle(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '')
    .slice(0, 20)
}

export default function Profile() {
  const { connected, walletAddress, walletLabel, rpcEndpoint, rpcProvider, network } = useSolanaWallet()
  const [transactions, setTransactions] = useState<WalletTransaction[]>([])
  const [loadingTxs, setLoadingTxs] = useState(false)
  const [txsError, setTxsError] = useState<string | null>(null)
  
  // Profile edit states
  const [handle, setHandle] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [website, setWebsite] = useState('')
  const [twitter, setTwitter] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // Convex Queries
  const purchases = useQuery(
    api.skills.getPurchasesByBuyer,
    connected && walletAddress ? { buyerWallet: walletAddress } : 'skip'
  )
  const profile = useQuery(
    api.skills.getProfile,
    connected && walletAddress ? { walletAddress } : 'skip'
  )

  // Handlers for profile saving
  const upsertProfile = useMutation(api.skills.upsertProfile)

  // Fetch target handle if user inputs one, to reactively check for duplicates
  const cleanInputHandle = slugifyHandle(handle)
  const handleQueryProfile = useQuery(
    api.skills.getProfileByHandle,
    cleanInputHandle ? { handle: cleanInputHandle } : 'skip'
  )

  const isHandleTaken = useMemo(() => {
    if (!handleQueryProfile) return false
    return handleQueryProfile.walletAddress !== walletAddress
  }, [handleQueryProfile, walletAddress])

  // Sync state when profile is loaded from DB
  useEffect(() => {
    if (profile === undefined) {
      return // Still loading
    }
    if (profile) {
      setHandle(profile.handle || '')
      setDisplayName(profile.displayName || '')
      setBio(profile.bio || '')
      setWebsite(profile.website || '')
      setTwitter(profile.twitter || '')
      setIsEditing(false)
    } else {
      setIsEditing(true) // Default to edit mode if no profile exists
    }
  }, [profile])

  const explorerItems = useMemo(
    () => transactions.map((tx) => ({
      ...tx,
      url: getExplorerTransactionUrl(tx.signature, network),
    })),
    [transactions, network]
  )

  // Load Transactions
  useEffect(() => {
    if (!connected || !walletAddress) {
      setTransactions([])
      setTxsError(null)
      return
    }

    const controller = new AbortController()
    let mounted = true

    const loadTransactions = async () => {
      setLoadingTxs(true)
      setTxsError(null)
      try {
        const recentTransactions = await getRecentWalletTransactions({
          endpoint: rpcEndpoint,
          walletAddress,
          limit: 6,
          signal: controller.signal,
        })
        if (mounted) setTransactions(recentTransactions)
      } catch (fetchError) {
        if (fetchError instanceof DOMException && fetchError.name === 'AbortError') return
        console.error('Failed to load recent wallet transactions', fetchError)
        if (mounted) {
          setTxsError(fetchError instanceof Error ? fetchError.message : 'Failed to load wallet transactions.')
          setTransactions([])
        }
      } finally {
        if (mounted) setLoadingTxs(false)
      }
    }

    void loadTransactions()
    return () => { mounted = false; controller.abort() }
  }, [connected, walletAddress, rpcEndpoint])

  // Save profile handler
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!connected || !walletAddress) return

    const cleanHandleStr = slugifyHandle(handle)
    if (!cleanHandleStr) {
      setSubmitError('Please choose a valid developer handle.')
      return
    }

    if (isHandleTaken) {
      setSubmitError('This handle is already taken by another wallet.')
      return
    }

    setIsSaving(true)
    setSubmitError(null)
    setSubmitSuccess(null)

    try {
      await upsertProfile({
        walletAddress,
        handle: cleanHandleStr,
        displayName: displayName.trim() || undefined,
        bio: bio.trim() || undefined,
        website: website.trim() || undefined,
        twitter: twitter.trim() || undefined,
      })
      setSubmitSuccess('Profile updated successfully!')
      setIsEditing(false)
      window.setTimeout(() => setSubmitSuccess(null), 2500)
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to update profile.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="profile-page" style={{ background: 'transparent' }}>
      <div className="container">
        <section className="profile-shell">
          {!connected || !walletAddress ? (
            <section className="profile-connect-card">
              <Wallet size={18} />
              <h2>Connect your wallet</h2>
              <p>
                Please connect your wallet using the top-right button to view your developer profile and activity stream.
              </p>
            </section>
          ) : (
            <div style={{ display: 'grid', gap: '56px' }}>
              
              {/* Profile Identity & Details Section */}
              <div className="profile-main-grid">
                
                {/* Left Column: Elegant Profile View / Edit */}
                <div>
                  {!isEditing && profile ? (
                    <div style={{ display: 'grid', gap: '24px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                          <h1 style={{ fontSize: '2.2rem', fontWeight: 600, margin: 0, color: 'var(--color-text-primary)' }}>
                            {profile.displayName || walletLabel}
                          </h1>
                          {profile.handle && (
                            <span style={{
                              fontFamily: 'var(--font-mono), monospace',
                              color: 'var(--color-accent-warm-light)',
                              fontSize: '1.05rem',
                              fontWeight: 500
                            }}>
                              @{profile.handle}
                            </span>
                          )}
                        </div>
                        <p style={{
                          fontFamily: 'var(--font-mono), monospace',
                          fontSize: '0.74rem',
                          color: 'var(--color-text-tertiary)',
                          marginTop: '6px',
                          marginBottom: 0
                        }}>
                          Wallet: {formatAddress(walletAddress)}
                        </p>
                      </div>

                      {profile.bio ? (
                        <p style={{
                          fontSize: '0.98rem',
                          lineHeight: '1.65',
                          color: 'var(--color-text-secondary)',
                          margin: 0,
                          maxWidth: '560px'
                        }}>
                          {profile.bio}
                        </p>
                      ) : (
                        <p style={{ fontSize: '0.86rem', color: 'var(--color-text-tertiary)', fontStyle: 'italic', margin: 0 }}>
                          No bio provided yet. Click edit to describe your focus area.
                        </p>
                      )}

                      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                        {profile.website && (
                          <a
                            href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
                            target="_blank"
                            rel="noreferrer"
                            className="profile-social-link"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontSize: '0.78rem',
                              color: 'var(--color-text-tertiary)',
                              textDecoration: 'none'
                            }}
                          >
                            <Globe size={13} /> {profile.website.replace(/^https?:\/\/(www\.)?/, '')}
                          </a>
                        )}
                        {profile.twitter && (
                          <a
                            href={`https://twitter.com/${profile.twitter.replace(/^@/, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="profile-social-link"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontSize: '0.78rem',
                              color: 'var(--color-text-tertiary)',
                              textDecoration: 'none'
                            }}
                          >
                            <Twitter size={13} /> @{profile.twitter.replace(/^@/, '')}
                          </a>
                        )}
                        
                        <button
                          type="button"
                          onClick={() => setIsEditing(true)}
                          className="btn btn-outline btn-sm"
                          style={{
                            marginLeft: 'auto',
                            padding: '6px 12px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <Edit3 size={12} /> Edit Profile
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Inline editable form */
                    <form onSubmit={handleSaveProfile} className="profile-edit-form">
                      <div>
                        <h2 style={{ fontSize: '1.15rem', fontWeight: 600, margin: 0 }}>Configure Developer Handle</h2>
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)', margin: '4px 0 0' }}>
                          Claim an identity handle to create configurations and share command packs.
                        </p>
                      </div>

                      {/* Handle Field */}
                      <div style={{ display: 'grid', gap: '6px' }}>
                        <label htmlFor="pf-handle" style={{ fontSize: '0.64rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-tertiary)' }}>
                          Handle (Username)
                        </label>
                        <div style={{ position: 'relative' }}>
                          <span style={{
                            position: 'absolute',
                            left: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--color-text-tertiary)',
                            fontSize: '0.86rem'
                          }}>@</span>
                          <input
                            id="pf-handle"
                            type="text"
                            value={handle}
                            onChange={(e) => setHandle(slugifyHandle(e.target.value))}
                            placeholder="handle"
                            maxLength={20}
                            style={{
                              width: '100%',
                              background: 'rgba(0, 0, 0, 0.2)',
                              border: isHandleTaken 
                                ? '1px solid rgba(255, 100, 100, 0.3)' 
                                : '1px solid rgba(255, 196, 129, 0.12)',
                              color: 'var(--color-text-primary)',
                              borderRadius: '8px',
                              padding: '10px 14px 10px 28px',
                              fontSize: '0.88rem',
                              fontFamily: 'var(--font-mono), monospace'
                            }}
                          />
                        </div>
                        {cleanInputHandle && isHandleTaken && (
                          <span style={{ fontSize: '0.74rem', color: '#ff8888', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <AlertCircle size={12} /> This handle is already taken.
                          </span>
                        )}
                        {cleanInputHandle && !isHandleTaken && (
                          <span style={{ fontSize: '0.74rem', color: 'var(--color-accent-warm-light)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Check size={12} /> Handle is available!
                          </span>
                        )}
                      </div>

                      {/* Display Name Field */}
                      <div style={{ display: 'grid', gap: '6px' }}>
                        <label htmlFor="pf-name" style={{ fontSize: '0.64rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-tertiary)' }}>
                          Display Name
                        </label>
                        <input
                          id="pf-name"
                          type="text"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          placeholder="e.g. Satoshi Nakamoto"
                          style={{
                            background: 'rgba(0, 0, 0, 0.2)',
                            border: '1px solid rgba(255, 196, 129, 0.12)',
                            color: 'var(--color-text-primary)',
                            borderRadius: '8px',
                            padding: '10px 14px',
                            fontSize: '0.88rem'
                          }}
                        />
                      </div>

                      {/* Bio Field */}
                      <div style={{ display: 'grid', gap: '6px' }}>
                        <label htmlFor="pf-bio" style={{ fontSize: '0.64rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-tertiary)' }}>
                          Bio / Focus
                        </label>
                        <textarea
                          id="pf-bio"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          placeholder="Describe your development focus..."
                          rows={3}
                          style={{
                            background: 'rgba(0, 0, 0, 0.2)',
                            border: '1px solid rgba(255, 196, 129, 0.12)',
                            color: 'var(--color-text-primary)',
                            borderRadius: '8px',
                            padding: '10px 14px',
                            fontSize: '0.88rem',
                            resize: 'none',
                            lineHeight: '1.5'
                          }}
                        />
                      </div>

                      {/* Social Grid */}
                      <div className="profile-social-grid">
                        <div style={{ display: 'grid', gap: '6px' }}>
                          <label htmlFor="pf-web" style={{ fontSize: '0.64rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-tertiary)' }}>
                            Website
                          </label>
                          <input
                            id="pf-web"
                            type="text"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            placeholder="github.com/me"
                            style={{
                              background: 'rgba(0, 0, 0, 0.2)',
                              border: '1px solid rgba(255, 196, 129, 0.12)',
                              color: 'var(--color-text-primary)',
                              borderRadius: '8px',
                              padding: '10px 14px',
                              fontSize: '0.84rem'
                            }}
                          />
                        </div>
                        <div style={{ display: 'grid', gap: '6px' }}>
                          <label htmlFor="pf-twitter" style={{ fontSize: '0.64rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-tertiary)' }}>
                            Twitter / X
                          </label>
                          <input
                            id="pf-twitter"
                            type="text"
                            value={twitter}
                            onChange={(e) => setTwitter(e.target.value)}
                            placeholder="@handle"
                            style={{
                              background: 'rgba(0, 0, 0, 0.2)',
                              border: '1px solid rgba(255, 196, 129, 0.12)',
                              color: 'var(--color-text-primary)',
                              borderRadius: '8px',
                              padding: '10px 14px',
                              fontSize: '0.84rem'
                            }}
                          />
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '8px' }}>
                        <button
                          type="submit"
                          className="btn btn-primary btn-sm"
                          disabled={isSaving || isHandleTaken}
                        >
                          {isSaving ? 'Saving...' : 'Save Profile'}
                        </button>
                        {profile && (
                          <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="btn btn-outline btn-sm"
                          >
                            Cancel
                          </button>
                        )}
                      </div>

                      {submitError && (
                        <p style={{ fontSize: '0.8rem', color: '#ff8888', margin: 0 }}>
                          {submitError}
                        </p>
                      )}
                      {submitSuccess && (
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-accent-warm-light)', margin: 0 }}>
                          {submitSuccess}
                        </p>
                      )}
                    </form>
                  )}
                </div>

                {/* Right Column: Connection Stats HUD */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.005)',
                  border: '1px solid rgba(255, 196, 129, 0.05)',
                  borderRadius: '16px',
                  padding: '24px',
                  display: 'grid',
                  gap: '16px'
                }}>
                  <span style={{ fontSize: '0.64rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-text-tertiary)' }}>
                    Connection Metadata
                  </span>

                  <div style={{ display: 'grid', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                      <span style={{ color: 'var(--color-text-tertiary)' }}>Cluster Network</span>
                      <span style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>{network}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                      <span style={{ color: 'var(--color-text-tertiary)' }}>RPC Provider</span>
                      <span style={{ color: 'var(--color-text-primary)' }}>{rpcProvider}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                      <span style={{ color: 'var(--color-text-tertiary)' }}>Explorer URL</span>
                      <a
                        href={getExplorerAddressUrl(walletAddress, network)}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: 'var(--color-accent-warm-light)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        SolanaFM <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>
                </div>

              </div>

              {/* Lower Section: Spacious Stream Cards */}
              <section className="profile-stream" style={{ borderTop: '1px solid rgba(255, 196, 129, 0.12)', paddingTop: '40px' }}>
                
                {/* Download Receipts */}
                <article className="profile-stream-block">
                  <div className="profile-transactions-head">
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Download Receipts</h2>
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
                          <p style={{ margin: '4px 0', fontSize: '0.94rem' }}><strong>{purchase.skillName}</strong></p>
                          <p className="profile-signature" style={{ color: 'var(--color-text-tertiary)', fontSize: '0.66rem' }}>
                            {purchase.txSignature}
                          </p>
                          <div className="profile-transaction-meta" style={{ marginTop: '4px' }}>
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
                            <span>{purchase.purchasedAt ? new Date(purchase.purchasedAt).toLocaleDateString() : '—'}</span>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </article>

                {/* Wallet Activity */}
                <article className="profile-stream-block">
                  <div className="profile-transactions-head">
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Wallet Activity</h2>
                    {loadingTxs && <span className="profile-loading">Loading...</span>}
                  </div>

                  {txsError && <p className="profile-error">{txsError}</p>}
                  {!loadingTxs && !txsError && explorerItems.length === 0 && (
                    <p className="profile-empty-list">No recent transactions found on {network}.</p>
                  )}

                  <div className="profile-chain-list">
                    {explorerItems.map((tx) => (
                      <article key={tx.signature} className="profile-chain-item">
                        <div className="profile-chain-top">
                          <span className={`profile-status profile-status--${tx.status}`}>{tx.status}</span>
                          <span className="profile-chain-time">{formatTimestamp(tx.timestamp)}</span>
                        </div>
                        <div className="profile-chain-signature-wrap" style={{ margin: '4px 0' }}>
                          <p className="profile-chain-signature" style={{ color: 'var(--color-text-tertiary)', fontSize: '0.66rem', margin: 0 }}>
                            {tx.signature.slice(0, 32)}...
                          </p>
                          <a href={tx.url} target="_blank" rel="noreferrer" className="profile-explorer-link">
                            SolanaFM <ExternalLink size={11} />
                          </a>
                        </div>
                        <div className="profile-chain-meta">
                          <span>Slot {tx.slot}</span>
                          <span style={{ fontWeight: 500, color: tx.balanceDeltaSol && tx.balanceDeltaSol < 0 ? '#ff8888' : 'var(--color-accent-warm-light)' }}>
                            {formatDelta(tx.balanceDeltaSol)}
                          </span>
                        </div>
                      </article>
                    ))}
                  </div>
                </article>

              </section>

            </div>
          )}
        </section>
      </div>
    </div>
  )
}
