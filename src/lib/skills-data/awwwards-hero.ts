import { SkillListing } from '../skills-data'
 
export const awwwardsHero: SkillListing = {
  id: 'awwwards-hero',
  author: 'Yu-369',
  slug: 'awwwards-hero',
  name: "Awwwards hero",
  tagline: "> This skill is HERO-SECTION ONLY.",
  description: "> This skill is HERO-SECTION ONLY. It does not govern full pages, navigation systems, footers, or feature sections. It fires when the user asks for a hero, a landing header, an above-the-fold section, or provides reference screenshots of hero designs.",
  readme: `name: awwwards-hero-section
description: Hero-section pipeline for building Awwwards/FWA-tier hero sections. Extracts design direction from reference images, provides six hero architectures with implementation blueprints, and enforces the fundamentals that separate award-winning heroes from generic AI output — viewport-scale typography, single focal point, extreme whitespace, tight palette. Hero-only. Pair with other skills for full pages.
---

# Awwwards-Tier Hero Section

> This skill is HERO-SECTION ONLY. It does not govern full pages, navigation systems, footers, or feature sections. It fires when the user asks for a hero, a landing header, an above-the-fold section, or provides reference screenshots of hero designs.

---

## The Pipeline

\`\`\`
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│   BRIEF IN ──→ Phase 1: Read ──→ Phase 2: Architecture              │
│                  (extract signals)  (pick one, commit)               │
│                                                                      │
│                              ──→ Phase 3: Build                      │
│                                   (type, palette, atmosphere,        │
│                                    motion, mobile)                   │
│                                                                      │
│                              ──→ Phase 4: Verify                     │
│                                   (visual diff against reference)    │
│                                                                      │
│   Each phase has a ✓ Quality Gate. Failing a gate blocks the next.   │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
\`\`\`

---

## Phase 1: Read the Reference

Before writing any code, extract design signals from the user's reference images (or infer from their brief). Do not project your own aesthetic onto the reference. Read what is actually there.

### → Extract these signals from each image

| Signal | What to look for |
|---|---|
| **Mode** | Light or Dark background |
| **Focal element** | What dominates the viewport? Massive typography, 3D object, full-bleed photography, product mockup, abstract shape, video, scattered floating elements |
| **Typography style** | Serif, sans-serif, or mixed. Massive or restrained. Uppercase or mixed-case. Tight-tracked or normal. Italic presence |
| **Text-to-image relationship** | Text sits ABOVE image (layered)? BESIDE it (split)? BEHIND a subject (masked)? INSIDE it (clipped)? INTERTWINED with inline images between words? |
| **Layout gravity** | Where does visual weight sit? Center? Bottom-left? Split across edges? Full-bleed? |
| **Color count** | Count distinct hues — award-winning heroes almost always use 2-3 max |
| **Navigation style** | Floating pill? Flat horizontal? Split (logo left, links right)? Minimal (logo + menu only)? |
| **Micro-details** | Rotating text badges, monospace metadata labels, glassmorphic cards, showreel links, CTA pill style |

### → Output a Hero Extraction before generating code

State in 2-3 lines exactly what you extracted:

> *"Hero Extraction: Dark mode, centered 3D card carousel with CSS perspective as focal element, massive sans-serif heading below in mixed-case, monospace micro-label above, single ghost CTA, floating pill nav. Palette: off-black + white + one muted accent. Feels like: dark cinematic agency with depth-layered cards."*

### → If no reference images are provided

Ask exactly ONE question: *"Do you want this hero closer to [dark cinematic] or [light editorial]? And what's the brand name + one-line value prop?"*

If you can infer from context (e.g., user said "AI startup" or "luxury agency"), skip the question and declare your Hero Extraction.

### ✓ Quality Gate: Read

Before moving to Phase 2, confirm:
- You have extracted all 8 signals from the reference (or inferred them from the brief)
- You have written the Hero Extraction summary
- You know the mode (light/dark), the focal element, and the palette direction

---

## Phase 2: Pick an Architecture

Select ONE architecture from the six below that best matches the reference. Do not blend two architectures. Commit fully to one.

---

### Architecture A: The Cinematic Center

*Best for: dark cinematic agency sites, immersive product launches, atmospheric brand pages*

The heading sits centered in the viewport. A cinematic visual (3D render, product shot, atmospheric photography) fills the background or floats behind/around the text. The CTA is a single centered pill or ghost button below the heading.

\`\`\`
[viewport container: relative, min-h-[100dvh], overflow-hidden]
  [background visual: absolute inset-0, object-cover or positioned 3D element]
  [content overlay: relative z-10, flex flex-col items-center justify-center text-center]
    [optional eyebrow: small mono label]
    [H1: massive centered, max 2-3 lines]
    [optional subtext: max 20 words, muted color]
    [CTA: single pill button]
\`\`\`

The background visual uses \`position: absolute; inset: 0\` with \`object-fit: cover\` (for images) or centered absolute positioning (for 3D/illustrations). Text sits on top via \`position: relative; z-index: 10\`. If text readability suffers, add a scrim gradient overlay between the image and text layers (\`bg-gradient-to-t from-black/60 via-black/20 to-transparent\`).

---

### Architecture B: The Asymmetric Split

*Best for: bold agency homepages, AI/tech product launches, statement brand pages*

Massive heading on one side (usually left, occupying 55-65% width). Supporting content (subtext, CTA, or a visual asset) on the other side, vertically offset. The two halves do NOT align to the same baseline — deliberate vertical tension.

\`\`\`
[viewport container: min-h-[100dvh], grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] items-end lg:items-center gap-8 lg:gap-0]
  [left: H1, massive, left-aligned, takes up most of the width]
  [right: subtext + CTA OR visual asset, vertically offset from the H1 baseline]
\`\`\`

Use \`items-end\` on the left column and \`items-start\` on the right (or vice versa) to create vertical tension. The heading should feel like it anchors the page to one side. On mobile (\`< 768px\`), collapse to single column, full-width.

---

### Architecture C: The Full-Bleed Subject

*Best for: athlete/personal brand sites, product photography heroes, editorial fashion or lifestyle*

A full-viewport photograph or 3D render IS the hero. Typography is overlaid directly on the image — either at the top-left, bottom-left, or bleeding across the bottom edge. No separate "text area" — the image and text coexist in the same spatial plane.

\`\`\`
[viewport container: relative, min-h-[100dvh], overflow-hidden]
  [full-bleed image: absolute inset-0, object-cover]
  [gradient scrim: absolute inset-0, bg-gradient-to-t from-black/70 via-transparent to-black/20]
  [content: absolute bottom-0 left-0 p-12 lg:p-20, z-10]
    [H1: massive, white, mix-blend-mode: difference OR on top of scrim]
    [optional CTA]
\`\`\`

The text MUST be readable against the photo. Use either a gradient scrim layer OR \`mix-blend-mode: difference\` on the text (which inverts text color against the background). Scrim is safer, blend mode is bolder. On mobile, increase scrim opacity.

---

### Architecture D: The Typographic Poster

*Best for: creative studio portfolios, personal brand statements, typography-led editorial*

Typography IS the visual. There is no hero image. The heading itself, at viewport-bleeding scale, IS the graphic element. Words may be split across the viewport edges. Different weights, sizes, or italics within the same heading create visual texture.

\`\`\`
[viewport container: min-h-[100dvh], flex flex-col justify-between p-8 lg:p-16]
  [top: nav or micro-label]
  [center: H1 at viewport-scale (10vw-15vw), possibly split into multiple positioned lines]
  [bottom: CTA or micro-metadata strip]
\`\`\`

Use \`font-size: clamp(4rem, 12vw, 16rem)\`. Words can be positioned with \`text-align: left\` on line 1, \`text-align: right\` on line 2, creating diagonal visual flow. Mix \`font-weight: 900\` with \`font-weight: 300\` or \`font-style: italic\` within the same heading using \`<span>\` wrappers.

---

### Architecture E: The Inline-Image Typography

*Best for: creative agency hero sections, brand pages with personality, editorial homepages*

Massive typography with small, rounded images embedded BETWEEN words in the headline. The images sit inline at type-height, acting as visual punctuation. The heading reads as a sentence with tiny photo interruptions.

\`\`\`
[viewport container: min-h-[100dvh], flex items-center justify-center]
  [H1: massive, contains <span> wrappers for inline images]
    "Build " [inline-image: w-16 h-10 rounded-full object-cover align-middle mx-1] " a quieter, " [inline-image] " smarter AI agency presence."
\`\`\`

\`\`\`css
/* BLUEPRINT: Inline hero images
   WHY: The images must match the x-height of the surrounding text.
   They are punctuation, not focal elements. Making them too large
   turns the heading into a gallery instead of a sentence. */
.inline-hero-img {
  display: inline-block;
  width: clamp(3rem, 5vw, 5rem);
  height: clamp(2rem, 3.5vw, 3.5rem);
  border-radius: 9999px;       /* pill shape */
  object-fit: cover;
  vertical-align: middle;
  margin-inline: 0.25em;
}
\`\`\`

On mobile, the inline images can either scale down with the text or stack below the headin`,
  whenToUse: "Use when you need to automate awwwards hero processes.",
  price: "Free",
  priceUsdc: 0,
  category: "skill",
  tags: ["Yu-369-skills","awwwards-hero"],
  stars: 517,
  weeklyInstalls: 152,
  totalPurchases: 303,
  featured: false,
  createdAt: '2026-07-18',
  creatorWallet: '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
  fileUrl: 'https://github.com/Yu-369/VibeCurb/blob/main/skills/awwwards-hero/SKILL.md',
  useCases: ["You have extracted all 8 signals from the reference (or inferred them from the brief).","You have written the Hero Extraction summary.","*Best for: dark cinematic agency sites, immersive product launches, atmospheric brand pages*."],
  exampleUsage: "Apply awwwards hero for my project",
  overviewHtml: `<div class="skill-enrichment" style="display: flex; flex-direction: column; gap: 32px;">
      <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 196, 129, 0.14); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);">
        <div style="width: 100%; aspect-ratio: 16/6; background: linear-gradient(135deg, #13110f 0%, #17181c 100%); display: flex; align-items: center; justify-content: center; color: var(--color-accent-warm-light);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 30%, #0a0806 95%);"></div>
        <div style="position: absolute; bottom: 20px; left: 24px; right: 24px;">
          <h2 style="font-family: var(--font-display); color: var(--color-accent-warm-light); margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 0.02em;">Awwwards hero</h2>
          <p style="margin: 6px 0 0; color: var(--color-text-secondary); font-size: 14px; max-width: 600px;">> This skill is HERO-SECTION ONLY.</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1.2fr 1.0fr; gap: 32px; align-items: start;">
        <div>
          <h3 style="color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;">SKILL CAPABILITIES</h3>
          <p style="margin-bottom: 24px; font-size: 13.5px; line-height: 1.65; color: var(--color-text-secondary);">> This skill is HERO-SECTION ONLY. It does not govern full pages, navigation systems, footers, or feature sections. It fires when the user asks for a hero, a landing header, an above-the-fold section, or provides reference screenshots of hero designs.</p>
          
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
