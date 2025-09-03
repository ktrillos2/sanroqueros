import type { GlobalConfig } from 'payload'

const GalleryGlobal: GlobalConfig = {
  slug: 'gallery',
  label: 'Home - Galería Peluditos',
  access: { read: () => true, update: () => true },
  fields: [
    {
      type: 'group',
      name: 'title',
      label: 'Título',
      fields: [
        { name: 'left', label: 'Parte 1', type: 'text', required: true, defaultValue: 'Galería de' },
        { name: 'yellow', label: 'Resalte Amarillo', type: 'text', required: true, defaultValue: 'Nuestros Peluditos' },
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
            {
              type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [
                { type: 'text', text: 'Descubre las increíbles transformaciones de nuestros clientes peludos', detail: 0, format: 0, mode: 'normal', style: '', version: 1 },
              ],
            },
          ],
        },
      },
    },
    {
      name: 'items',
      label: 'Elementos de la galería',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', label: 'Título', type: 'text', required: true },
        { name: 'description', label: 'Descripción (WYSIWYG)', type: 'richText' },
        { name: 'category', label: 'Categoría', type: 'text' },
        { name: 'image', label: 'Imagen', type: 'upload', relationTo: 'media', required: false },
      ],
      defaultValue: [
        { title: 'Antes & Después', category: 'Transformación', description: { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'text', text: 'Beagle feliz después de su sesión de spa', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }] }] } }, image: null },
        { title: 'Compañeros de Spa', category: 'Experiencia', description: { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'text', text: 'Golden Retriever y amigo disfrutando juntos', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }] }] } }, image: null },
        { title: 'Momento de Relajación', category: 'Bienestar', description: { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'text', text: 'Baño terapéutico con productos premium', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }] }] } }, image: null },
        { title: 'Masaje Especializado', category: 'Terapia', description: { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'text', text: 'Técnicas profesionales de relajación', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }] }] } }, image: null },
      ],
    },
  ],
}

export default GalleryGlobal
