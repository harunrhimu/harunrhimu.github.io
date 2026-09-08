/* Theme state. Single source of truth for which palette is active.
   The initial value is applied by an inline script in index.html BEFORE
   first paint — see THEME_BOOT there — so the page never flashes. */

export const THEMES = ['light', 'dark']

/* Change this one string to flip which theme new visitors land on. */
export const DEFAULT_THEME = 'light'

const STORAGE_KEY = 'harun-theme'

export function getStoredTheme() {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return THEMES.includes(v) ? v : null
  } catch {
    return null   // private mode / blocked storage
  }
}

export function getSystemTheme() {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  } catch {
    return DEFAULT_THEME
  }
}

/* Stored choice wins; otherwise fall back to DEFAULT_THEME. */
export function resolveTheme() {
  return getStoredTheme() ?? DEFAULT_THEME
}

export function applyTheme(theme) {
  const next = THEMES.includes(theme) ? theme : DEFAULT_THEME
  const root = document.documentElement

  // damp the repaint so the swap does not strobe
  root.classList.add('theme-transition')
  root.setAttribute('data-theme', next)

  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', next === 'dark' ? '#080d1a' : '#f8f7f4')

  try { localStorage.setItem(STORAGE_KEY, next) } catch { /* non-fatal */ }

  window.setTimeout(() => root.classList.remove('theme-transition'), 240)
  return next
}
