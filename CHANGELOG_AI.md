# Registro de Cambios - CHANGELOG_AI

## [2026-09-24] - Lanzamiento Nueva Sede y Nuevo Servicio OzoneGlow

### Agregado
- **Sección de Nueva Sede (`components/new-headquarters-section.tsx`):**
  - Presentación de la apertura de la nueva sede en **Calle 118 #15 - 45**, Bogotá.
  - Teléfono directo y WhatsApp: **312 3114435** (+57 312 311 4435).
  - Botones de acción directa: Enlace a Google Maps, copiar dirección al portapapeles con feedback visual, llamada telefónica y chat de WhatsApp con mensaje personalizado.
  - Indicadores de comodidades: Horarios, parqueadero disponible y ambiente 100% libre de jaulas (Fear Free).
  - Diseño centrado y limpio sin imagen, enfocado en información y llamada a la acción.
  - **Optimización Integral de Contrastes:** Eliminación de nieblas/orbes grises de fondo, fondo negro profundo (`bg-black`), tipografía de alto contraste con resaltados amarillos vibrantes (`#FFE550`) y rosas (`#FFB1BE`), y corrección de botones para eliminar textos blancos sobre fondos blancos o desvanecidos.

- **Sección de Nuevo Servicio OzoneGlow (`components/ozone-glow-section.tsx`):**
  - Módulo interactivo con el estilo de la web para **✨ NUEVO: OZONEGLOW (Vapor + Ozono + Cromoterapia)**.
  - 3 tarjetas de pilares dinámicos:
    - 💨 **Vapor Hidratante:** Humedad al manto y potenciador de cosmética.
    - 🫧 **Ozono Terapéutico:** Higiene, purificación y cuidado de piel y pelaje.
    - 🌈 **Cromoterapia Relajante:** Relajación, disminución de ansiedad y bienestar sensorial.
  - Cita destacada: *"Es una excelente opción para complementar el servicio y brindar un extra de hidratación, acondicionamiento y bienestar durante el grooming."*
  - Imagen fotográfica de alta resolución del tratamiento spa (`/images/ozone-glow-spa.jpg`).
  - Botón de reserva directa a WhatsApp al **312 3114435**.

### Actualizado
- **Rediseño de Servicios SanRoquero y Rockstar (`app/perros/page.tsx` y `app/gatos/page.tsx`):**
  - Actualización completa de la información textual exacta:
    - **🐾 SanRoquero:** Subtítulo *"El cuidado esencial de SanRoque"*, descripción con cosmética Velox, checklist completa de 6 ítems con Hydra Extra Soft Facial Shampoo, y etiqueta de exclusión destacada *"No incluye corte de peluquería ni sesiones de desenredo."*
    - **⭐ Rockstar:** Subtítulo *"Grooming + cuidado integral"*, combinación de cosmética Velox + Pelunos, bloque de proceso de doble baño y grooming, y checklist completa de inclusiones.
  - Transformación del grid visual: Reemplazo del formato apretado de 4 columnas por un diseño espacioso y lujoso de 2 columnas (`grid md:grid-cols-2 gap-8 max-w-6xl mx-auto`).
  - Tarjetas con acabado premium: degradados oscuros, bordes con glow temático por servicio, microinteracciones `hover:scale-[1.01]`, insignias de cosmética y botones de agendamiento directo a WhatsApp al **312 3114435**.
- **Optimización de Rendimiento y SSR (`lib/site-settings.ts` y `components/footer.tsx`):**
  - Implementación de mecanismo de timeout preventivo de 2 segundos en consultas a Turso/Payload para garantizar que ninguna página se bloquee ante latencia de red.
- **Página de Inicio (`app/page.tsx`):**
  - Inclusión de las dos nuevas secciones: `NewHeadquartersSection` tras el Hero y `OzoneGlowSection` complementando la experiencia spa.
- **Sección de Ubicación (`components/store-location-section.tsx`):**
  - Actualización de la dirección a **Calle 118 #15 - 45**, teléfono **312 3114435** y enlace de Google Maps.
- **Sección de Contacto (`components/contact-section.tsx`):**
  - Actualización de dirección y teléfono principal.
  - Inclusión de **OzoneGlow Spa** en el selector de servicios de interés.
- **Pie de Página (`components/footer.tsx`):**
  - Actualización de dirección y WhatsApp a la nueva sede.
- **Botón Flotante de WhatsApp (`components/floating-whatsapp-button.tsx`):**
  - Número de contingencia configurado a **573123114435**.
- **Configuración de CMS (`globals/SiteSettings.ts`, `globals/StoreLocation.ts`, `globals/SpaExperience.ts`, `globals/DogsPage.ts`, `globals/CatsPage.ts`):**
  - Esquemas y valores por defecto sincronizados con los nuevos campos de servicios (subtítulos, procesos, cosmética y exclusiones).
