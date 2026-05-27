import React from 'react'

export function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="sd-stat">
      <span className="sd-stat-value">{value}</span>
      <span className="sd-stat-label">{label}</span>
    </div>
  )
}
