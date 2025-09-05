import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { moonglade as moongladeLocal } from "@/app/fonts/moonglade"
import "./globals.css"
import { ConditionalWhatsapp } from "@/components/conditional-whatsapp"
import GlobalFetchLoader from "@/components/global-fetch-loader"
import { Footer } from "@/components/footer"
import { getSiteSettings } from "@/lib/site-settings"
import { Toaster } from "@/components/ui/toaster"

// Use local Moonglade font files (Light 300, Regular 400, Bold 700)
const moonglade = moongladeLocal

const helveticaNeue = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-helvetica-neue",
  weight: ["400", "500", "600"],
})

export async function generateMetadata(): Promise<Metadata> {
  // Base para URLs absolutas
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  // Leemos SiteSettings para favicon
  // Nota: getSiteSettings ya hace getPayload.findGlobal.
  let settings: any = null
  try {
    settings = await getSiteSettings()
  } catch {
    // En caso de fallo de BD, continuamos con defaults
  }

  // Metadatos automáticos por defecto
  const siteName = settings?.nombreComercial || "SANROQUE"
  const title = `${siteName} - Spa y Peluquería para Mascotas | Bogotá`
  const description = "Spa y peluquería profesional para perros y gatos en Bogotá. Bienestar, salud y belleza con productos premium. Agenda tu cita."
  const keywords = [
    "spa para perros",
    "peluquería canina",
    "grooming",
    "mascotas Bogotá",
    "baño perros",
    "estética canina",
  ]

  // Resolver URLs de media de Payload
  const mediaUrl = (m: any): string | undefined => {
    if (!m) return undefined
    // Puede venir poblado (objeto) o solo ID. Si es objeto con filename/url, construimos.
    const filename = m?.url || m?.filename
    if (!filename) return undefined
    if (String(filename).startsWith('http')) return filename
    return new URL(String(filename).startsWith('/') ? filename : `/media/${filename}`, baseUrl).toString()
  }

  const ogImg = undefined
  const favicon = mediaUrl(settings?.favicon)

  const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords,
    authors: [{ name: settings?.nombreComercial || 'SANROQUE' }],
    creator: settings?.nombreComercial || 'SANROQUE',
    publisher: settings?.nombreComercial || 'SANROQUE',
    openGraph: {
      title,
      description,
      url: baseUrl,
  siteName,
      images: ogImg
        ? [
            {
              url: ogImg,
              width: 1200,
              height: 630,
              alt: siteName,
            },
          ]
        : undefined,
      locale: 'es_CO',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImg ? [ogImg] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  icons: favicon
      ? {
          icon: [{ url: favicon }],
          shortcut: [{ url: favicon }],
          apple: [{ url: favicon }],
        }
      : undefined,
  }

  return metadata
}

// Fuerza renderizado dinámico para evitar consultas a la BD durante el prerender
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${moonglade.variable} ${helveticaNeue.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">
        <GlobalFetchLoader />
  <Toaster />
        {children}
        <ConditionalWhatsapp />
  {/* Footer global */}
  <Footer />
      </body>
    </html>
  )
}
