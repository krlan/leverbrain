import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export function InstallCommandBar({ author, slug }: { author: string; slug: string }) {
  const command = `npx -y leverbrain get ${author}/${slug}`
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="sd-install-bar clickable"
      aria-label={`Copy install command: ${command}`}
      type="button"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        background: 'rgba(255, 188, 104, 0.03)',
        border: '1px solid rgba(255, 188, 104, 0.12)',
        borderRadius: '8px',
        padding: '12px 16px',
        cursor: 'pointer',
        textAlign: 'left',
        fontFamily: 'inherit',
        color: 'inherit',
        outline: 'none',
        transition: 'all 0.2s ease',
      }}
    >
      <div className="sd-install-code-wrap" style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1, marginRight: '12px' }}>
        <span className="sd-install-prompt" style={{ color: 'var(--color-accent-warm-light)', opacity: 0.7 }}>$</span>
        <div style={{ minWidth: 0, flex: 1, overflowX: 'hidden' }}>
          <code className="sd-install-code" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', display: 'block' }}>{command}</code>
        </div>
      </div>
      <div className="sd-install-copy-indicator" style={{ display: 'flex', alignItems: 'center', color: 'var(--color-text-secondary)', opacity: 0.8 }}>
        {copied ? <Check size={14} style={{ color: 'var(--color-accent-warm-light)' }} /> : <Copy size={14} />}
      </div>
    </button>
  )
}
