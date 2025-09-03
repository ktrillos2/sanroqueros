import { getPayload } from 'payload'
import config from '@/payload.config'

export type HeaderData = {
  menu: { label: string; href: string }[]
  cta?: { label: string; href: string }
}

export async function getHeader(): Promise<HeaderData> {
  const payload = await getPayload({ config })
  const data = await (payload as any).findGlobal({ slug: 'header' as any, depth: 0 })
  return data as HeaderData
}
