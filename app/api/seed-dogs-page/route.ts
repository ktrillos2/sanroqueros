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

  // Datos equivalentes a los visibles actualmente
  const data = {
    hero: {
      badgeText: '🏆 Certificados Fear Free',
      badgeTextColor: 'black',
      titlePrefix: 'Grooming para',
      highlight: 'Woofie',
      subtitle: '4 niveles de servicio diseñados para el bienestar y belleza de tu mejor amigo. Desde cuidado básico hasta experiencias de lujo con productos premium.',
      primaryCtaLabel: '✨ Ver Servicios',
      primaryCtaHref: '#servicios',
      secondaryCtaLabel: '🔍 Identificar Manto',
      secondaryCtaHref: '#identificar-manto',
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
        colorClass: 'from-blue-500 to-blue-600',
        shadowClass: 'shadow-blue-500/50',
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
          { value: 'Productos premium selectos (no todos Hydra)' },
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
          { value: '4 baños + mascarilla Hydra' },
          { value: 'TODOS los productos Hydra' },
          { value: 'Tratamiento hidratante profundo' },
          { value: 'Aromaterapia canina' },
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
          { value: 'SOLO productos Iv San Bernard' },
          { value: 'Masaje relajante' },
          { value: 'Ambiente zen completo' },
        ],
        colorClass: 'from-green-500 to-green-600',
        shadowClass: 'shadow-green-500/50',
        isPopular: true,
        ctaHref: 'https://wa.me/573154433109',
      },
    ],
    breedLists: {
      corto: {
        minis: [{ value: 'Chihuahua' }, { value: 'Pinscher' }],
        pequenos: [
          { value: 'Pug' },
          { value: 'Boston Terrier' },
          { value: 'Beagle' },
          { value: 'Bulldog Francés' },
          { value: 'Jack Russell' },
          { value: 'Teckel' },
        ],
        medianos: [
          { value: 'Bulldog Inglés' },
          { value: 'Basset Hound' },
          { value: 'Pitbull' },
          { value: 'Bull Terrier' },
          { value: 'Pastor Ganadero Australiano' },
          { value: 'Stanford Terrier' },
          { value: 'Basset Hound' },
        ],
        grandes: [
          { value: 'Labrador' },
          { value: 'Boxer' },
          { value: 'Weimaraner' },
          { value: 'Pointer' },
          { value: 'Dalmata' },
          { value: 'Pointer' },
          { value: 'Doberman' },
        ],
        gigantes: [
          { value: 'Pastor Alemán' },
          { value: 'Gran Danés' },
          { value: 'Rhodesian' },
          { value: 'Braco' },
          { value: 'Rottweiler' },
          { value: 'Fila Brasilero' },
        ],
      },
      medioLargo: {
        minis: [
          { value: 'Yorkshire Mini' },
          { value: 'Maltés Toy' },
          { value: 'Caniche Toy' },
          { value: 'Bichón Boloñés' },
        ],
        pequenos: [
          { value: 'Shih Tzu' },
          { value: 'Schnauzer' },
          { value: 'Maltés' },
          { value: 'Poodle' },
          { value: 'Yorkie' },
          { value: 'Pomerania' },
          { value: 'Bichón' },
          { value: 'Lasha Apso' },
          { value: 'Westie' },
          { value: 'Scottish Terrier' },
          { value: 'Fox Terrier' },
        ],
        medianos: [
          { value: 'Cocker' },
          { value: 'Springer Spaniel' },
          { value: 'Border Collie' },
          { value: 'Pastor Australiano' },
          { value: 'Shetland' },
          { value: 'Shiba Inu' },
        ],
        grandes: [
          { value: 'Golden Retriever' },
          { value: 'Samoyedo' },
          { value: 'Airdale Terrier' },
          { value: 'Chow Chow' },
          { value: 'Akita' },
          { value: 'Australian Labradoodle' },
          { value: 'Husky' },
        ],
        gigantes: [
          { value: 'Terranova' },
          { value: 'San Bernardo' },
          { value: 'Alaskan Malamute' },
          { value: 'Pastor Alemán Pelo Largo' },
          { value: 'Bernés de la Montaña' },
          { value: 'Pastor Ovejero Inglés' },
        ],
      },
    },
    priceTable: [
      // corto
      { coatType: 'corto', size: 'minis', sanroquero: 65, rockstar: 76, superstar: 97, shanti: 157 },
      { coatType: 'corto', size: 'pequeños', sanroquero: 78, rockstar: 88, superstar: 110, shanti: 170 },
      { coatType: 'corto', size: 'medianos', sanroquero: 91, rockstar: 101, superstar: 122, shanti: 183 },
      { coatType: 'corto', size: 'grandes', sanroquero: 103, rockstar: 117, superstar: 143, shanti: 206 },
      { coatType: 'corto', size: 'gigantes', sanroquero: 116, rockstar: 130, superstar: 155, shanti: 229 },
      // medio/largo
      { coatType: 'medioLargo', size: 'minis', sanroquero: 84, rockstar: 94, superstar: 116, shanti: 175 },
      { coatType: 'medioLargo', size: 'pequeños', sanroquero: 97, rockstar: 106, superstar: 129, shanti: 188 },
      { coatType: 'medioLargo', size: 'medianos', sanroquero: 110, rockstar: 125, superstar: 145, shanti: 201 },
      { coatType: 'medioLargo', size: 'grandes', sanroquero: 129, rockstar: 157, superstar: 176, shanti: 232 },
      { coatType: 'medioLargo', size: 'gigantes', sanroquero: 218, rockstar: 246, superstar: 265, shanti: 308 },
    ],
  }

  const saved = await (payload as any).updateGlobal({ slug: 'dogsPage', data })
  return Response.json({ saved })
}
