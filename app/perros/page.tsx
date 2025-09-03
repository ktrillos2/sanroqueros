"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Crown, CheckCircle, Sparkles, Leaf } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function PerrosPage() {
  const [selectedBreed, setSelectedBreed] = useState("")
  const [coatType, setCoatType] = useState("")

  const breedsByCoat = {
    corto: {
      minis: ["Chihuahua", "Pinscher"],
      pequeños: ["Pug", "Boston Terrier", "Beagle", "Bulldog Francés", "Jack Russell", "Teckel"],
      medianos: [
        "Bulldog Inglés",
        "Basset Hound",
        "Pitbull",
        "Bull Terrier",
        "Pastor Ganadero Australiano",
        "Stanford Terrier",
        "Basset Hound",
      ],
      grandes: ["Labrador", "Boxer", "Weimaraner", "Pointer", "Dalmata", "Pointer", "Doberman"],
      gigantes: ["Pastor Alemán", "Gran Danés", "Rhodesian", "Braco", "Rottweiler", "Fila Brasilero"],
    },
    medioLargo: {
      minis: ["Yorkshire Mini", "Maltés Toy", "Caniche Toy", "Bichón Boloñés"],
      pequeños: [
        "Shih Tzu",
        "Schnauzer",
        "Maltés",
        "Poodle",
        "Yorkie",
        "Pomerania",
        "Bichón",
        "Lasha Apso",
        "Westie",
        "Scottish Terrier",
        "Fox Terrier",
      ],
      medianos: ["Cocker", "Springer Spaniel", "Border Collie", "Pastor Australiano", "Shetland", "Shiba Inu"],
      grandes: [
        "Golden Retriever",
        "Samoyedo",
        "Airdale Terrier",
        "Chow Chow",
        "Akita",
        "Australian Labradoodle",
        "Husky",
        "Akita",
      ],
      gigantes: [
        "Terranova",
        "San Bernardo",
        "Alaskan Malamute",
        "Pastor Alemán Pelo Largo",
        "Bernés de la Montaña",
        "Pastor Ovejero Inglés",
      ],
    },
  }

  const pricingData = {
    corto: {
      minis: { sanroquero: 65, rockstar: 76, superstar: 97, shanti: 157 },
      pequeños: { sanroquero: 78, rockstar: 88, superstar: 110, shanti: 170 },
      medianos: { sanroquero: 91, rockstar: 101, superstar: 122, shanti: 183 },
      grandes: { sanroquero: 103, rockstar: 117, superstar: 143, shanti: 206 },
      gigantes: { sanroquero: 116, rockstar: 130, superstar: 155, shanti: 229 },
    },
    medioLargo: {
      minis: { sanroquero: 84, rockstar: 94, superstar: 116, shanti: 175 },
      pequeños: { sanroquero: 97, rockstar: 106, superstar: 129, shanti: 188 },
      medianos: { sanroquero: 110, rockstar: 125, superstar: 145, shanti: 201 },
      grandes: { sanroquero: 129, rockstar: 157, superstar: 176, shanti: 232 },
      gigantes: {
        sanroquero: 218,
        rockstar: 246,
        superstar: 265,
        shanti: 308,
      },
    },
  }

  const services = [
    {
      id: "sanroquero",
      title: "SanRoquero",
      description: "Servicio básico con productos de calidad",
      icon: Heart,
      features: ["3 baños completos", "Productos básicos de calidad", "Secado profesional", "Corte de uñas incluido"],
      color: "from-blue-500 to-blue-600",
      shadowColor: "shadow-blue-500/50",
    },
    {
      id: "rockstar",
      title: "Rockstar",
      description: "Servicio premium con productos selectos",
      icon: Sparkles,
      features: [
        "3 baños especializados",
        "Productos premium selectos (no todos Hydra)",
        "Tratamiento desenredante",
        "Limpieza de oídos",
      ],
      color: "from-purple-500 to-purple-600",
      shadowColor: "shadow-purple-500/50",
    },
    {
      id: "superstar",
      title: "Superstar",
      description: "Servicio de lujo con productos Hydra",
      icon: Crown,
      features: [
        "4 baños + mascarilla Hydra",
        "TODOS los productos Hydra",
        "Tratamiento hidratante profundo",
        "Aromaterapia canina",
      ],
      color: "from-yellow-500 to-yellow-600",
      shadowColor: "shadow-yellow-500/50",
    },
    {
      id: "shanti",
      title: "Shanti Pet Spa",
      description: "Experiencia spa con productos Iv San Bernard",
      icon: Leaf,
      features: ["3 baños terapéuticos", "SOLO productos Iv San Bernard", "Masaje relajante", "Ambiente zen completo"],
      color: "from-green-500 to-green-600",
      shadowColor: "shadow-green-500/50",
      isPopular: true,
    },
  ]

  const handleBreedSelect = (breed: string) => {
    setSelectedBreed(breed)

    let foundCoatType = ""
    Object.entries(breedsByCoat).forEach(([coat, categories]) => {
      Object.values(categories).forEach((breeds) => {
        if (breeds.includes(breed)) {
          foundCoatType = coat
        }
      })
    })
    setCoatType(foundCoatType)
  }

  const getBreedSize = (breed: string) => {
    for (const [coat, categories] of Object.entries(breedsByCoat)) {
      for (const [size, breeds] of Object.entries(categories)) {
        if (breeds.includes(breed)) {
          return size
        }
      }
    }
    return ""
  }

  const getAllBreeds = () => {
    const allBreeds: string[] = []
    Object.values(breedsByCoat).forEach((categories) => {
      Object.values(categories).forEach((breeds) => {
        allBreeds.push(...breeds)
      })
    })
    return allBreeds.sort()
  }

  const getFilteredBreeds = () => {
    const allBreeds = getAllBreeds()
    return allBreeds
  }

  const getCoatTypeImage = (type: string) => {
    if (type === "corto") {
      return "/perro-de-pelo-corto-feliz-grooming.png"
    } else if (type === "medioLargo") {
      return "/perro-de-pelo-largo-esponjoso-grooming.png"
    }
    return "/perro-generico-grooming.png"
  }

  return (
    <main className="min-h-screen bg-black">
      <Header />

  <section className="pt-24 pb-12 md:pt-32 md:pb-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#FFE550]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-[#FFB1BE]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-[#88D3EE]/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
          <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-[#FFE550]/30 rounded-full blur-2xl animate-bounce"></div>
        </div>

        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#FFE550] rounded-full opacity-30 animate-ping"
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
          <div className="text-center max-w-4xl mx-auto">
            <div className="space-y-6 animate-fade-in">
              <Badge className="font-bold px-4 py-2 text-sm">🏆 Certificados Fear Free</Badge>

              <h1 className="font-heading text-3xl lg:text-5xl font-bold leading-tight text-white">
                Grooming para{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFE550] to-[#FFB1BE] animate-pulse">
                  Woofie
                </span>
              </h1>

              <p className="text-base text-gray-300 max-w-3xl mx-auto leading-relaxed">
                4 niveles de servicio diseñados para el bienestar y belleza de tu mejor amigo. Desde cuidado básico
                hasta experiencias de lujo con productos premium.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#FFE550] to-[#FFB1BE] hover:from-[#FFE550]/90 hover:to-[#FFB1BE]/90 text-black font-bold text-sm px-6 py-3 transform hover:scale-105 transition-all duration-300 shadow-2xl"
                  asChild
                >
                  <Link href="#servicios">✨ Ver Servicios</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#88D3EE] text-[#88D3EE] hover:bg-[#88D3EE] hover:text-black bg-transparent font-bold text-sm px-6 py-3 transform hover:scale-105 transition-all duration-300"
                  asChild
                >
                  <Link href="#identificar-manto">🔍 Identificar Manto</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    <section id="servicios" className="py-12 md:py-16 bg-black">
        <div className="container mx-auto px-4">
      <div className="text-center mb-10 md:mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Nuestros Servicios</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Servicios especializados para el cuidado canino con los mejores productos y técnicas
            </p>
          </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {services.map((service) => (
              <Card
                key={service.id}
        className={`relative bg-gray-900 border-gray-800 text-white hover:scale-105 transition-all duration-300 hover:${service.shadowColor} hover:shadow-2xl pt-6 ${
                  service.isPopular ? "ring-2 ring-yellow-500" : ""
                }`}
              >
                {service.isPopular && (
                  <Badge className="text-black absolute -top-2 -right-2 font-semibold px-3 py-1 rounded-full text-xs">
                    Más Popular
                  </Badge>
                )}

                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="font-heading text-xl text-white">{service.title}</CardTitle>
                  <p className="text-gray-400 text-sm">{service.description}</p>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-2 text-sm text-gray-300 mb-6 flex-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full bg-gradient-to-r ${service.color} hover:opacity-90 text-white font-semibold mt-auto`}
                    asChild
                  >
                    <Link
                      href="https://wa.me/573154433109?text=Hola,%20me%20gustaría%20información%20sobre%20el%20servicio%20"
                      target="_blank"
                    >
                      Más Información
                    </Link>
                  </Button>
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
              ¿No sabes qué tipo de manto es tu woofie?
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Selecciona la raza de tu mascota y te ayudaremos a identificar su tipo de manto para recomendarte el mejor
              servicio y precio
            </p>
          </div>

          <div className="max-w-6xl w-full mx-auto">
            <Card className="shadow-2xl bg-transparent border-2 border-[#88D3EE] backdrop-blur-sm gap-0 p-0 overflow-hidden">
              <CardHeader className="text-center bg-gray-800/50 text-white py-4">
                <CardTitle className="font-heading text-xl font-bold">🔍 Identificador de Tipo de Manto</CardTitle>
                <CardDescription className="text-gray-300 text-base">
                  Encuentra la raza de tu woofie y conoce su tipo de manto
                </CardDescription>
              </CardHeader>

              <CardContent className="p-4 md:p-8  bg-gray-900/50">
                <div>
                  <label className="block text-lg font-bold text-white mb-4">Selecciona la raza de tu woofie:</label>
                  <Select onValueChange={handleBreedSelect}>
                    <SelectTrigger className="w-full h-12 text-base bg-gray-700 border-[#88D3EE] text-white data-[placeholder]:text-white">
                      <SelectValue placeholder="🔍 Busca y selecciona la raza de tu woofie..." />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-[#88D3EE] max-h-60">
                      {getFilteredBreeds().map((breed) => (
                        <SelectItem key={breed} value={breed} className="text-base text-white hover:bg-[#88D3EE]/20">
                          {breed}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedBreed && coatType && (
                  <div className="p-4 mt-2 md:p-6 bg-gradient-to-r from-[#88D3EE]/10 to-[#FFB1BE]/10 rounded-2xl border-2 border-[#FFE550] animate-fade-in">
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <CheckCircle className="w-8 h-8 text-[#FFE550]" />
                        <div>
                          <h3 className="text-xl font-bold text-white">¡Identificado! 🎉</h3>
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
                              className={`text-md px-6 py-3 font-bold shadow-xl transform hover:scale-105 transition-all duration-300`}
                            >
                              {coatType === "corto" ? "🔹 MANTO CORTO" : "🔸 MANTO MEDIO Y LARGO"}
                            </Badge>
                          </div>
                          <div className="bg-[#000] md:bg-transparent rounded-xl md:rounded-none p-4 md:p-0 border border-[#FFE550]/30 md:border-0">
                            <p className="text-gray-300 text-base leading-relaxed">
                              {coatType === "corto"
                                ? "🐕 Tu woofie tiene pelo corto que requiere cuidados específicos para mantener su brillo natural y textura suave."
                                : "🐕‍🦺 Tu woofie tiene pelo medio/largo que necesita cuidados especiales para evitar nudos, mantener su suavidad y volumen natural."}
                            </p>
                          </div>
                        </div>

                        {(() => {
                          const size = getBreedSize(selectedBreed)
                          const prices =
                            pricingData[coatType as keyof typeof pricingData]?.[size as keyof typeof pricingData.corto]

                          return prices ? (
                            <div className="min-w-0 bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-6 shadow-2xl border border-[#88D3EE]/30">
                              <h4 className="font-bold text-lg md:text-xl text-white mb-3 md:mb-4 flex items-center break-words">
                                💰 Precios para {selectedBreed}:
                              </h4>
                              <div className="grid grid-cols-1 gap-3">
                                <div className="flex justify-between items-center bg-[#000] rounded-lg p-3 border border-[#88D3EE]/20">
                                  <span className="text-[#88D3EE] font-semibold text-sm">SanRoquero:</span>
                                  <span className="font-bold text-white text-base">${prices.sanroquero}k</span>
                                </div>
                                <div className="flex justify-between items-center bg-[#000] rounded-lg p-3 border border-[#FFB1BE]/20">
                                  <span className="text-[#FFB1BE] font-semibold text-sm">Rockstar:</span>
                                  <span className="font-bold text-white text-base">${prices.rockstar}k</span>
                                </div>
                                <div className="flex justify-between items-center bg-[#000] rounded-lg p-3 border border-[#FFE550]/20">
                                  <span className="text-[#FFE550] font-semibold text-sm">Superstar:</span>
                                  <span className="font-bold text-[#FFE550] text-base">${prices.superstar}k</span>
                                </div>
                                <div className="flex justify-between items-center bg-[#000] rounded-lg p-3 border border-[#88D3EE]/20">
                                  <span className="text-[#88D3EE] font-semibold text-sm">Shanti Spa:</span>
                                  <span className="font-bold text-[#88D3EE] text-base">${prices.shanti}k</span>
                                </div>
                              </div>
                            </div>
                          ) : null
                        })()}
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
              Precios transparentes según el tamaño y tipo de manto de tu mascota
            </p>
          </div>

      <div className="space-y-10 md:space-y-16">
            <div className="animate-fade-in">
        <div className="text-center mb-6 md:mb-8">
                <Badge className="mb-6 font-bold shadow-2xl text-lg px-4 py-2 text-black">
                  🔹 Manto Corto / Pelo Corto
                </Badge>
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
                    {Object.entries(pricingData.corto).map(([category, prices], index) => (
                      <tr key={category} className={index % 2 === 0 ? "bg-gray-700/50" : "bg-gray-800/50"}>
                        <td className="px-6 py-4 font-bold capitalize text-lg text-[#88D3EE]">{category}</td>
                        <td className="px-6 py-4 text-center font-bold text-lg">${prices.sanroquero}k</td>
                        <td className="px-6 py-4 text-center font-bold text-lg">${prices.rockstar}k</td>
                        <td className="px-6 py-4 text-center font-bold text-[#FFE550] text-lg">${prices.superstar}k</td>
                        <td className="px-6 py-4 text-center font-bold text-[#88D3EE] text-lg">${prices.shanti}k</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="animate-fade-in">
              <div className="text-center mb-6 md:mb-8">
                <Badge className="mb-6 font-bold shadow-2xl py-2 px-4 text-lg text-black">
                  🔸 Manto Medio y Largo
                </Badge>
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
                    {Object.entries(pricingData.medioLargo).map(([category, prices], index) => (
                      <tr key={category} className={index % 2 === 0 ? "bg-gray-700/50" : "bg-gray-800/50"}>
                        <td className="px-6 py-4 font-bold capitalize text-lg text-[#FFB1BE]">{category}</td>
                        <td className="px-6 py-4 text-center font-bold text-lg">${prices.sanroquero}k</td>
                        <td className="px-6 py-4 text-center font-bold text-lg">${prices.rockstar}k</td>
                        <td className="px-6 py-4 text-center font-bold text-[#FFE550] text-lg">${prices.superstar}k</td>
                        <td className="px-6 py-4 text-center font-bold text-[#88D3EE] text-lg">${prices.shanti}k</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
