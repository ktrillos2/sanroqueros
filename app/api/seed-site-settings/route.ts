import { NextRequest } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET(req: NextRequest) {
  // Allow token either via query ?token= or Authorization: Bearer <token>
  const queryToken = req.nextUrl.searchParams.get('token')
  const authHeader = req.headers.get('authorization') || ''
  const bearerMatch = authHeader.match(/^Bearer\s+(.+)$/i)
  const headerToken = bearerMatch?.[1]
  const token = queryToken || headerToken
  if (!token || token !== process.env.PAYLOAD_SECRET) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  const payload = await getPayload({ config })

  const data = {
    businessName: 'SANROQUE',
    logos: {
      light: '/images/sanroque-logo-black.png',
      dark: '/images/sanroque-logo-white.png',
    },
    whatsapps: [
      { label: 'Principal', numberRaw: '573154433109', display: '+57 315 443 3109', isPrimary: true },
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

  // updateGlobal crea/actualiza el Global si no existe
  await (payload as any).updateGlobal({ slug: 'siteSettings', data })

  return Response.json({ ok: true, slug: 'siteSettings', data })
}
