export type EventType = 'upcoming' | 'past'

export type EventBadgeVariant = 'few-left' | 'sold-out' | 'default' | 'coming-soon'

export type GalleryImage = {
  src: string
  alt: string
}

export type EventRecord = {
  id: string
  type: EventType
  title: string
  /** Tagline under the title */
  subtitle?: string
  /** Strip cards only — 2–3 line teaser */
  descriptionShort?: string
  /** Hero overview — paragraphs joined with \\n\\n */
  descriptionMedium?: string
  /** Detail page — full narrative */
  descriptionFull?: string
  /** @deprecated Use descriptionShort; still read as fallback in loaders */
  summary?: string
  /** Display date line (hero + accessibility) */
  date: string
  /** @deprecated Use descriptionFull; still read as fallback */
  description?: string
  primaryImage: string
  galleryImages: GalleryImage[]
  featured?: boolean
  /** Film strip + card: day number */
  dateDay?: string
  dateMonth?: string
  dateYear?: string
  badge?: string
  badgeVariant?: EventBadgeVariant
  eventTypeTag?: string
  timeRange?: string
  location?: string
  ticketPrice?: string
  capacity?: string
  spotsLine?: string
  /** When true, availability line uses sold-out styling */
  spotsSoldOut?: boolean
  /** Upcoming: shown when tickets are not yet on sale */
  ticketsOpenNote?: string
  /** Upcoming only */
  ctaLabel?: string
  registrationUrl?: string
  paymentUrl?: string
  communityUrl?: string
  exploreSectionTitle?: string
  exploreBullets?: string[]
  closingNote?: string
  /** Past: second narrative block (“The experience”) */
  experienceBlock?: string
  /** Past: status line (e.g. Completed) */
  pastStatusLabel?: string
  /** Past archive extras */
  attendeeLine?: string
  quote?: string
}

export type EventsData = {
  upcoming: EventRecord[]
  past: EventRecord[]
}
