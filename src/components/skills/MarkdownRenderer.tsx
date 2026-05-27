import React from 'react'
import { CodeBlock } from './CodeBlock'

function parseInlineMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  let currentText = text
  let key = 0

  while (currentText) {
    const boldIdx = currentText.indexOf('**')
    const codeIdx = currentText.indexOf('`')
    const linkIdx = currentText.indexOf('[')

    const indices = [
      boldIdx !== -1 ? boldIdx : Infinity,
      codeIdx !== -1 ? codeIdx : Infinity,
      linkIdx !== -1 ? linkIdx : Infinity
    ]
    const minIdx = Math.min(...indices)

    if (minIdx === Infinity) {
      parts.push(currentText)
      break
    }

    if (minIdx > 0) {
      parts.push(currentText.substring(0, minIdx))
      currentText = currentText.substring(minIdx)
    }

    if (minIdx === boldIdx) {
      const endIdx = currentText.indexOf('**', 2)
      if (endIdx !== -1) {
        parts.push(<strong key={key++}>{currentText.substring(2, endIdx)}</strong>)
        currentText = currentText.substring(endIdx + 2)
      } else {
        parts.push(currentText)
        break
      }
    } else if (minIdx === codeIdx) {
      const endIdx = currentText.indexOf('`', 1)
      if (endIdx !== -1) {
        parts.push(<code key={key++} className="sd-md-inline-code">{currentText.substring(1, endIdx)}</code>)
        currentText = currentText.substring(endIdx + 1)
      } else {
        parts.push(currentText)
        break
      }
    } else if (minIdx === linkIdx) {
      const endBracket = currentText.indexOf(']')
      const startParen = currentText.indexOf('(', endBracket)
      const endParen = currentText.indexOf(')', startParen)

      if (endBracket !== -1 && startParen === endBracket + 1 && endParen !== -1) {
        const linkText = currentText.substring(1, endBracket)
        const linkUrl = currentText.substring(startParen + 1, endParen)
        parts.push(
          <a key={key++} href={linkUrl} className="sd-md-link" target="_blank" rel="noreferrer">
            {linkText}
          </a>
        )
        currentText = currentText.substring(endParen + 1)
      } else {
        parts.push('[')
        currentText = currentText.substring(1)
      }
    }
  }

  return parts
}

export function renderMarkdown(md: string): React.ReactNode {
  if (!md) return null

  const lines = md.split('\n')
  const elements: React.ReactNode[] = []
  let inCodeBlock = false
  let codeLines: string[] = []
  let codeLang = ''
  let listItems: string[] = []
  let listType: 'bullet' | 'ordered' | null = null

  const flushList = (key: number) => {
    if (listItems.length === 0) return
    if (listType === 'bullet') {
      elements.push(
        <ul key={`ul-${key}`} className="sd-md-list">
          {listItems.map((item, idx) => (
            <li key={idx}>{parseInlineMarkdown(item)}</li>
          ))}
        </ul>
      )
    } else if (listType === 'ordered') {
      elements.push(
        <ol key={`ol-${key}`} className="sd-md-ol">
          {listItems.map((item, idx) => (
            <li key={idx}>{parseInlineMarkdown(item)}</li>
          ))}
        </ol>
      )
    }
    listItems = []
    listType = null
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        const codeContent = codeLines.join('\n')
        elements.push(
          <CodeBlock key={`code-${elements.length}`} code={codeContent} language={codeLang} />
        )
        codeLines = []
        inCodeBlock = false
      } else {
        flushList(elements.length)
        codeLang = line.trim().slice(3).trim()
        inCodeBlock = true
      }
      continue
    }

    if (inCodeBlock) {
      codeLines.push(line)
      continue
    }

    if (line.startsWith('# ')) {
      flushList(elements.length)
      elements.push(<h1 key={`h1-${elements.length}`} className="sd-md-h1">{parseInlineMarkdown(line.slice(2))}</h1>)
      continue
    }
    if (line.startsWith('## ')) {
      flushList(elements.length)
      elements.push(<h2 key={`h2-${elements.length}`} className="sd-md-h2">{parseInlineMarkdown(line.slice(3))}</h2>)
      continue
    }
    if (line.startsWith('### ')) {
      flushList(elements.length)
      elements.push(<h3 key={`h3-${elements.length}`} className="sd-md-h3">{parseInlineMarkdown(line.slice(4))}</h3>)
      continue
    }

    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      if (listType !== 'bullet') {
        flushList(elements.length)
        listType = 'bullet'
      }
      listItems.push(line.trim().slice(2))
      continue
    }

    if (/^\d+\.\s/.test(line.trim())) {
      if (listType !== 'ordered') {
        flushList(elements.length)
        listType = 'ordered'
      }
      const content = line.trim().replace(/^\d+\.\s/, '')
      listItems.push(content)
      continue
    }

    if (line.startsWith('> ')) {
      flushList(elements.length)
      const rawContent = line.slice(2).trim()
      let alertType: 'note' | 'tip' | 'important' | 'warning' | 'caution' | null = null
      let displayContent = rawContent

      if (rawContent.startsWith('[!NOTE]')) {
        alertType = 'note'
        displayContent = rawContent.slice(7).trim()
      } else if (rawContent.startsWith('[!TIP]')) {
        alertType = 'tip'
        displayContent = rawContent.slice(6).trim()
      } else if (rawContent.startsWith('[!IMPORTANT]')) {
        alertType = 'important'
        displayContent = rawContent.slice(12).trim()
      } else if (rawContent.startsWith('[!WARNING]')) {
        alertType = 'warning'
        displayContent = rawContent.slice(10).trim()
      } else if (rawContent.startsWith('[!CAUTION]')) {
        alertType = 'caution'
        displayContent = rawContent.slice(10).trim()
      }

      let nextIdx = i + 1
      while (nextIdx < lines.length && lines[nextIdx].startsWith('> ')) {
        const nextRaw = lines[nextIdx].slice(2).trim()
        displayContent += ' ' + nextRaw
        nextIdx++
        i++
      }

      if (alertType) {
        elements.push(
          <div key={`alert-${elements.length}`} className={`sd-alert sd-alert--${alertType}`}>
            <span className="sd-alert-type">{alertType.toUpperCase()}</span>
            <p className="sd-alert-body">{parseInlineMarkdown(displayContent)}</p>
          </div>
        )
      } else {
        elements.push(
          <blockquote key={`quote-${elements.length}`} className="sd-blockquote">
            {parseInlineMarkdown(displayContent)}
          </blockquote>
        )
      }
      continue
    }

    if (!line.trim()) {
      flushList(elements.length)
      continue
    }

    flushList(elements.length)
    elements.push(
      <p key={`p-${elements.length}`} className="sd-md-p">
        {parseInlineMarkdown(line)}
      </p>
    )
  }

  flushList(elements.length)
  return <div className="sd-markdown-container">{elements}</div>
}

export function MarkdownRenderer({ markdown }: { markdown: string }) {
  return <>{renderMarkdown(markdown)}</>
}
