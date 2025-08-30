import { withPayload } from "@payloadcms/next/withPayload";
// Permitir Server Actions detrás de proxy (Codespaces) evitando error de X-Forwarded-Host vs Origin
const allowedOrigins = ["localhost:3000"];
if (process.env.NEXT_ALLOWED_ORIGINS) {
  allowedOrigins.push(
    ...process.env.NEXT_ALLOWED_ORIGINS.split(',').map(s => s.trim()).filter(Boolean)
  )
}
if (process.env.CODESPACE_NAME && process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN) {
  allowedOrigins.push(
    `${process.env.CODESPACE_NAME}-3000.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`,
  );
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default withPayload(nextConfig)
