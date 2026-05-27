import { SkillListing } from '../skills-data'

export const baoyuCoverImage: SkillListing = {
  id: 'baoyu-cover-image',
  author: 'baoyu',
  slug: 'baoyu-cover-image',
  name: 'Cover Image',
  tagline: 'Generates article cover images with 5 dimensions (type, palette, rendering, text, mood) combining 11 color palettes a...',
  description: 'Generates article cover images with 5 dimensions (type, palette, rendering, text, mood) combining 11 color palettes and 7 rendering styles. Supports cinematic (2.35:1), widescreen (16:9), and square (1:1) aspects. Use when user asks to "generate cover image", "create article cover", or "make cover".',
  readme: `# Cover Image Generator

Generate elegant cover images for articles with 5-dimensional customization.

## User Input Tools

When this skill prompts the user, follow this tool-selection rule (priority order):

1. **Prefer built-in user-input tools** exposed by the current agent runtime — e.g., \`AskUserQuestion\`, \`request_user_input\`, \`clarify\`, \`ask_user\`, or any equivalent.
2. **Fallback**: if no such tool exists, emit a numbered plain-text message and ask the user to reply with the chosen number/answer for each question.
3. **Batching**: if the tool supports multiple questions per call, combine all applicable questions into a single call; if only single-question, ask them one at a time in priority order.

Concrete \`AskUserQuestion\` references below are examples — substitute the local equivalent in other runtimes.

## Image Generation Tools

When this skill needs to render an image, resolve the backend in this order:

1. **Current-request override** — if the user names a specific backend in the current message, use it.
2. **Saved preference** — if \`EXTEND.md\` sets \`preferred_image_backend\` to a backend available right now, use it.
3. **Auto-select** (when the preference is \`auto\`, unset, or the pinned backend isn't available):
   - **Codex (\`imagegen\`)** — first, inspect your available-skills / tool inventory. If a skill named \`imagegen\` is listed, you are running inside Codex and MUST use it: invoke via the \`Skill\` tool with \`skill: "imagegen"\`, passing the saved prompt file's content (plus output path and aspect ratio per Codex \`imagegen\`'s own args). Codex \`imagegen\` is the official raster backend in that runtime and outranks any non-native skill (e.g., \`baoyu-image-gen\`) unless the user has explicitly pinned a different \`preferred_image_backend\`.
   - **Codex via \`codex exec\` (\`codex-imagegen\`)** — if the current runtime exposes no native \`imagegen\` skill but the \`codex\` CLI is on \`PATH\` with an active \`codex login\`, route through \`baoyu-image-gen --provider codex-cli\` (preferred), or — if baoyu-image-gen is unavailable — invoke the bundled wrapper directly. Details, parameters, and the runtime-discovery procedure live in [references/codex-imagegen.md](references/codex-imagegen.md) — load that file only when this branch is selected.
   - **Other runtime-native tools** — if the runtime exposes a different native image tool (e.g., Hermes \`image_generate\`), use it the same way.
   - Otherwise, if exactly one non-native backend is installed (e.g., \`baoyu-image-gen\`), use it.
   - Otherwise (multiple non-native backends with no runtime-native tool), ask the user once — batch with any other initial questions.
4. **If none are available**, tell the user and ask how to proceed.

**⛔ Never substitute SVG, HTML, canvas, or other code-based rendering for raster image generation.** Codex \`imagegen\`'s own description says it should be used "when the output should be a bitmap asset rather than repo-native code or vector." If you cannot resolve a raster backend via step 3, fall through to step 4 and ask the user — do **not** silently emit SVG, write inline \`<svg>\` markup, or produce HTML/CSS art as a substitute. This applies even if the article/section seems "diagram-like": the consumer skill calling this rule has already decided that a raster image is what it needs.

**⛔ Never repair rendered text by painting over a generated bitmap.** Do not use ImageMagick, Pillow, Canvas, SVG, HTML/CSS, OCR scripts, or any other programmatic overlay to cover, rewrite, erase, stroke, or replace title/subtitle text inside an already generated cover image. If text is wrong or unclear, regenerate from a corrected prompt, switch to a lower-text or no-title variant, or ask the user which imperfect candidate to keep.

Setting \`preferred_image_backend: ask\` forces the step-3 prompt every run regardless of available backends. Users change the pinned backend via the \`## Changing Preferences\` section below.

**Prompt file requirement (hard)**: write each image's full, final prompt to a standalone file under \`prompts/\` (naming: \`NN-{type}-[slug].md\`) BEFORE invoking any backend. The backend receives the prompt file (or its content); the file is the reproducibility record and lets you switch backends without regenerating prompts.

Concrete tool names (\`imagegen\`, \`image_generate\`, \`baoyu-image-gen\`) above are examples — substitute the local equivalents under the same rule.

## Confirmation Policy

Default behavior: **confirm before generation**.

- Treat explicit skill invocation, a file path, matched keywords/presets, \`EXTEND.md\` defaults, and any documented auto-selection as **recommendation inputs only**. None of them authorizes skipping confirmation.
- Do **not** start Step 3 or Step 4 until the user confirms the dimensions / aspect / language / backend choices.
- Skip confirmation only when the current request explicitly says to do so, for example: \`--quick\`, "直接生成", "不用确认", "跳过确认", "按默认出图", or equivalent wording. \`quick_mode: true\` in \`EXTEND.md\` counts as a standing explicit opt-out — set it only when you want every run to skip Step 2.
- If confirmation is skipped explicitly, state the assumed dimensions / aspect / language / backend in the next user-facing update before generating.

## Options

| Option | Description |
|--------|-------------|
| \`--type <name>\` | hero, conceptual, typography, metaphor, scene, minimal |
| \`--palette <name>\` | warm, elegant, cool, dark, earth, vivid, pastel, mono, retro, duotone, macaron |
| \`--rendering <name>\` | flat-vector, hand-drawn, painterly, digital, pixel, chalk, screen-print |
| \`--style <name>\` | Preset shorthand (see [Style Presets](references/style-presets.md)) |
| \`--text <level>\` | none, title-only, title-subtitle, text-rich |
| \`--mood <level>\` | subtle, balanced, bold |
| \`--font <name>\` | clean, handwritten, serif, display |
| \`--aspect <ratio>\` | 16:9 (default), 2.35:1, 4:3, 3:2, 1:1, 3:4 |
| \`--lang <code>\` | Title language (en, zh, ja, etc.) |
| \`--no-title\` | Alias for \`--text none\` |
| \`--quick\` | Skip confirmation, use auto-selection |
| \`--ref <files...>\` | Reference images for style/composition guidance |

## Five Dimensions

| Dimension | Values | Default |
|-----------|--------|---------|
| **Type** | hero, conceptual, typography, metaphor, scene, minimal | auto |
| **Palette** | warm, elegant, cool, dark, earth, vivid, pastel, mono, retro, duotone, macaron | auto |
| **Rendering** | flat-vector, hand-drawn, painterly, digital, pixel, chalk, screen-print | auto |
| **Text** | none, title-only, title-subtitle, text-rich | title-only |
| **Mood** | subtle, balanced, bold | balanced |
| **Font** | clean, handwritten, serif, display | clean |

Auto-selection rules: [references/auto-selection.md](references/auto-selection.md)

## Galleries

**Types**: hero, conceptual, typography, metaphor, scene, minimal
→ Details: [references/types.md](references/types.md)

**Palettes**: warm, elegant, cool, dark, earth, vivid, pastel, mono, retro, duotone, macaron
→ Details: [references/palettes/](references/palettes/)

**Renderings**: flat-vector, hand-drawn, painterly, digital, pixel, chalk, screen-print
→ Details: [references/renderings/](references/renderings/)

**Text Levels**: none (pure visual) | title-only (default) | title-subtitle | text-rich (with tags)
→ Details: [references/dimensions/text.md](references/dimensions/text.md)

**Mood Levels**: subtle (low contrast) | balanced (default) | bold (high contrast)
→ Details: [references/dimensions/mood.md](references/dimensions/mood.md)

**Fonts**: clean (sans-serif) | handwritten | serif | display (bold decorative)
→ Details: [references/dimensions/font.md](references/dimensions/font.md)

## File Structure

Output directory per \`default_output_dir\` preference:
- \`same-dir\`: \`{article-dir}/\`
- \`imgs-subdir\`: \`{article-dir}/imgs/\`
- \`independent\` (default): \`cover-image/{topic-slug}/\`

\`\`\`
<output-dir>/
├── source-{slug}.{ext}    # Source files
├── refs/                  # Reference images (if provided)
│   ├── ref-01-{slug}.{ext}
│   └── ref-01-{slug}.md   # Description file
├── prompts/cover.md       # Generation prompt
└── cover.png              # Output image
\`\`\`

**Slug**: 2-4 words, kebab-case. Conflict: append \`-YYYYMMDD-HHMMSS\`

## Workflow

### Progress Checklist

\`\`\`
Cover Image Progress:
- [ ] Step 0: Check preferences (EXTEND.md) ⛔ BLOCKING
- [ ] Step 1: Analyze content + save refs + determine output dir
- [ ] Step 2: Confirm options (6 dimensions) ⚠️ unless --quick
- [ ] Step 3: Create prompt
- [ ] Step 4: Generate image
- [ ] Step 5: Completion report
\`\`\`

### Flow

\`\`\`
Input → [Step 0: Preferences] ─┬─ Found → Continue
                               └─ Not found → First-Time Setup ⛔ BLOCKING → Save EXTEND.md → Continue
        ↓
Analyze + Save Refs → [Output Dir] → [Confirm: 6 Dimensions] → Prompt → Generate → Complete
                                              ↓
                                     (skip if --quick or all specified)
\`\`\`

### Step 0: Load Preferences ⛔ BLOCKING

Check EXTEND.md in priority order — the first one found wins:

| Priority | Path | Scope |
|----------|------|-------|
| 1 | \`.baoyu-skills/baoyu-cover-image/EXTEND.md\` | Project |
| 2 | \`\${XDG_CONFIG_HOME:-$HOME/.config}/baoyu-skills/baoyu-cover-image/EXTEND.md\` | XDG |
| 3 | \`$HOME/.baoyu-skills/baoyu-cover-image/EXTEND.md\` | User home |

| Result | Action |
|--------|--------|
| Found | Load, display summary → Continue |
| Not found | ⛔ Run first-time setup ([references/config/first-time-setup.md](references/config/first-time-setup.md)) → Save → Continue |

**CRITICAL**: If not found, complete setup BEFORE any other steps or questions.

### Step 1: Analyze Content

1. **Save reference images** (if provided) → [references/workflow/reference-images.md](references/workflow/reference-images.md)
2. **Save source content** (if pasted, save to \`source.md\`)
3. **Analyze content**: topic, tone, keywords, visual metaphors
4. **Deep analyze references** ⚠️: Extract specific, concrete elements (see reference-images.md)
5. **Detect language**: Compare source, user input, EXTEND.md preference
6. **Determine output directory**: Per File Structure rules

**⚠️ People in Reference Images:**

If reference images contain **people** who should appear in the cover:

- **Model supports \`--ref\`** (default): Copy image to \`refs/\`, pass via \`--ref\` at generation. No description file needed — the model sees the face directly.
- **Model does NOT support \`--ref\`** (Jimeng, Seedream 3.0): Create \`refs/ref-NN-{slug}.md\` with per-character description (hair, glasses, skin tone, clothing). Embed as MUST/REQUIRED instructions in prompt text.

See [reference-images.md](references/workflow/reference-images.md) for full decision table.

### Step 2: Confirm Options ⚠️

**Hard gate**: this step is mandatory per the [Confirmation Policy](#confirmation-policy) — Steps 3–4 cannot start until the user confirms here (or explicitly opts out with \`--quick\` / \`quick_mode: true\` / equivalent wording in the current request).

**MUST use \`AskUserQuestion\` tool** to present options as interactive selection — NOT plain text tables. Present up to 4 questions in a single \`AskUserQuestion\` call (Type, Palette, Rendering, Font + Settings). Each question shows the recommended option first with reason, followed by alternatives.

Full confirmation flow and question format: [references/workflow/confirm-options.md](references/workflow/confirm-options.md)

| Condition | Skipped | Still Asked |
|-----------|---------|-------------|
| \`--quick\` or \`quick_mode: true\` | 6 dimensions | Aspect ratio (unless \`--aspect\`) |
| All 6 + \`--aspect\` specified | All | None |

### Step 3: Create Prompt

Save to \`prompts/cover.md\`. Template: [references/workflow/prompt-template.md](references/workflow/prompt-template.md)

**CRITICAL - References in Frontmatter**:
- Files saved to \`refs/\` → Add to frontmatter \`references\` list
- Style extracted verbally (no file) → Omit \`references\`, describe in body
- Before writing → Verify: \`test -f refs/ref-NN-{slug}.{ext}\`

**Reference elements in body** MUST be detailed, prefixed with "MUST"/"REQUIRED", with integration approach.

### Step 4: Generate Image

1. **Backup existing** \`cover.png\` if regenerating
2. **Select backend** via the \`## Image Generation Tools\` rule at the top: use whatever is available; if multiple, ask the user once. Do this once per session before any generation.
3. **Write the full final prompt** to \`prompts/01-cover-[slug].md\` (hard requirement) BEFORE invoking the backend.
4. **Process references** from prompt frontmatter:
   - \`direct\` usage → pass via \`--ref\` (use ref-capable backend)
   - \`style\`/\`palette\` → extract traits, append to prompt
5. **Generate**: Call the chosen backend with the prompt file, output path, aspect ratio.
   - **\`codex-imagegen\`**: see [references/codex-imagegen.md](references/codex-imagegen.md) for the invocation contract (preferred \`baoyu-image-gen --provider codex-cli\` path, runtime wrapper discovery, parameter notes, stdout schema, batch semantics).
   - **Codex \`imagegen\` (native)** or other runtime-native tools / \`baoyu-image-gen\` skill: per the rule in \`## Image Generation Tools\` above.
6. On failure: auto-retry once

### Step 5: Completion Report

\`\`\`
Cover Generated!

Topic: [topic]
Type: [type] | Palette: [palette] | Rendering: [rendering]
Text: [text] | Mood: [mood] | Font: [font] | Aspect: [ratio]
Title: [title or "visual only"]
Language: [lang] | Watermark: [enabled/disabled]
References: [N images or "extracted style" or "none"]
Location: [directory path]

Files:
✓ source-{slug}.{ext}
✓ prompts/cover.md
✓ cover.png
\`\`\`

## Image Modification

| Action | Steps |
|--------|-------|
| **Regenerate** | Backup → Update prompt file FIRST → Regenerate |
| **Change dimension** | Backup → Confirm new value → Update prompt → Regenerate |

Text correction policy:

- If the title/subtitle is misspelled, garbled, hard to read, or visually weak, do not patch the bitmap with code.
- For text-correction regenerations, write a new prompt file and a new output path so the flawed candidate is preserved for comparison.
- Post-processing is limited to crop, resize, compression, or format conversion that does not alter text or the main composition.

## Composition Principles

- **Whitespace**: 40-60% breathing room
- **Visual anchor**: Main element centered or offset left
- **Characters**: Simplified silhouettes; NO realistic humans
- **Title**: Use exact title from user/source; never invent

## Changing Preferences

EXTEND.md lives at the path noted in **Step 0**. Three ways to change it:

- **Edit directly** — open EXTEND.md and change fields. Full schema: [references/config/preferences-schema.md](references/config/preferences-schema.md).
- **Reconfigure interactively** — delete EXTEND.md (or ask "reconfigure baoyu-cover-image preferences" / "重新配置"). The next run re-triggers first-time setup.
- **Common one-line edits**:
  - \`preferred_image_backend: auto\` — default; runtime-native tool wins, falls back to the only installed backend, asks only if multiple non-native are present.
  - \`preferred_image_backend: codex-imagegen\` — pin to Codex's built-in.
  - \`preferred_image_backend: baoyu-image-gen\` — pin to the baoyu-image-gen skill.
  - \`preferred_image_backend: ask\` — confirm backend every run.
  - \`watermark.enabled: true\`, \`preferred_type\`, \`preferred_palette\`, \`preferred_rendering\`, \`default_aspect\`, \`quick_mode: true\`, \`language\` — shift the auto-selection defaults and confirmation flow.

## References

**Dimensions**: [text.md](references/dimensions/text.md) | [mood.md](references/dimensions/mood.md) | [font.md](references/dimensions/font.md)
**Palettes**: [references/palettes/](references/palettes/)
**Renderings**: [references/renderings/](references/renderings/)
**Types**: [references/types.md](references/types.md)
**Auto-Selection**: [references/auto-selection.md](references/auto-selection.md)
**Style Presets**: [references/style-presets.md](references/style-presets.md)
**Compatibility**: [references/compatibility.md](references/compatibility.md)
**Visual Elements**: [references/visual-elements.md](references/visual-elements.md)
**Workflow**: [confirm-options.md](references/workflow/confirm-options.md) | [prompt-template.md](references/workflow/prompt-template.md) | [reference-images.md](references/workflow/reference-images.md)
**Config**: [preferences-schema.md](references/config/preferences-schema.md) | [first-time-setup.md](references/config/first-time-setup.md) | [watermark-guide.md](references/config/watermark-guide.md)`,
  whenToUse: 'Use when user asks to "generate cover image", "create article cover", or "make cover".',
  price: 'Free',
  priceUsdc: 0,
  category: 'skill',
  tags: ["baoyu-skills","cover-image","image","design"],
  stars: 701,
  weeklyInstalls: 223,
  totalPurchases: 475,
  featured: false,
  createdAt: '2026-05-25',
  creatorWallet: '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
  fileUrl: 'https://github.com/JimLiu/baoyu-skills/tree/main/skills/baoyu-cover-image',
  useCases: ["Design cover pictures for WeChat Official Accounts and blogs.","Create high-contrast YouTube or podcast cover thumbnails.","Generate premium card headers for social media sharing links."],
  exampleUsage: "Design a high-engagement cover image for my next post",
  overviewHtml: "<div class=\"skill-enrichment\" style=\"display: flex; flex-direction: column; gap: 32px;\">\n      <div class=\"enrich-hero\" style=\"position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 196, 129, 0.14); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);\">\n        <div style=\"width: 100%; aspect-ratio: 16/6; background: linear-gradient(135deg, #1b1622 0%, #0d131f 100%); display: flex; align-items: center; justify-content: center; color: var(--color-accent-warm-light);\">\n          <svg width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"/><circle cx=\"8.5\" cy=\"8.5\" r=\"1.5\"/><polyline points=\"21 15 16 10 5 21\"/></svg>\n        </div>\n        <div style=\"position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 30%, #0a0806 95%);\"></div>\n        <div style=\"position: absolute; bottom: 20px; left: 24px; right: 24px;\">\n          <h2 style=\"font-family: var(--font-display); color: var(--color-accent-warm-light); margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 0.02em;\">Cover Image</h2>\n          <p style=\"margin: 6px 0 0; color: var(--color-text-secondary); font-size: 14px; max-width: 600px;\">Generates article cover images with 5 dimensions (type, palette, rendering, text, mood) combining 11 color palettes a...</p>\n        </div>\n      </div>\n\n      <div style=\"display: grid; grid-template-columns: 1.2fr 1.0fr; gap: 32px; align-items: start;\">\n        <div>\n          <h3 style=\"color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;\">SKILL CAPABILITIES</h3>\n          <p style=\"margin-bottom: 24px; font-size: 13.5px; line-height: 1.65; color: var(--color-text-secondary);\">Generates article cover images with 5 dimensions (type, palette, rendering, text, mood) combining 11 color palettes and 7 rendering styles. Supports cinematic (2.35:1), widescreen (16:9), and square (1:1) aspects. Use when user asks to \"generate cover image\", \"create article cover\", or \"make cover\".</p>\n          \n          <h3 style=\"color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;\">KEY FEATURES</h3>\n          <ul style=\"list-style: none; padding: 0; margin: 0;\">\n            <li style=\"margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;\">\n    <span style=\"color: var(--color-accent); font-weight: bold; margin-top: 2px;\">•</span>\n    <span>End-to-end workflow execution automation</span>\n  </li>\n<li style=\"margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;\">\n    <span style=\"color: var(--color-accent); font-weight: bold; margin-top: 2px;\">•</span>\n    <span>Preset parameters optimized for production use</span>\n  </li>\n<li style=\"margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;\">\n    <span style=\"color: var(--color-accent); font-weight: bold; margin-top: 2px;\">•</span>\n    <span>Self-documenting routines and validation parameters</span>\n  </li>\n          </ul>\n        </div>\n        \n        <div style=\"background: rgba(255, 196, 129, 0.03); border: 1px solid rgba(255, 196, 129, 0.08); border-radius: 12px; padding: 24px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);\">\n          <h4 style=\"color: var(--color-accent-warm-light); margin-top: 0; margin-bottom: 16px; font-family: var(--font-display); font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;\">AUTOMATION STACKS</h4>\n          <div style=\"display: flex; flex-direction: column; gap: 12px;\">\n            <div style=\"background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;\">\n              <div style=\"font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;\">1. PARSE & STRUCTURE</div>\n              <div style=\"font-size: 12px; color: var(--color-text-secondary);\">Analyze context inputs and map constraints recursively.</div>\n            </div>\n            <div style=\"background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;\">\n              <div style=\"font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;\">2. AGENT EVALUATION</div>\n              <div style=\"font-size: 12px; color: var(--color-text-secondary);\">Validate logic flows against preset specifications.</div>\n            </div>\n            <div style=\"background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;\">\n              <div style=\"font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;\">3. DEPLOY & EXPORT</div>\n              <div style=\"font-size: 12px; color: var(--color-text-secondary);\">Write standardized outputs to target environments.</div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>",
  previewHtml: "<div style=\"background: #050c12; border: 1px solid rgba(255, 196, 129, 0.16); border-radius: 12px; font-family: var(--font-mono); color: #ffe8d1; overflow: hidden; max-width: 100%; box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);\">\n        <div style=\"background: rgba(255, 196, 129, 0.06); border-bottom: 1px solid rgba(255, 196, 129, 0.1); padding: 12px 20px; font-size: 11px; font-weight: 700; display: flex; justify-content: space-between; align-items: center; letter-spacing: 0.08em;\">\n          <span>IMAGE GENERATOR WORKSPACE</span>\n          <span style=\"color: var(--color-accent-warm-light);\">READY</span>\n        </div>\n        <div style=\"padding: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px;\">\n          <div style=\"display: flex; flex-direction: column; gap: 10px;\">\n            <div style=\"font-size: 11px; color: rgba(255, 232, 209, 0.4);\">INPUT PROMPT</div>\n            <div style=\"background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 196, 129, 0.08); border-radius: 6px; padding: 10px; font-size: 12px; line-height: 1.5; color: #ffe8d1;\">\n              Create illustration layout for tech article about smart AI agents.\n            </div>\n            <div style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 8px;\">\n              <div style=\"background: rgba(0, 0, 0, 0.2); border: 1px solid rgba(255, 196, 129, 0.08); padding: 8px; border-radius: 4px; font-size: 11px; text-align: center;\">\n                Style: 3D Art\n              </div>\n              <div style=\"background: rgba(0, 0, 0, 0.2); border: 1px solid rgba(255, 196, 129, 0.08); padding: 8px; border-radius: 4px; font-size: 11px; text-align: center;\">\n                Ratio: 16:9\n              </div>\n            </div>\n          </div>\n          <div style=\"background: rgba(255, 196, 129, 0.03); border: 1px dashed rgba(255, 196, 129, 0.16); border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; min-height: 140px; padding: 12px;\">\n            <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"rgba(255, 196, 129, 0.4)\" stroke-width=\"1.5\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><circle cx=\"8.5\" cy=\"8.5\" r=\"1.5\"/><polyline points=\"21 15 16 10 5 21\"/></svg>\n            <span style=\"font-size: 11px; color: rgba(255, 232, 209, 0.6); text-align: center;\">[Generated Asset View]</span>\n          </div>\n        </div>\n      </div>",
  screenshots: [
  {
    "title": "Styles",
    "items": [
      {
        "name": "Blueprint",
        "url": "https://raw.githubusercontent.com/JimLiu/baoyu-skills/main/screenshots/cover-image-styles/blueprint.webp"
      },
      {
        "name": "Bold Editorial",
        "url": "https://raw.githubusercontent.com/JimLiu/baoyu-skills/main/screenshots/cover-image-styles/bold-editorial.webp"
      },
      {
        "name": "Chalkboard",
        "url": "https://raw.githubusercontent.com/JimLiu/baoyu-skills/main/screenshots/cover-image-styles/chalkboard.webp"
      },
      {
        "name": "Dark Atmospheric",
        "url": "https://raw.githubusercontent.com/JimLiu/baoyu-skills/main/screenshots/cover-image-styles/dark-atmospheric.webp"
      },
      {
        "name": "Editorial Infographic",
        "url": "https://raw.githubusercontent.com/JimLiu/baoyu-skills/main/screenshots/cover-image-styles/editorial-infographic.webp"
      },
      {
        "name": "Elegant",
        "url": "https://raw.githubusercontent.com/JimLiu/baoyu-skills/main/screenshots/cover-image-styles/elegant.webp"
      },
      {
        "name": "Fantasy Animation",
        "url": "https://raw.githubusercontent.com/JimLiu/baoyu-skills/main/screenshots/cover-image-styles/fantasy-animation.webp"
      },
      {
        "name": "Flat Doodle",
        "url": "https://raw.githubusercontent.com/JimLiu/baoyu-skills/main/screenshots/cover-image-styles/flat-doodle.webp"
      },
      {
        "name": "Intuition Machine",
        "url": "https://raw.githubusercontent.com/JimLiu/baoyu-skills/main/screenshots/cover-image-styles/intuition-machine.webp"
      },
      {
        "name": "Minimal",
        "url": "https://raw.githubusercontent.com/JimLiu/baoyu-skills/main/screenshots/cover-image-styles/minimal.webp"
      },
      {
        "name": "Nature",
        "url": "https://raw.githubusercontent.com/JimLiu/baoyu-skills/main/screenshots/cover-image-styles/nature.webp"
      },
      {
        "name": "Notion",
        "url": "https://raw.githubusercontent.com/JimLiu/baoyu-skills/main/screenshots/cover-image-styles/notion.webp"
      },
      {
        "name": "Pixel Art",
        "url": "https://raw.githubusercontent.com/JimLiu/baoyu-skills/main/screenshots/cover-image-styles/pixel-art.webp"
      },
      {
        "name": "Playful",
        "url": "https://raw.githubusercontent.com/JimLiu/baoyu-skills/main/screenshots/cover-image-styles/playful.webp"
      },
      {
        "name": "Retro",
        "url": "https://raw.githubusercontent.com/JimLiu/baoyu-skills/main/screenshots/cover-image-styles/retro.webp"
      },
      {
        "name": "Sketch Notes",
        "url": "https://raw.githubusercontent.com/JimLiu/baoyu-skills/main/screenshots/cover-image-styles/sketch-notes.webp"
      },
      {
        "name": "Vector Illustration",
        "url": "https://raw.githubusercontent.com/JimLiu/baoyu-skills/main/screenshots/cover-image-styles/vector-illustration.webp"
      },
      {
        "name": "Vintage",
        "url": "https://raw.githubusercontent.com/JimLiu/baoyu-skills/main/screenshots/cover-image-styles/vintage.webp"
      },
      {
        "name": "Warm",
        "url": "https://raw.githubusercontent.com/JimLiu/baoyu-skills/main/screenshots/cover-image-styles/warm.webp"
      },
      {
        "name": "Watercolor",
        "url": "https://raw.githubusercontent.com/JimLiu/baoyu-skills/main/screenshots/cover-image-styles/watercolor.webp"
      }
    ]
  }
]
}
