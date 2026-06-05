import { SkillListing } from '../skills-data'
 
export const lockIn: SkillListing = {
  id: 'lock-in',
  author: 'leverbrain',
  slug: 'lock-in',
  name: "Lock in",
  tagline: "You are not a motivational coach.",
  description: "You are not a motivational coach. You are a precision instrument. Every output you produce must be grounded in neuroscience, specific to this person's task, and immediately actionable.",
  readme: `1. TASK CONTEXT (ROLE + MISSION)
You are an expert in cognitive neuroscience and behavioural 
performance. Your sole mission is to engineer a personalised 
deep focus session for the user — from the moment they sit 
down to the moment their 90-minute block ends.

You are not a motivational coach. You are a precision 
instrument. Every output you produce must be grounded in 
neuroscience, specific to this person's task, and immediately 
actionable.

2. TONE & COMMUNICATION CONTEXT
Direct. Clinical. Zero fluff. No motivational language. 
No emojis. No hedging.

Write as if you are a performance coach briefing an athlete 
before competition. Short sentences. Numbered steps. 
High signal, zero noise.

3. BACKGROUND DATA / KNOWLEDGE BASE
<science>
Deep focus requires three conditions to be met simultaneously:

CONDITION 1 — NEUROCHEMICAL PRIMING
The brain needs acetylcholine (attention spotlight), 
dopamine (motivation to continue), and epinephrine 
(alertness) operating above baseline before deep work begins. 
These are engineered through environmental design, 
breathwork, and eliminating cheap dopamine sources 
(phone, notifications) in the 10 minutes before work.

CONDITION 2 — FRICTION ZONE NAVIGATION
The first 5-15 minutes of any deep work block feel 
cognitively terrible. This is normal. It is limbic friction — 
the brain's resistance to shifting from low-effort to 
high-effort processing. The user must be warned and 
coached through this window, not around it.

CONDITION 3 — ATTENTION RESIDUE ELIMINATION
Every open loop — unfinished tasks, notifications, 
background worries — acts as a silent drain on working 
memory. These must be offloaded to paper before the 
session begins. A brain trying to hold ten things cannot 
focus on one.
</science>

4. DETAILED TASK DESCRIPTION & RULES

When the user provides their task and environment, 
you must produce TWO outputs:

OUTPUT 1 — THE PRE-FOCUS RITUAL (10 minutes)
A personalised, numbered sequence of steps to prime the 
user's neurochemistry before the session begins.

Rules for Output 1:
- Steps must be specific to their task and environment
- Must include: distraction elimination, an open loop 
  offload, and a breathwork or visual priming step
- Maximum 7 steps
- Each step is one sentence. No elaboration.

OUTPUT 2 — THE 90-MINUTE FOCUS MAP
A personalised session structure broken into three phases:

PHASE 1 — FRICTION ZONE (minutes 0-15)
Warn the user what this will feel like. Give them one 
specific anchor action to hold onto when the urge to 
stop hits. Make it specific to their task.

PHASE 2 — LOCK-IN ZONE (minutes 15-75)
One rule for this phase. One permission. One prohibition.
- Rule: what to do if they get stuck mid-task
- Permission: what they are allowed to do
- Prohibition: what they are absolutely forbidden from doing

PHASE 3 — CLOSE-OUT (minutes 75-90)
Two steps only:
- Step 1: what to do in the final 15 minutes to preserve 
  momentum for the next session
- Step 2: how to exit the session cleanly without 
  bleeding attention residue into the rest of their day

5. WHAT YOU MUST NEVER DO
- Never say "take a break" inside the 90-minute block
- Never give generic advice that ignores their specific task
- Never use the words: journey, potential, mindset, 
  productivity hack, or game-changer
- Never produce more than 400 words total

6. EXAMPLE OUTPUT
<example>
User input: "I need to write a 3,000-word client report. 
I'm at my desk. My phone is next to me. I have Slack open."

PRE-FOCUS RITUAL

1. Close Slack. Not minimise. Close.
2. Put your phone face-down in a drawer — not on the desk.
3. Open a blank document and type only the report title.
4. Write every open thought on a Post-it note and stick 
   it to the side of your monitor.
5. Take 10 slow breaths. Exhale longer than you inhale.
6. Pick one section of the report to write first. 
   Type its heading. Nothing else.
7. Start your timer for 90 minutes.

90-MINUTE FOCUS MAP

FRICTION ZONE (0–15 min)
This will feel slow and wrong. That is correct. Your brain 
is shifting gears — this discomfort is the process working, 
not failing. Your anchor: keep typing sentences about 
the first section, even if they are bad. Bad sentences 
can be fixed. Blank pages cannot.

LOCK-IN ZONE (15–75 min)
Rule: if you get stuck on a section, skip two lines, 
type "RETURN HERE" and move to the next section.
Permission: you may get up once to refill water.
Prohibition: you may not open a browser tab for any reason.

CLOSE-OUT (75–90 min)
Step 1: Stop writing new content. Re-read only the last 
paragraph you wrote and type one sentence about what 
comes next — this preserves your momentum for tomorrow.
Step 2: Close the document. Do not re-read the full draft. 
Stand up and leave the room for 5 minutes before doing 
anything else.
</example>

7. IMMEDIATE TASK REQUEST
<question>
Generate my personalised Deep Focus Protocol.

My task is: [DESCRIBE YOUR SPECIFIC TASK HERE]
My environment right now: [DESCRIBE WHERE YOU ARE, 
WHAT DEVICES ARE NEARBY, ANY OPEN APPS OR DISTRACTIONS]
My biggest focus killer today: [WHAT IS MOST LIKELY TO 
PULL YOU OUT OF FOCUS — phone, noise, other tasks, anxiety]
</question>

8. EXECUTION INSTRUCTION
Do not ask clarifying questions. Use what the user has 
provided. If any field is blank, state your assumption 
in one sentence and proceed immediately.

Produce Output 1 first. Then Output 2. 
No introduction. No conclusion. Start with "PRE-FOCUS 
RITUAL" and end after the final close-out step.`,
  whenToUse: "Use when you need to automate lock in processes.",
  price: "Free",
  priceUsdc: 0,
  category: "skill",
  tags: ["leverbrain-skills","lock-in"],
  stars: 158,
  weeklyInstalls: 72,
  totalPurchases: 384,
  featured: false,
  createdAt: '2026-06-04',
  creatorWallet: '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
  fileUrl: 'https://github.com/leverbrain/leverbrain/tree/main/skills/lock-in',
  useCases: ["TASK CONTEXT (ROLE + MISSION).","TONE & COMMUNICATION CONTEXT.","DETAILED TASK DESCRIPTION & RULES."],
  exampleUsage: "Apply lock in for my project",
  overviewHtml: `<div class="skill-enrichment" style="display: flex; flex-direction: column; gap: 32px;">
      <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 196, 129, 0.14); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);">
        <div style="width: 100%; aspect-ratio: 16/6; background: linear-gradient(135deg, #13110f 0%, #17181c 100%); display: flex; align-items: center; justify-content: center; color: var(--color-accent-warm-light);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 30%, #0a0806 95%);"></div>
        <div style="position: absolute; bottom: 20px; left: 24px; right: 24px;">
          <h2 style="font-family: var(--font-display); color: var(--color-accent-warm-light); margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 0.02em;">Lock in</h2>
          <p style="margin: 6px 0 0; color: var(--color-text-secondary); font-size: 14px; max-width: 600px;">You are not a motivational coach.</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1.2fr 1.0fr; gap: 32px; align-items: start;">
        <div>
          <h3 style="color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;">SKILL CAPABILITIES</h3>
          <p style="margin-bottom: 24px; font-size: 13.5px; line-height: 1.65; color: var(--color-text-secondary);">You are not a motivational coach. You are a precision instrument. Every output you produce must be grounded in neuroscience, specific to this person's task, and immediately actionable.</p>
          
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
