"use client"

type Node = any

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function renderTextNode(n: any): string {
  let txt = escapeHtml(n.text || '')
  // Payload Lexical may set boolean marks or use format flags; handle booleans first
  if (n.bold) txt = `<strong>${txt}</strong>`
  if (n.italic) txt = `<em>${txt}</em>`
  if (n.underline) txt = `<u>${txt}</u>`
  if (n.strikethrough) txt = `<s>${txt}</s>`
  if (n.code) txt = `<code>${txt}</code>`
  return txt
}

function renderNodes(nodes: Node[]): string {
  if (!Array.isArray(nodes)) return ''
  return nodes
    .map((n) => {
      if (n.type === 'paragraph') {
        const inner = renderNodes(n.children || [])
        return `<p>${inner}</p>`
      }
      if (n.type === 'text') {
        return renderTextNode(n)
      }
      if (n.type === 'heading') {
        const lvl = n.tag || 'h2'
        const inner = renderNodes(n.children || [])
        return `<${lvl}>${inner}</${lvl}>`
      }
      if (n.type === 'upload' && (n.relationTo === 'media' || n.relationTo === 'Media')) {
        const v = n.value || {}
        const src = v?.url ? escapeHtml(v.url) : ''
        const alt = v?.alt ? escapeHtml(v.alt) : ''
        const caption = v?.caption ? `<figcaption>${escapeHtml(v.caption)}</figcaption>` : ''
        // Campos personalizados de UploadFeature en el nodo:
        const widthPercent = n.fields?.widthPercent || n.widthPercent || '100'
        const heightPx = n.fields?.heightPx || n.heightPx
        const align = n.fields?.align || n.align || 'center'
        const widthStyle = widthPercent ? `max-width:${Number(widthPercent)}%;` : ''
        const heightStyle = heightPx ? `height:${Number(heightPx)}px;` : ''
        const marginStyle = align === 'left' ? 'margin: 1rem auto 1rem 0;' : align === 'right' ? 'margin: 1rem 0 1rem auto;' : 'margin: 1.25rem auto;'
        const figureStyle = `${marginStyle} ${widthStyle}`.trim()
        const imgStyle = `${heightStyle}`.trim()
        if (!src) return ''
        return `<figure style="${figureStyle}"><img src="${src}" alt="${alt}" style="${imgStyle}" />${caption}</figure>`
      }
      if (n.type === 'image' && (n.src || n.fields?.src)) {
        const src = escapeHtml(n.src || n.fields?.src)
        const alt = escapeHtml(n.altText || n.fields?.alt || '')
        return `<figure><img src="${src}" alt="${alt}" /></figure>`
      }
      if (n.type === 'list') {
        const tag = n.listType === 'number' || n.tag === 'ol' ? 'ol' : 'ul'
        const inner = renderNodes(n.children || [])
        return `<${tag}>${inner}</${tag}>`
      }
      if (n.type === 'listitem' || n.type === 'listItem') {
        const inner = renderNodes(n.children || [])
        return `<li>${inner}</li>`
      }
      if (n.type === 'quote') {
        const inner = renderNodes(n.children || [])
        return `<blockquote>${inner}</blockquote>`
      }
      if (n.type === 'link' && (n.fields?.url || n.url)) {
        const url = escapeHtml(n.fields?.url || n.url)
        const inner = renderNodes(n.children || [])
        const target = n.fields?.newTab || n.newTab ? '_blank' : '_self'
        const rel = target === '_blank' ? 'noopener noreferrer' : ''
        return `<a href="${url}" target="${target}" rel="${rel}">${inner}</a>`
      }
      if (n.type === 'linebreak' || n.type === 'lineBreak') {
        return '<br />'
      }
      if (n.type === 'horizontalrule' || n.type === 'hr') {
        return '<hr />'
      }
      if (n.children) return renderNodes(n.children)
      return ''
    })
    .join('')
}

export function RichText({ value }: { value: any }) {
  const html = value?.root ? renderNodes(value.root.children || []) : ''
  return (
    <div
  className="prose prose-invert max-w-none text-white prose-headings:text-white prose-p:text-white prose-li:text-white prose-a:text-brand-yellow hover:prose-a:text-yellow-300 prose-img:rounded-xl prose-img:mx-auto prose-figcaption:text-gray-400"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
