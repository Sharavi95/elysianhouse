# Elysian House Design Guide

## Brand Color System

Use these as the only base color tokens:

- Primary
  - Sage Green: `#4F6B5A`
  - Warm Ivory: `#F5F1EA`
- Secondary
  - Dusty Rose: `#C8A2A8`
  - Muted Sand: `#D8CFC4`
- Text
  - Charcoal Ink: `#2E2E2E`
- Accent
  - Soft Gold: `#B8A47A`

## Implementation Tokens

Defined in `src/styles/site.css`:

- `--sage: #4f6b5a`
- `--ivory: #f5f1ea`
- `--rose: #c8a2a8`
- `--sand: #d8cfc4`
- `--ink: #2e2e2e`
- `--gold: #b8a47a`

Supporting utility tokens remain mapped to brand values:

- `--sage-light: #4f6b5a`
- `--ivory-dark: #ebe5da` (warm off-ivory for alternating bands)

Inner page hero strips (About, Gatherings, Contact) use **`--sand`** so the header reads as distinct from the fixed **ivory** navigation.

## Color Usage Rules

- `--ivory` is the default page background and primary light surface.
- `--ink` is the default body and heading text color, plus **ghost/outline buttons**, **form focus**, and **nav link active/hover** (neutral, not sage-dominant).
- **`--sage` is a brand signature only** — keep it for: the **wordmark** (logo), **primary filled CTAs** (e.g. Join a Gathering, primary buttons, booking buttons on events), **value-card left border accent**, and **small quote chip overlays** (e.g. home about visual). Do not use sage for generic tags, italic headline emphasis, or ghost buttons.
- **`--sand`** is used for soft contrast blocks, **tags/chips** (gathering type, event type, service tags, “coming soon” pills), and subtle hovers.
- **`--rose`** is used for **italic emphasis inside headings** (`em` in display titles) and emotional highlights; the rose CTA band remains a key moment.
- `--gold` is used for labels, dividers, and micro-accent details.

## Sage Usage Guidance (Signature, Not Everywhere)

To preserve a neutral, feminine, on-brand feel:

- Treat sage as a **limited signature**: logo + primary actions + intentional accents (value border, quote chip).
- Prefer **ink / rose / sand** everywhere else so the palette stays cohesive without sage fatigue.
- Prefer ivory/sand for major section backgrounds; avoid large sage panels.

## Component Mapping

- Navigation
  - Background: `--ivory`
  - Wordmark: `--sage`
  - Primary header CTA: `--sage` fill, `--ivory` text
  - Active/hover link state: `--ink`
- Primary button (`btn-primary`, `nav-cta`, `btn-book`)
  - Background: `--sage`
  - Text: `--ivory`
- Ghost button
  - Border/text: `--ink`
  - Hover fill: `--ink`, text `--ivory`
- Secondary / outline chips and tags
  - Background: `--sand`, text: `--ink` (where applicable)
- Heading italic emphasis (`em` in titles)
  - Color: `--rose`
- CTA banner
  - Background: `--rose`
  - Text: `--ivory` and `--ink` as needed for contrast
- Divider and labels
  - Accent color: `--gold`

## Accessibility Notes

- Maintain sufficient contrast between text and backgrounds, especially on rose and sand surfaces.
- Keep body copy on light surfaces at charcoal (`--ink`) or an ink alpha variant.
- Avoid gold for long-form body text; use it for labels and decorative accents only.

## File of Record

- Primary styling source: `src/styles/site.css`
- This guide is the reference for future visual updates.
