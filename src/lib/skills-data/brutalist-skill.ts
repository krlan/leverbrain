import { SkillListing } from '../skills-data'
 
export const brutalistSkill: SkillListing = {
  id: 'brutalist-skill',
  author: 'Leonxlnx',
  slug: 'brutalist-skill',
  name: "Industrial brutalist UI",
  tagline: "Raw mechanical interfaces fusing Swiss typographic print with military terminal aesthetics.",
  description: "Raw mechanical interfaces fusing Swiss typographic print with military terminal aesthetics. Rigid grids, extreme type scale contrast, utilitarian color, analog degradation effects. For data-heavy dashboards, portfolios, or editorial sites that need to feel like declassified blueprints.",
  readme: `# SKILL: Industrial Brutalism & Tactical Telemetry UI

## 1. Skill Meta
**Name:** Industrial Brutalism & Tactical Telemetry Interface Engineering
**Description:** Advanced proficiency in architecting web interfaces that synthesize mid-century Swiss Typographic design, industrial manufacturing manuals, and retro-futuristic aerospace/military terminal interfaces. This discipline requires absolute mastery over rigid modular grids, extreme typographic scale contrast, purely utilitarian color palettes, and the programmatic simulation of analog degradation (halftones, CRT scanlines, bitmap dithering). The objective is to construct digital environments that project raw functionality, mechanical precision, and high data density, deliberately discarding conventional consumer UI patterns.

## 2. Visual Archetypes
The design system operates by merging two distinct but highly compatible visual paradigms. **Pick ONE per project and commit to it. Do not alternate or mix both modes within the same interface.**

### 2.1 Swiss Industrial Print
Derived from 1960s corporate identity systems and heavy machinery blueprints.
*   **Characteristics:** High-contrast light modes (newsprint/off-white substrates). Reliance on monolithic, heavy sans-serif typography. Unforgiving structural grids outlined by visible dividing lines. Aggressive, asymmetric use of negative space punctuated by oversized, viewport-bleeding numerals or letterforms. Heavy use of primary red as an alert/accent color.

### 2.2 Tactical Telemetry & CRT Terminal
Derived from classified military databases, legacy mainframes, and aerospace Heads-Up Displays (HUDs).
*   **Characteristics:** Dark mode exclusivity. High-density tabular data presentation. Absolute dominance of monospaced typography. Integration of technical framing devices (ASCII brackets, crosshairs). Application of simulated hardware limitations (phosphor glow, scanlines, low bit-depth rendering).

## 3. Typographic Architecture
Typography is the primary structural and decorative infrastructure. Imagery is secondary. The system demands extreme variance in scale, weight, and spacing.

### 3.1 Macro-Typography (Structural Headers)
*   **Classification:** Neo-Grotesque / Heavy Sans-Serif.
*   **Optimal Web Fonts:** Neue Haas Grotesk (Black), Inter (Extra Bold/Black), Archivo Black, Roboto Flex (Heavy), Monument Extended.
*   **Implementation Parameters:**
    *   **Scale:** Deployed at massive scales using fluid typography (e.g., \`clamp(4rem, 10vw, 15rem)\`).
    *   **Tracking (Letter-spacing):** Extremely tight, often negative (\`-0.03em\` to \`-0.06em\`), forcing glyphs to form solid architectural blocks.
    *   **Leading (Line-height):** Highly compressed (\`0.85\` to \`0.95\`).
    *   **Casing:** Exclusively uppercase for structural impact.

### 3.2 Micro-Typography (Data & Telemetry)
*   **Classification:** Monospace / Technical Sans.
*   **Optimal Web Fonts:** JetBrains Mono, IBM Plex Mono, Space Mono, VT323, Courier Prime.
*   **Implementation Parameters:**
    *   **Scale:** Fixed and small (\`10px\` to \`14px\` / \`0.7rem\` to \`0.875rem\`).
    *   **Tracking:** Generous (\`0.05em\` to \`0.1em\`) to simulate mechanical typewriter spacing or terminal matrices.
    *   **Leading:** Standard to tight (\`1.2\` to \`1.4\`).
    *   **Casing:** Exclusively uppercase. Used for all metadata, navigation, unit IDs, and coordinates.

### 3.3 Textural Contrast (Artistic Disruption)
*   **Classification:** High-Contrast Serif.
*   **Optimal Web Fonts:** Playfair Display, EB Garamond, Times New Roman.
*   **Implementation Parameters:** Used exceedingly sparingly. Must be subjected to heavy post-processing (halftone filters, 1-bit dithering) to degrade vector perfection and create textural juxtaposition against the clean sans-serifs.

## 4. Color System
The color architecture is uncompromising. Gradients, soft drop shadows, and modern translucency are strictly prohibited. Colors simulate physical media or primitive emissive displays.

**CRITICAL: Choose ONE substrate palette per project and use it consistently. Never mix light and dark substrates within the same interface.**

### If Swiss Industrial Print (Light):
*   **Background:** \`#F4F4F0\` or \`#EAE8E3\` (Matte, unbleached documentation paper).
*   **Foreground:** \`#050505\` to \`#111111\` (Carbon Ink).
*   **Accent:** \`#E61919\` or \`#FF2A2A\` (Aviation/Hazard Red). This is the ONLY accent color. Used for strike-throughs, thick structural dividing lines, or vital data highlights.

### If Tactical Telemetry (Dark):
*   **Background:** \`#0A0A0A\` or \`#121212\` (Deactivated CRT. Avoid pure \`#000000\`).
*   **Foreground:** \`#EAEAEA\` (White phosphor). This is the primary text color.
*   **Accent:** \`#E61919\` or \`#FF2A2A\` (Aviation/Hazard Red). Same red, same rules.
*   **Terminal Green (\`#4AF626\`):** Optional. Use ONLY for a single specific UI element (e.g., one status indicator or one data readout) — never as a general text color. If it doesn't serve a clear purpose, omit it entirely.

## 5. Layout and Spatial Engineering
The layout must appear mathematically engineered. It rejects conventional web padding in favor of visible compartmentalization.

*   **The Blueprint Grid:** Strict adherence to CSS Grid architectures. Elements do not float; they are anchored precisely to grid tracks and intersections.
*   **Visible Compartmentalization:** Extensive utilization of solid borders (\`1px\` or \`2px solid\`) to delineate distinct zones of information. Horizontal rules (\`<hr>\`) frequently span the entire container width to segregate operational units.
*   **Bimodal Density:** Layouts oscillate between extreme data density (tightly packed monospace metadata clustered together) and vast expanses of calculated negative space framing macro-typography.
*   **Geometry:** Absolute rejection of \`border-radius\`. All corners must be exactly 90 degrees to enforce mechanical rigidity.

## 6. UI Components and Symbology
Standard web UI conventions are replaced with utilitarian, industrial graphic elements.

*   **Syntax Decoration:** Utilization of ASCII characters to frame data points.
    *   *Framing:* \`[ DELIVERY SYSTEMS ]\`, \`< RE-IND >\`
    *   *Directional:* \`>>>\`, \`///\`, \`\\\\\\\\\`
*   **Industrial Markers:** Prominent integration of registration (\`®\`), copyright (\`©\`), and trademark (\`™\`) symbols functioning as structural geometric elements rather than legal text.
*   **Technical Assets:** Integration of crosshairs (\`+\`) at grid intersections, repeating vertical lines (barcodes), thick horizontal warning stripes, and randomized string data (e.g., \`REV 2.6\`, \`UNIT / D-01\`) to simulate active mechanical processes.

## 7. Textural and Post-Processing Effects
To prevent the design from appearing purely digital, simulated analog degradation is engineered into the frontend via CSS and SVG filters.

*   **Halftone and 1-Bit Dithering:** Transforming continuous-tone images or large serif typography into dot-matrix patterns. Achieved via pre-processing or CSS \`mix-blend-mode: multiply\` overlays combined with SVG radial dot patterns.
*   **CRT Scanlines:** For terminal interfaces, applying a \`repeating-linear-gradient\` to the background to simulate horizontal electron beam sweeps (e.g., \`repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)\`).
*   **Mechanical Noise:** A global, low-opacity SVG static/noise filter applied to the DOM root to introduce a unified physical grain across both dark and light modes.

## 8. Web Engineering Directives
1.  **Grid Determinism:** Utilize \`display: grid; gap: 1px;\` with contrasting parent/child background colors to generate mathematically perfect, razor-thin dividing lines without complex border declarations.
2.  **Semantic Rigidity:** Construct the DOM using precise semantic tags (\`<data>\`, \`<samp>\`, \`<kbd>\`, \`<output>\`, \`<dl>\`) to accurately reflect the technical nature of the telemetry.
3.  **Typography Clamping:** Implement CSS \`clamp()\` functions exclusively for macro-typography to ensure massive text scales aggressively while maintaining structural integrity across viewports.`,
  whenToUse: "Use when you need to automate industrial brutalist ui processes.",
  price: "Free",
  priceUsdc: 0,
  category: "skill",
  tags: ["Leonxlnx-skills","brutalist-skill"],
  stars: 524,
  weeklyInstalls: 156,
  totalPurchases: 497,
  featured: false,
  createdAt: '2026-06-09',
  creatorWallet: '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
  fileUrl: 'https://github.com/Leonxlnx/taste-skill/tree/main/skills/brutalist-skill',
  useCases: ["Name: Industrial Brutalism & Tactical Telemetry Interface Engineering.","Implementation Parameters:.","Scale: Deployed at massive scales using fluid typography (e.g., clamp(4rem, 10vw, 15rem))."],
  exampleUsage: "Apply industrial brutalist UI for my project",
  overviewHtml: `<div class="skill-enrichment" style="display: flex; flex-direction: column; gap: 32px;">
      <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 196, 129, 0.14); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);">
        <div style="width: 100%; aspect-ratio: 16/6; background: linear-gradient(135deg, #13110f 0%, #17181c 100%); display: flex; align-items: center; justify-content: center; color: var(--color-accent-warm-light);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 30%, #0a0806 95%);"></div>
        <div style="position: absolute; bottom: 20px; left: 24px; right: 24px;">
          <h2 style="font-family: var(--font-display); color: var(--color-accent-warm-light); margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 0.02em;">Industrial brutalist UI</h2>
          <p style="margin: 6px 0 0; color: var(--color-text-secondary); font-size: 14px; max-width: 600px;">Raw mechanical interfaces fusing Swiss typographic print with military terminal aesthetics.</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1.2fr 1.0fr; gap: 32px; align-items: start;">
        <div>
          <h3 style="color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;">SKILL CAPABILITIES</h3>
          <p style="margin-bottom: 24px; font-size: 13.5px; line-height: 1.65; color: var(--color-text-secondary);">Raw mechanical interfaces fusing Swiss typographic print with military terminal aesthetics. Rigid grids, extreme type scale contrast, utilitarian color, analog degradation effects. For data-heavy dashboards, portfolios, or editorial sites that need to feel like declassified blueprints.</p>
          
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
