"use client"
import * as React from 'react'

type Props = {
  data?: any
  rowData?: any
}

export default function MediaCell({ data, rowData }: Props) {
  const doc = rowData || data || {}
  const url: string | undefined = doc?.sizes?.thumbnail?.url || doc?.url
  const alt: string = doc?.alt || doc?.filename || 'Imagen'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, pointerEvents: 'none' }}>
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt={alt}
          width={60}
          height={60}
          style={{ objectFit: 'contain', borderRadius: 6, background: 'transparent' }}
        />
      ) : (
        <div style={{ width: 40, height: 40, borderRadius: 6, background: 'transparent' }} />
      )}
      <span style={{ fontSize: 12 }}>{alt}</span>
    </div>
  )
}
