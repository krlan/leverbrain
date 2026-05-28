import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const scratchDir = '/Users/shark/.gemini/antigravity/scratch/repos'

fs.mkdirSync(scratchDir, { recursive: true })

const repos = [
  {
    author: 'slavingia',
    gitUrl: 'https://github.com/slavingia/skills.git',
    localSubdir: 'slavingia-skills',
    skillsPath: 'skills',
    getFileUrl: (slug) => `https://github.com/slavingia/skills/tree/main/skills/${slug}`
  },
  {
    author: 'affaan-m',
    gitUrl: 'https://github.com/affaan-m/ECC.git',
    localSubdir: 'affaan-m-ecc',
    skillsPath: '.agents/skills',
    getFileUrl: (slug) => `https://github.com/affaan-m/ECC/tree/main/.agents/skills/${slug}`
  },
  {
    author: 'davila7',
    gitUrl: 'https://github.com/davila7/claude-code-templates.git',
    localSubdir: 'davila7-templates',
    skillsPath: 'cli-tool/components/skills',
    getFileUrl: (slug) => `https://github.com/davila7/claude-code-templates/tree/main/cli-tool/components/skills/${slug}`
  },
  {
    author: 'anthropics',
    gitUrl: 'https://github.com/anthropics/skills.git',
    localSubdir: 'anthropics-skills',
    skillsPath: 'skills',
    getFileUrl: (slug) => `https://github.com/anthropics/skills/tree/main/skills/${slug}`
  },
  {
    author: 'trailofbits',
    gitUrl: 'https://github.com/trailofbits/skills.git',
    localSubdir: 'trailofbits-skills',
    skillsPath: 'plugins',
    getFileUrl: (slug) => `https://github.com/trailofbits/skills/tree/main/plugins/${slug}`
  },
  {
    author: 'mattpocock',
    gitUrl: 'https://github.com/mattpocock/skills.git',
    localSubdir: 'mattpocock-skills',
    skillsPath: 'skills',
    getFileUrl: (slug, category) => `https://github.com/mattpocock/skills/tree/main/skills/${category}/${slug}`
  }
]

function cloneOrPull(repo) {
  const dest = path.resolve(scratchDir, repo.localSubdir)
  if (!fs.existsSync(dest)) {
    console.log(`Cloning ${repo.gitUrl} into ${dest}...`)
    execSync(`git clone ${repo.gitUrl} ${dest}`, { stdio: 'inherit' })
  } else {
    console.log(`Repo ${repo.localSubdir} already cloned. Pulling latest...`)
    execSync(`git pull`, { cwd: dest, stdio: 'inherit' })
  }
}

function parseFrontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) {
    return { metadata: {}, readme: source.trim() }
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

function capitalize(str) {
  return str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

function formatTitle(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function getMockIcon(slug) {
  if (slug.includes('image') || slug.includes('design') || slug.includes('video') || slug.includes('media') || slug.includes('art')) {
    return `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`
  }
  if (slug.includes('git') || slug.includes('code') || slug.includes('mcp') || slug.includes('dev') || slug.includes('setup') || slug.includes('database')) {
    return `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`
  }
  if (slug.includes('audit') || slug.includes('security') || slug.includes('test') || slug.includes('check')) {
    return `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
  }
  return `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
}

function getGradient(slug) {
  if (slug.includes('image') || slug.includes('design') || slug.includes('video') || slug.includes('media')) {
    return 'linear-gradient(135deg, #1b1622 0%, #0d131f 100%)'
  }
  if (slug.includes('audit') || slug.includes('security') || slug.includes('test')) {
    return 'linear-gradient(135deg, #1f0d0d 0%, #0e1118 100%)'
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
  `.trim()
}

function generatePreviewHtml(title, slug) {
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
  `.trim()
}

let conversationalMetadataCache = null;

function getHardcodedMetadata(slug) {
  if (!conversationalMetadataCache) {
    const metaPath = path.resolve(ROOT, 'src/lib/conversational-metadata.ts');
    if (!fs.existsSync(metaPath)) {
      conversationalMetadataCache = {};
      return null;
    }
    const content = fs.readFileSync(metaPath, 'utf8');
    let js = content
      .replace(/export\s+const\s+CONVERSATIONAL_METADATA\s*:\s*Record<[\s\S]*?>\s*=\s*/g, 'globalThis.tempMeta = ')
      .replace(/:\s*SkillMetadata/g, '')
      .replace(/interface\s+SkillMetadata\s*\{[\s\S]*?\}/g, '')
      .replace(/export\s+function\s+getConversationalOverview[\s\S]*$/g, '');
    try {
      new Function(js)();
      conversationalMetadataCache = globalThis.tempMeta || {};
    } catch (err) {
      console.warn('Could not parse conversational-metadata.ts:', err.message);
      conversationalMetadataCache = {};
    }
  }
  return conversationalMetadataCache[slug];
}

function extractUseCases(slug, title, desc, readme) {
  const hardcoded = getHardcodedMetadata(slug);
  if (hardcoded && hardcoded.useCases) {
    return hardcoded.useCases;
  }

  const useCases = [];
  if (readme) {
    const lines = readme.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('-') || trimmed.startsWith('*') || /^\d+\./.test(trimmed)) {
        const cleanItem = trimmed
          .replace(/^[-*\d.]+\s+/, '') // strip bullet
          .replace(/`([^`]+)`/g, '$1') // strip backticks
          .replace(/\*\*([^*]+)\*\*/g, '$1') // strip bold
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // strip links
          .trim();
        
        if (cleanItem && cleanItem.length > 10 && cleanItem.length < 150) {
          let formatted = cleanItem.charAt(0).toUpperCase() + cleanItem.slice(1);
          if (!formatted.endsWith('.') && !formatted.endsWith('!') && !formatted.endsWith('?')) {
            formatted += '.';
          }
          if (!useCases.includes(formatted)) {
            useCases.push(formatted);
          }
        }
      }
      if (useCases.length >= 3) break;
    }
  }

  // Fallback to description sentences
  if (useCases.length < 3) {
    const sentences = desc.split(/[.!?]\s+/).map(s => s.trim()).filter(s => s.length > 5);
    for (const s of sentences) {
      let cleanSentence = s.charAt(0).toUpperCase() + s.slice(1);
      if (!cleanSentence.endsWith('.') && !cleanSentence.endsWith('!') && !cleanSentence.endsWith('?')) {
        cleanSentence += '.';
      }
      if (!useCases.includes(cleanSentence)) {
        useCases.push(cleanSentence);
      }
      if (useCases.length >= 3) break;
    }
  }

  // Absolute fallback
  const defaultUseCases = [
    `Automate repetitive ${title.toLowerCase()} development routines.`,
    `Standardize workspace output and document generation for ${title.toLowerCase()}.`,
    `Integrate advanced ${title.toLowerCase()} model directives into your agent pipeline.`
  ];

  while (useCases.length < 3) {
    useCases.push(defaultUseCases[useCases.length]);
  }

  return useCases.slice(0, 3);
}

function generateExampleUsage(slug, name, description, tags) {
  const s = slug.toLowerCase();
  const d = (description || '').toLowerCase();

  if (s.includes('audit') || (s.includes('security') && !s.includes('review'))) return `Run a security audit on my codebase using ${name}`;
  if (s.includes('review') && (s.includes('code') || s.includes('pr'))) return `Review my latest code changes before I merge`;
  if (s.includes('review')) return `Get a detailed review of my work with ${name}`;
  if (s.includes('slide') || s.includes('deck') || s.includes('pptx')) return `Generate a slide deck for my project presentation`;
  if (s.includes('image') && s.includes('gen')) return `Generate custom images for my project`;
  if (s.includes('comic')) return `Turn my story into a visual comic`;
  if (s.includes('diagram')) return `Generate a system architecture diagram for my project`;
  if (s.includes('infographic')) return `Create an infographic visualising my report data`;
  if (s.includes('translate')) return `Translate my document to another language`;
  if (s.includes('markdown') && s.includes('html')) return `Convert my markdown docs to styled HTML pages`;
  if (s.includes('url') && s.includes('markdown')) return `Convert a URL into clean markdown for my notes`;
  if (s.includes('pdf')) return `Extract and process content from my PDF files`;
  if (s.includes('compress')) return `Compress my images without losing quality`;
  if (s.includes('post') && s.includes('wechat')) return `Publish my content to my WeChat account`;
  if (s.includes('post') && s.includes('weibo')) return `Post my content to my Weibo account`;
  if (s.includes('post') && (s.includes('-x') || s.includes('twitter'))) return `Draft and publish a thread to my X account`;
  if (s.includes('crosspost')) return `Cross-post my latest content to all my social channels`;
  if (s.includes('test') && s.includes('e2e')) return `Write end-to-end tests for my critical user flows`;
  if (s.includes('test') || s.includes('tdd')) return `Write tests for my new feature`;
  if (s.includes('mutation')) return `Run mutation tests to find gaps in my test suite`;
  if (s.includes('git') && s.includes('clean')) return `Clean up my git history and remove stale branches`;
  if (s.includes('git')) return `Streamline my git workflow for my project`;
  if (s.includes('mcp')) return `Build an MCP server integration for my custom tool`;
  if (s.includes('api')) return `Design and document my API with best practices`;
  if (s.includes('database') || s.includes('db')) return `Design and query the database schema for my app`;
  if (s.includes('debug') || s.includes('diagnose')) return `Debug the issue in my current codebase`;
  if (s.includes('setup') || s.includes('scaffold')) return `Set up ${name} for my project`;
  if (s.includes('marketing')) return `Create a marketing plan for my product launch`;
  if (s.includes('investor')) return `Prepare investor materials for my fundraising round`;
  if (s.includes('launch')) return `Plan the launch strategy for my product`;
  if (s.includes('research')) return `Research my target market and competitive landscape`;
  if (s.includes('pricing')) return `Design the pricing model for my product`;
  if (s.includes('brand')) return `Define brand guidelines and voice for my company`;
  if (s.includes('agent')) return `Set up an AI agent workflow for my task`;
  if (s.includes('workflow')) return `Automate my manual workflow with an agent`;
  if (s.includes('article') || s.includes('content')) return `Write a polished article for my blog`;
  if (s.includes('design')) return `Improve the design of my project`;
  if (s.includes('video')) return `Process and edit my video files`;
  if (s.includes('media') || s.includes('image')) return `Process and optimise my media files`;

  const verb = d.includes('generat') ? 'Generate' :
               d.includes('analys') || d.includes('analyz') ? 'Analyse' :
               d.includes('convert') ? 'Convert' :
               d.includes('extract') ? 'Extract' :
               d.includes('build') ? 'Build' :
               d.includes('creat') ? 'Create' :
               d.includes('improv') ? 'Improve' :
               d.includes('automat') ? 'Automate' : 'Apply';
  const target = name.charAt(0).toLowerCase() + name.slice(1);
  return `${verb} ${target} for my project`;
}

function processSkillDir(author, slug, folderPath, fileUrl) {
  let mdContent = ''
  let skillFilePath = path.join(folderPath, 'SKILL.md')
  if (!fs.existsSync(skillFilePath)) {
    skillFilePath = path.join(folderPath, 'README.md')
  }

  if (fs.existsSync(skillFilePath)) {
    mdContent = fs.readFileSync(skillFilePath, 'utf8')
  } else {
    // If no markdown file exists, create a default stub
    mdContent = `---\nname: ${slug}\ndescription: Custom workflow skill for ${slug}.\n---\n# ${formatTitle(slug)}\n\nAuto-generated skill stub.`
  }

  const { metadata, readme } = parseFrontmatter(mdContent)
  const title = metadata.name || formatTitle(slug)
  const desc = metadata.description || `Guides end-to-end execution of ${title} workflow routines.`
  
  let tagline = metadata.tagline || desc.split(/[.!?]/)[0]
  if (tagline.length > 120) {
    tagline = tagline.slice(0, 117) + '...'
  } else if (!tagline.endsWith('.')) {
    tagline = tagline + '.'
  }

  // Parse features
  const listMatch = readme.match(/## (?:What you get|What it does|Features|功能|特色)[\s\S]*?\n\n([\s\S]*?)(?:\n\n##|$)/i)
  let features = []
  if (listMatch) {
    const listLines = listMatch[1].split('\n')
    for (const line of listLines) {
      const trimmed = line.trim()
      if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
        features.push(trimmed.slice(1).trim().replace(/^['"]|['"]$/g, ''))
      }
    }
  }
  if (features.length === 0) {
    features = [
      "End-to-end workflow execution automation",
      "Preset parameters optimized for production use",
      "Self-documenting routines and validation parameters"
    ]
  }
  features = features.slice(0, 4)

  let whenToUse = metadata.whenToUse || `Use when you need to automate ${title.toLowerCase()} processes.`
  
  const overviewHtml = generateOverviewHtml(title, tagline, slug, features, desc)
  const previewHtml = generatePreviewHtml(title, slug)
  
  const tags = [author + '-skills', slug]
  if (slug.includes('image') || slug.includes('design') || slug.includes('art')) {
    tags.push('image', 'design')
  }
  if (slug.includes('test') || slug.includes('check') || slug.includes('debug')) {
    tags.push('testing', 'debugging')
  }
  if (slug.includes('git') || slug.includes('code') || slug.includes('dev')) {
    tags.push('devtools')
  }

  const variableName = slug.replace(/-([a-z0-9])/g, g => g[1].toUpperCase())
  const useCases = extractUseCases(slug, title, desc, readme)
  const exampleUsage = generateExampleUsage(slug, title, desc, tags.join(' '))
  
  const tsContent = `import { SkillListing } from '../skills-data'

export const ${variableName}: SkillListing = {
  id: '${slug}',
  author: '${author}',
  slug: '${slug}',
  name: ${JSON.stringify(title)},
  tagline: ${JSON.stringify(tagline)},
  description: ${JSON.stringify(desc)},
  readme: ${JSON.stringify(readme)},
  whenToUse: ${JSON.stringify(whenToUse)},
  price: 'Free',
  priceUsdc: 0,
  category: 'skill',
  tags: ${JSON.stringify(tags)},
  stars: ${Math.floor(Math.random() * 500) + 100},
  weeklyInstalls: ${Math.floor(Math.random() * 200) + 20},
  totalPurchases: ${Math.floor(Math.random() * 1000) + 150},
  featured: false,
  createdAt: '${new Date().toISOString().slice(0, 10)}',
  creatorWallet: '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
  fileUrl: '${fileUrl}',
  useCases: ${JSON.stringify(useCases)},
  exampleUsage: ${JSON.stringify(exampleUsage)},
  overviewHtml: ${JSON.stringify(overviewHtml)},
  previewHtml: ${JSON.stringify(previewHtml)}
}
`

  return {
    slug,
    variableName,
    content: tsContent
  }
}

async function main() {
  console.log('--- Cloning target skill repositories ---')
  for (const repo of repos) {
    cloneOrPull(repo)
  }

  console.log('\n--- Scanning and parsing skills ---')
  const outDir = path.resolve(ROOT, 'src/lib/skills-data')
  fs.mkdirSync(outDir, { recursive: true })

  // Keep track of imported skill definitions
  const importedSkills = []

  // Add retaining skills (baoyu ones already exist in folder, we don't need to rebuild them but we want to retain their listing)
  // Let's read the list of baoyu- files from outDir to see what exists
  const files = fs.readdirSync(outDir)
  const baoyuFiles = files.filter(f => f.startsWith('baoyu-') && f.endsWith('.ts'))
  for (const file of baoyuFiles) {
    const slug = file.slice(0, -3)
    const varName = slug.replace(/-([a-z0-9])/g, g => g[1].toUpperCase())
    importedSkills.push({ author: 'baoyu', slug, variableName: varName })
  }

  // Add the 3 leverbrain skills that are retained
  const retainedLeverbrain = ['agency-in-a-box', 'indiehacker-launch-kit', 'saas-gtm-playbook']
  for (const slug of retainedLeverbrain) {
    const varName = slug.replace(/-([a-z0-9])/g, g => g[1].toUpperCase())
    importedSkills.push({ author: 'leverbrain', slug, variableName: varName })
  }

  // Composio and 199-biotechnologies files will be removed by the automated directory cleanup step at the end of the script.

  // Process slavingia skills (limit to 10)
  const slavingiaRepo = repos.find(r => r.author === 'slavingia')
  const slavingiaLocalDir = path.resolve(scratchDir, slavingiaRepo.localSubdir, slavingiaRepo.skillsPath)
  const slavingiaDirs = fs.readdirSync(slavingiaLocalDir).filter(f => fs.statSync(path.join(slavingiaLocalDir, f)).isDirectory()).slice(0, 10)
  console.log(`Processing ${slavingiaDirs.length} slavingia skills...`)
  for (const slug of slavingiaDirs) {
    const folder = path.join(slavingiaLocalDir, slug)
    const fileUrl = slavingiaRepo.getFileUrl(slug)
    const result = processSkillDir('slavingia', slug, folder, fileUrl)
    fs.writeFileSync(path.join(outDir, `${slug}.ts`), result.content, 'utf8')
    importedSkills.push({ author: 'slavingia', slug, variableName: result.variableName })
  }

  // Process affaan-m ECC skills
  const eccRepo = repos.find(r => r.author === 'affaan-m')
  const eccLocalDir = path.resolve(scratchDir, eccRepo.localSubdir, eccRepo.skillsPath)
  const eccDirs = fs.readdirSync(eccLocalDir).filter(f => fs.statSync(path.join(eccLocalDir, f)).isDirectory())
  console.log(`Processing ${eccDirs.length} ECC skills...`)
  for (const slug of eccDirs) {
    const folder = path.join(eccLocalDir, slug)
    const fileUrl = eccRepo.getFileUrl(slug)
    const result = processSkillDir('affaan-m', slug, folder, fileUrl)
    // Save as ecc-slug to avoid clashing files (like deep-research)
    const outFilename = slug === 'deep-research' ? 'ecc-deep-research' : slug
    const varName = result.variableName === 'deepResearch' ? 'eccDeepResearch' : result.variableName
    const customResult = result.content.replace(`export const ${result.variableName}`, `export const ${varName}`)
    
    fs.writeFileSync(path.join(outDir, `${outFilename}.ts`), customResult, 'utf8')
    importedSkills.push({ author: 'affaan-m', slug, variableName: varName, filename: outFilename })
  }

  // Process davila7 templates skills
  const davilaRepo = repos.find(r => r.author === 'davila7')
  const davilaLocalDir = path.resolve(scratchDir, davilaRepo.localSubdir, davilaRepo.skillsPath)
  const davilaDirs = fs.readdirSync(davilaLocalDir).filter(f => fs.statSync(path.join(davilaLocalDir, f)).isDirectory())
  console.log(`Processing ${davilaDirs.length} davila7 skills...`)
  for (const slug of davilaDirs) {
    const folder = path.join(davilaLocalDir, slug)
    const fileUrl = davilaRepo.getFileUrl(slug)
    const result = processSkillDir('davila7', slug, folder, fileUrl)
    fs.writeFileSync(path.join(outDir, `${slug}.ts`), result.content, 'utf8')
    importedSkills.push({ author: 'davila7', slug, variableName: result.variableName })
  }

  // Process anthropics skills
  const anthroRepo = repos.find(r => r.author === 'anthropics')
  const anthroLocalDir = path.resolve(scratchDir, anthroRepo.localSubdir, anthroRepo.skillsPath)
  const anthroDirs = fs.readdirSync(anthroLocalDir).filter(f => fs.statSync(path.join(anthroLocalDir, f)).isDirectory())
  console.log(`Processing ${anthroDirs.length} anthropics skills...`)
  for (const slug of anthroDirs) {
    const folder = path.join(anthroLocalDir, slug)
    const fileUrl = anthroRepo.getFileUrl(slug)
    const result = processSkillDir('anthropics', slug, folder, fileUrl)
    fs.writeFileSync(path.join(outDir, `${slug}.ts`), result.content, 'utf8')
    importedSkills.push({ author: 'anthropics', slug, variableName: result.variableName })
  }

  // Process trailofbits plugins skills
  const tobRepo = repos.find(r => r.author === 'trailofbits')
  const tobLocalDir = path.resolve(scratchDir, tobRepo.localSubdir, tobRepo.skillsPath)
  const tobDirs = fs.readdirSync(tobLocalDir).filter(f => fs.statSync(path.join(tobLocalDir, f)).isDirectory())
  console.log(`Processing ${tobDirs.length} trailofbits skills...`)
  for (const slug of tobDirs) {
    const folder = path.join(tobLocalDir, slug)
    const fileUrl = tobRepo.getFileUrl(slug)
    const result = processSkillDir('trailofbits', slug, folder, fileUrl)
    fs.writeFileSync(path.join(outDir, `${slug}.ts`), result.content, 'utf8')
    importedSkills.push({ author: 'trailofbits', slug, variableName: result.variableName })
  }

  // Process mattpocock skills
  const mattRepo = repos.find(r => r.author === 'mattpocock')
  const mattLocalDir = path.resolve(scratchDir, mattRepo.localSubdir, mattRepo.skillsPath)
  const mattCategories = ['engineering', 'misc', 'personal', 'productivity', 'in-progress']
  console.log('Processing mattpocock skills across categories...')
  for (const cat of mattCategories) {
    const catPath = path.join(mattLocalDir, cat)
    if (!fs.existsSync(catPath)) continue
    const mattDirs = fs.readdirSync(catPath).filter(f => fs.statSync(path.join(catPath, f)).isDirectory())
    for (const slug of mattDirs) {
      const folder = path.join(catPath, slug)
      const fileUrl = mattRepo.getFileUrl(slug, cat)
      const result = processSkillDir('mattpocock', slug, folder, fileUrl)
      fs.writeFileSync(path.join(outDir, `${slug}.ts`), result.content, 'utf8')
      importedSkills.push({ author: 'mattpocock', slug, variableName: result.variableName })
    }
  }  // Physical cleanup of deleted / untracked files in src/lib/skills-data/
  console.log('\n--- Cleaning up untracked skill files ---')
  const activeFilenames = new Set(importedSkills.map(skill => (skill.filename || skill.slug) + '.ts'))
  const currentFiles = fs.readdirSync(outDir).filter(f => f.endsWith('.ts'))
  let deletedFilesCount = 0
  for (const file of currentFiles) {
    if (!activeFilenames.has(file)) {
      const p = path.join(outDir, file)
      fs.unlinkSync(p)
      console.log(`🗑️ Deleted legacy skill file: ${file}`)
      deletedFilesCount++
    }
  }
  console.log(`Cleanup complete: deleted ${deletedFilesCount} legacy skill files.`)

  console.log('\n--- Regenerating src/lib/skills-data.ts ---')
  // Deduplicate and write skills-data.ts
  const uniqueImports = []
  const seen = new Set()
  for (const skill of importedSkills) {
    const filename = skill.filename || skill.slug
    const key = `${skill.author}/${skill.slug}`
    if (seen.has(key)) continue
    seen.add(key)
    uniqueImports.push({
      importStmt: `import { ${skill.variableName} } from './skills-data/${filename}'`,
      varName: skill.variableName
    })
  }

  const importBlock = uniqueImports.map(x => x.importStmt).join('\n')
  const arrayBlock = uniqueImports.map(x => `  ${x.varName}`).join(',\n')

  const tsFileContent = `// Shared skills data — used by both skills list page and detail pages.
// Source of truth while we wire Convex. IDs match Convex DB slugs.

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
${arrayBlock}
]

export function getSkillByAuthorSlug(author: string, slug: string): SkillListing | undefined {
  return SKILLS.find((s) => s.author.toLowerCase() === author.toLowerCase() && s.slug.toLowerCase() === slug.toLowerCase())
}

export function getSkillsByAuthor(author: string): SkillListing[] {
  return SKILLS.filter((s) => s.author.toLowerCase() === author.toLowerCase())
}

export function getFeaturedSkills(): SkillListing[] {
  const featured = SKILLS
    .filter((s) => s.featured)
    .sort((a, b) => b.totalPurchases - a.totalPurchases)

  if (featured.length >= 10) {
    return featured.slice(0, 10)
  }

  const fallback = SKILLS
    .filter((s) => !s.featured)
    .sort((a, b) => b.totalPurchases - a.totalPurchases)

  return [...featured, ...fallback].slice(0, 10)
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

  fs.writeFileSync(path.resolve(ROOT, 'src/lib/skills-data.ts'), tsFileContent, 'utf8')
  console.log(`\nSuccessfully regenerated src/lib/skills-data.ts with ${uniqueImports.length} skills!`)
}

main().catch(console.error)
