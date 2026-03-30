import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { EventRecord, GalleryImage } from '../types/event'
import {
  EventCardFields,
  EventCardHero,
  EventCardStrip,
  EventPill,
  buildEventMetaItems,
  cappedExploreBullets,
  getHeroOverview,
  upcomingStatusPill,
} from './events'

function galleryFor(event: EventRecord): GalleryImage[] {
  if (event.galleryImages.length > 0) return event.galleryImages
  return [{ src: event.primaryImage, alt: event.title }]
}

function initialSelectedId(events: EventRecord[]): string {
  const featured = events.find((e) => e.featured)
  return featured?.id ?? events[0]?.id ?? ''
}

function descriptionParagraphs(text: string): string[] {
  return text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
}

export type InteractiveEventsSectionProps = {
  variant: 'upcoming' | 'past'
  events: EventRecord[]
  sectionLabel: string
  heading: ReactNode
  headerNote?: string
  showExpressInterestLink?: boolean
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

    const alignStripToItem = () => {
      const pad = 8
      const itemLeft = item.offsetLeft
      const itemRight = itemLeft + item.offsetWidth
      const viewLeft = strip.scrollLeft
      const viewRight = strip.scrollLeft + strip.clientWidth

      let next = strip.scrollLeft
      if (itemLeft < viewLeft + pad) {
        next = Math.max(0, itemLeft - pad)
      } else if (itemRight > viewRight - pad) {
        next = itemRight - strip.clientWidth + pad
      }

      if (next !== strip.scrollLeft) {
        const reduceMotion =
          typeof window !== 'undefined' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches
        strip.scrollTo({ left: next, behavior: reduceMotion ? 'auto' : 'smooth' })
      }
    }

    // After layout — scrollIntoView on the <li> was scrolling the document (page jumped to mid-section on load)
    const id = requestAnimationFrame(alignStripToItem)
    return () => cancelAnimationFrame(id)
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

  const heroMetaItems = buildEventMetaItems(selected)
  const heroStatusPills =
    variant === 'past' ? (
      <>
        <EventPill variant="past">Past</EventPill>
        {selected.pastStatusLabel ? (
          <EventPill variant="completed">Completed</EventPill>
        ) : null}
      </>
    ) : (
      (() => {
        const { kind, label } = upcomingStatusPill(selected)
        return <EventPill variant={kind}>{label}</EventPill>
      })()
    )

  const heroMedium = getHeroOverview(selected)
  const heroDescription = (
    <>
      {descriptionParagraphs(heroMedium).map((para) => (
        <p key={para} className="event-cardsys-desc-para">
          {para}
        </p>
      ))}
    </>
  )

  const heroEnrichment =
    variant === 'past' && selected.experienceBlock ? (
      <>
        <h4 className="event-cardsys-block-heading">The experience</h4>
        <p className="event-cardsys-desc-para">{selected.experienceBlock}</p>
      </>
    ) : variant === 'upcoming' &&
      selected.exploreBullets &&
      selected.exploreBullets.length > 0 ? (
      <>
        <h4 className="event-cardsys-block-heading">
          {selected.exploreSectionTitle ?? 'What we will explore'}
        </h4>
        <ul className="event-cardsys-explore-list">
          {cappedExploreBullets(selected).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {selected.closingNote ? (
          <p className="event-cardsys-closing-note">{selected.closingNote}</p>
        ) : null}
      </>
    ) : variant === 'upcoming' && selected.closingNote ? (
      <p className="event-cardsys-closing-note">{selected.closingNote}</p>
    ) : null

  const heroAvailability =
    variant === 'upcoming' ? (
      selected.ticketsOpenNote ? (
        <p className="event-cardsys-avail-text">{selected.ticketsOpenNote}</p>
      ) : selected.spotsLine ? (
        <p className="event-cardsys-avail-text">
          Availability:{' '}
          <span className={selected.spotsSoldOut ? 'is-sold' : undefined}>{selected.spotsLine}</span>
        </p>
      ) : null
    ) : selected.attendeeLine ? (
      <p className="event-cardsys-avail-text">{selected.attendeeLine}</p>
    ) : null

  const detailPath = `/gatherings/${encodeURIComponent(selected.id)}`
  const readDetailsBtn = (
    <Link to={detailPath} className="event-cardsys-btn event-cardsys-btn--ghost">
      Read full details
    </Link>
  )

  const heroRegisterBtn =
    variant === 'upcoming' && !selected.ticketsOpenNote ? (
      selected.registrationUrl ? (
        <a
          href={selected.registrationUrl}
          className="event-cardsys-btn event-cardsys-btn--primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          {selected.ctaLabel ?? 'Register'}
        </a>
      ) : selected.ctaLabel ? (
        <Link
          to={`/contact?eventId=${encodeURIComponent(selected.id)}`}
          className="event-cardsys-btn event-cardsys-btn--primary"
        >
          {selected.ctaLabel}
        </Link>
      ) : null
    ) : null

  const heroPayBtn =
    variant === 'upcoming' && selected.paymentUrl ? (
      <a
        href={selected.paymentUrl}
        className="event-cardsys-btn event-cardsys-btn--ghost"
        target="_blank"
        rel="noopener noreferrer"
      >
        Pay online
      </a>
    ) : null

  const heroPrimaryAction =
    variant === 'upcoming' ? (
      <div className="event-cardsys-primary-actions">
        {heroRegisterBtn}
        {heroPayBtn}
      </div>
    ) : (
      <div className="event-cardsys-primary-actions">{readDetailsBtn}</div>
    )

  const heroSecondaryActions = null

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

      <EventCardHero
        innerRef={featuredRef}
        anchorId={featuredAnchorId}
        media={
          <div className="event-cardsys-slideshow">
            <div className="event-cardsys-slideshow-inner">
              {slides.map((img, i) => (
                <div
                  key={`${selected.id}-${img.src}-${i}`}
                  className={`event-cardsys-slideshow-slide ${i === slideIdx ? 'is-active' : ''}`}
                  aria-hidden={i !== slideIdx}
                >
                  <img src={img.src} alt={img.alt} />
                </div>
              ))}
            </div>
            <div className="event-cardsys-media-overlay event-cardsys-media-overlay--hero" aria-hidden />
            {slides.length > 1 ? (
              <>
                <button
                  type="button"
                  className="carousel-btn carousel-prev event-cardsys-slideshow-btn"
                  onClick={() => goSlide(-1)}
                  aria-label="Previous image"
                >
                  ←
                </button>
                <button
                  type="button"
                  className="carousel-btn carousel-next event-cardsys-slideshow-btn"
                  onClick={() => goSlide(1)}
                  aria-label="Next image"
                >
                  →
                </button>
                <div className="carousel-dots event-cardsys-slideshow-dots" role="tablist" aria-label="Gallery">
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
        }
      >
        <EventCardFields
          key={selected.id}
          layout="hero"
          event={selected}
          visualStyle={variant === 'upcoming' ? 'commerce' : 'default'}
          statusPills={heroStatusPills}
          description={heroDescription}
          metaItems={variant === 'upcoming' ? [] : heroMetaItems}
          enrichment={heroEnrichment}
          availability={heroAvailability}
          primaryAction={heroPrimaryAction}
          secondaryActions={heroSecondaryActions}
        />
      </EventCardHero>

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
                <EventCardStrip
                  event={ev}
                  sectionVariant={variant}
                  isActive={active}
                  onSelect={() => selectEvent(ev.id)}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
