'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { mergeSkillPool } from '@/lib/skill-pool'
import '@/styles/Skills.css'

const CURATED_DESIGN_SLUGS = new Set([
  'emil-design-eng',
  'apple-design',
  'frontend-design',
  'ui-ux-pro-max',
  'impeccable',
  'web-design-guidelines',
  'qiaomu-design',
  'claude-design',
  'taste-skill',
  'taste-skill-v1',
  'redesign-skill',
  'soft-skill',
  'stitch-skill',
  'brutalist-skill',
  'minimalist-skill',
  'gpt-tasteskill',
  'awwwards-hero',
  'awwwards-motion',
  'imagegen-frontend',
  'pixel-perfect',
  'visual-redesign'
])

function getAuthorAvatarUrl(author: string) {
  const cleanAuthor = author.toLowerCase().trim()
  if (cleanAuthor === 'anthropics') return '/images/claude.png'
  if (cleanAuthor === 'composiohq') return 'https://avatars.githubusercontent.com/u/105432322?v=4'
  if (cleanAuthor === '199-biotechnologies') return 'https://avatars.githubusercontent.com/u/81938501?v=4'
  if (cleanAuthor === 'leverbrain') return '/images/octo.png'
  if (cleanAuthor === 'baoyu') return 'https://avatars.githubusercontent.com/u/648674?v=4'
  if (cleanAuthor === 'santa') return 'https://github.com/Leonxlnx.png'
  return `https://github.com/${cleanAuthor}.png`
}

function PriceTag({ price }: { price: string }) {
  return (
    <span className={`sk-price-tag ${price === 'Free' ? 'sk-price-tag--free' : 'sk-price-tag--paid'}`}>
      {price}
    </span>
  )
}

export default function CuratedDesignSkillsPage() {
  const convexSkills = useQuery(api.skills.listCustomSkills, {})
  const [search, setSearch] = useState('')

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    e.currentTarget.style.setProperty('--mouse-x', `${x}%`)
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`)
  }

  const skillPool = useMemo(() => mergeSkillPool(convexSkills), [convexSkills])

  const designSkills = useMemo(() => {
    return skillPool.filter((skill) => CURATED_DESIGN_SLUGS.has(skill.slug))
  }, [skillPool])

  const filtered = useMemo(() => {
    if (!search.trim()) return designSkills
    const q = search.toLowerCase()
    return designSkills.filter(
      (skill) =>
        skill.name.toLowerCase().includes(q) ||
        skill.tagline.toLowerCase().includes(q) ||
        skill.author.toLowerCase().includes(q)
    )
  }, [designSkills, search])

  return (
    <div className="sk-page">
      <div className="container">
        {/* Curated Banner */}
        <section className="sk-design-header animate-fade-in-up" style={{
          padding: '48px 32px',
          background: 'linear-gradient(135deg, rgba(29, 38, 113, 0.45) 0%, rgba(9, 10, 15, 0.95) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          borderRadius: 'var(--radius-xl)',
          marginBottom: '32px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-10%',
            width: '450px',
            height: '450px',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0
          }} />

          <Link href="/skills" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--color-text-secondary)',
            fontSize: '0.875rem',
            textDecoration: 'none',
            marginBottom: '24px',
            transition: 'color 0.2s',
            position: 'relative',
            zIndex: 2
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
          >
            <ArrowLeft size={16} /> Back to all skills
          </Link>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              background: 'rgba(99, 102, 241, 0.12)', 
              border: '1px solid rgba(99, 102, 241, 0.3)', 
              borderRadius: '9999px', 
              padding: '6px 14px', 
              fontSize: '0.75rem', 
              fontWeight: 600, 
              color: '#818cf8', 
              marginBottom: '16px' 
            }}>
              <Sparkles size={12} /> Curated Collection
            </div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.5rem',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: '#fff',
              marginBottom: '12px'
            }}>UI & Design Craft Skills</h1>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.65',
              color: 'var(--color-text-secondary)',
              maxWidth: '650px',
              margin: 0
            }}>
              Master interface development with proven design principles. A curated selection of expert blueprints and strategies from top design engineers, Apple interface patterns, and Anthropic craft guidelines.
            </p>
          </div>
        </section>

        {/* Search */}
        <section className="sk-controls animate-fade-in-up" style={{ marginBottom: '24px' }}>
          <div className="sk-search-container" style={{ flex: 'none', width: '100%', maxWidth: '400px' }}>
            <div className="sk-search-wrap">
              <input
                type="text"
                className="sk-search-input"
                placeholder="Search design skills..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search design skills"
              />
            </div>
          </div>
          <p className="sk-results-count" style={{ marginLeft: 'auto', alignSelf: 'center', margin: 0 }}>
            {filtered.length} {filtered.length === 1 ? 'skill' : 'skills'}
          </p>
        </section>

        {/* Grid List */}
        {filtered.length === 0 ? (
          <div className="sk-empty animate-fade-in-up">
            <p>No design skills found matching "{search}".</p>
          </div>
        ) : (
          <div className="sk-cards-grid">
            {filtered.map((skill, i) => (
              <Link
                key={skill.slug}
                href={`/skills/${skill.author}/${skill.slug}`}
                className={`sk-card animate-fade-in-up animate-delay-${Math.min(i % 6, 4)}`}
                onMouseMove={handleMouseMove}
                style={{
                  border: '1px solid rgba(99, 102, 241, 0.15)',
                  background: 'rgba(12, 10, 16, 0.65)'
                }}
              >
                <div className="sk-card-top">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img
                      src={getAuthorAvatarUrl(skill.author)}
                      alt={`${skill.author} avatar`}
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '1px solid rgba(99, 102, 241, 0.2)'
                      }}
                    />
                    <span className="sk-card-creator" style={{ margin: 0 }}>@{skill.author}</span>
                  </div>
                  <h2 className="sk-card-name" style={{ marginTop: '6px' }}>{skill.name}</h2>
                  <p className="sk-card-tagline">{skill.tagline}</p>
                </div>

                <div className="sk-card-bottom">
                  {skill.category !== 'skill' ? (
                    <span className={`sk-cat-pill sk-cat-pill--${skill.category}`}>
                      {skill.category}
                    </span>
                  ) : (
                    <span />
                  )}
                  <PriceTag price={skill.price} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
