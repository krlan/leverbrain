import { SKILLS, type SkillCategory, type SkillListing } from '@/lib/skills-data'

interface ConvexSkillRecord {
  skillId: string
  author: string
  slug: string
  name: string
  tagline: string
  description: string
  readme?: string | null
  whenToUse?: string | null
  price: string
  priceUsdc: number
  category: string
  tags: string[]
  stars?: number | null
  weeklyInstalls?: number | null
  totalPurchases?: number | null
  featured?: boolean | null
  createdAt?: string | null
  creatorWallet?: string | null
  fileUrl?: string | null
}

export function mergeSkillPool(convexSkills?: ConvexSkillRecord[] | null): SkillListing[] {
  const DELETED_SKILLS = new Set([
    'baoyu/baoyu-danger-gemini-web',
    'baoyu/baoyu-electron-extract',
    'baoyu/baoyu-image-gen',
    'baoyu/baoyu-post-to-wechat',
    'baoyu/baoyu-post-to-weibo',
    'baoyu/baoyu-translate',
    'baoyu/baoyu-wechat-summary',
    'ourostack/skill-management',
    'ourostack/word-docs',
    'ourostack/workbench-operator',
    'anthropics/doc-coauthoring',
    'anthropics/docx',
    'anthropics/claude-api',
    'anthropics/pdf',
    'anthropics/pptx',
    'anthropics/xlsx'
  ])

  const sourceSkills = convexSkills ?? []

  const mappedConvex: SkillListing[] = sourceSkills
    .filter((skill) => {
      const author = skill.author.toLowerCase()
      const slug = skill.slug.toLowerCase()
      if (author === 'trailofbits') return false
      const key = `${author}/${slug}`
      if (DELETED_SKILLS.has(key)) return false
      return true
    })
    .map((skill) => ({
      id: skill.skillId,
      author: skill.author,
      slug: skill.slug,
      name: skill.name,
      tagline: skill.tagline,
      description: skill.description,
      readme: skill.readme ?? '',
      whenToUse: skill.whenToUse ?? '',
      price: skill.price,
      priceUsdc: skill.priceUsdc,
      category: skill.category as SkillCategory,
      tags: skill.tags,
      stars: skill.stars ?? 0,
      weeklyInstalls: skill.weeklyInstalls ?? 0,
      totalPurchases: skill.totalPurchases ?? 0,
      featured: skill.featured ?? false,
      createdAt: skill.createdAt ?? '',
      creatorWallet: skill.creatorWallet ?? undefined,
      fileUrl: skill.fileUrl ?? undefined,
    }))

  const byAuthorSlug = new Map<string, SkillListing>(
    mappedConvex.map((skill) => [`${skill.author}/${skill.slug}`, skill] as const)
  )

  for (const fallbackSkill of SKILLS) {
    const key = `${fallbackSkill.author}/${fallbackSkill.slug}`
    const author = fallbackSkill.author.toLowerCase()
    const slug = fallbackSkill.slug.toLowerCase()
    if (author === 'trailofbits') continue
    if (DELETED_SKILLS.has(`${author}/${slug}`)) continue

    if (!byAuthorSlug.has(key)) {
      byAuthorSlug.set(key, fallbackSkill)
    }
  }

  return Array.from(byAuthorSlug.values())
}
