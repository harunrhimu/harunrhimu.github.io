import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Mermaid from './Mermaid'

const components = {
  h1: ({ children }) => (
    <h1 className="heading-md text-heading mt-10 mb-5 first:mt-0">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold text-heading mt-12 mb-4 pb-2 border-b border-line/40">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold text-heading mt-8 mb-3">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-lg font-semibold text-accent-soft mt-6 mb-2">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="text-body leading-relaxed my-4">{children}</p>
  ),
  a: ({ href, children }) => (
    <a href={href} className="text-accent hover:text-accent-soft underline underline-offset-2" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="text-heading font-semibold">{children}</strong>,
  em: ({ children }) => <em className="text-body italic">{children}</em>,
  ul: ({ children }) => (
    <ul className="my-4 space-y-2 list-disc pl-5 marker:text-accent text-body">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 space-y-2 list-decimal pl-5 marker:text-accent marker:font-semibold text-body">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed pl-1">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-4 border-brand-500/60 bg-brand-500/5 rounded-r-xl px-5 py-3 text-body [&_p]:my-1">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-line/40" />,
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-line/40">
      <table className="w-full text-sm text-left border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-inset/60">{children}</thead>,
  th: ({ children }) => (
    <th className="px-4 py-3 font-semibold text-heading border-b border-line/40 whitespace-nowrap">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-body border-b border-line/30 align-top">{children}</td>
  ),
  tr: ({ children }) => <tr className="even:bg-inset/20">{children}</tr>,
  code: ({ className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '')
    const lang = match ? match[1] : ''
    const text = String(children).replace(/\n$/, '')

    if (lang === 'mermaid') {
      return <Mermaid chart={text} />
    }

    // react-markdown v9 removed the `inline` prop: a real code block is fenced
    // (has a language class) or spans multiple lines. Everything else is inline.
    const isBlock = !!match || /\n/.test(text)
    if (!isBlock) {
      return (
        <code className="px-1.5 py-0.5 rounded-md bg-inset/70 border border-line/40 text-accent-soft text-[0.85em] font-mono" {...props}>
          {children}
        </code>
      )
    }

    return (
      <div className="my-6 rounded-xl overflow-hidden border border-line/40 bg-card/70">
        {lang && (
          <div className="px-4 py-2 text-xs font-mono text-muted border-b border-line/40 bg-inset/40">
            {lang}
          </div>
        )}
        <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="font-mono text-body" {...props}>{children}</code>
        </pre>
      </div>
    )
  },
}

export default function Markdown({ children }) {
  return (
    <div className="max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  )
}
