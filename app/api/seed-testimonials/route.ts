import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    const data = {
      title: { left: 'Lo que Dicen', highlight: 'Nuestros Clientes' },
      intro: {
        root: { type: 'root', version: 1, children: [ { type: 'paragraph', version: 1, children: [ { type: 'text', text: 'Testimonios reales de familias que confían en nosotros.' } ] } ] }
      },
      videos: [
        { title: 'Testimonio de María González', description: 'Luna y su experiencia en SANROQUE', thumbnail: null, youtubeUrl: '' },
        { title: 'Testimonio de Carlos Rodríguez', description: 'Max ama ir a SANROQUE', thumbnail: null, youtubeUrl: '' },
        { title: 'Testimonio de Ana Martínez', description: 'Coco y Milo - Yorkshire Terriers', thumbnail: null, youtubeUrl: '' },
      ],
      testimonials: [
        { name: 'María González', petName: 'Luna', image: null, rating: 5, text: { root: { type: 'root', version: 1, children: [ { type: 'paragraph', version: 1, children: [ { type: 'text', text: 'Luna siempre sale feliz y relajada de SANROQUE.' } ] } ] } }, service: 'Spa Felino Completo' },
        { name: 'Carlos Rodríguez', petName: 'Max', image: null, rating: 5, text: { root: { type: 'root', version: 1, children: [ { type: 'paragraph', version: 1, children: [ { type: 'text', text: 'La transformación es increíble y el trato excepcional.' } ] } ] } }, service: 'Experiencia Spa 360°' },
        { name: 'Ana Martínez', petName: 'Coco y Milo', image: null, rating: 5, text: { root: { type: 'root', version: 1, children: [ { type: 'paragraph', version: 1, children: [ { type: 'text', text: 'Los mejores cuidados para mis Yorkshire.' } ] } ] } }, service: 'Baño y Estilizado' },
      ],
    }

    await (payload as any).updateGlobal({ slug: 'testimonials' as any, data })
    return NextResponse.json({ ok: true, seeded: true }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: 'failed-to-seed-testimonials' }, { status: 500 })
  }
}
