import { type FormEvent, useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { SITE_CONTACT_EMAIL } from '../constants/contact'
import { getEventById, getEventTitleById, getUpcomingEvents } from '../data/events'

const STATIC_INTEREST_LABELS: Record<string, string> = {
  'inner-circles-waitlist': 'Inner Circles — waitlist',
  'reflection-sessions': 'One-on-One Reflection Sessions',
  'just-exploring': 'Just exploring',
}

function interestLabelForValue(value: string): string {
  if (!value.trim()) return ''
  const title = getEventTitleById(value)
  if (title) return title
  return STATIC_INTEREST_LABELS[value] ?? value
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function ContactPage() {
  const [searchParams] = useSearchParams()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [interest, setInterest] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

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

  const validate = (): boolean => {
    const next: Record<string, string> = {}
    if (!firstName.trim()) next.firstName = 'First name is required'
    if (!lastName.trim()) next.lastName = 'Last name is required'
    if (!email.trim()) next.email = 'Email is required'
    else if (!emailRe.test(email.trim())) next.email = 'Please enter a valid email address'
    if (!message.trim()) next.message = 'Please share a short message'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFormError(null)
    if (!validate()) return

    setIsSubmitting(true)
    try {
      const apiBase = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '')
      const url = `${apiBase}/api/send-contact`
      const requestedService = interest ? interestLabelForValue(interest) : undefined
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          service: interest,
          requestedService,
          vision: message.trim(),
        }),
      })

      if (!response.ok) {
        if (response.status === 502) {
          throw new Error(
            'The contact API is not available (502). On localhost, run "npm run dev:api" in a second terminal so Vercel serves /api on port 3000, while "npm run dev" keeps this site on port 5173.',
          )
        }
        let errorData: { error?: string; details?: string | Record<string, unknown> } = {}
        try {
          errorData = await response.json()
        } catch {
          errorData = { error: `Server error: ${response.status} ${response.statusText}` }
        }
        const detailsStr =
          errorData.details != null
            ? typeof errorData.details === 'string'
              ? errorData.details
              : typeof errorData.details === 'object' &&
                  errorData.details !== null &&
                  'message' in errorData.details
                ? String((errorData.details as { message: unknown }).message)
                : JSON.stringify(errorData.details)
            : ''
        const msg = detailsStr
          ? `${errorData.error ?? 'Request failed'}: ${detailsStr}`
          : (errorData.error ?? 'Failed to submit form')
        throw new Error(msg)
      }

      setSubmitted(true)
    } catch (err) {
      const isNetworkError =
        err instanceof TypeError &&
        (err.message === 'Failed to fetch' || err.message.includes('NetworkError'))
      setFormError(
        isNetworkError
          ? 'Unable to reach the server. If you are running locally, run "npm run dev:api" in another terminal (port 3000), then try again.'
          : err instanceof Error
            ? err.message
            : 'Something went wrong. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <>
        <section className="services-hero contact-page-hero contact-success-hero">
          <div className="services-hero-bg">
            <img
              src="/images/elysian/elysian-focus-laptop-creative-space-7883.webp"
              alt="Intentional focus in a calm, creative space"
            />
          </div>
          <div className="services-hero-content">
            <span className="section-label">Message received</span>
            <h1 className="section-heading">Thank you for reaching out.</h1>
            <div className="divider" />
            <p>
              Your note is in our hands. We read every message and reply with care, usually within two
              business days.
            </p>
          </div>
        </section>

        <div className="contact-success-panel">
          <div className="contact-success-panel__inner">
            <div className="contact-success-panel__mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="contact-success-panel__lede">
              There is nothing to perform here. Just arrive.
            </p>
            <p className="contact-success-panel__meta">
              Prefer email?{' '}
              <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="contact-success-panel__link">
                {SITE_CONTACT_EMAIL}
              </a>
            </p>
            <div className="contact-success-panel__actions">
              <button type="button" className="btn-ghost" onClick={() => setSubmitted(false)}>
                Send another message
              </button>
              <Link to="/" className="btn-primary">
                Back to home
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </>
    )
  }

  return (
    <>
      <section className="services-hero contact-page-hero">
        <div className="services-hero-bg">
          <img
            src="/images/elysian/elysian-focus-laptop-creative-space-7883.webp"
            alt="Intentional focus in a calm, creative space"
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
        <form id="contact-form" className="contact-form-area" tabIndex={-1} onSubmit={handleSubmit}>
          <span className="section-label">Send a Message</span>
          <div className="form-group">
            <label className="form-label" htmlFor="contact-first">
              First name
            </label>
            <input
              id="contact-first"
              type="text"
              className="form-input"
              placeholder="First name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value)
                if (errors.firstName) setErrors((o) => ({ ...o, firstName: '' }))
              }}
              aria-invalid={Boolean(errors.firstName)}
            />
            {errors.firstName ? (
              <p className="form-error" style={{ color: 'var(--gold)', fontSize: '0.85rem', marginTop: '8px' }}>
                {errors.firstName}
              </p>
            ) : null}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="contact-last">
              Last name
            </label>
            <input
              id="contact-last"
              type="text"
              className="form-input"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value)
                if (errors.lastName) setErrors((o) => ({ ...o, lastName: '' }))
              }}
              aria-invalid={Boolean(errors.lastName)}
            />
            {errors.lastName ? (
              <p className="form-error" style={{ color: 'var(--gold)', fontSize: '0.85rem', marginTop: '8px' }}>
                {errors.lastName}
              </p>
            ) : null}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="contact-email">
              Email address
            </label>
            <input
              id="contact-email"
              type="email"
              className="form-input"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors((o) => ({ ...o, email: '' }))
              }}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email ? (
              <p className="form-error" style={{ color: 'var(--gold)', fontSize: '0.85rem', marginTop: '8px' }}>
                {errors.email}
              </p>
            ) : null}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="contact-phone">
              Phone <span style={{ opacity: 0.7 }}>(optional)</span>
            </label>
            <input
              id="contact-phone"
              type="tel"
              className="form-input"
              placeholder="+971 …"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="contact-interest">
              I&apos;m interested in
            </label>
            <select
              id="contact-interest"
              className="form-select"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
            >
              <option value="">Select an offering</option>
              {upcoming.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.title}
                </option>
              ))}
              <option value="inner-circles-waitlist">Inner Circles — waitlist</option>
              <option value="reflection-sessions">One-on-One Reflection Sessions</option>
              <option value="just-exploring">Just exploring</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="contact-message">
              What brings you here
            </label>
            <textarea
              id="contact-message"
              className="form-textarea"
              placeholder="Share as little or as much as you&apos;d like..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value)
                if (errors.message) setErrors((o) => ({ ...o, message: '' }))
              }}
              aria-invalid={Boolean(errors.message)}
            />
            {errors.message ? (
              <p className="form-error" style={{ color: 'var(--gold)', fontSize: '0.85rem', marginTop: '8px' }}>
                {errors.message}
              </p>
            ) : null}
          </div>
          {formError ? (
            <p
              role="alert"
              style={{
                color: 'var(--gold)',
                fontSize: '0.9rem',
                marginBottom: '16px',
                lineHeight: 1.5,
              }}
            >
              {formError}
            </p>
          ) : null}
          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', textAlign: 'center' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending…' : 'Send Message'}
          </button>
        </form>
        <div className="contact-info-area">
          <span className="section-label">Ways to Connect</span>
          <div className="contact-info-item">
            <p className="contact-info-label">Email</p>
            <p className="contact-info-value">{SITE_CONTACT_EMAIL}</p>
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
              Gatherings are held in carefully chosen spaces across the city. Details shared upon registration.
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
