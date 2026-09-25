"use client"

import { MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"

export function FloatingWhatsappButton() {
  const [site, setSite] = useState<any>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch('/api/site-settings', { cache: 'no-store' })
        const json = res.ok ? await res.json() : null
        if (!mounted) return
        setSite(json?.data || null)
      } catch {
        if (!mounted) return
        setSite(null)
      }
    })()
    return () => { mounted = false }
  }, [])

  const principalWhatsapp = useMemo(() => {
    const arr = site?.whatsapps || []
    return arr.find((w: any) => w?.principal) || arr[0] || { numero: '573123114435' }
  }, [site])

  const defaultMsg = site?.mensajeWhatsAppPorDefecto || 'Hola, vengo desde la web. Me gustaría agendar una cita para mi mascota.'
  const whatsappUrl = `https://wa.me/${principalWhatsapp.numero}?text=${encodeURIComponent(defaultMsg)}`

  return (
    whatsappUrl ? (
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 animate-pulse-glow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.a>
    ) : null
  )
}
