"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function GallerySection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const galleryImages = [
    {
      src: "/images/beagle-reception.jpeg",
      title: "Antes & Después",
      description: "Beagle feliz después de su sesión de spa",
      category: "Transformación",
    },
    {
      src: "/images/two-dogs-spa.png",
      title: "Compañeros de Spa",
      description: "Golden Retriever y amigo disfrutando juntos",
      category: "Experiencia",
    },
    {
      src: "/images/happy-dog-bath.png",
      title: "Momento de Relajación",
      description: "Baño terapéutico con productos premium",
      category: "Bienestar",
    },
    {
      src: "/images/dog-head-massage.jpeg",
      title: "Masaje Especializado",
      description: "Técnicas profesionales de relajación",
      category: "Terapia",
    },
  ]

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
            Galería de <span className="text-brand-yellow">Nuestros Peluditos  </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Descubre las increíbles transformaciones de nuestros clientes peludos
          </p>
        </motion.div>

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
                    <Card className="overflow-hidden border-0 shadow-xl">
                      <div className="relative h-80">
                        <Image src={image.src || "/placeholder.svg"} alt={image.title} fill className="object-cover" />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-brand-yellow text-black font-semibold">{image.category}</Badge>
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

        {/* Desktop Mosaic */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-12 grid-rows-8 gap-4 h-[600px]">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className={`
                  ${index === 0 ? "col-span-6 row-span-4" : ""}
                  ${index === 1 ? "col-span-6 row-span-4" : ""}
                  ${index === 2 ? "col-span-4 row-span-4" : ""}
                  ${index === 3 ? "col-span-8 row-span-4" : ""}
                `}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full overflow-hidden group hover:shadow-2xl transition-all duration-500 border-0">
                  <div className="relative h-full">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-brand-yellow text-black font-semibold">{image.category}</Badge>
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
      </div>
    </section>
  )
}
