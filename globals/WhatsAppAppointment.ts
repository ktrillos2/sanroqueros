import type { GlobalConfig } from 'payload'

const WhatsAppAppointmentGlobal: GlobalConfig = {
  slug: 'whatsappAppointment',
  label: 'Home - Agenda tu Cita (WhatsApp)',
  access: { read: () => true, update: () => true },
  fields: [
    { name: 'title', label: 'Título', type: 'text', required: true, defaultValue: '¿Agenda tu cita por ' },
    { name: 'highlight', label: 'Resaltado (amarillo)', type: 'text', required: false, defaultValue: 'WhatsApp' },
    { name: 'description', label: 'Descripción', type: 'textarea', required: false, defaultValue: 'Déjanos tus datos o escríbenos directo. Respondemos rápido.' },
    {
      name: 'services',
      label: 'Servicios (para el selector)',
      type: 'array',
      labels: { singular: 'Servicio', plural: 'Servicios' },
      fields: [
        { name: 'label', type: 'text', label: 'Etiqueta', required: true },
        { name: 'value', type: 'text', label: 'Valor', required: true },
      ],
      defaultValue: [
        { label: 'Spa Completo', value: 'spa-completo' },
        { label: 'Baño Básico', value: 'bano-basico' },
        { label: 'Ozonoterapia', value: 'ozonoterapia' },
        { label: 'Masajes Terapéuticos', value: 'masajes' },
        { label: 'Solo consulta', value: 'consulta' },
      ],
    },
    {
      name: 'whyUs',
      label: '¿Por qué elegirnos? (lista)',
      type: 'array',
      fields: [
        { name: 'text', type: 'text', label: 'Texto', required: true },
      ],
      defaultValue: [
        { text: 'Productos premium importados' },
        { text: 'Técnicas Fear Free certificadas' },
        { text: 'Atención personalizada para perros y gatos' },
        { text: 'Reconocidos como el mejor spa' },
      ],
    },
  ],
}

export default WhatsAppAppointmentGlobal
