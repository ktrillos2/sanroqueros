"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  MapPin,
  Phone,
  Star,
  Check,
  Copy,
  X,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react"

// Official TikTok SVG
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.31 6.31 0 0 0 1.86-4.49V8.62a8.28 8.28 0 0 0 4.91 1.6v-3.53z" />
    </svg>
  )
}

// WhatsApp Logo for buttons matching the mockup
function WhatsAppBubbleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <path
        d="M9.5 9.5c.3-.3.6-.3.9 0l1.2 1.2c.2.2.2.5 0 .7l-.6.6c.5 1 1.2 1.7 2.2 2.2l.6-.6c.2-.2.5-.2.7 0l1.2 1.2c.3.3.3.6 0 .9-.5.5-1.1.7-1.8.6-2.2-.3-4.1-2.2-4.4-4.4-.1-.7.1-1.3.6-1.8z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  )
}

// Custom Satisfaction Survey Icon matching the document + lines + heart
function SatisfactionIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Document outline */}
      <path d="M6 18V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H18" />
      {/* Text lines */}
      <line x1="10" y1="8" x2="20" y2="8" />
      <line x1="10" y1="13" x2="22" y2="13" />
      <line x1="10" y1="18" x2="16" y2="18" />
      {/* Heart nestled at bottom left */}
      <path
        d="M8.5 22.8c-1.8-1.8-3.8-.3-3.8 1.4 0 2 3.8 4.8 3.8 4.8s3.8-2.8 3.8-4.8c0-1.7-2-3.2-3.8-1.4z"
        strokeWidth="1.8"
      />
    </svg>
  )
}

interface RedesClientProps {
  siteSettings: any
}

