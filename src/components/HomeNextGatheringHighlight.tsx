import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { EventRecord, GalleryImage } from '../types/event'
import {
  EventCardFields,
  EventCardHero,
  EventPill,
  cappedExploreBullets,
  getHeroOverview,
  upcomingStatusPill,
} from './events'

function galleryFor(event: EventRecord): GalleryImage[] {
  if (event.galleryImages.length > 0) return event.galleryImages
  return [{ src: event.primaryImage, alt: event.title }]
}

function descriptionParagraphs(text: string): string[] {
  return text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
}

type HomeNextGatheringHighlightProps = {
  event: EventRecord
}

/**
 * Single upcoming hero card: same structure and commerce styling as InteractiveEventsSection hero.
 */
export function HomeNextGatheringHighlight({ event }: HomeNextGatheringHighlightProps) {
  const [slideIdx, setSlideIdx] = useState(0)
  const slides = useMemo(() => galleryFor(event), [event])

  useEffect(() => {
    setSlideIdx(0)
  }, [event.id])

  const goSlide = useCallback(
    (dir: number) => {
      if (!slides.length) return
      setSlideIdx((i) => (i + dir + slides.length) % slides.length)
    },
    [slides.length],
  )

  const { kind, label } = upcomingStatusPill(event)
  const heroStatusPills = <EventPill variant={kind}>{label}</EventPill>

  const heroMedium = getHeroOverview(event)
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
    event.exploreBullets && event.exploreBullets.length > 0 ? (
      <>
        <h4 className="event-cardsys-block-heading">
          {event.exploreSectionTitle ?? 'What we will explore'}
        </h4>
        <ul className="event-cardsys-explore-list">
          {cappedExploreBullets(event).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {event.closingNote ? <p className="event-cardsys-closing-note">{event.closingNote}</p> : null}
      </>
    ) : event.closingNote ? (
      <p className="event-cardsys-closing-note">{event.closingNote}</p>
    ) : null

  const heroAvailability = event.ticketsOpenNote ? (
    <p className="event-cardsys-avail-text">{event.ticketsOpenNote}</p>
  ) : event.spotsLine ? (
    <p className="event-cardsys-avail-text">
      Availability:{' '}
      <span className={event.spotsSoldOut ? 'is-sold' : undefined}>{event.spotsLine}</span>
    </p>
  ) : null

  const heroRegisterBtn =
    !event.ticketsOpenNote && event.registrationUrl ? (
      <a
        href={event.registrationUrl}
        className="event-cardsys-btn event-cardsys-btn--primary"
        target="_blank"
        rel="noopener noreferrer"
      >
        {event.ctaLabel ?? 'Register'}
      </a>
    ) : !event.ticketsOpenNote && event.ctaLabel ? (
      <Link
        to={`/contact?eventId=${encodeURIComponent(event.id)}`}
        className="event-cardsys-btn event-cardsys-btn--primary"
      >
        {event.ctaLabel}
      </Link>
    ) : null

  const heroPayBtn = event.paymentUrl ? (
    <a
      href={event.paymentUrl}
      className="event-cardsys-btn event-cardsys-btn--ghost"
      target="_blank"
      rel="noopener noreferrer"
    >
      Pay online
    </a>
  ) : null

  const heroPrimaryAction =
    heroRegisterBtn || heroPayBtn ? (
      <div className="event-cardsys-primary-actions">
        {heroRegisterBtn}
        {heroPayBtn}
      </div>
    ) : null

  const heroSecondaryActions = null

  return (
    <EventCardHero
      anchorId="home-next-gathering"
      media={
        <div className="event-cardsys-slideshow">
          <div className="event-cardsys-slideshow-inner">
            {slides.map((img, i) => (
              <div
                key={`${event.id}-${img.src}-${i}`}
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
        key={event.id}
        layout="hero"
        event={event}
        visualStyle="commerce"
        statusPills={heroStatusPills}
        description={heroDescription}
        metaItems={[]}
        enrichment={heroEnrichment}
        availability={heroAvailability}
        primaryAction={heroPrimaryAction}
        secondaryActions={heroSecondaryActions}
      />
    </EventCardHero>
  )
}
