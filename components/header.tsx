"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
// Fetch header data from server API to avoid bundling Node modules on client

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const [navItems, setNavItems] = useState<{ label: string; href: string }[]>([])
  const [cta, setCta] = useState<{ label: string; href: string } | null>(null)

  useEffect(() => {
    let mounted = true
  ;(async () => {
      try {
    const res = await fetch('/api/header', { cache: 'no-store' })
    const data = res.ok ? await res.json() : null
        if (!mounted) return
        setNavItems(
          (data?.menu?.length ? data.menu : [
            { label: "Inicio", href: "/" },
            { label: "Perros", href: "/perros" },
            { label: "Gatos", href: "/gatos" },
            { label: "Blog", href: "/blog" },
            { label: "Contacto", href: "/#contacto" },
          ])
        )
        setCta(data?.cta ?? { label: "Agendar Cita", href: "/#contacto" })
      } catch {
        if (!mounted) return
        setNavItems([
          { label: "Inicio", href: "/" },
          { label: "Perros", href: "/perros" },
          { label: "Gatos", href: "/gatos" },
          { label: "Blog", href: "/blog" },
          { label: "Contacto", href: "/#contacto" },
        ])
        setCta({ label: "Agendar Cita", href: "/#contacto" })
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <AnimatePresence>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src={isScrolled ? "/images/sanroque-logo-black.png" : "/images/sanroque-logo-white.png"}
                alt="SANROQUE"
                width={150}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
    <nav className="hidden md:flex items-center space-x-8">
        {navItems.map((item) => (
                <Link
          key={item.label}
          href={item.href}
      className={`moonglade font-medium transition-colors hover:text-brand-yellow ${
                    isScrolled ? "text-gray-900" : "text-white"
                  }`}
                >
          {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              {cta && (
                <Button asChild className="moonglade bg-brand-yellow hover:bg-yellow-400 text-black font-semibold">
                  <Link href={cta.href}>{cta.label}</Link>
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className={`w-6 h-6 ${isScrolled ? "text-gray-900" : "text-white"}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isScrolled ? "text-gray-900" : "text-white"}`} />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
        <nav className="flex flex-col space-y-4 px-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
            className="moonglade text-gray-900 font-medium hover:text-brand-yellow transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  {cta && (
                    <Button asChild className="moonglade bg-brand-yellow hover:bg-yellow-400 text-black font-semibold mt-4">
                      <Link href={cta.href} onClick={() => setIsMobileMenuOpen(false)}>
                        {cta.label}
                      </Link>
                    </Button>
                  )}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </AnimatePresence>
  )
}
