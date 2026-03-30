import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer'

export function AboutPage() {
  return (
    <>
      {/* ── HERO — full-bleed image with overlay ── */}
      <section className="about-hero">
        <img
          src="/images/elysian/elysian-gathering-circle-seating-wide-0684.webp"
          alt="Women gathered in circle for an intimate conversation"
        />
        <div className="about-hero-overlay">
          <div className="about-hero-content">
            <span className="section-label">Our Story</span>
            <h1 className="section-heading">
              We believe women deserve spaces where they don't have to <em>perform.</em>
            </h1>
            <p>
              Elysian House was created from a deep knowing: most spaces ask women to show
              up with answers. We ask them to arrive with questions.
            </p>
          </div>
        </div>
      </section>

      {/* ── MISSION + VALUES ── */}
      <section className="mission-section">
        <div className="mission-text fade-in">
          <span className="section-label">Mission</span>
          <h2 className="section-heading">
            Creating spaces for <em>wholeness</em>
          </h2>
          <div className="divider" />
          <p>
            Elysian House creates reflective spaces where women can slow down, reconnect
            with themselves, and integrate the parts of their lives they have carried
            alone — through guided conversations, intimate gatherings, and thoughtful
            coaching.
          </p>
          <p>
            We do not offer quick fixes or five-step plans. We offer presence, safety, and
            the kind of honest conversation that changes how a woman understands herself.
          </p>
          <p>
            Understanding oneself comes before strategy, goals, or performance. That is
            our foundation.
          </p>
          <Link to="/contact" className="btn-primary" style={{ marginTop: '36px' }}>
            Join a Gathering
          </Link>
        </div>
        <div className="fade-in">
          <span className="section-label">Our Core Values</span>
          <div className="values-grid" style={{ marginTop: '20px' }}>
            <div className="value-card">
              <p className="value-card-num">01</p>
              <p className="value-card-title">Self-Connection</p>
              <p className="value-card-text">
                The most important relationship a woman has is the one she has with
                herself.
              </p>
            </div>
            <div className="value-card">
              <p className="value-card-num">02</p>
              <p className="value-card-title">Psychological Safety</p>
              <p className="value-card-text">
                True transformation happens only where women feel safe to be honest and
                fully seen.
              </p>
            </div>
            <div className="value-card">
              <p className="value-card-num">03</p>
              <p className="value-card-title">Clarity First</p>
              <p className="value-card-text">
                Understanding oneself comes before strategy, goals, or performance.
              </p>
            </div>
            <div className="value-card">
              <p className="value-card-num">04</p>
              <p className="value-card-title">Integration</p>
              <p className="value-card-text">
                We help women bring together the parts of themselves they learned to
                separate.
              </p>
            </div>
            <div className="value-card">
              <p className="value-card-num">05</p>
              <p className="value-card-title">Presence Over Pressure</p>
              <p className="value-card-text">
                Growth comes from listening deeper, not pushing harder.
              </p>
            </div>
            <div className="value-card">
              <p className="value-card-num">06</p>
              <p className="value-card-title">Honest Living</p>
              <p className="value-card-text">
                We value truth over performance and authenticity over expectation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── THREE-IMAGE ROW ── */}
      <div className="three-img-row fade-in">
        <div className="three-img-row-item">
          <img
            src="/images/elysian/elysian-founder-keynote-audience-0536.webp"
            alt="Speaker and guests at an Elysian House gathering"
          />
        </div>
        <div className="three-img-row-item">
          <img
            src="/images/elysian/elysian-community-event-group-celebration-0676.webp"
            alt="Community celebrating together at an event"
          />
        </div>
        <div className="three-img-row-item">
          <img
            src="/images/elysian/elysian-founder-desk-writing-notebook-1577.webp"
            alt="Thoughtful work at a calm desk"
          />
        </div>
      </div>

      {/* ── IMAGE BREAK ── */}
      <div className="img-break">
        <img
          src="/images/elysian/elysian-event-transform-thrive-luncheon-wide-0674.webp"
          alt="Women sharing a meal and conversation at Transform and Thrive"
        />
        <div className="img-break-overlay">
          <div className="img-break-text">
            <p>
              "True transformation happens only where women feel safe to be honest,
              vulnerable, and fully seen."
            </p>
            <cite>Elysian House · Psychological Safety</cite>
          </div>
        </div>
      </div>

      {/* ── CTA BANNER ── */}
      <div className="cta-banner fade-in">
        <div className="cta-banner-text">
          <h2 className="section-heading">
            This is a space <em style={{ color: 'rgba(245,241,234,0.8)' }}>for you.</em>
          </h2>
          <p>Come as you are. There is nothing to prove here.</p>
        </div>
        <Link to="/services" className="btn-white">
          See Our Gatherings
        </Link>
      </div>

      <Footer />
    </>
  )
}
