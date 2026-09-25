import type { GlobalConfig } from 'payload'

const StoreLocationGlobal: GlobalConfig = {
  slug: 'storeLocation',
  label: 'Home - Tienda & Ubicación',
  access: { read: () => true, update: () => true },
  fields: [
    {
      type: 'group',
      name: 'title',
      label: 'Título',
      fields: [
        { name: 'left', label: 'Parte 1', type: 'text', required: true, defaultValue: 'Nuestra' },
        { name: 'yellow', label: 'Resalte Amarillo', type: 'text', required: true, defaultValue: 'Tienda & Ubicación' },
      ],
    },
    {
      name: 'video',
      label: 'Video',
      type: 'group',
      fields: [
        {
          name: 'sourceType',
          label: 'Fuente del video',
          type: 'radio',
          defaultValue: 'youtube',
          options: [
            { label: 'YouTube', value: 'youtube' },
            { label: 'Archivo subido', value: 'upload' },
          ],
          admin: { layout: 'horizontal' },
        },
        {
          name: 'youtubeUrl',
          label: 'URL de YouTube',
          type: 'text',
          admin: {
            condition: (data: any, siblingData: any) => siblingData?.sourceType === 'youtube',
            description: 'Ej: https://www.youtube.com/watch?v=VIDEO_ID o https://youtu.be/VIDEO_ID',
          },
        },
        {
          name: 'file',
          label: 'Archivo de video',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (data: any, siblingData: any) => siblingData?.sourceType === 'upload',
          },
        },
        { name: 'caption', label: 'Leyenda', type: 'text' },
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
              { type: 'text', text: 'Visítanos en nuestras modernas instalaciones diseñadas para el bienestar de tu mascota', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }
            ]}
          ]
        }
      }
    },
    {
      name: 'images',
      label: 'Imágenes de la tienda',
      type: 'array',
      labels: { singular: 'Imagen', plural: 'Imágenes' },
      minRows: 0,
      fields: [
        { name: 'image', label: 'Archivo', type: 'upload', relationTo: 'media', required: true },
        { name: 'alt', label: 'Alt', type: 'text' },
      ],
    },
    {
      name: 'features',
      label: 'Características',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'kind',
          label: 'Tipo de ícono',
          type: 'select',
          hasMany: false,
          options: [
            { label: 'Ubicación', value: 'location' },
            { label: 'Horarios', value: 'hours' },
            { label: 'WhatsApp', value: 'whatsapp' },
          ],
          defaultValue: 'location',
        },
        { name: 'title', type: 'text', label: 'Título', required: true },
        { name: 'description', type: 'text', label: 'Descripción', required: false },
      ],
      defaultValue: [
        { kind: 'location', title: 'Nueva Sede en Bogotá', description: 'Calle 118 #15 - 45, fácil acceso y parqueadero' },
        { kind: 'hours', title: 'Horarios Flexibles', description: 'Lunes a Sábado: 8:00 AM - 6:00 PM' },
        { kind: 'whatsapp', title: 'Reservas & WhatsApp', description: 'WhatsApp: +57 312 311 4435' },
      ],
    },
    {
      name: 'locationCard',
      label: 'Tarjeta de ubicación',
      type: 'group',
      fields: [
        { name: 'title', label: 'Título', type: 'text', defaultValue: '¿Cómo llegar a nuestra Nueva Sede?' },
        { name: 'description', label: 'Descripción', type: 'textarea', defaultValue: 'Estamos ubicados en Calle 118 #15 - 45, Bogotá, con parqueadero disponible y fácil acceso. Contáctanos al 312 3114435 para recibir indicaciones detalladas o agendar tu cita.' },
        { name: 'cityCountry', label: 'Ciudad, País', type: 'text', defaultValue: 'Calle 118 #15 - 45, Bogotá' },
      ],
    },
  ],
}

export default StoreLocationGlobal