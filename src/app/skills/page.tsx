"use client";

import { Suspense, useMemo, useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Search, X, ChevronDown } from 'lucide-react'
import { useQuery } from 'convex/react'
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
  const convexSkills = useQuery(api.skills.listSkills, {})
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
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('paid')
  const [sortBy, setSortBy] = useState<SortBy>('popularity')

  const skillPool = useMemo(() => mergeSkillPool(convexSkills), [convexSkills])

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

              <div className="sk-select-wrap">
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
            </div>
          </div>

          <p className="sk-results-count animate-fade-in-up animate-delay-2">
            {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
            {search && ` for "${search}"`}
          </p>

          {filtered.length === 0 ? (
            <div className="sk-empty animate-fade-in-up">
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
          ) : (
            <div className="sk-grid">
              <div className="sk-grid-head">
                <span>Skill</span>
                <span>Creator</span>
                <span>Category</span>
                <span>Price</span>
              </div>

              {filtered.map((skill, i) => (
                <Link
                  key={skill.id}
                  href={`/skills/${skill.author}/${skill.slug}`}
                  className={`sk-row animate-fade-in-up animate-delay-${Math.min(i % 6, 4)}`}
                  onMouseMove={handleMouseMove}
                >
                  <div className="sk-row-main">
                    <h2 className="sk-row-name">{skill.name}</h2>
                    <p className="sk-row-tagline">{skill.tagline}</p>
                  </div>

                  <span className="sk-row-creator">@{skill.author}</span>
                  <span className={`sk-cat-pill sk-cat-pill--${skill.category}`}>
                    {skill.category}
                  </span>
                  <PriceTag price={skill.price} />
                </Link>
              ))}
            </div>
          )}
        </section>
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
