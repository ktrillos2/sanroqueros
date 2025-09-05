import type { CollectionConfig } from 'payload'
import sharp from 'sharp'
import path from 'path'
import { promises as fs } from 'fs'
import { v2 as cloudinary } from 'cloudinary'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Medio',
    plural: 'Medios',
  },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['alt', 'updatedAt', 'miniatura'],
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
      required: true,
      label: 'Texto alternativo',
      admin: {
        description: 'Describe la imagen para accesibilidad y SEO.',
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
      async ({ doc, req }: any) => {
        const isProd = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production'
        if (!isProd) return doc
        if (typeof doc?.url === 'string' && /^https?:\/\//.test(doc.url)) return doc

        try {
          const staticDir = process.env.VERCEL === '1' ? '/tmp/media' : 'media'
          const originalPath = path.resolve(`${staticDir}/${doc.filename}`)
          const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env as Record<string, string | undefined>
          if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
            req.payload.logger?.warn?.('Cloudinary no configurado; falta CLOUDINARY_CLOUD_NAME/API_KEY/API_SECRET')
            return doc
          }
          cloudinary.config({ cloud_name: CLOUDINARY_CLOUD_NAME, api_key: CLOUDINARY_API_KEY, api_secret: CLOUDINARY_API_SECRET, secure: true })

          // Helpers de reintento
          const wait = (ms: number) => new Promise(res => setTimeout(res, ms))
          const readFileWithRetry = async (p: string, tries = 5) => {
            let attempt = 0
            let delay = 100
            while (true) {
              try {
                return await fs.readFile(p)
              } catch (e: any) {
                if (attempt++ >= tries - 1) throw e
                await wait(delay)
                delay = Math.min(delay * 2, 1000)
              }
            }
          }
          const buffer = await readFileWithRetry(originalPath)
          const folder = process.env.CLOUDINARY_FOLDER || 'media'
          const uploaded = await new Promise<any>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder, use_filename: true, unique_filename: true, overwrite: false, resource_type: 'auto' },
              (err, result) => (err ? reject(err) : resolve(result))
            )
            stream.end(buffer)
          })

          const newData: any = { url: uploaded.secure_url || uploaded.url }

          if (doc.sizes && typeof doc.sizes === 'object') {
            newData.sizes = {}
            for (const [sizeName, sizeData] of Object.entries<any>(doc.sizes)) {
              if (!sizeData?.filename) continue
              const sizePath = path.resolve(`${staticDir}/${sizeData.filename}`)
              try {
                const sizeBuf = await readFileWithRetry(sizePath)
                const up = await new Promise<any>((resolve, reject) => {
                  const stream = cloudinary.uploader.upload_stream(
                    { folder, use_filename: true, unique_filename: true, overwrite: false, resource_type: 'auto' },
                    (err, result) => (err ? reject(err) : resolve(result))
                  )
                  stream.end(sizeBuf)
                })
                newData.sizes[sizeName] = { ...sizeData, url: up.secure_url || up.url }
              } catch { /* ignore */ }
            }
          }

          const updated = await req.payload.update({
            collection: 'media',
            id: doc.id,
            data: newData,
            depth: 0,
            overrideAccess: true,
          })
          return updated
        } catch (err) {
          req.payload.logger?.error?.(`Error subiendo a Cloudinary: ${err instanceof Error ? err.message : String(err)}`)
          return doc
        }
      },
    ],
  },
  upload: {
    // En Vercel escribir en '/tmp' (writable). En dev, carpeta local 'media'.
    staticDir: process.env.VERCEL === '1' ? '/tmp/media' : 'media',
    mimeTypes: [
      'image/png', 'image/jpeg', 'image/webp', 'image/svg+xml',
      'video/mp4', 'video/webm', 'video/ogg'
    ],
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 320,
        height: 320,
        position: 'centre',
      },
    ],
  },
}
