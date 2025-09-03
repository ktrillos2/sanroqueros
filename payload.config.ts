// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import SiteSettings from './globals/SiteSettings'
import HeaderGlobal from './globals/Header'
import HomeHeroGlobal from './globals/HomeHero'
import WhatIsSpaGlobal from './globals/WhatIsSpa'
import CertificationsGlobal from './globals/Certifications'
import { es } from '@payloadcms/translations/languages/es'
// Nota: Payload v3 no expone admin.i18n en el config de forma estable.
// Usaremos una inyección ligera de script para forzar 'es' en el admin.

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.CODESPACE_NAME && process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN
      ? `https://${process.env.CODESPACE_NAME}-3000.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`
      : 'http://localhost:3000'),
  admin: {
    user: Users.slug,
    importMap: {
      // Base del import map al folder del admin para que los paths relativos queden correctos
      baseDir: path.resolve(dirname, 'app/(payload)/admin'),
    },
    // i18n del Admin en Español

    autoLogin: process.env.NODE_ENV !== 'production' && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD
      ? {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        prefillOnly: false,
      }
      : undefined,
  } as any,
  collections: [Users, Media],
  i18n: {
    supportedLanguages: { es },
  },
  globals: [SiteSettings, HeaderGlobal, HomeHeroGlobal, WhatIsSpaGlobal, CertificationsGlobal],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
