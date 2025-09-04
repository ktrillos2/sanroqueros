import { NextRequest } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET(_req: NextRequest) {
  const payload = await getPayload({ config })
  const data = await (payload as any).findGlobal({ slug: 'footer' as any, depth: 1 })
  return Response.json({ ok: true, data })
}
