import { SkillListing } from '../skills-data'
 
export const wmantlyPorkbunSkill: SkillListing = {
  id: 'wmantly-porkbun-skill',
  author: 'leverbrain',
  slug: 'wmantly-porkbun-skill',
  name: "Porkbun",
  tagline: "Manage Porkbun DNS records and domains via API v3.",
  description: "Manage Porkbun DNS records and domains via API v3. Use when Codex needs to create, read, update, or delete DNS records on Porkbun; list domains; configure API access; work with common record types (A, AAAA, CNAME, MX, TXT, etc.). The skill includes a CLI tool `scripts/porkbun-dns.js` for executing DNS operations reliably.",
  readme: `# Porkbun DNS Management

Manage DNS records and domains on Porkbun via their REST API v3.

## Quick Start

### Set up API credentials

1. Generate API keys: https://porkbun.com/account/api
2. Save credentials to config file: \`~/.config/porkbun/config.json\`
\`\`\`json
{
  "apiKey": "your-api-key",
  "secretApiKey": "your-secret-api-key"
}
\`\`\`

Or set environment variables:
\`\`\`bash
export PORKBUN_API_KEY="your-api-key"
export PORKBUN_SECRET_API_KEY="your-secret-api-key"
\`\`\`

3. Enable API access for each domain: Domain Management → Details → API Access → Enable

### Test connection

\`\`\`bash
node ~/.openclaw/workspace/skills/public/porkbun/scripts/porkbun-dns.js ping
\`\`\`

## Using the CLI Tool

The \`scripts/porkbun-dns.js\` script provides a reliable, deterministic way to execute DNS operations. Use it directly for common tasks instead of writing custom code.

### Common Operations

#### List domains
\`\`\`bash
node scripts/porkbun-dns.js list
\`\`\`

#### List DNS records
\`\`\`bash
node scripts/porkbun-dns.js records example.com
\`\`\`

#### Create records
\`\`\`bash
# A record
node scripts/porkbun-dns.js create example.com type=A name=www content=1.1.1.1 ttl=600

# CNAME
node scripts/porkbun-dns.js create example.com type=CNAME name=docs content=example.com

# MX record
node scripts/porkbun-dns.js create example.com type=MX name= content="mail.example.com" prio=10

# TXT record ( SPF for email)
node scripts/porkbun-dns.js create example.com type=TXT name= content="v=spf1 include:_spf.google.com ~all"
\`\`\`

#### Edit records
\`\`\`bash
# By ID (get ID from records command)
node scripts/porkbun-dns.js edit example.com 123456 content=2.2.2.2

# By type and subdomain (updates all matching records)
node scripts/porkbun-dns.js edit-by example.com A www content=2.2.2.2
\`\`\`

#### Delete records
\`\`\`bash
# By ID
node scripts/porkbun-dns.js delete example.com 123456

# By type and subdomain
node scripts/porkbun-dns.js delete-by example.com A www
\`\`\`

#### Get specific records
\`\`\`bash
# All records
node scripts/porkbun-dns.js get example.com

# Filter by type
node scripts/porkbun-dns.js get example.com A

# Filter by type and subdomain
node scripts/porkbun-dns.js get example.com A www
\`\`\`

## Record Types

Supported record types: A, AAAA, CNAME, ALIAS, TXT, NS, MX, SRV, TLSA, CAA, HTTPS, SVCB, SSHFP

For detailed field requirements and examples, see [references/dns-record-types.md](references/dns-record-types.md).

## Common Patterns

### Website Setup

Create root A record and www CNAME:
\`\`\`bash
node scripts/porkbun-dns.js create example.com type=A name= content=192.0.2.1
node scripts/porkbun-dns.js create example.com type=CNAME name=www content=example.com
\`\`\`

### Email Configuration

Set up MX records for Google Workspace:
\`\`\`bash
node scripts/porkbun-dns.js create example.com type=MX name= content="aspmx.l.google.com" prio=1
node scripts/porkbun-dns.js create example.com type=MX name= content="alt1.aspmx.l.google.com" prio=5
node scripts/porkbun-dns.js create example.com type=MX name= content="alt2.aspmx.l.google.com" prio=5
node scripts/porkbun-dns.js create example.com type=MX name= content="alt3.aspmx.l.google.com" prio=10
node scripts/porkbun-dns.js create example.com type=MX name= content="alt4.aspmx.l.google.com" prio=10
\`\`\`

Add SPF record:
\`\`\`bash
node scripts/porkbun-dns.js create example.com type=TXT name= content="v=spf1 include:_spf.google.com ~all"
\`\`\`

### Dynamic DNS

Update home IP address (can be scripted/automated):
\`\`\`bash
HOME_IP=$(curl -s ifconfig.me)
node scripts/porkbun-dns.js edit-by example.com A home content=$HOME_IP
\`\`\`

### Wildcard DNS

Create a wildcard record pointing to root:
\`\`\`bash
node scripts/porkbun-dns.js create example.com type=A name=* content=192.0.2.1
\`\`\`

## Reference Documentation

- **[references/dns-record-types.md](references/dns-record-types.md)** - Detailed reference for all DNS record types and field requirements
- **[https://porkbun.com/api/json/v3/documentation](https://porkbun.com/api/json/v3/documentation)** - Full API documentation

## Troubleshooting

### "API key not found"
- Verify config file exists at \`~/.config/porkbun/config.json\`
- Check environment variables: \`echo $PORKBUN_API_KEY\`
- Ensure API access is enabled for the specific domain

### "Invalid type passed"
- Record types must be uppercase (e.g., \`A\`, not \`a\`)
- See supported types list above

### HTTP errors
- Verify API keys are valid at https://porkbun.com/account/api
- Check network connectivity
- Confirm API endpoint is \`api.porkbun.com\` (not \`porkbun.com\`)

### TTL errors
- Minimum TTL is 600 seconds (10 minutes)
- Default TTL is 600 seconds
- Common values: 300 (dynamic), 3600 (standard), 86400 (stable)

## Notes

- TTL minimum is 600 seconds
- Use "@" for root domain records
- Use "*" for wildcard records
- TXT records with spaces need quotes
- Multiple MX records allowed with different priorities
- API v3 current hostname: \`api.porkbun.com\``,
  whenToUse: "Use when you need to automate porkbun processes.",
  price: "Free",
  priceUsdc: 0,
  category: "skill",
  tags: ["leverbrain-skills","wmantly-porkbun-skill"],
  stars: 156,
  weeklyInstalls: 98,
  totalPurchases: 165,
  featured: false,
  createdAt: '2026-06-09',
  creatorWallet: '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
  fileUrl: 'https://github.com/krlan/leverbrain/tree/main/skills/wmantly-porkbun-skill',
  useCases: ["Enable API access for each domain: Domain Management → Details → API Access → Enable.","Check environment variables: echo $PORKBUN_API_KEY.","Ensure API access is enabled for the specific domain."],
  exampleUsage: "Create porkbun for my project",
  overviewHtml: `<div class="skill-enrichment" style="display: flex; flex-direction: column; gap: 32px;">
      <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 196, 129, 0.14); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);">
        <div style="width: 100%; aspect-ratio: 16/6; background: linear-gradient(135deg, #13110f 0%, #17181c 100%); display: flex; align-items: center; justify-content: center; color: var(--color-accent-warm-light);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 30%, #0a0806 95%);"></div>
        <div style="position: absolute; bottom: 20px; left: 24px; right: 24px;">
          <h2 style="font-family: var(--font-display); color: var(--color-accent-warm-light); margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 0.02em;">Porkbun</h2>
          <p style="margin: 6px 0 0; color: var(--color-text-secondary); font-size: 14px; max-width: 600px;">Manage Porkbun DNS records and domains via API v3.</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1.2fr 1.0fr; gap: 32px; align-items: start;">
        <div>
          <h3 style="color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;">SKILL CAPABILITIES</h3>
          <p style="margin-bottom: 24px; font-size: 13.5px; line-height: 1.65; color: var(--color-text-secondary);">Manage Porkbun DNS records and domains via API v3. Use when Codex needs to create, read, update, or delete DNS records on Porkbun; list domains; configure API access; work with common record types (A, AAAA, CNAME, MX, TXT, etc.). The skill includes a CLI tool \`scripts/porkbun-dns.js\` for executing DNS operations reliably.</p>
          
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
