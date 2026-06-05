import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const skillsDir = path.resolve(ROOT, 'skills')
const outDir = path.resolve(ROOT, 'src/lib/skills-data')

// Ensure output directory exists
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true })
}

// Marketing skills set
const marketingSkillsSet = new Set([
  'ab-testing', 'ad-creative', 'ads', 'ai-seo', 'analytics', 'aso', 'churn-prevention',
  'co-marketing', 'cold-email', 'community-marketing', 'competitor-profiling', 'competitors',
  'content-strategy', 'copy-editing', 'copywriting', 'cro', 'customer-research',
  'directory-submissions', 'emails', 'free-tools', 'image', 'launch', 'lead-magnets',
  'marketing-ideas', 'marketing-plan', 'marketing-psychology', 'onboarding', 'paywalls',
  'popups', 'pricing', 'product-marketing', 'programmatic-seo', 'prospecting', 'referrals',
  'revops', 'sales-enablement', 'schema', 'seo-audit', 'signup', 'site-architecture',
  'sms', 'social', 'video'
])

// Taste skills set
const tasteSkillsSet = new Set([
  'brandkit', 'brutalist-skill', 'gpt-tasteskill', 'image-to-code-skill', 'imagegen-frontend-mobile',
  'imagegen-frontend-web', 'minimalist-skill', 'output-skill', 'redesign-skill', 'soft-skill',
  'stitch-skill', 'taste-skill', 'taste-skill-v1'
])

// Helper to escape backticks and templates in readme markdown
function escapeForTemplateLiteral(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\${/g, '\\${')
}

// Parse existing metadata from a compiled TS file if it exists
function getExistingMetadata(filePath) {
  if (!fs.existsSync(filePath)) return null
  const rawContent = fs.readFileSync(filePath, 'utf8')
  
  // Strip multi-line template literal blocks to avoid matching fields inside them
  // We use a robust regex that correctly handles escaped backticks (e.g. \`) inside template literals
  const content = rawContent
    .replace(/readme\s*:\s*\`(?:[^`\\]|\\.)*\`/g, '')
    .replace(/overviewHtml\s*:\s*\`(?:[^`\\]|\\.)*\`/g, '')
    .replace(/previewHtml\s*:\s*\`(?:[^`\\]|\\.)*\`/g, '')

  const metadata = {}
  
  const fields = [
    'author', 'fileUrl', 'createdAt', 'creatorWallet', 'stars', 'weeklyInstalls', 'totalPurchases', 'price', 'priceUsdc', 'category', 'featured'
  ]
  
  for (const field of fields) {
    const regex = new RegExp(`${field}\\s*:\\s*(['"\`]?)(.*?)\\1\\s*(?:,\\s*)?\\r?\\n`)
    const match = content.match(regex)
    if (match) {
      let val = match[2].trim()
      if (val.endsWith(',')) val = val.slice(0, -1).trim()
      if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1)
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1)
      
      if (val === 'true') val = true
      else if (val === 'false') val = false
      else if (field !== 'price' && !isNaN(val) && val !== '' && !val.includes('-')) val = Number(val)
      
      metadata[field] = val
    }
  }
  return metadata;
}

