"use client";

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, BookOpen, Layers, Search, X, Zap } from 'lucide-react'
import { useQuery } from 'convex/react'
import { type SkillListing } from '@/lib/skills-data'
import { mergeSkillPool } from '@/lib/skill-pool'
import { api } from '../../convex/_generated/api'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

const CATEGORY_ICONS = {
  skill: Zap,
  strategy: Layers,
  blueprint: BookOpen,
}

const QUICK_ACTIONS = [
  { label: 'Browse all skills', href: '/skills', shortcut: '' },
  { label: 'Browse strategies', href: '/skills?category=strategy', shortcut: '' },
  { label: 'Browse blueprints', href: '/skills?category=blueprint', shortcut: '' },
  { label: 'Open your lab', href: '/lab', shortcut: '' },
  { label: 'Read the docs', href: '/docs', shortcut: '' },
]

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const convexSkills = useQuery(api.skills.listCustomSkills, {})

  const searchableSkills = mergeSkillPool(convexSkills)
  const normalizedQuery = query.trim().toLowerCase()
  const results = normalizedQuery
    ? searchableSkills
      .filter((skill) =>
        skill.name.toLowerCase().includes(normalizedQuery) ||
        skill.tagline.toLowerCase().includes(normalizedQuery) ||
        skill.description.toLowerCase().includes(normalizedQuery) ||
        skill.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery)) ||
        skill.author.toLowerCase().includes(normalizedQuery) ||
        skill.category.toLowerCase().includes(normalizedQuery)
      )
      .slice(0, 8)
    : []
  const showActions = !query.trim()
  const items = showActions ? QUICK_ACTIONS : results

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setActiveIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Reset index when results change
  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  const navigateTo = useCallback(
    (item: typeof QUICK_ACTIONS[0] | SkillListing) => {
      onClose()
      if ('href' in item) {
        router.push(item.href)
      } else {
        router.push(`/skills/${item.author}/${item.slug}`)
      }
    },
    [router, onClose]
  )

  const handleKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((i) => Math.min(i + 1, items.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((i) => Math.max(i - 1, 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        const item = items[activeIndex]
        if (item) navigateTo(item as SkillListing)
      }
    },
    [items, activeIndex, navigateTo, onClose]
  )

  // Keep active row visible without relying on scrollIntoView.
  useEffect(() => {
    const container = listRef.current
    const element = container?.querySelector(`[data-index="${activeIndex}"]`) as HTMLElement | null
    if (!container || !element) {
      return
    }

    const top = element.offsetTop
    const bottom = top + element.offsetHeight
    const visibleTop = container.scrollTop
    const visibleBottom = visibleTop + container.clientHeight

    if (top < visibleTop) {
      container.scrollTop = top - 6
    } else if (bottom > visibleBottom) {
      container.scrollTop = bottom - container.clientHeight + 6
    }
  }, [activeIndex])

  if (!isOpen) return null

  return (
    <div className="cmd-overlay" onClick={onClose} aria-modal="true" role="dialog" aria-label="Command palette">
      <div
        className="cmd-palette"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKey}
      >
        {/* Search input */}
        <div className="cmd-input-wrap">
          <Search size={16} className="cmd-input-icon" />
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder="Type skill, author, or tag..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search"
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button type="button" className="cmd-clear" onClick={() => setQuery('')} aria-label="Clear">
              <X size={13} />
            </button>
          )}
          <button type="button" className="cmd-close-btn" onClick={onClose} aria-label="Close palette">
            <span>ESC</span>
          </button>
        </div>

        {/* Divider */}
        <div className="cmd-divider" />

        {/* Results */}
        <div className="cmd-results" ref={listRef}>
          {showActions && (
            <p className="cmd-section-label">Quick actions</p>
          )}

          {showActions &&
            QUICK_ACTIONS.map((action, i) => (
              <button
                key={action.href}
                type="button"
                data-index={i}
                className={`cmd-item cmd-item-action ${activeIndex === i ? 'cmd-item--active' : ''}`}
                onClick={() => navigateTo(action)}
                onMouseEnter={() => setActiveIndex(i)}
              >
                <span className="cmd-item-label">{action.label}</span>
                <ArrowRight size={13} className="cmd-item-arrow" />
              </button>
            ))}

          {!showActions && results.length === 0 && (
            <div className="cmd-empty">
              <p>No results for &ldquo;{query}&rdquo;</p>
              <p className="cmd-empty-hint">Try searching by tag, category, or creator handle</p>
            </div>
          )}

          {!showActions && results.length > 0 && (
            <>
              <p className="cmd-section-label">{results.length} skill{results.length !== 1 ? 's' : ''} found</p>
              {results.map((skill, i) => {
                const CatIcon = CATEGORY_ICONS[skill.category as keyof typeof CATEGORY_ICONS] ?? Zap
                return (
                  <button
                    key={skill.id}
                    type="button"
                    data-index={i}
                    className={`cmd-item cmd-item-skill ${activeIndex === i ? 'cmd-item--active' : ''}`}
                    onClick={() => navigateTo(skill)}
                    onMouseEnter={() => setActiveIndex(i)}
                  >
                    <div className="cmd-skill-left">
                      <span className={`cmd-skill-cat cmd-skill-cat--${skill.category}`}>
                        <CatIcon size={11} />
                      </span>
                      <div className="cmd-skill-info">
                        <span className="cmd-skill-name">{skill.name}</span>
                        <span className="cmd-skill-author">@{skill.author}</span>
                      </div>
                    </div>
                    <span className={`cmd-skill-price ${skill.price === 'Free' ? 'cmd-skill-price--free' : ''}`}>
                      {skill.price}
                    </span>
                  </button>
                )
              })}
            </>
          )}
        </div>

        {/* Footer hint */}
        <div className="cmd-footer">
          <span><kbd>↑↓</kbd> Navigate</span>
          <span><kbd>↵</kbd> Open</span>
          <span><kbd>ESC</kbd> Close</span>
        </div>
      </div>
    </div>
  )
}
