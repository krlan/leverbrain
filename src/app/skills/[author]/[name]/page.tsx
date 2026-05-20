"use client";

import { FormEvent, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Bookmark, BookmarkCheck, BookOpen, Check, Download, ExternalLink, ShoppingCart, TrendingUp, Zap, Copy, Loader2 } from 'lucide-react'
import { useMutation, useQuery } from 'convex/react'
import { getSkillByAuthorSlug, type SkillListing } from '@/lib/skills-data'
import { useSolanaWallet } from '@/contexts/SolanaWalletContext'
import { getExplorerTransactionUrl } from '@/lib/solanaRpc'
import { usePurchaseSkill } from '@/hooks/usePurchaseSkill'
import { api } from '../../../../../convex/_generated/api'

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

function InstallCommandBar({ author, slug }: { author: string; slug: string }) {
  const command = `npx -y leverbrain get ${author}/${slug}`
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy', err)
    }
  }

  return (
    <div className="sd-install-bar">
      <span className="sd-install-label">CLI INSTALL</span>
      <div className="sd-install-code-wrap">
        <span className="sd-install-prompt">$</span>
        <code className="sd-install-code">{command}</code>
      </div>
      <button onClick={handleCopy} className="sd-install-copy-btn" aria-label="Copy install command">
        {copied ? <Check size={14} className="text-success" style={{ color: 'var(--color-accent-warm-light)' }} /> : <Copy size={14} />}
      </button>
    </div>
  )
}

function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy', err)
    }
  }

  return (
    <div className="sd-codeblock">
      <div className="sd-codeblock-header">
        <span className="sd-codeblock-lang">{language || 'code'}</span>
        <button onClick={handleCopy} className="sd-codeblock-copy" aria-label="Copy code block">
          {copied ? <Check size={12} style={{ color: 'var(--color-accent-warm-light)' }} /> : <Copy size={12} />}
        </button>
      </div>
      <pre className="sd-codeblock-pre">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function parseInlineMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  let currentText = text
  let key = 0

  while (currentText) {
    const boldIdx = currentText.indexOf('**')
    const codeIdx = currentText.indexOf('`')
    const linkIdx = currentText.indexOf('[')

    const indices = [
      boldIdx !== -1 ? boldIdx : Infinity,
      codeIdx !== -1 ? codeIdx : Infinity,
      linkIdx !== -1 ? linkIdx : Infinity
    ]
    const minIdx = Math.min(...indices)

    if (minIdx === Infinity) {
      parts.push(currentText)
      break
    }

    if (minIdx > 0) {
      parts.push(currentText.substring(0, minIdx))
      currentText = currentText.substring(minIdx)
    }

    if (minIdx === boldIdx) {
      const endIdx = currentText.indexOf('**', 2)
      if (endIdx !== -1) {
        parts.push(<strong key={key++}>{currentText.substring(2, endIdx)}</strong>)
        currentText = currentText.substring(endIdx + 2)
      } else {
        parts.push(currentText)
        break
      }
    } else if (minIdx === codeIdx) {
      const endIdx = currentText.indexOf('`', 1)
      if (endIdx !== -1) {
        parts.push(<code key={key++} className="sd-md-inline-code">{currentText.substring(1, endIdx)}</code>)
        currentText = currentText.substring(endIdx + 1)
      } else {
        parts.push(currentText)
        break
      }
    } else if (minIdx === linkIdx) {
      const endBracket = currentText.indexOf(']')
      const startParen = currentText.indexOf('(', endBracket)
      const endParen = currentText.indexOf(')', startParen)

      if (endBracket !== -1 && startParen === endBracket + 1 && endParen !== -1) {
        const linkText = currentText.substring(1, endBracket)
        const linkUrl = currentText.substring(startParen + 1, endParen)
        parts.push(
          <a key={key++} href={linkUrl} className="sd-md-link" target="_blank" rel="noreferrer">
            {linkText}
          </a>
        )
        currentText = currentText.substring(endParen + 1)
      } else {
        parts.push('[')
        currentText = currentText.substring(1)
      }
    }
  }

  return parts
}

