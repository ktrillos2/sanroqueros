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
  },
  upload: {
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
