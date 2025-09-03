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
    title: { left: 'Productos & ', yellow: 'Colaboraciones' },
    intro: {
      root: {
        type: 'root', format: '', indent: 0, version: 1, direction: 'ltr',
        children: [
          { type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [
            { type: 'text', text: 'Trabajamos con las mejores marcas internacionales para garantizar resultados excepcionales en el cuidado de tu mascota.', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }
          ]}
        ]
      }
    },
    items: [
      {
        name: 'Hydra by Pet Society',
        badge: 'Premium',
        description: {
          root: {
            type: 'root', format: '', indent: 0, version: 1, direction: 'ltr',
            children: [
              { type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [
                { type: 'text', text: 'Línea premium de productos para el cuidado de la piel y pelaje. Fórmulas avanzadas que proporcionan hidratación profunda y brillo natural.', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }
              ]}
            ]
          }
        },
        benefits: [{ text: 'Hidratación profunda' }, { text: 'Brillo natural' }, { text: 'Piel saludable' }, { text: 'Pelaje sedoso' }],
        image: null,
        color: 'from-yellow-400 to-amber-500',
      },
      {
        name: 'Iv San Bernard',
        badge: 'Terapéutico',
        description: {
          root: {
            type: 'root', format: '', indent: 0, version: 1, direction: 'ltr',
            children: [
              { type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [
                { type: 'text', text: 'Dermocosmética profesional italiana especializada en el cuidado de mascotas. Productos terapéuticos con resultados visibles desde la primera aplicación.', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }
              ]}
            ]
          }
        },
        benefits: [{ text: 'Dermocosmética italiana' }, { text: 'Resultados terapéuticos' }, { text: 'Calidad profesional' }, { text: 'Cuidado especializado' }],
        image: null,
        color: 'from-blue-400 to-cyan-500',
      },
    ],
  }

  await (payload as any).updateGlobal({ slug: 'productsCollaborations', data })

  return Response.json({ ok: true, slug: 'productsCollaborations', data })
}
