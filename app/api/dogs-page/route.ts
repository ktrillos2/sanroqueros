import { getPayload } from 'payload'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export async function GET() {
  const payload = await getPayload({ config })
  const data = await (payload as any).findGlobal({ slug: 'dogsPage', depth: 1 })
  return Response.json({ data })
}

export async function POST() {
  try {
    const payload = await getPayload({ config })
    const current = await (payload as any).findGlobal({ slug: 'dogsPage', depth: 1 })

    const updatedServices = (current?.services || []).map((s: any) => {
      if (s.id === 'sanroquero') {
        return {
          ...s,
          title: 'SanRoquero',
          subtitle: 'El cuidado esencial de SanRoque',
          cosmetics: 'Cosmética Velox',
          description: 'El Sanroquero es nuestro servicio de mantenimiento, realizado con cosmética Velox, ideal para mantener a tu Sanroquero limpio, fresco y con una buena higiene.',
          exclusions: 'No incluye corte de peluquería ni sesiones de desenredo.',
          features: [
            { value: 'Baño + enjuague / baño + enjuague' },
            { value: '🐾 Secado y cepillado' },
            { value: '✂️ Corte de uñas' },
            { value: '👂 Limpieza de oídos' },
            { value: '🦷 Limpieza dental' },
            { value: '🧼 Limpieza facial con Hydra Extra Soft Facial Shampoo, especialmente formulado para brindar una limpieza suave y delicada en la zona facial.' },
          ],
          ctaHref: 'https://wa.me/573123114435?text=Hola%20SANROQUE%2C%20me%20gustar%C3%ADa%20agendar%20el%20servicio%20SanRoquero%20para%20mi%20mascota%20en%20la%20nueva%20sede%20Calle%20118',
        }
      }
      if (s.id === 'rockstar') {
        return {
          ...s,
          title: 'Rockstar',
          subtitle: 'Grooming + cuidado integral',
          cosmetics: 'Cosmética Velox + Pelunos',
          description: 'El Rockstar combina cosmética Velox + Pelunos y está pensado para quienes buscan complementar el baño con un servicio de peluquería.',
          process: 'Realizamos nuestro protocolo de doble baño: baño + enjuague / baño + enjuague, seguido de secado, cepillado y grooming.',
          features: [
            { value: 'Baño + enjuague / baño + enjuague' },
            { value: '🐾 Secado y cepillado' },
            { value: '✂️ Corte de uñas' },
            { value: '👂 Limpieza de oídos' },
            { value: '🦷 Limpieza dental' },
            { value: '🧼 Limpieza facial con Hydra Extra Soft Facial Shampoo' },
            { value: '✂️ Corte de peluquería y estilizado grooming' },
          ],
          ctaHref: 'https://wa.me/573123114435?text=Hola%20SANROQUE%2C%20me%20gustar%C3%ADa%20agendar%20el%20servicio%20Rockstar%20para%20mi%20mascota%20en%20la%20nueva%20sede%20Calle%20118',
        }
      }
      return {
        ...s,
        ctaHref: s.ctaHref?.replace('573154433109', '573123114435') || 'https://wa.me/573123114435',
      }
    })

    const updated = await (payload as any).updateGlobal({
      slug: 'dogsPage',
      data: {
        services: updatedServices,
      },
    })

    return Response.json({ success: true, updated })
  } catch (error: any) {
    return Response.json({ success: false, error: error?.message || 'Error updating dogsPage' }, { status: 500 })
  }
}

