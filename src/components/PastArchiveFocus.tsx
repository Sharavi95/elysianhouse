import { useEffect, useState } from 'react'

export type PastArchivePhoto = {
  src: string
  alt: string
}

export type PastArchiveEvent = {
  date: string
  typeLabel: string
  title: string
  /** Shorter line for the archive strip card */
  shortTitle?: string
  recap: string
  attendeeLine: string
  location: string
  quote: string
  photos: PastArchivePhoto[]
}

type Props = {
  events: PastArchiveEvent[]
}

export function PastArchiveFocus({ events }: Props) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [slideIdx, setSlideIdx] = useState(0)

  const event = events[activeIdx] ?? events[0]
  const photos = event?.photos ?? []

  useEffect(() => {
    setSlideIdx(0)
  }, [activeIdx])

  const go = (dir: number) => {
    if (!photos.length) return
    setSlideIdx((i) => (i + dir + photos.length) % photos.length)
  }

  const goTo = (i: number) => {
    setSlideIdx(i)
  }

  if (!event) return null

  return (
    <>
      <div className="focus-event fade-in">
        <div className="focus-carousel">
          <div
            className="focus-carousel-track"
            style={{ transform: `translateX(-${slideIdx * 100}%)` }}
          >
            {photos.map((p, i) => (
              <div key={`${p.src}-${i}`} className="focus-slide">
                <img src={p.src} alt={p.alt} />
              </div>
            ))}
          </div>
          <button
            type="button"
            className="carousel-btn carousel-prev"
            onClick={() => go(-1)}
            aria-label="Previous photo"
          >
            ←
          </button>
          <button
            type="button"
            className="carousel-btn carousel-next"
            onClick={() => go(1)}
            aria-label="Next photo"
          >
            →
          </button>
          <div className="carousel-dots" role="tablist" aria-label="Gallery photos">
            {photos.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === slideIdx}
                aria-label={`Photo ${i + 1} of ${photos.length}`}
                className={`carousel-dot ${i === slideIdx ? 'active' : ''}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <div className="carousel-count">
            <span>{slideIdx + 1}</span> / <span>{photos.length}</span>
          </div>
        </div>
        <div className="focus-info">
          <p className="past-card-date">{event.date}</p>
          <span className="past-card-type">{event.typeLabel}</span>
          <h3 className="focus-title">{event.title}</h3>
          <p className="focus-recap">{event.recap}</p>
          <div className="focus-meta">
            <div className="focus-meta-item">
              <span className="focus-meta-icon">◈</span>
              <span>{event.attendeeLine}</span>
            </div>
            <div className="focus-meta-item">
              <span className="focus-meta-icon">◎</span>
              <span>{event.location}</span>
            </div>
          </div>
          <p className="focus-pullquote">{event.quote}</p>
        </div>
      </div>

      <p className="past-others-label">More from the archive — click any to explore</p>
      <div className="past-others-grid">
        {events.map((ev, i) => (
          <button
            key={`${ev.date}-${ev.title}`}
            type="button"
            className={`past-other-card fade-in ${i === activeIdx ? 'is-active' : ''}`}
            onClick={() => setActiveIdx(i)}
          >
            <div className="past-other-img">
              <img
                src={(ev.photos[0]?.src ?? '').replace(/\bw=\d+/, 'w=500')}
                alt=""
              />
            </div>
            <div className="past-other-body">
              <p className="past-other-date">{ev.date}</p>
              <h4 className="past-other-title">{ev.shortTitle ?? ev.title}</h4>
              <span className="past-other-type">{ev.typeLabel}</span>
            </div>
          </button>
        ))}
      </div>
    </>
  )
}
