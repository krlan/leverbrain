import { SkillListing } from '../skills-data'

export const baoyuDangerXToMarkdown: SkillListing = {
  id: 'baoyu-danger-x-to-markdown',
  author: 'baoyu',
  slug: 'baoyu-danger-x-to-markdown',
  name: 'Danger x to markdown',
  tagline: 'Converts X (Twitter) tweets and articles to markdown with YAML front matter.',
  description: 'Converts X (Twitter) tweets and articles to markdown with YAML front matter. Uses reverse-engineered API requiring user consent. Use when user mentions "X to markdown", "tweet to markdown", "save tweet", or provides x.com/twitter.com URLs for conversion.',
  readme: `# X to Markdown

Converts X content to markdown:
- Tweets/threads → Markdown with YAML front matter
- X Articles → Full content extraction

## User Input Tools

When this skill prompts the user, follow this tool-selection rule (priority order):

1. **Prefer built-in user-input tools** exposed by the current agent runtime — e.g., \`AskUserQuestion\`, \`request_user_input\`, \`clarify\`, \`ask_user\`, or any equivalent.
2. **Fallback**: if no such tool exists, emit a numbered plain-text message and ask the user to reply with the chosen number/answer for each question.
3. **Batching**: if the tool supports multiple questions per call, combine all applicable questions into a single call; if only single-question, ask them one at a time in priority order.

Concrete \`AskUserQuestion\` references below are examples — substitute the local equivalent in other runtimes.

## Script Directory

Scripts located in \`scripts/\` subdirectory.

**Path Resolution**:
1. \`{baseDir}\` = this SKILL.md's directory
2. Script path = \`{baseDir}/scripts/main.ts\`
3. Resolve \`\${BUN_X}\` runtime: if \`bun\` installed → \`bun\`; if \`npx\` available → \`npx -y bun\`; else suggest installing bun

## Consent Requirement

**Before any conversion**, check and obtain consent.

### Consent Flow

**Step 1**: Check consent file

\`\`\`bash
# macOS
cat ~/Library/Application\ Support/baoyu-skills/x-to-markdown/consent.json

# Linux
cat ~/.local/share/baoyu-skills/x-to-markdown/consent.json
\`\`\`

**Step 2**: If \`accepted: true\` and \`disclaimerVersion: "1.0"\` → print warning and proceed:
\`\`\`
Warning: Using reverse-engineered X API. Accepted on: <acceptedAt>
\`\`\`

**Step 3**: If missing or version mismatch → display disclaimer:
\`\`\`
DISCLAIMER

This tool uses a reverse-engineered X API, NOT official.

Risks:
- May break if X changes API
- No guarantees or support
- Possible account restrictions
- Use at your own risk

Accept terms and continue?
\`\`\`

Use \`AskUserQuestion\` with options: "Yes, I accept" | "No, I decline"

**Step 4**: On accept → create consent file:
\`\`\`json
{
  "version": 1,
  "accepted": true,
  "acceptedAt": "<ISO timestamp>",
  "disclaimerVersion": "1.0"
}
\`\`\`

**Step 5**: On decline → output "User declined. Exiting." and stop.

## Preferences (EXTEND.md)

Check EXTEND.md in priority order — the first one found wins:

| Priority | Path | Scope |
|----------|------|-------|
| 1 | \`.baoyu-skills/baoyu-danger-x-to-markdown/EXTEND.md\` | Project |
| 2 | \`\${XDG_CONFIG_HOME:-$HOME/.config}/baoyu-skills/baoyu-danger-x-to-markdown/EXTEND.md\` | XDG |
| 3 | \`$HOME/.baoyu-skills/baoyu-danger-x-to-markdown/EXTEND.md\` | User home |

| Result | Action |
|--------|--------|
| Found | Read, parse, apply settings |
| Not found | **MUST** run first-time setup (see below) — do NOT silently create defaults |

**EXTEND.md supports**: Download media by default, default output directory.

### First-Time Setup (BLOCKING)

**CRITICAL**: When EXTEND.md is not found, you **MUST use \`AskUserQuestion\`** to ask the user for their preferences before creating EXTEND.md. **NEVER** create EXTEND.md with defaults without asking. This is a **BLOCKING** operation — do NOT proceed with any conversion until setup is complete.

Use \`AskUserQuestion\` with ALL questions in ONE call:

**Question 1** — header: "Media", question: "How to handle images and videos in tweets?"
- "Ask each time (Recommended)" — After saving markdown, ask whether to download media
- "Always download" — Always download media to local imgs/ and videos/ directories
- "Never download" — Keep original remote URLs in markdown

**Question 2** — header: "Output", question: "Default output directory?"
- "x-to-markdown (Recommended)" — Save to ./x-to-markdown/{username}/{tweet-id}.md
- (User may choose "Other" to type a custom path)

**Question 3** — header: "Save", question: "Where to save preferences?"
- "User (Recommended)" — ~/.baoyu-skills/ (all projects)
- "Project" — .baoyu-skills/ (this project only)

After user answers, create EXTEND.md at the chosen location, confirm "Preferences saved to [path]", then continue.

Full reference: [references/config/first-time-setup.md](references/config/first-time-setup.md)

### Supported Keys

| Key | Default | Values | Description |
|-----|---------|--------|-------------|
| \`download_media\` | \`ask\` | \`ask\` / \`1\` / \`0\` | \`ask\` = prompt each time, \`1\` = always download, \`0\` = never |
| \`default_output_dir\` | empty | path or empty | Default output directory (empty = \`./x-to-markdown/\`) |

**Value priority**:
1. CLI arguments (\`--download-media\`, \`-o\`)
2. EXTEND.md
3. Skill defaults

## Usage

\`\`\`bash
\${BUN_X} {baseDir}/scripts/main.ts <url>
\${BUN_X} {baseDir}/scripts/main.ts <url> -o output.md
\${BUN_X} {baseDir}/scripts/main.ts <url> --download-media
\${BUN_X} {baseDir}/scripts/main.ts <url> --json
\`\`\`

## Options

| Option | Description |
|--------|-------------|
| \`<url>\` | Tweet or article URL |
| \`-o <path>\` | Output path |
| \`--json\` | JSON output |
| \`--download-media\` | Download image/video assets to local \`imgs/\` and \`videos/\`, and rewrite markdown links to local relative paths |
| \`--login\` | Refresh cookies only |

## Supported URLs

- \`https://x.com/<user>/status/<id>\`
- \`https://twitter.com/<user>/status/<id>\`
- \`https://x.com/i/article/<id>\`

## Output

\`\`\`markdown
---
url: "https://x.com/user/status/123"
author: "Name (@user)"
tweetCount: 3
coverImage: "https://pbs.twimg.com/media/example.jpg"
---

Content...
\`\`\`

**File structure**: \`x-to-markdown/{username}/{tweet-id}/{content-slug}.md\`

When \`--download-media\` is enabled:
- Images are saved to \`imgs/\` next to the markdown file
- Videos are saved to \`videos/\` next to the markdown file
- Markdown media links are rewritten to local relative paths

## Media Download Workflow

Based on \`download_media\` setting in EXTEND.md:

| Setting | Behavior |
|---------|----------|
| \`1\` (always) | Run script with \`--download-media\` flag |
| \`0\` (never) | Run script without \`--download-media\` flag |
| \`ask\` (default) | Follow the ask-each-time flow below |

### Ask-Each-Time Flow

1. Run script **without** \`--download-media\` → markdown saved
2. Check saved markdown for remote media URLs (\`https://\` in image/video links)
3. **If no remote media found** → done, no prompt needed
4. **If remote media found** → use \`AskUserQuestion\`:
   - header: "Media", question: "Download N images/videos to local files?"
   - "Yes" — Download to local directories
   - "No" — Keep remote URLs
5. If user confirms → run script **again** with \`--download-media\` (overwrites markdown with localized links)

## Authentication

1. **Environment variables** (preferred): \`X_AUTH_TOKEN\`, \`X_CT0\`
2. **Chrome login** (fallback): Auto-opens Chrome, caches cookies locally

## Extension Support

Custom configurations via EXTEND.md. See **Preferences** section for paths and supported options.`,
  whenToUse: 'Use when user mentions "X to markdown", "tweet to markdown", "save tweet", or provides x.com/twitter.com URLs for conversion.',
  price: 'Free',
  priceUsdc: 0,
  category: 'skill',
  tags: ["baoyu-skills","danger-x-to-markdown","social-media","sharing","scraping","automation","devtools","format"],
  stars: 682,
  weeklyInstalls: 66,
  totalPurchases: 452,
  featured: false,
  createdAt: '2026-05-25',
  creatorWallet: '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
  fileUrl: 'https://github.com/JimLiu/baoyu-skills/tree/main/skills/baoyu-danger-x-to-markdown',
  useCases: ["Archive educational X threads into a local knowledge base.","Convert customer feedback threads into structured feature requests.","Back up social posts and links to personal obsidian vaults."],
  exampleUsage: "Convert my X/Twitter thread into clean markdown format",
  overviewHtml: "<div class=\"skill-enrichment\" style=\"display: flex; flex-direction: column; gap: 32px;\">\n      <div class=\"enrich-hero\" style=\"position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 196, 129, 0.14); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);\">\n        <div style=\"width: 100%; aspect-ratio: 16/6; background: linear-gradient(135deg, #0d1a1e 0%, #0e1118 100%); display: flex; align-items: center; justify-content: center; color: var(--color-accent-warm-light);\">\n          <svg width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8\"/><polyline points=\"16 6 12 2 8 6\"/><line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"15\"/></svg>\n        </div>\n        <div style=\"position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 30%, #0a0806 95%);\"></div>\n        <div style=\"position: absolute; bottom: 20px; left: 24px; right: 24px;\">\n          <h2 style=\"font-family: var(--font-display); color: var(--color-accent-warm-light); margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 0.02em;\">Danger x to markdown</h2>\n          <p style=\"margin: 6px 0 0; color: var(--color-text-secondary); font-size: 14px; max-width: 600px;\">Converts X (Twitter) tweets and articles to markdown with YAML front matter.</p>\n        </div>\n      </div>\n\n      <div style=\"display: grid; grid-template-columns: 1.2fr 1.0fr; gap: 32px; align-items: start;\">\n        <div>\n          <h3 style=\"color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;\">SKILL CAPABILITIES</h3>\n          <p style=\"margin-bottom: 24px; font-size: 13.5px; line-height: 1.65; color: var(--color-text-secondary);\">Converts X (Twitter) tweets and articles to markdown with YAML front matter. Uses reverse-engineered API requiring user consent. Use when user mentions \"X to markdown\", \"tweet to markdown\", \"save tweet\", or provides x.com/twitter.com URLs for conversion.</p>\n          \n          <h3 style=\"color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;\">KEY FEATURES</h3>\n          <ul style=\"list-style: none; padding: 0; margin: 0;\">\n            <li style=\"margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;\">\n    <span style=\"color: var(--color-accent); font-weight: bold; margin-top: 2px;\">•</span>\n    <span>End-to-end workflow execution automation</span>\n  </li>\n<li style=\"margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;\">\n    <span style=\"color: var(--color-accent); font-weight: bold; margin-top: 2px;\">•</span>\n    <span>Preset parameters optimized for production use</span>\n  </li>\n<li style=\"margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;\">\n    <span style=\"color: var(--color-accent); font-weight: bold; margin-top: 2px;\">•</span>\n    <span>Self-documenting routines and validation parameters</span>\n  </li>\n          </ul>\n        </div>\n        \n        <div style=\"background: rgba(255, 196, 129, 0.03); border: 1px solid rgba(255, 196, 129, 0.08); border-radius: 12px; padding: 24px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);\">\n          <h4 style=\"color: var(--color-accent-warm-light); margin-top: 0; margin-bottom: 16px; font-family: var(--font-display); font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;\">AUTOMATION STACKS</h4>\n          <div style=\"display: flex; flex-direction: column; gap: 12px;\">\n            <div style=\"background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;\">\n              <div style=\"font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;\">1. PARSE & STRUCTURE</div>\n              <div style=\"font-size: 12px; color: var(--color-text-secondary);\">Analyze context inputs and map constraints recursively.</div>\n            </div>\n            <div style=\"background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;\">\n              <div style=\"font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;\">2. AGENT EVALUATION</div>\n              <div style=\"font-size: 12px; color: var(--color-text-secondary);\">Validate logic flows against preset specifications.</div>\n            </div>\n            <div style=\"background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;\">\n              <div style=\"font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;\">3. DEPLOY & EXPORT</div>\n              <div style=\"font-size: 12px; color: var(--color-text-secondary);\">Write standardized outputs to target environments.</div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>",
  previewHtml: "<div style=\"background: #050c12; border: 1px solid rgba(255, 196, 129, 0.16); border-radius: 12px; font-family: var(--font-mono); color: #ffe8d1; overflow: hidden; max-width: 100%; box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);\">\n        <div style=\"background: rgba(255, 196, 129, 0.06); border-bottom: 1px solid rgba(255, 196, 129, 0.1); padding: 12px 20px; font-size: 11px; font-weight: 700; display: flex; justify-content: space-between; align-items: center; letter-spacing: 0.08em;\">\n          <span>SIMULATED SOCIAL PUBLISHER</span>\n          <span style=\"color: #64b4ff;\">ACTIVE</span>\n        </div>\n        <div style=\"padding: 20px; display: flex; flex-direction: column; gap: 12px;\">\n          <div style=\"background: rgba(0, 0, 0, 0.2); border: 1px solid rgba(255, 196, 129, 0.08); border-radius: 8px; padding: 16px;\">\n            <div style=\"font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 8px;\">PUBLISHING PREVIEW</div>\n            <div style=\"font-size: 13px; line-height: 1.5; color: var(--color-text-secondary); margin-bottom: 12px;\">\n              🚀 Exciting announcement! We just integrated all 21 skills from baoyu-skills directly into Leverbrain. Deploy them in seconds. #Web3 #AI\n            </div>\n            <div style=\"display: flex; gap: 16px; font-size: 11px; color: rgba(255, 232, 209, 0.4);\">\n              <span>💬 12 replies</span>\n              <span>🔄 45 reposts</span>\n              <span>❤️ 188 likes</span>\n            </div>\n          </div>\n        </div>\n      </div>",
  screenshots: undefined
}
