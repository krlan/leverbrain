import { SkillListing } from '../skills-data'

export const baoyuYoutubeTranscript: SkillListing = {
  id: 'baoyu-youtube-transcript',
  author: 'baoyu',
  slug: 'baoyu-youtube-transcript',
  name: 'Youtube Transcript',
  tagline: 'Downloads YouTube video transcripts/subtitles and cover images by URL or video ID.',
  description: 'Downloads YouTube video transcripts/subtitles and cover images by URL or video ID. Supports multiple languages, translation, chapters, and speaker identification. Caches raw data for fast re-formatting. Use when user asks to "get YouTube transcript", "download subtitles", "get captions", "YouTube字幕", "YouTube封面", "视频封面", "video thumbnail", "video cover image", or provides a YouTube URL and wants the transcript/subtitle text or cover image extracted.',
  readme: `# YouTube Transcript

Downloads transcripts (subtitles/captions) from YouTube videos. Works with both manually created and auto-generated transcripts. No API key or browser required — uses YouTube's InnerTube API directly and automatically falls back to \`yt-dlp\` when YouTube blocks the direct API path.

Fetches video metadata and cover image on first run, caches raw data for fast re-formatting.

## Script Directory

Scripts in \`scripts/\` subdirectory. \`{baseDir}\` = this SKILL.md's directory path. Resolve \`\${BUN_X}\` runtime: if \`bun\` installed → \`bun\`; if \`npx\` available → \`npx -y bun\`; else suggest installing bun. Replace \`{baseDir}\` and \`\${BUN_X}\` with actual values.

| Script | Purpose |
|--------|---------|
| \`scripts/main.ts\` | Transcript download CLI |

## Usage

\`\`\`bash
# Default: markdown with timestamps (English)
\${BUN_X} {baseDir}/scripts/main.ts <youtube-url-or-id>

# Specify languages (priority order)
\${BUN_X} {baseDir}/scripts/main.ts <url> --languages zh,en,ja

# Without timestamps
\${BUN_X} {baseDir}/scripts/main.ts <url> --no-timestamps

# With chapter segmentation
\${BUN_X} {baseDir}/scripts/main.ts <url> --chapters

# With speaker identification (requires AI post-processing)
\${BUN_X} {baseDir}/scripts/main.ts <url> --speakers

# SRT subtitle file
\${BUN_X} {baseDir}/scripts/main.ts <url> --format srt

# Translate transcript
\${BUN_X} {baseDir}/scripts/main.ts <url> --translate zh-Hans

# List available transcripts
\${BUN_X} {baseDir}/scripts/main.ts <url> --list

# Force re-fetch (ignore cache)
\${BUN_X} {baseDir}/scripts/main.ts <url> --refresh
\`\`\`

## Options

| Option | Description | Default |
|--------|-------------|---------|
| \`<url-or-id>\` | YouTube URL or video ID (multiple allowed) | Required |
| \`--languages <codes>\` | Language codes, comma-separated, in priority order | \`en\` |
| \`--format <fmt>\` | Output format: \`text\`, \`srt\` | \`text\` |
| \`--translate <code>\` | Translate to specified language code | |
| \`--list\` | List available transcripts instead of fetching | |
| \`--timestamps\` | Include \`[HH:MM:SS → HH:MM:SS]\` timestamps per paragraph | on |
| \`--no-timestamps\` | Disable timestamps | |
| \`--chapters\` | Chapter segmentation from video description | |
| \`--speakers\` | Raw transcript with metadata for speaker identification | |
| \`--exclude-generated\` | Skip auto-generated transcripts | |
| \`--exclude-manually-created\` | Skip manually created transcripts | |
| \`--refresh\` | Force re-fetch, ignore cached data | |
| \`-o, --output <path>\` | Save to specific file path | auto-generated |
| \`--output-dir <dir>\` | Base output directory | \`youtube-transcript\` |

## Optional Environment Variables

| Variable | Description |
|----------|-------------|
| \`YOUTUBE_TRANSCRIPT_COOKIES_FROM_BROWSER\` | Passed to \`yt-dlp --cookies-from-browser\` during fallback, e.g. \`chrome\`, \`safari\`, \`firefox\`, or \`chrome:Profile 1\` |

## Input Formats

Accepts any of these as video input:
- Full URL: \`https://www.youtube.com/watch?v=dQw4w9WgXcQ\`
- Short URL: \`https://youtu.be/dQw4w9WgXcQ\`
- Embed URL: \`https://www.youtube.com/embed/dQw4w9WgXcQ\`
- Shorts URL: \`https://www.youtube.com/shorts/dQw4w9WgXcQ\`
- Video ID: \`dQw4w9WgXcQ\`

## Output Formats

| Format | Extension | Description |
|--------|-----------|-------------|
| \`text\` | \`.md\` | Markdown with frontmatter (incl. \`description\`), title heading, summary, optional TOC/cover/timestamps/chapters/speakers |
| \`srt\` | \`.srt\` | SubRip subtitle format for video players |

## Output Directory

\`\`\`
youtube-transcript/
├── .index.json                          # Video ID → directory path mapping (for cache lookup)
└── {channel-slug}/{title-full-slug}/
    ├── meta.json                        # Video metadata (title, channel, description, duration, chapters, etc.)
    ├── transcript-raw.json              # Raw transcript snippets from YouTube API (cached)
    ├── transcript-sentences.json        # Sentence-segmented transcript (split by punctuation, merged across snippets)
    ├── imgs/
    │   └── cover.jpg                    # Video thumbnail
    ├── transcript.md                    # Markdown transcript (generated from sentences)
    └── transcript.srt                   # SRT subtitle (generated from raw snippets, if --format srt)
\`\`\`

- \`{channel-slug}\`: Channel name in kebab-case
- \`{title-full-slug}\`: Full video title in kebab-case

The \`--list\` mode outputs to stdout only (no file saved).

## Caching

On first fetch, the script saves:
- \`meta.json\` — video metadata, chapters, cover image path, language info
- \`transcript-raw.json\` — raw transcript snippets from YouTube API (\`{ text, start, duration }[]\`)
- \`transcript-sentences.json\` — sentence-segmented transcript (\`{ text, start: "HH:mm:ss", end: "HH:mm:ss" }[]\`), split by sentence-ending punctuation (\`.?!…。？！\` etc.), timestamps proportionally allocated by character length, CJK-aware text merging
- \`imgs/cover.jpg\` — video thumbnail

Subsequent runs for the same video use cached data (no network calls). Use \`--refresh\` to force re-fetch. If a different language is requested, the cache is automatically refreshed.

When YouTube returns anti-bot / blocked responses on the direct InnerTube path, the script retries with alternate client identities and then falls back to \`yt-dlp\` if available. If fallback is needed but \`yt-dlp\` is unavailable, the agent should decide how to make \`yt-dlp\` available and continue rather than pushing the installation decision to the user.

SRT output (\`--format srt\`) is generated from \`transcript-raw.json\`. Text/markdown output uses \`transcript-sentences.json\` for natural sentence boundaries.

## Workflow

When user provides a YouTube URL and wants the transcript:

1. Run with \`--list\` first if the user hasn't specified a language, to show available options
2. **Always single-quote the URL** when running the script — zsh treats \`?\` as a glob wildcard, so an unquoted YouTube URL causes "no matches found": use \`'https://www.youtube.com/watch?v=ID'\`
3. Default: run with \`--chapters --speakers\` for the richest output (chapters + speaker identification)
3. The script auto-saves cached data + output file and prints the file path
4. For \`--speakers\` mode: after the script saves the raw file, follow the speaker identification workflow below to post-process with speaker labels

When user only wants a cover image or metadata, running the script with any option will also cache \`meta.json\` and \`imgs/cover.jpg\`.

When re-formatting the same video (e.g., first text then SRT), the cached data is reused — no re-fetch needed.

## Chapter & Speaker Workflow

### Chapters (\`--chapters\`)

The script parses chapter timestamps from the video description (e.g., \`0:00 Introduction\`), segments the transcript by chapter boundaries, groups snippets into readable paragraphs, and saves as \`.md\` with a Table of Contents. No further processing needed.

If no chapter timestamps exist in the description, the transcript is output as grouped paragraphs without chapter headings.

### Speaker Identification (\`--speakers\`)

Speaker identification requires AI processing. The script outputs a raw \`.md\` file containing:
- YAML frontmatter with video metadata (title, channel, date, cover, description, language)
- Video description (for speaker name extraction)
- Chapter list from description (if available)
- Raw transcript in SRT format (pre-computed start/end timestamps, token-efficient)

After the script saves the raw file, spawn a sub-agent (use a cheaper model like Sonnet for cost efficiency) to process speaker identification:

1. Read the saved \`.md\` file
2. Read the prompt template at \`{baseDir}/prompts/speaker-transcript.md\`
3. Process the raw transcript following the prompt:
   - Identify speakers using video metadata (title → guest, channel → host, description → names)
   - Detect speaker turns from conversation flow, question-answer patterns, and contextual cues
   - Segment into chapters (use description chapters if available, else create from topic shifts)
   - Format with \`**Speaker Name:**\` labels, paragraph grouping (2-4 sentences), and \`[HH:MM:SS → HH:MM:SS]\` timestamps
4. Overwrite the \`.md\` file with the processed transcript (keep the YAML frontmatter)

When \`--speakers\` is used, \`--chapters\` is implied — the processed output always includes chapter segmentation.

## Error Cases

| Error | Meaning |
|-------|---------|
| Transcripts disabled | Video has no captions at all |
| No transcript found | Requested language not available |
| Video unavailable | Video deleted, private, or region-locked |
| IP blocked | Too many requests, try again later |
| Age restricted | Video requires login for age verification |
| bot detected | The script retries alternate clients and then \`yt-dlp\`; if fallback tooling is missing, the agent should resolve that itself, otherwise if it still fails try \`YOUTUBE_TRANSCRIPT_COOKIES_FROM_BROWSER=safari\` (or your browser) |`,
  whenToUse: 'Use when user asks to "get YouTube transcript", "download subtitles", "get captions", "YouTube字幕", "YouTube封面", "视频封面", "video thumbnail", "video cover image", or provides a YouTube URL and wants the transcript/subtitle text or cover image extracted.',
  price: 'Free',
  priceUsdc: 0,
  category: 'skill',
  tags: ["baoyu-skills","youtube-transcript"],
  stars: 613,
  weeklyInstalls: 81,
  totalPurchases: 684,
  featured: false,
  createdAt: '2026-05-25',
  creatorWallet: '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
  fileUrl: 'https://github.com/JimLiu/baoyu-skills/tree/main/skills/baoyu-youtube-transcript',
  useCases: ["Create readable text logs from video lectures or podcasts.","Generate clean outlines of long tutorials with timestamps.","Extract key announcements from developer keynote videos."],
  exampleUsage: "Fetch and summarize the transcript from my YouTube video",
  overviewHtml: "<div class=\"skill-enrichment\" style=\"display: flex; flex-direction: column; gap: 32px;\">\n      <div class=\"enrich-hero\" style=\"position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 196, 129, 0.14); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);\">\n        <div style=\"width: 100%; aspect-ratio: 16/6; background: linear-gradient(135deg, #13110f 0%, #17181c 100%); display: flex; align-items: center; justify-content: center; color: var(--color-accent-warm-light);\">\n          <svg width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z\"/></svg>\n        </div>\n        <div style=\"position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 30%, #0a0806 95%);\"></div>\n        <div style=\"position: absolute; bottom: 20px; left: 24px; right: 24px;\">\n          <h2 style=\"font-family: var(--font-display); color: var(--color-accent-warm-light); margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 0.02em;\">Youtube Transcript</h2>\n          <p style=\"margin: 6px 0 0; color: var(--color-text-secondary); font-size: 14px; max-width: 600px;\">Downloads YouTube video transcripts/subtitles and cover images by URL or video ID.</p>\n        </div>\n      </div>\n\n      <div style=\"display: grid; grid-template-columns: 1.2fr 1.0fr; gap: 32px; align-items: start;\">\n        <div>\n          <h3 style=\"color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;\">SKILL CAPABILITIES</h3>\n          <p style=\"margin-bottom: 24px; font-size: 13.5px; line-height: 1.65; color: var(--color-text-secondary);\">Downloads YouTube video transcripts/subtitles and cover images by URL or video ID. Supports multiple languages, translation, chapters, and speaker identification. Caches raw data for fast re-formatting. Use when user asks to \"get YouTube transcript\", \"download subtitles\", \"get captions\", \"YouTube字幕\", \"YouTube封面\", \"视频封面\", \"video thumbnail\", \"video cover image\", or provides a YouTube URL and wants the transcript/subtitle text or cover image extracted.</p>\n          \n          <h3 style=\"color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;\">KEY FEATURES</h3>\n          <ul style=\"list-style: none; padding: 0; margin: 0;\">\n            <li style=\"margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;\">\n    <span style=\"color: var(--color-accent); font-weight: bold; margin-top: 2px;\">•</span>\n    <span>End-to-end workflow execution automation</span>\n  </li>\n<li style=\"margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;\">\n    <span style=\"color: var(--color-accent); font-weight: bold; margin-top: 2px;\">•</span>\n    <span>Preset parameters optimized for production use</span>\n  </li>\n<li style=\"margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;\">\n    <span style=\"color: var(--color-accent); font-weight: bold; margin-top: 2px;\">•</span>\n    <span>Self-documenting routines and validation parameters</span>\n  </li>\n          </ul>\n        </div>\n        \n        <div style=\"background: rgba(255, 196, 129, 0.03); border: 1px solid rgba(255, 196, 129, 0.08); border-radius: 12px; padding: 24px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);\">\n          <h4 style=\"color: var(--color-accent-warm-light); margin-top: 0; margin-bottom: 16px; font-family: var(--font-display); font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;\">AUTOMATION STACKS</h4>\n          <div style=\"display: flex; flex-direction: column; gap: 12px;\">\n            <div style=\"background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;\">\n              <div style=\"font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;\">1. PARSE & STRUCTURE</div>\n              <div style=\"font-size: 12px; color: var(--color-text-secondary);\">Analyze context inputs and map constraints recursively.</div>\n            </div>\n            <div style=\"background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;\">\n              <div style=\"font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;\">2. AGENT EVALUATION</div>\n              <div style=\"font-size: 12px; color: var(--color-text-secondary);\">Validate logic flows against preset specifications.</div>\n            </div>\n            <div style=\"background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;\">\n              <div style=\"font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;\">3. DEPLOY & EXPORT</div>\n              <div style=\"font-size: 12px; color: var(--color-text-secondary);\">Write standardized outputs to target environments.</div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>",
  previewHtml: "<div style=\"background: #050c12; border: 1px solid rgba(255, 196, 129, 0.16); border-radius: 12px; font-family: var(--font-mono); color: #ffe8d1; overflow: hidden; max-width: 100%; box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);\">\n      <div style=\"background: rgba(255, 196, 129, 0.06); border-bottom: 1px solid rgba(255, 196, 129, 0.1); padding: 12px 20px; font-size: 11px; font-weight: 700; display: flex; justify-content: space-between; align-items: center; letter-spacing: 0.08em;\">\n        <span>CODE EDITOR & COMPILER</span>\n        <span style=\"color: var(--color-accent-warm-light);\">ONLINE</span>\n      </div>\n      <div style=\"padding: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px;\">\n        <div style=\"display: flex; flex-direction: column; gap: 8px;\">\n          <div style=\"font-size: 11px; color: rgba(255, 232, 209, 0.4);\">INPUT CONTEXT</div>\n          <pre style=\"margin: 0; font-size: 11px; background: rgba(0, 0, 0, 0.3); padding: 10px; border-radius: 6px; border: 1px solid rgba(255, 196, 129, 0.08); color: rgba(255, 232, 209, 0.7); overflow-x: auto;\">{\n  \"status\": \"pending\",\n  \"file\": \"SKILL.md\"\n}</pre>\n        </div>\n        <div style=\"display: flex; flex-direction: column; gap: 8px;\">\n          <div style=\"font-size: 11px; color: rgba(255, 232, 209, 0.4);\">PROCESS OUTPUT</div>\n          <pre style=\"margin: 0; font-size: 11px; background: rgba(255, 196, 129, 0.02); padding: 10px; border-radius: 6px; border: 1px solid rgba(255, 196, 129, 0.08); color: var(--color-accent-warm-light); overflow-x: auto;\">{\n  \"status\": \"success\",\n  \"processed\": true\n}</pre>\n        </div>\n      </div>\n    </div>",
  screenshots: undefined
}
