import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  skills: defineTable({
    skillId: v.string(),           // unique ID
    author: v.string(),            // creator handle
    slug: v.string(),              // URL slug
    name: v.string(),
    tagline: v.string(),
    description: v.string(),
    readme: v.optional(v.string()),
    whenToUse: v.optional(v.string()),
    price: v.string(),             // display string e.g. "$4.99" or "Free"
    priceUsdc: v.number(),         // float USDC amount, 0 = free
    category: v.string(),          // "skill" | "strategy" | "blueprint"
    tags: v.array(v.string()),
    stars: v.optional(v.number()),
    weeklyInstalls: v.optional(v.number()),
    totalPurchases: v.optional(v.number()),
    featured: v.optional(v.boolean()),
    creatorWallet: v.optional(v.string()),
    onChainPubkey: v.optional(v.string()),
    fileUrl: v.optional(v.string()),
    previewHtml: v.optional(v.string()),
    overviewHtml: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    createdAt: v.optional(v.string()),
    isPrivate: v.optional(v.boolean()),
    useCases: v.optional(v.array(v.string())),
    exampleUsage: v.optional(v.string()),
    isSeeded: v.optional(v.boolean()),
  })
    .index("by_skill_id", ["skillId"])
    .index("by_author", ["author"])
    .index("by_author_slug", ["author", "slug"])
    .index("by_category", ["category"])
    .index("by_creator_wallet", ["creatorWallet"])
    .index("by_is_seeded", ["isSeeded"]),

  purchases: defineTable({
    skillId: v.string(),
    buyerWallet: v.string(),
    txSignature: v.string(),
    pdaAddress: v.string(),
    creatorWallet: v.optional(v.string()),
    treasuryWallet: v.optional(v.string()),
    priceLamports: v.optional(v.number()),
    purchasedAt: v.optional(v.number()),
  })
    .index("by_buyer", ["buyerWallet"])
    .index("by_skill", ["skillId"])
    .index("by_buyer_skill", ["buyerWallet", "skillId"])
    .index("by_signature", ["txSignature"]),

  savedSkills: defineTable({
    walletAddress: v.string(),     // Solana public key
    skillId: v.string(),           // skill ID being saved
    skillAuthor: v.string(),
    skillSlug: v.string(),
    skillName: v.string(),
    skillCategory: v.string(),
    savedAt: v.optional(v.number()),
  })
    .index("by_wallet", ["walletAddress"])
    .index("by_wallet_skill", ["walletAddress", "skillId"]),

  profiles: defineTable({
    walletAddress: v.string(),     // Solana public key
    handle: v.optional(v.string()),// @handle chosen by user
    displayName: v.optional(v.string()),
    bio: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    website: v.optional(v.string()),
    twitter: v.optional(v.string()),
    createdAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
  })
    .index("by_wallet", ["walletAddress"])
    .index("by_handle", ["handle"]),

  configs: defineTable({
    walletAddress: v.string(),
    name: v.string(),
    skills: v.array(v.object({
      id: v.string(),
      author: v.string(),
      slug: v.string(),
      name: v.string(),
    })),
    createdAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
  })
    .index("by_wallet", ["walletAddress"])
    .index("by_wallet_name", ["walletAddress", "name"]),
});
