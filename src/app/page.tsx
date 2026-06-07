"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Layers, Zap } from 'lucide-react'
import { getFeaturedSkills } from '@/lib/skills-data'
import CopyInlineButton from '@/components/CopyInlineButton'

const categories = [
  {
    id: 'skill',
    name: 'Skills',
    icon: Zap,
    description:
      'Step-by-step instruction sets for AI agents and human operators. Deployable, versioned, and owned.',
    example: 'Deep Research · Changelog Generator · Canvas Design',
    href: '/skills?category=skill',
  },
  {
    id: 'strategy',
    name: 'Strategies',
    icon: Layers,
    description:
      'Frameworks, decision trees, and playbooks for any domain. Encode how your best people think.',
    example: 'GTM Playbook · Competitive Intel · Lead Research',
    href: '/skills?category=strategy',
  },
  {
    id: 'blueprint',
    name: 'Blueprints',
    icon: BookOpen,
    description:
      'Ready-to-deploy systems and business templates. Everything wired up, nothing missing.',
    example: 'Agency in a Box · Launch Kit · SaaS Ops Stack',
    href: '/skills?category=blueprint',
  },
]

export default function Landing() {
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    e.currentTarget.style.setProperty('--mouse-x', `${x}%`)
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`)
  }

  const featured = getFeaturedSkills()
  const trendingSkills = featured.slice(0, 10)
  const trendingLeft = trendingSkills.slice(0, 5)
  const trendingRight = trendingSkills.slice(5, 10)

  return (
    <div className="landing">

      {/* ═══════════════════════════════════════════
          HERO — Minimal, no illustration, straight to content
          ═══════════════════════════════════════════ */}
      <section className="land-hero">
        <div className="container">
          <div className="land-hero-split">
            <div className="land-hero-left">
              <h1 className="land-hero-title animate-fade-in-up">
                The expertise stack.
              </h1>
              <p className="land-hero-sub animate-fade-in-up animate-delay-1">
                <span className="land-hero-sub-line">
                  Trade agent skills, strategies, tutorials and blueprints
                  <span className="land-hero-solana">
                    <Image
                      src="/images/solana.png"
                      alt="Solana"
                      width={22}
                      height={22}
                      className="land-hero-solana-img"
                    />
                  </span>
                </span>
                <span className="land-hero-sub-line land-hero-sub-line--stack">
                  Use in
                  <span className="land-hero-stack-logos">
                    <span className="land-hero-stack-logo" title="Hermes">
                      <Image src="/images/hermes.png" alt="Hermes" width={22} height={22} />
                    </span>
                    <span className="land-hero-stack-logo" title="Openclaw">
                      <Image src="/images/openclaw.png" alt="Openclaw" width={20} height={20} />
                    </span>
                    <span className="land-hero-stack-logo" title="Claude">
                      <Image src="/images/claude.png" alt="Claude" width={20} height={20} />
                    </span>
                    <span className="land-hero-stack-logo" title="Codex">
                      <Image src="/images/codex-app.png" alt="Codex" width={20} height={20} />
                    </span>
                    <span className="land-hero-stack-logo" title="OpenCode">
                      <Image src="/images/opencode.png" alt="OpenCode" width={20} height={20} />
                    </span>
                  </span>
                  and more
                </span>
              </p>

              <div className="land-hero-actions animate-fade-in-up animate-delay-2">
                <Link href="/skills" className="btn btn-primary btn-lg">
                  Get skills <ArrowRight size={16} />
                </Link>
                <Link href="/agents.md" className="btn btn-outline btn-lg hide-on-mobile">
                  For agents
                </Link>
              </div>

              {/* Mobile-only command bar */}
              <div className="mobile-hero-cli show-on-mobile animate-fade-in-up animate-delay-2">
                <code className="mobile-hero-cli-code">npx -y leverbrain</code>
                <CopyInlineButton value="npx -y leverbrain" />
              </div>
            </div>

              <div className="land-hero-terminal animate-fade-in-up animate-delay-2">
                <div className="land-hero-terminal-bar">
                  <span className="land-hero-terminal-dot" />
                  <span className="land-hero-terminal-dot" />
                  <span className="land-hero-terminal-dot" />
                </div>
                <div className="land-hero-terminal-body">
                  <p className="land-hero-terminal-line">
                    <span className="land-hero-terminal-prompt">$</span>
                    {' '}<span className="land-hero-terminal-cmd">npx -y leverbrain</span>
                    <CopyInlineButton value="npx -y leverbrain" />
                  </p>
                  <p className="land-hero-terminal-output">
                    Leverbrain CLI to interact with the marketplace
                  </p>
                  <p className="land-hero-terminal-output hide-on-mobile">
                    →&nbsp;<span className="land-hero-terminal-hl">search&nbsp;&lt;query&gt;</span>&nbsp;searches&nbsp;live&nbsp;listings
                  </p>
                  <p className="land-hero-terminal-output hide-on-mobile">
                    →&nbsp;<span className="land-hero-terminal-hl">get&nbsp;&lt;author/slug&gt;</span>&nbsp;downloads&nbsp;selected&nbsp;skill
                  </p>
                  <p className="land-hero-terminal-output hide-on-mobile">
                    →&nbsp;<span className="land-hero-terminal-hl">cfg&nbsp;&lt;handle/name&gt;</span>&nbsp;downloads&nbsp;<Link href="/lab" style={{ textDecoration: 'underline', color: 'var(--color-accent-warm-light)' }}>lab</Link>&nbsp;configs
                  </p>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FEATURED SKILLS — Live preview grid
          ═══════════════════════════════════════════ */}
      <section className="land-featured">
        <div className="container">
          <div className="land-featured-header animate-fade-in-up">
            <span className="land-featured-label">Trending</span>
            <Link href="/skills" className="land-featured-link">
              Browse all <ArrowRight size={13} />
            </Link>
          </div>
          <div className="land-featured-board animate-fade-in-up animate-delay-1">
            <div className="land-featured-columns">
              <div className="land-featured-rail">
                {trendingLeft.map((skill, i) => (
                  <Link
                    key={skill.id}
                    href={`/skills/${skill.author}/${skill.slug}`}
                    className={`land-featured-lane animate-fade-in-up animate-delay-${Math.min(i + 1, 4)}`}
                    onMouseMove={handleMouseMove}
                  >
                    <div className="land-featured-lane-main">
                      <p className="land-featured-lane-name">
                        {skill.name} <span className="land-featured-lane-author">by @{skill.author}</span>
                      </p>
                      <p className="land-featured-lane-tagline">{skill.tagline}</p>
                    </div>
                    {(skill.category === 'strategy' || skill.category === 'blueprint') && (
                      <span className={`land-featured-category land-featured-category--${skill.category}`}>
                        {skill.category}
                      </span>
                    )}
                    <span className="land-featured-lane-price">{skill.price}</span>
                  </Link>
                ))}
              </div>

              <div className="land-featured-rail">
                {trendingRight.map((skill, i) => (
                  <Link
                    key={skill.id}
                    href={`/skills/${skill.author}/${skill.slug}`}
                    className={`land-featured-lane animate-fade-in-up animate-delay-${Math.min(i + 1, 4)}`}
                    onMouseMove={handleMouseMove}
                  >
                    <div className="land-featured-lane-main">
                      <p className="land-featured-lane-name">
                        {skill.name} <span className="land-featured-lane-author">by @{skill.author}</span>
                      </p>
                      <p className="land-featured-lane-tagline">{skill.tagline}</p>
                    </div>
                    {(skill.category === 'strategy' || skill.category === 'blueprint') && (
                      <span className={`land-featured-category land-featured-category--${skill.category}`}>
                        {skill.category}
                      </span>
                    )}
                    <span className="land-featured-lane-price">{skill.price}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHAT'S IN THE MARKETPLACE — 3 category panels
          ═══════════════════════════════════════════ */}
      <section className="land-categories">
        <div className="container">
          <h2 className="land-section-title animate-fade-in-up">
            Things you can trade.
          </h2>
          <div className="land-cat-grid">
            {categories.map((cat, i) => {
              const Icon = cat.icon
              return (
                <Link
                  key={cat.id}
                  href={cat.href}
                  className={`land-cat-panel animate-fade-in-up animate-delay-${i + 1}`}
                >
                  <div className="land-cat-icon-wrap">
                    <Icon size={20} />
                  </div>
                  <h3 className="land-cat-name">{cat.name}</h3>
                  <p className="land-cat-desc">{cat.description}</p>
                  <p className="land-cat-example">{cat.example}</p>
                  <span className="land-cat-arrow">
                    Browse {cat.name} <ArrowRight size={13} />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
