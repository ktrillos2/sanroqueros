"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Clock, Car, Sparkles, Navigation, Copy, Check, MessageCircle, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function NewHeadquartersSection() {
  const [copied, setCopied] = useState(false)
  const address = "Calle 118 #15 - 45"
  const phone = "312 3114435"
  const phoneRaw = "573123114435"
  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Calle+118+%2315+-+45+Bogota"

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(`${address}, Bogotá, Colombia`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // ignore
    }
  }

  return (
    <section className="relative py-20 lg:py-24 bg-black text-white overflow-hidden border-t border-white/10" id="nueva-sede">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Badge & Title */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FFE550]/15 border border-[#FFE550]/50 text-[#FFE550] text-sm font-bold mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#FFE550] animate-spin" style={{ animationDuration: '6s' }} />
            <span>¡Gran Apertura en Bogotá!</span>
          </div>

          <h2 className="moonglade text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white">
            Conoce Nuestra <span className="text-[#FFE550] drop-shadow-[0_0_20px_rgba(255,229,80,0.3)]">Nueva Sede</span>
          </h2>

          <p className="font-helvetica text-gray-200 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            Abrimos las puertas de un nuevo espacio diseñado para brindar la máxima comodidad, bienestar y el cuidado libre de estrés que tus mascotas merecen.
          </p>
        </motion.div>

        {/* Centered Cards Container (No image) */}
        <motion.div
          className="max-w-4xl mx-auto space-y-6"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
        >
          {/* Primary Info Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Address Card */}
            <div className="p-7 md:p-8 rounded-3xl bg-[#141414] border border-white/15 hover:border-[#FFE550]/60 transition-all duration-300 group shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-13 h-13 rounded-2xl bg-[#FFE550] text-black flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <MapPin className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#FFE550]/15 text-[#FFE550] border border-[#FFE550]/40">
                    Sede Norte
                  </span>
                </div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">Ubicación</p>
                <h3 className="moonglade text-2xl font-bold text-white mb-2">Dirección</h3>
                <p className="font-helvetica text-2xl md:text-3xl font-extrabold text-[#FFE550] mb-2 leading-tight">
                  {address}
                </p>
                <p className="text-gray-300 text-sm font-medium mb-6">Bogotá, Colombia</p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 active:bg-white/25 text-white border border-white/20 text-xs font-bold h-11 px-5 rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-400 stroke-[2.5]" />
                      <span className="text-green-400">¡Copiada!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-white" />
                      <span>Copiar Dirección</span>
                    </>
                  )}
                </button>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#FFE550] hover:bg-yellow-400 active:scale-95 text-black font-extrabold text-xs h-11 px-5 rounded-xl shadow-md transition-all"
                >
                  <Navigation className="w-4 h-4 stroke-[2.5]" />
                  <span>Cómo llegar</span>
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <div className="p-7 md:p-8 rounded-3xl bg-[#141414] border border-white/15 hover:border-[#FFB1BE]/60 transition-all duration-300 group shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-13 h-13 rounded-2xl bg-[#FFB1BE] text-black flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <Phone className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#FFB1BE]/15 text-[#FFB1BE] border border-[#FFB1BE]/40">
                    Línea Directa
                  </span>
                </div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">Contacto Directo</p>
                <h3 className="moonglade text-2xl font-bold text-white mb-2">Teléfono</h3>
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="font-helvetica text-2xl md:text-3xl font-extrabold text-[#FFB1BE] hover:text-pink-300 block mb-2 leading-tight transition-colors"
                >
                  {phone}
                </a>
                <p className="text-gray-300 text-sm font-medium mb-6">Atención telefónica & WhatsApp</p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 active:bg-white/25 text-white border border-white/20 text-xs font-bold h-11 px-5 rounded-xl transition-all shadow-sm"
                >
                  <Phone className="w-4 h-4 text-white" />
                  <span>Llamar</span>
                </a>
                <a
                  href={`https://wa.me/${phoneRaw}?text=${encodeURIComponent('¡Hola SANROQUE! Quisiera agendar una cita en la nueva sede de la Calle 118 #15 - 45.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] active:scale-95 text-white font-extrabold text-xs h-11 px-5 rounded-xl shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4 stroke-[2.5]" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Features Bar */}
          <div className="p-6 md:p-7 rounded-3xl bg-[#141414] border border-white/15 grid sm:grid-cols-3 gap-6 text-left shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#88D3EE] text-black flex items-center justify-center shrink-0 shadow-md">
                <Clock className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="font-heading text-sm font-bold text-white">Horario de Atención</h4>
                <p className="font-helvetica text-xs text-gray-300 font-medium mt-0.5">Lunes a Sábado: 8:00 AM - 6:00 PM</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFE550] text-black flex items-center justify-center shrink-0 shadow-md">
                <Car className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="font-heading text-sm font-bold text-white">Comodidad y Acceso</h4>
                <p className="font-helvetica text-xs text-gray-300 font-medium mt-0.5">Zona segura con parqueadero disponible</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFB1BE] text-black flex items-center justify-center shrink-0 shadow-md">
                <Heart className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="font-heading text-sm font-bold text-white">Ambiente Libre de Jaulas</h4>
                <p className="font-helvetica text-xs text-gray-300 font-medium mt-0.5">Atención 100% Fear Free y sin estrés</p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${phoneRaw}?text=${encodeURIComponent('Hola SANROQUE, me gustaría agendar una cita para mi mascota en la Nueva Sede (Calle 118 #15 - 45).')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#FFE550] hover:bg-yellow-400 active:scale-98 text-black font-extrabold text-base px-8 py-4.5 rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <MessageCircle className="w-5 h-5 stroke-[2.5]" />
              <span>Agendar Cita en la Nueva Sede</span>
            </a>

            <a
              href="#ozone-glow"
              className="inline-flex items-center justify-center gap-2.5 bg-[#141414] hover:bg-white/10 active:scale-98 text-white border-2 border-white/25 hover:border-white font-bold text-base px-8 py-4.5 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
            >
              <Sparkles className="w-5 h-5 text-[#FFE550]" />
              <span>Conocer Nuevo Servicio OzoneGlow</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
