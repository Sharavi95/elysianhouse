import type { EventRecord } from '../../types/event'
import type { EventCardProps } from './EventCard'

export type EventMetaItem = {
  icon: string
  text: string
}

export function buildEventMetaItems(ev: EventRecord): EventMetaItem[] {
  const items: EventMetaItem[] = []
  if (ev.timeRange) items.push({ icon: '◷', text: ev.timeRange })
  if (ev.location) items.push({ icon: '◎', text: ev.location })
  if (ev.ticketPrice) items.push({ icon: '✦', text: `Ticket: ${ev.ticketPrice}` })
  if (ev.capacity) items.push({ icon: '◇', text: `Capacity: ${ev.capacity}` })
  return items
}

/** Strip / small cards only — no fallback to full body */
export function getCardTeaser(ev: EventRecord): string {
  return ev.descriptionShort?.trim() ?? ev.summary?.trim() ?? ''
}

/** Hero body (before explore / experience) */
export function getHeroOverview(ev: EventRecord): string {
  const m = ev.descriptionMedium?.trim()
  if (m) return m
  const full = getFullStory(ev)
  const first = full.split(/\n\n+/)[0]?.trim()
  return first ?? ''
}

/** Detail page + legacy fallbacks */
export function getFullStory(ev: EventRecord): string {
  return ev.descriptionFull?.trim() ?? ev.description?.trim() ?? ''
}

export function cappedExploreBullets(ev: EventRecord, max = 5): string[] {
  return (ev.exploreBullets ?? []).slice(0, max)
}

export type StatusPillKind =
  | 'past'
  | 'tickets-open'
  | 'coming-soon'
  | 'few-left'
  | 'sold-out'

export function upcomingStatusPill(ev: EventRecord): { kind: StatusPillKind; label: string } {
  const v = ev.badgeVariant
  if (v === 'sold-out') return { kind: 'sold-out', label: ev.badge ?? 'Sold out' }
  if (v === 'few-left') return { kind: 'few-left', label: ev.badge ?? 'Few spots left' }
  if (v === 'coming-soon') return { kind: 'coming-soon', label: ev.badge ?? 'Coming soon' }
  return { kind: 'tickets-open', label: ev.badge ?? 'Tickets available' }
}

/** One-line “25 August · Dubai” for compact card kickers */
export function compactEventDateline(ev: EventRecord): string {
  if (ev.dateDay && ev.dateMonth) {
    const place = ev.location?.trim() || ''
    return place ? `${ev.dateDay} ${ev.dateMonth} · ${place}` : `${ev.dateDay} ${ev.dateMonth}`
  }
  return ev.date
}

/** Uppercase strip footer status (e.g. CLOSING SOON, SPACES OPEN) */
export function stripCommerceStatusLabel(ev: EventRecord): string {
  return upcomingStatusPill(ev).label.toUpperCase()
}

/**
 * Maps an EventRecord to EventCard props (minus `variant`).
 * Pass `{ forStrip: true }` to prefer the short teaser description.
 */
export function toEventCardProps(
  ev: EventRecord,
  { forStrip = false }: { forStrip?: boolean } = {},
): Omit<EventCardProps, 'variant'> {
  const allImageSrcs =
    ev.galleryImages.length > 0
      ? ev.galleryImages.map((g) => g.src)
      : [ev.primaryImage]

  /* Upcoming: one static image per card (primary); full gallery remains in data for later */
  const images = ev.type === 'upcoming' ? [ev.primaryImage] : allImageSrcs

  const status: 'open' | 'coming' | 'past' =
    ev.type === 'past' ? 'past' : ev.ticketsOpenNote ? 'coming' : 'open'

  const mediumFull = ev.descriptionMedium?.trim() ?? ''
  const mediumFirst = mediumFull.split(/\n\n+/)[0]?.trim() ?? ''
  const isPastHero = ev.type === 'past' && !forStrip
  const experiencePass = isPastHero ? ev.experienceBlock?.trim() : undefined

  const description = forStrip
    ? (ev.descriptionShort?.trim() || mediumFirst)
    : isPastHero
      ? mediumFull
      : (mediumFirst || ev.descriptionShort?.trim() || '')

  return {
    status,
    title: ev.title,
    images,
    eventType: ev.eventTypeTag ?? 'Gathering',
    date: ev.date,
    location: ev.location ?? '',
    description,
    experienceBlock: experiencePass,
    bullets: ev.exploreBullets,
    price: ev.ticketPrice,
    registerUrl: ev.registrationUrl,
    payUrl: ev.paymentUrl,
    waitlistUrl: ev.communityUrl ?? `/contact?eventId=${encodeURIComponent(ev.id)}`,
  }
}
