import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/* ─────────────────────────────────────────────
   Skills — queries
   ───────────────────────────────────────────── */

export const listSkills = query({
  args: {
    category: v.optional(v.string()),
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    let skills;
    if (args.category) {
      skills = await ctx.db
        .query("skills")
        .withIndex("by_category", (q) => q.eq("category", args.category!))
        .collect();
    } else {
      skills = await ctx.db.query("skills").collect();
    }
    if (args.featured) {
      skills = skills.filter((s) => s.featured === true);
    }
    return skills.filter((s) => s.isPrivate !== true);
  },
});

export const getSkillByAuthorSlug = query({
  args: {
    author: v.string(),
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("skills")
      .withIndex("by_author_slug", (q) =>
        q.eq("author", args.author).eq("slug", args.slug)
      )
      .first();
  },
});

export const searchSkills = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    const q = args.query.toLowerCase().trim();
    if (!q) return [];
    const all = await ctx.db.query("skills").collect();
    return all.filter(
      (s) =>
        s.isPrivate !== true &&
        (s.name.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q)) ||
        s.author.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q))
    );
  },
});

export const getSkillsByAuthor = query({
  args: { author: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("skills")
      .withIndex("by_author", (q) => q.eq("author", args.author))
      .collect();
  },
});

/* ─────────────────────────────────────────────
   Skills — mutations
   ───────────────────────────────────────────── */

export const upsertSkill = mutation({
  args: {
    skillId: v.string(),
    author: v.string(),
    slug: v.string(),
    name: v.string(),
    tagline: v.string(),
    description: v.string(),
    readme: v.optional(v.string()),
    whenToUse: v.optional(v.string()),
    price: v.string(),
    priceUsdc: v.number(),
    category: v.string(),
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
    useCases: v.optional(v.array(v.string())),
    exampleUsage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("skills")
      .withIndex("by_author_slug", (q) =>
        q.eq("author", args.author).eq("slug", args.slug)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, args);
      return existing._id;
    }
    return await ctx.db.insert("skills", args);
  },
});

export const publishSkill = mutation({
  args: {
    publisherWallet: v.string(),
    skillId: v.string(),
    author: v.string(),
    slug: v.string(),
    name: v.string(),
    tagline: v.string(),
    description: v.string(),
    readme: v.optional(v.string()),
    whenToUse: v.optional(v.string()),
    priceUsdc: v.number(),
    category: v.union(v.literal("skill"), v.literal("strategy"), v.literal("blueprint")),
    tags: v.array(v.string()),
    previewHtml: v.optional(v.string()),
    overviewHtml: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    fileUrl: v.optional(v.string()),
    isPrivate: v.optional(v.boolean()),
    useCases: v.optional(v.array(v.string())),
    exampleUsage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const author = args.author.trim().toLowerCase();
    const slug = args.slug.trim().toLowerCase();
    if (!author) {
      throw new Error("Author is required");
    }
    if (!slug) {
      throw new Error("Slug is required");
    }
    if (!args.name.trim()) {
      throw new Error("Name is required");
    }
    if (!args.tagline.trim()) {
      throw new Error("Tagline is required");
    }
    if (!args.description.trim()) {
      throw new Error("Description is required");
    }
    if (args.priceUsdc < 0) {
      throw new Error("Price must be positive");
    }

    const existing = await ctx.db
      .query("skills")
      .withIndex("by_author_slug", (q) => q.eq("author", author).eq("slug", slug))
      .first();

    if (existing?.creatorWallet && existing.creatorWallet !== args.publisherWallet) {
      throw new Error("Only the current publisher wallet can edit this listing");
    }

    const nowIso = new Date().toISOString().slice(0, 10);
    const cleanTags = Array.from(
      new Set(
        args.tags
          .map((tag) => tag.trim().toLowerCase())
          .filter(Boolean)
      )
    );
    const normalizedPriceUsdc = Number(args.priceUsdc.toFixed(2));
    const payload = {
      skillId: args.skillId.trim() || slug,
      author,
      slug,
      name: args.name.trim(),
      tagline: args.tagline.trim(),
      description: args.description.trim(),
      readme: args.readme?.trim() || undefined,
      whenToUse: args.whenToUse?.trim() || undefined,
      priceUsdc: normalizedPriceUsdc,
      price: normalizedPriceUsdc === 0 ? "Free" : `$${normalizedPriceUsdc.toFixed(2)}`,
      category: args.category,
      tags: cleanTags,
      previewHtml: args.previewHtml?.trim() || undefined,
      overviewHtml: args.overviewHtml?.trim() || undefined,
      imageUrl: args.imageUrl?.trim() || undefined,
      fileUrl: args.fileUrl?.trim() || undefined,
      creatorWallet: existing?.creatorWallet ?? args.publisherWallet,
      stars: existing?.stars ?? 0,
      weeklyInstalls: existing?.weeklyInstalls ?? 0,
      totalPurchases: existing?.totalPurchases ?? 0,
      featured: existing?.featured ?? false,
      createdAt: existing?.createdAt ?? nowIso,
      isPrivate: args.isPrivate ?? false,
      useCases: args.useCases,
      exampleUsage: args.exampleUsage,
    };

    if (existing) {
      await ctx.db.patch(existing._id, payload);
      return {
        skillId: payload.skillId,
        author: payload.author,
        slug: payload.slug,
      };
    }

    await ctx.db.insert("skills", payload);
    return {
      skillId: payload.skillId,
      author: payload.author,
      slug: payload.slug,
    };
  },
});

