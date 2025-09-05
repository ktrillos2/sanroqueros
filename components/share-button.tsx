"use client"

import { useCallback } from "react"
import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

export function ShareButton({ title }: { title?: string }) {
  const onShare = useCallback(async () => {
    try {
      const url = typeof window !== "undefined" ? window.location.href : ""
      if (navigator.share && url) {
        await navigator.share({ title: title || document.title, url })
        return
      }
      if (url) {
        await navigator.clipboard.writeText(url)
        toast({ title: "Enlace copiado", description: "El enlace se copió al portapapeles." })
      }
    } catch (err) {
      toast({ title: "No se pudo compartir", description: "Intenta de nuevo o copia el enlace." })
    }
  }, [title])

  return (
    <Button size="sm" variant="ghost" onClick={onShare} className="text-gray-400 hover:text-brand-yellow">
      <Share2 className="w-4 h-4" />
    </Button>
  )
}
