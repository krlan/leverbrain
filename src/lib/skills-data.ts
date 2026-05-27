// Shared skills data — used by both skills list page and detail pages.
// Source of truth while we wire Convex. IDs match Convex DB slugs.

import { baoyuArticleIllustrator } from './skills-data/baoyu-article-illustrator'
import { baoyuComic } from './skills-data/baoyu-comic'
import { baoyuCompressImage } from './skills-data/baoyu-compress-image'
import { baoyuCoverImage } from './skills-data/baoyu-cover-image'
import { baoyuDangerGeminiWeb } from './skills-data/baoyu-danger-gemini-web'
import { baoyuDangerXToMarkdown } from './skills-data/baoyu-danger-x-to-markdown'
import { baoyuDiagram } from './skills-data/baoyu-diagram'
import { baoyuElectronExtract } from './skills-data/baoyu-electron-extract'
import { baoyuFormatMarkdown } from './skills-data/baoyu-format-markdown'
import { baoyuImageGen } from './skills-data/baoyu-image-gen'
import { baoyuInfographic } from './skills-data/baoyu-infographic'
import { baoyuMarkdownToHtml } from './skills-data/baoyu-markdown-to-html'
import { baoyuPostToWechat } from './skills-data/baoyu-post-to-wechat'
import { baoyuPostToWeibo } from './skills-data/baoyu-post-to-weibo'
import { baoyuPostToX } from './skills-data/baoyu-post-to-x'
import { baoyuSlideDeck } from './skills-data/baoyu-slide-deck'
import { baoyuTranslate } from './skills-data/baoyu-translate'
import { baoyuUrlToMarkdown } from './skills-data/baoyu-url-to-markdown'
import { baoyuWechatSummary } from './skills-data/baoyu-wechat-summary'
import { baoyuXhsImages } from './skills-data/baoyu-xhs-images'
import { baoyuYoutubeTranscript } from './skills-data/baoyu-youtube-transcript'
import { agencyInABox } from './skills-data/agency-in-a-box'
import { indiehackerLaunchKit } from './skills-data/indiehacker-launch-kit'
import { saasGtmPlaybook } from './skills-data/saas-gtm-playbook'
import { companyValues } from './skills-data/company-values'
import { findCommunity } from './skills-data/find-community'
import { firstCustomers } from './skills-data/first-customers'
import { growSustainably } from './skills-data/grow-sustainably'
import { marketingPlan } from './skills-data/marketing-plan'
import { minimalistReview } from './skills-data/minimalist-review'
import { mvp } from './skills-data/mvp'
import { pricing } from './skills-data/pricing'
import { processize } from './skills-data/processize'
import { validateIdea } from './skills-data/validate-idea'
import { agentIntrospectionDebugging } from './skills-data/agent-introspection-debugging'
import { agentSort } from './skills-data/agent-sort'
import { apiDesign } from './skills-data/api-design'
import { articleWriting } from './skills-data/article-writing'
import { backendPatterns } from './skills-data/backend-patterns'
import { brandVoice } from './skills-data/brand-voice'
import { bunRuntime } from './skills-data/bun-runtime'
import { codingStandards } from './skills-data/coding-standards'
import { contentEngine } from './skills-data/content-engine'
import { crosspost } from './skills-data/crosspost'
import { eccDeepResearch } from './skills-data/ecc-deep-research'
import { dmuxWorkflows } from './skills-data/dmux-workflows'
import { documentationLookup } from './skills-data/documentation-lookup'
import { e2eTesting } from './skills-data/e2e-testing'
import { evalHarness } from './skills-data/eval-harness'
import { everythingClaudeCode } from './skills-data/everything-claude-code'
import { exaSearch } from './skills-data/exa-search'
import { falAiMedia } from './skills-data/fal-ai-media'
import { frontendPatterns } from './skills-data/frontend-patterns'
import { frontendSlides } from './skills-data/frontend-slides'
import { investorMaterials } from './skills-data/investor-materials'
import { investorOutreach } from './skills-data/investor-outreach'
import { marketResearch } from './skills-data/market-research'
import { mcpServerPatterns } from './skills-data/mcp-server-patterns'
import { mleWorkflow } from './skills-data/mle-workflow'
import { nextjsTurbopack } from './skills-data/nextjs-turbopack'
import { productCapability } from './skills-data/product-capability'
import { securityReview } from './skills-data/security-review'
import { strategicCompact } from './skills-data/strategic-compact'
import { tddWorkflow } from './skills-data/tdd-workflow'
import { verificationLoop } from './skills-data/verification-loop'
import { videoEditing } from './skills-data/video-editing'
import { xApi } from './skills-data/x-api'
import { aiMaestro } from './skills-data/ai-maestro'
import { aiResearch } from './skills-data/ai-research'
import { analytics } from './skills-data/analytics'
import { businessMarketing } from './skills-data/business-marketing'
import { career } from './skills-data/career'
import { creativeDesign } from './skills-data/creative-design'
import { database } from './skills-data/database'
import { designToCode } from './skills-data/design-to-code'
import { development } from './skills-data/development'
import { documentProcessing } from './skills-data/document-processing'
import { enterpriseCommunication } from './skills-data/enterprise-communication'
import { git } from './skills-data/git'
import { gmodAddonMaker } from './skills-data/gmod-addon-maker'
import { marketing } from './skills-data/marketing'
import { media } from './skills-data/media'
import { pocketbase } from './skills-data/pocketbase'
import { productivity } from './skills-data/productivity'
import { railway } from './skills-data/railway'
import { scientific } from './skills-data/scientific'
import { security } from './skills-data/security'
import { sentry } from './skills-data/sentry'
import { sports } from './skills-data/sports'
import { utilities } from './skills-data/utilities'
import { video } from './skills-data/video'
import { webData } from './skills-data/web-data'
import { webDevelopment } from './skills-data/web-development'
import { workflowAutomation } from './skills-data/workflow-automation'
import { algorithmicArt } from './skills-data/algorithmic-art'
import { brandGuidelines } from './skills-data/brand-guidelines'
import { canvasDesign } from './skills-data/canvas-design'
import { claudeApi } from './skills-data/claude-api'
import { docCoauthoring } from './skills-data/doc-coauthoring'
import { docx } from './skills-data/docx'
import { frontendDesign } from './skills-data/frontend-design'
import { internalComms } from './skills-data/internal-comms'
import { mcpBuilder } from './skills-data/mcp-builder'
import { pdf } from './skills-data/pdf'
import { pptx } from './skills-data/pptx'
import { skillCreator } from './skills-data/skill-creator'
import { slackGifCreator } from './skills-data/slack-gif-creator'
import { themeFactory } from './skills-data/theme-factory'
import { webArtifactsBuilder } from './skills-data/web-artifacts-builder'
import { webappTesting } from './skills-data/webapp-testing'
import { xlsx } from './skills-data/xlsx'
import { agenticActionsAuditor } from './skills-data/agentic-actions-auditor'
import { askQuestionsIfUnderspecified } from './skills-data/ask-questions-if-underspecified'
import { auditContextBuilding } from './skills-data/audit-context-building'
import { buildingSecureContracts } from './skills-data/building-secure-contracts'
import { burpsuiteProjectParser } from './skills-data/burpsuite-project-parser'
import { cReview } from './skills-data/c-review'
import { claudeInChromeTroubleshooting } from './skills-data/claude-in-chrome-troubleshooting'
import { constantTimeAnalysis } from './skills-data/constant-time-analysis'
import { cultureIndex } from './skills-data/culture-index'
import { debugButtercup } from './skills-data/debug-buttercup'
import { devcontainerSetup } from './skills-data/devcontainer-setup'
import { differentialReview } from './skills-data/differential-review'
import { dimensionalAnalysis } from './skills-data/dimensional-analysis'
import { dwarfExpert } from './skills-data/dwarf-expert'
import { entryPointAnalyzer } from './skills-data/entry-point-analyzer'
import { firebaseApkScanner } from './skills-data/firebase-apk-scanner'
import { fpCheck } from './skills-data/fp-check'
import { ghCli } from './skills-data/gh-cli'
import { gitCleanup } from './skills-data/git-cleanup'
import { insecureDefaults } from './skills-data/insecure-defaults'
import { letFateDecide } from './skills-data/let-fate-decide'
import { modernPython } from './skills-data/modern-python'
import { mutationTesting } from './skills-data/mutation-testing'
import { propertyBasedTesting } from './skills-data/property-based-testing'
import { seatbeltSandboxer } from './skills-data/seatbelt-sandboxer'
import { secondOpinion } from './skills-data/second-opinion'
import { semgrepRuleCreator } from './skills-data/semgrep-rule-creator'
import { semgrepRuleVariantCreator } from './skills-data/semgrep-rule-variant-creator'
import { sharpEdges } from './skills-data/sharp-edges'
import { skillImprover } from './skills-data/skill-improver'
import { specToCodeCompliance } from './skills-data/spec-to-code-compliance'
import { staticAnalysis } from './skills-data/static-analysis'
import { supplyChainRiskAuditor } from './skills-data/supply-chain-risk-auditor'
import { testingHandbookSkills } from './skills-data/testing-handbook-skills'
import { trailmark } from './skills-data/trailmark'
import { variantAnalysis } from './skills-data/variant-analysis'
import { workflowSkillDesign } from './skills-data/workflow-skill-design'
import { yaraAuthoring } from './skills-data/yara-authoring'
import { zeroizeAudit } from './skills-data/zeroize-audit'
import { diagnose } from './skills-data/diagnose'
import { grillWithDocs } from './skills-data/grill-with-docs'
import { improveCodebaseArchitecture } from './skills-data/improve-codebase-architecture'
import { prototype } from './skills-data/prototype'
import { setupMattPocockSkills } from './skills-data/setup-matt-pocock-skills'
import { tdd } from './skills-data/tdd'
import { toIssues } from './skills-data/to-issues'
import { toPrd } from './skills-data/to-prd'
import { triage } from './skills-data/triage'
import { zoomOut } from './skills-data/zoom-out'
import { gitGuardrailsClaudeCode } from './skills-data/git-guardrails-claude-code'
import { migrateToShoehorn } from './skills-data/migrate-to-shoehorn'
import { scaffoldExercises } from './skills-data/scaffold-exercises'
import { setupPreCommit } from './skills-data/setup-pre-commit'
import { editArticle } from './skills-data/edit-article'
import { obsidianVault } from './skills-data/obsidian-vault'
import { caveman } from './skills-data/caveman'
import { grillMe } from './skills-data/grill-me'
import { handoff } from './skills-data/handoff'
import { writeASkill } from './skills-data/write-a-skill'
import { review } from './skills-data/review'
import { teach } from './skills-data/teach'
import { writingBeats } from './skills-data/writing-beats'
import { writingFragments } from './skills-data/writing-fragments'
import { writingShape } from './skills-data/writing-shape'

