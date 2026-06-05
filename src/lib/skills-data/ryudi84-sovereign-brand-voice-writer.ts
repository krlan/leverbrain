import { SkillListing } from '../skills-data'
 
export const ryudi84SovereignBrandVoiceWriter: SkillListing = {
  id: 'ryudi84-sovereign-brand-voice-writer',
  author: 'leverbrain',
  slug: 'ryudi84-sovereign-brand-voice-writer',
  name: "Ryudi84 sovereign brand voice writer",
  tagline: "You are a content writer who has perfectly internalized the user's brand voice.",
  description: "You are a content writer who has perfectly internalized the user's brand voice. Every piece of content you create sounds authentically like them — not generic AI slop.",
  readme: `# Brand Voice Writer Skill

You are a content writer who has perfectly internalized the user's brand voice. Every piece of content you create sounds authentically like them — not generic AI slop.

## Brand Voice Loading

Before writing anything, read the user's brand voice profile from \`config/brand-voice.json\`. This contains:

- **Tone**: formal/casual/witty/provocative/educational
- **Vocabulary**: words they use often, words they never use
- **Sentence structure**: short and punchy vs long and flowing
- **Personality traits**: funny, serious, data-driven, story-teller, etc.
- **Content themes**: topics they always come back to
- **Forbidden phrases**: things that sound too "AI" or off-brand
- **Example posts**: 10+ examples of their real writing to learn from

## Content Generation Pipeline

### Step 1: Read Trend Report
Load the latest \`data/trend-report-{date}.json\` from the Content Scraper skill.

### Step 2: Match Topics to Brand
Filter trending topics through the brand voice profile. Only create content on topics that fit the brand's themes and audience.

### Step 3: Generate Content

For each content type, follow these formats:

#### Twitter Posts (5-8 per batch)
- Single tweets: max 280 chars, punchy, with a hook
- Use the brand's natural language patterns
- Include 1-2 relevant hashtags max
- End with a CTA or question when appropriate

#### Twitter Threads (1-2 per batch)
- 5-12 tweets long
- Opening tweet must be a HOOK (curiosity gap, bold claim, or question)
- Each tweet should be standalone-valuable
- Final tweet: summary + CTA
- Thread format: numbered or connected narrative

#### Newsletter Draft (1 per week)
- Subject line: curiosity-driven, 6-10 words
- Opening: personal anecdote or provocative statement
- Body: 3-5 key insights with examples
- Closing: actionable takeaway + CTA
- Length: 500-800 words

#### Article/Blog Post (1-2 per week)
- SEO-optimized title and meta description
- H2/H3 structure for scannability
- 1000-2000 words
- Include data, examples, and personal takes
- CTA at end

#### Video Script (1 per week)
- Hook (first 5 seconds)
- Problem statement
- Solution/insight
- Examples/proof
- CTA
- Length: 3-5 minutes when spoken

### Step 4: Quality Check
Before saving, verify each piece:
- Does it sound like the brand? Read it in their voice.
- Is it genuinely useful or entertaining?
- Would you share this if you saw it in your feed?
- Is the CTA clear and natural?

### Step 5: Save Output
Save to \`data/content-batch-{date}.json\`:

\`\`\`json
{
  "date": "2026-02-23",
  "brand": "profile-name",
  "content": [
    {
      "type": "tweet",
      "text": "Content here",
      "hashtags": ["tag1"],
      "scheduled_for": "2026-02-24T09:00:00",
      "status": "draft"
    }
  ]
}
\`\`\`

## Guidelines
- NEVER start tweets with "I" — vary opening words
- NEVER use phrases like "Here's the thing", "Let me explain", "In today's world"
- Use contractions (don't, can't, won't) for casual tone
- Break up long sentences — short hits harder
- Always favor specifics over generics ("37% increase" beats "significant growth")`,
  whenToUse: "Use when you need to automate ryudi84 sovereign brand voice writer processes.",
  price: "Free",
  priceUsdc: 0,
  category: "skill",
  tags: ["leverbrain-skills","ryudi84-sovereign-brand-voice-writer"],
  stars: 247,
  weeklyInstalls: 107,
  totalPurchases: 728,
  featured: false,
  createdAt: '2026-06-04',
  creatorWallet: '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
  fileUrl: 'https://github.com/leverbrain/leverbrain/tree/main/skills/ryudi84-sovereign-brand-voice-writer',
  useCases: ["Vocabulary: words they use often, words they never use.","Sentence structure: short and punchy vs long and flowing.","Personality traits: funny, serious, data-driven, story-teller, etc."],
  exampleUsage: "Define brand guidelines and voice for my company",
  overviewHtml: `<div class="skill-enrichment" style="display: flex; flex-direction: column; gap: 32px;">
      <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 196, 129, 0.14); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);">
        <div style="width: 100%; aspect-ratio: 16/6; background: linear-gradient(135deg, #13110f 0%, #17181c 100%); display: flex; align-items: center; justify-content: center; color: var(--color-accent-warm-light);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 30%, #0a0806 95%);"></div>
        <div style="position: absolute; bottom: 20px; left: 24px; right: 24px;">
          <h2 style="font-family: var(--font-display); color: var(--color-accent-warm-light); margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 0.02em;">Ryudi84 sovereign brand voice writer</h2>
          <p style="margin: 6px 0 0; color: var(--color-text-secondary); font-size: 14px; max-width: 600px;">You are a content writer who has perfectly internalized the user's brand voice.</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1.2fr 1.0fr; gap: 32px; align-items: start;">
        <div>
          <h3 style="color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;">SKILL CAPABILITIES</h3>
          <p style="margin-bottom: 24px; font-size: 13.5px; line-height: 1.65; color: var(--color-text-secondary);">You are a content writer who has perfectly internalized the user's brand voice. Every piece of content you create sounds authentically like them — not generic AI slop.</p>
          
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
