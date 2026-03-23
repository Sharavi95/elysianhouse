import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { getEventById, getUpcomingEvents } from '../data/events'

export function ContactPage() {
  const [searchParams] = useSearchParams()
  const [interest, setInterest] = useState('')
  const [message, setMessage] = useState('')

  const upcoming = getUpcomingEvents()

  useEffect(() => {
    const eventId = searchParams.get('eventId')
    if (!eventId) return
    const ev = getEventById(eventId)
    if (!ev) return

    if (ev.type === 'upcoming') {
      setInterest(ev.id)
    } else {
      setInterest('')
    }

    const line = `I'm interested in: ${ev.title}`
    setMessage((prev) => (prev.trim() ? prev : line))

    requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      document.getElementById('contact-form')?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      })
    })
  }, [searchParams])

  return (
    <>
      <section className="services-hero">
        <div className="services-hero-bg">
          <img
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&q=80"
            alt="A warm, intimate space"
          />
        </div>
        <div className="services-hero-content">
          <span className="section-label">Come As You Are</span>
          <h1 className="section-heading">
            Let&apos;s find the <em>right</em> space for you.
          </h1>
          <div className="divider" />
          <p>
            Whether you&apos;re ready to join a gathering or just want to ask a question, this
            is a safe place to begin.
          </p>
        </div>
      </section>

      <div className="contact-grid">
        <div id="contact-form" className="contact-form-area" tabIndex={-1}>
          <span className="section-label" style={{ marginBottom: '36px', display: 'block' }}>
            Send a Message
          </span>
          <div className="form-group">
            <label className="form-label">Your Name</label>
            <input type="text" className="form-input" placeholder="First name" />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-input" placeholder="your@email.com" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="contact-interest">
              I&apos;m Interested In
            </label>
            <select
              id="contact-interest"
              className="form-select"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
            >
              <option value="">Select an offering</option>
              {upcoming.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.title}
                </option>
              ))}
              <option value="inner-circles-waitlist">Inner Circles — waitlist</option>
              <option value="reflection-sessions">One-on-One Reflection Sessions</option>
              <option value="just-exploring">Just exploring</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="contact-message">
              What Brings You Here
            </label>
            <textarea
              id="contact-message"
              className="form-textarea"
              placeholder="Share as little or as much as you&apos;d like..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>
            Send Message
          </button>
        </div>
        <div className="contact-info-area">
          <span className="section-label" style={{ marginBottom: '48px', display: 'block' }}>
            Ways to Connect
          </span>
          <div className="contact-info-item">
            <p className="contact-info-label">Email</p>
            <p className="contact-info-value">hello@elysianhouse.com</p>
            <p className="contact-info-sub">
              We respond thoughtfully usually within 2 business days.
            </p>
          </div>
          <div className="contact-info-item">
            <p className="contact-info-label">Instagram</p>
            <p className="contact-info-value">@elysianhouse</p>
            <p className="contact-info-sub">
              Where we share reflections, upcoming gatherings, and quiet reminders.
            </p>
          </div>
          <div className="contact-info-item">
            <p className="contact-info-label">Location</p>
            <p className="contact-info-value">Dubai, UAE</p>
            <p className="contact-info-sub">
              Gatherings are held in carefully chosen spaces across the city. Details
              shared upon registration.
            </p>
          </div>
          <div style={{ marginTop: '56px', paddingTop: '40px', borderTop: '1px solid #333' }}>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.4rem',
                fontStyle: 'italic',
                color: 'var(--ivory)',
                lineHeight: '1.65',
              }}
            >
              &quot;There is nothing to perform here. Just arrive.&quot;
            </p>
            <p
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginTop: '16px',
              }}
            >
              Elysian House
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
