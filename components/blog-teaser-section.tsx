"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowRight, ArrowLeft, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function BlogTeaserSection() {
  type Post = {
    id?: string
    slug: string
    title: string
    excerpt?: string
    category?: string
    date?: string
    mainImage?: { file?: any; imageUrl?: string; alt?: string }
  }

  const [posts, setPosts] = useState<Post[]>([])
  const [title, setTitle] = useState<string>('Blog ')
  const [highlight, setHighlight] = useState<string>('SANROQUE')
  const [description, setDescription] = useState<string>('Últimos artículos del equipo SANROQUE')

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch('/api/blog', { cache: 'no-store' })
        const data = res.ok ? await res.json() : []
        if (!mounted) return
        setPosts(Array.isArray(data) ? data : [])
      } catch {
        if (!mounted) return
        setPosts([])
      }
    })()
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch('/api/blog-section', { cache: 'no-store' })
        const data = res.ok ? await res.json() : null
        if (!mounted || !data) return
        setTitle(data.title || 'Blog')
        setHighlight(data.highlight || 'SANROQUE')
        setDescription(data.description || 'Últimos artículos del equipo SANROQUE')
      } catch {
        // ignore
      }
    })()
    return () => { mounted = false }
  }, [])

  const upcomingPosts = [
    {
      title: "Guía Completa: Cómo Preparar a tu Gato para su Primera Visita al Spa",
      category: "Consejos",
      date: "Próximamente",
      description: "Todo lo que necesitas saber para que la experiencia sea perfecta",
      image: "/images/ragdoll-cat.jpg",
    },
    {
      title: "Los Beneficios de la Ozonoterapia en Mascotas",
      category: "Salud",
      date: "Próximamente",
      description: "Descubre cómo este tratamiento puede mejorar la salud de tu mascota",
      image: "/images/ozone-therapy.png",
    },
    {
      title: "Productos Premium: Hydra vs Iv San Bernard",
      category: "Productos",
      date: "Próximamente",
      description: "Comparativa detallada de nuestras líneas de productos estrella",
      image: "/images/dog-bubble-bath.png",
    },
  ]

  const hasPosts = posts.length > 0
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(3)

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth
      if (w < 640) return 1 // mobile
      if (w < 1024) return 2 // tablet
      return 3 // desktop
    }
    const update = () => setVisible(calc())
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    // Ajustar índice al cambiar posts o visible
    const maxIdx = Math.max(0, posts.length - visible)
    if (index > maxIdx) setIndex(maxIdx)
  }, [posts.length, visible])

  const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n))
  const maxIndex = Math.max(0, posts.length - visible)
  const prev = () => setIndex((i) => clamp(i - 1, 0, maxIndex))
  const next = () => setIndex((i) => clamp(i + 1, 0, maxIndex))

  return (
    <section className="py-20 bg-brand-black">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <BookOpen className="w-8 h-8 text-white" />
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white">
              {title} <span className="text-brand-yellow">{highlight}</span>
            </h2>
          </div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            {hasPosts ? description : 'Próximamente: consejos, guías y todo lo que necesitas saber sobre el cuidado de tu mascota'}
          </p>
        </motion.div>

        <div className="mb-12">
          {hasPosts ? (
            <div className="relative">
              {posts.length > visible && (
                <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between">
                  <div className="pointer-events-auto pl-2">
                    <Button variant="outline" size="icon" onClick={prev} className="rounded-full bg-white/80 hover:bg-white">
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                  </div>
                  <div className="pointer-events-auto pr-2">
                    <Button variant="outline" size="icon" onClick={next} className="rounded-full bg-white/80 hover:bg-white">
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              )}
              <div className="overflow-hidden px-1">
                <div
                  className="flex gap-6 transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${index * (100 / visible)}%)` }}
                >
                  {posts.map((post, i) => (
                    <motion.div
                      key={post.slug}
                      className="shrink-0"
                      style={{ width: `${100 / visible}%` }}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: Math.min(i, 4) * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="pt-0 bg-white border-gray-200 h-full hover:border-black transition-all duration-300 group overflow-hidden">
                        <CardContent className="p-0">
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={post.mainImage?.file?.url || post.mainImage?.imageUrl || "/placeholder.svg"}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {post.category ? (
                              <div className="absolute top-4 left-4">
                                <Badge className="font-semibold text-black">{post.category}</Badge>
                              </div>
                            ) : null}
                          </div>

                          <div className="p-6">
                            <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                              <Calendar className="w-4 h-4" />
                              <span>{post.date ? new Date(post.date).toLocaleDateString('es-ES') : ''}</span>
                            </div>

                            <h3 className="font-heading text-xl font-bold text-gray-900 mb-3 group-hover:text-black transition-colors line-clamp-2">
                              {post.title}
                            </h3>

                            {post.excerpt ? (
                              <p className="text-gray-700 text-sm mb-4 leading-relaxed line-clamp-3">{post.excerpt}</p>
                            ) : null}

                            <div className="flex items-center gap-2 text-gray-900 text-sm font-semibold">
                              <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 group/link">
                                <span>Leer más</span>
                                <ArrowRight className="ml-2 w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            upcomingPosts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="pt-0 bg-white border-gray-200 h-full hover:border-black transition-all duration-300 group overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="font-semibold text-black">{post.category}</Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>

                    <h3 className="font-heading text-xl font-bold text-gray-900 mb-3 group-hover:text-black transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-700 text-sm mb-4 leading-relaxed">{post.description}</p>

                    <div className="flex items-center gap-2 text-gray-900 text-sm font-semibold">
                      <span>Leer más</span>
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            ))
          )}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Button
            size="lg"
            className="bg-brand-yellow hover:bg-yellow-400 text-black font-semibold text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
            asChild
          >
            <Link href="/blog">
              Ver Todos los Artículos
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
