import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'

/**
 * Converts a first-person example usage sentence to second-person for display.
 * e.g. "Generate slides for my pitch" → "Generate slides for your pitch"
 */
function toSecondPerson(text: string): string {
  return text
    .replace(/\bmy\b/g, 'your')
    .replace(/\bmine\b/g, 'yours')
    .replace(/\bI'm\b/gi, "you're")
    .replace(/\bI've\b/gi, "you've")
    .replace(/\bI'll\b/gi, "you'll")
    .replace(/\bI'd\b/gi, "you'd")
    .replace(/\bI\b/g, 'you')
    .replace(/\bme\b/g, 'you')
    .replace(/\bmyself\b/g, 'yourself')
}

interface ExampleUsageBarProps {
  author: string
  slug: string
  exampleUsage: string
}

export function ExampleUsageBar({ author, slug, exampleUsage }: ExampleUsageBarProps) {
  const command = `npx -y leverbrain get ${author}/${slug}`
  const displayScenario = toSecondPerson(exampleUsage)
  const copyText = `${exampleUsage}\n${command}`
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="sd-example-bar clickable"
      aria-label={`Copy example usage: ${copyText}`}
      type="button"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '100%',
        background: 'rgba(255, 188, 104, 0.015)',
        border: '1px solid rgba(255, 188, 104, 0.08)',
        borderRadius: '8px',
        padding: '12px 16px',
        cursor: 'pointer',
        textAlign: 'left',
        fontFamily: 'inherit',
        color: 'inherit',
        outline: 'none',
        transition: 'all 0.2s ease',
        gap: '12px',
        marginTop: '8px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            fontSize: '0.7rem',
            color: 'var(--color-accent-warm-light)',
            opacity: 0.6,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 600,
            flexShrink: 0,
          }}>
            ✦ Try it
          </span>
          <span style={{
            fontSize: '0.83rem',
            color: 'var(--color-text-secondary)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {displayScenario}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
          <span style={{
            color: 'var(--color-accent-warm-light)',
            opacity: 0.35,
            fontSize: '0.75rem',
            flexShrink: 0,
          }}>$</span>
          <code style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            color: 'var(--color-text-tertiary)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: 'block',
          }}>
            {command}
          </code>
        </div>
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        color: 'var(--color-text-secondary)',
        opacity: 0.6,
        flexShrink: 0,
        paddingTop: '2px',
      }}>
        {copied
          ? <Check size={13} style={{ color: 'var(--color-accent-warm-light)' }} />
          : <Copy size={13} />
        }
      </div>
    </button>
  )
}
