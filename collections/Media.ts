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
    defaultColumns: ['alt', 'url', 'updatedAt', 'miniatura'],
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
      name: 'url',
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
    beforeChange: [
      async ({ data, req, operation }: any) => {
        // Solo procesar en operaciones de creación y actualización con archivos
        if (operation !== 'create' && operation !== 'update') {
          return data
        }

        // Verificar si hay un archivo siendo subido
        const file = (req as any)?.file || (req as any)?.files?.file?.[0]
        if (!file) {
          return data
        }

        try {
          const token = process.env.BLOB_READ_WRITE_TOKEN
          if (!token) {
            console.log('❌ BLOB_READ_WRITE_TOKEN ausente')
            return data
          }

          console.log('🚀 Subiendo archivo a Vercel Blob:', file.originalname)

          // Subir archivo a Vercel Blob directamente
          const keyBase = `media/${file.originalname}`
          const uploaded = await put(keyBase, file.buffer, { 
            access: 'public', 
            token: token 
          })

          console.log('✅ Archivo subido exitosamente a Blob')

          // Construir URL personalizada
          const customUrl = `https://elkmig7hcsojxkiy.public.blob.vercel-storage.com/media/${file.originalname}`
          console.log('🔗 URL personalizada:', customUrl)

          // Actualizar los datos con la URL personalizada
          return {
            ...data,
            url: customUrl,
            filename: file.originalname,
          }
        } catch (err) {
          console.error('❌ Error subiendo a Vercel Blob:', err)
          return data
        }
      },
    ],
    afterChange: [
      async ({ doc, req }: any) => {
        // Verificar si ya tiene URL de Blob para evitar re-procesar
        if (doc?.url && doc.url.includes('blob.vercel-storage.com')) {
          console.log('📌 Ya tiene URL de Blob:', doc.url)
          return doc
        }

        // Solo procesar si tenemos un archivo físico
        if (!doc?.filename) {
          console.log('❌ No hay filename en el documento')
          return doc
        }

        console.log('🚀 Iniciando subida a Vercel Blob para:', doc.filename)

        try {
          const token = process.env.BLOB_READ_WRITE_TOKEN
          if (!token) {
            console.log('❌ BLOB_READ_WRITE_TOKEN ausente')
            req.payload.logger?.warn?.('BLOB_READ_WRITE_TOKEN ausente; no se subirá a Vercel Blob.')
            return doc
          }

          console.log('✅ Token encontrado:', token.substring(0, 20) + '...')

          // Directorio donde Payload guardó temporalmente el archivo
          const staticDir = process.env.VERCEL === '1' ? '/tmp/media' : 'media'
          const originalPath = path.resolve(`${staticDir}/${doc.filename}`)
          
          console.log('📁 Leyendo archivo desde:', originalPath)
          
          // Leer el archivo y subirlo a Vercel Blob
          const buffer = await fs.readFile(originalPath)
          const keyBase = `media/${doc.filename}`
          
          console.log('📤 Subiendo a Vercel Blob con key:', keyBase)
          
          const uploaded = await put(keyBase, buffer, { 
            access: 'public', 
            token: token 
          })

          console.log('✅ Archivo subido exitosamente:', uploaded.url)

          // Usar URL base personalizada para visualización
          const customUrl = `https://elkmig7hcsojxkiy.public.blob.vercel-storage.com/media/${doc.filename}`
          console.log('🔗 URL personalizada:', customUrl)

          const newData: any = { url: customUrl }

          // Procesar tamaños de imagen si existen
          if (doc.sizes && typeof doc.sizes === 'object') {
            newData.sizes = {}
            for (const [sizeName, sizeData] of Object.entries<any>(doc.sizes)) {
              if (!sizeData?.filename) continue
              const sizePath = path.resolve(`${staticDir}/${sizeData.filename}`)
              try {
                const sizeBuf = await fs.readFile(sizePath)
                const sizeKey = `media/${sizeData.filename}`
                const up = await put(sizeKey, sizeBuf, { access: 'public', token })
                
                // Usar URL base personalizada para tamaños también
                const customSizeUrl = `https://elkmig7hcsojxkiy.public.blob.vercel-storage.com/media/${sizeData.filename}`
                newData.sizes[sizeName] = { ...sizeData, url: customSizeUrl }
              } catch { 
                // Ignorar errores en tamaños individuales
              }
            }
          }

          // Actualizar el documento con las URLs de Blob
          const updated = await req.payload.update({
            collection: 'media',
            id: doc.id,
            data: newData,
            depth: 0,
            overrideAccess: true,
          })

          console.log('✅ Documento actualizado con URL:', updated.url)

          // Limpiar archivos temporales después de subir a Blob
          try {
            await fs.unlink(originalPath)
            console.log('🗑️ Archivo temporal eliminado:', originalPath)
            
            // Limpiar también los archivos de tamaños
            if (doc.sizes && typeof doc.sizes === 'object') {
              for (const [sizeName, sizeData] of Object.entries<any>(doc.sizes)) {
                if (sizeData?.filename) {
                  try {
                    const sizePath = path.resolve(`${staticDir}/${sizeData.filename}`)
                    await fs.unlink(sizePath)
                  } catch {
                    // Ignorar errores al limpiar
                  }
                }
              }
            }
          } catch {
            // Ignorar errores al limpiar archivos temporales
          }

          return updated
        } catch (err) {
          console.error('❌ Error subiendo a Vercel Blob:', err)
          req.payload.logger?.error?.(`Error subiendo a Vercel Blob: ${err instanceof Error ? err.message : String(err)}`)
          return doc
        }
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
    // Almacenamiento temporal para procesamiento, luego subir a Blob
    staticDir: '/tmp/media',
    mimeTypes: [
      'image/png', 'image/jpeg', 'image/webp', 'image/svg+xml',
      'video/mp4', 'video/webm', 'video/ogg'
    ],
  },
}
