import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, User, ArrowLeft, Share2, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { RichText } from "@/components/rich-text"
import { getPayload } from "payload"
import config from "@/payload.config"

async function getPost(slug: string) {
  try {
    const payload = await getPayload({ config })
    const result = await (payload as any).find({ collection: 'posts', where: { slug: { equals: slug } }, limit: 1, depth: 1 })
    return result?.docs?.[0] ?? null
  } catch {
    return null
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

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
                  {post.category}
                </span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString("es-ES")}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {post.views || 0} vistas
                </div>
              </div>

              <h1 className="font-heading text-4xl lg:text-5xl font-bold text-white leading-tight">{post.title}</h1>

              <p className="text-xl text-gray-300 leading-relaxed">{post.excerpt}</p>

              <div className="flex items-center justify-between py-4 border-t border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{post.author}</p>
                    <p className="text-gray-400 text-sm">Especialista en Cuidado Animal</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Acciones sociales opcionales */}
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
              <Image src={post.mainImage?.file?.url || post.mainImage?.imageUrl || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-8 lg:p-12">
                {post.content?.root ? (
                  <RichText value={post.content} />
                ) : null}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

  {/* TODO: relacionados (opcional) */}

      <Footer />
    </main>
  )
}
