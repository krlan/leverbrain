"use client";

import { FormEvent, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Bookmark, BookmarkCheck, BookOpen, Check, Download, ExternalLink, ShoppingCart, TrendingUp, Zap, Copy, Loader2, ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react'
import { useMutation, useQuery } from 'convex/react'
import { getSkillByAuthorSlug, type SkillListing } from '@/lib/skills-data'
import { useSolanaWallet } from '@/contexts/SolanaWalletContext'
import { getExplorerTransactionUrl } from '@/lib/solanaRpc'
import { usePurchaseSkill } from '@/hooks/usePurchaseSkill'
import { api } from '../../../../../convex/_generated/api'
import { resolveRepoUrl } from '@/lib/github-urls'
import { StatBox } from '@/components/skills/StatBox'
import { InstallCommandBar } from '@/components/skills/InstallCommandBar'
import { ExampleUsageBar } from '@/components/skills/ExampleUsageBar'
import { VisualSpecimen } from '@/components/skills/VisualSpecimen'
import { SourceCodeInspector } from '@/components/skills/SourceCodeInspector'
import { renderMarkdown } from '@/components/skills/MarkdownRenderer'
import { getConversationalOverview } from '@/lib/conversational-metadata'

type Tab = 'details' | 'edit'
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
  screenshots?: {
    title: string
    items: { name: string; url: string }[]
  }[]
  useCases?: string[]
  exampleUsage?: string
  isPrivate?: boolean
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
  isPrivate: boolean
  useCases: string
  fileUrl: string
}

