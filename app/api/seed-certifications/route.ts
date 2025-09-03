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
        title: { left: 'Nuestras', yellow: 'Certificaciones' },
        badge: 'Certificaciones de Excelencia',
        intro: {
            root: {
                type: 'root', format: '', indent: 0, version: 1, direction: 'ltr',
                children: [
                    {
                        type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [
                            { type: 'text', text: 'Respaldados por certificaciones de la industria pet, garantizamos calidad y bienestar.', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }
                        ]
                    }
                ]
            }
        },
        certifications: [
            {
                title: '6° Premios PetIndustry 2025',
                subtitle: 'Mejor Spa y Peluquería en Bogotá',
                description: {
                    root: {
                        type: 'root', format: '', indent: 0, version: 1, direction: 'ltr',
                        children: [
                            {
                                type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [
                                    { type: 'text', text: 'Reconocimiento a la excelencia en servicios de grooming y bienestar para mascotas', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }
                                ]
                            }
                        ]
                    }
                },
                color: 'from-yellow-400 to-amber-500',
                icon: 'award',
                logo: null,
            },
            {
                title: 'Fear Free Certified',
                subtitle: 'Certificación en Bienestar Animal',
                description: {
                    root: {
                        type: 'root', format: '', indent: 0, version: 1, direction: 'ltr',
                        children: [
                            {
                                type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [
                                    { type: 'text', text: 'Técnicas especializadas para reducir el estrés y la ansiedad en las mascotas', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }
                                ]
                            }
                        ]
                    }
                },
                color: 'from-blue-400 to-cyan-500',
                icon: 'shield',
                logo: null,
            },
        ],
        achievements: [
            { text: 'Técnicas libres de estrés certificadas' },
            { text: 'Personal especializado y capacitado' },
            { text: 'Ambiente 100% libre de jaulas' },
            { text: 'Productos premium certificados' },
        ],
    }

    await (payload as any).updateGlobal({ slug: 'certifications', data })

    return Response.json({ ok: true, slug: 'certifications', data })
}
