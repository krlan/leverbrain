import React, { useState, useEffect } from 'react'
import { Folder, FolderOpen, FileText, ChevronRight, ChevronDown, Check, Copy, Loader2, ExternalLink } from 'lucide-react'
import { getGitHubRepoDetails, resolveRepoUrl } from '@/lib/github-urls'

interface GitHubFile {
  name: string
  path: string
  type: 'file' | 'dir'
  download_url: string | null
  html_url: string
}

interface LoadedFileContents {
  [path: string]: string
}

export function SourceCodeInspector({ 
  author, 
  slug, 
  fallbackCode, 
  fallbackGithubUrl,
  fileUrl
}: { 
  author: string
  slug: string
  fallbackCode: string
  fallbackGithubUrl: string 
  fileUrl?: string
}) {
  const { owner, repo, path: rootPath } = getGitHubRepoDetails(author, slug, fileUrl)
  const repoDirectoryUrl = resolveRepoUrl(author, slug, fileUrl)

  const [rootFiles, setRootFiles] = useState<GitHubFile[]>([])
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())
  const [folderContents, setFolderContents] = useState<{ [path: string]: GitHubFile[] }>({})
  const [fileContents, setFileContents] = useState<LoadedFileContents>({})
  const [activeFilePath, setActiveFilePath] = useState<string>('')
  const [activeFileName, setActiveFileName] = useState<string>('SKILL.md')
  const [activeFileHtmlUrl, setActiveFileHtmlUrl] = useState<string>(fallbackGithubUrl)
  
  const [loading, setLoading] = useState<boolean>(true)
  const [loadingFile, setLoadingFile] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)

  // Fetch root directory
  useEffect(() => {
    let active = true
    const fetchRoot = async () => {
      setLoading(true)
      try {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${rootPath}`)
        if (res.status === 200) {
          const data = await res.json()
          if (active && Array.isArray(data)) {
            // Sort: folders first, then files
            const sorted = data.sort((a: GitHubFile, b: GitHubFile) => {
              if (a.type !== b.type) return a.type === 'dir' ? -1 : 1
              return a.name.localeCompare(b.name)
            })
            setRootFiles(sorted)

            // Find SKILL.md or README.md in root to load as default active file
            const defaultFile = sorted.find((f: GitHubFile) => f.type === 'file' && (f.name === 'SKILL.md' || f.name === 'README.md')) || 
                                sorted.find((f: GitHubFile) => f.type === 'file')
            
            if (defaultFile) {
              setActiveFilePath(defaultFile.path)
              setActiveFileName(defaultFile.name)
              setActiveFileHtmlUrl(defaultFile.html_url)
            } else {
              setActiveFilePath('fallback')
              setFileContents({ fallback: fallbackCode })
            }
            setLoading(false)
            return
          }
        }
      } catch (err) {
        console.error('Failed to fetch github repo details', err)
      }

      // Fallback
      if (active) {
        setRootFiles([
          {
            name: 'SKILL.md',
            path: 'fallback',
            type: 'file',
            download_url: null,
            html_url: fallbackGithubUrl
          }
        ])
        setActiveFilePath('fallback')
        setActiveFileName('SKILL.md')
        setActiveFileHtmlUrl(fallbackGithubUrl)
        setFileContents({ fallback: fallbackCode })
        setLoading(false)
      }
    }

    fetchRoot()
    return () => {
      active = false
    }
  }, [owner, repo, rootPath, fallbackCode, fallbackGithubUrl])

  // Load selected file contents
  useEffect(() => {
    if (!activeFilePath || activeFilePath === 'fallback') return
    if (fileContents[activeFilePath]) return // Already cached

    let active = true
    const fetchFileContent = async () => {
      setLoadingFile(true)
      const fileObj = findFileInTree(activeFilePath)
      if (!fileObj || !fileObj.download_url) {
        // Fallback if no raw url
        if (active) {
          if (activeFilePath.endsWith('SKILL.md')) {
            setFileContents(prev => ({ ...prev, [activeFilePath]: fallbackCode }))
          } else {
            setFileContents(prev => ({ ...prev, [activeFilePath]: '// Source file content not available raw.' }))
          }
          setLoadingFile(false)
        }
        return
      }

      try {
        const res = await fetch(fileObj.download_url)
        if (res.status === 200) {
          const text = await res.text()
          if (active) {
            setFileContents(prev => ({ ...prev, [activeFilePath]: text }))
          }
        } else {
          if (active) {
            setFileContents(prev => ({ ...prev, [activeFilePath]: '// Error loading file content from GitHub.' }))
          }
        }
      } catch (err) {
        if (active) {
          setFileContents(prev => ({ ...prev, [activeFilePath]: '// Error loading file content from GitHub.' }))
        }
      } finally {
        if (active) setLoadingFile(false)
      }
    }

    fetchFileContent()
    return () => {
      active = false
    }
  }, [activeFilePath])

  // Helper to find file object by path in our loaded state
  const findFileInTree = (path: string): GitHubFile | undefined => {
    // Search in root
    const foundInRoot = rootFiles.find(f => f.path === path)
    if (foundInRoot) return foundInRoot

    // Search in sub-folders
    for (const folderPath in folderContents) {
      const found = folderContents[folderPath].find(f => f.path === path)
      if (found) return found
    }
    return undefined
  }

  // Toggle folder open/closed
  const toggleFolder = async (folderPath: string) => {
    const isExpanded = expandedFolders.has(folderPath)
    const newExpanded = new Set(expandedFolders)

    if (isExpanded) {
      newExpanded.delete(folderPath)
      setExpandedFolders(newExpanded)
    } else {
      newExpanded.add(folderPath)
      setExpandedFolders(newExpanded)

      // Fetch folder contents if not loaded yet
      if (!folderContents[folderPath]) {
        try {
          const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${folderPath}`)
          if (res.status === 200) {
            const data = await res.json()
            if (Array.isArray(data)) {
              const sorted = data.sort((a: GitHubFile, b: GitHubFile) => {
                if (a.type !== b.type) return a.type === 'dir' ? -1 : 1
                return a.name.localeCompare(b.name)
              })
              setFolderContents(prev => ({ ...prev, [folderPath]: sorted }))
            }
          }
        } catch (err) {
          console.error('Failed to fetch subfolder', err)
        }
      }
    }
  }

  const handleCopy = async () => {
    const activeText = fileContents[activeFilePath] || fallbackCode
    try {
      await navigator.clipboard.writeText(activeText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code', err)
    }
  }

  const renderTree = (files: GitHubFile[], depth: number = 0) => {
    return files.map((file) => {
      const isFolder = file.type === 'dir'
      const isExpanded = expandedFolders.has(file.path)
      const isActive = activeFilePath === file.path

      return (
        <div key={file.path} className="sd-explorer-node-wrap">
          <button
            type="button"
            onClick={() => {
              if (isFolder) {
                toggleFolder(file.path)
              } else {
                setActiveFilePath(file.path)
                setActiveFileName(file.name)
                setActiveFileHtmlUrl(file.html_url)
              }
            }}
            className={`sd-explorer-node ${isActive ? 'active' : ''}`}
            style={{ paddingLeft: `${depth * 12 + 8}px` }}
          >
            {isFolder ? (
              <>
                <span className="sd-explorer-chevron">
                  {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                </span>
                <span className="sd-explorer-icon folder">
                  {isExpanded ? <FolderOpen size={14} /> : <Folder size={14} />}
                </span>
              </>
            ) : (
              <span className="sd-explorer-icon file" style={{ marginLeft: '16px' }}>
                <FileText size={14} />
              </span>
            )}
            <span className="sd-explorer-node-name">{file.name}</span>
          </button>

          {isFolder && isExpanded && folderContents[file.path] && (
            <div className="sd-explorer-sublist">
              {renderTree(folderContents[file.path], depth + 1)}
            </div>
          )}
        </div>
      )
    })
  }

  const activeContent = fileContents[activeFilePath] || ''
  const lines = activeContent ? activeContent.split('\n') : []

  return (
    <section className="sd-code-inspector">
      <div className="sd-inspector-header">
        <div className="sd-inspector-title-wrap">
          <span className="sd-inspector-dot red" />
          <span className="sd-inspector-dot orange" />
          <span className="sd-inspector-dot green" />
          <span className="sd-inspector-filename">
            {activeFileName}
          </span>
        </div>
        <div className="sd-inspector-actions">
          <a href={repoDirectoryUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline sd-inspector-btn">
            <ExternalLink size={12} /> Inspect Repository
          </a>
          <button onClick={handleCopy} className="btn btn-sm btn-outline sd-inspector-btn" type="button">
            {copied ? <Check size={12} style={{ color: 'var(--color-accent-warm-light)' }} /> : <Copy size={12} />} Copy File
          </button>
        </div>
      </div>

      <div className="sd-inspector-workspace">
        {/* Left column: File Explorer Tree */}
        <div className="sd-inspector-explorer">
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-text-secondary)', fontSize: '0.8rem', gap: '6px' }}>
              <Loader2 size={12} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} /> Loading tree...
            </div>
          ) : (
            <div className="sd-explorer-tree">
              {renderTree(rootFiles)}
            </div>
          )}
        </div>

        {/* Right column: Code Viewport */}
        <div className="sd-inspector-code-container">
          {loadingFile ? (
            <div className="sd-inspector-viewport-loader">
              <Loader2 size={16} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} /> Fetching file...
            </div>
          ) : null}
          <div className="sd-inspector-code-viewport">
            <div className="sd-inspector-line-numbers">
              {lines.map((_, idx) => (
                <span key={idx} className="sd-inspector-ln">{idx + 1}</span>
              ))}
            </div>
            <pre className="sd-inspector-pre">
              <code>
                {activeContent || (loading ? 'Loading files...' : 'Select a file to inspect')}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
