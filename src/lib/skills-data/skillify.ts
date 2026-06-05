import { SkillListing } from '../skills-data'
 
export const skillify: SkillListing = {
  id: 'skillify',
  author: 'zarazhangrui',
  slug: 'skillify',
  name: "Skillify",
  tagline: "Capture a session's repeatable process into a reusable SKILL.",
  description: "Capture a session's repeatable process into a reusable SKILL.md file following the agentskills.io standard. Use when the user says \"skillify this\", \"turn this into a skill\", \"capture this as a skill\", \"make this repeatable\", \"save this workflow\", or \"create a skill from this session\". Works at end of any workflow worth repeating.",
  readme: `# Skillify — Turn Any Session Into a Reusable Skill

You are capturing this session's repeatable process as a reusable SKILL.md file
that follows the [agentskills.io](https://agentskills.io) open standard — compatible
with Claude Code, Cursor, GitHub Copilot, Gemini CLI, VS Code, and 30+ other agent platforms.

## Phase 0: Gather Session Context

You don't have direct access to session memory, so reconstruct it now using
three complementary sources.

### Step A: Review Conversation History

Look back through the entire conversation. Extract:
- **Goal**: What did the user ask you to accomplish?
- **Steps taken**: Ordered list of actions (tools used, files touched, commands run)
- **Corrections**: Where did the user redirect your approach? These become Rules in the skill.
- **Tools & permissions**: Which tools were critical? Note permission patterns (e.g., \`Bash(gh:*)\` not just \`Bash\`)
- **Decision points**: Where did you or the user choose between alternatives?

### Step B: Check Git Artifacts

Gather recent changes to fill gaps in conversation context:

\`\`\`
!git diff --stat 2>/dev/null | head -30
\`\`\`

\`\`\`
!git log --oneline -10 2>/dev/null
\`\`\`

### Step C: Detect Project Context

Auto-detect the project's tooling so the generated skill uses the right commands:

\`\`\`
!{ [ -f package.json ] && echo "NODE: $(cat package.json | grep -E '\\"(name|test|build|lint)\\"' | head -5)"; [ -f Makefile ] && echo "MAKE: $(head -20 Makefile | grep '^[a-z].*:')"; [ -f Cargo.toml ] && echo "RUST: $(head -5 Cargo.toml)"; [ -f go.mod ] && echo "GO: $(head -3 go.mod)"; [ -f Gemfile ] && echo "RUBY: $(head -5 Gemfile)"; [ -f pyproject.toml ] && echo "PYTHON: $(head -10 pyproject.toml)"; [ -f requirements.txt ] && echo "PYTHON: requirements.txt found"; } 2>/dev/null || echo "No standard project files detected"
\`\`\`

## Phase 1: Interview the User

Use **AskUserQuestion** for ALL questions. Never ask questions via plain text.
Iterate each round until the user is satisfied.
The user always has a freeform "Other" option — do NOT add your own "Needs tweaking" option.

### Round 1: High-Level Confirmation

- Present your summary from Phase 0
- Suggest a **name** (lowercase, hyphens, max 64 chars per agentskills.io spec) and one-line **description**
- Suggest high-level goal(s) and success criteria
- Ask the user to confirm, rename, or adjust

### Round 2: Structure and Scope

- Present steps as a numbered list. Tell the user you'll dig into per-step detail next round.
- If the skill needs **arguments**, suggest them based on what you observed. Clarify what a future user would provide.
- Ask **execution context**:
  - \`inline\` (default) — runs in current conversation, user can steer mid-process
  - \`fork\` — runs as isolated sub-agent, better for self-contained tasks
- Ask **save location**:
  - **This repo** (\`.claude/skills/<name>/SKILL.md\`) — project-specific workflows
  - **Personal** (\`~/.claude/skills/<name>/SKILL.md\`) — follows user across all repos

### Round 3: Step-by-Step Detail

For each major step (skip if obvious), ask:
- What does this step **produce** that later steps need? (artifacts: PR URL, commit SHA, file path)
- What **proves** this step succeeded? (success criteria — required on every step)
- Should the user **confirm** before proceeding? (human checkpoint — for irreversible actions)
- Can any steps run in **parallel**? (concurrent steps use sub-numbers: 3a, 3b)
- What are **hard rules**? (constraints from user corrections, must/must-not)

Do multiple rounds if there are more than 3 steps or complex decision points.

### Round 4: Triggers and Edge Cases

- Confirm **when** this skill should be invoked — suggest trigger phrases
  - Example: "Use when the user says 'cherry-pick', 'hotfix', or 'CP this PR to release'"
- Ask about edge cases, gotchas, or failure modes to handle
- Ask if the skill should be **cross-platform** (if yes, note platform-specific commands)

Stop interviewing once you have enough. Don't over-ask for simple 2-3 step processes.

## Phase 2: Write the SKILL.md

Generate a SKILL.md following the **agentskills.io standard**.

### Frontmatter Template

\`\`\`yaml
---
name: {{skill-name}}
description: >
  {{One-line description. Start with an action verb. Under 1024 chars.
  Include "Use when..." trigger context so agents know when to activate.}}
license: MIT
metadata:
  author: {{user or org name}}
  version: "1.0.0"
allowed-tools:
  {{Minimum permission patterns observed. Use Bash(gh:*) not Bash.}}
---
\`\`\`

### Body Template

\`\`\`markdown
# {{Skill Title}}

{{Brief description of what this skill does and its goal.}}

## Inputs

- \`$arg_name\`: Description of this input

## Goal

{{Clearly stated goal. Include concrete success artifacts
(e.g., "an open PR with CI passing" not just "code changes").}}

## Steps

### 1. {{Step Name}}

{{Specific, actionable instructions. Include commands where appropriate.}}

**Success criteria**: {{How to know this step is done.}}

### 2. {{Step Name}}

...
\`\`\`

### Writing Rules

**Frontmatter:**
- \`name\`: lowercase, hyphens only, max 64 chars, must match directory name
- \`description\`: under 1024 chars, start with action verb, include "Use when..." triggers
- \`allowed-tools\`: minimum permissions needed — use patterns like \`Bash(gh:*)\` not \`Bash\`

**Body:**
- **Success criteria** on EVERY step — this is required, not optional
- Use per-step annotations where helpful:
  - **Execution**: \`Direct\` (default), \`Task agent\`, \`Teammate\` (parallel), \`[human]\`
  - **Artifacts**: Data this step produces for later steps
  - **Human checkpoint**: Pause for user confirmation (irreversible actions)
  - **Rules**: Hard constraints (especially from user corrections during original session)
- Concurrent steps use sub-numbers: 3a, 3b
- Steps requiring user action get \`[human]\` in the title
- Keep simple skills simple — a 2-step skill doesn't need every annotation
- Put large reference material in a \`references/\` subdirectory, not inline

**Cross-platform compatibility:**
- The agentskills.io standard works across 30+ tools
- Avoid Claude Code-specific frontmatter fields when possible
- Use standard fields: \`name\`, \`description\`, \`license\`, \`metadata\`, \`allowed-tools\`
- Tool-specific fields (like \`when_to_use\`, \`context\`, \`arguments\`) are fine — agents that don't understand them simply ignore them

## Phase 3: Review and Save

1. Output the complete SKILL.md as a **yaml code block** so the user can review with syntax highlighting
2. Ask for confirmation via AskUserQuestion: "Does this SKILL.md look good to save?"
3. On approval:
   - Create the skill directory
   - Write the SKILL.md file
   - If the skill has reference files, create a \`references/\` subdirectory
4. Confirm to the user:
   - Where the skill was saved
   - How to invoke: \`/{{skill-name}} [arguments]\`
   - That they can edit the SKILL.md directly to refine it
   - That the skill follows agentskills.io and works across compatible agent platforms
   - Remind them to restart Claude Code (skills are loaded at startup)`,
  whenToUse: "Use when you need to automate skillify processes.",
  price: "Free",
  priceUsdc: 0,
  category: "skill",
  tags: ["zarazhangrui-skills","skillify"],
  stars: 289,
  weeklyInstalls: 139,
  totalPurchases: 456,
  featured: false,
  createdAt: '2026-06-04',
  creatorWallet: '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
  fileUrl: 'https://github.com/zarazhangrui/skillify-skill/tree/main/skills/skillify',
  useCases: ["Goal: What did the user ask you to accomplish?","Steps taken: Ordered list of actions (tools used, files touched, commands run).","Corrections: Where did the user redirect your approach? These become Rules in the skill."],
  exampleUsage: "Create skillify for my project",
  overviewHtml: `<div class="skill-enrichment" style="display: flex; flex-direction: column; gap: 32px;">
      <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 196, 129, 0.14); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);">
        <div style="width: 100%; aspect-ratio: 16/6; background: linear-gradient(135deg, #13110f 0%, #17181c 100%); display: flex; align-items: center; justify-content: center; color: var(--color-accent-warm-light);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 30%, #0a0806 95%);"></div>
        <div style="position: absolute; bottom: 20px; left: 24px; right: 24px;">
          <h2 style="font-family: var(--font-display); color: var(--color-accent-warm-light); margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 0.02em;">Skillify</h2>
          <p style="margin: 6px 0 0; color: var(--color-text-secondary); font-size: 14px; max-width: 600px;">Capture a session's repeatable process into a reusable SKILL.</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1.2fr 1.0fr; gap: 32px; align-items: start;">
        <div>
          <h3 style="color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;">SKILL CAPABILITIES</h3>
          <p style="margin-bottom: 24px; font-size: 13.5px; line-height: 1.65; color: var(--color-text-secondary);">Capture a session's repeatable process into a reusable SKILL.md file following the agentskills.io standard. Use when the user says "skillify this", "turn this into a skill", "capture this as a skill", "make this repeatable", "save this workflow", or "create a skill from this session". Works at end of any workflow worth repeating.</p>
          
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
