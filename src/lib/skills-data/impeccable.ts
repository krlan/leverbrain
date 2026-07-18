import { SkillListing } from '../skills-data'
 
export const impeccable: SkillListing = {
  id: 'impeccable',
  author: 'pbakaus',
  slug: 'impeccable',
  name: "Impeccable",
  tagline: "Designs and iterates production-grade frontend interfaces.",
  description: "Designs and iterates production-grade frontend interfaces. Real working code, committed design choices, exceptional craft.",
  readme: `name: impeccable
description: "Use when the user wants to design, redesign, shape, critique, audit, polish, clarify, distill, harden, optimize, adapt, animate, colorize, extract, or otherwise improve a frontend interface. Covers websites, landing pages, dashboards, product UI, app shells, components, forms, settings, onboarding, and empty states. Handles UX review, visual hierarchy, information architecture, cognitive load, accessibility, performance, responsive behavior, theming, anti-patterns, typography, fonts, spacing, layout, alignment, color, motion, micro-interactions, UX copy, error states, edge cases, i18n, and reusable design systems or tokens. Also use for bland designs that need to become bolder or more delightful, loud designs that should become quieter, live browser iteration on UI elements, or ambitious visual effects that should feel technically extraordinary. Not for backend-only or non-UI tasks."
argument-hint: "[{{command_hint}}] [target]"
user-invocable: true
allowed-tools:
  - Bash(npx impeccable *)
  - Bash(node {{scripts_path}}/*)
license: Apache 2.0
---

Designs and iterates production-grade frontend interfaces. Real working code, committed design choices, exceptional craft.

## Setup

You MUST do these steps before proceeding:

1. Run \`node {{scripts_path}}/context.mjs\` once per session; if the runtime shows this skill's loaded base directory, run \`node <skill-base-dir>/scripts/context.mjs\` instead. Keep cwd/workdir at the user's project, not the skill directory. If the request names or implies a file, route, or app inside a monorepo, infer the concrete path and append \`--target <path>\` to the same command. If you've already seen its output in this conversation, do not re-run it. The script either prints the project's PRODUCT.md (and DESIGN.md when present) as a markdown block, or tells you it's missing. Follow whatever it prints. **If it reports \`NO_PRODUCT_MD\`:** divert into \`reference/init.md\` first when the user invoked \`init\`, \`teach\`, \`craft\`, or \`shape\`, or when their wording clearly maps to one of those from-scratch build flows (for example: "build/create/make a landing page", "design a new app", or "shape a feature"). Captured product context is the point of those flows. For any other command, a scoped evaluate / refine / enhance / fix / iterate request against existing code, do **not** divert into init. The existing code is the context: proceed with the requested command, infer the register from the surface in focus (step 4), and offer \`/impeccable init\` once as a suggestion the user can take later. A missing PRODUCT.md must never block a scoped request. If the output ends with an \`UPDATE_AVAILABLE\` directive, follow it (ask the user once about updating, then continue). It never blocks the current task.
2. If the user invoked a sub-command (\`craft\`, \`shape\`, \`audit\`, \`polish\`, ...), you MUST read the command's reference next: **\`reference/<command>.md\`, or the native variant from the Commands table** (e.g. \`reference/audit.native.md\`) **when the project platform is native** (\`ios\` / \`android\` / \`adaptive\`, per the \`context.mjs\` directive). One file, not both. Non-optional. The reference defines the command's flow; without it you will skip steps the user expects.
3. Familiarize yourself with any existing design system, conventions, and components in the code. Read at least one project file (CSS / tokens / theme / a representative component or page). **Required even when you've loaded a sub-command reference in step 2.** Don't reinvent the wheel; use what's there when it works, branch out when the UX wins.
4. Read the matching register reference. **This is non-optional; skipping it produces generic output.** If the project is marketing, a landing page, a campaign, long-form content, or a portfolio (design IS the product), read \`reference/brand.md\`. If it is app UI, admin, a dashboard, or a tool (design SERVES the product), read \`reference/product.md\`. Pick by first match: (1) task cue ("landing page" vs "dashboard"); (2) surface in focus (the page, file, or route being worked on); (3) \`register\` field in PRODUCT.md.
5. **If PRODUCT.md's \`## Platform\` is \`ios\` or \`android\`**, also read \`reference/<platform>.md\` (HIG / Material 3 conventions). \`adaptive\` (cross-platform, ships both) reads both files. \`web\`, absent, or unrecognized: nothing extra to read. \`context.mjs\` prints the directive when one applies.
6. **If the project is brand-new (no existing CSS tokens / theme / committed brand colors found in step 3)**, run \`node {{scripts_path}}/palette.mjs\` to receive a brand seed color and composition guidance. This is the anchor for your primary brand color. Compose the rest of the palette (bg, surface, ink, accent, muted) around it per the script's instructions. Use OKLCH throughout. **Skip this step only if step 3 found committed brand colors in existing tokens; in that case identity-preservation wins.**

## Design guidance

Produce ready-to-ship, production-grade code, not prototypes or starting points. Take no shortcuts unless the user asks for them (when in doubt, ask). Don't stop until arriving at a complete implementation (beautiful, responsive, fast, precise, bug-free, on brand). You take attention to detail seriously: every page, section or component crafted is battle tested using the tools available to you (browser screenshotting, computer use, etc). {{model}} is capable of extraordinary work. Don't hold back.

### General rules

#### Color

- **Verify contrast.** Body text must hit ≥4.5:1 against its background; large text (≥18px or bold ≥14px) needs ≥3:1. Placeholder text needs the same 4.5:1, not the muted-gray default. The most common failure: muted gray body text on a tinted near-white. If the contrast is even close, bump the body color toward the ink end of the ramp; light gray "for elegance" is the single biggest reason AI designs feel hard to read. <!-- rule:skill-color-verify-contrast -->
- Gray text on a colored background looks washed out. Use a darker shade of the background's own hue, or a transparency of the text color. <!-- rule:skill-color-gray-on-color -->

#### Typography

- Cap body line length at 65–75ch. <!-- rule:skill-typo-line-length -->
- Don't pair fonts that are similar but not identical (two geometric sans-serifs, two humanist sans-serifs). Pair on a contrast axis (serif + sans, geometric + humanist) or use one family in multiple weights. <!-- rule:skill-typo-font-pairing-contrast -->
- Hero / display heading ceiling: clamp() max ≤ 6rem (~96px). Above that the page is shouting, not designing. <!-- rule:skill-typo-hero-ceiling -->
- Display heading letter-spacing floor: ≥ -0.04em. Anything tighter and letters touch; cramped, not "designed". <!-- rule:skill-typo-tracking-floor -->
- Use \`text-wrap: balance\` on h1–h3 for even line lengths; \`text-wrap: pretty\` on long prose to reduce orphans. <!-- rule:skill-typo-text-wrap-balance -->

<codex>
One hard typographic ceiling you currently miss:
- Display letter-spacing ≥ -0.04em. Your default of -0.05 to -0.085em on display H1s makes the letters touch and reads as cramped. -0.02 to -0.03em is plenty for tight grotesque display; -0.04em is the floor. <!-- rule:skill-typo-codex-tracking-repeat -->
</codex>

#### Layout

- Vary spacing for rhythm. <!-- rule:skill-layout-vary-spacing -->
- Cards are the lazy answer. Use them only when they're truly the best affordance. Nested cards are always wrong. <!-- rule:skill-layout-cards-lazy -->
- Flexbox for 1D, Grid for 2D. Don't default to Grid when \`flex-wrap\` would be simpler. <!-- rule:skill-layout-flex-vs-grid -->
- For responsive grids without breakpoints: \`repeat(auto-fit, minmax(280px, 1fr))\`. <!-- rule:skill-layout-auto-fit-grid -->
- Build a semantic z-index scale (dropdown → sticky → modal-backdrop → modal → toast → tooltip). Never arbitrary values like 999 or 9999. <!-- rule:skill-layout-z-index-scale -->

#### Motion
- Motion should be intentional, and not be an afterthought. consider it as part of the build. <!-- rule:skill-motion-intentional -->
- Don't animate CSS layout properties unless truly needed. <!-- rule:skill-motion-no-layout-animate -->
- Ease out with exponential curves (ease-out-quart / quint / expo). No bounce, no elastic. <!-- rule:skill-motion-ease-out-exp -->
- Use libraries for more advanced motion needs (e.g. motion, gsap, anime.js, lenis etc) <!-- rule:skill-motion-use-libraries -->
- Reduced motion is not optional. Every animation needs a \`@media (prefers-reduced-motion: reduce)\` alternative: typically a crossfade or instant transition. <!-- rule:skill-motion-reduced-motion -->
- Staggering the items within one list is legitimate. The tell is the uniform reflex (one identical entrance applied to every section), not motion itself; each reveal should fit what it reveals. Suppressing the reflex is never a reason to ship a page with no motion at all. <!-- rule:skill-motion-no-section-fade -->
- Reveal animations must enhance an already-visible default. Don't gate content visibility on a class-triggered transition; transitions pause on hidden tabs and headless renderers, so the reveal never fires and the section ships blank. <!-- rule:skill-motion-reveal-safety -->
- Premium motion materials are not just transform/opacity. Blur, backdrop-filter, clip-path, mask, and shadow/glow are part of the palette when they materially improve the effect and stay smooth. <!-- rule:skill-motion-materials-palette -->

#### Interaction

- Dropdowns rendered with \`position: absolute\` inside an \`overflow: hidden\` or \`overflow: auto\` container will be clipped. Use the native \`<dialog>\` / popover API, \`position: fixed\`, or a portal to escape the stacking context. <!-- rule:skill-interaction-dropdown-clipping -->

<gemini>
**Gemini-specific defect: hard ban.** Never animate \`<img>\` elements on hover. This includes any \`transform\` on \`:hover\` of an image, AND \`.group:hover .group-hover\\:scale\` / \`.group:hover .group-hover\\:rotate\` / \`.group:hover .group-hover\\:translate\` patterns from Tailwind that animate a child image via a parent hover. This is your single most common motion tell; it adds no information (the image isn't an action target) and reads as "AI animated this because it could". If a card needs hover feedback, animate the card's background, border, or shadow. Never the image, never via the image's parent. <!-- rule:skill-interaction-gemini-no-image-hover -->
</gemini>

### New projects only (when no prior work exists)

#### Color & Theme

- Use OKLCH. <!-- rule:skill-color-use-oklch -->
- **The cream / sand / beige body bg is the saturated AI default of 2026.** The whole warm-neutral band (OKLCH L 0.84-0.97, C < 0.06, hue 40-100) reads as cream/sand/paper/parchment regardless of what you call it. Token names like \`--paper\`, \`--cream\`, \`--sand\`, \`--bone\`, \`--flour\`, \`--linen\`, \`--parchment\`, \`--wheat\`, \`--biscuit\`, \`--ivory\` ar`,
  whenToUse: "Use when you need to automate impeccable processes.",
  price: "Free",
  priceUsdc: 0,
  category: "skill",
  tags: ["pbakaus-skills","impeccable"],
  stars: 447,
  weeklyInstalls: 148,
  totalPurchases: 747,
  featured: false,
  createdAt: '2026-07-18',
  creatorWallet: '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
  fileUrl: 'https://github.com/pbakaus/impeccable/blob/main/skill/SKILL.src.md',
  useCases: ["Bash(npx impeccable *).","Cap body line length at 65–75ch. <!-- rule:skill-typo-line-length -->.","Display heading letter-spacing floor: ≥ -0.04em. Anything tighter and letters touch; cramped, not \"designed\". <!-- rule:skill-typo-tracking-floor -->."],
  exampleUsage: "Apply impeccable for my project",
  overviewHtml: `<div class="skill-enrichment" style="display: flex; flex-direction: column; gap: 32px;">
      <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 196, 129, 0.14); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);">
        <div style="width: 100%; aspect-ratio: 16/6; background: linear-gradient(135deg, #13110f 0%, #17181c 100%); display: flex; align-items: center; justify-content: center; color: var(--color-accent-warm-light);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 30%, #0a0806 95%);"></div>
        <div style="position: absolute; bottom: 20px; left: 24px; right: 24px;">
          <h2 style="font-family: var(--font-display); color: var(--color-accent-warm-light); margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 0.02em;">Impeccable</h2>
          <p style="margin: 6px 0 0; color: var(--color-text-secondary); font-size: 14px; max-width: 600px;">Designs and iterates production-grade frontend interfaces.</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1.2fr 1.0fr; gap: 32px; align-items: start;">
        <div>
          <h3 style="color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;">SKILL CAPABILITIES</h3>
          <p style="margin-bottom: 24px; font-size: 13.5px; line-height: 1.65; color: var(--color-text-secondary);">Designs and iterates production-grade frontend interfaces. Real working code, committed design choices, exceptional craft.</p>
          
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
