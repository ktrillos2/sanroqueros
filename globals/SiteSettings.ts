import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  label: 'Configuración del Sitio',
  access: {
    read: () => true,
    update: ({ req }) => {
      // En desarrollo, permitir siempre
      if (process.env.NODE_ENV !== 'production') return true
      // En prod, permitir si hay usuario o cookie de sesión de Payload
      const hasUser = Boolean((req as any)?.user)
      const cookie = (req as any)?.headers?.cookie as string | undefined
      const hasPayloadCookie = typeof cookie === 'string' && /payload/i.test(cookie)
      return hasUser || hasPayloadCookie
    },
  },
  fields: [
    {
      name: 'nombreComercial',
      label: 'Nombre comercial',
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
          name: 'claro',
          label: 'Logo para fondo claro',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Sube el logo para fondos claros (PNG/SVG/JPG).' },
        },
        {
          name: 'oscuro',
          label: 'Logo para fondo oscuro',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Sube el logo para fondos oscuros (PNG/SVG/JPG).' },
        },
      ],
    },
    {
      name: 'whatsapps',
      label: 'Números de WhatsApp',
      type: 'array',
      minRows: 1,
  labels: { singular: 'WhatsApp', plural: 'WhatsApps' },
      fields: [
        { name: 'etiqueta', label: 'Etiqueta', type: 'text', defaultValue: 'Principal' },
        { name: 'numero', label: 'Número (sin signos)', type: 'text', required: true, admin: { description: 'Ej: 573154433109' } },
        { name: 'mostrar', label: 'Formato visible', type: 'text', admin: { description: 'Ej: +57 315 443 3109' } },
        { name: 'principal', label: 'Principal', type: 'checkbox', defaultValue: true },
      ],
    },
    {
      name: 'correos',
      label: 'Correos de contacto',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'direccion', label: 'Correo', type: 'email', required: true },
        { name: 'etiqueta', label: 'Etiqueta', type: 'text', defaultValue: 'General' },
        { name: 'principal', label: 'Principal', type: 'checkbox', defaultValue: true },
      ],
    },
    {
      type: 'group',
      name: 'ubicacion',
      label: 'Ubicación',
      fields: [
        { name: 'ciudadPais', label: 'Ciudad y país', type: 'text', required: true },
        { name: 'direccion', label: 'Dirección', type: 'text' },
        { name: 'googleMapsUrl', label: 'URL de Google Maps', type: 'text' },
      ],
    },
    {
      name: 'horarios',
      label: 'Horarios',
      type: 'array',
      labels: { singular: 'Horario', plural: 'Horarios' },
      fields: [
        { name: 'dia', label: 'Día(s)', type: 'text', admin: { placeholder: 'Lunes a Viernes' } },
        { name: 'abre', label: 'Abre', type: 'text', admin: { placeholder: '09:00' } },
        { name: 'cierra', label: 'Cierra', type: 'text', admin: { placeholder: '18:00' } },
        { name: 'nota', label: 'Nota', type: 'text' },
      ],
    },
    {
      type: 'group',
      name: 'redes',
      label: 'Redes Sociales',
      fields: [
        { name: 'instagram', type: 'text' },
        { name: 'facebook', type: 'text' },
        { name: 'youtube', type: 'text' },
        { name: 'tiktok', type: 'text' },
      ],
    },
    {
      name: 'mensajeWhatsAppPorDefecto',
      label: 'Mensaje por defecto para WhatsApp',
      type: 'textarea',
      defaultValue:
        'Hola, vengo desde la web. Me gustaría agendar una cita para mi mascota.',
    },
  ],
}

export default SiteSettings