// Parse markdown frontmatter
function parseFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) {
    return { metadata: {}, readme: source.trim() }
  }

  const yamlStr = match[1]
  const readme = match[2].trim()

  const lines = yamlStr.split('\n')
  const metadata = {}
  let currentKey = null
  let currentValue = []
  let isFoldedBlock = false

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const matchKeyVal = line.match(/^([a-zA-Z0-9_-]+)\s*:\s*(.*)$/)
    if (matchKeyVal) {
      if (currentKey) {
        let valStr = currentValue.join(isFoldedBlock ? ' ' : '\n').trim()
        metadata[currentKey] = valStr.replace(/^['"]|['"]$/g, '')
      }
      currentKey = matchKeyVal[1].trim()
      const rest = matchKeyVal[2].trim()
      if (rest === '>' || rest === '|') {
        isFoldedBlock = rest === '>'
        currentValue = []
      } else {
        isFoldedBlock = false
        currentValue = [rest]
      }
    } else {
      if (currentKey) {
        currentValue.push(line.trim())
      }
    }
  }
  
  if (currentKey) {
    let valStr = currentValue.join(isFoldedBlock ? ' ' : '\n').trim()
    metadata[currentKey] = valStr.replace(/^['"]|['"]$/g, '')
  }

  return { metadata, readme }
}

function formatTitle(slug) {
  if (!slug) return '';
  const ABBREVIATIONS = {
    gtm: 'GTM',
    saas: 'SaaS',
    ai: 'AI',
    b2b: 'B2B',
    b2c: 'B2C',
    prd: 'PRD',
    seo: 'SEO',
    tdd: 'TDD',
    mrr: 'MRR',
    cli: 'CLI',
    sdk: 'SDK',
    ecc: 'ECC',
    mcp: 'MCP',
    pdf: 'PDF',
    html: 'HTML',
    css: 'CSS',
    js: 'JS',
    api: 'API',
    usdc: 'USDC',
    yara: 'YARA',
    apk: 'APK',
    fp: 'FP',
    gh: 'GH',
    sms: 'SMS',
    mvp: 'MVP',
    url: 'URL',
    svg: 'SVG',
    json: 'JSON',
    yaml: 'YAML',
    xml: 'XML',
    rss: 'RSS',
    ui: 'UI',
    ux: 'UX',
    ci: 'CI',
    gsd: 'GSD'
  };

  const PROPER_NOUNS = {
    solana: 'Solana',
    claude: 'Claude',
    linkedin: 'LinkedIn',
    youtube: 'YouTube',
    wechat: 'WeChat',
    weibo: 'Weibo',
    reddit: 'Reddit',
    porkbun: 'Porkbun',
    gemini: 'Gemini',
    chrome: 'Chrome',
    git: 'Git',
    semgrep: 'Semgrep',
    'next.js': 'Next.js',
    nextjs: 'Next.js',
    turbopack: 'Turbopack',
    obsidian: 'Obsidian',
    burpsuite: 'BurpSuite',
    gmod: 'Gmod',
    pocketbase: 'Pocketbase',
    sentry: 'Sentry',
    matt: 'Matt',
    pocock: 'Pocock',
    brandkit: 'Brandkit'
  };

  const clean = slug.startsWith('baoyu-') ? slug.slice(6) : slug;
  const words = clean.replace(/-/g, ' ').split(/\s+/).filter(Boolean);
  
  return words.map((word, idx) => {
    const lower = word.toLowerCase();
    
    // Check abbreviations
    if (ABBREVIATIONS[lower]) {
      return ABBREVIATIONS[lower];
    }
    
    // Check proper nouns
    if (PROPER_NOUNS[lower]) {
      return PROPER_NOUNS[lower];
    }
    
    if (idx === 0) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    } else {
      return word.toLowerCase();
    }
  }).join(' ');
}

function extractDescriptionFromReadme(readme) {
  if (!readme) return ''
  const paragraphs = readme.split('\n\n')
  for (let p of paragraphs) {
    p = p.trim()
    if (!p) continue
    if (p.startsWith('#')) continue
    if (p.startsWith('-') || p.startsWith('*') || p.startsWith('1.')) continue
    if (p.startsWith('```')) continue
    let clean = p
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\s+/g, ' ')
      .trim()
    if (clean.length > 30 && clean.length < 400) {
      return clean
    }
  }
  return ''
}