export const recordPurchase = mutation({
  args: {
    skillId: v.string(),
    buyerWallet: v.string(),
    txSignature: v.string(),
    pdaAddress: v.string(),
    creatorWallet: v.optional(v.string()),
    treasuryWallet: v.optional(v.string()),
    priceLamports: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const existingByBuyerSkill = await ctx.db
      .query("purchases")
      .withIndex("by_buyer_skill", (q) =>
        q.eq("buyerWallet", args.buyerWallet).eq("skillId", args.skillId)
      )
      .first();

    if (existingByBuyerSkill) {
      await ctx.db.patch(existingByBuyerSkill._id, {
        ...args,
        purchasedAt: existingByBuyerSkill.purchasedAt ?? Date.now(),
      });
      return existingByBuyerSkill._id;
    }

    if (args.txSignature !== "free_skill") {
      const existingBySignature = await ctx.db
        .query("purchases")
        .withIndex("by_signature", (q) => q.eq("txSignature", args.txSignature))
        .first();

      if (existingBySignature) {
        await ctx.db.patch(existingBySignature._id, {
          ...args,
          purchasedAt: existingBySignature.purchasedAt ?? Date.now(),
        });
        return existingBySignature._id;
      }
    }

    const id = await ctx.db.insert("purchases", {
      ...args,
      purchasedAt: Date.now(),
    });
    // Increment totalPurchases counter on the skill
    const skill = await ctx.db
      .query("skills")
      .filter((q) => q.eq(q.field("skillId"), args.skillId))
      .first();
    if (skill) {
      await ctx.db.patch(skill._id, {
        totalPurchases: (skill.totalPurchases ?? 0) + 1,
      });
    }
    return id;
  },
});

export const checkPurchase = query({
  args: {
    skillId: v.string(),
    buyerWallet: v.string(),
  },
  handler: async (ctx, args) => {
    const purchase = await ctx.db
      .query("purchases")
      .withIndex("by_buyer_skill", (q) =>
        q.eq("buyerWallet", args.buyerWallet).eq("skillId", args.skillId)
      )
      .first();
    return purchase ?? null;
  },
});

export const getPurchasesByBuyer = query({
  args: { buyerWallet: v.string() },
  handler: async (ctx, args) => {
    const purchases = await ctx.db
      .query("purchases")
      .withIndex("by_buyer", (q) => q.eq("buyerWallet", args.buyerWallet))
      .collect();

    const withSkillMetadata = await Promise.all(
      purchases.map(async (purchase) => {
        const skill = await ctx.db
          .query("skills")
          .filter((q) => q.eq(q.field("skillId"), purchase.skillId))
          .first();

        return {
          ...purchase,
          skillName: skill?.name ?? purchase.skillId,
          skillAuthor: skill?.author ?? null,
          skillSlug: skill?.slug ?? null,
        };
      })
    );

    return withSkillMetadata.sort(
      (a, b) => (b.purchasedAt ?? 0) - (a.purchasedAt ?? 0)
    );
  },
});

export const getSkillsByCreatorWallet = query({
  args: { creatorWallet: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("skills")
      .withIndex("by_creator_wallet", (q) =>
        q.eq("creatorWallet", args.creatorWallet)
      )
      .collect();
  },
});

export const setCreatorWalletForPaidSkills = mutation({
  args: {
    creatorWallet: v.string(),
  },
  handler: async (ctx, args) => {
    const skills = await ctx.db.query("skills").collect();
    const paidSkills = skills.filter((skill) => skill.priceUsdc > 0);

    for (const skill of paidSkills) {
      await ctx.db.patch(skill._id, {
        creatorWallet: args.creatorWallet,
      });
    }

    return {
      updated: paidSkills.length,
      creatorWallet: args.creatorWallet,
    };
  },
});

/* ─────────────────────────────────────────────
   Profiles — queries
   ───────────────────────────────────────────── */

