import { getPayload } from 'payload'
import config from '@/payload.config'

// Inicializa Payload apuntando a la DB remota (según tu payload.config.ts)
// y fuerza una lectura mínima para que el adaptador cree el esquema si no existe.
// Se puede ejecutar de forma segura múltiples veces.

async function main() {
  try {
    const payload = await getPayload({ config })
    // Leer varias colecciones/globals para asegurar la creación de tablas relacionadas
    try { await (payload as any).find({ collection: 'posts', limit: 1 }) } catch {}
    try { await (payload as any).find({ collection: 'media', limit: 1 }) } catch {}
    try { await (payload as any).find({ collection: 'users', limit: 1 }) } catch {}
    try { await (payload as any).findGlobal({ slug: 'siteSettings' }) } catch {}
    try { await (payload as any).findGlobal({ slug: 'header' }) } catch {}
    try { await (payload as any).findGlobal({ slug: 'homeHero' }) } catch {}
    try { await (payload as any).findGlobal({ slug: 'whatIsSpa' }) } catch {}
    try { await (payload as any).findGlobal({ slug: 'certifications' }) } catch {}
    try { await (payload as any).findGlobal({ slug: 'productsCollaborations' }) } catch {}
    try { await (payload as any).findGlobal({ slug: 'spaExperience' }) } catch {}
    try { await (payload as any).findGlobal({ slug: 'michiFriendly' }) } catch {}
    try { await (payload as any).findGlobal({ slug: 'gallery' }) } catch {}
    try { await (payload as any).findGlobal({ slug: 'testimonials' }) } catch {}
    try { await (payload as any).findGlobal({ slug: 'clients' }) } catch {}
    try { await (payload as any).findGlobal({ slug: 'storeLocation' }) } catch {}
    try { await (payload as any).findGlobal({ slug: 'blogSection' }) } catch {}
    try { await (payload as any).findGlobal({ slug: 'blogPage' }) } catch {}
    try { await (payload as any).findGlobal({ slug: 'whatsAppAppointment' }) } catch {}
    try { await (payload as any).findGlobal({ slug: 'footer' }) } catch {}
    try { await (payload as any).findGlobal({ slug: 'dogsPage' }) } catch {}
    try { await (payload as any).findGlobal({ slug: 'catsPage' }) } catch {}
    console.log('Remote schema init attempted. If tables were missing, they should be created now.')
  } catch (e) {
    console.error('Failed to init remote schema:', e)
    process.exit(1)
  }
}

main().then(() => process.exit(0))
