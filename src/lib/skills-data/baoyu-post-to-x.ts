import { SkillListing } from '../skills-data'

export const baoyuPostToX: SkillListing = {
  id: 'baoyu-post-to-x',
  author: 'baoyu',
  slug: 'baoyu-post-to-x',
  name: 'Post To X',
  tagline: 'Posts content and articles to X (Twitter).',
  description: 'Posts content and articles to X (Twitter). Supports regular posts with images/videos and X Articles (long-form Markdown). In Codex, honor explicit requests for the Codex Chrome plugin/@chrome by using the Chrome Extension workflow; otherwise use Chrome Computer Use when available and fall back to real Chrome CDP scripts only when allowed. Use when user asks to "post to X", "tweet", "publish to Twitter", or "share on X".',
  readme: `# Post to X (Twitter)

Posts text, images, videos, and long-form articles to X via a real Chrome browser.

In Codex, do not conflate these browser paths:
- **Codex Chrome plugin / \`@chrome\` / Chrome Extension**: use the bundled \`chrome:Chrome\` skill and its Node REPL browser client. This is required whenever the user says "Codex Chrome plugin", "Codex 自带的 Chrome 插件", \`@chrome\`, or similar.
- **Chrome Computer Use**: use \`mcp__computer_use__.*\` against the visible Google Chrome UI only when the user asks for Computer Use or no Chrome-plugin preference is stated and Computer Use is available.
- **CDP script mode**: use only as a fallback when the selected mode is unavailable or the user explicitly asks for CDP/script mode.

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
| \`scripts/x-browser.ts\` | Regular posts (text + images), CDP fallback |
| \`scripts/x-video.ts\` | Video posts (text + video), CDP fallback |
| \`scripts/x-quote.ts\` | Quote tweet with comment, CDP fallback |
| \`scripts/x-article.ts\` | Long-form article publishing (Markdown), CDP fallback |
| \`scripts/md-to-html.ts\` | Markdown → HTML conversion |
| \`scripts/copy-to-clipboard.ts\` | Copy content to clipboard |
| \`scripts/paste-from-clipboard.ts\` | Send real paste keystroke |
| \`scripts/check-paste-permissions.ts\` | Verify environment & permissions |

## Execution Mode Selection (Required)

Choose exactly one mode before interacting with X:

1. If the user explicitly asks for the Codex Chrome plugin, \`@chrome\`, the Chrome extension, or "Codex 自带的 Chrome 插件", use **Codex Chrome Plugin Mode**. Do not call Computer Use first.
2. If the user explicitly asks for Chrome Computer Use, use **Chrome Computer Use Mode**. Do not fall back to CDP, Playwright, the in-app Browser, or the Chrome plugin without telling the user and getting approval.
3. If the user explicitly asks for CDP/script mode, use **CDP Script Mode**.
4. Otherwise, prefer **Chrome Computer Use Mode**. For Markdown **X Articles with local content images**, use the tested X editor flow: insert each body image from the toolbar (\`Insert\` -> \`Media\` -> dialog icon button \`Add photos or video\`) at its placeholder, then delete the placeholder text. Use CDP Script Mode only when the selected browser-control mode is unavailable or the UI upload/selection flow is unreliable.

Never use the in-app Browser for X publishing workflows.

## Codex Chrome Plugin Mode

Use this mode whenever the user requests the Codex Chrome plugin, \`@chrome\`, or the Chrome Extension path. This uses the user's real Chrome profile and X login through the bundled Chrome plugin, not Computer Use and not CDP.

**Setup**
1. Load the \`chrome:Chrome\` skill before browser work.
2. Use \`tool_search\` for \`node_repl js\` if the Node REPL \`js\` tool is not already visible.
3. Initialize the Chrome browser client exactly as the Chrome skill specifies, then run a lightweight call such as \`browser.user.openTabs()\` to verify the extension connection.
4. If the first lightweight call fails, wait 2 seconds and retry once. If it still fails, follow the Chrome skill's extension checks and recovery steps. If checks pass but communication still fails, ask the user before opening a new Chrome window. Do not switch to Computer Use or CDP silently.

**General rules**
- Use the Chrome plugin's \`browser.tabs.*\`, \`tab.playwright.*\`, \`tab.cua.*\`, and file chooser APIs for X UI actions.
- Shell commands are allowed for Markdown preprocessing and rich-HTML clipboard preparation. For X Article body images, do not rely on image clipboard paste; use the editor's \`Insert\` -> \`Media\` upload flow.
- If a file upload fails with \`Not allowed\`, tell the user: \`To enable file upload, go to chrome://extensions in Chrome, click Details under the Codex extension, and enable "Allow access to file URLs." See https://developers.openai.com/codex/app/chrome-extension#upload-files for details.\`
- If the Chrome plugin reports \`native pipe is closed\`, retry the lightweight browser call once after 2 seconds, then run the Chrome skill health checks. If Chrome is running, the extension is enabled, and the native host manifest is correct, ask permission to open a new Chrome window and retry. Do not keep sending browser actions through the broken pipe.
- Never click \`Publish\`, \`Post\`, or any externally visible submit action without explicit final confirmation from the user in the current conversation.

**X Articles**
1. Convert Markdown and keep the image map:
   \`\`\`bash
   \${BUN_X} {baseDir}/scripts/md-to-html.ts article.md --save-html /tmp/x-article-body.html > /tmp/x-article.json
   \`\`\`
2. Read the JSON output for \`title\`, \`coverImage\`, and \`contentImages\` (\`placeholder\` → \`localPath\`).
3. Open or create the article draft at \`https://x.com/compose/articles\`.
4. Upload the cover with the Chrome plugin file chooser flow. If upload is blocked by extension permissions, stop and report the exact permission fix above.
5. Fill the title, then copy rich HTML:
   \`\`\`bash
   \${BUN_X} {baseDir}/scripts/copy-to-clipboard.ts html --file /tmp/x-article-body.html
   \`\`\`
6. Paste into the article body with a real paste keystroke through the Chrome plugin. On macOS use \`Meta+V\`.
7. Verify the editor text contains the article body and \`XIMGPH_\` placeholders. Do not rely on \`tab.clipboard.readText()\` as proof of the system clipboard after shell clipboard writes; on macOS verify with \`pbpaste\` if needed.
8. For each \`contentImages\` item in placeholder order:
   - Locate the visible placeholder text (\`XIMGPH_N\`) and click it to place the caret there.
   - Open the toolbar menu \`Insert\` -> \`Media\`.
   - In the modal, click the icon button with \`aria-label="Add photos or video"\`; do not click the text/dropzone or hidden file input.
   - Use the file chooser to upload that image's \`localPath\`.
   - After the image appears, if \`XIMGPH_N\` remains above it, select exactly that placeholder and press \`Delete\` first. Use \`Backspace\` only if \`Delete\` fails and the selected text is confirmed to be exactly the placeholder.
   - Verify the placeholder count for that \`XIMGPH_N\` is \`0\`.
9. Open Preview and verify title, cover, body, links, and images.
10. Ask for explicit confirmation before clicking \`Publish\`.

## Preferences (EXTEND.md)

Check EXTEND.md in priority order — the first one found wins:

| Priority | Path | Scope |
|----------|------|-------|
| 1 | \`.baoyu-skills/baoyu-post-to-x/EXTEND.md\` | Project |
| 2 | \`\${XDG_CONFIG_HOME:-$HOME/.config}/baoyu-skills/baoyu-post-to-x/EXTEND.md\` | XDG |
| 3 | \`$HOME/.baoyu-skills/baoyu-post-to-x/EXTEND.md\` | User home |

If none found, use defaults.

**EXTEND.md supports**: Default Chrome profile

## Prerequisites

- Google Chrome or Chromium
- \`bun\` runtime
- First run: log in to X manually (session saved)

## Pre-flight Check (Optional)

Before first use, suggest running the environment check. User can skip if they prefer.

\`\`\`bash
\${BUN_X} {baseDir}/scripts/check-paste-permissions.ts
\`\`\`

Checks: Chrome, profile isolation, Bun, Accessibility, clipboard, paste keystroke, Chrome conflicts.

**If any check fails**, provide fix guidance per item:

| Check | Fix |
|-------|-----|
| Chrome | Install Chrome or set \`X_BROWSER_CHROME_PATH\` env var |
| Profile dir | Shared profile at \`baoyu-skills/chrome-profile\` (see CLAUDE.md Chrome Profile section) |
| Bun runtime | \`brew install oven-sh/bun/bun\` (macOS) or \`npm install -g bun\` |
| Accessibility (macOS) | System Settings → Privacy & Security → Accessibility → enable terminal app |
| Clipboard copy | Ensure Swift/AppKit available (macOS Xcode CLI tools: \`xcode-select --install\`) |
| Paste keystroke (macOS) | Same as Accessibility fix above |
| Paste keystroke (Linux) | Install \`xdotool\` (X11) or \`ydotool\` (Wayland) |

## References

- **Regular Posts**: See \`references/regular-posts.md\` for manual workflow, troubleshooting, and technical details
- **X Articles**: See \`references/articles.md\` for long-form article publishing guide

---

## Chrome Computer Use Mode

Use this mode when the user explicitly asks for Chrome Computer Use, or when no Chrome-plugin preference is stated and Codex can control \`Google Chrome\` with Computer Use. This uses the user's existing Chrome window, cookies, login, extensions, and X session.

**General rules**:
- Start each assistant turn that controls Chrome by calling \`get_app_state\` for \`Google Chrome\`.
- Prefer element-index actions when available; use coordinates only for editor text selection or drag selection.
- Do not use the in-app Browser, the Chrome plugin, Playwright, or CDP for X UI actions in this mode unless the user approves a mode change.
- Never click \`Publish\`, \`Post\`, or any externally visible submit action without an explicit final confirmation from the user in the current conversation.

**Regular posts**:
1. Open or navigate Chrome to \`https://x.com/compose/post\`.
2. Type the post text into the composer using Computer Use.
3. For each image, run:
   \`\`\`bash
   \${BUN_X} {baseDir}/scripts/copy-to-clipboard.ts image /absolute/path/to/image.png
   \`\`\`
4. Paste with Computer Use (\`super+v\` on macOS, \`control+v\` on Windows/Linux), then wait until X finishes uploading media.
5. Ask for confirmation before clicking \`Post\`.

**Video posts**:
1. Open or navigate Chrome to \`https://x.com/compose/post\`.
2. Type the post text into the composer.
3. Use the visible media upload/file picker UI to attach the video.
4. Wait for upload and processing to complete.
5. Ask for confirmation before clicking \`Post\`.

**Quote tweets**:
1. Open the tweet URL in Chrome.
2. Use the visible quote/repost UI to choose Quote.
3. Type the comment.
4. Ask for confirmation before clicking \`Post\`.

**X Articles**:
1. Convert Markdown and keep the image map:
   \`\`\`bash
   \${BUN_X} {baseDir}/scripts/md-to-html.ts article.md --save-html /tmp/x-article-body.html > /tmp/x-article.json
   \`\`\`
2. Read the JSON output for \`title\`, \`coverImage\`, and \`contentImages\` (\`placeholder\` → \`localPath\`).
3. In Chrome, open \`https://x.com/compose/articles\`, create or open the draft, upload the cover if present, and fill the title.
4. Copy rich HTML to the clipboard:
   \`\`\`bash
   \${BUN_X} {baseDir}/scripts/copy-to-clipboard.ts html --file /tmp/x-article-body.html
   \`\`\`
5. Paste into the article body with Computer Use.
6. For each \`contentImages\` entry in placeholder order:
   - Locate the exact visible placeholder text such as \`XIMGPH_3\` and click it to set the insertion point.
   - Open the toolbar \`Insert\` dropdown, choose \`Media\`, then click the modal's icon button labeled \`Add photos or video\`.
   - Use the native file picker to choose the image's \`localPath\`.
   - Wait until the image block appears and any upload activity is finished.
   - If the placeholder remains above the inserted image, reselect exactly that placeholder text and press \`Delete\` first. Use \`Backspace\` only if \`Delete\` fails and the selected text is confirmed to be exactly the placeholder.
7. Verify no \`XIMGPH_\` placeholders remain and the expected images appear.
8. Open Preview and verify title, cover, body, links, and images.
9. Ask for explicit confirmation before clicking \`Publish\`.

If Computer Use selection, toolbar upload, or file-picker control becomes unreliable, stop and report the blocker instead of switching to the Chrome plugin or CDP silently.

---

## CDP Script Mode (Fallback)

Use the script sections below only when the selected browser-control mode is unavailable, unreliable, or explicitly not requested. These scripts launch or reuse a real Chrome instance via CDP and keep the browser open for review.

Do not use CDP Script Mode when the user explicitly requires the Codex Chrome plugin or Chrome Computer Use unless the user approves the fallback after you explain the blocker.

---

## Post Type Selection

Unless the user explicitly specifies the post type:
- **Plain text** + within 10,000 characters → **Regular Post** (Premium members support up to 10,000 characters, non-Premium: 280)
- **Markdown file** (.md) → **X Article**

## Regular Posts

\`\`\`bash
\${BUN_X} {baseDir}/scripts/x-browser.ts "Hello!" --image ./photo.png
\`\`\`

**Parameters**:
| Parameter | Description |
|-----------|-------------|
| \`<text>\` | Post content (positional) |
| \`--image <path>\` | Image file (repeatable, max 4) |
| \`--profile <dir>\` | Custom Chrome profile |

**Note**: Script opens browser with content filled in. User reviews and publishes manually.

**Codex mode note**: If the user explicitly requested the Codex Chrome plugin, use **Codex Chrome Plugin Mode**. Otherwise, if Chrome Computer Use is enabled, use **Chrome Computer Use Mode** instead of running \`x-browser.ts\`.

---

## Video Posts

Text + video file.

\`\`\`bash
\${BUN_X} {baseDir}/scripts/x-video.ts "Check this out!" --video ./clip.mp4
\`\`\`

**Parameters**:
| Parameter | Description |
|-----------|-------------|
| \`<text>\` | Post content (positional) |
| \`--video <path>\` | Video file (MP4, MOV, WebM) |
| \`--profile <dir>\` | Custom Chrome profile |

**Note**: Script opens browser with content filled in. User reviews and publishes manually.

**Codex mode note**: If the user explicitly requested the Codex Chrome plugin, use **Codex Chrome Plugin Mode**. Otherwise, if Chrome Computer Use is enabled, use **Chrome Computer Use Mode** instead of running \`x-video.ts\`.

**Limits**: Regular 140s max, Premium 60min. Processing: 30-60s.

---

## Quote Tweets

Quote an existing tweet with comment.

\`\`\`bash
\${BUN_X} {baseDir}/scripts/x-quote.ts https://x.com/user/status/123 "Great insight!"
\`\`\`

**Parameters**:
| Parameter | Description |
|-----------|-------------|
| \`<tweet-url>\` | URL to quote (positional) |
| \`<comment>\` | Comment text (positional, optional) |
| \`--profile <dir>\` | Custom Chrome profile |

**Note**: Script opens browser with content filled in. User reviews and publishes manually.

**Codex mode note**: If the user explicitly requested the Codex Chrome plugin, use **Codex Chrome Plugin Mode**. Otherwise, if Chrome Computer Use is enabled, use **Chrome Computer Use Mode** instead of running \`x-quote.ts\`.

---

## X Articles

Long-form Markdown articles (requires X Premium).

\`\`\`bash
\${BUN_X} {baseDir}/scripts/x-article.ts article.md
\${BUN_X} {baseDir}/scripts/x-article.ts article.md --cover ./cover.jpg
\`\`\`

**Parameters**:
| Parameter | Description |
|-----------|-------------|
| \`<markdown>\` | Markdown file (positional) |
| \`--cover <path>\` | Cover image |
| \`--title <text>\` | Override title |

**Frontmatter**: \`title\`, \`cover_image\` supported in YAML front matter.

**Codex mode note**: If the user explicitly requested the Codex Chrome plugin, follow **Codex Chrome Plugin Mode** above. If the user explicitly requested Chrome Computer Use, follow **Chrome Computer Use Mode**. Otherwise, prefer Chrome Computer Use; for Markdown articles with local content images, use the toolbar \`Insert\` -> \`Media\` image-upload workflow before falling back to \`x-article.ts\` in **CDP Script Mode**.

**CDP fallback note**: The script opens browser with article filled in. User reviews and publishes manually unless \`--submit\` is used.

**Publish safety**: Do not use \`--submit\` or click \`Publish\` unless the user explicitly confirms the final public publish action.

**Post-Composition Check**: The script automatically verifies after all images are inserted:
- Remaining \`XIMGPH_\` placeholders in editor content
- Expected vs actual image count

If the check fails (warnings in output), alert the user with the specific issues before they publish.

---

## Troubleshooting

### Chrome debug port not ready

CDP fallback only: if a script fails with \`Chrome debug port not ready\` or \`Unable to connect\`, kill existing Chrome CDP instances first, then retry:

\`\`\`bash
pkill -f "Chrome.*remote-debugging-port" 2>/dev/null; pkill -f "Chromium.*remote-debugging-port" 2>/dev/null; sleep 2
\`\`\`

**Important**: This should be done automatically — when encountering this error, kill Chrome CDP instances and retry the command without asking the user.

## Notes

- First run: manual login required (session persists)
- In Codex Chrome Plugin Mode and Chrome Computer Use Mode, use the user's existing Chrome session and do not launch a separate CDP profile
- CDP scripts only fill content into the browser by default; user must review and publish manually unless \`--submit\` is explicitly used
- Cross-platform: macOS, Linux, Windows

## Extension Support

Custom configurations via EXTEND.md. See **Preferences** section for paths and supported options.`,
  whenToUse: 'Use when available and fall back to real Chrome CDP scripts only when allowed. Use when user asks to "post to X", "tweet", "publish to Twitter", or "share on X".',
  price: 'Free',
  priceUsdc: 0,
  category: 'skill',
  tags: ["baoyu-skills","post-to-x","social-media","sharing"],
  stars: 306,
  weeklyInstalls: 133,
  totalPurchases: 884,
  featured: false,
  createdAt: '2026-05-25',
  creatorWallet: '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
  fileUrl: 'https://github.com/JimLiu/baoyu-skills/tree/main/skills/baoyu-post-to-x',
  useCases: ["Decompose 1,000-word blog posts into viral 5-tweet threads.","Generate catchy hooks for high-CTR thread click-throughs.","Format quotes and code snippets to render beautifully on mobile feeds."],
  overviewHtml: "<div class=\"skill-enrichment\" style=\"display: flex; flex-direction: column; gap: 32px;\">\n      <div class=\"enrich-hero\" style=\"position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 196, 129, 0.14); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);\">\n        <div style=\"width: 100%; aspect-ratio: 16/6; background: linear-gradient(135deg, #0d1a1e 0%, #0e1118 100%); display: flex; align-items: center; justify-content: center; color: var(--color-accent-warm-light);\">\n          <svg width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8\"/><polyline points=\"16 6 12 2 8 6\"/><line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"15\"/></svg>\n        </div>\n        <div style=\"position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 30%, #0a0806 95%);\"></div>\n        <div style=\"position: absolute; bottom: 20px; left: 24px; right: 24px;\">\n          <h2 style=\"font-family: var(--font-display); color: var(--color-accent-warm-light); margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 0.02em;\">Post To X</h2>\n          <p style=\"margin: 6px 0 0; color: var(--color-text-secondary); font-size: 14px; max-width: 600px;\">Posts content and articles to X (Twitter).</p>\n        </div>\n      </div>\n\n      <div style=\"display: grid; grid-template-columns: 1.2fr 1.0fr; gap: 32px; align-items: start;\">\n        <div>\n          <h3 style=\"color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;\">SKILL CAPABILITIES</h3>\n          <p style=\"margin-bottom: 24px; font-size: 13.5px; line-height: 1.65; color: var(--color-text-secondary);\">Posts content and articles to X (Twitter). Supports regular posts with images/videos and X Articles (long-form Markdown). In Codex, honor explicit requests for the Codex Chrome plugin/@chrome by using the Chrome Extension workflow; otherwise use Chrome Computer Use when available and fall back to real Chrome CDP scripts only when allowed. Use when user asks to \"post to X\", \"tweet\", \"publish to Twitter\", or \"share on X\".</p>\n          \n          <h3 style=\"color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;\">KEY FEATURES</h3>\n          <ul style=\"list-style: none; padding: 0; margin: 0;\">\n            <li style=\"margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;\">\n    <span style=\"color: var(--color-accent); font-weight: bold; margin-top: 2px;\">•</span>\n    <span>End-to-end workflow execution automation</span>\n  </li>\n<li style=\"margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;\">\n    <span style=\"color: var(--color-accent); font-weight: bold; margin-top: 2px;\">•</span>\n    <span>Preset parameters optimized for production use</span>\n  </li>\n<li style=\"margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;\">\n    <span style=\"color: var(--color-accent); font-weight: bold; margin-top: 2px;\">•</span>\n    <span>Self-documenting routines and validation parameters</span>\n  </li>\n          </ul>\n        </div>\n        \n        <div style=\"background: rgba(255, 196, 129, 0.03); border: 1px solid rgba(255, 196, 129, 0.08); border-radius: 12px; padding: 24px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);\">\n          <h4 style=\"color: var(--color-accent-warm-light); margin-top: 0; margin-bottom: 16px; font-family: var(--font-display); font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;\">AUTOMATION STACKS</h4>\n          <div style=\"display: flex; flex-direction: column; gap: 12px;\">\n            <div style=\"background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;\">\n              <div style=\"font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;\">1. PARSE & STRUCTURE</div>\n              <div style=\"font-size: 12px; color: var(--color-text-secondary);\">Analyze context inputs and map constraints recursively.</div>\n            </div>\n            <div style=\"background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;\">\n              <div style=\"font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;\">2. AGENT EVALUATION</div>\n              <div style=\"font-size: 12px; color: var(--color-text-secondary);\">Validate logic flows against preset specifications.</div>\n            </div>\n            <div style=\"background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;\">\n              <div style=\"font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;\">3. DEPLOY & EXPORT</div>\n              <div style=\"font-size: 12px; color: var(--color-text-secondary);\">Write standardized outputs to target environments.</div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>",
  previewHtml: "<div style=\"background: #050c12; border: 1px solid rgba(255, 196, 129, 0.16); border-radius: 12px; font-family: var(--font-mono); color: #ffe8d1; overflow: hidden; max-width: 100%; box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);\">\n        <div style=\"background: rgba(255, 196, 129, 0.06); border-bottom: 1px solid rgba(255, 196, 129, 0.1); padding: 12px 20px; font-size: 11px; font-weight: 700; display: flex; justify-content: space-between; align-items: center; letter-spacing: 0.08em;\">\n          <span>SIMULATED SOCIAL PUBLISHER</span>\n          <span style=\"color: #64b4ff;\">ACTIVE</span>\n        </div>\n        <div style=\"padding: 20px; display: flex; flex-direction: column; gap: 12px;\">\n          <div style=\"background: rgba(0, 0, 0, 0.2); border: 1px solid rgba(255, 196, 129, 0.08); border-radius: 8px; padding: 16px;\">\n            <div style=\"font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 8px;\">PUBLISHING PREVIEW</div>\n            <div style=\"font-size: 13px; line-height: 1.5; color: var(--color-text-secondary); margin-bottom: 12px;\">\n              🚀 Exciting announcement! We just integrated all 21 skills from baoyu-skills directly into Leverbrain. Deploy them in seconds. #Web3 #AI\n            </div>\n            <div style=\"display: flex; gap: 16px; font-size: 11px; color: rgba(255, 232, 209, 0.4);\">\n              <span>💬 12 replies</span>\n              <span>🔄 45 reposts</span>\n              <span>❤️ 188 likes</span>\n            </div>\n          </div>\n        </div>\n      </div>",
  screenshots: undefined
}