function renderMarkdown(md: string) {
  if (!md) return null

  const lines = md.split('\n')
  const elements: React.ReactNode[] = []
  let inCodeBlock = false
  let codeLines: string[] = []
  let codeLang = ''
  let listItems: string[] = []
  let listType: 'bullet' | 'ordered' | null = null

  const flushList = (key: number) => {
    if (listItems.length === 0) return
    if (listType === 'bullet') {
      elements.push(
        <ul key={`ul-${key}`} className="sd-md-list">
          {listItems.map((item, idx) => (
            <li key={idx}>{parseInlineMarkdown(item)}</li>
          ))}
        </ul>
      )
    } else if (listType === 'ordered') {
      elements.push(
        <ol key={`ol-${key}`} className="sd-md-ol">
          {listItems.map((item, idx) => (
            <li key={idx}>{parseInlineMarkdown(item)}</li>
          ))}
        </ol>
      )
    }
    listItems = []
    listType = null
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        const codeContent = codeLines.join('\n')
        elements.push(
          <CodeBlock key={`code-${elements.length}`} code={codeContent} language={codeLang} />
        )
        codeLines = []
        inCodeBlock = false
      } else {
        flushList(elements.length)
        codeLang = line.trim().slice(3).trim()
        inCodeBlock = true
      }
      continue
    }

    if (inCodeBlock) {
      codeLines.push(line)
      continue
    }

    if (line.startsWith('# ')) {
      flushList(elements.length)
      elements.push(<h1 key={`h1-${elements.length}`} className="sd-md-h1">{parseInlineMarkdown(line.slice(2))}</h1>)
      continue
    }
    if (line.startsWith('## ')) {
      flushList(elements.length)
      elements.push(<h2 key={`h2-${elements.length}`} className="sd-md-h2">{parseInlineMarkdown(line.slice(3))}</h2>)
      continue
    }
    if (line.startsWith('### ')) {
      flushList(elements.length)
      elements.push(<h3 key={`h3-${elements.length}`} className="sd-md-h3">{parseInlineMarkdown(line.slice(4))}</h3>)
      continue
    }

    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      if (listType !== 'bullet') {
        flushList(elements.length)
        listType = 'bullet'
      }
      listItems.push(line.trim().slice(2))
      continue
    }

    if (/^\d+\.\s/.test(line.trim())) {
      if (listType !== 'ordered') {
        flushList(elements.length)
        listType = 'ordered'
      }
      const content = line.trim().replace(/^\d+\.\s/, '')
      listItems.push(content)
      continue
    }

    if (line.startsWith('> ')) {
      flushList(elements.length)
      const rawContent = line.slice(2).trim()
      let alertType: 'note' | 'tip' | 'important' | 'warning' | 'caution' | null = null
      let displayContent = rawContent

      if (rawContent.startsWith('[!NOTE]')) {
        alertType = 'note'
        displayContent = rawContent.slice(7).trim()
      } else if (rawContent.startsWith('[!TIP]')) {
        alertType = 'tip'
        displayContent = rawContent.slice(6).trim()
      } else if (rawContent.startsWith('[!IMPORTANT]')) {
        alertType = 'important'
        displayContent = rawContent.slice(12).trim()
      } else if (rawContent.startsWith('[!WARNING]')) {
        alertType = 'warning'
        displayContent = rawContent.slice(10).trim()
      } else if (rawContent.startsWith('[!CAUTION]')) {
        alertType = 'caution'
        displayContent = rawContent.slice(10).trim()
      }

      let nextIdx = i + 1
      while (nextIdx < lines.length && lines[nextIdx].startsWith('> ')) {
        const nextRaw = lines[nextIdx].slice(2).trim()
        displayContent += ' ' + nextRaw
        nextIdx++
        i++
      }

      if (alertType) {
        elements.push(
          <div key={`alert-${elements.length}`} className={`sd-alert sd-alert--${alertType}`}>
            <span className="sd-alert-type">{alertType.toUpperCase()}</span>
            <p className="sd-alert-body">{parseInlineMarkdown(displayContent)}</p>
          </div>
        )
      } else {
        elements.push(
          <blockquote key={`quote-${elements.length}`} className="sd-blockquote">
            {parseInlineMarkdown(displayContent)}
          </blockquote>
        )
      }
      continue
    }

    if (!line.trim()) {
      flushList(elements.length)
      continue
    }

    flushList(elements.length)
    elements.push(
      <p key={`p-${elements.length}`} className="sd-md-p">
        {parseInlineMarkdown(line)}
      </p>
    )
  }

  flushList(elements.length)
  return <div className="sd-markdown-container">{elements}</div>
}

