"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Send, MapPin, Clock, Phone } from "lucide-react"

export function ContactSection() {
  const [section, setSection] = useState<{ title?: string; highlight?: string; description?: string; services?: { label: string; value: string }[]; whyUs?: { text: string }[] }>({})
  const [site, setSite] = useState<any>(null)

  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    mascota: "",
    servicio: "",
    mensaje: "",
  })
  const [errors, setErrors] = useState<{ nombre?: string; telefono?: string; mascota?: string }>({})

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const [secRes, siteRes] = await Promise.all([
          fetch('/api/whatsapp-appointment', { cache: 'no-store' }),
          fetch('/api/site-settings', { cache: 'no-store' }),
        ])
        const sec = secRes.ok ? await secRes.json() : null
        const site = siteRes.ok ? await siteRes.json() : null
        if (!mounted) return
        setSection(sec || {})
        setSite(site?.data || null)
      } catch {
        if (!mounted) return
      }
    })()
    return () => { mounted = false }
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Limpiar error del campo al escribir
    setErrors((prev) => (prev[field as keyof typeof prev] ? { ...prev, [field]: undefined } : prev))
  }

  const principalWhatsapp = useMemo(() => {
    const arr = site?.whatsapps || []
    return arr.find((w: any) => w.principal) || arr[0]
  }, [site])

  const handleWhatsAppSubmit = () => {
    const { nombre, telefono, mascota, servicio, mensaje } = formData

    const newErrors: typeof errors = {}
    if (!nombre.trim()) newErrors.nombre = "Este campo es obligatorio"
    if (!telefono.trim()) newErrors.telefono = "Este campo es obligatorio"
    if (!mascota.trim()) newErrors.mascota = "Este campo es obligatorio"
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) {
      const firstKey = Object.keys(newErrors)[0]
      // Enfocar primer campo con error
      const el = document.getElementById(firstKey)
      el?.focus()
      return
    }

    const whatsappMessage = `Hola, soy ${nombre}. 
📱 Teléfono: ${telefono}
🐾 Mascota: ${mascota}
${servicio ? `🛁 Servicio de interés: ${servicio}` : ""}
${mensaje ? `💬 Mensaje: ${mensaje}` : ""}

Me gustaría agendar una cita para mi mascota.`

    const numero = principalWhatsapp?.numero || '573154433109'
    const whatsappUrl = `https://wa.me/${numero}?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappUrl, "_blank")
  }
  const defaultMsg = site?.mensajeWhatsAppPorDefecto || 'Hola, vengo desde la web. Me gustaría agendar una cita para mi mascota.'
  const directWhatsAppUrl = principalWhatsapp?.numero
    ? `https://wa.me/${principalWhatsapp.numero}?text=${encodeURIComponent(defaultMsg)}`
    : undefined

  return (
    <section id="contacto" className="py-20 bg-brand-black">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white mb-4">
            {(section.title || '¿Agenda tu cita por ')}<span className="text-brand-yellow">{section.highlight || 'WhatsApp'}</span>{section.title?.endsWith('?') ? '' : '?'}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {section.description || 'Déjanos tus datos o escríbenos directo. Respondemos rápido.'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/10 backdrop-blur-md border-gray-700 py-6">
              <CardHeader>
                <CardTitle className="text-white font-heading text-2xl">Agenda tu Cita</CardTitle>
                <CardDescription className="text-gray-300">
                  Completa el formulario y te contactaremos por WhatsApp
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre" className="text-white">
                      Nombre *
                    </Label>
                    <Input
                      id="nombre"
                      placeholder="Tu nombre completo"
                      value={formData.nombre}
                      onChange={(e) => handleInputChange("nombre", e.target.value)}
                      aria-invalid={!!errors.nombre}
                      className={`bg-white/10 text-white placeholder:text-gray-400 ${errors.nombre ? 'border-red-500 focus-visible:ring-red-500' : 'border-gray-600'}`}
                    />
                    {errors.nombre && (<p className="text-red-400 text-sm">{errors.nombre}</p>)}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono" className="text-white">
                      Teléfono *
                    </Label>
                    <Input
                      id="telefono"
                      placeholder="Tu número de WhatsApp"
                      value={formData.telefono}
                      onChange={(e) => handleInputChange("telefono", e.target.value)}
                      aria-invalid={!!errors.telefono}
                      className={`bg-white/10 text-white placeholder:text-gray-400 ${errors.telefono ? 'border-red-500 focus-visible:ring-red-500' : 'border-gray-600'}`}
                    />
                    {errors.telefono && (<p className="text-red-400 text-sm">{errors.telefono}</p>)}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mascota" className="text-white">
                      Mascota *
                    </Label>
                    <Input
                      id="mascota"
                      placeholder="Nombre y raza de tu mascota"
                      value={formData.mascota}
                      onChange={(e) => handleInputChange("mascota", e.target.value)}
                      aria-invalid={!!errors.mascota}
                      className={`bg-white/10 text-white placeholder:text-gray-400 ${errors.mascota ? 'border-red-500 focus-visible:ring-red-500' : 'border-gray-600'}`}
                    />
                    {errors.mascota && (<p className="text-red-400 text-sm">{errors.mascota}</p>)}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="servicio" className="text-white">
                      Servicio de Interés
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("servicio", value)}>
                      <SelectTrigger className="bg-white/10 border-gray-600 text-white">
                        <SelectValue placeholder="Selecciona un servicio" />
                      </SelectTrigger>
                      <SelectContent>
                        {(section.services || []).map((s) => (
                          <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mensaje" className="text-white">
                    Mensaje Adicional
                  </Label>
                  <Textarea
                    id="mensaje"
                    placeholder="Cuéntanos algo especial sobre tu mascota o tus necesidades..."
                    value={formData.mensaje}
                    onChange={(e) => handleInputChange("mensaje", e.target.value)}
                    className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400 min-h-[100px]"
                  />
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={handleWhatsAppSubmit}
                    variant="outline"
                    className="w-full border-green-500 text-green-500 hover:bg-green-500 hover:text-white bg-transparent font-semibold text-lg py-3"
                    size="lg"
                  >
                    <MessageCircle className="mr-2 w-5 h-5" />
                    Enviar por WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-white space-y-6">
              <h3 className="font-heading text-2xl font-bold mb-6">Información de Contacto</h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-brand-yellow mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Ubicación</h4>
                    <p className="text-gray-300">
                      {site?.ubicacion?.ciudadPais || 'Bogotá, Colombia'}
                      {site?.ubicacion?.direccion ? (<><br />{site.ubicacion.direccion}</>) : (<><br />(Ubicación exacta por WhatsApp)</>)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-brand-yellow mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Horarios</h4>
                    <div className="text-gray-300 space-y-1">
                      {(site?.horarios || []).map((h: any, i: number) => (
                        <p key={i}>{h.dia}: {h.abre} - {h.cierra} {h.nota ? `(${h.nota})` : ''}</p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-brand-yellow mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">WhatsApp</h4>
                    <div className="text-gray-300 space-y-1">
                      {(site?.whatsapps || []).map((w: any, i: number) => (
                        <p key={i}>
                          {w.mostrar || w.numero}
                          {w.principal ? ' (Principal)' : ''}
                        </p>
                      ))}
                      <span className="text-sm text-gray-400 block">Respuesta rápida garantizada</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <h4 className="font-heading text-xl font-bold text-white mb-4">¿Por qué elegirnos?</h4>
              <ul className="space-y-3 text-gray-300">
                {(section.whyUs || []).map((i, idx) => (
                  <li key={idx} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-brand-yellow rounded-full"></div>
                    <span>{i.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
