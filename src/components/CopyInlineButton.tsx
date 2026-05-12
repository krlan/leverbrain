"use client";

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface CopyInlineButtonProps {
  value: string
}

export default function CopyInlineButton({ value }: CopyInlineButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1300)
    } catch (error) {
      console.error('Failed to copy command', error)
    }
  }

  return (
    <button
      type="button"
      onClick={() => void handleCopy()}
      className="land-hero-copy-btn"
      aria-label={copied ? 'Copied command' : 'Copy command'}
      title={copied ? 'Copied' : 'Copy command'}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
    </button>
  )
}