const CATEGORY_ICONS = {
  skill: Zap,
  strategy: TrendingUp,
  blueprint: BookOpen,
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

function PresetGallery({ groups }: { groups: { title: string; items: { name: string; url: string }[] }[] }) {
  const [activeGroupIdx, setActiveGroupIdx] = useState(0)
  const activeGroup = groups[activeGroupIdx]
  const [activeItemIdx, setActiveItemIdx] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredTabIdx, setHoveredTabIdx] = useState<number | null>(null)
  
  // Lightbox and touch gestures states
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Transition states
  const activeItem = activeGroup?.items[activeItemIdx]
  const [displayedUrl, setDisplayedUrl] = useState(activeItem?.url)
  const [fadeState, setFadeState] = useState<'idle' | 'fading-out' | 'fading-in'>('idle')

  useEffect(() => {
    setActiveItemIdx(0)
  }, [activeGroupIdx])

  useEffect(() => {
    if (!activeItem) return
    if (activeItem.url === displayedUrl) return
    setFadeState('fading-out')
    
    let timeoutIn: NodeJS.Timeout
    const timeoutOut = setTimeout(() => {
      setDisplayedUrl(activeItem.url)
      setFadeState('fading-in')
      timeoutIn = setTimeout(() => {
        setFadeState('idle')
      }, 150)
    }, 150)
    
    return () => {
      clearTimeout(timeoutOut)
      if (timeoutIn) clearTimeout(timeoutIn)
    }
  }, [activeItem?.url])

  useEffect(() => {
    if (!isAutoplay || !activeGroup || activeGroup.items.length <= 1) return

    const interval = setInterval(() => {
      setActiveItemIdx((prev) => (prev + 1) % activeGroup.items.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [activeGroup, isAutoplay])

  // Keydown listener for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false)
      } else if (e.key === 'ArrowRight') {
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen, activeGroupIdx, activeItemIdx])

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setIsAutoplay(false)
    if (activeGroup) {
      setActiveItemIdx((prev) => (prev + 1) % activeGroup.items.length)
    }
  }

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setIsAutoplay(false)
    if (activeGroup) {
      setActiveItemIdx((prev) => (prev - 1 + activeGroup.items.length) % activeGroup.items.length)
    }
  }

  const handleSelectTab = (idx: number) => {
    setIsAutoplay(false)
    setActiveGroupIdx(idx)
  }

  // Swipe detection handlers
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe) {
      handleNext()
    } else if (isRightSwipe) {
      handlePrev()
    }
  }

  if (!activeGroup || !activeItem) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      {/* Apple segmented control style tabs */}
      {groups.length > 1 && (
        <div style={{ 
          display: 'inline-flex', 
          background: 'rgba(255, 196, 129, 0.02)', 
          border: '1px solid rgba(255, 196, 129, 0.08)',
          borderRadius: '24px',
          padding: '4px',
          gap: '4px',
          width: 'fit-content',
          backdropFilter: 'blur(8px)',
          alignSelf: 'flex-start'
        }}>
          {groups.map((group, idx) => (
            <button
              key={group.title}
              type="button"
              onClick={() => handleSelectTab(idx)}
              onMouseEnter={() => setHoveredTabIdx(idx)}
              onMouseLeave={() => setHoveredTabIdx(null)}
              style={{
                background: activeGroupIdx === idx ? 'rgba(255, 196, 129, 0.08)' : 'transparent',
                border: 'none',
                color: activeGroupIdx === idx 
                  ? 'var(--color-accent-warm-light)' 
                  : (hoveredTabIdx === idx ? 'var(--color-text-secondary)' : 'var(--color-text-tertiary)'),
                fontWeight: activeGroupIdx === idx ? '600' : '500',
                fontSize: '0.8rem',
                cursor: 'pointer',
                padding: '6px 16px',
                borderRadius: '20px',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                outline: 'none'
              }}
            >
              {group.title}
            </button>
          ))}
        </div>
      )}

      {/* Main Image Box: No border, blends into background */}
      <div
        onClick={() => setIsLightboxOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          borderRadius: '16px',
          cursor: 'zoom-in',
          background: 'rgba(5, 12, 18, 0.1)',
          border: 'none',
          width: '100%',
          height: '480px',
          transition: 'transform 0.3s ease',
          boxShadow: 'none'
        }}
      >
        {/* Navigation Chevrons */}
        <button
          onClick={handlePrev}
          type="button"
          style={{
            position: 'absolute',
            left: '20px',
            zIndex: 20,
            background: 'rgba(5, 12, 18, 0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 196, 129, 0.15)',
            color: 'var(--color-text-secondary)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateX(0)' : 'translateX(-8px)',
            transition: 'opacity 0.25s ease, transform 0.25s ease, background-color 0.2s ease',
            outline: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(5, 12, 18, 0.95)'
            e.currentTarget.style.color = 'var(--color-text-primary)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(5, 12, 18, 0.85)'
            e.currentTarget.style.color = 'var(--color-text-secondary)'
          }}
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={handleNext}
          type="button"
          style={{
            position: 'absolute',
            right: '20px',
            zIndex: 20,
            background: 'rgba(5, 12, 18, 0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 196, 129, 0.15)',
            color: 'var(--color-text-secondary)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateX(0)' : 'translateX(8px)',
            transition: 'opacity 0.25s ease, transform 0.25s ease, background-color 0.2s ease',
            outline: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(5, 12, 18, 0.95)'
            e.currentTarget.style.color = 'var(--color-text-primary)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(5, 12, 18, 0.85)'
            e.currentTarget.style.color = 'var(--color-text-secondary)'
          }}
        >
          <ChevronRight size={20} />
        </button>

        {/* Floating Zoom button */}
        <div style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          background: 'rgba(5, 12, 18, 0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 196, 129, 0.15)',
          color: 'var(--color-text-secondary)',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'scale(1)' : 'scale(0.9)',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
          zIndex: 15
        }}>
          <Maximize2 size={18} />
        </div>

        {/* Full-bleed cover image with fade transition */}
        <img
          src={displayedUrl || activeItem.url}
          alt={`${activeGroup.title} - ${activeItem.name}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
            opacity: fadeState === 'fading-out' ? 0 : 1,
            transition: 'opacity 150ms ease-in-out, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: isHovered ? 'scale(1.025)' : 'scale(1)'
          }}
        />

        {/* Premium Glassmorphic Memo Card */}
        <div style={{
          position: 'absolute',
          bottom: '24px',
          left: '24px',
          background: 'rgba(18, 14, 10, 0.75)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 196, 129, 0.12)',
          padding: '10px 20px',
          borderRadius: '12px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
          pointerEvents: 'none',
          zIndex: 15,
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
        }}>
          <span style={{
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--color-text-tertiary)',
            fontFamily: 'var(--font-mono)'
          }}>
            {activeGroup.title}
          </span>
          <span style={{
            fontSize: '1.05rem',
            fontWeight: '600',
            letterSpacing: '0.01em',
            color: 'var(--color-accent-warm-light)',
            fontFamily: 'var(--font-display)'
          }}>
            {activeItem.name}
          </span>
        </div>

        {/* Interactive Pagination indicator dots */}
        {activeGroup.items.length > 1 && (
          <div style={{
            position: 'absolute',
            bottom: '24px',
            right: '24px',
            display: 'flex',
            gap: '2px',
            zIndex: 15
          }}>
            {activeGroup.items.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation()
                  setIsAutoplay(false)
                  setActiveItemIdx(idx)
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '4px',
                  cursor: 'pointer',
                  outline: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: activeItemIdx === idx ? 'var(--color-accent-warm-light)' : 'rgba(255, 255, 255, 0.25)',
                    transition: 'all 0.25s ease',
                    transform: activeItemIdx === idx ? 'scale(1.2)' : 'scale(1)'
                  }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox / Fullscreen Modal */}
      {isLightboxOpen && (
        <div 
          onClick={() => setIsLightboxOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(10, 8, 7, 0.95)',
            backdropFilter: 'blur(24px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: 'var(--color-text-secondary)',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              outline: 'none',
              zIndex: 100
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
              e.currentTarget.style.color = 'var(--color-text-primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
              e.currentTarget.style.color = 'var(--color-text-secondary)'
            }}
          >
            <X size={22} />
          </button>

          {/* Lightbox Navigation - Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handlePrev()
            }}
            style={{
              position: 'absolute',
              left: '32px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: 'var(--color-text-secondary)',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              outline: 'none',
              zIndex: 100
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
              e.currentTarget.style.color = 'var(--color-text-primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
              e.currentTarget.style.color = 'var(--color-text-secondary)'
            }}
          >
            <ChevronLeft size={28} />
          </button>

          {/* Lightbox Navigation - Next */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleNext()
            }}
            style={{
              position: 'absolute',
              right: '32px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: 'var(--color-text-secondary)',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              outline: 'none',
              zIndex: 100
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
              e.currentTarget.style.color = 'var(--color-text-primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
              e.currentTarget.style.color = 'var(--color-text-secondary)'
            }}
          >
            <ChevronRight size={28} />
          </button>

          {/* Image container in lightbox */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{ 
              position: 'relative', 
              maxWidth: '85vw', 
              maxHeight: '80vh', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center' 
            }}
          >
            <img
              src={activeItem.url}
              alt={activeItem.name}
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: '12px',
                boxShadow: '0 24px 64px rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            />
            
            {/* Memo inside lightbox */}
            <div style={{
              marginTop: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px'
            }}>
              <span style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-text-tertiary)',
                fontFamily: 'var(--font-mono)'
              }}>
                {activeGroup.title}
              </span>
              <span style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                letterSpacing: '0.01em',
                color: 'var(--color-accent-warm-light)',
                fontFamily: 'var(--font-display)'
              }}>
                {activeItem.name}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function SkillDetailPage() {
  const params = useParams()
  const router = useRouter()
  const author = (params?.author as string) ?? ''
  const name = (params?.name as string) ?? ''
  const [activeTab, setActiveTab] = useState<Tab>('details')
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
    isPrivate: false,
    useCases: '',
    fileUrl: '',
  })
  const [isSaving, setIsSaving] = useState(false)
  const [editError, setEditError] = useState<string | null>(null)
  const [editSuccess, setEditSuccess] = useState<string | null>(null)
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { connected, walletAddress, network } = useSolanaWallet()
  const { purchaseSkill, isPurchasing, purchaseStatus } = usePurchaseSkill()
  const publishSkill = useMutation(api.skills.publishSkill)
  const toggleSaved = useMutation(api.skills.toggleSavedSkill)
  const deleteSkill = useMutation(api.skills.deleteSkillByAuthorSlug)
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
        screenshots: staticSkill?.screenshots ?? undefined,
        useCases: convexSkill.useCases ?? staticSkill?.useCases ?? undefined,
        exampleUsage: convexSkill.exampleUsage ?? staticSkill?.exampleUsage ?? undefined,
        isPrivate: convexSkill.isPrivate ?? false,
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

  const convMeta = useMemo(() => {
    if (!skill) return null
    return getConversationalOverview(skill.slug, skill.description, skill.readme)
  }, [skill])

  const canEditListing = Boolean(
    connected &&
    walletAddress &&
    skill?.creatorWallet &&
    walletAddress === skill.creatorWallet
  )

  const tabs = useMemo(() => {
    return [
      { id: 'details' as const, label: 'Details' },
      { id: 'edit' as const, label: 'Edit Listing' }
    ]
  }, [])

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
      isPrivate: skill.isPrivate ?? false,
      useCases: skill.useCases ? skill.useCases.join(', ') : '',
      fileUrl: skill.fileUrl || '',
    })
  }, [skill])

  useEffect(() => {
    if (!canEditListing && activeTab === 'edit') {
      setActiveTab('details')
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
  const currentVersionUrl = resolveRepoUrl(skill.author, skill.slug, skill.fileUrl)

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

  const handleDelete = async () => {
    if (!walletAddress || !canEditListing || !skill) return
    setIsDeleting(true)
    setEditError(null)
    setEditSuccess(null)
    try {
      await deleteSkill({
        author: skill.author,
        slug: skill.slug,
        publisherWallet: walletAddress,
      })
      router.push('/skills')
    } catch (error: unknown) {
      setEditError(error instanceof Error ? error.message : 'Failed to delete listing.')
      setIsDeleting(false)
      setIsConfirmingDelete(false)
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

    const useCases = editForm.useCases
      .split(',')
      .map((uc) => uc.trim())
      .filter(Boolean)

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
        isPrivate: editForm.isPrivate,
        useCases: useCases.length > 0 ? useCases : undefined,
        fileUrl: editForm.fileUrl.trim() || undefined,
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
          <h1 className="sd-title">
            {skill.name}{' '}
            <span className="sd-title-by">
              by <Link href={`/skills/${skill.author}`} className="sd-author-link">@{skill.author}</Link>
            </span>
          </h1>
          <p className="sd-tagline">{skill.tagline}</p>
        </div>

        {/* Main layout: content + sidebar */}
        <div className="sd-layout animate-fade-in-up animate-delay-1">

          {/* Main content column */}
          <div className="sd-content">
            {/* Install Bar */}
            <InstallCommandBar author={skill.author} slug={skill.slug} />
            {skill.exampleUsage && (
              <ExampleUsageBar author={skill.author} slug={skill.slug} exampleUsage={skill.exampleUsage} />
            )}

            {/* Toggle tabs for admin list editor */}
            {canEditListing && (
              <div className="sd-tabs" role="tablist" style={{ marginTop: '24px' }}>
                <button
                  role="tab"
                  aria-selected={activeTab === 'details'}
                  className={`sd-tab ${activeTab === 'details' ? 'sd-tab--active' : ''}`}
                  onClick={() => setActiveTab('details')}
                >
                  Details
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === 'edit'}
                  className={`sd-tab ${activeTab === 'edit' ? 'sd-tab--active' : ''}`}
                  onClick={() => setActiveTab('edit')}
                >
                  Edit Listing
                </button>
              </div>
            )}

            <div className="sd-tab-body" style={{ marginTop: '24px' }}>
              {activeTab === 'details' ? (
                <div className="sd-details-flow">
                  {/* Summary / Description */}
                  <section className="sd-summary-section">
                    <div className="sd-tags">
                      {skill.tags
                        .filter((tag) => tag !== 'skill' && tag !== 'skills' && !tag.endsWith('-skills'))
                        .map((tag) => (
                          <span key={tag} className="sd-tag">{tag}</span>
                        ))}
                    </div>
                  </section>

                  {/* Visual Presets Gallery */}
                  {skill.screenshots && skill.screenshots.length > 0 && (
                    <section className="sd-gallery-section" style={{
                      background: 'none',
                      border: 'none',
                      padding: '0',
                      boxShadow: 'none',
                      marginTop: '8px',
                      marginBottom: '24px'
                    }}>
                      <h3 style={{
                        fontSize: '0.72rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--color-text-tertiary)',
                        marginBottom: '16px',
                        borderLeft: '2px solid var(--color-accent-warm-light)',
                        paddingLeft: '8px'
                      }}>Visual Presets &amp; Gallery</h3>
                      
                      <PresetGallery groups={skill.screenshots} />
                    </section>
                  )}
                  {/* Description + Use Cases */}
                  <section className="sd-conversational-section" style={{
                    display: 'grid',
                    gap: '28px',
                    marginTop: '16px'
                  }}>
                    <p style={{
                      fontSize: '1.0625rem',
                      lineHeight: '1.75',
                      color: 'var(--color-text-secondary)',
                      maxWidth: '800px',
                      margin: 0,
                      fontWeight: 400
                    }}>
                      {skill.description}
                    </p>

                    {(skill.useCases && skill.useCases.length > 0) && (
                      <div>
                        <h3 style={{
                          fontSize: '0.72rem',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          color: 'var(--color-text-tertiary)',
                          marginBottom: '16px',
                          borderLeft: '2px solid var(--color-accent-warm-light)',
                          paddingLeft: '8px'
                        }}>What it can do</h3>
                        
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                          gap: '16px'
                        }}>
                          {skill.useCases.map((useCase, idx) => (
                            <div key={idx} style={{
                              background: 'rgba(255, 255, 255, 0.01)',
                              border: '1px solid rgba(255, 255, 255, 0.03)',
                              borderRadius: '12px',
                              padding: '20px',
                              transition: 'all 0.2s ease',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center'
                            }} className="sd-usecase-card">
                              <p style={{
                                fontSize: '0.86rem',
                                lineHeight: '1.55',
                                color: 'var(--color-text-secondary)',
                                margin: 0
                              }}>
                                {useCase}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </section>
                </div>
              ) : (
                canEditListing && (
                  <form className="sd-edit-form" onSubmit={handleEditSubmit}>
                    <div className="form-group">
                      <span className="form-label">Visibility</span>
                      <div className="sk-price-switch" style={{ width: 'fit-content', minWidth: '180px' }}>
                        <button
                          type="button"
                          className={`sk-price-switch-btn ${!editForm.isPrivate ? 'is-active' : ''}`}
                          onClick={() => setEditForm(f => ({ ...f, isPrivate: false }))}
                        >
                          Public
                        </button>
                        <button
                          type="button"
                          className={`sk-price-switch-btn ${editForm.isPrivate ? 'is-active' : ''}`}
                          onClick={() => setEditForm(f => ({ ...f, isPrivate: true }))}
                        >
                          Private
                        </button>
                      </div>
                    </div>

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
                      <span className="form-label">Use cases (comma separated, optional)</span>
                      <input
                        className="form-input"
                        type="text"
                        value={editForm.useCases}
                        autoComplete="off"
                        spellCheck
                        onChange={(event) =>
                          setEditForm((current) => ({ ...current, useCases: event.target.value }))
                        }
                        placeholder="Audit smart contracts, Check for reentrancy bugs, Generate audit reports"
                      />
                    </label>

                    <label className="form-group">
                      <span className="form-label">Repository / Source Link *</span>
                      <input
                        className="form-input"
                        type="text"
                        value={editForm.fileUrl}
                        autoComplete="off"
                        spellCheck={false}
                        onChange={(event) =>
                          setEditForm((current) => ({ ...current, fileUrl: event.target.value }))
                        }
                        placeholder="https://github.com/username/repo/tree/main/skills/my-skill"
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

                    <div className="sd-edit-actions" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <button type="submit" className="btn btn-primary" disabled={isSaving || isDeleting}>
                        {isSaving ? 'Saving…' : 'Save listing'}
                      </button>
                      
                      {!isConfirmingDelete ? (
                        <button
                          type="button"
                          className="btn btn-red"
                          onClick={() => setIsConfirmingDelete(true)}
                          disabled={isSaving || isDeleting}
                        >
                          Delete Listing
                        </button>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '0.8rem', color: '#ffbba8' }}>Confirm delete?</span>
                          <button
                            type="button"
                            className="btn btn-red btn-sm"
                            onClick={handleDelete}
                            disabled={isDeleting}
                          >
                            {isDeleting ? 'Deleting…' : 'Yes, Delete'}
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline btn-sm"
                            onClick={() => setIsConfirmingDelete(false)}
                            disabled={isDeleting}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>

                    {editError && <p className="profile-error">{editError}</p>}
                    {editSuccess && <p className="sd-edit-success">{editSuccess}</p>}
                  </form>
                )
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
                <div style={{ display: 'grid', gap: '8px' }}>
                  <a
                    href={currentVersionUrl}
                    className="btn btn-red btn-lg sd-purchase-btn"
                    target="_blank"
                    rel="noreferrer"
                    style={{ gap: '8px' }}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    View Repository
                  </a>
                  <p style={{ fontSize: '0.72rem', color: 'var(--color-text-tertiary)', textAlign: 'center', margin: '4px 0 0' }}>
                    Open source on GitHub
                  </p>
                </div>
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
                  <button
                    type="button"
                    className="btn btn-red btn-lg sd-purchase-btn"
                    onClick={handlePurchase}
                    disabled={isPurchasing || !canPurchasePaidSkill}
                    style={{ width: '100%' }}
                  >
                    {isPurchasing ? (
                      <>
                        <span className="spinner" style={{
                          width: '14px',
                          height: '14px',
                          border: '2px solid currentColor',
                          borderTopColor: 'transparent',
                          borderRadius: '50%',
                          display: 'inline-block',
                          marginRight: '8px'
                        }} />
                        {purchaseStatus === 'simulating' && 'Simulating…'}
                        {purchaseStatus === 'signing' && 'Signing…'}
                        {purchaseStatus === 'confirming' && 'Confirming…'}
                        {purchaseStatus !== 'simulating' && purchaseStatus !== 'signing' && purchaseStatus !== 'confirming' && 'Confirming…'}
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={16} />
                        Get Skill — {skill.price}
                      </>
                    )}
                  </button>
                  
                  {isPurchasing && (
                    <div style={{
                      padding: '12px',
                      borderRadius: '8px',
                      background: 'rgba(255, 196, 129, 0.04)',
                      border: '1px solid rgba(255, 196, 129, 0.15)',
                      fontSize: '0.78rem',
                      lineHeight: '1.4',
                      color: 'var(--color-text-secondary)',
                      textAlign: 'left'
                    }}>
                      {purchaseStatus === 'simulating' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span>Validating transaction and balance on Devnet...</span>
                        </div>
                      )}
                      {purchaseStatus === 'signing' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', color: 'var(--color-accent-warm-light)' }}>
                            <span style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              background: 'var(--color-accent-warm-light)',
                              boxShadow: '0 0 8px var(--color-accent-warm-light)',
                              display: 'inline-block'
                            }} />
                            <span>Awaiting Wallet Approval</span>
                          </div>
                          <p style={{ margin: 0, color: 'var(--color-text-tertiary)', fontSize: '0.72rem', lineHeight: '1.4' }}>
                            If Phantom or Solflare warns you about <strong>"Simulation Failed"</strong> or <strong>"Cannot predict balance changes"</strong>, it is a known mobile wallet limitation on Devnet. You can safely click <strong>Approve/Confirm</strong>.
                          </p>
                        </div>
                      )}
                      {purchaseStatus === 'confirming' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span>Confirming purchase on Solana...</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
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

              {canEditListing && activeTab !== 'edit' && (
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

        {/* Source Code Inspector (full width, below content/sidebar) */}
        {activeTab === 'details' && (isFreeSkill || isPurchased || canEditListing) && (skill.fileUrl || skill.readme) && (
          <div className="animate-fade-in-up animate-delay-2" style={{ width: '100%' }}>
            <SourceCodeInspector
              author={skill.author}
              slug={skill.slug}
              fallbackCode={skill.readme}
              fallbackGithubUrl={currentVersionUrl}
              fileUrl={skill.fileUrl}
            />
          </div>
        )}

      </div>
    </div>
  )
}
