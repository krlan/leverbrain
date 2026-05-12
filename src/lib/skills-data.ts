// Shared skills data — used by both skills list page and detail pages.
// Source of truth while we wire Convex. IDs match Convex DB slugs.

export type SkillCategory = 'skill' | 'strategy' | 'blueprint' | (string & {})

export interface SkillListing {
  id: string
  author: string      // creator handle / wallet-linked handle
  slug: string        // URL-safe skill name
  name: string
  tagline: string     // one-liner shown on cards
  description: string // longer description for detail page
  readme: string      // markdown content for README tab
  whenToUse: string   // when-to-use guidance
  price: string       // "Free" or "$X.XX"
  priceUsdc: number   // in USDC (0 = free)
  category: SkillCategory
  tags: string[]
  stars: number
  weeklyInstalls: number
  totalPurchases: number
  featured?: boolean
  createdAt: string
  creatorWallet?: string
  fileUrl?: string
  previewHtml?: string
  overviewHtml?: string
  imageUrl?: string
}

export const SKILLS: SkillListing[] = [
  {
    id: 'canvas-design-artifacts-builder',
    author: 'anthropics',
    slug: 'canvas-design-artifacts-builder',
    name: 'Canvas Design Artifacts Builder',
    tagline: 'Creates polished visual artifacts with React + Tailwind workflows.',
    description:
      'Creates polished visual artifacts and poster-style outputs with React + Tailwind workflows. The model outputs real visual artifacts, not only narrative text.',
    readme: `# Canvas Design Artifacts Builder

Build gallery-quality visual artifacts from plain prompts in a single pass.

## What you get
- Poster, card, and slide artifact templates pre-wired to your design system
- Auto-sizing and responsive layout primitives
- Export-ready artifact structure

## How to use
1. Describe the artifact type and visual direction
2. Run the skill — it generates React + Tailwind code
3. The output renders immediately as a visual artifact

## Requirements
- Claude with artifacts enabled
- Tailwind CSS in your project (or let the skill inject it)`,
    whenToUse:
      'Use when you need polished visual output — not just text. Great for marketing materials, design specs, and visual demos.',
    price: 'Free',
    priceUsdc: 0,
    category: 'skill',
    tags: ['design', 'artifacts', 'react', 'visual'],
    stars: 123400,
    weeklyInstalls: 34900,
    totalPurchases: 284000,
    featured: true,
    createdAt: '2025-01-15',
    imageUrl: '/images/skills/canvas-builder.png',
    overviewHtml: `
      <div class="skill-enrichment">
        <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; margin-bottom: 32px; border: 1px solid var(--color-border);">
          <img src="/images/skills/canvas-builder.png" style="width: 100%; aspect-ratio: 16/7; object-fit: cover; opacity: 0.8;" />
          <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 40%, #120e0a 95%);"></div>
          <div style="position: absolute; bottom: 24px; left: 24px;">
            <h2 style="font-family: var(--font-display); color: var(--color-accent); margin: 0; font-size: 32px;">Canvas Design Artifacts</h2>
            <p style="margin: 8px 0 0; color: var(--color-text-secondary);">Transforming ideas into professional-grade visual layouts.</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 32px;">
          <div>
            <h3 style="color: var(--color-text-primary); margin-bottom: 16px;">What it does</h3>
            <p style="margin-bottom: 24px;">The Canvas Builder automates the entire visual design cycle. From a single prompt, it constructs React-based artifacts with Tailwind styling, ensuring pixel-perfect alignment and consistent branding.</p>
            
            <h3 style="color: var(--color-text-primary); margin-bottom: 16px;">Who it's for</h3>
            <ul style="color: var(--color-text-secondary); padding-left: 20px;">
              <li style="margin-bottom: 8px;">Product Designers looking to prototype rapidly</li>
              <li style="margin-bottom: 8px;">Marketing teams needing instant social assets</li>
              <li>Engineers who want beautiful UIs without manual CSS</li>
            </ul>
          </div>
          
          <div style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: 12px; padding: 24px;">
            <h4 style="color: var(--color-accent); margin-bottom: 16px; font-family: var(--font-display);">INTERACTIVE DEMO</h4>
            <div style="aspect-ratio: 1; background: #000; border-radius: 8px; border: 1px solid #ffbc6833; padding: 20px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
              <div style="width: 60px; height: 60px; background: #ffbc6822; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; animation: pulse 2s infinite;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffbc68" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
              </div>
              <div style="font-family: var(--font-mono); font-size: 12px; color: #ffbc68;">GENERATE: "Minimalist Dashboard"</div>
              <div style="margin-top: 12px; width: 100%; height: 4px; background: #1a140f; border-radius: 2px;">
                <div style="width: 75%; height: 100%; background: #ffbc68; border-radius: 2px;"></div>
              </div>
              <div style="margin-top: 8px; font-size: 10px; color: #9c7a52;">Rendering Artifacts... 75%</div>
            </div>
          </div>
        </div>
      </div>
    `,
    previewHtml: `
      <div style="background: #1a140f; border: 1px solid #ffbc6844; border-radius: 12px; padding: 24px; font-family: sans-serif; color: #ffe3be;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid #ffbc6822; padding-bottom: 12px;">
          <h3 style="margin: 0; color: #ffbc68; font-family: 'Saira';">Artifact Preview: Minimalist Poster</h3>
          <span style="font-size: 12px; background: #ffbc6822; color: #ffbc68; padding: 4px 8px; border-radius: 4px;">v1.0.4</span>
        </div>
        <div style="aspect-ratio: 4/5; background: #120e0a; border: 1px dashed #ffbc6844; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; text-align: center; position: relative; overflow: hidden;">
          <div style="position: absolute; top: -50px; left: -50px; width: 200px; height: 200px; background: radial-gradient(circle, #ff9a3d11 0%, transparent 70%);"></div>
          <div style="font-family: 'Saira'; font-size: 42px; font-weight: 700; color: #ffbc68; margin-bottom: 16px; line-height: 1;">THE FUTURE<br/>OF WORK</div>
          <div style="width: 40px; height: 2px; background: #ffbc68; margin-bottom: 24px;"></div>
          <p style="font-size: 14px; color: #d5b185; max-width: 240px; margin: 0;">Autonomous systems and human creativity merged into a single execution layer.</p>
          <div style="position: absolute; bottom: 20px; left: 20px; right: 20px; display: flex; justify-content: space-between; font-family: monospace; font-size: 10px; color: #9c7a52; text-transform: uppercase;">
            <span>Leverbrain Artifact // A-042</span>
            <span>2026 Edition</span>
          </div>
        </div>
        <div style="margin-top: 16px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
          <div style="background: #120e0a; padding: 12px; border-radius: 6px; font-size: 11px; border: 1px solid #ffbc6822;">
            <div style="color: #9c7a52; margin-bottom: 4px;">Layout</div>
            <div style="color: #ffe3be;">Swiss Grid</div>
          </div>
          <div style="background: #120e0a; padding: 12px; border-radius: 6px; font-size: 11px; border: 1px solid #ffbc6822;">
            <div style="color: #9c7a52; margin-bottom: 4px;">Palette</div>
            <div style="color: #ffe3be;">Amber Mono</div>
          </div>
          <div style="background: #120e0a; padding: 12px; border-radius: 6px; font-size: 11px; border: 1px solid #ffbc6822;">
            <div style="color: #9c7a52; margin-bottom: 4px;">Export</div>
            <div style="color: #ffe3be;">SVG / PDF</div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'deep-research',
    author: '199-biotechnologies',
    slug: 'deep-research',
    name: 'Deep Research',
    tagline: 'Autonomous multi-phase research with citation tracking and structured delivery.',
    description:
      'Runs autonomous, multi-phase research with citation tracking and multi-format report output. Completes full research workflows with source verification.',
    readme: `# Deep Research

Multi-phase research automation that produces cited, structured reports.

## What you get
- Autonomous research loop across multiple sources
- Citation extraction and verification
- Structured report output in Markdown, PDF, or JSON

## How to use
1. Provide your research question or topic
2. Set the depth level (quick / standard / deep)
3. The skill handles source discovery, synthesis, and formatting

## Requirements
- Web search tool enabled
- Sufficient context window for full citations`,
    whenToUse:
      'Use when you need a comprehensive, cited answer to a complex question — not a quick summary. Best for strategic decisions, technical due diligence, and academic research.',
    price: 'Free',
    priceUsdc: 0,
    category: 'skill',
    tags: ['research', 'citations', 'automation', 'analysis'],
    stars: 530,
    weeklyInstalls: 5600,
    totalPurchases: 18000,
    featured: true,
    createdAt: '2025-02-08',
    imageUrl: '/images/skills/deep-research.png',
    overviewHtml: `
      <div class="skill-enrichment">
        <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; margin-bottom: 32px; border: 1px solid var(--color-border);">
          <img src="/images/skills/deep-research.png" style="width: 100%; aspect-ratio: 16/7; object-fit: cover; opacity: 0.8;" />
          <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 40%, #120e0a 95%);"></div>
          <div style="position: absolute; bottom: 24px; left: 24px;">
            <h2 style="font-family: var(--font-display); color: var(--color-accent); margin: 0; font-size: 32px;">Deep Research Engine</h2>
            <p style="margin: 8px 0 0; color: var(--color-text-secondary);">Autonomous multi-phase analysis with verifiable citations.</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 32px;">
          <div>
            <h3 style="color: var(--color-text-primary); margin-bottom: 16px;">The Logic</h3>
            <p style="margin-bottom: 24px;">Deep Research doesn't just "search". It constructs a graph of sources, cross-references claims, and synthesizes a verified truth. It's an analyst in a box.</p>
            
            <h3 style="color: var(--color-text-primary); margin-bottom: 16px;">Core Domains</h3>
            <ul style="color: var(--color-text-secondary); padding-left: 20px;">
              <li style="margin-bottom: 8px;">Competitive Intelligence & Market Analysis</li>
              <li style="margin-bottom: 8px;">Technical Due Diligence</li>
              <li>Academic Literature Reviews</li>
            </ul>
          </div>
          
          <div style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: 12px; padding: 24px;">
            <h4 style="color: var(--color-accent); margin-bottom: 16px; font-family: var(--font-display);">LIVE ANALYTICS</h4>
            <div style="background: #000; border-radius: 8px; border: 1px solid #ffbc6833; padding: 16px; font-family: var(--font-mono); font-size: 11px;">
              <div style="color: #34d399; margin-bottom: 8px;">[✓] 142 Sources Indexed</div>
              <div style="color: #34d399; margin-bottom: 8px;">[✓] 24 Citations Verified</div>
              <div style="color: #ff9a3d; margin-bottom: 8px; animation: blink 1s infinite;">[!] Synthesizing Hypothesis...</div>
              <div style="margin-top: 12px; padding: 8px; background: #1a140f; border-radius: 4px; color: #9c7a52; font-size: 10px;">
                Searching: "Sovereign AI Trends 2026"
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    previewHtml: `
      <div style="background: #120e0a; border: 1px solid #ffbc6844; border-radius: 12px; font-family: 'IBM Plex Sans', sans-serif; color: #ffe3be; overflow: hidden;">
        <div style="background: #1a140f; padding: 16px 24px; border-bottom: 1px solid #ffbc6822; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 10px; height: 10px; border-radius: 50%; background: #ffbc68; box-shadow: 0 0 10px #ffbc6844;"></div>
            <span style="font-weight: 600; font-family: 'Saira';">Autonomous Research Engine</span>
          </div>
          <span style="font-family: monospace; font-size: 11px; color: #9c7a52;">Status: Analyzing Sources...</span>
        </div>
        <div style="padding: 24px;">
          <div style="margin-bottom: 20px;">
            <div style="font-size: 12px; color: #9c7a52; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.1em;">Current Query</div>
            <div style="font-size: 18px; color: #ffbc68;">The impact of sovereign AI stacks on European biotechnology innovation (2024-2030)</div>
          </div>
          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px;">
            <div>
              <div style="font-size: 12px; color: #9c7a52; margin-bottom: 12px;">Synthesized Insights</div>
              <div style="background: #1a140f; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6; border: 1px solid #ffbc6811;">
                <p style="margin: 0 0 12px 0;">1. Transition from cloud-centric to edge-hosted LLMs is reducing latency by 40% in R&D labs.</p>
                <p style="margin: 0 0 12px 0;">2. Regulatory sandboxes in Germany and France are accelerating clinical trial simulation by 18 months.</p>
                <p style="margin: 0;">3. Emerging consensus on data-sovereignty is driving a 300% increase in private bio-data marketplace adoption.</p>
              </div>
            </div>
            <div>
              <div style="font-size: 12px; color: #9c7a52; margin-bottom: 12px;">Active Citations</div>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <div style="font-size: 11px; background: rgba(255,188,104,0.05); padding: 8px; border-radius: 4px; border-left: 2px solid #ffbc68;">Nature Biotech (April 2024)</div>
                <div style="font-size: 11px; background: rgba(255,188,104,0.05); padding: 8px; border-radius: 4px; border-left: 2px solid #ffbc68;">EMA Digital Strategy Roadmap</div>
                <div style="font-size: 11px; background: rgba(255,188,104,0.05); padding: 8px; border-radius: 4px; border-left: 2px solid #ffbc68;">OECD AI Policy Observatory</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'skill-creator',
    author: 'anthropics',
    slug: 'skill-creator',
    name: 'Skill Creator',
    tagline: 'End-to-end skill creation, evaluation, and trigger optimization.',
    description:
      'Guides end-to-end skill creation, evaluation, iteration, and trigger optimization. Meta capability: AI system that helps build stronger AI extensions.',
    readme: `# Skill Creator

The meta-skill for building skills. Describe a workflow and receive a production-ready skill package.

## What you get
- Complete SKILL.md with YAML frontmatter
- Evaluation criteria and test cases
- Trigger phrase optimization
- Example usage patterns

## How to use
1. Describe the workflow you want to encode
2. Review the generated SKILL.md structure
3. Iterate with the built-in eval loop

## Output format
\`\`\`
my-skill/
├── SKILL.md         # Main instruction file
├── examples/        # Reference implementations
└── scripts/         # Helper scripts (if needed)
\`\`\``,
    whenToUse:
      'Use when you want to create reusable, shareable skills for Claude or other AI agents. Especially useful for operators building internal tooling.',
    price: 'Free',
    priceUsdc: 0,
    category: 'skill',
    tags: ['meta', 'skill-building', 'automation', 'operators'],
    stars: 123400,
    weeklyInstalls: 167300,
    totalPurchases: 512000,
    featured: true,
    createdAt: '2025-01-10',
    imageUrl: '/images/skills/skill-creator.png',
    overviewHtml: `
      <div class="skill-enrichment">
        <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; margin-bottom: 32px; border: 1px solid var(--color-border);">
          <img src="/images/skills/skill-creator.png" style="width: 100%; aspect-ratio: 16/7; object-fit: cover; opacity: 0.8;" />
          <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 40%, #120e0a 95%);"></div>
          <div style="position: absolute; bottom: 24px; left: 24px;">
            <h2 style="font-family: var(--font-display); color: var(--color-accent); margin: 0; font-size: 32px;">Skill Creator Meta-AI</h2>
            <p style="margin: 8px 0 0; color: var(--color-text-secondary);">The AI system that builds your AI workforce.</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 32px;">
          <div>
            <h3 style="color: var(--color-text-primary); margin-bottom: 16px;">The Mission</h3>
            <p style="margin-bottom: 24px;">Skill Creator is the foundational tool for AI operators. It translates human workflows into optimized SKILL.md packages with evaluation loops and trigger phrases.</p>
            
            <h3 style="color: var(--color-text-primary); margin-bottom: 16px;">Capabilities</h3>
            <ul style="color: var(--color-text-secondary); padding-left: 20px;">
              <li style="margin-bottom: 8px;">Trigger Phrase Optimization (SEO for Agents)</li>
              <li style="margin-bottom: 8px;">Automated Eval/Test Case Generation</li>
              <li>Production-ready YAML/Markdown Exports</li>
            </ul>
          </div>
          
          <div style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: 12px; padding: 24px;">
            <h4 style="color: var(--color-accent); margin-bottom: 16px; font-family: var(--font-display);">SIMULATION</h4>
            <div style="background: #0d0a07; border-radius: 8px; border: 1px solid #ffbc6833; padding: 20px; font-family: var(--font-mono); font-size: 11px;">
              <div style="color: #9c7a52;">// Input Workflow</div>
              <div style="color: #ffe3be; margin: 4px 0 12px;">"Handle payroll disputes"</div>
              <div style="color: #9c7a52;">// Optimized Skill Output</div>
              <div style="background: #1a140f; padding: 8px; border-radius: 4px; margin-top: 4px; border-left: 2px solid #ffbc68;">
                <div style="color: #ffbc68;">name: payroll-resolver</div>
                <div style="color: #ffbc68;">trigger: "dispute payout"</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    previewHtml: `
      <div style="background: #0d0a07; border: 1px solid #ffbc6833; border-radius: 12px; padding: 24px; font-family: 'JetBrains Mono', monospace; color: #d5b185;">
        <div style="margin-bottom: 20px; color: #ffbc68; font-size: 14px;">> Initializing Skill Creator v2.1...</div>
        <div style="background: #1a140f; border: 1px solid #ffbc6822; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <div style="color: #9c7a52; margin-bottom: 12px; font-size: 12px;">// TARGET WORKFLOW</div>
          <div style="color: #ffe3be;">"Convert raw meeting audio into a structured project brief with Jira ticket formatting and stakeholder priority matrix."</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div>
            <div style="font-size: 12px; color: #9c7a52; margin-bottom: 8px;">[Trigger Phrases]</div>
            <ul style="margin: 0; padding-left: 16px; font-size: 12px; color: #ffe3be; list-style-type: square;">
              <li>brief from audio</li>
              <li>summarize recording</li>
              <li>generate jira from call</li>
            </ul>
          </div>
          <div>
            <div style="font-size: 12px; color: #9c7a52; margin-bottom: 8px;">[Validation State]</div>
            <div style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: #ff9a3d;">
              <span style="display: inline-block; width: 8px; height: 8px; background: #ff9a3d; border-radius: 50%;"></span>
              Optimizing Prompt Matrix...
            </div>
          </div>
        </div>
        <div style="margin-top: 24px; border-top: 1px solid #ffbc6822; padding-top: 16px; display: flex; justify-content: space-between; align-items: center;">
          <div style="font-size: 11px;">Build Progress: 88%</div>
          <div style="width: 150px; height: 6px; background: #120e0a; border-radius: 3px; overflow: hidden; border: 1px solid #ffbc6822;">
            <div style="width: 88%; height: 100%; background: #ffbc68;"></div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'competitive-ads-extractor',
    author: 'composiohq',
    slug: 'competitive-ads-extractor',
    name: 'Competitive Ads Extractor',
    tagline: 'Decode competitor messaging and creative strategy from ad libraries.',
    description:
      'Extracts and analyzes competitor ads across channels to decode messaging and creative strategy. Turns ad libraries into actionable competitive intelligence.',
    readme: `# Competitive Ads Extractor

Transform competitor ad libraries into strategic intelligence in minutes.

## What you get
- Messaging theme analysis across ad variants
- CTA pattern extraction and scoring
- Creative strategy breakdown
- Competitive positioning gaps

## How to use
1. Provide a competitor name or ad library URL
2. Specify the channels to analyze (Meta, Google, TikTok, LinkedIn)
3. Get a structured breakdown of themes, CTAs, and winning patterns`,
    whenToUse:
      'Use before launching campaigns or repositioning. Best run quarterly as a competitive intelligence ritual.',
    price: '$4.99',
    priceUsdc: 4.99,
    category: 'strategy',
    tags: ['growth', 'competitive', 'ads', 'intelligence'],
    stars: 56000,
    weeklyInstalls: 1800,
    totalPurchases: 9200,
    featured: false,
    createdAt: '2025-03-01',
    creatorWallet: 'CYVikdfqKK1SmPasR93k1p6CntrmqGW4YcoSYQQ2TeVp',
  },
  {
    id: 'lead-research-assistant',
    author: 'composiohq',
    slug: 'lead-research-assistant',
    name: 'Lead Research Assistant',
    tagline: 'Identify, qualify, and score ideal leads with outreach strategy.',
    description:
      'Identifies, qualifies, and scores ideal leads with company context and outreach strategy. Acts like a compact sales intelligence pipeline from intent to outreach.',
    readme: `# Lead Research Assistant

From ICP definition to ranked lead list with outreach strategy — automated.

## What you get
- ICP-matched lead discovery
- Company context enrichment
- Intent signal scoring
- Personalized outreach angle per account

## How to use
1. Describe your Ideal Customer Profile (ICP)
2. Set target geography, company size, and verticals
3. Get a ranked list with outreach strategy per account`,
    whenToUse:
      'Use at the start of an outbound campaign or when entering a new market segment.',
    price: '$7.99',
    priceUsdc: 7.99,
    category: 'strategy',
    tags: ['sales', 'leads', 'outbound', 'ICP'],
    stars: 56000,
    weeklyInstalls: 2200,
    totalPurchases: 11400,
    featured: false,
    createdAt: '2025-03-05',
    creatorWallet: 'CYVikdfqKK1SmPasR93k1p6CntrmqGW4YcoSYQQ2TeVp',
  },
  {
    id: 'changelog-generator',
    author: 'composiohq',
    slug: 'changelog-generator',
    name: 'Changelog Generator',
    tagline: 'Convert git commits into polished customer-facing release notes.',
    description:
      'Converts technical git commits into polished release notes and customer-facing updates. Bridges engineering output and marketing communication automatically.',
    readme: `# Changelog Generator

Turn raw git history into release notes your customers actually want to read.

## What you get
- Customer-facing changelog formatted for release pages
- Technical → human translation for each commit group
- Version heading and date formatting
- Optional emoji categorization

## How to use
\`\`\`bash
git log --oneline v1.0.0..HEAD | leverbrain run changelog-generator
\`\`\``,
    whenToUse:
      'Use every release cycle. Most effective when commits follow conventional commit format.',
    price: '$2.99',
    priceUsdc: 2.99,
    category: 'skill',
    tags: ['devtools', 'release', 'documentation', 'git'],
    stars: 56000,
    weeklyInstalls: 3100,
    totalPurchases: 14800,
    featured: false,
    createdAt: '2025-03-12',
    creatorWallet: 'CYVikdfqKK1SmPasR93k1p6CntrmqGW4YcoSYQQ2TeVp',
  },
  {
    id: 'tailored-resume-generator',
    author: 'composiohq',
    slug: 'tailored-resume-generator',
    name: 'Tailored Resume Generator',
    tagline: 'Map job requirements to your experience. Get ATS-ready output.',
    description:
      'Maps job requirements to your experience and generates ATS-ready customized resume versions. Converts a job listing directly into optimized, role-specific resume output.',
    readme: `# Tailored Resume Generator

Stop sending the same resume to every job. This skill rewrites it for each role.

## What you get
- Role-specific resume version with strategic emphasis
- ATS keyword optimization
- Achievement reframing for the target role
- Cover letter starter (optional)

## How to use
1. Paste your base resume
2. Paste the target job description
3. Get a tailored version with a diff of what changed and why`,
    whenToUse:
      'Use when applying to roles where you meet >60% of requirements but your resume doesn\'t emphasize the right things.',
    price: 'Free',
    priceUsdc: 0,
    category: 'skill',
    tags: ['career', 'resume', 'job-search', 'ATS'],
    stars: 56000,
    weeklyInstalls: 3500,
    totalPurchases: 19200,
    featured: false,
    createdAt: '2025-02-20',
  },
  {
    id: 'agency-in-a-box',
    author: 'leverbrain',
    slug: 'agency-in-a-box',
    name: 'Agency in a Box',
    tagline: 'Launch a productized service business with full operational stack.',
    description:
      'A complete blueprint for launching a productized service agency: positioning, pricing tiers, proposal templates, onboarding flow, delivery process, and client success system. Everything in one deployable package.',
    readme: `# Agency in a Box

The complete operational blueprint for launching a productized service business.

## What you get
- Positioning framework and niche selection guide
- 3-tier pricing structure with templates
- Client onboarding flow (forms, welcome sequence, kickoff call agenda)
- Delivery SOPs for common service types
- Client success and retention system

## Included files
\`\`\`
agency-in-a-box/
├── SKILL.md                 # Main guide
├── templates/
│   ├── proposal.md          # Editable proposal
│   ├── onboarding.md        # Client onboarding checklist
│   └── case-study.md        # Case study template
└── scripts/
    └── pricing-calculator   # Revenue projections
\`\`\``,
    whenToUse:
      'Use when you\'re starting a service business or converting an existing freelance practice into a productized model. Best for consultants, agencies, and builders looking to productize expertise.',
    price: '$49.00',
    priceUsdc: 49.00,
    category: 'blueprint',
    tags: ['agency', 'business', 'productized', 'operations'],
    stars: 2400,
    weeklyInstalls: 890,
    totalPurchases: 3100,
    featured: true,
    createdAt: '2025-04-01',
    creatorWallet: 'CYVikdfqKK1SmPasR93k1p6CntrmqGW4YcoSYQQ2TeVp',
    imageUrl: '/images/skills/agency-box.png',
    overviewHtml: `
      <div class="skill-enrichment">
        <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; margin-bottom: 32px; border: 1px solid var(--color-border);">
          <img src="/images/skills/agency-box.png" style="width: 100%; aspect-ratio: 16/7; object-fit: cover; opacity: 0.8;" />
          <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 40%, #120e0a 95%);"></div>
          <div style="position: absolute; bottom: 24px; left: 24px;">
            <h2 style="font-family: var(--font-display); color: var(--color-accent); margin: 0; font-size: 32px;">Agency in a Box</h2>
            <p style="margin: 8px 0 0; color: var(--color-text-secondary);">The complete operational stack for productized services.</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 32px;">
          <div>
            <h3 style="color: var(--color-text-primary); margin-bottom: 16px;">The Stack</h3>
            <p style="margin-bottom: 24px;">Don't build from scratch. Agency in a Box provides the positioning, pricing, onboarding, and delivery SOPs you need to scale a service business like a SaaS.</p>
            
            <h3 style="color: var(--color-text-primary); margin-bottom: 16px;">Included Modules</h3>
            <ul style="color: var(--color-text-secondary); padding-left: 20px;">
              <li style="margin-bottom: 8px;">Tiered Pricing Frameworks</li>
              <li style="margin-bottom: 8px;">Client Onboarding Automations</li>
              <li>Delivery SOPs & Success Metrics</li>
            </ul>
          </div>
          
          <div style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: 12px; padding: 24px;">
            <h4 style="color: var(--color-accent); margin-bottom: 16px; font-family: var(--font-display);">CONTROL PANEL</h4>
            <div style="background: #120e0a; border-radius: 8px; border: 1px solid #ffbc6833; padding: 16px;">
              <div style="display: flex; justify-content: space-between; font-size: 10px; color: #9c7a52; margin-bottom: 12px;">
                <span>MRR</span>
                <span>RETENTION</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 18px; color: #ffbc68; font-family: var(--font-display);">
                <span>$24,500</span>
                <span>94.2%</span>
              </div>
              <div style="margin-top: 16px; font-size: 9px; color: #34d399;">+ 12.4% THIS MONTH</div>
            </div>
          </div>
        </div>
      </div>
    `,
    previewHtml: `
      <div style="background: #120e0a; border: 1px solid #ffbc6844; border-radius: 12px; font-family: 'Saira', sans-serif; color: #ffe3be; overflow: hidden;">
        <div style="background: #ffbc68; color: #120e0a; padding: 12px 24px; font-weight: 700; display: flex; justify-content: space-between; align-items: center;">
          <span>AGENCY COMMAND CENTER</span>
          <span style="font-family: monospace; font-size: 12px;">OPERATIONAL v4.0</span>
        </div>
        <div style="display: grid; grid-template-columns: 200px 1fr; height: 320px;">
          <div style="background: #1a140f; border-right: 1px solid #ffbc6822; padding: 16px;">
            <div style="font-size: 11px; color: #9c7a52; margin-bottom: 16px; text-transform: uppercase;">Active Pipeline</div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <div style="font-size: 13px; color: #ffbc68; background: #ffbc6811; padding: 8px; border-radius: 4px;">Acme Corp</div>
              <div style="font-size: 13px; color: #d5b185; padding: 8px;">Globex Inc</div>
              <div style="font-size: 13px; color: #d5b185; padding: 8px;">Initech</div>
              <div style="font-size: 13px; color: #d5b185; padding: 8px;">Stark Ind.</div>
            </div>
          </div>
          <div style="padding: 24px; background: #120e0a;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
              <div style="background: #1a140f; padding: 16px; border-radius: 8px; border: 1px solid #ffbc6811;">
                <div style="font-size: 11px; color: #9c7a52; margin-bottom: 4px;">Monthly Revenue</div>
                <div style="font-size: 24px; color: #ffbc68; font-weight: 600;">$14,200</div>
              </div>
              <div style="background: #1a140f; padding: 16px; border-radius: 8px; border: 1px solid #ffbc6811;">
                <div style="font-size: 11px; color: #9c7a52; margin-bottom: 4px;">Client Satisfaction</div>
                <div style="font-size: 24px; color: #ffbc68; font-weight: 600;">98%</div>
              </div>
            </div>
            <div style="font-size: 12px; color: #9c7a52; margin-bottom: 12px;">Recent Milestones</div>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div style="display: flex; align-items: center; gap: 12px; font-size: 13px; color: #d5b185;">
                <div style="width: 8px; height: 8px; background: #34d399; border-radius: 50%;"></div>
                <span>Acme Corp: Onboarding complete</span>
              </div>
              <div style="display: flex; align-items: center; gap: 12px; font-size: 13px; color: #d5b185;">
                <div style="width: 8px; height: 8px; background: #fbbf24; border-radius: 50%;"></div>
                <span>Globex: Proposal pending review</span>
              </div>
              <div style="display: flex; align-items: center; gap: 12px; font-size: 13px; color: #d5b185;">
                <div style="width: 8px; height: 8px; background: #60a5fa; border-radius: 50%;"></div>
                <span>New Lead: Stark Industries (Tier 1)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'saas-gtm-playbook',
    author: 'leverbrain',
    slug: 'saas-gtm-playbook',
    name: 'SaaS GTM Playbook',
    tagline: 'Full go-to-market strategy for early-stage SaaS products.',
    description:
      'A structured go-to-market strategy covering positioning, ICP definition, channel selection, early traction playbook, and metrics framework for early-stage SaaS.',
    readme: `# SaaS GTM Playbook

From zero to first 100 customers with a repeatable, documented process.

## What you get
- ICP definition framework
- Positioning and messaging guide
- Channel selection decision tree
- Outbound and inbound activation playbooks
- Week-by-week 90-day traction plan
- Key metrics and milestone framework

## How to use
Work through sections sequentially or jump to the module you need.`,
    whenToUse:
      'Use at idea validation stage or when preparing for a launch. Best before spending on paid acquisition.',
    price: '$29.00',
    priceUsdc: 29.00,
    category: 'strategy',
    tags: ['saas', 'gtm', 'growth', 'startup'],
    stars: 1800,
    weeklyInstalls: 740,
    totalPurchases: 2800,
    featured: false,
    createdAt: '2025-04-10',
    creatorWallet: 'CYVikdfqKK1SmPasR93k1p6CntrmqGW4YcoSYQQ2TeVp',
  },
  {
    id: 'd3-visualization',
    author: 'anthropics',
    slug: 'd3-visualization',
    name: 'D3.js Visualization',
    tagline: 'Build interactive chart experiences from raw datasets.',
    description:
      'Builds interactive chart experiences from pasted datasets with reusable visualization patterns. Interactive output beats static screenshots for real exploration.',
    readme: `# D3.js Visualization

Paste data, get a live interactive chart — no configuration required.

## What you get
- Auto-type detection (time series, categorical, numeric)
- Chart type recommendation + override
- Interactive tooltips and zoom
- Exportable SVG/PNG output

## How to use
1. Paste your CSV or JSON dataset
2. Describe what you want to show
3. Get a fully interactive D3 chart as an artifact`,
    whenToUse:
      'Use when presenting data that benefits from exploration — not just a static summary. Great for dashboards, reports, and data demos.',
    price: 'Free',
    priceUsdc: 0,
    category: 'skill',
    tags: ['data', 'visualization', 'd3', 'charts'],
    stars: 11500,
    weeklyInstalls: 5100,
    totalPurchases: 28000,
    featured: false,
    createdAt: '2025-01-28',
  },
  {
    id: 'meeting-insights-analyzer',
    author: 'composiohq',
    slug: 'meeting-insights-analyzer',
    name: 'Meeting Insights Analyzer',
    tagline: 'Deep behavioral analysis from meeting transcripts.',
    description:
      'Analyzes transcripts for speaking ratios, filler words, facilitation patterns, and behavior trends. Shows nuanced understanding of human communication, not just summarization.',
    readme: `# Meeting Insights Analyzer

Go beyond meeting summaries. Understand communication dynamics.

## What you get
- Per-speaker talking time and engagement ratios
- Filler word frequency analysis
- Facilitation pattern detection
- Recurring behavior trends across multiple meetings
- Actionable recommendations

## How to use
1. Paste one or more meeting transcripts
2. Specify the analysis focus (communication, decisions, action items)
3. Get a structured behavioral report`,
    whenToUse:
      'Use for team health assessments, manager coaching, and client relationship analysis.',
    price: 'Free',
    priceUsdc: 0,
    category: 'skill',
    tags: ['communication', 'meetings', 'analysis', 'HR'],
    stars: 56000,
    weeklyInstalls: 1600,
    totalPurchases: 7800,
    featured: false,
    createdAt: '2025-02-14',
  },
  {
    id: 'indiehacker-launch-kit',
    author: 'leverbrain',
    slug: 'indiehacker-launch-kit',
    name: 'Indie Hacker Launch Kit',
    tagline: 'Launch on Product Hunt, HN, and X in one coordinated push.',
    description:
      'A complete launch playbook for indie makers: pre-launch build-up, Product Hunt submission strategy, Hacker News Show HN timing, X/Twitter thread templates, and post-launch follow-up sequences.',
    readme: `# Indie Hacker Launch Kit

The coordinated launch playbook for solo builders.

## What you get
- 30-day pre-launch build-up checklist
- Product Hunt listing copy + hunter outreach templates
- Hacker News Show HN structure + timing guide
- X thread templates for launch day
- Email announcement templates
- Post-launch follow-up sequence (days 1, 3, 7, 30)

## Launch day command center
A single markdown file you run from with all the posts, DMs, and submissions pre-written.`,
    whenToUse:
      'Use 4 weeks before your planned launch date. Run through the pre-launch checklist first, then use the day-of guide.',
    price: '$19.00',
    priceUsdc: 19.00,
    category: 'blueprint',
    tags: ['launch', 'indie', 'marketing', 'product-hunt'],
    stars: 3100,
    weeklyInstalls: 1200,
    totalPurchases: 4500,
    featured: true,
    createdAt: '2025-04-15',
    creatorWallet: 'CYVikdfqKK1SmPasR93k1p6CntrmqGW4YcoSYQQ2TeVp',
    imageUrl: '/images/skills/indie-launch.png',
    overviewHtml: `
      <div class="skill-enrichment">
        <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; margin-bottom: 32px; border: 1px solid var(--color-border);">
          <img src="/images/skills/indie-launch.png" style="width: 100%; aspect-ratio: 16/7; object-fit: cover; opacity: 0.8;" />
          <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 40%, #120e0a 95%);"></div>
          <div style="position: absolute; bottom: 24px; left: 24px;">
            <h2 style="font-family: var(--font-display); color: var(--color-accent); margin: 0; font-size: 32px;">Indie Hacker Launch Kit</h2>
            <p style="margin: 8px 0 0; color: var(--color-text-secondary);">The coordinated strike for Product Hunt, HN, and X.</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 32px;">
          <div>
            <h3 style="color: var(--color-text-primary); margin-bottom: 16px;">The Playbook</h3>
            <p style="margin-bottom: 24px;">Stop launching to crickets. This kit coordinates your pre-launch hype, launch day submissions, and post-launch follow-up into a single unified campaign.</p>
            
            <h3 style="color: var(--color-text-primary); margin-bottom: 16px;">Phases</h3>
            <ul style="color: var(--color-text-secondary); padding-left: 20px;">
              <li style="margin-bottom: 8px;">T-Minus 30: Hype Cycle</li>
              <li style="margin-bottom: 8px;">Day 0: Distribution Strike</li>
              <li>Day +7: Retention Sequence</li>
            </ul>
          </div>
          
          <div style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: 12px; padding: 24px;">
            <h4 style="color: var(--color-accent); margin-bottom: 16px; font-family: var(--font-display);">MISSION STATUS</h4>
            <div style="background: #120e0a; border-radius: 8px; border: 1px solid #ffbc6833; padding: 16px;">
              <div style="font-size: 11px; color: #ffbc68; margin-bottom: 8px;">[✓] PH Listing Optimized</div>
              <div style="font-size: 11px; color: #ffbc68; margin-bottom: 8px;">[✓] 50 Hunters Notified</div>
              <div style="font-size: 11px; color: #ffbc68;">[✓] HN Copy Finalized</div>
              <div style="margin-top: 12px; font-size: 24px; font-weight: 700; color: #ffbc68;">T-12:04:22</div>
            </div>
          </div>
        </div>
      </div>
    `,
    previewHtml: `
      <div style="background: #1a140f; border: 1px solid #ffbc6844; border-radius: 12px; font-family: 'Saira', sans-serif; color: #ffe3be; overflow: hidden;">
        <div style="padding: 20px 24px; background: linear-gradient(90deg, #ff9a3d22, transparent); border-bottom: 1px solid #ffbc6822;">
          <h3 style="margin: 0; color: #ffbc68;">🚀 LAUNCH DASHBOARD</h3>
        </div>
        <div style="padding: 24px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 24px;">
            <div style="background: #120e0a; border: 1px solid #ffbc6822; padding: 12px; border-radius: 6px; text-align: center;">
              <div style="font-size: 20px; font-weight: 700;">T-24h</div>
              <div style="font-size: 10px; color: #9c7a52; text-transform: uppercase;">Until Launch</div>
            </div>
            <div style="background: #120e0a; border: 1px solid #ffbc6822; padding: 12px; border-radius: 6px; text-align: center;">
              <div style="font-size: 20px; font-weight: 700; color: #34d399;">12</div>
              <div style="font-size: 10px; color: #9c7a52; text-transform: uppercase;">Hunters Contacted</div>
            </div>
            <div style="background: #120e0a; border: 1px solid #ffbc6822; padding: 12px; border-radius: 6px; text-align: center;">
              <div style="font-size: 20px; font-weight: 700; color: #ffbc68;">4</div>
              <div style="font-size: 10px; color: #9c7a52; text-transform: uppercase;">Threads Ready</div>
            </div>
          </div>
          <div style="font-size: 12px; color: #9c7a52; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Critical Path Checklist</div>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 12px; background: rgba(52, 211, 153, 0.05); padding: 10px; border-radius: 6px; border: 1px solid rgba(52, 211, 153, 0.1);">
              <div style="width: 14px; height: 14px; background: #34d399; border-radius: 3px; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #120e0a;">✓</div>
              <span style="font-size: 13px;">Finalize Product Hunt taglines and primary image</span>
            </div>
            <div style="display: flex; align-items: center; gap: 12px; background: rgba(251, 191, 36, 0.05); padding: 10px; border-radius: 6px; border: 1px solid rgba(251, 191, 36, 0.1);">
              <div style="width: 14px; height: 14px; background: #fbbf24; border-radius: 3px; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #120e0a;">⚡</div>
              <span style="font-size: 13px;">Schedule HN "Show HN" for Tuesday 7:00 AM PST</span>
            </div>
            <div style="display: flex; align-items: center; gap: 12px; background: rgba(156, 122, 82, 0.1); padding: 10px; border-radius: 6px; border: 1px solid #ffbc6811;">
              <div style="width: 14px; height: 14px; border: 1px solid #9c7a52; border-radius: 3px;"></div>
              <span style="font-size: 13px; color: #9c7a52;">Draft X "Build in Public" summary thread</span>
            </div>
          </div>
        </div>
      </div>
    `
  },
]

export function getSkillByAuthorSlug(author: string, slug: string): SkillListing | undefined {
  return SKILLS.find((s) => s.author === author && s.slug === slug)
}

export function getSkillsByAuthor(author: string): SkillListing[] {
  return SKILLS.filter((s) => s.author === author)
}

export function getFeaturedSkills(): SkillListing[] {
  const featured = SKILLS
    .filter((s) => s.featured)
    .sort((a, b) => b.totalPurchases - a.totalPurchases)

  if (featured.length >= 10) {
    return featured.slice(0, 10)
  }

  const fallback = SKILLS
    .filter((s) => !s.featured)
    .sort((a, b) => b.totalPurchases - a.totalPurchases)

  return [...featured, ...fallback].slice(0, 10)
}

export function searchSkills(query: string): SkillListing[] {
  const q = query.toLowerCase()
  return SKILLS.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.tagline.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.tags.some((t) => t.toLowerCase().includes(q)) ||
      s.author.toLowerCase().includes(q) ||
      s.category.includes(q)
  )
}

export function getSkillsByCategory(category: SkillCategory): SkillListing[] {
  return SKILLS.filter((s) => s.category === category)
}
