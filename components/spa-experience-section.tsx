"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Sparkles } from "lucide-react"

type MediaRef = { url?: string }
type Rich = any
type ExpItem = { title: string; image?: MediaRef | string; description?: Rich }
type Video = { sourceType?: 'youtube' | 'upload'; youtubeUrl?: string; file?: MediaRef | string; caption?: string }
type SpaData = { title?: { left?: string; yellow?: string }; intro?: Rich; video?: Video; experiences?: ExpItem[] }

const getMediaUrl = (m?: MediaRef | string) => typeof m === 'string' ? m : m?.url

function extractRichParagraphs(rich?: Rich): string[] {
  if (!rich) return []
  if (rich?.root?.children && Array.isArray(rich.root.children)) {
    const paras: string[] = []
    for (const node of rich.root.children) {
      if (node?.type === 'paragraph' && Array.isArray(node.children)) {
        const t = node.children.map((c: any) => c?.text || '').join('')
        if (t.trim()) paras.push(t)
      }
    }
    return paras
  }
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
  if (typeof rich === 'string') return [rich]
  return []
}

function toYouTubeEmbed(url?: string): string | null {
  if (!url) return null
  try {
    const u = new URL(url)
    // youtu.be/<id>
    if (u.hostname.includes('youtu.be')) {
      const id = u.pathname.replace('/', '')
      return id ? `https://www.youtube.com/embed/${id}` : null
    }
    // www.youtube.com/watch?v=<id>
    if (u.hostname.includes('youtube.com')) {
      const id = u.searchParams.get('v')
      if (id) return `https://www.youtube.com/embed/${id}`
      // also support /embed/<id>
      if (u.pathname.startsWith('/embed/')) return url
    }
  } catch { }
  return null
}

export function SpaExperienceSection() {
  const [data, setData] = useState<SpaData | null>(null)

  useEffect(() => {
    let mounted = true
      ; (async () => {
        try {
          const res = await fetch('/api/spa-experience', { cache: 'no-store' })
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

  const titleLeft = data?.title?.left ?? 'Experiencia'
  const titleYellow = data?.title?.yellow ?? 'Spa 360°'
  const introParas = useMemo(() => extractRichParagraphs(data?.intro), [data?.intro])
  const experiences: ExpItem[] = data?.experiences ?? []

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
          <h2 className="moonglade text-4xl lg:text-5xl font-bold text-brand-black mb-6">
            {titleLeft} <span className="text-brand-yellow">{titleYellow}</span>
          </h2>
          <div className="font-helvetica text-gray-600 text-lg max-w-3xl mx-auto mb-8 space-y-4">
            {introParas.length ? introParas.map((t, i) => (<p key={i}>{t}</p>)) : (
              <p>Un enfoque integral que combina bienestar, salud y belleza para tu mascota</p>
            )}
          </div>

          {(() => {
            const v = data?.video
            const fileUrl = getMediaUrl(v?.file)
            const yt = toYouTubeEmbed(v?.youtubeUrl)
            if (v?.sourceType === 'youtube' && yt) {
              return (
                <motion.div
                  className="aspect-video rounded-2xl overflow-hidden mb-12 max-w-4xl mx-auto shadow-2xl bg-black"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <iframe
                    src={yt}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </motion.div>
              )
            }
            if (v?.sourceType === 'upload' && fileUrl) {
              return (
                <motion.div
                  className="aspect-video rounded-2xl overflow-hidden mb-12 max-w-4xl mx-auto shadow-2xl bg-black"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <video className="w-full h-full" src={fileUrl} controls preload="metadata" />
                </motion.div>
              )
            }
            return (
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
                  <p className="moonglade text-xl">Video próximamente</p>
                  <p className="font-helvetica text-sm text-gray-400 mt-2">{data?.video?.caption ?? 'Experiencia Spa 360° - Detrás de cámaras'}</p>
                </div>
              </motion.div>
            )
          })()}
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
              <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 border-0 bg-white gap-0">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={getMediaUrl(experience.image) || "/placeholder.svg"}
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
                  <h3 className="moonglade text-xl font-bold text-brand-black mb-2">{experience.title}</h3>
                  <div className="font-helvetica text-gray-600 text-sm space-y-2">
                    {extractRichParagraphs(experience.description).map((t, i) => (<p key={i}>{t}</p>))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
