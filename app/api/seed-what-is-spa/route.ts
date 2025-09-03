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
        title: {
            left: '¿Qué es un',
            yellow: 'Spa',
            between: 'para',
            pink: 'Perros y Gatos',
        },
        content: {
            root: {
                type: 'root', format: '', indent: 0, version: 1, direction: 'ltr',
                children: [
                    {
                        type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [
                            { type: 'text', text: 'Un spa para mascotas es mucho más que un simple baño. Es una experiencia integral de bienestar que combina técnicas profesionales de grooming con tratamientos relajantes y terapéuticos, diseñados para el cuidado y la salud de perros y gatos.', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }
                        ]
                    },
                    {
                        type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [
                            { type: 'text', text: 'En SANROQUE, transformamos el cuidado tradicional en una experiencia premium que no solo mejora la apariencia de tu mascota, sino que también contribuye a su salud física y bienestar emocional.', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }
                        ]
                    },
                ]
            }
        },
        benefits: [
            { title: 'Evaluación Completa', description: 'Revisión detallada del estado de salud y bienestar de tu mascota antes de cada tratamiento', icon: 'shield', isSpecial: false },
            { title: 'Productos Premium', description: 'Utilizamos marcas como Iv San Bernard e Hydra para resultados excepcionales', icon: 'sparkles', isSpecial: false },
            { title: 'Cuidado Personalizado', description: 'Cada tratamiento se adapta a las necesidades específicas de tu perro o gato', icon: 'heart', isSpecial: false },
            { title: 'Ambiente Libre de Jaulas', description: 'Tu mascota disfruta de libertad total en un ambiente abierto y relajante', icon: 'home', isSpecial: true },
        ],
        images: {
            main: null as any,
            secondary: null as any,
        },
    }

    await (payload as any).updateGlobal({ slug: 'whatIsSpa', data })

    return Response.json({ ok: true, slug: 'whatIsSpa', data })
}