function extractWhenToUseFromReadme(readme) {
  if (!readme) return ''
  const match = readme.match(/## (?:When to Use|When to Use This Skill|适用场景|When to use)[\s\S]*?\n\n([\s\S]*?)(?:\n\n##|$)/i)
  if (match) {
    const lines = match[1].split('\n').map(l => l.trim()).filter(Boolean)
    const paragraphs = []
    for (const line of lines) {
      if (line.startsWith('#') || line.startsWith('`')) break
      paragraphs.push(line)
    }
    const merged = paragraphs.join(' ').replace(/\s+/g, ' ').trim()
    if (merged.length > 15 && merged.length < 600) {
      let clean = merged
        .replace(/`([^`]+)`/g, '$1')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      return clean
    }
  }
  return ''
}

function cleanupDescAndTagline(title, desc, tagline) {
  if (desc.includes('Guides end-to-end execution of')) {
    desc = `Automates ${title.toLowerCase()} workflow routines in your local environment.`
  }
  if (tagline.length > 120) {
    tagline = tagline.slice(0, 117) + '...'
  } else if (!tagline.endsWith('.') && !tagline.endsWith('!') && !tagline.endsWith('?')) {
    tagline = tagline + '.'
  }
  return { desc, tagline }
}

function extractUseCases(slug, title, desc, readme, tagline = '') {
  const useCases = []
  if (readme) {
    const lines = readme.split('\n')
    let currentHeader = ''
    let skipSection = false
    
    const excludeHeaders = [
      'prerequisites', 'prerequisite', 'installation', 'quick start', 'usage', 
      'requirements', 'testing', 'ci integration', 'limitations', 'references', 
      'acknowledgments', 'setup', 'dependencies', 'how to install', 'how to use', 
      'configuration', 'prerequisites/setup', 'run tests', 'license', 'commands', 
      'options', 'build', 'author', 'license'
    ]

    for (const line of lines) {
      const trimmed = line.trim()
      if (trimmed.startsWith('#')) {
        currentHeader = trimmed.replace(/^#+\s+/, '').trim().toLowerCase()
        skipSection = excludeHeaders.some(h => currentHeader.includes(h))
      } else if (!skipSection && (trimmed.startsWith('-') || trimmed.startsWith('*') || /^\d+\./.test(trimmed))) {
        const cleanItem = trimmed
          .replace(/^[-*\d.]+\s+/, '')
          .replace(/`([^`]+)`/g, '$1')
          .replace(/\*\*([^*]+)\*\*/g, '$1')
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
          .trim()
        
        if (cleanItem && cleanItem.length > 15 && cleanItem.length < 150) {
          if (!cleanItem.includes('npm i') && 
              !cleanItem.includes('pip install') && 
              !cleanItem.includes('git clone') && 
              !cleanItem.includes('Author:') && 
              !cleanItem.includes('https://') &&
              !cleanItem.includes('/') &&
              !cleanItem.toLowerCase().startsWith('note:')) {
            let formatted = cleanItem.charAt(0).toUpperCase() + cleanItem.slice(1)
            if (!formatted.endsWith('.') && !formatted.endsWith('!') && !formatted.endsWith('?')) {
              formatted += '.'
            }
            if (!useCases.includes(formatted)) {
              useCases.push(formatted)
            }
          }
        }
      }
    }
  }

  if (useCases.length < 3) {
    const sentences = desc.split(/[.!?]\s+/).map(s => s.trim()).filter(s => s.length > 10 && s.length < 150)
    for (const s of sentences) {
      let cleanSentence = s.charAt(0).toUpperCase() + s.slice(1)
      if (!cleanSentence.endsWith('.') && !cleanSentence.endsWith('!') && !cleanSentence.endsWith('?')) {
        cleanSentence += '.'
      }
      const lowerSentence = cleanSentence.toLowerCase()
      const lowerTagline = tagline.toLowerCase()
      const lowerTitle = title.toLowerCase()
      if (!useCases.includes(cleanSentence) && 
          !cleanSentence.includes('Guides end-to-end') &&
          lowerSentence !== lowerTagline &&
          !lowerTagline.includes(lowerSentence) &&
          !lowerSentence.includes(lowerTagline) &&
          !lowerSentence.includes(lowerTitle)) {
        useCases.push(cleanSentence)
      }
      if (useCases.length >= 3) break
    }
  }

  const sName = title.toLowerCase()
  const defaultUseCases = [
    `Streamline my daily ${sName} development and orchestration tasks without losing my sanity.`,
    `Automate boring ${sName} document processing and routine checks while I drink coffee.`,
    `Tackle complex ${sName} setup challenges and let the AI agent do the heavy lifting.`
  ]

  while (useCases.length < 3) {
    useCases.push(defaultUseCases[useCases.length])
  }

  return useCases.slice(0, 3)
}

