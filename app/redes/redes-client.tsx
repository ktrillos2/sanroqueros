"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Instagram,
  Facebook,
  Youtube,
  MapPin,
  Phone,
  Globe,
  Star,
  Share2,
  Check,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react"

// TikTok SVG Icon
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.31 6.31 0 0 0 1.86-4.49V8.62a8.28 8.28 0 0 0 4.91 1.6v-3.53z" />
    </svg>
  )
}

// WhatsApp Official SVG Logo
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  )
}

interface RedesClientProps {
  siteSettings: any
}

export function RedesClient({ siteSettings }: RedesClientProps) {
  const [copied, setCopied] = useState(false)

  const currentYear = new Date().getFullYear()

  // Resolving links from settings or high-converting fallbacks
  const social = siteSettings?.redes || {}
  const instagramUrl = social?.instagram || "https://www.instagram.com/sanroquetupetspa/"
  const facebookUrl = social?.facebook || "https://www.facebook.com/sanroquetupetspa"
  const tiktokUrl = social?.tiktok || "https://www.tiktok.com/@sanroquetupetspa"
  const youtubeUrl = social?.youtube || null

  const principalWa =
    (siteSettings?.whatsapps || []).find((w: any) => w?.principal) || siteSettings?.whatsapps?.[0]
  const waNumber = principalWa?.numero || "573123114435"
  const waDisplay = principalWa?.mostrar || "+57 312 311 4435"
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    "Hola SANROQUE, me comunico desde sus redes sociales. Me gustaría agendar una cita para mi mascota."
  )}`

  const mapsUrl =
    siteSettings?.ubicacion?.googleMapsUrl ||
    "https://www.google.com/maps/search/?api=1&query=Calle+118+%2315+-+45+Bogota"
  const addressText = siteSettings?.ubicacion?.direccion || "Calle 118 #15 - 45"
  const cityText = siteSettings?.ubicacion?.ciudadPais || "Bogotá, Colombia"

  const handleShare = async () => {
    const shareData = {
      title: "SANROQUE Pet Spa & Boutique",
      text: "Conéctate con SANROQUE: agenda tu cita, mira nuestras redes y servicios en Bogotá.",
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
        return
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Ignorar fallo de portapapeles
    }
  }

  const links = [
    {
      id: "whatsapp",
      title: "Agendar Cita por WhatsApp",
      subtitle: "Atención inmediata • Perros y Michis",
      badge: "⭐ Más Rápido",
      badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      href: waUrl,
      isExternal: true,
      customIcon: WhatsAppIcon,
      iconBg: "bg-[#25D366] text-white shadow-green-500/30",
      borderHover: "hover:border-emerald-400/80 hover:shadow-emerald-500/20",
      highlight: true,
    },
    {
      id: "instagram",
      title: "Instagram Oficial",
      subtitle: "@sanroquetupetspa • Fotos, tips & reels",
      badge: "📸 Novedades",
      badgeClass: "bg-pink-500/20 text-pink-300 border-pink-500/30",
      href: instagramUrl,
      isExternal: true,
      icon: Instagram,
      iconBg: "bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-rose-500/30",
      borderHover: "hover:border-pink-400/80 hover:shadow-pink-500/20",
    },
    {
      id: "tiktok",
      title: "TikTok Oficial",
      subtitle: "Transformaciones, spa moments y tendencias",
      badge: "🔥 Tendencia",
      badgeClass: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      href: tiktokUrl,
      isExternal: true,
      customIcon: TikTokIcon,
      iconBg: "bg-gradient-to-br from-cyan-400 to-pink-500 text-black shadow-cyan-500/30",
      borderHover: "hover:border-cyan-400/80 hover:shadow-cyan-500/20",
    },
    {
      id: "encuesta",
      title: "Encuesta Rápida de Satisfacción",
      subtitle: "¡Dedícanos 1 minuto! Ayúdanos a mejorar",
      badge: "💛 Tu Opinión",
      badgeClass: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      href: "/encuesta",
      isExternal: false,
      icon: Star,
      iconBg: "bg-gradient-to-br from-amber-300 to-yellow-500 text-black shadow-yellow-500/30",
      borderHover: "hover:border-yellow-400/80 hover:shadow-yellow-500/20",
      featuredPulse: true,
    },
    {
      id: "website",
      title: "Sitio Web Oficial SANROQUE",
      subtitle: "Catálogo completo, precios, OzoneGlow y sedes",
      badge: "🌐 Web",
      badgeClass: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      href: "/",
      isExternal: false,
      icon: Globe,
      iconBg: "bg-gradient-to-br from-blue-400 to-cyan-500 text-white shadow-blue-500/30",
      borderHover: "hover:border-blue-400/80 hover:shadow-blue-500/20",
    },
    {
      id: "facebook",
      title: "Página de Facebook",
      subtitle: "Comunidad de tutores y consejos de cuidado",
      badge: "🐾 Comunidad",
      badgeClass: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
      href: facebookUrl,
      isExternal: true,
      icon: Facebook,
      iconBg: "bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-indigo-500/30",
      borderHover: "hover:border-indigo-400/80 hover:shadow-indigo-500/20",
    },
    ...(youtubeUrl
      ? [
          {
            id: "youtube",
            title: "Canal de YouTube",
            subtitle: "Videos largos, guías de bienestar y cuidados",
            badge: "▶️ Videos",
            badgeClass: "bg-red-500/20 text-red-300 border-red-500/30",
            href: youtubeUrl,
            isExternal: true,
            icon: Youtube,
            iconBg: "bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-red-500/30",
            borderHover: "hover:border-red-400/80 hover:shadow-red-500/20",
          },
        ]
      : []),
    {
      id: "maps",
      title: "Cómo Llegar a la Nueva Sede",
      subtitle: `${addressText}, ${cityText}`,
      badge: "📍 GPS",
      badgeClass: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      href: mapsUrl,
      isExternal: true,
      icon: MapPin,
      iconBg: "bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-rose-500/30",
      borderHover: "hover:border-rose-400/80 hover:shadow-rose-500/20",
    },
    {
      id: "call",
      title: "Llamar Directamente por Teléfono",
      subtitle: `${waDisplay} • Atención al cliente`,
      badge: "📞 Teléfono",
      badgeClass: "bg-gray-500/20 text-gray-300 border-gray-500/30",
      href: `tel:+${waNumber}`,
      isExternal: true,
      icon: Phone,
      iconBg: "bg-gradient-to-br from-gray-700 to-gray-900 text-white shadow-gray-500/20",
      borderHover: "hover:border-gray-400/80 hover:shadow-gray-500/20",
    },
  ]

  return (
    <div className="min-h-screen bg-brand-black text-white relative overflow-hidden flex flex-col justify-between selection:bg-brand-yellow selection:text-black">
      {/* Background ambient decorative glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-yellow/15 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-brand-pink/15 rounded-full blur-[140px] animate-pulse delay-1000" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-brand-blue/15 rounded-full blur-[120px] animate-pulse delay-2000" />
      </div>

      <header className="relative z-10 w-full max-w-lg mx-auto px-4 pt-10 pb-4">
        {/* Top actions: Brand Logo & Share button */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="inline-block transition-transform hover:scale-105">
            <div className="relative w-36 h-10">
              <Image
                src={siteSettings?.logos?.oscuro?.url || "/images/sanroque-logo-white.webp"}
                alt={siteSettings?.nombreComercial || "SANROQUE"}
                fill
                priority
                sizes="144px"
                className="object-contain object-left"
              />
            </div>
          </Link>

          <button
            onClick={handleShare}
            aria-label="Compartir perfil"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-gray-200 transition-all active:scale-95 cursor-pointer backdrop-blur-md"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-brand-yellow" />
                <span className="text-brand-yellow font-medium">¡Copiado!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Compartir</span>
              </>
            )}
          </button>
        </div>

        {/* Profile Avatar & Hero Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col items-center"
        >
          {/* Avatar with pulsing halo */}
          <div className="relative mb-4 group cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-yellow via-brand-pink to-brand-blue rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse" />
            <div className="relative w-24 h-24 rounded-full p-1 bg-brand-black border-2 border-brand-yellow/80 overflow-hidden flex items-center justify-center">
              <Image
                src="/images/sanroque-logo-white.webp"
                alt="Logo SANROQUE"
                width={80}
                height={80}
                className="object-contain p-2"
                priority
              />
            </div>
            <div
              className="absolute -bottom-1 -right-1 bg-brand-yellow text-black p-1 rounded-full shadow-lg border-2 border-brand-black"
              title="Cuenta Oficial Verificada"
            >
              <ShieldCheck className="w-4 h-4 text-black fill-brand-yellow" />
            </div>
          </div>

          {/* Title: Strict Single H1 */}
          <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
            SANROQUE
          </h1>

          <p className="text-sm sm:text-base text-gray-300 max-w-sm mb-3 font-helvetica leading-relaxed">
            Spa & Peluquería Boutique para Mascotas. Cuidado Fear Free libre de estrés en Bogotá.
          </p>

          {/* Sede badge */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-brand-yellow/30 text-xs text-brand-yellow font-medium transition-colors"
          >
            <MapPin className="w-3 h-3 text-brand-yellow" />
            <span>Nueva Sede: Calle 118 #15 - 45</span>
            <ArrowUpRight className="w-3 h-3 opacity-70" />
          </a>
        </motion.div>
      </header>

      {/* Main Links Container */}
      <main className="relative z-10 w-full max-w-lg mx-auto px-4 py-4 space-y-3.5 flex-1">
        {links.map((link, index) => {
          const IconComponent = link.icon
          const CustomIcon = link.customIcon

          const cardContent = (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              className={`relative group block w-full p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border ${
                link.highlight
                  ? "border-emerald-500/40 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/20"
                  : link.featuredPulse
                  ? "border-brand-yellow/50 shadow-lg shadow-brand-yellow/10"
                  : "border-white/10"
              } ${link.borderHover} backdrop-blur-md transition-all duration-300`}
            >
              {/* Subtle shimmer accent */}
              <div className="flex items-center gap-3.5">
                {/* Icon Circle */}
                <div
                  className={`w-12 h-12 rounded-xl shrink-0 flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 ${link.iconBg}`}
                >
                  {CustomIcon ? (
                    <CustomIcon className="w-6 h-6" />
                  ) : IconComponent ? (
                    <IconComponent className="w-6 h-6" />
                  ) : null}
                </div>

                {/* Text Details */}
                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-center justify-between gap-1.5 mb-0.5">
                    <span className="font-heading text-base sm:text-lg font-bold text-white group-hover:text-brand-yellow transition-colors truncate">
                      {link.title}
                    </span>
                    {link.badge && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap ${link.badgeClass}`}
                      >
                        {link.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-300 font-helvetica truncate">
                    {link.subtitle}
                  </p>
                </div>

                {/* Arrow */}
                <div className="text-gray-400 group-hover:text-white transition-colors shrink-0">
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          )

          if (link.isExternal) {
            return (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow rounded-2xl"
              >
                {cardContent}
              </a>
            )
          }

          return (
            <Link
              key={link.id}
              href={link.href}
              className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow rounded-2xl"
            >
              {cardContent}
            </Link>
          )
        })}

        {/* Quick Help Strip */}
        <div className="pt-4 text-center">
          <p className="text-xs text-gray-400 font-helvetica flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
            <span>Horario de atención: Lunes a Sábado 8:00 AM - 6:00 PM</span>
          </p>
        </div>
      </main>

      {/* Mandatory Footer complying with Rules 29-32 */}
      <footer className="relative z-10 w-full border-t border-white/10 mt-10 py-6 bg-brand-black/90 backdrop-blur-md">
        <div className="max-w-lg mx-auto px-4 flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-xs text-gray-400">
            © {currentYear} SANROQUE. Todos los derechos reservados.
          </p>
          <a
            href="https://www.kytcode.lat"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
          >
            <span>Desarrollado por K&T</span>
            <span className="text-white">❤️</span>
          </a>
        </div>
      </footer>
    </div>
  )
}
