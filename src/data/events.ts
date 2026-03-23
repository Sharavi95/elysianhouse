import type { EventRecord, EventsData } from '../types/event'
import raw from './events.json'

const data = raw as EventsData

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
