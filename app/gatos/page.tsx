"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Sparkles, MessageCircle, Info } from "lucide-react"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

export default function GatosPage() {
  const [selectedBreed, setSelectedBreed] = useState("")
  const [coatType, setCoatType] = useState("")
  const [cms, setCms] = useState<any>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch('/api/cats-page', { cache: 'no-store' })
        const json = res.ok ? await res.json() : null
        if (!mounted) return
        setCms(json?.data || null)
      } catch {}
    })()
    return () => { mounted = false }
  }, [])

  const catBreeds = useMemo(() => {
    if (cms?.breedLists?.length) {
      return cms.breedLists.reduce((acc: any, row: any) => { acc[row.coatType] = (row.breeds || []).map((b: any) => b.value); return acc }, {})
    }
    return {
      "Manto Corto": [
        "Siamés",
        "Europeo Común",
        "Bengala",
        "British Shorthair",
        "Azul Ruso",
        "Abisinio",
        "American Shorthair",
        "Bombay",
        "Devon Rex",
        "Sphynx"
      ],
      "Manto Medio y Largo": [
        "Persa",
        "Maine Coon",
        "Angora Turco",
        "Ragdoll",
        "Bosque de Noruega",
        "Himalayo",
        "Siberiano",
        "Birmano"
      ]
    }
  }, [cms])

  const priceRows = useMemo(() => {
    const rows: any[] = (cms?.priceRows && cms.priceRows.length > 0) ? cms.priceRows : [
      { coatType: 'Manto Corto', SanRoquero: 65, Rockstar: 85, Superstar: 105, Shanti: 125 },
      { coatType: 'Manto Medio y Largo', SanRoquero: 75, Rockstar: 95, Superstar: 115, Shanti: 135 },
    ]
    const map: Record<string, any> = {}
    for (const r of rows) {
      map[r.coatType] = {
        SanRoquero: r.SanRoquero,
        Rockstar: r.Rockstar,
        Superstar: r.Superstar,
        Shanti: r.Shanti,
      }
    }
    return map
  }, [cms])

  const handleBreedSelect = (breed: string) => {
    setSelectedBreed(breed)

    // Determine coat type based on breed
    if ((catBreeds["Manto Corto"] || []).includes(breed)) {
      setCoatType("Manto Corto")
    } else if ((catBreeds["Manto Medio y Largo"] || []).includes(breed)) {
      setCoatType("Manto Medio y Largo")
    }
  }

  const getCoatImage = (type: string) => {
    if (type === "Manto Corto") {
      return "/gato-de-pelo-corto-feliz-grooming.webp"
    } else if (type === "Manto Medio y Largo") {
      return "/gato-de-pelo-largo-esponjoso-grooming.webp"
    }
    return "/gato-generico-grooming.webp"
  }

  const heroCtaHref = (cms?.hero?.ctaHref && !cms.hero.ctaHref.includes('3154433109'))
    ? cms.hero.ctaHref
    : 'https://wa.me/573123114435?text=Hola%20SANROQUE%2C%20me%20gustar%C3%ADa%20agendar%20una%20cita%20para%20mi%20michi%20en%20la%20nueva%20sede%20Calle%20118'

  return (
    <main className="min-h-screen bg-black">
      <Header />

      <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-black">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#FFB1BE]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-[#FFB1BE]/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-[#FFB1BE]/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
          <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-[#FFB1BE]/40 rounded-full blur-2xl animate-bounce"></div>
        </div>

        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#FFB1BE] rounded-full opacity-30 animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white space-y-6 animate-fade-in">
            <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight">
              {cms?.hero?.title || 'Servicios Especializados para'}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600">
                {cms?.hero?.highlight || 'Michis'}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              {cms?.hero?.subtitle || 'Cuidado especializado para michis con técnicas Fear Free y ambiente libre de estrés en nuestra nueva sede Calle 118 #15 - 45'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
                asChild
              >
                <Link href={heroCtaHref} target="_blank">
                  {cms?.hero?.ctaLabel || 'Agendar Cita Felina'}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#88D3EE] text-[#88D3EE] hover:bg-[#88D3EE] hover:text-black bg-transparent font-bold text-sm px-6 py-3 transform hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link href="#identificar-manto">
                  Identificar Tipo de Manto
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="py-12 md:py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Nuestros Servicios Felinos</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Servicios especializados para el bienestar y cuidado de tu michi, con cosmética de alta gama y técnicas respetuosas
            </p>
          </div>

          {(() => {
            const enrichedDefaults = [
              {
                id: "sanroquero",
                title: "SanRoquero",
                emoji: "🐾",
                badge: "Mantenimiento & Higiene",
                subtitle: "El cuidado esencial de SanRoque",
                cosmetics: "Cosmética Velox + Hydra",
                description: "El Sanroquero es nuestro servicio de mantenimiento, realizado con cosmética Velox, ideal para mantener a tu Sanroquero limpio, fresco y con una buena higiene.",
                features: [
                  "Baño + enjuague / baño + enjuague (doble baño)",
                  "🐾 Secado y cepillado",
                  "✂️ Corte de uñas",
                  "👂 Limpieza de oídos",
                  "🦷 Limpieza dental",
                  "🧼 Limpieza facial con Hydra Extra Soft Facial Shampoo, especialmente formulado para brindar una limpieza suave y delicada en la zona facial.",
                ],
                exclusions: "No incluye corte de peluquería ni sesiones de desenredo.",
                colorClass: "from-blue-500 to-cyan-500",
                shadowClass: "shadow-cyan-500/30",
                borderClass: "border-cyan-500/40 hover:border-cyan-400",
                pillClass: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
                ctaHref: "https://wa.me/573123114435?text=Hola%20SANROQUE%2C%20me%20gustar%C3%ADa%20agendar%20el%20servicio%20SanRoquero%20para%20mi%20gato%20en%20la%20nueva%20sede%20Calle%20118",
              },
              {
                id: "rockstar",
                title: "Rockstar",
                emoji: "⭐",
                badge: "Grooming & Estilo",
                subtitle: "Grooming + cuidado integral",
                cosmetics: "Cosmética Velox + Pelunos + Hydra",
                description: "El Rockstar combina cosmética Velox + Pelunos y está pensado para quienes buscan complementar el baño con un servicio de peluquería.",
                process: "Realizamos nuestro protocolo de doble baño: baño + enjuague / baño + enjuague, seguido de secado, cepillado y grooming.",
                features: [
                  "Baño + enjuague / baño + enjuague",
                  "🐾 Secado y cepillado",
                  "✂️ Corte de uñas",
                  "👂 Limpieza de oídos",
                  "🦷 Limpieza dental",
                  "🧼 Limpieza facial con Hydra Extra Soft Facial Shampoo",
                  "✂️ Corte de peluquería felina profesional o deslanado especializado según el estilo.",
                ],
                colorClass: "from-purple-500 to-pink-500",
                shadowClass: "shadow-pink-500/30",
                borderClass: "border-pink-500/40 hover:border-pink-400",
                pillClass: "bg-pink-500/10 text-pink-300 border-pink-500/30",
                ctaHref: "https://wa.me/573123114435?text=Hola%20SANROQUE%2C%20me%20gustar%C3%ADa%20agendar%20el%20servicio%20Rockstar%20para%20mi%20gato%20en%20la%20nueva%20sede%20Calle%20118",
              },
              {
                id: "superstar",
                title: "Superstar",
                emoji: "👑",
                badge: "Alta Gama",
                subtitle: "Nutrición profunda e hidratación de lujo",
                cosmetics: "100% Hydra Groomers",
                description: "Servicio premium de lujo formulado íntegramente con la prestigiosa línea Hydra, diseñado para hidratación profunda, recuperación de manto y brillo sedoso en michis.",
                process: "Protocolo de baños especializados con mascarilla nutritiva Hydra, secado térmico silencioso de bajo estrés y acabado sedoso.",
                features: [
                  "Baño especializado con mascarilla nutritiva Hydra",
                  "Todos los productos 100% Hydra Groomers",
                  "Tratamiento hidratante profundo de cutícula",
                  "Limpieza facial con Hydra Extra Soft Facial Shampoo",
                  "Corte de uñas, limpieza de oídos y dental",
                  "Protocolo Cat-Friendly de bajo estrés",
                ],
                colorClass: "from-amber-400 to-yellow-500",
                shadowClass: "shadow-yellow-500/30",
                borderClass: "border-yellow-500/40 hover:border-yellow-400",
                pillClass: "bg-yellow-500/10 text-yellow-300 border-yellow-500/30",
                ctaHref: "https://wa.me/573123114435?text=Hola%20SANROQUE%2C%20me%20gustar%C3%ADa%20agendar%20el%20servicio%20Superstar%20para%20mi%20gato%20en%20la%20nueva%20sede%20Calle%20118",
              },
              {
                id: "shanti",
                title: "Shanti Pet Spa",
                emoji: "🌿",
                badge: "Terapéutico & Spa Zen",
                subtitle: "Experiencia spa con productos Iv San Bernard",
                cosmetics: "100% Iv San Bernard (Italia)",
                description: "Tratamiento dermatológico y terapéutico de alta gama europea con Iv San Bernard, en un entorno felino libre de jaulas 100% Fear Free.",
                process: "Terapia de baños minerales dermoprotectores con aromaterapia y técnicas de relajación felina para equilibrio físico y bienestar.",
                features: [
                  "Baños terapéuticos Iv San Bernard",
                  "Productos cosmecéuticos exclusivos italianos",
                  "Ambiente sereno libre de estrés y jaulas",
                  "Limpieza facial dermoprotectora suave",
                  "Corte de uñas, limpieza de oídos y dental",
                ],
                colorClass: "from-emerald-400 to-teal-500",
                shadowClass: "shadow-emerald-500/30",
                borderClass: "border-emerald-500/40 hover:border-emerald-400",
                pillClass: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
                ctaHref: "https://wa.me/573123114435?text=Hola%20SANROQUE%2C%20me%20gustar%C3%ADa%20agendar%20el%20servicio%20Shanti%20Spa%20para%20mi%20gato%20en%20la%20nueva%20sede%20Calle%20118",
              },
            ]

            const displayServices = enrichedDefaults.map((def) => {
              const cmsMatch = (cms?.services || []).find((s: any) => s.id === def.id)
              return {
                ...def,
                title: cmsMatch?.title || def.title,
                description: cmsMatch?.description || def.description,
                subtitle: cmsMatch?.subtitle || def.subtitle,
                cosmetics: cmsMatch?.cosmetics || def.cosmetics,
                process: cmsMatch?.process || def.process,
                exclusions: cmsMatch?.exclusions || def.exclusions,
                features: (cmsMatch?.features && cmsMatch.features.length > 0) ? cmsMatch.features : def.features,
                ctaHref: cmsMatch?.ctaHref || def.ctaHref,
                isPopular: cmsMatch?.isPopular || false,
              }
            })

            return (
              <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {displayServices.map((service) => (
                  <div
                    key={service.id}
                    className={`relative bg-gradient-to-b from-[#141414] via-[#101010] to-[#0a0a0a] border ${service.borderClass} rounded-3xl p-6 md:p-8 text-white transition-all duration-300 hover:scale-[1.01] hover:${service.shadowClass} hover:shadow-2xl flex flex-col justify-between group backdrop-blur-md`}
                  >
                    <div>
                      {/* Top Meta Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${service.pillClass}`}>
                          {service.badge}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 font-medium">
                          {service.cosmetics}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.colorClass} flex items-center justify-center text-2xl shadow-lg shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                          {service.emoji}
                        </div>
                        <div>
                          <h3 className="font-heading text-2xl md:text-3xl font-bold text-white leading-tight">
                            {service.title}
                          </h3>
                          <p className="text-sm font-semibold text-brand-pink mt-1">
                            {service.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 font-helvetica">
                        {service.description}
                      </p>

                      {/* Process Box if available */}
                      {service.process && (
                        <div className="mb-6 p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                          <p className="text-xs uppercase tracking-wider text-brand-pink font-bold mb-1.5 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-brand-pink" /> Proceso:
                          </p>
                          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                            {service.process}
                          </p>
                        </div>
                      )}

                      {/* Includes checklist */}
                      <div className="space-y-3 mb-6">
                        <p className="text-xs uppercase tracking-wider text-white font-bold flex items-center gap-1.5">
                          <span>✨ Incluye:</span>
                        </p>
                        <ul className="space-y-2.5 text-xs sm:text-sm text-gray-200">
                          {(service.features || []).map((feature: any, idx: number) => {
                            const text = typeof feature === 'string' ? feature : feature.value
                            return (
                              <li key={idx} className="flex items-start gap-2.5">
                                <CheckCircle className="w-4 h-4 text-brand-pink shrink-0 mt-0.5" />
                                <span>{text}</span>
                              </li>
                            )
                          })}
                        </ul>
                      </div>

                      {/* Exclusions warning pill */}
                      {service.exclusions && (
                        <div className="mb-6 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-200 flex items-start gap-2">
                          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>{service.exclusions}</span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-6 border-t border-white/10 space-y-3 mt-4">
                      <Button
                        className={`w-full bg-gradient-to-r ${service.colorClass} hover:opacity-95 text-white font-bold py-6 rounded-xl shadow-lg transition-all duration-300`}
                        asChild
                      >
                        <a
                          href={service.ctaHref}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Agendar {service.title} por WhatsApp
                        </a>
                      </Button>
                      <div className="text-center">
                        <a href="#identificar-manto" className="text-xs text-gray-400 hover:text-brand-pink transition-colors underline">
                          Ver tarifas según tipo de manto
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          })()}

          {/* OzoneGlow New Service Feature Card for Cats */}
          <div className="mt-12 max-w-6xl mx-auto rounded-3xl bg-gradient-to-r from-gray-900 via-[#181014] to-gray-900 border-2 border-[#FFB1BE]/40 p-6 md:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-pink/10 rounded-full blur-3xl pointer-events-none" />
            <div className="grid md:grid-cols-12 gap-6 items-center relative z-10">
              <div className="md:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-pink/20 text-brand-pink text-xs font-bold">
                  ✨ NUEVO SERVICIO: OZONEGLOW PARA MICHIS
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-white">
                  Vapor + Ozono + Cromoterapia
                </h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  OzoneGlow es una experiencia adicional de spa que combina vapor con ozono + cromoterapia, diseñada para complementar el servicio y brindar un momento de bienestar durante el grooming en nuestra <strong className="text-brand-pink">Nueva Sede (Calle 118 #15 - 45)</strong>.
                </p>
                <div className="flex flex-wrap gap-4 pt-1 text-xs md:text-sm text-gray-200">
                  <span className="flex items-center gap-1.5">💨 <strong>Vapor:</strong> Humedad y cosmética</span>
                  <span className="flex items-center gap-1.5">🫧 <strong>Ozono:</strong> Cuidado de piel y pelaje</span>
                  <span className="flex items-center gap-1.5">🌈 <strong>Cromoterapia:</strong> Relajación y calma</span>
                </div>
              </div>
              <div className="md:col-span-4 flex flex-col gap-3 justify-center">
                <Button className="bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold py-6 hover:opacity-90 shadow-lg text-sm" asChild>
                  <a href={`https://wa.me/573123114435?text=${encodeURIComponent('Hola SANROQUE, me interesa agregar el nuevo servicio OzoneGlow para mi gato en la nueva sede (Calle 118 #15 - 45).')}`} target="_blank" rel="noopener noreferrer">
                    Agendar OzoneGlow Felino (312 3114435)
                  </a>
                </Button>
                <p className="text-xs text-center text-gray-400">Ambiente tranquilo 100% Cat-Friendly libre de jaulas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    <section id="identificar-manto" className="py-12 md:py-16 bg-gradient-to-br from-gray-900 to-black">
        <div className="container mx-auto px-4">
      <div className="text-center mb-10 md:mb-16">
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white mb-6 animate-fade-in">
              ¿No sabes qué tipo de manto es tu michi?
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Selecciona la raza de tu mascota y te ayudaremos a identificar su tipo de manto para recomendarte el mejor
              servicio y precio
            </p>
          </div>

          <div className="max-w-6xl w-full mx-auto">
            <Card className="shadow-2xl bg-transparent border-2 border-[#88D3EE] backdrop-blur-sm p-0 gap-0 overflow-hidden">
              <CardHeader className="text-center bg-gray-800/50 text-white py-4">
                <CardTitle className="font-heading text-xl font-bold">🔍 Identificador de Tipo de Manto</CardTitle>
                <CardDescription className="text-gray-300 text-base">
                  Encuentra la raza de tu michi y conoce su tipo de manto
                </CardDescription>
              </CardHeader>

              <CardContent className="p-4 md:p-8 bg-gray-900/50">
                <div>
                  <label className="block text-lg font-bold text-white mb-4">Selecciona la raza de tu michi:</label>
                  <Select onValueChange={handleBreedSelect}>
                    <SelectTrigger className="w-full h-12 text-base bg-gray-700 border-[#88D3EE] text-white data-[placeholder]:text-white">
                      <SelectValue placeholder="🔍 Busca y selecciona la raza de tu michi..." />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-[#88D3EE] max-h-60">
                      {Object.entries(catBreeds).map(([coatType, breeds]) =>
                        (breeds as string[]).map((breed: string) => (
                          <SelectItem key={breed} value={breed} className="text-base text-white hover:bg-[#88D3EE]/20">
                            {breed}
                          </SelectItem>
                        )),
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {selectedBreed && coatType && (
                  <div className="p-4 mt-2 md:p-6 bg-gradient-to-r from-[#88D3EE]/10 to-[#FFB1BE]/10 rounded-2xl border-2 border-[#FFE550] animate-fade-in">
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <CheckCircle className="w-8 h-8 text-[#FFE550]" />
                        <div>
                          <h3 className="text-lg font-bold text-white">¡Identificado! 🎉</h3>
                          <p className="text-gray-300 text-base">
                            Raza: <span className="font-bold text-[#FFE550] break-words">{selectedBreed}</span>
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="min-w-0 rounded-xl p-0 md:bg-gradient-to-r md:from-gray-800 md:to-gray-700 md:rounded-2xl md:p-6 md:border-l-8 md:border-[#FFE550] md:shadow-2xl">
                          <h4 className="font-bold text-lg md:text-xl text-white mb-3 md:mb-4 flex items-center break-words">✂️ Tipo de Manto:</h4>
                          <div className="mb-4">
                            <Badge
                              className={`text-lg px-6 py-3 font-bold shadow-xl transform hover:scale-105 transition-all duration-300`}
                            >
                              {coatType === "Manto Corto" ? "🔹 MANTO CORTO" : "🔸 MANTO MEDIO Y LARGO"}
                            </Badge>
                          </div>
                          <div className="bg-[#000] md:bg-transparent rounded-xl md:rounded-none p-4 md:p-0 border border-[#FFE550]/30 md:border-0">
                            <p className="text-gray-300 text-base leading-relaxed">
                              {coatType === "Manto Corto"
                                ? "🐱 Tu michi tiene pelo corto que requiere cuidados específicos para mantener su brillo natural y textura suave."
                                : "🐱 Tu michi tiene pelo medio/largo que necesita cuidados especiales para evitar nudos, mantener su suavidad y volumen natural."}
                            </p>
                          </div>
                        </div>

                        <div className="min-w-0 bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-6 shadow-2xl border border-[#88D3EE]/30">
                          <h4 className="font-bold text-lg md:text-xl text-white mb-3 md:mb-4 flex items-center break-words">
                            💰 Precios para {selectedBreed}:
                          </h4>
                          <div className="grid grid-cols-1 gap-3">
              {Object.entries(priceRows[coatType] || {}).map(([service, price]) => (
                              <div
                                key={service}
                                className="flex justify-between items-center bg-[#000] rounded-lg p-3 border border-[#88D3EE]/20"
                              >
                                <span className="text-[#88D3EE] font-semibold text-sm">{service}:</span>
                <span className="font-bold text-white text-base">${Number(price)}k</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    <section className="py-12 md:py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
      <div className="text-center mb-10 md:mb-16">
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white mb-6">
              Lista de Precios <span className="text-[#FFE550] font-helvetica">{new Date().getFullYear()}</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Precios transparentes para servicios felinos especializados
            </p>
          </div>

      <div className="space-y-10 md:space-y-16">
            {(() => {
              const rows: any[] = (cms?.priceRows && cms.priceRows.length > 0) ? cms.priceRows : [
                { coatType: 'Manto Corto', SanRoquero: 65, Rockstar: 85, Superstar: 105, Shanti: 125 },
                { coatType: 'Manto Medio y Largo', SanRoquero: 75, Rockstar: 95, Superstar: 115, Shanti: 135 },
              ]
              const corto = rows.find(r => r.coatType === 'Manto Corto')
              const largo = rows.find(r => r.coatType === 'Manto Medio y Largo')
              return (
                <>
                  {corto && (
                    <div className="animate-fade-in">
                      <div className="text-center mb-6 md:mb-8">
                        <Badge className="mb-6 font-bold shadow-2xl text-lg px-4 py-2 text-black">🔹 Manto Corto / Pelo Corto</Badge>
                      </div>
                      <div className="overflow-x-auto scrollbar-white">
                        <table className="w-full bg-gray-800 text-white rounded-2xl overflow-hidden shadow-2xl border-2 border-[#88D3EE]">
                          <thead className="bg-gradient-to-r from-[#88D3EE] to-[#88D3EE]/80">
                            <tr>
                              <th className="px-6 py-6 text-left font-bold text-xl text-white">Categoría</th>
                              <th className="px-6 py-6 text-center font-bold text-xl text-white">SanRoquero</th>
                              <th className="px-6 py-6 text-center font-bold text-xl text-white">Rockstar</th>
                              <th className="px-6 py-6 text-center font-bold text-xl text-white">Superstar</th>
                              <th className="px-6 py-6 text-center font-bold text-xl text-white">Shanti Spa</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className='bg-gray-700/50'>
                              <td className='px-6 py-4 font-bold capitalize text-lg text-[#88D3EE]'>{corto.coatType}</td>
                              <td className='px-6 py-4 text-center font-bold text-lg'>${corto.SanRoquero}k</td>
                              <td className='px-6 py-4 text-center font-bold text-lg'>${corto.Rockstar}k</td>
                              <td className='px-6 py-4 text-center font-bold text-[#FFE550] text-lg'>${corto.Superstar}k</td>
                              <td className='px-6 py-4 text-center font-bold text-[#88D3EE] text-lg'>${corto.Shanti}k</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {largo && (
                    <div className="animate-fade-in">
                      <div className="text-center mb-6 md:mb-8">
                        <Badge className="mb-6 font-bold shadow-2xl py-2 px-4 text-lg text-black">🔸 Manto Medio y Largo</Badge>
                      </div>
                      <div className="overflow-x-auto scrollbar-white">
                        <table className="w-full bg-gray-800 text-white rounded-2xl overflow-hidden shadow-2xl border-2 border-[#FFB1BE]">
                          <thead className="bg-gradient-to-r from-[#FFB1BE] to-[#FFB1BE]/80">
                            <tr>
                              <th className="px-6 py-6 text-left font-bold text-xl text-white">Categoría</th>
                              <th className="px-6 py-6 text-center font-bold text-xl text-white">SanRoquero</th>
                              <th className="px-6 py-6 text-center font-bold text-xl text-white">Rockstar</th>
                              <th className="px-6 py-6 text-center font-bold text-xl text-white">Superstar</th>
                              <th className="px-6 py-6 text-center font-bold text-xl text-white">Shanti Spa</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className='bg-gray-700/50'>
                              <td className='px-6 py-4 font-bold capitalize text-lg text-[#FFB1BE]'>{largo.coatType}</td>
                              <td className='px-6 py-4 text-center font-bold text-lg'>${largo.SanRoquero}k</td>
                              <td className='px-6 py-4 text-center font-bold text-lg'>${largo.Rockstar}k</td>
                              <td className='px-6 py-4 text-center font-bold text-[#FFE550] text-lg'>${largo.Superstar}k</td>
                              <td className='px-6 py-4 text-center font-bold text-[#FFB1BE] text-lg'>${largo.Shanti}k</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </>
              )
            })()}
          </div>
        </div>
      </section>

    </main>
  )
}
