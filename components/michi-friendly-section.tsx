"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Play, Heart, Sparkles, Star } from "lucide-react"

type MediaRef = { url?: string }
type Rich = any
type Feature = { icon: 'heart' | 'sparkles' | 'star'; title: string; description?: Rich }
type Video = { sourceType?: 'youtube' | 'upload'; youtubeUrl?: string; file?: MediaRef | string; caption?: string }
type Images = { main?: MediaRef | string; secondary?: MediaRef | string }
type MichiData = { title?: { pink?: string; rest?: string }; intro?: Rich; features?: Feature[]; video?: Video; images?: Images }

const getMediaUrl = (m?: MediaRef | string) => typeof m === 'string' ? m : m?.url
const IconFromName = ({ name }: { name: Feature['icon'] }) => name === 'heart' ? <Heart className="w-6 h-6 text-white" /> : name === 'sparkles' ? <Sparkles className="w-6 h-6 text-white" /> : <Star className="w-6 h-6 text-white" />

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
  if (typeof rich === 'string') return [rich]
  return []
}

function toYouTubeEmbed(url?: string): string | null {
  if (!url) return null
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) {
      const id = u.pathname.replace('/', '')
      return id ? `https://www.youtube.com/embed/${id}` : null
    }
    if (u.hostname.includes('youtube.com')) {
      const id = u.searchParams.get('v')
      if (id) return `https://www.youtube.com/embed/${id}`
      if (u.pathname.startsWith('/embed/')) return url
    }
  } catch { }
  return null
}

export function MichiFriendlySection() {
  const [data, setData] = useState<MichiData | null>(null)

  useEffect(() => {
    let mounted = true
      ; (async () => {
        try {
          const res = await fetch('/api/michi-friendly', { cache: 'no-store' })
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

  const titlePink = data?.title?.pink ?? 'Michi'
  const titleRest = data?.title?.rest ?? 'Friendly'
  const introParas = useMemo(() => extractRichParagraphs(data?.intro), [data?.intro])
  const features = data?.features ?? []
  const mainUrl = getMediaUrl(data?.images?.main) || "/images/ragdoll-cat.jpg"
  const secondaryUrl = getMediaUrl(data?.images?.secondary) || "/images/yorkshire-terriers.png"

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
                <span className="text-brand-pink">{titlePink}</span> {titleRest}
              </h2>
              <div className="text-xl text-gray-300 leading-relaxed space-y-4">
                {introParas.length ? introParas.map((t, i) => (<p key={i}>{t}</p>)) : (
                  <p>Sabemos que los gatos son especiales. Por eso hemos creado un ambiente y servicios diseñados específicamente para el bienestar y comodidad de nuestros amigos felinos.</p>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 bg-brand-pink rounded-full flex items-center justify-center flex-shrink-0">
                    <IconFromName name={feature.icon} />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <div className="text-gray-400 space-y-2">
                      {extractRichParagraphs(feature.description).map((t, i) => (<p key={i}>{t}</p>))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Video */}
            {(() => {
              const v = data?.video
              const fileUrl = getMediaUrl(v?.file)
              const yt = toYouTubeEmbed(v?.youtubeUrl)
              if (v?.sourceType === 'youtube' && yt) {
                return (
                  <motion.div className="aspect-video rounded-2xl overflow-hidden border border-gray-800" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.4 }} viewport={{ once: true }}>
                    <iframe src={yt} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className="w-full h-full" />
                  </motion.div>
                )
              }
              if (v?.sourceType === 'upload' && fileUrl) {
                return (
                  <motion.div className="aspect-video rounded-2xl overflow-hidden border border-gray-800" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.4 }} viewport={{ once: true }}>
                    <video className="w-full h-full" src={fileUrl} controls preload="metadata" />
                  </motion.div>
                )
              }
              return (
                <motion.div className="aspect-video bg-gray-900 rounded-2xl flex items-center justify-center text-white border border-gray-800" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.4 }} viewport={{ once: true }}>
                  <div className="text-center">
                    <Play className="w-12 h-12 mx-auto mb-3 text-brand-pink" />
                    <p className="text-sm">Video próximamente</p>
                    <p className="text-xs text-gray-400 mt-1">{data?.video?.caption ?? 'Experiencia Michi Friendly'}</p>
                  </div>
                </motion.div>
              )
            })()}
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
                    src={mainUrl}
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
                    src={secondaryUrl}
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
