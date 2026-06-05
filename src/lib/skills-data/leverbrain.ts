import { SkillListing } from '../skills-data'
 
export const leverbrain: SkillListing = {
  id: 'leverbrain',
  author: 'leverbrain',
  slug: 'leverbrain',
  name: "Leverbrain",
  tagline: "Consult this skill whenever you need to interact with the Leverbrain marketplace, purchase or download agent skills, ...",
  description: "Consult this skill whenever you need to interact with the Leverbrain marketplace, purchase or download agent skills, publish new blueprints or strategies, manage stack configurations (labs), or integrate Leverbrain CLI and SDK commands. Essential when asked to 'get a skill', 'publish an agent strategy', 'create a lab config', or 'manage agent tools through Leverbrain CLI'.",
  readme: `# Leverbrain — Skill Marketplace & Configuration Guide

Use this skill to navigate, consume, publish, and orchestrate agent capabilities within the Leverbrain marketplace ecosystem. This guide provides AI agents and human operators with clear protocols for retrieving codebases, publishing tactical assets, and saving custom stack configurations (labs) locally and on-chain.

---

## When to Apply

This Skill should be invoked whenever the task involves interacting with the Leverbrain marketplace or its tools.

### Must Use
- Automating the download of marketplace skills or blueprints via the CLI.
- Publishing new skills, strategies, or blueprints using Web or CLI commands.
- Managing and saving developer configurations (Labs) to group tools for agent workflows.
- Reading or writing specifications relating to \`agents.md\` or platform interactions.

### Skip
- General coding tasks unrelated to the Leverbrain package, CLI, SDK, or marketplace listings.
- Standard CSS, frontend, or backend adjustments that do not involve Leverbrain skills/configurations.

---

## Core Workflows

\`\`\`mermaid
graph TD
    A[Operator / Agent] -->|npx leverbrain get| B[Retrieved Skill]
    A -->|npx leverbrain save-cfg| C[Saved Config on Convex]
    A -->|npx leverbrain cfg| D[Download Config Stack]
    A -->|npx leverbrain publish| E[USDC Listing + Convex Upload]
\`\`\`

### 1. Getting & Inspecting Skills

To retrieve a published skill, blueprint, or strategy from the marketplace, run the standard CLI \`get\` command. This downloads the remote package and metadata into your active workspace.

\`\`\`bash
# Retrieve a specific skill
npx -y leverbrain get <author>/<slug>

# Example: Get the skill-creator kit
npx -y leverbrain get anthropics/skill-creator
\`\`\`

#### Verification & Execution Flow
1. **Locate \`SKILL.md\`**: Upon downloading a package, check the root of the folder for \`SKILL.md\` to parse its capabilities.
2. **Execute Bundled Automation**: If the downloaded folder contains a \`scripts/\` directory, prioritize executing these deterministic utilities instead of drafting custom code from scratch.
3. **Read Dependencies**: Verify any prerequisites listed in the frontmatter before running the skill.

---

### 2. Publishing Blueprints, Strategies, and Skills

Leverbrain categorizes assets into three distinct categories:
- \`skill\`: Modular code snippets or narrow instructions (e.g., a regex parser or a specific API wrapper).
- \`strategy\`: Frameworks, decision trees, or reasoning guidelines (e.g., code quality auditors, threat models).
- \`blueprint\`: End-to-end templates, full-stack blueprints, or orchestrations (e.g., SaaS boilerplates, CI/CD pipeline generators).

#### The Skill Directory Anatomy
When preparing an asset to publish, organize the folder structures as follows:

\`\`\`
my-tactical-blueprint/
├── SKILL.md (Required - includes metadata and markdown guide)
├── scripts/ (Optional - automation scripts and tools)
└── references/ (Optional - heavy documentation files for deep retrieval)
\`\`\`

#### YAML Frontmatter Specification (\`SKILL.md\`)
Every \`SKILL.md\` must start with a YAML block. The CLI uses this to seed the database and generate on-chain listings:

\`\`\`markdown
---
name: my-tactical-blueprint
description: Comprehensive framework for generating complete CI/CD templates. Use this skill whenever you need to configure pipelines, build actions, or manage deploy tasks.
category: blueprint  # skill | strategy | blueprint
tags: [cicd, github-actions, deploy]
price: 5.00
whenToUse: "Use this blueprint to generate production-ready GitHub Actions pipelines."
---

# My Tactical Blueprint

Imperative instructions and guides go here...
\`\`\`

#### Publishing command
Once the directory is ready, publish it using the CLI. The command uploads the directory contents to Convex File Storage, registers the on-chain metadata via Solana, and makes the listing public.

\`\`\`bash
leverbrain publish ./my-tactical-blueprint \\
  --wallet <PUBLISHER_SOLANA_WALLET> \\
  --author <YOUR_REGISTERED_HANDLE> \\
  --price 5.00
\`\`\`

---

### 3. Creating & Managing Configurations (Labs)

Developer configurations allow operators to bundle multiple marketplace skills into a single command stack, facilitating fast deployment on remote servers or new workspaces.

#### Creating a Configuration via CLI
Save a list of marketplace skills into a configuration:

\`\`\`bash
# Save config stack containing multiple skills
npx leverbrain save-cfg <config-name> \\
  --wallet <OWNER_SOLANA_WALLET> \\
  --skills <author/slug,author/slug,...>

# Example: Saving a development stack
npx leverbrain save-cfg dev-pack \\
  --wallet 6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8 \\
  --skills affaan-m/exa-search,affaan-m/market-research
\`\`\`

#### Downloading a Configuration Stack
Once saved under a wallet, any operator or agent can pull down the entire stack using the configuration fetcher. If the wallet address has a registered handle (e.g. \`@shark\`), they use the handle syntax:

\`\`\`bash
# Download config by handle/config-name
npx leverbrain cfg shark/dev-pack
\`\`\`

---

## SDK Integration

You can integrate the Leverbrain client directly into your custom agent frameworks and TypeScript codebases.

\`\`\`typescript
import { LeverbrainClient } from 'leverbrain'

// Initialize the Leverbrain Client
const client = new LeverbrainClient({
  convexUrl: process.env.LEVERBRAIN_CONVEX_URL || 'https://exciting-mallard-6.eu-west-1.convex.cloud'
})

// Search skills
const skills = await client.search('research')

// Get details for a specific skill
const skill = await client.getSkill('anthropics', 'skill-creator')

// Save a new configuration for a wallet
await client.saveConfig('6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8', 'my-stack', [
  {
    id: 'exa-search',
    author: 'affaan-m',
    slug: 'exa-search',
    name: 'exa-search'
  }
])
\`\`\`

---

## Platform Economics & USDC Settlement

Leverbrain runs on Solana mainnet/devnet and uses USDC (SPL token) for transactions:
1. **Split Settlement**: Every transaction is split on-chain. **90%** of the USDC goes directly to the creator's payout wallet, and **10%** is routed to the Leverbrain treasury.
2. **Purchase Receipts**: Upon successful payment, a Purchase Receipt PDA (Program Derived Address) is minted to the buyer's wallet on-chain.
3. **Secure Download Verification**: The download endpoint \`/api/download/<author>/<slug>\` requires cryptographic proof of ownership. The agent signs a message which is sent in the headers:

\`\`\`
X-Wallet-Address: <base58 public key>
X-Wallet-Signature: <base58 signature of message>
X-Wallet-Message: leverbrain-auth-<timestamp>
\`\`\`

Convex backend verifies that the signature is valid, checks the Solana RPC nodes (e.g., via Helius or QuickNode) for the Purchase Receipt PDA, and only then decrypts and redirects to the download ZIP file.`,
  whenToUse: "Use when you need to automate leverbrain processes.",
  price: "Free",
  priceUsdc: 0,
  category: "skill",
  tags: ["leverbrain-skills","leverbrain"],
  stars: 423,
  weeklyInstalls: 171,
  totalPurchases: 351,
  featured: false,
  createdAt: '2026-06-05',
  creatorWallet: '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
  fileUrl: 'https://github.com/leverbrain/leverbrain/tree/main/skills/leverbrain',
  useCases: ["Automating the download of marketplace skills or blueprints via the CLI.","Publishing new skills, strategies, or blueprints using Web or CLI commands.","Managing and saving developer configurations (Labs) to group tools for agent workflows."],
  exampleUsage: "Create leverbrain for my project",
  overviewHtml: `<div class="skill-enrichment" style="display: flex; flex-direction: column; gap: 32px;">
      <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 196, 129, 0.14); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);">
        <div style="width: 100%; aspect-ratio: 16/6; background: linear-gradient(135deg, #13110f 0%, #17181c 100%); display: flex; align-items: center; justify-content: center; color: var(--color-accent-warm-light);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 30%, #0a0806 95%);"></div>
        <div style="position: absolute; bottom: 20px; left: 24px; right: 24px;">
          <h2 style="font-family: var(--font-display); color: var(--color-accent-warm-light); margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 0.02em;">Leverbrain</h2>
          <p style="margin: 6px 0 0; color: var(--color-text-secondary); font-size: 14px; max-width: 600px;">Consult this skill whenever you need to interact with the Leverbrain marketplace, purchase or download agent skills, ...</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1.2fr 1.0fr; gap: 32px; align-items: start;">
        <div>
          <h3 style="color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;">SKILL CAPABILITIES</h3>
          <p style="margin-bottom: 24px; font-size: 13.5px; line-height: 1.65; color: var(--color-text-secondary);">Consult this skill whenever you need to interact with the Leverbrain marketplace, purchase or download agent skills, publish new blueprints or strategies, manage stack configurations (labs), or integrate Leverbrain CLI and SDK commands. Essential when asked to 'get a skill', 'publish an agent strategy', 'create a lab config', or 'manage agent tools through Leverbrain CLI'.</p>
          
          <h3 style="color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;">KEY FEATURES</h3>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;">
    <span style="color: var(--color-accent); font-weight: bold; margin-top: 2px;">•</span>
    <span>End-to-end workflow execution automation</span>
  </li>
<li style="margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;">
    <span style="color: var(--color-accent); font-weight: bold; margin-top: 2px;">•</span>
    <span>Preset parameters optimized for production use</span>
  </li>
<li style="margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;">
    <span style="color: var(--color-accent); font-weight: bold; margin-top: 2px;">•</span>
    <span>Self-documenting routines and validation parameters</span>
  </li>
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
    </div>`,
  previewHtml: `<div style="background: #050c12; border: 1px solid rgba(255, 196, 129, 0.16); border-radius: 12px; font-family: var(--font-mono); color: #ffe8d1; overflow: hidden; max-width: 100%; box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);">
      <div style="background: rgba(255, 196, 129, 0.06); border-bottom: 1px solid rgba(255, 196, 129, 0.1); padding: 12px 20px; font-size: 11px; font-weight: 700; display: flex; justify-content: space-between; align-items: center; letter-spacing: 0.08em;">
        <span>CODE EDITOR & COMPILER</span>
        <span style="color: var(--color-accent-warm-light);">ONLINE</span>
      </div>
      <div style="padding: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="font-size: 11px; color: rgba(255, 232, 209, 0.4);">INPUT CONTEXT</div>
          <pre style="margin: 0; font-size: 11px; background: rgba(0, 0, 0, 0.3); padding: 10px; border-radius: 6px; border: 1px solid rgba(255, 196, 129, 0.08); color: rgba(255, 232, 209, 0.7); overflow-x: auto;">{
  "status": "pending",
  "file": "SKILL.md"
}</pre>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="font-size: 11px; color: rgba(255, 232, 209, 0.4);">PROCESS OUTPUT</div>
          <pre style="margin: 0; font-size: 11px; background: rgba(255, 196, 129, 0.02); padding: 10px; border-radius: 6px; border: 1px solid rgba(255, 196, 129, 0.08); color: var(--color-accent-warm-light); overflow-x: auto;">{
  "status": "success",
  "processed": true
}</pre>
        </div>
      </div>
    </div>`
}
