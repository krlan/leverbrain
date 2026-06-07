import fs from 'fs'
import path from 'path'
import https from 'https'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Node.js-Importer-Script'
      }
    };
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`Failed to fetch ${url}: Status ${res.statusCode}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

const SCREENSHOT_MAPS = {
  'baoyu-article-illustrator': [
    { title: 'Styles', dir: 'article-illustrator-styles' }
  ],
  'baoyu-comic': [
    { title: 'Styles', dir: 'comic-styles' },
    { title: 'Layouts', dir: 'comic-layouts' }
  ],
  'baoyu-cover-image': [
    { title: 'Styles', dir: 'cover-image-styles' }
  ],
  'baoyu-infographic': [
    { title: 'Styles', dir: 'infographic-styles' },
    { title: 'Layouts', dir: 'infographic-layouts' }
  ],
  'baoyu-slide-deck': [
    { title: 'Styles', dir: 'slide-deck-styles' }
  ],
  'baoyu-xhs-images': [
    { title: 'Styles', dir: 'xhs-images-styles' },
    { title: 'Layouts', dir: 'xhs-images-layouts' }
  ]
}

function capitalize(str) {
  return str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

async function getScreenshotsForSkill(skillName) {
  const maps = SCREENSHOT_MAPS[skillName]
  if (!maps) return null

  const result = []
  for (const m of maps) {
    console.log(`  Fetching screenshots from ${m.dir}...`)
    try {
      const apiUrl = `https://api.github.com/repos/JimLiu/baoyu-skills/contents/screenshots/${m.dir}`
      const responseText = await fetchUrl(apiUrl)
      const files = JSON.parse(responseText)
      
      const items = []
      for (const file of files) {
        if (file.type === 'file' && (file.name.endsWith('.webp') || file.name.endsWith('.png') || file.name.endsWith('.jpg'))) {
          const name = capitalize(file.name.slice(0, file.name.lastIndexOf('.')))
          const url = `https://raw.githubusercontent.com/JimLiu/baoyu-skills/main/screenshots/${m.dir}/${file.name}`
          items.push({ name, url })
        }
      }
      
      if (items.length > 0) {
        result.push({
          title: m.title,
          items: items.sort((a, b) => a.name.localeCompare(b.name))
        })
      }
    } catch (err) {
      console.warn(`  ⚠️ Failed to fetch screenshots for ${m.dir}:`, err.message)
    }
  }
  
  return result.length > 0 ? result : null
}

function parseFrontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) {
    throw new Error('SKILL.md must include YAML frontmatter')
  }

  const yamlStr = match[1]
  const readme = match[2].trim()

  const lines = yamlStr.split('\n')
  const metadata = {}
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    if (trimmed.startsWith('-') || trimmed.includes(': ') === false) continue
    const colonIdx = trimmed.indexOf(':')
    const key = trimmed.slice(0, colonIdx).trim()
    const val = trimmed.slice(colonIdx + 1).trim()
    metadata[key] = val.replace(/^['"]|['"]$/g, '') // strip quotes
  }

  return { metadata, readme }
}

