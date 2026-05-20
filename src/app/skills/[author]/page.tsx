'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useQuery } from 'convex/react'
import { Zap, TrendingUp, BookOpen, ArrowLeft, ExternalLink, Globe, Twitter } from 'lucide-react'
import { api } from '../../../../convex/_generated/api'
import { SKILLS } from '@/lib/skills-data'
import '@/styles/Profile.css'

const STATIC_PROFILES: Record<string, {
  displayName: string
  bio: string
  avatarUrl: string
  github?: string
  website?: string
  twitter?: string
  verified: boolean
  background: string
}> = {
  anthropics: {
    displayName: 'Anthropic',
    bio: 'Creators of Claude, pushing the frontier of AI alignment, safety, and agent capabilities.',
    avatarUrl: 'https://avatars.githubusercontent.com/u/79624505?v=4',
    github: 'https://github.com/anthropics',
    website: 'https://anthropic.com',
    twitter: 'anthropic_ai',
    verified: true,
    background: 'linear-gradient(135deg, rgba(230, 92, 53, 0.22) 0%, rgba(20, 15, 12, 0.98) 100%)',
  },
  composiohq: {
    displayName: 'Composio',
    bio: 'Enterprise-grade toolset for AI agents. Connect LLMs to 100+ tools and platforms seamlessly.',
    avatarUrl: 'https://avatars.githubusercontent.com/u/105432322?v=4',
    github: 'https://github.com/composiohq',
    website: 'https://composio.dev',
    twitter: 'composiohq',
    verified: true,
    background: 'linear-gradient(135deg, rgba(53, 162, 230, 0.22) 0%, rgba(20, 15, 12, 0.98) 100%)',
  },
  '199-biotechnologies': {
    displayName: '199 Biotechnologies',
    bio: 'Building autonomous agents and bio-informatics toolchains for rapid lab automation.',
    avatarUrl: 'https://avatars.githubusercontent.com/u/81938501?v=4',
    github: 'https://github.com/199-biotechnologies',
    website: 'https://199.bio',
    verified: true,
    background: 'linear-gradient(135deg, rgba(140, 53, 230, 0.22) 0%, rgba(20, 15, 12, 0.98) 100%)',
  },
  leverbrain: {
    displayName: 'Leverbrain',
    bio: 'Foundational models, SDKs, and CLI tools for the Solana-backed skill economy.',
    avatarUrl: 'https://avatars.githubusercontent.com/u/190823902?v=4',
    github: 'https://github.com/leverbrain',
    website: 'https://leverbrain.com',
    twitter: 'leverbrain',
    verified: true,
    background: 'linear-gradient(135deg, rgba(255, 188, 104, 0.22) 0%, rgba(20, 15, 12, 0.98) 100%)',
  }
}

const CATEGORY_ICONS = {
  skill: Zap,
  strategy: TrendingUp,
  blueprint: BookOpen,
}

function PriceTag({ price }: { price: string }) {
  return (
    <span className={`sk-price-tag ${price === 'Free' ? 'sk-price-tag--free' : 'sk-price-tag--paid'}`}>
      {price}
    </span>
  )
}

