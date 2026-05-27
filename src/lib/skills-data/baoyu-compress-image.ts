import { SkillListing } from '../skills-data'

export const baoyuCompressImage: SkillListing = {
  id: 'baoyu-compress-image',
  author: 'baoyu',
  slug: 'baoyu-compress-image',
  name: 'Compress Image',
  tagline: 'Compresses images to WebP (default) or PNG with automatic tool selection.',
  description: 'Compresses images to WebP (default) or PNG with automatic tool selection. Use when user asks to "compress image", "optimize image", "convert to webp", or reduce image file size.',
  readme: `# Image Compressor

Compresses images using best available tool (sips → cwebp → ImageMagick → Sharp).

## Script Directory

Scripts in \`scripts/\` subdirectory. \`{baseDir}\` = this SKILL.md's directory path. Resolve \`\${BUN_X}\` runtime: if \`bun\` installed → \`bun\`; if \`npx\` available → \`npx -y bun\`; else suggest installing bun. Replace \`{baseDir}\` and \`\${BUN_X}\` with actual values.

| Script | Purpose |
|--------|---------|
| \`scripts/main.ts\` | Image compression CLI |

## Preferences (EXTEND.md)

Check EXTEND.md in priority order — the first one found wins:

| Priority | Path | Scope |
|----------|------|-------|
| 1 | \`.baoyu-skills/baoyu-compress-image/EXTEND.md\` | Project |
| 2 | \`\${XDG_CONFIG_HOME:-$HOME/.config}/baoyu-skills/baoyu-compress-image/EXTEND.md\` | XDG |
| 3 | \`$HOME/.baoyu-skills/baoyu-compress-image/EXTEND.md\` | User home |

If none found, use defaults.

**EXTEND.md supports**: Default format, default quality, keep-original preference.

## Usage

\`\`\`bash
\${BUN_X} {baseDir}/scripts/main.ts <input> [options]
\`\`\`

## Options

| Option | Short | Description | Default |
|--------|-------|-------------|---------|
| \`<input>\` | | File or directory | Required |
| \`--output\` | \`-o\` | Output path | Same path, new ext |
| \`--format\` | \`-f\` | webp, png, jpeg | webp |
| \`--quality\` | \`-q\` | Quality 0-100 | 80 |
| \`--keep\` | \`-k\` | Keep original | false |
| \`--recursive\` | \`-r\` | Process subdirs | false |
| \`--json\` | | JSON output | false |

## Examples

\`\`\`bash
# Single file → WebP (replaces original)
\${BUN_X} {baseDir}/scripts/main.ts image.png

# Keep PNG format
\${BUN_X} {baseDir}/scripts/main.ts image.png -f png --keep

# Directory recursive
\${BUN_X} {baseDir}/scripts/main.ts ./images/ -r -q 75

# JSON output
\${BUN_X} {baseDir}/scripts/main.ts image.png --json
\`\`\`

**Output**:
\`\`\`
image.png → image.webp (245KB → 89KB, 64% reduction)
\`\`\`

## Extension Support

Custom configurations via EXTEND.md. See **Preferences** section for paths and supported options.`,
  whenToUse: 'Use when user asks to "compress image", "optimize image", "convert to webp", or reduce image file size.',
  price: 'Free',
  priceUsdc: 0,
  category: 'skill',
  tags: ["baoyu-skills","compress-image","image","design"],
  stars: 438,
  weeklyInstalls: 188,
  totalPurchases: 776,
  featured: false,
  createdAt: '2026-05-25',
  creatorWallet: '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
  fileUrl: 'https://github.com/JimLiu/baoyu-skills/tree/main/skills/baoyu-compress-image',
  overviewHtml: "<div class=\"skill-enrichment\" style=\"display: flex; flex-direction: column; gap: 32px;\">\n      <div class=\"enrich-hero\" style=\"position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 196, 129, 0.14); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);\">\n        <div style=\"width: 100%; aspect-ratio: 16/6; background: linear-gradient(135deg, #1b1622 0%, #0d131f 100%); display: flex; align-items: center; justify-content: center; color: var(--color-accent-warm-light);\">\n          <svg width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"/><circle cx=\"8.5\" cy=\"8.5\" r=\"1.5\"/><polyline points=\"21 15 16 10 5 21\"/></svg>\n        </div>\n        <div style=\"position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 30%, #0a0806 95%);\"></div>\n        <div style=\"position: absolute; bottom: 20px; left: 24px; right: 24px;\">\n          <h2 style=\"font-family: var(--font-display); color: var(--color-accent-warm-light); margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 0.02em;\">Compress Image</h2>\n          <p style=\"margin: 6px 0 0; color: var(--color-text-secondary); font-size: 14px; max-width: 600px;\">Compresses images to WebP (default) or PNG with automatic tool selection.</p>\n        </div>\n      </div>\n\n      <div style=\"display: grid; grid-template-columns: 1.2fr 1.0fr; gap: 32px; align-items: start;\">\n        <div>\n          <h3 style=\"color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;\">SKILL CAPABILITIES</h3>\n          <p style=\"margin-bottom: 24px; font-size: 13.5px; line-height: 1.65; color: var(--color-text-secondary);\">Compresses images to WebP (default) or PNG with automatic tool selection. Use when user asks to \"compress image\", \"optimize image\", \"convert to webp\", or reduce image file size.</p>\n          \n          <h3 style=\"color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;\">KEY FEATURES</h3>\n          <ul style=\"list-style: none; padding: 0; margin: 0;\">\n            <li style=\"margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;\">\n    <span style=\"color: var(--color-accent); font-weight: bold; margin-top: 2px;\">•</span>\n    <span>End-to-end workflow execution automation</span>\n  </li>\n<li style=\"margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;\">\n    <span style=\"color: var(--color-accent); font-weight: bold; margin-top: 2px;\">•</span>\n    <span>Preset parameters optimized for production use</span>\n  </li>\n<li style=\"margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;\">\n    <span style=\"color: var(--color-accent); font-weight: bold; margin-top: 2px;\">•</span>\n    <span>Self-documenting routines and validation parameters</span>\n  </li>\n          </ul>\n        </div>\n        \n        <div style=\"background: rgba(255, 196, 129, 0.03); border: 1px solid rgba(255, 196, 129, 0.08); border-radius: 12px; padding: 24px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);\">\n          <h4 style=\"color: var(--color-accent-warm-light); margin-top: 0; margin-bottom: 16px; font-family: var(--font-display); font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;\">AUTOMATION STACKS</h4>\n          <div style=\"display: flex; flex-direction: column; gap: 12px;\">\n            <div style=\"background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;\">\n              <div style=\"font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;\">1. PARSE & STRUCTURE</div>\n              <div style=\"font-size: 12px; color: var(--color-text-secondary);\">Analyze context inputs and map constraints recursively.</div>\n            </div>\n            <div style=\"background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;\">\n              <div style=\"font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;\">2. AGENT EVALUATION</div>\n              <div style=\"font-size: 12px; color: var(--color-text-secondary);\">Validate logic flows against preset specifications.</div>\n            </div>\n            <div style=\"background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;\">\n              <div style=\"font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;\">3. DEPLOY & EXPORT</div>\n              <div style=\"font-size: 12px; color: var(--color-text-secondary);\">Write standardized outputs to target environments.</div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>",
  previewHtml: "<div style=\"background: #050c12; border: 1px solid rgba(255, 196, 129, 0.16); border-radius: 12px; font-family: var(--font-mono); color: #ffe8d1; overflow: hidden; max-width: 100%; box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);\">\n        <div style=\"background: rgba(255, 196, 129, 0.06); border-bottom: 1px solid rgba(255, 196, 129, 0.1); padding: 12px 20px; font-size: 11px; font-weight: 700; display: flex; justify-content: space-between; align-items: center; letter-spacing: 0.08em;\">\n          <span>IMAGE GENERATOR WORKSPACE</span>\n          <span style=\"color: var(--color-accent-warm-light);\">READY</span>\n        </div>\n        <div style=\"padding: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px;\">\n          <div style=\"display: flex; flex-direction: column; gap: 10px;\">\n            <div style=\"font-size: 11px; color: rgba(255, 232, 209, 0.4);\">INPUT PROMPT</div>\n            <div style=\"background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 196, 129, 0.08); border-radius: 6px; padding: 10px; font-size: 12px; line-height: 1.5; color: #ffe8d1;\">\n              Create illustration layout for tech article about smart AI agents.\n            </div>\n            <div style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 8px;\">\n              <div style=\"background: rgba(0, 0, 0, 0.2); border: 1px solid rgba(255, 196, 129, 0.08); padding: 8px; border-radius: 4px; font-size: 11px; text-align: center;\">\n                Style: 3D Art\n              </div>\n              <div style=\"background: rgba(0, 0, 0, 0.2); border: 1px solid rgba(255, 196, 129, 0.08); padding: 8px; border-radius: 4px; font-size: 11px; text-align: center;\">\n                Ratio: 16:9\n              </div>\n            </div>\n          </div>\n          <div style=\"background: rgba(255, 196, 129, 0.03); border: 1px dashed rgba(255, 196, 129, 0.16); border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; min-height: 140px; padding: 12px;\">\n            <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"rgba(255, 196, 129, 0.4)\" stroke-width=\"1.5\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><circle cx=\"8.5\" cy=\"8.5\" r=\"1.5\"/><polyline points=\"21 15 16 10 5 21\"/></svg>\n            <span style=\"font-size: 11px; color: rgba(255, 232, 209, 0.6); text-align: center;\">[Generated Asset View]</span>\n          </div>\n        </div>\n      </div>",
  screenshots: undefined
}
