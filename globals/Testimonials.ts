import type { GlobalConfig } from 'payload'

const TestimonialsGlobal: GlobalConfig = {
  slug: 'testimonials',
  label: 'Home - Lo que dicen nuestros clientes',
  access: { read: () => true, update: () => true },
  fields: [
    {
      type: 'group',
      name: 'title',
      label: 'Título',
      fields: [
        { name: 'left', label: 'Izquierda', type: 'text', required: true, defaultValue: 'Lo que Dicen' },
        { name: 'highlight', label: 'Resalte', type: 'text', required: true, defaultValue: 'Nuestros Clientes' },
      ],
    },
    {
      name: 'intro',
      label: 'Introducción (WYSIWYG)',
      type: 'richText',
    },
    {
      name: 'videos',
      label: 'Videos Destacados',
      type: 'array',
      minRows: 0,
      fields: [
        { name: 'title', label: 'Título', type: 'text', required: true },
        { name: 'description', label: 'Descripción', type: 'text' },
        { name: 'thumbnail', label: 'Miniatura', type: 'upload', relationTo: 'media' },
        { name: 'youtubeUrl', label: 'URL YouTube', type: 'text' },
      ],
    },
    {
      name: 'testimonials',
      label: 'Testimonios',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'name', label: 'Nombre', type: 'text', required: true },
        { name: 'petName', label: 'Mascota', type: 'text' },
        { name: 'image', label: 'Foto', type: 'upload', relationTo: 'media' },
        { name: 'rating', label: 'Calificación (1-5)', type: 'number', min: 1, max: 5, defaultValue: 5 },
        { name: 'service', label: 'Servicio', type: 'text' },
        { name: 'text', label: 'Testimonio', type: 'richText' },
      ],
    },
  ],
}

export default TestimonialsGlobal
