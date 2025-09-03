"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

type MediaRef = { url?: string }

type Client = {
  name: string
  logo?: MediaRef | string
  website?: string
  note?: string
}

type ClientsData = {
  title?: { left?: string; highlight?: string }
  intro?: any
  clients?: Client[]
}

const getMediaUrl = (m?: MediaRef | string) => typeof m === 'string' ? m : m?.url

export function ClientsSection() {
  const [data, setData] = useState<ClientsData | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch('/api/clients', { cache: 'no-store' })
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

  const titleLeft = data?.title?.left ?? 'Nuestros'
  const titleHi = data?.title?.highlight ?? 'Clientes'
  const clients = data?.clients ?? []

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-brand-black mb-4">
            {titleLeft} <span className="text-brand-yellow">{titleHi}</span>
          </h2>
          {data?.intro && (
            <p className="text-gray-600 max-w-2xl mx-auto">Marcas y familias que confían en nosotros.</p>
          )}
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {clients.map((c, i) => (
            <motion.a
              key={i}
              href={c.website || '#'}
              target={c.website ? '_blank' : undefined}
              rel={c.website ? 'noopener noreferrer' : undefined}
              className="group block rounded-xl border border-gray-200 p-4 bg-white hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.5) }}
              viewport={{ once: true }}
            >
              <div className="relative w-full aspect-[3/2]">
                <Image
                  src={getMediaUrl(c.logo) || '/placeholder.svg'}
                  alt={c.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-contain p-2 grayscale group-hover:grayscale-0 transition"
                />
              </div>
              <div className="mt-3 text-center">
                <p className="text-sm font-medium text-gray-700">{c.name}</p>
                {c.note && <p className="text-xs text-gray-500">{c.note}</p>}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