export const getProfile = query({
  args: { walletAddress: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("profiles")
      .withIndex("by_wallet", (q) => q.eq("walletAddress", args.walletAddress))
      .first();
  },
});

export const getProfileByHandle = query({
  args: { handle: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("profiles")
      .withIndex("by_handle", (q) => q.eq("handle", args.handle))
      .first();
  },
});

/* ─────────────────────────────────────────────
   Profiles — mutations
   ───────────────────────────────────────────── */

export const upsertProfile = mutation({
  args: {
    walletAddress: v.string(),
    handle: v.optional(v.string()),
    displayName: v.optional(v.string()),
    bio: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    website: v.optional(v.string()),
    twitter: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check handle uniqueness
    if (args.handle) {
      const existing = await ctx.db
        .query("profiles")
        .withIndex("by_handle", (q) => q.eq("handle", args.handle!))
        .first();
      if (existing && existing.walletAddress !== args.walletAddress) {
        throw new Error(`Handle @${args.handle} is already taken`);
      }
    }

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_wallet", (q) => q.eq("walletAddress", args.walletAddress))
      .first();

    if (profile) {
      await ctx.db.patch(profile._id, {
        ...args,
        updatedAt: Date.now(),
      });
      return profile._id;
    }

    return await ctx.db.insert("profiles", {
      ...args,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

/* ─────────────────────────────────────────────
   Saved Skills — queries & mutations
   ───────────────────────────────────────────── */

export const getSavedSkills = query({
  args: { walletAddress: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("savedSkills")
      .withIndex("by_wallet", (q) => q.eq("walletAddress", args.walletAddress))
      .collect();
  },
});

export const isSkillSaved = query({
  args: { walletAddress: v.string(), skillId: v.string() },
  handler: async (ctx, args) => {
    const entry = await ctx.db
      .query("savedSkills")
      .withIndex("by_wallet_skill", (q) =>
        q.eq("walletAddress", args.walletAddress).eq("skillId", args.skillId)
      )
      .first();
    return entry !== null;
  },
});

export const toggleSavedSkill = mutation({
  args: {
    walletAddress: v.string(),
    skillId: v.string(),
    skillAuthor: v.string(),
    skillSlug: v.string(),
    skillName: v.string(),
    skillCategory: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("savedSkills")
      .withIndex("by_wallet_skill", (q) =>
        q.eq("walletAddress", args.walletAddress).eq("skillId", args.skillId)
      )
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
      return { saved: false };
    }

    await ctx.db.insert("savedSkills", {
      ...args,
      savedAt: Date.now(),
    });
    return { saved: true };
  },
});

/* ─────────────────────────────────────────────
   Configurations — queries & mutations
   ───────────────────────────────────────────── */

export const saveConfig = mutation({
  args: {
    walletAddress: v.string(),
    name: v.string(),
    skills: v.array(v.object({
      id: v.string(),
      author: v.string(),
      slug: v.string(),
      name: v.string(),
    })),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("configs")
      .withIndex("by_wallet_name", (q) =>
        q.eq("walletAddress", args.walletAddress).eq("name", args.name)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        skills: args.skills,
        updatedAt: Date.now(),
      });
      return existing._id;
    }

    return await ctx.db.insert("configs", {
      walletAddress: args.walletAddress,
      name: args.name,
      skills: args.skills,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const getConfigByWalletAndName = query({
  args: { walletAddress: v.string(), name: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("configs")
      .withIndex("by_wallet_name", (q) =>
        q.eq("walletAddress", args.walletAddress).eq("name", args.name)
      )
      .first();
  },
});

export const getConfigsByWallet = query({
  args: { walletAddress: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("configs")
      .withIndex("by_wallet", (q) => q.eq("walletAddress", args.walletAddress))
      .collect();
  },
});

export const getConfigByHandleAndName = query({
  args: { handle: v.string(), name: v.string() },
  handler: async (ctx, args) => {
    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_handle", (q) => q.eq("handle", args.handle))
      .first();

    if (!profile) return null;

    return await ctx.db
      .query("configs")
      .withIndex("by_wallet_name", (q) =>
        q.eq("walletAddress", profile.walletAddress).eq("name", args.name)
      )
      .first();
  },
});

export const deleteConfig = mutation({
  args: { walletAddress: v.string(), name: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("configs")
      .withIndex("by_wallet_name", (q) =>
        q.eq("walletAddress", args.walletAddress).eq("name", args.name)
      )
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
      return true;
    }
    return false;
  },
});

export const deleteSkillByAuthorSlug = mutation({
  args: { author: v.string(), slug: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("skills")
      .withIndex("by_author_slug", (q) => q.eq("author", args.author).eq("slug", args.slug))
      .first();
    if (existing) {
      await ctx.db.delete(existing._id);
      return true;
    }
    return false;
  }
});
