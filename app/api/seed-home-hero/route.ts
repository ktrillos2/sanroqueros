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

    // Leer datos sensibles desde SiteSettings
    const siteSettings = await (payload as any).findGlobal({ slug: 'siteSettings', depth: 1 })

    // Derivar WhatsApp principal y Email principal
    const wa = (siteSettings?.whatsapps || []).find((w: any) => w?.principal) || siteSettings?.whatsapps?.[0]
    const email = (siteSettings?.correos || []).find((c: any) => c?.principal) || siteSettings?.correos?.[0]

    const whatsappHref = wa?.numero ? `https://wa.me/${wa.numero}` + (siteSettings?.mensajeWhatsAppPorDefecto ? `?text=${encodeURIComponent(siteSettings.mensajeWhatsAppPorDefecto)}` : '') : undefined
    const mailtoHref = email?.direccion ? `mailto:${email.direccion}` : undefined

    const data = {
        title: {
            left: 'El Mejor',
            yellow: 'Spa',
            between: 'para',
            pink: 'Woofies y Michis',
        },
        subtitle: 'Experiencia premium con productos de alta gama y técnicas profesionales en el corazón de Bogotá',
        ctaPrimary: {
            label: 'Agenda tu Cita',
            type: whatsappHref ? 'whatsapp' : 'anchor',
            href: whatsappHref || '#contacto',
        },
        ctaSecondary: {
            label: 'Ver Servicios',
            type: 'page',
            href: '/perros',
        },
        images: {},
    }

    await (payload as any).updateGlobal({ slug: 'homeHero', data })

    return Response.json({ ok: true, slug: 'homeHero', data })
}
