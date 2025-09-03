import { NextRequest } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET(req: NextRequest) {
    // Allow token either via query ?token= or Authorization: Bearer <token>
    const queryToken = req.nextUrl.searchParams.get('token')
    const authHeader = req.headers.get('authorization') || ''
    const bearerMatch = authHeader.match(/^Bearer\s+(.+)$/i)
    const headerToken = bearerMatch?.[1]
    const token = queryToken || headerToken
    if (!token || token !== process.env.PAYLOAD_SECRET) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const payload = await getPayload({ config })

    const data = {
        menu: [
            { label: 'Inicio', href: '/' },
            { label: 'Perros', href: '/perros' },
            { label: 'Gatos', href: '/gatos' },
            { label: 'Blog', href: '/blog' },
            { label: 'Contacto', href: '/#contacto' },
        ],
        cta: { label: 'Agendar Cita', href: '/#contacto' },
    }

    await (payload as any).updateGlobal({ slug: 'header', data })

    return Response.json({ ok: true, slug: 'header', data })
}
