import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Usuario',
    plural: 'Usuarios',
  },
  admin: {
    useAsTitle: 'email',
    description: 'Gestión de usuarios del sistema',
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
