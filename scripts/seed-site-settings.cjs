require('dotenv/config')
require('ts-node/register')
const { getPayload } = require('payload')

async function run() {
  const payloadConfig = require('../payload.config.ts').default
  const payload = await getPayload({ config: payloadConfig })

  const data = {
    businessName: 'SANROQUE',
    logos: {
      light: '/images/sanroque-logo-black.png',
      dark: '/images/sanroque-logo-white.png',
    },
    whatsapps: [
      {
        label: 'Principal',
        numberRaw: '573154433109',
        display: '+57 315 443 3109',
        isPrimary: true,
      },
    ],
    emails: [
      { address: 'info@sanroque.com', label: 'General', isPrimary: true },
    ],
    location: {
      cityCountry: 'Bogotá, Colombia',
      address: '',
      googleMapsUrl: '',
    },
    hours: [
      { day: 'Lunes a Viernes', open: '09:00', close: '18:00', note: '' },
      { day: 'Sábado', open: '09:00', close: '14:00', note: '' },
    ],
    social: {
      instagram: '',
      facebook: '',
      youtube: '',
      tiktok: '',
    },
    whatsappDefaultMessage:
      'Hola, vengo desde la web. Me gustaría agendar una cita para mi mascota.',
  }

  await payload.updateGlobal({ slug: 'siteSettings', data })
  console.log('Upserted siteSettings')
}

run().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1) })