function resolveRepoUrl(author: string, slug: string): string {
  const normAuthor = author.toLowerCase()
  if (normAuthor === 'anthropics') {
    return `https://github.com/anthropics/skills/tree/main/skills/${slug}`
  }
  if (normAuthor === 'composiohq' || normAuthor === 'composio') {
    return `https://github.com/composiohq/skills/tree/main/skills/${slug}`
  }
  if (normAuthor === '199-biotechnologies') {
    return `https://github.com/199-biotechnologies/skills/tree/main/skills/${slug}`
  }
  return `https://github.com/leverbrain/leverbrain/tree/main/skills/${slug}`
}

function resolveFileRawUrl(author: string, slug: string, filename: string): string {
  const normAuthor = author.toLowerCase()
  if (normAuthor === 'anthropics') {
    return `https://raw.githubusercontent.com/anthropics/skills/main/skills/${slug}/${filename}`
  }
  if (normAuthor === 'composiohq' || normAuthor === 'composio') {
    return `https://raw.githubusercontent.com/composiohq/skills/main/skills/${slug}/${filename}`
  }
  if (normAuthor === '199-biotechnologies') {
    return `https://raw.githubusercontent.com/199-biotechnologies/skills/main/skills/${slug}/${filename}`
  }
  return `https://raw.githubusercontent.com/leverbrain/leverbrain/main/skills/${slug}/${filename}`
}

function resolveFileBlobUrl(author: string, slug: string, filename: string): string {
  const normAuthor = author.toLowerCase()
  if (normAuthor === 'anthropics') {
    return `https://github.com/anthropics/skills/blob/main/skills/${slug}/${filename}`
  }
  if (normAuthor === 'composiohq' || normAuthor === 'composio') {
    return `https://github.com/composiohq/skills/blob/main/skills/${slug}/${filename}`
  }
  if (normAuthor === '199-biotechnologies') {
    return `https://github.com/199-biotechnologies/skills/blob/main/skills/${slug}/${filename}`
  }
  return `https://github.com/leverbrain/leverbrain/blob/main/skills/${slug}/${filename}`
}

interface InspectorFile {
  name: string
  content: string
  githubUrl: string
}

