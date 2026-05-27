import { SkillListing } from '../skills-data'

export const caveman: SkillListing = {
  id: 'caveman',
  author: 'mattpocock',
  slug: 'caveman',
  name: "Caveman",
  tagline: "AI talk less. Brain hurt less. Ship faster.",
  description: "Turns your AI into a brutally terse caveman-mode responder. All technical substance stays intact. Articles, filler words, pleasantries, and hedging die. Triggers with a message, persists for the entire session, and auto-lifts only for safety-critical warnings. \"Sure! I'd be happy to help!\" begone forever.",
  readme: "Respond terse like smart caveman. All technical substance stay. Only fluff die.\n\n## Persistence\n\nACTIVE EVERY RESPONSE once triggered. No revert after many turns. No filler drift. Still active if unsure. Off only when user says \"stop caveman\" or \"normal mode\".\n\n## Rules\n\nDrop: articles (a/an/the), filler (just/really/basically/actually/simply), pleasantries (sure/certainly/of course/happy to), hedging. Fragments OK. Short synonyms (big not extensive, fix not \"implement a solution for\"). Abbreviate common terms (DB/auth/config/req/res/fn/impl). Strip conjunctions. Use arrows for causality (X -> Y). One word when one word enough.\n\nTechnical terms stay exact. Code blocks unchanged. Errors quoted exact.\n\nPattern: `[thing] [action] [reason]. [next step].`\n\nNot: \"Sure! I'd be happy to help you with that. The issue you're experiencing is likely caused by...\"\nYes: \"Bug in auth middleware. Token expiry check use `<` not `<=`. Fix:\"\n\n### Examples\n\n**\"Why React component re-render?\"**\n\n> Inline obj prop -> new ref -> re-render. `useMemo`.\n\n**\"Explain database connection pooling.\"**\n\n> Pool = reuse DB conn. Skip handshake -> fast under load.\n\n## Auto-Clarity Exception\n\nDrop caveman temporarily for: security warnings, irreversible action confirmations, multi-step sequences where fragment order risks misread, user asks to clarify or repeats question. Resume caveman after clear part done.\n\nExample -- destructive op:\n\n> **Warning:** This will permanently delete all rows in the `users` table and cannot be undone.\n>\n> ```sql\n> DROP TABLE users;\n> ```\n>\n> Caveman resume. Verify backup exist first.",
  whenToUse: "Use when verbose AI responses are slowing you down. Perfect for rapid debugging sessions, quick architecture questions, or any time you'd rather read \"Token expiry use < not <=. Fix:\" than a three-paragraph apology for your bug.",
  price: 'Free',
  priceUsdc: 0,
  category: 'skill',
  tags: ["mattpocock-skills", "productivity", "dx", "caveman", "terse", "debugging"],
  stars: 319,
  weeklyInstalls: 213,
  totalPurchases: 969,
  featured: false,
  createdAt: '2026-05-27',
  creatorWallet: '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
  fileUrl: 'https://github.com/mattpocock/skills/tree/main/skills/productivity/caveman',
  useCases: [
    "Kill the AI pleasantries. Get \"Token expiry < not <=. Fix:\" — not a paragraph of apology.",
    "Persist caveman mode for an entire session — no backsliding into verbose mode after a few turns.",
    "Auto-lift for destructive ops (DROP TABLE) so you still get proper warnings, then right back to grunts."
  ],
  exampleUsage: "Silence the AI pleasantries during my debug session",
  overviewHtml: `<div class="skill-enrichment" style="display: flex; flex-direction: column; gap: 32px;">
      <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 196, 129, 0.14); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);">
        <div style="width: 100%; aspect-ratio: 16/6; background: linear-gradient(135deg, #1a1007 0%, #0f0d08 100%); display: flex; align-items: center; justify-content: center; gap: 20px; padding: 0 24px;">
          <div style="font-size: 64px; line-height: 1;">🪨</div>
          <div style="font-family: var(--font-mono); color: var(--color-accent-warm-light);">
            <div style="font-size: 11px; opacity: 0.5; margin-bottom: 6px; letter-spacing: 0.1em;">BEFORE CAVEMAN</div>
            <div style="font-size: 12px; color: rgba(255,232,209,0.4); text-decoration: line-through;">"Sure! I'd be happy to help you with that! The issue you're experiencing is likely caused by..."</div>
            <div style="font-size: 11px; opacity: 0.5; margin: 10px 0 6px; letter-spacing: 0.1em;">AFTER CAVEMAN</div>
            <div style="font-size: 13px; color: var(--color-accent-warm-light);">Bug. Auth middleware. Token expiry: use &lt; not &lt;=. Fix:</div>
          </div>
        </div>
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 30%, #0a0806 95%);"></div>
        <div style="position: absolute; bottom: 20px; left: 24px; right: 24px;">
          <h2 style="font-family: var(--font-display); color: var(--color-accent-warm-light); margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 0.02em;">Caveman</h2>
          <p style="margin: 6px 0 0; color: var(--color-text-secondary); font-size: 14px; max-width: 600px;">AI talk less. Brain hurt less. Ship faster.</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1.2fr 1.0fr; gap: 32px; align-items: start;">
        <div>
          <h3 style="color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;">WHAT IT DOES</h3>
          <p style="margin-bottom: 24px; font-size: 13.5px; line-height: 1.65; color: var(--color-text-secondary);">Strips your AI of every filler word, pleasantry, article, hedge, and unnecessary conjunction. Technical precision stays 100% intact. Code blocks untouched. Error messages quoted exact. The AI becomes a brilliant, extremely rude colleague who respects your time.</p>
          
          <h3 style="color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;">WHAT GETS DROPPED</h3>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;">
  <span style="color: #e05252; font-weight: bold; margin-top: 2px;">✕</span>
  <span>Pleasantries — "Sure! Certainly! Happy to help! Of course!"</span>
</li>
<li style="margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;">
  <span style="color: #e05252; font-weight: bold; margin-top: 2px;">✕</span>
  <span>Filler — just, really, basically, actually, simply</span>
</li>
<li style="margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;">
  <span style="color: #e05252; font-weight: bold; margin-top: 2px;">✕</span>
  <span>Hedging — "might", "could potentially", "it's worth noting that"</span>
</li>
<li style="margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;">
  <span style="color: var(--color-accent); font-weight: bold; margin-top: 2px;">✓</span>
  <span>Technical terms, code, error messages — kept exact</span>
</li>
          </ul>
        </div>
        
        <div style="background: rgba(255, 196, 129, 0.03); border: 1px solid rgba(255, 196, 129, 0.08); border-radius: 12px; padding: 24px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);">
          <h4 style="color: var(--color-accent-warm-light); margin-top: 0; margin-bottom: 16px; font-family: var(--font-display); font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;">CAVEMAN RULES</h4>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;">
              <div style="font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;">PERSISTS</div>
              <div style="font-size: 12px; color: var(--color-text-secondary);">Active every response once triggered. No drift back to verbose after a few turns.</div>
            </div>
            <div style="background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;">
              <div style="font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;">SMART EXCEPTIONS</div>
              <div style="font-size: 12px; color: var(--color-text-secondary);">Auto-lifts for destructive ops &amp; security warnings. Resumes caveman immediately after.</div>
            </div>
            <div style="background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;">
              <div style="font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;">OFF SWITCH</div>
              <div style="font-size: 12px; color: var(--color-text-secondary);">Say "stop caveman" or "normal mode" to return to civilised discourse.</div>
            </div>
          </div>
        </div>
      </div>
    </div>`,
  previewHtml: `<div style="background: #0a0806; border: 1px solid rgba(255, 196, 129, 0.16); border-radius: 12px; font-family: var(--font-mono); color: #ffe8d1; overflow: hidden; max-width: 100%; box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);">
      <div style="background: rgba(255, 196, 129, 0.06); border-bottom: 1px solid rgba(255, 196, 129, 0.1); padding: 12px 20px; font-size: 11px; font-weight: 700; display: flex; justify-content: space-between; align-items: center; letter-spacing: 0.08em;">
        <span>🪨 CAVEMAN MODE</span>
        <span style="color: #6ee4a0;">ACTIVE</span>
      </div>
      <div style="padding: 20px; display: flex; flex-direction: column; gap: 16px;">
        <div>
          <div style="font-size: 10px; color: rgba(255, 232, 209, 0.35); margin-bottom: 6px; letter-spacing: 0.08em;">YOU</div>
          <div style="font-size: 12px; color: rgba(255,232,209,0.7); background: rgba(0,0,0,0.2); border-radius: 6px; padding: 8px 12px; border: 1px solid rgba(255,196,129,0.06);">Why is my React component re-rendering constantly?</div>
        </div>
        <div>
          <div style="font-size: 10px; color: rgba(255, 232, 209, 0.35); margin-bottom: 6px; letter-spacing: 0.08em;">AI (CAVEMAN)</div>
          <div style="font-size: 12px; color: var(--color-accent-warm-light); background: rgba(255,196,129,0.04); border-radius: 6px; padding: 8px 12px; border: 1px solid rgba(255,196,129,0.1); line-height: 1.6;">Inline obj prop → new ref → re-render.<br><span style="opacity:0.6">Fix:</span> <code style="background: rgba(0,0,0,0.3); padding: 2px 5px; border-radius: 3px; font-size: 11px;">useMemo</code></div>
        </div>
      </div>
    </div>`
}
