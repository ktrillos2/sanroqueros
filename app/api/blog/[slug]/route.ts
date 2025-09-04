import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  try {
    const payload = await getPayload({ config })
    const result = await (payload as any).find({ collection: 'posts', where: { slug: { equals: params.slug } }, depth: 1, limit: 1 })
    const doc = result?.docs?.[0]
    if (!doc) return NextResponse.json({ error: 'not-found' }, { status: 404 })
    return NextResponse.json(doc, { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: 'failed-to-load-post' }, { status: 500 })
  }
}
