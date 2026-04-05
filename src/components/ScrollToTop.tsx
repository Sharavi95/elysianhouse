import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function scrollToElementByHash(hash: string) {
  if (!hash || hash.length < 2) return false
  const id = decodeURIComponent(hash.slice(1))
  const el = document.getElementById(id)
  if (!el) return false
  el.scrollIntoView({ behavior: 'instant' })
  return true
}

export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash && scrollToElementByHash(hash)) {
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