function SourceCodeInspector({ 
  author, 
  slug, 
  fallbackCode, 
  fallbackGithubUrl 
}: { 
  author: string
  slug: string
  fallbackCode: string
  fallbackGithubUrl: string 
}) {
  const [files, setFiles] = useState<InspectorFile[]>([])
  const [activeFileIdx, setActiveFileIdx] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let active = true
    const fetchFiles = async () => {
      setLoading(true)
      const potentialNames = ['SKILL.md', 'README.md', 'evals.json', 'package.json']
      const loaded: InspectorFile[] = []

      await Promise.all(
        potentialNames.map(async (name) => {
          const rawUrl = resolveFileRawUrl(author, slug, name)
          try {
            const res = await fetch(rawUrl)
            if (res.status === 200) {
              const text = await res.text()
              if (text && text.trim().length > 0) {
                loaded.push({
                  name,
                  content: text,
                  githubUrl: resolveFileBlobUrl(author, slug, name)
                })
              }
            }
          } catch (e) {
            // Ignore error
          }
        })
      )

      if (!active) return

      // Sort files: SKILL.md first, then README.md, then others
      loaded.sort((a, b) => {
        const order = ['SKILL.md', 'README.md', 'evals.json', 'package.json']
        const idxA = order.indexOf(a.name)
        const idxB = order.indexOf(b.name)
        if (idxA !== -1 && idxB !== -1) return idxA - idxB
        if (idxA !== -1) return -1
        if (idxB !== -1) return 1
        return a.name.localeCompare(b.name)
      })

      if (loaded.length === 0) {
        loaded.push({
          name: 'SKILL.md',
          content: fallbackCode,
          githubUrl: fallbackGithubUrl
        })
      }

      setFiles(loaded)
      setActiveFileIdx(0)
      setLoading(false)
    }

    fetchFiles()
    return () => {
      active = false
    }
  }, [author, slug, fallbackCode, fallbackGithubUrl])

  const activeFile = files[activeFileIdx] || { name: 'SKILL.md', content: fallbackCode, githubUrl: fallbackGithubUrl }
  const lines = activeFile.content.split('\n')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeFile.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code', err)
    }
  }

  return (
    <section className="sd-code-inspector">
      <div className="sd-inspector-header">
        <div className="sd-inspector-title-wrap">
          <span className="sd-inspector-dot red" />
          <span className="sd-inspector-dot orange" />
          <span className="sd-inspector-dot green" />
          {loading ? (
            <span className="sd-inspector-filename" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Loader2 size={12} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} /> Loading files...
            </span>
          ) : (
            <div className="sd-inspector-tabs">
              {files.map((file, idx) => (
                <button
                  key={file.name}
                  onClick={() => setActiveFileIdx(idx)}
                  className={`sd-inspector-tab ${activeFileIdx === idx ? 'active' : ''}`}
                >
                  {file.name}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="sd-inspector-actions">
          <a href={activeFile.githubUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline sd-inspector-btn">
            <ExternalLink size={12} /> Inspect Repository
          </a>
          <button onClick={handleCopy} className="btn btn-sm btn-outline sd-inspector-btn">
            {copied ? <Check size={12} style={{ color: 'var(--color-accent-warm-light)' }} /> : <Copy size={12} />} Copy File
          </button>
        </div>
      </div>
      <div className="sd-inspector-code-viewport">
        <div className="sd-inspector-line-numbers">
          {lines.map((_, idx) => (
            <span key={idx} className="sd-inspector-ln">{idx + 1}</span>
          ))}
        </div>
        <pre className="sd-inspector-pre">
          <code>{activeFile.content}</code>
        </pre>
      </div>
    </section>
  )
}

function VisualSpecimen({ previewHtml, imageUrl }: { previewHtml?: string; imageUrl?: string }) {
  return (
    <div className="sd-visual-specimen">
      <div className="sd-specimen-header">
        <div className="sd-specimen-dot red" />
        <div className="sd-specimen-dot orange" />
        <div className="sd-specimen-dot green" />
        <span className="sd-specimen-title">VISUAL SPECIMEN // LIVE PREVIEW</span>
      </div>
      <div className="sd-specimen-body">
        {previewHtml ? (
          <div className="sd-specimen-html" dangerouslySetInnerHTML={{ __html: previewHtml }} />
        ) : imageUrl ? (
          <img src={imageUrl} alt="Visual Specimen Preview" className="sd-specimen-img" />
        ) : null}
      </div>
    </div>
  )
}

export default function SkillDetailPage() {
  const params = useParams()
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
  const currentVersionUrl = resolveRepoUrl(skill.author, skill.slug)

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

          {/* Main content column */}
          <div className="sd-content">
            {/* Install Bar */}
            <InstallCommandBar author={skill.author} slug={skill.slug} />

            {/* Toggle tabs for admin list editor */}
            {canEditListing && (
              <div className="sd-tabs" role="tablist" style={{ marginTop: '24px' }}>
                <button
                  role="tab"
                  aria-selected={activeTab === 'details'}
                  className={`sd-tab ${activeTab === 'details' ? 'sd-tab--active' : ''}`}
                  onClick={() => setActiveTab('details')}
                >
                  View Specimen
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
                  {/* Visual Specimen Preview */}
                  {(skill.previewHtml || skill.imageUrl) && (
                    <VisualSpecimen previewHtml={skill.previewHtml} imageUrl={skill.imageUrl} />
                  )}

                  {/* Summary / Description / Rich HTML Overview */}
                  {skill.overviewHtml ? (
                    <section className="sd-overview-rich-section">
                      <div className="sd-overview-rich" dangerouslySetInnerHTML={{ __html: skill.overviewHtml }} />
                    </section>
                  ) : (
                    <section className="sd-summary-section">
                      <p className="sd-desc">{skill.description}</p>
                      <div className="sd-tags">
                        {skill.tags.map((tag) => (
                          <span key={tag} className="sd-tag">{tag}</span>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Markdown Readme */}
                  {skill.readme && (
                    <section className="sd-readme-section">
                      <h3 className="sd-section-title">SPECIFICATION & CORE ROUTINES</h3>
                      {renderMarkdown(skill.readme)}
                    </section>
                  )}

                  {/* When to use */}
                  {skill.whenToUse && (
                    <section className="sd-when-section">
                      <h3 className="sd-section-title">RECOMMENDED DEPLOYMENT SCENARIOS</h3>
                      <div className="sd-when-card">
                        <p>{skill.whenToUse}</p>
                      </div>
                    </section>
                  )}

                  {/* Source Code Inspector (for free ones) */}
                  {isFreeSkill && skill.readme && (
                    <SourceCodeInspector
                      author={skill.author}
                      slug={skill.slug}
                      fallbackCode={skill.readme}
                      fallbackGithubUrl={currentVersionUrl}
                    />
                  )}
                </div>
              ) : (
                canEditListing && (
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

      </div>
    </div>
  )
}
