"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function BlogTeaserSection() {
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
              Blog <span className="text-brand-yellow">SANROQUE</span>
            </h2>
          </div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Próximamente: consejos, guías y todo lo que necesitas saber sobre el cuidado de tu mascota
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {upcomingPosts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white border-gray-200 h-full hover:border-black transition-all duration-300 group overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-brand-yellow text-black font-semibold">{post.category}</Badge>
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
          ))}
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
