import Image from "next/image"
import Link from "next/link"
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

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
                  src="/images/sanroque-logo-white.png"
                  alt="SANROQUE"
                  fill
                  sizes="180px"
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              El mejor spa y peluquería para perros y gatos en Bogotá. Experiencia premium con productos de alta gama y
              técnicas profesionales.
            </p>

            {/* Award Badge - Subtle Integration */}
            <div className="flex items-center space-x-3 mb-6">
              <Image
                src="/images/pet-awards-2025.jpg"
                alt="Premio Mejor Spa 2025"
                width={60}
                height={60}
                className="rounded-lg"
              />
              <div>
                <p className="text-sm font-semibold text-brand-yellow">Reconocidos por la excelencia</p>
                <p className="text-xs text-gray-400">Mejor spa y peluquería en Bogotá</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-yellow hover:text-black transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-yellow hover:text-black transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
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
              <li>
                <Link href="/" className="text-gray-300 hover:text-brand-yellow transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/perros" className="text-gray-300 hover:text-brand-yellow transition-colors">
                  Servicios para Perros
                </Link>
              </li>
              <li>
                <Link href="/gatos" className="text-gray-300 hover:text-brand-yellow transition-colors">
                  Servicios para Gatos
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-brand-yellow transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/#contacto" className="text-gray-300 hover:text-brand-yellow transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-yellow mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Bogotá, Colombia</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-brand-yellow mt-0.5 flex-shrink-0" />
                <a
                  href="https://wa.me/573154433109"
                  className="text-gray-300 hover:text-brand-yellow transition-colors text-sm"
                >
                  +57 315 443 3109
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-brand-yellow mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@sanroque.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {currentYear} SANROQUE. Todos los derechos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-brand-yellow text-sm transition-colors">
              Política de Privacidad
            </Link>
            <Link href="#" className="text-gray-400 hover:text-brand-yellow text-sm transition-colors">
              Términos de Servicio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
