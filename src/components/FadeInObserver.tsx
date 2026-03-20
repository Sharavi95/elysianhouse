import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function FadeInObserver() {
  const { pathname } = useLocation()

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.fade-in')
    elements.forEach((el, index) => {
      el.classList.remove('visible')
      el.style.transitionDelay = `${index * 0.1}s`
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.12 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  return null
}
