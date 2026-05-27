import { SkillListing } from '../skills-data'

export const baoyuDangerGeminiWeb: SkillListing = {
  id: 'baoyu-danger-gemini-web',
  author: 'baoyu',
  slug: 'baoyu-danger-gemini-web',
  name: 'Danger Gemini Web',
  tagline: 'Generates images and text via reverse-engineered Gemini Web API.',
  description: 'Generates images and text via reverse-engineered Gemini Web API. Supports text generation, image generation from prompts, reference images for vision input, and multi-turn conversations. Use when other skills need image generation backend, or when user requests "generate image with Gemini", "Gemini text generation", or needs vision-capable AI generation.',
  readme: `# Gemini Web Client

Text/image generation via Gemini Web API. Supports reference images and multi-turn conversations.

## User Input Tools

When this skill prompts the user, follow this tool-selection rule (priority order):

1. **Prefer built-in user-input tools** exposed by the current agent runtime — e.g., \`AskUserQuestion\`, \`request_user_input\`, \`clarify\`, \`ask_user\`, or any equivalent.
2. **Fallback**: if no such tool exists, emit a numbered plain-text message and ask the user to reply with the chosen number/answer for each question.
3. **Batching**: if the tool supports multiple questions per call, combine all applicable questions into a single call; if only single-question, ask them one at a time in priority order.

Concrete \`AskUserQuestion\` references below are examples — substitute the local equivalent in other runtimes.

## Script Directory

**Important**: All scripts are located in the \`scripts/\` subdirectory of this skill.

**Agent Execution Instructions**:
1. Determine this SKILL.md file's directory path as \`{baseDir}\`
2. Script path = \`{baseDir}/scripts/<script-name>.ts\`
3. Resolve \`\${BUN_X}\` runtime: if \`bun\` installed → \`bun\`; if \`npx\` available → \`npx -y bun\`; else suggest installing bun
4. Replace all \`{baseDir}\` and \`\${BUN_X}\` in this document with actual values

**Script Reference**:
| Script | Purpose |
|--------|---------|
| \`scripts/main.ts\` | CLI entry point for text/image generation |
| \`scripts/gemini-webapi/*\` | TypeScript port of \`gemini_webapi\` (GeminiClient, types, utils) |

## Consent Check (REQUIRED)

Before first use, verify user consent for reverse-engineered API usage.

**Consent file locations**:
- macOS: \`~/Library/Application Support/baoyu-skills/gemini-web/consent.json\`
- Linux: \`~/.local/share/baoyu-skills/gemini-web/consent.json\`
- Windows: \`%APPDATA%\baoyu-skills\gemini-web\consent.json\`

**Flow**:
1. Check if consent file exists with \`accepted: true\` and \`disclaimerVersion: "1.0"\`
2. If valid consent exists → print warning with \`acceptedAt\` date, proceed
3. If no consent → show disclaimer, ask user via \`AskUserQuestion\`:
   - "Yes, I accept" → create consent file with ISO timestamp, proceed
   - "No, I decline" → output decline message, stop
4. Consent file format: \`{"version":1,"accepted":true,"acceptedAt":"<ISO>","disclaimerVersion":"1.0"}\`

---

## Preferences (EXTEND.md)

Check EXTEND.md in priority order — the first one found wins:

| Priority | Path | Scope |
|----------|------|-------|
| 1 | \`.baoyu-skills/baoyu-danger-gemini-web/EXTEND.md\` | Project |
| 2 | \`\${XDG_CONFIG_HOME:-$HOME/.config}/baoyu-skills/baoyu-danger-gemini-web/EXTEND.md\` | XDG |
| 3 | \`$HOME/.baoyu-skills/baoyu-danger-gemini-web/EXTEND.md\` | User home |

If none found, use defaults.

**EXTEND.md supports**: Default model, proxy settings, custom data directory.

## Usage

\`\`\`bash
# Text generation
\${BUN_X} {baseDir}/scripts/main.ts "Your prompt"
\${BUN_X} {baseDir}/scripts/main.ts --prompt "Your prompt" --model gemini-3-flash

# Image generation
\${BUN_X} {baseDir}/scripts/main.ts --prompt "A cute cat" --image cat.png
\${BUN_X} {baseDir}/scripts/main.ts --promptfiles system.md content.md --image out.png

# Vision input (reference images)
\${BUN_X} {baseDir}/scripts/main.ts --prompt "Describe this" --reference image.png
\${BUN_X} {baseDir}/scripts/main.ts --prompt "Create variation" --reference a.png --image out.png

# Multi-turn conversation
\${BUN_X} {baseDir}/scripts/main.ts "Remember: 42" --sessionId session-abc
\${BUN_X} {baseDir}/scripts/main.ts "What number?" --sessionId session-abc

# JSON output
\${BUN_X} {baseDir}/scripts/main.ts "Hello" --json
\`\`\`

## Options

| Option | Description |
|--------|-------------|
| \`--prompt\`, \`-p\` | Prompt text |
| \`--promptfiles\` | Read prompt from files (concatenated) |
| \`--model\`, \`-m\` | Model: gemini-3-pro (default), gemini-3-flash, gemini-3-flash-thinking, gemini-3.1-pro-preview |
| \`--image [path]\` | Generate image (default: generated.png) |
| \`--reference\`, \`--ref\` | Reference images for vision input |
| \`--sessionId\` | Session ID for multi-turn conversation |
| \`--list-sessions\` | List saved sessions |
| \`--json\` | Output as JSON |
| \`--login\` | Refresh cookies, then exit |
| \`--cookie-path\` | Custom cookie file path |
| \`--profile-dir\` | Chrome profile directory |

## Models

| Model | Description |
|-------|-------------|
| \`gemini-3-pro\` | Default, latest 3.0 Pro |
| \`gemini-3-flash\` | Fast, lightweight 3.0 Flash |
| \`gemini-3-flash-thinking\` | 3.0 Flash with thinking |
| \`gemini-3.1-pro-preview\` | 3.1 Pro preview (empty header, auto-routed) |

## Authentication

First run opens browser for Google auth. Cookies cached automatically.

When no explicit profile dir is set, cookie refresh may reuse an already-running local Chrome/Chromium debugging session tied to a standard user-data dir.
Set \`--profile-dir\` or \`GEMINI_WEB_CHROME_PROFILE_DIR\` to force a dedicated profile and skip existing-session reuse.
This is a best-effort CDP session reuse path, not the Chrome DevTools MCP prompt-based \`--autoConnect\` flow described in Chrome's official docs.

Supported browsers (auto-detected): Chrome, Chrome Canary/Beta, Chromium, Edge.

Force refresh: \`--login\` flag. Override browser: \`GEMINI_WEB_CHROME_PATH\` env var.

## Environment Variables

| Variable | Description |
|----------|-------------|
| \`GEMINI_WEB_DATA_DIR\` | Data directory |
| \`GEMINI_WEB_COOKIE_PATH\` | Cookie file path |
| \`GEMINI_WEB_CHROME_PROFILE_DIR\` | Chrome profile directory |
| \`GEMINI_WEB_CHROME_PATH\` | Chrome executable path |
| \`HTTP_PROXY\`, \`HTTPS_PROXY\` | Proxy for Google access (set inline with command) |

## Sessions

Session files stored in data directory under \`sessions/<id>.json\`.

Contains: \`id\`, \`metadata\` (Gemini chat state), \`messages\` array, timestamps.

## Extension Support

Custom configurations via EXTEND.md. See **Preferences** section for paths and supported options.`,
  whenToUse: 'Use when other skills need image generation backend, or when user requests "generate image with Gemini", "Gemini text generation", or needs vision-capable AI generation.',
  price: 'Free',
  priceUsdc: 0,
  category: 'skill',
  tags: ["baoyu-skills","danger-gemini-web","scraping","automation"],
  stars: 455,
  weeklyInstalls: 196,
  totalPurchases: 538,
  featured: false,
  createdAt: '2026-05-25',
  creatorWallet: '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
  fileUrl: 'https://github.com/JimLiu/baoyu-skills/tree/main/skills/baoyu-danger-gemini-web',
  useCases: ["Fetch dynamic, client-side rendered page content securely.","Automate screenshot captures of live UI dashboards.","Scrape data from sites requiring heavy JavaScript execution."],
  exampleUsage: "Search the web and summarize current findings for my research topic",
  overviewHtml: "<div class=\"skill-enrichment\" style=\"display: flex; flex-direction: column; gap: 32px;\">\n      <div class=\"enrich-hero\" style=\"position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 196, 129, 0.14); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);\">\n        <div style=\"width: 100%; aspect-ratio: 16/6; background: linear-gradient(135deg, #13110f 0%, #17181c 100%); display: flex; align-items: center; justify-content: center; color: var(--color-accent-warm-light);\">\n          <svg width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><polyline points=\"16 18 22 12 16 6\"/><polyline points=\"8 6 2 12 8 18\"/></svg>\n        </div>\n        <div style=\"position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 30%, #0a0806 95%);\"></div>\n        <div style=\"position: absolute; bottom: 20px; left: 24px; right: 24px;\">\n          <h2 style=\"font-family: var(--font-display); color: var(--color-accent-warm-light); margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 0.02em;\">Danger Gemini Web</h2>\n          <p style=\"margin: 6px 0 0; color: var(--color-text-secondary); font-size: 14px; max-width: 600px;\">Generates images and text via reverse-engineered Gemini Web API.</p>\n        </div>\n      </div>\n\n      <div style=\"display: grid; grid-template-columns: 1.2fr 1.0fr; gap: 32px; align-items: start;\">\n        <div>\n          <h3 style=\"color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;\">SKILL CAPABILITIES</h3>\n          <p style=\"margin-bottom: 24px; font-size: 13.5px; line-height: 1.65; color: var(--color-text-secondary);\">Generates images and text via reverse-engineered Gemini Web API. Supports text generation, image generation from prompts, reference images for vision input, and multi-turn conversations. Use when other skills need image generation backend, or when user requests \"generate image with Gemini\", \"Gemini text generation\", or needs vision-capable AI generation.</p>\n          \n          <h3 style=\"color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;\">KEY FEATURES</h3>\n          <ul style=\"list-style: none; padding: 0; margin: 0;\">\n            <li style=\"margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;\">\n    <span style=\"color: var(--color-accent); font-weight: bold; margin-top: 2px;\">•</span>\n    <span>End-to-end workflow execution automation</span>\n  </li>\n<li style=\"margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;\">\n    <span style=\"color: var(--color-accent); font-weight: bold; margin-top: 2px;\">•</span>\n    <span>Preset parameters optimized for production use</span>\n  </li>\n<li style=\"margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;\">\n    <span style=\"color: var(--color-accent); font-weight: bold; margin-top: 2px;\">•</span>\n    <span>Self-documenting routines and validation parameters</span>\n  </li>\n          </ul>\n        </div>\n        \n        <div style=\"background: rgba(255, 196, 129, 0.03); border: 1px solid rgba(255, 196, 129, 0.08); border-radius: 12px; padding: 24px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);\">\n          <h4 style=\"color: var(--color-accent-warm-light); margin-top: 0; margin-bottom: 16px; font-family: var(--font-display); font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;\">AUTOMATION STACKS</h4>\n          <div style=\"display: flex; flex-direction: column; gap: 12px;\">\n            <div style=\"background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;\">\n              <div style=\"font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;\">1. PARSE & STRUCTURE</div>\n              <div style=\"font-size: 12px; color: var(--color-text-secondary);\">Analyze context inputs and map constraints recursively.</div>\n            </div>\n            <div style=\"background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;\">\n              <div style=\"font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;\">2. AGENT EVALUATION</div>\n              <div style=\"font-size: 12px; color: var(--color-text-secondary);\">Validate logic flows against preset specifications.</div>\n            </div>\n            <div style=\"background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;\">\n              <div style=\"font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;\">3. DEPLOY & EXPORT</div>\n              <div style=\"font-size: 12px; color: var(--color-text-secondary);\">Write standardized outputs to target environments.</div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>",
  previewHtml: "<div style=\"background: #050c12; border: 1px solid rgba(255, 196, 129, 0.16); border-radius: 12px; font-family: var(--font-mono); color: #ffe8d1; overflow: hidden; max-width: 100%; box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);\">\n      <div style=\"background: rgba(255, 196, 129, 0.06); border-bottom: 1px solid rgba(255, 196, 129, 0.1); padding: 12px 20px; font-size: 11px; font-weight: 700; display: flex; justify-content: space-between; align-items: center; letter-spacing: 0.08em;\">\n        <span>CODE EDITOR & COMPILER</span>\n        <span style=\"color: var(--color-accent-warm-light);\">ONLINE</span>\n      </div>\n      <div style=\"padding: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px;\">\n        <div style=\"display: flex; flex-direction: column; gap: 8px;\">\n          <div style=\"font-size: 11px; color: rgba(255, 232, 209, 0.4);\">INPUT CONTEXT</div>\n          <pre style=\"margin: 0; font-size: 11px; background: rgba(0, 0, 0, 0.3); padding: 10px; border-radius: 6px; border: 1px solid rgba(255, 196, 129, 0.08); color: rgba(255, 232, 209, 0.7); overflow-x: auto;\">{\n  \"status\": \"pending\",\n  \"file\": \"SKILL.md\"\n}</pre>\n        </div>\n        <div style=\"display: flex; flex-direction: column; gap: 8px;\">\n          <div style=\"font-size: 11px; color: rgba(255, 232, 209, 0.4);\">PROCESS OUTPUT</div>\n          <pre style=\"margin: 0; font-size: 11px; background: rgba(255, 196, 129, 0.02); padding: 10px; border-radius: 6px; border: 1px solid rgba(255, 196, 129, 0.08); color: var(--color-accent-warm-light); overflow-x: auto;\">{\n  \"status\": \"success\",\n  \"processed\": true\n}</pre>\n        </div>\n      </div>\n    </div>",
  screenshots: undefined
}
