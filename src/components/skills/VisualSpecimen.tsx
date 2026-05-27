import React from 'react'

export function VisualSpecimen({ previewHtml, imageUrl }: { previewHtml?: string; imageUrl?: string }) {
  return (
    <div className="sd-visual-specimen">
      <div className="sd-specimen-header">
        <div className="sd-specimen-dot red" />
        <div className="sd-specimen-dot orange" />
        <div className="sd-specimen-dot green" />
        <span className="sd-specimen-title">VISUAL SPECIMEN // LIVE PREVIEW</span>
      </div>
      <div className="sd-specimen-body">
        {previewHtml ? (
          <div className="sd-specimen-html" dangerouslySetInnerHTML={{ __html: previewHtml }} />
        ) : imageUrl ? (
          <img src={imageUrl} alt="Visual Specimen Preview" className="sd-specimen-img" />
        ) : null}
      </div>
    </div>
  )
}
