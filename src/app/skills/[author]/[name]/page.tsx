"use client";

import { FormEvent, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Bookmark, BookmarkCheck, BookOpen, Check, Download, ExternalLink, ShoppingCart, TrendingUp, Zap } from 'lucide-react'
import { useMutation, useQuery } from 'convex/react'
import { getSkillByAuthorSlug, type SkillListing } from '@/lib/skills-data'
import { useSolanaWallet } from '@/contexts/SolanaWalletContext'
import { getExplorerTransactionUrl } from '@/lib/solanaRpc'
import { usePurchaseSkill } from '@/hooks/usePurchaseSkill'
import { api } from '../../../../../convex/_generated/api'

type Tab = 'overview' | 'preview' | 'readme' | 'when-to-use' | 'edit'
type SkillCategory = 'skill' | 'strategy' | 'blueprint'

interface EditableSkill {
  id: string
  author: string
  slug: string
  name: string
  tagline: string
  description: string
  readme: string
  whenToUse: string
  price: string
  priceUsdc: number
  category: SkillCategory
  tags: string[]
  stars: number
  weeklyInstalls: number
  totalPurchases: number
  featured?: boolean
  createdAt: string
  creatorWallet?: string
  fileUrl?: string
  previewHtml?: string
  overviewHtml?: string
  imageUrl?: string
}

interface EditFormState {
  name: string
  tagline: string
  description: string
  readme: string
  whenToUse: string
  priceUsdc: string
  category: SkillCategory
  tags: string
}

const CATEGORY_ICONS = {
  skill: Zap,
  strategy: TrendingUp,
  blueprint: BookOpen,
}

const DEFAULT_TABS: Array<{ id: Exclude<Tab, 'edit'>; label: string }> = [
  { id: 'overview', label: 'Overview' },
  { id: 'preview', label: 'Preview' },
  { id: 'readme', label: 'README' },
  { id: 'when-to-use', label: 'When to Use' },
]

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="sd-stat">
      <span className="sd-stat-value">{value}</span>
      <span className="sd-stat-label">{label}</span>
    </div>
  )
}

