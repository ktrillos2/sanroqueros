import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ConditionalWhatsapp } from "@/components/conditional-whatsapp"

const moonglade = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-moonglade",
  weight: ["400", "600", "700"],
})

const helveticaNeue = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-helvetica-neue",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "SANROQUE - Spa y Peluquería para Mascotas | Bogotá",
  description:
    "El mejor spa y peluquería para perros y gatos en Bogotá. Servicios profesionales con productos premium Hydra by Pet Society e Iv San Bernard.",
  keywords: "spa para perros, peluquería canina, grooming, mascotas Bogotá, baño perros, estética canina",
  authors: [{ name: "SANROQUE" }],
  creator: "SANROQUE",
  publisher: "SANROQUE",
  openGraph: {
    title: "SANROQUE - Spa y Peluquería para Mascotas",
    description: "El mejor spa y peluquería para perros y gatos en Bogotá",
    url: "https://sanroque.com",
    siteName: "SANROQUE",
    images: [
      {
        url: "/images/sanroque-logo-black.png",
        width: 1200,
        height: 630,
        alt: "SANROQUE Spa para Mascotas",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SANROQUE - Spa y Peluquería para Mascotas",
    description: "El mejor spa y peluquería para perros y gatos en Bogotá",
    images: ["/images/sanroque-logo-black.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${moonglade.variable} ${helveticaNeue.variable}`}>
      <body className="font-sans antialiased">
  {children}
  <ConditionalWhatsapp />
      </body>
    </html>
  )
}
