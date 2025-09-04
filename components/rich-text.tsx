"use client"

type Node = any

function renderNodes(nodes: Node[]): string {
  if (!Array.isArray(nodes)) return ''
  return nodes
    .map((n) => {
      if (n.type === 'paragraph') {
        const inner = renderNodes(n.children || [])
        return `<p>${inner}</p>`
      }
      if (n.type === 'text') {
        return (n.text || '')
      }
      if (n.type === 'heading') {
        const lvl = n.tag || 'h2'
        const inner = renderNodes(n.children || [])
        return `<${lvl}>${inner}</${lvl}>`
      }
      if (n.children) return renderNodes(n.children)
      return ''
    })
    .join('')
}

export function RichText({ value }: { value: any }) {
  const html = value?.root ? renderNodes(value.root.children || []) : ''
  return <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
}
