import { Link, Navigate, useParams } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { cappedExploreBullets, getFullStory } from '../components/events'
import { getEventById } from '../data/events'

function bodyParagraphs(text: string): string[] {
  return text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
}

export function EventDetailPage() {
  const { eventId } = useParams<{ eventId: string }>()
  const decodedId = eventId ? decodeURIComponent(eventId) : ''
  const event = decodedId ? getEventById(decodedId) : undefined

  if (!eventId || !event) {
    return <Navigate to="/services" replace />
  }

  const full = getFullStory(event)
  const bullets = cappedExploreBullets(event)

  return (
    <div className="page-gatherings event-detail-page">
      <section className="services-hero event-detail-hero">
        <div className="services-hero-bg">
          <img src={event.primaryImage} alt="" />
        </div>
        <div className="services-hero-content">
          <Link to="/services" className="event-detail-back">
            ← Gatherings
          </Link>
          <span className="section-label">{event.type === 'past' ? 'Past gathering' : 'Gathering'}</span>
          <h1 className="section-heading">{event.title}</h1>
          {event.subtitle ? <p className="event-detail-subtitle">{event.subtitle}</p> : null}
          <div className="divider" />
          <p className="event-detail-date">{event.date}</p>
        </div>
      </section>

      <article className="event-detail-body">
        <div className="event-detail-inner">
          {bodyParagraphs(full).map((para, i) => (
            <p key={i} className="event-detail-para">
              {para}
            </p>
          ))}

          {bullets.length > 0 ? (
            <>
              <h2 className="event-detail-subheading">
                {event.exploreSectionTitle ?? 'What we will explore'}
              </h2>
              <ul className="event-detail-list">
                {bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          ) : null}

          {event.experienceBlock ? (
            <>
              <h2 className="event-detail-subheading">The experience</h2>
              <p className="event-detail-para">{event.experienceBlock}</p>
            </>
          ) : null}

          {event.closingNote ? <p className="event-detail-closing">{event.closingNote}</p> : null}

          {event.type === 'upcoming' && !event.ticketsOpenNote ? (
            <div className="event-detail-actions">
              {event.registrationUrl ? (
                <a
                  href={event.registrationUrl}
                  className="btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {event.ctaLabel ?? 'Register'}
                </a>
              ) : event.ctaLabel ? (
                <Link to={`/contact?eventId=${encodeURIComponent(event.id)}`} className="btn-primary">
                  {event.ctaLabel}
                </Link>
              ) : null}
              {event.paymentUrl ? (
                <a
                  href={event.paymentUrl}
                  className="btn-ghost"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pay online
                </a>
              ) : null}
              {event.communityUrl ? (
                <a
                  href={event.communityUrl}
                  className="btn-ghost"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join our community
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </article>

      <Footer />
    </div>
  )
}
