import { SkillListing } from '../skills-data'

export const agencyInABox: SkillListing = {
  id: 'agency-in-a-box',
  author: 'leverbrain',
  slug: 'agency-in-a-box',
  name: 'Agency in a Box',
  tagline: 'Launch a productized service business with full operational stack.',
  description:
    'A complete blueprint for launching a productized service agency: positioning, pricing tiers, proposal templates, onboarding flow, delivery process, and client success system. Everything in one deployable package.',
  readme: `# Agency in a Box

The complete operational blueprint for launching a productized service business.

## What you get
- Positioning framework and niche selection guide
- 3-tier pricing structure with templates
- Client onboarding flow (forms, welcome sequence, kickoff call agenda)
- Delivery SOPs for common service types
- Client success and retention system

## Included files
\`\`\`
agency-in-a-box/
├── SKILL.md                 # Main guide
├── templates/
│   ├── proposal.md          # Editable proposal
│   ├── onboarding.md        # Client onboarding checklist
│   └── case-study.md        # Case study template
└── scripts/
    └── pricing-calculator   # Revenue projections
\`\`\``,
  whenToUse:
    'Use when you\'re starting a service business or converting an existing freelance practice into a productized model. Best for consultants, agencies, and builders looking to productize expertise.',
  price: '$49.00',
  priceUsdc: 49.00,
  category: 'blueprint',
  tags: ['agency', 'business', 'productized', 'operations'],
  stars: 2400,
  weeklyInstalls: 890,
  totalPurchases: 3100,
  featured: true,
  createdAt: '2025-04-01',
  creatorWallet: 'CYVikdfqKK1SmPasR93k1p6CntrmqGW4YcoSYQQ2TeVp',
  fileUrl: 'https://github.com/leverbrain/leverbrain',
  imageUrl: '/images/skills/agency-box.png',
  useCases: ["Deploy instant onboarding questionnaires for new clients.","Draft standardized freelance service level agreements.","Organize monthly billing and reporting templates in your workspace."],
  exampleUsage: "Launch a full AI agency workflow for my client project",
  overviewHtml: `
    <div class="skill-enrichment">
      <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; margin-bottom: 32px; border: 1px solid var(--color-border);">
        <img src="/images/skills/agency-box.png" style="width: 100%; aspect-ratio: 16/7; object-fit: cover; opacity: 0.8;" />
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 40%, #120e0a 95%);"></div>
        <div style="position: absolute; bottom: 24px; left: 24px;">
          <h2 style="font-family: var(--font-display); color: var(--color-accent); margin: 0; font-size: 32px;">Agency in a Box</h2>
          <p style="margin: 8px 0 0; color: var(--color-text-secondary);">The complete operational stack for productized services.</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 32px;">
        <div>
          <h3 style="color: var(--color-text-primary); margin-bottom: 16px;">The Stack</h3>
          <p style="margin-bottom: 24px;">Don't build from scratch. Agency in a Box provides the positioning, pricing, onboarding, and delivery SOPs you need to scale a service business like a SaaS.</p>
          
          <h3 style="color: var(--color-text-primary); margin-bottom: 16px;">Included Modules</h3>
          <ul style="color: var(--color-text-secondary); padding-left: 20px;">
            <li style="margin-bottom: 8px;">Tiered Pricing Frameworks</li>
            <li style="margin-bottom: 8px;">Client Onboarding Automations</li>
            <li>Delivery SOPs & Success Metrics</li>
          </ul>
        </div>
        
        <div style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: 12px; padding: 24px;">
          <h4 style="color: var(--color-accent); margin-bottom: 16px; font-family: var(--font-display);">CONTROL PANEL</h4>
          <div style="background: #120e0a; border-radius: 8px; border: 1px solid #ffbc6833; padding: 16px;">
            <div style="display: flex; justify-content: space-between; font-size: 10px; color: #9c7a52; margin-bottom: 12px;">
              <span>MRR</span>
              <span>RETENTION</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 18px; color: #ffbc68; font-family: var(--font-display);">
              <span>$24,500</span>
              <span>94.2%</span>
            </div>
            <div style="margin-top: 16px; font-size: 9px; color: #34d399;">+ 12.4% THIS MONTH</div>
          </div>
        </div>
      </div>
    </div>
  `,
  previewHtml: `
    <div style="background: #120e0a; border: 1px solid #ffbc6844; border-radius: 12px; font-family: 'Saira', sans-serif; color: #ffe3be; overflow: hidden;">
      <div style="background: #ffbc68; color: #120e0a; padding: 12px 24px; font-weight: 700; display: flex; justify-content: space-between; align-items: center;">
        <span>AGENCY COMMAND CENTER</span>
        <span style="font-family: monospace; font-size: 12px;">OPERATIONAL v4.0</span>
      </div>
      <div style="display: grid; grid-template-columns: 200px 1fr; height: 320px;">
        <div style="background: #1a140f; border-right: 1px solid #ffbc6822; padding: 16px;">
          <div style="font-size: 11px; color: #9c7a52; margin-bottom: 16px; text-transform: uppercase;">Active Pipeline</div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="font-size: 13px; color: #ffbc68; background: #ffbc6811; padding: 8px; border-radius: 4px;">Acme Corp</div>
            <div style="font-size: 13px; color: #d5b185; padding: 8px;">Globex Inc</div>
            <div style="font-size: 13px; color: #d5b185; padding: 8px;">Initech</div>
            <div style="font-size: 13px; color: #d5b185; padding: 8px;">Stark Ind.</div>
          </div>
        </div>
        <div style="padding: 24px; background: #120e0a;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
            <div style="background: #1a140f; padding: 16px; border-radius: 8px; border: 1px solid #ffbc6811;">
              <div style="font-size: 11px; color: #9c7a52; margin-bottom: 4px;">Monthly Revenue</div>
              <div style="font-size: 24px; color: #ffbc68; font-weight: 600;">$14,200</div>
            </div>
            <div style="background: #1a140f; padding: 16px; border-radius: 8px; border: 1px solid #ffbc6811;">
              <div style="font-size: 11px; color: #9c7a52; margin-bottom: 4px;">Client Satisfaction</div>
              <div style="font-size: 24px; color: #ffbc68; font-weight: 600;">98%</div>
            </div>
          </div>
          <div style="font-size: 12px; color: #9c7a52; margin-bottom: 12px;">Recent Milestones</div>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <div style="display: flex; align-items: center; gap: 12px; font-size: 13px; color: #d5b185;">
              <div style="width: 8px; height: 8px; background: #34d399; border-radius: 50%;"></div>
              <span>Acme Corp: Onboarding complete</span>
            </div>
            <div style="display: flex; align-items: center; gap: 12px; font-size: 13px; color: #d5b185;">
              <div style="width: 8px; height: 8px; background: #fbbf24; border-radius: 50%;"></div>
              <span>Globex: Proposal pending review</span>
            </div>
            <div style="display: flex; align-items: center; gap: 12px; font-size: 13px; color: #d5b185;">
              <div style="width: 8px; height: 8px; background: #60a5fa; border-radius: 50%;"></div>
              <span>New Lead: Stark Industries (Tier 1)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}
