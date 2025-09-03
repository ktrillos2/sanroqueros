"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Award, Shield, Star, CheckCircle } from "lucide-react"

type MediaRef = { url?: string }
type Rich = any
type CertificationItem = {
  title: string
  subtitle?: string
  description?: Rich
  color?: string
  icon?: "award" | "shield" | "star" | "checkCircle"
  link?: string
  logo?: MediaRef | string
}
type CertificationsData = {
  title?: { left?: string; yellow?: string }
  badge?: string
  intro?: Rich
  certifications?: CertificationItem[]
  achievements?: { text: string }[]
}

const iconMap = {
  award: Award,
  shield: Shield,
  star: Star,
  checkCircle: CheckCircle,
} as const

const getMediaUrl = (m?: MediaRef | string) => {
  if (!m) return undefined
  if (typeof m === 'string') return m
  return m.url
}

function extractRichParagraphs(rich?: Rich): string[] {
  if (!rich) return []
  // Caso Payload Lexical { root: { children: [...] } }
  if (rich?.root?.children && Array.isArray(rich.root.children)) {
    const paras: string[] = []
    for (const node of rich.root.children) {
      if (node?.type === 'paragraph' && Array.isArray(node.children)) {
        const t = node.children.map((c: any) => c?.text || '').join('')
        if (t.trim()) paras.push(t)
      }
    }
    if (paras.length) return paras
  }
  // Caso arreglo simple con children[].text (fallback)
  if (Array.isArray(rich)) {
    const paras: string[] = []
    for (const n of rich) {
      if (Array.isArray(n?.children)) {
        const t = n.children.map((c: any) => c?.text || '').join('')
        if (t.trim()) paras.push(t)
      } else if (typeof n?.text === 'string' && n.text.trim()) {
        paras.push(n.text)
      }
    }
    return paras
  }
  // Texto plano
  if (typeof rich === 'string') return [rich]
  return []
}

export function CertificationsSection() {
  const [data, setData] = useState<CertificationsData | null>(null)

  useEffect(() => {
    let mounted = true
      ; (async () => {
        try {
          const res = await fetch('/api/certifications', { cache: 'no-store' })
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

  const titleLeft = data?.title?.left ?? 'Nuestras'
  const titleYellow = data?.title?.yellow ?? 'Certificaciones'
  const badge = data?.badge ?? 'Certificaciones de Excelencia'
  const introParas = useMemo(() => extractRichParagraphs(data?.intro), [data?.intro])
  const certs: CertificationItem[] = data?.certifications?.length ? data.certifications! : [
    {
      title: '6° Premios PetIndustry 2025',
      subtitle: 'Mejor Spa y Peluquería en Bogotá',
      description: [{ children: [{ text: 'Reconocimiento a la excelencia en servicios de grooming y bienestar para mascotas' }] }],
      color: 'from-yellow-400 to-amber-500',
      icon: 'award',
      logo: undefined,
    },
    {
      title: 'Fear Free Certified',
      subtitle: 'Certificación en Bienestar Animal',
      description: [{ children: [{ text: 'Técnicas especializadas para reducir el estrés y la ansiedad en las mascotas' }] }],
      color: 'from-blue-400 to-cyan-500',
      icon: 'shield',
      logo: undefined,
    },
  ]
  const achievements = (data?.achievements?.map(a => a.text) ?? [
    'Técnicas libres de estrés certificadas',
    'Personal especializado y capacitado',
    'Ambiente 100% libre de jaulas',
    'Productos premium certificados',
  ])

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
            {badge}
          </motion.div>

          <h2 className="moonglade text-4xl lg:text-5xl font-bold text-brand-black mb-4">
            {titleLeft} <span className="text-brand-yellow">{titleYellow}</span>
          </h2>

          <div className="font-helvetica text-lg text-gray-600 max-w-2xl mx-auto space-y-4">
            {introParas.length
              ? introParas.map((t, i) => (
                <p key={i}>{t}</p>
              ))
              : (
                <p>
                  Respaldados por las certificaciones más prestigiosas de la industria pet, garantizamos el más alto nivel de calidad y bienestar para tu mascota.
                </p>
              )}
          </div>
        </motion.div>

        {/* Certifications Grid */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-8">
            {certs.map((cert, index) => (
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
                          src={getMediaUrl(cert.logo) || "/placeholder.svg"}
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
                        {(() => {
                          const key = (cert.icon ?? 'award') as keyof typeof iconMap
                          const Icon = iconMap[key]
                          return <Icon className={`w-6 h-6 bg-gradient-to-r ${cert.color} bg-clip-text text-transparent`} />
                        })()}
                        <h3 className="text-xl font-bold text-brand-black">{cert.title}</h3>
                      </div>

                      {cert.subtitle && (
                        <p
                          className={`font-helvetica text-lg font-semibold bg-gradient-to-r ${cert.color} bg-clip-text text-transparent`}
                        >
                          {cert.subtitle}
                        </p>
                      )}

                      <div className="font-helvetica text-gray-600 leading-relaxed space-y-3">
                        {extractRichParagraphs(cert.description).map((t, i) => (
                          <p key={i}>{t}</p>
                        ))}
                      </div>
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
