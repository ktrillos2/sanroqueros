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
        title: { pink: 'Michi', rest: 'Friendly' },
        intro: {
            root: {
                type: 'root', format: '', indent: 0, version: 1, direction: 'ltr',
                children: [
                    {
                        type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [
                            { type: 'text', text: 'Sabemos que los gatos son especiales. Por eso hemos creado un ambiente y servicios diseñados específicamente para el bienestar y comodidad de nuestros amigos felinos.', detail: 0, format: 0, mode: 'normal', style: '', version: 1 },
                        ],
                    },
                ],
            },
        },
        features: [
            { icon: 'heart', title: 'Ambiente Tranquilo', description: { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'text', text: 'Espacios diseñados especialmente para el bienestar felino', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }] }] } } },
            { icon: 'sparkles', title: 'Técnicas Especializadas', description: { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'text', text: 'Métodos suaves adaptados al comportamiento de los gatos', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }] }] } } },
            { icon: 'star', title: 'Productos Específicos', description: { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'text', text: 'Líneas de cuidado formuladas exclusivamente para felinos', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }] }] } } },
        ],
        video: { sourceType: 'youtube', youtubeUrl: '', file: null, caption: 'Experiencia Michi Friendly' },
        images: { main: null, secondary: null },
    }

    await (payload as any).updateGlobal({ slug: 'michiFriendly', data })

    return Response.json({ ok: true, slug: 'michiFriendly', data })
}
