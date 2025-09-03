import { NextRequest } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const token = url.searchParams.get('token') || ''
  if (!token || token !== process.env.PAYLOAD_SECRET) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  const payload = await getPayload({ config })

  const data = {
    title: { left: 'Galería de', yellow: 'Nuestros Peluditos' },
    intro: {
      root: {
        type: 'root', format: '', indent: 0, version: 1, direction: 'ltr',
        children: [
          { type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [ { type: 'text', text: 'Descubre las increíbles transformaciones de nuestros clientes peludos', detail: 0, format: 0, mode: 'normal', style: '', version: 1 } ] },
        ],
      },
    },
    items: [
      { title: 'Antes & Después', category: 'Transformación', description: { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'text', text: 'Beagle feliz después de su sesión de spa', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }] }] } }, image: null },
      { title: 'Compañeros de Spa', category: 'Experiencia', description: { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'text', text: 'Golden Retriever y amigo disfrutando juntos', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }] }] } }, image: null },
      { title: 'Momento de Relajación', category: 'Bienestar', description: { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'text', text: 'Baño terapéutico con productos premium', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }] }] } }, image: null },
      { title: 'Masaje Especializado', category: 'Terapia', description: { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'text', text: 'Técnicas profesionales de relajación', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }] }] } }, image: null },
    ],
  }

  await (payload as any).updateGlobal({ slug: 'gallery', data })

  return Response.json({ ok: true, slug: 'gallery', data })
}
