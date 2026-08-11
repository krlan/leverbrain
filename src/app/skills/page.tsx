"use client";

import { Suspense, useMemo, useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Search, X, ChevronDown, LayoutGrid, List, ArrowRight } from 'lucide-react'
import { useQuery } from 'convex/react'
import posthog from 'posthog-js'
import { type SkillCategory } from '@/lib/skills-data'
import { mergeSkillPool } from '@/lib/skill-pool'
import { api } from '../../../convex/_generated/api'

interface CustomSelectOption {
  id: string
  label: string
}

interface CustomSelectProps {
  value: string
  onChange: (val: string) => void
  options: readonly CustomSelectOption[]
  ariaLabel?: string
}

function CustomSelect({ value, onChange, options, ariaLabel }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((opt) => opt.id === value) || options[0]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="sk-custom-select" ref={containerRef}>
      <button
        type="button"
        className={`sk-custom-select-trigger ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
      >
        <span>{selectedOption?.label}</span>
        <ChevronDown size={14} className="sk-custom-select-arrow" />
      </button>

      {isOpen && (
        <ul className="sk-custom-select-options" role="listbox">
          {options.map((option) => {
            const isSelected = option.id === value
            return (
              <li
                key={option.id}
                role="option"
                aria-selected={isSelected}
                className={`sk-custom-select-option ${isSelected ? 'is-selected' : ''}`}
                onClick={() => {
                  onChange(option.id)
                  setIsOpen(false)
                }}
              >
                {option.label}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

const MARKET_TYPES: { id: SkillCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'skill', label: 'Skills' },
  { id: 'strategy', label: 'Strategies' },
  { id: 'blueprint', label: 'Blueprints' },
]

const PRICE_FILTERS = [
  { id: 'all', label: 'All prices' },
  { id: 'free', label: 'Free' },
  { id: 'paid', label: 'Paid' },
] as const

const SORT_OPTIONS = [
  { id: 'popularity', label: 'Popularity' },
  { id: 'rating', label: 'Rating' },
] as const

type MarketType = SkillCategory | 'all'
type PriceFilter = 'free' | 'paid'
type SortBy = (typeof SORT_OPTIONS)[number]['id']

function getAuthorAvatarUrl(author: string) {
  const cleanAuthor = author.toLowerCase().trim()
  if (cleanAuthor === 'anthropics') return '/images/claude.png'
  if (cleanAuthor === 'composiohq') return 'https://avatars.githubusercontent.com/u/105432322?v=4'
  if (cleanAuthor === '199-biotechnologies') return 'https://avatars.githubusercontent.com/u/81938501?v=4'
  if (cleanAuthor === 'leverbrain') return '/images/levie.png'
  if (cleanAuthor === 'baoyu') return 'https://avatars.githubusercontent.com/u/648674?v=4'
  if (cleanAuthor === 'santa') return 'https://github.com/Leonxlnx.png'
  return `https://github.com/${cleanAuthor}.png`
}

function formatCategoryLabel(category: string) {
  if (!category) return 'Unknown'
  return category
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((chunk) => chunk[0]?.toUpperCase() + chunk.slice(1))
    .join(' ')
}

function PriceTag({ price }: { price: string }) {
  return (
    <span className={`sk-price-tag ${price === 'Free' ? 'sk-price-tag--free' : 'sk-price-tag--paid'}`}>
      {price}
    </span>
  )
}

function SkillsContent() {
  const searchParams = useSearchParams()
  const convexSkills = useQuery(api.skills.listCustomSkills, {})
  const [search, setSearch] = useState('')

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    e.currentTarget.style.setProperty('--mouse-x', `${x}%`)
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`)
  }

  const initialMarketType = useMemo<MarketType>(() => {
    const category = searchParams?.get('category')
    if (category === 'skill' || category === 'strategy' || category === 'blueprint') {
      return category
    }
    return 'all'
  }, [searchParams])

  const [marketType, setMarketType] = useState<MarketType>(initialMarketType)
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [priceFilter, setPriceFilter] = useState<PriceFilter>(searchParams?.get('category') === 'strategy' || searchParams?.get('category') === 'blueprint' ? 'paid' : 'paid') // Keep standard initialization
  const [sortBy, setSortBy] = useState<SortBy>('popularity')
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')

  const skillPool = useMemo(() => mergeSkillPool(convexSkills), [convexSkills])

  const freeSkillsCount = useMemo(() => {
    return skillPool.filter((skill) => skill.priceUsdc === 0).length
  }, [skillPool])

  const categoryOptions = useMemo(
    () =>
      Array.from(new Set(skillPool.map((skill) => skill.category)))
        .sort((a, b) => a.localeCompare(b))
        .map((category) => ({ id: category, label: formatCategoryLabel(category) })),
    [skillPool]
  )

  const filtered = useMemo(() => {
    let list = [...skillPool]
    if (marketType !== 'all') {
      list = list.filter((skill) => skill.category === marketType)
    }
    if (categoryFilter !== 'all') {
      list = list.filter((skill) => skill.category === categoryFilter)
    }
    if (priceFilter === 'free') {
      list = list.filter((skill) => skill.priceUsdc === 0)
    } else if (priceFilter === 'paid') {
      list = list.filter((skill) => skill.priceUsdc > 0)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (skill) =>
          skill.name.toLowerCase().includes(q) ||
          skill.tagline.toLowerCase().includes(q) ||
          skill.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          skill.author.toLowerCase().includes(q)
      )
    }
    list.sort((a, b) => {
      if (sortBy === 'rating') {
        return (b.stars ?? 0) - (a.stars ?? 0)
      }
      const popularityA = (a.totalPurchases ?? 0) + (a.weeklyInstalls ?? 0)
      const popularityB = (b.totalPurchases ?? 0) + (b.weeklyInstalls ?? 0)
      return popularityB - popularityA
    })
    return list
  }, [categoryFilter, marketType, priceFilter, search, skillPool, sortBy])

  useEffect(() => {
    if (!search.trim()) return
    const timer = setTimeout(() => {
      posthog.capture('marketplace_searched', {
        query: search.trim(),
        result_count: filtered.length,
        market_type: marketType,
        price_filter: priceFilter,
      })
    }, 600)
    return () => clearTimeout(timer)
  }, [search])

  return (
    <div className="sk-page">
      <div className="container">
        <section className="sk-ledger-surface animate-fade-in-up">
          <div className="sk-controls animate-fade-in-up animate-delay-1">
            <div className="sk-search-container">
              <span className="sk-select-title">Search</span>
              <div className="sk-search-wrap">
                <Search size={15} className="sk-search-icon" />
                <input
                  type="text"
                  className="sk-search-input"
                  placeholder="Search by skill, tag, or creator..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search skills"
                />
                {search && (
                  <button
                    type="button"
                    className="sk-search-clear"
                    onClick={() => setSearch('')}
                    aria-label="Clear search"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            </div>

            <div className="sk-dropdowns" role="group" aria-label="Marketplace filters">
              <div className="sk-select-wrap">
                <span className="sk-select-title">All</span>
                <CustomSelect
                  value={marketType}
                  onChange={(val) => setMarketType(val as MarketType)}
                  options={MARKET_TYPES}
                  ariaLabel="Market type filter"
                />
              </div>

              <div className="sk-select-wrap">
                <span className="sk-select-title">Category</span>
                <CustomSelect
                  value={categoryFilter}
                  onChange={(val) => setCategoryFilter(val)}
                  options={[{ id: 'all', label: 'All categories' }, ...categoryOptions]}
                  ariaLabel="Category filter"
                />
              </div>

              <div className="sk-select-wrap" style={{ position: 'relative' }}>
                <span className="sk-select-title">Price</span>
                <div className="sk-price-switch">
                  <button
                    type="button"
                    className={`sk-price-switch-btn ${priceFilter === 'paid' ? 'is-active' : ''}`}
                    onClick={() => setPriceFilter('paid')}
                  >
                    Paid
                  </button>
                  <button
                    type="button"
                    className={`sk-price-switch-btn ${priceFilter === 'free' ? 'is-active' : ''}`}
                    onClick={() => setPriceFilter('free')}
                  >
                    Free
                  </button>
                </div>
                {priceFilter === 'paid' && (
                  <div className="sk-scribble-note">
                    <span className="sk-scribble-text">{freeSkillsCount} more!</span>
                    <svg className="sk-scribble-arrow" width="30" height="25" viewBox="0 0 50 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M42 28C35 22 25 8 12 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M18 4L11 8L17 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>

              <div className="sk-select-wrap">
                <span className="sk-select-title">Sort by</span>
                <CustomSelect
                  value={sortBy}
                  onChange={(val) => setSortBy(val as SortBy)}
                  options={SORT_OPTIONS}
                  ariaLabel="Sort option"
                />
              </div>

              <div className="sk-select-wrap" style={{ flex: '0 0 auto', minWidth: '86px' }}>
                <span className="sk-select-title">Layout</span>
                <div className="sk-layout-switch" style={{ width: '86px' }}>
                  <button
                    type="button"
                    className={`sk-layout-switch-btn ${layout === 'grid' ? 'is-active' : ''}`}
                    onClick={() => setLayout('grid')}
                    aria-label="Grid view"
                  >
                    <LayoutGrid size={14} />
                  </button>
                  <button
                    type="button"
                    className={`sk-layout-switch-btn ${layout === 'list' ? 'is-active' : ''}`}
                    onClick={() => setLayout('list')}
                    aria-label="List view"
                  >
                    <List size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <p className="sk-results-count animate-fade-in-up animate-delay-2">
            {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
            {search && ` for "${search}"`}
          </p>

          {filtered.length === 0 ? (
            <div key={`empty-container-${priceFilter}`} className="sk-empty animate-fade-in-up">
              <p>No skills matched your search. Try different keywords.</p>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => {
                  setSearch('')
                  setMarketType('all')
                  setCategoryFilter('all')
                  setPriceFilter('paid')
                  setSortBy('popularity')
                }}
              >
                Clear filters
              </button>
            </div>
          ) : layout === 'grid' ? (
            <div key={`grid-container-${priceFilter}`} className="sk-cards-grid">
              {filtered.map((skill, i) => (
                <Link
                  key={`grid-${priceFilter}-${skill.id}`}
                  href={`/skills/${skill.author}/${skill.slug}`}
                  className={`sk-card animate-fade-in-up animate-delay-${Math.min(i % 6, 4)}`}
                  onMouseMove={handleMouseMove}
                >
                  <div className="sk-card-top">
                    <div className="sk-card-title-row">
                      <h2 className="sk-card-name">{skill.name}</h2>
                      {skill.category !== 'skill' && (
                        <span className={`sk-cat-pill sk-cat-pill--${skill.category}`}>
                          {skill.category}
                        </span>
                      )}
                    </div>
                    <p className="sk-card-tagline">{skill.tagline}</p>
                  </div>

                  <div className="sk-card-bottom">
                    <div className="sk-card-author">
                      <img
                        src={getAuthorAvatarUrl(skill.author)}
                        alt=""
                        className="sk-card-avatar"
                      />
                      <span className="sk-card-creator">@{skill.author}</span>
                    </div>
                    <PriceTag price={skill.price} />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div key={`list-container-${priceFilter}`} className="sk-grid">
              <div className="sk-grid-head">
                <span>Skill</span>
                <span>Creator</span>
                <span>Category</span>
                <span>Price</span>
              </div>

              {filtered.map((skill, i) => (
                <Link
                  key={`list-${priceFilter}-${skill.id}`}
                  href={`/skills/${skill.author}/${skill.slug}`}
                  className={`sk-row animate-fade-in-up animate-delay-${Math.min(i % 6, 4)}`}
                  onMouseMove={handleMouseMove}
                >
                  <div className="sk-row-main">
                    <h2 className="sk-row-name">{skill.name}</h2>
                    <p className="sk-row-tagline">{skill.tagline}</p>
                  </div>

                  <span className="sk-row-creator">@{skill.author}</span>
                  {skill.category !== 'skill' ? (
                    <span className={`sk-cat-pill sk-cat-pill--${skill.category}`}>
                      {skill.category}
                    </span>
                  ) : (
                    <span className="sk-row-creator" style={{ opacity: 0 }}>-</span>
                  )}
                  <PriceTag price={skill.price} />
                </Link>
              ))}
            </div>
          )}
        </section>

        {priceFilter === 'paid' && (
          <section className="land-showcase config-showcase sk-paid-promos animate-fade-in-up">
            <div className="sk-paid-promos-grid">
              <div className="land-ui-card">
                <div className="land-red-card-content">
                  <h3>UI & Craft Skills</h3>
                  <p>
                    Master the frontend with verified skills from top design engineers, Apple interface guidelines, and Anthropic craft standards.
                  </p>
                  <Link href="/skills/design" className="btn btn-ui">
                    Explore UI Skills <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              <div className="land-red-card">
                <div className="land-red-card-content">
                  <h3>Share your edge</h3>
                  <p>
                    Publish the skills that helped you win, and let others build faster.
                  </p>
                  <Link href="/publish" className="btn btn-red">
                    Publish a skill <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default function SkillsPage() {
  return (
    <Suspense fallback={<div className="sk-page"><div className="container">Loading marketplace...</div></div>}>
      <SkillsContent />
    </Suspense>
  )
}
