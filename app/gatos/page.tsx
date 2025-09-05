"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"
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
    return { "Manto Corto": [], "Manto Medio y Largo": [] }
  }, [cms])

  // servicios solo desde CMS

  const priceRows = useMemo(() => {
    const rows: any[] = cms?.priceRows || []
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
      return "/gato-de-pelo-corto-feliz-grooming.png"
    } else if (type === "Manto Medio y Largo") {
      return "/gato-de-pelo-largo-esponjoso-grooming.png"
    }
    return "/gato-generico-grooming.png"
  }

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
              {cms?.hero?.title}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600">{cms?.hero?.highlight}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              {cms?.hero?.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {cms?.hero?.ctaHref && cms?.hero?.ctaLabel ? (
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
                  asChild
                >
                  <Link href={cms.hero.ctaHref} target="_blank">{cms.hero.ctaLabel}</Link>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </section>

    <section className="py-12 md:py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Nuestros Servicios</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Servicios especializados para el cuidado felino con los mejores productos y técnicas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {(cms?.services || []).map((service: any) => (
            <Card
              key={service.id}
              className={`relative bg-gray-900 border-gray-800 text-white hover:scale-105 transition-all duration-300 hover:${service.shadowClass || 'shadow-pink-500/50'} hover:shadow-2xl pt-6 ${service.isPopular ? 'ring-2 ring-yellow-500' : ''}`}
            >
              {service.isPopular && (
                <Badge className="text-black absolute -top-2 -right-2 font-semibold px-3 py-1 rounded-full text-xs">
                  Más Popular
                </Badge>
              )}

              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 bg-gradient-to-r ${service.colorClass || 'from-pink-500 to-pink-600'} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="font-heading text-xl text-white">{service.title}</CardTitle>
                <p className="text-gray-400 text-sm">{service.description}</p>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-2 text-sm text-gray-300 mb-6 flex-1">
                  {(service.features || []).map((feature: any, idx: number) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{typeof feature === 'string' ? feature : feature.value}</span>
                    </li>
                  ))}
                </ul>

                {service?.ctaHref ? (
                  <Button className={`w-full bg-gradient-to-r ${service.colorClass || 'from-pink-500 to-pink-600'} hover:opacity-90 text-white font-semibold mt-auto`} asChild>
                    <Link href={service.ctaHref} target="_blank">Más Información</Link>
                  </Button>
                ) : null}
              </CardContent>
            </Card>
          ))}
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
              Lista de Precios <span className="text-[#FFE550] font-helvetica">2025</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Precios transparentes para servicios felinos especializados
            </p>
          </div>

      <div className="space-y-10 md:space-y-16">
            {(() => {
              const rows: any[] = cms?.priceRows || []
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
