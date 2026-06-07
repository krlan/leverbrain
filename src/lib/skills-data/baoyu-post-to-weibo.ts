import { SkillListing } from '../skills-data'

export const baoyuPostToWeibo: SkillListing = {
  id: 'baoyu-post-to-weibo',
  author: 'baoyu',
  slug: 'baoyu-post-to-weibo',
  name: 'Post to Weibo',
  tagline: 'Posts content to Weibo (微博).',
  description: 'Posts content to Weibo (微博). Supports regular posts with text, images, and videos, and headline articles (头条文章) with Markdown input via Chrome CDP. Use when user asks to "post to Weibo", "发微博", "发布微博", "publish to Weibo", "share on Weibo", "写微博", or "微博头条文章".',
  readme: `# Post to Weibo

Posts text, images, videos, and long-form articles to Weibo via real Chrome browser (bypasses anti-bot detection).

## Script Directory

**Important**: All scripts are located in the \`scripts/\` subdirectory of this skill.

**Agent Execution Instructions**:
1. Determine this SKILL.md file's directory path as \`{baseDir}\`
2. Script path = \`{baseDir}/scripts/<script-name>.ts\`
3. Replace all \`{baseDir}\` in this document with the actual path
4. Resolve \`\${BUN_X}\` runtime: if \`bun\` installed → \`bun\`; if \`npx\` available → \`npx -y bun\`; else suggest installing bun

**Script Reference**:
| Script | Purpose |
|--------|---------|
| \`scripts/weibo-post.ts\` | Regular posts (text + images) |
| \`scripts/weibo-article.ts\` | Headline article publishing (Markdown) |
| \`scripts/copy-to-clipboard.ts\` | Copy content to clipboard |
| \`scripts/paste-from-clipboard.ts\` | Send real paste keystroke |

## Preferences (EXTEND.md)

Check EXTEND.md in priority order — the first one found wins:

| Priority | Path | Scope |
|----------|------|-------|
| 1 | \`.baoyu-skills/baoyu-post-to-weibo/EXTEND.md\` | Project |
| 2 | \`\${XDG_CONFIG_HOME:-$HOME/.config}/baoyu-skills/baoyu-post-to-weibo/EXTEND.md\` | XDG |
| 3 | \`$HOME/.baoyu-skills/baoyu-post-to-weibo/EXTEND.md\` | User home |

If none found, use defaults.

**EXTEND.md supports**: Default Chrome profile

## Prerequisites

- Google Chrome or Chromium
- \`bun\` runtime
- First run: log in to Weibo manually (session saved)

---

## Regular Posts

Text + images/videos (max 18 files total). Posted on Weibo homepage.

\`\`\`bash
\${BUN_X} {baseDir}/scripts/weibo-post.ts "Hello Weibo!" --image ./photo.png
\${BUN_X} {baseDir}/scripts/weibo-post.ts "Watch this" --video ./clip.mp4
\`\`\`

**Parameters**:
| Parameter | Description |
|-----------|-------------|
| \`<text>\` | Post content (positional) |
| \`--image <path>\` | Image file (repeatable) |
| \`--video <path>\` | Video file (repeatable) |
| \`--profile <dir>\` | Custom Chrome profile |

**Note**: Script opens browser with content filled in. User reviews and publishes manually.

---

## Headline Articles (头条文章)

Long-form Markdown articles published at \`https://card.weibo.com/article/v3/editor\`.

\`\`\`bash
\${BUN_X} {baseDir}/scripts/weibo-article.ts article.md
\${BUN_X} {baseDir}/scripts/weibo-article.ts article.md --cover ./cover.jpg
\`\`\`

**Parameters**:
| Parameter | Description |
|-----------|-------------|
| \`<markdown>\` | Markdown file (positional) |
| \`--cover <path>\` | Cover image |
| \`--title <text>\` | Override title (max 32 chars, truncated if longer) |
| \`--summary <text>\` | Override summary (max 44 chars, auto-regenerated if longer) |
| \`--profile <dir>\` | Custom Chrome profile |

**Frontmatter**: \`title\`, \`summary\`, \`cover_image\` supported in YAML front matter.

**Character Limits**:
- Title: 32 characters max (truncated with warning if longer)
- Summary/导语: 44 characters max (auto-regenerated from content if longer)

**Markdown-to-HTML**: Do NOT pass any \`--theme\` parameter when converting markdown to HTML. Use the default theme (no theme argument).

**Article Workflow**:
1. Opens \`https://card.weibo.com/article/v3/editor\`
2. Clicks "写文章" button, waits for editor to become editable
3. Fills title (validated for 32-char limit)
4. Fills summary/导语 (validated for 44-char limit)
5. Inserts HTML content into ProseMirror editor via paste
6. Replaces image placeholders one by one (copy image → select placeholder → paste)

**Post-Composition Check**: The script automatically verifies after all images are inserted:
- Remaining \`WBIMGPH_\` placeholders in editor content
- Expected vs actual image count

If the check fails (warnings in output), alert the user with the specific issues before they publish.

---

## Post Type Selection

Unless the user explicitly specifies the post type:
- **Markdown file** (\`.md\`) → **Headline Article** (头条文章)
- **Plain text** / text with images → **Regular Post**

## Troubleshooting

### Chrome debug port not ready

If a script fails with \`Chrome debug port not ready\` or \`Unable to connect\`, kill only the CDP Chrome instances (those with \`--remote-debugging-port\` AND the baoyu-skills profile), then retry:

\`\`\`bash
pkill -f "remote-debugging-port.*baoyu-skills/chrome-profile" 2>/dev/null; sleep 2
\`\`\`

**CRITICAL**: Never kill all Chrome processes (\`pkill -f "Google Chrome"\`). Only kill Chrome instances launched by CDP with the baoyu-skills profile directory. The user may have regular Chrome windows open.

**Important**: This should be done automatically -- when encountering this error, kill the CDP Chrome instances and retry the command without asking the user.

## Notes

- First run: manual login required (session persists)
- All scripts only fill content into the browser, user must review and publish manually
- Cross-platform: macOS, Linux, Windows

## Extension Support

Custom configurations via EXTEND.md. See **Preferences** section for paths and supported options.`,
  whenToUse: 'Use when user asks to "post to Weibo", "发微博", "发布微博", "publish to Weibo", "share on Weibo", "写微博", or "微博头条文章".',
  price: 'Free',
  priceUsdc: 0,
  category: 'skill',
  tags: ["baoyu-skills","post-to-weibo","social-media","sharing"],
  stars: 345,
  weeklyInstalls: 154,
  totalPurchases: 422,
  featured: false,
  createdAt: '2026-05-25',
  creatorWallet: '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
  fileUrl: 'https://github.com/JimLiu/baoyu-skills/tree/main/skills/baoyu-post-to-weibo',
  useCases: ["Generate eye-catching text-image grids optimized for Weibo feeds.","Draft promotional updates with appropriate topic hashtags.","Sync announcements across multiple social accounts automatically."],
  exampleUsage: "Publish my content to my Weibo account",
  overviewHtml: "<div class=\"skill-enrichment\" style=\"display: flex; flex-direction: column; gap: 32px;\">\n      <div class=\"enrich-hero\" style=\"position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 196, 129, 0.14); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);\">\n        <div style=\"width: 100%; aspect-ratio: 16/6; background: linear-gradient(135deg, #0d1a1e 0%, #0e1118 100%); display: flex; align-items: center; justify-content: center; color: var(--color-accent-warm-light);\">\n          <svg width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8\"/><polyline points=\"16 6 12 2 8 6\"/><line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"15\"/></svg>\n        </div>\n        <div style=\"position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 30%, #0a0806 95%);\"></div>\n        <div style=\"position: absolute; bottom: 20px; left: 24px; right: 24px;\">\n          <h2 style=\"font-family: var(--font-display); color: var(--color-accent-warm-light); margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 0.02em;\">Post to Weibo</h2>\n          <p style=\"margin: 6px 0 0; color: var(--color-text-secondary); font-size: 14px; max-width: 600px;\">Posts content to Weibo (微博).</p>\n        </div>\n      </div>\n\n      <div style=\"display: grid; grid-template-columns: 1.2fr 1.0fr; gap: 32px; align-items: start;\">\n        <div>\n          <h3 style=\"color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;\">SKILL CAPABILITIES</h3>\n          <p style=\"margin-bottom: 24px; font-size: 13.5px; line-height: 1.65; color: var(--color-text-secondary);\">Posts content to Weibo (微博). Supports regular posts with text, images, and videos, and headline articles (头条文章) with Markdown input via Chrome CDP. Use when user asks to \"post to Weibo\", \"发微博\", \"发布微博\", \"publish to Weibo\", \"share on Weibo\", \"写微博\", or \"微博头条文章\".</p>\n          \n          <h3 style=\"color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;\">KEY FEATURES</h3>\n          <ul style=\"list-style: none; padding: 0; margin: 0;\">\n            <li style=\"margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;\">\n    <span style=\"color: var(--color-accent); font-weight: bold; margin-top: 2px;\">•</span>\n    <span>End-to-end workflow execution automation</span>\n  </li>\n<li style=\"margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;\">\n    <span style=\"color: var(--color-accent); font-weight: bold; margin-top: 2px;\">•</span>\n    <span>Preset parameters optimized for production use</span>\n  </li>\n<li style=\"margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;\">\n    <span style=\"color: var(--color-accent); font-weight: bold; margin-top: 2px;\">•</span>\n    <span>Self-documenting routines and validation parameters</span>\n  </li>\n          </ul>\n        </div>\n        \n        <div style=\"background: rgba(255, 196, 129, 0.03); border: 1px solid rgba(255, 196, 129, 0.08); border-radius: 12px; padding: 24px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);\">\n          <h4 style=\"color: var(--color-accent-warm-light); margin-top: 0; margin-bottom: 16px; font-family: var(--font-display); font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;\">AUTOMATION STACKS</h4>\n          <div style=\"display: flex; flex-direction: column; gap: 12px;\">\n            <div style=\"background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;\">\n              <div style=\"font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;\">1. PARSE & STRUCTURE</div>\n              <div style=\"font-size: 12px; color: var(--color-text-secondary);\">Analyze context inputs and map constraints recursively.</div>\n            </div>\n            <div style=\"background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;\">\n              <div style=\"font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;\">2. AGENT EVALUATION</div>\n              <div style=\"font-size: 12px; color: var(--color-text-secondary);\">Validate logic flows against preset specifications.</div>\n            </div>\n            <div style=\"background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;\">\n              <div style=\"font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;\">3. DEPLOY & EXPORT</div>\n              <div style=\"font-size: 12px; color: var(--color-text-secondary);\">Write standardized outputs to target environments.</div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>",
  previewHtml: "<div style=\"background: #050c12; border: 1px solid rgba(255, 196, 129, 0.16); border-radius: 12px; font-family: var(--font-mono); color: #ffe8d1; overflow: hidden; max-width: 100%; box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);\">\n        <div style=\"background: rgba(255, 196, 129, 0.06); border-bottom: 1px solid rgba(255, 196, 129, 0.1); padding: 12px 20px; font-size: 11px; font-weight: 700; display: flex; justify-content: space-between; align-items: center; letter-spacing: 0.08em;\">\n          <span>SIMULATED SOCIAL PUBLISHER</span>\n          <span style=\"color: #64b4ff;\">ACTIVE</span>\n        </div>\n        <div style=\"padding: 20px; display: flex; flex-direction: column; gap: 12px;\">\n          <div style=\"background: rgba(0, 0, 0, 0.2); border: 1px solid rgba(255, 196, 129, 0.08); border-radius: 8px; padding: 16px;\">\n            <div style=\"font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 8px;\">PUBLISHING PREVIEW</div>\n            <div style=\"font-size: 13px; line-height: 1.5; color: var(--color-text-secondary); margin-bottom: 12px;\">\n              🚀 Exciting announcement! We just integrated all 21 skills from baoyu-skills directly into Leverbrain. Deploy them in seconds. #Web3 #AI\n            </div>\n            <div style=\"display: flex; gap: 16px; font-size: 11px; color: rgba(255, 232, 209, 0.4);\">\n              <span>💬 12 replies</span>\n              <span>🔄 45 reposts</span>\n              <span>❤️ 188 likes</span>\n            </div>\n          </div>\n        </div>\n      </div>",
  screenshots: undefined
}
