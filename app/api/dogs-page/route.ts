import { getPayload } from 'payload'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export async function GET() {
  const payload = await getPayload({ config })
  const data = await (payload as any).findGlobal({ slug: 'dogsPage', depth: 1 })
  return Response.json({ data })
}
