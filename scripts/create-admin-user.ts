/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv/config')
const { getPayload } = require('payload')
const config = require('../payload.config').default

async function main() {
  const email = process.env.NEW_ADMIN_EMAIL || 'contacto@kytcode.lat'
  const password = process.env.NEW_ADMIN_PASSWORD
  if (!password) {
    console.error('ERROR: Debes definir NEW_ADMIN_PASSWORD como variable de entorno antes de ejecutar este script.')
    process.exit(1)
  }

  console.log(`Inicializando Payload para crear usuario: ${email}...`)
  const payload = await getPayload({ config })

  // Verificar si ya existe
  const existing = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: email,
      },
    },
  })

  if (existing.totalDocs > 0) {
    console.log(`El usuario ${email} ya existe en la base de datos (ID: ${existing.docs[0].id}). Actualizando contraseña...`)
    await payload.update({
      collection: 'users',
      id: existing.docs[0].id,
      data: {
        password,
      },
    })
    console.log(`Contraseña de ${email} actualizada exitosamente.`)
    return
  }

  const user = await payload.create({
    collection: 'users',
    data: {
      email,
      password,
    },
  })

  console.log(`Usuario administrador creado con éxito! ID: ${user.id}, Email: ${user.email}`)
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error('Error al crear usuario:', e)
    process.exit(1)
  })
