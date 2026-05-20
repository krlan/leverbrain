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
      <div class="cozy-room-container">
        <!-- Local styles to prevent leaks and define animations/grid/tabs -->
        <style>
          .cozy-room-container {
            background: #0b0907;
            border: 2px solid rgba(255, 188, 104, 0.15);
            border-radius: 16px;
            padding: 32px;
            position: relative;
            overflow: hidden;
            color: #ffe8d1;
            font-family: inherit;
            box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.9);
          }
          
          /* Ambient glowing lamp beam */
          .cozy-lamp-glow {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 500px;
            height: 350px;
            background: radial-gradient(circle at top, rgba(255, 188, 104, 0.14) 0%, rgba(255, 188, 104, 0.03) 45%, transparent 70%);
            pointer-events: none;
            z-index: 0;
          }
          
          .cozy-lamp-fixture {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            z-index: 2;
            opacity: 0.95;
          }

          /* Gamey grid background */
          .cozy-grid-bg {
            position: absolute;
            inset: 0;
            background-image: 
              linear-gradient(rgba(255, 188, 104, 0.015) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 188, 104, 0.015) 1px, transparent 1px);
            background-size: 20px 20px;
            pointer-events: none;
            z-index: 0;
          }

          /* Header Layout */
          .cozy-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 32px;
            border-bottom: 1px dashed rgba(255, 188, 104, 0.15);
            padding-bottom: 24px;
            position: relative;
            z-index: 1;
            flex-wrap: wrap;
            gap: 16px;
          }

          .cozy-header-title h2 {
            font-family: var(--font-display);
            color: #ffbc68;
            font-size: 28px;
            margin: 0;
            text-shadow: 0 0 10px rgba(255, 188, 104, 0.2);
            letter-spacing: 0.02em;
          }
          .cozy-header-title p {
            margin: 6px 0 0;
            font-size: 13px;
            color: #bfa38a;
          }

          .loop-assistant-avatar {
            display: flex;
            align-items: center;
            gap: 12px;
            background: rgba(255, 188, 104, 0.06);
            border: 1px solid rgba(255, 188, 104, 0.12);
            padding: 8px 16px;
            border-radius: 12px;
          }

          .loop-avatar-orb {
            width: 32px;
            height: 32px;
            background: radial-gradient(circle at 35% 35%, #ffebd0, #ffbc68 60%, #b27329 100%);
            border-radius: 50%;
            box-shadow: 0 0 15px rgba(255, 188, 104, 0.6);
            animation: floatOrb 3s ease-in-out infinite;
          }

          /* Radio tab system */
          .cozy-tabs-container {
            display: flex;
            flex-direction: column;
            gap: 24px;
            position: relative;
            z-index: 1;
          }

          .cozy-tab-triggers {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
          }

          .cozy-tab-trigger {
            background: rgba(18, 14, 11, 0.8);
            border: 1px solid rgba(255, 188, 104, 0.12);
            border-radius: 8px;
            padding: 8px 16px;
            color: #bfa38a;
            font-family: var(--font-mono);
            font-size: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .cozy-tab-trigger:hover {
            color: #ffbc68;
            border-color: rgba(255, 188, 104, 0.3);
            background: rgba(255, 188, 104, 0.04);
          }

          /* Link radio state to triggers */
          #tab-blueprint:checked ~ .cozy-tab-triggers label[for="tab-blueprint"],
          #tab-reactor:checked ~ .cozy-tab-triggers label[for="tab-reactor"],
          #tab-sim:checked ~ .cozy-tab-triggers label[for="tab-sim"] {
            color: #ffbc68;
            border-color: #ffbc68;
            background: rgba(255, 188, 104, 0.08);
            box-shadow: 0 0 10px rgba(255, 188, 104, 0.1);
          }

          .cozy-tab-panel {
            display: none;
            background: rgba(18, 14, 11, 0.85);
            border: 1px solid rgba(255, 188, 104, 0.1);
            border-radius: 12px;
            padding: 24px;
            animation: panelFade 0.3s ease-out;
          }

          #tab-blueprint:checked ~ .panel-blueprint,
          #tab-reactor:checked ~ .panel-reactor,
          #tab-sim:checked ~ .panel-sim {
            display: block;
          }

          /* Custom grid/diagram lists */
          .blueprint-grid {
            display: grid;
            grid-template-columns: 1.2fr 1fr;
            gap: 24px;
            align-items: center;
          }

          .blueprint-card {
            border: 1px solid rgba(255, 188, 104, 0.12);
            border-radius: 8px;
            padding: 16px;
            background: rgba(255, 188, 104, 0.02);
          }

          /* Gamey inventory slots style */
          .specimen-slots {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            margin-top: 16px;
          }

          .inventory-slot {
            aspect-ratio: 1;
            background: rgba(10, 8, 6, 0.8);
            border: 1px dashed rgba(255, 188, 104, 0.2);
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 8px;
            transition: all 0.2s ease;
          }

          .inventory-slot:hover {
            border-style: solid;
            border-color: #ffbc68;
            background: rgba(255, 188, 104, 0.05);
            transform: translateY(-2px);
          }

          /* Animations */
          @keyframes floatOrb {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }

          @keyframes panelFade {
            from { opacity: 0; transform: translateY(4px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @media (max-width: 768px) {
            .blueprint-grid {
              grid-template-columns: 1fr;
            }
          }
        </style>

        <div class="cozy-lamp-glow"></div>
        <div class="cozy-grid-bg"></div>

        <!-- Lamp Drawing at the very top -->
        <div class="cozy-lamp-fixture">
          <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
            <path d="M12 2h16v4H12z" fill="#36291e" />
            <path d="M6 6h28v6c0 4.4-3.6 8-8 8H14c-4.4 0-8-3.6-8-8V6z" fill="#b27329" stroke="#ffbc68" stroke-width="1.5" />
            <circle cx="20" cy="18" r="3" fill="#ffebd0" filter="drop-shadow(0 0 8px #ffbc68)" />
          </svg>
        </div>

        <!-- Cozy Header -->
        <div class="cozy-header">
          <div class="cozy-header-title">
            <h2>Canvas Builder</h2>
            <p>A workbench for building beautiful UI artifacts in real time.</p>
          </div>
          <div class="loop-assistant-avatar">
            <div class="loop-avatar-orb"></div>
            <div>
              <div style="font-size: 11px; font-family: var(--font-mono); color: #ffbc68; font-weight: bold;">LOOP</div>
              <div style="font-size: 10px; color: #bfa38a;">Systems Operator</div>
            </div>
          </div>
        </div>

        <!-- Cozy Tab System -->
        <div class="cozy-tabs-container">
          <input type="radio" id="tab-blueprint" name="cozy-panel" checked style="display:none;" />
          <input type="radio" id="tab-reactor" name="cozy-panel" style="display:none;" />
          <input type="radio" id="tab-sim" name="cozy-panel" style="display:none;" />

          <div class="cozy-tab-triggers">
            <label for="tab-blueprint" class="cozy-tab-trigger">01. BLUEPRINT</label>
            <label for="tab-reactor" class="cozy-tab-trigger">02. COMPILER REACTOR</label>
            <label for="tab-sim" class="cozy-tab-trigger">03. WORKBENCH SIM</label>
          </div>

          <!-- Tab 1: Blueprint -->
          <div class="cozy-tab-panel panel-blueprint">
            <div class="blueprint-grid">
              <div>
                <h3 style="color: #ffbc68; margin-top: 0; margin-bottom: 12px; font-family: var(--font-display);">Autonomous Visual Architecting</h3>
                <p style="font-size: 14px; line-height: 1.6; color: #d0bda7; margin-bottom: 16px;">
                  The Canvas Builder automates frontend asset creation by mapping instructions directly into strict structural design trees. It balances grids, coordinates typographic rhythm, and applies tailored OKLCH palettes.
                </p>
                <div class="blueprint-card">
                  <h4 style="margin: 0 0 8px; font-size: 12px; color: #ffbc68; font-family: var(--font-mono);">CAPABILITIES DETECTED</h4>
                  <ul style="margin: 0; padding-left: 16px; font-size: 13px; color: #bfa38a; line-height: 1.5;">
                    <li>Tailwind utility injection & layout alignment</li>
                    <li>Sleek micro-animations & physical ease states</li>
                    <li>Responsive container resizing constraints</li>
                  </ul>
                </div>
              </div>
              <div>
                <!-- Cozy Vector isometric diagram of compilation steps -->
                <svg viewBox="0 0 200 160" width="100%" style="overflow: visible;">
                  <!-- Isometric base plate -->
                  <polygon points="100,20 180,60 100,100 20,60" fill="rgba(255, 188, 104, 0.03)" stroke="rgba(255, 188, 104, 0.15)" stroke-width="1.5" />
                  
                  <!-- Stacked blocks -->
                  <!-- Block 1: Colors (Bottom) -->
                  <polygon points="100,75 140,95 100,115 60,95" fill="#362315" stroke="#ffbc68" stroke-dasharray="3 3" />
                  <polygon points="60,95 100,115 100,125 60,105" fill="#24160d" stroke="#ffbc68" />
                  <polygon points="100,115 140,95 140,105 100,125" fill="#1c110a" stroke="#ffbc68" />
                  <text x="100" y="107" font-size="8" font-family="monospace" fill="#ffbc68" text-anchor="middle">COLORS</text>

                  <!-- Block 2: Grid (Middle) -->
                  <polygon points="100,50 140,70 100,90 60,70" fill="#ffbc6822" stroke="#ffbc68" stroke-width="1.5" />
                  <polygon points="60,70 100,90 100,100 60,80" fill="#ffbc6811" stroke="#ffbc68" stroke-width="1.5" />
                  <polygon points="100,90 140,70 140,80 100,100" fill="#ffbc6808" stroke="#ffbc68" stroke-width="1.5" />
                  <text x="100" y="82" font-size="8" font-family="monospace" fill="#ffbc68" text-anchor="middle" font-weight="bold">LAYOUT GRID</text>

                  <!-- Block 3: UI Output (Top, floating) -->
                  <g style="transform: translateY(-15px); filter: drop-shadow(0 10px 15px rgba(255,188,104,0.15));">
                    <polygon points="100,25 150,50 100,75 50,50" fill="#120e0a" stroke="#ffe8d1" stroke-width="1.5" />
                    <polygon points="50,50 100,75 100,82 50,57" fill="#0d0a08" stroke="#ffe8d1" stroke-width="1.5" />
                    <polygon points="100,75 150,50 150,57 100,82" fill="#080605" stroke="#ffe8d1" stroke-width="1.5" />
                    <circle cx="100" cy="50" r="14" fill="#ffbc68" opacity="0.15" />
                    <!-- Cute small cursor -->
                    <polygon points="105,48 105,58 112,54" fill="#ffbc68" />
                  </g>
                </svg>
              </div>
            </div>
          </div>

          <!-- Tab 2: Compiler Reactor -->
          <div class="cozy-tab-panel panel-reactor">
            <h3 style="color: #ffbc68; margin-top: 0; margin-bottom: 16px; font-family: var(--font-display);">Reactor Diagnostic Logs</h3>
            <div style="background: #070605; border: 1px solid rgba(255, 188, 104, 0.15); border-radius: 8px; padding: 16px; font-family: var(--font-mono); font-size: 12px; line-height: 1.6; color: #a99684; max-height: 200px; overflow-y: auto;">
              <div><span style="color: #8c7664;">[02:20:11]</span> <span style="color: #ffbc68;">[SYSTEM]</span> Initializing Canvas compilation sequence...</div>
              <div><span style="color: #8c7664;">[02:20:12]</span> <span style="color: #3fb950;">[LOOP]</span> Verification scan loaded: 43 elements verified.</div>
              <div><span style="color: #8c7664;">[02:20:12]</span> <span style="color: #3fb950;">[LOOP]</span> Injecting local scoped stylesheet constraints...</div>
              <div><span style="color: #8c7664;">[02:20:13]</span> <span style="color: #58a6ff;">[INFO]</span> Building color mapping: HSL tokens applied to dark container.</div>
              <div><span style="color: #8c7664;">[02:20:14]</span> <span style="color: #ff5f56;">[WARN]</span> Font size on secondary header adjusted down by 2px (balanced rhythm).</div>
              <div><span style="color: #8c7664;">[02:20:14]</span> <span style="color: #3fb950;">[LOOP]</span> Output viewport successfully mounted. Standing by.</div>
            </div>
          </div>

          <!-- Tab 3: Workbench Sim -->
          <div class="cozy-tab-panel panel-sim">
            <h3 style="color: #ffbc68; margin-top: 0; margin-bottom: 12px; font-family: var(--font-display);">Interactive Workbench Previews</h3>
            <p style="font-size: 13px; color: #bfa38a; margin-bottom: 20px;">Hover over inventory items to inspect specs compiled on the workbench:</p>
            <div class="specimen-slots">
              <div class="inventory-slot">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffbc68" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                <div style="font-size: 11px; font-family: var(--font-mono); color: #ffe8d1;">Grid Dashboard</div>
                <div style="font-size: 9px; color: #8c7664; font-family: var(--font-mono);">v1.0 - 4KB</div>
              </div>
              <div class="inventory-slot">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffbc68" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                <div style="font-size: 11px; font-family: var(--font-mono); color: #ffe8d1;">SaaS Pricing</div>
                <div style="font-size: 9px; color: #8c7664; font-family: var(--font-mono);">v1.2 - 6KB</div>
              </div>
              <div class="inventory-slot">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffbc68" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                <div style="font-size: 11px; font-family: var(--font-mono); color: #ffe8d1;">Checkout Box</div>
                <div style="font-size: 9px; color: #8c7664; font-family: var(--font-mono);">v2.1 - 3KB</div>
              </div>
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
    overviewHtml: `
      <div class="cozy-room-container">
        <style>
          .cozy-room-container {
            background: #0a0807;
            border: 2px solid rgba(255, 188, 104, 0.15);
            border-radius: 16px;
            padding: 32px;
            position: relative;
            overflow: hidden;
            color: #ffe8d1;
            font-family: inherit;
            box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.9);
          }
          .cozy-lamp-glow {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 500px;
            height: 350px;
            background: radial-gradient(circle at top, rgba(255, 188, 104, 0.14) 0%, rgba(255, 188, 104, 0.03) 45%, transparent 70%);
            pointer-events: none;
            z-index: 0;
          }
          .cozy-lamp-fixture {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            z-index: 2;
            opacity: 0.95;
          }
          .cozy-grid-bg {
            position: absolute;
            inset: 0;
            background-image: 
              linear-gradient(rgba(255, 188, 104, 0.012) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 188, 104, 0.012) 1px, transparent 1px);
            background-size: 20px 20px;
            pointer-events: none;
            z-index: 0;
          }
          .cozy-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 32px;
            border-bottom: 1px dashed rgba(255, 188, 104, 0.15);
            padding-bottom: 24px;
            position: relative;
            z-index: 1;
            flex-wrap: wrap;
            gap: 16px;
          }
          .cozy-header-title h2 {
            font-family: var(--font-display);
            color: #ffbc68;
            font-size: 28px;
            margin: 0;
            text-shadow: 0 0 10px rgba(255, 188, 104, 0.2);
            letter-spacing: 0.02em;
          }
          .cozy-header-title p {
            margin: 6px 0 0;
            font-size: 13px;
            color: #bfa38a;
          }
          .red-assistant-avatar {
            display: flex;
            align-items: center;
            gap: 12px;
            background: rgba(239, 68, 68, 0.06);
            border: 1px solid rgba(239, 68, 68, 0.15);
            padding: 8px 16px;
            border-radius: 12px;
          }
          .red-avatar-orb {
            width: 32px;
            height: 32px;
            background: radial-gradient(circle at 35% 35%, #ffc5c5, #ef4444 60%, #991b1b 100%);
            border-radius: 6px; /* Angular drone shape */
            transform: rotate(45deg);
            box-shadow: 0 0 15px rgba(239, 68, 68, 0.6);
            animation: floatDrone 3s ease-in-out infinite;
          }
          .cozy-tabs-container {
            display: flex;
            flex-direction: column;
            gap: 24px;
            position: relative;
            z-index: 1;
          }
          .cozy-tab-triggers {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
          }
          .cozy-tab-trigger {
            background: rgba(18, 14, 11, 0.8);
            border: 1px solid rgba(255, 188, 104, 0.12);
            border-radius: 8px;
            padding: 8px 16px;
            color: #bfa38a;
            font-family: var(--font-mono);
            font-size: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .cozy-tab-trigger:hover {
            color: #ffbc68;
            border-color: rgba(255, 188, 104, 0.3);
            background: rgba(255, 188, 104, 0.04);
          }
          #tab-ads-spy:checked ~ .cozy-tab-triggers label[for="tab-ads-spy"],
          #tab-ads-logs:checked ~ .cozy-tab-triggers label[for="tab-ads-logs"],
          #tab-ads-inventory:checked ~ .cozy-tab-triggers label[for="tab-ads-inventory"] {
            color: #ffbc68;
            border-color: #ffbc68;
            background: rgba(255, 188, 104, 0.08);
            box-shadow: 0 0 10px rgba(255, 188, 104, 0.1);
          }
          .cozy-tab-panel {
            display: none;
            background: rgba(18, 14, 11, 0.85);
            border: 1px solid rgba(255, 188, 104, 0.1);
            border-radius: 12px;
            padding: 24px;
            animation: panelFade 0.3s ease-out;
          }
          #tab-ads-spy:checked ~ .panel-ads-spy,
          #tab-ads-logs:checked ~ .panel-ads-logs,
          #tab-ads-inventory:checked ~ .panel-ads-inventory {
            display: block;
          }
          .spy-grid {
            display: grid;
            grid-template-columns: 1.2fr 1fr;
            gap: 24px;
            align-items: center;
          }
          .blueprint-card {
            border: 1px solid rgba(255, 188, 104, 0.12);
            border-radius: 8px;
            padding: 16px;
            background: rgba(255, 188, 104, 0.02);
          }
          .specimen-slots {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            margin-top: 16px;
          }
          .inventory-slot {
            aspect-ratio: 1;
            background: rgba(10, 8, 6, 0.8);
            border: 1px dashed rgba(255, 188, 104, 0.2);
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 8px;
            transition: all 0.2s ease;
          }
          .inventory-slot:hover {
            border-style: solid;
            border-color: #ffbc68;
            background: rgba(255, 188, 104, 0.05);
            transform: translateY(-2px);
          }
          @keyframes floatDrone {
            0%, 100% { transform: rotate(45deg) translateY(0); }
            50% { transform: rotate(45deg) translateY(-4px); }
          }
          @keyframes panelFade {
            from { opacity: 0; transform: translateY(4px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @media (max-width: 768px) {
            .spy-grid {
              grid-template-columns: 1fr;
            }
          }
        </style>

        <div class="cozy-lamp-glow"></div>
        <div class="cozy-grid-bg"></div>

        <div class="cozy-lamp-fixture">
          <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
            <path d="M12 2h16v4H12z" fill="#36291e" />
            <path d="M6 6h28v6c0 4.4-3.6 8-8 8H14c-4.4 0-8-3.6-8-8V6z" fill="#b27329" stroke="#ffbc68" stroke-width="1.5" />
            <circle cx="20" cy="18" r="3" fill="#ffebd0" filter="drop-shadow(0 0 8px #ffbc68)" />
          </svg>
        </div>

        <div class="cozy-header">
          <div class="cozy-header-title">
            <h2>Competitive Ads Extractor</h2>
            <p>Targeted competitor intelligence and creative format analysis.</p>
          </div>
          <div class="red-assistant-avatar">
            <div class="red-avatar-orb"></div>
            <div>
              <div style="font-size: 11px; font-family: var(--font-mono); color: #ef4444; font-weight: bold;">RED</div>
              <div style="font-size: 10px; color: #bfa38a;">Infiltration Drone</div>
            </div>
          </div>
        </div>

        <div class="cozy-tabs-container">
          <input type="radio" id="tab-ads-spy" name="cozy-panel-ads" checked style="display:none;" />
          <input type="radio" id="tab-ads-logs" name="cozy-panel-ads" style="display:none;" />
          <input type="radio" id="tab-ads-inventory" name="cozy-panel-ads" style="display:none;" />

          <div class="cozy-tab-triggers">
            <label for="tab-ads-spy" class="cozy-tab-trigger">01. SPYGLASS SENSOR</label>
            <label for="tab-ads-logs" class="cozy-tab-trigger">02. INTERCEPTION LOGS</label>
            <label for="tab-ads-inventory" class="cozy-tab-trigger">03. AD DECK INVENTORY</label>
          </div>

          <!-- Panel 1 -->
          <div class="cozy-tab-panel panel-ads-spy">
            <div class="spy-grid">
              <div>
                <h3 style="color: #ffbc68; margin-top: 0; margin-bottom: 12px; font-family: var(--font-display);">Automated Library Decoding</h3>
                <p style="font-size: 14px; line-height: 1.6; color: #d0bda7; margin-bottom: 16px;">
                  Red scans target ad transparency nodes, extracting headline variants, call-to-actions, and video hook transcripts. It converts code-heavy payloads into a clean competitor map.
                </p>
                <div class="blueprint-card">
                  <h4 style="margin: 0 0 8px; font-size: 12px; color: #ef4444; font-family: var(--font-mono);">ACTIVE SCANNERS</h4>
                  <ul style="margin: 0; padding-left: 16px; font-size: 13px; color: #bfa38a; line-height: 1.5;">
                    <li>Meta Ad Library integration</li>
                    <li>Google Ads Transparency Ingestion</li>
                    <li>TikTok Creative Center crawler</li>
                  </ul>
                </div>
              </div>
              <div>
                <!-- Isometric scanner HUD SVG -->
                <svg viewBox="0 0 200 160" width="100%" style="overflow: visible;">
                  <polygon points="100,20 180,60 100,100 20,60" fill="rgba(239, 68, 68, 0.02)" stroke="rgba(239, 68, 68, 0.15)" stroke-width="1.5" />
                  <!-- Target box -->
                  <polygon points="100,50 140,70 100,90 60,70" fill="rgba(239, 68, 68, 0.08)" stroke="#ef4444" stroke-width="1.5" />
                  <line x1="100" y1="20" x2="100" y2="100" stroke="#ef4444" stroke-width="1" stroke-dasharray="2 2" />
                  
                  <text x="100" y="82" font-size="8" font-family="monospace" fill="#ef4444" text-anchor="middle" font-weight="bold">TARGET ACQUIRED</text>
                  <!-- Scanner sweep line -->
                  <g style="animation: floatDrone 2.5s ease-in-out infinite;">
                    <line x1="40" y1="80" x2="160" y2="40" stroke="#ef4444" stroke-width="1.5" opacity="0.8" />
                  </g>
                </svg>
              </div>
            </div>
          </div>

          <!-- Panel 2 -->
          <div class="cozy-tab-panel panel-ads-logs">
            <h3 style="color: #ffbc68; margin-top: 0; margin-bottom: 16px; font-family: var(--font-display);">Diagnostic Output Logs</h3>
            <div style="background: #070605; border: 1px solid rgba(255, 188, 104, 0.15); border-radius: 8px; padding: 16px; font-family: var(--font-mono); font-size: 12px; line-height: 1.6; color: #a99684; max-height: 200px; overflow-y: auto;">
              <div><span style="color: #8c7664;">[02:22:04]</span> <span style="color: #ef4444;">[RED]</span> Target URL detected. Commencing payload retrieval.</div>
              <div><span style="color: #8c7664;">[02:22:05]</span> <span style="color: #58a6ff;">[INFO]</span> Fetching HTML structures from target transparency database.</div>
              <div><span style="color: #8c7664;">[02:22:07]</span> <span style="color: #3fb950;">[OK]</span> Parsed 12 creative variants, 3 primary hooks.</div>
              <div><span style="color: #8c7664;">[02:22:08]</span> <span style="color: #ffbc68;">[SYSTEM]</span> Ingestion compile completed. Storing details in Convex schema.</div>
            </div>
          </div>

          <!-- Panel 3 -->
          <div class="cozy-tab-panel panel-ads-inventory">
            <h3 style="color: #ffbc68; margin-top: 0; margin-bottom: 12px; font-family: var(--font-display);">Ad Assets Acquired</h3>
            <p style="font-size: 13px; color: #bfa38a; margin-bottom: 20px;">Hover over inventory items to inspect specs extracted by Red:</p>
            <div class="specimen-slots">
              <div class="inventory-slot">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="1.5"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                <div style="font-size: 11px; font-family: var(--font-mono); color: #ffe8d1;">Video Hook 1</div>
                <div style="font-size: 9px; color: #8c7664; font-family: var(--font-mono);">Meta - 92 CTR</div>
              </div>
              <div class="inventory-slot">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                <div style="font-size: 11px; font-family: var(--font-mono); color: #ffe8d1;">Banner Grid</div>
                <div style="font-size: 9px; color: #8c7664; font-family: var(--font-mono);">Google - 87 CTR</div>
              </div>
              <div class="inventory-slot">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="1.5"><line x1="6" y1="9" x2="18" y2="9"/><line x1="6" y1="15" x2="18" y2="15"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                <div style="font-size: 11px; font-family: var(--font-mono); color: #ffe8d1;">CTA Button</div>
                <div style="font-size: 9px; color: #8c7664; font-family: var(--font-mono);">LinkedIn - 98 CTR</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    previewHtml: `
      <div style="background: #120e0a; border: 1px solid #ffbc6844; border-radius: 12px; font-family: 'Saira', sans-serif; color: #ffe3be; overflow: hidden;">
        <div style="background: #ffbc68; color: #120e0a; padding: 12px 24px; font-weight: 700; display: flex; justify-content: space-between; align-items: center;">
          <span>COMPETITOR AD INSIGHTS</span>
          <span style="font-family: monospace; font-size: 12px;">META / GOOGLE ADS</span>
        </div>
        <div style="padding: 24px; background: #120e0a;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
            <div style="background: #1a140f; border: 1px solid #ffbc6822; padding: 16px; border-radius: 8px;">
              <div style="font-size: 11px; color: #9c7a52; margin-bottom: 4px;">Top Competitor CTR Hook</div>
              <div style="font-size: 14px; color: #ffbc68; font-weight: 600; margin-bottom: 8px;">"Stop coding from scratch..."</div>
              <span style="font-size: 10px; color: #34d399; background: #34d39911; padding: 2px 6px; border-radius: 4px;">Active 42 Days</span>
            </div>
            <div style="background: #1a140f; border: 1px solid #ffbc6822; padding: 16px; border-radius: 8px;">
              <div style="font-size: 11px; color: #9c7a52; margin-bottom: 4px;">Primary CTA Theme</div>
              <div style="font-size: 14px; color: #ffbc68; font-weight: 600; margin-bottom: 8px;">"Book a Demo / Trial"</div>
              <span style="font-size: 10px; color: #60a5fa; background: #60a5fa11; padding: 2px 6px; border-radius: 4px;">64% Dominance</span>
            </div>
          </div>
          <div style="font-size: 12px; color: #9c7a52; margin-bottom: 12px;">EXTRACTED CREATIVE SAMPLES</div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center; background: #1a140f; padding: 8px 12px; border-radius: 6px; font-size: 13px;">
              <span>1. [Video] 15s Product Demo Run</span>
              <span style="color: #ffbc68; font-family: monospace;">Meta Ad library</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; background: #1a140f; padding: 8px 12px; border-radius: 6px; font-size: 13px;">
              <span>2. [Image] Comparison Chart Widget</span>
              <span style="color: #ffbc68; font-family: monospace;">Google Center</span>
            </div>
          </div>
        </div>
      </div>
    `,
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
    overviewHtml: `
      <div class="cozy-room-container">
        <style>
          .cozy-room-container {
            background: #090908;
            border: 2px solid rgba(255, 188, 104, 0.15);
            border-radius: 16px;
            padding: 32px;
            position: relative;
            overflow: hidden;
            color: #ffe8d1;
            font-family: inherit;
            box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.9);
          }
          .cozy-lamp-glow {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 500px;
            height: 350px;
            background: radial-gradient(circle at top, rgba(255, 188, 104, 0.14) 0%, rgba(255, 188, 104, 0.03) 45%, transparent 70%);
            pointer-events: none;
            z-index: 0;
          }
          .cozy-lamp-fixture {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            z-index: 2;
            opacity: 0.95;
          }
          .cozy-grid-bg {
            position: absolute;
            inset: 0;
            background-image: 
              linear-gradient(rgba(255, 188, 104, 0.012) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 188, 104, 0.012) 1px, transparent 1px);
            background-size: 20px 20px;
            pointer-events: none;
            z-index: 0;
          }
          .cozy-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 32px;
            border-bottom: 1px dashed rgba(255, 188, 104, 0.15);
            padding-bottom: 24px;
            position: relative;
            z-index: 1;
            flex-wrap: wrap;
            gap: 16px;
          }
          .cozy-header-title h2 {
            font-family: var(--font-display);
            color: #ffbc68;
            font-size: 28px;
            margin: 0;
            text-shadow: 0 0 10px rgba(255, 188, 104, 0.2);
            letter-spacing: 0.02em;
          }
          .cozy-header-title p {
            margin: 6px 0 0;
            font-size: 13px;
            color: #bfa38a;
          }
          .pipeline-avatar-group {
            display: flex;
            align-items: center;
            gap: 12px;
            background: rgba(255, 188, 104, 0.06);
            border: 1px solid rgba(255, 188, 104, 0.12);
            padding: 8px 16px;
            border-radius: 12px;
          }
          .pipeline-orbs {
            display: flex;
            align-items: center;
          }
          .orb-loop {
            width: 24px;
            height: 24px;
            background: radial-gradient(circle at 35% 35%, #ffebd0, #ffbc68 60%, #b27329 100%);
            border-radius: 50%;
            box-shadow: 0 0 8px rgba(255, 188, 104, 0.4);
            z-index: 2;
          }
          .orb-red {
            width: 24px;
            height: 24px;
            background: radial-gradient(circle at 35% 35%, #ffc5c5, #ef4444 60%, #991b1b 100%);
            border-radius: 4px;
            transform: rotate(45deg);
            box-shadow: 0 0 8px rgba(239, 68, 68, 0.4);
            margin-left: -8px;
            z-index: 1;
          }
          .cozy-tabs-container {
            display: flex;
            flex-direction: column;
            gap: 24px;
            position: relative;
            z-index: 1;
          }
          .cozy-tab-triggers {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
          }
          .cozy-tab-trigger {
            background: rgba(18, 14, 11, 0.8);
            border: 1px solid rgba(255, 188, 104, 0.12);
            border-radius: 8px;
            padding: 8px 16px;
            color: #bfa38a;
            font-family: var(--font-mono);
            font-size: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .cozy-tab-trigger:hover {
            color: #ffbc68;
            border-color: rgba(255, 188, 104, 0.3);
            background: rgba(255, 188, 104, 0.04);
          }
          #tab-lead-blueprint:checked ~ .cozy-tab-triggers label[for="tab-lead-blueprint"],
          #tab-lead-pipeline:checked ~ .cozy-tab-triggers label[for="tab-lead-pipeline"],
          #tab-lead-locker:checked ~ .cozy-tab-triggers label[for="tab-lead-locker"] {
            color: #ffbc68;
            border-color: #ffbc68;
            background: rgba(255, 188, 104, 0.08);
            box-shadow: 0 0 10px rgba(255, 188, 104, 0.1);
          }
          .cozy-tab-panel {
            display: none;
            background: rgba(18, 14, 11, 0.85);
            border: 1px solid rgba(255, 188, 104, 0.1);
            border-radius: 12px;
            padding: 24px;
            animation: panelFade 0.3s ease-out;
          }
          #tab-lead-blueprint:checked ~ .panel-lead-blueprint,
          #tab-lead-pipeline:checked ~ .panel-lead-pipeline,
          #tab-lead-locker:checked ~ .panel-lead-locker {
            display: block;
          }
          .lead-grid {
            display: grid;
            grid-template-columns: 1.2fr 1fr;
            gap: 24px;
            align-items: center;
          }
          .blueprint-card {
            border: 1px solid rgba(255, 188, 104, 0.12);
            border-radius: 8px;
            padding: 16px;
            background: rgba(255, 188, 104, 0.02);
          }
          .specimen-slots {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            margin-top: 16px;
          }
          .inventory-slot {
            aspect-ratio: 1;
            background: rgba(10, 8, 6, 0.8);
            border: 1px dashed rgba(255, 188, 104, 0.2);
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 8px;
            transition: all 0.2s ease;
          }
          .inventory-slot:hover {
            border-style: solid;
            border-color: #ffbc68;
            background: rgba(255, 188, 104, 0.05);
            transform: translateY(-2px);
          }
          @keyframes panelFade {
            from { opacity: 0; transform: translateY(4px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @media (max-width: 768px) {
            .lead-grid {
              grid-template-columns: 1fr;
            }
          }
        </style>

        <div class="cozy-lamp-glow"></div>
        <div class="cozy-grid-bg"></div>

        <div class="cozy-lamp-fixture">
          <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
            <path d="M12 2h16v4H12z" fill="#36291e" />
            <path d="M6 6h28v6c0 4.4-3.6 8-8 8H14c-4.4 0-8-3.6-8-8V6z" fill="#b27329" stroke="#ffbc68" stroke-width="1.5" />
            <circle cx="20" cy="18" r="3" fill="#ffebd0" filter="drop-shadow(0 0 8px #ffbc68)" />
          </svg>
        </div>

        <div class="cozy-header">
          <div class="cozy-header-title">
            <h2>Lead Research Assistant</h2>
            <p>Automated sales intelligence pipeline from ideal customer profile targeting to outreach.</p>
          </div>
          <div class="pipeline-avatar-group">
            <div class="pipeline-orbs">
              <div class="orb-loop"></div>
              <div class="orb-red"></div>
            </div>
            <div>
              <div style="font-size: 11px; font-family: var(--font-mono); color: #ffbc68; font-weight: bold;">LOOP & RED</div>
              <div style="font-size: 10px; color: #bfa38a;">Targeting Command</div>
            </div>
          </div>
        </div>

        <div class="cozy-tabs-container">
          <input type="radio" id="tab-lead-blueprint" name="cozy-panel-lead" checked style="display:none;" />
          <input type="radio" id="tab-lead-pipeline" name="cozy-panel-lead" style="display:none;" />
          <input type="radio" id="tab-lead-locker" name="cozy-panel-lead" style="display:none;" />

          <div class="cozy-tab-triggers">
            <label for="tab-lead-blueprint" class="cozy-tab-trigger">01. ICP BLUEPRINT</label>
            <label for="tab-lead-pipeline" class="cozy-tab-trigger">02. PIPELINE CONSOLE</label>
            <label for="tab-lead-locker" class="cozy-tab-trigger">03. TARGET LOCKER</label>
          </div>

          <!-- Panel 1 -->
          <div class="cozy-tab-panel panel-lead-blueprint">
            <div class="lead-grid">
              <div>
                <h3 style="color: #ffbc68; margin-top: 0; margin-bottom: 12px; font-family: var(--font-display);">ICP Target Calibration</h3>
                <p style="font-size: 14px; line-height: 1.6; color: #d0bda7; margin-bottom: 16px;">
                  Define target sizing, funding, and category boundaries. The assistant maps out key contacts, enriches details from public registries, and scores intent signals.
                </p>
                <div class="blueprint-card">
                  <h4 style="margin: 0 0 8px; font-size: 12px; color: #ffbc68; font-family: var(--font-mono);">PIPELINE CAPABILITIES</h4>
                  <ul style="margin: 0; padding-left: 16px; font-size: 13px; color: #bfa38a; line-height: 1.5;">
                    <li>Firmographic & intent enrichment</li>
                    <li>Automatic ICP matching & priority ranking</li>
                    <li>Outreach angles customized per account</li>
                  </ul>
                </div>
              </div>
              <div>
                <!-- Isometric database funnel SVG -->
                <svg viewBox="0 0 200 160" width="100%" style="overflow: visible;">
                  <polygon points="100,20 170,50 100,80 30,50" fill="rgba(255, 188, 104, 0.03)" stroke="rgba(255, 188, 104, 0.15)" stroke-width="1.5" />
                  
                  <!-- Funnel rings -->
                  <ellipse cx="100" cy="50" rx="35" ry="12" fill="none" stroke="#ffbc68" stroke-width="1.5" />
                  <ellipse cx="100" cy="80" rx="25" ry="9" fill="none" stroke="#ffbc68" stroke-width="1.2" stroke-dasharray="2 2" />
                  <ellipse cx="100" cy="110" rx="15" ry="5" fill="none" stroke="#ffbc68" stroke-width="1.5" />
                  
                  <line x1="65" y1="50" x2="85" y2="110" stroke="#ffbc68" stroke-width="1" />
                  <line x1="135" y1="50" x2="115" y2="110" stroke="#ffbc68" stroke-width="1" />
                  <circle cx="100" cy="50" r="4" fill="#ffebd0" />
                  <circle cx="100" cy="80" r="3" fill="#ffbc68" />
                  <circle cx="100" cy="110" r="2" fill="#3fb950" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Panel 2 -->
          <div class="cozy-tab-panel panel-lead-pipeline">
            <h3 style="color: #ffbc68; margin-top: 0; margin-bottom: 16px; font-family: var(--font-display);">Diagnostic Pipeline Logs</h3>
            <div style="background: #070605; border: 1px solid rgba(255, 188, 104, 0.15); border-radius: 8px; padding: 16px; font-family: var(--font-mono); font-size: 12px; line-height: 1.6; color: #a99684; max-height: 200px; overflow-y: auto;">
              <div><span style="color: #8c7664;">[02:23:40]</span> <span style="color: #ffbc68;">[ICP]</span> Loaded target: SaaS, Series-A, 50-200 headcount.</div>
              <div><span style="color: #8c7664;">[02:23:41]</span> <span style="color: #3fb950;">[LOOP]</span> Initiating search across 12 firmographic registers...</div>
              <div><span style="color: #8c7664;">[02:23:43]</span> <span style="color: #58a6ff;">[INFO]</span> Identified 15 priority targets. Commencing enrichment.</div>
              <div><span style="color: #8c7664;">[02:23:44]</span> <span style="color: #ff5f56;">[WARN]</span> Inconsistent contact email for Target #3: verified from fallback records.</div>
              <div><span style="color: #8c7664;">[02:23:45]</span> <span style="color: #3fb950;">[RED]</span> Target locker priority queue updated. 100% complete.</div>
            </div>
          </div>

          <!-- Panel 3 -->
          <div class="cozy-tab-panel panel-lead-locker">
            <h3 style="color: #ffbc68; margin-top: 0; margin-bottom: 12px; font-family: var(--font-display);">ICP Targets Locked</h3>
            <p style="font-size: 13px; color: #bfa38a; margin-bottom: 20px;">Hover over inventory items to inspect qualified targets:</p>
            <div class="specimen-slots">
              <div class="inventory-slot">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffbc68" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                <div style="font-size: 11px; font-family: var(--font-mono); color: #ffe8d1;">VP Engineering</div>
                <div style="font-size: 9px; color: #8c7664; font-family: var(--font-mono);">Fit: 98% (A-tier)</div>
              </div>
              <div class="inventory-slot">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffbc68" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                <div style="font-size: 11px; font-family: var(--font-mono); color: #ffe8d1;">Fintech SaaS</div>
                <div style="font-size: 9px; color: #8c7664; font-family: var(--font-mono);">Signal: High intent</div>
              </div>
              <div class="inventory-slot">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffbc68" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <div style="font-size: 11px; font-family: var(--font-mono); color: #ffe8d1;">Outreach Hook</div>
                <div style="font-size: 9px; color: #8c7664; font-family: var(--font-mono);">Custom Angle Generated</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    previewHtml: `
      <div style="background: #120e0a; border: 1px solid #ffbc6844; border-radius: 12px; font-family: 'Saira', sans-serif; color: #ffe3be; overflow: hidden;">
        <div style="background: #ffbc68; color: #120e0a; padding: 12px 24px; font-weight: 700; display: flex; justify-content: space-between; align-items: center;">
          <span>LEADS ENRICHMENT GRID</span>
          <span style="font-family: monospace; font-size: 12px;">AUTO-QUALIFIED</span>
        </div>
        <div style="padding: 24px; background: #120e0a;">
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <thead>
              <tr style="border-bottom: 1px solid #ffbc6833; text-align: left; color: #9c7a52; font-size: 11px;">
                <th style="padding: 8px 4px;">Company</th>
                <th style="padding: 8px 4px;">Contact</th>
                <th style="padding: 8px 4px;">Fit Score</th>
                <th style="padding: 8px 4px; text-align: right;">Trigger</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #ffbc6811;">
                <td style="padding: 10px 4px; font-weight: 600;">Stripe Inc.</td>
                <td style="padding: 10px 4px; color: #d5b185;">Sarah K. (VP Eng)</td>
                <td style="padding: 10px 4px; color: #34d399;">94 / 100</td>
                <td style="padding: 10px 4px; text-align: right; color: #9c7a52;">Hiring React</td>
              </tr>
              <tr style="border-bottom: 1px solid #ffbc6811;">
                <td style="padding: 10px 4px; font-weight: 600;">Vercel Ltd.</td>
                <td style="padding: 10px 4px; color: #d5b185;">David M. (CTO)</td>
                <td style="padding: 10px 4px; color: #34d399;">88 / 100</td>
                <td style="padding: 10px 4px; text-align: right; color: #9c7a52;">Series D Close</td>
              </tr>
              <tr>
                <td style="padding: 10px 4px; font-weight: 600;">Retool Co.</td>
                <td style="padding: 10px 4px; color: #d5b185;">Alex T. (Dir Sales)</td>
                <td style="padding: 10px 4px; color: #fbbf24;">78 / 100</td>
                <td style="padding: 10px 4px; text-align: right; color: #9c7a52;">New Exec Hired</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `,
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
    overviewHtml: `
      <div class="skill-enrichment">
        <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; margin-bottom: 32px; border: 1px solid var(--color-border);">
          <div style="width: 100%; aspect-ratio: 16/7; background: linear-gradient(135deg, #0e161c 0%, #162635 100%); display: flex; align-items: center; justify-content: center;">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ffbc68" stroke-width="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 40%, #120e0a 95%);"></div>
          <div style="position: absolute; bottom: 24px; left: 24px;">
            <h2 style="font-family: var(--font-display); color: var(--color-accent); margin: 0; font-size: 32px;">Changelog Generator</h2>
            <p style="margin: 8px 0 0; color: var(--color-text-secondary);">Turn raw developer git logs into beautifully styled user changelogs.</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 32px;">
          <div>
            <h3 style="color: var(--color-text-primary); margin-bottom: 16px;">Automate Release Notes</h3>
            <p style="margin-bottom: 24px;">Stop writing release updates manually. By parsing conventional commit tags, this generator categorizes updates, explains complex code features in human terms, and styles the output.</p>
            
            <h3 style="color: var(--color-text-primary); margin-bottom: 16px;">Release Modules</h3>
            <ul style="color: var(--color-text-secondary); padding-left: 20px;">
              <li style="margin-bottom: 8px;">Commit Classification (Feat, Fix, Performance)</li>
              <li style="margin-bottom: 8px;">Plain-English Translation Filter</li>
              <li>Interactive Timeline Markdown Builder</li>
            </ul>
          </div>
          
          <div style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: 12px; padding: 24px;">
            <h4 style="color: var(--color-accent); margin-bottom: 16px; font-family: var(--font-display);">AUTOMATION PIPELINE</h4>
            <div style="background: #120e0a; border-radius: 8px; border: 1px solid #ffbc6833; padding: 16px;">
              <div style="font-size: 11px; color: #ffbc68; margin-bottom: 8px;">1. Read git log diff</div>
              <div style="font-size: 11px; color: #ffbc68; margin-bottom: 8px;">2. Classify and group</div>
              <div style="font-size: 11px; color: #ffbc68;">3. Render HTML timeline</div>
            </div>
          </div>
        </div>
      </div>
    `,
    previewHtml: `
      <div style="background: #120e0a; border: 1px solid #ffbc6844; border-radius: 12px; font-family: 'Saira', sans-serif; color: #ffe3be; overflow: hidden; max-width: 100%;">
        <div style="background: #ffbc68; color: #120e0a; padding: 12px 24px; font-weight: 700; display: flex; justify-content: space-between; align-items: center;">
          <span>RELEASE LOG // LIVE DEPLOYMENT</span>
          <span style="font-family: monospace; font-size: 12px;">v2.4.1</span>
        </div>
        <div style="padding: 24px; background: #120e0a;">
          <div style="position: relative; padding-left: 24px; border-left: 2px solid #ffbc6822;">
            <div style="position: absolute; left: -6px; top: 2px; width: 10px; height: 10px; border-radius: 50%; background: #ffbc68;"></div>
            <div style="font-size: 16px; font-weight: 600; color: #ffbc68; margin-bottom: 4px;">Version 2.4.1 (Stable Release)</div>
            <div style="font-size: 11px; color: #9c7a52; margin-bottom: 12px;">DEPLOYED 2 HOURS AGO</div>
            
            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 13px;">
              <div>
                <span style="color: #34d399; font-weight: 600; margin-right: 8px;">[NEW]</span> 
                <span>Custom token authentication via Solana Web3 standard.</span>
              </div>
              <div>
                <span style="color: #60a5fa; font-weight: 600; margin-right: 8px;">[IMPR]</span> 
                <span>Sped up database retrieval latency by 45ms.</span>
              </div>
              <div>
                <span style="color: #f87171; font-weight: 600; margin-right: 8px;">[FIX]</span> 
                <span>Resolved alignment issues in landing search block.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
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
    overviewHtml: `
      <div class="skill-enrichment">
        <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; margin-bottom: 32px; border: 1px solid var(--color-border);">
          <div style="width: 100%; aspect-ratio: 16/7; background: linear-gradient(135deg, #1d0f1b 0%, #30162e 100%); display: flex; align-items: center; justify-content: center;">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ffbc68" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </div>
          <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 40%, #120e0a 95%);"></div>
          <div style="position: absolute; bottom: 24px; left: 24px;">
            <h2 style="font-family: var(--font-display); color: var(--color-accent); margin: 0; font-size: 32px;">Resume Customizer</h2>
            <p style="margin: 8px 0 0; color: var(--color-text-secondary);">Optimize your achievements to target specific job description keywords.</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 32px;">
          <div>
            <h3 style="color: var(--color-text-primary); margin-bottom: 16px;">Pass ATS Screening</h3>
            <p style="margin-bottom: 24px;">The optimization routine matches target requirements to your historical accomplishments, adapting technical terminology to match how the company describes the role while preserving your actual work.</p>
            
            <h3 style="color: var(--color-text-primary); margin-bottom: 16px;">Included Features</h3>
            <ul style="color: var(--color-text-secondary); padding-left: 20px;">
              <li style="margin-bottom: 8px;">ATS Keyword Enrichment Index</li>
              <li style="margin-bottom: 8px;">Action Verb Replacement Engine</li>
              <li>Side-by-Side Verification Diff View</li>
            </ul>
          </div>
          
          <div style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: 12px; padding: 24px;">
            <h4 style="color: var(--color-accent); margin-bottom: 16px; font-family: var(--font-display);">OPTIMIZATION SCORING</h4>
            <div style="background: #120e0a; border-radius: 8px; border: 1px solid #ffbc6833; padding: 16px;">
              <div style="font-size: 11px; color: #ffbc68; margin-bottom: 8px;">Base ATS Score: 52%</div>
              <div style="font-size: 11px; color: #34d399; margin-bottom: 8px;">Optimized ATS Score: 94%</div>
              <div style="font-size: 11px; color: #ffbc68;">Keywords Aligned: 12 / 12</div>
            </div>
          </div>
        </div>
      </div>
    `,
    previewHtml: `
      <div style="background: #120e0a; border: 1px solid #ffbc6844; border-radius: 12px; font-family: 'Saira', sans-serif; color: #ffe3be; overflow: hidden;">
        <div style="background: #ffbc68; color: #120e0a; padding: 12px 24px; font-weight: 700; display: flex; justify-content: space-between; align-items: center;">
          <span>RESUME OPTIMIZER DIFF</span>
          <span style="font-family: monospace; font-size: 12px;">ATS-OPTIMIZED BULLETS</span>
        </div>
        <div style="padding: 24px; background: #120e0a; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div style="border-right: 1px solid #ffbc6811; padding-right: 12px;">
            <div style="font-size: 11px; color: #f87171; margin-bottom: 8px; text-transform: uppercase;">Original Bullet</div>
            <p style="font-size: 12px; color: #f87171; background: rgba(248,113,113,0.05); padding: 8px; border-radius: 4px; margin: 0; line-height: 1.5;">
              - Wrote React component dashboards and handled frontend page development.
            </p>
          </div>
          <div>
            <div style="font-size: 11px; color: #34d399; margin-bottom: 8px; text-transform: uppercase;">ATS-Optimized Bullet</div>
            <p style="font-size: 12px; color: #34d399; background: rgba(52,211,153,0.05); padding: 8px; border-radius: 4px; margin: 0; line-height: 1.5;">
              - Engineered scalable React interfaces, reducing page latency by 32% using Tailwind utility architectures.
            </p>
          </div>
        </div>
      </div>
    `,
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
    overviewHtml: `
      <div class="skill-enrichment">
        <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; margin-bottom: 32px; border: 1px solid var(--color-border);">
          <div style="width: 100%; aspect-ratio: 16/7; background: linear-gradient(135deg, #1c0e12 0%, #2f121b 100%); display: flex; align-items: center; justify-content: center;">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ffbc68" stroke-width="1.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
          </div>
          <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 40%, #120e0a 95%);"></div>
          <div style="position: absolute; bottom: 24px; left: 24px;">
            <h2 style="font-family: var(--font-display); color: var(--color-accent); margin: 0; font-size: 32px;">SaaS GTM Strategy</h2>
            <p style="margin: 8px 0 0; color: var(--color-text-secondary);">Construct positioning structures, define ICP matrices, and execute a 90-day launcher framework.</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 32px;">
          <div>
            <h3 style="color: var(--color-text-primary); margin-bottom: 16px;">Traction Playbook</h3>
            <p style="margin-bottom: 24px;">Stop launching blind. The GTM playbook configures specific product channels, builds outbound email sequences, maps public launch patterns, and specifies your core target metrics.</p>
            
            <h3 style="color: var(--color-text-primary); margin-bottom: 16px;">Strategic Pillars</h3>
            <ul style="color: var(--color-text-secondary); padding-left: 20px;">
              <li style="margin-bottom: 8px;">ICP Mapping Decision Tree</li>
              <li style="margin-bottom: 8px;">Cold Email Sequences & Ads Framework</li>
              <li>90-Day Step-by-Step Traction Timeline</li>
            </ul>
          </div>
          
          <div style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: 12px; padding: 24px;">
            <h4 style="color: var(--color-accent); margin-bottom: 16px; font-family: var(--font-display);">MILESTONE TARGETS</h4>
            <div style="background: #120e0a; border-radius: 8px; border: 1px solid #ffbc6833; padding: 16px;">
              <div style="font-size: 11px; color: #ffbc68; margin-bottom: 8px;">Month 1: 10 ICP Interviews</div>
              <div style="font-size: 11px; color: #ffbc68; margin-bottom: 8px;">Month 2: First 25 Customers</div>
              <div style="font-size: 11px; color: #ffbc68;">Month 3: Channel Scaling</div>
            </div>
          </div>
        </div>
      </div>
    `,
    previewHtml: `
      <div style="background: #120e0a; border: 1px solid #ffbc6844; border-radius: 12px; font-family: 'Saira', sans-serif; color: #ffe3be; overflow: hidden;">
        <div style="background: #ffbc68; color: #120e0a; padding: 12px 24px; font-weight: 700; display: flex; justify-content: space-between; align-items: center;">
          <span>90-DAY TRACTION TIMELINE</span>
          <span style="font-family: monospace; font-size: 12px;">ACTIVE TIMELINE</span>
        </div>
        <div style="padding: 24px; background: #120e0a; display: flex; flex-direction: column; gap: 12px;">
          <div style="display: flex; gap: 16px; align-items: center; border-left: 2px solid #34d399; padding-left: 16px;">
            <div style="font-weight: 600; color: #34d399; font-size: 14px;">WEEKS 1-4:</div>
            <div style="font-size: 13px; color: #d5b185;">ICP Validation & Customer Development Interviews</div>
          </div>
          <div style="display: flex; gap: 16px; align-items: center; border-left: 2px solid #fbbf24; padding-left: 16px;">
            <div style="font-weight: 600; color: #fbbf24; font-size: 14px;">WEEKS 5-8:</div>
            <div style="font-size: 13px; color: #d5b185;">Channel Activation (Outbound Campaign Launch)</div>
          </div>
          <div style="display: flex; gap: 16px; align-items: center; border-left: 2px solid #ffbc6822; padding-left: 16px;">
            <div style="font-weight: 600; color: #9c7a52; font-size: 14px;">WEEKS 9-12:</div>
            <div style="font-size: 13px; color: #9c7a52;">Traction Scaling & PH/HN Launches</div>
          </div>
        </div>
      </div>
    `,
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
    overviewHtml: `
      <div class="skill-enrichment">
        <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; margin-bottom: 32px; border: 1px solid var(--color-border);">
          <div style="width: 100%; aspect-ratio: 16/7; background: linear-gradient(135deg, #100e1c 0%, #1d1730 100%); display: flex; align-items: center; justify-content: center;">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ffbc68" stroke-width="1.5"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>
          </div>
          <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 40%, #120e0a 95%);"></div>
          <div style="position: absolute; bottom: 24px; left: 24px;">
            <h2 style="font-family: var(--font-display); color: var(--color-accent); margin: 0; font-size: 32px;">D3 Chart Engine</h2>
            <p style="margin: 8px 0 0; color: var(--color-text-secondary);">Write responsive data visualizations dynamically from raw formats.</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 32px;">
          <div>
            <h3 style="color: var(--color-text-primary); margin-bottom: 16px;">Dynamic Visual Data</h3>
            <p style="margin-bottom: 24px;">Tired of dry numbers or static tables? The D3.js visualization skill processes CSV, JSON or Excel datasets, identifies trends, and renders elegant, responsive SVG graphics.</p>
            
            <h3 style="color: var(--color-text-primary); margin-bottom: 16px;">Core Charts</h3>
            <ul style="color: var(--color-text-secondary); padding-left: 20px;">
              <li style="margin-bottom: 8px;">Time Series Trend Line Graphs</li>
              <li style="margin-bottom: 8px;">Categorical Comparison Bar Charts</li>
              <li>Multi-variable Distribution Scatter Plots</li>
            </ul>
          </div>
          
          <div style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: 12px; padding: 24px;">
            <h4 style="color: var(--color-accent); margin-bottom: 16px; font-family: var(--font-display);">AUTOMATION CONFIG</h4>
            <div style="background: #120e0a; border-radius: 8px; border: 1px solid #ffbc6833; padding: 16px;">
              <div style="font-size: 11px; color: #ffbc68; margin-bottom: 8px;">[✓] Auto Scale Engine</div>
              <div style="font-size: 11px; color: #ffbc68; margin-bottom: 8px;">[✓] Zoom & Focus States</div>
              <div style="font-size: 11px; color: #ffbc68;">[✓] SVG Download Hook</div>
            </div>
          </div>
        </div>
      </div>
    `,
    previewHtml: `
      <div style="background: #120e0a; border: 1px solid #ffbc6844; border-radius: 12px; font-family: 'Saira', sans-serif; color: #ffe3be; overflow: hidden;">
        <div style="background: #ffbc68; color: #120e0a; padding: 12px 24px; font-weight: 700; display: flex; justify-content: space-between; align-items: center;">
          <span>INTERACTIVE SVG CHART</span>
          <span style="font-family: monospace; font-size: 12px;">D3 CHART RENDER</span>
        </div>
        <div style="padding: 24px; background: #120e0a;">
          <div style="display: flex; justify-content: space-between; align-items: flex-end; height: 160px; border-bottom: 2px solid #ffbc6822; border-left: 2px solid #ffbc6822; padding-left: 8px; padding-bottom: 4px; position: relative;">
            <div style="position: absolute; left: 60px; bottom: 80px; background: #ffbc68; color: #120e0a; font-size: 9px; padding: 2px 6px; border-radius: 4px; font-family: monospace; font-weight: 700; pointer-events: none;">
              VAL: 4,200
            </div>
            <div style="width: 14%; height: 20%; background: #ffbc6833; border-radius: 2px 2px 0 0;"></div>
            <div style="width: 14%; height: 45%; background: #ffbc6844; border-radius: 2px 2px 0 0;"></div>
            <div style="width: 14%; height: 60%; background: #ffbc6888; border-radius: 2px 2px 0 0; border: 1px solid #ffbc68;"></div>
            <div style="width: 14%; height: 35%; background: #ffbc6833; border-radius: 2px 2px 0 0;"></div>
            <div style="width: 14%; height: 75%; background: #ffbc68bb; border-radius: 2px 2px 0 0; border: 1px solid #ffbc68;"></div>
            <div style="width: 14%; height: 90%; background: #ffbc68ff; border-radius: 2px 2px 0 0; border: 1px solid #ffbc68;"></div>
          </div>
          <div style="display: flex; justify-content: space-between; margin-top: 8px; font-size: 10px; color: #9c7a52; font-family: monospace;">
            <span>JAN</span>
            <span>FEB</span>
            <span>MAR</span>
            <span>APR</span>
            <span>MAY</span>
            <span>JUN</span>
          </div>
        </div>
      </div>
    `,
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
    overviewHtml: `
      <div class="skill-enrichment">
        <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; margin-bottom: 32px; border: 1px solid var(--color-border);">
          <div style="width: 100%; aspect-ratio: 16/7; background: linear-gradient(135deg, #1a0f1c 0%, #2e1730 100%); display: flex; align-items: center; justify-content: center;">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ffbc68" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 40%, #120e0a 95%);"></div>
          <div style="position: absolute; bottom: 24px; left: 24px;">
            <h2 style="font-family: var(--font-display); color: var(--color-accent); margin: 0; font-size: 32px;">Meeting Insights Analyzer</h2>
            <p style="margin: 8px 0 0; color: var(--color-text-secondary);">Detect communication dynamics, talking ratios, and facilitation patterns.</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 32px;">
          <div>
            <h3 style="color: var(--color-text-primary); margin-bottom: 16px;">Dynamics Breakdown</h3>
            <p style="margin-bottom: 24px;">Go beyond simple meeting summaries. This analyzer decodes speaking balances, tags facilitation interventions, identifies filler word usage, and tracks decisions over time.</p>
            
            <h3 style="color: var(--color-text-primary); margin-bottom: 16px;">Key Indicators</h3>
            <ul style="color: var(--color-text-secondary); padding-left: 20px;">
              <li style="margin-bottom: 8px;">Talking-Time Ratios per Member</li>
              <li style="margin-bottom: 8px;">Filler Word Count & Speed Patterns</li>
              <li>Decision vs Action Item Alignment</li>
            </ul>
          </div>
          
          <div style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: 12px; padding: 24px;">
            <h4 style="color: var(--color-accent); margin-bottom: 16px; font-family: var(--font-display);">TRANSCRIPT METRICS</h4>
            <div style="background: #120e0a; border-radius: 8px; border: 1px solid #ffbc6833; padding: 16px;">
              <div style="font-size: 11px; color: #ffbc68; margin-bottom: 8px;">Total Duration: 42m</div>
              <div style="font-size: 11px; color: #ffbc68; margin-bottom: 8px;">Speakers Count: 4</div>
              <div style="font-size: 11px; color: #34d399;">Decisions Tracked: 5</div>
            </div>
          </div>
        </div>
      </div>
    `,
    previewHtml: `
      <div style="background: #120e0a; border: 1px solid #ffbc6844; border-radius: 12px; font-family: 'Saira', sans-serif; color: #ffe3be; overflow: hidden;">
        <div style="background: #ffbc68; color: #120e0a; padding: 12px 24px; font-weight: 700; display: flex; justify-content: space-between; align-items: center;">
          <span>TALKING DYNAMICS METRIC</span>
          <span style="font-family: monospace; font-size: 12px;">BEHAVIOR RATIO</span>
        </div>
        <div style="padding: 24px; background: #120e0a;">
          <div style="display: flex; gap: 8px; margin-bottom: 16px;">
            <div style="flex: 5; background: #ffbc68; height: 16px; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #120e0a; font-size: 9px; font-weight: 700;">Host (52%)</div>
            <div style="flex: 3; background: #ffbc6888; height: 16px; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #ffe3be; font-size: 9px;">Eng (28%)</div>
            <div style="flex: 2; background: #ffbc6833; height: 16px; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #ffe3be; font-size: 9px;">PM (20%)</div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 13px;">
            <div style="display: flex; justify-content: space-between; color: #9c7a52; font-size: 11px; border-bottom: 1px solid #ffbc6822; padding-bottom: 4px;">
              <span>Facilitator Indicators</span>
              <span>Count</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>- Question Probing Interventions</span>
              <span style="color: #ffbc68; font-family: monospace;">12 times</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>- Summarizing Interventions</span>
              <span style="color: #ffbc68; font-family: monospace;">8 times</span>
            </div>
          </div>
        </div>
      </div>
    `,
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
