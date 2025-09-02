"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Play, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function TestimonialsSection() {
  const [currentVideo, setCurrentVideo] = useState(0)

  const videos = [
    {
      id: 1,
      title: "Testimonio de María González",
      description: "Luna y su experiencia en SANROQUE",
      thumbnail: "/images/ragdoll-cat.jpg",
    },
    {
      id: 2,
      title: "Testimonio de Carlos Rodríguez",
      description: "Max ama ir a SANROQUE",
      thumbnail: "/images/beagle-reception.jpeg",
    },
    {
      id: 3,
      title: "Testimonio de Ana Martínez",
      description: "Coco y Milo - Yorkshire Terriers",
      thumbnail: "/images/yorkshire-terriers.png",
    },
  ]

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length)
  }

  const prevVideo = () => {
    setCurrentVideo((prev) => (prev - 1 + videos.length) % videos.length)
  }

  const testimonials = [
    {
      name: "María González",
      petName: "Luna",
      image: "/images/ragdoll-cat.jpg",
      rating: 5,
      text: "Luna siempre sale feliz y relajada de SANROQUE. El equipo entiende perfectamente las necesidades de los gatos.",
      service: "Spa Felino Completo",
    },
    {
      name: "Carlos Rodríguez",
      petName: "Max",
      image: "/images/beagle-reception.jpeg",
      rating: 5,
      text: "Max ama ir a SANROQUE. La transformación es increíble y el trato es excepcional. Definitivamente recomendado.",
      service: "Experiencia Spa 360°",
    },
    {
      name: "Ana Martínez",
      petName: "Coco y Milo",
      image: "/images/yorkshire-terriers.png",
      rating: 5,
      text: "Mis Yorkshire siempre reciben el mejor cuidado. Los productos que usan son de primera calidad.",
      service: "Baño y Estilizado",
    },
  ]

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
            Lo que Dicen Nuestros <span className="text-brand-yellow">Clientes</span>
          </h2>
          <p className="font-helvetica text-gray-300 text-lg max-w-3xl mx-auto mb-8">
            Testimonios reales de familias que confían en nosotros para el cuidado de sus mascotas
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
                  <Image src={video.thumbnail || "/placeholder.svg"} alt={video.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40" />
                </div>
              ))}
            </div>

            {/* Main video content */}
            <div className="relative z-20 flex items-center justify-center h-full text-white">
              <div className="text-center">
                <Play className="w-16 h-16 mx-auto mb-4 text-brand-yellow" />
                <h3 className="font-heading text-xl font-bold mb-2">{videos[currentVideo].title}</h3>
                <p className="text-sm text-gray-300">{videos[currentVideo].description}</p>
              </div>
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
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.petName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-white">{testimonial.name}</h3>
                      <p className="text-brand-yellow text-sm">Dueña de {testimonial.petName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-yellow text-brand-yellow" />
                    ))}
                  </div>

                  <div className="relative mb-4">
                    <Quote className="w-6 h-6 text-brand-pink absolute -top-2 -left-2" />
                    <p className="text-gray-300 italic pl-4">"{testimonial.text}"</p>
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
