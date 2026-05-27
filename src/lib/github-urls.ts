export interface GitHubRepoDetails {
  owner: string
  repo: string
  path: string
  branch: string
}

export function parseGitHubUrl(url: string): GitHubRepoDetails | null {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)(?:\/(?:tree|blob)\/([^/]+)\/(.+))?/)
  if (!match) return null
  return {
    owner: match[1],
    repo: match[2],
    branch: match[3] || 'main',
    path: match[4] || '',
  }
}

export function resolveRepoUrl(author: string, slug: string, fileUrl?: string): string {
  if (fileUrl) return fileUrl
  const normAuthor = author.toLowerCase()
  if (normAuthor === 'anthropics') {
    return `https://github.com/anthropics/skills/tree/main/skills/${slug}`
  }
  if (normAuthor === 'composiohq' || normAuthor === 'composio') {
    return `https://github.com/composiohq/skills/tree/main/skills/${slug}`
  }
  if (normAuthor === '199-biotechnologies') {
    return `https://github.com/199-biotechnologies/skills/tree/main/skills/${slug}`
  }
  if (normAuthor === 'baoyu' || normAuthor === 'jimliu') {
    return `https://github.com/JimLiu/baoyu-skills/tree/main/skills/${slug}`
  }
  return `https://github.com/leverbrain/leverbrain/tree/main/skills/${slug}`
}

export function resolveFileRawUrl(author: string, slug: string, filename: string, fileUrl?: string): string {
  if (fileUrl) {
    const details = parseGitHubUrl(fileUrl)
    if (details) {
      return `https://raw.githubusercontent.com/${details.owner}/${details.repo}/${details.branch}/${details.path}/${filename}`
    }
  }
  const normAuthor = author.toLowerCase()
  if (normAuthor === 'anthropics') {
    return `https://raw.githubusercontent.com/anthropics/skills/main/skills/${slug}/${filename}`
  }
  if (normAuthor === 'composiohq' || normAuthor === 'composio') {
    return `https://raw.githubusercontent.com/composiohq/skills/main/skills/${slug}/${filename}`
  }
  if (normAuthor === '199-biotechnologies') {
    return `https://raw.githubusercontent.com/199-biotechnologies/skills/main/skills/${filename}`
  }
  if (normAuthor === 'baoyu' || normAuthor === 'jimliu') {
    return `https://raw.githubusercontent.com/JimLiu/baoyu-skills/main/skills/${slug}/${filename}`
  }
  return `https://raw.githubusercontent.com/leverbrain/leverbrain/main/skills/${slug}/${filename}`
}

export function resolveFileBlobUrl(author: string, slug: string, filename: string, fileUrl?: string): string {
  if (fileUrl) {
    const details = parseGitHubUrl(fileUrl)
    if (details) {
      return `https://github.com/${details.owner}/${details.repo}/blob/${details.branch}/${details.path}/${filename}`
    }
  }
  const normAuthor = author.toLowerCase()
  if (normAuthor === 'anthropics') {
    return `https://github.com/anthropics/skills/blob/main/skills/${slug}/${filename}`
  }
  if (normAuthor === 'composiohq' || normAuthor === 'composio') {
    return `https://github.com/composiohq/skills/blob/main/skills/${slug}/${filename}`
  }
  if (normAuthor === '199-biotechnologies') {
    return `https://github.com/199-biotechnologies/skills/blob/main/skills/${slug}/${filename}`
  }
  if (normAuthor === 'baoyu' || normAuthor === 'jimliu') {
    return `https://github.com/JimLiu/baoyu-skills/blob/main/skills/${slug}/${filename}`
  }
  return `https://github.com/leverbrain/leverbrain/blob/main/skills/${slug}/${filename}`
}

export function getGitHubRepoDetails(author: string, slug: string, fileUrl?: string): GitHubRepoDetails {
  if (fileUrl) {
    const details = parseGitHubUrl(fileUrl)
    if (details) return details
  }
  const normAuthor = author.toLowerCase()
  let owner = 'leverbrain'
  let repo = 'leverbrain'
  let path = `skills/${slug}`
  let branch = 'main'

  if (normAuthor === 'anthropics') {
    owner = 'anthropics'
    repo = 'skills'
  } else if (normAuthor === 'composiohq' || normAuthor === 'composio') {
    owner = 'composiohq'
    repo = 'skills'
  } else if (normAuthor === '199-biotechnologies') {
    owner = '199-biotechnologies'
    repo = 'skills'
  } else if (normAuthor === 'baoyu' || normAuthor === 'jimliu') {
    owner = 'JimLiu'
    repo = 'baoyu-skills'
    path = `skills/${slug}`
  }

  return { owner, repo, path, branch }
}