function formatTitle(slug) {
  if (!slug) return '';
  const clean = slug.startsWith('baoyu-') ? slug.slice(6) : slug
  return clean
    .replace(/-/g, ' ')
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getMockIcon(slug) {
  if (slug.includes('image') || slug.includes('illustrator') || slug.includes('gen') || slug.includes('comic') || slug.includes('cover')) {
    return `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`
  }
  if (slug.includes('post') || slug.includes('wechat') || slug.includes('x') || slug.includes('weibo')) {
    return `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>`
  }
  if (slug.includes('translate') || slug.includes('transcript') || slug.includes('summary')) {
    return `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`
  }
  return `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`
}

function getGradient(slug) {
  if (slug.includes('image') || slug.includes('illustrator') || slug.includes('gen') || slug.includes('comic') || slug.includes('cover')) {
    return 'linear-gradient(135deg, #1b1622 0%, #0d131f 100%)'
  }
  if (slug.includes('post') || slug.includes('wechat') || slug.includes('x') || slug.includes('weibo')) {
    return 'linear-gradient(135deg, #0d1a1e 0%, #0e1118 100%)'
  }
  return 'linear-gradient(135deg, #13110f 0%, #17181c 100%)'
}

function generateOverviewHtml(title, tagline, slug, features, description) {
  const icon = getMockIcon(slug)
  const gradient = getGradient(slug)
  const featuresHtml = features.map(feat => `<li style="margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;">
    <span style="color: var(--color-accent); font-weight: bold; margin-top: 2px;">•</span>
    <span>${feat}</span>
  </li>`).join('\n')

  return `
    <div class="skill-enrichment" style="display: flex; flex-direction: column; gap: 32px;">
      <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 196, 129, 0.14); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);">
        <div style="width: 100%; aspect-ratio: 16/6; background: ${gradient}; display: flex; align-items: center; justify-content: center; color: var(--color-accent-warm-light);">
          ${icon}
        </div>
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 30%, #0a0806 95%);"></div>
        <div style="position: absolute; bottom: 20px; left: 24px; right: 24px;">
          <h2 style="font-family: var(--font-display); color: var(--color-accent-warm-light); margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 0.02em;">${title}</h2>
          <p style="margin: 6px 0 0; color: var(--color-text-secondary); font-size: 14px; max-width: 600px;">${tagline}</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1.2fr 1.0fr; gap: 32px; align-items: start;">
        <div>
          <h3 style="color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;">SKILL CAPABILITIES</h3>
          <p style="margin-bottom: 24px; font-size: 13.5px; line-height: 1.65; color: var(--color-text-secondary);">${description}</p>
          
          <h3 style="color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;">KEY FEATURES</h3>
          <ul style="list-style: none; padding: 0; margin: 0;">
            ${featuresHtml}
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
    </div>
  `.trim().replace(/\n/g, '\\n').replace(/"/g, '\\"')
}

function generatePreviewHtml(title, slug) {
  if (slug.includes('image') || slug.includes('illustrator') || slug.includes('gen') || slug.includes('comic') || slug.includes('cover') || slug.includes('infographic') || slug.includes('diagram')) {
    return `
      <div style="background: #050c12; border: 1px solid rgba(255, 196, 129, 0.16); border-radius: 12px; font-family: var(--font-mono); color: #ffe8d1; overflow: hidden; max-width: 100%; box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);">
        <div style="background: rgba(255, 196, 129, 0.06); border-bottom: 1px solid rgba(255, 196, 129, 0.1); padding: 12px 20px; font-size: 11px; font-weight: 700; display: flex; justify-content: space-between; align-items: center; letter-spacing: 0.08em;">
          <span>IMAGE GENERATOR WORKSPACE</span>
          <span style="color: var(--color-accent-warm-light);">READY</span>
        </div>
        <div style="padding: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <div style="font-size: 11px; color: rgba(255, 232, 209, 0.4);">INPUT PROMPT</div>
            <div style="background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 196, 129, 0.08); border-radius: 6px; padding: 10px; font-size: 12px; line-height: 1.5; color: #ffe8d1;">
              Create illustration layout for tech article about smart AI agents.
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
              <div style="background: rgba(0, 0, 0, 0.2); border: 1px solid rgba(255, 196, 129, 0.08); padding: 8px; border-radius: 4px; font-size: 11px; text-align: center;">
                Style: 3D Art
              </div>
              <div style="background: rgba(0, 0, 0, 0.2); border: 1px solid rgba(255, 196, 129, 0.08); padding: 8px; border-radius: 4px; font-size: 11px; text-align: center;">
                Ratio: 16:9
              </div>
            </div>
          </div>
          <div style="background: rgba(255, 196, 129, 0.03); border: 1px dashed rgba(255, 196, 129, 0.16); border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; min-height: 140px; padding: 12px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255, 196, 129, 0.4)" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            <span style="font-size: 11px; color: rgba(255, 232, 209, 0.6); text-align: center;">[Generated Asset View]</span>
          </div>
        </div>
      </div>
    `.trim().replace(/\n/g, '\\n').replace(/"/g, '\\"')
  }

  if (slug.includes('post') || slug.includes('wechat') || slug.includes('x') || slug.includes('weibo') || slug.includes('slide')) {
    return `
      <div style="background: #050c12; border: 1px solid rgba(255, 196, 129, 0.16); border-radius: 12px; font-family: var(--font-mono); color: #ffe8d1; overflow: hidden; max-width: 100%; box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);">
        <div style="background: rgba(255, 196, 129, 0.06); border-bottom: 1px solid rgba(255, 196, 129, 0.1); padding: 12px 20px; font-size: 11px; font-weight: 700; display: flex; justify-content: space-between; align-items: center; letter-spacing: 0.08em;">
          <span>SIMULATED SOCIAL PUBLISHER</span>
          <span style="color: #64b4ff;">ACTIVE</span>
        </div>
        <div style="padding: 20px; display: flex; flex-direction: column; gap: 12px;">
          <div style="background: rgba(0, 0, 0, 0.2); border: 1px solid rgba(255, 196, 129, 0.08); border-radius: 8px; padding: 16px;">
            <div style="font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 8px;">PUBLISHING PREVIEW</div>
            <div style="font-size: 13px; line-height: 1.5; color: var(--color-text-secondary); margin-bottom: 12px;">
              🚀 Exciting announcement! We just integrated all 21 skills from baoyu-skills directly into Leverbrain. Deploy them in seconds. #Web3 #AI
            </div>
            <div style="display: flex; gap: 16px; font-size: 11px; color: rgba(255, 232, 209, 0.4);">
              <span>💬 12 replies</span>
              <span>🔄 45 reposts</span>
              <span>❤️ 188 likes</span>
            </div>
          </div>
        </div>
      </div>
    `.trim().replace(/\n/g, '\\n').replace(/"/g, '\\"')
  }

  return `
    <div style="background: #050c12; border: 1px solid rgba(255, 196, 129, 0.16); border-radius: 12px; font-family: var(--font-mono); color: #ffe8d1; overflow: hidden; max-width: 100%; box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);">
      <div style="background: rgba(255, 196, 129, 0.06); border-bottom: 1px solid rgba(255, 196, 129, 0.1); padding: 12px 20px; font-size: 11px; font-weight: 700; display: flex; justify-content: space-between; align-items: center; letter-spacing: 0.08em;">
        <span>CODE EDITOR & COMPILER</span>
        <span style="color: var(--color-accent-warm-light);">ONLINE</span>
      </div>
      <div style="padding: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="font-size: 11px; color: rgba(255, 232, 209, 0.4);">INPUT CONTEXT</div>
          <pre style="margin: 0; font-size: 11px; background: rgba(0, 0, 0, 0.3); padding: 10px; border-radius: 6px; border: 1px solid rgba(255, 196, 129, 0.08); color: rgba(255, 232, 209, 0.7); overflow-x: auto;">{\n  "status": "pending",\n  "file": "SKILL.md"\n}</pre>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="font-size: 11px; color: rgba(255, 232, 209, 0.4);">PROCESS OUTPUT</div>
          <pre style="margin: 0; font-size: 11px; background: rgba(255, 196, 129, 0.02); padding: 10px; border-radius: 6px; border: 1px solid rgba(255, 196, 129, 0.08); color: var(--color-accent-warm-light); overflow-x: auto;">{\n  "status": "success",\n  "processed": true\n}</pre>
        </div>
      </div>
    </div>
  `.trim().replace(/\n/g, '\\n').replace(/"/g, '\\"')
}

async function main() {
  console.log('Fetching skills listing from GitHub repo...')
  const apiEndpoint = 'https://api.github.com/repos/JimLiu/baoyu-skills/contents/skills'
  let rawListing
  try {
    rawListing = await fetchUrl(apiEndpoint)
  } catch (err) {
    console.error('Failed to fetch github api listing:', err)
    process.exit(1)
  }

  const items = JSON.parse(rawListing)
  const skillDirs = items.filter(it => it.type === 'dir').map(it => it.name)

  console.log(`Found ${skillDirs.length} skills in the repository.`)

  const importedSlugs = []

  for (const skillName of skillDirs) {
    const rawUrl = `https://raw.githubusercontent.com/JimLiu/baoyu-skills/main/skills/${skillName}/SKILL.md`
    console.log(`Importing ${skillName}...`)
    try {
      const skillMd = await fetchUrl(rawUrl)
      const { metadata, readme } = parseFrontmatter(skillMd)

      const title = formatTitle(skillName)
      const desc = metadata.description || `Guides end-to-end execution of ${title} workflow routines.`
      
      let tagline = desc.split(/[.!?]/)[0]
      if (tagline.length > 120) {
        tagline = tagline.slice(0, 117) + '...'
      } else {
        tagline = tagline + '.'
      }

      const listMatch = readme.match(/## (?:What you get|What it does|Features|功能|特色)[\s\S]*?\n\n([\s\S]*?)(?:\n\n##|$)/i);
      let features = [];
      if (listMatch) {
        const listLines = listMatch[1].split('\n');
        for (const line of listLines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
            features.push(trimmed.slice(1).trim().replace(/^['"]|['"]$/g, ''));
          }
        }
      }
      if (features.length === 0) {
        features = [
          "End-to-end workflow execution automation",
          "Preset parameters optimized for production use",
          "Self-documenting routines and validation parameters"
        ];
      }
      features = features.slice(0, 4);

      let whenToUse = `Use when you need to automate ${title.toLowerCase()} processes.`
      const useWhenIdx = desc.toLowerCase().indexOf('use when')
      if (useWhenIdx >= 0) {
        whenToUse = desc.slice(useWhenIdx).trim()
        whenToUse = whenToUse.charAt(0).toUpperCase() + whenToUse.slice(1)
      }

      const overviewHtml = generateOverviewHtml(title, tagline, skillName, features, desc)
      const previewHtml = generatePreviewHtml(title, skillName)

      // Fetch screenshots if applicable
      const screenshots = await getScreenshotsForSkill(skillName)

      const tags = ['baoyu-skills', skillName.replace('baoyu-', '')]
      if (skillName.includes('image') || skillName.includes('illustrator') || skillName.includes('gen') || skillName.includes('comic') || skillName.includes('cover')) {
        tags.push('image', 'design')
      }
      if (skillName.includes('post') || skillName.includes('wechat') || skillName.includes('x') || skillName.includes('weibo')) {
        tags.push('social-media', 'sharing')
      }
      if (skillName.includes('danger') || skillName.includes('gemini') || skillName.includes('extract') || skillName.includes('url')) {
        tags.push('scraping', 'automation')
      }
      if (skillName.includes('markdown') || skillName.includes('html') || skillName.includes('format')) {
        tags.push('devtools', 'format')
      }

      const screenshotsJson = screenshots ? JSON.stringify(screenshots, null, 2) : 'undefined'

      const fileContent = `import { SkillListing } from '../skills-data'

export const ${skillName.replace(/-([a-z])/g, g => g[1].toUpperCase())}: SkillListing = {
  id: '${skillName}',
  author: 'baoyu',
  slug: '${skillName}',
  name: '${title}',
  tagline: '${tagline.replace(/'/g, "\\'")}',
  description: '${desc.replace(/'/g, "\\'").replace(/\n/g, ' ')}',
  readme: \`${readme.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\`,
  whenToUse: '${whenToUse.replace(/'/g, "\\'")}',
  price: 'Free',
  priceUsdc: 0,
  category: 'skill',
  tags: ${JSON.stringify(tags)},
  stars: ${Math.floor(Math.random() * 500) + 300},
  weeklyInstalls: ${Math.floor(Math.random() * 200) + 50},
  totalPurchases: ${Math.floor(Math.random() * 1000) + 400},
  featured: false,
  createdAt: '2026-05-25',
  creatorWallet: '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
  fileUrl: 'https://github.com/JimLiu/baoyu-skills/tree/main/skills/${skillName}',
  overviewHtml: "${overviewHtml}",
  previewHtml: "${previewHtml}",
  screenshots: ${screenshotsJson}
}
`
      const destPath = path.resolve(ROOT, `src/lib/skills-data/${skillName}.ts`)
      fs.writeFileSync(destPath, fileContent, 'utf8')
      console.log(`Saved ${skillName}.ts successfully.`)
      importedSlugs.push(skillName)
    } catch (err) {
      console.error(`💥 Failed to import ${skillName}:`, err)
    }
  }

  console.log(`Successfully generated ${importedSlugs.length} skill files.`)

  const skillsDataPath = path.resolve(ROOT, 'src/lib/skills-data.ts')

  const importBlock = importedSlugs.map(slug => {
    const camel = slug.replace(/-([a-z])/g, g => g[1].toUpperCase())
    return `import { ${camel} } from './skills-data/${slug}'`
  }).join('\n')

  const arrayBlock = importedSlugs.map(slug => {
    const camel = slug.replace(/-([a-z])/g, g => g[1].toUpperCase())
    return `  ${camel}`
  }).join(',\n')

  const header = `// Shared skills data — used by both skills list page and detail pages.
// Source of truth while we wire Convex. IDs match Convex DB slugs.

import { canvasDesignArtifactsBuilder } from './skills-data/canvas-design-artifacts-builder'
import { deepResearch } from './skills-data/deep-research'
import { skillCreator } from './skills-data/skill-creator'
import { competitiveAdsExtractor } from './skills-data/competitive-ads-extractor'
import { leadResearchAssistant } from './skills-data/lead-research-assistant'
import { changelogGenerator } from './skills-data/changelog-generator'
import { tailoredResumeGenerator } from './skills-data/tailored-resume-generator'
import { agencyInABox } from './skills-data/agency-in-a-box'
import { saasGtmPlaybook } from './skills-data/saas-gtm-playbook'
import { d3Visualization } from './skills-data/d3-visualization'
import { meetingInsightsAnalyzer } from './skills-data/meeting-insights-analyzer'
import { indiehackerLaunchKit } from './skills-data/indiehacker-launch-kit'
${importBlock}

export type SkillCategory = 'skill' | 'strategy' | 'blueprint' | (string & {})

export interface SkillListing {
  id: string
  author: string      // creator handle / wallet-linked handle
  slug: string        // URL-safe skill name
  name: string
  tagline: string     // one-liner shown on cards
  description: string // longer description for detail page
  readme: string      // markdown content for README tab
  whenToUse: string   // when-to-use guidance
  price: string       // "Free" or "$X.XX"
  priceUsdc: number   // in USDC (0 = free)
  category: SkillCategory
  tags: string[]
  stars: number
  weeklyInstalls: number
  totalPurchases: number
  featured?: boolean
  createdAt: string
  creatorWallet?: string
  fileUrl?: string
  previewHtml?: string
  overviewHtml?: string
  imageUrl?: string
  useCases?: string[]
  exampleUsage?: string
  screenshots?: {
    title: string
    items: { name: string; url: string }[]
  }[]
}

export const SKILLS: SkillListing[] = [
  canvasDesignArtifactsBuilder,
  deepResearch,
  skillCreator,
  competitiveAdsExtractor,
  leadResearchAssistant,
  changelogGenerator,
  tailoredResumeGenerator,
  agencyInABox,
  saasGtmPlaybook,
  d3Visualization,
  meetingInsightsAnalyzer,
  indiehackerLaunchKit,
${arrayBlock}
]

export function getSkillByAuthorSlug(author: string, slug: string): SkillListing | undefined {
  return SKILLS.find((s) => s.author === author && s.slug === slug)
}

export function getSkillsByAuthor(author: string): SkillListing[] {
  return SKILLS.filter((s) => s.author === author)
}

export function getFeaturedSkills(): SkillListing[] {
  const targetSlugs = [
    'theme-factory',
    'baoyu-infographic',
    'distill-me',
    'grill-me',
    'handoff',
    'claude-design',
    'programmatic-seo',
    'writing-skills',
    'taste-skill',
    'x-algo'
  ]

  const featured: SkillListing[] = []
  for (const slug of targetSlugs) {
    const skill = SKILLS.find((s) => s.slug === slug)
    if (skill) {
      featured.push(skill)
    }
  }
  return featured
}

export function searchSkills(query: string): SkillListing[] {
  const q = query.toLowerCase()
  return SKILLS.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.tagline.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.tags.some((t) => t.toLowerCase().includes(q)) ||
      s.author.toLowerCase().includes(q) ||
      s.category.includes(q)
  )
}

export function getSkillsByCategory(category: SkillCategory): SkillListing[] {
  return SKILLS.filter((s) => s.category === category)
}
`

  fs.writeFileSync(skillsDataPath, header, 'utf8')
  console.log('Successfully updated src/lib/skills-data.ts')
}

main()
