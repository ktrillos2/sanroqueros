"use client"

import { usePathname } from "next/navigation"
import type React from "react"

export function ConditionalFooter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (
    pathname?.startsWith("/admin") ||
    pathname === "/redes" ||
    pathname === "/links" ||
    pathname === "/encuesta"
  ) {
    return null
  }

  return <>{children}</>
}
