require('dotenv/config')
require('ts-node/register')
const { getPayload } = require('payload')

async function run() {
    const payloadConfig = require('../payload.config.ts').default
    const payload = await getPayload({ config: payloadConfig })

    // Contenido actual del header (mismo que usa el componente por defecto)
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

    await payload.updateGlobal({ slug: 'header', data })
    console.log('Upserted header')
}

run().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1) })
