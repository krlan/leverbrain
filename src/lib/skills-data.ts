// Shared skills data — used by both skills list page and detail pages.
// Source of truth while we wire Convex. IDs match Convex DB slugs.

import { abTesting } from './skills-data/ab-testing'
import { adCreative } from './skills-data/ad-creative'
import { ads } from './skills-data/ads'
import { agentIntrospectionDebugging } from './skills-data/agent-introspection-debugging'
import { agentSort } from './skills-data/agent-sort'
import { agenticActionsAuditor } from './skills-data/agentic-actions-auditor'
import { aiMaestro } from './skills-data/ai-maestro'
import { aiResearch } from './skills-data/ai-research'
import { aiSeo } from './skills-data/ai-seo'
import { aiasisbot614chanReader } from './skills-data/aiasisbot61-4chan-reader'
import { algorithmicArt } from './skills-data/algorithmic-art'
import { analytics } from './skills-data/analytics'
import { apiDesign } from './skills-data/api-design'
import { articleWriting } from './skills-data/article-writing'
import { askQuestionsIfUnderspecified } from './skills-data/ask-questions-if-underspecified'
import { aso } from './skills-data/aso'
import { auditContextBuilding } from './skills-data/audit-context-building'
import { backendPatterns } from './skills-data/backend-patterns'
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
import { beautifulHtmlTemplates } from './skills-data/beautiful-html-templates'
import { brandGuidelines } from './skills-data/brand-guidelines'
import { brandStrategy } from './skills-data/brand-strategy'
import { brandVoice } from './skills-data/brand-voice'
import { brandkit } from './skills-data/brandkit'
import { brutalistSkill } from './skills-data/brutalist-skill'
import { buildingSecureContracts } from './skills-data/building-secure-contracts'
import { bunRuntime } from './skills-data/bun-runtime'
import { burpsuiteProjectParser } from './skills-data/burpsuite-project-parser'
import { businessMarketing } from './skills-data/business-marketing'
import { cReview } from './skills-data/c-review'
import { canvasDesign } from './skills-data/canvas-design'
import { career } from './skills-data/career'
import { caveman } from './skills-data/caveman'
import { churnPrevention } from './skills-data/churn-prevention'
import { claudeApi } from './skills-data/claude-api'
import { claudeDesign } from './skills-data/claude-design'
import { claudeInChromeTroubleshooting } from './skills-data/claude-in-chrome-troubleshooting'
import { cloneWritingStyle } from './skills-data/clone-writing-style'
import { coMarketing } from './skills-data/co-marketing'
import { codebaseToCourse } from './skills-data/codebase-to-course'
import { codingStandards } from './skills-data/coding-standards'
import { coldEmail } from './skills-data/cold-email'
import { communityMarketing } from './skills-data/community-marketing'
import { companyValues } from './skills-data/company-values'
import { competitorProfiling } from './skills-data/competitor-profiling'
import { competitors } from './skills-data/competitors'
import { constantTimeAnalysis } from './skills-data/constant-time-analysis'
import { contentEngine } from './skills-data/content-engine'
import { contentStrategy } from './skills-data/content-strategy'
import { copyEditing } from './skills-data/copy-editing'
import { copywriting } from './skills-data/copywriting'
import { creativeDesign } from './skills-data/creative-design'
import { cro } from './skills-data/cro'
import { crosspost } from './skills-data/crosspost'
import { cultureIndex } from './skills-data/culture-index'
import { customerResearch } from './skills-data/customer-research'
import { database } from './skills-data/database'
import { debugButtercup } from './skills-data/debug-buttercup'
import { designToCode } from './skills-data/design-to-code'
import { devcontainerSetup } from './skills-data/devcontainer-setup'
import { development } from './skills-data/development'
import { diagnose } from './skills-data/diagnose'
import { differentialReview } from './skills-data/differential-review'
import { dimensionalAnalysis } from './skills-data/dimensional-analysis'
import { dimitryvinVideoDl } from './skills-data/dimitryvin-video-dl'
import { directorySubmissions } from './skills-data/directory-submissions'
import { distillMe } from './skills-data/distill-me'
import { dmuxWorkflows } from './skills-data/dmux-workflows'
import { docCoauthoring } from './skills-data/doc-coauthoring'
import { documentProcessing } from './skills-data/document-processing'
import { documentationLookup } from './skills-data/documentation-lookup'
import { docx } from './skills-data/docx'
import { dwarfExpert } from './skills-data/dwarf-expert'
import { e2eTesting } from './skills-data/e2e-testing'
import { eccDeepResearch } from './skills-data/ecc-deep-research'
import { editArticle } from './skills-data/edit-article'
import { emails } from './skills-data/emails'
import { enterpriseCommunication } from './skills-data/enterprise-communication'
import { entryPointAnalyzer } from './skills-data/entry-point-analyzer'
import { evalHarness } from './skills-data/eval-harness'
import { everythingClaudeCode } from './skills-data/everything-claude-code'
import { exaSearch } from './skills-data/exa-search'
import { facelessPageAnonymity } from './skills-data/faceless-page-anonymity'
import { falAiMedia } from './skills-data/fal-ai-media'
import { feydefiGeoAuditOptimizer } from './skills-data/feydefi-geo-audit-optimizer'
import { findCommunity } from './skills-data/find-community'
import { firebaseApkScanner } from './skills-data/firebase-apk-scanner'
import { firstCustomers } from './skills-data/first-customers'
import { followBuilders } from './skills-data/follow-builders'
import { fpCheck } from './skills-data/fp-check'
import { freeTools } from './skills-data/free-tools'
import { frontendDesign } from './skills-data/frontend-design'
import { frontendPatterns } from './skills-data/frontend-patterns'
import { frontendSlides } from './skills-data/frontend-slides'
import { ghCli } from './skills-data/gh-cli'
import { git } from './skills-data/git'
import { gitCleanup } from './skills-data/git-cleanup'
import { gitGuardrailsClaudeCode } from './skills-data/git-guardrails-claude-code'
import { gmodAddonMaker } from './skills-data/gmod-addon-maker'
import { gptTasteskill } from './skills-data/gpt-tasteskill'
import { grillMe } from './skills-data/grill-me'
import { grillWithDocs } from './skills-data/grill-with-docs'
import { growSustainably } from './skills-data/grow-sustainably'
import { handoff } from './skills-data/handoff'
import { image } from './skills-data/image'
import { imageToCodeSkill } from './skills-data/image-to-code-skill'
import { imagegenFrontendMobile } from './skills-data/imagegen-frontend-mobile'
import { imagegenFrontendWeb } from './skills-data/imagegen-frontend-web'
import { improveCodebaseArchitecture } from './skills-data/improve-codebase-architecture'
import { insecureDefaults } from './skills-data/insecure-defaults'
import { internalComms } from './skills-data/internal-comms'
import { investorMaterials } from './skills-data/investor-materials'
import { investorOutreach } from './skills-data/investor-outreach'
import { jackfriksB2cMarketing } from './skills-data/jackfriks-b2c-marketing'
import { launch } from './skills-data/launch'
import { leadMagnets } from './skills-data/lead-magnets'
import { letFateDecide } from './skills-data/let-fate-decide'
import { leverbrain } from './skills-data/leverbrain'
import { linkedinB2bFunnel } from './skills-data/linkedin-b2b-funnel'
import { linkedinOpportunity } from './skills-data/linkedin-opportunity'
import { lockIn } from './skills-data/lock-in'
import { marketResearch } from './skills-data/market-research'
import { marketing } from './skills-data/marketing'
import { marketingIdeas } from './skills-data/marketing-ideas'
import { marketingPlan } from './skills-data/marketing-plan'
import { marketingPsychology } from './skills-data/marketing-psychology'
import { mcpBuilder } from './skills-data/mcp-builder'
import { mcpServerPatterns } from './skills-data/mcp-server-patterns'
import { media } from './skills-data/media'
import { microNicheYoutube } from './skills-data/micro-niche-youtube'
import { migrateToShoehorn } from './skills-data/migrate-to-shoehorn'
import { minimalistReview } from './skills-data/minimalist-review'
import { minimalistSkill } from './skills-data/minimalist-skill'
import { mleWorkflow } from './skills-data/mle-workflow'
import { modernPython } from './skills-data/modern-python'
import { mutationTesting } from './skills-data/mutation-testing'
import { mvp } from './skills-data/mvp'
import { nextjsTurbopack } from './skills-data/nextjs-turbopack'
import { nutrition } from './skills-data/nutrition'
import { obsidianVault } from './skills-data/obsidian-vault'
import { onboarding } from './skills-data/onboarding'
import { ouroAutopilot } from './skills-data/ouro-autopilot'
import { ouroBookFetch } from './skills-data/ouro-book-fetch'
import { ouroDesign } from './skills-data/ouro-design'
import { ouroDragonHunt } from './skills-data/ouro-dragon-hunt'
import { ouroFrontendDesign } from './skills-data/ouro-frontend-design'
import { ouroFullSystemsAudit } from './skills-data/ouro-full-systems-audit'
import { ouroInchWorm } from './skills-data/ouro-inch-worm'
import { ouroSeoTitles } from './skills-data/ouro-seo-titles'
import { ouroSkillManagement } from './skills-data/ouro-skill-management'
import { ouroStayInTurn } from './skills-data/ouro-stay-in-turn'
import { ouroVideoEditing } from './skills-data/ouro-video-editing'
import { ouroWordDocs } from './skills-data/ouro-word-docs'
import { ouroWorkDoer } from './skills-data/ouro-work-doer'
import { ouroWorkIdeator } from './skills-data/ouro-work-ideator'
import { ouroWorkMerger } from './skills-data/ouro-work-merger'
import { ouroWorkPlanner } from './skills-data/ouro-work-planner'
import { ouroWorkbenchOperator } from './skills-data/ouro-workbench-operator'
import { outboundEcosystem } from './skills-data/outbound-ecosystem'
import { outputSkill } from './skills-data/output-skill'
import { paywalls } from './skills-data/paywalls'
import { pdf } from './skills-data/pdf'
import { pocketbase } from './skills-data/pocketbase'
import { popups } from './skills-data/popups'
import { pptx } from './skills-data/pptx'
import { pricing } from './skills-data/pricing'
import { processize } from './skills-data/processize'
import { productCapability } from './skills-data/product-capability'
import { productMarketing } from './skills-data/product-marketing'
import { productivity } from './skills-data/productivity'
import { programmaticSeo } from './skills-data/programmatic-seo'
import { propertyBasedTesting } from './skills-data/property-based-testing'
import { prospecting } from './skills-data/prospecting'
import { prototype } from './skills-data/prototype'
import { railway } from './skills-data/railway'
import { redditMrrPlaybook } from './skills-data/reddit-mrr-playbook'
import { redesignSkill } from './skills-data/redesign-skill'
import { referrals } from './skills-data/referrals'
import { review } from './skills-data/review'
import { revops } from './skills-data/revops'
import { ryudi84SovereignBrandVoiceWriter } from './skills-data/ryudi84-sovereign-brand-voice-writer'
import { salesEnablement } from './skills-data/sales-enablement'
import { scaffoldExercises } from './skills-data/scaffold-exercises'
import { schema } from './skills-data/schema'
import { scientific } from './skills-data/scientific'
import { seatbeltSandboxer } from './skills-data/seatbelt-sandboxer'
import { secondOpinion } from './skills-data/second-opinion'
import { security } from './skills-data/security'
import { securityReview } from './skills-data/security-review'
import { semgrepRuleCreator } from './skills-data/semgrep-rule-creator'
import { semgrepRuleVariantCreator } from './skills-data/semgrep-rule-variant-creator'
import { sentry } from './skills-data/sentry'
import { seoAudit } from './skills-data/seo-audit'
import { setupMattPocockSkills } from './skills-data/setup-matt-pocock-skills'
import { setupPreCommit } from './skills-data/setup-pre-commit'
import { sharpEdges } from './skills-data/sharp-edges'
import { signup } from './skills-data/signup'
import { siteArchitecture } from './skills-data/site-architecture'
import { skillCreator } from './skills-data/skill-creator'
import { skillImprover } from './skills-data/skill-improver'
import { skillify } from './skills-data/skillify'
import { slackGifCreator } from './skills-data/slack-gif-creator'
import { sms } from './skills-data/sms'
import { social } from './skills-data/social'
import { softSkill } from './skills-data/soft-skill'
import { soul } from './skills-data/soul'
import { specToCodeCompliance } from './skills-data/spec-to-code-compliance'
import { sports } from './skills-data/sports'
import { staticAnalysis } from './skills-data/static-analysis'
import { staybasedColdOutreach } from './skills-data/staybased-cold-outreach'
import { stitchSkill } from './skills-data/stitch-skill'
import { strategicCompact } from './skills-data/strategic-compact'
import { superpowersBrainstorming } from './skills-data/superpowers-brainstorming'
import { superpowersDispatchingParallelAgents } from './skills-data/superpowers-dispatching-parallel-agents'
import { superpowersExecutingPlans } from './skills-data/superpowers-executing-plans'
import { superpowersFinishingADevelopmentBranch } from './skills-data/superpowers-finishing-a-development-branch'
import { superpowersReceivingCodeReview } from './skills-data/superpowers-receiving-code-review'
import { superpowersRequestingCodeReview } from './skills-data/superpowers-requesting-code-review'
import { superpowersSubagentDrivenDevelopment } from './skills-data/superpowers-subagent-driven-development'
import { superpowersSystematicDebugging } from './skills-data/superpowers-systematic-debugging'
import { superpowersTestDrivenDevelopment } from './skills-data/superpowers-test-driven-development'
import { superpowersUsingGitWorktrees } from './skills-data/superpowers-using-git-worktrees'
import { superpowersUsingSuperpowers } from './skills-data/superpowers-using-superpowers'
import { superpowersVerificationBeforeCompletion } from './skills-data/superpowers-verification-before-completion'
import { superpowersWritingPlans } from './skills-data/superpowers-writing-plans'
import { superpowersWritingSkills } from './skills-data/superpowers-writing-skills'
import { supplyChainRiskAuditor } from './skills-data/supply-chain-risk-auditor'
import { tasteSkill } from './skills-data/taste-skill'
import { tasteSkillV1 } from './skills-data/taste-skill-v1'
import { tdd } from './skills-data/tdd'
import { tddWorkflow } from './skills-data/tdd-workflow'
import { teach } from './skills-data/teach'
import { testingHandbookSkills } from './skills-data/testing-handbook-skills'
import { themeFactory } from './skills-data/theme-factory'
import { toIssues } from './skills-data/to-issues'
import { toPrd } from './skills-data/to-prd'
import { trailmark } from './skills-data/trailmark'
import { trendjackingLinkedin } from './skills-data/trendjacking-linkedin'
import { triage } from './skills-data/triage'
import { utilities } from './skills-data/utilities'
import { validateIdea } from './skills-data/validate-idea'
import { variantAnalysis } from './skills-data/variant-analysis'
import { verificationLoop } from './skills-data/verification-loop'
import { video } from './skills-data/video'
import { videoEditing } from './skills-data/video-editing'
import { wazaCheck } from './skills-data/waza-check'
import { wazaDesign } from './skills-data/waza-design'
import { wazaHealth } from './skills-data/waza-health'
import { wazaHunt } from './skills-data/waza-hunt'
import { wazaLearn } from './skills-data/waza-learn'
import { wazaRead } from './skills-data/waza-read'
import { wazaThink } from './skills-data/waza-think'
import { wazaWrite } from './skills-data/waza-write'
import { webArtifactsBuilder } from './skills-data/web-artifacts-builder'
import { webData } from './skills-data/web-data'
import { webDevelopment } from './skills-data/web-development'
import { webappTesting } from './skills-data/webapp-testing'
import { wells1137YtVideoDownloader } from './skills-data/wells1137-yt-video-downloader'
import { whitePageEmpire } from './skills-data/white-page-empire'
import { wmantlyPorkbunSkill } from './skills-data/wmantly-porkbun-skill'
import { workflowAutomation } from './skills-data/workflow-automation'
import { workflowSkillDesign } from './skills-data/workflow-skill-design'
import { writeASkill } from './skills-data/write-a-skill'
import { writingBeats } from './skills-data/writing-beats'
import { writingFragments } from './skills-data/writing-fragments'
import { writingShape } from './skills-data/writing-shape'
import { xAlgo } from './skills-data/x-algo'
import { xApi } from './skills-data/x-api'
import { xBookmarks } from './skills-data/x-bookmarks'
import { xlsx } from './skills-data/xlsx'
import { yaraAuthoring } from './skills-data/yara-authoring'
import { zeroizeAudit } from './skills-data/zeroize-audit'
import { zoomOut } from './skills-data/zoom-out'

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
  useCases?: string[]
  exampleUsage?: string
  screenshots?: {
    title: string
    items: { name: string; url: string }[]
  }[]
}

