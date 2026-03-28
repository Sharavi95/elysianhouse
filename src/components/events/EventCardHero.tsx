import type { ReactNode } from 'react'

type EventCardHeroProps = {
  /** Slideshow / hero media (left) */
  media: ReactNode
  /** Shared fields + footers (right) */
  children: ReactNode
  anchorId?: string
  innerRef?: React.RefObject<HTMLElement | null>
}

export function EventCardHero({ media, children, anchorId, innerRef }: EventCardHeroProps) {
  return (
    <article ref={innerRef} id={anchorId} className="event-cardsys event-cardsys--hero" aria-live="polite">
      <div className="event-cardsys-hero-media">{media}</div>
      <div className="event-cardsys-hero-body">{children}</div>
    </article>
  )
}
