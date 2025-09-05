import { getPayload } from 'payload'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export async function GET() {
  const payload = await getPayload({ config })
  const data = await (payload as any).findGlobal({ slug: 'blogPage', depth: 2 })
  return Response.json({ data })
}
