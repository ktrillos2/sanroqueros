"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, Phone, Play } from "lucide-react"

type Feature = { kind: 'location' | 'hours' | 'whatsapp'; title: string; description?: string }
type StoreLocationData = {
  title?: { left?: string; yellow?: string }
  intro?: any
  images?: { image?: any; alt?: string }[]
  features?: Feature[]
  locationCard?: { title?: string; description?: string; cityCountry?: string }
}

const iconFor = (kind: Feature['kind']) => {
  switch (kind) {
    case 'location':
      return MapPin
    case 'hours':
      return Clock
    case 'whatsapp':
      return Phone
    default:
      return MapPin
  }
}

export function StoreLocationSection() {
  const [data, setData] = useState<StoreLocationData | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch('/api/store-location', { cache: 'no-store' })
        const json = res.ok ? await res.json() : null
        if (!mounted) return
        setData(json)
      } catch {
        if (!mounted) return
        setData(null)
      }
    })()
    return () => { mounted = false }
  }, [])

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-brand-black mb-6">
            {data?.title?.left ?? 'Nuestra'}{' '}
            <span className="text-brand-yellow">{data?.title?.yellow ?? 'Tienda & Ubicación'}</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            {"intro" in (data || {}) ? undefined : 'Visítanos en nuestras modernas instalaciones diseñadas para el bienestar de tu mascota'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Store Images */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-48 rounded-2xl overflow-hidden">
                  <Image
                    src="/images/spa-reception.webp"
                    alt="Recepción SANROQUE"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="relative h-32 rounded-2xl overflow-hidden">
                  <Image
                    src="/images/two-dogs-spa.webp"
                    alt="Área de espera"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="relative h-32 rounded-2xl overflow-hidden">
                  <Image
                    src="/images/beagle-reception.webp"
                    alt="Área de atención"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden">
                  <Image
                    src="/images/happy-dog-bath.webp"
                    alt="Área de baño"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Video */}
            <motion.div
              className="aspect-video bg-black rounded-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {data?.video?.sourceType === 'youtube' && data?.video?.youtubeUrl ? (
                <iframe
                  className="w-full h-full"
                  src={(() => {
                    const url = new URL(data.video.youtubeUrl)
                    const id = url.searchParams.get('v') || url.pathname.replace('/', '')
                    return `https://www.youtube.com/embed/${id}`
                  })()}
                  title={data.video.caption || 'Video'}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : data?.video?.sourceType === 'upload' && (data as any)?.video?.file?.url ? (
                <video className="w-full h-full" controls>
                  <source src={(data as any).video.file.url} />
                </video>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <Play className="w-12 h-12 mx-auto mb-3 text-brand-yellow" />
                    <p className="text-sm">Video próximamente</p>
                    <p className="text-xs text-gray-400 mt-1">Recorrido virtual por nuestras instalaciones</p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Right Content - Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <h3 className="font-heading text-3xl font-bold text-brand-black text-center">
                Instalaciones de <span className="text-brand-yellow">Primera Clase</span>
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Nuestro spa cuenta con las más modernas instalaciones, equipos de última tecnología y un ambiente
                diseñado especialmente para el confort y bienestar de perros y gatos.
              </p>
            </div>

            <div className="space-y-6">
              {(data?.features ?? [
                { kind: 'location', title: 'Ubicación Privilegiada', description: 'En el corazón de Bogotá, fácil acceso y parqueadero' },
                { kind: 'hours', title: 'Horarios Flexibles', description: 'Lunes a Sábado: 8:00 AM - 6:00 PM' },
                { kind: 'whatsapp', title: 'Reservas', description: 'WhatsApp: +57 315 443 3109' },
              ]).map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center flex-shrink-0">
                    {(() => {
                      const Icon = iconFor(feature.kind as Feature['kind'])
                      return <Icon className="w-6 h-6 text-black" />
                    })()}
                  </div>
                  <div>
                    <h4 className="font-heading text-xl font-semibold text-brand-black mb-2">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Card className="bg-brand-black text-white border-0">
              <CardContent className="p-6">
                <h4 className="font-heading text-xl font-bold mb-4 text-brand-yellow">{data?.locationCard?.title ?? '¿Cómo llegar?'}</h4>
                <p className="text-gray-300 mb-4">
                  {data?.locationCard?.description ?? 'Estamos ubicados en una zona de fácil acceso con parqueadero disponible. Contáctanos para recibir indicaciones detalladas.'}
                </p>
                <div className="flex items-center gap-2 text-brand-pink">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{data?.locationCard?.cityCountry ?? 'Bogotá, Colombia'}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
