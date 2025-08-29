import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, User, ArrowLeft, Share2, Heart, MessageCircle, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

const blogPost = {
  slug: "cuidado-basico-perros-gatos",
  title: "Guía Completa: Cuidado Básico para Perros y Gatos",
  excerpt:
    "Descubre los fundamentos esenciales para mantener a tu mascota feliz y saludable. Desde alimentación hasta ejercicio diario.",
  content: `
    <div class="space-y-8">
      <div class="bg-gradient-to-r from-brand-yellow/10 to-transparent p-6 rounded-lg border-l-4 border-brand-yellow">
        <p class="text-lg leading-relaxed text-white font-medium">El cuidado adecuado de nuestras mascotas es fundamental para garantizar su bienestar y felicidad. En esta guía completa, te compartimos los aspectos más importantes que debes considerar para brindar el mejor cuidado a tu perro o gato.</p>
      </div>

      <div class="space-y-6">
        <h2 class="text-3xl font-bold text-brand-yellow border-b-2 border-brand-yellow/30 pb-2">🍽️ Alimentación Balanceada</h2>
        <p class="text-white text-lg leading-relaxed">Una nutrición adecuada es la base de la salud de tu mascota. Es importante elegir alimentos de calidad que se adapten a la edad, tamaño y necesidades específicas de tu compañero peludo.</p>
        
        <div class="bg-gray-800/50 p-6 rounded-lg">
          <h3 class="text-xl font-semibold text-brand-pink mb-4">💡 Consejos para una alimentación saludable:</h3>
          <ul class="space-y-3 text-white">
            <li class="flex items-start gap-3">
              <span class="text-brand-yellow font-bold">•</span>
              <span>Establece horarios fijos de comida para crear rutina</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-brand-yellow font-bold">•</span>
              <span>Controla las porciones según las recomendaciones del veterinario</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-brand-yellow font-bold">•</span>
              <span>Evita darle comida humana que pueda ser tóxica</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-brand-yellow font-bold">•</span>
              <span>Asegúrate de que siempre tenga agua fresca disponible</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="space-y-6">
        <h2 class="text-3xl font-bold text-brand-yellow border-b-2 border-brand-yellow/30 pb-2">✨ Higiene y Grooming Regular</h2>
        <p class="text-white text-lg leading-relaxed">El grooming no es solo una cuestión estética, sino una parte esencial del cuidado de la salud. Un grooming regular ayuda a prevenir problemas de piel, detectar anomalías temprano y mantener a tu mascota cómoda.</p>

        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-gradient-to-br from-brand-pink/20 to-transparent p-6 rounded-lg border border-brand-pink/30">
            <h3 class="text-xl font-semibold text-brand-pink mb-4">🌟 Beneficios del grooming profesional:</h3>
            <ul class="space-y-2 text-white">
              <li class="flex items-center gap-2">
                <span class="w-2 h-2 bg-brand-pink rounded-full"></span>
                <span>Prevención de enredos y nudos en el pelaje</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="w-2 h-2 bg-brand-pink rounded-full"></span>
                <span>Detección temprana de problemas de piel</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="w-2 h-2 bg-brand-pink rounded-full"></span>
                <span>Reducción de la caída de pelo en casa</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="w-2 h-2 bg-brand-pink rounded-full"></span>
                <span>Mejora de la circulación sanguínea</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="w-2 h-2 bg-brand-pink rounded-full"></span>
                <span>Reducción del estrés y ansiedad</span>
              </li>
            </ul>
          </div>
          
          <div class="bg-gradient-to-br from-blue-500/20 to-transparent p-6 rounded-lg border border-blue-500/30">
            <h3 class="text-xl font-semibold text-blue-400 mb-4">🏃‍♂️ Ejercicio y Actividad Física</h3>
            <p class="text-white mb-4">Tanto los perros como los gatos necesitan actividad física regular para mantenerse saludables.</p>
            <div class="space-y-3">
              <div>
                <h4 class="font-semibold text-brand-yellow">Para perros:</h4>
                <p class="text-gray-300 text-sm">Caminatas diarias, juegos de buscar, natación</p>
              </div>
              <div>
                <h4 class="font-semibold text-brand-yellow">Para gatos:</h4>
                <p class="text-gray-300 text-sm">Juguetes interactivos, rascadores, sesiones de juego</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <h2 class="text-3xl font-bold text-brand-yellow border-b-2 border-brand-yellow/30 pb-2">🏥 Visitas Veterinarias Regulares</h2>
        <p class="text-white text-lg leading-relaxed">Las revisiones veterinarias periódicas son cruciales para mantener la salud de tu mascota. Estas visitas permiten detectar problemas de salud antes de que se conviertan en condiciones graves.</p>

        <div class="bg-gradient-to-r from-green-500/20 to-transparent p-6 rounded-lg border border-green-500/30">
          <h3 class="text-xl font-semibold text-green-400 mb-4">📅 Calendario de visitas recomendado:</h3>
          <div class="grid md:grid-cols-3 gap-4">
            <div class="text-center p-4 bg-gray-800/50 rounded-lg">
              <div class="text-2xl mb-2">🐶</div>
              <h4 class="font-semibold text-white">Cachorros</h4>
              <p class="text-gray-300 text-sm">Cada 3-4 semanas hasta los 4 meses</p>
            </div>
            <div class="text-center p-4 bg-gray-800/50 rounded-lg">
              <div class="text-2xl mb-2">🐕</div>
              <h4 class="font-semibold text-white">Adultos jóvenes</h4>
              <p class="text-gray-300 text-sm">Una vez al año</p>
            </div>
            <div class="text-center p-4 bg-gray-800/50 rounded-lg">
              <div class="text-2xl mb-2">🐕‍🦺</div>
              <h4 class="font-semibold text-white">Senior (7+ años)</h4>
              <p class="text-gray-300 text-sm">Cada 6 meses</p>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <h2 class="text-3xl font-bold text-brand-yellow border-b-2 border-brand-yellow/30 pb-2">🏠 Ambiente Seguro y Cómodo</h2>
        <p class="text-white text-lg leading-relaxed">Crear un ambiente seguro en casa es fundamental. Esto incluye eliminar plantas tóxicas, asegurar productos químicos fuera del alcance, y proporcionar espacios cómodos para descansar.</p>
      </div>

      <div class="bg-gradient-to-r from-brand-yellow/20 to-brand-pink/20 p-8 rounded-lg border-2 border-brand-yellow/30">
        <h2 class="text-3xl font-bold text-white mb-4">🎯 Conclusión</h2>
        <p class="text-white text-lg leading-relaxed mb-4">El cuidado integral de tu mascota requiere atención a múltiples aspectos: alimentación, higiene, ejercicio, salud y ambiente. En <span class="text-brand-yellow font-semibold">SanRoque</span>, entendemos la importancia de cada uno de estos elementos y ofrecemos servicios profesionales que complementan el cuidado que brindas en casa.</p>
        <p class="text-white text-lg leading-relaxed">Recuerda que cada mascota es única y puede tener necesidades específicas. No dudes en consultar con nuestros expertos para obtener consejos personalizados para tu compañero peludo.</p>
      </div>
    </div>
  `,
  image: "/placeholder.svg?height=400&width=800",
  author: "Dr. María González",
  date: "2025-01-15",
  readTime: "8 min",
  category: "Cuidado Básico",
  views: 1250,
  likes: 89,
  comments: 23,
}