function formatCompact(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`
  }
  return String(value)
}

function getRatingOutOfHundred(stars: number) {
  const bounded = 72 + Math.log10(Math.max(stars, 1)) * 8
  return Math.max(72, Math.min(99, Math.round(bounded)))
}

export default function SkillDetailPage() {
  const params = useParams()
  const author = (params?.author as string) ?? ''
  const name = (params?.name as string) ?? ''
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [isPurchased, setIsPurchased] = useState(false)
  const [purchaseError, setPurchaseError] = useState<string | null>(null)
  const [purchaseProof, setPurchaseProof] = useState<{ txSignature: string; pdaAddress: string } | null>(null)
  const [editForm, setEditForm] = useState<EditFormState>({
    name: '',
    tagline: '',
    description: '',
    readme: '',
    whenToUse: '',
    priceUsdc: '0.00',
    category: 'skill',
    tags: '',
  })
  const [isSaving, setIsSaving] = useState(false)
  const [editError, setEditError] = useState<string | null>(null)
  const [editSuccess, setEditSuccess] = useState<string | null>(null)
  const { connected, walletAddress, network } = useSolanaWallet()
  const { purchaseSkill, isPurchasing } = usePurchaseSkill()
  const publishSkill = useMutation(api.skills.publishSkill)
  const toggleSaved = useMutation(api.skills.toggleSavedSkill)
  const [isSavingBookmark, setIsSavingBookmark] = useState(false)
  const staticSkill = useMemo(
    () => getSkillByAuthorSlug(author, name),
    [author, name]
  )
  const convexSkill = useQuery(api.skills.getSkillByAuthorSlug, { author, slug: name })

  const skill = useMemo<EditableSkill | null>(() => {
    if (convexSkill) {
      return {
        id: convexSkill.skillId,
        author: convexSkill.author,
        slug: convexSkill.slug,
        name: convexSkill.name,
        tagline: convexSkill.tagline,
        description: convexSkill.description,
        readme: convexSkill.readme ?? staticSkill?.readme ?? '',
        whenToUse: convexSkill.whenToUse ?? staticSkill?.whenToUse ?? '',
        price: convexSkill.price,
        priceUsdc: convexSkill.priceUsdc,
        category: convexSkill.category as SkillCategory,
        tags: convexSkill.tags,
        stars: convexSkill.stars ?? staticSkill?.stars ?? 0,
        weeklyInstalls: convexSkill.weeklyInstalls ?? staticSkill?.weeklyInstalls ?? 0,
        totalPurchases: convexSkill.totalPurchases ?? staticSkill?.totalPurchases ?? 0,
        featured: convexSkill.featured ?? staticSkill?.featured,
        createdAt: convexSkill.createdAt ?? staticSkill?.createdAt ?? '',
        creatorWallet: convexSkill.creatorWallet ?? undefined,
        fileUrl: convexSkill.fileUrl ?? staticSkill?.fileUrl ?? undefined,
        previewHtml: convexSkill.previewHtml ?? staticSkill?.previewHtml ?? undefined,
        overviewHtml: convexSkill.overviewHtml ?? staticSkill?.overviewHtml ?? undefined,
        imageUrl: convexSkill.imageUrl ?? staticSkill?.imageUrl ?? undefined,
      }
    }

    if (!staticSkill) {
      return null
    }

    return {
      ...staticSkill,
      category: staticSkill.category as SkillCategory,
      creatorWallet: staticSkill.creatorWallet,
      fileUrl: staticSkill.fileUrl,
    }
  }, [convexSkill, staticSkill])

  const canEditListing = Boolean(
    connected &&
    walletAddress &&
    skill?.creatorWallet &&
    walletAddress === skill.creatorWallet
  )

  const tabs = useMemo(() => {
    const baseTabs = [...DEFAULT_TABS]
    if (canEditListing) {
      return [...baseTabs, { id: 'edit' as const, label: 'Edit Listing' }]
    }
    return baseTabs
  }, [canEditListing])

  const existingPurchase = useQuery(
    api.skills.checkPurchase,
    connected && walletAddress && skill
      ? { skillId: skill.id, buyerWallet: walletAddress }
      : 'skip'
  )

  const isSaved = useQuery(
    api.skills.isSkillSaved,
    connected && walletAddress && skill
      ? { walletAddress, skillId: skill.id }
      : 'skip'
  )

  const handleToggleSave = async () => {
    if (!connected || !walletAddress || !skill) return
    setIsSavingBookmark(true)
    try {
      await toggleSaved({
        walletAddress,
        skillId: skill.id,
        skillAuthor: skill.author,
        skillSlug: skill.slug,
        skillName: skill.name,
        skillCategory: skill.category,
      })
    } catch (err) {
      console.error('Failed to toggle save:', err)
    } finally {
      setIsSavingBookmark(false)
    }
  }

  useEffect(() => {
    if (!existingPurchase) {
      return
    }

    setIsPurchased(true)
    setPurchaseProof({
      txSignature: existingPurchase.txSignature,
      pdaAddress: existingPurchase.pdaAddress,
    })
  }, [existingPurchase])

  useEffect(() => {
    if (!skill) {
      return
    }
    setEditForm({
      name: skill.name,
      tagline: skill.tagline,
      description: skill.description,
      readme: skill.readme,
      whenToUse: skill.whenToUse,
      priceUsdc: skill.priceUsdc.toFixed(2),
      category: skill.category,
      tags: skill.tags.join(', '),
    })
  }, [skill])

  useEffect(() => {
    if (!canEditListing && activeTab === 'edit') {
      setActiveTab('overview')
    }
  }, [activeTab, canEditListing])

  if (!skill) {
    return (
      <div className="sd-page">
        <div className="container">
          <div className="sd-not-found">
            <h1>Skill not found</h1>
            <p>This skill doesn&apos;t exist or may have been removed.</p>
            <Link href="/skills" className="btn btn-outline btn-sm">
              <ArrowLeft size={14} /> Browse marketplace
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const CategoryIcon = CATEGORY_ICONS[skill.category as keyof typeof CATEGORY_ICONS] ?? Zap
  const canPurchasePaidSkill = skill.priceUsdc === 0 || Boolean(skill.creatorWallet)
  const isFreeSkill = skill.priceUsdc === 0
  const currentVersionUrl = skill.fileUrl ?? 'https://github.com/leverbrain/leverbrain/tree/main/packages/leverbrain'

  const handlePurchase = async () => {
    if (!connected || !skill) return
    if (skill.priceUsdc > 0 && !skill.creatorWallet) {
      setPurchaseError('Creator payout wallet is not configured for this skill yet.')
      return
    }
    try {
      setPurchaseError(null)
      const proof = await purchaseSkill(skill.id, skill.priceUsdc, skill.creatorWallet)
      setPurchaseProof(proof)
      setIsPurchased(true)
    } catch (err: unknown) {
      console.error('Purchase failed:', err)
      setPurchaseError(err instanceof Error ? err.message : 'Purchase failed. Please try again.')
    }
  }

  const handleEditSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!walletAddress || !canEditListing) {
      setEditError('Only the publisher wallet can edit this listing.')
      return
    }

    const parsedPrice = Number(editForm.priceUsdc)
    if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
      setEditError('Price must be a positive number.')
      return
    }

    const tags = editForm.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)

    if (tags.length === 0) {
      setEditError('Add at least one tag.')
      return
    }

    setIsSaving(true)
    setEditError(null)
    setEditSuccess(null)

    try {
      await publishSkill({
        publisherWallet: walletAddress,
        skillId: skill.id,
        author: skill.author,
        slug: skill.slug,
        name: editForm.name,
        tagline: editForm.tagline,
        description: editForm.description,
        readme: editForm.readme || undefined,
        whenToUse: editForm.whenToUse || undefined,
        priceUsdc: parsedPrice,
        category: editForm.category,
        tags,
      })
      setEditSuccess('Listing updated successfully.')
    } catch (error: unknown) {
      setEditError(error instanceof Error ? error.message : 'Failed to save listing changes.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="sd-page">
      <div className="container">

        {/* Back link */}
        <Link href="/skills" className="sd-back animate-fade-in-up">
          <ArrowLeft size={14} /> Marketplace
        </Link>

        {/* Hero header */}
        <div className="sd-hero animate-fade-in-up">
          <div className="sd-hero-meta">
            <span className={`sd-category-pill sd-category-pill--${skill.category}`}>
              <CategoryIcon size={12} />
              {skill.category}
            </span>
            <Link href={`/skills/${skill.author}`} className="sd-author-link">
              @{skill.author}
            </Link>
          </div>
          <h1 className="sd-title">{skill.name}</h1>
          <p className="sd-tagline">{skill.tagline}</p>

          <div className="sd-stats-row">
            <StatBox
              label="downloads"
              value={formatCompact(skill.totalPurchases)}
            />
            <StatBox
              label="rating"
              value={`${getRatingOutOfHundred(skill.stars)}/100`}
            />
          </div>
        </div>

        {/* Main layout: content + sidebar */}
        <div className="sd-layout animate-fade-in-up animate-delay-1">

          {/* Tab content */}
          <div className="sd-content">
            <div className="sd-tabs" role="tablist">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  className={`sd-tab ${activeTab === tab.id ? 'sd-tab--active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="sd-tab-body">
              {activeTab === 'overview' && (
                <div className="sd-overview">
                  {skill.overviewHtml ? (
                    <div className="sd-overview-rich" dangerouslySetInnerHTML={{ __html: skill.overviewHtml }} />
                  ) : (
                    <>
                      <p className="sd-desc">{skill.description}</p>
                      <div className="sd-tags">
                        {skill.tags.map((tag) => (
                          <span key={tag} className="sd-tag">{tag}</span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {activeTab === 'preview' && (
                <div className="sd-preview">
                  {skill.previewHtml ? (
                    <div dangerouslySetInnerHTML={{ __html: skill.previewHtml }} />
                  ) : (
                    <div className="sd-no-preview">
                      <p>No preview available for this skill.</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'readme' && (
                <div className="sd-readme">
                  <pre className="sd-readme-content">{skill.readme}</pre>
                </div>
              )}

              {activeTab === 'when-to-use' && (
                <div className="sd-when">
                  <p>{skill.whenToUse}</p>
                </div>
              )}

              {activeTab === 'edit' && canEditListing && (
                <form className="sd-edit-form" onSubmit={handleEditSubmit}>
                  <label className="form-group">
                    <span className="form-label">Name *</span>
                    <input
                      className="form-input"
                      type="text"
                      value={editForm.name}
                      autoComplete="off"
                      spellCheck={false}
                      onChange={(event) =>
                        setEditForm((current) => ({ ...current, name: event.target.value }))
                      }
                      required
                    />
                  </label>

                  <label className="form-group">
                    <span className="form-label">Tagline *</span>
                    <input
                      className="form-input"
                      type="text"
                      value={editForm.tagline}
                      autoComplete="off"
                      spellCheck={false}
                      onChange={(event) =>
                        setEditForm((current) => ({ ...current, tagline: event.target.value }))
                      }
                      required
                    />
                  </label>

                  <label className="form-group">
                    <span className="form-label">Description *</span>
                    <textarea
                      className="form-textarea"
                      value={editForm.description}
                      spellCheck
                      onChange={(event) =>
                        setEditForm((current) => ({ ...current, description: event.target.value }))
                      }
                      required
                    />
                  </label>

                  <div className="sd-edit-grid">
                    <label className="form-group">
                      <span className="form-label">Category *</span>
                      <select
                        className="form-select"
                        value={editForm.category}
                        onChange={(event) =>
                          setEditForm((current) => ({
                            ...current,
                            category: event.target.value as SkillCategory,
                          }))
                        }
                      >
                        <option value="skill">Skill</option>
                        <option value="strategy">Strategy</option>
                        <option value="blueprint">Blueprint</option>
                      </select>
                    </label>

                    <label className="form-group">
                      <span className="form-label">Price (USDC) *</span>
                      <input
                        className="form-input mono"
                        type="text"
                        inputMode="decimal"
                        value={editForm.priceUsdc}
                        autoComplete="off"
                        spellCheck={false}
                        onChange={(event) =>
                          setEditForm((current) => ({ ...current, priceUsdc: event.target.value }))
                        }
                        required
                      />
                    </label>
                  </div>

                  <label className="form-group">
                    <span className="form-label">Tags (comma separated) *</span>
                    <input
                      className="form-input"
                      type="text"
                      value={editForm.tags}
                      autoComplete="off"
                      spellCheck={false}
                      onChange={(event) =>
                        setEditForm((current) => ({ ...current, tags: event.target.value }))
                      }
                      required
                    />
                  </label>

                  <label className="form-group">
                    <span className="form-label">When to use</span>
                    <textarea
                      className="form-textarea"
                      value={editForm.whenToUse}
                      spellCheck
                      onChange={(event) =>
                        setEditForm((current) => ({ ...current, whenToUse: event.target.value }))
                      }
                    />
                  </label>

                  <label className="form-group">
                    <span className="form-label">README</span>
                    <textarea
                      className="form-textarea sd-edit-readme mono"
                      value={editForm.readme}
                      spellCheck={false}
                      onChange={(event) =>
                        setEditForm((current) => ({ ...current, readme: event.target.value }))
                      }
                    />
                  </label>

                  <div className="sd-edit-actions">
                    <button type="submit" className="btn btn-primary" disabled={isSaving}>
                      {isSaving ? 'Saving…' : 'Save listing'}
                    </button>
                  </div>

                  {editError && <p className="profile-error">{editError}</p>}
                  {editSuccess && <p className="sd-edit-success">{editSuccess}</p>}
                </form>
              )}
            </div>
          </div>

          {/* Sidebar purchase card */}
          <aside className="sd-sidebar">
            <div className="sd-purchase-card">
              <div className="sd-purchase-price">
                {skill.price === 'Free' ? (
                  <span className="sd-price-free">Free</span>
                ) : (
                  <>
                    <span className="sd-price-amount">{skill.price}</span>
                    <span className="sd-price-currency">USDC</span>
                  </>
                )}
              </div>

              {isFreeSkill ? (
                <a
                  href={currentVersionUrl}
                  className="btn btn-outline btn-lg sd-purchase-btn"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink size={16} />
                  Current version
                </a>
              ) : isPurchased ? (
                <a
                  href={`/api/download/${skill.author}/${skill.slug}`}
                  className="btn btn-primary btn-lg sd-purchase-btn"
                  download
                >
                  <Download size={16} />
                  Download Skill
                </a>
              ) : connected ? (
                <button
                  type="button"
                  className="btn btn-red btn-lg sd-purchase-btn"
                  onClick={handlePurchase}
                  disabled={isPurchasing || !canPurchasePaidSkill}
                >
                  {isPurchasing ? (
                    <>Confirming…</>
                  ) : (
                    <>
                      <ShoppingCart size={16} />
                      Get Skill — {skill.price}
                    </>
                  )}
                </button>
              ) : (
                <div className="sd-connect-prompt">
                  <p>Connect your wallet to purchase</p>
                </div>
              )}

              {!isFreeSkill && isPurchased && (
                <div className="sd-purchase-confirmed">
                  <Check size={14} />
                  <span>Download unlocked — receipt on Solana</span>
                  {purchaseProof && purchaseProof.txSignature !== 'free_skill' && (
                    <a
                      href={getExplorerTransactionUrl(purchaseProof.txSignature, network)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View proof <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              )}

              {purchaseError && (
                <p className="profile-error">{purchaseError}</p>
              )}

              {!canPurchasePaidSkill && skill.priceUsdc > 0 && (
                <p className="profile-error">Creator payout wallet is missing for this listing.</p>
              )}

              <div className="sd-creator-info">
                <span className="sd-creator-label">Creator</span>
                <Link href={`/skills/${skill.author}`} className="sd-creator-handle">
                  @{skill.author}
                </Link>
              </div>

              {canEditListing && (
                <button
                  type="button"
                  className="btn btn-outline btn-sm sd-owner-edit-trigger"
                  onClick={() => setActiveTab('edit')}
                >
                  Edit listing
                </button>
              )}

              {connected && (
                <button
                  type="button"
                  className={`btn btn-sm sd-save-btn ${isSaved ? 'sd-save-btn--saved' : ''}`}
                  onClick={handleToggleSave}
                  disabled={isSavingBookmark}
                  aria-label={isSaved ? 'Remove from lab' : 'Add to lab'}
                >
                  {isSaved ? (
                    <><BookmarkCheck size={14} /> Added to lab</>
                  ) : (
                    <><Bookmark size={14} /> Add to lab</>
                  )}
                </button>
              )}
            </div>
          </aside>
        </div>

      </div>
    </div>
  )
}
