import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Post', plural: 'Posts' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'category', 'date', 'featured'] },
  access: {
    read: () => true,
    create: () => process.env.NODE_ENV !== 'production',
    update: () => process.env.NODE_ENV !== 'production',
    delete: () => process.env.NODE_ENV !== 'production',
  },
  fields: [
    { name: 'title', type: 'text', label: 'Título', required: true },
    { name: 'slug', type: 'text', label: 'Slug', unique: true, required: true },
    { name: 'excerpt', type: 'textarea', label: 'Extracto', required: true },
    {
      name: 'content',
      label: 'Contenido (WYSIWYG)',
      type: 'richText',
      required: false,
    },
    {
      type: 'group',
      name: 'mainImage',
      label: 'Imagen principal',
      fields: [
        { name: 'file', type: 'upload', relationTo: 'media', label: 'Archivo (sube aquí)', required: false },
        { name: 'imageUrl', type: 'text', label: 'o URL externa (opcional)', required: false },
        { name: 'alt', type: 'text', label: 'Alt', required: false },
      ],
    },
    {
      name: 'category',
      label: 'Categoría',
      type: 'select',
      options: [
        { label: 'Cuidado Básico', value: 'Cuidado Básico' },
        { label: 'Grooming', value: 'Grooming' },
        { label: 'Productos', value: 'Productos' },
        { label: 'Bienestar', value: 'Bienestar' },
        { label: 'Consejos', value: 'Consejos' },
      ],
      required: true,
    },
    { name: 'author', type: 'text', label: 'Autor', required: false },
    { name: 'date', type: 'date', label: 'Fecha', required: true },
    { name: 'readTime', type: 'text', label: 'Tiempo de lectura', required: false },
    { name: 'views', type: 'number', label: 'Vistas', defaultValue: 0 },
    { name: 'featured', type: 'checkbox', label: 'Destacado', defaultValue: false },
    { name: 'published', type: 'checkbox', label: 'Publicado', defaultValue: true },
  ],
  hooks: {
    beforeValidate: [({ data }) => {
      if (!data) return data
      const t = (data.title || '').toString()
      if (!data.slug && t) {
        data.slug = t
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .trim()
          .replace(/\s+/g, '-')
      }
      return data
    }],
  },
}

export default Posts