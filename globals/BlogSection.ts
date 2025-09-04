import type { GlobalConfig } from 'payload'

const BlogSectionGlobal: GlobalConfig = {
  slug: 'blogSection',
  label: 'Home - Blog Section',
  access: { read: () => true, update: () => true },
  fields: [
    { name: 'title', label: 'Título', type: 'text', required: true, defaultValue: 'Blog SANROQUE' },
    { name: 'highlight', label: 'Resaltado (amarillo)', type: 'text', required: false, defaultValue: 'SANROQUE' },
    { name: 'description', label: 'Descripción', type: 'textarea', required: false, defaultValue: 'Últimos artículos del equipo SANROQUE' },
  ],
}

export default BlogSectionGlobal
