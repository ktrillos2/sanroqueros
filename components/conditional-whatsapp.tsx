"use client"
import { usePathname } from "next/navigation"
import { FloatingWhatsappButton } from "@/components/floating-whatsapp-button"

export function ConditionalWhatsapp() {
  const pathname = usePathname()
  if (pathname?.startsWith("/admin")) return null
  return <FloatingWhatsappButton />
}
