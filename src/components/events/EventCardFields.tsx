import type { ReactNode } from 'react'
import { EventCardDate } from './EventCardDate'
import { EventCardMeta } from './EventCardMeta'
import type { EventMetaItem } from './eventCardUtils'
import { compactEventDateline, stripCommerceStatusLabel } from './eventCardUtils'
import type { EventRecord } from '../../types/event'

export type EventCardVisualStyle = 'default' | 'commerce'

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
  /**
   * `commerce`: mockup-style compact kicker + price/status footers (upcoming).
   * `default`: classic date block + icon meta row (past, legacy).
   */
  visualStyle?: EventCardVisualStyle
}

function CompactKicker({ event }: { event: EventRecord }) {
  const typeLabel = event.eventTypeTag?.toUpperCase() ?? 'GATHERING'
  return (
    <div className="event-cardsys-compact-kicker">
      <span className="event-cardsys-compact-kicker-type">{typeLabel}</span>
      <span className="event-cardsys-compact-kicker-line">{compactEventDateline(event)}</span>
    </div>
  )
}

/**
 * Strip: single main column + footer (pills → … → description).
 * Hero: header + scrollable body (description + enrichment) + pinned footer.
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
  visualStyle = 'default',
}: EventCardFieldsProps) {
  const commerce = visualStyle === 'commerce'
  const hasMeta = metaItems.length > 0
  const hasStatusRow = Boolean(availability || primaryAction)

  const footInnerDefault = showFootDefault(hasMeta, hasStatusRow, metaItems, layout, availability, primaryAction, secondaryActions)

  const footInnerHeroCommerce =
    commerce && layout === 'hero' ? (
      <div className="event-cardsys-foot event-cardsys-foot--commerce-hero">
        <div className="event-cardsys-foot-commerce-row">
          <div className="event-cardsys-foot-commerce-primary">
            {event.ticketPrice ? <p className="event-cardsys-price-hero">{event.ticketPrice}</p> : null}
            {availability ? <div className="event-cardsys-foot-commerce-note">{availability}</div> : null}
          </div>
          {primaryAction ? (
            <div className="event-cardsys-foot-commerce-actions">{primaryAction}</div>
          ) : null}
        </div>
        {secondaryActions ? (
          <div className="event-cardsys-secondary-actions event-cardsys-secondary-actions--commerce">
            {secondaryActions}
          </div>
        ) : null}
      </div>
    ) : null

  const footInnerStripCommerce =
    commerce && layout === 'strip' ? (
      <div className="event-cardsys-foot event-cardsys-foot--commerce-strip">
        {availability ? <div className="event-cardsys-foot-strip-note">{availability}</div> : null}
        <div className="event-cardsys-foot-commerce-bar">
          {event.ticketPrice ? (
            <span className="event-cardsys-foot-commerce-price">{event.ticketPrice}</span>
          ) : (
            <span
              className="event-cardsys-foot-commerce-price event-cardsys-foot-commerce-price--muted"
              aria-hidden="true"
            >
              -
            </span>
          )}
          <span className="event-cardsys-foot-commerce-status">{stripCommerceStatusLabel(event)}</span>
        </div>
      </div>
    ) : null

  const showFootCommerceHero = commerce && layout === 'hero' && (event.ticketPrice || availability || primaryAction || secondaryActions)

  const footInner =
    commerce && layout === 'hero'
      ? showFootCommerceHero
        ? footInnerHeroCommerce
        : null
      : commerce && layout === 'strip'
        ? footInnerStripCommerce
        : footInnerDefault

  const fieldsClass =
    layout === 'hero'
      ? `event-cardsys-fields event-cardsys-fields--hero${commerce ? ' event-cardsys-fields--visual-commerce' : ''}`
      : `event-cardsys-fields event-cardsys-fields--strip${commerce ? ' event-cardsys-fields--visual-commerce' : ''}`

  if (layout === 'hero') {
    return (
      <div className={fieldsClass}>
        <div className="event-cardsys-hero-header">
          {statusPills ? <div className="event-cardsys-pill-row">{statusPills}</div> : null}
          {commerce ? (
            <CompactKicker event={event} />
          ) : (
            <>
              <EventCardDate event={event} layout={layout} />
              {event.eventTypeTag ? (
                <span className="event-cardsys-type-tag">{event.eventTypeTag}</span>
              ) : null}
            </>
          )}
          <h3 className="event-cardsys-title event-cardsys-title--hero">{event.title}</h3>
          {event.subtitle ? <p className="event-cardsys-subtitle">{event.subtitle}</p> : null}
        </div>
        <div className="event-cardsys-hero-body-scroll">
          <div className="event-cardsys-desc event-cardsys-desc--hero">{description}</div>
          {enrichment ? <div className="event-cardsys-enrichment">{enrichment}</div> : null}
        </div>
        {footInner}
      </div>
    )
  }

  return (
    <div className={fieldsClass}>
      <div className="event-cardsys-fields-main event-cardsys-fields-main--strip">
        {statusPills ? <div className="event-cardsys-pill-row">{statusPills}</div> : null}

        {commerce ? (
          <CompactKicker event={event} />
        ) : (
          <>
            <EventCardDate event={event} layout={layout} />
            {event.eventTypeTag ? (
              <span className="event-cardsys-type-tag">{event.eventTypeTag}</span>
            ) : null}
          </>
        )}

        <h3 className="event-cardsys-title">{event.title}</h3>

        {!commerce && event.subtitle ? <p className="event-cardsys-subtitle">{event.subtitle}</p> : null}

        <div className="event-cardsys-desc event-cardsys-desc--strip">{description}</div>

        {enrichment ? <div className="event-cardsys-enrichment">{enrichment}</div> : null}
      </div>

      {footInner}
    </div>
  )
}

function showFootDefault(
  hasMeta: boolean,
  hasStatusRow: boolean,
  metaItems: EventMetaItem[],
  layout: 'hero' | 'strip',
  availability: ReactNode,
  primaryAction: ReactNode,
  secondaryActions: ReactNode,
) {
  const showFoot = hasMeta || availability || primaryAction || secondaryActions
  if (!showFoot) return null
  return (
    <div className="event-cardsys-foot">
      {hasMeta ? (
        <div className="event-cardsys-foot-meta">
          <EventCardMeta items={metaItems} layout={layout} />
        </div>
      ) : null}
      {hasMeta && hasStatusRow ? <div className="event-cardsys-foot-rule" aria-hidden /> : null}
      {hasStatusRow ? (
        <div className="event-cardsys-foot-row">
          {availability ? <div className="event-cardsys-availability">{availability}</div> : null}
          {primaryAction ? <div className="event-cardsys-primary-action">{primaryAction}</div> : null}
        </div>
      ) : null}
      {secondaryActions ? (
        <div className="event-cardsys-secondary-actions">{secondaryActions}</div>
      ) : null}
    </div>
  )
}
