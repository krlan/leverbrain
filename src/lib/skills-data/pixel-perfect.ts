import { SkillListing } from '../skills-data'
 
export const pixelPerfect: SkillListing = {
  id: 'pixel-perfect',
  author: 'Yu-369',
  slug: 'pixel-perfect',
  name: "Pixel perfect",
  tagline: "> This skill fires when the user provides a screenshot, mockup, Figma export, or any design image and asks you to rep...",
  description: "> This skill fires when the user provides a screenshot, mockup, Figma export, or any design image and asks you to replicate it in code. The reference image is the specification. Your role is translator, not designer. Every visual decision — font size, spacing, color, radius, shadow, layout proportion — comes from the image, not from your preferences.",
  readme: `name: pixel-perfect-replication
description: Image-to-code replication pipeline. When the user provides a screenshot or design reference, this skill runs a structured extraction across seven layers (grid, type, color, spacing, components, atmosphere, interaction), builds an Extraction Sheet before any code is written, implements with exact fidelity to the reference, and verifies through inline Quality Gates and a final Visual Diff. The reference image is the spec. The code is a translation, not an interpretation.
---

# Pixel-Perfect Design Replication

> This skill fires when the user provides a screenshot, mockup, Figma export, or any design image and asks you to replicate it in code. The reference image is the specification. Your role is translator, not designer. Every visual decision — font size, spacing, color, radius, shadow, layout proportion — comes from the image, not from your preferences.

---

## The Pipeline

Every replication job follows this flow. No phase can be skipped. No phase can start before the previous one completes.

\`\`\`
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   IMAGE IN ──→ Phase 1: Intake ──→ Phase 2: Deep Extraction        │
│                  (classify)          (7 layers, fill sheets)        │
│                                                                     │
│                                 ──→ Phase 3: Build                  │
│                                      (structure-first, exact CSS)   │
│                                                                     │
│                                 ──→ Phase 4: Visual Diff            │
│                                      (verify against reference)     │
│                                                                     │
│   Each phase has a ✓ Quality Gate. Failing a gate blocks the next.  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
\`\`\`

---

## Phase 1: Image Intake

Receive the reference image. Before doing anything else, classify what you are looking at.

### → Classify the image

Fill in this table for every reference image:

| Field | Your answer |
|---|---|
| **Image type** | Full-page screenshot / single section / component detail / mobile view / desktop view / Figma frame / design tool export / live site screenshot |
| **Sections visible** | List top-to-bottom, e.g. "Nav → Hero → Features → Testimonials → Footer" |
| **Target viewport** | Estimated width: 1440px (desktop), 1280px (laptop), 768px (tablet), 375px (mobile) |
| **Fidelity** | High-res export (sub-pixel details are intentional) / compressed screenshot (some lossy artifacts) |
| **Theme** | Light / Dark / Mixed |

### → Output the Extraction Summary

Before any code, state what you see in structured natural language. This anchors every decision that follows.

Example:

> *Light mode, 1440px desktop. Five sections: sticky frosted nav with logo left / links center / CTA right, hero with massive serif heading left-aligned over full-bleed photography, 3-col feature grid with icon-top cards, testimonial carousel with large quotation marks, minimal footer with 4-col link grid. Palette: warm cream base, near-black text, terracotta accent on CTAs. Typography: serif display heading (likely Playfair Display), geometric sans body (likely Outfit). Cards are sharp-cornered, buttons are pill-shaped. No visible shadows — flat design with subtle border separators.*

### → If the image is unclear

Do not guess. Ask specifically:

> *"The nav links are too compressed to read at this resolution. The body font could be Outfit or Satoshi — they share near-identical geometry at this size. Can you provide a closer crop of the nav, or confirm the font stack?"*

### ✓ Quality Gate: Intake

Before moving to Phase 2, confirm:
- You have classified the image type, section count, viewport, and fidelity
- You have written the Extraction Summary
- You have flagged any unclear areas and asked for clarification (or confirmed everything is readable)

---

## Phase 2: Deep Extraction

Run all seven extraction layers on the reference image. Each layer focuses on one dimension of the design. Fill in the Extraction Sheet for each. Skipping a layer causes drift — small errors here compound into "it looks off" in the final build.

---

### Layer 1: Layout Grid

Extract the spatial skeleton.

**Extraction Sheet:**

| Property | Measured value |
|---|---|
| Container max-width | e.g. \`1280px\`, \`1440px\` — measure by proportion against viewport edges |
| Column system | e.g. \`grid-cols-[1.15fr_1fr]\`, \`grid-cols-3\`, \`single column centered\` |
| Horizontal padding | e.g. \`px-6 md:px-12 lg:px-20\` — measure the gap between content edge and viewport edge |
| Section heights | \`min-h-[100dvh]\` for full-viewport, \`auto\` for content-driven |
| Section spacing | Vertical gap between sections, e.g. \`py-24 lg:py-32\` |
| Alignment | Per-section: left / center / right / mixed |
| Z-axis layering | Any overlaps? Elements stacked on top of others? |

**How to measure proportions from images:**
- If the hero heading occupies ~60% of viewport width, on a 1440px target that is roughly \`max-w-[54rem]\`
- If one column is visually 1.5x wider than the adjacent column, use \`grid-cols-[1.5fr_1fr]\`
- If empty space above a heading is roughly 2x the heading font size, the padding is approximately \`2em\` relative to the heading

⚠ **Drift Warning:** The most common layout error is getting the container max-width wrong. A design with \`max-w-[1200px]\` looks noticeably different from one with \`max-w-[1440px]\` — the whitespace proportions change completely. Measure carefully.

---

### Layer 2: Typography

This is the most critical extraction. Wrong typography is the #1 reason a replication "looks off."

**Extraction Sheet (fill for EVERY visible text element):**

| Element | Font family | Weight | Size | Line-height | Letter-spacing | Transform | Color |
|---|---|---|---|---|---|---|---|
| Nav links | | | | | | | |
| Eyebrow/label | | | | | | | |
| H1 (hero) | | | | | | | |
| H2 (section) | | | | | | | |
| H3 (card title) | | | | | | | |
| Body text | | | | | | | |
| Caption/meta | | | | | | | |
| CTA text | | | | | | | |
| Footer links | | | | | | | |

**Font identification — what to look for:**

Fonts reveal themselves through specific characters. Study these before guessing:

| Check this character | What it tells you |
|---|---|
| Lowercase \`a\` | Single-story (Geist, Helvetica) vs double-story (Outfit, Satoshi, DM Sans) |
| Lowercase \`g\` | Open-tail (most sans-serifs) vs closed-tail (Futura, some geometric) |
| Lowercase \`t\` | Curved crossbar (humanist: Manrope, Jakarta) vs straight (geometric: Outfit, Satoshi) |
| Capital \`R\` | Straight leg (Geist, Helvetica) vs curved leg (Outfit, Satoshi) |
| Capital \`Q\` | Tail style varies dramatically between fonts — strong identifier |
| Lowercase \`e\` | High crossbar (geometric) vs centered (humanist) |
| Numbers \`1, 4, 6, 9\` | Highly distinctive shapes across fonts |

**Common web font quick-reference:**

| Visual character | Strong candidates |
|---|---|
| Geometric, double-story \`a\`, round counters | Outfit, Satoshi, DM Sans, Plus Jakarta Sans |
| Grotesque, single-story \`a\`, flat terminals | Geist, Suisse Intl, Helvetica Neue |
| Humanist, open counters, calligraphic stress | Manrope, Plus Jakarta Sans, Nunito Sans |
| Condensed, tall x-height | Barlow Condensed, Oswald, Archivo Narrow |
| Modern serif, high contrast, sharp serifs | Playfair Display, Bodoni Moda |
| Transitional serif, moderate contrast | Lora, Merriweather, Source Serif Pro |
| Display sans, wide, heavy | Cabinet Grotesk, Clash Display, Monument Extended |
| Monospace | JetBrains Mono, Fira Code, IBM Plex Mono, Geist Mono, Space Mono |

If you cannot confidently identify the font, state your top 2-3 candidates with the distinguishing character that makes you lean one way. Example: *"The double-story 'a' and round 'o' suggest Outfit, but the slightly squared terminals could indicate Satoshi. Defaulting to Outfit — swap by changing \`--font-display\` if incorrect."*

⚠ **Drift Warning:** Never assume a heading is \`font-weight: 700\` because "headings are bold." Many premium designs use \`500\` or \`600\` for headings with a heavier font face. Look at stem thickness relative to the counter space.

---

### Layer 3: Color Palette

Extract every distinct color. Not "it uses blue" — extract the hex.

**Extraction Sheet:**

| Role | Hex value | Notes |
|---|---|---|
| Background (primary) | | e.g. \`#F5F0EB\` warm cream, not plain \`#FFFFFF\` |
| Background (secondary) | | Alternate section BG, card BG |
| Background (dark section) | | If any sections flip to dark |
| Text (primary) | | Heading + body text on primary BG |
| Text (secondary) | | Muted descriptions, metadata |
| Text (tertiary) | | Placeholders, disabled states |
| Accent | | CTAs, active indicators, links |
| Accent (hover) | | Darker/lighter variant on interaction |
| Border | | Card borders, dividers, input borders |
| Shadow | | If tinted, note the hue |

**Extracting colors from compressed screenshots:**

Screenshots compress colors. To get accurate values:
- Sample from the **largest flat area** of the color, not from edges or JPEG artifacts
- Cross-reference with common web values — if you measure \`#0b0b0b\`, it is almost certainly \`#0a0a0a\` (standard off-black). If you measure \`#f4f3f1\`, it is likely \`#f5f4f2\` (common warm cream)
- After extracting, verify WCAG AA contrast between text and background colors to confirm the values are reasonable

⚠ **Drift Warning:** The difference between \`#FFFFFF\` (pure white) and \`#F5F0EB\` (warm cream) completely changes the feel of a page. Do not default to \`#FFFFFF\` or \`#000000\` unless the reference genuinely shows pure values — most premium designs use off-white and off-black.

---

### Layer 4: Spacing System

Spacing is what separates "looks close" from "looks identical."

**Extraction Sheet:**

| Measurement | Value | How to verify |
|---|---|---|
| Base unit | \`4px\` or \`8px\` | Measure the smallest repeated gap |
| Button padding (H) | e.g. \`24px\` / \`px-6\` | Horizontal space between text edge and button edge |
| Button padding (V) | e.g. \`12px\` / \`py-3\` | Vertical space |
| Card internal padding | e.g. \`32px\` / \`p-8\` | Space from card edge to card content |
| Grid gap | e.g. \`24px\` / \`gap-6\` | Space between cards/columns |
| Heading → subtext | e.g. \`16px\` / \`mt-4\` | Gap between heading baseline and subtext top |
| Subtext → CTA | e.g. \`32px\` / \`mt-8\` | Gap between subtext and button |
| Section padding (top) | e.g. \`96px\` / \`pt-24\` | Space from section top to first element |
| Section padding (bottom) | e.g. \`128px\` / \`pb-32\` | Space from last element to section bottom |
| Nav height | e.g. \`64px\` / \`h-16\` | Total nav bar height |
| Nav link gap | e.g. \`32px\` / \`gap-8\` | Space between nav links |

⚠ **Drift Warning:** Top and bottom section padding are often **not** equal. Many designs use more bottom padding than top (or vice versa) for optical balance. Do not assume \`py-24\` when the reference shows \`pt-20 pb-28\`. Measure each side independently.

---

### Layer 5: Component Inventory

Catalog every distinct UI component visible in the image.

**For each component, fill in:**

| Component | Shape (radius) | Border | Shadow | Background | States visible | Icon style |
|---|---|---|---|---|---|---|
| Primary button | | | | | | |
| Secondary button | | | | | | |
| Card | | | | | | |
| Input field | | | | | | |
| Badge/pill | | | | | | |
| Avatar | | | | | | |
| Navigation | | | | | | |
| Divider | | | | | | |

**Border-radius consistency check:** Most designs commit to one radius language. Check whether the design uses:
- **Sharp** — \`0px\` everywhere (brutalist, editorial)
- **Subtle** — \`4-8px\` everywhere (SaaS, product)
- **Rounded** — \`12-16px\` everywhere (modern, friendly)
- **Pill** — \`9999px\` on buttons, rounded on cards (premium, polished)
- **Mixed** — different radii fo`,
  whenToUse: "Use when you need to automate pixel perfect processes.",
  price: "Free",
  priceUsdc: 0,
  category: "skill",
  tags: ["Yu-369-skills","pixel-perfect"],
  stars: 192,
  weeklyInstalls: 108,
  totalPurchases: 1116,
  featured: false,
  createdAt: '2026-07-18',
  creatorWallet: '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
  fileUrl: 'https://github.com/Yu-369/VibeCurb/blob/main/skills/pixel-perfect/SKILL.md',
  useCases: ["You have classified the image type, section count, viewport, and fidelity.","You have written the Extraction Summary.","You have flagged any unclear areas and asked for clarification (or confirmed everything is readable)."],
  exampleUsage: "Apply pixel perfect for my project",
  overviewHtml: `<div class="skill-enrichment" style="display: flex; flex-direction: column; gap: 32px;">
      <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 196, 129, 0.14); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);">
        <div style="width: 100%; aspect-ratio: 16/6; background: linear-gradient(135deg, #13110f 0%, #17181c 100%); display: flex; align-items: center; justify-content: center; color: var(--color-accent-warm-light);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 30%, #0a0806 95%);"></div>
        <div style="position: absolute; bottom: 20px; left: 24px; right: 24px;">
          <h2 style="font-family: var(--font-display); color: var(--color-accent-warm-light); margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 0.02em;">Pixel perfect</h2>
          <p style="margin: 6px 0 0; color: var(--color-text-secondary); font-size: 14px; max-width: 600px;">> This skill fires when the user provides a screenshot, mockup, Figma export, or any design image and asks you to rep...</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1.2fr 1.0fr; gap: 32px; align-items: start;">
        <div>
          <h3 style="color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;">SKILL CAPABILITIES</h3>
          <p style="margin-bottom: 24px; font-size: 13.5px; line-height: 1.65; color: var(--color-text-secondary);">> This skill fires when the user provides a screenshot, mockup, Figma export, or any design image and asks you to replicate it in code. The reference image is the specification. Your role is translator, not designer. Every visual decision — font size, spacing, color, radius, shadow, layout proportion — comes from the image, not from your preferences.</p>
          
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
