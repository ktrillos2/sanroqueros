import { getPayload } from 'payload'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

function ok(secret: string | undefined, token: string | null) {
  return secret && token && token === secret
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const token = url.searchParams.get('token') || request.headers.get('authorization')?.replace('Bearer ', '') || null
  if (!ok(process.env.PAYLOAD_SECRET, token)) {
    return new Response('Unauthorized', { status: 401 })
  }

  const payload = await getPayload({ config })

  const data = {
    hero: {
      title: 'Servicios Especializados para',
      highlight: 'Michi',
      subtitle: 'Cuidado especializado para michis con técnicas Fear Free y ambiente libre de estrés',
      ctaLabel: 'Agendar Cita',
      ctaHref: 'https://wa.me/573154433109',
    },
    services: [
      {
        id: 'sanroquero',
        title: 'SanRoquero',
        description: 'Servicio básico con productos de calidad',
        icon: 'Heart',
        features: [
          { value: '3 baños completos' },
          { value: 'Productos básicos de calidad' },
          { value: 'Secado profesional' },
          { value: 'Corte de uñas incluido' },
        ],
        colorClass: 'from-pink-500 to-pink-600',
        shadowClass: 'shadow-pink-500/50',
        isPopular: false,
        ctaHref: 'https://wa.me/573154433109',
      },
      {
        id: 'rockstar',
        title: 'Rockstar',
        description: 'Servicio premium con productos selectos',
        icon: 'Sparkles',
        features: [
          { value: '3 baños especializados' },
          { value: 'Productos premium selectos' },
          { value: 'Tratamiento desenredante' },
          { value: 'Limpieza de oídos' },
        ],
        colorClass: 'from-purple-500 to-purple-600',
        shadowClass: 'shadow-purple-500/50',
        isPopular: false,
        ctaHref: 'https://wa.me/573154433109',
      },
      {
        id: 'superstar',
        title: 'Superstar',
        description: 'Servicio de lujo con productos Hydra',
        icon: 'Crown',
        features: [
          { value: '3 baños + mascarilla Hydra' },
          { value: 'Todos los productos Hydra' },
          { value: 'Tratamiento hidratante profundo' },
          { value: 'Aromaterapia felina' },
        ],
        colorClass: 'from-yellow-500 to-yellow-600',
        shadowClass: 'shadow-yellow-500/50',
        isPopular: false,
        ctaHref: 'https://wa.me/573154433109',
      },
      {
        id: 'shanti',
        title: 'Shanti Pet Spa',
        description: 'Experiencia spa con productos Iv San Bernard',
        icon: 'Leaf',
        features: [
          { value: '3 baños terapéuticos' },
          { value: 'Productos Iv San Bernard exclusivos' },
          { value: 'Masaje relajante' },
          { value: 'Ambiente zen completo' },
        ],
        colorClass: 'from-green-500 to-green-600',
        shadowClass: 'shadow-green-500/50',
        isPopular: true,
        ctaHref: 'https://wa.me/573154433109',
      },
    ],
    breedLists: [
      { coatType: 'Manto Corto', breeds: [
        { value: 'Siamés' }, { value: 'Bengalí' }, { value: 'British Short Hair' }, { value: 'Fold Escocés' }, { value: 'Azul Ruso' }, { value: 'Savannah' }, { value: 'Bombay' }
      ]},
      { coatType: 'Manto Medio y Largo', breeds: [
        { value: 'Persa' }, { value: 'Ragdoll' }, { value: 'Bosque de Noruega' }, { value: 'Angora' }, { value: 'Himalayo' }
      ]},
    ],
    priceRows: [
      { coatType: 'Manto Corto', SanRoquero: 109, Rockstar: 119, Superstar: 140, Shanti: 200 },
      { coatType: 'Manto Medio y Largo', SanRoquero: 128, Rockstar: 144, Superstar: 166, Shanti: 225 },
    ],
  }

  const saved = await (payload as any).updateGlobal({ slug: 'catsPage', data })
  return Response.json({ saved })
}
