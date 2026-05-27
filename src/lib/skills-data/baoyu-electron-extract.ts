import { SkillListing } from '../skills-data'

export const baoyuElectronExtract: SkillListing = {
  id: 'baoyu-electron-extract',
  author: 'baoyu',
  slug: 'baoyu-electron-extract',
  name: 'Electron Extract',
  tagline: 'Extracts resources and JavaScript from any installed Electron app (`.',
  description: 'Extracts resources and JavaScript from any installed Electron app (`.asar` bundle), restoring original sources from `.js.map` files when available or formatting minified code with Prettier otherwise. Use when user wants to "extract Electron app", "decompile Electron", "get the source code of <app>", "inspect app.asar", "看 Electron 应用源码", "提取 .asar", or asks how a desktop Electron app is built. Skips `node_modules` and supports both macOS and Windows.',
  readme: `# Electron App Extract

Extracts resources and code from an installed Electron app's \`app.asar\`. When a \`.js.map\` is present, restores the original source files from the embedded \`sourcesContent\`; otherwise formats the minified code with Prettier. Source-map paths are resolved relative to the \`.js.map\` file first, so bundled paths like \`../../src/main.ts\` restore to readable paths such as \`restored/src/main.ts\` instead of hashed placeholders. Always skips \`node_modules\`. Works on macOS and Windows.

## User Input Tools

When this skill prompts the user, follow this tool-selection rule (priority order):

1. **Prefer built-in user-input tools** exposed by the current agent runtime — e.g., \`AskUserQuestion\`, \`request_user_input\`, \`clarify\`, \`ask_user\`, or any equivalent.
2. **Fallback**: if no such tool exists, emit a numbered plain-text message and ask the user to reply with the chosen number/answer for each question.
3. **Batching**: if the tool supports multiple questions per call, combine all applicable questions into a single call; if only single-question, ask them one at a time in priority order.

Concrete \`AskUserQuestion\` references below are examples — substitute the local equivalent in other runtimes.

## Script Directory

Scripts in \`scripts/\` subdirectory. \`{baseDir}\` = this SKILL.md's directory path. Resolve \`\${BUN_X}\` runtime: if \`bun\` installed → \`bun\`; if \`npx\` available → \`npx -y bun\`; else suggest installing bun. Replace \`{baseDir}\` and \`\${BUN_X}\` with actual values.

| Script            | Purpose                                                                        |
| ----------------- | ------------------------------------------------------------------------------ |
| \`scripts/main.ts\` | App discovery + asar extraction + source-map restoration + Prettier formatting |

## When to use

Use this skill whenever the user wants to look inside an installed Electron application or inspect its bundled code. Trigger phrases include:

- "extract Electron app", "decompile this Electron app", "unpack app.asar"
- "show me the source of <app>", "look inside <app>", "how is <app> built"
- "get the source code of Codex / Cursor / Discord / Slack / VS Code / Notion / Obsidian / ChatGPT desktop"
- "提取 Electron 应用", "看 <app> 的源码", "反编译 Electron", "解包 app.asar", "还原 source map"

Both **app name** (e.g., \`Codex\`) and **absolute path** (e.g., \`/Applications/Codex.app\`, a \`.asar\` file, or a Windows install dir) are accepted. The script handles discovery for both platforms.

## Workflow

**1. Determine the input.** Ask the user for the app name or path if they haven't given one. If they want a custom output directory, ask for that too.

**2. Run the script.**

\`\`\`bash
\${BUN_X} {baseDir}/scripts/main.ts "<app>" [--output <dir>] [--asar <path>] [--force]
\`\`\`

Start with \`--dry-run\` first if you're unsure whether discovery will find the right bundle — it prints the resolved paths and exits without touching the filesystem.

**3. Handle the result.**

- **Success** → report the output paths and the counts (extracted / restored / formatted).
- **Multiple matches** → the script lists candidates and exits non-zero. Show the user the candidates, ask which one to use (via \`AskUserQuestion\` or the runtime equivalent), then re-run with the chosen absolute path.
- **Existing non-empty output dir** → the script refuses without \`--force\`. Ask the user whether to overwrite (\`--force\`) or pick a new \`--output\` path.
- **Unsupported platform / no match** → suggest passing \`--asar /full/path/to/app.asar\` if the user knows where the bundle lives.

**4. Point the user at the result.** The default output dir is \`~/Downloads/<AppName>-electron-extract/\`. The most interesting subdirectory depends on what was found:

- \`restored/\` exists → the original source tree was reconstructed from \`.js.map\` files; this is what to read first.
- Only \`extracted/\` exists (no maps) → the JS/CSS in \`extracted/\` was Prettier-formatted in place; read from there.

## Source-map path restoration

The script should preserve original source names and directory structure as much as the source map allows:

- Resolve each \`sources[]\` entry with \`sourceRoot\` when present, then relative to the \`.js.map\` file's directory inside \`extracted/\`.
- Collapse normal bundler-relative paths into the restored project tree. For example, \`.vite/main/index.js.map\` + \`../../src/main.ts\` becomes \`restored/src/main.ts\`.
- If a source path climbs above \`extracted/\`, keep the readable remaining path under \`restored/\` instead of hashing it. For example, \`.vite/main/index.js.map\` + \`../../../shared/src/lib/foo.ts\` becomes \`restored/shared/src/lib/foo.ts\`.
- Strip URL/query decorations from source names, including common \`webpack://\`, \`file://\`, and \`?loader\` suffixes.
- Use \`restored/__unknown/<hash>.<ext>\` only when the source name is empty or cannot be reduced to a safe file path.
- Continue skipping \`node_modules\` and \`webpack/runtime/*\` entries; these are bundler/runtime noise, not app sources.

## Usage

\`\`\`bash
# Extract by app name (default output: ~/Downloads/Codex-electron-extract/)
\${BUN_X} {baseDir}/scripts/main.ts Codex

# Extract by absolute path (works for .app bundles, install dirs, or .asar files)
\${BUN_X} {baseDir}/scripts/main.ts "/Applications/Visual Studio Code.app"
\${BUN_X} {baseDir}/scripts/main.ts "C:\Users\you\AppData\Local\Programs\codex"
\${BUN_X} {baseDir}/scripts/main.ts --asar /Applications/Codex.app/Contents/Resources/app.asar Codex

# Custom output
\${BUN_X} {baseDir}/scripts/main.ts Codex --output ~/work/codex-source

# Preview discovery without writing anything
\${BUN_X} {baseDir}/scripts/main.ts Codex --dry-run

# Overwrite an existing output dir
\${BUN_X} {baseDir}/scripts/main.ts Codex --force

# Machine-readable result (one JSON line on stdout)
\${BUN_X} {baseDir}/scripts/main.ts Codex --json
\`\`\`

## Options

| Option           | Short | Description                                                     | Default                                  |
| ---------------- | ----- | --------------------------------------------------------------- | ---------------------------------------- |
| \`<app>\`          |       | App name or absolute path. Required unless \`--asar\` is given.   | —                                        |
| \`--output\`       | \`-o\`  | Output directory                                                | \`~/Downloads/<AppName>-electron-extract\` |
| \`--asar\`         |       | Override the resolved \`.asar\` path                              | auto-discovered                          |
| \`--force\`        | \`-f\`  | Allow writing into a non-empty existing output dir              | false                                    |
| \`--skip-format\`  |       | Skip Prettier formatting                                        | false                                    |
| \`--skip-restore\` |       | Skip source-map restoration                                     | false                                    |
| \`--no-unpacked\`  |       | Don't copy \`app.asar.unpacked/\` alongside                       | false                                    |
| \`--dry-run\`      |       | Print resolved paths and exit without writing                   | false                                    |
| \`--json\`         |       | Emit one JSON-line summary on stdout (suppresses normal output) | false                                    |

## Output layout

\`\`\`
~/Downloads/<AppName>-electron-extract/
├── extract-report.json          # JSON summary: counts, warnings, resolved paths
├── extracted/                   # raw asar contents (JS/CSS Prettier-formatted when no map)
│   └── ...                      # node_modules left untouched (skipped from format)
├── extracted.unpacked/          # copied from <asar>.unpacked/ if present
│   └── ...                      # native modules (.node), large assets
└── restored/                    # only present if at least one .js.map was usable
    └── <original/source/tree>   # rebuilt from sourcesContent in each .js.map
\`\`\`

## Notes

- **node_modules** is always skipped — both for source-map restoration and Prettier formatting — because vendored dependencies are noise when inspecting an app.
- **Source-map restoration** only works when the \`.js.map\` embeds \`sourcesContent\`. This is the common case for modern bundlers (webpack, esbuild, Vite, rollup). If a map references external \`.ts\`/\`.js\` files without embedding them, that map is skipped and the corresponding \`.js\` is Prettier-formatted instead. Skipped maps are listed in \`extract-report.json\` under \`warnings\`.
- **Readable paths over hashes** — don't treat \`../\` segments in source-map paths as automatically unsafe. First resolve them from the map location and then sanitize the final output path so it still stays under \`restored/\`. Hash fallback is only for unusable source names.
- **App discovery** searches \`/Applications\` + \`~/Applications\` on macOS, and \`%LOCALAPPDATA%\Programs\`, \`%PROGRAMFILES%\`, \`%PROGRAMFILES(X86)%\`, \`%APPDATA%\` on Windows. If discovery finds multiple matches, the script exits and lists them — re-run with an absolute path. On Linux or other platforms, pass \`--asar /path/to/app.asar\` explicitly.
- **Safety** — the script refuses to write to \`/\`, the user home directly, or the current working directory, and refuses to populate an existing non-empty output dir without \`--force\`.
- **No global installs** — \`@electron/asar\` and \`prettier\` are resolved on-the-fly via \`npx -y\`. First run will be slower while npx caches them.`,
  whenToUse: 'Use when user wants to "extract Electron app", "decompile Electron", "get the source code of <app>", "inspect app.asar", "看 Electron 应用源码", "提取 .asar", or asks how a desktop Electron app is built. Skips `node_modules` and supports both macOS and Windows.',
  price: 'Free',
  priceUsdc: 0,
  category: 'skill',
  tags: ["baoyu-skills","electron-extract","social-media","sharing","scraping","automation"],
  stars: 333,
  weeklyInstalls: 186,
  totalPurchases: 1287,
  featured: false,
  createdAt: '2026-05-25',
  creatorWallet: '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
  fileUrl: 'https://github.com/JimLiu/baoyu-skills/tree/main/skills/baoyu-electron-extract',
  useCases: ["Extract local chat logs or notes from desktop applications.","Scrape internal documents from local knowledge management software.","Convert proprietary client formats to readable text streams."],
  overviewHtml: "<div class=\"skill-enrichment\" style=\"display: flex; flex-direction: column; gap: 32px;\">\n      <div class=\"enrich-hero\" style=\"position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 196, 129, 0.14); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);\">\n        <div style=\"width: 100%; aspect-ratio: 16/6; background: linear-gradient(135deg, #0d1a1e 0%, #0e1118 100%); display: flex; align-items: center; justify-content: center; color: var(--color-accent-warm-light);\">\n          <svg width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8\"/><polyline points=\"16 6 12 2 8 6\"/><line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"15\"/></svg>\n        </div>\n        <div style=\"position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 30%, #0a0806 95%);\"></div>\n        <div style=\"position: absolute; bottom: 20px; left: 24px; right: 24px;\">\n          <h2 style=\"font-family: var(--font-display); color: var(--color-accent-warm-light); margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 0.02em;\">Electron Extract</h2>\n          <p style=\"margin: 6px 0 0; color: var(--color-text-secondary); font-size: 14px; max-width: 600px;\">Extracts resources and JavaScript from any installed Electron app (`.</p>\n        </div>\n      </div>\n\n      <div style=\"display: grid; grid-template-columns: 1.2fr 1.0fr; gap: 32px; align-items: start;\">\n        <div>\n          <h3 style=\"color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;\">SKILL CAPABILITIES</h3>\n          <p style=\"margin-bottom: 24px; font-size: 13.5px; line-height: 1.65; color: var(--color-text-secondary);\">Extracts resources and JavaScript from any installed Electron app (`.asar` bundle), restoring original sources from `.js.map` files when available or formatting minified code with Prettier otherwise. Use when user wants to \"extract Electron app\", \"decompile Electron\", \"get the source code of <app>\", \"inspect app.asar\", \"看 Electron 应用源码\", \"提取 .asar\", or asks how a desktop Electron app is built. Skips `node_modules` and supports both macOS and Windows.</p>\n          \n          <h3 style=\"color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;\">KEY FEATURES</h3>\n          <ul style=\"list-style: none; padding: 0; margin: 0;\">\n            <li style=\"margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;\">\n    <span style=\"color: var(--color-accent); font-weight: bold; margin-top: 2px;\">•</span>\n    <span>End-to-end workflow execution automation</span>\n  </li>\n<li style=\"margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;\">\n    <span style=\"color: var(--color-accent); font-weight: bold; margin-top: 2px;\">•</span>\n    <span>Preset parameters optimized for production use</span>\n  </li>\n<li style=\"margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;\">\n    <span style=\"color: var(--color-accent); font-weight: bold; margin-top: 2px;\">•</span>\n    <span>Self-documenting routines and validation parameters</span>\n  </li>\n          </ul>\n        </div>\n        \n        <div style=\"background: rgba(255, 196, 129, 0.03); border: 1px solid rgba(255, 196, 129, 0.08); border-radius: 12px; padding: 24px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);\">\n          <h4 style=\"color: var(--color-accent-warm-light); margin-top: 0; margin-bottom: 16px; font-family: var(--font-display); font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;\">AUTOMATION STACKS</h4>\n          <div style=\"display: flex; flex-direction: column; gap: 12px;\">\n            <div style=\"background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;\">\n              <div style=\"font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;\">1. PARSE & STRUCTURE</div>\n              <div style=\"font-size: 12px; color: var(--color-text-secondary);\">Analyze context inputs and map constraints recursively.</div>\n            </div>\n            <div style=\"background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;\">\n              <div style=\"font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;\">2. AGENT EVALUATION</div>\n              <div style=\"font-size: 12px; color: var(--color-text-secondary);\">Validate logic flows against preset specifications.</div>\n            </div>\n            <div style=\"background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;\">\n              <div style=\"font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;\">3. DEPLOY & EXPORT</div>\n              <div style=\"font-size: 12px; color: var(--color-text-secondary);\">Write standardized outputs to target environments.</div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>",
  previewHtml: "<div style=\"background: #050c12; border: 1px solid rgba(255, 196, 129, 0.16); border-radius: 12px; font-family: var(--font-mono); color: #ffe8d1; overflow: hidden; max-width: 100%; box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);\">\n        <div style=\"background: rgba(255, 196, 129, 0.06); border-bottom: 1px solid rgba(255, 196, 129, 0.1); padding: 12px 20px; font-size: 11px; font-weight: 700; display: flex; justify-content: space-between; align-items: center; letter-spacing: 0.08em;\">\n          <span>SIMULATED SOCIAL PUBLISHER</span>\n          <span style=\"color: #64b4ff;\">ACTIVE</span>\n        </div>\n        <div style=\"padding: 20px; display: flex; flex-direction: column; gap: 12px;\">\n          <div style=\"background: rgba(0, 0, 0, 0.2); border: 1px solid rgba(255, 196, 129, 0.08); border-radius: 8px; padding: 16px;\">\n            <div style=\"font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 8px;\">PUBLISHING PREVIEW</div>\n            <div style=\"font-size: 13px; line-height: 1.5; color: var(--color-text-secondary); margin-bottom: 12px;\">\n              🚀 Exciting announcement! We just integrated all 21 skills from baoyu-skills directly into Leverbrain. Deploy them in seconds. #Web3 #AI\n            </div>\n            <div style=\"display: flex; gap: 16px; font-size: 11px; color: rgba(255, 232, 209, 0.4);\">\n              <span>💬 12 replies</span>\n              <span>🔄 45 reposts</span>\n              <span>❤️ 188 likes</span>\n            </div>\n          </div>\n        </div>\n      </div>",
  screenshots: undefined
}
