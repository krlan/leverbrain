import { SkillListing } from '../skills-data'
 
export const imagegenFrontend: SkillListing = {
  id: 'imagegen-frontend',
  author: 'Yu-369',
  slug: 'imagegen-frontend',
  name: "Imagegen frontend",
  tagline: "Each image is one section, generated as its own image call.",
  description: "Each image is one section, generated as its own image call. Never combine multiple sections into one tall frame. Never return a single image containing the whole page.",
  readme: `name: imagegen-frontend-web
description: Elite frontend image-direction skill for generating premium, conversion-aware website design reference images via ChatGPT image generation. Fires when the user asks to generate website mockups, landing page concepts, section design references, or UI comp images. Enforces ONE separate horizontal image PER section, composition variety (bans the default left-text/right-image on every section), background-image freedom, varied CTAs, varied hero scales, narrative concept spine, second-read moments, and a single consistent palette across all images. Outputs structured prompt blueprints that produce Awwwards-tier visual references a developer or coding model can accurately recreate. Image generation only — does not write code.
---

# Elite Frontend Image Art Direction

> This skill fires when the user asks to generate website design reference images, landing page mockups, section comp images, UI concept visuals, or any image that will serve as a frontend design reference. You are an art director, not an illustrator. Every image you generate must be a structured, premium, implementation-friendly website section that a developer could look at and code. This skill does NOT write code — it produces the visual references that feed into the pixel-perfect, hero, and motion skills.

---

## The Hard Output Rule — Read First

**Generate ONE separate horizontal image PER section. Always. No exceptions.**

\`\`\`
 1 section requested  →  1 image
 4 sections requested →  4 images
 8 sections requested →  8 images
12 sections requested → 12 images
"landing page" (no count) → default 6 sections → 6 images
"full website template"   → default 8 sections → 8 images
\`\`\`

Each image is one section, generated as its own image call. Never combine multiple sections into one tall frame. Never return a single image containing the whole page.

If you can only render one image at a time, output them sequentially — announce each one: *"Section 1 of 8: Hero"*, *"Section 2 of 8: Trust bar"*, etc.

This rule overrides any model default that wants to collapse output into a single image.

---

## The Pipeline

\`\`\`
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   BRIEF IN ──→ Phase 1: Read the Brief                                  │
│                  (extract brand signals, classify style,                 │
│                   map brief to direction dials)                          │
│                                                                          │
│              ──→ Phase 2: Art Direction                                  │
│                   (commit to combinatorial picks:                        │
│                    theme, typography, hero, sections,                    │
│                    composition anchors, backgrounds,                     │
│                    CTAs, narrative spine, second-read)                   │
│                                                                          │
│              ──→ Phase 3: Prompt Engineering                             │
│                   (build structured prompt per section                   │
│                    using the blueprint templates)                        │
│                                                                          │
│              ──→ Phase 4: Generate                                       │
│                   (one image per section, announce each)                 │
│                                                                          │
│              ──→ Phase 5: Visual Diff                                    │
│                   (verify against brief, check for                      │
│                    AI default drift, composition variety)                │
│                                                                          │
│   Each phase has a ✓ Quality Gate. Failing a gate blocks the next.      │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
\`\`\`

---

## The Core Doctrine

Before generating any image, internalize these. They override every aesthetic preference. The quality bar is **Awwwards SOTD winners, Apple product pages, Linear marketing, Stripe homepage, Vercel brand.** If your generated image would look generic next to these, it is not good enough.

> **You are an art director, not a prompt monkey.** Standard AI image generation collapses into the same 5 defaults: centered dark hero, purple/blue AI glow, floating meaningless blobs, generic dashboard cards, and weak typography hierarchy. Your job is to aggressively break these defaults with intentional, structured, premium compositions.

> **Every image is a frontend reference.** The output must communicate layout, section hierarchy, spacing, typography scale, and color palette clearly enough that a developer can look at it and code it. Random mood art is not acceptable unless the user explicitly asks for it.

> **Composition variety is mandatory.** The left-text / right-image split is the most overused AI layout pattern. It is allowed, but never as the default, and never twice in a row. Across a multi-section page, at least 3 different composition anchors must appear.

> **One palette, threaded consistently.** All sections of a page share the same palette. The palette is chosen once in Phase 2 and applied to every section. Sections can vary in background mode (solid, image, gradient) but the hues must be consistent. A page where the hero is warm cream and the features section is cool blue-gray is a broken design system.

> **Whitespace is a design material.** Sections must breathe. The default AI instinct is to pack every pixel with content. Fight it. Generous negative space between elements is what separates premium from busy. Bias toward slightly more whitespace than you think is necessary.

> **Conversion awareness.** Every section has a job — hook, prove, educate, or convert. The page must flow as a persuasion sequence, not a random collection of pretty sections. Even purely visual references should imply where the user's eye goes and what action they should take.

---

## Phase 1: Read the Brief

Before generating anything, extract design signals from the user's request. Do not project your own aesthetic onto the brief. Read what is actually there.

### → Extract these signals

| Signal | What to look for |
|---|---|
| **Brand type** | SaaS / Agency / E-commerce / Portfolio / Editorial / Fintech / Health / AI / Crypto / Personal brand / Nonprofit |
| **Mood keywords** | Clean, bold, cinematic, minimal, editorial, premium, luxury, playful, dark, light, warm, cold, technical, organic |
| **Density preference** | Airy / balanced / packed — infer from "minimal" vs "feature-rich" vs "content-heavy" |
| **Image preference** | Photography-led / illustration-led / typography-led / product-focused / abstract |
| **Target audience** | Developer tools / Consumer / Enterprise / Creative professional / Luxury consumer |
| **Explicit constraints** | Specific colors mentioned, specific fonts mentioned, dark/light mode specified, specific section requests |
| **Reference links** | Any URLs, screenshots, or brand names the user mentions as inspiration |
| **Section count** | Explicit count or inferred from "landing page" (6), "full site" (8), "one-pager" (5-7) |

### → Output the Direction Brief

State in 2-3 lines the art direction you are committing to:

> *"Direction Brief: Dark cinematic SaaS landing page for an AI infrastructure product. 7 sections. Palette: deep charcoal base + warm off-white text + single amber accent. Typography: compressed display grotesk (Monument Extended energy). Giant statement hero with product screenshot as focal. Photography-led backgrounds with tonal color grading. Conversion-driven AIDA flow. Feels like: Linear meets Vercel with a warmer accent."*

### → Brief-to-Direction Mapping

Read the brief. Then bias your picks:

| If the user says... | Bias toward... |
|---|---|
| **"minimalist" / "clean" / "swiss" / "ultra simple"** | Mini Minimalist hero, solid surfaces, stacked center compositions, generous negative space, skip full-bleed images |
| **"editorial" / "magazine" / "art-directed" / "fashion"** | Mid Editorial or Giant Statement hero, editorial side-image backgrounds, off-grid compositions, strong typography contrast, duotone image treatments |
| **"cinematic" / "atmospheric" / "premium" / "luxury" / "bold"** | Giant Statement hero, full-bleed image backgrounds with tonal overlay, soft radial vignettes, bottom-left/centered-low text placement |
| **"SaaS" / "product" / "dashboard" / "fintech" / "infra"** | Mid Editorial hero, solid + inline asset backgrounds, clear product framing, trust-driven anchors, higher implementation clarity |
| **"agency" / "creative studio" / "portfolio"** | Giant Statement OR Mini Minimalist hero (commit to one), bold background variety, off-grid poster-like compositions |
| **"e-commerce" / "shop" / "store" / "product page"** | Mid Editorial hero with strong product focus, full-bleed product photography, product-led compositions, unmistakable CTAs |
| *Brief is silent on style* | Use defaults from the Configuration Baseline, pick decisively, do not split the difference |

### → If the brief is vague

Ask exactly ONE question: *"What's the brand name, one-line value prop, and preferred mood — closer to [dark cinematic] or [light editorial]?"*

If you can infer from context (e.g., user said "AI startup" or "luxury agency"), skip the question and declare your Direction Brief.

### ✓ Quality Gate: Brief

Before moving to Phase 2, confirm:
- All 8 signals are extracted (or inferred)
- Direction Brief is written
- You know the mood, palette direction, hero scale, and section count
- You have NOT started generating any images yet

---

## Phase 2: Art Direction (The Combinatorial Variation Engine)

This is the engine that prevents repetitive AI output. For each category below, commit to ONE option based on the brief. Do not blend. Do not hedge. Pick and commit.

The picks must be internally consistent — a "Quiet Premium Neutral" theme with "Monument-like compressed statement typography" is a valid pairing. A "Pristine Light Mode" theme with a "Deep Dark Mode" background character is not.

---

### → Theme Paradigm (pick 1)

| # | Theme | When to use |
|---|---|---|
| 1 | **Pristine Light Mode** — Off-white / cream / paper tones, sharp dark text, editorial confidence | Clean SaaS, editorial, health, lifestyle |
| 2 | **Deep Dark Mode** — Charcoal / graphite / zinc, elegant glow only when justified | Dev tools, AI/ML, gaming, cinematic |
| 3 | **Bold Studio Solid** — Strong controlled color fields (oxblood, royal blue, forest, vermilion, emerald) with crisp contrasting UI | Agency, creative studio, brand-forward |
| 4 | **Quiet Premium Neutral** — Bone, sand, taupe, stone, smoke, muted contrast, restrained luxury | Luxury, finance, architecture, fashion |

### → Background Character (pick 1 global default)

| # | Background | Character |
|---|---|---|
| 1 | Subtle technical grid / dotted field | Precise, engineered, dev-tool feel |
| 2 | Pure solid field with soft ambient gradient depth | Clean, modern, lets content breathe |
| 3 | Full-bleed cinematic imagery with proper contrast control | Atmospheric, editorial, immersive |
| 4 | Quiet textured paper / material / tactile surface feel | Warm, craft-oriented, luxury print |

### → Typography Character (pick 1)

| # | Type | Energy |
|---|---|---|
| 1 | **Satoshi-like clean grotesk** | Modern, approachable, startup-friendly |
| 2 | **Neue-Montreal-like refined grotesk** | Polished, agency, premium tech |
| 3 | **Cabinet/Clash-like expressive display** | Bold, statement, creative |
| 4 | **Monument-like compressed statement** | Industrial, dramatic, high-impact |
| 5 | **Elegant editorial serif + sans pairing** | Editorial, luxury, magazine |
| 6 | **Swiss rational sans with very strong hierarchy** | Structured, systematic, enterprise |

⚠ **Drift Warning:** Never drift into default web typography energy. The heading must feel like an architectural element, not "big text." If the generated image shows a heading that could be from any WordPress template, the typography pick was wrong.

### → Hero Architecture (pick 1)

| # | Architecture | Best for |
|---|---|---|
| 1 | **Cinematic Centered Minimalist** — Heading centered, cinematic visual fills background or floats behind text | Dark cinematic, immersive product launches |
| 2 | **Asymmetric Split** — Massive heading one side, supporting content other side, deliberate vertical tension | Bold agency, AI/tech launches |
| 3 | **Full-Bleed Subject** — Full-viewport photograph IS the hero, typography overlaid directly | Athlete/personal brand, fashion, lifestyle |
| 4 | **Typographic Poster** — Typography IS the visual, no hero image, viewport-bleeding scale | Creative studio, personal brand, editorial |
| 5 | **Editorial Offset** — Off-grid composition, asymmetric pulls, text and image not conventionally aligned | Magazine, editorial, art-directed brand |
| 6 | **Massive Image-First** — Photograph dominates, restrained text anchors a corner or edge | Product photography, luxury, e-commerce |

⚠ **Drift Warning:** The left-text / right-image hero is the most overused AI image generation pattern. It is allowed but should NOT be your first instinct. Before reaching for it, consider: centered over background image, bottom-left over image, top-left lead, stacked center, image-as-canvas, off`,
  whenToUse: "Use when you need to automate imagegen frontend processes.",
  price: "Free",
  priceUsdc: 0,
  category: "skill",
  tags: ["Yu-369-skills","imagegen-frontend","image","design"],
  stars: 361,
  weeklyInstalls: 118,
  totalPurchases: 952,
  featured: false,
  createdAt: '2026-07-18',
  creatorWallet: '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
  fileUrl: 'https://github.com/Yu-369/VibeCurb/blob/main/skills/imagegen-frontend/SKILL.md',
  useCases: ["Generate ONE separate horizontal image PER section. Always. No exceptions.","All 8 signals are extracted (or inferred).","Direction Brief is written."],
  exampleUsage: "Generate custom images for my project",
  overviewHtml: `<div class="skill-enrichment" style="display: flex; flex-direction: column; gap: 32px;">
      <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 196, 129, 0.14); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);">
        <div style="width: 100%; aspect-ratio: 16/6; background: linear-gradient(135deg, #1b1622 0%, #0d131f 100%); display: flex; align-items: center; justify-content: center; color: var(--color-accent-warm-light);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        </div>
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 30%, #0a0806 95%);"></div>
        <div style="position: absolute; bottom: 20px; left: 24px; right: 24px;">
          <h2 style="font-family: var(--font-display); color: var(--color-accent-warm-light); margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 0.02em;">Imagegen frontend</h2>
          <p style="margin: 6px 0 0; color: var(--color-text-secondary); font-size: 14px; max-width: 600px;">Each image is one section, generated as its own image call.</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1.2fr 1.0fr; gap: 32px; align-items: start;">
        <div>
          <h3 style="color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;">SKILL CAPABILITIES</h3>
          <p style="margin-bottom: 24px; font-size: 13.5px; line-height: 1.65; color: var(--color-text-secondary);">Each image is one section, generated as its own image call. Never combine multiple sections into one tall frame. Never return a single image containing the whole page.</p>
          
          <h3 style="color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;">KEY FEATURES</h3>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;">
    <span style="color: var(--color-accent); font-weight: bold; margin-top: 2px;">•</span>
    <span>End-to-end workflow execution automation</span>
  </li>
<li style="margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;">
    <span style="color: var(--color-accent); font-weight: bold; margin-top: 2px;">•</span>
    <span>Preset parameters optimized for production use</span>
  </li>
<li style="margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;">
    <span style="color: var(--color-accent); font-weight: bold; margin-top: 2px;">•</span>
    <span>Self-documenting routines and validation parameters</span>
  </li>
          </ul>
        </div>
        
        <div style="background: rgba(255, 196, 129, 0.03); border: 1px solid rgba(255, 196, 129, 0.08); border-radius: 12px; padding: 24px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);">
          <h4 style="color: var(--color-accent-warm-light); margin-top: 0; margin-bottom: 16px; font-family: var(--font-display); font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;">AUTOMATION STACKS</h4>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;">
              <div style="font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;">1. PARSE & STRUCTURE</div>
              <div style="font-size: 12px; color: var(--color-text-secondary);">Analyze context inputs and map constraints recursively.</div>
            </div>
            <div style="background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;">
              <div style="font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;">2. AGENT EVALUATION</div>
              <div style="font-size: 12px; color: var(--color-text-secondary);">Validate logic flows against preset specifications.</div>
            </div>
            <div style="background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;">
              <div style="font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;">3. DEPLOY & EXPORT</div>
              <div style="font-size: 12px; color: var(--color-text-secondary);">Write standardized outputs to target environments.</div>
            </div>
          </div>
        </div>
      </div>
    </div>`,
  previewHtml: `<div style="background: #050c12; border: 1px solid rgba(255, 196, 129, 0.16); border-radius: 12px; font-family: var(--font-mono); color: #ffe8d1; overflow: hidden; max-width: 100%; box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);">
      <div style="background: rgba(255, 196, 129, 0.06); border-bottom: 1px solid rgba(255, 196, 129, 0.1); padding: 12px 20px; font-size: 11px; font-weight: 700; display: flex; justify-content: space-between; align-items: center; letter-spacing: 0.08em;">
        <span>CODE EDITOR & COMPILER</span>
        <span style="color: var(--color-accent-warm-light);">ONLINE</span>
      </div>
      <div style="padding: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="font-size: 11px; color: rgba(255, 232, 209, 0.4);">INPUT CONTEXT</div>
          <pre style="margin: 0; font-size: 11px; background: rgba(0, 0, 0, 0.3); padding: 10px; border-radius: 6px; border: 1px solid rgba(255, 196, 129, 0.08); color: rgba(255, 232, 209, 0.7); overflow-x: auto;">{
  "status": "pending",
  "file": "SKILL.md"
}</pre>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="font-size: 11px; color: rgba(255, 232, 209, 0.4);">PROCESS OUTPUT</div>
          <pre style="margin: 0; font-size: 11px; background: rgba(255, 196, 129, 0.02); padding: 10px; border-radius: 6px; border: 1px solid rgba(255, 196, 129, 0.08); color: var(--color-accent-warm-light); overflow-x: auto;">{
  "status": "success",
  "processed": true
}</pre>
        </div>
      </div>
    </div>`
}
