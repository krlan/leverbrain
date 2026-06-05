import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { ConvexHttpClient } from 'convex/browser'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

// Load environment variables
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
  console.error('Missing Convex configuration in .env.local')
  process.exit(1)
}

const client = new ConvexHttpClient(CONVEX_URL)
client.setAdminAuth(DEPLOY_KEY)

const EXCLUDED_SLUGS = new Set([
  'agency-in-a-box',
  'indiehacker-launch-kit',
  'saas-gtm-playbook',
  'ccd',
  'youtube-summary',
  'cold-outreach-female-accounts',
  'yt-to-blog',
  'feydefi-geo-audit-optimizer',
  'jackfriks-b2c-marketing',
  'ryudi84-sovereign-brand-voice-writer',
  'faceless-page-anonymity',
  'linkedin-b2b-funnel',
  'linkedin-opportunity',
  'outbound-ecosystem',
  'reddit-mrr-playbook',
  'trendjacking-linkedin',
  'white-page-empire'
])

function isLinkFallback(fileUrl, author) {
  const normAuthor = (author || '').toLowerCase()
  if (!fileUrl) {
    return true
  }
  // If the link points to Leverbrain repo but the author is not Leverbrain, it's an incorrect fallback.
  if (fileUrl.includes('leverbrain/leverbrain') && normAuthor !== 'leverbrain') {
    return true
  }
  return false
}

async function validateLocalFiles() {
  console.log('--- Stage 1: Validating Local Static Files ---')
  const skillsDir = path.resolve(ROOT, 'src/lib/skills-data')
  if (!fs.existsSync(skillsDir)) {
    console.error('Skills data directory does not exist!')
    return { success: false, fallbacks: [] }
  }

  const files = fs.readdirSync(skillsDir).filter(f => {
    if (!f.endsWith('.ts') || f === 'index.ts') return false
    const basename = f.slice(0, -3)
    return !EXCLUDED_SLUGS.has(basename)
  })
  console.log(`Scanning ${files.length} static skill files...`)

  const fallbacks = []
  let correctCount = 0

  for (const file of files) {
    const filePath = path.resolve(skillsDir, file)
    const content = fs.readFileSync(filePath, 'utf8')
    
    // Strip imports and type annotations to parse as JS object
    let js = content
      .replace(/import\s+[\s\S]*?from\s+['"].*?['"]/g, '')
      .replace(/:\s*SkillListing/g, '')
      .replace(/export\s+const\s+(\w+)\s*=\s*/g, 'globalThis.tempSkill = ')

    try {
      new Function(js)()
      const skill = globalThis.tempSkill
      if (skill && skill.id) {
        const fileUrl = skill.fileUrl || ''
        const author = skill.author || ''
        if (isLinkFallback(fileUrl, author)) {
          fallbacks.push({
            source: 'Local File',
            file: file,
            id: skill.id,
            author: author,
            slug: skill.slug,
            fileUrl: fileUrl || '(none)'
          })
        } else {
          correctCount++
        }
      } else {
        console.warn(`Could not parse skill object from ${file}`)
      }
    } catch (err) {
      console.error(`Error parsing skill file ${file}:`, err.message)
    }
  }

  console.log(`Local Files Scan Results: ${correctCount} correct, ${fallbacks.length} incorrect fallbacks.\n`)
  return { success: fallbacks.length === 0, fallbacks }
}

async function validateConvexDb() {
  console.log('--- Stage 2: Validating Convex Database ---')
  console.log('Fetching skills from Convex...')
  const dbSkills = await client.query('skills:listSkills', {})
  console.log(`Fetched ${dbSkills.length} skills from Convex. Validating...`)

  const fallbacks = []
  let correctCount = 0

  for (const skill of dbSkills) {
    if (EXCLUDED_SLUGS.has(skill.slug)) continue
    const fileUrl = skill.fileUrl || ''
    const author = skill.author || ''
    if (isLinkFallback(fileUrl, author)) {
      fallbacks.push({
        source: 'Convex DB',
        id: skill.skillId,
        author: author,
        slug: skill.slug,
        fileUrl: fileUrl || '(none)'
      })
    } else {
      correctCount++
    }
  }

  console.log(`Convex DB Scan Results: ${correctCount} correct, ${fallbacks.length} incorrect fallbacks.\n`)
  return { success: fallbacks.length === 0, fallbacks }
}

async function main() {
  const localResult = await validateLocalFiles()
  const dbResult = await validateConvexDb()

  const allFallbacks = [...localResult.fallbacks, ...dbResult.fallbacks]

  console.log(`=== FINAL VALIDATION SUMMARY ===`)
  console.log(`Total Failures Detected: ${allFallbacks.length}`)
  console.log(`================================\n`)

  if (allFallbacks.length > 0) {
    console.error('❌ VALIDATION FAILED: Some skills are using incorrect fallback repository links!')
    console.table(allFallbacks)
    process.exit(1)
  } else {
    console.log('✅ SUCCESS: All local files and Convex database entries have correct repository links!')
    process.exit(0)
  }
}

main().catch(err => {
  console.error('Fatal error in validation:', err)
  process.exit(1)
})
