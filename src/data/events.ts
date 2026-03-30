import type { EventRecord, EventsData } from '../types/event'
import raw from './events.json'

const data = raw as EventsData

const MONTH_INDEX: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
}

function startOfLocalDay(d: Date): number {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x.getTime()
}

/** Start-of-day timestamp for the event date (local), or null if not parseable */
export function getUpcomingEventStartTimestamp(event: EventRecord): number | null {
  const y = event.dateYear ? Number.parseInt(event.dateYear, 10) : NaN
  const day = event.dateDay ? Number.parseInt(event.dateDay, 10) : NaN
  const mKey = event.dateMonth?.trim().toLowerCase()
  if (Number.isFinite(y) && Number.isFinite(day) && mKey) {
    const mi = MONTH_INDEX[mKey]
    if (mi !== undefined) {
      return startOfLocalDay(new Date(y, mi, day))
    }
  }
  const parsed = Date.parse(event.date)
  return Number.isNaN(parsed) ? null : startOfLocalDay(new Date(parsed))
}

/**
 * The upcoming gathering on or after `referenceDate` (by event day); if every date is in the past,
 * returns the chronologically first upcoming record.
 */
export function getNextUpcomingEvent(referenceDate: Date = new Date()): EventRecord | undefined {
  const list = getUpcomingEvents()
  if (list.length === 0) return undefined

  const scored = list
    .map((e) => ({ e, t: getUpcomingEventStartTimestamp(e) }))
    .filter((x): x is { e: EventRecord; t: number } => x.t != null)
    .sort((a, b) => a.t - b.t)

  if (scored.length === 0) return list[0]

  const today = startOfLocalDay(referenceDate)
  const next = scored.find((x) => x.t >= today)
  return next?.e ?? scored[0]!.e
}

export function getUpcomingEvents(): EventRecord[] {
  return data.upcoming
}

export function getPastEvents(): EventRecord[] {
  return data.past
}

export function getAllEvents(): EventRecord[] {
  return [...data.upcoming, ...data.past]
}

/** For contact pre-fill and lookups */
export function getEventTitleById(id: string): string | undefined {
  const all = getAllEvents()
  return all.find((e) => e.id === id)?.title
}

export function getEventById(id: string): EventRecord | undefined {
  return getAllEvents().find((e) => e.id === id)
}
