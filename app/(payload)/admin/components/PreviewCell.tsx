"use client"
import * as React from 'react'

type Props = {
  data?: any
  rowData?: any
}

export default function PreviewCell({ data, rowData }: Props) {
  const doc = rowData || data || {}
  const url: string | undefined = doc.previewDataURI || doc?.sizes?.thumbnail?.url || doc?.url
  const alt: string = doc?.alt || doc?.filename || 'Imagen'

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 40, pointerEvents: 'none' }}>
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt={alt}
          width={100}
          height={100}
          style={{ objectFit: 'contain', borderRadius: 4, background: 'transparent' }}
        />
      ) : (
        <div style={{ width: 40, height: 40, borderRadius: 4, background: 'transparent' }} />
      )}
    </div>
  )
}
