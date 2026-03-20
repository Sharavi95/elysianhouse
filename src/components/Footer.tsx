import { Link } from 'react-router-dom'

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
        <div>
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
        <div>
          <p className="footer-col-title">Offerings</p>
          <ul className="footer-links">
            <li>
              <Link to="/services">Circle Gatherings</Link>
            </li>
            <li>
              <Link to="/services">Guided Conversations</Link>
            </li>
            <li>
              <Link to="/services">Retreat Days</Link>
            </li>
            <li>
              <Link to="/services">Bespoke Programmes</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="footer-col-title">Connect</p>
          <ul className="footer-links">
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <a href="#">LinkedIn</a>
            </li>
            <li>
              <Link to="/contact">hello@elysianhouse.com</Link>
            </li>
          </ul>
        </div>
      </footer>
      <div className="footer-bottom">
        <p>© 2025 Elysian House. All rights reserved.</p>
        <p>Crafted with presence.</p>
      </div>
    </>
  )
}
