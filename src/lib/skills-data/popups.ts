import { SkillListing } from '../skills-data'
 
export const popups: SkillListing = {
  id: 'popups',
  author: 'coreyhaines31',
  slug: 'popups',
  name: "Popups",
  tagline: "When the user wants to create or optimize popups, modals, overlays, slide-ins, or banners for conversion purposes.",
  description: "When the user wants to create or optimize popups, modals, overlays, slide-ins, or banners for conversion purposes. Also use when the user mentions \"exit intent,\" \"popup conversions,\" \"modal optimization,\" \"lead capture popup,\" \"email popup,\" \"announcement banner,\" \"overlay,\" \"collect emails with a popup,\" \"exit popup,\" \"scroll trigger,\" \"sticky bar,\" or \"notification bar.\" Use this for any overlay or interrupt-style conversion element. For forms outside of popups, see cro. For general page conversion optimization, see cro.",
  readme: `# Popup CRO

You are an expert in popup and modal optimization. Your goal is to create popups that convert without annoying users or damaging brand perception.

## Initial Assessment

**Check for product marketing context first:**
If \`.agents/product-marketing.md\` exists (or \`.claude/product-marketing.md\`, or the legacy \`product-marketing-context.md\` filename, in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Before providing recommendations, understand:

1. **Popup Purpose**
   - Email/newsletter capture
   - Lead magnet delivery
   - Discount/promotion
   - Announcement
   - Exit intent save
   - Feature promotion
   - Feedback/survey

2. **Current State**
   - Existing popup performance?
   - What triggers are used?
   - User complaints or feedback?
   - Mobile experience?

3. **Traffic Context**
   - Traffic sources (paid, organic, direct)
   - New vs. returning visitors
   - Page types where shown

---

## Core Principles

### 1. Timing Is Everything
- Too early = annoying interruption
- Too late = missed opportunity
- Right time = helpful offer at moment of need

### 2. Value Must Be Obvious
- Clear, immediate benefit
- Relevant to page context
- Worth the interruption

### 3. Respect the User
- Easy to dismiss
- Don't trap or trick
- Remember preferences
- Don't ruin the experience

---

## Trigger Strategies

### Time-Based
- **Not recommended**: "Show after 5 seconds"
- **Better**: "Show after 30-60 seconds" (proven engagement)
- Best for: General site visitors

### Scroll-Based
- **Typical**: 25-50% scroll depth
- Indicates: Content engagement
- Best for: Blog posts, long-form content
- Example: "You're halfway through—get more like this"

### Exit Intent
- Detects cursor moving to close/leave
- Last chance to capture value
- Best for: E-commerce, lead gen
- Mobile alternative: Back button or scroll up

### Click-Triggered
- User initiates (clicks button/link)
- Zero annoyance factor
- Best for: Lead magnets, gated content, demos
- Example: "Download PDF" → Popup form

### Page Count / Session-Based
- After visiting X pages
- Indicates research/comparison behavior
- Best for: Multi-page journeys
- Example: "Been comparing? Here's a summary..."

### Behavior-Based
- Add to cart abandonment
- Pricing page visitors
- Repeat page visits
- Best for: High-intent segments

---

## Popup Types

### Email Capture Popup
**Goal**: Newsletter/list subscription

**Best practices:**
- Clear value prop (not just "Subscribe")
- Specific benefit of subscribing
- Single field (email only)
- Consider incentive (discount, content)

**Copy structure:**
- Headline: Benefit or curiosity hook
- Subhead: What they get, how often
- CTA: Specific action ("Get Weekly Tips")

### Lead Magnet Popup
**Goal**: Exchange content for email

**Best practices:**
- Show what they get (cover image, preview)
- Specific, tangible promise
- Minimal fields (email, maybe name)
- Instant delivery expectation

### Discount/Promotion Popup
**Goal**: First purchase or conversion

**Best practices:**
- Clear discount (10%, $20, free shipping)
- Deadline creates urgency
- Single use per visitor
- Easy to apply code

### Exit Intent Popup
**Goal**: Last-chance conversion

**Best practices:**
- Acknowledge they're leaving
- Different offer than entry popup
- Address common objections
- Final compelling reason to stay

**Formats:**
- "Wait! Before you go..."
- "Forget something?"
- "Get 10% off your first order"
- "Questions? Chat with us"

### Announcement Banner
**Goal**: Site-wide communication

**Best practices:**
- Top of page (sticky or static)
- Single, clear message
- Dismissable
- Links to more info
- Time-limited (don't leave forever)

### Slide-In
**Goal**: Less intrusive engagement

**Best practices:**
- Enters from corner/bottom
- Doesn't block content
- Easy to dismiss or minimize
- Good for chat, support, secondary CTAs

---

## Design Best Practices

### Visual Hierarchy
1. Headline (largest, first seen)
2. Value prop/offer (clear benefit)
3. Form/CTA (obvious action)
4. Close option (easy to find)

### Sizing
- Desktop: 400-600px wide typical
- Don't cover entire screen
- Mobile: Full-width bottom or center, not full-screen
- Leave space to close (visible X, click outside)

### Close Button
- Keep visible (top right is convention) — users who can't find the close button will bounce entirely
- Large enough to tap on mobile
- "No thanks" text link as alternative
- Click outside to close

### Mobile Considerations
- Can't detect exit intent (use alternatives)
- Full-screen overlays feel aggressive
- Bottom slide-ups work well
- Larger touch targets
- Easy dismiss gestures

### Imagery
- Product image or preview
- Face if relevant (increases trust)
- Minimal for speed
- Optional—copy can work alone

---

## Copy Formulas

### Headlines
- Benefit-driven: "Get [result] in [timeframe]"
- Question: "Want [desired outcome]?"
- Command: "Don't miss [thing]"
- Social proof: "Join [X] people who..."
- Curiosity: "The one thing [audience] always get wrong about [topic]"

### Subheadlines
- Expand on the promise
- Address objection ("No spam, ever")
- Set expectations ("Weekly tips in 5 min")

### CTA Buttons
- First person works: "Get My Discount" vs "Get Your Discount"
- Specific over generic: "Send Me the Guide" vs "Submit"
- Value-focused: "Claim My 10% Off" vs "Subscribe"

### Decline Options
- Polite, not guilt-trippy
- "No thanks" / "Maybe later" / "I'm not interested"
- Avoid manipulative: "No, I don't want to save money"

---

## Frequency and Rules

### Frequency Capping
- Show maximum once per session
- Remember dismissals (cookie/localStorage)
- 7-30 days before showing again
- Respect user choice

### Audience Targeting
- New vs. returning visitors (different needs)
- By traffic source (match ad message)
- By page type (context-relevant)
- Exclude converted users
- Exclude recently dismissed

### Page Rules
- Exclude checkout/conversion flows
- Consider blog vs. product pages
- Match offer to page context

---

## Compliance and Accessibility

### GDPR/Privacy
- Clear consent language
- Link to privacy policy
- Don't pre-check opt-ins
- Honor unsubscribe/preferences

### Accessibility
- Keyboard navigable (Tab, Enter, Esc)
- Focus trap while open
- Screen reader compatible
- Sufficient color contrast
- Don't rely on color alone

### Google Guidelines
- Intrusive interstitials hurt SEO
- Mobile especially sensitive
- Allow: Cookie notices, age verification, reasonable banners
- Avoid: Full-screen before content on mobile

---

## Measurement

### Key Metrics
- **Impression rate**: Visitors who see popup
- **Conversion rate**: Impressions → Submissions
- **Close rate**: How many dismiss immediately
- **Engagement rate**: Interaction before close
- **Time to close**: How long before dismissing

### What to Track
- Popup views
- Form focus
- Submission attempts
- Successful submissions
- Close button clicks
- Outside clicks
- Escape key

### Benchmarks
- Email popup: 2-5% conversion typical
- Exit intent: 3-10% conversion
- Click-triggered: Higher (10%+, self-selected)

---

## Output Format

### Popup Design
- **Type**: Email capture, lead magnet, etc.
- **Trigger**: When it appears
- **Targeting**: Who sees it
- **Frequency**: How often shown
- **Copy**: Headline, subhead, CTA, decline
- **Design notes**: Layout, imagery, mobile

### Multiple Popup Strategy
If recommending multiple popups:
- Popup 1: [Purpose, trigger, audience]
- Popup 2: [Purpose, trigger, audience]
- Conflict rules: How they don't overlap

### Test Hypotheses
Ideas to A/B test with expected outcomes

---

## Common Popup Strategies

### E-commerce
1. Entry/scroll: First-purchase discount
2. Exit intent: Bigger discount or reminder
3. Cart abandonment: Complete your order

### B2B SaaS
1. Click-triggered: Demo request, lead magnets
2. Scroll: Newsletter/blog subscription
3. Exit intent: Trial reminder or content offer

### Content/Media
1. Scroll-based: Newsletter after engagement
2. Page count: Subscribe after multiple visits
3. Exit intent: Don't miss future content

### Lead Generation
1. Time-delayed: General list building
2. Click-triggered: Specific lead magnets
3. Exit intent: Final capture attempt

---

## Experiment Ideas

### Placement & Format Experiments

**Banner Variations**
- Top bar vs. banner below header
- Sticky banner vs. static banner
- Full-width vs. contained banner
- Banner with countdown timer vs. without

**Popup Formats**
- Center modal vs. slide-in from corner
- Full-screen overlay vs. smaller modal
- Bottom bar vs. corner popup
- Top announcements vs. bottom slideouts

**Position Testing**
- Test popup sizes on desktop and mobile
- Left corner vs. right corner for slide-ins
- Test visibility without blocking content

---

### Trigger Experiments

**Timing Triggers**
- Exit intent vs. 30-second delay vs. 50% scroll depth
- Test optimal time delay (10s vs. 30s vs. 60s)
- Test scroll depth percentage (25% vs. 50% vs. 75%)
- Page count trigger (show after X pages viewed)

**Behavior Triggers**
- Show based on user intent prediction
- Trigger based on specific page visits
- Return visitor vs. new visitor targeting
- Show based on referral source

**Click Triggers**
- Click-triggered popups for lead magnets
- Button-triggered vs. link-triggered modals
- Test in-content triggers vs. sidebar triggers

---

### Messaging & Content Experiments

**Headlines & Copy**
- Test attention-grabbing vs. informational headlines
- "Limited-time offer" vs. "New feature alert" messaging
- Urgency-focused copy vs. value-focused copy
- Test headline length and specificity

**CTAs**
- CTA button text variations
- Button color testing for contrast
- Primary + secondary CTA vs. single CTA
- Test decline text (friendly vs. neutral)

**Visual Content**
- Add countdown timers to create urgency
- Test with/without images
- Product preview vs. generic imagery
- Include social proof in popup

---

### Personalization Experiments

**Dynamic Content**
- Personalize popup based on visitor data
- Show industry-specific content
- Tailor content based on pages visited
- Use progressive profiling (ask more over time)

**Audience Targeting**
- New vs. returning visitor messaging
- Segment by traffic source
- Target based on engagement level
- Exclude already-converted visitors

---

### Frequency & Rules Experiments

- Test frequency capping (once per session vs. once per week)
- Cool-down period after dismissal
- Test different dismiss behaviors
- Show escalating offers over multiple visits

---

## Task-Specific Questions

1. What's the primary goal for this popup?
2. What's your current popup performance (if any)?
3. What traffic sources are you optimizing for?
4. What incentive can you offer?
5. Are there compliance requirements (GDPR, etc.)?
6. Mobile vs. desktop traffic split?

---

## Related Skills

- **lead-magnets**: For planning lead magnets to promote via popups
- **cro**: For optimizing the form inside the popup
- **cro**: For the page context around popups
- **emails**: For what happens after popup conversion
- **ab-testing**: For testing popup variations`,
  whenToUse: "Use when you need to automate popups processes.",
  price: "Free",
  priceUsdc: 0,
  category: "skill",
  tags: ["coreyhaines31-skills","popups"],
  stars: 296,
  weeklyInstalls: 204,
  totalPurchases: 689,
  featured: false,
  createdAt: '2026-06-04',
  creatorWallet: '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
  fileUrl: 'https://github.com/coreyhaines31/marketingskills/tree/main/skills/popups',
  useCases: ["Check for product marketing context first:.","Lead magnet delivery.","Exit intent save."],
  exampleUsage: "Create popups for my project",
  overviewHtml: `<div class="skill-enrichment" style="display: flex; flex-direction: column; gap: 32px;">
      <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 196, 129, 0.14); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);">
        <div style="width: 100%; aspect-ratio: 16/6; background: linear-gradient(135deg, #13110f 0%, #17181c 100%); display: flex; align-items: center; justify-content: center; color: var(--color-accent-warm-light);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 30%, #0a0806 95%);"></div>
        <div style="position: absolute; bottom: 20px; left: 24px; right: 24px;">
          <h2 style="font-family: var(--font-display); color: var(--color-accent-warm-light); margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 0.02em;">Popups</h2>
          <p style="margin: 6px 0 0; color: var(--color-text-secondary); font-size: 14px; max-width: 600px;">When the user wants to create or optimize popups, modals, overlays, slide-ins, or banners for conversion purposes.</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1.2fr 1.0fr; gap: 32px; align-items: start;">
        <div>
          <h3 style="color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;">SKILL CAPABILITIES</h3>
          <p style="margin-bottom: 24px; font-size: 13.5px; line-height: 1.65; color: var(--color-text-secondary);">When the user wants to create or optimize popups, modals, overlays, slide-ins, or banners for conversion purposes. Also use when the user mentions "exit intent," "popup conversions," "modal optimization," "lead capture popup," "email popup," "announcement banner," "overlay," "collect emails with a popup," "exit popup," "scroll trigger," "sticky bar," or "notification bar." Use this for any overlay or interrupt-style conversion element. For forms outside of popups, see cro. For general page conversion optimization, see cro.</p>
          
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
