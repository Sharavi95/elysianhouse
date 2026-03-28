import type { EventRecord } from '../../types/event'

type EventCardDateProps = {
  event: EventRecord
  layout: 'hero' | 'strip'
}

/** Shared date presentation: numeric block when parts exist, else compact line. */
export function EventCardDate({ event, layout }: EventCardDateProps) {
  const { dateDay, dateMonth, dateYear, date } = event
  const suffix = layout === 'hero' ? 'event-cardsys-date--hero' : 'event-cardsys-date--strip'

  if (dateDay && dateMonth && dateYear) {
    return (
      <div className={`event-cardsys-date-block ${suffix}`}>
        <div className="event-cardsys-date-day">{dateDay}</div>
        <div className="event-cardsys-date-my">
          <span className="event-cardsys-date-month">{dateMonth}</span>
          <span className="event-cardsys-date-year">{dateYear}</span>
        </div>
      </div>
    )
  }

  return <p className={`event-cardsys-date-fallback ${suffix}`}>{date}</p>
}
