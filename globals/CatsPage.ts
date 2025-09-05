import type { GlobalConfig } from 'payload'

const CatsPage: GlobalConfig = {
  slug: 'catsPage',
  label: 'Página Gatos',
  access: { read: () => true },
  fields: [
    {
      type: 'group',
      name: 'hero',
      label: 'Hero',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Servicios Especializados para Michi' },
        { name: 'highlight', type: 'text', defaultValue: 'Michi' },
        { name: 'subtitle', type: 'textarea', defaultValue: 'Cuidado especializado para michis con técnicas Fear Free y ambiente libre de estrés' },
        { name: 'ctaLabel', type: 'text', defaultValue: 'Agendar Cita' },
        { name: 'ctaHref', type: 'text', defaultValue: 'https://wa.me/573154433109' },
      ],
    },
    {
      name: 'services',
      label: 'Servicios',
      type: 'array',
      fields: [
        { name: 'id', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'text' },
        { name: 'icon', type: 'select', options: ['Heart','Sparkles','Crown','Leaf'], defaultValue: 'Heart' },
        { name: 'features', type: 'array', fields: [{ name: 'value', type: 'text' }] },
        { name: 'colorClass', type: 'text', defaultValue: 'from-pink-500 to-pink-600' },
        { name: 'shadowClass', type: 'text', defaultValue: 'shadow-pink-500/50' },
        { name: 'isPopular', type: 'checkbox', defaultValue: false },
        { name: 'ctaHref', type: 'text', defaultValue: 'https://wa.me/573154433109' },
      ],
    },
    {
      name: 'breedLists',
      label: 'Listas de razas',
      type: 'array',
      fields: [
        { name: 'coatType', type: 'select', options: ['Manto Corto','Manto Medio y Largo'] },
        { name: 'breeds', type: 'array', fields: [{ name: 'value', type: 'text' }] },
      ],
    },
    {
      name: 'priceRows',
      label: 'Precios por tipo de manto',
      type: 'array',
      fields: [
        { name: 'coatType', type: 'select', options: ['Manto Corto','Manto Medio y Largo'], required: true },
        { name: 'SanRoquero', type: 'number', required: true },
        { name: 'Rockstar', type: 'number', required: true },
        { name: 'Superstar', type: 'number', required: true },
        { name: 'Shanti', type: 'number', required: true },
      ],
    },
  ],
}

export default CatsPage
