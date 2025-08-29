"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, Phone, Play } from "lucide-react"

export function StoreLocationSection() {
  const storeFeatures = [
    {
      icon: MapPin,
      title: "Ubicación Privilegiada",
      description: "En el corazón de Bogotá, fácil acceso y parqueadero",
    },
    {
      icon: Clock,
      title: "Horarios Flexibles",
      description: "Lunes a Sábado: 8:00 AM - 6:00 PM",
    },
    {
      icon: Phone,
      title: "Reservas",
      description: "WhatsApp: +57 315 443 3109",
    },
  ]

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
            Nuestra <span className="text-brand-yellow">Tienda & Ubicación</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Visítanos en nuestras modernas instalaciones diseñadas para el bienestar de tu mascota
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
                    src="/images/spa-reception.png"
                    alt="Recepción SANROQUE"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="relative h-32 rounded-2xl overflow-hidden">
                  <Image
                    src="/images/two-dogs-spa.png"
                    alt="Área de espera"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="relative h-32 rounded-2xl overflow-hidden">
                  <Image
                    src="/images/beagle-reception.jpeg"
                    alt="Área de atención"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden">
                  <Image
                    src="/images/happy-dog-bath.png"
                    alt="Área de baño"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Video Placeholder */}
            <motion.div
              className="aspect-video bg-brand-black rounded-2xl flex items-center justify-center text-white"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <Play className="w-12 h-12 mx-auto mb-3 text-brand-yellow" />
                <p className="text-sm">Video próximamente</p>
                <p className="text-xs text-gray-400 mt-1">Recorrido virtual por nuestras instalaciones</p>
              </div>
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
              <h3 className="font-heading text-3xl font-bold text-brand-black">
                Instalaciones de <span className="text-brand-yellow">Primera Clase</span>
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Nuestro spa cuenta con las más modernas instalaciones, equipos de última tecnología y un ambiente
                diseñado especialmente para el confort y bienestar de perros y gatos.
              </p>
            </div>

            <div className="space-y-6">
              {storeFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-black" />
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
                <h4 className="font-heading text-xl font-bold mb-4 text-brand-yellow">¿Cómo llegar?</h4>
                <p className="text-gray-300 mb-4">
                  Estamos ubicados en una zona de fácil acceso con parqueadero disponible. Contáctanos para recibir
                  indicaciones detalladas.
                </p>
                <div className="flex items-center gap-2 text-brand-pink">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Bogotá, Colombia</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
