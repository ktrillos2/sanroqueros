"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Send, MapPin, Clock, Phone } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    mascota: "",
    servicio: "",
    mensaje: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleWhatsAppSubmit = () => {
    const { nombre, telefono, mascota, servicio, mensaje } = formData

    if (!nombre || !telefono || !mascota) {
      alert("Por favor completa los campos obligatorios: Nombre, Teléfono y Mascota")
      return
    }

    const whatsappMessage = `Hola, soy ${nombre}. 
📱 Teléfono: ${telefono}
🐾 Mascota: ${mascota}
${servicio ? `🛁 Servicio de interés: ${servicio}` : ""}
${mensaje ? `💬 Mensaje: ${mensaje}` : ""}

Me gustaría agendar una cita para mi mascota.`

    const whatsappUrl = `https://wa.me/573154433109?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappUrl, "_blank")
  }

  const directWhatsAppUrl =
    "https://wa.me/573154433109?text=Hola,%20vengo%20desde%20la%20web.%20Me%20gustaría%20agendar%20una%20cita%20para%20mi%20mascota."

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
            ¿Agenda tu cita por <span className="text-brand-yellow">WhatsApp</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Déjanos tus datos o escríbenos directo. Respondemos rápido.
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
            <Card className="bg-white/10 backdrop-blur-md border-gray-700">
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
                      className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400"
                    />
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
                      className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400"
                    />
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
                      className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400"
                    />
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
                        <SelectItem value="spa-completo">Spa Completo</SelectItem>
                        <SelectItem value="bano-basico">Baño Básico</SelectItem>
                        <SelectItem value="ozonoterapia">Ozonoterapia</SelectItem>
                        <SelectItem value="masajes">Masajes Terapéuticos</SelectItem>
                        <SelectItem value="consulta">Solo consulta</SelectItem>
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
                    className="w-full bg-brand-yellow hover:bg-yellow-400 text-black font-semibold text-lg py-3"
                    size="lg"
                  >
                    <Send className="mr-2 w-5 h-5" />
                    Enviar por WhatsApp
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-green-500 text-green-400 hover:bg-green-500 hover:text-white bg-transparent"
                    size="lg"
                  >
                    <a href={directWhatsAppUrl} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 w-5 h-5" />
                      Abrir Chat Directo
                    </a>
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
                      Bogotá, Colombia
                      <br />
                      (Ubicación exacta por WhatsApp)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-brand-yellow mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Horarios</h4>
                    <p className="text-gray-300">
                      Lunes a Sábado: 8:00 AM - 6:00 PM
                      <br />
                      Domingos: 9:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-brand-yellow mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">WhatsApp</h4>
                    <p className="text-gray-300">
                      +57 315 443 3109
                      <br />
                      <span className="text-sm text-gray-400">Respuesta rápida garantizada</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <h4 className="font-heading text-xl font-bold text-white mb-4">¿Por qué elegirnos?</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-yellow rounded-full"></div>
                  <span>Productos premium importados</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-yellow rounded-full"></div>
                  <span>Técnicas Fear Free certificadas</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-yellow rounded-full"></div>
                  <span>Atención personalizada para perros y gatos</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-yellow rounded-full"></div>
                  <span>Reconocidos como el mejor spa</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
