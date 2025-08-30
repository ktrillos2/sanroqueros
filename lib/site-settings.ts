import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getSiteSettings() {
  const payload = await getPayload({ config })
  const data = await (payload as any).findGlobal({ slug: 'siteSettings' as any })
  return data as any
}
