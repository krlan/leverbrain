import axios, { AxiosInstance } from 'axios'

export type SkillCategory = 'skill' | 'strategy' | 'blueprint'

export interface LeverbrainSkill {
  skillId: string
  author: string
  slug: string
  name: string
  tagline: string
  description: string
  readme?: string
  whenToUse?: string
  price: string
  priceUsdc: number
  category: SkillCategory
  tags: string[]
  creatorWallet?: string
  stars?: number
  weeklyInstalls?: number
  totalPurchases?: number
  featured?: boolean
  createdAt?: string
  fileUrl?: string
}

export interface PublishSkillInput {
  publisherWallet: string
  skillId: string
  author: string
  slug: string
  name: string
  tagline: string
  description: string
  readme?: string
  whenToUse?: string
  priceUsdc: number
  category: SkillCategory
  tags: string[]
}

export interface PurchaseReceipt {
  _id: string
  skillId: string
  buyerWallet: string
  txSignature: string
  pdaAddress: string
  creatorWallet?: string
  treasuryWallet?: string
  priceLamports?: number
  purchasedAt?: number
  skillName?: string
  skillAuthor?: string | null
  skillSlug?: string | null
}

interface ConvexSuccess<T> {
  status: 'success'
  value: T
}

interface ConvexFailure {
  status: 'error'
  errorMessage: string
}

interface LeverbrainClientConfig {
  convexUrl?: string
  timeoutMs?: number
}

const DEFAULT_CONVEX_URL = 'https://vibrant-eagle-170.convex.cloud'

export class LeverbrainClient {
  private readonly convex: AxiosInstance

  constructor(config: LeverbrainClientConfig = {}) {
    const convexUrl = (config.convexUrl ?? DEFAULT_CONVEX_URL).replace(/\/+$/, '')
    this.convex = axios.create({
      baseURL: convexUrl,
      timeout: config.timeoutMs ?? 20_000,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  private async invoke<TResult, TArgs extends object = object>(
    endpoint: '/api/query' | '/api/mutation',
    path: string,
    args: TArgs
  ): Promise<TResult> {
    const response = await this.convex.post<ConvexSuccess<TResult> | ConvexFailure>(endpoint, {
      path,
      args,
    })

    const payload = response.data
    if (payload.status === 'error') {
      throw new Error(payload.errorMessage)
    }

    return payload.value
  }

  async listSkills(filters: { category?: string; featured?: boolean } = {}) {
    return await this.invoke<LeverbrainSkill[]>('/api/query', 'skills:listSkills', filters)
  }

  async search(query: string) {
    return await this.invoke<LeverbrainSkill[]>('/api/query', 'skills:searchSkills', {
      query,
    })
  }

  async getSkill(author: string, slug: string) {
    return await this.invoke<LeverbrainSkill | null>('/api/query', 'skills:getSkillByAuthorSlug', {
      author,
      slug,
    })
  }

  async publishSkill(input: PublishSkillInput) {
    return await this.invoke<{ skillId: string; author: string; slug: string }>(
      '/api/mutation',
      'skills:publishSkill',
      input
    )
  }

  async getPurchasesByBuyer(buyerWallet: string) {
    return await this.invoke<PurchaseReceipt[]>('/api/query', 'skills:getPurchasesByBuyer', {
      buyerWallet,
    })
  }

  async getConfig(handle: string, name: string) {
    return await this.invoke<{
      walletAddress: string
      name: string
      skills: Array<{ id: string; author: string; slug: string; name: string }>
    } | null>('/api/query', 'skills:getConfigByHandleAndName', {
      handle,
      name,
    })
  }

  async saveConfig(
    walletAddress: string,
    name: string,
    skills: Array<{ id: string; author: string; slug: string; name: string }>
  ) {
    return await this.invoke<string>('/api/mutation', 'skills:saveConfig', {
      walletAddress,
      name,
      skills,
    })
  }
}

