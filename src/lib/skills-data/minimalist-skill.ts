import { SkillListing } from '../skills-data'
 
export const minimalistSkill: SkillListing = {
  id: 'minimalist-skill',
  author: 'Leonxlnx',
  slug: 'minimalist-skill',
  name: "Minimalist UI",
  tagline: "Clean editorial-style interfaces.",
  description: "Clean editorial-style interfaces. Warm monochrome palette, typographic contrast, flat bento grids, muted pastels. No gradients, no heavy shadows.",
  readme: `# Protocol: Premium Utilitarian Minimalism UI Architect

## 1. Protocol Overview
Name: Premium Utilitarian Minimalism & Editorial UI
Description: An advanced frontend engineering directive for generating highly refined, ultra-minimalist, "document-style" web interfaces analogous to top-tier workspace platforms. This protocol strictly enforces a high-contrast warm monochrome palette, bespoke typographic hierarchies, meticulous structural macro-whitespace, bento-grid layouts, and an ultra-flat component architecture with deliberate muted pastel accents. It actively rejects standard generic SaaS design trends.

## 2. Absolute Negative Constraints (Banned Elements)
The AI must strictly avoid the following generic web development defaults:
- DO NOT use the "Inter", "Roboto", or "Open Sans" typefaces.
- DO NOT use generic, thin-line icon libraries like "Lucide", "Feather", or standard "Heroicons".
- DO NOT use Tailwind's default heavy drop shadows (e.g., \`shadow-md\`, \`shadow-lg\`, \`shadow-xl\`). Shadows must be practically non-existent or heavily customized to be ultra-diffuse and low opacity (< 0.05).
- DO NOT use primary colored backgrounds for large elements or sections (e.g., no bright blue, green, or red hero sections).
- DO NOT use gradients, neon colors, or 3D glassmorphism (beyond subtle navbar blurs).
- DO NOT use \`rounded-full\` (pill shapes) for large containers, cards, or primary buttons.
- DO NOT use emojis anywhere in code, markup, text content, headings, or alt text. Replace with proper icons or clean SVG primitives.
- DO NOT use generic placeholder names like "John Doe", "Acme Corp", or "Lorem Ipsum". Use realistic, contextual content.
- DO NOT use AI copywriting clichés: "Elevate", "Seamless", "Unleash", "Next-Gen", "Game-changer", "Delve". Write plain, specific language.

## 3. Typographic Architecture
The interface must rely on extreme typographic contrast and premium font selection to establish an editorial feel.
- Primary Sans-Serif (Body, UI, Buttons): Use clean, geometric, or system-native fonts with character. Target: \`font-family: 'SF Pro Display', 'Geist Sans', 'Helvetica Neue', 'Switzer', sans-serif\`.
- Editorial Serif (Hero Headings & Quotes): Target: \`font-family: 'Lyon Text', 'Newsreader', 'Playfair Display', 'Instrument Serif', serif\`. Apply tight tracking (\`letter-spacing: -0.02em\` to \`-0.04em\`) and tight line-height (\`1.1\`).
- Monospace (Code, Keystrokes, Meta-data): Target: \`font-family: 'Geist Mono', 'SF Mono', 'JetBrains Mono', monospace\`.
- Text Colors: Body text must never be absolute black (\`#000000\`). Use off-black/charcoal (\`#111111\` or \`#2F3437\`) with a generous \`line-height\` of \`1.6\` for legibility. Secondary text should be muted gray (\`#787774\`).

## 4. Color Palette (Warm Monochrome + Spot Pastels)
Color is a scarce resource, utilized only for semantic meaning or subtle accents.
- Canvas / Background: Pure White \`#FFFFFF\` or Warm Bone/Off-White \`#F7F6F3\` / \`#FBFBFA\`.
- Primary Surface (Cards): \`#FFFFFF\` or \`#F9F9F8\`.
- Structural Borders / Dividers: Ultra-light gray \`#EAEAEA\` or \`rgba(0,0,0,0.06)\`.
- Accent Colors: Exclusively use highly desaturated, washed-out pastels for tags, inline code backgrounds, or subtle icon backgrounds.
  - Pale Red: \`#FDEBEC\` (Text: \`#9F2F2D\`)
  - Pale Blue: \`#E1F3FE\` (Text: \`#1F6C9F\`)
  - Pale Green: \`#EDF3EC\` (Text: \`#346538\`)
  - Pale Yellow: \`#FBF3DB\` (Text: \`#956400\`)

## 5. Component Specifications
- Bento Box Feature Grids:
  - Utilize asymmetrical CSS Grid layouts.
  - Cards must have exactly \`border: 1px solid #EAEAEA\`.
  - Border-radius must be crisp: \`8px\` or \`12px\` maximum.
  - Internal padding must be generous (e.g., \`24px\` to \`40px\`).
- Primary Call-To-Action (Buttons):
  - Solid background \`#111111\`, text \`#FFFFFF\`. 
  - Slight border-radius (\`4px\` to \`6px\`). No box-shadow. 
  - Hover state should be a subtle color shift to \`#333333\` or a micro-scale \`transform: scale(0.98)\`.
- Tags & Status Badges:
  - Pill-shaped (\`border-radius: 9999px\`), very small typography (\`text-xs\`), uppercase with wide tracking (\`letter-spacing: 0.05em\`).
  - Background must use the defined Muted Pastels.
- Accordions (FAQ):
  - Strip all container boxes. Separate items only with a \`border-bottom: 1px solid #EAEAEA\`.
  - Use a clean, sharp \`+\` and \`-\` icon for the toggle state.
- Keystroke Micro-UIs:
  - Render shortcuts as physical keys using \`<kbd>\` tags: \`border: 1px solid #EAEAEA\`, \`border-radius: 4px\`, \`background: #F7F6F3\`, using the Monospace font.
- Faux-OS Window Chrome:
  - When mocking up software, wrap it in a minimalist container with a white top bar containing three small, light gray circles (replicating macOS window controls).

## 6. Iconography & Imagery Directives
- System Icons: Use "Phosphor Icons (Bold or Fill weights)" or "Radix UI Icons" for a technical, slightly thicker-stroke aesthetic. Standardize stroke width across all icons.
- Illustrations: Monochromatic, rough continuous-line ink sketches on a white background, featuring a single offset geometric shape filled with a muted pastel color.
- Photography: Use high-quality, desaturated images with a warm tone. Apply subtle overlays (\`opacity: 0.04\` warm grain) to blend photos into the monochrome palette. Never use oversaturated stock photos. Use reliable placeholders like \`https://picsum.photos/seed/{context}/1200/800\` when real assets are unavailable.
- Hero & Section Backgrounds: Sections should not feel empty and flat. Use subtle full-width background imagery at very low opacity, soft radial light spots (\`radial-gradient\` with warm tones at \`opacity: 0.03\`), or minimal geometric line patterns to add depth without breaking the clean aesthetic.

## 7. Subtle Motion & Micro-Animations
Motion should feel invisible — present but never distracting. The goal is quiet sophistication, not spectacle.
- Scroll Entry: Elements fade in gently as they enter the viewport. Use \`translateY(12px)\` + \`opacity: 0\` resolving over \`600ms\` with \`cubic-bezier(0.16, 1, 0.3, 1)\`. Use \`IntersectionObserver\`, never \`window.addEventListener('scroll')\`.
- Hover States: Cards lift with an ultra-subtle shadow shift (\`box-shadow\` transitioning from \`0 0 0\` to \`0 2px 8px rgba(0,0,0,0.04)\` over \`200ms\`). Buttons respond with \`scale(0.98)\` on \`:active\`.
- Staggered Reveals: Lists and grid items enter with a cascade delay (\`animation-delay: calc(var(--index) * 80ms)\`). Never mount everything at once.
- Background Ambient Motion: Optional. A single, very slow-moving radial gradient blob (\`animation-duration: 20s+\`, \`opacity: 0.02-0.04\`) drifting behind hero sections. Must be applied to a \`position: fixed; pointer-events: none\` layer. Never on scrolling containers.
- Performance: Animate exclusively via \`transform\` and \`opacity\`. No layout-triggering properties (\`top\`, \`left\`, \`width\`, \`height\`). Use \`will-change: transform\` sparingly and only on actively animating elements.

## 8. Execution Protocol
When tasked with writing frontend code (HTML, React, Tailwind, Vue) or designing a layout:
1. Establish the macro-whitespace first. Use massive vertical padding between sections (e.g., \`py-24\` or \`py-32\` in Tailwind).
2. Constrain the main typography content width to \`max-w-4xl\` or \`max-w-5xl\`.
3. Apply the custom typographic hierarchy and monochromatic color variables immediately.
4. Ensure every card, divider, and border adheres strictly to the \`1px solid #EAEAEA\` rule.
5. Add scroll-entry animations to all major content blocks.
6. Ensure sections have visual depth through imagery, ambient gradients, or subtle textures — no empty flat backgrounds.
7. Provide code that reflects this high-end, uncluttered, editorial aesthetic natively without requiring manual adjustments.`,
  whenToUse: "Use when you need to automate minimalist ui processes.",
  price: "Free",
  priceUsdc: 0,
  category: "skill",
  tags: ["Leonxlnx-skills","minimalist-skill"],
  stars: 458,
  weeklyInstalls: 157,
  totalPurchases: 972,
  featured: false,
  createdAt: '2026-06-09',
  creatorWallet: '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
  fileUrl: 'https://github.com/Leonxlnx/taste-skill/tree/main/skills/minimalist-skill',
  useCases: ["DO NOT use the \"Inter\", \"Roboto\", or \"Open Sans\" typefaces.","DO NOT use generic, thin-line icon libraries like \"Lucide\", \"Feather\", or standard \"Heroicons\".","DO NOT use primary colored backgrounds for large elements or sections (e.g., no bright blue, green, or red hero sections)."],
  exampleUsage: "Apply minimalist UI for my project",
  overviewHtml: `<div class="skill-enrichment" style="display: flex; flex-direction: column; gap: 32px;">
      <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 196, 129, 0.14); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);">
        <div style="width: 100%; aspect-ratio: 16/6; background: linear-gradient(135deg, #13110f 0%, #17181c 100%); display: flex; align-items: center; justify-content: center; color: var(--color-accent-warm-light);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 30%, #0a0806 95%);"></div>
        <div style="position: absolute; bottom: 20px; left: 24px; right: 24px;">
          <h2 style="font-family: var(--font-display); color: var(--color-accent-warm-light); margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 0.02em;">Minimalist UI</h2>
          <p style="margin: 6px 0 0; color: var(--color-text-secondary); font-size: 14px; max-width: 600px;">Clean editorial-style interfaces.</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1.2fr 1.0fr; gap: 32px; align-items: start;">
        <div>
          <h3 style="color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;">SKILL CAPABILITIES</h3>
          <p style="margin-bottom: 24px; font-size: 13.5px; line-height: 1.65; color: var(--color-text-secondary);">Clean editorial-style interfaces. Warm monochrome palette, typographic contrast, flat bento grids, muted pastels. No gradients, no heavy shadows.</p>
          
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
