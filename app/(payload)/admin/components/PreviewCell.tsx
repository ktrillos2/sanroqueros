"use client"
import * as React from 'react'

type Props = {
  data?: any
  rowData?: any
}

export default function PreviewCell({ data, rowData }: Props) {
  const doc = rowData || data || {}
  // Base pública del Blob para el cliente (incluye media/ y termina en /)
  const BLOB_BASE = (process.env.NEXT_PUBLIC_BLOB_BASE_URL || 'https://meczemzmsls6z3o1.public.blob.vercel-storage.com/media/').replace(/\/+$/, '/')

  // Construye una URL de Blob a partir de filename (u otro filename de size)
  const buildBlobUrl = (filename?: string): string | undefined => {
    if (!filename) return undefined
    // Asegurar codificación de espacios y caracteres especiales
  return `${BLOB_BASE}${encodeURIComponent(filename)}`
  }

  // Priorizar siempre blobUrl; si no existe, intentar sizes.thumbnail, luego url general; por último dataURI
  let url: string | undefined = doc?.blobUrl

  if (!url) {
    const thumb = doc?.sizes?.thumbnail
    if (thumb?.url) {
      url = thumb.url
    } else if (thumb?.filename) {
      url = buildBlobUrl(thumb.filename)
    }
  }

  if (!url) {
    // Si hay url local o antigua, reconstruir con filename cuando sea posible
    if (doc?.url) {
  if (typeof doc.url === 'string' && doc.url.startsWith(BLOB_BASE)) {
        url = doc.url
      } else {
        url = buildBlobUrl(doc?.filename)
      }
    }
  }

  if (!url) {
    url = doc?.previewDataURI
  }

  // Normalizar espacios por si blobUrl guardado contiene espacios sin codificar
  if (typeof url === 'string') {
    url = url.replace(/ /g, '%20')
  }

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
