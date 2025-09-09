/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv/config')
const { getPayload } = require('payload')
const config = require('../payload.config').default

async function run() {
  const payload = await getPayload({ config })

  const data = {
    businessName: 'SANROQUE',
    logos: {
      light: '/images/sanroque-logo-black.webp',
      dark: '/images/sanroque-logo-white.webp',
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

  try {
    await payload.updateGlobal({ slug: 'siteSettings', data })
    console.log('Updated siteSettings')
  } catch (e) {
    await payload.createGlobal({ slug: 'siteSettings', data })
    console.log('Created siteSettings')
  }
}

run().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1) })
