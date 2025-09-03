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
        title: { left: 'Experiencia', yellow: 'Spa 360°' },
        intro: {
            root: {
                type: 'root', format: '', indent: 0, version: 1, direction: 'ltr',
                children: [
                    {
                        type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [
                            { type: 'text', text: 'Un enfoque integral que combina bienestar, salud y belleza para tu mascota.', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }
                        ]
                    }
                ]
            }
        },
        video: { url: '', caption: 'Experiencia Spa 360° - Detrás de cámaras' },
        experiences: [
            { title: 'Baños Terapéuticos', image: null, description: { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'text', text: 'Experiencia relajante con productos premium', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }] }] } } },
            { title: 'Masajes Especializados', image: null, description: { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'text', text: 'Técnicas profesionales para el bienestar', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }] }] } } },
            { title: 'Ozonoterapia', image: null, description: { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'text', text: 'Tratamientos avanzados para la salud', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }] }] } } },
            { title: 'Ambiente Profesional', image: null, description: { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'text', text: 'Instalaciones de primera clase', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }] }] } } },
        ],
    }

    await (payload as any).updateGlobal({ slug: 'spaExperience', data })

    return Response.json({ ok: true, slug: 'spaExperience', data })
}
