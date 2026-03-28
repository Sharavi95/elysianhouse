import type { ReactNode } from 'react'
import { EventCardDate } from './EventCardDate'
import { EventCardMeta } from './EventCardMeta'
import type { EventMetaItem } from './eventCardUtils'
import type { EventRecord } from '../../types/event'

export type EventCardFieldsProps = {
  layout: 'hero' | 'strip'
  event: EventRecord
  /** Status row: one or more EventPill elements (omit when rendered elsewhere, e.g. strip overlay) */
  statusPills?: ReactNode
  /** Primary description (paragraphs or clamped text) */
  description: ReactNode
  metaItems: EventMetaItem[]
  /** Optional body between description and meta (explore list, experience block, etc.) */
  enrichment?: ReactNode
  /** Availability line, past status, tickets-open note */
  availability?: ReactNode
  /** Primary CTA (register, etc.) */
  primaryAction?: ReactNode
  /** Secondary actions (pay, community) */
  secondaryActions?: ReactNode
}

/**
 * Shared content order for hero + strip:
 * pills → date → type → title → subtitle → description → [enrichment] → meta → footer (availability + CTAs)
 */
export function EventCardFields({
  layout,
  event,
  statusPills,
  description,
  metaItems,
  enrichment,
  availability,
  primaryAction,
  secondaryActions,
}: EventCardFieldsProps) {
  const footVisible = availability || primaryAction || secondaryActions

  return (
    <div className={`event-cardsys-fields event-cardsys-fields--${layout}`}>
      <div className={`event-cardsys-fields-main event-cardsys-fields-main--${layout}`}>
        {statusPills ? <div className="event-cardsys-pill-row">{statusPills}</div> : null}

        <EventCardDate event={event} layout={layout} />

        {event.eventTypeTag ? (
          <span className="event-cardsys-type-tag">{event.eventTypeTag}</span>
        ) : null}

        <h3 className={`event-cardsys-title ${layout === 'hero' ? 'event-cardsys-title--hero' : ''}`}>
          {event.title}
        </h3>

        {event.subtitle ? <p className="event-cardsys-subtitle">{event.subtitle}</p> : null}

        <div className={`event-cardsys-desc ${layout === 'strip' ? 'event-cardsys-desc--strip' : ''}`}>
          {description}
        </div>

        {enrichment ? <div className="event-cardsys-enrichment">{enrichment}</div> : null}

        <EventCardMeta items={metaItems} layout={layout} />
      </div>

      {footVisible ? (
        <div className="event-cardsys-foot">
          {availability || primaryAction ? (
            <div className="event-cardsys-foot-row">
              {availability ? <div className="event-cardsys-availability">{availability}</div> : null}
              {primaryAction ? <div className="event-cardsys-primary-action">{primaryAction}</div> : null}
            </div>
          ) : null}
          {secondaryActions ? (
            <div className="event-cardsys-secondary-actions">{secondaryActions}</div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
