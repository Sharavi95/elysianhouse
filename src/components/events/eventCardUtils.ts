import type { EventRecord } from '../../types/event'

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

export function filmStripDescription(ev: EventRecord): string {
  return ev.summary?.trim() || ev.description
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
