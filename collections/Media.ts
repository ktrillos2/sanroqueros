import type { CollectionConfig } from 'payload'
import sharp from 'sharp'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Medio',
    plural: 'Medios',
  },
  admin: {
    useAsTitle: 'alt',
  defaultColumns: ['alt', 'updatedAt','miniatura'],
    components: {
      // Otros componentes del admin pueden ir aquí si se requieren
    },
  },
  access: {
    // Listar/consultar medios desde Admin o público
    read: () => true,
  // En desarrollo, permitir subir/editar/borrar sin exigir sesión (para evitar bloqueos por proxys)
  create: () => process.env.NODE_ENV !== 'production',
  update: () => process.env.NODE_ENV !== 'production',
  delete: () => process.env.NODE_ENV !== 'production',
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
      name: 'previewDataURI',
      label: 'Vista previa',
      type: 'textarea',
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Generado automáticamente para mostrar la imagen en el Admin.',
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
      async ({ data = {}, req }) => {
        const file: any = (req as any)?.file
        const buffer: Buffer | undefined = file?.buffer
        if (!buffer) return data

        try {
          const thumb = await sharp(buffer)
            .resize(160, 160, { fit: 'cover' })
            // Exportar en PNG para preservar transparencia
            .png({ compressionLevel: 9, adaptiveFiltering: true })
            .toBuffer()
          const uri = `data:image/png;base64,${thumb.toString('base64')}`
          return { ...data, previewDataURI: uri }
        } catch {
          return data
        }
      },
    ],
  },
  upload: {
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'],
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
