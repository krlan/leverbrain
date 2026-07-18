import { SkillListing } from '../skills-data'
 
export const visualRedesign: SkillListing = {
  id: 'visual-redesign',
  author: 'Yu-369',
  slug: 'visual-redesign',
  name: "Visual redesign",
  tagline: "This is the non-negotiable, unbreakable rule that governs every line of this skill:.",
  description: "This is the non-negotiable, unbreakable rule that governs every line of this skill:",
  readme: `name: visual-redesign
description: Surgical aesthetic upgrade pipeline for existing React codebases. Takes ugly, functional code (Bootstrap defaults, generic Tailwind, amateur CSS) and transforms it to Awwwards-tier quality WITHOUT touching or breaking the underlying JavaScript logic — states, effects, API calls, event handlers, routing, and data flow are sacred and untouchable. Audits the existing code across 7 layers (tokens, typography, spacing, color, components, atmosphere, motion), classifies every element as Sacred (JS logic — do not touch) or Slop (visual cruft — upgrade), then executes precise CSS-only surgery layer by layer. The skill that turns a developer's "make this look better" into a controlled, non-destructive visual transformation.
---

# Visual Redesign: Surgical Aesthetic Upgrade

> This skill fires when the user provides existing React/HTML/CSS code and asks to make it look better, upgrade the design, improve the aesthetics, make it premium, give it an Awwwards feel, or any variation of "this works but looks terrible." The user's code is FUNCTIONAL — it has working state, API calls, event handlers, and business logic. Your job is to upgrade the visual layer without breaking any of it. You are a surgeon, not a demolition crew. Cut precisely. Leave the patient alive.

---

## The Sacred Rule — Read First

**JavaScript logic is sacred. You do not touch it. Ever.**

This is the non-negotiable, unbreakable rule that governs every line of this skill:

\`\`\`
SACRED (never modify):
  ├── useState / useReducer declarations and updates
  ├── useEffect / useCallback / useMemo bodies
  ├── API calls (fetch, axios, SWR, React Query)
  ├── Event handler LOGIC (what happens onClick, not how the button looks)
  ├── Conditional rendering logic (ternaries, && chains, if blocks)
  ├── Router/navigation logic
  ├── Form validation logic
  ├── Context providers and consumers
  ├── Custom hook implementations
  ├── Data transformations (map, filter, reduce on data)
  ├── Error handling (try/catch, error boundaries)
  ├── Prop drilling / prop interfaces
  └── Third-party library integration logic

SLOP (upgrade aggressively):
  ├── className strings and CSS classes
  ├── Inline styles (style={{...}})
  ├── CSS/SCSS files
  ├── Tailwind utility classes
  ├── Bootstrap classes
  ├── Color values (hex, rgb, hsl)
  ├── Font families and sizes
  ├── Spacing values (padding, margin, gap)
  ├── Border-radius values
  ├── Shadow values
  ├── Transition/animation declarations
  ├── z-index values
  ├── Layout structure (flex/grid configuration)
  └── Wrapper div nesting (for layout, NOT for conditional logic)
\`\`\`

⚠ **Drift Warning:** The #1 way AI "breaks the app" is by restructuring JSX to look cleaner and accidentally removing a conditional wrapper, moving a key prop, changing a ref assignment, or reordering children that depend on DOM position. NEVER restructure JSX for aesthetic reasons if the existing structure works. Add CSS to the existing structure. Do not reshape the structure to fit your CSS preferences.

### → The Gray Zone

Some elements are both logic and style. Handle them with extreme care:

| Element | Sacred or Slop? | Rule |
|---|---|---|
| \`className={isActive ? 'active' : ''}\` | **Both** — logic is sacred, class names are slop | Keep the ternary. Change only the class name values: \`className={isActive ? 'nav-link--active' : 'nav-link'}\` |
| \`style={{ display: isOpen ? 'block' : 'none' }}\` | **Sacred** — this is conditional visibility logic | Do NOT replace with CSS classes. The inline style is driven by state. Leave it. Add your styles alongside it |
| \`{items.map((item) => <Card key={item.id} ... />)}\` | **Sacred** — the map, key, and data flow are logic | Style the Card component's internals. Do not change the map structure or key assignment |
| \`ref={containerRef}\` | **Sacred** — ref assignments drive JS behavior | Never remove, move, or rename refs |
| \`aria-*\` attributes | **Sacred** — accessibility attributes are functional | Never remove. You may add missing ones |
| \`data-*\` attributes | **Probably sacred** — often used by JS/tests | Never remove unless confirmed unused |
| \`id\` attributes | **Probably sacred** — may be used by JS selectors | Never change unless confirmed unused |
| \`onClick={() => setOpen(!open)}\` | **Sacred** — the handler is logic | Style the element. Do not touch the handler |
| \`<div>\` that wraps conditional content | **Sacred** — the div may exist for rendering reasons | Do not remove "unnecessary" wrapper divs unless you've confirmed they're purely presentational |

**The Golden Rule of the Gray Zone:** If you're unsure whether something is logic or style, leave it alone and add your styles alongside it. A slightly less elegant CSS solution that doesn't break the app is infinitely better than an elegant refactor that introduces bugs.

---

## The Pipeline

\`\`\`
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   CODE IN ──→ Phase 1: Audit                                            │
│                 (read every file, classify Sacred vs Slop,              │
│                  identify the aesthetic crimes)                          │
│                                                                          │
│             ──→ Phase 2: Extraction                                     │
│                  (extract current design decisions across               │
│                   7 layers, build the Slop Sheet)                       │
│                                                                          │
│             ──→ Phase 3: Prescription                                   │
│                  (define target aesthetic, map every                    │
│                   slop item to its gold replacement)                    │
│                                                                          │
│             ──→ Phase 4: Surgery                                        │
│                  (execute replacements layer by layer:                  │
│                   tokens → typography → color → spacing →              │
│                   components → atmosphere → motion)                     │
│                                                                          │
│             ──→ Phase 5: Post-Op                                        │
│                  (verify nothing broke, visual diff,                    │
│                   responsive check, motion check)                       │
│                                                                          │
│   Each phase has a ✓ Quality Gate. Failing a gate blocks the next.     │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
\`\`\`

---

## Phase 1: Audit

Before changing a single character, read the entire codebase. Understand what exists. Classify everything.

### → Read every file and fill the Audit Table

| File | Type | Sacred elements | Slop elements | Risk level |
|---|---|---|---|---|
| \`App.tsx\` | Root component | Router setup, providers, global state | Root className, global wrapper styles | Low |
| \`Header.tsx\` | UI component | Nav state (mobile menu toggle), auth state | All className strings, inline styles, layout | Medium |
| \`Hero.tsx\` | UI component | CTA click handlers, any analytics calls | Typography, colors, spacing, images, layout | Low |
| \`Features.tsx\` | UI component | Data arrays, map iterations | Card styles, grid layout, icons | Low |
| \`Dashboard.tsx\` | Complex component | All state, effects, API calls, data transforms | Table styles, card styles, chart wrapper styles | **High** |
| \`Form.tsx\` | Complex component | Validation, submission, error handling, refs | Input styles, button styles, layout | **High** |
| \`index.css\` | Stylesheet | None (but may contain critical resets) | Everything | Low |

**Risk levels:**
- **Low** — Mostly presentational. Safe to restyle aggressively.
- **Medium** — Mix of logic and presentation. Restyle carefully, test after.
- **High** — Heavy logic intertwined with presentation. Touch only CSS classes and styles. Test every change.

### → Identify the Aesthetic Crimes

Walk through the UI and catalog every visual problem. Be specific — "looks bad" is not a diagnosis.

| Crime | Where | Severity | Example |
|---|---|---|---|
| **Generic font stack** | Global/body | Critical | \`font-family: Arial, sans-serif\` or browser default |
| **Default shadows** | Cards, buttons | Major | \`box-shadow: 0 2px 4px rgba(0,0,0,0.1)\` — the Bootstrap default |
| **Pure black text on pure white** | Everywhere | Major | \`color: #000; background: #fff\` — zero warmth, harsh contrast |
| **Inconsistent spacing** | Between sections | Major | \`margin-top: 20px\` on one section, \`margin-top: 50px\` on the next |
| **Bootstrap blue accent** | Buttons, links | Critical | \`#0d6efd\` — the single most recognizable "I didn't design this" signal |
| **Generic border-radius** | Cards, buttons | Moderate | \`border-radius: 4px\` everywhere — no radius language |
| **No entry animations** | Page load | Moderate | Elements just appear — static, lifeless mount |
| **No hover states** | Buttons, cards, links | Major | Interactive elements give zero feedback |
| **Cramped padding** | Cards, sections | Major | \`padding: 16px\` on a card that needs \`32px\` to breathe |
| **No atmosphere** | Backgrounds | Moderate | Flat \`background: white\` or \`background: #f5f5f5\` — no depth |
| **Mixed radius languages** | Across components | Moderate | Buttons are \`rounded-full\` but cards are \`rounded-sm\` with no logic |
| **Body font as heading font** | H1-H3 | Critical | Inter/Roboto/Arial at \`font-size: 24px\` pretending to be a display heading |
| **No visual hierarchy** | Content sections | Major | Everything the same size, weight, and color |
| **No whitespace system** | Layout | Major | Random \`mt-4\`, \`mt-6\`, \`mt-3\` with no pattern |

### → Output the Audit Summary

State in 3-5 lines what you found:

> *"Audit Summary: React SPA with 8 components. Router, auth state, and 3 API calls are sacred — all in Dashboard.tsx and Header.tsx. The visual layer is Bootstrap 5 defaults across the board: #0d6efd blue accent, default shadows, Arial font stack, 4px radius on everything, no hover states, no entry animations, cramped 16px padding on cards, pure black-on-white text. No design system — spacing and colors are ad-hoc per component. Estimated crimes: 14 critical, 23 major. Risk: Medium overall, High on Dashboard.tsx (complex state + table rendering)."*

### ✓ Quality Gate: Audit

Before moving to Phase 2, confirm:
- Every file has been read and classified in the Audit Table
- Sacred elements are identified in every file
- Risk levels are assigned per file
- Aesthetic crimes are cataloged with specific examples
- Audit Summary is written
- You understand which files are High risk (heavy JS logic)
- You have NOT modified any code yet

---

## Phase 2: Extraction

Extract the current design decisions across 7 layers. This creates the "before" snapshot — the Slop Sheet.

### → Layer 1: Tokens (Colors, Fonts, Spacing Scale)

| Token | Current value (Slop) | Source |
|---|---|---|
| Primary background | \`#ffffff\` or \`white\` | index.css / inline |
| Secondary background | \`#f5f5f5\` or \`#f8f9fa\` | Bootstrap gray-100 |
| Primary text | \`#000000\` or \`#212529\` | Bootstrap default |
| Secondary text | \`#6c757d\` | Bootstrap gray-600 |
| Accent/primary action | \`#0d6efd\` | Bootstrap primary |
| Accent hover | \`#0b5ed7\` | Bootstrap primary hover |
| Danger/error | \`#dc3545\` | Bootstrap danger |
| Success | \`#198754\` | Bootstrap success |
| Border color | \`#dee2e6\` | Bootstrap gray-300 |
| Font display | \`system-ui\` or \`Arial\` | Browser default |
| Font body | Same as display | No differentiation |
| Font mono | None | Missing |
| Spacing base | No system (ad-hoc) | Random px values |
| Radius default | \`4px\` or \`0.375rem\` | Bootstrap default |

### → Layer 2: Typography

| Element | Current spec (Slop) |
|---|---|
| H1 | \`font-size: 2rem; font-weight: bold; font-family: inherit\` |
| H2 | \`font-size: 1.5rem; font-weight: bold\` |
| H3 | \`font-size: 1.25rem; font-weight: bold\` |
| Body | \`font-size: 1rem; line-height: 1.5\` |
| Small/caption | \`font-size: 0.875rem\` |
| Button text | \`font-size: 1rem; font-weight: 400\` |
| Letter-spacing | None set (browser default: normal) |
| Line-height on headings | 1.2 (Bootstrap default — too loose for display) |
| Text wrapping | No \`text-wrap: balance\` on headings |
| Max-width on body text | None (text runs edge to edge) |

### → Layer 3: Spacing

| Measurement | Current value (Slop) |
|---|---|
| Section padding | Inconsistent: \`py-3\`, \`py-4\`, \`py-5\`, random px values |
| Card padding | \`p-3\` (12px) or \`p-4\` (16px) — cramped |
| Grid gap | \`gap-3\` (12px) or \`gap-4\` (16px) — tight |
| Heading → body gap | \`mb-2\` or \`mb-3\` — too tight |
| Body → CTA gap | \`mt-3\` — too tight |
| Nav height | \`py-2\` (short and cramped) or default Bootstrap nav height |
| Component spacing | No consistent system — every component different |

### → Layer 4: Color Usage

| Usage | Current value (Slop) | Problem |
|---|---|---|
| Background | Pure \`#fff\` or \`#f8f9fa\` | Flat, cold, no warmth |
| Text | Pure \`#000\` or \`#212529\` | Harsh, no refinement |
| Accent | Bootstrap \`#0d6efd\` | Screams "undesigned" |
| Borders | \`#dee2e6\` | Generic gray |
| Shadows | \`rgba(0,0,0,0.1)\` | Default, undifferentiated |
| Hover states | Slightly darker shade | No personality |
| Active states | Even darker shade | Mechanical, not physical |
| Error | Bootstrap \`#dc3545\` | Generic red |

### → Layer 5: Components

| Component | Current state (Slop) |
|---|---|
| Buttons | Bootstrap \`.btn.btn-primary\` — \`#0d6efd\`, \`4px\` radius, generic padding, no hover physics |
| Cards | \`.card\` — \`1px solid #dee2e6\`, \`4px\` radius, default shadow or no shadow, cramped padding |
| Inputs | Bootstrap form controls — \`#dee2e6\` border, no focus glow, no float labels |
| Navigation | Bootstrap navbar — busy, cramped, default styling |
| Tables | Bootstrap \`.table\` — zebra stripes, cramped rows, no refinement |
| Modals | Bootstrap modal — generic overlay, no entry animation |
| Badges/pills | Bootstrap \`.badge\` — small, cramped, primary blue |
| Dropdowns | Bootstrap dropdown — generic shadow, no animation |

### → Layer 6: Atmosphere

| Property | Current state (Slop) |
|---|---|
| Background texture | None — flat solid color |
| Ambient glow/gradient | None — completely flat |
| Grain/noise | None |
| Frosted glass | None |
| Depth system | Default Bootstrap shadow or none |
| Visual warmth | Zero — cold and clinical |

### → Layer 7: Motion

| Property | Current state (Slop) |
|---|---|
| Page entry | None — static mount, everything appears instantly |
| Scroll reveals | None — everything visible immediately |
| Hover transitions | \`transition: all 0.15s ease-in-out\` (Bootstrap default) or none |
| Page transitions | None — instant swap |
| Micro-interactions | None |
| Loading states | Spinner or "Loading..." text |
| Easing curves | \`ease-in-out\` CSS keyword or none |

### ✓ Quality Gate: Extraction

Before moving to Phase 3, confirm:
- All 7 extraction layers are filled in with actual values from the codebase
- Values are specific (exact hex codes, exact rem/px values), not vague
- You can see the gap between current state and targe`,
  whenToUse: "Use when you need to automate visual redesign processes.",
  price: "Free",
  priceUsdc: 0,
  category: "skill",
  tags: ["Yu-369-skills","visual-redesign","image","design"],
  stars: 583,
  weeklyInstalls: 143,
  totalPurchases: 340,
  featured: false,
  createdAt: '2026-07-18',
  creatorWallet: '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
  fileUrl: 'https://github.com/Yu-369/VibeCurb/blob/main/skills/visual-redesign/SKILL.md',
  useCases: ["JavaScript logic is sacred. You do not touch it. Ever.","Low — Mostly presentational. Safe to restyle aggressively.","Medium — Mix of logic and presentation. Restyle carefully, test after."],
  exampleUsage: "Improve the design of my project",
  overviewHtml: `<div class="skill-enrichment" style="display: flex; flex-direction: column; gap: 32px;">
      <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 196, 129, 0.14); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);">
        <div style="width: 100%; aspect-ratio: 16/6; background: linear-gradient(135deg, #1b1622 0%, #0d131f 100%); display: flex; align-items: center; justify-content: center; color: var(--color-accent-warm-light);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        </div>
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 30%, #0a0806 95%);"></div>
        <div style="position: absolute; bottom: 20px; left: 24px; right: 24px;">
          <h2 style="font-family: var(--font-display); color: var(--color-accent-warm-light); margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 0.02em;">Visual redesign</h2>
          <p style="margin: 6px 0 0; color: var(--color-text-secondary); font-size: 14px; max-width: 600px;">This is the non-negotiable, unbreakable rule that governs every line of this skill:.</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1.2fr 1.0fr; gap: 32px; align-items: start;">
        <div>
          <h3 style="color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;">SKILL CAPABILITIES</h3>
          <p style="margin-bottom: 24px; font-size: 13.5px; line-height: 1.65; color: var(--color-text-secondary);">This is the non-negotiable, unbreakable rule that governs every line of this skill:</p>
          
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
