# Information Architecture

## Public Site (One Page)

Single homepage with scroll navigation. No separate public index pages for Work, Tools, Capabilities, or About.

| Order | Section                     | Anchor          |
| ----- | --------------------------- | --------------- |
| 1     | Navigation                  | —               |
| 2     | Hero                        | —               |
| 3     | Selected Work               | `#work`         |
| 4     | Capabilities                | `#capabilities` |
| 5     | Creative Technology Toolkit | `#tools`        |
| 6     | Selected Process            | `#process`      |
| 7     | About                       | `#about`        |
| 8     | Contact                     | `#contact`      |
| 9     | Footer                      | —               |

## Dynamic Routes

| Route                      | Purpose                   |
| -------------------------- | ------------------------- |
| `/en`                      | English homepage          |
| `/ar`                      | Arabic homepage           |
| `/[locale]/project/[slug]` | Case study                |
| `/studio`                  | Sanity Studio (CMS admin) |

## Navigation Behavior

- Header links use native anchor scrolling (`#work`, etc.)
- Language switcher preserves current route where possible
- Theme toggle persists user preference across routes
- Skip link targets `#main-content`

## Content Sources

1. **Sanity CMS** (when configured)
2. **Fallback fixtures** in `src/content/fallback/` (development and pre-CMS)

## Deviation Note

Routes use Next.js route groups: `(site)` for localized pages and `(studio)` for CMS. Both define their own document shell because `/studio` sits outside the locale segment.
