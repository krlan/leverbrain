import { SkillListing } from '../skills-data'
 
export const aso: SkillListing = {
  id: 'aso',
  author: 'coreyhaines31',
  slug: 'aso',
  name: "Aso",
  tagline: "When the user wants to audit or optimize an App Store or Google Play listing.",
  description: "When the user wants to audit or optimize an App Store or Google Play listing. Also use when the user mentions 'ASO audit,' 'app store optimization,' 'optimize my app listing,' 'improve app visibility,' 'app store ranking,' 'audit my listing,' 'why aren't people downloading my app,' 'improve my app conversion,' 'keyword optimization for app,' or 'compare my app to competitors.' Use when the user shares an App Store or Google Play URL and wants to improve it.",
  readme: `# ASO Audit

Analyze App Store and Google Play listings against ASO best practices. Fetches
live listing data, scores metadata, visuals, and ratings, then produces a
prioritized action plan.

## When to Use

- User shares an App Store or Google Play URL
- User asks to audit or optimize an app listing
- User wants to compare their app against competitors
- User asks about app store ranking, visibility, or download conversion

## Before Auditing

**Check for product marketing context first:**
If \`.agents/product-marketing.md\` exists (or \`.claude/product-marketing.md\`, or the legacy \`product-marketing-context.md\` filename, in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

## Phase 1 — Identify Store & Fetch

### Detect store type from URL

\`\`\`
Apple:  apps.apple.com/{country}/app/{name}/id{digits}
Google: play.google.com/store/apps/details?id={package}
\`\`\`

If the user gives an app name instead of a URL, search the web for:
\`site:apps.apple.com "{app name}"\` or \`site:play.google.com "{app name}"\`

### Fetch the listing

Use WebFetch to retrieve the listing page. Extract every available field:

**Apple App Store fields:**

- App name (title) — 30 char limit
- Subtitle — 30 char limit
- Description (long) — not indexed for search, but matters for conversion
- Promotional text — 170 chars, updatable without new release
- Category (primary + secondary)
- Screenshots (count, order, caption text)
- Preview video (presence, duration)
- Rating (average + count)
- Recent reviews (visible ones)
- Price / in-app purchases
- Developer name
- Last updated date
- Version history notes
- Age rating
- Size
- Languages / localizations listed
- In-app events (if any visible)

**Google Play fields:**

- App name (title) — 30 char limit
- Short description — 80 char limit
- Full description — 4,000 char limit, IS indexed for search
- Category + tags
- Feature graphic (presence)
- Screenshots (count, order)
- Preview video (presence)
- Rating (average + count)
- Recent reviews (visible ones)
- Price / in-app purchases
- Developer name
- Last updated date
- What's new text
- Downloads range
- Content rating
- Data safety section
- Languages listed

If WebFetch returns incomplete data (stores render client-side), note gaps and
work with what's available. Ask the user to paste missing fields if critical.

### Visual asset assessment

WebFetch cannot extract screenshot images or caption text. **Take a screenshot
of the listing page** to get visual data:

1. Navigate to the listing URL and capture a full-page screenshot
2. Assess the screenshot for: icon quality, screenshot count, caption text,
   messaging quality, preview video presence, feature graphic (Google Play)
3. If browser tools are unavailable, ask the user to share a screenshot of the
   listing page

**Promotional text (Apple):** This 170-char field appears above the description
but is often indistinguishable from it in scraped HTML. If you cannot confirm
its presence, note this and recommend the user check App Store Connect.

---

## Phase 1.5 — Assess Brand Maturity

Before scoring, classify the app into one of three tiers. This determines how
you interpret "textbook ASO" deviations — a deliberate brand choice by a
household name is not the same as a missed opportunity by an unknown app.

### Tier definitions

| Tier            | Signals                                                                                                                              | Examples                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| **Dominant**    | Household name, 1M+ ratings, top-10 in category, near-universal brand recognition. Users search by brand name, not generic keywords. | Instagram, Uber, Spotify, WhatsApp, Netflix |
| **Established** | Well-known in their category, 100K+ ratings, strong organic installs, recognized brand but not universally known.                    | Strava, Notion, Duolingo, Cash App, Calm    |
| **Challenger**  | Building awareness, <100K ratings, needs discovery through keywords and ASO tactics. Most apps fall here.                            | Your app, most indie/startup apps           |

### How tier affects scoring

**Dominant apps** get adjusted scoring in these areas:

- **Title:** Brand-only or brand-first titles are valid (score 8+ if brand is the keyword). These apps don't need generic keyword discovery.
- **Description:** Score purely on conversion quality, not keyword presence. If the app is a household name, a well-crafted brand description beats a keyword-stuffed one.
- **Visual Assets:** Lifestyle/brand photography instead of UI demos is a legitimate conversion strategy. No video is acceptable if the product is hard to demo in 30s or brand awareness is near-universal.
- **What's New:** Generic release notes at weekly+ cadence are acceptable (score 8+). At scale, detailed changelogs have minimal ROI and risk backlash.
- **In-app events:** Missing events for utility apps with massive install bases (Uber, WhatsApp) is not a penalty. These apps don't need discovery help.
- **Localization:** Score relative to actual market, not absolute count. A US-only fintech with 2 languages (English + Spanish) is appropriately localized.

**Established apps** get partial adjustment:

- Brand-first titles are fine but should still include 1-2 keywords
- Strategic description choices get benefit of the doubt
- Other dimensions scored normally

**Challenger apps** are scored strictly against textbook ASO best practices — every character, screenshot, and keyword matters.

**Key principle:** Before docking points, ask: "Is this a mistake or a deliberate
choice by a team that has data I don't?" If the app has 1M+ ratings and a
dedicated ASO team, assume their choices are data-informed unless clearly wrong.

---

## Phase 2 — Score Each Dimension

Score each dimension 0-10 using the criteria in \`references/scoring-criteria.md\`.
Apply the brand maturity tier adjustments from Phase 1.5.

Reference files for platform specs and benchmarks:

- \`references/apple-specs.md\` — Official Apple character limits, screenshot/video specs, CPP/PPO rules, rejection triggers
- \`references/google-play-specs.md\` — Official Google Play limits, screenshot specs, Android Vitals thresholds, policies
- \`references/benchmarks.md\` — Conversion data, rating impact, video lift, screenshot behavior, CPP/event benchmarks

### Dimensions and Weights

| #   | Dimension            | Weight | What It Covers                                                            |
| --- | -------------------- | ------ | ------------------------------------------------------------------------- |
| 1   | Title & Subtitle     | 20%    | Character usage, keyword presence, clarity, brand + keyword balance       |
| 2   | Description          | 15%    | First 3 lines, keyword density (Google), CTA, structure, promotional text |
| 3   | Visual Assets        | 25%    | Screenshot count/quality/messaging, video, icon, feature graphic          |
| 4   | Ratings & Reviews    | 20%    | Average rating, volume, recency, developer responses                      |
| 5   | Metadata & Freshness | 10%    | Category choice, update recency, localization count, data safety          |
| 6   | Conversion Signals   | 10%    | Price positioning, IAP transparency, social proof, download range         |

**Final score** = weighted sum, out of 100.

### Score interpretation

| Score  | Grade | Meaning                                                   |
| ------ | ----- | --------------------------------------------------------- |
| 85-100 | A     | Well-optimized; focus on A/B testing and iteration        |
| 70-84  | B     | Good foundation; clear opportunities to improve           |
| 50-69  | C     | Significant gaps; prioritized fixes will have high impact |
| 30-49  | D     | Major optimization needed across multiple dimensions      |
| 0-29   | F     | Listing needs a complete overhaul                         |

---

## Phase 3 — Competitor Comparison (Optional)

If the user provides competitor URLs or asks for comparison:

1. Fetch 2-3 top competitors in the same category
2. Run the same scoring on each
3. Build a comparison table highlighting where the user's app is weaker/stronger
4. Identify keyword gaps — terms competitors rank for that the user's app doesn't target

If no competitors are specified, suggest the user provide 2-3 or offer to search
for top apps in their category.

---

## Phase 4 — Generate Report

Use the template in \`references/report-template.md\` to structure the output.

The report must include:

1. **Score card** — table with all 6 dimensions, scores, and grade
2. **Top 3 quick wins** — changes that take <1 hour and have highest impact
3. **Detailed findings** — per-dimension breakdown with specific issues and fixes
4. **Keyword suggestions** — based on title/description analysis and competitor gaps
5. **Visual asset recommendations** — specific screenshot/video improvements
6. **Priority action plan** — ordered list of changes by impact vs effort

### Report rules

- Every recommendation must be **specific and actionable** ("Change subtitle from X to Y" not "Improve subtitle")
- Include character counts for all text recommendations
- Flag platform-specific differences (Apple vs Google) when relevant
- Note what CANNOT be assessed without paid tools (search volume, exact rankings)
- When suggesting keyword changes, explain WHY each keyword matters

---

## Platform-Specific Rules

### Apple App Store — Key Facts

- Title (30 chars) + Subtitle (30 chars) + Keyword field (100 **bytes**, hidden) = indexed text
- Keywords field is bytes not chars — Arabic/CJK use 2-3 bytes per char
- Long description is NOT indexed for search — optimize for conversion only
- Promotional text (170 chars) does NOT affect search (Apple confirmed)
- Never repeat words across title/subtitle/keyword field (Apple indexes each word once)
- Keyword field: commas, no spaces ("photo,editor,filter" not "photo, editor, filter")
- Screenshots: up to 10 per device. First 3 visible in search — 90% never scroll past 3rd
- Screenshot captions indexed since June 2025 (AI extraction)
- In-app events: max 10 published at once, max 31 days each. Indexed and appear in search
- Custom Product Pages (up to 70) in organic search since July 2025. +5.9% avg conversion lift
- App preview video: up to 3, 15-30s each. Autoplays muted — +20-40% conversion lift
- SKStoreReviewController: max 3 prompts per 365 days
- Apple has human editorial curation — quality and design matter more
- See \`references/apple-specs.md\` for full specs, dimensions, and rejection triggers

### Google Play — Key Facts

- Title (30 chars) + Short description (80 chars) + Full description (4,000 chars) = indexed text
- Full description IS indexed — target 2-3% keyword density naturally
- No hidden keyword field — all keywords must be in visible text
- Google NLP/semantic understanding — keyword stuffing detected and penalized
- Prohibited in title: emojis, ALL CAPS, "best"/"#1"/"free", CTAs (enforced since 2021)
- Screenshots: min 2, **max 8** per device (not 10 like Apple)
- Feature graphic (1024x500, exact) required for featured placements
- Video does NOT autoplay — only ~6% of users tap play (low ROI vs iOS)
- Android Vitals directly affect ranking: crash >1.09% or ANR >0.47% = reduced visibility
- Promotional Content: submit 14 days early for featuring. Apps see 2x explore acquisitions
- Custom Store Listings: up to 50 (can target churned users, specific countries, ad campaigns)
- Store Listing Experiments: test up to 3 variants, run 7+ days, 1 experiment at a time
- See \`references/google-play-specs.md\` for full specs and policy details

### What Apple Indexes vs What Google Indexes

| Field                 | Apple Indexed?   | Google Indexed?        |
| --------------------- | ---------------- | ---------------------- |
| Title                 | Yes              | Yes (strongest signal) |
| Subtitle / Short desc | Yes              | Yes                    |
| Keyword field         | Yes (hidden)     | Does not exist         |
| Long description      | No               | Yes (heavily)          |
| Screenshot captions   | Yes (since 2025) | No                     |
| In-app events         | Yes              | N/A (LiveOps instead)  |
| Developer name        | No               | Partial                |
| IAP names             | Yes              | Yes                    |

---

## Common Issues Checklist

Flag these if found. Items marked _(tier-dependent)_ should be evaluated against
the app's brand maturity tier — they may be deliberate choices for Dominant apps.

**Always flag (all tiers):**

- [ ] Rating below 4.0
- [ ] Last update > 3 months ago
- [ ] Google Play description has no keyword strategy (under 1% density)
- [ ] Google Play missing feature graphic
- [ ] Apple keyword field likely has repeated words (inferred from title+subtitle)
- [ ] Category mismatch — app would face less competition in a different category
- [ ] Fewer than 5 screenshots

**Flag for Challenger/Established only** _(not mistakes for Dominant apps):_

- [ ] Title wastes characters on brand name only (no keywords) _(Dominant: brand IS the keyword)_
- [ ] Subtitle/short description duplicates title keywords
- [ ] Description first 3 lines are generic _(Dominant: may be brand-voice choice)_
- [ ] No preview video _(Dominant: may be rational if product is hard to demo)_
- [ ] Screenshots are just UI dumps with no messaging/captions _(Dominant: lifestyle/brand shots may convert better)_
- [ ] Only 1-2 localizations _(score relative to actual market, not absolute count)_
- [ ] No in-app events or promotional content _(Dominant utility apps may not need discovery help)_

**Flag for all tiers but note context:**

- [ ] No developer responses to negative reviews _(note volume — responding at 10M+ reviews is a different challenge than at 1K)_
- [ ] Generic "What's New" text _(acceptable at weekly+ release cadence for Established/Dominant)_

---

## Task-Specific Questions

1. What is the App Store or Google Play URL?
2. Is this your app or a competitor's?
3. What category does the app compete in?
4. Do you have competitor URLs to compare against?
5. Are you focused on search visibility, conversion rate, or both?
6. Do you have access to App Store Connect or Google Play Console data?

---

## Related Skills

- **cro**: For optimizing the conversion of web-based landing pages that drive app installs
- **ad-creative**: For creating App Store and Google Play ad creatives
- **analytics**: For setting up install attribution and in-app event tracking
- **customer-research**: For understanding user needs and language to inform listing copy`,
  whenToUse: "- User shares an App Store or Google Play URL - User asks to audit or optimize an app listing - User wants to compare their app against competitors - User asks about app store ranking, visibility, or download conversion",
  price: "Free",
  priceUsdc: 0,
  category: "skill",
  tags: ["coreyhaines31-skills","aso"],
  stars: 279,
  weeklyInstalls: 102,
  totalPurchases: 754,
  featured: false,
  createdAt: '2026-06-09',
  creatorWallet: '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
  fileUrl: 'https://github.com/coreyhaines31/marketingskills/tree/main/skills/aso',
  useCases: ["User shares an App Store or Google Play URL.","User asks to audit or optimize an app listing.","User wants to compare their app against competitors."],
  exampleUsage: "Improve aso for my project",
  overviewHtml: `<div class="skill-enrichment" style="display: flex; flex-direction: column; gap: 32px;">
      <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 196, 129, 0.14); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);">
        <div style="width: 100%; aspect-ratio: 16/6; background: linear-gradient(135deg, #13110f 0%, #17181c 100%); display: flex; align-items: center; justify-content: center; color: var(--color-accent-warm-light);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 30%, #0a0806 95%);"></div>
        <div style="position: absolute; bottom: 20px; left: 24px; right: 24px;">
          <h2 style="font-family: var(--font-display); color: var(--color-accent-warm-light); margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 0.02em;">Aso</h2>
          <p style="margin: 6px 0 0; color: var(--color-text-secondary); font-size: 14px; max-width: 600px;">When the user wants to audit or optimize an App Store or Google Play listing.</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1.2fr 1.0fr; gap: 32px; align-items: start;">
        <div>
          <h3 style="color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;">SKILL CAPABILITIES</h3>
          <p style="margin-bottom: 24px; font-size: 13.5px; line-height: 1.65; color: var(--color-text-secondary);">When the user wants to audit or optimize an App Store or Google Play listing. Also use when the user mentions 'ASO audit,' 'app store optimization,' 'optimize my app listing,' 'improve app visibility,' 'app store ranking,' 'audit my listing,' 'why aren't people downloading my app,' 'improve my app conversion,' 'keyword optimization for app,' or 'compare my app to competitors.' Use when the user shares an App Store or Google Play URL and wants to improve it.</p>
          
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