function formatCompact(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`
  }
  return String(value)
}

export default function AuthorProfilePage() {
  const params = useParams()
  const authorRaw = (params?.author as string) ?? ''
  const author = authorRaw.toLowerCase().trim()

  const dbProfile = useQuery(api.skills.getProfileByHandle, { handle: author })
  const dbSkills = useQuery(api.skills.getSkillsByAuthor, { author })

  const profile = useMemo(() => {
    const staticProf = STATIC_PROFILES[author]
    if (dbProfile) {
      return {
        displayName: dbProfile.displayName || dbProfile.handle || authorRaw,
        bio: dbProfile.bio || 'Creator on Leverbrain.',
        avatarUrl: dbProfile.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${author}`,
        website: dbProfile.website || staticProf?.website,
        github: dbProfile.website?.includes('github.com') ? dbProfile.website : staticProf?.github,
        twitter: dbProfile.twitter || staticProf?.twitter,
        verified: true,
        background: staticProf?.background || 'linear-gradient(135deg, rgba(255, 188, 104, 0.15) 0%, rgba(20, 15, 12, 0.98) 100%)',
      }
    }
    if (staticProf) {
      return staticProf
    }
    return {
      displayName: authorRaw,
      bio: 'Developer on the Leverbrain network.',
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${author}`,
      verified: false,
      background: 'linear-gradient(135deg, rgba(255, 188, 104, 0.12) 0%, rgba(20, 15, 12, 0.98) 100%)',
    }
  }, [author, dbProfile, authorRaw])

  const staticSkills = useMemo(() => {
    return SKILLS.filter((s) => s.author.toLowerCase() === author)
  }, [author])

  const combinedSkills = useMemo(() => {
    const list = [...(dbSkills || [])]
    const slugs = new Set(list.map((s) => s.slug))
    for (const s of staticSkills) {
      if (!slugs.has(s.slug)) {
        list.push({
          id: s.id,
          skillId: s.id,
          author: s.author,
          slug: s.slug,
          name: s.name,
          tagline: s.tagline,
          description: s.description,
          price: s.price,
          priceUsdc: s.priceUsdc,
          category: s.category,
          tags: s.tags,
          stars: s.stars,
          weeklyInstalls: s.weeklyInstalls,
          totalPurchases: s.totalPurchases,
          createdAt: s.createdAt,
          creatorWallet: s.creatorWallet,
        } as any)
      }
    }
    return list
  }, [dbSkills, staticSkills])

  const stats = useMemo(() => {
    const count = combinedSkills.length
    const downloads = combinedSkills.reduce((acc, s) => acc + (s.totalPurchases ?? 0), 0)
    const ratingSum = combinedSkills.reduce((acc, s) => {
      const starRating = 72 + Math.log10(Math.max(s.stars ?? 0, 1)) * 8
      return acc + Math.max(72, Math.min(99, Math.round(starRating)))
    }, 0)
    const avgRating = count > 0 ? Math.round(ratingSum / count) : 85

    return {
      count,
      downloads,
      rating: `${avgRating}/100`,
    }
  }, [combinedSkills])

  return (
    <div className="ap-page">
      <div className="container">
        {/* Back Link */}
        <Link href="/skills" className="ap-back animate-fade-in-up">
          <ArrowLeft size={14} /> Marketplace
        </Link>

        {/* Profile Banner and Card */}
        <div 
          className="ap-card animate-fade-in-up" 
          style={{ background: profile.background }}
        >
          <div className="ap-mesh-overlay" />
          <div className="ap-card-body">
            <div className="ap-avatar-wrap">
              <img 
                src={profile.avatarUrl} 
                alt={`${profile.displayName} avatar`} 
                className="ap-avatar" 
              />
              {profile.verified && (
                <span className="ap-verified-badge" title="Verified Creator">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                </span>
              )}
            </div>

            <div className="ap-info">
              <div className="ap-name-row">
                <h1 className="ap-display-name">{profile.displayName}</h1>
                <span className="ap-handle">@{author}</span>
              </div>
              <p className="ap-bio">{profile.bio}</p>

              <div className="ap-socials">
                {profile.website && (
                  <a href={profile.website} target="_blank" rel="noreferrer" className="ap-social-link">
                    <Globe size={13} /> Website
                  </a>
                )}
                {profile.github && (
                  <a href={profile.github} target="_blank" rel="noreferrer" className="ap-social-link">
                    <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    GitHub
                  </a>
                )}
                {profile.twitter && (
                  <a href={`https://twitter.com/${profile.twitter}`} target="_blank" rel="noreferrer" className="ap-social-link">
                    <Twitter size={13} /> Twitter
                  </a>
                )}
              </div>
            </div>

            <div className="ap-stats">
              <div className="ap-stat-box">
                <span className="ap-stat-val">{stats.count}</span>
                <span className="ap-stat-lbl">listings</span>
              </div>
              <div className="ap-stat-box">
                <span className="ap-stat-val">{formatCompact(stats.downloads)}</span>
                <span className="ap-stat-lbl">installs</span>
              </div>
              <div className="ap-stat-box">
                <span className="ap-stat-val">{stats.rating}</span>
                <span className="ap-stat-lbl">reputation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Listings Section */}
        <section className="ap-listings animate-fade-in-up animate-delay-1">
          <h2 className="ap-listings-title">Published Routines & Blueprints</h2>

          {combinedSkills.length === 0 ? (
            <div className="ap-empty">
              <p>This creator has not published any skills yet.</p>
            </div>
          ) : (
            <div className="sk-grid">
              <div className="sk-grid-head">
                <span>Skill</span>
                <span>Creator</span>
                <span>Category</span>
                <span>Price</span>
              </div>

              {combinedSkills.map((skill, i) => {
                const CatIcon = CATEGORY_ICONS[skill.category as keyof typeof CATEGORY_ICONS] || Zap
                const skillKey = (skill as any).id || (skill as any)._id || skill.slug
                return (
                  <Link
                    key={skillKey}
                    href={`/skills/${skill.author}/${skill.slug}`}
                    className={`sk-row animate-fade-in-up animate-delay-${Math.min(i % 6, 4)}`}
                  >
                    <div className="sk-row-main">
                      <h3 className="sk-row-name" style={{ fontSize: '0.9375rem', fontWeight: 600 }}>{skill.name}</h3>
                      <p className="sk-row-tagline">{skill.tagline}</p>
                    </div>

                    <span className="sk-row-creator">@{skill.author}</span>
                    <span className={`sk-cat-pill sk-cat-pill--${skill.category}`}>
                      <CatIcon size={10} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                      {skill.category}
                    </span>
                    <PriceTag price={skill.price} />
                  </Link>
                )
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
