import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { ConvexHttpClient } from 'convex/browser'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

// Load environment variables
const envRaw = fs.readFileSync(path.resolve(ROOT, '.env.local'), 'utf8')
const env = {}
for (const line of envRaw.split('\n')) {
  const stripped = line.split('#')[0].trim()
  if (!stripped) continue
  const eq = stripped.indexOf('=')
  if (eq < 0) continue
  env[stripped.slice(0, eq).trim()] = stripped.slice(eq + 1).trim()
}

const CONVEX_URL = env['NEXT_PUBLIC_CONVEX_URL']
const DEPLOY_KEY = env['CONVEX_DEPLOY_KEY']

if (!CONVEX_URL || !DEPLOY_KEY) {
  console.error('Missing CONVEX_URL or DEPLOY_KEY in .env.local')
  process.exit(1)
}

const client = new ConvexHttpClient(CONVEX_URL)
client.setAdminAuth(DEPLOY_KEY)

// Read and parse each TS file under src/lib/skills-data/
const skillsDir = path.resolve(ROOT, 'src/lib/skills-data')
const files = fs.readdirSync(skillsDir).filter(f => f.endsWith('.ts') && f !== 'index.ts')

console.log(`Found ${files.length} static skills to seed.`)

for (const file of files) {
  const filePath = path.resolve(skillsDir, file)
  const content = fs.readFileSync(filePath, 'utf8')
  
  // Strip import statements and type annotations
  let js = content
    .replace(/import\s+[\s\S]*?from\s+['"].*?['"]/g, '') // remove imports
    .replace(/:\s*SkillListing/g, '') // remove type annotation
    .replace(/export\s+const\s+(\w+)\s*=\s*/g, 'globalThis.tempSkill = ') // expose to globalThis
  
  try {
    // Run the JS in a new Function
    new Function(js)()
    const skill = globalThis.tempSkill
    if (!skill || !skill.id) {
      console.warn(`Could not parse skill from ${file}`)
      continue
    }

    // Map properties to upsertSkill args
    const payload = {
      skillId: skill.id,
      author: skill.author,
      slug: skill.slug,
      name: skill.name,
      tagline: skill.tagline,
      description: skill.description,
      readme: skill.readme,
      whenToUse: skill.whenToUse,
      price: skill.price,
      priceUsdc: skill.priceUsdc,
      category: skill.category,
      tags: skill.tags,
      stars: skill.stars,
      weeklyInstalls: skill.weeklyInstalls,
      totalPurchases: skill.totalPurchases,
      featured: skill.featured ?? false,
      creatorWallet: skill.creatorWallet || '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8', // fallback to platform treasury
      fileUrl: skill.fileUrl,
      previewHtml: skill.previewHtml,
      overviewHtml: skill.overviewHtml,
      imageUrl: skill.imageUrl,
      createdAt: skill.createdAt || new Date().toISOString().slice(0, 10),
    }

    const id = await client.mutation('skills:upsertSkill', payload)
    console.log(`✅ Upserted ${skill.author}/${skill.slug} (ID: ${id})`)
  } catch (err) {
    console.error(`💥 Failed to parse/seed ${file}:`, err)
  }
}
