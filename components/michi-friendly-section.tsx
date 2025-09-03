"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Play, Heart, Sparkles, Star } from "lucide-react"

export function MichiFriendlySection() {
  const catFeatures = [
    {
      icon: Heart,
      title: "Ambiente Tranquilo",
      description: "Espacios diseñados especialmente para el bienestar felino",
    },
    {
      icon: Sparkles,
      title: "Técnicas Especializadas",
      description: "Métodos suaves adaptados al comportamiento de los gatos",
    },
    {
      icon: Star,
      title: "Productos Específicos",
      description: "Líneas de cuidado formuladas exclusivamente para felinos",
    },
  ]

  return (
    <section className="py-20 bg-brand-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-brand-pink rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 border-2 border-brand-blue rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="text-white space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <h2 className="font-heading text-4xl lg:text-5xl font-bold leading-tight">
                <span className="text-brand-pink">Michi</span> Friendly
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Sabemos que los gatos son especiales. Por eso hemos creado un ambiente y servicios diseñados
                específicamente para el bienestar y comodidad de nuestros amigos felinos.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-6">
              {catFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 bg-brand-pink rounded-full flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Video Placeholder */}
            <motion.div
              className="aspect-video bg-gray-900 rounded-2xl flex items-center justify-center text-white border border-gray-800"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <Play className="w-12 h-12 mx-auto mb-3 text-brand-pink" />
                <p className="text-sm">Video próximamente</p>
                <p className="text-xs text-gray-400 mt-1">Experiencia Michi Friendly</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Cat Images */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full h-[600px]">
              {/* Main cat image */}
              <motion.div
                className="absolute top-0 right-0 z-10"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <div className="relative w-[350px] h-[350px]">
                  <Image
                    src="/images/ragdoll-cat.jpg"
                    alt="Gato Ragdoll relajado en SANROQUE"
                    fill
                    sizes="(max-width: 1024px) 50vw, 350px"
                    className="object-cover rounded-2xl shadow-2xl"
                  />
                </div>
              </motion.div>

              {/* Yorkshire Terriers image */}
              <motion.div
                className="absolute bottom-0 left-0 z-20"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
              >
                <div className="relative w-[300px] h-[300px]">
                  <Image
                    src="/images/yorkshire-terriers.png"
                    alt="Yorkshire Terriers en SANROQUE"
                    fill
                    sizes="(max-width: 1024px) 50vw, 300px"
                    className="object-cover rounded-2xl shadow-2xl"
                  />
                </div>
              </motion.div>

              {/* Floating elements */}
              <motion.div
                className="absolute top-32 left-10 w-16 h-16 bg-brand-pink rounded-full flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Heart className="w-8 h-8 text-white" />
              </motion.div>

              <motion.div
                className="absolute bottom-40 right-20 w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
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
