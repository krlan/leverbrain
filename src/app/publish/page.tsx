"use client";

import Link from 'next/link'
import { FormEvent, useMemo, useState } from 'react'
import { ArrowRight, ExternalLink, Wallet } from 'lucide-react'
import { useMutation, useQuery } from 'convex/react'
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

  const derivedAuthor = useMemo(() => {
    if (!walletAddress) {
      return null
    }
    const handle = profile?.handle?.trim().toLowerCase()
    return handle || walletFallbackAuthor(walletAddress)
  }, [profile?.handle, walletAddress])

  const onPublish = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!walletAddress || !derivedAuthor) {
      setPublishError('Connect wallet first to publish a listing.')
      return
    }

    const trimmedName = form.name.trim()
    const trimmedSlug = slugify(form.slug || form.name)
    const parsedPrice = Number(form.priceUsdc)

    if (!trimmedName || !trimmedSlug) {
      setPublishError('Name and slug are required.')
      return
    }

    if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
      setPublishError('Price must be a positive number.')
      return
    }

    const tags = form.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)

    if (tags.length === 0) {
      setPublishError('Add at least one tag.')
      return
    }

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
        whenToUse: form.whenToUse || undefined,
        readme: form.readme || undefined,
        priceUsdc: parsedPrice,
        category: form.category,
        tags,
      })

      const nextPath = `/skills/${result.author}/${result.slug}`
      setPublishedSkillPath(nextPath)
      setForm(INITIAL_FORM)
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

                <label className="form-group">
                  <span className="form-label">When to use</span>
                  <textarea
                    className="form-textarea"
                    value={form.whenToUse}
                    spellCheck
                    onChange={(event) =>
                      setForm((current) => ({ ...current, whenToUse: event.target.value }))
                    }
                    placeholder="Use this when your team needs a repeatable launch workflow."
                  />
                </label>

                <label className="form-group">
                  <span className="form-label">README content</span>
                  <textarea
                    className="form-textarea publish-readme-input mono"
                    value={form.readme}
                    spellCheck={false}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, readme: event.target.value }))
                    }
                    placeholder="# Skill README&#10;&#10;Add usage instructions, outputs, and examples."
                  />
                </label>

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
