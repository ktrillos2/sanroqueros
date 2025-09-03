/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv/config')
const { getPayload: getPayloadFn } = require('payload')
const payloadConfig = require('../payload.config').default

async function run() {
  const payload = await getPayloadFn({ config: payloadConfig })

  const data = {
    menu: [
      { label: 'Inicio', href: '/' },
      { label: 'Perros', href: '/perros' },
      { label: 'Gatos', href: '/gatos' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contacto', href: '/#contacto' },
    ],
    cta: { label: 'Agendar Cita', href: '/#contacto' },
  }

  try {
    await payload.updateGlobal({ slug: 'header', data })
    console.log('Updated header')
  } catch (e) {
    await payload.createGlobal({ slug: 'header', data })
    console.log('Created header')
  }
}

run()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
