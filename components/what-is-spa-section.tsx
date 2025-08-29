"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Sparkles, Heart, Shield, Home } from "lucide-react"

export function WhatIsSpaSection() {
  const benefits = [
    {
      icon: Shield,
      title: "Evaluación Completa",
      description: "Revisión detallada del estado de salud y bienestar de tu mascota antes de cada tratamiento",
    },
    {
      icon: Sparkles,
      title: "Productos Premium",
      description: "Utilizamos las mejores marcas como Iv San Bernard y Hydra para resultados excepcionales",
    },
    {
      icon: Heart,
      title: "Cuidado Personalizado",
      description: "Cada tratamiento se adapta a las necesidades específicas de tu perro o gato",
    },
    {
      icon: Home,
      title: "Ambiente Libre de Jaulas",
      description:
        "Tu mascota disfruta de total libertad de movimiento durante su tratamiento, creando una experiencia relajante y sin estrés en un ambiente completamente abierto",
      isSpecial: true,
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <motion.h2
                className="font-moonglade text-4xl lg:text-5xl font-bold text-brand-black font-serif"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                ¿Qué es un <span className="text-brand-yellow">Spa</span> para{" "}
                <span className="text-brand-pink">Perros y Gatos</span>?
              </motion.h2>

              <motion.p
                className="font-helvetica text-lg text-gray-700 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
              >
                Un spa para mascotas es mucho más que un simple baño. Es una experiencia integral de bienestar que
                combina técnicas profesionales de grooming con tratamientos relajantes y terapéuticos, diseñados
                específicamente para el cuidado y la salud de perros y gatos.
              </motion.p>

              <motion.p
                className="font-helvetica text-lg text-gray-700 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                viewport={{ once: true }}
              >
                En SANROQUE, transformamos el cuidado tradicional en una experiencia premium que no solo mejora la
                apariencia de tu mascota, sino que también contribuye a su salud física y bienestar emocional.
              </motion.p>
            </div>

            <motion.div
              className="grid sm:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  className={`flex items-start space-x-4 group ${benefit.isSpecial ? "hover:scale-105" : "hover:scale-102"} transition-transform duration-300`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`p-4 rounded-2xl border transition-all duration-300 ${
                      benefit.isSpecial
                        ? "border-brand-yellow/20 group-hover:border-brand-yellow/40 group-hover:shadow-lg group-hover:bg-gradient-to-r group-hover:from-brand-yellow/5 group-hover:to-brand-pink/5"
                        : "border-transparent"
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <motion.div
                        className="w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                        whileHover={benefit.isSpecial ? { rotate: 360 } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        <benefit.icon className="w-6 h-6 text-black" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="font-moonglade text-lg font-semibold text-brand-black mb-2 flex items-center gap-2">
                          {benefit.title}
                          {benefit.isSpecial && (
                            <span className="inline-block w-2 h-2 bg-brand-yellow rounded-full animate-pulse"></span>
                          )}
                        </h3>
                        <p className="font-helvetica text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Images */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full h-[600px]">
              {/* Main spa image */}
              <motion.div
                className="absolute top-0 right-0 z-10"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <div className="relative">
                  <Image
                    src="/images/happy-dog-bath.png"
                    alt="Perro feliz durante su spa en SANROQUE"
                    width={400}
                    height={400}
                    className="rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-yellow/10 to-brand-pink/10 blur-sm -z-10 scale-105" />
                </div>
              </motion.div>

              {/* Secondary image */}
              <motion.div
                className="absolute bottom-0 left-0 z-20"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 2,
                }}
              >
                <div className="relative">
                  <Image
                    src="/images/spa-reception.png"
                    alt="Recepción profesional de SANROQUE"
                    width={300}
                    height={200}
                    className="rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-blue/10 to-brand-yellow/10 blur-sm -z-10 scale-105" />
                </div>
              </motion.div>

              {/* Floating decorative elements */}
              <motion.div
                className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-r from-brand-pink to-pink-300 rounded-full flex items-center justify-center shadow-lg"
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                }}
              >
                <Heart className="w-8 h-8 text-white" />
              </motion.div>

              <motion.div
                className="absolute bottom-32 right-20 w-12 h-12 bg-gradient-to-r from-brand-blue to-blue-300 rounded-full flex items-center justify-center shadow-lg"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  scale: { duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                  rotate: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                }}
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
