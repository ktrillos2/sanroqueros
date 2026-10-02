import type { Metadata } from "next"
import { getSiteSettings } from "@/lib/site-settings"
import { EncuestaClient } from "./encuesta-client"

export const metadata: Metadata = {
  title: "Encuesta Rápida de Satisfacción | SANROQUE Pet Spa",
  description:
    "¡Gracias por visitarnos en SANROQUE! Ayúdanos a mejorar dedicando un minuto a esta encuesta corta para conocer tu experiencia y la de tu consentido.",
  openGraph: {
    title: "Encuesta Rápida de SanRoque | Tu Opinión Cuenta",
    description: "Dedica 1 minuto a calificar nuestro spa y peluquería de mascotas en Bogotá.",
    locale: "es_CO",
    type: "website",
  },
}

export default async function EncuestaPage() {
  const settings = await getSiteSettings()
  return <EncuestaClient siteSettings={settings} />
}
