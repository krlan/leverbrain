// Shared skills data — used by both skills list page and detail pages.
// Source of truth while we wire Convex. IDs match Convex DB slugs.

import { abTesting } from './skills-data/ab-testing'
import { adCreative } from './skills-data/ad-creative'
import { ads } from './skills-data/ads'
import { agentIntrospectionDebugging } from './skills-data/agent-introspection-debugging'
import { agentSort } from './skills-data/agent-sort'
import { aiMaestro } from './skills-data/ai-maestro'
import { aiResearch } from './skills-data/ai-research'
import { aiSeo } from './skills-data/ai-seo'
import { aiasisbot614chanReader } from './skills-data/aiasisbot61-4chan-reader'
import { algorithmicArt } from './skills-data/algorithmic-art'
import { analytics } from './skills-data/analytics'
import { angleGenerator } from './skills-data/angle-generator'
import { apiDesign } from './skills-data/api-design'
import { appleDesign } from './skills-data/apple-design'
import { articleWriting } from './skills-data/article-writing'
import { aso } from './skills-data/aso'
import { awwwardsHero } from './skills-data/awwwards-hero'
import { awwwardsMotion } from './skills-data/awwwards-motion'
import { backendPatterns } from './skills-data/backend-patterns'
import { baoyuArticleIllustrator } from './skills-data/baoyu-article-illustrator'
import { baoyuComic } from './skills-data/baoyu-comic'
import { baoyuCompressImage } from './skills-data/baoyu-compress-image'
import { baoyuCoverImage } from './skills-data/baoyu-cover-image'
import { baoyuDangerXToMarkdown } from './skills-data/baoyu-danger-x-to-markdown'
import { baoyuDiagram } from './skills-data/baoyu-diagram'
import { baoyuFormatMarkdown } from './skills-data/baoyu-format-markdown'
import { baoyuInfographic } from './skills-data/baoyu-infographic'
import { baoyuMarkdownToHtml } from './skills-data/baoyu-markdown-to-html'
import { baoyuPostToX } from './skills-data/baoyu-post-to-x'
import { baoyuSlideDeck } from './skills-data/baoyu-slide-deck'
import { baoyuUrlToMarkdown } from './skills-data/baoyu-url-to-markdown'
import { baoyuXhsImages } from './skills-data/baoyu-xhs-images'
import { baoyuYoutubeTranscript } from './skills-data/baoyu-youtube-transcript'
import { beautifulHtmlTemplates } from './skills-data/beautiful-html-templates'
import { benchmarkMethodology } from './skills-data/benchmark-methodology'
import { brandDiscovery } from './skills-data/brand-discovery'
import { brandGuidelines } from './skills-data/brand-guidelines'
import { brandStrategy } from './skills-data/brand-strategy'
import { brandVoice } from './skills-data/brand-voice'
import { brandkit } from './skills-data/brandkit'
import { brutalistSkill } from './skills-data/brutalist-skill'
import { bunRuntime } from './skills-data/bun-runtime'
import { businessMarketing } from './skills-data/business-marketing'
import { canvasDesign } from './skills-data/canvas-design'
import { career } from './skills-data/career'
import { caveman } from './skills-data/caveman'
import { churnPrevention } from './skills-data/churn-prevention'
import { claudeDesign } from './skills-data/claude-design'
import { cloneWritingStyle } from './skills-data/clone-writing-style'
import { coMarketing } from './skills-data/co-marketing'
import { codebaseToCourse } from './skills-data/codebase-to-course'
import { codingStandards } from './skills-data/coding-standards'
import { coldEmail } from './skills-data/cold-email'
import { communityMarketing } from './skills-data/community-marketing'
import { companyValues } from './skills-data/company-values'
import { competitivePlatformAnalysis } from './skills-data/competitive-platform-analysis'
import { competitiveReportStructure } from './skills-data/competitive-report-structure'
import { competitorProfiling } from './skills-data/competitor-profiling'
import { competitors } from './skills-data/competitors'
import { contentEngine } from './skills-data/content-engine'
import { contentStrategy } from './skills-data/content-strategy'
import { copyEditing } from './skills-data/copy-editing'
import { copywriting } from './skills-data/copywriting'
import { coverageTracker } from './skills-data/coverage-tracker'
import { coverageTrackerSetup } from './skills-data/coverage-tracker-setup'
import { creativeDesign } from './skills-data/creative-design'
import { crisisHolding } from './skills-data/crisis-holding'
import { cro } from './skills-data/cro'
import { crosspost } from './skills-data/crosspost'
import { customerResearch } from './skills-data/customer-research'
import { database } from './skills-data/database'
import { designToCode } from './skills-data/design-to-code'
import { development } from './skills-data/development'
import { diagnose } from './skills-data/diagnose'
import { dimitryvinVideoDl } from './skills-data/dimitryvin-video-dl'
import { directorySubmissions } from './skills-data/directory-submissions'
import { distillMe } from './skills-data/distill-me'
import { dmuxWorkflows } from './skills-data/dmux-workflows'
import { documentProcessing } from './skills-data/document-processing'
import { documentationLookup } from './skills-data/documentation-lookup'
import { e2eTesting } from './skills-data/e2e-testing'
import { eccDeepResearch } from './skills-data/ecc-deep-research'
import { editArticle } from './skills-data/edit-article'
import { emails } from './skills-data/emails'
import { emilDesignEng } from './skills-data/emil-design-eng'
import { enterpriseCommunication } from './skills-data/enterprise-communication'
import { evalHarness } from './skills-data/eval-harness'
import { everythingClaudeCode } from './skills-data/everything-claude-code'
import { exaSearch } from './skills-data/exa-search'
import { factCheck } from './skills-data/fact-check'
import { falAiMedia } from './skills-data/fal-ai-media'
import { findCommunity } from './skills-data/find-community'
import { findJournalists } from './skills-data/find-journalists'
import { firstCustomers } from './skills-data/first-customers'
import { followBuilders } from './skills-data/follow-builders'
import { freeTools } from './skills-data/free-tools'
import { frontendDesign } from './skills-data/frontend-design'
import { frontendPatterns } from './skills-data/frontend-patterns'
import { frontendSlides } from './skills-data/frontend-slides'
import { git } from './skills-data/git'
import { gitGuardrailsClaudeCode } from './skills-data/git-guardrails-claude-code'
import { gmodAddonMaker } from './skills-data/gmod-addon-maker'
import { gptTasteskill } from './skills-data/gpt-tasteskill'
import { grillMe } from './skills-data/grill-me'
import { grillWithDocs } from './skills-data/grill-with-docs'
import { growSustainably } from './skills-data/grow-sustainably'
import { handoff } from './skills-data/handoff'
import { headlineGenerator } from './skills-data/headline-generator'
import { image } from './skills-data/image'
import { imageToCodeSkill } from './skills-data/image-to-code-skill'
import { imagegenFrontend } from './skills-data/imagegen-frontend'
import { imagegenFrontendMobile } from './skills-data/imagegen-frontend-mobile'
import { imagegenFrontendWeb } from './skills-data/imagegen-frontend-web'
import { impeccable } from './skills-data/impeccable'
import { improveCodebaseArchitecture } from './skills-data/improve-codebase-architecture'
import { internalComms } from './skills-data/internal-comms'
import { investorMaterials } from './skills-data/investor-materials'
import { investorOutreach } from './skills-data/investor-outreach'
import { journalistFitCheck } from './skills-data/journalist-fit-check'
import { kami } from './skills-data/kami'
import { kkrSkillify } from './skills-data/kkr-skillify'
import { launch } from './skills-data/launch'
import { leadMagnets } from './skills-data/lead-magnets'
import { leverbrain } from './skills-data/leverbrain'
import { lockIn } from './skills-data/lock-in'
import { marketResearch } from './skills-data/market-research'
import { marketing } from './skills-data/marketing'
import { marketingIdeas } from './skills-data/marketing-ideas'
import { marketingPlan } from './skills-data/marketing-plan'
import { marketingPsychology } from './skills-data/marketing-psychology'
import { mcpBuilder } from './skills-data/mcp-builder'
import { mcpServerPatterns } from './skills-data/mcp-server-patterns'
import { meanestEditor } from './skills-data/meanest-editor'
import { media } from './skills-data/media'
import { microNicheYoutube } from './skills-data/micro-niche-youtube'
import { migrateToShoehorn } from './skills-data/migrate-to-shoehorn'
import { minimalistReview } from './skills-data/minimalist-review'
import { minimalistSkill } from './skills-data/minimalist-skill'
import { mleWorkflow } from './skills-data/mle-workflow'
import { mvanhornAgentcookie } from './skills-data/mvanhorn-agentcookie'
import { mvanhornLast30days } from './skills-data/mvanhorn-last30days'
import { mvp } from './skills-data/mvp'
import { newsSearch } from './skills-data/news-search'
import { newsjackDetector } from './skills-data/newsjack-detector'
import { newsjackMonitorSetup } from './skills-data/newsjack-monitor-setup'
import { newsjackTriage } from './skills-data/newsjack-triage'
import { newsworthinessCheck } from './skills-data/newsworthiness-check'
import { nextjsTurbopack } from './skills-data/nextjs-turbopack'
import { noMistakes } from './skills-data/no-mistakes'
import { nutrition } from './skills-data/nutrition'
import { obsidianVault } from './skills-data/obsidian-vault'
import { onboarding } from './skills-data/onboarding'
import { ouroAutopilot } from './skills-data/ouro-autopilot'
import { ouroBookFetch } from './skills-data/ouro-book-fetch'
import { ouroBuildNativeAppleApp } from './skills-data/ouro-build-native-apple-app'
import { ouroDesign } from './skills-data/ouro-design'
import { ouroDragonHunt } from './skills-data/ouro-dragon-hunt'
import { ouroFrontendDesign } from './skills-data/ouro-frontend-design'
import { ouroFullSystemsAudit } from './skills-data/ouro-full-systems-audit'
import { ouroInchWorm } from './skills-data/ouro-inch-worm'
import { ouroSeoTitles } from './skills-data/ouro-seo-titles'
import { ouroStayInTurn } from './skills-data/ouro-stay-in-turn'
import { ouroVideoEditing } from './skills-data/ouro-video-editing'
import { ouroWorkDoer } from './skills-data/ouro-work-doer'
import { ouroWorkIdeator } from './skills-data/ouro-work-ideator'
import { ouroWorkMerger } from './skills-data/ouro-work-merger'
import { ouroWorkPlanner } from './skills-data/ouro-work-planner'
import { outputSkill } from './skills-data/output-skill'
import { paywalls } from './skills-data/paywalls'
import { pixelPerfect } from './skills-data/pixel-perfect'
import { pocketbase } from './skills-data/pocketbase'
import { popups } from './skills-data/popups'
import { prStrategist } from './skills-data/pr-strategist'
import { pricing } from './skills-data/pricing'
import { processize } from './skills-data/processize'
import { productCapability } from './skills-data/product-capability'
import { productMarketing } from './skills-data/product-marketing'
import { productivity } from './skills-data/productivity'
import { programmaticSeo } from './skills-data/programmatic-seo'
import { prospecting } from './skills-data/prospecting'
import { prototype } from './skills-data/prototype'
import { qiaomuDesign } from './skills-data/qiaomu-design'
import { railway } from './skills-data/railway'
import { reactiveComment } from './skills-data/reactive-comment'
import { redesignSkill } from './skills-data/redesign-skill'
import { referrals } from './skills-data/referrals'
import { relevanceCoarseFilter } from './skills-data/relevance-coarse-filter'
import { review } from './skills-data/review'
import { revops } from './skills-data/revops'
import { salesEnablement } from './skills-data/sales-enablement'
import { scaffoldExercises } from './skills-data/scaffold-exercises'
import { schema } from './skills-data/schema'
import { scientific } from './skills-data/scientific'
import { security } from './skills-data/security'
import { securityReview } from './skills-data/security-review'
import { sentry } from './skills-data/sentry'
import { seoAudit } from './skills-data/seo-audit'
import { setupMattPocockSkills } from './skills-data/setup-matt-pocock-skills'
import { setupPreCommit } from './skills-data/setup-pre-commit'
import { signup } from './skills-data/signup'
import { siteArchitecture } from './skills-data/site-architecture'
import { skillCreator } from './skills-data/skill-creator'
import { skillify } from './skills-data/skillify'
import { slackGifCreator } from './skills-data/slack-gif-creator'
import { sms } from './skills-data/sms'
import { social } from './skills-data/social'
import { softSkill } from './skills-data/soft-skill'
import { soul } from './skills-data/soul'
import { sports } from './skills-data/sports'
import { staybasedColdOutreach } from './skills-data/staybased-cold-outreach'
import { stitchSkill } from './skills-data/stitch-skill'
import { storyOriginCheck } from './skills-data/story-origin-check'
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
import { tasteSkill } from './skills-data/taste-skill'
import { tasteSkillV1 } from './skills-data/taste-skill-v1'
import { tdd } from './skills-data/tdd'
import { tddWorkflow } from './skills-data/tdd-workflow'
import { teach } from './skills-data/teach'
import { themeFactory } from './skills-data/theme-factory'
import { toIssues } from './skills-data/to-issues'
import { toPrd } from './skills-data/to-prd'
import { triage } from './skills-data/triage'
import { uiUxProMax } from './skills-data/ui-ux-pro-max'
import { utilities } from './skills-data/utilities'
import { validateIdea } from './skills-data/validate-idea'
import { verificationLoop } from './skills-data/verification-loop'
import { video } from './skills-data/video'
import { videoEditing } from './skills-data/video-editing'
import { visualRedesign } from './skills-data/visual-redesign'
import { voiceExtractor } from './skills-data/voice-extractor'
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
import { webDesignGuidelines } from './skills-data/web-design-guidelines'
import { webDevelopment } from './skills-data/web-development'
import { webappTesting } from './skills-data/webapp-testing'
import { wells1137YtVideoDownloader } from './skills-data/wells1137-yt-video-downloader'
import { wmantlyPorkbunSkill } from './skills-data/wmantly-porkbun-skill'
import { workflowAutomation } from './skills-data/workflow-automation'
import { writeASkill } from './skills-data/write-a-skill'
import { writingBeats } from './skills-data/writing-beats'
import { writingFragments } from './skills-data/writing-fragments'
import { writingShape } from './skills-data/writing-shape'
import { xAlgo } from './skills-data/x-algo'
import { xApi } from './skills-data/x-api'
import { xBookmarks } from './skills-data/x-bookmarks'
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
  aiMaestro,
  aiResearch,
  aiSeo,
  aiasisbot614chanReader,
  algorithmicArt,
  analytics,
  angleGenerator,
  apiDesign,
  appleDesign,
  articleWriting,
  aso,
  awwwardsHero,
  awwwardsMotion,
  backendPatterns,
  baoyuArticleIllustrator,
  baoyuComic,
  baoyuCompressImage,
  baoyuCoverImage,
  baoyuDangerXToMarkdown,
  baoyuDiagram,
  baoyuFormatMarkdown,
  baoyuInfographic,
  baoyuMarkdownToHtml,
  baoyuPostToX,
  baoyuSlideDeck,
  baoyuUrlToMarkdown,
  baoyuXhsImages,
  baoyuYoutubeTranscript,
  beautifulHtmlTemplates,
  benchmarkMethodology,
  brandDiscovery,
  brandGuidelines,
  brandStrategy,
  brandVoice,
  brandkit,
  brutalistSkill,
  bunRuntime,
  businessMarketing,
  canvasDesign,
  career,
  caveman,
  churnPrevention,
  claudeDesign,
  cloneWritingStyle,
  coMarketing,
  codebaseToCourse,
  codingStandards,
  coldEmail,
  communityMarketing,
  companyValues,
  competitivePlatformAnalysis,
  competitiveReportStructure,
  competitorProfiling,
  competitors,
  contentEngine,
  contentStrategy,
  copyEditing,
  copywriting,
  coverageTracker,
  coverageTrackerSetup,
  creativeDesign,
  crisisHolding,
  cro,
  crosspost,
  customerResearch,
  database,
  designToCode,
  development,
  diagnose,
  dimitryvinVideoDl,
  directorySubmissions,
  distillMe,
  dmuxWorkflows,
  documentProcessing,
  documentationLookup,
  e2eTesting,
  eccDeepResearch,
  editArticle,
  emails,
  emilDesignEng,
  enterpriseCommunication,
  evalHarness,
  everythingClaudeCode,
  exaSearch,
  factCheck,
  falAiMedia,
  findCommunity,
  findJournalists,
  firstCustomers,
  followBuilders,
  freeTools,
  frontendDesign,
  frontendPatterns,
  frontendSlides,
  git,
  gitGuardrailsClaudeCode,
  gmodAddonMaker,
  gptTasteskill,
  grillMe,
  grillWithDocs,
  growSustainably,
  handoff,
  headlineGenerator,
  image,
  imageToCodeSkill,
  imagegenFrontend,
  imagegenFrontendMobile,
  imagegenFrontendWeb,
  impeccable,
  improveCodebaseArchitecture,
  internalComms,
  investorMaterials,
  investorOutreach,
  journalistFitCheck,
  kami,
  kkrSkillify,
  launch,
  leadMagnets,
  leverbrain,
  lockIn,
  marketResearch,
  marketing,
  marketingIdeas,
  marketingPlan,
  marketingPsychology,
  mcpBuilder,
  mcpServerPatterns,
  meanestEditor,
  media,
  microNicheYoutube,
  migrateToShoehorn,
  minimalistReview,
  minimalistSkill,
  mleWorkflow,
  mvanhornAgentcookie,
  mvanhornLast30days,
  mvp,
  newsSearch,
  newsjackDetector,
  newsjackMonitorSetup,
  newsjackTriage,
  newsworthinessCheck,
  nextjsTurbopack,
  noMistakes,
  nutrition,
  obsidianVault,
  onboarding,
  ouroAutopilot,
  ouroBookFetch,
  ouroBuildNativeAppleApp,
  ouroDesign,
  ouroDragonHunt,
  ouroFrontendDesign,
  ouroFullSystemsAudit,
  ouroInchWorm,
  ouroSeoTitles,
  ouroStayInTurn,
  ouroVideoEditing,
  ouroWorkDoer,
  ouroWorkIdeator,
  ouroWorkMerger,
  ouroWorkPlanner,
  outputSkill,
  paywalls,
  pixelPerfect,
  pocketbase,
  popups,
  prStrategist,
  pricing,
  processize,
  productCapability,
  productMarketing,
  productivity,
  programmaticSeo,
  prospecting,
  prototype,
  qiaomuDesign,
  railway,
  reactiveComment,
  redesignSkill,
  referrals,
  relevanceCoarseFilter,
  review,
  revops,
  salesEnablement,
  scaffoldExercises,
  schema,
  scientific,
  security,
  securityReview,
  sentry,
  seoAudit,
  setupMattPocockSkills,
  setupPreCommit,
  signup,
  siteArchitecture,
  skillCreator,
  skillify,
  slackGifCreator,
  sms,
  social,
  softSkill,
  soul,
  sports,
  staybasedColdOutreach,
  stitchSkill,
  storyOriginCheck,
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
  tasteSkill,
  tasteSkillV1,
  tdd,
  tddWorkflow,
  teach,
  themeFactory,
  toIssues,
  toPrd,
  triage,
  uiUxProMax,
  utilities,
  validateIdea,
  verificationLoop,
  video,
  videoEditing,
  visualRedesign,
  voiceExtractor,
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
  webDesignGuidelines,
  webDevelopment,
  webappTesting,
  wells1137YtVideoDownloader,
  wmantlyPorkbunSkill,
  workflowAutomation,
  writeASkill,
  writingBeats,
  writingFragments,
  writingShape,
  xAlgo,
  xApi,
  xBookmarks,
  zoomOut
]

export function getSkillByAuthorSlug(author: string, slug: string): SkillListing | undefined {
  return SKILLS.find((s) => s.author.toLowerCase() === author.toLowerCase() && s.slug.toLowerCase() === slug.toLowerCase())
}

export function getSkillsByAuthor(author: string): SkillListing[] {
  return SKILLS.filter((s) => s.author.toLowerCase() === author.toLowerCase())
}

export function getFeaturedSkills(): SkillListing[] {
  const targetSlugs = [
    'theme-factory',
    'baoyu-infographic',
    'distill-me',
    'grill-me',
    'handoff',
    'claude-design',
    'programmatic-seo',
    'writing-skills',
    'taste-skill',
    'x-algo'
  ]

  const featured: SkillListing[] = []
  for (const slug of targetSlugs) {
    const skill = SKILLS.find((s) => s.slug === slug)
    if (skill) {
      featured.push(skill)
    }
  }
  return featured
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
