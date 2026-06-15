"use client";

import Link from 'next/link'
import { FormEvent, useMemo, useState } from 'react'
import { ArrowRight, ExternalLink, Wallet } from 'lucide-react'
import { useMutation, useQuery } from 'convex/react'
import posthog from 'posthog-js'
import { useSolanaWallet } from '@/contexts/SolanaWalletContext'
import { api } from '../../../convex/_generated/api'

type SkillCategory = 'skill' | 'strategy' | 'blueprint'

interface PublishFormState {
  name: string
  slug: string
  tagline: string
  description: string
  whenToUse: string
  readme: string
  priceUsdc: string
  category: SkillCategory
  tags: string
  fileUrl: string
  isPrivate: boolean
  exampleUsage: string
  useCases: string
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function walletFallbackAuthor(walletAddress: string) {
  return `wallet-${walletAddress.slice(0, 8).toLowerCase()}`
}

function parseSimpleFrontmatter(yamlString: string) {
  const lines = yamlString.split('\n')
  const result: Record<string, any> = {}
  for (const line of lines) {
    const match = line.match(/^([^:]+):\s*(.*)$/)
    if (match) {
      const key = match[1].trim()
      let val = match[2].trim()
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1)
      }
      if (key === 'tags') {
        if (val.startsWith('[') && val.endsWith(']')) {
          result[key] = val.slice(1, -1).split(',').map(t => t.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean)
        } else {
          result[key] = val.split(',').map(t => t.trim()).filter(Boolean)
        }
      } else if (key === 'price') {
        result[key] = Number(val) || 0
      } else {
        result[key] = val
      }
    }
  }
  return result
}

const INITIAL_FORM: PublishFormState = {
  name: '',
  slug: '',
  tagline: '',
  description: '',
  whenToUse: '',
  readme: '',
  priceUsdc: '0.00',
  category: 'skill',
  tags: '',
  fileUrl: '',
  isPrivate: false,
  exampleUsage: '',
  useCases: '',
}

