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
  if (!convexSkills) {
    return SKILLS
  }

  const mappedConvex: SkillListing[] = convexSkills.map((skill) => ({
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
    if (!byAuthorSlug.has(key)) {
      byAuthorSlug.set(key, fallbackSkill)
    }
  }

  return Array.from(byAuthorSlug.values())
}
