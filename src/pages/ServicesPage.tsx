import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { PastArchiveFocus } from '../components/PastArchiveFocus'
import { PAST_ARCHIVE_EVENTS } from '../data/pastArchiveEvents'

export function ServicesPage() {
  return (
    <>
      {/* ── HERO — dark with background image ── */}
      <section className="services-hero">
        <div className="services-hero-bg">
          <img
            src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1600&q=80"
            alt="Women gathering warmly"
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
            <div className="exp-card-img">
              <img
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=900&q=80"
                alt="Curated Events"
              />
              <div className="exp-card-img-overlay" />
            </div>
            <div className="exp-card-body">
              <p className="exp-card-number">01</p>
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
            <div className="exp-card-img">
              <img
                src="https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=900&q=80"
                alt="Inner Circles"
              />
              <div className="exp-card-img-overlay" />
            </div>
            <div className="exp-card-body">
              <p className="exp-card-number">02</p>
              <span className="exp-soon-badge">Coming Soon</span>
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
            <div className="exp-card-img">
              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&q=80"
                alt="One-on-One Reflection Sessions"
              />
              <div className="exp-card-img-overlay" />
            </div>
            <div className="exp-card-body">
              <p className="exp-card-number">03</p>
              <span className="exp-soon-badge">Coming Soon</span>
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

      {/* ── UPCOMING EVENTS ── */}
      <section className="upcoming-section">
        <div className="upcoming-header">
          <div>
            <span className="section-label">What's Coming</span>
            <h2 className="section-heading">
              Upcoming <em>Gatherings</em>
            </h2>
          </div>
          <Link
            to="/contact"
            className="btn-ghost"
            style={{
              color: 'rgba(245,241,234,0.8)',
              borderColor: 'rgba(216,207,196,0.3)',
              flexShrink: 0,
            }}
          >
            Express Interest
          </Link>
        </div>
        <div className="upcoming-grid">

          {/* Featured event */}
          <div className="event-card-upcoming featured fade-in">
            <div className="event-card-img">
              <img
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=80"
                alt="Retreat day"
              />
              <div className="event-card-img-overlay" />
            </div>
            <span className="event-badge few-left">3 Spots Left</span>
            <div className="event-card-top">
              <div className="event-date-block">
                <div className="event-day">12</div>
                <div className="event-month-year">
                  <span className="event-month">April</span>
                  <span className="event-year">2026</span>
                </div>
              </div>
              <span className="event-type-tag">Full-Day Retreat</span>
              <h3 className="event-title-up">
                The Unbecoming: A Spring Retreat for Women in Transition
              </h3>
              <p className="event-desc-up">
                A rare full-day space for women navigating major life shifts — in identity,
                relationship, career, or calling. We don't ask you to have it figured out.
                Just arrive. Includes guided reflection sessions, shared meals, and time
                for stillness in a carefully chosen private villa setting.
              </p>
            </div>
            <div className="event-meta">
              <div className="event-meta-item">
                <span className="event-meta-icon">◷</span>
                <span className="event-meta-text">9:00 AM – 5:00 PM</span>
              </div>
              <div className="event-meta-item">
                <span className="event-meta-icon">◎</span>
                <span className="event-meta-text">Alserkal Avenue, Dubai</span>
              </div>
              <div className="event-meta-item">
                <span className="event-meta-icon">◈</span>
                <span className="event-meta-text">Max 8 Women</span>
              </div>
            </div>
            <div className="event-card-bottom">
              <p className="event-spots">
                Availability: <span>3 of 8 spots remain</span>
              </p>
              <Link to="/contact" className="btn-book">
                Reserve My Spot
              </Link>
            </div>
          </div>

          {/* Standard event 1 */}
          <div className="event-card-upcoming fade-in">
            <div className="event-card-img">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=80"
                alt="Circle gathering"
              />
              <div className="event-card-img-overlay" />
            </div>
            <span className="event-badge">Open</span>
            <div className="event-card-top">
              <div className="event-date-block">
                <div className="event-day">28</div>
                <div className="event-month-year">
                  <span className="event-month">April</span>
                  <span className="event-year">2026</span>
                </div>
              </div>
              <span className="event-type-tag">Circle Gathering</span>
              <h3 className="event-title-up">On Belonging: Finding Home in Yourself</h3>
              <p className="event-desc-up">
                An intimate evening circle exploring what it means to belong — to place,
                to people, and most importantly, to yourself. Come as you are.
              </p>
            </div>
            <div className="event-meta">
              <div className="event-meta-item">
                <span className="event-meta-icon">◷</span>
                <span className="event-meta-text">6:30 – 9:00 PM</span>
              </div>
              <div className="event-meta-item">
                <span className="event-meta-icon">◎</span>
                <span className="event-meta-text">DIFC, Dubai</span>
              </div>
            </div>
            <div className="event-card-bottom">
              <p className="event-spots">
                Availability: <span>7 of 12 spots remain</span>
              </p>
              <Link to="/contact" className="btn-book">
                Reserve My Spot
              </Link>
            </div>
          </div>

          {/* Standard event 2 — sold out */}
          <div className="event-card-upcoming fade-in">
            <div className="event-card-img">
              <img
                src="https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=700&q=80"
                alt="Intimate gathering"
              />
              <div className="event-card-img-overlay" />
            </div>
            <span className="event-badge sold-out">Sold Out</span>
            <div className="event-card-top">
              <div className="event-date-block">
                <div className="event-day">15</div>
                <div className="event-month-year">
                  <span className="event-month">May</span>
                  <span className="event-year">2026</span>
                </div>
              </div>
              <span className="event-type-tag">Circle Gathering</span>
              <h3 className="event-title-up">
                Quiet Ambition: On Wanting Without Performing
              </h3>
              <p className="event-desc-up">
                A conversation for women who want things deeply but have learned to hide
                it. We make space for desire that has been waiting to be spoken.
              </p>
            </div>
            <div className="event-meta">
              <div className="event-meta-item">
                <span className="event-meta-icon">◷</span>
                <span className="event-meta-text">6:30 – 9:00 PM</span>
              </div>
              <div className="event-meta-item">
                <span className="event-meta-icon">◎</span>
                <span className="event-meta-text">JLT, Dubai</span>
              </div>
            </div>
            <div className="event-card-bottom">
              <p className="event-spots">
                Availability: <span className="sold">Fully booked</span>
              </p>
              <button className="btn-book disabled" disabled>
                Join Waitlist
              </button>
            </div>
          </div>

          {/* Standard event 3 */}
          <div className="event-card-upcoming fade-in">
            <div className="event-card-img">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&q=80"
                alt="Women retreat"
              />
              <div className="event-card-img-overlay" />
            </div>
            <span className="event-badge">Open</span>
            <div className="event-card-top">
              <div className="event-date-block">
                <div className="event-day">07</div>
                <div className="event-month-year">
                  <span className="event-month">June</span>
                  <span className="event-year">2026</span>
                </div>
              </div>
              <span className="event-type-tag">Half-Day Retreat</span>
              <h3 className="event-title-up">
                Midyear Stillness: A Half-Day Women's Retreat
              </h3>
              <p className="event-desc-up">
                A lighter-format retreat to pause at the midpoint of the year. For women
                who need to exhale before they plan their next move.
              </p>
            </div>
            <div className="event-meta">
              <div className="event-meta-item">
                <span className="event-meta-icon">◷</span>
                <span className="event-meta-text">9:00 AM – 1:00 PM</span>
              </div>
              <div className="event-meta-item">
                <span className="event-meta-icon">◎</span>
                <span className="event-meta-text">Location TBA, Dubai</span>
              </div>
            </div>
            <div className="event-card-bottom">
              <p className="event-spots">
                Availability: <span>10 of 12 spots remain</span>
              </p>
              <Link to="/contact" className="btn-book">
                Reserve My Spot
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ── PAST EVENTS ── */}
      <section className="past-section">
        <div className="past-header">
          <div>
            <span className="section-label">Where We've Been</span>
            <h2 className="section-heading">
              Past <em>Gatherings</em>
            </h2>
          </div>
          <p className="past-header-note">
            Every gathering leaves something behind — in the room, and in the women who
            were there.
          </p>
        </div>
        <PastArchiveFocus events={PAST_ARCHIVE_EVENTS} />
      </section>

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
    </>
  )
}