export type SkillCategory = 'skill' | 'strategy' | 'blueprint' | (string & {})

export interface SkillListing {
  id: string
  author: string      // creator handle / wallet-linked handle
  slug: string        // URL-safe skill name
  name: string
  tagline: string     // one-liner shown on cards
  description: string // longer description for detail page
  readme: string      // markdown content for README tab
  whenToUse: string   // when-to-use guidance
  price: string       // "Free" or "$X.XX"
  priceUsdc: number   // in USDC (0 = free)
  category: SkillCategory
  tags: string[]
  stars: number
  weeklyInstalls: number
  totalPurchases: number
  featured?: boolean
  createdAt: string
  creatorWallet?: string
  fileUrl?: string
  previewHtml?: string
  overviewHtml?: string
  imageUrl?: string
  screenshots?: {
    title: string
    items: { name: string; url: string }[]
  }[]
}

export const SKILLS: SkillListing[] = [
  baoyuArticleIllustrator,
  baoyuComic,
  baoyuCompressImage,
  baoyuCoverImage,
  baoyuDangerGeminiWeb,
  baoyuDangerXToMarkdown,
  baoyuDiagram,
  baoyuElectronExtract,
  baoyuFormatMarkdown,
  baoyuImageGen,
  baoyuInfographic,
  baoyuMarkdownToHtml,
  baoyuPostToWechat,
  baoyuPostToWeibo,
  baoyuPostToX,
  baoyuSlideDeck,
  baoyuTranslate,
  baoyuUrlToMarkdown,
  baoyuWechatSummary,
  baoyuXhsImages,
  baoyuYoutubeTranscript,
  agencyInABox,
  indiehackerLaunchKit,
  saasGtmPlaybook,
  companyValues,
  findCommunity,
  firstCustomers,
  growSustainably,
  marketingPlan,
  minimalistReview,
  mvp,
  pricing,
  processize,
  validateIdea,
  agentIntrospectionDebugging,
  agentSort,
  apiDesign,
  articleWriting,
  backendPatterns,
  brandVoice,
  bunRuntime,
  codingStandards,
  contentEngine,
  crosspost,
  eccDeepResearch,
  dmuxWorkflows,
  documentationLookup,
  e2eTesting,
  evalHarness,
  everythingClaudeCode,
  exaSearch,
  falAiMedia,
  frontendPatterns,
  frontendSlides,
  investorMaterials,
  investorOutreach,
  marketResearch,
  mcpServerPatterns,
  mleWorkflow,
  nextjsTurbopack,
  productCapability,
  securityReview,
  strategicCompact,
  tddWorkflow,
  verificationLoop,
  videoEditing,
  xApi,
  aiMaestro,
  aiResearch,
  analytics,
  businessMarketing,
  career,
  creativeDesign,
  database,
  designToCode,
  development,
  documentProcessing,
  enterpriseCommunication,
  git,
  gmodAddonMaker,
  marketing,
  media,
  pocketbase,
  productivity,
  railway,
  scientific,
  security,
  sentry,
  sports,
  utilities,
  video,
  webData,
  webDevelopment,
  workflowAutomation,
  algorithmicArt,
  brandGuidelines,
  canvasDesign,
  claudeApi,
  docCoauthoring,
  docx,
  frontendDesign,
  internalComms,
  mcpBuilder,
  pdf,
  pptx,
  skillCreator,
  slackGifCreator,
  themeFactory,
  webArtifactsBuilder,
  webappTesting,
  xlsx,
  agenticActionsAuditor,
  askQuestionsIfUnderspecified,
  auditContextBuilding,
  buildingSecureContracts,
  burpsuiteProjectParser,
  cReview,
  claudeInChromeTroubleshooting,
  constantTimeAnalysis,
  cultureIndex,
  debugButtercup,
  devcontainerSetup,
  differentialReview,
  dimensionalAnalysis,
  dwarfExpert,
  entryPointAnalyzer,
  firebaseApkScanner,
  fpCheck,
  ghCli,
  gitCleanup,
  insecureDefaults,
  letFateDecide,
  modernPython,
  mutationTesting,
  propertyBasedTesting,
  seatbeltSandboxer,
  secondOpinion,
  semgrepRuleCreator,
  semgrepRuleVariantCreator,
  sharpEdges,
  skillImprover,
  specToCodeCompliance,
  staticAnalysis,
  supplyChainRiskAuditor,
  testingHandbookSkills,
  trailmark,
  variantAnalysis,
  workflowSkillDesign,
  yaraAuthoring,
  zeroizeAudit,
  diagnose,
  grillWithDocs,
  improveCodebaseArchitecture,
  prototype,
  setupMattPocockSkills,
  tdd,
  toIssues,
  toPrd,
  triage,
  zoomOut,
  gitGuardrailsClaudeCode,
  migrateToShoehorn,
  scaffoldExercises,
  setupPreCommit,
  editArticle,
  obsidianVault,
  caveman,
  grillMe,
  handoff,
  writeASkill,
  review,
  teach,
  writingBeats,
  writingFragments,
  writingShape
]

