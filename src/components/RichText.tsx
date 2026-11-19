import React from 'react'

export interface LexicalNode {
  type?: string
  text?: string
  format?: number | string
  tag?: string
  listType?: 'bullet' | 'number'
  value?: number
  url?: string
  target?: string
  children?: LexicalNode[]
  [key: string]: unknown
}

export interface RichTextProps {
  content: { root?: LexicalNode | Record<string, unknown> } | null | undefined
  className?: string
}

export function RichText({ content, className = '' }: RichTextProps) {
  if (!content || !content.root) {
    return null
  }

  const root = content.root as LexicalNode
  if (!root.children || !Array.isArray(root.children)) {
    return null
  }

  return (
    <div className={`prose prose-slate max-w-none ${className}`}>
      {root.children.map((node, index) => (
        <RenderNode key={index} node={node} />
      ))}
    </div>
  )
}

function RenderNode({ node }: { node: LexicalNode }): React.ReactNode {
  if (!node) return null

  // Plain text node
  if (node.type === 'text' || typeof node.text === 'string') {
    let element: React.ReactNode = node.text || ''

    // Bitwise format flags in Lexical if numeric:
    // 1 = bold, 2 = italic, 4 = strikethrough, 8 = underline, 16 = code
    const format = typeof node.format === 'number' ? node.format : 0
    if (format & 1) element = <strong>{element}</strong>
    if (format & 2) element = <em>{element}</em>
    if (format & 4) element = <del>{element}</del>
    if (format & 8) element = <u>{element}</u>
    if (format & 16) element = <code className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-sm">{element}</code>

    return element
  }

  // Heading nodes
  if (node.type === 'heading') {
    const Tag = (node.tag || 'h2') as keyof React.JSX.IntrinsicElements
    const classes: Record<string, string> = {
      h1: 'text-3xl font-extrabold text-slate-900 mt-8 mb-4 tracking-tight',
      h2: 'text-2xl font-bold text-slate-900 mt-6 mb-3 tracking-tight',
      h3: 'text-xl font-bold text-slate-900 mt-5 mb-2',
      h4: 'text-lg font-semibold text-slate-900 mt-4 mb-2',
      h5: 'text-base font-semibold text-slate-800 mt-3 mb-1',
      h6: 'text-sm font-semibold uppercase tracking-wider text-slate-700 mt-3 mb-1',
    }
    return (
      <Tag className={classes[node.tag || 'h2'] || classes.h2}>
        {node.children?.map((child, i) => (
          <RenderNode key={i} node={child} />
        ))}
      </Tag>
    )
  }

  // Paragraph
  if (node.type === 'paragraph') {
    if (!node.children || node.children.length === 0) {
      return <p className="mb-4">&nbsp;</p>
    }
    return (
      <p className="mb-4 leading-relaxed text-slate-600">
        {node.children.map((child, i) => (
          <RenderNode key={i} node={child} />
        ))}
      </p>
    )
  }

  // Lists
  if (node.type === 'list') {
    if (node.listType === 'number') {
      return (
        <ol className="list-decimal pl-6 mb-4 space-y-1 text-slate-600">
          {node.children?.map((child, i) => (
            <RenderNode key={i} node={child} />
          ))}
        </ol>
      )
    }
    return (
      <ul className="list-disc pl-6 mb-4 space-y-1 text-slate-600">
        {node.children?.map((child, i) => (
          <RenderNode key={i} node={child} />
        ))}
      </ul>
    )
  }

  if (node.type === 'listitem') {
    return (
      <li className="leading-relaxed">
        {node.children?.map((child, i) => (
          <RenderNode key={i} node={child} />
        ))}
      </li>
    )
  }

  // Quote
  if (node.type === 'quote') {
    return (
      <blockquote className="border-l-4 border-emerald-500 pl-4 py-1 italic my-4 text-slate-700 bg-emerald-50/50 rounded-r">
        {node.children?.map((child, i) => (
          <RenderNode key={i} node={child} />
        ))}
      </blockquote>
    )
  }

  // Link
  if (node.type === 'link') {
    return (
      <a
        href={node.url || '#'}
        target={node.target || '_self'}
        rel={node.target === '_blank' ? 'noopener noreferrer' : undefined}
        className="text-emerald-600 hover:text-emerald-700 underline font-medium"
      >
        {node.children?.map((child, i) => (
          <RenderNode key={i} node={child} />
        ))}
      </a>
    )
  }

  // Fallback for nested children
  if (node.children) {
    return (
      <>
        {node.children.map((child, i) => (
          <RenderNode key={i} node={child} />
        ))}
      </>
    )
  }

  return null
}
