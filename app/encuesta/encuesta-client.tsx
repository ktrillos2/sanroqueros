"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Star,
  Heart,
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  ArrowLeft,
  Share2,
  Lock,
  ThumbsUp,
  Smile,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from "lucide-react"

interface EncuestaClientProps {
  siteSettings: any
}

export function EncuestaClient({ siteSettings }: EncuestaClientProps) {
  const currentYear = new Date().getFullYear()

  // Form State
  const [formData, setFormData] = useState({
    tutorName: "",
    petName: "",
    phone: "",
    email: "",
    service: "",
    serviceOther: "",
    ratingGeneral: 5,
    ratingResult: 5,
    ratingStaff: 5,
    likedMost: "",
    improvements: "",
    nps: 10,
    returnVisit: "Sí, definitivamente",
    authorizeTestimonial: "Sí, autorizo el uso de mi comentario como testimonio",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy[field]
        return copy
      })
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.tutorName.trim()) {
      newErrors.tutorName = "Por favor ingresa tu nombre."
    }
    if (!formData.petName.trim()) {
      newErrors.petName = "Por favor ingresa el nombre de tu mascota."
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Por favor ingresa tu número de teléfono o WhatsApp."
    }
    if (!formData.service) {
      newErrors.service = "Por favor selecciona el servicio que recibió tu mascota."
    }
    if (formData.service === "Otro" && !formData.serviceOther.trim()) {
      newErrors.serviceOther = "Por favor especifica el servicio recibido."
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    if (!validate()) {
      // Desplazar al primer error visible
      const firstErrorKey = Object.keys(errors)[0]
      const el = document.getElementById(firstErrorKey)
      el?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "No se pudo guardar la encuesta.")
      }

      setIsSuccess(true)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (err: any) {
      console.error("Error al enviar encuesta:", err)
      setSubmitError(
        err.message || "Ocurrió un error al enviar tu respuesta. Por favor intenta de nuevo."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // Pre-filled WhatsApp notification message for user after completion
  const principalWa =
    (siteSettings?.whatsapps || []).find((w: any) => w?.principal) || siteSettings?.whatsapps?.[0]
  const waNumber = principalWa?.numero || "573123114435"
  const completedWaText = encodeURIComponent(
    `¡Hola SanRoque! Acabo de completar la encuesta de satisfacción para mi consentido(a) ${formData.petName || "mi mascota"}. ¡Muchas gracias por el servicio y dedicación!`
  )
  const waCompletedUrl = `https://wa.me/${waNumber}?text=${completedWaText}`

  const servicesOptions = [
    {
      value: "Rockstar (Corte y Estilismo)",
      label: "Rockstar (Corte y Estilismo)",
      tag: "Corte & Estilo",
      desc: "Protocolo de doble baño, secado, cepillado y corte profesional.",
      emoji: "✂️",
    },
    {
      value: "Superstar (Baño Premium)",
      label: "Superstar (Baño Premium)",
      tag: "Nutrición Lujo",
      desc: "Hidratación profunda 100% Hydra Groomers y acabado sedoso.",
      emoji: "👑",
    },
    {
      value: "Shanti Pet Spa (Servicio de Relajación)",
      label: "Shanti Pet Spa (Servicio de Relajación)",
      tag: "Terapia Zen",
      desc: "Cosmecéutica italiana Iv San Bernard en ambiente libre de jaulas.",
      emoji: "🌿",
    },
    {
      value: "Catverse / Gatos (Servicios específicos para felinos)",
      label: "Catverse / Gatos (Servicios específicos para felinos)",
      tag: "Michis",
      desc: "Cuidado especializado Fear Free con aromaterapia y bajo estrés.",
      emoji: "🐱",
    },
    {
      value: "Otro",
      label: "Otro (Por favor, especifique brevemente)",
      tag: "Personalizado",
      desc: "Baño esencial, mantenimiento higiénico, OzoneGlow u otro servicio.",
      emoji: "✨",
    },
  ]

  const returnVisitOptions = [
    { value: "Sí, definitivamente", label: "Sí, definitivamente", emoji: "🥰" },
    { value: "Probablemente sí", label: "Probablemente sí", emoji: "😊" },
    { value: "No estoy seguro/a", label: "No estoy seguro/a", emoji: "🤔" },
    { value: "No", label: "No", emoji: "🙁" },
  ]

  const testimonialOptions = [
    {
      value: "Sí, autorizo el uso de mi comentario como testimonio",
      label: "Sí, autorizo el uso de mi comentario como testimonio",
      sublabel: "Sin revelar tus datos privados (solo nombre de pila y tu consentido).",
      icon: ThumbsUp,
    },
    {
      value: "No, prefiero mantener mi comentario privado",
      label: "No, prefiero mantener mi comentario privado",
      sublabel: "Tu comentario será utilizado exclusivamente para mejora interna.",
      icon: Lock,
    },
  ]

  return (
    <div className="min-h-screen bg-brand-black text-white relative overflow-hidden flex flex-col justify-between selection:bg-brand-yellow selection:text-black">
      {/* Decorative ambient lighting */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-brand-yellow/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -right-40 w-[450px] h-[450px] bg-brand-pink/10 rounded-full blur-[150px]" />
        <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[140px]" />
      </div>

      {/* Top Navbar */}
      <header className="relative z-10 w-full border-b border-white/10 bg-brand-black/80 backdrop-blur-md sticky top-0">
        <div className="max-w-3xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-gray-300 hover:text-brand-yellow transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">Volver a SanRoque</span>
          </Link>

          <Link href="/" className="inline-block">
            <div className="relative w-32 h-8">
              <Image
                src={siteSettings?.logos?.oscuro?.url || "/images/sanroque-logo-white.webp"}
                alt={siteSettings?.nombreComercial || "SANROQUE"}
                fill
                priority
                sizes="128px"
                className="object-contain"
              />
            </div>
          </Link>

          <Link
            href="/redes"
            className="text-xs text-brand-yellow hover:underline flex items-center gap-1 font-medium"
          >
            <span>Nuestras Redes</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-3xl mx-auto px-4 py-8 sm:py-12 flex-1">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            /* SUCCESS CELEBRATION STATE */
            <motion.div
              key="success-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#181818] to-[#0f0f0f] border-2 border-brand-yellow/50 shadow-2xl text-center space-y-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />

              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-brand-yellow via-amber-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-yellow-500/20 text-black">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-3">
                <span className="px-3.5 py-1 rounded-full bg-brand-yellow/20 text-brand-yellow text-xs font-bold tracking-wider uppercase border border-brand-yellow/30">
                  ¡Encuesta Recibida!
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
                  ¡Muchas gracias, {formData.tutorName || "amigo/a"}!
                </h2>
                <p className="text-gray-300 text-base max-w-lg mx-auto font-helvetica leading-relaxed">
                  Tus respuestas son el corazón de <strong className="text-brand-yellow">SANROQUE</strong>. Gracias a tu opinión, seguimos elevando el bienestar, la dedicación y el amor con el que consentimos a{" "}
                  <strong className="text-white">{formData.petName || "tu mascota"}</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 max-w-md mx-auto text-xs text-gray-300 space-y-1">
                <p className="flex items-center justify-center gap-1.5 font-medium text-white">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Tus respuestas fueron guardadas de manera segura
                </p>
                <p className="text-gray-400">
                  Nos comunicaremos contigo en caso de que requieras seguimiento especial o desees agendar tu próximo spa.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <a
                  href={waCompletedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all duration-200"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Notificar por WhatsApp</span>
                </a>

                <Link
                  href="/redes"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-sm transition-all duration-200"
                >
                  <Sparkles className="w-4 h-4 text-brand-yellow" />
                  <span>Ver Nuestras Redes</span>
                </Link>
              </div>

              <div className="pt-2">
                <Link
                  href="/"
                  className="text-xs text-gray-400 hover:text-brand-yellow transition-colors underline"
                >
                  Volver al inicio de SANROQUE
                </Link>
              </div>
            </motion.div>
          ) : (
            /* ACTIVE FORM STATE */
            <motion.div
              key="survey-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Hero Banner Header */}
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-yellow/15 border border-brand-yellow/30 text-brand-yellow text-xs font-bold tracking-wide">
                  <Star className="w-3.5 h-3.5 fill-brand-yellow" />
                  <span>Tu opinión nos ayuda a crecer</span>
                </div>

                {/* Exactly 1 H1 for SEO compliance */}
                <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                  Encuesta Rápida de SanRoque
                </h1>

                <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto font-helvetica">
                  ¡Gracias por visitarnos! Ayúdanos a mejorar dedicando un minuto a esta encuesta corta.
                </p>

                {/* Privacy Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-gray-400">
                  <Lock className="w-3.5 h-3.5 text-gray-300" />
                  <span>Tus datos son privados y tratados con total confidencialidad.</span>
                </div>
              </div>

              {submitError && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">No se pudo enviar la encuesta</p>
                    <p className="text-xs mt-0.5">{submitError}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                {/* ---------------- SECCIÓN 1: DATOS BÁSICOS ---------------- */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-6">
                  <div className="border-b border-white/10 pb-4">
                    <span className="text-xs font-bold tracking-wider text-brand-yellow uppercase">
                      Paso 1 de 4
                    </span>
                    <h2 className="font-heading text-2xl font-bold text-white mt-1">
                      1. Datos del Tutor y tu Mascota
                    </h2>
                    <p className="text-xs text-gray-400 font-helvetica mt-0.5">
                      Identifiquemos a quién tuvimos el placer de atender hoy.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Tutor Name */}
                    <div className="space-y-2" id="tutorName">
                      <label className="block text-sm font-semibold text-gray-200">
                        1. Nombre del tutor/a <span className="text-brand-pink">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: Carolina Pérez"
                        value={formData.tutorName}
                        onChange={(e) => handleInputChange("tutorName", e.target.value)}
                        className={`w-full h-12 px-4 rounded-xl bg-white/[0.06] border ${
                          errors.tutorName
                            ? "border-rose-500 focus:ring-rose-500"
                            : "border-white/15 focus:border-brand-yellow"
                        } text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow/40 transition-all`}
                      />
                      {errors.tutorName && (
                        <p className="text-rose-400 text-xs mt-1">{errors.tutorName}</p>
                      )}
                    </div>

                    {/* Pet Name */}
                    <div className="space-y-2" id="petName">
                      <label className="block text-sm font-semibold text-gray-200">
                        2. Nombre de tu mascota <span className="text-brand-pink">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: Milo, Luna, Simba..."
                        value={formData.petName}
                        onChange={(e) => handleInputChange("petName", e.target.value)}
                        className={`w-full h-12 px-4 rounded-xl bg-white/[0.06] border ${
                          errors.petName
                            ? "border-rose-500 focus:ring-rose-500"
                            : "border-white/15 focus:border-brand-yellow"
                        } text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow/40 transition-all`}
                      />
                      {errors.petName && (
                        <p className="text-rose-400 text-xs mt-1">{errors.petName}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Phone */}
                    <div className="space-y-2" id="phone">
                      <label className="block text-sm font-semibold text-gray-200">
                        Número de teléfono / WhatsApp <span className="text-brand-pink">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="Ej: 312 311 4435"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className={`w-full h-12 px-4 rounded-xl bg-white/[0.06] border ${
                          errors.phone
                            ? "border-rose-500 focus:ring-rose-500"
                            : "border-white/15 focus:border-brand-yellow"
                        } text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow/40 transition-all`}
                      />
                      {errors.phone && (
                        <p className="text-rose-400 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>

                    {/* Email (Optional) */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-200">
                        Correo electrónico <span className="text-xs text-gray-400 font-normal">(Opcional)</span>
                      </label>
                      <input
                        type="email"
                        placeholder="tu@correo.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="w-full h-12 px-4 rounded-xl bg-white/[0.06] border border-white/15 focus:border-brand-yellow text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow/40 transition-all"
                      />
                    </div>
                  </div>

                  {/* 3. Service Received */}
                  <div className="space-y-3 pt-2" id="service">
                    <label className="block text-sm font-semibold text-gray-200">
                      3. ¿Qué servicio recibió tu mascota? <span className="text-brand-pink">*</span>
                    </label>

                    <div className="grid sm:grid-cols-2 gap-3">
                      {servicesOptions.map((opt) => {
                        const isSelected = formData.service === opt.value
                        return (
                          <button
                            type="button"
                            key={opt.value}
                            onClick={() => handleInputChange("service", opt.value)}
                            className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-start gap-3 ${
                              isSelected
                                ? "bg-brand-yellow/15 border-brand-yellow text-white shadow-lg shadow-yellow-500/10 ring-1 ring-brand-yellow/40"
                                : "bg-white/[0.04] border-white/10 hover:border-white/25 text-gray-300 hover:bg-white/[0.07]"
                            }`}
                          >
                            <span className="text-2xl shrink-0 mt-0.5">{opt.emoji}</span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1 mb-1">
                                <span className="font-bold text-sm text-white">{opt.label}</span>
                                <span
                                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                                    isSelected
                                      ? "bg-brand-yellow text-black"
                                      : "bg-white/10 text-gray-300"
                                  }`}
                                >
                                  {opt.tag}
                                </span>
                              </div>
                              <p className="text-xs text-gray-400 font-helvetica line-clamp-2">
                                {opt.desc}
                              </p>
                            </div>
                          </button>
                        )
                      })}
                    </div>

                    {errors.service && (
                      <p className="text-rose-400 text-xs mt-1">{errors.service}</p>
                    )}

                    {/* If 'Otro' is selected, show specify input */}
                    {formData.service === "Otro" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="pt-2 space-y-1.5"
                        id="serviceOther"
                      >
                        <label className="block text-xs font-semibold text-brand-yellow">
                          Especifica brevemente el servicio recibido: *
                        </label>
                        <input
                          type="text"
                          placeholder="Ej: Solo corte de uñas, baño ozono, desenredo..."
                          value={formData.serviceOther}
                          onChange={(e) => handleInputChange("serviceOther", e.target.value)}
                          className="w-full h-11 px-4 rounded-xl bg-white/[0.08] border border-brand-yellow/60 text-white placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow/50"
                        />
                        {errors.serviceOther && (
                          <p className="text-rose-400 text-xs">{errors.serviceOther}</p>
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* ---------------- SECCIÓN 2: CALIFICACIÓN DEL SERVICIO ---------------- */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-8">
                  <div className="border-b border-white/10 pb-4">
                    <span className="text-xs font-bold tracking-wider text-brand-pink uppercase">
                      Paso 2 de 4
                    </span>
                    <h2 className="font-heading text-2xl font-bold text-white mt-1">
                      2. Calificación del Servicio
                    </h2>
                    <p className="text-xs text-gray-400 font-helvetica mt-0.5">
                      Califica del 1 al 5 cada aspecto clave de tu experiencia.
                    </p>
                  </div>

                  {/* Pregunta 4: Experiencia General */}
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-sm sm:text-base font-semibold text-white">
                        4. Del 1 al 5, ¿cómo calificas tu experiencia general?
                      </h3>
                      <span className="text-xs text-brand-yellow font-bold">
                        {formData.ratingGeneral === 1 && "1 - Muy mala"}
                        {formData.ratingGeneral === 2 && "2 - Mala"}
                        {formData.ratingGeneral === 3 && "3 - Regular"}
                        {formData.ratingGeneral === 4 && "4 - Muy buena"}
                        {formData.ratingGeneral === 5 && "5 - Excelente ✨"}
                      </span>
                    </div>

                    <div className="grid grid-cols-5 gap-2 sm:gap-4 max-w-lg mx-auto">
                      {[1, 2, 3, 4, 5].map((num) => {
                        const isSelected = formData.ratingGeneral === num
                        return (
                          <button
                            type="button"
                            key={num}
                            onClick={() => handleInputChange("ratingGeneral", num)}
                            className={`py-3 sm:py-4 rounded-2xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-1 ${
                              isSelected
                                ? "bg-gradient-to-b from-brand-yellow to-amber-500 border-brand-yellow text-black font-extrabold shadow-lg shadow-yellow-500/30 scale-105"
                                : "bg-white/[0.04] border-white/10 text-gray-300 hover:bg-white/[0.08] hover:border-white/30"
                            }`}
                          >
                            <Star
                              className={`w-5 h-5 ${
                                isSelected ? "fill-black text-black" : "text-gray-400"
                              }`}
                            />
                            <span className="text-base sm:text-lg">{num}</span>
                          </button>
                        )
                      })}
                    </div>
                    <div className="flex justify-between text-[11px] text-gray-400 px-1 max-w-lg mx-auto">
                      <span>Muy mala (1)</span>
                      <span>Excelente (5)</span>
                    </div>
                  </div>

                  {/* Pregunta 5: Resultado del Servicio */}
                  <div className="space-y-3 pt-2 border-t border-white/5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-sm sm:text-base font-semibold text-white">
                        5. Del 1 al 5, ¿qué tan satisfecho/a quedaste con el resultado del servicio (look/bienestar de tu mascota)?
                      </h3>
                      <span className="text-xs text-brand-pink font-bold">
                        {formData.ratingResult === 1 && "1 - Nada satisfecho/a"}
                        {formData.ratingResult === 2 && "2 - Poco satisfecho/a"}
                        {formData.ratingResult === 3 && "3 - Neutral"}
                        {formData.ratingResult === 4 && "4 - Satisfecho/a"}
                        {formData.ratingResult === 5 && "5 - Totalmente satisfecho/a 💖"}
                      </span>
                    </div>

                    <div className="grid grid-cols-5 gap-2 sm:gap-4 max-w-lg mx-auto">
                      {[1, 2, 3, 4, 5].map((num) => {
                        const isSelected = formData.ratingResult === num
                        return (
                          <button
                            type="button"
                            key={num}
                            onClick={() => handleInputChange("ratingResult", num)}
                            className={`py-3 sm:py-4 rounded-2xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-1 ${
                              isSelected
                                ? "bg-gradient-to-b from-brand-pink to-rose-400 border-brand-pink text-black font-extrabold shadow-lg shadow-pink-500/30 scale-105"
                                : "bg-white/[0.04] border-white/10 text-gray-300 hover:bg-white/[0.08] hover:border-white/30"
                            }`}
                          >
                            <Heart
                              className={`w-5 h-5 ${
                                isSelected ? "fill-black text-black" : "text-gray-400"
                              }`}
                            />
                            <span className="text-base sm:text-lg">{num}</span>
                          </button>
                        )
                      })}
                    </div>
                    <div className="flex justify-between text-[11px] text-gray-400 px-1 max-w-lg mx-auto">
                      <span>Nada satisfecho/a (1)</span>
                      <span>Totalmente satisfecho/a (5)</span>
                    </div>
                  </div>

                  {/* Pregunta 6: Atención y Amabilidad */}
                  <div className="space-y-3 pt-2 border-t border-white/5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-sm sm:text-base font-semibold text-white">
                        6. Del 1 al 5, ¿cómo calificas la atención y amabilidad del equipo de SanRoque?
                      </h3>
                      <span className="text-xs text-brand-blue font-bold">
                        {formData.ratingStaff === 1 && "1 - Muy deficiente"}
                        {formData.ratingStaff === 2 && "2 - Deficiente"}
                        {formData.ratingStaff === 3 && "3 - Aceptable"}
                        {formData.ratingStaff === 4 && "4 - Muy buena"}
                        {formData.ratingStaff === 5 && "5 - Excepcional 🌟"}
                      </span>
                    </div>

                    <div className="grid grid-cols-5 gap-2 sm:gap-4 max-w-lg mx-auto">
                      {[1, 2, 3, 4, 5].map((num) => {
                        const isSelected = formData.ratingStaff === num
                        return (
                          <button
                            type="button"
                            key={num}
                            onClick={() => handleInputChange("ratingStaff", num)}
                            className={`py-3 sm:py-4 rounded-2xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-1 ${
                              isSelected
                                ? "bg-gradient-to-b from-brand-blue to-cyan-400 border-brand-blue text-black font-extrabold shadow-lg shadow-cyan-500/30 scale-105"
                                : "bg-white/[0.04] border-white/10 text-gray-300 hover:bg-white/[0.08] hover:border-white/30"
                            }`}
                          >
                            <Smile
                              className={`w-5 h-5 ${
                                isSelected ? "text-black" : "text-gray-400"
                              }`}
                            />
                            <span className="text-base sm:text-lg">{num}</span>
                          </button>
                        )
                      })}
                    </div>
                    <div className="flex justify-between text-[11px] text-gray-400 px-1 max-w-lg mx-auto">
                      <span>Muy deficiente (1)</span>
                      <span>Excepcional (5)</span>
                    </div>
                  </div>
                </div>

                {/* ---------------- SECCIÓN 3: TU EXPERIENCIA EN DETALLE ---------------- */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-6">
                  <div className="border-b border-white/10 pb-4">
                    <span className="text-xs font-bold tracking-wider text-brand-blue uppercase">
                      Paso 3 de 4
                    </span>
                    <h2 className="font-heading text-2xl font-bold text-white mt-1">
                      3. Tu Experiencia en Detalle
                    </h2>
                    <p className="text-xs text-gray-400 font-helvetica mt-0.5">
                      Tus palabras sinceras nos inspiran y nos orientan en cada detalle.
                    </p>
                  </div>

                  {/* Pregunta 7: Qué fue lo que más te gustó */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">
                      7. ¿Qué fue lo que más te gustó de tu experiencia con nosotros?
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Cuéntanos qué detalle marcó la diferencia (el trato, el corte, el olor, la puntualidad, el amor por tu consentido...)"
                      value={formData.likedMost}
                      onChange={(e) => handleInputChange("likedMost", e.target.value)}
                      className="w-full p-4 rounded-xl bg-white/[0.06] border border-white/15 focus:border-brand-yellow text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow/40 transition-all resize-y"
                    />
                  </div>

                  {/* Pregunta 8: Qué podríamos mejorar */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200">
                      8. ¿Qué podríamos mejorar en nuestros servicios o instalaciones?
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tus sugerencias constructivas nos permiten perfeccionar cada visita..."
                      value={formData.improvements}
                      onChange={(e) => handleInputChange("improvements", e.target.value)}
                      className="w-full p-4 rounded-xl bg-white/[0.06] border border-white/15 focus:border-brand-yellow text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow/40 transition-all resize-y"
                    />
                  </div>
                </div>

                {/* ---------------- SECCIÓN 4: RECOMENDACIÓN Y FIDELIDAD ---------------- */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-8">
                  <div className="border-b border-white/10 pb-4">
                    <span className="text-xs font-bold tracking-wider text-brand-yellow uppercase">
                      Paso 4 de 4
                    </span>
                    <h2 className="font-heading text-2xl font-bold text-white mt-1">
                      4. Recomendación y Fidelidad
                    </h2>
                    <p className="text-xs text-gray-400 font-helvetica mt-0.5">
                      ¡Últimas preguntas para completar tu encuesta!
                    </p>
                  </div>

                  {/* Pregunta 9: NPS (1 al 10) */}
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-sm sm:text-base font-semibold text-white">
                        9. Del 1 al 10, ¿qué tan probable es que recomiendes SanRoque a un amigo o familiar? (NPS)
                      </h3>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block self-start sm:self-auto ${
                          formData.nps >= 9
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : formData.nps >= 7
                            ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                            : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                        }`}
                      >
                        {formData.nps} / 10 •{" "}
                        {formData.nps >= 9
                          ? "¡Promotor! 🚀"
                          : formData.nps >= 7
                          ? "Satisfecho"
                          : "A mejorar"}
                      </span>
                    </div>

                    {/* Scale Selector */}
                    <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2 pt-1">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => {
                        const isSelected = formData.nps === score
                        const isHigh = score >= 9
                        const isMid = score >= 7 && score <= 8

                        let activeClass = "bg-rose-500 text-white border-rose-400 shadow-rose-500/30"
                        if (isHigh) {
                          activeClass = "bg-emerald-400 text-black border-emerald-300 shadow-emerald-500/40 font-black"
                        } else if (isMid) {
                          activeClass = "bg-brand-yellow text-black border-yellow-300 shadow-yellow-500/30 font-bold"
                        }

                        return (
                          <button
                            type="button"
                            key={score}
                            onClick={() => handleInputChange("nps", score)}
                            className={`h-12 rounded-xl border text-sm font-bold transition-all duration-150 cursor-pointer flex items-center justify-center ${
                              isSelected
                                ? `${activeClass} scale-105 shadow-md`
                                : "bg-white/[0.04] border-white/10 text-gray-300 hover:bg-white/[0.1] hover:text-white"
                            }`}
                          >
                            {score}
                          </button>
                        )
                      })}
                    </div>
                    <div className="flex justify-between text-[11px] text-gray-400 px-1 pt-1">
                      <span>1 - Nada probable</span>
                      <span>10 - Definitivamente lo recomendaría</span>
                    </div>
                  </div>

                  {/* Pregunta 10: ¿Volverías a visitarnos? */}
                  <div className="space-y-3 pt-2 border-t border-white/5">
                    <h3 className="text-sm sm:text-base font-semibold text-white">
                      10. ¿Volverías a visitarnos?
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {returnVisitOptions.map((opt) => {
                        const isSelected = formData.returnVisit === opt.value
                        return (
                          <button
                            type="button"
                            key={opt.value}
                            onClick={() => handleInputChange("returnVisit", opt.value)}
                            className={`p-3.5 rounded-xl border text-left text-sm transition-all duration-150 cursor-pointer flex items-center gap-3 ${
                              isSelected
                                ? "bg-brand-yellow/15 border-brand-yellow text-white font-bold ring-1 ring-brand-yellow/30"
                                : "bg-white/[0.04] border-white/10 text-gray-300 hover:bg-white/[0.08]"
                            }`}
                          >
                            <span className="text-xl">{opt.emoji}</span>
                            <span>{opt.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Pregunta 11: Autorización Testimonio */}
                  <div className="space-y-3 pt-2 border-t border-white/5">
                    <h3 className="text-sm sm:text-base font-semibold text-white">
                      11. ¿Nos autorizas a usar tu comentario (sin revelar tus datos personales) como testimonio en nuestra publicidad o redes sociales?
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-3">
                      {testimonialOptions.map((opt) => {
                        const isSelected = formData.authorizeTestimonial === opt.value
                        const Icon = opt.icon
                        return (
                          <button
                            type="button"
                            key={opt.value}
                            onClick={() => handleInputChange("authorizeTestimonial", opt.value)}
                            className={`p-4 rounded-2xl border text-left transition-all duration-150 cursor-pointer flex items-start gap-3 ${
                              isSelected
                                ? "bg-white/[0.1] border-brand-yellow text-white ring-1 ring-brand-yellow/30"
                                : "bg-white/[0.03] border-white/10 text-gray-400 hover:bg-white/[0.06] hover:text-gray-300"
                            }`}
                          >
                            <Icon
                              className={`w-5 h-5 shrink-0 mt-0.5 ${
                                isSelected ? "text-brand-yellow" : "text-gray-500"
                              }`}
                            />
                            <div className="text-xs">
                              <p className="font-semibold text-white mb-0.5">{opt.label}</p>
                              <p className="text-gray-400 font-helvetica">{opt.sublabel}</p>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Submit Action Bar */}
                <div className="p-6 rounded-3xl bg-gradient-to-r from-gray-900 via-[#181818] to-gray-900 border border-white/15 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-gray-400 text-center sm:text-left">
                    <p className="font-semibold text-gray-200">
                      ¿Listo para enviar tus respuestas?
                    </p>
                    <p>Dedicar un minuto hace una gran diferencia para nosotros. 🐾</p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-yellow via-amber-400 to-yellow-500 hover:opacity-95 text-black font-extrabold text-base shadow-xl shadow-yellow-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Enviar Encuesta ✨</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Mandatory Footer strictly complying with Rules 29-32 */}
      <footer className="relative z-10 w-full border-t border-white/10 mt-12 py-6 bg-brand-black/90 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-4 flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-xs text-gray-400">
            © {currentYear} SANROQUE. Todos los derechos reservados.
          </p>
          <a
            href="https://www.kytcode.lat"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
          >
            <span>Desarrollado por K&T</span>
            <span className="text-white">❤️</span>
          </a>
        </div>
      </footer>
    </div>
  )
}