export function RedesClient({ siteSettings }: RedesClientProps) {
  const [callModalOpen, setCallModalOpen] = useState(false)
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null)

  const currentYear = new Date().getFullYear()

  // Social Links
  const social = siteSettings?.redes || {}
  const instagramUrl = social?.instagram || "https://www.instagram.com/sanroquetupetspa/"
  const facebookUrl = social?.facebook || "https://www.facebook.com/sanroquetupetspa"
  const tiktokUrl = social?.tiktok || "https://www.tiktok.com/@sanroquetupetspa"
  const youtubeUrl = social?.youtube || "https://www.youtube.com/@sanroquetupetspa"

  // Número único de SANROQUE para ambas sedes
  const principalWa =
    (siteSettings?.whatsapps || []).find((w: any) => w?.principal) || siteSettings?.whatsapps?.[0]
  const waNumber = principalWa?.numero || "573123114435"
  const waDisplay = principalWa?.mostrar || "+57 312 311 4435"

  const buildWaUrl = (message: string) =>
    `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`

  const waCedritosUrl = buildWaUrl(
    "Hola SANROQUE, me comunico para agendar una cita en la sede Cedritos (Calle 140)."
  )
  const waSantaBarbaraUrl = buildWaUrl(
    "Hola SANROQUE, me comunico para agendar una cita en la sede Santa Bárbara (Calle 118)."
  )

  // Google Review URL
  const googleReviewUrl =
    siteSettings?.ubicacion?.googleMapsUrl ||
    "https://www.google.com/maps/search/?api=1&query=SANROQUE+Pet+Spa+Calle+118+Bogota"

  const copyToClipboard = (num: string) => {
    navigator.clipboard.writeText(num)
    setCopiedNumber(num)
    setTimeout(() => setCopiedNumber(null), 2000)
  }

  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col justify-between selection:bg-[#f5c32c] selection:text-black">
      {/* Background ambient lighting */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-40">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#f5c32c]/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -right-40 w-[400px] h-[400px] bg-[#ffb1be]/10 rounded-full blur-[140px]" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md sm:max-w-lg mx-auto px-4 py-8 flex-1 flex flex-col justify-between">
        <main className="w-full">
          {/* Header Brand */}
          <header className="flex flex-col items-center justify-center text-center pt-2 pb-5">
            <Link
              href="/"
              className="inline-block transition-transform hover:scale-105 active:scale-95"
              aria-label="Ir a la página principal de SANROQUE"
            >
              <div className="relative w-44 h-12 sm:w-48 sm:h-14">
                <Image
                  src="/images/sanroque-logo-white.webp"
                  alt="SANROQUE Pet Spa"
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 640px) 180px, 200px"
                />
              </div>
            </Link>

            <p className="text-xs sm:text-[13px] text-gray-300 font-sans tracking-wide mt-2 font-normal">
              Spa & bienestar para mascotas
            </p>

            {/* Gold accent line */}
            <div
              className="w-10 h-[2px] bg-[#f5c32c] mx-auto mt-2.5 rounded-full"
              aria-hidden="true"
            />
          </header>

          {/* Section: Elige tu sede */}
          <section aria-labelledby="heading-elige-tu-sede" className="w-full mt-2">
            {/* Strict Single H1 for the page */}
            <h1
              id="heading-elige-tu-sede"
              className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight text-center mb-6"
            >
              Elige tu sede
            </h1>

            {/* Sede Cards Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {/* CARD 1: CEDRITOS */}
              <motion.article
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-2xl bg-[#0c0c0e] border border-white/10 hover:border-[#f5c32c]/50 p-2 sm:p-2.5 flex flex-col justify-between shadow-2xl transition-all duration-300"
              >
                <div>
                  {/* Photo with subtle zoom on card hover */}
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-zinc-900 mb-2.5">
                    <Image
                      src="/images/sede-cedritos-dog.jpg"
                      alt="Cuidado boutique en Sede Cedritos SANROQUE"
                      fill
                      priority
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, 240px"
                    />
                  </div>

                  {/* Title & Address */}
                  <div className="text-center px-1">
                    <h2 className="font-heading font-extrabold text-white text-base sm:text-lg tracking-wider uppercase leading-snug">
                      CEDRITOS
                    </h2>
                    <div className="flex items-center justify-center gap-1 mt-1 text-[11px] sm:text-xs text-gray-300 font-sans">
                      <MapPin
                        className="w-3.5 h-3.5 text-[#f5c32c] fill-[#f5c32c] shrink-0"
                        aria-hidden="true"
                      />
                      <span className="truncate">Calle 140 #17A - 13</span>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Button */}
                <a
                  href={waCedritosUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 w-full bg-[#f5c32c] hover:bg-[#eab308] active:scale-[0.97] text-black font-extrabold py-2.5 px-2 rounded-xl flex items-center justify-center gap-1.5 text-xs sm:text-sm shadow-md transition-all"
                  aria-label="Contactar por WhatsApp a Sede Cedritos Calle 140"
                >
                  <WhatsAppBubbleIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
                  <span className="truncate">WhatsApp · Sede 140</span>
                </a>
              </motion.article>

              {/* CARD 2: SANTA BÁRBARA */}
              <motion.article
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 }}
                className="group relative rounded-2xl bg-[#0c0c0e] border border-white/10 hover:border-[#f5c32c]/50 p-2 sm:p-2.5 flex flex-col justify-between shadow-2xl transition-all duration-300"
              >
                {/* Badge: Nueva Sede */}
                <div className="absolute top-3.5 right-3.5 z-10 bg-[#f5c32c] text-black text-[10px] sm:text-xs font-extrabold px-2.5 py-0.5 sm:py-1 rounded-full flex items-center gap-1 shadow-lg">
                  <MapPin className="w-3 h-3 fill-black text-black" aria-hidden="true" />
                  <span>Nueva sede</span>
                </div>

                <div>
                  {/* Photo */}
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-zinc-900 mb-2.5">
                    <Image
                      src="/images/sede-santabarbara-dog.jpg"
                      alt="Baño relajante en Sede Santa Bárbara SANROQUE"
                      fill
                      priority
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, 240px"
                    />
                  </div>

                  {/* Title & Address */}
                  <div className="text-center px-1">
                    <h2 className="font-heading font-extrabold text-white text-base sm:text-lg tracking-wider uppercase leading-snug">
                      SANTA BÁRBARA
                    </h2>
                    <div className="flex items-center justify-center gap-1 mt-1 text-[11px] sm:text-xs text-gray-300 font-sans">
                      <MapPin
                        className="w-3.5 h-3.5 text-[#f5c32c] fill-[#f5c32c] shrink-0"
                        aria-hidden="true"
                      />
                      <span className="truncate">Calle 118 #15 - 45</span>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Button */}
                <a
                  href={waSantaBarbaraUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 w-full bg-[#f5c32c] hover:bg-[#eab308] active:scale-[0.97] text-black font-extrabold py-2.5 px-2 rounded-xl flex items-center justify-center gap-1.5 text-xs sm:text-sm shadow-md transition-all"
                  aria-label="Contactar por WhatsApp a Sede Santa Bárbara Calle 118"
                >
                  <WhatsAppBubbleIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
                  <span className="truncate">WhatsApp · Sede 118</span>
                </a>
              </motion.article>
            </div>
          </section>

          {/* Section: Tu experiencia nos importa */}
          <section aria-labelledby="heading-experiencia" className="w-full mt-10">
            <h2
              id="heading-experiencia"
              className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight text-center mb-2"
            >
              Tu experiencia nos importa
            </h2>

            {/* Gold accent line */}
            <div
              className="w-10 h-[2px] bg-[#f5c32c] mx-auto mb-6 rounded-full"
              aria-hidden="true"
            />

            {/* Two Action Cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {/* Encuesta de satisfacción */}
              <Link
                href="/encuesta"
                className="p-3 sm:p-3.5 rounded-2xl bg-[#0c0c0e] border border-white/10 hover:border-[#f5c32c]/50 transition-all flex items-center gap-2.5 sm:gap-3 group active:scale-[0.98] shadow-lg"
              >
                <div className="shrink-0 text-[#f5c32c] group-hover:scale-110 transition-transform">
                  <SatisfactionIcon className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <div className="flex flex-col min-w-0">
                  <h3 className="font-heading font-bold text-white text-xs sm:text-sm group-hover:text-[#f5c32c] transition-colors leading-tight">
                    Encuesta de satisfacción
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-400 font-sans mt-0.5 leading-snug">
                    Cuéntanos cómo te fue
                  </p>
                </div>
              </Link>

              {/* Déjanos una reseña */}
              <a
                href={googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 sm:p-3.5 rounded-2xl bg-[#0c0c0e] border border-white/10 hover:border-[#f5c32c]/50 transition-all flex items-center gap-2.5 sm:gap-3 group active:scale-[0.98] shadow-lg"
              >
                <div className="shrink-0 text-[#f5c32c] group-hover:scale-110 transition-transform">
                  <Star className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.8]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <h3 className="font-heading font-bold text-white text-xs sm:text-sm group-hover:text-[#f5c32c] transition-colors leading-tight">
                    Déjanos una reseña
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-400 font-sans mt-0.5 leading-snug">
                    Comparte tu experiencia en Google
                  </p>
                </div>
              </a>
            </div>

            {/* White Button: Prefiero llamar a Lider de experiencia */}
            <button
              type="button"
              onClick={() => setCallModalOpen(true)}
              className="w-full mt-3.5 bg-white hover:bg-gray-100 active:scale-[0.99] text-black font-extrabold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2.5 text-xs sm:text-sm shadow-xl transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-black text-black shrink-0" />
              <span className="truncate">Prefiero llamar a Lider de experiencia</span>
            </button>

            {/* Link: Visitar sitio web */}
            <div className="text-center mt-6 mb-7">
              <Link
                href="/"
                className="inline-block text-sm sm:text-base font-semibold text-white hover:text-[#f5c32c] transition-colors border-b-2 border-[#f5c32c] pb-0.5"
              >
                Visitar sitio web
              </Link>
            </div>

            {/* Social Media Section */}
            <div className="flex flex-col items-center gap-3 mt-4">
              <span className="text-xs text-gray-400 font-sans">Síguenos</span>
              <div className="flex items-center justify-center gap-5 sm:gap-6">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram SANROQUE"
                  className="text-white hover:text-[#f5c32c] transition-transform hover:scale-110 active:scale-95"
                >
                  <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a
                  href={tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok SANROQUE"
                  className="text-white hover:text-[#f5c32c] transition-transform hover:scale-110 active:scale-95"
                >
                  <TikTokIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook SANROQUE"
                  className="text-white hover:text-[#f5c32c] transition-transform hover:scale-110 active:scale-95"
                >
                  <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube SANROQUE"
                  className="text-white hover:text-[#f5c32c] transition-transform hover:scale-110 active:scale-95"
                >
                  <Youtube className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
              </div>
            </div>
          </section>
        </main>

        {/* Footer: City + Programmatic year + Mandatory K&T Branding */}
        <footer className="mt-8 pt-4 flex flex-col items-center justify-center gap-1.5 text-center">
          <p className="text-xs text-gray-400 tracking-wider font-sans uppercase">
            SANROQUE · Bogotá
          </p>

          <p className="text-[11px] text-gray-500 font-sans">
            © {currentYear} SANROQUE. Todos los derechos reservados.
          </p>

          <a
            href="https://www.kytcode.lat"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1.5 mt-0.5 group"
          >
            <span>Desarrollado por K&T</span>
            <span className="text-white group-hover:scale-110 transition-transform">🤍</span>
          </a>
        </footer>
      </div>

      {/* Modal: Contactar al Líder de Experiencia */}
      <AnimatePresence>
        {callModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCallModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-sm rounded-3xl bg-[#121214] border border-white/15 p-6 shadow-2xl z-10 text-center"
            >
              <button
                onClick={() => setCallModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full bg-white/5 transition-colors cursor-pointer"
                aria-label="Cerrar ventana"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-full bg-[#f5c32c]/20 text-[#f5c32c] flex items-center justify-center mx-auto mb-3">
                <Phone className="w-6 h-6 fill-current" />
              </div>

              <h3 className="font-heading font-bold text-lg text-white mb-1">
                Líder de Experiencia
              </h3>
              <p className="text-xs text-gray-300 font-sans mb-5 leading-relaxed">
                Comunícate directamente con nuestro equipo:
              </p>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 text-left">
                <div>
                  <p className="text-xs font-bold text-white">SANROQUE</p>
                  <p className="text-[11px] text-gray-400 font-mono">{waDisplay}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => copyToClipboard(`+${waNumber}`)}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all cursor-pointer"
                    title="Copiar número"
                    aria-label="Copiar número de teléfono"
                  >
                    {copiedNumber === `+${waNumber}` ? (
                      <Check className="w-4 h-4 text-[#f5c32c]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <a
                    href={`tel:+${waNumber}`}
                    className="px-3 py-1.5 rounded-xl bg-[#f5c32c] text-black font-bold text-xs hover:bg-[#eab308] transition-all flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5 fill-current" />
                    <span>Llamar</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