const relatedPosts = [
  {
    slug: "beneficios-grooming-profesional",
    title: "5 Beneficios del Grooming Profesional",
    image: "/placeholder.svg?height=200&width=300",
    readTime: "6 min",
  },
  {
    slug: "productos-hydra-diferencia",
    title: "¿Por Qué los Productos Hydra Marcan la Diferencia?",
    image: "/placeholder.svg?height=200&width=300",
    readTime: "5 min",
  },
  {
    slug: "ambiente-libre-jaulas-importancia",
    title: "La Importancia de un Ambiente Libre de Jaulas",
    image: "/placeholder.svg?height=200&width=300",
    readTime: "7 min",
  },
]

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // In a real app, you would fetch the blog post based on the slug
  if (params.slug !== blogPost.slug) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-black">
      <Header />

      <section className="pt-32 pb-8 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button variant="ghost" asChild className="text-gray-400 hover:text-white mb-6">
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Blog
              </Link>
            </Button>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="bg-brand-yellow/20 text-brand-yellow px-3 py-1 rounded-full font-semibold">
                  {blogPost.category}
                </span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(blogPost.date).toLocaleDateString("es-ES")}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {blogPost.readTime}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {blogPost.views} vistas
                </div>
              </div>

              <h1 className="font-heading text-4xl lg:text-5xl font-bold text-white leading-tight">{blogPost.title}</h1>

              <p className="text-xl text-gray-300 leading-relaxed">{blogPost.excerpt}</p>

              <div className="flex items-center justify-between py-4 border-t border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{blogPost.author}</p>
                    <p className="text-gray-400 text-sm">Especialista en Cuidado Animal</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-red-400">
                    <Heart className="w-4 h-4 mr-2" />
                    {blogPost.likes}
                  </Button>
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-blue-400">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {blogPost.comments}
                  </Button>
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-brand-yellow">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-8 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative h-96 rounded-xl overflow-hidden">
              <Image src={blogPost.image || "/placeholder.svg"} alt={blogPost.title} fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-8 lg:p-12">
                <div
                  className="prose prose-lg prose-invert max-w-none text-white"
                  dangerouslySetInnerHTML={{ __html: blogPost.content }}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-heading font-bold text-white mb-8 text-center">Artículos Relacionados</h3>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <Card
                  key={post.slug}
                  className="bg-gray-900 border-gray-800 overflow-hidden group hover:shadow-lg hover:shadow-brand-yellow/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h4 className="font-bold text-white mb-3 group-hover:text-brand-yellow transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-gray-400 text-sm">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        asChild
                        className="text-brand-yellow hover:text-black hover:bg-brand-yellow"
                      >
                        <Link href={`/blog/${post.slug}`}>Leer más</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
