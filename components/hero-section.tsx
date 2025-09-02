"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Sparkles, Heart } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-brand-black overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-brand-yellow/10 via-brand-pink/5 to-brand-blue/10"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(255, 229, 80, 0.1), rgba(255, 177, 190, 0.05), rgba(136, 211, 238, 0.1))",
              "linear-gradient(135deg, rgba(136, 211, 238, 0.1), rgba(255, 229, 80, 0.05), rgba(255, 177, 190, 0.1))",
              "linear-gradient(225deg, rgba(255, 177, 190, 0.1), rgba(136, 211, 238, 0.05), rgba(255, 229, 80, 0.1))",
              "linear-gradient(315deg, rgba(255, 229, 80, 0.1), rgba(255, 177, 190, 0.05), rgba(136, 211, 238, 0.1))",
            ],
          }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1.5 h-1.5 rounded-full ${
                i % 3 === 0 ? "bg-brand-yellow/20" : i % 3 === 1 ? "bg-brand-pink/20" : "bg-brand-blue/20"
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 10 - 5, 0],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.div
          className="absolute top-20 left-10 w-32 h-32 border border-brand-yellow/20 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 180],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 right-20 w-24 h-24 border border-brand-pink/20 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [180, 90, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        />

        <motion.div
          className="absolute top-1/3 right-1/3 w-20 h-20 bg-brand-yellow/5 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 10, 0],
            y: [0, -10, 0],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-brand-pink/5 rounded-full blur-xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -8, 0],
            y: [0, 8, 0],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.5 }}
        />
      </div>

      <div className="container mx-auto px-4 pt-32 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div
            className="text-white space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4">
              <motion.h1
                className="moonglade text-5xl lg:text-7xl font-bold leading-tight text-center tracking-tight lg:tracking-tighter"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                El Mejor <span className="text-brand-yellow">Spa</span> para{" "}
                <span className="text-brand-pink">Perros y Gatos</span>
              </motion.h1>

              <motion.p
                className="font-helvetica text-xl lg:text-2xl text-gray-300 max-w-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Experiencia premium con productos de alta gama y técnicas profesionales en el corazón de Bogotá
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button variant="outline"
                size="lg"
                className="bg-brand-yellow hover:bg-yellow-400 font-helvetica font-semibold text-lg px-8 py-4 text-white"
                asChild
              >
                <Link href="#contacto">
                  Agenda tu Cita
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black font-helvetica text-lg px-8 py-4 bg-transparent"
                asChild
              >
                <Link href="/perros">Ver Servicios</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Pet Images */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative w-full h-[600px]">
              {/* Main cat image */}
              <motion.div
                className="absolute top-0 right-0 z-10"
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 1, 0, -1, 0],
                  scale: [1, 1.01, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <div className="relative">
                  <Image
                    src="/images/ragdoll-cat.jpg"
                    alt="Hermoso gato Ragdoll en SANROQUE"
                    width={400}
                    height={400}
                    className="rounded-2xl shadow-2xl"
                    priority
                  />
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-yellow/20 to-brand-pink/20 blur-sm -z-10 scale-105" />
                </div>
              </motion.div>

              {/* Kitten image */}
              <motion.div
                className="absolute bottom-0 left-0 z-20"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, -0.5, 0, 0.5, 0],
                  scale: [1, 1.01, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 2,
                }}
              >
                <div className="relative">
                  <Image
                    src="/images/kitten-cover.png"
                    alt="Adorable gatito en SANROQUE"
                    width={300}
                    height={200}
                    className="rounded-2xl shadow-2xl"
                  />
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-blue/20 to-brand-yellow/20 blur-sm -z-10 scale-105" />
                </div>
              </motion.div>

              {/* Enhanced floating elements */}
              <motion.div
                className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-r from-brand-yellow to-yellow-300 rounded-full flex items-center justify-center shadow-lg"
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 20px rgba(255, 229, 80, 0.3)",
                    "0 0 30px rgba(255, 229, 80, 0.5)",
                    "0 0 20px rgba(255, 229, 80, 0.3)",
                  ],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                  boxShadow: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                }}
              >
                <Sparkles className="w-8 h-8 text-black" />
              </motion.div>

              <motion.div
                className="absolute bottom-32 right-20 w-12 h-12 bg-gradient-to-r from-brand-pink to-pink-300 rounded-full flex items-center justify-center shadow-lg"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360],
                  boxShadow: [
                    "0 0 15px rgba(255, 177, 190, 0.3)",
                    "0 0 25px rgba(255, 177, 190, 0.5)",
                    "0 0 15px rgba(255, 177, 190, 0.3)",
                  ],
                }}
                transition={{
                  scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                  rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  boxShadow: { duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                }}
              >
                <Heart className="w-6 h-6 text-white" />
              </motion.div>

              {/* Additional floating elements */}
              <motion.div
                className="absolute top-1/2 right-10 w-8 h-8 bg-brand-blue/80 rounded-full"
                animate={{
                  y: [0, -25, 0],
                  x: [0, 10, 0],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
              <motion.div
                className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-brand-yellow/80 rounded-full"
                animate={{
                  y: [0, -20, 0],
                  x: [0, -8, 0],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