export function getSkillByAuthorSlug(author: string, slug: string): SkillListing | undefined {
  return SKILLS.find((s) => s.author.toLowerCase() === author.toLowerCase() && s.slug.toLowerCase() === slug.toLowerCase())
}

export function getSkillsByAuthor(author: string): SkillListing[] {
  return SKILLS.filter((s) => s.author.toLowerCase() === author.toLowerCase())
}

export function getFeaturedSkills(): SkillListing[] {
  const featured = SKILLS
    .filter((s) => s.featured)
    .sort((a, b) => b.totalPurchases - a.totalPurchases)

  if (featured.length >= 10) {
    return featured.slice(0, 10)
  }

  const fallback = SKILLS
    .filter((s) => !s.featured)
    .sort((a, b) => b.totalPurchases - a.totalPurchases)

  return [...featured, ...fallback].slice(0, 10)
}

export function searchSkills(query: string): SkillListing[] {
  const q = query.toLowerCase()
  return SKILLS.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.tagline.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.tags.some((t) => t.toLowerCase().includes(q)) ||
      s.author.toLowerCase().includes(q) ||
      s.category.includes(q)
  )
}

export function getSkillsByCategory(category: SkillCategory): SkillListing[] {
  return SKILLS.filter((s) => s.category === category)
}
