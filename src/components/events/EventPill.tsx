import type { HTMLAttributes, ReactNode } from 'react'

export type EventPillVariant =
  | 'past'
  | 'completed'
  | 'viewing'
  | 'tickets-open'
  | 'coming-soon'
  | 'few-left'
  | 'sold-out'

type EventPillProps = {
  variant: EventPillVariant
  children: ReactNode
} & HTMLAttributes<HTMLSpanElement>

/** Status / state pill — shared typography, padding, radius; colors by variant. */
export function EventPill({ variant, children, className = '', ...rest }: EventPillProps) {
  return (
    <span className={`event-pill event-pill--${variant} ${className}`.trim()} {...rest}>
      {children}
    </span>
  )
}
