import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

/* Mermaid holds ONE global config, so the active theme is tracked here and the
   library is re-initialised whenever it changes. Diagrams then re-render. */
let initializedFor = null

function currentTheme() {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
}

const THEME_VARS = {
  dark: {
    background: 'transparent',
    primaryColor: '#1e293b',
    primaryTextColor: '#e2e8f0',
    primaryBorderColor: '#334155',
    lineColor: '#64748b',
    secondaryColor: '#0f172a',
    tertiaryColor: '#0f172a',
  },
  light: {
    background: 'transparent',
    primaryColor: '#eef1f5',
    primaryTextColor: '#0f172a',
    primaryBorderColor: '#cbd5e1',
    lineColor: '#64748b',
    secondaryColor: '#f7f8fa',
    tertiaryColor: '#ffffff',
  },
}

function initMermaid(theme) {
  if (initializedFor === theme) return
  mermaid.initialize({
    startOnLoad: false,
    theme: theme === 'dark' ? 'dark' : 'default',
    securityLevel: 'loose',
    fontFamily: 'inherit',
    themeVariables: THEME_VARS[theme],
  })
  initializedFor = theme
}

let idCounter = 0

export default function Mermaid({ chart }) {
  const ref = useRef(null)
  const [svg, setSvg] = useState('')
  const [error, setError] = useState(false)
  const [theme, setTheme] = useState(currentTheme)

  // Re-render diagrams when the site theme flips.
  useEffect(() => {
    const root = document.documentElement
    const obs = new MutationObserver(() => {
      const next = currentTheme()
      setTheme((prev) => (prev === next ? prev : next))
    })
    obs.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    let cancelled = false
    setError(false)
    // force a re-init when the theme changed since the last render
    initializedFor = initializedFor === theme ? theme : null
    initMermaid(theme)
    const id = `mermaid-${idCounter++}`
    mermaid
      .render(id, chart)
      .then(({ svg }) => {
        if (!cancelled) setSvg(svg)
      })
      .catch(() => {
        if (!cancelled) setError(true)
      })
    return () => {
      cancelled = true
    }
  }, [chart, theme])

  if (error) {
    return (
      <pre className="text-xs text-muted overflow-x-auto p-4 rounded-xl bg-card/60 border border-line/40">
        {chart}
      </pre>
    )
  }

  return (
    <div
      ref={ref}
      className="my-6 flex justify-center overflow-x-auto rounded-2xl border border-line/40 bg-card/40 p-4 [&_svg]:max-w-full [&_svg]:h-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
