"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Heart } from "lucide-react"

type MediaRef = { url?: string }
type Rich = any
type Item = { name: string; badge?: string; description?: Rich; benefits?: { text: string }[]; image?: MediaRef | string; color?: string }
type PCData = { title?: { left?: string; yellow?: string }; intro?: Rich; items?: Item[] }

const getMediaUrl = (m?: MediaRef | string) => {
  if (!m) return undefined
  if (typeof m === 'string') return m
  return m.url
}

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

export function ProductsCollaborationsSection() {
  const [data, setData] = useState<PCData | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch('/api/products-collaborations', { cache: 'no-store' })
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

  const titleLeft = data?.title?.left ?? 'Productos & '
  const titleYellow = data?.title?.yellow ?? 'Colaboraciones'
  const introParas = useMemo(() => extractRichParagraphs(data?.intro), [data?.intro])
  const products: Item[] = data?.items?.length ? data.items! : []

  return (
    <section className="py-20 bg-brand-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-20 w-40 h-40 border border-brand-yellow rounded-full"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 border border-brand-pink rounded-full"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white mb-6">
            {titleLeft}<span className="text-brand-yellow">{titleYellow}</span>
          </h2>
          <div className="text-gray-300 text-lg max-w-3xl mx-auto space-y-4">
            {introParas.length ? introParas.map((t, i) => (<p key={i}>{t}</p>)) : (
              <p>Trabajamos con las mejores marcas internacionales para garantizar resultados excepcionales en el cuidado de tu mascota</p>
            )}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-900 border-gray-800 overflow-hidden group hover:border-brand-yellow transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={getMediaUrl(product.image) || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    {product.badge && (<Badge className="font-semibold text-black">{product.badge}</Badge>)}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60 text-white"></div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-brand-yellow" />
                    <h3 className="font-heading text-2xl font-bold text-white">{product.name}</h3>
                  </div>

                  <div className="text-gray-300 mb-6 leading-relaxed space-y-3">
                    {extractRichParagraphs(product.description).map((t, i) => (<p key={i}>{t}</p>))}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-3">
                      <Heart className="w-4 h-4 text-brand-pink" />
                      <span className="text-brand-pink font-semibold">Beneficios:</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {(product.benefits ?? []).map((b, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-brand-yellow rounded-full"></div>
                          <span className="text-gray-400 text-sm">{typeof b === 'string' ? b : b?.text}</span>
                        </div>
                      ))}
                    </div>
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
