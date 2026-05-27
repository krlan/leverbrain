import { SkillListing } from '../skills-data'

export const baoyuTranslate: SkillListing = {
  id: 'baoyu-translate',
  author: 'baoyu',
  slug: 'baoyu-translate',
  name: 'Translate',
  tagline: 'Translates articles and documents between languages with three modes - quick (direct), normal (analyze then translate...',
  description: 'Translates articles and documents between languages with three modes - quick (direct), normal (analyze then translate), and refined (analyze, translate, review, polish). Supports custom glossaries and terminology consistency via EXTEND.md. Use when user asks to "translate", "翻译", "精翻", "translate article", "translate to Chinese/English", "改成中文", "改成英文", "convert to Chinese", "localize", "本地化", or needs any document translation. Also triggers for "refined translation", "精细翻译", "proofread translation", "快速翻译", "快翻", "这篇文章翻译一下", or when a URL or file is provided with translation intent.',
  readme: `# Translator

Three-mode translation skill: **quick** for direct translation, **normal** for analysis-informed translation, **refined** for full publication-quality workflow with review and polish.

## User Input Tools

When this skill prompts the user, follow this tool-selection rule (priority order):

1. **Prefer built-in user-input tools** exposed by the current agent runtime — e.g., \`AskUserQuestion\`, \`request_user_input\`, \`clarify\`, \`ask_user\`, or any equivalent.
2. **Fallback**: if no such tool exists, emit a numbered plain-text message and ask the user to reply with the chosen number/answer for each question.
3. **Batching**: if the tool supports multiple questions per call, combine all applicable questions into a single call; if only single-question, ask them one at a time in priority order.

Concrete \`AskUserQuestion\` references below are examples — substitute the local equivalent in other runtimes.

## Script Directory

Scripts in \`scripts/\` subdirectory. \`{baseDir}\` = this SKILL.md's directory path. Resolve \`\${BUN_X}\` runtime: if \`bun\` installed → \`bun\`; if \`npx\` available → \`npx -y bun\`; else suggest installing bun. Replace \`{baseDir}\` and \`\${BUN_X}\` with actual values.

| Script | Purpose |
|--------|---------|
| \`scripts/main.ts\` | CLI entry point. Default action splits markdown into chunks; also supports explicit \`chunk\` subcommand |
| \`scripts/chunk.ts\` | Markdown chunking implementation used by \`main.ts\` and kept compatible for direct invocation |

## Preferences (EXTEND.md)

Check EXTEND.md in priority order — the first one found wins:

| Priority | Path | Scope |
|----------|------|-------|
| 1 | \`.baoyu-skills/baoyu-translate/EXTEND.md\` | Project |
| 2 | \`\${XDG_CONFIG_HOME:-$HOME/.config}/baoyu-skills/baoyu-translate/EXTEND.md\` | XDG |
| 3 | \`$HOME/.baoyu-skills/baoyu-translate/EXTEND.md\` | User home |

| Result | Action |
|--------|--------|
| Found | Read, parse, apply. On first use in session, briefly remind: "Using preferences from [path]. You can edit EXTEND.md to customize glossary, audience, etc." |
| Not found | **MUST** run first-time setup (see below) — do NOT silently use defaults |

**EXTEND.md supports**: default target language, default mode, target audience, custom glossaries (inline or file path), translation style, chunk settings.

Schema: [references/config/extend-schema.md](references/config/extend-schema.md).

### First-Time Setup (BLOCKING)

**CRITICAL**: When EXTEND.md is not found, you **MUST** run the first-time setup before ANY translation. This is a **BLOCKING** operation.

Full reference: [references/config/first-time-setup.md](references/config/first-time-setup.md)

Use \`AskUserQuestion\` with all questions (target language, mode, audience, style, save location) in ONE call. After user answers, create EXTEND.md at the chosen location, confirm "Preferences saved to [path]", then continue.

## Defaults

All configurable values in one place. EXTEND.md overrides these; CLI flags override EXTEND.md.

| Setting | Default | EXTEND.md key | CLI flag | Description |
|---------|---------|---------------|----------|-------------|
| Target language | \`zh-CN\` | \`target_language\` | \`--to\` | Translation target language |
| Mode | \`normal\` | \`default_mode\` | \`--mode\` | Translation mode |
| Audience | \`general\` | \`audience\` | \`--audience\` | Target reader profile |
| Style | \`storytelling\` | \`style\` | \`--style\` | Translation style preference |
| Chunk threshold | \`4000\` | \`chunk_threshold\` | — | Word count to trigger chunked translation |
| Chunk max words | \`5000\` | \`chunk_max_words\` | — | Max words per chunk |

## Modes

| Mode | Flag | Steps | When to Use |
|------|------|-------|-------------|
| Quick | \`--mode quick\` | Translate | Short texts, informal content, quick tasks |
| Normal | \`--mode normal\` (default) | Analyze → Translate | Articles, blog posts, general content |
| Refined | \`--mode refined\` | Analyze → Translate → Review → Polish | Publication-quality, important documents |

**Default mode**: Normal (can be overridden in EXTEND.md \`default_mode\` setting).

**Style presets** — control the voice and tone of the translation (independent of audience):

| Value | Description | Effect |
|-------|-------------|--------|
| \`storytelling\` | Engaging narrative flow (default) | Draws readers in, smooth transitions, vivid phrasing |
| \`formal\` | Professional, structured | Neutral tone, clear organization, no colloquialisms |
| \`technical\` | Precise, documentation-style | Concise, terminology-heavy, minimal embellishment |
| \`literal\` | Close to original structure | Minimal restructuring, preserves source sentence patterns |
| \`academic\` | Scholarly, rigorous | Formal register, complex clauses OK, citation-aware |
| \`business\` | Concise, results-focused | Action-oriented, executive-friendly, bullet-point mindset |
| \`humorous\` | Preserves and adapts humor | Witty, playful, recreates comedic effect in target language |
| \`conversational\` | Casual, spoken-like | Friendly, approachable, as if explaining to a friend |
| \`elegant\` | Literary, polished prose | Aesthetically refined, rhythmic, carefully crafted word choices |

Custom style descriptions are also accepted, e.g., \`--style "poetic and lyrical"\`.

**Auto-detection**:
- "快翻", "quick", "直接翻译" → quick mode
- "精翻", "refined", "publication quality", "proofread" → refined mode
- Otherwise → default mode (normal)

**Upgrade prompt**: After normal mode completes, display:
> Translation saved. To further review and polish, reply "继续润色" or "refine".

If user responds, continue with review → polish steps (same as refined mode Steps 4-6 in refined-workflow.md) on the existing output.

**Audience presets**:

| Value | Description | Effect |
|-------|-------------|--------|
| \`general\` | General readers (default) | Plain language, more translator's notes for jargon |
| \`technical\` | Developers / engineers | Less annotation on common tech terms |
| \`academic\` | Researchers / scholars | Formal register, precise terminology |
| \`business\` | Business professionals | Business-friendly tone, explain tech concepts |

Custom audience descriptions are also accepted, e.g., \`--audience "AI感兴趣的普通读者"\`.

## Workflow

### Step 1: Load Preferences

1.1 Check EXTEND.md (see Preferences section above)

1.2 Load built-in glossary for the language pair if available:
- EN→ZH: [references/glossary-en-zh.md](references/glossary-en-zh.md)

1.3 Merge glossaries: EXTEND.md \`glossary\` (inline) + EXTEND.md \`glossary_files\` (external files, paths relative to EXTEND.md location) + built-in glossary + \`--glossary\` file (CLI overrides all)

### Step 2: Materialize Source & Create Output Directory

Materialize source (file as-is, inline text/URL → save to \`translate/{slug}.md\`), then create output directory: \`{source-dir}/{source-basename}-{target-lang}/\`. Detect source language if \`--from\` not specified.

Full details: [references/workflow-mechanics.md](references/workflow-mechanics.md)

**Output directory contents** (all intermediate and final files go here):

| File | Mode | Description |
|------|------|-------------|
| \`translation.md\` | All | Final translation (always this name) |
| \`01-analysis.md\` | Normal, Refined | Content analysis (domain, tone, terminology) |
| \`02-prompt.md\` | Normal, Refined | Assembled translation prompt |
| \`03-draft.md\` | Refined | Initial draft before review |
| \`04-critique.md\` | Refined | Critical review findings (diagnosis only) |
| \`05-revision.md\` | Refined | Revised translation based on critique |
| \`chunks/\` | Chunked | Source chunks + translated chunks |

### Step 3: Assess Content Length

Quick mode does not chunk — translate directly regardless of length. Before translating, estimate word count. If content exceeds chunk threshold (default 4000 words), proactively warn: "This article is ~{N} words. Quick mode translates in one pass without chunking — for long content, \`--mode normal\` produces better results with terminology consistency." Then proceed if user doesn't switch.

For normal and refined modes:

| Content | Action |
|---------|--------|
| < chunk threshold | Translate as single unit |
| >= chunk threshold | Chunk translation (see Step 3.1) |

**3.1 Long Content Preparation** (normal/refined modes, >= chunk threshold only)

Before translating chunks:

1. **Extract terminology**: Scan entire document for proper nouns, technical terms, recurring phrases
2. **Build session glossary**: Merge extracted terms with loaded glossaries, establish consistent translations
3. **Split into chunks**: Use \`\${BUN_X} {baseDir}/scripts/main.ts <file> [--max-words <chunk_max_words>] [--output-dir <output-dir>]\`
   - Parses markdown blocks (headings, paragraphs, lists, code blocks, tables, etc.)
   - Splits at markdown block boundaries to preserve structure
   - If a single block exceeds the threshold, falls back to line splitting, then word splitting
4. **Assemble translation prompt**:
   - Main agent reads \`01-analysis.md\` (if exists) and assembles shared context using Part 1 of [references/subagent-prompt-template.md](references/subagent-prompt-template.md) — inlining: target style, content background, merged glossary, and translation challenges
   - Save as \`02-prompt.md\` in the output directory (shared context only, no task instructions)
5. **Draft translation via subagents** (if Agent tool available):
   - Spawn one subagent **per chunk**, all in parallel (Part 2 of the template)
   - Each subagent reads \`02-prompt.md\` for shared context, receives chunk position info (chunk N of M + brief context of where it sits in the argument), translates its chunk, saves to \`chunks/chunk-NN-draft.md\`
   - Consistency is guaranteed by the shared \`02-prompt.md\` (glossary, figurative language mapping, comprehension challenges, source voice, and translation challenges from analysis)
   - If no chunks (content under threshold): spawn one subagent for the entire source file
   - If Agent tool is unavailable, translate chunks sequentially inline using \`02-prompt.md\`
6. **Merge**: Once all subagents complete, combine translated chunks in order. If \`chunks/frontmatter.md\` exists, prepend it. Save as \`03-draft.md\` (refined) or \`translation.md\` (normal)
7. All intermediate files (source chunks + translated chunks) are preserved in \`chunks/\`

**After chunked draft is merged**, return control to main agent for critical review, revision, and polish (Step 4).

### Step 4: Translate & Refine

**Translation principles** (apply to all modes):

- **Rewrite, not translate**: Rewrite content into natural, engaging target language as if a skilled native writer composed it from scratch. Quality test: "Does this read like it was originally written in the target language?"
- **Accuracy first**: Facts, data, and logic must match the original exactly
- **Natural flow**: Use idiomatic target language word order. Break long source sentences into shorter, natural ones. Interpret metaphors and idioms by intended meaning, not word-for-word
- **Terminology**: Use standard translations consistently. First occurrence of specialized terms: annotate with original in parentheses
- **Preserve format**: Keep all markdown formatting (headings, bold, italic, images, links, code blocks)
- **Proactive interpretation**: For jargon or concepts the target audience may lack context for, add concise explanations in **bold parentheses** \`（**解释**）\`. Keep annotations few — only where genuinely needed for comprehension
- **Frontmatter**: If source has YAML frontmatter, rename source-metadata fields with \`source\` prefix (camelCase: \`url\`→\`sourceUrl\`, \`title\`→\`sourceTitle\`, etc.), add translated values as new top-level fields (skip \`title\` if body has H1), keep other fields as-is

#### Quick Mode

Translate directly → save to \`translation.md\`. Apply all translation principles above.

#### Normal Mode

1. **Analyze** → \`01-analysis.md\` (domain, tone, terminology, translation challenges)
2. **Assemble prompt** → \`02-prompt.md\` (translation instructions with context, glossary, challenges)
3. **Translate** (following \`02-prompt.md\`) → \`translation.md\`

After completion, prompt user: "Translation saved. To further review and polish, reply **继续润色** or **refine**."

If user continues, proceed with critical review → revision → polish (same as refined mode Steps 4-6 below), saving \`03-draft.md\` (rename current \`translation.md\`), \`04-critique.md\`, \`05-revision.md\`, and updated \`translation.md\`.

#### Refined Mode

Full workflow for publication quality. See [references/refined-workflow.md](references/refined-workflow.md) for detailed guidelines per step.

The subagent (if used in Step 3.1) only handles the initial draft. All subsequent steps (critical review, revision, polish) are handled by the main agent, which may delegate to subagents at its discretion.

Steps and saved files (all in output directory):
1. **Analyze** → \`01-analysis.md\` (domain, tone, terminology, translation challenges)
2. **Assemble prompt** → \`02-prompt.md\` (translation instructions with inlined context)
3. **Draft** → \`03-draft.md\` (initial translation with translator's notes; from subagent if chunked)
4. **Critical review** → \`04-critique.md\` (diagnosis only: accuracy, Europeanized language, strategy execution, expression issues)
5. **Revision** → \`05-revision.md\` (apply all critique findings to produce revised translation)
6. **Polish** → \`translation.md\` (final publication-quality translation)

Each step reads the previous step's file and builds on it.

### Step 5: Output

Final translation is always at \`translation.md\` in the output directory.

After the final translation is written, do a lightweight image-language pass:

1. Collect image references from the translated article
2. Identify likely text-heavy images such as covers, screenshots, diagrams, charts, frameworks, and infographics
3. If any image likely contains a main text language that does not match the translated article language, proactively remind the user
4. The reminder must be a list only. Do not automatically localize those images unless the user asks

Reminder format (use whatever image syntax the article already uses — standard markdown or wikilink):
\`\`\`text
Possible image localization needed:
- ![example cover](attachments/example-cover.png): likely still contains source-language text while the article is now in target language
- ![example diagram](attachments/example-diagram.png): likely text-heavy framework graphic, check whether labels need translation
\`\`\`

Display summary:
\`\`\`
**Translation complete** ({mode} mode)

Source: {source-path}
Languages: {from} → {to}
Output dir: {output-dir}/
Final: {output-dir}/translation.md
Glossary terms applied: {count}
\`\`\`

If mismatched image-language candidates were found, append a short note after the summary telling the user that some embedded images may still need image-text localization, followed by the candidate list.

## Extension Support

Custom configurations via EXTEND.md. See **Preferences** section for paths and supported options.`,
  whenToUse: 'Use when user asks to "translate", "翻译", "精翻", "translate article", "translate to Chinese/English", "改成中文", "改成英文", "convert to Chinese", "localize", "本地化", or needs any document translation. Also triggers for "refined translation", "精细翻译", "proofread translation", "快速翻译", "快翻", "这篇文章翻译一下", or when a URL or file is provided with translation intent.',
  price: 'Free',
  priceUsdc: 0,
  category: 'skill',
  tags: ["baoyu-skills","translate"],
  stars: 365,
  weeklyInstalls: 90,
  totalPurchases: 1249,
  featured: false,
  createdAt: '2026-05-25',
  creatorWallet: '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
  fileUrl: 'https://github.com/JimLiu/baoyu-skills/tree/main/skills/baoyu-translate',
  overviewHtml: "<div class=\"skill-enrichment\" style=\"display: flex; flex-direction: column; gap: 32px;\">\n      <div class=\"enrich-hero\" style=\"position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 196, 129, 0.14); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);\">\n        <div style=\"width: 100%; aspect-ratio: 16/6; background: linear-gradient(135deg, #13110f 0%, #17181c 100%); display: flex; align-items: center; justify-content: center; color: var(--color-accent-warm-light);\">\n          <svg width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z\"/></svg>\n        </div>\n        <div style=\"position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 30%, #0a0806 95%);\"></div>\n        <div style=\"position: absolute; bottom: 20px; left: 24px; right: 24px;\">\n          <h2 style=\"font-family: var(--font-display); color: var(--color-accent-warm-light); margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 0.02em;\">Translate</h2>\n          <p style=\"margin: 6px 0 0; color: var(--color-text-secondary); font-size: 14px; max-width: 600px;\">Translates articles and documents between languages with three modes - quick (direct), normal (analyze then translate...</p>\n        </div>\n      </div>\n\n      <div style=\"display: grid; grid-template-columns: 1.2fr 1.0fr; gap: 32px; align-items: start;\">\n        <div>\n          <h3 style=\"color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;\">SKILL CAPABILITIES</h3>\n          <p style=\"margin-bottom: 24px; font-size: 13.5px; line-height: 1.65; color: var(--color-text-secondary);\">Translates articles and documents between languages with three modes - quick (direct), normal (analyze then translate), and refined (analyze, translate, review, polish). Supports custom glossaries and terminology consistency via EXTEND.md. Use when user asks to \"translate\", \"翻译\", \"精翻\", \"translate article\", \"translate to Chinese/English\", \"改成中文\", \"改成英文\", \"convert to Chinese\", \"localize\", \"本地化\", or needs any document translation. Also triggers for \"refined translation\", \"精细翻译\", \"proofread translation\", \"快速翻译\", \"快翻\", \"这篇文章翻译一下\", or when a URL or file is provided with translation intent.</p>\n          \n          <h3 style=\"color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;\">KEY FEATURES</h3>\n          <ul style=\"list-style: none; padding: 0; margin: 0;\">\n            <li style=\"margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;\">\n    <span style=\"color: var(--color-accent); font-weight: bold; margin-top: 2px;\">•</span>\n    <span>End-to-end workflow execution automation</span>\n  </li>\n<li style=\"margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;\">\n    <span style=\"color: var(--color-accent); font-weight: bold; margin-top: 2px;\">•</span>\n    <span>Preset parameters optimized for production use</span>\n  </li>\n<li style=\"margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;\">\n    <span style=\"color: var(--color-accent); font-weight: bold; margin-top: 2px;\">•</span>\n    <span>Self-documenting routines and validation parameters</span>\n  </li>\n          </ul>\n        </div>\n        \n        <div style=\"background: rgba(255, 196, 129, 0.03); border: 1px solid rgba(255, 196, 129, 0.08); border-radius: 12px; padding: 24px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);\">\n          <h4 style=\"color: var(--color-accent-warm-light); margin-top: 0; margin-bottom: 16px; font-family: var(--font-display); font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;\">AUTOMATION STACKS</h4>\n          <div style=\"display: flex; flex-direction: column; gap: 12px;\">\n            <div style=\"background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;\">\n              <div style=\"font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;\">1. PARSE & STRUCTURE</div>\n              <div style=\"font-size: 12px; color: var(--color-text-secondary);\">Analyze context inputs and map constraints recursively.</div>\n            </div>\n            <div style=\"background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;\">\n              <div style=\"font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;\">2. AGENT EVALUATION</div>\n              <div style=\"font-size: 12px; color: var(--color-text-secondary);\">Validate logic flows against preset specifications.</div>\n            </div>\n            <div style=\"background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;\">\n              <div style=\"font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;\">3. DEPLOY & EXPORT</div>\n              <div style=\"font-size: 12px; color: var(--color-text-secondary);\">Write standardized outputs to target environments.</div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>",
  previewHtml: "<div style=\"background: #050c12; border: 1px solid rgba(255, 196, 129, 0.16); border-radius: 12px; font-family: var(--font-mono); color: #ffe8d1; overflow: hidden; max-width: 100%; box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);\">\n      <div style=\"background: rgba(255, 196, 129, 0.06); border-bottom: 1px solid rgba(255, 196, 129, 0.1); padding: 12px 20px; font-size: 11px; font-weight: 700; display: flex; justify-content: space-between; align-items: center; letter-spacing: 0.08em;\">\n        <span>CODE EDITOR & COMPILER</span>\n        <span style=\"color: var(--color-accent-warm-light);\">ONLINE</span>\n      </div>\n      <div style=\"padding: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px;\">\n        <div style=\"display: flex; flex-direction: column; gap: 8px;\">\n          <div style=\"font-size: 11px; color: rgba(255, 232, 209, 0.4);\">INPUT CONTEXT</div>\n          <pre style=\"margin: 0; font-size: 11px; background: rgba(0, 0, 0, 0.3); padding: 10px; border-radius: 6px; border: 1px solid rgba(255, 196, 129, 0.08); color: rgba(255, 232, 209, 0.7); overflow-x: auto;\">{\n  \"status\": \"pending\",\n  \"file\": \"SKILL.md\"\n}</pre>\n        </div>\n        <div style=\"display: flex; flex-direction: column; gap: 8px;\">\n          <div style=\"font-size: 11px; color: rgba(255, 232, 209, 0.4);\">PROCESS OUTPUT</div>\n          <pre style=\"margin: 0; font-size: 11px; background: rgba(255, 196, 129, 0.02); padding: 10px; border-radius: 6px; border: 1px solid rgba(255, 196, 129, 0.08); color: var(--color-accent-warm-light); overflow-x: auto;\">{\n  \"status\": \"success\",\n  \"processed\": true\n}</pre>\n        </div>\n      </div>\n    </div>",
  screenshots: undefined
}
