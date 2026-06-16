#!/usr/bin/env node
/**
 * migrate-example-usage.mjs
 * Generates and injects `exampleUsage` strings into all static skill .ts files.
 * Stored as first-person ("my"). Display layer converts to second-person ("your").
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SKILLS_DATA_DIR = path.join(ROOT, 'src', 'lib', 'skills-data')

// ─── Hardcoded high-quality examples ──────────────────────────────────────────
// Stored as first-person so they copy directly as AI prompts.
const HARDCODED = {
  // baoyu skills
  'baoyu-article-illustrator': 'Generate illustration prompts and images for my blog article',
  'baoyu-comic':               'Turn my story idea into a multi-panel comic strip',
  'baoyu-compress-image':      'Compress all images in my project without losing quality',
  'baoyu-cover-image':         'Design a high-engagement cover image for my next post',
  'baoyu-danger-x-to-markdown':'Convert my X/Twitter thread into clean markdown format',
  'baoyu-diagram':             'Generate an architecture diagram for my system design',
  'baoyu-format-markdown':     'Format and clean up my messy markdown document',
  'baoyu-infographic':         'Create an infographic visualising my data or report',
  'baoyu-markdown-to-html':    'Convert my markdown file into a styled HTML page',
  'baoyu-post-to-x':           'Draft and post a thread to my X (Twitter) account',
  'baoyu-slide-deck':          'Generate a slide deck for my product pitch',
  'baoyu-url-to-markdown':     'Convert any URL into clean markdown for my notes',
  'baoyu-xhs-images':          'Create trendy Xiaohongshu image slides for my lifestyle content',
  'baoyu-youtube-transcript':  'Fetch and summarize the transcript from my YouTube video',

  // leverbrain skills
  'agency-in-a-box':       'Launch a full AI agency workflow for my client project',
  'indiehacker-launch-kit':'Prepare a launch checklist and strategy for my new side project',
  'saas-gtm-playbook':     'Build a go-to-market playbook for my SaaS product',

  // mattpocock
  'caveman':      'Silence the AI pleasantries during my debug session',
  'teach':        'Start a multi-session teaching plan for my chosen topic',
  'tdd':          'Write tests first for my new feature with full TDD discipline',
  'tdd-workflow': 'Apply a strict TDD workflow to my current feature branch',
  'grill-me':     'Interview me on my project decisions and poke holes in my plan',
  'grill-with-docs': 'Interrogate my understanding of the docs for my current library',
  'handoff':      'Create a thorough handoff document for my codebase',
  'differential-review': 'Review the diff of my latest changes before I push',
  'review':       'Do a thorough code review on my current PR',
  'minimalist-review': 'Review my code and strip it down to what actually matters',
  'second-opinion': 'Get a second opinion on my implementation approach',
  'diagnose':     'Diagnose what is going wrong with my failing component',
  'debug-buttercup': 'Debug the issue in my current codebase step by step',
  'write-a-skill': 'Write a new agent skill file from my instructions',
  'skill-creator': 'Create a new Leverbrain skill from my specification',
  'skill-improver': 'Audit and improve the quality of my existing skill',
  'to-prd':       'Convert my rough feature idea into a structured PRD',
  'to-issues':    'Break my PRD into actionable GitHub issues',
  'spec-to-code-compliance': 'Check whether my code actually matches my spec',
  'mvp':          'Scope my idea down to a shippable MVP and build it',
  'prototype':    'Rapidly prototype my concept without over-engineering it',
  'scaffold-exercises': 'Generate coding exercises for my team to practice a concept',
  'setup-pre-commit':   'Set up pre-commit hooks for my project',
  'devcontainer-setup': 'Create a dev container config for my project',
  'git':          'Manage my git workflow with smart commit and branch automation',
  'git-cleanup':  'Clean up my git history and stale branches',
  'git-guardrails-claude-code': 'Add git guardrails to my Claude Code workflow',
  'gh-cli':       'Run common GitHub CLI operations for my repository',
  'modern-python': 'Audit my Python code and modernise it to current best practices',
  'bun-runtime':  'Migrate my Node.js script to run on Bun',
  'nextjs-turbopack': 'Configure Turbopack for my Next.js project',
  'pocketbase':   'Set up and query a PocketBase backend for my app',
  'railway':      'Deploy my project to Railway with proper configuration',
  'database':     'Design and query my database schema with best practices',
  'api-design':   'Design a clean, consistent REST API for my service',
  'backend-patterns': 'Apply solid backend patterns to my Node.js service',
  'frontend-patterns': 'Apply proven frontend architecture patterns to my app',
  'frontend-design': 'Improve the UI design and component structure of my app',
  'design-to-code': 'Convert my Figma design into production-ready code',
  'frontend-slides': 'Create a slide deck explaining my frontend architecture',
  'canvas-design': 'Build a canvas-based interactive diagram for my app',
  'web-development': 'Build and iterate on my web app with best practices',
  'web-artifacts-builder': 'Generate polished web artifacts from my raw content',
  'webapp-testing': 'Write comprehensive tests for my web application',
  'e2e-testing':  'Set up end-to-end tests for my critical user flows',
  'tdd-workflow': 'Apply TDD strictly to my current feature implementation',
  'mutation-testing': 'Run mutation tests against my test suite to find gaps',
  'property-based-testing': 'Add property-based tests to my business logic',
  'eval-harness': 'Build an evaluation harness to measure my model outputs',
  'testing-handbook-skills': 'Apply the Testing Handbook best practices to my project',
  'security':     'Harden the security posture of my application',
  'security-review': 'Run a thorough security review on my codebase before shipping',
  'insecure-defaults': 'Find and fix insecure defaults in my configuration',
  'building-secure-contracts': 'Audit my smart contracts for security vulnerabilities',
  'constant-time-analysis': 'Analyse my cryptographic code for timing vulnerabilities',
  'zeroize-audit': 'Check my Rust code for missing zeroize on sensitive values',
  'sharp-edges':  'Surface the non-obvious footguns in my codebase',
  'variant-analysis': 'Run variant analysis on my codebase to find bug patterns',
  'static-analysis': 'Run static analysis on my code and triage the results',
  'semgrep-rule-creator': 'Write a Semgrep rule to catch a bug pattern in my repo',
  'semgrep-rule-variant-creator': 'Create Semgrep rule variants from my existing rule',
  'supply-chain-risk-auditor': 'Audit my dependency supply chain for risks',
  'firebase-apk-scanner': 'Scan my Android APK for Firebase misconfigurations',
  'yara-authoring': 'Write a YARA rule to detect malware patterns for my threat model',
  'burpsuite-project-parser': 'Analyse my Burp Suite scan results and triage findings',
  'seatbelt-sandboxer': 'Sandbox my macOS app to reduce its attack surface',
  'fp-check':     'Check my code for functional programming correctness issues',
  'c-review':     'Review my C code for memory safety and correctness issues',
  'agentic-actions-auditor': 'Audit the agentic actions in my workflow for risks',
  'audit-context-building': 'Build comprehensive context for auditing my codebase',
  'entry-point-analyzer': 'Map all the entry points in my codebase for a security review',
  'ecc-deep-research': 'Deep-dive the cryptographic ECC implementation in my code',
  'agent-introspection-debugging': 'Debug why my AI agent is making unexpected decisions',
  'agent-sort':   'Sort and prioritise my agent task queue intelligently',
  'dmux-workflows': 'Set up my multi-agent tmux workflow',
  'mcp-builder':  'Build an MCP server for my custom tool integration',
  'mcp-server-patterns': 'Apply best MCP server patterns to my integration',
  'claude-api':   'Integrate the Claude API into my application',
  'claude-in-chrome-troubleshooting': 'Troubleshoot Claude in Chrome issues for my workflow',
  'exa-search':   'Search the web with Exa to research my topic deeply',
  'fal-ai-media': 'Generate media assets for my project using fal.ai',
  'sentry':       'Integrate Sentry error tracking into my application',
  'x-api':        'Integrate the X API into my application',
  'pdf':          'Extract, process, and convert PDF content for my project',
  'docx':         'Create or parse Word documents for my workflow',
  'xlsx':         'Read and write Excel spreadsheets for my data pipeline',
  'pptx':         'Generate a PowerPoint presentation for my content',
  'media':        'Process and optimise media files for my project',
  'video':        'Process and edit video content for my project',
  'video-editing': 'Edit and enhance my video using agent-driven automation',
  'slack-gif-creator': 'Create a custom GIF for my Slack workspace',
  'algorithmic-art': 'Generate algorithmic artwork from my creative brief',
  'obsidian-vault': 'Organise and enhance my Obsidian knowledge vault',
  'web-data':     'Scrape and extract structured data from my target website',
  'documentation-lookup': 'Look up the right documentation for my current library or API',
  'doc-coauthoring': 'Co-author a technical document with my AI agent',
  'document-processing': 'Process and extract insights from my document collection',
  'article-writing': 'Write a polished article on my chosen topic',
  'edit-article': 'Edit and improve my draft article with structured feedback',
  'content-engine': 'Build a repeatable content production engine for my brand',
  'crosspost':    'Cross-post my content to all my social media channels',
  'brand-guidelines': 'Generate brand guidelines for my product or company',
  'brand-voice':  'Define and apply a consistent brand voice to my content',
  'creative-design': 'Generate creative design concepts for my project',
  'marketing':    'Build a marketing strategy for my product launch',
  'marketing-plan': 'Create a detailed marketing plan for my campaign',
  'business-marketing': 'Develop business marketing materials for my company',
  'internal-comms': 'Draft internal communication for my team or organisation',
  'enterprise-communication': 'Write enterprise-grade communication for my stakeholders',
  'investor-materials': 'Prepare investor materials for my fundraising round',
  'investor-outreach': 'Write personalised investor outreach emails for my startup',
  'first-customers': 'Identify and reach out to my first ten customers',
  'find-community': 'Find the right communities to grow my project',
  'grow-sustainably': 'Build a sustainable growth plan for my product',
  'market-research': 'Research my target market and competitive landscape',
  'validate-idea': 'Validate my product idea before investing in it',
  'pricing':      'Design the right pricing model for my product',
  'product-capability': 'Map out the full capability surface of my product',
  'strategic-compact': 'Create a strategic compact for my team or project',
  'company-values': 'Define and articulate core values for my company',
  'culture-index': 'Assess and improve the culture health of my team',
  'career':       'Plan the next steps in my career with structured guidance',
  'sports':       'Analyse performance and plan training for my sport',
  'scientific':   'Apply scientific rigour to my research or analysis',
  'dimensional-analysis': 'Verify dimensional consistency in my physics or engineering problem',
  'let-fate-decide': 'Let probability decide something I cannot choose for my project',
  'caveman':      'Silence the AI pleasantries during my debug session',
  'dwarf-expert': 'Get expert guidance on my Dwarf Fortress challenge',
  'gmod-addon-maker': 'Build a Garry\'s Mod addon from my idea',
  'analytics':    'Set up and interpret analytics for my application',
  'ask-questions-if-underspecified': 'Make sure my requirements are fully specified before coding',
  'coding-standards': 'Enforce consistent coding standards across my codebase',
  'improve-codebase-architecture': 'Analyse and improve the architecture of my codebase',
  'development':  'Drive development on my feature from spec to shipped code',
  'workflow-automation': 'Automate a repetitive workflow in my daily process',
  'workflow-skill-design': 'Design a new agent skill workflow for my use case',
  'processize':   'Turn my ad-hoc process into a repeatable, documented workflow',
  'utilities':    'Add utility functions to my project',
  'productivity': 'Optimise my personal productivity with structured routines',
  'verification-loop': 'Run a verification loop on my agent output before accepting it',
  'trailmark':    'Track and document the decisions made in my project',
  'triage':       'Triage incoming issues or bugs for my project',
  'zoom-out':     'Step back from my current task and see the bigger picture',
  'ai-maestro':   'Orchestrate multiple AI tools together for my complex task',
  'ai-research':  'Research a complex topic end-to-end using AI assistance',
  'everything-claude-code': 'Use the full power of Claude Code for my development workflow',
  'setup-matt-pocock-skills': 'Install and configure Matt Pocock\'s skill pack for my workspace',
  'migrate-to-shoehorn': 'Migrate my project to the Shoehorn framework',
  'theme-factory': 'Generate a design theme system for my application',
  'writing-beats': 'Structure my story with the right narrative beats',
  'writing-fragments': 'Generate and organise writing fragments for my project',
  'writing-shape': 'Shape my writing to match the right structure and tone',
}

// ─── Smart auto-generator (fallback for anything not in HARDCODED) ────────────
function generateExampleUsage(slug, name, description, tags) {
  const s = slug.toLowerCase()
  const d = (description || '').toLowerCase()
  const n = (name || '').toLowerCase()

  // Security / audit
  if (s.includes('audit') || s.includes('security') || s.includes('vuln') || s.includes('pentest'))
    return `Run a security audit on my codebase using ${name}`
  if (s.includes('review') && (s.includes('code') || s.includes('pr')))
    return `Review my latest code changes before I merge`
  if (s.includes('review'))
    return `Get a detailed review of my ${name.toLowerCase().replace('review', '').trim() || 'work'}`

  // Testing
  if (s.includes('test') && s.includes('e2e'))
    return `Write end-to-end tests for my critical user flows`
  if (s.includes('test') || s.includes('tdd'))
    return `Write tests for my new ${n.includes('python') ? 'Python' : ''} feature`
  if (s.includes('mutation'))
    return `Run mutation tests to find gaps in my test suite`

  // Image / media / design
  if (s.includes('slide') || s.includes('deck') || s.includes('pptx'))
    return `Generate a slide deck for my ${d.includes('investor') ? 'investor pitch' : 'project presentation'}`
  if (s.includes('image') && s.includes('gen'))
    return `Generate custom images for my project`
  if (s.includes('image') || s.includes('photo'))
    return `Process and optimise my images for my project`
  if (s.includes('comic'))
    return `Turn my story into a visual comic`
  if (s.includes('diagram'))
    return `Generate a clear diagram for my system architecture`
  if (s.includes('infographic'))
    return `Create an infographic for my data or report`
  if (s.includes('video'))
    return `Process and edit my video files`
  if (s.includes('design'))
    return `Improve the design of my project`

  // Document conversion
  if (s.includes('translate'))
    return `Translate my content to another language`
  if (s.includes('markdown') && s.includes('html'))
    return `Convert my markdown docs to styled HTML pages`
  if (s.includes('url') && s.includes('markdown'))
    return `Convert a URL into clean markdown for my notes`
  if (s.includes('pdf'))
    return `Extract and process content from my PDF files`
  if (s.includes('docx') || s.includes('word'))
    return `Create or parse Word documents for my workflow`
  if (s.includes('xlsx') || s.includes('excel'))
    return `Read and process my Excel spreadsheet`
  if (s.includes('compress'))
    return `Compress my images without losing visible quality`

  // Social / content
  if (s.includes('post') && s.includes('wechat'))
    return `Publish my content to my WeChat account`
  if (s.includes('post') && s.includes('weibo'))
    return `Post my content to my Weibo account`
  if (s.includes('post') && (s.includes('-x') || s.includes('twitter')))
    return `Draft and publish a thread to my X account`
  if (s.includes('crosspost'))
    return `Cross-post my latest content to all my social channels`
  if (s.includes('article'))
    return `Write a polished article for my blog`
  if (s.includes('content'))
    return `Build a repeatable content engine for my brand`
  if (s.includes('marketing'))
    return `Create a marketing plan for my product launch`

  // Coding / dev tools
  if (s.includes('git') && s.includes('clean'))
    return `Clean up my git history and remove stale branches`
  if (s.includes('git'))
    return `Streamline my git workflow for my project`
  if (s.includes('setup') || s.includes('scaffold'))
    return `Set up ${name.replace('Setup ', '').replace('Scaffold ', '')} for my project`
  if (s.includes('debug') || s.includes('diagnose'))
    return `Debug the issue in my current codebase`
  if (s.includes('mcp'))
    return `Build an MCP server integration for my custom tool`
  if (s.includes('api'))
    return `Design and document my API with best practices`
  if (s.includes('database') || s.includes('db'))
    return `Design and query the database schema for my app`

  // Business / strategy
  if (s.includes('investor'))
    return `Prepare investor materials for my fundraising round`
  if (s.includes('gtm') || s.includes('go-to-market'))
    return `Build a go-to-market plan for my product`
  if (s.includes('launch'))
    return `Plan the launch strategy for my product`
  if (s.includes('research'))
    return `Research my target market and competitive landscape`
  if (s.includes('pricing'))
    return `Design the pricing model for my product`
  if (s.includes('brand'))
    return `Define brand guidelines and voice for my company`
  if (s.includes('strategy') || s.includes('strategic'))
    return `Build a strategic plan for my ${d.includes('saas') ? 'SaaS' : d.includes('agency') ? 'agency' : 'project'}`

  // AI / agents
  if (s.includes('agent'))
    return `Set up and run an AI agent workflow for my task`
  if (s.includes('skill') && (s.includes('creat') || s.includes('writ')))
    return `Create a new agent skill for my workflow`
  if (s.includes('workflow'))
    return `Automate my manual workflow with an agent`

  // Generic smart fallback using name
  const verb = d.includes('generat') ? 'Generate' :
               d.includes('analys') || d.includes('analyz') ? 'Analyse' :
               d.includes('convert') ? 'Convert' :
               d.includes('extract') ? 'Extract' :
               d.includes('build') ? 'Build' :
               d.includes('creat') ? 'Create' :
               d.includes('improv') ? 'Improve' :
               d.includes('automat') ? 'Automate' :
               'Apply'
  const target = name.charAt(0).toLowerCase() + name.slice(1)
  return `${verb} ${target} for my project`
}

// ─── Read, patch, write each .ts file ─────────────────────────────────────────
const files = fs.readdirSync(SKILLS_DATA_DIR).filter(f => f.endsWith('.ts') && f !== 'index.ts')

let updated = 0
let skipped = 0

for (const file of files) {
  const filePath = path.join(SKILLS_DATA_DIR, file)
  let content = fs.readFileSync(filePath, 'utf8')

  // Skip if already has exampleUsage
  if (/exampleUsage\s*:/.test(content)) {
    skipped++
    continue
  }

  // Extract slug
  const slugMatch = content.match(/slug:\s*['"]([^'"]+)['"]/)
  if (!slugMatch) {
    console.warn(`  ⚠ Could not find slug in ${file} — skipping`)
    continue
  }
  const slug = slugMatch[1]

  // Extract name, description for fallback generator
  const nameMatch = content.match(/name:\s*['"]([^'"]+)['"]/)
  const descMatch = content.match(/description:\s*(?:'([^']*)'|"([^"]*)")/)
  const tagsMatch = content.match(/tags:\s*\[([^\]]*)\]/)
  const name = nameMatch ? nameMatch[1] : slug
  const description = descMatch ? (descMatch[1] || descMatch[2] || '') : ''
  const tags = tagsMatch ? tagsMatch[1] : ''

  const exampleUsage = HARDCODED[slug] || generateExampleUsage(slug, name, description, tags)

  // Inject after useCases or before overviewHtml or before screenshots or before closing }
  const injected = `  exampleUsage: ${JSON.stringify(exampleUsage)},\n`

  if (/useCases:\s*\[/.test(content)) {
    // Insert after the closing ] of useCases array
    content = content.replace(/(useCases:\s*\[[^\]]*\]),\n/, `$1,\n${injected}`)
  } else if (/overviewHtml:\s*/.test(content)) {
    content = content.replace(/(overviewHtml:\s*)/, `${injected}$1`)
  } else if (/screenshots:\s*\[/.test(content)) {
    content = content.replace(/(screenshots:\s*\[)/, `${injected}$1`)
  } else {
    // Last resort: before closing }
    content = content.replace(/\n\}\s*$/, `\n${injected}}\n`)
  }

  fs.writeFileSync(filePath, content, 'utf8')
  console.log(`  ✓ ${slug}: ${exampleUsage}`)
  updated++
}

console.log(`\n✅ Done: ${updated} updated, ${skipped} already had exampleUsage`)
