import type { GlobalConfig } from 'payload'

const HomeHeroGlobal: GlobalConfig = {
  slug: 'homeHero',
  label: 'Home - Hero',
  access: { read: () => true, update: () => true },
  fields: [
    {
      type: 'group',
      name: 'title',
      label: 'Título',
      fields: [
        { name: 'left', label: 'Parte izquierda', type: 'text', required: true, defaultValue: 'El Mejor' },
        { name: 'yellow', label: 'Parte amarilla', type: 'text', required: true, defaultValue: 'Spa' },
        { name: 'between', label: 'Entre', type: 'text', required: true, defaultValue: 'para' },
        { name: 'pink', label: 'Parte rosada', type: 'text', required: true, defaultValue: 'Woofies y Michis' },
      ],
    },
    {
      name: 'subtitle',
      label: 'Subtítulo',
      type: 'text',
      required: true,
      defaultValue: 'Experiencia premium con productos de alta gama y técnicas profesionales en el corazón de Bogotá',
    },
    {
      type: 'group',
      name: 'ctaPrimary',
      label: 'CTA Primario',
      fields: [
        { name: 'label', label: 'Texto', type: 'text', required: true, defaultValue: 'Agenda tu Cita' },
        {
          name: 'type',
          label: 'Tipo de enlace',
          type: 'select',
          defaultValue: 'anchor',
          options: [
            { label: 'Ancla (#contacto)', value: 'anchor' },
            { label: 'Página', value: 'page' },
            { label: 'WhatsApp (desde Configuración del Sitio)', value: 'whatsapp' },
            { label: 'Email (desde Configuración del Sitio)', value: 'email' },
            { label: 'Personalizado', value: 'custom' },
          ],
        },
        { name: 'href', label: 'URL (para Página/Personalizado)', type: 'text' },
      ],
    },
    {
      type: 'group',
      name: 'ctaSecondary',
      label: 'CTA Secundario',
      fields: [
        { name: 'label', label: 'Texto', type: 'text', required: true, defaultValue: 'Ver Servicios' },
        {
          name: 'type',
          label: 'Tipo de enlace',
          type: 'select',
          defaultValue: 'page',
          options: [
            { label: 'Ancla (#contacto)', value: 'anchor' },
            { label: 'Página', value: 'page' },
            { label: 'WhatsApp (desde Configuración del Sitio)', value: 'whatsapp' },
            { label: 'Email (desde Configuración del Sitio)', value: 'email' },
            { label: 'Personalizado', value: 'custom' },
          ],
        },
        { name: 'href', label: 'URL (para Página/Personalizado)', type: 'text', defaultValue: '/perros' },
      ],
    },
    {
      type: 'group',
      name: 'images',
      label: 'Imágenes',
      admin: { description: 'Opcional. Si se omite, se usan imágenes por defecto del proyecto.' },
      fields: [
        { name: 'cat', label: 'Gato principal', type: 'upload', relationTo: 'media' },
        { name: 'kitten', label: 'Gatito', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}

export default HomeHeroGlobal
