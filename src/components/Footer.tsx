import { Link } from 'react-router-dom'
import { SITE_CONTACT_EMAIL } from '../constants/contact'

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
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <Link to="/contact">{SITE_CONTACT_EMAIL}</Link>
            </li>
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
