"use client";

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Bookmark, ArrowUpRight, Wallet, Copy, Check, Trash2 } from 'lucide-react'
import { useQuery, useMutation } from 'convex/react'
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

function slugifyConfigName(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 32)
}

export default function LabPage() {
  const { connected, walletAddress } = useSolanaWallet()
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([])
  const [configNameInput, setConfigNameInput] = useState('cfg')
  const [hasInitializedDefaultName, setHasInitializedDefaultName] = useState(false)
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [expandedConfigs, setExpandedConfigs] = useState<Record<string, boolean>>({})

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    e.currentTarget.style.setProperty('--mouse-x', `${x}%`)
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`)
  }
  
  // Save status messages
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const toggleConfigExpand = (configId: string) => {
    setExpandedConfigs((prev) => ({
      ...prev,
      [configId]: !prev[configId],
    }))
  }

  const formatDateDDMMYY = (timestamp?: number) => {
    if (!timestamp) return '—'
    const date = new Date(timestamp)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = String(date.getFullYear()).slice(-2)
    return `${day}/${month}/${year}`
  }

  // DB Queries
  const savedSkills = useQuery(
    api.skills.getSavedSkills,
    connected && walletAddress ? { walletAddress } : 'skip'
  )
  const profile = useQuery(
    api.skills.getProfile,
    connected && walletAddress ? { walletAddress } : 'skip'
  )
  const myConfigs = useQuery(
    api.skills.getConfigsByWallet,
    connected && walletAddress ? { walletAddress } : 'skip'
  )
  const myPublishedSkills = useQuery(
    api.skills.getSkillsByCreatorWallet,
    connected && walletAddress ? { creatorWallet: walletAddress } : 'skip'
  )

  // DB Mutations
  const saveConfig = useMutation(api.skills.saveConfig)
  const deleteConfig = useMutation(api.skills.deleteConfig)
  const toggleSavedSkill = useMutation(api.skills.toggleSavedSkill)
  const deleteSkill = useMutation(api.skills.deleteSkillByAuthorSlug)

  useEffect(() => {
    setHasInitializedDefaultName(false)
  }, [walletAddress])

  useEffect(() => {
    if (myConfigs && !hasInitializedDefaultName) {
      const existingNames = new Set(myConfigs.map((c) => c.name.toLowerCase()))
      if (!existingNames.has('cfg')) {
        setConfigNameInput('cfg')
      } else {
        let counter = 2
        while (existingNames.has(`cfg${counter}`)) {
          counter++
        }
        setConfigNameInput(`cfg${counter}`)
      }
      setHasInitializedDefaultName(true)
    }
  }, [myConfigs, hasInitializedDefaultName])

  const handleToggleSavedSkill = async (skill: any) => {
    if (!connected || !walletAddress) return
    try {
      await toggleSavedSkill({
        walletAddress,
        skillId: skill.skillId || skill.id,
        skillAuthor: skill.skillAuthor || skill.author || 'unknown',
        skillSlug: skill.skillSlug || skill.slug || 'unknown',
        skillName: skill.skillName || skill.name || 'Unknown Skill',
        skillCategory: skill.skillCategory || skill.category || 'skill',
      })
    } catch (err) {
      console.error('Failed to toggle saved skill', err)
    }
  }

  const sortedSkills = useMemo(() => {
    if (!savedSkills) return []
    return [...savedSkills].sort((a, b) => (b.savedAt ?? 0) - (a.savedAt ?? 0))
  }, [savedSkills])

  const selectedSet = useMemo(() => new Set(selectedSkillIds), [selectedSkillIds])
  const selectedCount = selectedSkillIds.length
  const allSelected = sortedSkills.length > 0 && selectedCount === sortedSkills.length

  const selectedSkillsData = useMemo(() => {
    return sortedSkills
      .filter((item) => selectedSet.has(item.skillId))
      .map((item) => ({
        id: item.skillId,
        author: item.skillAuthor,
        slug: item.skillSlug,
        name: item.skillName,
      }))
  }, [selectedSet, sortedSkills])

  // Handlers
  const handleToggleSkill = (skillId: string) => {
    setSelectedSkillIds((current) =>
      current.includes(skillId)
        ? current.filter((id) => id !== skillId)
        : [...current, skillId]
    )
  }

  const handleSelectAll = () => {
    setSelectedSkillIds(sortedSkills.map((item) => item.skillId))
  }

  const handleClearSelection = () => {
    setSelectedSkillIds([])
  }

  const handleCopyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      window.setTimeout(() => setCopiedText(null), 1500)
    } catch (err) {
      console.error('Failed to copy', err)
    }
  }

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!connected || !walletAddress) return
    
    const cleanName = slugifyConfigName(configNameInput)
    if (!cleanName) {
      setSaveStatus({ type: 'error', message: 'Please enter a valid configuration name.' })
      return
    }

    if (selectedCount === 0) {
      setSaveStatus({ type: 'error', message: 'Please select at least one skill to save.' })
      return
    }

    setIsSaving(true)
    setSaveStatus(null)

    try {
      await saveConfig({
        walletAddress,
        name: cleanName,
        skills: selectedSkillsData,
      })
      setSaveStatus({ type: 'success', message: `Configuration "${cleanName}" saved successfully!` })
    } catch (err: any) {
      setSaveStatus({ type: 'error', message: err.message || 'Failed to save configuration.' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteConfig = async (name: string) => {
    if (!connected || !walletAddress) return
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return

    try {
      await deleteConfig({ walletAddress, name })
    } catch (err) {
      console.error('Failed to delete config', err)
    }
  }

  const handleDeleteSkill = async (author: string, slug: string) => {
    if (!connected || !walletAddress) return
    if (!confirm(`Are you sure you want to delete the published skill "${author}/${slug}"? This action cannot be undone.`)) return
    try {
      await deleteSkill({
        author,
        slug,
        publisherWallet: walletAddress,
      })
    } catch (err) {
      console.error('Failed to delete skill', err)
    }
  }

  // Generate individual installs fallback string
  const individualInstallCmd = useMemo(() => {
    if (selectedSkillsData.length === 0) return ''
    return selectedSkillsData.map(s => `npx -y leverbrain get ${s.author}/${s.slug}`).join(' && ')
  }, [selectedSkillsData])

  const userHandle = profile?.handle ? `@${profile.handle.replace(/^@/, '')}` : null
  const cleanConfigName = slugifyConfigName(configNameInput)
  const shareableCmd = userHandle && cleanConfigName 
    ? `npx leverbrain cfg ${userHandle.slice(1)}/${cleanConfigName}`
    : null

  return (
    <div className="config-page">
      <div className="container">
        {!connected || !walletAddress ? (
          <section className="config-connect-card">
            <Wallet size={18} />
            <h2>Connect your wallet</h2>
            <p>Connect to see saved skills and build custom developer configurations.</p>
          </section>
        ) : (
          <div style={{ display: 'grid', gap: '48px' }}>
            
            {/* Header */}
            <header className="config-header">
              <div>
                <p className="config-kicker">Manage</p>
                <h1 className="config-title">Configurations</h1>
              </div>
              <div className="config-header-meta">
                <span className="config-count">{sortedSkills.length} saved skills</span>
                <Link href="/skills" className="btn btn-outline btn-sm">
                  Browse marketplace <ArrowUpRight size={13} />
                </Link>
              </div>
            </header>

            {/* Main Config Builder Grid */}
            <div className="config-main-grid" style={{
              gridTemplateColumns: sortedSkills.length > 0 ? undefined : '1fr'
            }}>
              
              {/* Left Side: Saved Skills List */}
              <section className="config-surface" style={{ borderBottom: 'none' }}>
                <h2 style={{ fontSize: '1.15rem', marginBottom: '24px', fontWeight: 600 }}>
                  Select Skills to Include
                </h2>
                
                {savedSkills === undefined ? (
                  <p className="config-loading">Loading saved skills...</p>
                ) : sortedSkills.length === 0 ? (
                  <div className="config-empty" style={{ border: '1px dashed rgba(255,190,124,0.15)', borderRadius: '12px', padding: '36px' }}>
                    <Bookmark size={28} strokeWidth={1.5} />
                    <p>No saved skills yet.</p>
                    <p className="config-empty-sub">
                      Bookmark skills from the marketplace to pack them into custom configurations.
                    </p>
                    <Link href="/skills" className="btn btn-primary btn-sm">
                      Browse skills
                    </Link>
                  </div>
                ) : (
                  <div className="config-grid">
                    <div className="config-grid-head" style={{ gridTemplateColumns: '48px minmax(0, 1fr) 120px 60px' }}>
                      <span className="config-grid-check-cell">
                        <input
                          type="checkbox"
                          checked={allSelected}
                          onChange={() => (allSelected ? handleClearSelection() : handleSelectAll())}
                          aria-label={allSelected ? 'Clear all selections' : 'Select all saved skills'}
                        />
                      </span>
                      <span style={{ textAlign: 'left' }}>Skill</span>
                      <span>Author</span>
                      <span></span>
                    </div>
                    {sortedSkills.map((item, i) => {
                      const isPrivate = myPublishedSkills?.some(ps => ps.skillId === item.skillId && ps.isPrivate)
                      return (
                        <article
                          key={item._id}
                          className={`config-row animate-fade-in-up animate-delay-${Math.min(i % 5, 4)}`}
                          style={{ gridTemplateColumns: '48px minmax(0, 1fr) 120px 60px' }}
                          onMouseMove={handleMouseMove}
                        >
                          <span className="config-grid-check-cell">
                            <input
                              type="checkbox"
                              checked={selectedSet.has(item.skillId)}
                              onChange={() => handleToggleSkill(item.skillId)}
                              aria-label={`Select ${item.skillName}`}
                            />
                          </span>
                          <div className="config-row-main" style={{ textAlign: 'left' }}>
                            <Link href={`/skills/${item.skillAuthor}/${item.skillSlug}`} className="config-row-link" style={{ gap: '8px', display: 'inline-flex', alignItems: 'center' }}>
                              <span className="config-row-name" style={{ fontSize: '0.94rem' }}>{item.skillName}</span>
                              {isPrivate && (
                                <span style={{
                                  fontSize: '0.55rem',
                                  background: 'rgba(255, 110, 90, 0.15)',
                                  color: 'var(--color-red-light)',
                                  border: '1px solid rgba(255, 110, 90, 0.3)',
                                  padding: '1px 5px',
                                  borderRadius: '3px',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.05em',
                                  fontWeight: 600,
                                  whiteSpace: 'nowrap'
                                }}>
                                  Private
                                </span>
                              )}
                            </Link>
                          </div>
                          <span className="config-row-author" style={{ fontSize: '0.72rem' }}>@{item.skillAuthor}</span>
                          
                          {/* Trash button to remove from lab */}
                          <button
                            type="button"
                            className="btn btn-outline btn-sm"
                            onClick={() => handleToggleSavedSkill(item)}
                            title="Remove from lab"
                            style={{
                              padding: '6px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              color: 'var(--color-text-tertiary)',
                              borderColor: 'transparent',
                              background: 'transparent',
                              justifySelf: 'center',
                              cursor: 'pointer',
                              outline: 'none',
                              transition: 'all 0.15s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = '#ff7e66';
                              e.currentTarget.style.borderColor = 'rgba(255, 126, 102, 0.2)';
                              e.currentTarget.style.background = 'rgba(255, 126, 102, 0.05)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = 'var(--color-text-tertiary)';
                              e.currentTarget.style.borderColor = 'transparent';
                              e.currentTarget.style.background = 'transparent';
                            }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </article>
                      )
                    })}
                  </div>
                )}
              </section>

              {/* Right Side: Config Pack Details */}
              {sortedSkills.length > 0 && (
                <section style={{
                  background: 'rgba(255, 196, 129, 0.01)',
                  border: '1px solid rgba(255, 196, 129, 0.08)',
                  borderRadius: '16px',
                  padding: '28px',
                  display: 'grid',
                  gap: '24px'
                }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '6px' }}>Save Config Pack</h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                      Group your selected skills into a single command you can run anywhere.
                    </p>
                  </div>

                  <form onSubmit={handleSaveConfig} style={{ display: 'grid', gap: '16px' }}>
                    <div style={{ display: 'grid', gap: '8px' }}>
                      <label htmlFor="config-name-input" style={{ fontSize: '0.66rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-tertiary)' }}>
                        Configuration Name
                      </label>
                      <input
                        id="config-name-input"
                        type="text"
                        value={configNameInput}
                        onChange={(e) => setConfigNameInput(e.target.value)}
                        placeholder="e.g. my-stack"
                        style={{
                          background: 'rgba(0, 0, 0, 0.2)',
                          border: '1px solid rgba(255, 196, 129, 0.12)',
                          color: 'var(--color-text-primary)',
                          borderRadius: '8px',
                          padding: '10px 14px',
                          fontSize: '0.9rem',
                          fontFamily: 'var(--font-mono), monospace'
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <button
                        type="submit"
                        className="btn btn-primary btn-sm"
                        disabled={selectedCount === 0 || isSaving}
                      >
                        {isSaving ? 'Saving...' : 'Save Config'}
                      </button>
                      <span style={{ fontSize: '0.74rem', color: 'var(--color-text-tertiary)' }}>
                        {selectedCount} skills selected
                      </span>
                    </div>

                    {saveStatus && (
                      <p style={{
                        fontSize: '0.8rem',
                        margin: 0,
                        color: saveStatus.type === 'success' ? 'var(--color-accent-warm-light)' : '#ff9a88'
                      }}>
                        {saveStatus.message}
                      </p>
                    )}
                  </form>

                  {/* Shareable Command Display */}
                  {selectedCount > 0 && (
                    <div style={{ display: 'grid', gap: '16px', borderTop: '1px solid rgba(255, 196, 129, 0.08)', paddingTop: '20px' }}>
                      <div>
                        <h4 style={{ fontSize: '0.88rem', fontWeight: 600, marginBottom: '4px' }}>Install Command</h4>
                        <p style={{ fontSize: '0.78rem', color: 'var(--color-text-tertiary)', margin: 0 }}>
                          Run this command in any terminal to download all selected skills.
                        </p>
                      </div>                      {shareableCmd ? (
                        <div style={{ display: 'grid', gap: '8px' }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            background: 'rgba(6, 12, 18, 0.9)',
                            border: '1px solid rgba(255, 196, 129, 0.12)',
                            borderRadius: '8px',
                            padding: '10px 14px',
                            justifyContent: 'space-between',
                            gap: '12px',
                            minWidth: 0
                          }}>
                            <div style={{ minWidth: 0, flex: 1, overflowX: 'auto' }}>
                              <code style={{
                                fontFamily: 'var(--font-mono), monospace',
                                fontSize: '0.78rem',
                                color: 'var(--color-accent-warm-light)',
                                whiteSpace: 'nowrap'
                              }}>
                                {shareableCmd}
                              </code>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleCopyText(shareableCmd)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-tertiary)', display: 'flex', padding: '4px' }}
                              aria-label="Copy install command"
                            >
                              {copiedText === shareableCmd ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div style={{
                          background: 'rgba(255, 196, 129, 0.02)',
                          border: '1px dashed rgba(255, 196, 129, 0.15)',
                          borderRadius: '8px',
                          padding: '14px',
                          fontSize: '0.78rem',
                          color: 'var(--color-text-secondary)'
                        }}>
                          <strong>No custom handle registered.</strong> Set a handle on your <Link href="/profile" style={{ color: 'var(--color-accent-warm-light)', textDecoration: 'underline' }}>Profile page</Link> to generate a personal config command (e.g. <code>npx leverbrain cfg handle/name</code>).
                        </div>
                      )}

                      {/* Individual command fallback */}
                      <div style={{ display: 'grid', gap: '8px' }}>
                        <span style={{ fontSize: '0.66rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-tertiary)' }}>
                          Alternative (Individual Installs)
                        </span>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          background: 'rgba(6, 12, 18, 0.8)',
                          border: '1px solid rgba(255, 255, 255, 0.04)',
                          borderRadius: '8px',
                          padding: '10px 14px',
                          justifyContent: 'space-between',
                          gap: '12px',
                          minWidth: 0
                        }}>
                          <div style={{ minWidth: 0, flex: 1, overflowX: 'auto' }}>
                            <code style={{
                              fontFamily: 'var(--font-mono), monospace',
                              fontSize: '0.72rem',
                              color: 'var(--color-text-secondary)',
                              whiteSpace: 'nowrap'
                            }}>
                              {individualInstallCmd}
                            </code>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopyText(individualInstallCmd)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-tertiary)', display: 'flex', padding: '4px' }}
                            aria-label="Copy individual commands"
                          >
                            {copiedText === individualInstallCmd ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </section>
              )}
            </div>

            {/* Section: Saved Configurations List */}
            {connected && walletAddress && myConfigs && myConfigs.length > 0 && (
              <section style={{
                borderTop: '1px solid rgba(255, 196, 129, 0.12)',
                paddingTop: '40px',
                marginTop: '12px'
              }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '20px' }}>Your configs</h2>
                
                <div style={{ display: 'grid', gap: '16px' }}>
                  {myConfigs.map((cfg) => {
                    const cfgCmd = userHandle 
                      ? `npx leverbrain cfg ${userHandle.slice(1)}/${cfg.name}`
                      : `npx leverbrain cfg YOUR_HANDLE/${cfg.name}`
                    const isExpanded = !!expandedConfigs[cfg._id]
                    
                    return (
                      <div key={cfg._id} style={{
                        background: 'rgba(255, 255, 255, 0.01)',
                        border: '1px solid rgba(255, 196, 129, 0.06)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        transition: 'border-color 0.2s ease',
                      }}>
                        {/* Interactive Header Row */}
                        <div 
                          onClick={() => toggleConfigExpand(cfg._id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '18px 24px',
                            cursor: 'pointer',
                            flexWrap: 'wrap',
                            gap: '16px',
                            background: isExpanded ? 'rgba(255, 196, 129, 0.02)' : 'transparent',
                            borderBottom: isExpanded ? '1px solid rgba(255, 196, 129, 0.06)' : 'none',
                          }}
                        >
                          <div style={{ display: 'grid', gap: '4px' }}>
                            <h3 style={{ fontSize: '0.96rem', fontWeight: 600, margin: 0, fontFamily: 'var(--font-mono)' }}>
                              {cfg.name} {isExpanded ? '▴' : '▾'}
                            </h3>
                            <span style={{ fontSize: '0.72rem', color: 'var(--color-text-tertiary)' }}>
                              {cfg.skills?.length || 0} skills • Saved {formatDateDDMMYY(cfg.createdAt)}
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', minWidth: 0, flex: 1, justifySelf: 'end', justifyContent: 'flex-end' }} onClick={(e) => e.stopPropagation()}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              background: 'rgba(6, 12, 18, 0.8)',
                              border: '1px solid rgba(255, 196, 129, 0.08)',
                              borderRadius: '6px',
                              padding: '6px 12px',
                              gap: '8px',
                              minWidth: 0,
                              flex: 1,
                              maxWidth: '420px'
                            }}>
                              <div style={{ minWidth: 0, flex: 1, overflowX: 'auto' }}>
                                <code style={{ fontSize: '0.72rem', color: 'var(--color-accent-warm-light)', whiteSpace: 'nowrap' }}>
                                  {cfgCmd}
                                </code>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleCopyText(cfgCmd)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-tertiary)', padding: '2px', display: 'flex' }}
                                aria-label="Copy configuration command"
                              >
                                {copiedText === cfgCmd ? <Check size={12} className="text-success" /> : <Copy size={12} />}
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleDeleteConfig(cfg.name)}
                              style={{
                                background: 'rgba(255, 100, 100, 0.05)',
                                border: '1px solid rgba(255, 100, 100, 0.15)',
                                color: '#ff8888',
                                cursor: 'pointer',
                                borderRadius: '6px',
                                padding: '8px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.15s ease'
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 100, 100, 0.1)' }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 100, 100, 0.05)' }}
                              aria-label="Delete configuration"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>

                        {/* Collapsible Details */}
                        {isExpanded && (
                          <div style={{
                            padding: '16px 24px',
                            background: 'rgba(0, 0, 0, 0.15)',
                            display: 'grid',
                            gap: '12px',
                            borderTop: '1px solid rgba(255, 196, 129, 0.02)'
                          }}>
                            <h4 style={{
                              fontSize: '0.68rem',
                              color: 'var(--color-text-tertiary)',
                              margin: 0,
                              textTransform: 'uppercase',
                              letterSpacing: '0.08em',
                            }}>
                              Skills included ({cfg.skills?.length || 0})
                            </h4>
                            <div style={{ display: 'grid', gap: '8px' }}>
                              {cfg.skills?.map((skill, index) => (
                                <div key={skill.id || index} style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  fontSize: '0.84rem',
                                  padding: '6px 0',
                                  borderBottom: index < (cfg.skills.length - 1) ? '1px solid rgba(255, 196, 129, 0.04)' : 'none'
                                }}>
                                  <Link
                                    href={`/skills/${skill.author}/${skill.slug}`}
                                    className="config-row-link"
                                    style={{
                                      minHeight: 'unset',
                                      color: 'var(--color-text-primary)',
                                      fontWeight: 500,
                                      transition: 'color 0.2s ease'
                                    }}
                                  >
                                    {skill.name}
                                  </Link>
                                  <span style={{ fontSize: '0.74rem', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>
                                    @{skill.author}/{skill.slug}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </section>
            )}

            {/* Section: Your Published Skills */}
            {connected && walletAddress && myPublishedSkills && myPublishedSkills.length > 0 && (
              <section style={{
                borderTop: '1px solid rgba(255, 196, 129, 0.12)',
                paddingTop: '40px',
                marginTop: '12px'
              }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '20px' }}>Your published skills</h2>
                <div style={{ display: 'grid', gap: '16px' }}>
                  {myPublishedSkills.map((skill) => {
                    const isSaved = sortedSkills.some(s => s.skillId === skill.skillId)
                    return (
                      <div key={skill._id} style={{
                        background: 'rgba(255, 255, 255, 0.01)',
                        border: '1px solid rgba(255, 196, 129, 0.06)',
                        borderRadius: '12px',
                        padding: '18px 24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '16px',
                      }}>
                        <div style={{ display: 'grid', gap: '4px' }}>
                          <h3 style={{ fontSize: '0.96rem', fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {skill.name}
                            {skill.isPrivate && (
                              <span style={{
                                fontSize: '0.64rem',
                                background: 'rgba(255, 110, 90, 0.15)',
                                color: 'var(--color-red-light)',
                                border: '1px solid rgba(255, 110, 90, 0.3)',
                                padding: '1px 6px',
                                borderRadius: '4px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                fontWeight: 600
                              }}>
                                Private
                              </span>
                            )}
                          </h3>
                          <span style={{ fontSize: '0.72rem', color: 'var(--color-text-tertiary)' }}>
                            @{skill.author}/{skill.slug} • {skill.category}
                          </span>
                        </div>

                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <button
                            type="button"
                            className={`btn ${isSaved ? 'btn-outline' : 'btn-primary'} btn-sm`}
                            onClick={() => handleToggleSavedSkill(skill)}
                          >
                            {isSaved ? 'Remove from Lab' : 'Add to Lab'}
                          </button>
                          
                          <Link
                            href={`/skills/${skill.author}/${skill.slug}?tab=edit`}
                            className="btn btn-outline btn-sm"
                            style={{ textDecoration: 'none' }}
                          >
                            Edit
                          </Link>

                          <button
                            type="button"
                            className="btn btn-outline btn-sm"
                            onClick={() => handleDeleteSkill(skill.author, skill.slug)}
                            style={{
                              background: 'rgba(255, 100, 100, 0.05)',
                              border: '1px solid rgba(255, 100, 100, 0.15)',
                              color: '#ff8888',
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            )}

            {/* Showcase card */}
            <section className="land-showcase config-showcase">
              <div className="land-red-card">
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
        )}
      </div>
    </div>
  )
}
