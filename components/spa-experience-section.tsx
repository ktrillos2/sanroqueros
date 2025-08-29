"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Sparkles } from "lucide-react"

export function SpaExperienceSection() {
  const experiences = [
    {
      title: "Baños Terapéuticos",
      image: "/images/happy-dog-bath.png",
      description: "Experiencia relajante con productos premium",
    },
    {
      title: "Masajes Especializados",
      image: "/images/dog-head-massage.jpeg",
      description: "Técnicas profesionales para el bienestar",
    },
    {
      title: "Ozonoterapia",
      image: "/images/ozone-therapy.png",
      description: "Tratamientos avanzados para la salud",
    },
    {
      title: "Ambiente Profesional",
      image: "/images/spa-reception.png",
      description: "Instalaciones de primera clase",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-moonglade text-4xl lg:text-5xl font-bold text-brand-black mb-6 font-serif">
           Experiencia <span className="text-brand-yellow">Spa 360°</span>
           
          </h2>
          <p className="font-helvetica text-gray-600 text-lg max-w-3xl mx-auto mb-8">
            Un enfoque integral que combina bienestar, salud y belleza para tu mascota
          </p>

          <motion.div
            className="aspect-video bg-gradient-to-br from-brand-black to-gray-800 rounded-2xl flex items-center justify-center text-white text-lg mb-12 max-w-4xl mx-auto shadow-2xl relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-yellow/10 via-transparent to-brand-pink/10 animate-pulse"></div>
            <div className="text-center relative z-10">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Play className="w-16 h-16 mx-auto mb-4 text-brand-yellow" />
              </motion.div>
              <p className="font-moonglade text-xl">Video próximamente</p>
              <p className="font-helvetica text-sm text-gray-400 mt-2">Experiencia Spa 360° - Detrás de cámaras</p>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 border-0 bg-white">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={experience.image || "/placeholder.svg"}
                    alt={experience.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <motion.div
                    className="absolute top-4 right-4"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Sparkles className="w-6 h-6 text-brand-yellow" />
                  </motion.div>
                </div>

                <CardContent className="p-6">
                  <h3 className="font-moonglade text-xl font-bold text-brand-black mb-2">{experience.title}</h3>
                  <p className="font-helvetica text-gray-600 text-sm">{experience.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
