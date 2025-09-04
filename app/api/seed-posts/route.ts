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

  const posts = [
    {
      title: 'Guía Completa: Cuidado Básico para Perros y Gatos',
      slug: 'cuidado-basico-perros-gatos',
      excerpt: 'Descubre los fundamentos esenciales para mantener a tu mascota feliz y saludable. Desde alimentación hasta ejercicio diario.',
      category: 'Cuidado Básico',
      author: 'Dr. María González',
      date: '2025-01-15',
      readTime: '8 min',
      featured: true,
      published: true,
    },
    {
      title: '5 Beneficios del Grooming Profesional que No Conocías',
      slug: 'beneficios-grooming-profesional',
      excerpt: 'El grooming va más allá de la estética. Conoce cómo puede mejorar la salud y bienestar de tu mascota.',
      category: 'Grooming',
      author: 'Ana Rodríguez',
      date: '2025-01-10',
      readTime: '6 min',
      featured: false,
      published: true,
    },
  ]

  for (const p of posts) {
    const existing = await (payload as any).find({ collection: 'posts', where: { slug: { equals: p.slug } }, limit: 1 })
    if (existing?.docs?.length) {
      await (payload as any).update({ collection: 'posts', id: existing.docs[0].id, data: p })
    } else {
      await (payload as any).create({ collection: 'posts', data: p })
    }
  }

  return Response.json({ ok: true, count: posts.length })
}
