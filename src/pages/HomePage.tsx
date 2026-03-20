import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer'

export function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-left">
          <p className="hero-eyebrow">A Space for Women</p>
          <h1 className="hero-title">
            Return to the
            <br />
            <em>truth of who</em>
            <br />
            you are.
          </h1>
          <p className="hero-body">
            Elysian House creates reflective spaces where women can slow down, reconnect
            with themselves, and integrate the parts of their lives they have carried
            alone.
          </p>
          <div className="hero-actions">
            <Link to="/contact" className="btn-primary">
              Join a Gathering
            </Link>
            <Link to="/services" className="btn-ghost">
              Our Offerings
            </Link>
          </div>
        </div>
        <div className="hero-right">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80"
            alt="Women gathering warmly"
          />
          <div className="hero-right-overlay" />
          <div className="hero-quote">
            <div className="hero-ornament" />
            <blockquote>
              "The most important relationship a woman has is the one she has with herself."
            </blockquote>
            <cite>Elysian House · Core Belief</cite>
          </div>
        </div>
      </section>

      {/* ── VALUES STRIP ── */}
      <div className="values-strip">
        <div className="value-item">
          <p className="value-number">01</p>
          <p className="value-name">Self-Connection</p>
        </div>
        <div className="value-item">
          <p className="value-number">02</p>
          <p className="value-name">Psychological Safety</p>
        </div>
        <div className="value-item">
          <p className="value-number">03</p>
          <p className="value-name">Clarity Before Action</p>
        </div>
        <div className="value-item">
          <p className="value-number">04</p>
          <p className="value-name">Integration</p>
        </div>
        <div className="value-item">
          <p className="value-number">05</p>
          <p className="value-name">Presence Over Pressure</p>
        </div>
        <div className="value-item">
          <p className="value-number">06</p>
          <p className="value-name">Honest Living</p>
        </div>
      </div>

      {/* ── ABOUT SECTION ── */}
      <section className="about-section">
        <div className="about-text fade-in">
          <span className="section-label">Our Purpose</span>
          <h2 className="section-heading">
            Moving beyond
            <br />
            the roles we <em>perform</em>
          </h2>
          <div className="divider" />
          <p>
            We believe true transformation happens only where women feel safe to be
            honest, vulnerable, and fully seen. Elysian House is not a performance space.
            It is a return.
          </p>
          <p>
            Through guided conversations, intimate gatherings, and thoughtful coaching, we
            help women bring together the parts of themselves they learned to separate in
            order to survive.
          </p>
          <Link to="/services" className="btn-ghost" style={{ marginTop: '16px' }}>
            Our Gatherings
          </Link>
        </div>
        <div className="about-visual fade-in">
          <div className="about-img-main">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80"
              alt="Woman in quiet reflection"
            />
          </div>
          <div className="about-img-accent">
            <img
              src="https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?w=600&q=80"
              alt="Women in warm connection"
            />
          </div>
          <div className="about-quote-chip">
            <p>"Growth does not come from pushing harder but from listening deeper."</p>
          </div>
        </div>
      </section>

      {/* ── PILLARS / CONVERSATION THEMES ── */}
      <section className="pillars-section">
        <div className="pillars-header">
          <span className="section-label">Conversation Themes</span>
          <h2 className="section-heading">
            What we explore <em>together</em>
          </h2>
          <div className="divider" />
        </div>
        <div className="pillars-grid">
          <div className="pillar-card fade-in">
            <p className="pillar-num">01</p>
            <h3 className="pillar-title">
              Love &amp; <em>Relationships</em>
            </h3>
            <p className="pillar-text">
              Exploring emotional connection, boundaries and conscious partnership — the
              relationships that shape and reveal who we truly are.
            </p>
          </div>
          <div className="pillar-card fade-in">
            <p className="pillar-num">02</p>
            <h3 className="pillar-title">
              Healing &amp; <em>Transformation</em>
            </h3>
            <p className="pillar-text">
              Conversations around emotional healing, breaking inherited patterns and
              rebuilding self-trust from the inside out.
            </p>
          </div>
          <div className="pillar-card fade-in">
            <p className="pillar-num">03</p>
            <h3 className="pillar-title">
              Personal Growth &amp; <em>Mindset</em>
            </h3>
            <p className="pillar-text">
              Redefining success, navigating life transitions and learning to live with
              intention rather than pressure.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW WOMEN EXPERIENCE (aligned with pillars: centered intro + card grid) ── */}
      <section className="experience-section" id="how-we-experience">
        <header className="experience-header fade-in">
          <span className="section-label">How Women Experience It</span>
          <h2 className="section-heading">
            Three ways to enter the <em>circle</em>
          </h2>
          <div className="divider" />
          <p className="experience-intro">
            Whether you&apos;re ready to step in or simply curious, there is a way for you
            here. Each offering is designed to meet you where you are.
          </p>
        </header>

        <div className="experience-cards">
            <div className="exp-card available fade-in">
              <div className="exp-card-img">
                <img
                  src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80"
                  alt="Curated events and community gatherings"
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

            <div className="exp-card coming-soon fade-in" aria-label="Inner Circles — coming soon">
              <div className="exp-card-img">
                <img
                  src="https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=800&q=80"
                  alt=""
                  aria-hidden
                />
                <div className="exp-card-img-overlay" />
              </div>
              <div className="exp-card-body">
                <p className="exp-card-number">02</p>
                <h3 className="exp-card-title">
                  Inner <em>Circles</em>
                </h3>
                <p className="exp-card-desc">
                  Small, closed groups for deeper reflective discussions. A consistent space
                  with the same women — building trust, continuity, and real depth over time.
                </p>
                <Link to="/contact" className="exp-card-cta">
                  Join the waitlist
                </Link>
              </div>
            </div>

            <div className="exp-card coming-soon fade-in" aria-label="One-on-One Reflection Sessions — coming soon">
              <div className="exp-card-img">
                <img
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80"
                  alt=""
                  aria-hidden
                />
                <div className="exp-card-img-overlay" />
              </div>
              <div className="exp-card-body">
                <p className="exp-card-number">03</p>
                <h3 className="exp-card-title">
                  One-on-One <em>Reflection Sessions</em>
                </h3>
                <p className="exp-card-desc">
                  Personal conversations to navigate life transitions. Private, unhurried, and
                  tailored entirely to where you are — no agenda except yours.
                </p>
                <Link to="/contact" className="exp-card-cta">
                  Express interest
                </Link>
              </div>
            </div>
        </div>
      </section>

      {/* ── GATHERINGS SECTION — DARK ── */}
      <section className="gatherings-section">
        <div className="gatherings-header">
          <div>
            <span className="section-label">How We Gather</span>
            <h2 className="section-heading" style={{ color: 'var(--ivory)' }}>
              Spaces held
              <br />
              with <em style={{ color: 'var(--rose)' }}>intention</em>
            </h2>
          </div>
          <Link
            to="/services"
            className="btn-ghost"
            style={{ color: 'rgba(245,241,234,0.8)', borderColor: 'rgba(216,207,196,0.3)' }}
          >
            All Offerings
          </Link>
        </div>
        <div className="gatherings-grid">
          <div className="gathering-card fade-in">
            <div className="gathering-card-img">
              <img
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80"
                alt="Women in circle"
              />
              <div className="gathering-card-img-overlay" />
            </div>
            <div className="gathering-card-body">
              <p className="gathering-type">Monthly</p>
              <h3 className="gathering-title">Circle Gatherings</h3>
              <p className="gathering-desc">
                Intimate evening gatherings where women come together in honest
                conversation. No agenda. No performance. Just presence.
              </p>
              <Link to="/contact" className="gathering-link">
                Reserve Your Place
              </Link>
            </div>
          </div>
          <div className="gathering-card fade-in">
            <div className="gathering-card-img">
              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80"
                alt="One on one coaching"
              />
              <div className="gathering-card-img-overlay" />
            </div>
            <div className="gathering-card-body">
              <p className="gathering-type">1:1 Coaching</p>
              <h3 className="gathering-title">Guided Conversations</h3>
              <p className="gathering-desc">
                Private sessions designed to help you understand yourself more deeply —
                before any strategy, goal, or plan is ever made.
              </p>
              <Link to="/contact" className="gathering-link">
                Book a Session
              </Link>
            </div>
          </div>
          <div className="gathering-card fade-in">
            <div className="gathering-card-img">
              <img
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80"
                alt="Retreat day"
              />
              <div className="gathering-card-img-overlay" />
            </div>
            <div className="gathering-card-body">
              <p className="gathering-type">Immersive</p>
              <h3 className="gathering-title">Retreat Days</h3>
              <p className="gathering-desc">
                Full-day retreats for deeper integration. Held in carefully chosen spaces
                that invite stillness and reflection.
              </p>
              <Link to="/contact" className="gathering-link">
                Enquire Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PHOTO STRIP ── */}
      <div className="photo-strip">
        <div className="photo-strip-item">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80"
            alt=""
          />
          <div className="photo-strip-item-overlay">
            <p className="photo-strip-caption">"I finally felt seen."</p>
          </div>
        </div>
        <div className="photo-strip-item">
          <img
            src="https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=600&q=80"
            alt=""
          />
          <div className="photo-strip-item-overlay">
            <p className="photo-strip-caption">"A room full of presence."</p>
          </div>
        </div>
        <div className="photo-strip-item">
          <img
            src="https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=600&q=80"
            alt=""
          />
          <div className="photo-strip-item-overlay">
            <p className="photo-strip-caption">"She arrived. She stayed."</p>
          </div>
        </div>
        <div className="photo-strip-item">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80"
            alt=""
          />
          <div className="photo-strip-item-overlay">
            <p className="photo-strip-caption">"Nothing to prove here."</p>
          </div>
        </div>
      </div>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials-section">
        <div className="testimonials-header">
          <span className="section-label">What Women Say</span>
          <h2 className="section-heading">
            Words from the <em>circle</em>
          </h2>
          <div className="divider" />
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card fade-in">
            <div className="testimonial-card-img">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80"
                alt=""
              />
            </div>
            <div className="testimonial-body">
              <div className="testimonial-quote-mark">"</div>
              <p className="testimonial-text">
                I came in carrying so much. I left feeling lighter — not because my
                problems were solved, but because I finally felt seen. That changed
                everything.
              </p>
              <div className="testimonial-author">
                <div className="author-dot" />
                <div>
                  <p className="author-name">Laila M.</p>
                  <p className="author-role">Circle Gathering Participant</p>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial-card fade-in">
            <div className="testimonial-card-img">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80"
                alt=""
              />
            </div>
            <div className="testimonial-body">
              <div className="testimonial-quote-mark">"</div>
              <p className="testimonial-text">
                For the first time in years, I wasn't performing. I was just present. The
                guided conversation helped me hear myself in a way I never had before.
              </p>
              <div className="testimonial-author">
                <div className="author-dot" />
                <div>
                  <p className="author-name">Nour A.</p>
                  <p className="author-role">1:1 Coaching Client</p>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial-card fade-in">
            <div className="testimonial-card-img">
              <img
                src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80"
                alt=""
              />
            </div>
            <div className="testimonial-body">
              <div className="testimonial-quote-mark">"</div>
              <p className="testimonial-text">
                The retreat day gave me something I didn't know I needed — space. Real,
                unhurried space to just be myself. I returned home a different woman.
              </p>
              <div className="testimonial-author">
                <div className="author-dot" />
                <div>
                  <p className="author-name">Sara K.</p>
                  <p className="author-role">Retreat Day Participant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <div className="cta-banner fade-in">
        <div className="cta-banner-text">
          <h2 className="section-heading">
            Ready to come <em style={{ color: 'rgba(245,241,234,0.8)' }}>home</em> to
            yourself?
          </h2>
          <p>Gatherings are held in intimate, limited groups. Reserve your place today.</p>
        </div>
        <Link to="/contact" className="btn-white">
          Join a Gathering
        </Link>
      </div>

      <Footer />
    </>
  )
}
