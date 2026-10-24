import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { EventCard, toEventCardProps } from '../components/events'
import { CALENDLY_INTRO_CALL_URL, INNER_CIRCLE_WAITLIST_URL } from '../constants/contact'
import { WHATSAPP_COMMUNITY_URL } from '../constants/social'
import { getNextUpcomingEvent } from '../data/events'

const ABOUT_PURPOSE_VIDEO_SRC = '/videos/elysian_house_intro.MP4'

export function HomePage() {
  const nextGathering = getNextUpcomingEvent()
  const aboutVideoRef = useRef<HTMLVideoElement>(null)
  const [aboutVideoPaused, setAboutVideoPaused] = useState(true)

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
            src="/images/elysian/elysian-founder-portrait-yellow-blazer-9479.webp"
            alt="Portrait of the Elysian House founder"
          />
          <div className="hero-right-overlay" />
          <div className="hero-quote">
            <div className="hero-ornament" />
            <blockquote>
              "The most important relationship a woman has is the one she has with herself."
            </blockquote>
            <cite>Acha Zita . ElysianHouse Founder</cite>
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
          <Link to="/services" className="btn-ghost about-purpose-cta">
            Our Gatherings
          </Link>
        </div>
        <div className="about-visual fade-in">
          <div className="about-video-wrap">
            <video
              ref={aboutVideoRef}
              src={ABOUT_PURPOSE_VIDEO_SRC}
              autoPlay
              muted
              loop
              playsInline
              controls
              aria-label="Moments from an Elysian House gathering"
              onLoadedData={(e) => setAboutVideoPaused(e.currentTarget.paused)}
              onPlay={() => setAboutVideoPaused(false)}
              onPause={() => setAboutVideoPaused(true)}
            />
            {aboutVideoPaused ? (
              <div className="about-video-play-hint">
                <button
                  type="button"
                  className="about-video-play-btn"
                  aria-label="Play video"
                  onClick={() => void aboutVideoRef.current?.play()}
                >
                  <svg className="about-video-play-icon" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="12" cy="12" r="11" fill="rgba(46, 46, 46, 0.42)" stroke="rgba(245, 241, 234, 0.55)" strokeWidth="1" />
                    <path d="M10.5 8.5v7l6-3.5-6-3.5z" fill="rgba(245, 241, 234, 0.95)" />
                  </svg>
                </button>
              </div>
            ) : null}
          </div>
          <div className="about-img-main">
            {/*
            <img
              src="/images/elysian/elysian-portrait-navy-dress-sofa-7802.webp"
              alt="Woman in quiet reflection in a warm, softly lit room"
            />
            */}
          </div>
          <div className="about-img-accent">
            {/*
            <img
              src="/images/elysian/elysian-collaboration-two-women-rug-gallery-7880.webp"
              alt="Two women in conversation in a creative space"
            />
            */}
          </div>
          {/*
          <div className="about-quote-chip">
            <p>"Growth does not come from pushing harder but from listening deeper."</p>
          </div>
          */}
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
              Exploring emotional connection, boundaries and conscious partnership, the
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

      {/* ── COMMUNITY CTA ── */}
      <div className="cta-banner fade-in">
        <div className="cta-banner-text">
          <h2 className="section-heading">
            Ready to come <em style={{ color: 'rgba(245,241,234,0.8)' }}>home</em> to
            yourself?
          </h2>
          <p>
            Stay connected between gatherings. Join our WhatsApp community for updates and
            conversation.
          </p>
        </div>
        <a
          href={WHATSAPP_COMMUNITY_URL}
          className="btn-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join the community
        </a>
      </div>

      {/* ── HOW WOMEN EXPERIENCE (index6 layout) ── */}
      <section className="experience-section" id="how-we-experience">
        <div className="experience-inner">
          <div className="experience-left fade-in">
            <span className="section-label">How Women Experience It</span>
            <h2 className="section-heading">
              Three ways to enter the <em>circle</em>
            </h2>
            <div className="divider" />
            <p>
              Whether you&apos;re ready to step in or simply curious, there is a way for you
              here. Each offering is designed to meet you where you are.
            </p>
          </div>

          <div className="experience-cards">
            <div className="exp-card available fade-in">
              <span className="exp-card-status exp-card-status--open" aria-label="Open">
                Open
              </span>
              <div className="exp-card-img">
                <img
                  src="/images/elysian/elysian-courage-choose-panel-conversation-8103.webp"
                  alt="Women in a guided panel conversation at an Elysian House gathering"
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
                  Guided conversations and community gatherings, thoughtfully designed
                  spaces where women come together around themes that matter. Open to all.
                </p>
                <div className="exp-card-footer">
                  <Link to="/services#upcoming-gatherings" className="exp-card-cta">
                    Explore upcoming events
                  </Link>
                </div>
              </div>
            </div>

            <div className="exp-card available fade-in">
              <span className="exp-card-status exp-card-status--open" aria-label="Open">
                Open
              </span>
              <div className="exp-card-img">
                <img
                  src="/images/elysian/elysian-panel-discussion-resilience-prompt-0686.webp"
                  alt="Panel discussion at an Elysian House gathering"
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
                  with the same women, building trust, continuity, and real depth over time.
                </p>
                <div className="exp-card-footer">
                  <a
                    href={INNER_CIRCLE_WAITLIST_URL}
                    className="exp-card-cta"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join the waitlist
                  </a>
                </div>
              </div>
            </div>

            <div className="exp-card available fade-in">
              <span className="exp-card-status exp-card-status--open" aria-label="Open">
                Open
              </span>
              <div className="exp-card-img">
                <img
                  src="/images/elysian/elysian-founder-desk-focus-tablet-1574.webp"
                  alt="Focused reflection and planning at a quiet desk"
                />
                <div className="exp-card-img-overlay" />
              </div>
              <div className="exp-card-body">
                <p className="exp-card-number">03</p>
                <div className="exp-card-labels">
                  <span className="exp-card-type-label">One-on-one coaching</span>
                </div>
                <h3 className="exp-card-title">
                  The Live True <em>Journey</em>
                </h3>
                <p className="exp-card-desc">
                  Get clear on what you want. Create a life that&apos;s true to you. A
                  personalised four-week coaching experience for women ready to expand
                  their mindset, challenge limiting beliefs, and build self-trust.
                </p>
                <p className="exp-card-small-detail">
                  Four weeks · Private coaching · Online or in person
                </p>
                <div className="exp-card-footer exp-card-ctas">
                  <a href="#live-true-journey" className="exp-card-cta">
                    Explore the Journey
                  </a>
                  <a
                    href={CALENDLY_INTRO_CALL_URL}
                    className="exp-card-cta"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book Your Free Clarity Call
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVE TRUE JOURNEY (1:1 coaching detail) ── */}
      <section className="pillars-section live-true-journey-section" id="live-true-journey">
        <div className="pillars-header">
          <span className="section-label">One-on-One Coaching</span>
          <h2 className="section-heading">
            The Live True <em>Journey</em>
          </h2>
          <div className="divider" />
        </div>

        <div className="live-true-journey-intro">
          <div className="live-true-journey-intro-col">
            <p className="live-true-journey-lede">
              There comes a time when you begin to ask: Am I living the life I truly
              want? What does fulfillment mean to me? What would I try if I trusted
              myself more?
            </p>
            <p className="live-true-journey-lede">
              The Live True Journey is a personalised, four-week, one-on-one coaching
              experience to explore your values, challenge unhelpful beliefs, develop a
              growth mindset, and take realistic steps toward the life you want to
              create.
            </p>
          </div>
          <div className="live-true-journey-intro-col">
            <h3 className="live-true-journey-subheading live-true-journey-subheading--left">
              Who it&apos;s for
            </h3>
            <ul className="live-true-journey-list">
              <li>Women who want more meaning, fulfillment, and possibility in everyday life.</li>
              <li>Women who are ready to grow but want clarity on where to begin.</li>
              <li>Women who want to understand their beliefs, patterns, and choices.</li>
              <li>Women seeking greater self-trust and confidence in their decisions.</li>
              <li>Women ready to turn reflection into intentional action.</li>
            </ul>
          </div>
        </div>

        <h3 className="live-true-journey-subheading">Your four-week journey</h3>
        <div className="pillars-grid pillars-grid--four">
          <div className="pillar-card fade-in">
            <p className="pillar-num">Week 1</p>
            <h3 className="pillar-title">
              <em>Understand</em>
            </h3>
            <p className="pillar-text">
              Where am I now? Explore what feels fulfilling, what feels out of alignment,
              and the patterns influencing your choices.
            </p>
          </div>
          <div className="pillar-card fade-in">
            <p className="pillar-num">Week 2</p>
            <h3 className="pillar-title">
              Get <em>Clear</em>
            </h3>
            <p className="pillar-text">
              What do I truly want? Identify your values, priorities, and personal
              definition of success and fulfillment.
            </p>
          </div>
          <div className="pillar-card fade-in">
            <p className="pillar-num">Week 3</p>
            <h3 className="pillar-title">
              <em>Expand</em>
            </h3>
            <p className="pillar-text">
              What else is possible? Explore self-doubt and limiting beliefs, and
              practise approaching challenges with curiosity and a growth mindset.
            </p>
          </div>
          <div className="pillar-card fade-in">
            <p className="pillar-num">Week 4</p>
            <h3 className="pillar-title">
              Live <em>True</em>
            </h3>
            <p className="pillar-text">
              How do I move forward? Turn your insights into practical choices and a
              personalised 30-day action plan.
            </p>
          </div>
        </div>

        <h3 className="live-true-journey-subheading">What&apos;s included</h3>
        <ul className="live-true-journey-list">
          <li>Four private 60-minute sessions over four weeks.</li>
          <li>Guided reflection exercises between sessions.</li>
          <li>A personalised 30-day action plan.</li>
          <li>Online or in-person session options.</li>
        </ul>

        <h3 className="live-true-journey-subheading">Founding client investment</h3>
        <div className="pillars-grid pillars-grid--two">
          <div className="pillar-card fade-in">
            <p className="pillar-num">Online</p>
            <h3 className="pillar-title">AED 400</h3>
            <p className="pillar-text">
              The complete four-week programme, four private video sessions.
            </p>
          </div>
          <div className="pillar-card fade-in">
            <p className="pillar-num">In person</p>
            <h3 className="pillar-title">AED 500</h3>
            <p className="pillar-text">
              The complete four-week programme, four private sessions at an agreed
              location. Any additional travel or venue costs are disclosed and agreed in
              advance.
            </p>
          </div>
        </div>
        <p className="live-true-journey-note">
          These introductory prices apply to the first five paying coaching clients.
        </p>

        <div className="cta-banner live-true-journey-cta fade-in">
          <div className="cta-banner-text">
            <h2 className="section-heading">
              Not sure if coaching is <em style={{ color: 'rgba(245,241,234,0.8)' }}>right for you?</em>
            </h2>
            <p>
              Book a complimentary 30-minute Clarity Call to discuss where you are, what
              you hope to work toward, and whether The Live True Journey is a good fit.
              There&apos;s no obligation to enrol.
            </p>
          </div>
          <a
            href={CALENDLY_INTRO_CALL_URL}
            className="btn-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Your Free Clarity Call
          </a>
        </div>

        <p className="live-true-journey-closing">
          Personal growth isn&apos;t about becoming someone else or constantly trying to
          fix yourself. It&apos;s about understanding yourself, recognising new
          possibilities, and making choices that feel true to you.
          <br />
          Come Home. Get Clear. Live True.
        </p>
        <p className="live-true-journey-scope-note">
          This is personal-development coaching, not psychotherapy, medical treatment, or
          mental health care. Individual outcomes vary.
        </p>
      </section>

      {/* ── GATHERINGS SECTION / DARK ──
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
                src="/images/elysian/elysian-gathering-circle-seating-wide-0684.webp"
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
                src="/images/elysian/elysian-founder-desk-writing-glasses-1586.webp"
                alt="One on one coaching"
              />
              <div className="gathering-card-img-overlay" />
            </div>
            <div className="gathering-card-body">
              <p className="gathering-type">1:1 Coaching</p>
              <h3 className="gathering-title">Guided Conversations</h3>
              <p className="gathering-desc">
                Private sessions designed to help you understand yourself more deeply,
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
                src="/images/elysian/elysian-deep-work-laptop-rug-space-7888.webp"
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
      */}

      {/* ── PHOTO STRIP ── */}
      <div className="photo-strip">
        <div className="photo-strip-item">
          <img
            src="/images/elysian/elysian-becoming-her-gathering-5030.webp"
            alt="Women gathered at the Becoming Her event in Dubai"
          />
          <div className="photo-strip-item-overlay">
            <p className="photo-strip-caption">"A room full of presence."</p>
          </div>
        </div>
        <div className="photo-strip-item">
          <img
            src="/images/elysian/elysian-event-transform-thrive-attendee-seated-0527.webp"
            alt="Guest seated at an Elysian House event"
          />
          <div className="photo-strip-item-overlay">
            <p className="photo-strip-caption">"I finally felt seen."</p>
          </div>
        </div>
        <div className="photo-strip-item">
          <img
            src="/images/elysian/elysian-courage-choose-guests-portrait-8020.webp"
            alt="Guests together at The Courage to Choose Yourself gathering"
          />
          <div className="photo-strip-item-overlay">
            <p className="photo-strip-caption">"She arrived. She stayed."</p>
          </div>
        </div>
        <div className="photo-strip-item">
          <img
            src="/images/elysian/elysian-founder-speaker-transform-thrive-podium-0705.webp"
            alt="Speaker welcoming the room at Transform and Thrive"
          />
          <div className="photo-strip-item-overlay">
            <p className="photo-strip-caption">"Nothing to prove here."</p>
          </div>
        </div>
      </div>

      {/* ── TESTIMONIALS (commented out; replaced by next-gathering highlight below) ──
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
                src="/images/elysian/elysian-portrait-studio-turquoise-blazer-6426.webp"
                alt=""
              />
            </div>
            <div className="testimonial-body">
              <div className="testimonial-quote-mark">"</div>
              <p className="testimonial-text">
                I came in carrying so much. I left feeling lighter, not because my
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
                src="/images/elysian/elysian-portrait-black-dress-joy-sofa-7810.webp"
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
                src="/images/elysian/elysian-focus-laptop-creative-space-7883.webp"
                alt=""
              />
            </div>
            <div className="testimonial-body">
              <div className="testimonial-quote-mark">"</div>
              <p className="testimonial-text">
                The retreat day gave me something I didn&apos;t know I needed: space. Real,
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
      */}

      {nextGathering ? (
        <section className="testimonials-section home-next-gathering-highlight events-interactive">
          <div className="testimonials-header">
            <span className="section-label">Next gathering</span>
            <h2 className="section-heading">
              The next time we <em>meet</em>
            </h2>
            <div className="divider" />
            <p className="home-next-gathering-lede">
              Chosen by date, the upcoming circle closest to today.{' '}
              <Link to="/services">View all gatherings</Link>
            </p>
          </div>
          <div className="home-next-gathering-hero-slot fade-in">
            <EventCard variant="hero" {...toEventCardProps(nextGathering)} />
          </div>
        </section>
      ) : null}

      <section
        className="cta-banner home-prefooter-cta fade-in"
        aria-labelledby="home-prefooter-cta-heading"
      >
        <div className="cta-banner-text">
          <h2 id="home-prefooter-cta-heading" className="section-heading">
            Something is pulling you toward Elysian House.{' '}
            <em style={{ color: 'rgba(245,241,234,0.8)' }}>Start here.</em>
          </h2>
          <p>
            The Coming Home Call is a free 30-minute conversation with Zita. No agenda, no
            pressure. Just an honest space to get clear on where you are and what you actually
            need right now.
          </p>
          <p>Come as you are. Leave with clarity.</p>
        </div>
        <a
          href={CALENDLY_INTRO_CALL_URL}
          className="btn-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book your call
        </a>
      </section>

      <Footer />
    </>
  )
}
