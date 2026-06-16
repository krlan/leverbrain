import { SkillListing } from '../skills-data'
 
export const beautifulHtmlTemplates: SkillListing = {
  id: 'beautiful-html-templates',
  author: 'zarazhangrui',
  slug: 'beautiful-html-templates',
  name: "Beautiful HTML templates",
  tagline: "You are an agent working with the beautiful-html-templates library.",
  description: "You are an agent working with the beautiful-html-templates library. Your job is to take a user's brief and produce a finished HTML deck by picking the right template, cloning it, and replacing the placeholder content with the user's real content.",
  readme: `# Agent Instructions

You are an agent working with the **beautiful-html-templates** library. Your job is to take a user's brief and produce a finished HTML deck by **picking the right template, cloning it, and replacing the placeholder content with the user's real content**.

This document is your operating manual. Read it once at the start of any deck-building task.

---

## 1. The full workflow

For every deck-building request, follow this exact sequence. Do **not** skip the clarifying step or the preview step.

### Step 1 — Ask the user about occasion and mood

Before reading any files, ask the user:

> "Two quick questions before I pick a template:
> 1. **What's the occasion?** (e.g. founder pitch, research synthesis, brand manifesto, classroom kickoff, etc.)
> 2. **What mood / vibe do you want?** (e.g. confident & punchy, quiet & literary, warm & playful, dark & moody, etc.)"

Wait for the user's answer. Do not pick yet. Even if the brief seems obvious, ask — the user's *taste* often surprises in ways no inferred brief can capture.

### Step 2 — Read \`index.json\` and pick 3 candidates

Read \`index.json\` at the repo root. Match the user's stated occasion + mood against each template's \`mood\`, \`tone\`, \`best_for\`, and \`formality\`. **Pick three templates** whose tones genuinely fit. The three should be *different enough from each other* that the user has a real choice — e.g. don't pick three editorial templates if the brief is editorial; pick one editorial, one warmer alternative, and one wildcard that re-interprets the brief.

### Step 3 — Build a title-slide preview of each candidate

For each of the 3 candidates:

1. Read the template's \`template.html\` to learn its visual system.
2. Take the **first slide only** (the cover / title slide of that template).
3. Replace the placeholder content with **the user's actual deck topic / title / subtitle / author / date** — i.e., make this preview real, not generic.
4. Save the preview as a standalone HTML file in a temp folder, e.g. \`previews/01-<slug>.html\`. Keep all sibling assets (\`styles.css\`, \`deck-stage.js\`, etc.) the template needs so the preview opens correctly.

These three preview files should be self-contained — opening any of them shows that template's title slide, populated with the user's real content.

### Step 4 — Open all 3 previews in the browser, send paths to user

Open each of the 3 preview files in the browser using \`open <path>\` (macOS). Then send the user a message like:

> "Three options to compare:
>
> 1. **<Template A>** — <one-line tone description>
>    \`/path/to/previews/01-template-a.html\`
> 2. **<Template B>** — <one-line tone description>
>    \`/path/to/previews/02-template-b.html\`
> 3. **<Template C>** — <one-line tone description>
>    \`/path/to/previews/03-template-c.html\`
>
> Which one feels right?"

Wait for the user to pick.

### Step 5 — Build the full deck in the chosen template

Once the user picks:

1. Clone the chosen template's full folder into the user's project workspace.
2. Adapt every slide per the rules in §3 (preserve / replace / extend).
3. If the user's deck needs more slides than the template's demo holds, duplicate existing layouts to fit; if it needs fewer, drop slides from the bottom. Update page-number labels.
4. **If a slide needs a layout the template doesn't have, design it from scratch using the template's design system** — same fonts, same color palette, same decorative vocabulary, same spacing rhythm, same component grammar. Do not bail back to the user; do not pick a different template; do not import a new visual language. The new slide should look like a natural extension of the template, not a graft. (See §5 — designing missing layouts.)

### Step 6 — Open the final deck in the browser, send the file path

Open the finished deck with \`open <path>\`. Send the user a message like:

> "Done. Your deck is at \`/path/to/deck/template.html\` — opened it in your browser.
>
> [One line about what you did and any caveats.]"

This applies to **every artifact you produce** — preview files, intermediate iterations, final deck. Always open it, always send the path.

---

## 2. What's in \`index.json\`

\`\`\`jsonc
{
  "schema_version": 1,
  "template_count": 28,
  "templates": [
    {
      "slug": "neo-grid-bold",
      "name": "Neo-Grid Bold",
      "tagline": "Editorial neo-brutalism with a single neon yellow accent on off-white paper.",
      "mood": ["confident", "punchy", "editorial", "modern"],
      "occasion": ["product launch", "design review", "founder pitch", ...],
      "tone": ["bold", "minimal", "design-led", "graphic"],
      "formality": "medium",
      "density": "high",
      "scheme": "light",
      "best_for": "Anything that should feel confident and editorial-graphic ...",
      "avoid_for": "Contexts that need to feel quiet, traditional, or warm ...",
      "slide_count": 12
    },
    ...
  ]
}
\`\`\`

Field definitions:

| field | how to use it |
|---|---|
| \`mood\` | emotional adjectives. Match against the user's *feeling* keywords. |
| \`occasion\` | example use cases. Useful as soft signal, not a hard filter. |
| \`tone\` | voice / personality. Match against descriptors like "playful", "serious", "literary". |
| \`formality\` | \`low\` / \`medium-low\` / \`medium\` / \`medium-high\` / \`high\`. Sanity-check against the user's audience. |
| \`density\` | how much content per slide the template can hold. Match against the user's content volume. |
| \`scheme\` | \`light\` / \`dark\` / \`mixed\`. Hard signal if the user explicitly wants light or dark. |
| \`best_for\` | the **feeling** + example contexts. Lead with this when narrating your pick. |
| \`avoid_for\` | tone *clashes* — soft warning, not a veto. |
| \`slide_count\` | size of the demo deck. Hint for how many layouts the template demonstrates. |

You only need a deeper read of a template's actual HTML/CSS once you've shortlisted it.

---

## 3. How to adapt a chosen template

Once you've cloned the template's folder into the user's workspace, follow these rules.

### Always preserve (these ARE the design system)

- **Fonts.** Whatever the template imports from Google Fonts or declares in \`font-family\` — keep it. Never substitute.
- **Color palette.** All \`:root\` CSS variables and color values. Never recolor.
- **Layout grid.** The grid columns, the absolute positioning, the flex hierarchies. Don't restructure.
- **Slide-level CSS classes** (e.g. \`.s-toc\`, \`.slide--quote\`, \`.layout-cover\`). These carry the visual identity.
- **Decorative elements** — corner brackets, paper grain, geometric shapes, illustrated SVGs, hand-drawn doodles. They are part of the system, not optional ornament.
- **The navigation runtime** — whether it's \`deck-stage.js\`, an inline keyboard handler, scroll-snap, or nothing. Whatever the template uses, keep using.

### Always replace (this is the user's content)

- **Headlines** — \`<h1>\`, \`<h2>\`, \`<h3>\`, etc.
- **Body copy** — \`<p>\`, list items, captions.
- **Numbers and stats** — placeholder values like \`47%\`, \`2.4M\`, \`+142%\`.
- **Names, dates, attributions** — author names, citation lines, "May 2026" placeholders.
- **Section labels and chrome text** — the \`[Topic]\`, \`[Year]\`, \`[Studio]\`, etc. tokens that templates use as authored placeholders.
- **Image placeholders** — replace \`<div class="img-placeholder">Image Placeholder</div>\` or \`<img src="placeholder.jpg">\` with the user's real image, **at the same dimensions**.

### Adding more slides (existing layout)

If the user has more content than the template's demo deck holds, duplicate an existing slide of the most appropriate layout and replace its content. Update page-number labels (\`NN / TT\`).

### Removing slides

Drop slides from the bottom if the user doesn't need them. Update page-number labels.

---

## 4. Tone-first matching

Templates have **tones**, not industries. The \`best_for\` and \`avoid_for\` fields describe how a template *feels*, not what industry it belongs to.

This means: **a confident editorial deck can carry a tech talk** if the user wants to feel design-led. **A playful pastel deck can carry a finance review** if the user is intentionally rejecting the formal-finance look. The user's taste wins.

When matching:

- **Lead with \`mood\` + \`tone\` + \`best_for\`.** Match the *feeling* the user wants.
- **Treat \`avoid_for\` as a soft warning, not a hard rule.** If the user has explicitly asked for the look that a template's \`avoid_for\` flags against, the user wins.
- **Use \`formality\` and \`density\` to sanity-check** — a low-formality template for a senior board presentation is probably the wrong call regardless of tone overlap, and you should flag that to the user.
- **Don't over-fit on \`occasion\`.** That field is example contexts, not the canon list.
- **In Step 1, ask about *tone*, not *industry*.** Good question: "Should this feel polished and authoritative, or warm and design-led?" Bad question: "Is this for finance or tech?"

---

## 5. Designing missing layouts (extending a template)

Some user briefs require a slide layout the chosen template doesn't include — e.g., a comparison table when the template only has process-flow and stat-grid layouts. In that case **design the missing slide using the template's existing design system**. Do not bail. Do not pick a different template. Do not import a new visual language.

The rules:

- **Same fonts.** Use the same \`font-family\` declarations the template uses for h1 / h2 / body / mono. Same weights, same letter-spacing, same line-heights.
- **Same color palette.** Use the existing \`:root\` CSS variables. If the new layout needs a "warning" or "highlight" color and one isn't in the palette, pick the closest existing accent rather than introducing a new hex.
- **Same decorative vocabulary.** If the template uses corner brackets, paper grain overlays, hand-drawn doodles, geometric shapes, etc. — your new slide should use the same vocabulary. A bare slide with no decoration in a template full of ornament will look broken.
- **Same spacing rhythm.** If the template uses \`padding: 64px\` on its slides, your new slide does too. If it uses an 8-column grid with 24px gutter, so do you.
- **Same component grammar.** If the template's stat cards use a specific structure (large number → label → description → mono caption), reuse that structure for new stat-like elements rather than inventing a different one.
- **Same chrome.** Top label / bottom page-number / corner mark — match whatever the rest of the deck shows.
- **Same navigation behavior.** A new slide must integrate with the template's existing nav (deck-stage / inline keyboard / scroll-snap). Add it as a sibling section / div in the same way existing slides are structured.

A good test: open your new slide between two existing slides in the deck. If it visibly *belongs* — same fonts, same colors, same decorations, same rhythm — you've succeeded. If it looks like a different template grafted on, you've failed; redo it.

---

## 6. Common pitfalls

- **Don't skip Step 1.** Even if the brief is detailed, ask about occasion and mood explicitly. The user's stated *taste* almost always reveals something the brief alone didn't.
- **Don't skip the previews in Step 4.** A title slide is the fastest, cheapest way for the user to feel which template is right. Don't talk them through tradeoffs in prose; show them.
- **Don't substitute fonts.** "Inter is similar enough" — no, the typography is the design system. If the original Cormorant Garamond doesn't load, fix the import, don't replace the family.
- **Don't recolor.** Even small accent shifts break the palette's harmony.
- **Don't combine layouts from different templates.** Each template is a closed visual system. Mixing slide A from raw-grid with slide B from neo-grid-bold will look amateur. (This is *different* from §5: extending one template is fine; mashing two templates is not.)
- **Don't strip "extra" decoration thinking it's noise.** Corner brackets, paper grain, SVG ornaments — they are part of the identity.
- **Don't try to "modernize" old templates** — they're working as designed. If a template feels dated, pick a different template, don't edit the existing one.
- **Don't forget to open the file in the browser.** Every preview, every iteration, every final deck. Use \`open <path>\`.

---

## 7. Output contract

After **every artifact** you produce — title-slide previews, intermediate iterations, the final deck — do both of these:

1. **Open the file in the browser.** Use \`open /absolute/path/to/file.html\`. Don't just announce it; actually open it.
2. **Send the user the absolute file path** in your message, on its own line, formatted as a path so it's clickable.

For the final deck, also include:
- A one-line note about which template you picked and why (the *tone match*).
- Any caveats (e.g., "I designed slides 4 and 7 from scratch using the template's design system since you needed a comparison table and a 4-column timeline that the demo deck didn't include").

Do not narrate every step you took. The user wants the artifact + the path + a one-line rationale, not a transcript.`,
  whenToUse: "Use when you need to automate beautiful html templates processes.",
  price: "Free",
  priceUsdc: 0,
  category: "skill",
  tags: ["zarazhangrui-skills","beautiful-html-templates"],
  stars: 335,
  weeklyInstalls: 64,
  totalPurchases: 333,
  featured: false,
  createdAt: '2026-06-16',
  creatorWallet: '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
  fileUrl: 'https://github.com/zarazhangrui/beautiful-html-templates',
  useCases: ["Fonts. Whatever the template imports from Google Fonts or declares in font-family — keep it. Never substitute.","Color palette. All :root CSS variables and color values. Never recolor.","Layout grid. The grid columns, the absolute positioning, the flex hierarchies. Don't restructure."],
  exampleUsage: "Apply beautiful HTML templates for my project",
  overviewHtml: `<div class="skill-enrichment" style="display: flex; flex-direction: column; gap: 32px;">
      <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 196, 129, 0.14); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);">
        <div style="width: 100%; aspect-ratio: 16/6; background: linear-gradient(135deg, #13110f 0%, #17181c 100%); display: flex; align-items: center; justify-content: center; color: var(--color-accent-warm-light);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 30%, #0a0806 95%);"></div>
        <div style="position: absolute; bottom: 20px; left: 24px; right: 24px;">
          <h2 style="font-family: var(--font-display); color: var(--color-accent-warm-light); margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 0.02em;">Beautiful HTML templates</h2>
          <p style="margin: 6px 0 0; color: var(--color-text-secondary); font-size: 14px; max-width: 600px;">You are an agent working with the beautiful-html-templates library.</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1.2fr 1.0fr; gap: 32px; align-items: start;">
        <div>
          <h3 style="color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;">SKILL CAPABILITIES</h3>
          <p style="margin-bottom: 24px; font-size: 13.5px; line-height: 1.65; color: var(--color-text-secondary);">You are an agent working with the beautiful-html-templates library. Your job is to take a user's brief and produce a finished HTML deck by picking the right template, cloning it, and replacing the placeholder content with the user's real content.</p>
          
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
