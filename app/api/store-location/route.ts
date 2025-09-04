import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const data = await (payload as any).findGlobal({ slug: 'storeLocation', depth: 1 })
    return NextResponse.json(data, { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: 'failed-to-load-store-location' }, { status: 500 })
  }
}
