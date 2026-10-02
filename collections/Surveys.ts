import type { CollectionConfig } from 'payload'

export const Surveys: CollectionConfig = {
  slug: 'surveys',
  labels: {
    singular: 'Encuesta',
    plural: 'Encuestas de Satisfacción',
  },
  admin: {
    useAsTitle: 'tutorName',
    defaultColumns: ['tutorName', 'petName', 'phone', 'service', 'ratingGeneral', 'nps', 'createdAt'],
    description: 'Respuestas de clientes a la Encuesta Rápida de SanRoque',
  },
  access: {
    read: ({ req }) => !!req?.user,
    create: () => true, // Permite creación pública desde el formulario de la web
    update: ({ req }) => !!req?.user,
    delete: ({ req }) => !!req?.user,
  },
  fields: [
    {
      name: 'tutorName',
      type: 'text',
      label: 'Nombre del tutor/a',
      required: true,
    },
    {
      name: 'petName',
      type: 'text',
      label: 'Nombre de la mascota',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Teléfono / WhatsApp',
      required: true,
    },
    {
      name: 'email',
      type: 'text',
      label: 'Correo electrónico',
    },
    {
      name: 'service',
      type: 'text',
      label: 'Servicio recibido',
    },
    {
      name: 'serviceOther',
      type: 'text',
      label: 'Otro servicio especificado',
    },
    {
      name: 'ratingGeneral',
      type: 'number',
      label: 'Calificación general (1 al 5)',
    },
    {
      name: 'ratingResult',
      type: 'number',
      label: 'Satisfacción con el resultado (1 al 5)',
    },
    {
      name: 'ratingStaff',
      type: 'number',
      label: 'Atención y amabilidad del equipo (1 al 5)',
    },
    {
      name: 'likedMost',
      type: 'textarea',
      label: '¿Qué fue lo que más le gustó?',
    },
    {
      name: 'improvements',
      type: 'textarea',
      label: '¿Qué podríamos mejorar?',
    },
    {
      name: 'nps',
      type: 'number',
      label: 'Recomendación NPS (1 al 10)',
    },
    {
      name: 'returnVisit',
      type: 'text',
      label: '¿Volvería a visitarnos?',
    },
    {
      name: 'authorizeTestimonial',
      type: 'text',
      label: '¿Autoriza usar comentario como testimonio?',
    },
  ],
}

export default Surveys
