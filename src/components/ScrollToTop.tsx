import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    /* Instant avoids races with child effects and prevents landing mid-page after navigation */
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
