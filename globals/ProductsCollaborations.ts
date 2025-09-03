import type { GlobalConfig } from 'payload'

const ProductsCollaborationsGlobal: GlobalConfig = {
  slug: 'productsCollaborations',
  label: 'Home - Productos & Colaboraciones',
  access: { read: () => true, update: () => true },
  fields: [
    {
      type: 'group',
      name: 'title',
      label: 'Título',
      fields: [
        { name: 'left', label: 'Parte 1', type: 'text', required: true, defaultValue: 'Productos & ' },
        { name: 'yellow', label: 'Resalte Amarillo', type: 'text', required: true, defaultValue: 'Colaboraciones' },
      ],
    },
    {
      name: 'intro',
      label: 'Introducción (WYSIWYG)',
      type: 'richText',
      required: false,
      defaultValue: {
        root: {
          type: 'root', format: '', indent: 0, version: 1, direction: 'ltr',
          children: [
            { type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [
              { type: 'text', text: 'Trabajamos con las mejores marcas internacionales para garantizar resultados excepcionales en el cuidado de tu mascota.', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }
            ]}
          ]
        }
      }
    },
    {
      name: 'items',
      label: 'Productos / Colaboraciones',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'name', type: 'text', label: 'Nombre', required: true },
        { name: 'badge', type: 'text', label: 'Insignia', required: false },
        { name: 'description', type: 'richText', label: 'Descripción (WYSIWYG)', required: false },
        { name: 'benefits', type: 'array', label: 'Beneficios', fields: [{ name: 'text', type: 'text' }] },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Imagen', required: false },
        { name: 'color', type: 'text', label: 'Gradiente Tailwind', required: false, defaultValue: 'from-brand-yellow to-brand-pink' },
      ],
      defaultValue: [
        {
          name: 'Hydra by Pet Society',
          badge: 'Premium',
          description: {
            root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: [
              { type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [
                { type: 'text', text: 'Línea premium de productos para el cuidado de la piel y pelaje. Fórmulas avanzadas que proporcionan hidratación profunda y brillo natural.', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }
              ]}
            ] }
          },
          benefits: [{ text: 'Hidratación profunda' }, { text: 'Brillo natural' }, { text: 'Piel saludable' }, { text: 'Pelaje sedoso' }],
          image: null,
          color: 'from-yellow-400 to-amber-500',
        },
        {
          name: 'Iv San Bernard',
          badge: 'Terapéutico',
          description: {
            root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: [
              { type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [
                { type: 'text', text: 'Dermocosmética profesional italiana especializada en el cuidado de mascotas. Productos terapéuticos con resultados visibles desde la primera aplicación.', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }
              ]}
            ] }
          },
          benefits: [{ text: 'Dermocosmética italiana' }, { text: 'Resultados terapéuticos' }, { text: 'Calidad profesional' }, { text: 'Cuidado especializado' }],
          image: null,
          color: 'from-blue-400 to-cyan-500',
        },
      ],
    },
  ],
}

export default ProductsCollaborationsGlobal
