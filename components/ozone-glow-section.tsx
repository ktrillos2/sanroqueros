"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Sparkles, Wind, Droplets, Palette, Heart, CheckCircle2, MessageCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function OzoneGlowSection() {
  const [activeTab, setActiveTab] = useState<number>(0)
  const phoneRaw = "573123114435"

  const pillars = [
    {
      id: 0,
      icon: Wind,
      title: "Vapor Hidratante",
      emoji: "💨",
      subtitle: "Humedad profunda para el manto",
      color: "from-amber-400 to-yellow-500",
      accentColor: "text-brand-yellow",
      borderColor: "border-brand-yellow/30 hover:border-brand-yellow",
      bgLight: "bg-brand-yellow/10",
      description: "El vapor ayuda a aportar humedad al manto y favorece el trabajo de la cosmética.",
      benefits: [
        "Aporta hidratación profunda al manto y la piel",
        "Abre cutículas del pelaje suavemente para maximizar la absorción de nutrientes",
        "Potencia los resultados de la cosmética premium aplicada",
      ],
    },
    {
      id: 1,
      icon: Droplets,
      title: "Ozono Terapéutico",
      emoji: "🫧",
      subtitle: "Protocolo avanzado de higiene y piel",
      color: "from-sky-400 to-blue-500",
      accentColor: "text-brand-blue",
      borderColor: "border-brand-blue/30 hover:border-brand-blue",
      bgLight: "bg-brand-blue/10",
      description: "El ozono complementa el protocolo de higiene y cuidado de piel y pelaje.",
      benefits: [
        "Complementa el protocolo de higiene profunda y oxigenación",
        "Cuidado especializado para pieles sensibles o reactivas",
        "Deja el pelaje revitalizado, sedoso y con brillo radiante",
      ],
    },
    {
      id: 2,
      icon: Palette,
      title: "Cromoterapia Relajante",
      emoji: "🌈",
      subtitle: "Bienestar sensorial y calma",
      color: "from-pink-400 to-rose-500",
      accentColor: "text-brand-pink",
      borderColor: "border-brand-pink/30 hover:border-brand-pink",
      bgLight: "bg-brand-pink/10",
      description: "La cromoterapia aporta un componente adicional de relajación y bienestar.",
      benefits: [
        "Estimula sensaciones de serenidad y relajación durante el baño",
        "Reduce el estrés y la ansiedad en perros y gatos",
        "Convierte el grooming en una verdadera sesión de spa holístico",
      ],
    },
  ]

  return (
    <section className="relative py-20 lg:py-28 bg-[#0a0a0a] text-white overflow-hidden" id="ozone-glow">
      {/* Ambient glowing atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-brand-yellow/10 rounded-full blur-[130px] animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-brand-pink/10 rounded-full blur-[130px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-brand-blue/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-yellow/20 via-brand-pink/20 to-brand-blue/20 border border-white/20 text-white text-sm font-semibold mb-6 shadow-lg">
            <Sparkles className="w-4 h-4 text-brand-yellow animate-spin" style={{ animationDuration: '4s' }} />
            <span className="tracking-wide">✨ NUEVO: OZONEGLOW</span>
          </div>

          <h2 className="moonglade text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Vapor + <span className="text-brand-blue">Ozono</span> + <span className="text-brand-pink">Cromoterapia</span>
          </h2>

          <p className="font-helvetica text-gray-200 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed mt-6">
            <strong className="text-white">OzoneGlow</strong> es una experiencia adicional de spa que combina vapor con ozono + cromoterapia, diseñada para complementar el servicio y brindar un momento de bienestar.
          </p>
        </motion.div>

        {/* Hero Visual & Feature Overview */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16">
          {/* Visual Showcase (7 cols) */}
          <motion.div
            className="lg:col-span-7 relative"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-black group">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/images/ozone-glow-spa.jpg"
                  alt="Experiencia adicional de spa OzoneGlow: Vapor, Ozono y Cromoterapia"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              </div>

              {/* Interactive badge bar on bottom */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 sm:p-5 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">✨</span>
                    <div>
                      <h4 className="font-heading text-base sm:text-lg font-bold text-white">Experiencia Adicional de Spa</h4>
                      <p className="font-helvetica text-xs text-gray-300">Complemento ideal durante el grooming</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-brand-yellow/20 text-brand-yellow text-xs font-semibold">💨 Vapor</span>
                    <span className="px-2.5 py-1 rounded-full bg-brand-blue/20 text-brand-blue text-xs font-semibold">🫧 Ozono</span>
                    <span className="px-2.5 py-1 rounded-full bg-brand-pink/20 text-brand-pink text-xs font-semibold">🌈 Luz</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Key Message & Benefit Highlight (5 cols) */}
          <motion.div
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/15 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-brand-yellow/10 rounded-full blur-2xl" />
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-yellow to-brand-pink flex items-center justify-center text-black shrink-0 font-bold text-xl shadow-lg">
                  ✨
                </div>
                <div>
                  <Badge className="bg-brand-yellow text-black font-bold mb-1 text-xs">Plus de Bienestar</Badge>
                  <h3 className="moonglade text-2xl font-bold text-white">¿Por qué elegir OzoneGlow?</h3>
                </div>
              </div>

              <blockquote className="font-helvetica text-gray-200 text-base sm:text-lg leading-relaxed mb-6 italic border-l-4 border-brand-yellow pl-4">
                &ldquo;Es una excelente opción para complementar el servicio y brindar un extra de hidratación, acondicionamiento y bienestar durante el grooming.&rdquo;
              </blockquote>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-brand-yellow shrink-0" />
                  <span>Apto para perros y gatos de todas las edades</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-brand-pink shrink-0" />
                  <span>Resultados visibles inmediatos en pelaje y piel</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0" />
                  <span>Disponible ahora en nuestra Nueva Sede</span>
                </div>
              </div>

              <div className="pt-6">
                <Button
                  size="lg"
                  className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-6 rounded-xl shadow-lg text-base hover:scale-102 transition-all duration-300"
                  asChild
                >
                  <a
                    href={`https://wa.me/${phoneRaw}?text=${encodeURIComponent('¡Hola SANROQUE! Me gustaría agendar el nuevo servicio OzoneGlow (Vapor + Ozono + Cromoterapia) para mi mascota.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Agendar OzoneGlow por WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* The 3 Pillars Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="moonglade text-3xl sm:text-4xl font-bold text-white mb-3">
              Los 3 Pilares de <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-brand-pink to-brand-blue">OzoneGlow</span>
            </h3>
            <p className="font-helvetica text-gray-400 text-base max-w-2xl mx-auto">
              Cada componente actúa sinérgicamente para brindar una experiencia terapéutica y estética inigualable.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon
              return (
                <motion.div
                  key={pillar.id}
                  className={`p-8 rounded-3xl bg-white/[0.04] border ${pillar.borderColor} transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between group`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  viewport={{ once: true }}
                >
                  <div>
                    {/* Pillar Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl ${pillar.bgLight} flex items-center justify-center ${pillar.accentColor} group-hover:scale-110 transition-transform duration-300 text-2xl`}>
                        {pillar.emoji}
                      </div>
                      <span className="text-3xl font-heading font-black text-white/10 group-hover:text-white/20 transition-colors">
                        0{idx + 1}
                      </span>
                    </div>

                    <h4 className="moonglade text-2xl font-bold text-white mb-2">{pillar.title}</h4>
                    <p className={`text-xs uppercase tracking-wider font-semibold ${pillar.accentColor} mb-4`}>
                      {pillar.subtitle}
                    </p>

                    <p className="font-helvetica text-gray-200 text-base leading-relaxed mb-6 font-medium">
                      {pillar.description}
                    </p>

                    {/* Benefit checklist */}
                    <ul className="space-y-2.5 text-sm text-gray-300 border-t border-white/10 pt-4">
                      {pillar.benefits.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className={`w-4 h-4 ${pillar.accentColor} shrink-0 mt-0.5`} />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/5">
                    <a
                      href={`https://wa.me/${phoneRaw}?text=${encodeURIComponent(`Hola, me interesa conocer más sobre el pilar ${pillar.title} de OzoneGlow para mi mascota.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 text-sm font-semibold ${pillar.accentColor} hover:underline`}
                    >
                      <span>Consultar este beneficio</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Bottom Call to Action Card */}
        <motion.div
          className="rounded-3xl bg-gradient-to-r from-brand-yellow/15 via-brand-pink/15 to-brand-blue/15 border border-white/20 p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative z-10 space-y-6">
            <h3 className="moonglade text-3xl sm:text-4xl font-bold text-white">
              ¿Listo para consentir a tu mascota con <span className="text-brand-yellow">OzoneGlow</span>?
            </h3>
            <p className="font-helvetica text-gray-200 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Agrega esta experiencia adicional en su próxima visita de grooming en nuestra <strong className="text-white">Nueva Sede (Calle 118 #15 - 45)</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
              <Button
                size="lg"
                className="bg-brand-yellow hover:bg-yellow-400 text-black font-bold text-base px-8 py-6 rounded-xl shadow-xl hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                asChild
              >
                <a
                  href={`https://wa.me/${phoneRaw}?text=${encodeURIComponent('Hola SANROQUE, me gustaría agendar el nuevo servicio OzoneGlow en la Nueva Sede (Calle 118 #15 - 45). Mi mascota es:')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Agendar Cita con OzoneGlow
                </a>
              </Button>
              <a
                href="#nueva-sede"
                className="inline-flex items-center justify-center bg-black/75 hover:bg-white/10 border-2 border-white/35 hover:border-white text-white font-bold text-base px-8 py-5 rounded-xl w-full sm:w-auto transition-all shadow-md"
              >
                Ver Información de la Nueva Sede
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
