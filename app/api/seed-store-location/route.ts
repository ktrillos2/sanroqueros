import { NextRequest } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
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
    title: { left: 'Nuestra', yellow: 'Tienda & Ubicación' },
    intro: {
      root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: [
        { type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [
          { type: 'text', text: 'Visítanos en nuestras modernas instalaciones diseñadas para el bienestar de tu mascota', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }
        ]}
      ] }
    },
    video: {
      sourceType: 'youtube',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      file: null as any,
      caption: 'Recorrido por nuestras instalaciones',
    },
    images: [],
    features: [
      { kind: 'location', title: 'Ubicación Privilegiada', description: 'En el corazón de Bogotá, fácil acceso y parqueadero' },
      { kind: 'hours', title: 'Horarios Flexibles', description: 'Lunes a Sábado: 8:00 AM - 6:00 PM' },
      { kind: 'whatsapp', title: 'Reservas', description: 'WhatsApp: +57 315 443 3109' },
    ],
    locationCard: {
      title: '¿Cómo llegar?',
      description: 'Estamos ubicados en una zona de fácil acceso con parqueadero disponible. Contáctanos para recibir indicaciones detalladas.',
      cityCountry: 'Bogotá, Colombia',
    },
  }

  await (payload as any).updateGlobal({ slug: 'storeLocation', data })

  return Response.json({ ok: true, slug: 'storeLocation', data })
}
