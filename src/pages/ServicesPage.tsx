import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { InteractiveEventsSection } from '../components/InteractiveEventsSection'
import { getPastEvents, getUpcomingEvents } from '../data/events'

export function ServicesPage() {
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

      <InteractiveEventsSection
        variant="upcoming"
        events={getUpcomingEvents()}
        sectionLabel="What's Coming"
        heading={
          <>
            Upcoming <em>Gatherings</em>
          </>
        }
        showExpressInterestLink
        featuredAnchorId="events-featured-upcoming"
      />

      <InteractiveEventsSection
        variant="past"
        events={getPastEvents()}
        sectionLabel="Where We've Been"
        heading={
          <>
            Past <em>Gatherings</em>
          </>
        }
        headerNote="Every gathering leaves something behind — in the room, and in the women who were there."
        featuredAnchorId="events-featured-past"
      />

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
