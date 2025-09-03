import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    const demo = {
      title: { left: 'Nuestros', highlight: 'Clientes' },
      intro: {
        root: { type: 'root', version: 1, children: [ { type: 'paragraph', version: 1, children: [ { type: 'text', text: 'Marcas y familias que confían en nosotros.' } ] } ] }
      },
      clients: [
        { name: 'Cliente 1', note: 'Grooming', logo: null },
        { name: 'Cliente 2', note: 'Spa 360°', logo: null },
        { name: 'Cliente 3', note: 'Michi Friendly', logo: null },
        { name: 'Cliente 4', note: 'Peluquería', logo: null },
        { name: 'Cliente 5', note: 'Higiene', logo: null },
        { name: 'Cliente 6', note: 'Baño', logo: null },
      ],
    }

    await (payload as any).updateGlobal({ slug: 'clients' as any, data: demo })
    return NextResponse.json({ ok: true, seeded: true }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: 'failed-to-seed-clients' }, { status: 500 })
  }
}
