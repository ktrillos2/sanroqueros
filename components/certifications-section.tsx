"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Award, Shield, Star, CheckCircle } from "lucide-react"

export function CertificationsSection() {
  const certifications = [
    {
      title: "6° Premios PetIndustry 2025",
      subtitle: "Mejor Spa y Peluquería en Bogotá",
      description: "Reconocimiento a la excelencia en servicios de grooming y bienestar para mascotas",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202025-08-19%20a%20las%2020.59.39_b7909fcc.jpg-S4pE6tzjqA5zJ55EkoNaDJCZeAKZXB.jpeg",
      color: "from-yellow-400 to-amber-500",
      icon: Award,
    },
    {
      title: "Fear Free Certified",
      subtitle: "Certificación en Bienestar Animal",
      description: "Técnicas especializadas para reducir el estrés y la ansiedad en las mascotas",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FF%20Corporate%20Logo%20-%20Small-JV6BzWkwIhTWZcGFyOtbBrsQEtytoc.png",
      color: "from-blue-400 to-cyan-500",
      icon: Shield,
    },
  ]

  const achievements = [
    "Técnicas libres de estrés certificadas",
    "Personal especializado y capacitado",
    "Ambiente 100% libre de jaulas",
    "Productos premium certificados",
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-brand-yellow rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-brand-pink rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-brand-blue rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-yellow to-brand-pink text-white px-6 py-2 rounded-full text-sm font-semibold mb-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <Star className="w-4 h-4" />
            Certificaciones de Excelencia
          </motion.div>

          <h2 className="moonglade text-4xl lg:text-5xl font-bold text-brand-black mb-4">
            Nuestras <span className="text-brand-yellow">Certificaciones</span>
          </h2>

          <p className="font-helvetica text-lg text-gray-600 max-w-2xl mx-auto">
            Respaldados por las certificaciones más prestigiosas de la industria pet, garantizamos el más alto nivel de
            calidad y bienestar para tu mascota.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 relative overflow-hidden h-full font-helvetica">
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-5 rounded-3xl`}></div>

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    {/* Certification Image */}
                    <motion.div
                      className="flex justify-center mb-6"
                      animate={{ rotate: [0, 2, -2, 0] }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                      <div className="w-32 h-32 rounded-2xl overflow-hidden bg-white p-2 shadow-none">
                        <Image
                          src={cert.image || "/placeholder.svg"}
                          alt={cert.title}
                          width={128}
                          height={128}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </motion.div>

                    {/* Text Content */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <cert.icon className={`w-6 h-6 bg-gradient-to-r ${cert.color} bg-clip-text text-transparent`} />
                        <h3 className="text-xl font-bold text-brand-black">{cert.title}</h3>
                      </div>

                      <p
                        className={`font-helvetica text-lg font-semibold bg-gradient-to-r ${cert.color} bg-clip-text text-transparent`}
                      >
                        {cert.subtitle}
                      </p>

                      <p className="font-helvetica text-gray-600 leading-relaxed">{cert.description}</p>
                    </div>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-yellow/5 to-brand-pink/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements List */}
        <motion.div
          className="bg-black rounded-3xl p-8 lg:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="moonglade text-2xl lg:text-3xl font-bold text-white mb-4">
              Lo que nos hace <span className="text-brand-yellow">únicos</span>
            </h3>
            <p className="font-helvetica text-gray-300">
              Nuestro compromiso con la excelencia se refleja en cada detalle
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement}
                className="flex items-center gap-3 group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-8 h-8 bg-gradient-to-r from-brand-yellow to-brand-pink rounded-full flex items-center justify-center flex-shrink-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <CheckCircle className="w-4 h-4 text-white" />
                </motion.div>
                <p className="font-helvetica text-white text-sm font-medium group-hover:text-brand-yellow transition-colors duration-300">
                  {achievement}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
