#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { Command } from 'commander'
import YAML from 'yaml'
import chalk from 'chalk'
import { LeverbrainClient, type PublishSkillInput, type SkillCategory } from './index'

interface ParsedSkillFile {
  name: string
  description: string
  tagline?: string
  category?: SkillCategory
  tags?: string[]
  price?: number
  whenToUse?: string
}

const program = new Command()

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function parseSkillMarkdown(filePath: string) {
  const source = fs.readFileSync(filePath, 'utf8')
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) {
    throw new Error('SKILL.md must include YAML frontmatter enclosed by --- markers')
  }

  const metadata = YAML.parse(match[1]) as ParsedSkillFile
  return {
    metadata,
    readme: match[2].trim(),
  }
}

function createClient() {
  const rootOptions = program.opts<{ convexUrl?: string }>()
  return new LeverbrainClient({
    convexUrl: rootOptions.convexUrl ?? process.env.LEVERBRAIN_CONVEX_URL,
  })
}

program
  .name('leverbrain')
  .description('CLI to interact with the Leverbrain AI skills marketplace')
  .version('0.2.0')
  .option('--convex-url <url>', 'Convex deployment URL (overrides LEVERBRAIN_CONVEX_URL)')

program
  .command('search')
  .description('Search for skills on the marketplace')
  .argument('<query>', 'search term')
  .action(async (query) => {
    const client = createClient()
    const skills = await client.search(query)

    if (skills.length === 0) {
      console.log(chalk.yellow('No skills found.'))
      return
    }

    for (const skill of skills) {
      console.log(
        `${chalk.cyan(`${skill.author}/${skill.slug}`)}  ${skill.price.padEnd(8)}  ${skill.name}`
      )
    }
  })

program
  .command('publish')
  .description('Publish a skill from a local SKILL.md file')
  .argument('<directory>', 'directory containing SKILL.md')
  .requiredOption('-w, --wallet <wallet>', 'publisher payout wallet')
  .requiredOption('-a, --author <author>', 'author handle/slug')
  .option('-p, --price <price>', 'override frontmatter price in USDC')
  .option('--slug <slug>', 'override slug')
  .action(async (directory, options) => {
    const skillPath = path.resolve(process.cwd(), directory, 'SKILL.md')
    if (!fs.existsSync(skillPath)) {
      throw new Error(`SKILL.md not found at ${skillPath}`)
    }

    const { metadata, readme } = parseSkillMarkdown(skillPath)
    if (!metadata.name || !metadata.description) {
      throw new Error('Frontmatter must include "name" and "description"')
    }

    const priceUsdc =
      options.price !== undefined
        ? Number(options.price)
        : Number(metadata.price ?? 0)
    if (!Number.isFinite(priceUsdc) || priceUsdc < 0) {
      throw new Error('Price must be a valid positive number')
    }

    const slug = options.slug ? slugify(options.slug) : slugify(metadata.name)
    const input: PublishSkillInput = {
      publisherWallet: options.wallet,
      skillId: slug,
      author: options.author,
      slug,
      name: metadata.name,
      tagline: metadata.tagline ?? metadata.description.slice(0, 120),
      description: metadata.description,
      readme,
      whenToUse: metadata.whenToUse,
      priceUsdc,
      category: metadata.category ?? 'skill',
      tags: metadata.tags ?? ['skill'],
    }

    const client = createClient()
    const result = await client.publishSkill(input)
    console.log(
      chalk.green(`Published ${result.author}/${result.slug}`),
      '\n',
      chalk.dim(`Listing URL: https://leverbrain.com/skills/${result.author}/${result.slug}`)
    )
  })

program
  .command('get')
  .description('Get listing details for a skill')
  .argument('<identifier>', 'author/slug identifier')
  .action(async (identifier) => {
    const [author, slug] = identifier.split('/')
    if (!author || !slug) {
      throw new Error('Identifier must be in the form author/slug')
    }

    const client = createClient()
    const skill = await client.getSkill(author, slug)
    if (!skill) {
      console.log(chalk.yellow('Skill not found.'))
      return
    }

    console.log(JSON.stringify(skill, null, 2))
  })

program
  .command('purchases')
  .description('List purchase receipts for a buyer wallet')
  .requiredOption('-w, --wallet <wallet>', 'buyer wallet')
  .action(async (options) => {
    const client = createClient()
    const purchases = await client.getPurchasesByBuyer(options.wallet)
    if (purchases.length === 0) {
      console.log(chalk.yellow('No purchases found.'))
      return
    }

    for (const purchase of purchases) {
      console.log(
        `${chalk.cyan(purchase.skillAuthor ? `${purchase.skillAuthor}/${purchase.skillSlug}` : purchase.skillId)}  ${purchase.txSignature}`
      )
    }
  })

program.parse()
