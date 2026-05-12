"use client";

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Bookmark, ArrowUpRight, Wallet } from 'lucide-react'
import { useQuery } from 'convex/react'
import { useSolanaWallet } from '@/contexts/SolanaWalletContext'
import { api } from '../../../convex/_generated/api'

function categoryClass(cat: string) {
  const known = [
    'skill', 'strategy', 'blueprint', 'security', 'automation',
    'data', 'ai-ml', 'platform', 'development', 'cloud', 'testing',
    'documents', 'cloud-infra', 'productivity', 'design', 'media', 'library',
  ]
  return known.includes(cat) ? `sk-cat-pill sk-cat-pill--${cat}` : 'sk-cat-pill sk-cat-pill--skill'
}

function slugifyPackName(name: string) {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return slug || 'leverbrain-lab-pack'
}

export default function LabPage() {
  const { connected, walletAddress } = useSolanaWallet()
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([])
  const [packName, setPackName] = useState('my-lab-pack')
  const [copiedState, setCopiedState] = useState<'config' | 'command' | null>(null)

  const savedSkills = useQuery(
    api.skills.getSavedSkills,
    connected && walletAddress ? { walletAddress } : 'skip'
  )

  const sorted = useMemo(() => {
    if (!savedSkills) return []
    return [...savedSkills].sort((a, b) => (b.savedAt ?? 0) - (a.savedAt ?? 0))
  }, [savedSkills])

  const selectedSet = useMemo(() => new Set(selectedSkillIds), [selectedSkillIds])
  const selectedCount = selectedSkillIds.length
  const allSelected = sorted.length > 0 && selectedCount === sorted.length

  const selectedSkills = useMemo(
    () => sorted.filter((item) => selectedSet.has(item.skillId)),
    [selectedSet, sorted]
  )

  const packFile = `${slugifyPackName(packName)}.json`
  const packConfig = useMemo(() => ({
    name: packName.trim() || 'My lab pack',
    source: 'leverbrain-lab',
    createdAt: new Date().toISOString(),
    skills: selectedSkills.map((item) => ({
      id: item.skillId,
      author: item.skillAuthor,
      slug: item.skillSlug,
      name: item.skillName,
      category: item.skillCategory,
    })),
  }), [packName, selectedSkills])
  const packConfigJson = useMemo(() => JSON.stringify(packConfig, null, 2), [packConfig])
  const packExportCommand = useMemo(
    () => `cat > ${packFile} <<'JSON'\n${packConfigJson}\nJSON`,
    [packConfigJson, packFile]
  )

  const handleToggleSkill = (skillId: string) => {
    setSelectedSkillIds((current) =>
      current.includes(skillId)
        ? current.filter((id) => id !== skillId)
        : [...current, skillId]
    )
  }

  const handleSelectAll = () => {
    setSelectedSkillIds(sorted.map((item) => item.skillId))
  }

  const handleClearSelection = () => {
    setSelectedSkillIds([])
  }

  const handleCopy = async (value: string, mode: 'config' | 'command') => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedState(mode)
      window.setTimeout(() => setCopiedState(null), 1200)
    } catch (error) {
      console.error('Failed to copy packed config', error)
    }
  }

  const handleExportFile = () => {
    const blob = new Blob([packConfigJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = packFile
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="config-page">
      <div className="container">
        {!connected || !walletAddress ? (
          <section className="config-connect-card">
            <Wallet size={18} />
            <h2>Connect your wallet</h2>
            <p>Connect to see skills you&apos;ve saved to your lab.</p>
          </section>
        ) : (
          <section className="config-surface animate-fade-in-up">
            <header className="config-header">
              <div>
                <p className="config-kicker">Lab</p>
                <h1 className="config-title">Saved skills</h1>
              </div>
              <div className="config-header-meta">
                <span className="config-count">{sorted.length} saved</span>
                <Link href="/skills" className="btn btn-outline btn-sm">
                  Browse marketplace <ArrowUpRight size={13} />
                </Link>
              </div>
            </header>

            {savedSkills === undefined ? (
              <p className="config-loading">Loading your lab...</p>
            ) : sorted.length === 0 ? (
              <div className="config-empty">
                <Bookmark size={28} strokeWidth={1.5} />
                <p>No saved skills yet.</p>
                <p className="config-empty-sub">
                  Open any skill page and use the Add to Lab button to store it here.
                </p>
                <Link href="/skills" className="btn btn-primary btn-sm">
                  Browse skills
                </Link>
              </div>
            ) : (
              <div className="config-grid">
                <div className="config-grid-head">
                  <span className="config-grid-check-cell">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={() => (allSelected ? handleClearSelection() : handleSelectAll())}
                      aria-label={allSelected ? 'Clear selected skills' : 'Select all saved skills'}
                    />
                  </span>
                  <span>Skill</span>
                  <span>Author</span>
                  <span>Category</span>
                  <span>Saved</span>
                </div>
                {sorted.map((item, i) => (
                  <article
                    key={item._id}
                    className={`config-row animate-fade-in-up animate-delay-${Math.min(i % 5, 4)}`}
                  >
                    <span className="config-grid-check-cell">
                      <input
                        type="checkbox"
                        checked={selectedSet.has(item.skillId)}
                        onChange={() => handleToggleSkill(item.skillId)}
                        aria-label={`Select ${item.skillName}`}
                      />
                    </span>
                    <div className="config-row-main">
                      <Link href={`/skills/${item.skillAuthor}/${item.skillSlug}`} className="config-row-link">
                        <p className="config-row-name">{item.skillName}</p>
                      </Link>
                    </div>
                    <span className="config-row-author">@{item.skillAuthor}</span>
                    <span className={categoryClass(item.skillCategory)}>
                      {item.skillCategory}
                    </span>
                    <span className="config-row-date">
                      {item.savedAt ? new Date(item.savedAt).toLocaleDateString() : '—'}
                    </span>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {connected && walletAddress && sorted.length > 0 && (
          <section className="config-pack-tool animate-fade-in-up">
            <header className="config-pack-head">
              <div>
                <p className="config-kicker">Pack</p>
                <h2>Build one shareable lab config</h2>
              </div>
              <span className="config-count">{selectedCount} selected</span>
            </header>

            <div className="config-pack-controls">
              <div className="config-pack-name">
                <label className="config-pack-name-field" htmlFor="pack-name">
                  Pack name
                </label>
                <input
                  id="pack-name"
                  className="config-pack-name-input"
                  value={packName}
                  onChange={(event) => setPackName(event.target.value)}
                  placeholder="my-lab-pack"
                  autoComplete="off"
                />
              </div>
              <div className="config-pack-actions">
                <button type="button" className="btn btn-outline btn-sm" onClick={handleSelectAll}>
                  Select all
                </button>
                <button type="button" className="btn btn-outline btn-sm" onClick={handleClearSelection}>
                  Clear
                </button>
              </div>
            </div>

            <p className="config-pack-help">
              Choose saved skills, export one config, then paste the command in any CLI or agent terminal to recreate it.
            </p>

            <pre className="config-pack-preview">{packConfigJson}</pre>

            <div className="config-pack-export-head">
              <p>Export command</p>
              <span className="config-row-date">Creates {packFile}</span>
            </div>
            <pre className="config-pack-command">{packExportCommand}</pre>

            <div className="config-pack-export-actions">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleExportFile}
                disabled={selectedCount === 0}
              >
                Export JSON
              </button>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => void handleCopy(packConfigJson, 'config')}
                disabled={selectedCount === 0}
              >
                {copiedState === 'config' ? 'Copied config' : 'Copy config'}
              </button>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => void handleCopy(packExportCommand, 'command')}
                disabled={selectedCount === 0}
              >
                {copiedState === 'command' ? 'Copied command' : 'Copy command'}
              </button>
            </div>
          </section>
        )}

        <section className="land-showcase config-showcase">
          <div className="land-red-card animate-fade-in-up">
            <div className="land-red-card-content">
              <h3>Share your edge</h3>
              <p className="land-agent-headline land-agent-headline--red">Publish the skills that helped you win, and let others build faster.</p>
              <Link href="/publish" className="btn btn-red">
                Publish a skill <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
