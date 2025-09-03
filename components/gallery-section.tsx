"use client"

import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog"

type MediaRef = { url?: string }
type Rich = any
type Item = { title: string; description?: Rich; category?: string; image?: MediaRef | string }
type GalleryData = { title?: { left?: string; yellow?: string }; intro?: Rich; items?: Item[] }

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
  if (typeof rich === 'string') return [rich]
  return []
}

export function GallerySection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [data, setData] = useState<GalleryData | null>(null)
  const [filter, setFilter] = useState<string>('all')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [naturalSize, setNaturalSize] = useState<{ w: number; h: number } | null>(null)
  const [boxSize, setBoxSize] = useState<{ w: number; h: number } | null>(null)
  const [isNavigating, setIsNavigating] = useState(false)
  const [imageReady, setImageReady] = useState(false)

  // Cache de imágenes precargadas
  const loadedCache = useMemo(() => new Set<string>(), [])

  const preloadImage = (src?: string | null) => {
    return new Promise<void>((resolve) => {
      if (!src) return resolve()
      if (loadedCache.has(src)) return resolve()
      const img = new window.Image()
      img.onload = () => {
        loadedCache.add(src)
        resolve()
      }
      img.onerror = () => resolve() // no bloquear por errores
      img.src = src
    })
  }

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch('/api/gallery', { cache: 'no-store' })
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

  const titleLeft = data?.title?.left ?? 'Galería de'
  const titleYellow = data?.title?.yellow ?? 'Nuestros Peluditos'
  const introParas = useMemo(() => extractRichParagraphs(data?.intro), [data?.intro])
  const rawImages = (data?.items ?? []).map(i => ({
    src: getMediaUrl(i.image) || '/placeholder.svg',
    title: i.title,
    description: extractRichParagraphs(i.description)[0] ?? '',
    category: i.category ?? '',
  }))
  const categories = useMemo(() => {
    const set = new Set<string>()
    rawImages.forEach(i => { if (i.category) set.add(i.category) })
    return Array.from(set)
  }, [rawImages])
  const galleryImages = useMemo(() => {
    return filter === 'all' ? rawImages : rawImages.filter(i => i.category === filter)
  }, [rawImages, filter])

  useEffect(() => { setCurrentSlide(0) }, [filter])

  // Recalcular el tamaño del contenedor del lightbox para ajustarse a la imagen y al viewport
  const recomputeBox = (nw: number, nh: number) => {
    const vw = typeof window !== 'undefined' ? window.innerWidth - 32 : 1200
    const vh = typeof window !== 'undefined' ? window.innerHeight - 32 : 800
    const scale = Math.min(vw / nw, vh / nh, 1)
    setBoxSize({ w: Math.floor(nw * scale), h: Math.floor(nh * scale) })
  }

  useEffect(() => {
    if (!lightboxOpen) return
    const onResize = () => {
      if (naturalSize) recomputeBox(naturalSize.w, naturalSize.h)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [lightboxOpen, naturalSize])

  useEffect(() => {
    // reset al cambiar de imagen o abrir
    if (lightboxOpen) {
      setNaturalSize(null)
      setBoxSize(null)
      setImageReady(false)
    }
  }, [lightboxOpen, lightboxIndex])

  // Precargar vecinos en segundo plano cuando el lightbox esté abierto
  useEffect(() => {
    if (!lightboxOpen || galleryImages.length === 0) return
    const nextIdx = (lightboxIndex + 1) % galleryImages.length
    const prevIdx = (lightboxIndex - 1 + galleryImages.length) % galleryImages.length
    preloadImage(galleryImages[nextIdx]?.src)
    preloadImage(galleryImages[prevIdx]?.src)
  }, [lightboxOpen, lightboxIndex, galleryImages])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-brand-black mb-6">
            {titleLeft} <span className="text-brand-yellow">{titleYellow}</span>
          </h2>
          <div className="text-gray-600 text-lg max-w-3xl mx-auto space-y-4">
            {introParas.length ? introParas.map((t, i) => (<p key={i}>{t}</p>)) : (
              <p>Descubre las increíbles transformaciones de nuestros clientes peludos</p>
            )}
          </div>
        </motion.div>

        {/* Filtros por categoría */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${filter === 'all' ? 'bg-brand-yellow text-black border-brand-yellow' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'}`}
            onClick={() => setFilter('all')}
          >
            Todos
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${filter === cat ? 'bg-brand-yellow text-black border-brand-yellow' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

  {/* Mobile Carousel */}
        <div className="lg:hidden">
          <div className="relative">
            <motion.div
              className="overflow-hidden rounded-2xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
    {galleryImages.map((image, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <Card className="overflow-hidden border-0 shadow-xl p-0">
                      <div className="relative h-80">
      <Image src={image.src || "/placeholder.svg"} alt={image.title} fill className="object-cover cursor-pointer" onClick={() => { setLightboxIndex(index); setLightboxOpen(true) }} />
                        <div className="absolute top-4 left-4">
                          <Badge className="font-semibold text-black">{image.category}</Badge>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <h3 className="font-heading text-xl font-bold mb-2">{image.title}</h3>
                          <p className="text-sm text-gray-200">{image.description}</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-0 shadow-lg"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-0 shadow-lg"
              onClick={nextSlide}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? "bg-brand-yellow" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Grid responsive: 3 (lg), 2 (md), 1 (sm usa carrusel) */}
        <div className="hidden md:block">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className="w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: Math.min(index * 0.05, 0.6) }}
                viewport={{ once: true }}
              >
                <Card
                  className="p-0 overflow-hidden group hover:shadow-2xl transition-all duration-500 border-0 cursor-pointer"
                  onClick={() => { setLightboxIndex(index); setLightboxOpen(true) }}
                >
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.title}
                      fill
                      className="object-cover w-full h-full group-hover:scale-[1.02] transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="font-semibold text-black">{image.category}</Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <h3 className="font-heading text-xl font-bold mb-2">{image.title}</h3>
                      <p className="text-sm text-gray-200">{image.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent
            showCloseButton={false}
            className="bg-transparent p-0 border-0 w-auto max-w-none sm:max-w-none md:max-w-none lg:max-w-none xl:max-w-none 2xl:max-w-none inline-grid place-items-center"
          >
            {galleryImages.length > 0 && (
              <div className="relative w-screen h-screen grid place-items-center">
                <DialogTitle className="sr-only">{galleryImages[lightboxIndex]?.title || 'Imagen ampliada'}</DialogTitle>

                {/* Imagen centrada y escalada al viewport, sin tamaños fijos */}
                <div
                  className="relative rounded-2xl overflow-hidden shadow-2xl mx-auto"
                  style={{ width: boxSize?.w, height: boxSize?.h }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={lightboxIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={galleryImages[lightboxIndex]?.src || '/placeholder.svg'}
                        alt={galleryImages[lightboxIndex]?.title || 'Imagen'}
                        fill
                        className="object-contain"
                        onLoadingComplete={(img) => {
                          const nw = img.naturalWidth || 1200
                          const nh = img.naturalHeight || 800
                          setNaturalSize({ w: nw, h: nh })
                          recomputeBox(nw, nh)
                          setImageReady(true)
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Spinner de precarga/navegación */}
                  {(!imageReady || isNavigating) && (
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="h-10 w-10 rounded-full border-2 border-white/70 border-t-transparent animate-spin" aria-label="Cargando" />
                    </div>
                  )}

                  {/* Caption overlay con difuminado negro hacia arriba */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0">
                    <div className="h-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                      <div className="flex items-center gap-2 mb-1">
                        {galleryImages[lightboxIndex]?.category && (
                          <Badge className="font-semibold text-black">{galleryImages[lightboxIndex]?.category}</Badge>
                        )}
                        <span className="font-heading text-lg">{galleryImages[lightboxIndex]?.title}</span>
                      </div>
                      {galleryImages[lightboxIndex]?.description && (
                        <p className="text-sm text-gray-200">{galleryImages[lightboxIndex]?.description}</p>
                      )}
                    </div>
                  </div>

                  {/* Botón cerrar personalizado */}
                  <DialogClose asChild>
                    <button
                      aria-label="Cerrar"
                      className="absolute top-3 right-3 bg-white text-black rounded-full p-2 shadow-lg hover:bg-white/90 cursor-pointer"
                    >
                      <span className="sr-only">Cerrar</span>
                      <ChevronRight className="hidden" />
                      {/* usamos XIcon del Dialog por defecto; si se requiere, podemos importar X de lucide-react */}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </DialogClose>

                  {/* Flechas navegación */}
                  <button
                    aria-label="Anterior"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-lg hover:bg-white/90"
                    onClick={async () => {
                      if (galleryImages.length === 0) return
                      const nextIdx = (lightboxIndex - 1 + galleryImages.length) % galleryImages.length
                      const nextSrc = galleryImages[nextIdx]?.src
                      setIsNavigating(true)
                      await preloadImage(nextSrc)
                      setLightboxIndex(nextIdx)
                      setIsNavigating(false)
                    }}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    aria-label="Siguiente"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-lg hover:bg-white/90"
                    onClick={async () => {
                      if (galleryImages.length === 0) return
                      const nextIdx = (lightboxIndex + 1) % galleryImages.length
                      const nextSrc = galleryImages[nextIdx]?.src
                      setIsNavigating(true)
                      await preloadImage(nextSrc)
                      setLightboxIndex(nextIdx)
                      setIsNavigating(false)
                    }}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
