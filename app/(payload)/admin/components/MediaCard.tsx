"use client"
import * as React from 'react'

export default function MediaCard({ doc }: { doc: any }) {
  const url = doc?.sizes?.thumbnail?.url || doc?.url
  const alt = doc?.alt || doc?.filename
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt={alt} width={48} height={48} style={{ objectFit: 'cover', borderRadius: 6 }} />
      ) : (
        <div style={{ width: 48, height: 48, background: '#eee', borderRadius: 6 }} />
      )}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <strong style={{ fontSize: 13 }}>{alt}</strong>
        <span style={{ fontSize: 12, color: '#666' }}>{doc?.mimeType || doc?.filename}</span>
      </div>
    </div>
  )
}
