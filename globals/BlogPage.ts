import type { GlobalConfig } from 'payload'

const BlogPage: GlobalConfig = {
  slug: 'blogPage',
  label: 'Página Blog',
  access: { read: () => true },
  fields: [
    {
      type: 'group',
      name: 'hero',
      label: 'Hero',
      fields: [
        { name: 'title', type: 'text', label: 'Título', defaultValue: 'Blog SANROQUE' },
        { name: 'subtitle', type: 'textarea', label: 'Subtítulo', defaultValue: 'Consejos expertos, tips profesionales y las últimas novedades sobre el cuidado y bienestar de tus mascotas' },
        { name: 'ctaLabel', type: 'text', label: 'CTA (label)', defaultValue: 'Ver menciones' },
        { name: 'ctaHref', type: 'text', label: 'CTA (href)', defaultValue: '#lo-que-hablan' },
      ],
    },
    {
      name: 'featured',
      label: 'Artículo destacado',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: false,
    },
    {
      name: 'mentions',
      label: 'Lo que hablan de nosotros',
      type: 'array',
      labels: { singular: 'Mención', plural: 'Menciones' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'source', type: 'text' },
        { name: 'url', type: 'text' },
        { name: 'excerpt', type: 'textarea' },
        { name: 'date', type: 'date' },
        { name: 'logo', type: 'upload', relationTo: 'media', required: false },
        { name: 'logoUrl', type: 'text', label: 'Logo (URL alternativa)' },
        { name: 'buttonLabel', type: 'text', defaultValue: 'Leer artículo completo' },
      ],
    },
  ],
}

export default BlogPage
