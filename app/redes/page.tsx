import type { Metadata } from "next"
import { getSiteSettings } from "@/lib/site-settings"
import { RedesClient } from "./redes-client"

export const metadata: Metadata = {
  title: "Elige tu sede | SANROQUE Spa & Bienestar para Mascotas",
  description:
    "Elige tu sede de SANROQUE en Bogotá: Cedritos (Calle 140) o Santa Bárbara (Calle 118). Agenda tu cita por WhatsApp, califica tu experiencia o visita nuestro sitio web.",
  openGraph: {
    title: "Elige tu sede | SANROQUE Pet Spa",
    description: "Sede Cedritos (Calle 140) y Sede Santa Bárbara (Calle 118). Cuidado boutique libre de estrés para perros y gatos.",
    locale: "es_CO",
    type: "website",
  },
}

export default async function RedesPage() {
  const settings = await getSiteSettings()
  return <RedesClient siteSettings={settings} />
}
