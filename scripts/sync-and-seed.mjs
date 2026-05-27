import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { ConvexHttpClient } from 'convex/browser'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

// Load environment variables from .env.local
const envLocalPath = path.resolve(ROOT, '.env.local')
if (!fs.existsSync(envLocalPath)) {
  console.error('Error: .env.local file not found!')
  process.exit(1)
}

const envRaw = fs.readFileSync(envLocalPath, 'utf8')
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
  console.error('Missing NEXT_PUBLIC_CONVEX_URL or CONVEX_DEPLOY_KEY in .env.local')
  process.exit(1)
}

const client = new ConvexHttpClient(CONVEX_URL)
client.setAdminAuth(DEPLOY_KEY)

async function main() {
  const skillsDir = path.resolve(ROOT, 'src/lib/skills-data')
  if (!fs.existsSync(skillsDir)) {
    console.error('Skills data directory does not exist!')
    process.exit(1)
  }

  const files = fs.readdirSync(skillsDir).filter(f => f.endsWith('.ts') && f !== 'index.ts')
  console.log(`Loading ${files.length} static skills...`)

  const staticSkills = []
  const staticKeys = new Set()

  for (const file of files) {
    const filePath = path.resolve(skillsDir, file)
    const content = fs.readFileSync(filePath, 'utf8')
    
    // Strip imports and type annotations
    let js = content
      .replace(/import\s+[\s\S]*?from\s+['"].*?['"]/g, '') // remove imports
      .replace(/:\s*SkillListing/g, '') // remove type annotation
      .replace(/export\s+const\s+(\w+)\s*=\s*/g, 'globalThis.tempSkill = ') // expose to globalThis

    try {
      new Function(js)()
      const skill = globalThis.tempSkill
      if (skill && skill.id) {
        staticSkills.push(skill)
        staticKeys.add(`${skill.author.toLowerCase()}/${skill.slug.toLowerCase()}`)
      } else {
        console.warn(`Could not parse skill object from ${file}`)
      }
    } catch (err) {
      console.error(`Error parsing skill file ${file}:`, err.message)
    }
  }

  console.log(`Loaded ${staticSkills.length} valid static skills.`)

  // Fetch all skills currently in Convex DB
  console.log('Fetching existing skills from Convex...')
  const dbSkills = await client.query('skills:listSkills', {})
  console.log(`Found ${dbSkills.length} skills in Convex.`)

  // Identify and delete legacy skills
  let deletedCount = 0
  for (const dbSkill of dbSkills) {
    const key = `${dbSkill.author.toLowerCase()}/${dbSkill.slug.toLowerCase()}`
    if (!staticKeys.has(key)) {
      console.log(`🗑️ Deleting legacy skill: ${dbSkill.author}/${dbSkill.slug}`)
      try {
        await client.mutation('skills:deleteSkillByAuthorSlug', {
          author: dbSkill.author,
          slug: dbSkill.slug
        })
        deletedCount++
      } catch (err) {
        console.error(`Failed to delete ${dbSkill.author}/${dbSkill.slug}:`, err.message)
      }
    }
  }
  console.log(`Cleanup complete: deleted ${deletedCount} legacy skills.`)

  // Seeding/Upserting current skills
  console.log('Seeding current skills into Convex...')
  let successCount = 0
  let failCount = 0

  for (const skill of staticSkills) {
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
      creatorWallet: skill.creatorWallet || '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
      fileUrl: skill.fileUrl,
      previewHtml: skill.previewHtml,
      overviewHtml: skill.overviewHtml,
      imageUrl: skill.imageUrl,
      createdAt: skill.createdAt || new Date().toISOString().slice(0, 10),
    }

    try {
      await client.mutation('skills:upsertSkill', payload)
      successCount++
    } catch (err) {
      console.error(`💥 Failed to seed ${skill.author}/${skill.slug}:`, err.message)
      failCount++
    }
  }

  console.log('\n--- Sync and Seeding Complete ---')
  console.log(`Seeded/Upserted: ${successCount}`)
  console.log(`Failed:          ${failCount}`)
}

main().catch(err => {
  console.error('Fatal error in sync-and-seed:', err)
  process.exit(1)
})
