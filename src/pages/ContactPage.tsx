import { Footer } from '../components/Footer'

export function ContactPage() {
  return (
    <>
      <section className="contact-hero">
        <img
          src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&q=80"
          alt="A warm, intimate space"
        />
        <div className="contact-hero-overlay">
          <span className="section-label">Come As You Are</span>
          <h1 className="section-heading">Let&apos;s find the right space for you.</h1>
          <p>
            Whether you&apos;re ready to join a gathering or just want to ask a question, this
            is a safe place to begin.
          </p>
        </div>
      </section>

      <div className="contact-grid">
        <div className="contact-form-area">
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
            <label className="form-label">I&apos;m Interested In</label>
            <select className="form-select" defaultValue="">
              <option value="">Select an offering</option>
              <option>Circle Gatherings</option>
              <option>Guided Conversations (1:1)</option>
              <option>Retreat Days</option>
              <option>Bespoke Programme</option>
              <option>Just exploring</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">What Brings You Here</label>
            <textarea
              className="form-textarea"
              placeholder="Share as little or as much as you&apos;d like..."
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
              "There is nothing to perform here. Just arrive."
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
