import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const result = await (payload as any).find({ collection: 'posts', where: { published: { equals: true } }, sort: '-date', depth: 1 })
    return NextResponse.json(result?.docs ?? [], { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: 'failed-to-load-posts' }, { status: 500 })
  }
}
