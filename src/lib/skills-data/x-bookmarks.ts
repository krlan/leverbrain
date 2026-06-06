import { SkillListing } from '../skills-data'
 
export const xBookmarks: SkillListing = {
  id: 'x-bookmarks',
  author: 'santa',
  slug: 'x-bookmarks',
  name: "X bookmarks",
  tagline: "Local self-custody bookmarks syncing and long-form article extractor.",
  description: "Archive and enrich your bookmarked X posts and long-form articles. Resolves scrambled images and missing text by extracting from the GraphQL API directly with active cookies and mapping Draft.js blocks.",
  readme: `# X Bookmarks - Knowledge Archival & Article Enrichment

End-to-end local knowledge archiving workflow for X (Twitter) bookmarks and articles. Resolves limitations of the standard Field Theory CLI, particularly the link-only constraint bug and missing/scrambled images, by querying the X GraphQL API directly with active cookies and mapping Draft.js blocks to download and embed local media files in the correct positions.

## When to Apply

This Skill should be used when the task involves **syncing, indexing, searching, or archiving X bookmarks, especially when extracting long-form X Articles with images**.

### Must Use

This Skill must be invoked in the following situations:
- Setting up a local, private knowledge base of bookmarked X/Twitter posts.
- Resolving the "scrambled images" or "missing text" issues on X Article syncs.
- Extracting long-form X Articles (\`/i/article/...\`) that have user commentary on X (which bypasses standard Field Theory enrichment).
- Rebuilding or formatting the local markdown glossary, monthly statistics, or search indexes.

### Skip

This Skill is not needed in the following situations:
- Bookmarks from non-X sources (e.g. browser bookmarks, pocket, instapaper).
- Fetching single public tweets without media or long-form articles.

---

## Prerequisites

Ensure the following tools are installed on the local system:

1. **Node.js** (for running the Field Theory CLI)
2. **SQLite3** (for querying the local database)
3. **Python 3** (for running custom GraphQL enrichment and library compiler scripts)

---

## How to Use This Skill

### Step 1: Install Field Theory CLI

To install the self-custody bookmarks CLI tool globally:

\`\`\`bash
npm install -g fieldtheory
\`\`\`

---

### Step 2: Authenticated Bookmarks Sync

Because sandboxed/headless terminal sessions cannot access browser keychains to retrieve session tokens, you must manually supply your active X session cookies. 

#### 1. Retrieve Cookies from Browser (e.g., Brave or Chrome)
1. Open your browser and go to \`https://x.com\` (ensure you are logged in).
2. Open Developer Tools (\`F12\` or \`Cmd + Option + I\`).
3. Go to the **Application** (or **Storage**) tab, select **Cookies**, and click on \`https://x.com\`.
4. Copy the values of the following two cookies:
   - \`ct0\` (CSRF token, a long hex string)
   - \`auth_token\` (active authentication token, a long hex string)

#### 2. Run the Sync Command
Execute the sync using the raw values (do not prefix them with names like \`ct0=\`; pass only the raw values separated by a space):

\`\`\`bash
npx fieldtheory sync --rebuild --yes --cookies <csrfToken> <authToken>
\`\`\`

> [!CAUTION]
> **Positional Trap:** Field Theory parses cookie arguments positionally. Do not pass labels like \`ct0=value\`. Only supply the raw token values: \`--cookies csrfTokenValue authTokenValue\`.

---

### Step 3: Direct GraphQL Article Enrichment (The Hybrid Scraper)

Standard Field Theory sync has a known bug: it only enrich X Articles if a bookmark is "link-only" (contains less than 80 characters of text commentary). If you wrote an introductory summary, it skips it. Furthermore, it only pulls plain text and completely ignores inline and cover images.

To solve this, run a custom enrichment script that connects directly to the authenticated GraphQL endpoint:

\`\`\`bash
python3 -u scripts/enrich_all_articles.py
\`\`\`

This custom script performs the following actions:
1. Queries \`/Users/shark/.fieldtheory/bookmarks/bookmarks.db\` for bookmarks containing \`/i/article/\` in \`links_json\`.
2. Resolves status IDs to X's internal GraphQL endpoint: \`https://x.com/i/api/graphql/fHLDP3qFEjnTqhWBVvsREg/TweetResultByRestId\`.
3. Parses the returned Draft.js \`content_state\` blocks (unstyled, header-one, blockquote, atomic) and inline formatting styles.
4. Detects media entities, downloads images locally to \`bookmarks_library/images/<tweet_id>-<mediaId>.jpg\`, and maps them to their exact visual layout locations.
5. Updates both the SQLite \`bookmarks\` table and the \`bookmarks.jsonl\` cache file.

---

### Step 4: Compile the Local Wiki & Glossary

Once articles are enriched, compile the central index and generate the individual markdown wiki files:

\`\`\`bash
python3 scripts/build_library.py
\`\`\`

This generates:
- Individual markdown files for each bookmark under \`bookmarks_library/bookmarks/\` with formatted headers, text, and correctly aligned inline local images (\`![Image](../images/<filename>.jpg)\`).
- A central \`README.md\` containing an indexed Glossary Table of all bookmarks and a monthly ASCII bar chart of your bookmarking activity.

---

## Pre-Delivery Checklist

Before finalizing any bookmarks library updates, verify these items:

- [ ] \`.gitignore\` contains \`/bookmarks_library/\` and \`/Users/shark/.fieldtheory/\` to keep all synced data 100% local.
- [ ] Every article has its cover image and inline images downloaded to \`/bookmarks_library/images/\`.
- [ ] Image paths in the exported markdown files are relative (e.g. \`../images/<filename>.jpg\`).
- [ ] Run \`npx fieldtheory index\` to rebuild the FTS5 search index, enabling fast keyword searches.`,
  whenToUse: "Use this skill when compiling or indexing long-form X posts, media attachments, and articles into a local markdown library.",
  price: "$9.99",
  priceUsdc: 9.99,
  category: "skill",
  tags: ["santa-skills","x-bookmarks"],
  stars: 510,
  weeklyInstalls: 209,
  totalPurchases: 1143,
  featured: false,
  createdAt: '2026-06-04',
  creatorWallet: 'Fd983Npa5kCh1WohgZ4xJj95EUefGxwyBEfXHbBYhBZh',
  fileUrl: 'https://github.com/krlan/leverbrain/tree/main/skills/x-bookmarks',
  useCases: ["Resolving the \"scrambled images\" or \"missing text\" issues on X Article syncs.","Rebuilding or formatting the local markdown glossary, monthly statistics, or search indexes.","Bookmarks from non-X sources (e.g. browser bookmarks, pocket, instapaper)."],
  exampleUsage: "Extract x bookmarks for my project",
  overviewHtml: `<div class="skill-enrichment" style="display: flex; flex-direction: column; gap: 32px;">
      <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 196, 129, 0.14); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);">
        <div style="width: 100%; aspect-ratio: 16/6; background: linear-gradient(135deg, #13110f 0%, #17181c 100%); display: flex; align-items: center; justify-content: center; color: var(--color-accent-warm-light);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 30%, #0a0806 95%);"></div>
        <div style="position: absolute; bottom: 20px; left: 24px; right: 24px;">
          <h2 style="font-family: var(--font-display); color: var(--color-accent-warm-light); margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 0.02em;">X bookmarks</h2>
          <p style="margin: 6px 0 0; color: var(--color-text-secondary); font-size: 14px; max-width: 600px;">Local self-custody bookmarks syncing and long-form article extractor.</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1.2fr 1.0fr; gap: 32px; align-items: start;">
        <div>
          <h3 style="color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;">SKILL CAPABILITIES</h3>
          <p style="margin-bottom: 24px; font-size: 13.5px; line-height: 1.65; color: var(--color-text-secondary);">Archive and enrich your bookmarked X posts and long-form articles. Resolves scrambled images and missing text by extracting from the GraphQL API directly with active cookies and mapping Draft.js blocks.</p>
          
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
