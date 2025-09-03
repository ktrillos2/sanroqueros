"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Heart } from "lucide-react"

export function ProductsCollaborationsSection() {
  const products = [
    {
      name: "Hydra by Pet Society",
      description:
        "Línea premium de productos para el cuidado de la piel y pelaje. Fórmulas avanzadas que proporcionan hidratación profunda y brillo natural.",
      benefits: ["Hidratación profunda", "Brillo natural", "Piel saludable", "Pelaje sedoso"],
      image: "/images/dog-bubble-bath.png",
      badge: "Premium",
    },
    {
      name: "Iv San Bernard",
      description:
        "Dermocosmética profesional italiana especializada en el cuidado de mascotas. Productos terapéuticos con resultados visibles desde la primera aplicación.",
      benefits: ["Dermocosmética italiana", "Resultados terapéuticos", "Calidad profesional", "Cuidado especializado"],
      image: "/images/french-bulldog-spa.png",
      badge: "Terapéutico",
    },
  ]

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
            Productos & <span className="text-brand-yellow">Colaboraciones</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Trabajamos con las mejores marcas internacionales para garantizar resultados excepcionales en el cuidado de
            tu mascota
          </p>
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
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="font-semibold text-black">{product.badge}</Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60 text-white"></div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-brand-yellow" />
                    <h3 className="font-heading text-2xl font-bold text-white">{product.name}</h3>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">{product.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-3">
                      <Heart className="w-4 h-4 text-brand-pink" />
                      <span className="text-brand-pink font-semibold">Beneficios:</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {product.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-brand-yellow rounded-full"></div>
                          <span className="text-gray-400 text-sm">{benefit}</span>
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
