#!/usr/bin/env node
/**
 * seed-skills.mjs
 * Reads skillchain-db.csv and upserts all skills into Convex
 * using the @convex-dev/node client with the deploy key.
 *
 * Usage:
 *   node scripts/seed-skills.mjs
 */

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { ConvexHttpClient } from 'convex/browser'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

// ── load .env.local ──────────────────────────────────────────────────────────
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

if (!CONVEX_URL) { console.error('Missing NEXT_PUBLIC_CONVEX_URL'); process.exit(1) }
if (!DEPLOY_KEY) { console.error('Missing CONVEX_DEPLOY_KEY'); process.exit(1) }

// ── CSV parser ────────────────────────────────────────────────────────────────
function parseCsvLine(line) {
  const result = []
  let current = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++ }
      else { inQuotes = !inQuotes }
    } else if (ch === ',' && !inQuotes) {
      result.push(current); current = ''
    } else {
      current += ch
    }
  }
  result.push(current)
  return result
}

function parseCsv(text) {
  const lines = text.split('\n').filter(l => l.trim())
  const headers = parseCsvLine(lines[0])
  return lines.slice(1)
    .map(line => {
      const values = parseCsvLine(line)
      const obj = {}
      headers.forEach((h, i) => { obj[h] = values[i] ?? '' })
      return obj
    })
    .filter(r => r['id']?.trim())
}

function parseCount(raw) {
  if (!raw || raw === 'False' || raw === 'True') return 0
  const s = raw.toString().trim().toLowerCase().replace(/[^0-9.km]/g, '')
  if (!s) return 0
  if (s.includes('m')) return Math.round(parseFloat(s) * 1_000_000)
  if (s.includes('k')) return Math.round(parseFloat(s) * 1_000)
  return parseInt(s, 10) || 0
}

function mapRow(row) {
  const id = row['id']?.trim()
  if (!id) return null
  const rawAuthor = (row['author'] || 'community').trim()
  const author = rawAuthor.toLowerCase().replace(/[^a-z0-9_-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'community'
  const slug = id.toLowerCase().replace(/[^a-z0-9_-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
  const tags = (row['tags'] || '').split('|').map(t => t.trim()).filter(Boolean)
  const stars = parseCount(row['stars'])
  const priceRaw = (row['price'] || 'free').toLowerCase().trim()
  const priceUsdc = (priceRaw === 'free' || !priceRaw) ? 0 : parseFloat(priceRaw.replace('$', '')) || 0
  const price = priceUsdc === 0 ? 'Free' : `$${priceUsdc.toFixed(2)}`
  const category = (row['category'] || 'skill').trim()
  const description = (row['description'] || row['name'] || '').trim()
  const tagline = description.length > 120 ? description.slice(0, 117) + '...' : description
  const qualityScore = parseInt(row['quality_score'], 10) || 0
  const featured = qualityScore >= 75
  const source = (row['source'] || '').trim()
  const fileUrl = source
    ? (source.startsWith('http://') || source.startsWith('https://') ? source : `https://github.com/${source}`)
    : undefined
  return {
    skillId: id,
    author,
    slug,
    name: (row['name'] || id).trim(),
    tagline,
    description,
    price,
    priceUsdc,
    category,
    tags,
    ...(stars > 0 ? { stars } : {}),
    featured,
    ...(fileUrl ? { fileUrl } : {}),
    createdAt: row['last_updated'] || new Date().toISOString().slice(0, 10),
  }
}

// ── main ─────────────────────────────────────────────────────────────────────
async function main() {
  // The ConvexHttpClient accepts deploy keys directly — they're used as admin tokens
  const client = new ConvexHttpClient(CONVEX_URL)
  client.setAdminAuth(DEPLOY_KEY)

  const csvPath = resolve(ROOT, 'skillchain-db.csv')
  const rows = parseCsv(readFileSync(csvPath, 'utf8'))
  console.log(`📂 Parsed ${rows.length} rows from skillchain-db.csv`)
  console.log(`🔗 Convex: ${CONVEX_URL}\n`)

  let success = 0, failed = 0
  const errors = []

  const BATCH = 8
  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH)
    const results = await Promise.allSettled(
      batch.map(row => {
        const skill = mapRow(row)
        if (!skill) return Promise.reject(new Error('empty row'))
        return client.mutation('skills:upsertSkill', skill)
      })
    )
    for (let j = 0; j < results.length; j++) {
      if (results[j].status === 'fulfilled') {
        success++
      } else {
        failed++
        errors.push({ id: batch[j]['id'], error: String(results[j].reason).slice(0, 100) })
      }
    }
    process.stdout.write(`\r✅ ${success} upserted, ❌ ${failed} failed — ${Math.min(i + BATCH, rows.length)}/${rows.length}`)
    if (i + BATCH < rows.length) await new Promise(r => setTimeout(r, 100))
  }

  console.log('\n')
  console.log(`✅ Seeded:  ${success}`)
  console.log(`❌ Failed:  ${failed}`)
  if (errors.length) {
    console.log('\nFailed:')
    errors.slice(0, 20).forEach(e => console.log(`  ${e.id}: ${e.error}`))
    if (errors.length > 20) console.log(`  ... ${errors.length - 20} more`)
  }
}

main().catch(err => { console.error('\n💥', err); process.exit(1) })
