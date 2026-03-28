import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <Link to="/" className="nav-logo">
        Elysian House
      </Link>
      <ul className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}>
        <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>
        {/* <li>
          <NavLink to="/about">About</NavLink>
        </li> */}
        <li>
          <NavLink to="/services">Gatherings</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        <li className="nav-mobile-cta-item">
          <Link to="/contact" className="nav-mobile-cta">
            Join a Gathering
          </Link>
        </li>
      </ul>
      <Link to="/contact" className="nav-cta">
        Join a Gathering
      </Link>
      <button
        type="button"
        className="hamburger"
        aria-label="Toggle mobile menu"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  )
}
