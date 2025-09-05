// storage-adapter-import-placeholder
import { s3Storage } from '@payloadcms/storage-s3'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor, UploadFeature } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import SiteSettings from './globals/SiteSettings'
import HeaderGlobal from './globals/Header'
import HomeHeroGlobal from './globals/HomeHero'
import WhatIsSpaGlobal from './globals/WhatIsSpa'
import CertificationsGlobal from './globals/Certifications'
import ProductsCollaborationsGlobal from './globals/ProductsCollaborations'
import SpaExperienceGlobal from './globals/SpaExperience'
import MichiFriendlyGlobal from './globals/MichiFriendly'
import GalleryGlobal from './globals/Gallery'
import TestimonialsGlobal from './globals/Testimonials'
import ClientsGlobal from './globals/Clients'
import StoreLocationGlobal from './globals/StoreLocation'
import BlogSectionGlobal from './globals/BlogSection'
import BlogPageGlobal from './globals/BlogPage'
import WhatsAppAppointmentGlobal from './globals/WhatsAppAppointment'
import FooterGlobal from './globals/Footer'
import DogsPage from './globals/DogsPage'
import CatsPage from './globals/CatsPage'
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
  collections: [Users, Media, Posts],
  i18n: {
    supportedLanguages: { es },
  },
  globals: [SiteSettings, HeaderGlobal, HomeHeroGlobal, WhatIsSpaGlobal, CertificationsGlobal, ProductsCollaborationsGlobal, SpaExperienceGlobal, MichiFriendlyGlobal, GalleryGlobal, TestimonialsGlobal, StoreLocationGlobal, BlogSectionGlobal, BlogPageGlobal, WhatsAppAppointmentGlobal, FooterGlobal, DogsPage, CatsPage],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      UploadFeature({
        collections: {
          media: {
            fields: [
              { name: 'caption', type: 'text', label: 'Pie de foto', required: false },
              {
                name: 'widthPercent',
                type: 'select',
                label: 'Ancho',
                defaultValue: '100',
                options: [
                  { label: '25%', value: '25' },
                  { label: '33%', value: '33' },
                  { label: '50%', value: '50' },
                  { label: '66%', value: '66' },
                  { label: '75%', value: '75' },
                  { label: '100%', value: '100' },
                ],
              },
              { name: 'heightPx', type: 'number', label: 'Alto (px, opcional)', required: false },
              {
                name: 'align',
                type: 'select',
                label: 'Alineación',
                defaultValue: 'center',
                options: [
                  { label: 'Izquierda', value: 'left' },
                  { label: 'Centro', value: 'center' },
                  { label: 'Derecha', value: 'right' },
                ],
              },
            ],
          },
        },
      }),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    // Para Turso/libSQL se debe pasar el cliente como objeto.
    // Si no hay variables, hacemos fallback a un archivo local.
    client:  {
          url: 'libsql://sanroqueros-ktrillos2.aws-us-east-1.turso.io',
          authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NTcwMzgwMDEsImlkIjoiN2FhNjE1NDctMzlkNy00ODljLWIwNzMtZjk3Y2ZmZjlkZWEzIiwicmlkIjoiNzExOWRmYzAtNTE4Ny00NDQyLWIzZGQtMzNlNTYxYTc5M2E5In0.zwvJyOE2SiQQv1H_IcHx0qhGuRFCm_fGghgPQTuWQslxHhEW5XBx9bEMhiJUbVVamWsARAQ7PCPXcXkJtoHLCA',
        },
  } as any),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
    ...(process.env.S3_BUCKET && (process.env.AWS_ACCESS_KEY_ID || process.env.R2_ACCESS_KEY_ID)
      ? [
          s3Storage({
            collections: {
              media: {
                bucket: process.env.S3_BUCKET as string,
                prefix: 'media',
                acl: 'public-read' as any,
                config: {
                  // Soporta AWS S3, R2 (Cloudflare) o MinIO vía endpoint
                  region: process.env.S3_REGION,
                  endpoint: process.env.S3_ENDPOINT,
                  credentials: {
                    accessKeyId:
                      (process.env.AWS_ACCESS_KEY_ID || process.env.R2_ACCESS_KEY_ID) as string,
                    secretAccessKey:
                      (process.env.AWS_SECRET_ACCESS_KEY || process.env.R2_SECRET_ACCESS_KEY) as string,
                  },
                },
              },
            },
          }),
        ]
      : []),
  ],
})
