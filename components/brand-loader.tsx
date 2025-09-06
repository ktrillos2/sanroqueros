"use client"

import Image from "next/image"

export default function BrandLoader() {
    return (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
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
