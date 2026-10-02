import type { Metadata } from "next"
import { getSiteSettings } from "@/lib/site-settings"
import { RedesClient } from "./redes-client"

export const metadata: Metadata = {
  title: "Redes Sociales y Enlaces Oficiales | SANROQUE Pet Spa",
  description:
    "Conéctate con SANROQUE: WhatsApp de citas, Instagram, TikTok, Facebook, ubicación en Bogotá y encuesta de satisfacción.",
  openGraph: {
    title: "SANROQUE Pet Spa | Enlaces y Redes Oficiales",
    description: "Accede rápidamente a nuestro WhatsApp, redes sociales, ubicación y catálogo.",
    locale: "es_CO",
    type: "website",
  },
}

export default async function RedesPage() {
  const settings = await getSiteSettings()
  return <RedesClient siteSettings={settings} />
}
