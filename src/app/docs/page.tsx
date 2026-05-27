import Link from 'next/link'

const NAV = [
  {
    title: 'Getting Started',
    links: [
      { label: 'Introduction', href: '#introduction' },
      { label: 'Install CLI', href: '#cli' },
      { label: 'Inspect first skill', href: '#first-skill' },
    ],
  },
  {
    title: 'REST API',
    links: [
      { label: 'Authentication', href: '#auth' },
      { label: 'Search skills', href: '#search' },
      { label: 'Get skill', href: '#get-skill' },
      { label: 'Download skill', href: '#download' },
    ],
  },
  {
    title: 'Publishing',
    links: [
      { label: 'Publish via web', href: '#publish-web' },
      { label: 'Publish via CLI', href: '#publish-cli' },
      { label: 'Economics', href: '#economics' },
    ],
  },
  {
    title: 'For Agents',
    links: [
      { label: 'agents.md spec', href: '#agents-spec' },
      { label: 'npm package', href: '#npm' },
    ],
  },
]

export default function DocsPage() {
  return (
    <div className="docs-page">
      <div className="container">
        <div className="docs-layout">

          {/* Sidebar */}
          <nav className="docs-nav" aria-label="Docs navigation">
            {NAV.map((section) => (
              <div key={section.title} className="docs-nav-section">
                <p className="docs-nav-title">{section.title}</p>
                <div className="docs-nav-links">
                  {section.links.map((link) => (
                    <a key={link.href} href={link.href} className="docs-nav-link">
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Main content */}
          <div className="docs-content">
            <header className="docs-header">
              <h1>Documentation</h1>
              <p>
                Everything you need to buy, sell, and deploy skills programmatically — via REST API, CLI, or npm package.
              </p>
            </header>

            {/* Introduction */}
            <section id="introduction" className="docs-section">
              <h2>Introduction</h2>
              <p>
                Leverbrain is a Solana-native marketplace for agent skills, strategies, and blueprints.
                Every transaction settles in USDC on Solana — ownership is on-chain, delivery is instant.
              </p>
              <p>
                Purchases create a <strong>Purchase Receipt PDA</strong> on Solana that proves ownership.
                Leverbrain&apos;s backend verifies that PDA before serving any protected file URLs.
              </p>
              <p>
                The marketplace is accessible through three surfaces:
              </p>
              <ul>
                <li><strong>Web</strong> — <Link href="/skills">leverbrain.com/skills</Link></li>
                <li><strong>REST API</strong> — <code>https://leverbrain.com/api</code> (Convex HTTP actions)</li>
                <li><strong>CLI / npm</strong> — <code>npx leverbrain</code></li>
              </ul>
            </section>

            {/* CLI */}
            <section id="cli" className="docs-section">
              <h2>Install CLI</h2>
              <p>Use the CLI to search listings, fetch skill details, list receipts, and publish from SKILL.md.</p>
              <div className="docs-code">
                <p className="docs-code-label">npm</p>
                <pre>{`npm install -g leverbrain`}</pre>
              </div>
              <div className="docs-code">
                <p className="docs-code-label">or use npx</p>
                <pre>{`npx --yes leverbrain@latest --help`}</pre>
              </div>
              <h3>Commands</h3>
              <div className="docs-code">
                <pre>{`leverbrain search <query>           # Search marketplace
leverbrain get <author/slug>        # Download selected skill
leverbrain cfg <handle/name>        # Download lab configs
leverbrain purchases --wallet <pk>  # List purchase receipts
leverbrain publish ./my-skill \\
  --wallet <PUBLISHER_WALLET> \\
  --author <HANDLE>                 # Publish SKILL.md`}</pre>
              </div>
            </section>

            {/* First skill */}
            <section id="first-skill" className="docs-section">
              <h2>Inspect your first skill</h2>
              <p>Three quick CLI checks:</p>
              <ol>
                <li>Search listings: <code>leverbrain search deep-research</code></li>
                <li>Download a skill package: <code>leverbrain get &lt;author&gt;/&lt;slug-from-search&gt;</code></li>
                <li>Download saved configuration: <code>leverbrain cfg &lt;handle&gt;/&lt;config-name&gt;</code></li>
                <li>Check receipts for a wallet: <code>leverbrain purchases --wallet &lt;BUYER_WALLET&gt;</code></li>
              </ol>
              <p>
                These commands use the published npm package endpoints directly, so output matches what agents see.
              </p>
            </section>

            {/* Authentication */}
            <section id="auth" className="docs-section">
              <h2>Authentication</h2>
              <p>
                Leverbrain uses Solana wallet signatures for authentication. For protected endpoints
                (download, publish), include a signed message header:
              </p>
              <div className="docs-code">
                <pre>{`X-Wallet-Address: <base58 public key>
X-Wallet-Signature: <base58 signature of message>
X-Wallet-Message: leverbrain-auth-<timestamp>`}</pre>
              </div>
              <p>
                The signature must be &lt;5 minutes old. Convex backend verifies ownership of the
                Purchase Receipt PDA on Solana before serving protected content.
              </p>
            </section>

            {/* Search API */}
            <section id="search" className="docs-section">
              <h2>Search Skills</h2>
              <div className="docs-endpoint">
                <div className="docs-endpoint-method">
                  <span className="docs-method-badge docs-method-badge--get">GET</span>
                  <span className="docs-endpoint-path">/api/skills?q=&lt;query&gt;&amp;category=&lt;category&gt;</span>
                </div>
                <p>Search the marketplace. No authentication required.</p>
              </div>
              <div className="docs-code">
                <p className="docs-code-label">Example request</p>
                <pre>{`curl "https://leverbrain.com/api/skills?q=research&category=skill"`}</pre>
              </div>
              <div className="docs-code">
                <p className="docs-code-label">Response</p>
                <pre>{`{
  "skills": [
    {
      "id": "deep-research",
      "author": "199-biotechnologies",
      "slug": "deep-research",
      "name": "Deep Research",
      "tagline": "Autonomous multi-phase research with citation tracking.",
      "price": "Free",
      "priceUsdc": 0,
      "category": "skill",
      "tags": ["research", "citations", "automation", "analysis"],
      "weeklyInstalls": 5600,
      "stars": 530
    }
  ]
}`}</pre>
              </div>
            </section>

            {/* Get skill */}
            <section id="get-skill" className="docs-section">
              <h2>Get Skill Details</h2>
              <div className="docs-endpoint">
                <div className="docs-endpoint-method">
                  <span className="docs-method-badge docs-method-badge--get">GET</span>
                  <span className="docs-endpoint-path">/api/skills/&lt;author&gt;/&lt;slug&gt;</span>
                </div>
                <p>Get full details for a specific skill including README content.</p>
              </div>
              <div className="docs-code">
                <p className="docs-code-label">Example</p>
                <pre>{`curl "https://leverbrain.com/api/skills/anthropics/skill-creator"`}</pre>
              </div>
            </section>

            {/* Download */}
            <section id="download" className="docs-section">
              <h2>Download Skill Files</h2>
              <div className="docs-endpoint">
                <div className="docs-endpoint-method">
                  <span className="docs-method-badge docs-method-badge--get">GET</span>
                  <span className="docs-endpoint-path">/api/download/&lt;author&gt;/&lt;slug&gt;</span>
                </div>
                <p>Download skill files. Requires authentication. Convex verifies Purchase Receipt PDA before serving files.</p>
              </div>
              <div className="docs-code">
                <pre>{`curl -H "X-Wallet-Address: <pubkey>" \\
     -H "X-Wallet-Signature: <sig>" \\
     -H "X-Wallet-Message: leverbrain-auth-<ts>" \\
     "https://leverbrain.com/api/download/anthropics/skill-creator" \\
     --output skill-creator.zip`}</pre>
              </div>
            </section>

            {/* Publish web */}
            <section id="publish-web" className="docs-section">
              <h2>Publish via Web</h2>
              <p>
                Go to <Link href="/publish">/publish</Link>, connect your wallet, fill in skill metadata,
                upload SKILL.md and any supporting scripts, then submit.
              </p>
              <p>
                Publishing registers the skill on Solana (one transaction) and uploads files to Convex storage.
                Your skill is live at <code>/skills/&lt;your-handle&gt;/&lt;slug&gt;</code>.
              </p>
            </section>

            {/* Publish CLI */}
            <section id="publish-cli" className="docs-section">
              <h2>Publish via CLI</h2>
              <div className="docs-code">
                <pre>{`leverbrain publish ./my-skill --wallet <PUBLISHER_WALLET> --author <HANDLE> --price 9.99`}</pre>
              </div>
              <p>Your skill directory must contain a <code>SKILL.md</code> with YAML frontmatter:</p>
              <div className="docs-code">
                <pre>{`---
name: My Skill Name
description: One-line description
category: skill  # skill | strategy | blueprint
tags: [tag1, tag2]
price: 9.99
---

# My Skill Name

...skill content...`}</pre>
              </div>
            </section>

            {/* Economics */}
            <section id="economics" className="docs-section">
              <h2>Economics</h2>
              <p>
                Every USDC payment splits automatically on-chain:
              </p>
              <ul>
                <li><strong>90%</strong> — creator payout (instant, to your wallet)</li>
                <li><strong>10%</strong> — Leverbrain platform treasury</li>
              </ul>
              <p>
                Pricing is set by the creator and locked on-chain. Buyers pay exactly what&apos;s listed.
                Free skills have no transaction — they&apos;re downloaded directly.
              </p>
            </section>

            {/* agents.md spec */}
            <section id="agents-spec" className="docs-section">
              <h2>agents.md spec</h2>
              <p>
                <a href="/agents.md" target="_blank" rel="noreferrer"><code>/agents.md</code></a> is a
                machine-readable markdown file that agents can fetch to discover API endpoints,
                authentication patterns, and available skill categories without reading full docs.
              </p>
              <div className="docs-code">
                <pre>{`curl https://leverbrain.com/agents.md`}</pre>
              </div>
            </section>

            {/* NPM */}
            <section id="npm" className="docs-section">
              <h2>npm Package</h2>
              <p>Use the <code>leverbrain</code> npm package to integrate the marketplace into your own tools and agents:</p>
              <div className="docs-code">
                <pre>{`import { LeverbrainClient } from 'leverbrain'

const client = new LeverbrainClient({
  convexUrl: process.env.LEVERBRAIN_CONVEX_URL,
})

// Search skills
const skills = await client.search('deep research')

// Read a single listing
const listing = await client.getSkill('commandcodeai', 'cca-leads')

// Pull receipts for a wallet
const receipts = await client.getPurchasesByBuyer('<BUYER_WALLET>')

// Fetch saved configuration
const config = await client.getConfig('shark', 'grape')`}</pre>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  )
}
