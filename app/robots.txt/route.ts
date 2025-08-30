export function GET() {
  return new Response(
    `User-agent: *
Allow: /

Sitemap: https://sanroque.com/sitemap.xml`,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    },
  )
}
