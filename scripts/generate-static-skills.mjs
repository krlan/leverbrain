import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

function escapeForTemplateLiteral(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\${/g, '\\${')
}

function parseMarkdownWithFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/
  const match = content.match(frontmatterRegex)
  
  let metadata = {}
  let readme = content

  if (match) {
    readme = content.slice(match[0].length)
    const yamlLines = match[1].split('\n')
    for (const line of yamlLines) {
      const parts = line.split(':')
      if (parts.length >= 2) {
        const key = parts[0].trim()
        let val = parts.slice(1).join(':').trim()
        // Strip outer quotes if any
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1)
        }
        metadata[key] = val
      }
    }
  }

  return { metadata, readme }
}

function main() {
  const leverbrainSkillPath = path.resolve(ROOT, 'skills/leverbrain/SKILL.md')
  const ccdSkillPath = path.resolve(ROOT, 'ccd.md')
  const outDir = path.resolve(ROOT, 'src/lib/skills-data')

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }

  // 1. Generate Leverbrain Skill
  console.log(`Reading ${leverbrainSkillPath}...`)
  const { metadata: lbMeta, readme: lbReadme } = parseMarkdownWithFrontmatter(leverbrainSkillPath)
  
  const lbContent = `import { SkillListing } from '../skills-data'

export const leverbrain: SkillListing = {
  id: 'leverbrain',
  author: 'leverbrain',
  slug: 'leverbrain',
  name: 'Leverbrain',
  tagline: 'Navigate and orchestrate skills in the Leverbrain Solana marketplace.',
  description: \`${escapeForTemplateLiteral(lbMeta.description || 'Interacts with the Leverbrain marketplace, purchase or download agent skills, publish new blueprints or strategies, manage stack configurations.')}\`,
  readme: \`${escapeForTemplateLiteral(lbReadme)}\`,
  whenToUse: 'Use this skill to fetch, publish, and configure agent capabilities within the Leverbrain marketplace ecosystem.',
  price: 'Free',
  priceUsdc: 0,
  category: 'skill',
  tags: ['marketplace', 'solana', 'cli', 'sdk'],
  stars: 350,
  weeklyInstalls: 120,
  totalPurchases: 0,
  featured: true,
  createdAt: '2026-05-31',
  creatorWallet: '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
  fileUrl: 'https://github.com/leverbrain/leverbrain/tree/main/skills/leverbrain',
  imageUrl: '/images/levie.png',
  useCases: [
    "Get and install marketplace routines via CLI.",
    "Save and download custom developer configs (labs).",
    "Publish and monetize skills, strategies, or blueprints."
  ],
  exampleUsage: "npx -y leverbrain get leverbrain/leverbrain",
  overviewHtml: \`
    <div class="skill-enrichment">
      <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; margin-bottom: 32px; border: 1px solid var(--color-border);">
        <img src="/images/levie.png" style="width: 100%; aspect-ratio: 16/7; object-fit: contain; opacity: 0.8; padding: 24px; background: rgba(0,0,0,0.4);" />
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 40%, #120e0a 95%);"></div>
        <div style="position: absolute; bottom: 24px; left: 24px;">
          <h2 style="font-family: var(--font-display); color: var(--color-accent); margin: 0; font-size: 32px;">Leverbrain Skill</h2>
          <p style="margin: 8px 0 0; color: var(--color-text-secondary);">Marketplace and Configuration stack controls.</p>
        </div>
      </div>
      <div>
        <h3 style="color: var(--color-text-primary); margin-bottom: 16px;">Description</h3>
        <p style="margin-bottom: 24px;">Essential skill when asked to retrieve marketplace items, configure developer labs, or use CLI commands to orchestrate agent tools.</p>
      </div>
    </div>
  \`,
  previewHtml: \`
    <div style="background: #120e0a; border: 1px solid #ffbc6844; border-radius: 12px; font-family: 'Saira', sans-serif; color: #ffe3be; padding: 24px;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
        <img src="/images/levie.png" style="width: 32px; height: 32px;" />
        <div>
          <h4 style="margin: 0; color: var(--color-accent);">LEVERBRAIN CLI ACTIVE</h4>
          <span style="font-size: 10px; color: var(--color-text-tertiary);">CONNECTED TO MAINNET</span>
        </div>
      </div>
      <code style="font-family: monospace; font-size: 12px; color: #34d399; background: #000; display: block; padding: 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.05);">
        $ npx leverbrain get leverbrain/leverbrain<br/>
        Downloading skill leverbrain... Done!<br/>
        Registered: @leverbrain/leverbrain
      </code>
    </div>
  \`
}
`

  const lbOutPath = path.resolve(outDir, 'leverbrain.ts')
  fs.writeFileSync(lbOutPath, lbContent, 'utf8')
  console.log(`Generated ${lbOutPath}`)

  console.log('Done!')
}

main()
