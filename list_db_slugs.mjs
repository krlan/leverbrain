import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { ConvexHttpClient } from 'convex/browser'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envLocalPath = path.resolve(__dirname, '.env.local')

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

async function main() {
  const dbSkills = await client.query('skills:listSkills', {})
  console.log(`Total skills in DB: ${dbSkills.length}`)
  const items = dbSkills.map(s => `${s.author}/${s.slug} (ID: ${s._id || s.id})`).sort()
  for (const item of items) {
    console.log(item)
  }
}

main().catch(console.error)
