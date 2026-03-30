import type { EventRecord } from '../../types/event'
import { EventCardFields } from './EventCardFields'
import { EventPill } from './EventPill'
import { buildEventMetaItems, getCardTeaser, upcomingStatusPill } from './eventCardUtils'

type EventCardStripProps = {
  event: EventRecord
  sectionVariant: 'upcoming' | 'past'
  isActive: boolean
  onSelect: () => void
}

export function EventCardStrip({ event, sectionVariant, isActive, onSelect }: EventCardStripProps) {
  const metaItems = buildEventMetaItems(event)
  const teaser = getCardTeaser(event)

  const statusPills =
    sectionVariant === 'past' ? (
      <EventPill variant="past">Past</EventPill>
    ) : (
      <>
        {isActive ? <EventPill variant="viewing">Viewing</EventPill> : null}
        {(() => {
          const { kind, label } = upcomingStatusPill(event)
          return <EventPill variant={kind}>{label}</EventPill>
        })()}
      </>
    )

  const availability =
    sectionVariant === 'upcoming' ? (
      event.ticketsOpenNote ? (
        <p className="event-cardsys-avail-text">{event.ticketsOpenNote}</p>
      ) : event.spotsLine ? (
        <p className="event-cardsys-avail-text">
          Availability:{' '}
          <span className={event.spotsSoldOut ? 'is-sold' : undefined}>{event.spotsLine}</span>
        </p>
      ) : null
    ) : (
      <>
        {event.pastStatusLabel ? (
          <p className="event-cardsys-avail-text">{event.pastStatusLabel}</p>
        ) : null}
        {event.attendeeLine ? (
          <p className="event-cardsys-avail-text">{event.attendeeLine}</p>
        ) : null}
      </>
    )

  const commerceStrip = sectionVariant === 'upcoming'

  return (
    <button
      type="button"
      className={`event-cardsys event-cardsys--strip fade-in ${isActive ? 'is-active' : ''}`}
      onClick={onSelect}
      aria-current={isActive ? 'true' : undefined}
    >
      <div className="event-cardsys-strip-media">
        <div className="event-cardsys-pill-row event-cardsys-pill-row--strip-overlay">{statusPills}</div>
        <img src={event.primaryImage} alt="" />
        <div className="event-cardsys-media-overlay event-cardsys-media-overlay--strip" aria-hidden />
      </div>
      <EventCardFields
        layout="strip"
        event={event}
        visualStyle={commerceStrip ? 'commerce' : 'default'}
        description={
          teaser ? (
            <p className="event-cardsys-desc-para">{teaser}</p>
          ) : (
            <p className="event-cardsys-desc-para event-cardsys-desc-para--placeholder"> </p>
          )
        }
        metaItems={commerceStrip ? [] : metaItems}
        availability={availability}
      />
    </button>
  )
}
