import { useEffect, useState } from 'react'
import { applyTheme, resolveTheme } from '../utils/theme'

export default function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState(() =>
    typeof document !== 'undefined'
      ? document.documentElement.getAttribute('data-theme') || resolveTheme()
      : resolveTheme()
  )

  // Keep React in sync with whatever the boot script already put on <html>.
  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme')
    if (current && current !== theme) setTheme(current)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = () => setTheme(applyTheme(theme === 'dark' ? 'light' : 'dark'))

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-line text-muted hover:text-accent hover:border-accent/40 hover:bg-accent-fill/5 transition-all ${className}`}
    >
      {isDark ? (
        /* moon — currently dark, click for light */
        <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      ) : (
        /* sun — currently light, click for dark */
        <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      )}
    </button>
  )
}
