"use client"

import Image from "next/image"

export default function BrandLoader() {
  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      {/* Fondo animado sutil (círculos difuminados y puntos) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#FFE550]/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-48 h-48 bg-[#FFB1BE]/15 rounded-full blur-3xl animate-pulse [animation-delay:700ms]" />
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-[#88D3EE]/15 rounded-full blur-3xl animate-pulse [animation-delay:1400ms]" />
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-[#FFE550]/20 rounded-full blur-2xl animate-bounce" />

        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#FFE550] rounded-full opacity-20 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="relative w-56 h-16 animate-float">
          <Image
            src="/images/sanroque-logo-white.png"
            alt="SANROQUE"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="flex items-center gap-2" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-[#ffe550] animate-[pulse_1.2s_ease-in-out_infinite]" />
          <span className="h-2 w-2 rounded-full bg-[#ffe550] animate-[pulse_1.2s_ease-in-out_infinite_0.2s]" />
          <span className="h-2 w-2 rounded-full bg-[#ffe550] animate-[pulse_1.2s_ease-in-out_infinite_0.4s]" />
        </div>

        <p className="moonglade text-white/80 tracking-wider text-sm">Cuidamos a quienes más amas…</p>
      </div>
    </div>
  )
}
