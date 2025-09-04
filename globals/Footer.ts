import type { GlobalConfig } from 'payload'

const FooterGlobal: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'descripcion',
      label: 'Descripción',
      type: 'textarea',
      admin: {
        description: 'Texto corto bajo el logo en el footer.'
      },
      defaultValue:
        'El mejor spa y peluquería para perros y gatos en Bogotá. Experiencia premium con productos de alta gama y técnicas profesionales.',
    },
    {
      type: 'group',
      name: 'insignia',
      label: 'Insignia / Reconocimiento',
      fields: [
        {
          name: 'imagen',
          label: 'Imagen',
          type: 'upload',
          relationTo: 'media',
        },
        { name: 'titulo', label: 'Título', type: 'text', defaultValue: 'Reconocidos por la excelencia' },
        { name: 'subtitulo', label: 'Subtítulo', type: 'text', defaultValue: 'Mejor spa y peluquería en Bogotá' },
      ],
    },
    {
      name: 'enlacesRapidos',
      label: 'Enlaces Rápidos',
      type: 'array',
      labels: { singular: 'Enlace', plural: 'Enlaces' },
      fields: [
        { name: 'label', label: 'Etiqueta', type: 'text', required: true },
        { name: 'url', label: 'URL', type: 'text', required: true },
      ],
      defaultValue: [
        { label: 'Inicio', url: '/' },
        { label: 'Servicios para Perros', url: '/perros' },
        { label: 'Servicios para Gatos', url: '/gatos' },
        { label: 'Blog', url: '/blog' },
        { label: 'Contacto', url: '/#contacto' },
      ],
    },
    {
      name: 'enlacesLegales',
      label: 'Enlaces Legales',
      type: 'array',
      labels: { singular: 'Enlace', plural: 'Enlaces' },
      fields: [
        { name: 'label', label: 'Etiqueta', type: 'text', required: true },
        { name: 'url', label: 'URL', type: 'text', required: true },
      ],
      defaultValue: [
        { label: 'Política de Privacidad', url: '/politica-de-privacidad' },
        { label: 'Términos de Servicio', url: '/terminos' },
      ],
    },
  ],
}

export default FooterGlobal
