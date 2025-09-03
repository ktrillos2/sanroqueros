"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Play, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"

type MediaRef = { url?: string }
type Rich = any
type Video = { title: string; description?: string; thumbnail?: MediaRef | string; youtubeUrl?: string }
type Testi = { name: string; petName?: string; image?: MediaRef | string; rating?: number; service?: string; text?: Rich }
type TestimonialsData = { title?: { left?: string; highlight?: string }; intro?: Rich; videos?: Video[]; testimonials?: Testi[] }

const getMediaUrl = (m?: MediaRef | string) => typeof m === 'string' ? m : m?.url
const getYouTubeId = (url?: string): string | null => {
  if (!url) return null
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1) || null
    if (u.searchParams.get('v')) return u.searchParams.get('v')
    const parts = u.pathname.split('/').filter(Boolean)
    const idx = parts.findIndex(p => p === 'embed')
    if (idx >= 0 && parts[idx + 1]) return parts[idx + 1]
  } catch {}
  return null
}
const getYouTubeEmbed = (url?: string): string | null => {
  const id = getYouTubeId(url)
  return id ? `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&showinfo=0` : null
}
function extractRichParagraph(rich?: Rich): string {
  if (!rich) return ''
  if (rich?.root?.children && Array.isArray(rich.root.children)) {
    for (const node of rich.root.children) {
      if (node?.type === 'paragraph' && Array.isArray(node.children)) {
        const t = node.children.map((c: any) => c?.text || '').join('')
        if (t.trim()) return t
      }
    }
  }
  if (typeof rich === 'string') return rich
  return ''
}

export function TestimonialsSection() {
  const [currentVideo, setCurrentVideo] = useState(0)
  const [data, setData] = useState<TestimonialsData | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch('/api/testimonials', { cache: 'no-store' })
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

  const videos = (data?.videos ?? []).map((v, idx) => ({ id: idx + 1, ...v }))

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length)
  }

  const prevVideo = () => {
    setCurrentVideo((prev) => (prev - 1 + videos.length) % videos.length)
  }

  const testimonials = (data?.testimonials ?? [])

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white mb-6">
            {(data?.title?.left ?? 'Lo que Dicen')} <span className="text-brand-yellow">{(data?.title?.highlight ?? 'Nuestros Clientes')}</span>
          </h2>
          <p className="font-helvetica text-gray-300 text-lg max-w-3xl mx-auto mb-8">
            {extractRichParagraph(data?.intro) || 'Testimonios reales de familias que confían en nosotros para el cuidado de sus mascotas'}
          </p>

          <motion.div
            className="relative aspect-video bg-black rounded-2xl overflow-hidden max-w-4xl mx-auto shadow-2xl mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Background videos (subtle) */}
            <div className="absolute inset-0 flex">
        {videos.map((video, index) => (
                <div
          key={video.id}
                  className={`absolute inset-0 transition-all duration-500 ${
                    index === currentVideo
                      ? "opacity-100 z-10"
                      : index === (currentVideo + 1) % videos.length
                        ? "opacity-30 translate-x-full z-5"
                        : index === (currentVideo - 1 + videos.length) % videos.length
                          ? "opacity-30 -translate-x-full z-5"
                          : "opacity-0 z-0"
                  }`}
                >
          <Image src={(getMediaUrl(video.thumbnail) || "/placeholder.svg")} alt={video.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40" />
                </div>
              ))}
            </div>

            {/* Main video content: YouTube embed si hay URL, si no fallback al placeholder */}
            <div className="relative z-20 flex items-center justify-center h-full text-white">
              {getYouTubeEmbed(videos[currentVideo]?.youtubeUrl) ? (
                <div className="w-full h-full">
                  <iframe
                    className="w-full h-full"
                    src={getYouTubeEmbed(videos[currentVideo]?.youtubeUrl) || ''}
                    title={videos[currentVideo]?.title || 'Testimonio'}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="text-center">
                  <Play className="w-16 h-16 mx-auto mb-4 text-brand-yellow" />
                  <h3 className="font-heading text-xl font-bold mb-2">{videos[currentVideo]?.title}</h3>
                  <p className="text-sm text-gray-300">{videos[currentVideo]?.description}</p>
                </div>
              )}
            </div>

            {/* Navigation arrows */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white"
              onClick={prevVideo}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white"
              onClick={nextVideo}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Video indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
              {videos.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentVideo ? "bg-brand-yellow" : "bg-white/50"
                  }`}
                  onClick={() => setCurrentVideo(index)}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-900 border-gray-800 h-full hover:border-brand-yellow transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src={(getMediaUrl(testimonial.image) || "/placeholder.svg")}
                        alt={testimonial.petName || testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-white">{testimonial.name}</h3>
                      {testimonial.petName && <p className="text-brand-yellow text-sm">Dueña de {testimonial.petName}</p>}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(Math.max(0, Math.min(5, testimonial.rating || 0)))].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-yellow text-brand-yellow" />
                    ))}
                  </div>

                  <div className="relative mb-4">
                    <Quote className="w-6 h-6 text-brand-pink absolute -top-2 -left-2" />
                    <p className="text-gray-300 italic pl-4">"{extractRichParagraph(testimonial.text)}"</p>
                  </div>

                  <div className="text-xs text-gray-500 border-t border-gray-800 pt-4">
                    Servicio: {testimonial.service}
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
