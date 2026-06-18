import { readFileSync } from 'fs'
import { resolve } from 'path'
import { ConvexHttpClient } from 'convex/browser'

const ROOT = resolve('.')
const envRaw = readFileSync(resolve(ROOT, '.env.local'), 'utf8')
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

const client = new ConvexHttpClient(CONVEX_URL)
client.setAdminAuth(DEPLOY_KEY)

async function run() {
  const skill = await client.query('skills:getSkillByAuthorSlug', { author: 'tw93', slug: 'kami' })
  console.log('--- Convex Skill Record ---')
  console.log(JSON.stringify(skill, null, 2))
}

run().catch(console.error)
