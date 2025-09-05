import type { CollectionConfig } from 'payload'
import sharp from 'sharp'
import path from 'path'
import { promises as fs } from 'fs'
import { put } from '@vercel/blob'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Medio',
    plural: 'Medios',
  },
  admin: {
    useAsTitle: 'alt',
  defaultColumns: ['alt', 'blobUrl', 'updatedAt', 'miniatura'],
    components: {
      // Otros componentes del admin pueden ir aquí si se requieren
    },
  },
  access: {
    // Listar/consultar medios desde Admin o público
    read: () => true,
  // En producción, exigir usuario autenticado
  create: ({ req }) => !!req?.user,
  update: ({ req }) => !!req?.user,
  delete: ({ req }) => !!req?.user,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Texto alternativo',
      required: true,
    },
    {
  name: 'blobUrl',
      type: 'text',
  label: 'URL de Vercel Blob',
      admin: {
        readOnly: true,
        description: 'URL generada automáticamente por Vercel Blob',
      },
    },
    {
      name: 'miniatura',
      label: 'Miniatura',
      type: 'ui',
      admin: {
        components: {
          Cell: './components/PreviewCell',
        },
      },
    },
  ],
  hooks: {
    beforeValidate: [({ data = {}, req, operation }) => {
      // Si alt viene vacío o sin definir, lo derivamos del nombre del archivo
      const current = data?.alt?.toString().trim()
      if (current) return data

      // Posibles fuentes del nombre
      const fromData = (data as any)?.filename as string | undefined
      const fromMulter = (req as any)?.file?.originalname as string | undefined
      const fromMulterArr = Array.isArray((req as any)?.files)
        ? (req as any).files[0]?.originalname
        : (req as any)?.files?.file?.[0]?.originalname

      const rawName = fromData || fromMulter || fromMulterArr
      if (!rawName) return data

      // Derivar texto alternativo legible del nombre
      const clean = rawName
        .replace(/\.[^.]+$/, '') // quitar extensión
        .replace(/[_-]+/g, ' ') // reemplazar guiones/underscores
        .replace(/\s+/g, ' ') // colapsar espacios
        .trim()

      return { ...data, alt: clean || 'Imagen sin título' }
    }],
    afterChange: [
      async ({ doc, req, operation }: any) => {
        const BLOB_BASE = 'https://elkmig7hcsojxkiy.public.blob.vercel-storage.com'

        // Si ya tenemos blobUrl con nuestra base, no reprocesar
        if (doc?.blobUrl && typeof doc.blobUrl === 'string' && doc.blobUrl.startsWith(`${BLOB_BASE}/`)) {
          return doc
        }

        // Necesitamos el archivo físico
        if (!doc?.filename) return doc

        try {

          const token = process.env.BLOB_READ_WRITE_TOKEN
          if (!token) return doc

          const staticDir = '/tmp/media'
          const originalPath = path.resolve(`${staticDir}/${doc.filename}`)

          // Leer el archivo; si falla en Vercel, intentar descargarlo desde la API de Payload
          let buffer: Buffer
          try {
            buffer = await fs.readFile(originalPath)
          } catch {
            const base = (req?.payload?.config as any)?.serverURL as string | undefined
            if (!base) return doc
            const fileURL = `${base.replace(/\/$/, '')}/api/media/file/${encodeURIComponent(doc.filename)}`
            const res = await fetch(fileURL)
            if (!res.ok) return doc
            const ab = await res.arrayBuffer()
            buffer = Buffer.from(ab)
          }
          const keyBase = `media/${doc.filename}`
          await put(keyBase, buffer, {
            access: 'public',
            token,
            allowOverwrite: true,
          })

          // Construir URL final y preparar datos a guardar
          const customUrl = `${BLOB_BASE}/media/${doc.filename}`
          const newData: any = { blobUrl: customUrl, url: customUrl }


          // Si existen tamaños, subir y setear sus URLs también
          if (doc.sizes && typeof doc.sizes === 'object') {
            newData.sizes = {}
            for (const [sizeName, sizeData] of Object.entries<any>(doc.sizes)) {
              if (!sizeData?.filename) continue
              const sizePath = path.resolve(`${staticDir}/${sizeData.filename}`)
              try {
                let sizeBuf: Buffer
                try {
                  sizeBuf = await fs.readFile(sizePath)
                } catch {
                  const base = (req?.payload?.config as any)?.serverURL as string | undefined
                  if (!base) throw new Error('no-base-url')
                  const sizeURL = `${base.replace(/\/$/, '')}/api/media/file/${encodeURIComponent(sizeData.filename)}`
                  const res = await fetch(sizeURL)
                  if (!res.ok) throw new Error('fetch-failed')
                  const ab = await res.arrayBuffer()
                  sizeBuf = Buffer.from(ab)
                }
                const sizeKey = `media/${sizeData.filename}`
                await put(sizeKey, sizeBuf, { access: 'public', token, allowOverwrite: true })
                newData.sizes[sizeName] = { ...sizeData, url: `${BLOB_BASE}/media/${sizeData.filename}` }
              } catch {}

            }
          }

          // Persistir blobUrl en el documento (esto disparará afterChange otra vez, pero saldrá por la guarda inicial)
          const updated = await req.payload.update({
            collection: 'media',
            id: doc.id,
            data: newData,
            depth: 0,
            overrideAccess: true,
          })

          // Limpiar archivos temporales; errores de cleanup se ignoran
          try {
            await fs.unlink(originalPath)
            if (doc.sizes && typeof doc.sizes === 'object') {
              for (const sizeData of Object.values<any>(doc.sizes)) {
                if (!sizeData?.filename) continue
                try { await fs.unlink(path.resolve(`${staticDir}/${sizeData.filename}`)) } catch {}
              }
            }
          } catch {}

          return updated
        } catch (err) {

          // Solo log de error para diagnóstico
          req.payload.logger?.error?.(`Error subiendo a Vercel Blob: ${err instanceof Error ? err.message : String(err)}`)

          return doc
        }
      },
    ],
    afterRead: [
      async ({ doc }: any) => {
        const BLOB_BASE = 'https://elkmig7hcsojxkiy.public.blob.vercel-storage.com'
        if (doc?.blobUrl && (!doc.url || typeof doc.url !== 'string' || !doc.url.startsWith(`${BLOB_BASE}/`))) {
          doc.url = doc.blobUrl
        }
        // Normalizar espacios sin codificar
        if (typeof doc.url === 'string') {
          doc.url = doc.url.replace(/ /g, '%20')
        }
        return doc
      },
    ],
    afterDelete: [
      async ({ doc, req }: any) => {
        // Opcional: eliminar de Vercel Blob cuando se elimina el documento
        // Por ahora solo logueamos, ya que Vercel Blob no tiene problema con archivos huérfanos
        if (doc?.url) {
          req.payload.logger?.info?.(`Media eliminado: ${doc.url}`)
        }
      },
    ],
  },
  upload: {
  // Almacenamiento temporal (staging) solo en /tmp; no se sirven archivos locales
  staticDir: '/tmp/media',
    mimeTypes: [
      'image/png', 'image/jpeg', 'image/webp', 'image/svg+xml',
      'video/mp4', 'video/webm', 'video/ogg'
    ],
  },
}
