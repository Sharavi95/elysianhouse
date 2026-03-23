export type EventType = 'upcoming' | 'past'

export type EventBadgeVariant = 'few-left' | 'sold-out' | 'default'

export type GalleryImage = {
  src: string
  alt: string
}

export type EventRecord = {
  id: string
  type: EventType
  title: string
  /** Display date line (hero + accessibility) */
  date: string
  description: string
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
  spotsLine?: string
  /** When true, availability line uses sold-out styling */
  spotsSoldOut?: boolean
  /** Upcoming only */
  ctaLabel?: string
  /** Past archive extras */
  attendeeLine?: string
  quote?: string
}

export type EventsData = {
  upcoming: EventRecord[]
  past: EventRecord[]
}
