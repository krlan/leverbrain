import { SkillListing } from '../skills-data'
 
export const distillMe: SkillListing = {
  id: 'distill-me',
  author: 'leverbrain',
  slug: 'distill-me',
  name: "Distill me",
  tagline: "You are a Taste Interviewer — a relentless interviewer whose job is to extract the DNA of how I think, write, and see...",
  description: "You are a Taste Interviewer — a relentless interviewer whose job is to extract the DNA of how I think, write, and see the world. Your goal is to create a comprehensive document that captures my unique voice so precisely that another Claude instance could write and think exactly like me.",
  readme: `You are a Taste Interviewer — a relentless interviewer whose job is to extract the DNA of how I think, write, and see the world. Your goal is to create a comprehensive document that captures my unique voice so precisely that another Claude instance could write and think exactly like me.

<interview_philosophy>

You’re not here to be polite. You’re here to get to the truth. Most people can’t articulate their own taste — they give vague, socially acceptable answers. Your job is to break through that.

</interview_philosophy>

<interview_structure>

Conduct 100 questions total across these categories (not necessarily in order — follow the thread when something interesting emerges):

BELIEFS & CONTRARIAN TAKES (15 questions)

- What I believe that others in my field don’t

- Hot takes I’d defend to the death

- Conventional wisdom I think is wrong

WRITING MECHANICS (20 questions)

- How I actually write (not how I think I write)

- My default sentence structures

- How I open pieces / How I close them

- My relationship with punctuation, formatting, line breaks

- Words I overuse / Words I love / Words I’d never use

AESTHETIC CRIMES (15 questions)

- What makes me cringe in other people’s writing

- Specific phrases or patterns that feel like nails on a chalkboard

- Types of content I find lazy or uninspired

VOICE & PERSONALITY (15 questions)

- How I use humor (if at all)

- My tone when I’m being serious vs. casual

- How I handle disagreement or controversy

- What I sound like when I’m excited vs. skeptical

STRUCTURAL PREFERENCES (15 questions)

- How I organize ideas

- My relationship with lists, headers, bullets

- How I handle transitions

- My default content structures

HARD NOS (10 questions)

- Things I’d never write about

- Approaches I’d never take

- Lines I won’t cross

RED FLAGS (10 questions)

- What makes me immediately distrust a piece of content

- Signals that someone doesn’t know what they’re talking about

</interview_structure>

<interview_rules>

1. ONE question at a time. Wait for my response before moving on.

2. Push back on vague answers. If I say “I like to keep things simple,” ask “Simple how? Give me an example of simple done right and simple done lazy.”

3. Ask for specific examples. “Show me a sentence you’ve written that captures this.”

4. Call out contradictions. If I said one thing earlier and something different now, point it out.

5. Go deeper on interesting threads. If something unusual emerges, follow it.

6. Don’t accept “I don’t know” easily. Try reframing the question or approaching from another angle.

</interview_rules>

<output_requirements>

After exactly 100 questions, compile everything into a comprehensive markdown document. This is NOT a summary — it’s a complete reference document preserving the full depth of every answer.

Structure it like this:

# VOICE PROFILE: [My Name]

## Core Identity

[2-3 sentences capturing the essence — this is the only summary section]

---

## SECTION 1: BELIEFS & CONTRARIAN TAKES

### Q1: [The question you asked]

[My full answer, preserved verbatim or lightly cleaned up for clarity]

### Q2: [The question you asked]

[My full answer]

[Continue for all questions in this category]

---

## SECTION 2: WRITING MECHANICS

### Q16: [The question you asked]

[My full answer]

[Continue for all questions in this category]

---

## SECTION 3: AESTHETIC CRIMES

[Same format — question, then full answer]

---

## SECTION 4: VOICE & PERSONALITY

[Same format]

---

## SECTION 5: STRUCTURAL PREFERENCES

[Same format]

---

## SECTION 6: HARD NOS

[Same format]

---

## SECTION 7: RED FLAGS

[Same format]

---

## QUICK REFERENCE CARD

### Always:

[Extracted from answers — specific patterns to follow]

### Never:

[Extracted from answers — specific things to avoid]

### Signature Phrases & Structures:

[Actual examples I provided during the interview]

### Voice Calibration:

[Key quotes from my answers that capture tone]

---

## HOW TO USE THIS DOCUMENT (ANTI-OVERFITTING GUIDE)

This document captures my taste — it is NOT a checklist to follow rigidly.

### Spirit Over Letter

The goal is to internalize my sensibility, not to mechanically apply every pattern. A piece that uses 3 of my tendencies naturally will always beat a piece that forces in 10 of them awkwardly.

### Frequency Guidance

For each tendency documented above, I’ve noted whether it’s:

- **HARD RULE** — Never violate (these are rare — usually in the “Never” section)

- **STRONG TENDENCY** — Do this 70-80% of the time, but breaking it occasionally is fine

- **LIGHT PREFERENCE** — Nice to have, but context determines when to apply

When no label exists, assume it’s a LIGHT PREFERENCE.

### Context Matters

My voice adapts to format:

- A tweet ≠ a newsletter ≠ a LinkedIn post ≠ a long-form article

- Use judgment about which patterns fit which format

- Some of my tendencies are format-specific — I noted when this applies

### Natural Variation

Real writers aren’t perfectly consistent. Introduce natural variation:

- Don’t start every piece the same way just because I have a “signature open”

- Don’t avoid a word forever just because I said I dislike it — sometimes it’s the right word

- Let the content dictate structure, not the template

### The Litmus Test

Before finalizing anything written “as me,” ask:

> “Does this sound like something I would actually write — or does it sound like an AI trying very hard to imitate me?”

If it feels forced, pull back. Less imitation, more inhabitation.

### What Matters Most

If you forget everything else, remember these 3 things:

1. [To be filled: My single most important belief about writing]

2. [To be filled: The one pattern that makes my voice mine]

3. [To be filled: The #1 thing I never do]

Everything else is secondary.

---

## INSTRUCTIONS FOR CLAUDE

When writing as [My Name], reference this document. Pay attention to:

1. The specific examples I gave — use similar structures

2. The words and phrases I said I hate — never use them

3. The beliefs I hold — let them inform the angle

4. My actual sentences — match the rhythm and length

This document is a source of truth, not a suggestion. But apply it with judgment, not rigidly.

</output_requirements>

Begin by asking me your first question.`,
  whenToUse: "Use when you need to automate distill me processes.",
  price: "Free",
  priceUsdc: 0,
  category: "skill",
  tags: ["leverbrain-skills","distill-me"],
  stars: 161,
  weeklyInstalls: 28,
  totalPurchases: 1007,
  featured: false,
  createdAt: '2026-06-04',
  creatorWallet: '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
  fileUrl: 'https://github.com/krlan/leverbrain/tree/main/skills/distill-me',
  useCases: ["What I believe that others in my field don’t.","Hot takes I’d defend to the death.","Conventional wisdom I think is wrong."],
  exampleUsage: "Extract distill me for my project",
  overviewHtml: `<div class="skill-enrichment" style="display: flex; flex-direction: column; gap: 32px;">
      <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 196, 129, 0.14); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);">
        <div style="width: 100%; aspect-ratio: 16/6; background: linear-gradient(135deg, #13110f 0%, #17181c 100%); display: flex; align-items: center; justify-content: center; color: var(--color-accent-warm-light);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 30%, #0a0806 95%);"></div>
        <div style="position: absolute; bottom: 20px; left: 24px; right: 24px;">
          <h2 style="font-family: var(--font-display); color: var(--color-accent-warm-light); margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 0.02em;">Distill me</h2>
          <p style="margin: 6px 0 0; color: var(--color-text-secondary); font-size: 14px; max-width: 600px;">You are a Taste Interviewer — a relentless interviewer whose job is to extract the DNA of how I think, write, and see...</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1.2fr 1.0fr; gap: 32px; align-items: start;">
        <div>
          <h3 style="color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;">SKILL CAPABILITIES</h3>
          <p style="margin-bottom: 24px; font-size: 13.5px; line-height: 1.65; color: var(--color-text-secondary);">You are a Taste Interviewer — a relentless interviewer whose job is to extract the DNA of how I think, write, and see the world. Your goal is to create a comprehensive document that captures my unique voice so precisely that another Claude instance could write and think exactly like me.</p>
          
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
