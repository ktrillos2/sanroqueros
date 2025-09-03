import { NextRequest } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const token = url.searchParams.get('token') || ''
  const email = (url.searchParams.get('email') || '').trim().toLowerCase()
  const password = url.searchParams.get('password') || ''
  const force = url.searchParams.get('force') === 'true'

  if (!token || token !== process.env.PAYLOAD_SECRET) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Missing email or password' }), { status: 400 })
  }

  try {
    const payload = await getPayload({ config })

    // ¿Ya hay usuarios?
    const existingAny = await (payload as any).find({ collection: 'users', limit: 1, overrideAccess: true })

    if (existingAny?.totalDocs > 0 && !force) {
      return Response.json({
        ok: false,
        info: 'users-exist',
        message: 'Ya existen usuarios. Usa force=true para forzar creación/actualización.',
        total: existingAny.totalDocs,
      }, { status: 409 })
    }

    // ¿Existe usuario con ese email?
    const existingByEmail = await (payload as any).find({
      collection: 'users',
      where: { email: { equals: email } },
      limit: 1,
      overrideAccess: true,
    })

    let user

    if (existingByEmail?.totalDocs > 0) {
      // Actualizar password del usuario existente si force
      const id = existingByEmail.docs[0].id
      user = await (payload as any).update({
        collection: 'users',
        id,
        data: { password },
        overrideAccess: true,
      })
      return Response.json({ ok: true, action: 'updated-password', user: { id: user.id, email: user.email } })
    }

    // Crear nuevo usuario
    user = await (payload as any).create({
      collection: 'users',
      data: { email, password },
      overrideAccess: true,
    })

    return Response.json({ ok: true, action: 'created', user: { id: user.id, email: user.email } })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: 'failed-to-create-user', details: e?.message || String(e) }), { status: 500 })
  }
}
