import { SkillListing } from '../skills-data'

export const saasGtmPlaybook: SkillListing = {
  id: 'saas-gtm-playbook',
  author: 'leverbrain',
  slug: 'saas-gtm-playbook',
  name: 'SaaS GTM Playbook',
  tagline: 'Full go-to-market strategy for early-stage SaaS products.',
  description:
    'A structured go-to-market strategy covering positioning, ICP definition, channel selection, early traction playbook, and metrics framework for early-stage SaaS.',
  readme: `# SaaS GTM Playbook

From zero to first 100 customers with a repeatable, documented process.

## What you get
- ICP definition framework
- Positioning and messaging guide
- Channel selection decision tree
- Outbound and inbound activation playbooks
- Week-by-week 90-day traction plan
- Key metrics and milestone framework

## How to use
Work through sections sequentially or jump to the module you need.`,
  whenToUse:
    'Use at idea validation stage or when preparing for a launch. Best before spending on paid acquisition.',
  price: '$29.00',
  priceUsdc: 29.00,
  category: 'strategy',
  tags: ['saas', 'gtm', 'growth', 'startup'],
  stars: 1800,
  weeklyInstalls: 740,
  totalPurchases: 2800,
  featured: false,
  createdAt: '2025-04-10',
  creatorWallet: 'CYVikdfqKK1SmPasR93k1p6CntrmqGW4YcoSYQQ2TeVp',
  fileUrl: 'https://github.com/leverbrain/leverbrain',
  overviewHtml: `
    <div class="skill-enrichment">
      <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; margin-bottom: 32px; border: 1px solid var(--color-border);">
        <div style="width: 100%; aspect-ratio: 16/7; background: linear-gradient(135deg, #1c0e12 0%, #2f121b 100%); display: flex; align-items: center; justify-content: center;">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ffbc68" stroke-width="1.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
        </div>
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 40%, #120e0a 95%);"></div>
        <div style="position: absolute; bottom: 24px; left: 24px;">
          <h2 style="font-family: var(--font-display); color: var(--color-accent); margin: 0; font-size: 32px;">SaaS GTM Strategy</h2>
          <p style="margin: 8px 0 0; color: var(--color-text-secondary);">Construct positioning structures, define ICP matrices, and execute a 90-day launcher framework.</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 32px;">
        <div>
          <h3 style="color: var(--color-text-primary); margin-bottom: 16px;">Traction Playbook</h3>
          <p style="margin-bottom: 24px;">Stop launching blind. The GTM playbook configures specific product channels, builds outbound email sequences, maps public launch patterns, and specifies your core target metrics.</p>
          
          <h3 style="color: var(--color-text-primary); margin-bottom: 16px;">Strategic Pillars</h3>
          <ul style="color: var(--color-text-secondary); padding-left: 20px;">
            <li style="margin-bottom: 8px;">ICP Mapping Decision Tree</li>
            <li style="margin-bottom: 8px;">Cold Email Sequences & Ads Framework</li>
            <li>90-Day Step-by-Step Traction Timeline</li>
          </ul>
        </div>
        
        <div style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: 12px; padding: 24px;">
          <h4 style="color: var(--color-accent); margin-bottom: 16px; font-family: var(--font-display);">MILESTONE TARGETS</h4>
          <div style="background: #120e0a; border-radius: 8px; border: 1px solid #ffbc6833; padding: 16px;">
            <div style="font-size: 11px; color: #ffbc68; margin-bottom: 8px;">Month 1: 10 ICP Interviews</div>
            <div style="font-size: 11px; color: #ffbc68; margin-bottom: 8px;">Month 2: First 25 Customers</div>
            <div style="font-size: 11px; color: #ffbc68;">Month 3: Channel Scaling</div>
          </div>
        </div>
      </div>
    </div>
  `,
  previewHtml: `
    <div style="background: #120e0a; border: 1px solid #ffbc6844; border-radius: 12px; font-family: 'Saira', sans-serif; color: #ffe3be; overflow: hidden;">
      <div style="background: #ffbc68; color: #120e0a; padding: 12px 24px; font-weight: 700; display: flex; justify-content: space-between; align-items: center;">
        <span>90-DAY TRACTION TIMELINE</span>
        <span style="font-family: monospace; font-size: 12px;">ACTIVE TIMELINE</span>
      </div>
      <div style="padding: 24px; background: #120e0a; display: flex; flex-direction: column; gap: 12px;">
        <div style="display: flex; gap: 16px; align-items: center; border-left: 2px solid #34d399; padding-left: 16px;">
          <div style="font-weight: 600; color: #34d399; font-size: 14px;">WEEKS 1-4:</div>
          <div style="font-size: 13px; color: #d5b185;">ICP Validation & Customer Development Interviews</div>
        </div>
        <div style="display: flex; gap: 16px; align-items: center; border-left: 2px solid #fbbf24; padding-left: 16px;">
          <div style="font-weight: 600; color: #fbbf24; font-size: 14px;">WEEKS 5-8:</div>
          <div style="font-size: 13px; color: #d5b185;">Channel Activation (Outbound Campaign Launch)</div>
        </div>
        <div style="display: flex; gap: 16px; align-items: center; border-left: 2px solid #ffbc6822; padding-left: 16px;">
          <div style="font-weight: 600; color: #9c7a52; font-size: 14px;">WEEKS 9-12:</div>
          <div style="font-size: 13px; color: #9c7a52;">Traction Scaling & PH/HN Launches</div>
        </div>
      </div>
    </div>
  `
}