function generateExampleUsage(slug, name, description, tags) {
  let usage = ''
  const s = slug.toLowerCase()
  const d = (description || '').toLowerCase()

  if (s.includes('audit') || (s.includes('security') && !s.includes('review'))) {
    usage = `Run a security audit on my codebase using ${name}`
  } else if (s.includes('review') && (s.includes('code') || s.includes('pr'))) {
    usage = `Review my latest code changes before I merge`
  } else if (s.includes('review')) {
    usage = `Get a detailed review of my work with ${name}`
  } else if (s.includes('slide') || s.includes('deck') || s.includes('pptx')) {
    usage = `Generate a slide deck for my project presentation`
  } else if (s.includes('image') && s.includes('gen')) {
    usage = `Generate custom images for my project`
  } else if (s.includes('comic')) {
    usage = `Turn my story into a visual comic`
  } else if (s.includes('diagram')) {
    usage = `Generate a system architecture diagram for my project`
  } else if (s.includes('infographic')) {
    usage = `Create an infographic visualising my report data`
  } else if (s.includes('translate')) {
    usage = `Translate my document to another language`
  } else if (s.includes('markdown') && s.includes('html')) {
    usage = `Convert my markdown docs to styled HTML pages`
  } else if (s.includes('url') && s.includes('markdown')) {
    usage = `Convert a URL into clean markdown for my notes`
  } else if (s.includes('pdf')) {
    usage = `Extract and process content from my PDF files`
  } else if (s.includes('compress')) {
    usage = `Compress my images without losing quality`
  } else if (s.includes('post') && s.includes('wechat')) {
    usage = `Publish my content to my WeChat account`
  } else if (s.includes('post') && s.includes('weibo')) {
    usage = `Post my content to my Weibo account`
  } else if (s.includes('post') && (s.includes('-x') || s.includes('twitter'))) {
    usage = `Draft and publish a thread to my X account`
  } else if (s.includes('crosspost')) {
    usage = `Cross-post my latest content to all my social channels`
  } else if (s.includes('test') && s.includes('e2e')) {
    usage = `Write end-to-end tests for my critical user flows`
  } else if (s.includes('test') || s.includes('tdd')) {
    usage = `Write tests for my new feature`
  } else if (s.includes('mutation')) {
    usage = `Run mutation tests to find gaps in my test suite`
  } else if (s.includes('git') && s.includes('clean')) {
    usage = `Clean up my git history and remove stale branches`
  } else if (s.includes('git')) {
    usage = `Streamline my git workflow for my project`
  } else if (s.includes('mcp')) {
    usage = `Build an MCP server integration for my custom tool`
  } else if (s.includes('api')) {
    usage = `Design and document my API with best practices`
  } else if (s.includes('database') || s.includes('db')) {
    usage = `Design and query the database schema for my app`
  } else if (s.includes('debug') || s.includes('diagnose')) {
    usage = `Debug the issue in my current codebase`
  } else if (s.includes('setup') || s.includes('scaffold')) {
    usage = `Set up ${name} for my project`
  } else if (s.includes('marketing')) {
    usage = `Create a marketing plan for my product launch`
  } else if (s.includes('investor')) {
    usage = `Prepare investor materials for my fundraising round`
  } else if (s.includes('launch')) {
    usage = `Plan the launch strategy for my product`
  } else if (s.includes('research')) {
    usage = `Research my target market and competitive landscape`
  } else if (s.includes('pricing')) {
    usage = `Design the pricing model for my product`
  } else if (s.includes('brand')) {
    usage = `Define brand guidelines and voice for my company`
  } else if (s.includes('agent')) {
    usage = `Set up an AI agent workflow for my task`
  } else if (s.includes('workflow')) {
    usage = `Automate my manual workflow with an agent`
  } else if (s.includes('article') || s.includes('content')) {
    usage = `Write a polished article for my blog`
  } else if (s.includes('design')) {
    usage = `Improve the design of my project`
  } else if (s.includes('video')) {
    usage = `Process and edit my video files`
  } else if (s.includes('media') || s.includes('image')) {
    usage = `Process and optimise my media files`
  } else {
    const verb = d.includes('generat') ? 'Generate' :
                 d.includes('analys') || d.includes('analyz') ? 'Analyse' :
                 d.includes('convert') ? 'Convert' :
                 d.includes('extract') ? 'Extract' :
                 d.includes('build') ? 'Build' :
                 d.includes('creat') ? 'Create' :
                 d.includes('improv') ? 'Improve' :
                 d.includes('automat') ? 'Automate' : 'Apply'
    const target = name.charAt(0).toLowerCase() + name.slice(1)
    usage = `${verb} ${target} for my project`
  }
  return usage.replace(/\byour\b/gi, 'my').replace(/\byou\b/gi, 'I')
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

// Maps new skill slugs to author and fileUrl, prioritizing existing TS definitions
function getAuthorAndFileUrl(slug, existingMeta) {
  if (existingMeta && existingMeta.author && existingMeta.fileUrl) {
    let fileUrl = existingMeta.fileUrl
    if (fileUrl.includes('github.com/leverbrain/leverbrain')) {
      fileUrl = fileUrl.replace('github.com/leverbrain/leverbrain', 'github.com/krlan/leverbrain')
    }
    return {
      author: existingMeta.author,
      fileUrl: fileUrl
    }
  }

  if (marketingSkillsSet.has(slug)) {
    return {
      author: 'coreyhaines31',
      fileUrl: `https://github.com/coreyhaines31/marketingskills/tree/main/skills/${slug}`
    }
  }

  if (tasteSkillsSet.has(slug)) {
    return {
      author: 'Leonxlnx',
      fileUrl: `https://github.com/Leonxlnx/taste-skill/tree/main/skills/${slug}`
    }
  }

  if (slug === 'follow-builders') {
    return {
      author: 'zarazhangrui',
      fileUrl: 'https://github.com/zarazhangrui/follow-builders'
    }
  }
  if (slug === 'codebase-to-course') {
    return {
      author: 'zarazhangrui',
      fileUrl: 'https://github.com/zarazhangrui/codebase-to-course'
    }
  }
  if (slug === 'beautiful-html-templates') {
    return {
      author: 'zarazhangrui',
      fileUrl: 'https://github.com/zarazhangrui/beautiful-html-templates'
    }
  }
  if (slug === 'skillify') {
    return {
      author: 'zarazhangrui',
      fileUrl: 'https://github.com/zarazhangrui/skillify-skill/tree/main/skills/skillify'
    }
  }

  return {
    author: 'leverbrain',
    fileUrl: `https://github.com/krlan/leverbrain/tree/main/skills/${slug}`
  }
}

function compileSkill(slug, folderPath) {
  let mdContent = ''
  let skillFilePath = path.join(folderPath, 'SKILL.md')
  if (!fs.existsSync(skillFilePath)) {
    skillFilePath = path.join(folderPath, 'README.md')
  }
  if (!fs.existsSync(skillFilePath)) {
    skillFilePath = path.join(folderPath, 'AGENTS.md')
  }

  if (fs.existsSync(skillFilePath)) {
    mdContent = fs.readFileSync(skillFilePath, 'utf8')
  } else {
    // Return null if no markdown exists in the folder
    return null
  }

  const { metadata, readme } = parseFrontmatter(mdContent)
  const title = formatTitle(metadata.name || slug)
  
  // Extract or generate description/tagline
  let desc = metadata.description || extractDescriptionFromReadme(readme) || `Guides end-to-end execution of ${title} workflow routines.`
  let tagline = metadata.tagline
  if (!tagline) {
    const firstSentence = desc.split(/[.!?]/)[0].trim()
    tagline = firstSentence
  }

  const cleaned = cleanupDescAndTagline(title, desc, tagline)
  desc = cleaned.desc
  tagline = cleaned.tagline

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

  const whenToUse = metadata.whenToUse || extractWhenToUseFromReadme(readme) || `Use when you need to automate ${title.toLowerCase()} processes.`
  const overviewHtml = generateOverviewHtml(title, tagline, slug, features, desc)
  const previewHtml = generatePreviewHtml(title, slug)

  // Load existing metadata to maintain stats/authorship
  const destFile = path.join(outDir, `${slug}.ts`)
  const existingMeta = getExistingMetadata(destFile)
  const { author, fileUrl } = getAuthorAndFileUrl(slug, existingMeta)

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
  const useCases = extractUseCases(slug, title, desc, readme, tagline)
  const exampleUsage = generateExampleUsage(slug, title, desc, tags.join(' '))

  const stars = existingMeta?.stars || Math.floor(Math.random() * 500) + 100
  const weeklyInstalls = existingMeta?.weeklyInstalls || Math.floor(Math.random() * 200) + 20
  const totalPurchases = existingMeta?.totalPurchases || Math.floor(Math.random() * 1000) + 150
  let price = existingMeta?.price || metadata.price || 'Free'
  if (typeof price === 'number') {
    price = price === 0 ? 'Free' : `$${price.toFixed(2)}`
  } else if (typeof price === 'string') {
    if (price === '0' || price.toLowerCase() === 'free') {
      price = 'Free'
    } else if (!price.startsWith('$')) {
      const num = Number(price)
      if (!isNaN(num)) {
        price = `$${num.toFixed(2)}`
      }
    }
  }

  let priceUsdc = existingMeta?.priceUsdc
  if (priceUsdc === undefined) {
    if (price === 'Free') {
      priceUsdc = 0
    } else if (price.startsWith('$')) {
      const num = Number(price.slice(1))
      if (!isNaN(num)) priceUsdc = num
    } else {
      const num = Number(price)
      if (!isNaN(num)) priceUsdc = num
    }
  }

  const category = existingMeta?.category || metadata.category || 'skill'
  const featured = existingMeta?.featured !== undefined ? existingMeta.featured : false
  const creatorWallet = existingMeta?.creatorWallet || '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8'
  const createdAt = existingMeta?.createdAt || new Date().toISOString().slice(0, 10)


  const tsContent = `import { SkillListing } from '../skills-data'
 
export const ${variableName}: SkillListing = {
  id: '${slug}',
  author: '${author}',
  slug: '${slug}',
  name: ${JSON.stringify(title)},
  tagline: ${JSON.stringify(tagline)},
  description: ${JSON.stringify(desc)},
  readme: \`${escapeForTemplateLiteral(readme)}\`,
  whenToUse: ${JSON.stringify(whenToUse)},
  price: ${JSON.stringify(price)},
  priceUsdc: ${priceUsdc},
  category: ${JSON.stringify(category)},
  tags: ${JSON.stringify(tags)},
  stars: ${stars},
  weeklyInstalls: ${weeklyInstalls},
  totalPurchases: ${totalPurchases},
  featured: ${featured},
  createdAt: '${createdAt}',
  creatorWallet: '${creatorWallet}',
  fileUrl: '${fileUrl}',
  useCases: ${JSON.stringify(useCases)},
  exampleUsage: ${JSON.stringify(exampleUsage)},
  overviewHtml: \`${escapeForTemplateLiteral(overviewHtml)}\`,
  previewHtml: \`${escapeForTemplateLiteral(previewHtml)}\`
}
`
  return {
    slug,
    variableName,
    content: tsContent
  }
}

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

function main() {
  console.log('--- Compiling Local Skills ---')
  const files = fs.readdirSync(skillsDir)
  const subdirs = files.filter(f => {
    const p = path.join(skillsDir, f)
    return fs.statSync(p).isDirectory()
  })

  let compiledCount = 0

  for (const slug of subdirs) {
    // Skip system/hidden folders
    if (slug.startsWith('.')) continue
    
    // Skip excluded folders
    if (EXCLUDED_SLUGS.has(slug)) {
      console.log(`- Skipping excluded local skill: ${slug}`)
      continue
    }
    
    const folderPath = path.join(skillsDir, slug)
    console.log(`Processing folder: ${slug}...`)
    try {
      const result = compileSkill(slug, folderPath)
      if (result) {
        const destFile = path.join(outDir, `${slug}.ts`)
        fs.writeFileSync(destFile, result.content, 'utf8')
        console.log(`✓ Compiled: ${slug} -> ${destFile}`)
        compiledCount++
      } else {
        console.log(`- Skipped (no SKILL.md/README.md): ${slug}`)
      }
    } catch (err) {
      console.error(`❌ Error compiling ${slug}:`, err.message)
    }
  }

  console.log(`\nSuccessfully compiled ${compiledCount} skills.`)

  // Now, regenerate src/lib/skills-data.ts
  console.log('\n--- Regenerating src/lib/skills-data.ts ---')
  const tsFiles = fs.readdirSync(outDir).filter(f => {
    if (!f.endsWith('.ts') || f === 'index.ts') return false
    const basename = f.slice(0, -3)
    return !EXCLUDED_SLUGS.has(basename)
  })
  
  const imports = []
  const skillVarNames = []

  for (const file of tsFiles) {
    const filePath = path.join(outDir, file)
    const content = fs.readFileSync(filePath, 'utf8')
    const match = content.match(/export\s+const\s+(\w+)\s*(?::\s*SkillListing)?\s*=/)
    if (match) {
      const varName = match[1]
      const basename = file.slice(0, -3)
      imports.push(`import { ${varName} } from './skills-data/${basename}'`)
      skillVarNames.push(varName)
    }
  }

  // Sort imports for cleanliness
  imports.sort()
  skillVarNames.sort()

  const staticInterfaces = `export type SkillCategory = 'skill' | 'strategy' | 'blueprint' | (string & {})

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
}`

  const staticHelpers = `export function getSkillByAuthorSlug(author: string, slug: string): SkillListing | undefined {
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
}`

  const skillsDataTsContent = `// Shared skills data — used by both skills list page and detail pages.
// Source of truth while we wire Convex. IDs match Convex DB slugs.

${imports.join('\n')}

${staticInterfaces}

export const SKILLS: SkillListing[] = [
  ${skillVarNames.join(',\n  ')}
]

${staticHelpers}
`

  const indexFilePath = path.resolve(ROOT, 'src/lib/skills-data.ts')
  fs.writeFileSync(indexFilePath, skillsDataTsContent, 'utf8')
  console.log(`✓ Generated ${indexFilePath} with ${skillVarNames.length} skills.`)
}

main()
