#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { Command } from 'commander'
import YAML from 'yaml'
import chalk from 'chalk'
import axios from 'axios'
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

interface GitHubFile {
  name: string
  path: string
  type: 'file' | 'dir'
  download_url: string | null
}

function parseGitHubUrl(url: string) {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)(?:\/tree\/([^/]+)\/(.+))?/)
  if (!match) return null
  return {
    owner: match[1],
    repo: match[2],
    branch: match[3] || 'main',
    path: match[4] || '',
  }
}

function getGitHubRepoDetails(author: string, slug: string) {
  const normAuthor = author.toLowerCase()
  let owner = 'leverbrain'
  let repo = 'leverbrain'
  let path = `skills/${slug}`
  let branch = 'main'

  if (normAuthor === 'anthropics') {
    owner = 'anthropics'
    repo = 'skills'
  } else if (normAuthor === 'composiohq' || normAuthor === 'composio') {
    owner = 'composiohq'
    repo = 'skills'
  } else if (normAuthor === '199-biotechnologies') {
    owner = '199-biotechnologies'
    repo = 'skills'
  } else if (normAuthor === 'baoyu' || normAuthor === 'jimliu') {
    owner = 'JimLiu'
    repo = 'baoyu-skills'
    path = `skills/${slug}`
  }

  return { owner, repo, path, branch }
}

async function downloadDirectory(
  owner: string,
  repo: string,
  dirPath: string,
  localDestPath: string,
  branch: string = 'main'
) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${dirPath}?ref=${branch}`
  const response = await axios.get<GitHubFile[]>(url, {
    headers: {
      'User-Agent': 'leverbrain-cli',
    },
  })

  const files = response.data
  if (!fs.existsSync(localDestPath)) {
    fs.mkdirSync(localDestPath, { recursive: true })
  }

  for (const file of files) {
    const localPath = path.join(localDestPath, file.name)
    if (file.type === 'dir') {
      await downloadDirectory(owner, repo, file.path, localPath, branch)
    } else if (file.type === 'file' && file.download_url) {
      console.log(chalk.dim(`  Downloading ${file.path}...`))
      const fileRes = await axios.get(file.download_url, { responseType: 'arraybuffer' })
      fs.writeFileSync(localPath, fileRes.data)
    }
  }
}

program
  .command('get')
  .description('Download a skill repository from GitHub')
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

    console.log(chalk.cyan(`Found skill: ${skill.name} (${skill.author}/${skill.slug})`))

    let githubDetails = skill.fileUrl ? parseGitHubUrl(skill.fileUrl) : null
    if (!githubDetails) {
      githubDetails = getGitHubRepoDetails(skill.author, skill.slug)
    }

    const destDir = path.resolve(process.cwd(), skill.slug)
    console.log(chalk.yellow(`Downloading repository contents to ${destDir}...`))

    try {
      await downloadDirectory(
        githubDetails.owner,
        githubDetails.repo,
        githubDetails.path,
        destDir,
        githubDetails.branch
      )
      console.log(chalk.green(`\nSuccess! Downloaded skill package to ./${skill.slug}/`))
    } catch (err: any) {
      console.error(chalk.red('\nFailed to download repository contents:'), err instanceof Error ? err.message : err)
      process.exit(1)
    }
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

program
  .command('cfg')
  .description('Download all skills in a saved configuration')
  .argument('<identifier>', 'handle/config-name')
  .action(async (identifier) => {
    const parts = identifier.split('/')
    const handle = parts[0]
    const name = parts.slice(1).join('/')
    if (!handle || !name) {
      throw new Error('Identifier must be in the form handle/config-name')
    }

    const cleanHandle = handle.startsWith('@') ? handle.slice(1) : handle

    console.log(chalk.cyan(`Fetching configuration "${name}" for @${cleanHandle}...`))
    const client = createClient()
    const config = await client.getConfig(cleanHandle, name)

    if (!config) {
      console.log(chalk.yellow(`Configuration or user profile not found.`))
      return
    }

    if (!config.skills || config.skills.length === 0) {
      console.log(chalk.yellow('Configuration contains no skills.'))
      return
    }

    console.log(chalk.green(`Found configuration with ${config.skills.length} skills.`))

    for (const skillItem of config.skills) {
      console.log(chalk.cyan(`\nProcessing skill: ${skillItem.author}/${skillItem.slug}...`))
      const skill = await client.getSkill(skillItem.author, skillItem.slug)
      if (!skill) {
        console.log(chalk.red(`  Skill ${skillItem.author}/${skillItem.slug} not found on marketplace.`))
        continue
      }

      let githubDetails = skill.fileUrl ? parseGitHubUrl(skill.fileUrl) : null
      if (!githubDetails) {
        githubDetails = getGitHubRepoDetails(skill.author, skill.slug)
      }

      const destDir = path.resolve(process.cwd(), skill.slug)
      console.log(chalk.yellow(`  Downloading repository contents to ${destDir}...`))

      try {
        await downloadDirectory(
          githubDetails.owner,
          githubDetails.repo,
          githubDetails.path,
          destDir,
          githubDetails.branch
        )
        console.log(chalk.green(`  Success! Downloaded to ./${skill.slug}/`))
      } catch (err: any) {
        console.error(chalk.red(`  Failed to download ${skill.slug}:`), err instanceof Error ? err.message : err)
      }
    }
    console.log(chalk.bold.green('\nConfiguration download complete!'))
  })

program.parse()
