import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy', err)
    }
  }

  return (
    <div className="sd-codeblock">
      <div className="sd-codeblock-header">
        <span className="sd-codeblock-lang">{language || 'code'}</span>
        <button onClick={handleCopy} className="sd-codeblock-copy" aria-label="Copy code block">
          {copied ? <Check size={12} style={{ color: 'var(--color-accent-warm-light)' }} /> : <Copy size={12} />}
        </button>
      </div>
      <pre className="sd-codeblock-pre">
        <code>{code}</code>
      </pre>
    </div>
  )
}
