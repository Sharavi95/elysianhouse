import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { EventRecord, GalleryImage } from '../types/event'

function galleryFor(event: EventRecord): GalleryImage[] {
  if (event.galleryImages.length > 0) return event.galleryImages
  return [{ src: event.primaryImage, alt: event.title }]
}

function initialSelectedId(events: EventRecord[]): string {
  const featured = events.find((e) => e.featured)
  return featured?.id ?? events[0]?.id ?? ''
}

function badgeClass(variant: EventRecord['badgeVariant'] | undefined): string {
  if (variant === 'few-left') return 'event-badge few-left'
  if (variant === 'sold-out') return 'event-badge sold-out'
  return 'event-badge'
}

export type InteractiveEventsSectionProps = {
  variant: 'upcoming' | 'past'
  events: EventRecord[]
  sectionLabel: string
  heading: ReactNode
  /** Past section note (right side of header) */
  headerNote?: string
  showExpressInterestLink?: boolean
  /** For scroll targets / deep links */
  featuredAnchorId: string
}

export function InteractiveEventsSection({
  variant,
  events,
  sectionLabel,
  heading,
  headerNote,
  showExpressInterestLink,
  featuredAnchorId,
}: InteractiveEventsSectionProps) {
  const featuredRef = useRef<HTMLElement | null>(null)
  const stripRef = useRef<HTMLUListElement | null>(null)
  const stripItemRefs = useRef<Map<string, HTMLLIElement | null>>(new Map())
  const [selectedId, setSelectedId] = useState(() => initialSelectedId(events))
  const [slideIdx, setSlideIdx] = useState(0)

  const selected = useMemo(
    () => events.find((e) => e.id === selectedId) ?? events[0],
    [events, selectedId],
  )

  const slides = useMemo(() => (selected ? galleryFor(selected) : []), [selected])

  useEffect(() => {
    setSlideIdx(0)
  }, [selectedId])

  useEffect(() => {
    const strip = stripRef.current
    const item = stripItemRefs.current.get(selectedId)
    if (!strip || !item) return
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const stripRect = strip.getBoundingClientRect()
    const itemRect = item.getBoundingClientRect()
    const pad = 8
    if (itemRect.left < stripRect.left + pad) {
      item.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest', inline: 'start' })
    } else if (itemRect.right > stripRect.right - pad) {
      item.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest', inline: 'end' })
    }
  }, [selectedId])

  const scrollFilmStrip = useCallback((dir: -1 | 1) => {
    const root = stripRef.current
    if (!root) return
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const firstItem = root.querySelector('.events-film-strip-item') as HTMLElement | null
    const cs = getComputedStyle(root)
    const gapRaw = cs.columnGap || cs.gap || '0'
    const gap = Number.parseFloat(gapRaw) || 0
    const step = firstItem ? firstItem.getBoundingClientRect().width + gap : root.clientWidth * 0.4
    root.scrollBy({ left: dir * step, behavior: reduceMotion ? 'auto' : 'smooth' })
  }, [])

  const selectEvent = useCallback((id: string) => {
    setSelectedId(id)
    requestAnimationFrame(() => {
      const reduceMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      featuredRef.current?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      })
    })
  }, [])

  const goSlide = useCallback(
    (dir: number) => {
      if (!slides.length) return
      setSlideIdx((i) => (i + dir + slides.length) % slides.length)
    },
    [slides.length],
  )

  if (!events.length || !selected) return null

  const sectionClass = variant === 'upcoming' ? 'upcoming-section' : 'past-section'

  return (
    <section className={`${sectionClass} events-interactive`}>
      <div className={variant === 'upcoming' ? 'upcoming-header' : 'past-header'}>
        <div>
          <span className="section-label">{sectionLabel}</span>
          <h2 className="section-heading">{heading}</h2>
        </div>
        {variant === 'upcoming' && showExpressInterestLink ? (
          <Link to="/contact" className="btn-ghost events-upcoming-header-cta">
            Express Interest
          </Link>
        ) : headerNote ? (
          <p className="past-header-note">{headerNote}</p>
        ) : null}
      </div>

      <article
        ref={featuredRef}
        id={featuredAnchorId}
        className="events-featured"
        aria-live="polite"
      >
        <div className="events-featured-slideshow">
          <div className="events-slideshow-inner">
            {slides.map((img, i) => (
              <div
                key={`${selected.id}-${img.src}-${i}`}
                className={`events-slideshow-slide ${i === slideIdx ? 'is-active' : ''}`}
                aria-hidden={i !== slideIdx}
              >
                <img src={img.src} alt={img.alt} />
              </div>
            ))}
          </div>
          <div className="events-slideshow-overlay" aria-hidden />
          {slides.length > 1 ? (
            <>
              <button
                type="button"
                className="carousel-btn carousel-prev events-slideshow-btn"
                onClick={() => goSlide(-1)}
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                type="button"
                className="carousel-btn carousel-next events-slideshow-btn"
                onClick={() => goSlide(1)}
                aria-label="Next image"
              >
                →
              </button>
              <div className="carousel-dots events-slideshow-dots" role="tablist" aria-label="Gallery">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === slideIdx}
                    className={`carousel-dot ${i === slideIdx ? 'active' : ''}`}
                    onClick={() => setSlideIdx(i)}
                    aria-label={`Image ${i + 1} of ${slides.length}`}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>

        <div className="events-featured-body" key={selected.id}>
          {variant === 'past' ? (
            <span className="event-past-chip" aria-label="Past gathering">
              Past
            </span>
          ) : null}
          <p className="events-featured-date">{selected.date}</p>
          {selected.eventTypeTag ? (
            <span className="event-type-tag">{selected.eventTypeTag}</span>
          ) : null}
          <h3 className="event-title-up events-featured-title">{selected.title}</h3>
          <p className="event-desc-up events-featured-desc">{selected.description}</p>

          {variant === 'upcoming' && (selected.timeRange || selected.location) ? (
            <div className="event-meta events-featured-meta">
              {selected.timeRange ? (
                <div className="event-meta-item">
                  <span className="event-meta-icon">◷</span>
                  <span className="event-meta-text">{selected.timeRange}</span>
                </div>
              ) : null}
              {selected.location ? (
                <div className="event-meta-item">
                  <span className="event-meta-icon">◎</span>
                  <span className="event-meta-text">{selected.location}</span>
                </div>
              ) : null}
            </div>
          ) : null}

          {variant === 'past' && selected.attendeeLine ? (
            <p className="events-featured-attendee">{selected.attendeeLine}</p>
          ) : null}

          {variant === 'upcoming' && selected.spotsLine ? (
            <div className="events-featured-cta-row">
              <p className="event-spots">
                Availability:{' '}
                <span className={selected.spotsSoldOut ? 'sold' : undefined}>{selected.spotsLine}</span>
              </p>
              {selected.ctaLabel ? (
                <Link to={`/contact?eventId=${encodeURIComponent(selected.id)}`} className="btn-book">
                  {selected.ctaLabel}
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      </article>

      <div className="events-film-strip-outer">
        <button
          type="button"
          className="events-film-nav events-film-nav--prev"
          aria-label="Scroll gatherings left"
          aria-controls={`film-strip-${featuredAnchorId}`}
          onClick={() => scrollFilmStrip(-1)}
        >
          ‹
        </button>
        <button
          type="button"
          className="events-film-nav events-film-nav--next"
          aria-label="Scroll gatherings right"
          aria-controls={`film-strip-${featuredAnchorId}`}
          onClick={() => scrollFilmStrip(1)}
        >
          ›
        </button>
        <ul
          ref={stripRef}
          id={`film-strip-${featuredAnchorId}`}
          className="events-film-strip"
          aria-label="Browse gatherings"
        >
          {events.map((ev) => {
            const active = ev.id === selectedId
            return (
              <li
                key={ev.id}
                ref={(node) => {
                  if (node) stripItemRefs.current.set(ev.id, node)
                  else stripItemRefs.current.delete(ev.id)
                }}
                className="events-film-strip-item"
              >
                <button
                  type="button"
                  className={`event-card-upcoming events-film-card fade-in ${active ? 'is-active' : ''}`}
                  onClick={() => selectEvent(ev.id)}
                  aria-current={active ? 'true' : undefined}
                >
                  {active ? (
                    <span className="events-film-viewing" aria-hidden>
                      Viewing
                    </span>
                  ) : null}
                  <div className="event-card-img">
                    <img src={ev.primaryImage} alt="" />
                    <div className="event-card-img-overlay" aria-hidden />
                  </div>
                  {variant === 'past' ? (
                    <span className="event-badge">Past</span>
                  ) : (
                    <span className={badgeClass(ev.badgeVariant)}>{ev.badge ?? 'Open'}</span>
                  )}
                  <div className="event-card-top">
                    {ev.dateDay && ev.dateMonth && ev.dateYear ? (
                      <div className="event-date-block">
                        <div className="event-day">{ev.dateDay}</div>
                        <div className="event-month-year">
                          <span className="event-month">{ev.dateMonth}</span>
                          <span className="event-year">{ev.dateYear}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="events-film-date-fallback">{ev.date}</p>
                    )}
                    {ev.eventTypeTag ? <span className="event-type-tag">{ev.eventTypeTag}</span> : null}
                    <h3 className="event-title-up">{ev.title}</h3>
                    <p className="event-desc-up events-film-strip-desc">{ev.description}</p>
                  </div>
                  {ev.timeRange || ev.location ? (
                    <div className="event-meta">
                      {ev.timeRange ? (
                        <div className="event-meta-item">
                          <span className="event-meta-icon">◷</span>
                          <span className="event-meta-text">{ev.timeRange}</span>
                        </div>
                      ) : null}
                      {ev.location ? (
                        <div className="event-meta-item">
                          <span className="event-meta-icon">◎</span>
                          <span className="event-meta-text">{ev.location}</span>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                  <div className="event-card-bottom">
                    {variant === 'upcoming' && ev.spotsLine ? (
                      <p className="event-spots">
                        Availability:{' '}
                        <span className={ev.spotsSoldOut ? 'sold' : undefined}>{ev.spotsLine}</span>
                      </p>
                    ) : null}
                    {variant === 'past' && ev.attendeeLine ? (
                      <p className="event-spots">{ev.attendeeLine}</p>
                    ) : null}
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
