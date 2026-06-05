import { SkillListing } from '../skills-data'
 
export const dimitryvinVideoDl: SkillListing = {
  id: 'dimitryvin-video-dl',
  author: 'leverbrain',
  slug: 'dimitryvin-video-dl',
  name: "Video dl",
  tagline: "Download videos from YouTube, Reddit, Twitter/X, TikTok, Instagram, and 1000+ other sites using yt-dlp.",
  description: "Download videos from YouTube, Reddit, Twitter/X, TikTok, Instagram, and 1000+ other sites using yt-dlp. Use when user provides a video link and wants to download it.",
  readme: `# Video Downloader

Download videos from almost any website using yt-dlp.

## Supported Sites

YouTube, Reddit, Twitter/X, TikTok, Instagram, Vimeo, Facebook, Twitch, and 1000+ others. Full list: https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md

## Usage

### Quick Download (best quality)

\`\`\`bash
{baseDir}/scripts/download.sh "URL"
\`\`\`

Downloads to \`~/Downloads/videos/\` with best quality.

### With Options

\`\`\`bash
{baseDir}/scripts/download.sh "URL" [OPTIONS]
\`\`\`

**Common options:**
- \`--audio-only\` - Extract audio only (mp3)
- \`--720p\` - Limit to 720p max
- \`--1080p\` - Limit to 1080p max  
- \`--output DIR\` - Custom output directory
- \`--filename NAME\` - Custom filename (without extension)

### Examples

\`\`\`bash
# Download YouTube video (best quality)
{baseDir}/scripts/download.sh "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

# Download Reddit video
{baseDir}/scripts/download.sh "https://www.reddit.com/r/videos/comments/abc123/cool_video/"

# Extract audio only
{baseDir}/scripts/download.sh "https://www.youtube.com/watch?v=dQw4w9WgXcQ" --audio-only

# Download to specific folder
{baseDir}/scripts/download.sh "URL" --output ~/Videos/projects

# Custom filename
{baseDir}/scripts/download.sh "URL" --filename "my-video"
\`\`\`

## Output

- Default location: \`~/Downloads/videos/\`
- Filename format: \`{title}-{id}.{ext}\`
- Returns full path to downloaded file on success

## Notes

- Reddit videos require merging video+audio (handled automatically)
- Age-restricted YouTube videos may require cookies (not currently configured)
- Very long videos may take time; script shows progress
- If download fails, check if the site is supported or if the video is private/deleted

## Sending to Telegram

Large videos need compression for Telegram's 16MB limit. For long videos:

1. Download the video normally
2. Run compression in background:
   \`\`\`bash
   nohup {baseDir}/scripts/compress-and-send.sh "/path/to/video.mp4" "CHAT_ID" > /tmp/compress.log 2>&1 &
   \`\`\`
3. Check back after estimated time (duration ÷ 4)
4. Send the resulting \`-telegram.mp4\` file

This avoids spamming the chat with progress updates.

## Direct yt-dlp Access

For advanced usage, yt-dlp is available at \`~/.local/bin/yt-dlp\` (updated) or \`/usr/bin/yt-dlp\`. See \`yt-dlp --help\` for all options.`,
  whenToUse: "Use when you need to automate video dl processes.",
  price: "Free",
  priceUsdc: 0,
  category: "skill",
  tags: ["leverbrain-skills","dimitryvin-video-dl"],
  stars: 116,
  weeklyInstalls: 171,
  totalPurchases: 512,
  featured: false,
  createdAt: '2026-06-04',
  creatorWallet: '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
  fileUrl: 'https://github.com/krlan/leverbrain/tree/main/skills/dimitryvin-video-dl',
  useCases: ["Filename format: {title}-{id}.{ext}.","Returns full path to downloaded file on success.","Reddit videos require merging video+audio (handled automatically)."],
  exampleUsage: "Process and edit my video files",
  overviewHtml: `<div class="skill-enrichment" style="display: flex; flex-direction: column; gap: 32px;">
      <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 196, 129, 0.14); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);">
        <div style="width: 100%; aspect-ratio: 16/6; background: linear-gradient(135deg, #1b1622 0%, #0d131f 100%); display: flex; align-items: center; justify-content: center; color: var(--color-accent-warm-light);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        </div>
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 30%, #0a0806 95%);"></div>
        <div style="position: absolute; bottom: 20px; left: 24px; right: 24px;">
          <h2 style="font-family: var(--font-display); color: var(--color-accent-warm-light); margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 0.02em;">Video dl</h2>
          <p style="margin: 6px 0 0; color: var(--color-text-secondary); font-size: 14px; max-width: 600px;">Download videos from YouTube, Reddit, Twitter/X, TikTok, Instagram, and 1000+ other sites using yt-dlp.</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1.2fr 1.0fr; gap: 32px; align-items: start;">
        <div>
          <h3 style="color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;">SKILL CAPABILITIES</h3>
          <p style="margin-bottom: 24px; font-size: 13.5px; line-height: 1.65; color: var(--color-text-secondary);">Download videos from YouTube, Reddit, Twitter/X, TikTok, Instagram, and 1000+ other sites using yt-dlp. Use when user provides a video link and wants to download it.</p>
          
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