export default function PublishPage() {
  const {
    connected,
    connecting,
    walletAddress,
    connectWallet,
    walletLabel,
  } = useSolanaWallet()
  const publishSkill = useMutation(api.skills.publishSkill)
  const profile = useQuery(
    api.skills.getProfile,
    walletAddress ? { walletAddress } : 'skip'
  )
  const publisherSkills = useQuery(
    api.skills.getSkillsByCreatorWallet,
    walletAddress ? { creatorWallet: walletAddress } : 'skip'
  )
  const [form, setForm] = useState<PublishFormState>(INITIAL_FORM)
  const [isPublishing, setIsPublishing] = useState(false)
  const [publishError, setPublishError] = useState<string | null>(null)
  const [publishedSkillPath, setPublishedSkillPath] = useState<string | null>(null)

  // Package Source states
  const [sourceType, setSourceType] = useState<'upload' | 'github'>('upload')
  const [githubUrl, setGithubUrl] = useState('')
  const [uploadStatus, setUploadStatus] = useState<string | null>(null)

  const derivedAuthor = useMemo(() => {
    if (!walletAddress) {
      return null
    }
    const handle = profile?.handle?.trim().toLowerCase()
    return handle || walletFallbackAuthor(walletAddress)
  }, [profile?.handle, walletAddress])


  const handleFolderUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setUploadStatus('Processing files...')
    
    // Find SKILL.md
    let skillMdFile: File | null = null
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const relativePath = file.webkitRelativePath || file.name
      if (relativePath.endsWith('SKILL.md')) {
        skillMdFile = file
        break
      }
    }

    if (!skillMdFile) {
      setUploadStatus('SKILL.md not found in the selected folder. Please make sure the folder contains a SKILL.md file.')
      return
    }

    try {
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        const match = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
        if (!match) {
          setUploadStatus('Invalid SKILL.md: Frontmatter is missing or improperly formatted (must be enclosed by ---).')
          return
        }

        const yamlBlock = match[1]
        const readmeContent = match[2].trim()
        const metadata = parseSimpleFrontmatter(yamlBlock)
        
        setForm((prev) => ({
          ...prev,
          name: metadata.name || prev.name,
          slug: slugify(metadata.name || prev.name) || prev.slug,
          tagline: metadata.tagline || metadata.description?.slice(0, 120) || prev.tagline,
          description: metadata.description || prev.description,
          whenToUse: metadata.whenToUse || prev.whenToUse,
          readme: readmeContent || prev.readme,
          priceUsdc: metadata.price !== undefined ? String(metadata.price) : prev.priceUsdc,
          category: (metadata.category === 'strategy' || metadata.category === 'blueprint' || metadata.category === 'skill') 
            ? metadata.category 
            : prev.category,
          tags: Array.isArray(metadata.tags) 
            ? metadata.tags.join(', ') 
            : (metadata.tags ? String(metadata.tags) : prev.tags),
          fileUrl: `uploaded://${slugify(metadata.name || 'skill')}`,
          isPrivate: metadata.isPrivate !== undefined ? Boolean(metadata.isPrivate) : prev.isPrivate,
          useCases: Array.isArray(metadata.useCases)
            ? metadata.useCases.join(', ')
            : (metadata.useCases ? String(metadata.useCases) : prev.useCases)
        }))
        
        setUploadStatus(`Successfully parsed SKILL.md: Loaded "${metadata.name || 'Unnamed'}"`)
      }
      reader.readAsText(skillMdFile)
    } catch (err) {
      console.error(err)
      setUploadStatus('Error reading SKILL.md file.')
    }
  }

  const onPublish = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!walletAddress || !derivedAuthor) {
      setPublishError('Connect wallet first to publish a listing.')
      return
    }

    const trimmedName = form.name.trim()
    const trimmedSlug = slugify(form.slug || form.name)

    if (!trimmedName || !trimmedSlug) {
      setPublishError('Name and slug are required.')
      return
    }

    let parsedPrice = 0
    let tags: string[] = []
    let category: SkillCategory = 'skill'

    if (!form.isPrivate) {
      parsedPrice = Number(form.priceUsdc)
      if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
        setPublishError('Price must be a positive number.')
        return
      }

      tags = form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean)

      if (tags.length === 0) {
        setPublishError('Add at least one tag.')
        return
      }
      category = form.category
    }

    const finalFileUrl = sourceType === 'github' ? githubUrl.trim() : form.fileUrl
    const useCases = form.useCases
      .split(',')
      .map((uc) => uc.trim())
      .filter(Boolean)

    setPublishError(null)
    setPublishedSkillPath(null)
    setIsPublishing(true)

    try {
      const result = await publishSkill({
        publisherWallet: walletAddress,
        skillId: trimmedSlug,
        author: derivedAuthor,
        slug: trimmedSlug,
        name: trimmedName,
        tagline: form.tagline,
        description: form.description,
        readme: form.readme || undefined,
        whenToUse: form.whenToUse || undefined,
        priceUsdc: parsedPrice,
        category: category,
        tags,
        fileUrl: finalFileUrl || undefined,
        isPrivate: form.isPrivate,
        exampleUsage: form.exampleUsage || undefined,
        useCases: useCases.length > 0 ? useCases : undefined,
      })

      const nextPath = `/skills/${result.author}/${result.slug}`
      setPublishedSkillPath(nextPath)
      posthog.capture('skill_published', {
        skill_id: trimmedSlug,
        skill_name: trimmedName,
        category: category,
        price_usdc: parsedPrice,
        is_free: parsedPrice === 0,
        source_type: sourceType,
        tag_count: tags.length,
      })
      setForm(INITIAL_FORM)
      setGithubUrl('')
      setUploadStatus(null)
    } catch (error: unknown) {
      setPublishError(error instanceof Error ? error.message : 'Failed to publish skill.')
    } finally {
      setIsPublishing(false)
    }
  }

  return (
    <div className="publish-page">
      <div className="container">
        <header className="publish-hero">
          <h1>Creator publishing room</h1>
          <p>Ship listings from your payout wallet and keep edit access tied to on-chain identity.</p>
          <div className="publish-hero-flow" aria-hidden="true">
            <span>Draft</span>
            <ArrowRight size={12} />
            <span>Publish</span>
            <ArrowRight size={12} />
            <span>Update anytime</span>
          </div>
        </header>

        {!connected || !walletAddress ? (
          <section className="publish-connect-card">
            <Wallet size={18} />
            <h2>Connect your wallet to publish</h2>
            <p>Publishing rights are tied to your payout wallet so only the publisher can edit listing details.</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => void connectWallet()}
              disabled={connecting}
            >
              {connecting ? 'Connecting...' : 'Connect wallet'}
            </button>
          </section>
        ) : (
          <div className="publish-layout">
            <section className="publish-main">
              <div className="publish-main-head">
                <h2>Listing metadata</h2>
                <p>Connected via {walletLabel}. Publisher handle: <strong>@{derivedAuthor}</strong></p>
              </div>

              <form className="publish-form" onSubmit={onPublish}>
                <div className="form-group">
                  <span className="form-label">Visibility</span>
                  <div className="sk-price-switch" style={{ width: 'fit-content', minWidth: '180px' }}>
                    <button
                      type="button"
                      className={`sk-price-switch-btn ${!form.isPrivate ? 'is-active' : ''}`}
                      onClick={() => setForm(f => ({ ...f, isPrivate: false }))}
                    >
                      Public
                    </button>
                    <button
                      type="button"
                      className={`sk-price-switch-btn ${form.isPrivate ? 'is-active' : ''}`}
                      onClick={() => setForm(f => ({ ...f, isPrivate: true }))}
                    >
                      Private
                    </button>
                  </div>
                </div>

                <div className="publish-grid">
                  <label className="form-group">
                    <span className="form-label">Skill name *</span>
                    <input
                      className="form-input"
                      type="text"
                      value={form.name}
                      autoComplete="off"
                      spellCheck={false}
                      onChange={(event) => {
                        const nextName = event.target.value
                        setForm((current) => ({
                          ...current,
                          name: nextName,
                          slug: current.slug || slugify(nextName),
                        }))
                      }}
                      placeholder="Agency Funnel OS"
                      required
                    />
                  </label>

                  <label className="form-group">
                    <span className="form-label">Slug *</span>
                    <input
                      className="form-input mono"
                      type="text"
                      value={form.slug}
                      autoComplete="off"
                      spellCheck={false}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, slug: slugify(event.target.value) }))
                      }
                      placeholder="agency-funnel-os"
                      required
                    />
                  </label>
                </div>

                <label className="form-group">
                  <span className="form-label">Tagline *</span>
                  <input
                    className="form-input"
                    type="text"
                    value={form.tagline}
                    autoComplete="off"
                    spellCheck={false}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, tagline: event.target.value }))
                    }
                    placeholder="Build and optimize full-funnel campaigns from one command center."
                    required
                  />
                </label>

                <label className="form-group">
                  <span className="form-label">Description *</span>
                  <textarea
                    className="form-textarea"
                    value={form.description}
                    spellCheck
                    onChange={(event) =>
                      setForm((current) => ({ ...current, description: event.target.value }))
                    }
                    placeholder="Explain what this skill does and what outcomes buyers can expect."
                    required
                  />
                </label>

                <label className="form-group">
                  <span className="form-label">Example usage <span style={{ opacity: 0.5, fontWeight: 400 }}>(optional)</span></span>
                  <input
                    className="form-input"
                    type="text"
                    value={form.exampleUsage}
                    autoComplete="off"
                    spellCheck
                    onChange={(event) =>
                      setForm((current) => ({ ...current, exampleUsage: event.target.value }))
                    }
                    placeholder="Audit my smart contract for reentrancy bugs before mainnet"
                  />
                  <span style={{ fontSize: '0.74rem', color: 'var(--color-text-tertiary)', marginTop: '4px', display: 'block' }}>
                    Write in first person ("my"). Shown as "your" on the listing — and pasted with the install command as a ready-to-run AI prompt.
                  </span>
                </label>

                <label className="form-group">
                  <span className="form-label">Use cases <span style={{ opacity: 0.5, fontWeight: 400 }}>(comma separated, optional)</span></span>
                  <input
                    className="form-input"
                    type="text"
                    value={form.useCases}
                    autoComplete="off"
                    spellCheck
                    onChange={(event) =>
                      setForm((current) => ({ ...current, useCases: event.target.value }))
                    }
                    placeholder="Audit smart contracts, Check for reentrancy bugs, Generate audit reports"
                  />
                  <span style={{ fontSize: '0.74rem', color: 'var(--color-text-tertiary)', marginTop: '4px', display: 'block' }}>
                    Key capabilities of this skill. Shown in the &quot;What it can do&quot; section on the listing page.
                  </span>
                </label>

                {!form.isPrivate && (
                  <>
                    <div className="publish-grid">
                      <label className="form-group">
                        <span className="form-label">Category *</span>
                        <select
                          className="form-select"
                          value={form.category}
                          onChange={(event) =>
                            setForm((current) => ({
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
                          value={form.priceUsdc}
                          autoComplete="off"
                          spellCheck={false}
                          onChange={(event) =>
                            setForm((current) => ({ ...current, priceUsdc: event.target.value }))
                          }
                          placeholder="9.99"
                          required
                        />
                      </label>
                    </div>

                    <label className="form-group">
                      <span className="form-label">Tags (comma separated) *</span>
                      <input
                        className="form-input"
                        type="text"
                        value={form.tags}
                        autoComplete="off"
                        spellCheck={false}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, tags: event.target.value }))
                        }
                        placeholder="growth, automation, gtm"
                        required
                      />
                    </label>
                  </>
                )}

                {/* Package Source Selection */}
                <div className="publish-source-selection" style={{
                  border: '1px solid rgba(255, 196, 129, 0.08)',
                  borderRadius: '12px',
                  padding: '20px',
                  background: 'rgba(255, 196, 129, 0.01)',
                  marginBottom: '20px',
                  marginTop: '12px',
                  display: 'grid',
                  gap: '16px'
                }}>
                  <div>
                    <span className="form-label" style={{ marginBottom: '4px', display: 'block', fontWeight: 600 }}>Skill Package Source *</span>
                    <p style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                      Provide the executable code package for this skill.
                    </p>
                  </div>

                  {/* Toggle buttons */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      className={`btn ${sourceType === 'upload' ? 'btn-primary' : 'btn-outline'} btn-sm`}
                      onClick={() => setSourceType('upload')}
                      style={{ fontSize: '0.8rem', padding: '6px 14px' }}
                    >
                      Upload Folder
                    </button>
                    <button
                      type="button"
                      className={`btn ${sourceType === 'github' ? 'btn-primary' : 'btn-outline'} btn-sm`}
                      onClick={() => setSourceType('github')}
                      style={{ fontSize: '0.8rem', padding: '6px 14px' }}
                    >
                      Link GitHub
                    </button>
                  </div>

                  {/* Conditionally rendered inputs */}
                  {sourceType === 'upload' ? (
                    <div style={{ display: 'grid', gap: '12px' }}>
                      <div style={{ display: 'grid', gap: '8px' }}>
                        <span className="form-label" style={{ fontSize: '0.74rem' }}>Select Skill Folder</span>
                        <label 
                          className="btn btn-outline btn-sm" 
                          style={{ 
                            cursor: 'pointer',
                            display: 'inline-flex',
                            width: 'fit-content',
                            alignItems: 'center'
                          }}
                        >
                          Choose Files
                          <input
                            type="file"
                            // @ts-ignore
                            webkitdirectory=""
                            // @ts-ignore
                            directory=""
                            multiple
                            onChange={handleFolderUpload}
                            style={{ display: 'none' }}
                          />
                        </label>
                      </div>
                      {uploadStatus && (
                        <p style={{
                          fontSize: '0.8rem',
                          margin: 0,
                          color: uploadStatus.includes('Successfully') ? 'var(--color-accent-warm-light)' : '#ffe3be'
                        }}>
                          {uploadStatus}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gap: '16px' }}>
                      <label className="form-group" style={{ margin: 0 }}>
                        <span className="form-label" style={{ fontSize: '0.74rem' }}>GitHub Link *</span>
                        <input
                          className="form-input"
                          type="url"
                          value={githubUrl}
                          onChange={(e) => setGithubUrl(e.target.value)}
                          placeholder="https://github.com/username/repo/tree/main/skills/my-skill"
                          required={sourceType === 'github'}
                        />
                      </label>
                    </div>
                  )}
                </div>

                <div className="publish-actions">
                  <button type="submit" className="btn btn-primary" disabled={isPublishing}>
                    {isPublishing ? 'Publishing…' : 'Publish skill'}
                  </button>
                  <Link href="/docs#publish-cli" className="btn btn-outline">
                    CLI docs <ArrowRight size={14} />
                  </Link>
                </div>
              </form>

              {publishError && <p className="profile-error">{publishError}</p>}

              {publishedSkillPath && (
                <div className="publish-success">
                  <p>Listing saved successfully.</p>
                  <Link href={publishedSkillPath} className="publish-success-link">
                    Open listing <ExternalLink size={13} />
                  </Link>
                </div>
              )}
            </section>

            <aside className="publish-sidebar">
              <h2>Your published listings</h2>
              {publisherSkills === undefined ? (
                <p className="profile-empty-list">Loading listings…</p>
              ) : publisherSkills.length === 0 ? (
                <p className="profile-empty-list">No listings yet. Publish your first skill to see it here.</p>
              ) : (
                <div className="publish-skill-list">
                  {publisherSkills.map((skill) => (
                    <article key={skill._id} className="publish-skill-item">
                      <div>
                        <p className="publish-skill-name">{skill.name}</p>
                        <p className="publish-skill-meta mono">@{skill.author}/{skill.slug}</p>
                      </div>
                      <Link href={`/skills/${skill.author}/${skill.slug}`} className="publish-edit-link">
                        Edit <ArrowRight size={13} />
                      </Link>
                    </article>
                  ))}
                </div>
              )}
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}
