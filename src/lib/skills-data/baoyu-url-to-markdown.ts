import { SkillListing } from '../skills-data'

export const baoyuUrlToMarkdown: SkillListing = {
  id: 'baoyu-url-to-markdown',
  author: 'baoyu',
  slug: 'baoyu-url-to-markdown',
  name: 'Url To Markdown',
  tagline: 'Fetch any URL and convert to markdown using baoyu-fetch CLI (Chrome CDP with site-specific adapters).',
  description: 'Fetch any URL and convert to markdown using baoyu-fetch CLI (Chrome CDP with site-specific adapters). Built-in adapters for X/Twitter, YouTube transcripts, Hacker News threads, and generic pages via Defuddle. Handles login/CAPTCHA via interaction wait modes. Use when user wants to save a webpage as markdown.',
  readme: `# URL to Markdown

Fetches any URL via \`baoyu-fetch\` CLI (Chrome CDP + site-specific adapters) and converts it to clean markdown.

## User Input Tools

When this skill prompts the user, follow this tool-selection rule (priority order):

1. **Prefer built-in user-input tools** exposed by the current agent runtime — e.g., \`AskUserQuestion\`, \`request_user_input\`, \`clarify\`, \`ask_user\`, or any equivalent.
2. **Fallback**: if no such tool exists, emit a numbered plain-text message and ask the user to reply with the chosen number/answer for each question.
3. **Batching**: if the tool supports multiple questions per call, combine all applicable questions into a single call; if only single-question, ask them one at a time in priority order.

Concrete \`AskUserQuestion\` references below are examples — substitute the local equivalent in other runtimes.

## CLI Setup

**Important**: The CLI source is vendored in \`{baseDir}/scripts/lib\`. \`scripts/package.json\` installs only third-party runtime dependencies.

**Agent Execution Instructions**:
1. Determine this SKILL.md file's directory path as \`{baseDir}\`
2. Resolve \`\${BUN}\` runtime: if \`bun\` installed → \`bun\`; else suggest installing Bun
3. If \`{baseDir}/scripts/node_modules\` does not exist, run \`\${BUN} install --cwd {baseDir}/scripts\`
4. \`\${READER}\` = \`{baseDir}/scripts/baoyu-fetch\`
5. Replace all \`\${READER}\` in this document with the resolved value

## Preferences (EXTEND.md)

Check EXTEND.md in priority order — the first one found wins:

| Priority | Path | Scope |
|----------|------|-------|
| 1 | \`.baoyu-skills/baoyu-url-to-markdown/EXTEND.md\` | Project |
| 2 | \`\${XDG_CONFIG_HOME:-$HOME/.config}/baoyu-skills/baoyu-url-to-markdown/EXTEND.md\` | XDG |
| 3 | \`$HOME/.baoyu-skills/baoyu-url-to-markdown/EXTEND.md\` | User home |

| Result | Action |
|--------|--------|
| Found | Read, parse, apply settings |
| Not found | **MUST** run first-time setup (see below) — do NOT silently create defaults |

**EXTEND.md supports**: download media by default, default output directory.

### First-Time Setup ⛔ BLOCKING

When EXTEND.md is not found, you **MUST** use \`AskUserQuestion\` to gather preferences before creating EXTEND.md. **NEVER** create EXTEND.md with silent defaults. Generation is BLOCKED until setup completes. Batch all three questions into a single call:

- **Q1 — Media** (header "Media"): "How to handle images and videos in pages?"
  - "Ask each time (Recommended)" — Prompt after each save
  - "Always download" — Download to local \`imgs/\` and \`videos/\`
  - "Never download" — Keep remote URLs
- **Q2 — Output** (header "Output"): "Default output directory?"
  - "url-to-markdown (Recommended)" — Save to \`./url-to-markdown/{domain}/{slug}.md\`
  - User may pick "Other" and type a custom path
- **Q3 — Save** (header "Save"): "Where to save preferences?"
  - "User (Recommended)" — \`~/.baoyu-skills/\` (all projects)
  - "Project" — \`.baoyu-skills/\` (this project only)

After answers, write EXTEND.md, confirm "Preferences saved to [path]", then continue.

Full template: [references/config/first-time-setup.md](references/config/first-time-setup.md).

### Supported Keys

| Key | Default | Values | Description |
|-----|---------|--------|-------------|
| \`download_media\` | \`ask\` | \`ask\` / \`1\` / \`0\` | \`ask\` = prompt each time, \`1\` = always, \`0\` = never |
| \`default_output_dir\` | empty | path or empty | Default output directory (empty = \`./url-to-markdown/\`) |

**EXTEND.md → CLI mapping**:

| EXTEND.md key | CLI argument | Notes |
|---------------|-------------|-------|
| \`download_media: 1\` | \`--download-media\` | Requires \`--output\` to be set |
| \`default_output_dir: ./posts/\` | Agent constructs \`--output ./posts/{domain}/{slug}.md\` | Agent generates path, not a direct flag |

**Value priority**: CLI arguments → EXTEND.md → skill defaults.

## Usage

\`\`\`bash
# Default: headless capture, markdown to stdout
\${READER} <url>

# Save to file
\${READER} <url> --output article.md

# Save with media download
\${READER} <url> --output article.md --download-media

# Wait for interaction (login/CAPTCHA) — auto-detect and continue
\${READER} <url> --wait-for interaction --output article.md

# Wait for interaction — manual control (Enter to continue)
\${READER} <url> --wait-for force --output article.md

# JSON output
\${READER} <url> --format json --output article.json

# Force specific adapter
\${READER} <url> --adapter youtube --output transcript.md
\`\`\`

## Options

| Option | Description |
|--------|-------------|
| \`<url>\` | URL to fetch |
| \`--output <path>\` | Output file path (default: stdout) |
| \`--format <type>\` | Output format: \`markdown\` (default) or \`json\` |
| \`--json\` | Shorthand for \`--format json\` |
| \`--adapter <name>\` | Force adapter: \`x\`, \`youtube\`, \`hn\`, or \`generic\` (default: auto-detect) |
| \`--headless\` | Force headless Chrome (no visible window) |
| \`--wait-for <mode>\` | Interaction wait mode: \`none\` (default), \`interaction\`, or \`force\` |
| \`--wait-for-interaction\` | Alias for \`--wait-for interaction\` |
| \`--wait-for-login\` | Alias for \`--wait-for interaction\` |
| \`--timeout <ms>\` | Page load timeout (default: 30000) |
| \`--interaction-timeout <ms>\` | Login/CAPTCHA wait timeout (default: 600000 = 10 min) |
| \`--interaction-poll-interval <ms>\` | Poll interval for interaction checks (default: 1500) |
| \`--download-media\` | Download images/videos to local \`imgs/\` and \`videos/\`, rewrite markdown links. Requires \`--output\` |
| \`--media-dir <dir>\` | Base directory for downloaded media (default: same as \`--output\` directory) |
| \`--cdp-url <url>\` | Reuse existing Chrome DevTools Protocol endpoint |
| \`--browser-path <path>\` | Custom Chrome/Chromium binary path |
| \`--chrome-profile-dir <path>\` | Chrome user data directory (default: \`BAOYU_CHROME_PROFILE_DIR\` env or \`./baoyu-skills/chrome-profile\`) |
| \`--debug-dir <dir>\` | Write debug artifacts (document.json, markdown.md, page.html, network.json) |

## Agent Quality Gate

**CRITICAL**: treat default headless capture as provisional. Some sites render differently in headless mode and can silently return low-quality content without failing the CLI.

After every headless run, inspect the saved markdown. See [references/quality-gate.md](references/quality-gate.md) for the full checklist, recovery workflow, and capture-mode table. Read it whenever a run looks suspicious or the user asks about login/CAPTCHA handling.

## Output Path Generation

The agent must construct the output file path — \`baoyu-fetch\` does not auto-generate paths.

**Algorithm**:
1. Determine base directory from EXTEND.md \`default_output_dir\` or default \`./url-to-markdown/\`
2. Extract domain from URL (e.g., \`example.com\`)
3. Generate slug from URL path or page title (kebab-case, 2-6 words)
4. Construct: \`{base_dir}/{domain}/{slug}/{slug}.md\` — each URL gets its own directory so media files stay isolated
5. Conflict resolution: append timestamp \`{slug}-YYYYMMDD-HHMMSS/{slug}-YYYYMMDD-HHMMSS.md\`

Pass the constructed path to \`--output\`. Media files (\`--download-media\`) are saved into subdirectories next to the markdown file, keeping each URL's assets self-contained.

## Adapters & Media

See [references/adapters.md](references/adapters.md) for the adapter catalog (X, YouTube, Hacker News, generic), per-adapter notes, the media download flow (\`ask\` / always / never), and the JSON output schema. Read it before answering adapter-specific questions or handling media prompts.

## Environment Variables

| Variable | Description |
|----------|-------------|
| \`BAOYU_CHROME_PROFILE_DIR\` | Chrome user data directory (can also use \`--chrome-profile-dir\`) |

**Troubleshooting**: Chrome not found → use \`--browser-path\`. Timeout → increase \`--timeout\`. Login/CAPTCHA → \`--wait-for interaction\`. Debug → \`--debug-dir\` to inspect captured HTML and network logs.

## Extension Support

Custom configurations via EXTEND.md. See **Preferences** section above for paths and supported keys.`,
  whenToUse: 'Use when user wants to save a webpage as markdown.',
  price: 'Free',
  priceUsdc: 0,
  category: 'skill',
  tags: ["baoyu-skills","url-to-markdown","scraping","automation","devtools","format"],
  stars: 317,
  weeklyInstalls: 175,
  totalPurchases: 423,
  featured: false,
  createdAt: '2026-05-25',
  creatorWallet: '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
  fileUrl: 'https://github.com/JimLiu/baoyu-skills/tree/main/skills/baoyu-url-to-markdown',
  overviewHtml: "<div class=\"skill-enrichment\" style=\"display: flex; flex-direction: column; gap: 32px;\">\n      <div class=\"enrich-hero\" style=\"position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 196, 129, 0.14); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);\">\n        <div style=\"width: 100%; aspect-ratio: 16/6; background: linear-gradient(135deg, #13110f 0%, #17181c 100%); display: flex; align-items: center; justify-content: center; color: var(--color-accent-warm-light);\">\n          <svg width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><polyline points=\"16 18 22 12 16 6\"/><polyline points=\"8 6 2 12 8 18\"/></svg>\n        </div>\n        <div style=\"position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 30%, #0a0806 95%);\"></div>\n        <div style=\"position: absolute; bottom: 20px; left: 24px; right: 24px;\">\n          <h2 style=\"font-family: var(--font-display); color: var(--color-accent-warm-light); margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 0.02em;\">Url To Markdown</h2>\n          <p style=\"margin: 6px 0 0; color: var(--color-text-secondary); font-size: 14px; max-width: 600px;\">Fetch any URL and convert to markdown using baoyu-fetch CLI (Chrome CDP with site-specific adapters).</p>\n        </div>\n      </div>\n\n      <div style=\"display: grid; grid-template-columns: 1.2fr 1.0fr; gap: 32px; align-items: start;\">\n        <div>\n          <h3 style=\"color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;\">SKILL CAPABILITIES</h3>\n          <p style=\"margin-bottom: 24px; font-size: 13.5px; line-height: 1.65; color: var(--color-text-secondary);\">Fetch any URL and convert to markdown using baoyu-fetch CLI (Chrome CDP with site-specific adapters). Built-in adapters for X/Twitter, YouTube transcripts, Hacker News threads, and generic pages via Defuddle. Handles login/CAPTCHA via interaction wait modes. Use when user wants to save a webpage as markdown.</p>\n          \n          <h3 style=\"color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;\">KEY FEATURES</h3>\n          <ul style=\"list-style: none; padding: 0; margin: 0;\">\n            <li style=\"margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;\">\n    <span style=\"color: var(--color-accent); font-weight: bold; margin-top: 2px;\">•</span>\n    <span>End-to-end workflow execution automation</span>\n  </li>\n<li style=\"margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;\">\n    <span style=\"color: var(--color-accent); font-weight: bold; margin-top: 2px;\">•</span>\n    <span>Preset parameters optimized for production use</span>\n  </li>\n<li style=\"margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;\">\n    <span style=\"color: var(--color-accent); font-weight: bold; margin-top: 2px;\">•</span>\n    <span>Self-documenting routines and validation parameters</span>\n  </li>\n          </ul>\n        </div>\n        \n        <div style=\"background: rgba(255, 196, 129, 0.03); border: 1px solid rgba(255, 196, 129, 0.08); border-radius: 12px; padding: 24px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);\">\n          <h4 style=\"color: var(--color-accent-warm-light); margin-top: 0; margin-bottom: 16px; font-family: var(--font-display); font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;\">AUTOMATION STACKS</h4>\n          <div style=\"display: flex; flex-direction: column; gap: 12px;\">\n            <div style=\"background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;\">\n              <div style=\"font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;\">1. PARSE & STRUCTURE</div>\n              <div style=\"font-size: 12px; color: var(--color-text-secondary);\">Analyze context inputs and map constraints recursively.</div>\n            </div>\n            <div style=\"background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;\">\n              <div style=\"font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;\">2. AGENT EVALUATION</div>\n              <div style=\"font-size: 12px; color: var(--color-text-secondary);\">Validate logic flows against preset specifications.</div>\n            </div>\n            <div style=\"background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;\">\n              <div style=\"font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;\">3. DEPLOY & EXPORT</div>\n              <div style=\"font-size: 12px; color: var(--color-text-secondary);\">Write standardized outputs to target environments.</div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>",
  previewHtml: "<div style=\"background: #050c12; border: 1px solid rgba(255, 196, 129, 0.16); border-radius: 12px; font-family: var(--font-mono); color: #ffe8d1; overflow: hidden; max-width: 100%; box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);\">\n      <div style=\"background: rgba(255, 196, 129, 0.06); border-bottom: 1px solid rgba(255, 196, 129, 0.1); padding: 12px 20px; font-size: 11px; font-weight: 700; display: flex; justify-content: space-between; align-items: center; letter-spacing: 0.08em;\">\n        <span>CODE EDITOR & COMPILER</span>\n        <span style=\"color: var(--color-accent-warm-light);\">ONLINE</span>\n      </div>\n      <div style=\"padding: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px;\">\n        <div style=\"display: flex; flex-direction: column; gap: 8px;\">\n          <div style=\"font-size: 11px; color: rgba(255, 232, 209, 0.4);\">INPUT CONTEXT</div>\n          <pre style=\"margin: 0; font-size: 11px; background: rgba(0, 0, 0, 0.3); padding: 10px; border-radius: 6px; border: 1px solid rgba(255, 196, 129, 0.08); color: rgba(255, 232, 209, 0.7); overflow-x: auto;\">{\n  \"status\": \"pending\",\n  \"file\": \"SKILL.md\"\n}</pre>\n        </div>\n        <div style=\"display: flex; flex-direction: column; gap: 8px;\">\n          <div style=\"font-size: 11px; color: rgba(255, 232, 209, 0.4);\">PROCESS OUTPUT</div>\n          <pre style=\"margin: 0; font-size: 11px; background: rgba(255, 196, 129, 0.02); padding: 10px; border-radius: 6px; border: 1px solid rgba(255, 196, 129, 0.08); color: var(--color-accent-warm-light); overflow-x: auto;\">{\n  \"status\": \"success\",\n  \"processed\": true\n}</pre>\n        </div>\n      </div>\n    </div>",
  screenshots: undefined
}
