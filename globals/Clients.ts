import type { GlobalConfig } from 'payload'

const ClientsGlobal: GlobalConfig = {
  slug: 'clients',
  label: 'Home - Nuestros Clientes',
  access: { read: () => true, update: () => true },
  fields: [
    {
      type: 'group',
      name: 'title',
      label: 'Título',
      fields: [
        { name: 'left', label: 'Izquierda', type: 'text', required: true, defaultValue: 'Nuestros' },
        { name: 'highlight', label: 'Resalte', type: 'text', required: true, defaultValue: 'Clientes' },
      ],
    },
    {
      name: 'intro',
      label: 'Introducción (WYSIWYG)',
      type: 'richText',
    },
    {
      name: 'clients',
      label: 'Clientes',
      type: 'array',
      labels: { singular: 'Cliente', plural: 'Clientes' },
      fields: [
        { name: 'name', label: 'Nombre', type: 'text', required: true },
        { name: 'logo', label: 'Logo', type: 'upload', relationTo: 'media', required: true },
        { name: 'website', label: 'Sitio web', type: 'text' },
        { name: 'note', label: 'Nota', type: 'text' },
      ],
    },
  ],
}

export default ClientsGlobal
