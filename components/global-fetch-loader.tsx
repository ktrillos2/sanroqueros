"use client"

import { useEffect, useRef, useState } from "react"
import BrandLoader from "@/components/brand-loader"
import { usePathname } from "next/navigation"

function shouldTrack(url: string) {
    try {
        const u = new URL(url, window.location.href)
        return (
            u.pathname.startsWith("/api/") ||
            u.pathname.startsWith("/_actions") ||
            u.pathname.startsWith("/graphql")
        )
    } catch {
        return false
    }
}

export default function GlobalFetchLoader() {
    const pathname = usePathname()
    // Evitar overlay en el Admin de Payload (funciona en SSR y Client)
    if (pathname?.startsWith('/admin')) return null

    const [count, setCount] = useState(0)
    const [visible, setVisible] = useState(false)
    // Bandera para saber si en este ciclo de navegación ya hubo requests trackeadas
    const hadTrackedRef = useRef(false)
    const hideTimer = useRef<number | null>(null)
    const origFetch = useRef<typeof window.fetch | null>(null)

    // Patch fetch para contar solicitudes a /api
    useEffect(() => {
        if (typeof window === "undefined") return
        if (origFetch.current) return
        // Si estamos en admin por alguna razón, no parchear
        if (pathname?.startsWith('/admin')) return
        origFetch.current = window.fetch.bind(window)
        window.fetch = async (...args) => {
            const url = typeof args[0] === "string" ? args[0] : (args[0] as Request).url
            let tracked = false
            if (shouldTrack(url)) {
                tracked = true
                setCount((c) => c + 1)
                // Mostramos inmediatamente si entra una petición
                setVisible(true)
                hadTrackedRef.current = true
            }
            try {
                const res = await origFetch.current!(...args as Parameters<typeof fetch>)
                return res
            } finally {
                if (tracked) setCount((c) => Math.max(0, c - 1))
            }
        }
        return () => {
            if (origFetch.current) {
                window.fetch = origFetch.current
                origFetch.current = null
            }
        }
    }, [])

    // Ocultar cuando no haya pendientes, con un pequeño delay para evitar parpadeos
    useEffect(() => {
        if (count > 0) {
            if (hideTimer.current) {
                window.clearTimeout(hideTimer.current)
                hideTimer.current = null
            }
            setVisible(true)
            return
        }
        hideTimer.current = window.setTimeout(() => {
            setVisible(false)
            hideTimer.current = null
        }, 250)
        return () => {
            if (hideTimer.current) {
                window.clearTimeout(hideTimer.current)
                hideTimer.current = null
            }
        }
    }, [count])

    // Mostrar el loader al cambiar de ruta (incluye la primera carga),
    // y mantenerlo hasta que terminen las peticiones trackeadas o un fallback breve si no hay peticiones.
    useEffect(() => {
        if (pathname?.startsWith('/admin')) return
        // Nueva navegación: mostramos inmediatamente
        setVisible(true)
        hadTrackedRef.current = false
        // Fallback: si no se detecta ninguna petición trackeada, ocultar pasado un tiempo prudente
        const fallback = window.setTimeout(() => {
            if (!hadTrackedRef.current && count === 0) setVisible(false)
        }, 900)
        return () => window.clearTimeout(fallback)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])

    if (!visible) return null
    return <BrandLoader />
}
