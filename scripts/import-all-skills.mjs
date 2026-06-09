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
  },
  {
    author: 'obra',
    gitUrl: 'https://github.com/obra/superpowers.git',
    localSubdir: 'superpowers',
    skillsPath: 'skills',
    getFileUrl: (slug) => `https://github.com/obra/superpowers/tree/main/skills/${slug}`
  },
  {
    author: 'tw93',
    gitUrl: 'https://github.com/tw93/Waza.git',
    localSubdir: 'Waza',
    skillsPath: 'skills',
    getFileUrl: (slug) => `https://github.com/tw93/Waza/tree/main/skills/${slug}`
  },
  {
    author: 'ourostack',
    gitUrl: 'https://github.com/ourostack/ouroboros-skills.git',
    localSubdir: 'ouroboros-skills',
    skillsPath: 'skills',
    getFileUrl: (slug) => `https://github.com/ourostack/ouroboros-skills/tree/main/skills/${slug}`
  },
  {
    author: 'kunchenguid',
    gitUrl: 'https://github.com/kunchenguid/no-mistakes.git',
    localSubdir: 'kunchenguid-no-mistakes',
    skillsPath: 'skills',
    getFileUrl: (slug) => `https://github.com/kunchenguid/no-mistakes/tree/main/skills/${slug}`
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
  let currentKey = null
  let currentValue = []
  let isFoldedBlock = false

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    // Check if it starts a new key: value
    const matchKeyVal = line.match(/^([a-zA-Z0-9_-]+)\s*:\s*(.*)$/)
    if (matchKeyVal) {
      // Save previous key if any
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
      // It's a continuation of the previous value
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

function capitalize(str) {
  return str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
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
  let cleanName = clean;
  if (!clean.includes(' ') && clean.includes('-')) {
    cleanName = clean.replace(/-/g, ' ');
  }
  const words = cleanName.split(/\s+/).filter(Boolean);
  
  return words.map((word, idx) => {
    const lower = word.toLowerCase();
    
    if (lower === 'a/b' || lower === 'ab') {
      return 'A/B';
    }
    
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

function extractDescriptionFromReadme(readme) {
  if (!readme) return '';
  const paragraphs = readme.split('\n\n');
  for (let p of paragraphs) {
    p = p.trim();
    if (!p) continue;
    // Skip headers
    if (p.startsWith('#')) continue;
    // Skip lists
    if (p.startsWith('-') || p.startsWith('*') || p.startsWith('1.')) continue;
    // Skip code blocks
    if (p.startsWith('```')) continue;
    // Clean up markdown formatting (bold, links, code tags)
    let clean = p
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\s+/g, ' ')
      .trim();
    if (clean.length > 30 && clean.length < 400) {
      return clean;
    }
  }
  return '';
}

function extractWhenToUseFromReadme(readme) {
  if (!readme) return '';
  const match = readme.match(/## (?:When to Use|When to Use This Skill|适用场景|When to use)[\s\S]*?\n\n([\s\S]*?)(?:\n\n##|$)/i);
  if (match) {
    const lines = match[1].split('\n').map(l => l.trim()).filter(Boolean);
    const paragraphs = [];
    for (const line of lines) {
      if (line.startsWith('#') || line.startsWith('`')) break;
      paragraphs.push(line);
    }
    const merged = paragraphs.join(' ').replace(/\s+/g, ' ').trim();
    if (merged.length > 15 && merged.length < 600) {
      let clean = merged
        .replace(/`([^`]+)`/g, '$1')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
      return clean;
    }
  }
  return '';
}

function cleanupDescAndTagline(title, desc, tagline) {
  // Replace generic stubs
  if (desc.includes('Guides end-to-end execution of')) {
    desc = `Automates ${title.toLowerCase()} workflow routines in your local environment.`;
  }

  // If tagline is identical to desc, truncate tagline to first sentence
  const descNorm = desc.trim().toLowerCase();
  const tagNorm = tagline.trim().toLowerCase();
  if (tagNorm === descNorm || desc.trim().toLowerCase().startsWith(tagNorm)) {
    // tagline is a prefix of desc — that's fine, keep it short
  } else if (tagNorm.length > 10 && descNorm.startsWith(tagNorm.slice(0, Math.min(tagNorm.length, 60)))) {
    // very similar start — keep tagline as-is
  }

  // Clamp tagline length
  if (tagline.length > 120) {
    tagline = tagline.slice(0, 117) + '...';
  } else if (!tagline.endsWith('.') && !tagline.endsWith('!') && !tagline.endsWith('?')) {
    tagline = tagline + '.';
  }

  return { desc, tagline };
}

function extractUseCases(slug, title, desc, readme, subSkills, tagline = '') {
  const hardcoded = getHardcodedMetadata(slug);
  if (hardcoded && hardcoded.useCases) {
    return hardcoded.useCases;
  }

  if (subSkills && subSkills.length > 0) {
    return subSkills.slice(0, 3).map(s => {
      let text = s.desc.split(/[.!?]/)[0].trim();
      if (text.toLowerCase().includes('should be used when') || text.length > 100 || text.length < 10) {
        text = `Automate ${s.name.toLowerCase()} workflows in your workspace`;
      }
      if (!text.endsWith('.')) text += '.';
      return text;
    });
  }

  const useCases = [];
  if (readme) {
    const lines = readme.split('\n');
    let currentHeader = '';
    let skipSection = false;
    
    const excludeHeaders = [
      'prerequisites', 'prerequisite', 'installation', 'quick start', 'usage', 
      'requirements', 'testing', 'ci integration', 'limitations', 'references', 
      'acknowledgments', 'setup', 'dependencies', 'how to install', 'how to use', 
      'configuration', 'prerequisites/setup', 'run tests', 'license', 'commands', 
      'options', 'build', 'author', 'license'
    ];

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('#')) {
        currentHeader = trimmed.replace(/^#+\s+/, '').trim().toLowerCase();
        skipSection = excludeHeaders.some(h => currentHeader.includes(h));
      } else if (!skipSection && (trimmed.startsWith('-') || trimmed.startsWith('*') || /^\d+\./.test(trimmed))) {
        const cleanItem = trimmed
          .replace(/^[-*\d.]+\s+/, '')
          .replace(/`([^`]+)`/g, '$1')
          .replace(/\*\*([^*]+)\*\*/g, '$1')
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
          .trim();
        
        if (cleanItem && cleanItem.length > 15 && cleanItem.length < 150) {
          if (!cleanItem.includes('npm i') && 
              !cleanItem.includes('pip install') && 
              !cleanItem.includes('git clone') && 
              !cleanItem.includes('Author:') && 
              !cleanItem.includes('https://') &&
              !cleanItem.includes('/') &&
              !cleanItem.toLowerCase().startsWith('note:')) {
            let formatted = cleanItem.charAt(0).toUpperCase() + cleanItem.slice(1);
            if (!formatted.endsWith('.') && !formatted.endsWith('!') && !formatted.endsWith('?')) {
              formatted += '.';
            }
            if (!useCases.includes(formatted)) {
              useCases.push(formatted);
            }
          }
        }
      }
    }
  }

  if (useCases.length < 3) {
    const sentences = desc.split(/[.!?]\s+/).map(s => s.trim()).filter(s => s.length > 10 && s.length < 150);
    for (const s of sentences) {
      let cleanSentence = s.charAt(0).toUpperCase() + s.slice(1);
      if (!cleanSentence.endsWith('.') && !cleanSentence.endsWith('!') && !cleanSentence.endsWith('?')) {
        cleanSentence += '.';
      }
      const lowerSentence = cleanSentence.toLowerCase();
      const lowerTagline = tagline.toLowerCase();
      const lowerTitle = title.toLowerCase();
      if (!useCases.includes(cleanSentence) && 
          !cleanSentence.includes('Guides end-to-end') &&
          lowerSentence !== lowerTagline &&
          !lowerTagline.includes(lowerSentence) &&
          !lowerSentence.includes(lowerTagline) &&
          !lowerSentence.includes(lowerTitle)) {
        useCases.push(cleanSentence);
      }
      if (useCases.length >= 3) break;
    }
  }

  const sName = title.toLowerCase();
  const defaultUseCases = [
    `Streamline my daily ${sName} development and orchestration tasks without losing my sanity.`,
    `Automate boring ${sName} document processing and routine checks while I drink coffee.`,
    `Tackle complex ${sName} setup challenges and let the AI agent do the heavy lifting.`
  ];

  while (useCases.length < 3) {
    useCases.push(defaultUseCases[useCases.length]);
  }

  return useCases.slice(0, 3);
}

function generateExampleUsage(slug, name, description, tags, subSkills) {
  let usage = '';
  if (subSkills && subSkills.length > 0) {
    const firstSub = subSkills[0].name.toLowerCase();
    usage = `Automate my ${firstSub} workflow routines`;
  } else {
    const s = slug.toLowerCase();
    const d = (description || '').toLowerCase();

    if (s.includes('audit') || (s.includes('security') && !s.includes('review'))) {
      usage = `Run a security audit on my codebase using ${name}`;
    } else if (s.includes('review') && (s.includes('code') || s.includes('pr'))) {
      usage = `Review my latest code changes before I merge`;
    } else if (s.includes('review')) {
      usage = `Get a detailed review of my work with ${name}`;
    } else if (s.includes('slide') || s.includes('deck') || s.includes('pptx')) {
      usage = `Generate a slide deck for my project presentation`;
    } else if (s.includes('image') && s.includes('gen')) {
      usage = `Generate custom images for my project`;
    } else if (s.includes('comic')) {
      usage = `Turn my story into a visual comic`;
    } else if (s.includes('diagram')) {
      usage = `Generate a system architecture diagram for my project`;
    } else if (s.includes('infographic')) {
      usage = `Create an infographic visualising my report data`;
    } else if (s.includes('translate')) {
      usage = `Translate my document to another language`;
    } else if (s.includes('markdown') && s.includes('html')) {
      usage = `Convert my markdown docs to styled HTML pages`;
    } else if (s.includes('url') && s.includes('markdown')) {
      usage = `Convert a URL into clean markdown for my notes`;
    } else if (s.includes('pdf')) {
      usage = `Extract and process content from my PDF files`;
    } else if (s.includes('compress')) {
      usage = `Compress my images without losing quality`;
    } else if (s.includes('post') && s.includes('wechat')) {
      usage = `Publish my content to my WeChat account`;
    } else if (s.includes('post') && s.includes('weibo')) {
      usage = `Post my content to my Weibo account`;
    } else if (s.includes('post') && (s.includes('-x') || s.includes('twitter'))) {
      usage = `Draft and publish a thread to my X account`;
    } else if (s.includes('crosspost')) {
      usage = `Cross-post my latest content to all my social channels`;
    } else if (s.includes('test') && s.includes('e2e')) {
      usage = `Write end-to-end tests for my critical user flows`;
    } else if (s.includes('test') || s.includes('tdd')) {
      usage = `Write tests for my new feature`;
    } else if (s.includes('mutation')) {
      usage = `Run mutation tests to find gaps in my test suite`;
    } else if (s.includes('git') && s.includes('clean')) {
      usage = `Clean up my git history and remove stale branches`;
    } else if (s.includes('git')) {
      usage = `Streamline my git workflow for my project`;
    } else if (s.includes('mcp')) {
      usage = `Build an MCP server integration for my custom tool`;
    } else if (s.includes('api')) {
      usage = `Design and document my API with best practices`;
    } else if (s.includes('database') || s.includes('db')) {
      usage = `Design and query the database schema for my app`;
    } else if (s.includes('debug') || s.includes('diagnose')) {
      usage = `Debug the issue in my current codebase`;
    } else if (s.includes('setup') || s.includes('scaffold')) {
      usage = `Set up ${name} for my project`;
    } else if (s.includes('marketing')) {
      usage = `Create a marketing plan for my product launch`;
    } else if (s.includes('investor')) {
      usage = `Prepare investor materials for my fundraising round`;
    } else if (s.includes('launch')) {
      usage = `Plan the launch strategy for my product`;
    } else if (s.includes('research')) {
      usage = `Research my target market and competitive landscape`;
    } else if (s.includes('pricing')) {
      usage = `Design the pricing model for my product`;
    } else if (s.includes('brand')) {
      usage = `Define brand guidelines and voice for my company`;
    } else if (s.includes('agent')) {
      usage = `Set up an AI agent workflow for my task`;
    } else if (s.includes('workflow')) {
      usage = `Automate my manual workflow with an agent`;
    } else if (s.includes('article') || s.includes('content')) {
      usage = `Write a polished article for my blog`;
    } else if (s.includes('design')) {
      usage = `Improve the design of my project`;
    } else if (s.includes('video')) {
      usage = `Process and edit my video files`;
    } else if (s.includes('media') || s.includes('image')) {
      usage = `Process and optimise my media files`;
    } else {
      const verb = d.includes('generat') ? 'Generate' :
                   d.includes('analys') || d.includes('analyz') ? 'Analyse' :
                   d.includes('convert') ? 'Convert' :
                   d.includes('extract') ? 'Extract' :
                   d.includes('build') ? 'Build' :
                   d.includes('creat') ? 'Create' :
                   d.includes('improv') ? 'Improve' :
                   d.includes('automat') ? 'Automate' : 'Apply';
      const target = name.charAt(0).toLowerCase() + name.slice(1);
      usage = `${verb} ${target} for my project`;
    }
  }

  return usage.replace(/\byour\b/gi, 'my').replace(/\byou\b/gi, 'I');
}

function compileCategoryMarkdown(slug, folderPath) {
  if (!fs.existsSync(folderPath)) return null;
  const files = fs.readdirSync(folderPath);
  const subdirs = files.filter(f => {
    const p = path.join(folderPath, f);
    return fs.statSync(p).isDirectory() && f !== 'references' && f !== '.claude-plugin';
  });

  if (subdirs.length === 0) {
    return null;
  }

  const subSkills = [];
  for (const dir of subdirs) {
    const subPath = path.join(folderPath, dir);
    let subSkillFilePath = path.join(subPath, 'SKILL.md');
    if (!fs.existsSync(subSkillFilePath)) {
      subSkillFilePath = path.join(subPath, 'README.md');
    }
    if (fs.existsSync(subSkillFilePath)) {
      const content = fs.readFileSync(subSkillFilePath, 'utf8');
      const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
      let metadata = {};
      if (match) {
        const yamlStr = match[1];
        const lines = yamlStr.split('\n');
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith('#')) continue;
          if (trimmed.startsWith('-') || trimmed.includes(': ') === false) continue;
          const colonIdx = trimmed.indexOf(':');
          const key = trimmed.slice(0, colonIdx).trim();
          const val = trimmed.slice(colonIdx + 1).trim();
          metadata[key] = val.replace(/^['"]|['"]$/g, '');
        }
      }
      const name = formatTitle(metadata.name || dir);
      const desc = metadata.description || `Guides end-to-end execution of ${name} workflow routines.`;
      subSkills.push({ slug: dir, name, desc });
    }
  }

  const title = formatTitle(slug);
  const count = subSkills.length;
  if (count === 0) return null;

  // Custom humorous/conversational category taglines and descriptions
  let tagline = `A workspace toolkit of ${count} ready-to-run automation routines for ${title.toLowerCase()}.`;
  let desc = `Automates a wide range of ${title.toLowerCase()} workflows, including ${subSkills.slice(0, 3).map(s => s.name).join(', ')}, and more in your local environment.`;

  if (slug === 'security') {
    tagline = `Audits, penetration tests, and security checks: ${count} specialized workflows to harden your setup.`;
    desc = `Automate Active Directory audits, API fuzzing, broken authentication checks, IDOR testing, and web vulnerability scanning using Claude Code workspace directives. Point the AI at your codebase and let it surface gaps before they become incidents.`;
  } else if (slug === 'development') {
    tagline = `Bootstrap, test, refactor, and review: ${count} workflows to accelerate your coding routines.`;
    desc = `Speed up development iterations with automated test generation, code architecture structuring, diff reviews, and refactoring passes — all runnable directly from your local workspace.`;
  } else if (slug === 'database') {
    tagline = `Schema migrations, backups, and query tuning: ${count} tools to manage your database.`;
    desc = `Deploy database migrations, design SQL schemas, audit indexing strategies, and run structured queries. Orchestrate your database systems directly from your workspace without switching context.`;
  } else if (slug === 'git') {
    tagline = `Clean commits, branches, and merges: ${count} Git workflow assistants in one package.`;
    desc = `Organize git workflows, generate conventional commits, automate branch cleanups, manage merges, and review PRs — keeping your repository history readable and your release process consistent.`;
  } else if (slug === 'marketing') {
    tagline = `SEO optimization, copy generation, and funnel audits: ${count} tools to boost your growth engine.`;
    desc = `Run SEO analyses, construct landing page funnels, draft targeted copy, and structure business outreach models. Automate the content workflows that normally eat up hours of your week.`;
  } else if (slug === 'career') {
    tagline = `Resume tailoring, interview preparation, and job tracking: ${count} templates to launch your career.`;
    desc = `Format resume variations tailored to specific roles, review common interview questions, generate cover letters, and organize job application logs — structured to move your search forward faster.`;
  } else if (slug === 'productivity') {
    tagline = `Time tracking, notes compilation, and task triaging: ${count} routines to reclaim your day.`;
    desc = `Organize task prioritization, structure meeting agendas, format Obsidian vault notes, compile todo lists, and surface what actually needs your attention today.`;
  } else if (slug === 'analytics') {
    tagline = `Data aggregation, metric dashboards, and audit logs: ${count} analysis workflows.`;
    desc = `Audit pipeline performance, track business metrics, aggregate logs, and parse analytics events directly in your terminal workspace. Get signal from your data without building a dashboard from scratch.`;
  } else if (slug === 'ai-maestro') {
    tagline = `Orchestrate agents, coordinate tasks, and manage context: ${count} orchestrations.`;
    desc = `Manage complex multi-agent handoffs, system routing, memory injection, and tool coordination. Build reliable agent pipelines that chain tasks without losing context between steps.`;
  } else if (slug === 'ai-research') {
    tagline = `Deep search, web scraping, and literature reviews: ${count} research assistants.`;
    desc = `Automate academic searching, competition monitoring, patent lookups, and document synthesis. Let the AI read through the source material and surface structured summaries you can actually use.`;
  } else if (slug === 'business-marketing') {
    tagline = `Market size estimation, product positioning, and pitch prep: ${count} business tools.`;
    desc = `Model financial forecasts, compile customer personas, draft pitch decks, and optimize pricing tables. Automate the business analysis workflows that feed your strategy and fundraising materials.`;
  } else if (slug === 'creative-design') {
    tagline = `Visual styling, canvas components, and mockup layouts: ${count} design scripts.`;
    desc = `Generate layouts, export SVG assets, structure theme presets, and review visual compliance. Bring design systems into your terminal workflow without leaving the codebase.`;
  } else if (slug === 'document-processing') {
    tagline = `Parse PDFs, compile docx, and extract CSV tables: ${count} file handlers.`;
    desc = `Convert and manipulate document formats, scrub metadata, format invoices, and extract structured tables from unstructured sources — all through workspace-native automation.`;
  } else if (slug === 'enterprise-communication') {
    tagline = `Slack updates, email summaries, and corporate reports: ${count} comms bridges.`;
    desc = `Draft project status updates, generate newsletters, format internal wiki pages, and summarize long Slack threads. Keep stakeholders informed without spending hours composing updates by hand.`;
  } else if (slug === 'media') {
    tagline = `Compress images, slice audio, and process assets: ${count} media tools.`;
    desc = `Optimize image sizes, convert audio formats, transcribe speech, and generate screenshots. Keep your assets consistently formatted and delivery-ready across every project.`;
  } else if (slug === 'pocketbase') {
    tagline = `Instant backend setup, auth configuration, and DB schemas: ${count} PocketBase scripts.`;
    desc = `Initialize PocketBase databases, configure collection schemas, set up authentication rules, and deploy hooks. Get a fully functional backend running with minimal manual setup.`;
  } else if (slug === 'railway') {
    tagline = `Environment provisioning, service checks, and deployments: ${count} Railway helpers.`;
    desc = `Deploy services, manage secrets, configure domain routing, and audit Railway resources directly from your terminal. Manage your cloud infrastructure without navigating web consoles.`;
  } else if (slug === 'scientific') {
    tagline = `Data analysis, scientific modeling, and notebook helper: ${count} research tools.`;
    desc = `Perform DNA sequence parsing, run physical simulations, build ML models with scikit-learn, and format LaTeX papers. Bring structured computation into your research workflow.`;
  } else if (slug === 'sentry') {
    tagline = `Error log monitoring, alert rules, and release tracking: ${count} Sentry integrations.`;
    desc = `Configure Sentry alert thresholds, associate releases with git commits, triage uncaught exceptions, and route errors to the right team. Surface production issues before your users report them.`;
  } else if (slug === 'sports') {
    tagline = `Scrape stats, analyze performance, and model predictions: ${count} sports routines.`;
    desc = `Fetch match history, parse athlete statistics, compile league tables, and run game simulations. Automate the data collection behind performance analysis and prediction models.`;
  } else if (slug === 'utilities') {
    tagline = `Cron scheduling, system cleanup, and path checkers: ${count} command-line utilities.`;
    desc = `Automate shell aliases, clean temp folders, check environment paths, and encode/decode strings. Core workspace utilities that keep your development environment consistent and maintainable.`;
  } else if (slug === 'video') {
    tagline = `Extract frames, concatenate clips, and generate previews: ${count} video scripts.`;
    desc = `Transcode video files, generate thumbnail grids, concatenate clips, and render micro-animations. Handle the full video processing pipeline from your local environment without manual ffmpeg invocations.`;
  } else if (slug === 'web-data') {
    tagline = `Scrape web tables, parse JSON feeds, and fetch RSS: ${count} data harvesters.`;
    desc = `Harvest unstructured web text, extract schema markup, monitor price changes, and follow RSS streams. Collect and structure web data at the source, ready to pipe into your analysis workflows.`;
  } else if (slug === 'web-development') {
    tagline = `Next.js, Tailwind, and React boilerplates: ${count} web dev templates.`;
    desc = `Scaffold modern web applications, set up routing paths, configure linting gates, and build production assets. Go from an empty directory to a working, styled application with a single command.`;
  } else if (slug === 'workflow-automation') {
    tagline = `Triggers, webhooks, and multi-app syncs: ${count} automated workflows.`;
    desc = `Bridge API integrations, trigger notifications, build webhook receivers, and sync folder changes. Connect your tools together so repetitive hand-offs run automatically in the background.`;
  }

  let readme = `---
name: ${title}
description: ${desc}
tagline: ${tagline}
---

# ${title} Suite

Welcome to the **${title}** command center! Why write repetitive workflows from scratch when you can have an AI agent do it for you?

This suite wraps **${count}** specialized automation routines designed to run directly inside your Claude Code workspace. From the mundane tasks to the complex orchestration, we've got you covered (so you can go back to sipping coffee or playing games while the AI does the heavy lifting).

## What you get
Here are the ${count} tools available in this suite:

| Skill | Purpose |
|-------|---------|
`;

  for (const sub of subSkills) {
    const cleanDesc = sub.desc.replace(/\n/g, ' ').replace(/\|/g, '\\|');
    readme += `| **${sub.name}** (\`${slug}/${sub.slug}\`) | ${cleanDesc} |\n`;
  }

  readme += `
## How to use
Run any of the sub-skills inside this category by specifying their path:
\`\`\`bash
npx -y leverbrain get davila7/${slug} <sub-skill-name>
\`\`\`
For example:
\`\`\`bash
npx -y leverbrain get davila7/${slug} ${subSkills[0]?.slug || 'default'}
\`\`\`
`;

  return { readme, tagline, desc, subSkills };
}

function processSkillDir(author, slug, folderPath, fileUrl) {
  let mdContent = ''
  let skillFilePath = path.join(folderPath, 'SKILL.md')
  if (!fs.existsSync(skillFilePath)) {
    skillFilePath = path.join(folderPath, 'README.md')
  }

  let subSkillsList = null
  let customTagline = null
  let customDesc = null

  if (fs.existsSync(skillFilePath)) {
    mdContent = fs.readFileSync(skillFilePath, 'utf8')
  } else {
    const categoryResult = compileCategoryMarkdown(slug, folderPath)
    if (categoryResult) {
      mdContent = categoryResult.readme
      customTagline = categoryResult.tagline
      customDesc = categoryResult.desc
      subSkillsList = categoryResult.subSkills
    } else {
      // If no markdown file exists, create a default stub
      mdContent = `---\nname: ${slug}\ndescription: Custom workflow skill for ${slug}.\n---\n# ${formatTitle(slug)}\n\nAuto-generated skill stub.`
    }
  }

  const { metadata, readme } = parseFrontmatter(mdContent)
  const title = formatTitle(metadata.name || slug)
  let desc = customDesc || metadata.description || extractDescriptionFromReadme(readme) || `Guides end-to-end execution of ${title} workflow routines.`
  
  let tagline = customTagline || metadata.tagline
  if (!tagline) {
    const firstSentence = desc.split(/[.!?]/)[0].trim();
    tagline = firstSentence;
  }

  // Only run cleanup for individual skills — category suites already have curated descriptions
  if (!customDesc) {
    const cleaned = cleanupDescAndTagline(title, desc, tagline)
    desc = cleaned.desc
    tagline = cleaned.tagline
  } else {
    // Still enforce tagline punctuation for category suites
    if (tagline.length > 120) {
      tagline = tagline.slice(0, 117) + '...'
    } else if (!tagline.endsWith('.') && !tagline.endsWith('!') && !tagline.endsWith('?')) {
      tagline = tagline + '.'
    }
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

  let whenToUse = metadata.whenToUse || extractWhenToUseFromReadme(readme) || `Use when you need to automate ${title.toLowerCase()} processes.`
  
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
  const useCases = extractUseCases(slug, title, desc, readme, subSkillsList, tagline)
  const exampleUsage = generateExampleUsage(slug, title, desc, tags.join(' '), subSkillsList)
  
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

  // Add the leverbrain skills that are retained
  const retainedLeverbrain = ['leverbrain']
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
  }

  // Process obra (superpowers) skills
  const superpowersRepo = repos.find(r => r.author === 'obra')
  const superpowersLocalDir = path.resolve(scratchDir, superpowersRepo.localSubdir, superpowersRepo.skillsPath)
  if (fs.existsSync(superpowersLocalDir)) {
    const superpowersDirs = fs.readdirSync(superpowersLocalDir).filter(f => fs.statSync(path.join(superpowersLocalDir, f)).isDirectory())
    console.log(`Processing ${superpowersDirs.length} superpowers skills...`)
    for (const slug of superpowersDirs) {
      const folder = path.join(superpowersLocalDir, slug)
      const fileUrl = superpowersRepo.getFileUrl(slug)
      const result = processSkillDir('obra', slug, folder, fileUrl)
      const outFilename = `superpowers-${slug}`
      const varName = `superpowers${result.variableName.charAt(0).toUpperCase()}${result.variableName.slice(1)}`
      const customResult = result.content.replace(`export const ${result.variableName}`, `export const ${varName}`)
      fs.writeFileSync(path.join(outDir, `${outFilename}.ts`), customResult, 'utf8')
      importedSkills.push({ author: 'obra', slug, variableName: varName, filename: outFilename })
    }
  }

  // Process tw93 (Waza) skills
  const wazaRepo = repos.find(r => r.author === 'tw93')
  const wazaLocalDir = path.resolve(scratchDir, wazaRepo.localSubdir, wazaRepo.skillsPath)
  if (fs.existsSync(wazaLocalDir)) {
    const wazaDirs = fs.readdirSync(wazaLocalDir).filter(f => fs.statSync(path.join(wazaLocalDir, f)).isDirectory())
    console.log(`Processing ${wazaDirs.length} Waza skills...`)
    for (const slug of wazaDirs) {
      const folder = path.join(wazaLocalDir, slug)
      const fileUrl = wazaRepo.getFileUrl(slug)
      const result = processSkillDir('tw93', slug, folder, fileUrl)
      const outFilename = `waza-${slug}`
      const varName = `waza${result.variableName.charAt(0).toUpperCase()}${result.variableName.slice(1)}`
      const customResult = result.content.replace(`export const ${result.variableName}`, `export const ${varName}`)
      fs.writeFileSync(path.join(outDir, `${outFilename}.ts`), customResult, 'utf8')
      importedSkills.push({ author: 'tw93', slug, variableName: varName, filename: outFilename })
    }
  }

  // Process ourostack (Ouroboros) skills
  const ouroRepo = repos.find(r => r.author === 'ourostack')
  const ouroLocalDir = path.resolve(scratchDir, ouroRepo.localSubdir, ouroRepo.skillsPath)
  if (fs.existsSync(ouroLocalDir)) {
    const ouroDirs = fs.readdirSync(ouroLocalDir).filter(f => fs.statSync(path.join(ouroLocalDir, f)).isDirectory())
    console.log(`Processing ${ouroDirs.length} Ouroboros skills...`)
    for (const slug of ouroDirs) {
      const folder = path.join(ouroLocalDir, slug)
      const fileUrl = ouroRepo.getFileUrl(slug)
      const result = processSkillDir('ourostack', slug, folder, fileUrl)
      const outFilename = `ouro-${slug}`
      const varName = `ouro${result.variableName.charAt(0).toUpperCase()}${result.variableName.slice(1)}`
      const customResult = result.content.replace(`export const ${result.variableName}`, `export const ${varName}`)
      fs.writeFileSync(path.join(outDir, `${outFilename}.ts`), customResult, 'utf8')
      importedSkills.push({ author: 'ourostack', slug, variableName: varName, filename: outFilename })
    }
  }

  // Process kunchenguid (no-mistakes) skills
  const kunchenRepo = repos.find(r => r.author === 'kunchenguid')
  const kunchenLocalDir = path.resolve(scratchDir, kunchenRepo.localSubdir, kunchenRepo.skillsPath)
  if (fs.existsSync(kunchenLocalDir)) {
    const kunchenDirs = fs.readdirSync(kunchenLocalDir).filter(f => fs.statSync(path.join(kunchenLocalDir, f)).isDirectory())
    console.log(`Processing ${kunchenDirs.length} kunchenguid skills...`)
    for (const slug of kunchenDirs) {
      const folder = path.join(kunchenLocalDir, slug)
      const fileUrl = kunchenRepo.getFileUrl(slug)
      const result = processSkillDir('kunchenguid', slug, folder, fileUrl)
      fs.writeFileSync(path.join(outDir, `${slug}.ts`), result.content, 'utf8')
      importedSkills.push({ author: 'kunchenguid', slug, variableName: result.variableName })
    }
  }

  // Physical cleanup of deleted / untracked files in src/lib/skills-data/
  console.log('\n--- Cleaning up untracked skill files ---')
  const activeFilenames = new Set(importedSkills.map(skill => (skill.filename || skill.slug) + '.ts'))
  // Ensure excluded skills are not deleted from the system
  for (const slug of EXCLUDED_SLUGS) {
    activeFilenames.add(slug + '.ts')
  }
  
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
    if (EXCLUDED_SLUGS.has(skill.slug)) continue
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
  const targetSlugs = [
    'theme-factory',
    'baoyu-infographic',
    'distill-me',
    'grill-me',
    'handoff',
    'claude-design',
    'programmatic-seo',
    'writing-skills',
    'taste-skill',
    'x-algo'
  ]

  const featured: SkillListing[] = []
  for (const slug of targetSlugs) {
    const skill = SKILLS.find((s) => s.slug === slug)
    if (skill) {
      featured.push(skill)
    }
  }
  return featured
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
