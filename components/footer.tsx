"use server"

import Image from "next/image"
import Link from "next/link"
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail } from "lucide-react"
import { getPayload } from "payload"
import config from "@/payload.config"

export async function Footer() {
  const payload = await getPayload({ config })
  const [siteSettings, footer] = await Promise.all([
    (payload as any).findGlobal({ slug: 'siteSettings' as any, depth: 1 }),
    (payload as any).findGlobal({ slug: 'footer' as any, depth: 1 }),
  ])

  const currentYear = new Date().getFullYear()
  const social = siteSettings?.redes || {}
  const principalWa = (siteSettings?.whatsapps || []).find((w: any) => w?.principal) || siteSettings?.whatsapps?.[0]
  const principalWaDisplay = principalWa?.mostrar || principalWa?.numero
  const principalWaLink = principalWa?.numero ? `https://wa.me/${principalWa.numero}` : undefined
  const principalEmail = (siteSettings?.correos || []).find((c: any) => c?.principal) || siteSettings?.correos?.[0]
  const emailDisplay = principalEmail?.direccion
  const ubicacion = siteSettings?.ubicacion

  const enlacesRapidos = footer?.enlacesRapidos || []
  const enlacesLegales = footer?.enlacesLegales || []
  const descripcion = footer?.descripcion
  const insignia = footer?.insignia

  return (
    <footer className="bg-brand-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-20 w-32 h-32 border border-brand-yellow rounded-full"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 border border-brand-pink rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-brand-blue rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <div className="relative w-[180px] h-12">
                <Image
                  src={siteSettings?.logos?.oscuro?.url || "/images/sanroque-logo-white.webp"}
                  alt={siteSettings?.nombreComercial || "SANROQUE"}
                  fill
                  sizes="180px"
                  className="object-contain"
                />
              </div>
            </Link>
            {descripcion && (
              <p className="text-gray-300 mb-6 max-w-md">{descripcion}</p>
            )}

            {/* Award Badge - Subtle Integration */}
            {insignia?.imagen && (
              <div className="flex items-center space-x-3 mb-6">
                {/* Como 'insignia.imagen' es un upload a 'media', puede venir como objeto o id; tratamos ambos */}
                <Image
                  src={typeof insignia.imagen === 'object' ? insignia.imagen.url : '/images/pet-awards-2025.jpg'}
                  alt={insignia?.titulo || 'Insignia'}
                  width={60}
                  height={60}
                  className="rounded-lg"
                />
                <div>
                  <p className="text-sm font-semibold text-brand-yellow">{insignia?.titulo}</p>
                  <p className="text-xs text-gray-400">{insignia?.subtitulo}</p>
                </div>
              </div>
            )}

            {/* Social Media */}
            <div className="flex space-x-4">
              <a
                href={social?.instagram || '#'}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-yellow hover:text-black transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={social?.facebook || '#'}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-yellow hover:text-black transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={social?.youtube || '#'}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-yellow hover:text-black transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              {enlacesRapidos?.map((l: any, idx: number) => (
                <li key={idx}>
                  <Link href={l?.url || '#'} className="text-gray-300 hover:text-brand-yellow transition-colors">
                    {l?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-yellow mt-0.5 flex-shrink-0" />
                {ubicacion?.googleMapsUrl ? (
                  <a
                    href={ubicacion.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-brand-yellow transition-colors text-sm"
                  >
                    {ubicacion?.ciudadPais || 'Bogotá, Colombia'}
                  </a>
                ) : (
                  <span className="text-gray-300 text-sm">{ubicacion?.ciudadPais || 'Bogotá, Colombia'}</span>
                )}
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-brand-yellow mt-0.5 flex-shrink-0" />
                {principalWaLink ? (
                  <a href={principalWaLink} className="text-gray-300 hover:text-brand-yellow transition-colors text-sm">
                    {principalWaDisplay}
                  </a>
                ) : (
                  <span className="text-gray-300 text-sm">No disponible</span>
                )}
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-brand-yellow mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{emailDisplay || 'info@sanroque.com'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {currentYear} SANROQUE. Todos los derechos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {enlacesLegales?.map((l: any, idx: number) => (
              <Link key={idx} href={l?.url || '#'} className="text-gray-400 hover:text-brand-yellow text-sm transition-colors">
                {l?.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
