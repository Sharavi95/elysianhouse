import { Link } from 'react-router-dom'

const SOCIAL_LINKS = [
  {
    href: 'https://www.instagram.com/elysianhouse/',
    label: 'Instagram',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M12 2.163c3.204 0 3.584.012 4.85.071 1.366.085 2.633.64 3.611 1.618.978.978 1.533 2.245 1.618 3.611.059 1.266.071 1.646.071 4.85s-.012 3.584-.071 4.85c-.085 1.366-.64 2.633-1.618 3.611-.978.978-2.245 1.533-3.611 1.618-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.085-2.633-.64-3.611-1.618-.978-.978-1.533-2.245-1.618-3.611-.059-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.085-1.366.64-2.633 1.618-3.611.978-.978 2.245-1.533 3.611-1.618 1.266-.059 1.646-.071 4.85-.071zm0-2.163c-3.259 0-3.667.014-4.947.072-2.873.132-5.437 1.722-6.567 4.492-.959 2.344-.959 7.059 0 9.403 1.13 2.77 3.694 4.36 6.567 4.492 1.28.058 1.688.072 4.947.072s3.668-.014 4.947-.072c2.873-.132 5.437-1.722 6.567-4.492.959-2.344.959-7.059 0-9.403-1.13-2.77-3.694-4.36-6.567-4.492-1.279-.058-1.688-.072-4.947-.072zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 1-2.881 0 1.44 1.44 0 0 1 2.881 0z"
        />
      </svg>
    ),
  },
  {
    href: 'https://www.youtube.com/@elysianhouse',
    label: 'YouTube',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
        />
      </svg>
    ),
  },
  {
    href: 'https://www.tiktok.com/@elysianzita',
    label: 'TikTok',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 1 1-2.131-2.818v-3.471a6.318 6.318 0 1 0 5.576 6.282V7.401a8.169 8.169 0 0 0 4.77 1.538v-3.25a4.84 4.84 0 0 1-1-.185z"
        />
      </svg>
    ),
  },
] as const

export function Footer() {
  return (
    <>
      <footer>
        <div className="footer-brand">
          <Link className="nav-logo" to="/">
            Elysian House
          </Link>
          <p>
            A reflective space for women to slow down, reconnect, and return to the truth
            of who they are.
          </p>
        </div>
        <div className="footer-col">
          <p className="footer-col-title">Navigate</p>
          <ul className="footer-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            {/* <li>
              <Link to="/about">About</Link>
            </li> */}
            <li>
              <Link to="/services">Gatherings</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <p className="footer-col-title">Offerings</p>
          <ul className="footer-links">
            <li>
              <Link to="/services">Curated Events</Link>
            </li>
            <li>
              <Link to="/services">Inner Circles</Link>
            </li>
            <li>
              <Link to="/services">One-on-One Reflection Sessions</Link>
            </li>
          </ul>
        </div>
        <div className="footer-col footer-col--connect">
          <p className="footer-col-title">Connect</p>
          <ul className="footer-links">
            {SOCIAL_LINKS.map(({ href, label, icon }) => (
              <li key={href}>
                <a
                  className="footer-connect-link"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="footer-connect-icon">{icon}</span>
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
      <div className="footer-bottom">
        <p>© 2026 Elysian House. All rights reserved.</p>
        <p>Crafted with presence by Sharavi</p>
      </div>
    </>
  )
}