export const SKILLS: SkillListing[] = [
  abTesting,
  adCreative,
  ads,
  agentIntrospectionDebugging,
  agentSort,
  agenticActionsAuditor,
  aiMaestro,
  aiResearch,
  aiSeo,
  aiasisbot614chanReader,
  algorithmicArt,
  analytics,
  apiDesign,
  articleWriting,
  askQuestionsIfUnderspecified,
  aso,
  auditContextBuilding,
  backendPatterns,
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
  beautifulHtmlTemplates,
  brandGuidelines,
  brandStrategy,
  brandVoice,
  brandkit,
  brutalistSkill,
  buildingSecureContracts,
  bunRuntime,
  burpsuiteProjectParser,
  businessMarketing,
  cReview,
  canvasDesign,
  career,
  caveman,
  churnPrevention,
  claudeApi,
  claudeDesign,
  claudeInChromeTroubleshooting,
  cloneWritingStyle,
  coMarketing,
  codebaseToCourse,
  codingStandards,
  coldEmail,
  communityMarketing,
  companyValues,
  competitorProfiling,
  competitors,
  constantTimeAnalysis,
  contentEngine,
  contentStrategy,
  copyEditing,
  copywriting,
  creativeDesign,
  cro,
  crosspost,
  cultureIndex,
  customerResearch,
  database,
  debugButtercup,
  designToCode,
  devcontainerSetup,
  development,
  diagnose,
  differentialReview,
  dimensionalAnalysis,
  dimitryvinVideoDl,
  directorySubmissions,
  distillMe,
  dmuxWorkflows,
  docCoauthoring,
  documentProcessing,
  documentationLookup,
  docx,
  dwarfExpert,
  e2eTesting,
  eccDeepResearch,
  editArticle,
  emails,
  enterpriseCommunication,
  entryPointAnalyzer,
  evalHarness,
  everythingClaudeCode,
  exaSearch,
  facelessPageAnonymity,
  falAiMedia,
  feydefiGeoAuditOptimizer,
  findCommunity,
  firebaseApkScanner,
  firstCustomers,
  followBuilders,
  fpCheck,
  freeTools,
  frontendDesign,
  frontendPatterns,
  frontendSlides,
  ghCli,
  git,
  gitCleanup,
  gitGuardrailsClaudeCode,
  gmodAddonMaker,
  gptTasteskill,
  grillMe,
  grillWithDocs,
  growSustainably,
  handoff,
  image,
  imageToCodeSkill,
  imagegenFrontendMobile,
  imagegenFrontendWeb,
  improveCodebaseArchitecture,
  insecureDefaults,
  internalComms,
  investorMaterials,
  investorOutreach,
  jackfriksB2cMarketing,
  launch,
  leadMagnets,
  letFateDecide,
  leverbrain,
  linkedinB2bFunnel,
  linkedinOpportunity,
  lockIn,
  marketResearch,
  marketing,
  marketingIdeas,
  marketingPlan,
  marketingPsychology,
  mcpBuilder,
  mcpServerPatterns,
  media,
  microNicheYoutube,
  migrateToShoehorn,
  minimalistReview,
  minimalistSkill,
  mleWorkflow,
  modernPython,
  mutationTesting,
  mvp,
  nextjsTurbopack,
  nutrition,
  obsidianVault,
  onboarding,
  ouroAutopilot,
  ouroBookFetch,
  ouroDesign,
  ouroDragonHunt,
  ouroFrontendDesign,
  ouroFullSystemsAudit,
  ouroInchWorm,
  ouroSeoTitles,
  ouroSkillManagement,
  ouroStayInTurn,
  ouroVideoEditing,
  ouroWordDocs,
  ouroWorkDoer,
  ouroWorkIdeator,
  ouroWorkMerger,
  ouroWorkPlanner,
  ouroWorkbenchOperator,
  outboundEcosystem,
  outputSkill,
  paywalls,
  pdf,
  pocketbase,
  popups,
  pptx,
  pricing,
  processize,
  productCapability,
  productMarketing,
  productivity,
  programmaticSeo,
  propertyBasedTesting,
  prospecting,
  prototype,
  railway,
  redditMrrPlaybook,
  redesignSkill,
  referrals,
  review,
  revops,
  ryudi84SovereignBrandVoiceWriter,
  salesEnablement,
  scaffoldExercises,
  schema,
  scientific,
  seatbeltSandboxer,
  secondOpinion,
  security,
  securityReview,
  semgrepRuleCreator,
  semgrepRuleVariantCreator,
  sentry,
  seoAudit,
  setupMattPocockSkills,
  setupPreCommit,
  sharpEdges,
  signup,
  siteArchitecture,
  skillCreator,
  skillImprover,
  skillify,
  slackGifCreator,
  sms,
  social,
  softSkill,
  soul,
  specToCodeCompliance,
  sports,
  staticAnalysis,
  staybasedColdOutreach,
  stitchSkill,
  strategicCompact,
  superpowersBrainstorming,
  superpowersDispatchingParallelAgents,
  superpowersExecutingPlans,
  superpowersFinishingADevelopmentBranch,
  superpowersReceivingCodeReview,
  superpowersRequestingCodeReview,
  superpowersSubagentDrivenDevelopment,
  superpowersSystematicDebugging,
  superpowersTestDrivenDevelopment,
  superpowersUsingGitWorktrees,
  superpowersUsingSuperpowers,
  superpowersVerificationBeforeCompletion,
  superpowersWritingPlans,
  superpowersWritingSkills,
  supplyChainRiskAuditor,
  tasteSkill,
  tasteSkillV1,
  tdd,
  tddWorkflow,
  teach,
  testingHandbookSkills,
  themeFactory,
  toIssues,
  toPrd,
  trailmark,
  trendjackingLinkedin,
  triage,
  utilities,
  validateIdea,
  variantAnalysis,
  verificationLoop,
  video,
  videoEditing,
  wazaCheck,
  wazaDesign,
  wazaHealth,
  wazaHunt,
  wazaLearn,
  wazaRead,
  wazaThink,
  wazaWrite,
  webArtifactsBuilder,
  webData,
  webDevelopment,
  webappTesting,
  wells1137YtVideoDownloader,
  whitePageEmpire,
  wmantlyPorkbunSkill,
  workflowAutomation,
  workflowSkillDesign,
  writeASkill,
  writingBeats,
  writingFragments,
  writingShape,
  xAlgo,
  xApi,
  xBookmarks,
  xlsx,
  yaraAuthoring,
  zeroizeAudit,
  zoomOut
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
