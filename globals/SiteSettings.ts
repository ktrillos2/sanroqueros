import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'businessName',
      type: 'text',
      required: true,
      defaultValue: 'SANROQUE',
    },
    {
      type: 'group',
      name: 'logos',
      label: 'Logos',
      fields: [
        {
          name: 'light',
          label: 'Logo para fondo claro (ruta pública)',
          type: 'text',
          defaultValue: '/images/sanroque-logo-black.png',
        },
        {
          name: 'dark',
          label: 'Logo para fondo oscuro (ruta pública)',
          type: 'text',
          defaultValue: '/images/sanroque-logo-white.png',
        },
      ],
    },
    {
      name: 'whatsapps',
      label: 'Números de WhatsApp',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Principal' },
        { name: 'numberRaw', type: 'text', required: true, admin: { description: 'Número sin signos, ej: 573154433109' } },
        { name: 'display', type: 'text', admin: { description: 'Formato visible, ej: +57 315 443 3109' } },
        { name: 'isPrimary', type: 'checkbox', defaultValue: true },
      ],
    },
    {
      name: 'emails',
      label: 'Emails de contacto',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'address', type: 'email', required: true },
        { name: 'label', type: 'text', defaultValue: 'General' },
        { name: 'isPrimary', type: 'checkbox', defaultValue: true },
      ],
    },
    {
      type: 'group',
      name: 'location',
      label: 'Ubicación',
      fields: [
        { name: 'cityCountry', type: 'text', required: true },
        { name: 'address', type: 'text' },
        { name: 'googleMapsUrl', type: 'text' },
      ],
    },
    {
      name: 'hours',
      label: 'Horarios',
      type: 'array',
      labels: { singular: 'Horario', plural: 'Horarios' },
      fields: [
        { name: 'day', type: 'text', admin: { placeholder: 'Lunes a Viernes' } },
        { name: 'open', type: 'text', admin: { placeholder: '09:00' } },
        { name: 'close', type: 'text', admin: { placeholder: '18:00' } },
        { name: 'note', type: 'text' },
      ],
    },
    {
      type: 'group',
      name: 'social',
      label: 'Redes Sociales',
      fields: [
        { name: 'instagram', type: 'text' },
        { name: 'facebook', type: 'text' },
        { name: 'youtube', type: 'text' },
        { name: 'tiktok', type: 'text' },
      ],
    },
    {
      name: 'whatsappDefaultMessage',
      label: 'Mensaje por defecto para WhatsApp',
      type: 'textarea',
      defaultValue:
        'Hola, vengo desde la web. Me gustaría agendar una cita para mi mascota.',
    },
  ],
}

export default SiteSettings
