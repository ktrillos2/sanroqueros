import { getPayload } from 'payload'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

function ok(secret: string | undefined, token: string | null) {
  return secret && token && token === secret
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const token = url.searchParams.get('token') || request.headers.get('authorization')?.replace('Bearer ', '') || null
  if (!ok(process.env.PAYLOAD_SECRET, token)) return new Response('Unauthorized', { status: 401 })

  const payload = await getPayload({ config })
  const posts = await (payload as any).find({ collection: 'posts', where: { published: { equals: true } }, sort: '-date', depth: 1 })
  const firstFeatured = posts?.docs?.find((p: any) => p.featured) || posts?.docs?.[0]

  const data = {
    hero: {
      title: 'Blog SANROQUE',
      subtitle: 'Consejos expertos, tips profesionales y las últimas novedades sobre el cuidado y bienestar de tus mascotas',
      ctaLabel: 'Ver menciones',
      ctaHref: '#lo-que-hablan',
    },
    featured: firstFeatured?.id || null,
    mentions: [
      {
        title: 'Los Mejores Spas para Mascotas en Bogotá',
        source: 'Revista Mascotas Colombia',
        url: 'https://example.com/mejores-spas-bogota',
        excerpt: 'SanRoque se destaca por su enfoque libre de jaulas y productos premium...',
        date: '2024-12-15',
        logoUrl: '/placeholder.svg?height=40&width=120',
        buttonLabel: 'Leer artículo completo',
      },
      {
        title: 'Tendencias en Grooming Profesional 2025',
        source: 'Pet Industry News',
        url: 'https://example.com/tendencias-grooming-2025',
        excerpt: 'Establecimientos como SanRoque están revolucionando la industria con...',
        date: '2024-12-10',
        logoUrl: '/placeholder.svg?height=40&width=120',
        buttonLabel: 'Leer artículo completo',
      },
      {
        title: 'Certificación Fear Free: Un Estándar de Calidad',
        source: 'Veterinaria Moderna',
        url: 'https://example.com/certificacion-fear-free',
        excerpt: 'SanRoque es uno de los pocos establecimientos certificados en Colombia...',
        date: '2024-12-05',
        logoUrl: '/placeholder.svg?height=40&width=120',
        buttonLabel: 'Leer artículo completo',
      },
    ],
  }

  const saved = await (payload as any).updateGlobal({ slug: 'blogPage', data })
  return Response.json({ saved })
}
