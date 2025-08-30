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
    nombreComercial: 'SANROQUE',
    logos: {
      claro: null as any, // ID de media (se puede cargar desde el Admin)
      oscuro: null as any,
    },
    whatsapps: [
      { etiqueta: 'Principal', numero: '573154433109', mostrar: '+57 315 443 3109', principal: true },
    ],
    correos: [
      { direccion: 'info@sanroque.com', etiqueta: 'General', principal: true },
    ],
    ubicacion: {
      ciudadPais: 'Bogotá, Colombia',
      direccion: '',
      googleMapsUrl: '',
    },
    horarios: [
      { dia: 'Lunes a Viernes', abre: '09:00', cierra: '18:00', nota: '' },
      { dia: 'Sábado', abre: '09:00', cierra: '14:00', nota: '' },
    ],
    redes: {
      instagram: '',
      facebook: '',
      youtube: '',
      tiktok: '',
    },
    mensajeWhatsAppPorDefecto:
      'Hola, vengo desde la web. Me gustaría agendar una cita para mi mascota.',
  }

  // updateGlobal crea/actualiza el Global si no existe
  await (payload as any).updateGlobal({ slug: 'siteSettings', data })

  return Response.json({ ok: true, slug: 'siteSettings', data })
}
