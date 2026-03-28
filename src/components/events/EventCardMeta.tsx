import type { EventMetaItem } from './eventCardUtils'

type EventCardMetaProps = {
  items: EventMetaItem[]
  layout: 'hero' | 'strip'
}

/** One shared metadata row for hero + strip cards. */
export function EventCardMeta({ items, layout }: EventCardMetaProps) {
  if (!items.length) return null
  return (
    <div
      className={`event-cardsys-meta ${layout === 'hero' ? 'event-cardsys-meta--hero' : 'event-cardsys-meta--strip'}`}
      role="list"
    >
      {items.map((item) => (
        <div key={`${item.icon}-${item.text}`} className="event-cardsys-meta-item" role="listitem">
          <span className="event-cardsys-meta-icon" aria-hidden>
            {item.icon}
          </span>
          <span className="event-cardsys-meta-text">{item.text}</span>
        </div>
      ))}
    </div>
  )
}
