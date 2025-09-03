import type { GlobalConfig } from 'payload'

export const HeaderGlobal: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  access: { read: () => true, update: () => true },
  fields: [
    {
      name: 'menu',
      label: 'Menú',
      type: 'array',
      labels: { singular: 'Item', plural: 'Items' },
      minRows: 1,
      fields: [
        { name: 'label', label: 'Texto', type: 'text', required: true },
        { name: 'href', label: 'URL', type: 'text', required: true },
      ],
      admin: { description: 'Enlaces de navegación del header.' },
    },
    {
      type: 'group',
      name: 'cta',
      label: 'Botón CTA',
      fields: [
        { name: 'label', label: 'Texto del botón', type: 'text', required: true, defaultValue: 'Agendar Cita' },
        { name: 'href', label: 'URL', type: 'text', required: true, defaultValue: '/#contacto' },
      ],
    },
  ],
}

export default HeaderGlobal