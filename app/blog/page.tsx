"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, ArrowRight, ExternalLink, User, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"

type Post = {
  id?: string
  slug: string
  title: string
  excerpt: string
  author?: string
  date: string
  readTime?: string
  category: string
  views?: number
  featured?: boolean
  mainImage?: { file?: any; imageUrl?: string; alt?: string }
}

const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([])
  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('/api/blog', { cache: 'no-store' })
        const data = res.ok ? await res.json() : []
        setPosts(data)
      } catch {
        setPosts([])
      }
    })()
  }, [])
  return posts
}

const externalMentions = [
  {
    title: "Los Mejores Spas para Mascotas en Bogotá",
    source: "Revista Mascotas Colombia",
    url: "https://example.com/mejores-spas-bogota",
    excerpt: "SanRoque se destaca por su enfoque libre de jaulas y productos premium...",
    date: "2024-12-15",
    logo: "/placeholder.svg?height=40&width=120",
  },
  {
    title: "Tendencias en Grooming Profesional 2025",
    source: "Pet Industry News",
    url: "https://example.com/tendencias-grooming-2025",
    excerpt: "Establecimientos como SanRoque están revolucionando la industria con...",
    date: "2024-12-10",
    logo: "/placeholder.svg?height=40&width=120",
  },
  {
    title: "Certificación Fear Free: Un Estándar de Calidad",
    source: "Veterinaria Moderna",
    url: "https://example.com/certificacion-fear-free",
    excerpt: "SanRoque es uno de los pocos establecimientos certificados en Colombia...",
    date: "2024-12-05",
    logo: "/placeholder.svg?height=40&width=120",
  },
]

const categories = ["Todos", "Cuidado Básico", "Grooming", "Productos", "Bienestar", "Consejos"]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const posts = usePosts()

  const categories = useMemo(() => {
    const set = new Set<string>(['Todos'])
    posts.forEach(p => set.add(p.category))
    return Array.from(set)
  }, [posts])

  const filteredPosts =
    selectedCategory === "Todos" ? posts : posts.filter((post) => post.category === selectedCategory)

  const featuredPost = posts.find((post) => post.featured)

  return (
    <main className="min-h-screen bg-black">
      <Header />

      <section className="relative pt-32 pb-16 bg-black overflow-hidden">
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

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto text-white space-y-6">
            <h1 className="font-heading text-5xl lg:text-7xl font-bold leading-tight">
              Blog <span className="text-brand-yellow">SANROQUE</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Consejos expertos, tips profesionales y las últimas novedades sobre el cuidado y bienestar de tus mascotas
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category
                    ? "bg-black border-2 border-brand-yellow text-white hover:bg-gray-900"
                    : "border-gray-600 text-white hover:bg-gray-800 hover:text-white bg-transparent"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {featuredPost && selectedCategory === "Todos" && (
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-white mb-8 text-center">Artículo Destacado</h2>
            <Card className="max-w-4xl mx-auto bg-gray-900 border-gray-800 overflow-hidden group hover:shadow-2xl hover:shadow-brand-yellow/20 transition-all duration-300">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="relative h-64 md:h-full">
                    <Image
                      src={featuredPost.mainImage?.file?.url || featuredPost.mainImage?.imageUrl || "/placeholder.svg"}
                      alt={featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-brand-yellow text-black px-3 py-1 rounded-full text-sm font-semibold">
                        Destacado
                      </span>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <CardHeader className="p-0 mb-4">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                      <span className="bg-brand-yellow text-black px-2 py-1 rounded">{featuredPost.category}</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(featuredPost.date).toLocaleDateString("es-ES")}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-white mb-3 group-hover:text-brand-yellow transition-colors">
                      {featuredPost.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300 text-base leading-relaxed">
                      {featuredPost.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand-yellow rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-black" />
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{featuredPost.author}</p>
                          <div className="flex items-center gap-1 text-gray-400 text-xs">
                            <Eye className="w-3 h-3" />
                            {featuredPost.views} vistas
                          </div>
                        </div>
                      </div>
                      <Button asChild className="bg-brand-yellow hover:bg-yellow-400 text-black">
                        <Link href={`/blog/${featuredPost.slug}`}>
                          Leer más <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-white mb-12 text-center">
            {selectedCategory === "Todos" ? "Todos los Artículos" : `Artículos de ${selectedCategory}`}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="bg-gray-900 border-gray-800 overflow-hidden group hover:shadow-xl hover:shadow-brand-yellow/10 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-48">
                  <Image
                    src={post.mainImage?.file?.url || post.mainImage?.imageUrl || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-brand-yellow text-black px-2 py-1 rounded text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString("es-ES")}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {post.views}
                    </div>
                  </div>
                  <CardTitle className="text-lg font-bold text-white group-hover:text-brand-yellow transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-sm line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-brand-yellow rounded-full flex items-center justify-center">
                        <User className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-gray-400 text-xs">{post.author}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      asChild
                      className="text-brand-yellow hover:text-black hover:bg-brand-yellow"
                    >
                      <Link href={`/blog/${post.slug}`}>
                        Leer <ArrowRight className="w-3 h-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">Lo que Hablan de Nosotros</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Medios especializados y expertos de la industria reconocen nuestro trabajo y compromiso con el bienestar
              animal
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {externalMentions.map((mention, index) => (
              <Card
                key={index}
                className="bg-black border-gray-800 group hover:shadow-lg hover:shadow-brand-pink/20 transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <Image
                      src={mention.logo || "/placeholder.svg"}
                      alt={mention.source}
                      width={100}
                      height={30}
                      className="opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                    <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-brand-pink transition-colors" />
                  </div>
                  <CardTitle className="text-lg font-bold text-white group-hover:text-brand-pink transition-colors line-clamp-2">
                    {mention.title}
                  </CardTitle>
                  <div className="text-xs text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(mention.date).toLocaleDateString("es-ES")}
                  </div>
                </CardHeader>

                <CardContent>
                  <CardDescription className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {mention.excerpt}
                  </CardDescription>
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    className="w-full border-gray-700 text-gray-300 hover:bg-brand-pink hover:text-white hover:border-brand-pink bg-transparent"
                  >
                    <Link href={mention.url} target="_blank" rel="noopener noreferrer">
                      Leer artículo completo <ExternalLink className="w-3 h-3 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400 text-sm mb-6">¿Eres periodista o blogger? Contáctanos para más información</p>
            <Button
              variant="outline"
              className="border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-black bg-transparent"
            >
              <Link href="/#contacto">Contacto para Medios</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
