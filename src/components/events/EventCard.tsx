import { useState, useEffect, useRef, useCallback } from 'react'
import '../../styles/event-card.css'

export type EventCardProps = {
  variant: 'hero' | 'strip'
  status: 'open' | 'coming' | 'past'
  title: string          // supports <em> for italic word
  images: string[]       // rendered as slideshow; single image is static
  eventType: string
  date: string
  location: string
  description: string
  /** Past gatherings: second narrative under “The experience” */
  experienceBlock?: string
  bullets?: string[]     // hero only
  facilitator?: string   // hero only
  price?: string
  priceLabel?: string    // e.g. "per person"
  registerUrl?: string
  payUrl?: string
  waitlistUrl?: string
  onSelect?: () => void  // fired when strip card is clicked
}

// ── Slideshow hook ────────────────────────────────────────────

function useSlideshow(count: number) {
  const [active, setActive] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stop = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const start = useCallback(() => {
    if (count <= 1) return
    stop()
    timerRef.current = setInterval(() => {
      setActive(i => (i + 1) % count)
    }, 4000)
  }, [count, stop])

  useEffect(() => {
    start()
    return stop
  }, [start, stop])

  return { active, pause: stop, resume: start }
}

// ── ImagePane ─────────────────────────────────────────────────

type ImagePaneProps = {
  images: string[]
  variant: 'hero' | 'strip'
  status: 'open' | 'coming' | 'past'
  active: number
  className?: string
}

function ImagePane({ images, variant, status, active, className }: ImagePaneProps) {
  const pillLabel = status === 'open' ? 'Open' : status === 'coming' ? 'Coming Soon' : 'Past'
  const singleSlide = images.length <= 1

  return (
    <div className={`ec-image-pane ec-image-pane--${variant} ${className || ''}`}>
      <span className={`ec-pill ec-pill--${status}`}>{pillLabel}</span>
      <div className={`ec-slides ec-slides--${variant}`}>
        {images.map((src, i) => {
          const slideActive = singleSlide ? i === 0 : i === active
          return (
            <img
              key={i}
              src={src}
              alt=""
              aria-hidden
              className={`ec-slide${slideActive ? ' ec-slide--active' : ''}`}
            />
          )
        })}
      </div>
    </div>
  )
}

// ── Footer CTA ────────────────────────────────────────────────

type FooterProps = {
  variant: 'hero' | 'strip'
  status: 'open' | 'coming' | 'past'
  price?: string
  priceLabel?: string
  registerUrl?: string
  payUrl?: string
  waitlistUrl?: string
}

function Footer({ variant, status, price, priceLabel, registerUrl, payUrl, waitlistUrl }: FooterProps) {
  const priceBlock = (price || priceLabel) ? (
    <div className="ec-price">
      {price && <span className="ec-price-amount">{price}</span>}
      {priceLabel && <span className="ec-price-label">{priceLabel}</span>}
    </div>
  ) : <div />

  let cta: React.ReactNode

  if (status === 'past') {
    cta = <span className="ec-closed-text">Gathering closed</span>
  } else if (status === 'coming') {
    cta = waitlistUrl ? (
      <div className="ec-btns">
        <a href={waitlistUrl} className={`ec-btn ec-btn--blush${variant === 'strip' ? ' ec-btn--sm' : ''}`}>
          Join Waitlist
        </a>
      </div>
    ) : null
  } else {
    // open
    if (variant === 'strip') {
      cta = payUrl ? (
        <div className="ec-btns">
          <a href={payUrl} className="ec-btn ec-btn--primary ec-btn--sm">Pay Now</a>
        </div>
      ) : null
    } else {
      cta = (
        <div className="ec-btns">
          {registerUrl && <a href={registerUrl} className="ec-btn ec-btn--outline">Register</a>}
          {payUrl && <a href={payUrl} className="ec-btn ec-btn--primary">Pay Now</a>}
        </div>
      )
    }
  }

  return (
    <div className="ec-footer">
      <div className="ec-cta-row">
        {priceBlock}
        {cta}
      </div>
    </div>
  )
}

// ── EventCard ─────────────────────────────────────────────────

export function EventCard(props: EventCardProps) {
  const {
    variant,
    status,
    title,
    images,
    eventType,
    date,
    location,
    description,
    experienceBlock,
    bullets,
    facilitator,
    price,
    priceLabel,
    registerUrl,
    payUrl,
    waitlistUrl,
    onSelect,
  } = props

  const { active, pause, resume } = useSlideshow(images.length)

  const cardClass = `ec ec--${variant} ec--${status}`

  const footerProps: FooterProps = {
    variant, status, price, priceLabel, registerUrl, payUrl, waitlistUrl,
  }

  if (variant === 'hero') {
    return (
      <article
        className={cardClass}
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        <ImagePane images={images} variant="hero" status={status} active={active} className="ec-image-pane--hero" />

        <div className="ec-body--hero">
          <p className="ec-eyebrow">
            {eventType} · {date} · {location}
          </p>

          <h3
            className="ec-title"
            dangerouslySetInnerHTML={{ __html: title }}
          />

          {experienceBlock ? (
            <>
              <p className="ec-section-label">The Gathering</p>
              <p className="ec-desc ec-desc--past-gathering">
                {description
                  .split(/\n\n+/)
                  .map((p) => p.trim())
                  .filter(Boolean)
                  .join(' ')}
              </p>
              <p className="ec-section-label">The experience</p>
              <p className="ec-desc ec-desc--past-experience">{experienceBlock}</p>
            </>
          ) : (
            <p className="ec-desc">{description}</p>
          )}

          {bullets && bullets.length > 0 && (
            <>
              <p className="ec-section-label">What you'll receive</p>
              <ul className="ec-bullets">
                {bullets.map((b, i) => (
                  <li key={i} className="ec-bullet">
                    <span aria-hidden="true">• </span>
                    {b}
                  </li>
                ))}
              </ul>
            </>
          )}

          {facilitator && <p className="ec-facilitator">{facilitator}</p>}

          <Footer {...footerProps} />
        </div>
      </article>
    )
  }

  // Strip variant
  return (
    <button
      type="button"
      className={cardClass}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onClick={onSelect}
      aria-label={title}
    >
      <ImagePane images={images} variant="strip" status={status} active={active} />

      <div className="ec-body--strip">
        <p className="ec-eyebrow ec-eyebrow--strip">
          {eventType} · {date}
        </p>

        <h3
          className="ec-title ec-title--strip"
          dangerouslySetInnerHTML={{ __html: title }}
        />

        <p className="ec-desc ec-desc--strip">{description}</p>

        <Footer {...footerProps} />
      </div>
    </button>
  )
}

// ── EventCardScrollRow ────────────────────────────────────────

export function EventCardScrollRow({ children }: { children: React.ReactNode }) {
  return <div className="ec-scroll-row">{children}</div>
}
