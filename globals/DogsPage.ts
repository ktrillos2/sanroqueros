import type { GlobalConfig } from 'payload'

const DogsPage: GlobalConfig = {
  slug: 'dogsPage',
  label: 'Página Perros',
  access: { read: () => true },
  fields: [
    {
      type: 'group',
      name: 'hero',
      label: 'Hero',
      fields: [
        { name: 'badgeText', type: 'text', label: 'Texto de insignia', defaultValue: '🏆 Certificados Fear Free' },
        { name: 'badgeTextColor', type: 'select', label: 'Color texto insignia', defaultValue: 'black', options: [
          { label: 'Negro', value: 'black' },
          { label: 'Blanco', value: 'white' },
        ] },
        { name: 'titlePrefix', type: 'text', label: 'Prefijo del título', defaultValue: 'Grooming para' },
        { name: 'highlight', type: 'text', label: 'Texto destacado', defaultValue: 'Woofie' },
        { name: 'subtitle', type: 'textarea', label: 'Subtítulo', defaultValue: '4 niveles de servicio diseñados para el bienestar y belleza de tu mejor amigo. Desde cuidado básico hasta experiencias de lujo con productos premium.' },
        { name: 'primaryCtaLabel', type: 'text', label: 'CTA principal (label)', defaultValue: '✨ Ver Servicios' },
        { name: 'primaryCtaHref', type: 'text', label: 'CTA principal (href)', defaultValue: '#servicios' },
        { name: 'secondaryCtaLabel', type: 'text', label: 'CTA secundario (label)', defaultValue: '🔍 Identificar Manto' },
        { name: 'secondaryCtaHref', type: 'text', label: 'CTA secundario (href)', defaultValue: '#identificar-manto' },
      ],
    },
    {
      name: 'services',
      label: 'Servicios',
      type: 'array',
      labels: { singular: 'Servicio', plural: 'Servicios' },
      fields: [
        { name: 'id', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'text' },
        { name: 'icon', type: 'select', options: ['Heart','Sparkles','Crown','Leaf'], defaultValue: 'Heart' },
        { name: 'features', type: 'array', fields: [{ name: 'value', type: 'text', label: 'Característica' }] },
        { name: 'colorClass', type: 'text', label: 'Clase gradiente (Tailwind)', defaultValue: 'from-blue-500 to-blue-600' },
        { name: 'shadowClass', type: 'text', label: 'Sombra hover (Tailwind)', defaultValue: 'shadow-blue-500/50' },
        { name: 'isPopular', type: 'checkbox', label: 'Más Popular', defaultValue: false },
        { name: 'ctaHref', type: 'text', label: 'Enlace CTA', defaultValue: 'https://wa.me/573154433109' },
      ],
    },
    {
      type: 'group',
      name: 'breedLists',
      label: 'Listas de razas',
      fields: [
        {
          type: 'group',
          name: 'corto',
          label: 'Manto corto',
          fields: [
            { name: 'minis', type: 'array', fields: [{ name: 'value', type: 'text' }] },
            { name: 'pequenos', type: 'array', fields: [{ name: 'value', type: 'text' }] },
            { name: 'medianos', type: 'array', fields: [{ name: 'value', type: 'text' }] },
            { name: 'grandes', type: 'array', fields: [{ name: 'value', type: 'text' }] },
            { name: 'gigantes', type: 'array', fields: [{ name: 'value', type: 'text' }] },
          ],
        },
        {
          type: 'group',
          name: 'medioLargo',
          label: 'Manto medio y largo',
          fields: [
            { name: 'minis', type: 'array', fields: [{ name: 'value', type: 'text' }] },
            { name: 'pequenos', type: 'array', fields: [{ name: 'value', type: 'text' }] },
            { name: 'medianos', type: 'array', fields: [{ name: 'value', type: 'text' }] },
            { name: 'grandes', type: 'array', fields: [{ name: 'value', type: 'text' }] },
            { name: 'gigantes', type: 'array', fields: [{ name: 'value', type: 'text' }] },
          ],
        },
      ],
    },
    {
      name: 'priceTable',
      label: 'Tabla de precios',
      type: 'array',
      labels: { singular: 'Fila Precio', plural: 'Filas Precios' },
      fields: [
        { name: 'coatType', type: 'select', options: [
          { label: 'Corto', value: 'corto' },
          { label: 'Medio/Largo', value: 'medioLargo' },
        ], required: true },
        { name: 'size', type: 'select', options: ['minis','pequeños','medianos','grandes','gigantes'], required: true },
        { name: 'sanroquero', type: 'number', required: true },
        { name: 'rockstar', type: 'number', required: true },
        { name: 'superstar', type: 'number', required: true },
        { name: 'shanti', type: 'number', required: true },
      ],
    },
  ],
}

export default DogsPage
