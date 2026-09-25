import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getSiteSettings() {
  try {
    const fetchSettings = async () => {
      const payload = await getPayload({ config })
      const data = await (payload as any).findGlobal({ slug: 'siteSettings' as any, depth: 1 })
      return data as any
    }
    const timeoutPromise = new Promise<any>((resolve) =>
      setTimeout(() => resolve(null), 2000)
    )
    return await Promise.race([fetchSettings(), timeoutPromise])
  } catch {
    return null
  }
}
