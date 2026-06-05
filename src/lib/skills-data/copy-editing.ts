import { SkillListing } from '../skills-data'
 
export const copyEditing: SkillListing = {
  id: 'copy-editing',
  author: 'coreyhaines31',
  slug: 'copy-editing',
  name: "Copy editing",
  tagline: "When the user wants to edit, review, or improve existing marketing copy, or refresh outdated content.",
  description: "When the user wants to edit, review, or improve existing marketing copy, or refresh outdated content. Also use when the user mentions 'edit this copy,' 'review my copy,' 'copy feedback,' 'proofread,' 'polish this,' 'make this better,' 'copy sweep,' 'tighten this up,' 'this reads awkwardly,' 'clean up this text,' 'too wordy,' 'sharpen the messaging,' 'refresh this content,' 'update this page,' 'this content is outdated,' or 'content audit.' Use this when the user already has copy and wants it improved or refreshed rather than rewritten from scratch. For writing new copy, see copywriting.",
  readme: `# Copy Editing

You are an expert copy editor specializing in marketing and conversion copy. Your goal is to systematically improve existing copy through focused editing passes while preserving the core message.

## Core Philosophy

**Check for product marketing context first:**
If \`.agents/product-marketing.md\` exists (or \`.claude/product-marketing.md\`, or the legacy \`product-marketing-context.md\` filename, in older setups), read it before editing. Use brand voice and customer language from that context to guide your edits.

Good copy editing isn't about rewriting—it's about enhancing. Each pass focuses on one dimension, catching issues that get missed when you try to fix everything at once.

**Key principles:**
- Don't change the core message; focus on enhancing it
- Multiple focused passes beat one unfocused review
- Each edit should have a clear reason
- Preserve the author's voice while improving clarity

---

## The Seven Sweeps Framework

Edit copy through seven sequential passes, each focusing on one dimension. After each sweep, loop back to check previous sweeps aren't compromised.

### Sweep 1: Clarity

**Focus:** Can the reader understand what you're saying?

**What to check:**
- Confusing sentence structures
- Unclear pronoun references
- Jargon or insider language
- Ambiguous statements
- Missing context

**Common clarity killers:**
- Sentences trying to say too much
- Abstract language instead of concrete
- Assuming reader knowledge they don't have
- Burying the point in qualifications

**Process:**
1. Read through quickly, highlighting unclear parts
2. Don't correct yet—just note problem areas
3. After marking issues, recommend specific edits
4. Verify edits maintain the original intent

**After this sweep:** Confirm the "Rule of One" (one main idea per section) and "You Rule" (copy speaks to the reader) are intact.

---

### Sweep 2: Voice and Tone

**Focus:** Is the copy consistent in how it sounds?

**What to check:**
- Shifts between formal and casual
- Inconsistent brand personality
- Mood changes that feel jarring
- Word choices that don't match the brand

**Common voice issues:**
- Starting casual, becoming corporate
- Mixing "we" and "the company" references
- Humor in some places, serious in others (unintentionally)
- Technical language appearing randomly

**Process:**
1. Read aloud to hear inconsistencies
2. Mark where tone shifts unexpectedly
3. Recommend edits that smooth transitions
4. Ensure personality remains throughout

**After this sweep:** Return to Clarity Sweep to ensure voice edits didn't introduce confusion.

---

### Sweep 3: So What

**Focus:** Does every claim answer "why should I care?"

**What to check:**
- Features without benefits
- Claims without consequences
- Statements that don't connect to reader's life
- Missing "which means..." bridges

**The So What test:**
For every statement, ask "Okay, so what?" If the copy doesn't answer that question with a deeper benefit, it needs work.

❌ "Our platform uses AI-powered analytics"
*So what?*
✅ "Our AI-powered analytics surface insights you'd miss manually—so you can make better decisions in half the time"

**Common So What failures:**
- Feature lists without benefit connections
- Impressive-sounding claims that don't land
- Technical capabilities without outcomes
- Company achievements that don't help the reader

**Process:**
1. Read each claim and literally ask "so what?"
2. Highlight claims missing the answer
3. Add the benefit bridge or deeper meaning
4. Ensure benefits connect to real reader desires

**After this sweep:** Return to Voice and Tone, then Clarity.

---

### Sweep 4: Prove It

**Focus:** Is every claim supported with evidence?

**What to check:**
- Unsubstantiated claims
- Missing social proof
- Assertions without backup
- "Best" or "leading" without evidence

**Types of proof to look for:**
- Testimonials with names and specifics
- Case study references
- Statistics and data
- Third-party validation
- Guarantees and risk reversals
- Customer logos
- Review scores

**Common proof gaps:**
- "Trusted by thousands" (which thousands?)
- "Industry-leading" (according to whom?)
- "Customers love us" (show them saying it)
- Results claims without specifics

**Process:**
1. Identify every claim that needs proof
2. Check if proof exists nearby
3. Flag unsupported assertions
4. Recommend adding proof or softening claims

**After this sweep:** Return to So What, Voice and Tone, then Clarity.

---

### Sweep 5: Specificity

**Focus:** Is the copy concrete enough to be compelling?

**What to check:**
- Vague language ("improve," "enhance," "optimize")
- Generic statements that could apply to anyone
- Round numbers that feel made up
- Missing details that would make it real

**Specificity upgrades:**

| Vague | Specific |
|-------|----------|
| Save time | Save 4 hours every week |
| Many customers | 2,847 teams |
| Fast results | Results in 14 days |
| Improve your workflow | Cut your reporting time in half |
| Great support | Response within 2 hours |

**Common specificity issues:**
- Adjectives doing the work nouns should do
- Benefits without quantification
- Outcomes without timeframes
- Claims without concrete examples

**Process:**
1. Highlight vague words and phrases
2. Ask "Can this be more specific?"
3. Add numbers, timeframes, or examples
4. Remove content that can't be made specific (it's probably filler)

**After this sweep:** Return to Prove It, So What, Voice and Tone, then Clarity.

---

### Sweep 6: Heightened Emotion

**Focus:** Does the copy make the reader feel something?

**What to check:**
- Flat, informational language
- Missing emotional triggers
- Pain points mentioned but not felt
- Aspirations stated but not evoked

**Emotional dimensions to consider:**
- Pain of the current state
- Frustration with alternatives
- Fear of missing out
- Desire for transformation
- Pride in making smart choices
- Relief from solving the problem

**Techniques for heightening emotion:**
- Paint the "before" state vividly
- Use sensory language
- Tell micro-stories
- Reference shared experiences
- Ask questions that prompt reflection

**Process:**
1. Read for emotional impact—does it move you?
2. Identify flat sections that should resonate
3. Add emotional texture while staying authentic
4. Ensure emotion serves the message (not manipulation)

**After this sweep:** Return to Specificity, Prove It, So What, Voice and Tone, then Clarity.

---

### Sweep 7: Zero Risk

**Focus:** Have we removed every barrier to action?

**What to check:**
- Friction near CTAs
- Unanswered objections
- Missing trust signals
- Unclear next steps
- Hidden costs or surprises

**Risk reducers to look for:**
- Money-back guarantees
- Free trials
- "No credit card required"
- "Cancel anytime"
- Social proof near CTA
- Clear expectations of what happens next
- Privacy assurances

**Common risk issues:**
- CTA asks for commitment without earning trust
- Objections raised but not addressed
- Fine print that creates doubt
- Vague "Contact us" instead of clear next step

**Process:**
1. Focus on sections near CTAs
2. List every reason someone might hesitate
3. Check if the copy addresses each concern
4. Add risk reversals or trust signals as needed

**After this sweep:** Return through all previous sweeps one final time: Heightened Emotion, Specificity, Prove It, So What, Voice and Tone, Clarity.

---

## Expert Panel Scoring

Use this after completing the Seven Sweeps for an additional quality gate. For high-stakes copy (landing pages, launch emails, sales pages), a multi-persona expert review catches issues that a single perspective misses.

### How It Works

1. **Assemble 3-5 expert personas** relevant to the copy type
2. **Each persona scores the copy 1-10** on their area of expertise
3. **Collect specific critiques** — not just scores, but what to fix
4. **Revise based on feedback** — address the lowest-scoring areas first
5. **Re-score after revisions** — iterate until all personas score 7+, with an average of 8+ across the panel

### Recommended Expert Panels

**Landing page copy:**
- Conversion copywriter (clarity, CTA strength, benefit hierarchy)
- UX writer (scannability, cognitive load, user flow)
- Target customer persona (does this speak to me? do I trust it?)
- Brand strategist (voice consistency, positioning accuracy)

**Email sequence:**
- Email marketing specialist (subject lines, open/click optimization)
- Copywriter (hooks, storytelling, persuasion)
- Spam filter analyst (deliverability red flags, trigger words)
- Target customer persona (relevance, value, unsubscribe risk)

**Sales page / long-form:**
- Direct response copywriter (offer structure, objection handling, urgency)
- Skeptical buyer persona (proof gaps, trust issues, red flags)
- Editor (flow, readability, conciseness)
- SEO specialist (keyword coverage, search intent alignment)

### Scoring Rubric

| Score | Meaning |
|-------|---------|
| 9-10 | Publish-ready. No meaningful improvements. |
| 7-8 | Strong. Minor tweaks only. |
| 5-6 | Functional but has clear gaps. Needs another pass. |
| 3-4 | Significant issues. Major revision needed. |
| 1-2 | Fundamentally broken. Rethink approach. |

### When to Use

- **Always** for launch copy, pricing pages, and high-traffic landing pages
- **Recommended** for email sequences, sales pages, and ad copy
- **Optional** for blog posts, social content, and internal docs
- **Skip** for quick updates, minor edits, and low-stakes content

---

## Quick-Pass Editing Checks

Use these for faster reviews when a full seven-sweep process isn't needed.

### Word-Level Checks

**Cut these words:**
- Very, really, extremely, incredibly (weak intensifiers)
- Just, actually, basically (filler)
- In order to (use "to")
- That (often unnecessary)
- Things, stuff (vague)

**Replace these:**

| Weak | Strong |
|------|--------|
| Utilize | Use |
| Implement | Set up |
| Leverage | Use |
| Facilitate | Help |
| Innovative | New |
| Robust | Strong |
| Seamless | Smooth |
| Cutting-edge | New/Modern |

**Watch for:**
- Adverbs (usually unnecessary)
- Passive voice (switch to active)
- Nominalizations (verb → noun: "make a decision" → "decide")

### Sentence-Level Checks

- One idea per sentence
- Vary sentence length (mix short and long)
- Front-load important information
- Max 3 conjunctions per sentence
- No more than 25 words (usually)

### Paragraph-Level Checks

- One topic per paragraph
- Short paragraphs (2-4 sentences for web)
- Strong opening sentences
- Logical flow between paragraphs
- White space for scannability

---

## Copy Editing Checklist

For a final QA pass before delivering edits, work through the full checklist in [references/checklist.md](references/checklist.md) — covering all seven sweeps plus pre-start and final-check items.

---

## Common Copy Problems & Fixes

### Problem: Wall of Features
**Symptom:** List of what the product does without why it matters
**Fix:** Add "which means..." after each feature to bridge to benefits

### Problem: Corporate Speak
**Symptom:** "Leverage synergies to optimize outcomes"
**Fix:** Ask "How would a human say this?" and use those words

### Problem: Weak Opening
**Symptom:** Starting with company history or vague statements
**Fix:** Lead with the reader's problem or desired outcome

### Problem: Buried CTA
**Symptom:** The ask comes after too much buildup, or isn't clear
**Fix:** Make the CTA obvious, early, and repeated

### Problem: No Proof
**Symptom:** "Customers love us" with no evidence
**Fix:** Add specific testimonials, numbers, or case references

### Problem: Generic Claims
**Symptom:** "We help businesses grow"
**Fix:** Specify who, how, and by how much

### Problem: Mixed Audiences
**Symptom:** Copy tries to speak to everyone, resonates with no one
**Fix:** Pick one audience and write directly to them

### Problem: Feature Overload
**Symptom:** Listing every capability, overwhelming the reader
**Fix:** Focus on 3-5 key benefits that matter most to the audience

---

## Working with Copy Sweeps

When editing collaboratively:

1. **Run a sweep and present findings** - Show what you found, why it's an issue
2. **Recommend specific edits** - Don't just identify problems; propose solutions
3. **Request the updated copy** - Let the author make final decisions
4. **Verify previous sweeps** - After each round of edits, re-check earlier sweeps
5. **Repeat until clean** - Continue until a full sweep finds no new issues

This iterative process ensures each edit doesn't create new problems while respecting the author's ownership of the copy.

---

## References

- [Plain English Alternatives](references/plain-english-alternatives.md): Replace complex words with simpler alternatives
- [Content Refresh](references/content-refresh.md): Full checklist, refresh vs. rewrite matrix, and cadence guide
- [Copy Editing Checklist](references/checklist.md): Full QA checklist across all seven sweeps

---

## Content Refresh Editing

Copy editing isn't just for new content. Existing pages decay over time — outdated stats, stale examples, and drifted brand voice. Use the content refresh framework when traffic is declining, data is stale, or the product has changed.

**For the full refresh checklist, refresh vs. rewrite decision matrix, and cadence guide**: See [references/content-refresh.md](references/content-refresh.md)

---

## Task-Specific Questions

1. What's the goal of this copy? (Awareness, conversion, retention)
2. What action should readers take?
3. Are there specific concerns or known issues?
4. What proof/evidence do you have available?
5. Is this new copy or a refresh of existing content?

---

## Related Skills

- **copywriting**: For writing new copy from scratch (use this skill to edit after your first draft is complete)
- **cro**: For broader page optimization beyond copy
- **marketing-psychology**: For understanding why certain edits improve conversion
- **ab-testing**: For testing copy variations

---

## When to Use Each Skill

| Task | Skill to Use |
|------|--------------|
| Writing new page copy from scratch | copywriting |
| Reviewing and improving existing copy | copy-editing (this skill) |
| Editing copy you just wrote | copy-editing (this skill) |
| Structural or strategic page changes | cro |`,
  whenToUse: "- Always for launch copy, pricing pages, and high-traffic landing pages - Recommended for email sequences, sales pages, and ad copy - Optional for blog posts, social content, and internal docs - Skip for quick updates, minor edits, and low-stakes content ---",
  price: "Free",
  priceUsdc: 0,
  category: "skill",
  tags: ["coreyhaines31-skills","copy-editing"],
  stars: 509,
  weeklyInstalls: 165,
  totalPurchases: 398,
  featured: false,
  createdAt: '2026-06-04',
  creatorWallet: '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
  fileUrl: 'https://github.com/coreyhaines31/marketingskills/tree/main/skills/copy-editing',
  useCases: ["Check for product marketing context first:.","Don't change the core message; focus on enhancing it.","Multiple focused passes beat one unfocused review."],
  exampleUsage: "Improve copy editing for my project",
  overviewHtml: `<div class="skill-enrichment" style="display: flex; flex-direction: column; gap: 32px;">
      <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 196, 129, 0.14); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);">
        <div style="width: 100%; aspect-ratio: 16/6; background: linear-gradient(135deg, #13110f 0%, #17181c 100%); display: flex; align-items: center; justify-content: center; color: var(--color-accent-warm-light);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 30%, #0a0806 95%);"></div>
        <div style="position: absolute; bottom: 20px; left: 24px; right: 24px;">
          <h2 style="font-family: var(--font-display); color: var(--color-accent-warm-light); margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 0.02em;">Copy editing</h2>
          <p style="margin: 6px 0 0; color: var(--color-text-secondary); font-size: 14px; max-width: 600px;">When the user wants to edit, review, or improve existing marketing copy, or refresh outdated content.</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1.2fr 1.0fr; gap: 32px; align-items: start;">
        <div>
          <h3 style="color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;">SKILL CAPABILITIES</h3>
          <p style="margin-bottom: 24px; font-size: 13.5px; line-height: 1.65; color: var(--color-text-secondary);">When the user wants to edit, review, or improve existing marketing copy, or refresh outdated content. Also use when the user mentions 'edit this copy,' 'review my copy,' 'copy feedback,' 'proofread,' 'polish this,' 'make this better,' 'copy sweep,' 'tighten this up,' 'this reads awkwardly,' 'clean up this text,' 'too wordy,' 'sharpen the messaging,' 'refresh this content,' 'update this page,' 'this content is outdated,' or 'content audit.' Use this when the user already has copy and wants it improved or refreshed rather than rewritten from scratch. For writing new copy, see copywriting.</p>
          
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
