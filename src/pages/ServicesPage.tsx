import { Link } from 'react-router-dom'
import { useRef, useCallback, useState } from 'react'
import { Footer } from '../components/Footer'
import { EventCard, EventCardScrollRow, toEventCardProps } from '../components/events'
import { getPastEvents, getUpcomingEvents } from '../data/events'

export function ServicesPage() {
  const upcomingEventsData = getUpcomingEvents()
  const pastEventsData = getPastEvents()

  // Selection state for featured events
  const [selectedUpcomingId, setSelectedUpcomingId] = useState<string | null>(
    upcomingEventsData.find((e) => e.featured)?.id ?? upcomingEventsData[0]?.id ?? null
  )
  const [selectedPastId, setSelectedPastId] = useState<string | null>(
    pastEventsData.find((e) => e.featured)?.id ?? pastEventsData[0]?.id ?? null
  )

  const upcomingHeroRef = useRef<HTMLElement>(null)
  const pastHeroRef = useRef<HTMLElement>(null)

  // Find selected event or fall back to first
  const selectedUpcoming = upcomingEventsData.find((e) => e.id === selectedUpcomingId) ?? upcomingEventsData[0]
  const selectedPast = pastEventsData.find((e) => e.id === selectedPastId) ?? pastEventsData[0]

  // Remaining events for strips
  const remainingUpcoming = selectedUpcoming
    ? upcomingEventsData.filter((e) => e.id !== selectedUpcoming.id)
    : []
  const remainingPast = selectedPast
    ? pastEventsData.filter((e) => e.id !== selectedPast.id)
    : []

  // Scroll to hero on selection
  const selectUpcoming = useCallback((id: string) => {
    setSelectedUpcomingId(id)
    setTimeout(() => {
      upcomingHeroRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)
  }, [])

  const selectPast = useCallback((id: string) => {
    setSelectedPastId(id)
    setTimeout(() => {
      pastHeroRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)
  }, [])

  return (
    <div className="page-gatherings">
      {/* ── HERO — main light surface (scoped in CSS; Contact keeps dark hero) ── */}
      <section className="services-hero">
        <div className="services-hero-bg">
          <img
            src="/images/elysian/elysian-focus-laptop-creative-space-7883.webp"
            alt="Intentional focus in a calm, creative space"
          />
        </div>
        <div className="services-hero-content">
          <span className="section-label">Our Gatherings</span>
          <h1 className="section-heading">
            Every offering is a space — not a <em>programme.</em>
          </h1>
          <div className="divider" />
          <p>
            We hold space with care. Each gathering is intentionally small, deliberately
            unhurried, and designed to meet you where you are — not where you think you
            should be.
          </p>
        </div>
      </section>

      {/* ── SERVICES OFFERINGS (home-style horizontal cards) ── */}
      <section className="services-offerings">
        <div className="services-offerings-header">
          <span className="section-label">Our Offerings</span>
          <h2 className="section-heading">
            Choose the space that meets you <em>now</em>
          </h2>
          <div className="divider" />
        </div>
        <div className="experience-cards">
          <div className="exp-card available fade-in">
            <span className="exp-card-status exp-card-status--open" aria-label="Open">
              Open
            </span>
            <div className="exp-card-img">
              <img
                src="/images/elysian/elysian-gathering-circle-seating-wide-0684.webp"
                alt="Curated events and community gatherings"
              />
              <div className="exp-card-img-overlay" />
            </div>
            <div className="exp-card-body">
              <p className="exp-card-number">01</p>
              <div className="exp-card-labels">
                <span className="exp-card-type-label">Curated events</span>
              </div>
              <h3 className="exp-card-title">
                Curated <em>Events</em>
              </h3>
              <p className="exp-card-desc">
                Guided conversations and community gatherings — thoughtfully designed
                spaces where women come together around themes that matter. Open to all.
              </p>
              <Link to="/services" className="exp-card-cta">
                Explore upcoming events
              </Link>
            </div>
          </div>

          <div className="exp-card coming-soon fade-in">
            <span className="exp-card-status exp-card-status--soon" aria-label="Coming soon">
              Coming soon
            </span>
            <div className="exp-card-img">
              <img
                src="/images/elysian/elysian-panel-discussion-resilience-prompt-0686.webp"
                alt="Inner circles and deeper discussion"
              />
              <div className="exp-card-img-overlay" />
            </div>
            <div className="exp-card-body">
              <p className="exp-card-number">02</p>
              <div className="exp-card-labels">
                <span className="exp-card-type-label">Inner circles</span>
              </div>
              <h3 className="exp-card-title">
                Inner <em>Circles</em>
              </h3>
              <p className="exp-card-desc">
                Small, closed groups for deeper reflective discussions. A consistent space
                with the same women — building trust, continuity, and real depth over time.
              </p>
              <span className="exp-card-cta">Join the waitlist</span>
            </div>
          </div>

          <div className="exp-card coming-soon fade-in">
            <span className="exp-card-status exp-card-status--soon" aria-label="Coming soon">
              Coming soon
            </span>
            <div className="exp-card-img">
              <img
                src="/images/elysian/elysian-founder-desk-focus-tablet-1574.webp"
                alt="One-on-one reflection and private focus"
              />
              <div className="exp-card-img-overlay" />
            </div>
            <div className="exp-card-body">
              <p className="exp-card-number">03</p>
              <div className="exp-card-labels">
                <span className="exp-card-type-label">One-on-one sessions</span>
              </div>
              <h3 className="exp-card-title">
                One-on-One <em>Reflection Sessions</em>
              </h3>
              <p className="exp-card-desc">
                Personal conversations to navigate life transitions. Private, unhurried, and
                tailored entirely to where you are — no agenda except yours.
              </p>
              <span className="exp-card-cta">Express interest</span>
            </div>
          </div>
        </div>
      </section>

      {upcomingEventsData.length > 0 && selectedUpcoming && (
        <section className="upcoming-section events-interactive">
          <div className="upcoming-header">
            <div>
              <span className="section-label">What's Coming</span>
              <h2 className="section-heading">
                Upcoming <em>Gatherings</em>
              </h2>
            </div>
            <Link to="/contact" className="btn-ghost events-upcoming-header-cta">
              Express Interest
            </Link>
          </div>

          <div className="ec-hero-wrap">
            <div ref={upcomingHeroRef} style={{ width: '100%' }}>
              <EventCard variant="hero" {...toEventCardProps(selectedUpcoming)} />
            </div>
          </div>

          {remainingUpcoming.length > 0 && (
            <div className="ec-strip-section">
              <EventCardScrollRow>
                {remainingUpcoming.map((e) => (
                  <EventCard
                    key={e.id}
                    variant="strip"
                    {...toEventCardProps(e, { forStrip: true })}
                    onSelect={() => selectUpcoming(e.id)}
                  />
                ))}
              </EventCardScrollRow>
            </div>
          )}
        </section>
      )}

      {pastEventsData.length > 0 && selectedPast && (
        <section className="past-section events-interactive">
          <div className="past-header">
            <div>
              <span className="section-label">Where We've Been</span>
              <h2 className="section-heading">
                Past <em>Gatherings</em>
              </h2>
            </div>
            <p className="past-header-note">
              Every gathering leaves something behind — in the room, and in the women who were there.
            </p>
          </div>

          <div className="ec-hero-wrap">
            <div ref={pastHeroRef} style={{ width: '100%' }}>
              <EventCard variant="hero" {...toEventCardProps(selectedPast)} />
            </div>
          </div>

          {remainingPast.length > 0 && (
            <div className="ec-strip-section">
              <EventCardScrollRow>
                {remainingPast.map((e) => (
                  <EventCard
                    key={e.id}
                    variant="strip"
                    {...toEventCardProps(e, { forStrip: true })}
                    onSelect={() => selectPast(e.id)}
                  />
                ))}
              </EventCardScrollRow>
            </div>
          )}
        </section>
      )}

      {/* ── CTA BANNER ── */}
      <div className="cta-banner fade-in">
        <div className="cta-banner-text">
          <h2 className="section-heading">
            Not sure which is <em style={{ color: 'rgba(245,241,234,0.8)' }}>right for you?</em>
          </h2>
          <p>Reach out. We'll have a short, honest conversation — no pressure, no pitch.</p>
        </div>
        <Link to="/contact" className="btn-white">
          Get in Touch
        </Link>
      </div>

      <Footer />
    </div>
  )
}
