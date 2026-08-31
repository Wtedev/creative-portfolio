# Creative Portfolio

Production-grade bilingual portfolio for an **Art Director & Creative Developer**. Built with Next.js App Router, Sanity CMS, and a feature-based architecture supporting English (LTR) and Arabic (RTL).

## Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript (strict)
- **Styling:** Tailwind CSS 4, semantic CSS custom properties
- **CMS:** Sanity Studio, `next-sanity`, Portable Text
- **i18n:** `next-intl`
- **Theming:** `next-themes`
- **Motion (installed, Phase 4):** Motion, Lenis
- **Testing:** Vitest, React Testing Library, Playwright
- **Quality:** ESLint, Prettier

## Installation

```bash
pnpm install
```

## Environment Setup

Copy the example file and fill in values when connecting Sanity:

```bash
cp .env.example .env.local
```

| Variable                         | Description                                 |
| -------------------------------- | ------------------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`  | Sanity project ID                           |
| `NEXT_PUBLIC_SANITY_DATASET`     | Dataset name (default: `production`)        |
| `NEXT_PUBLIC_SANITY_API_VERSION` | API version (default: `2024-01-01`)         |
| `SANITY_API_READ_TOKEN`          | Read token for draft/preview (server-only)  |
| `SANITY_PREVIEW_SECRET`          | Authorizes preview/draft mode (server-only) |
| `NEXT_PUBLIC_SITE_URL`           | Public site URL for SEO and preview         |

The app builds and runs **without** Sanity credentials using local fallback fixtures in `src/content/fallback/`.

## Development Commands

```bash
pnpm dev          # Start dev server (http://localhost:3000)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # ESLint
pnpm typecheck    # TypeScript
pnpm test         # Unit tests (Vitest)
pnpm test:watch   # Unit tests in watch mode
pnpm test:e2e     # Playwright smoke tests
pnpm format       # Prettier write
pnpm format:check # Prettier check
```

## Sanity Connection

1. Create a Sanity project at [sanity.io](https://www.sanity.io/)
2. Add credentials to `.env.local`
3. Visit `/studio` to open Sanity Studio
4. Publish content — the app prefers CMS data over fallback fixtures

See `docs/09-sanity-setup.md` for CORS, singleton IDs, and preview configuration.
See `docs/07-cms-editor-guide.md` for editing workflows.
See `docs/10-media-guide.md` for asset guidance.

Without credentials, `/studio` shows a setup message instead of crashing.

## Testing

```bash
pnpm test         # Unit tests
pnpm test:e2e     # E2E smoke tests (starts dev server automatically)
```

## Folder Architecture

```text
src/
  app/                  # Routes (site + studio route groups)
  components/           # Shared UI, layout, theme, locale, a11y
  features/             # Feature modules (home, projects, case-study, etc.)
  content/fallback/     # Local fixtures (remove after CMS is live)
  i18n/                 # Locale config, messages, navigation
  lib/                  # env, seo, content provider, utilities
  sanity/               # Schemas, queries, Studio config, structure
  styles/               # Design tokens, typography, utilities
  types/                # Shared TypeScript types
tests/
  unit/                 # Vitest + RTL
  e2e/                  # Playwright smoke tests
docs/                   # Product and implementation documentation
```

## Current Implementation Status

- [x] Phase 1 — Foundation
- [x] Phase 2 — CMS and admin experience
- [ ] Phase 3 — Visual system and homepage design
- [ ] Phase 4: Case studies, motion, Lenis scroll
- [ ] Phase 5: Bilingual and responsive polish
- [ ] Phase 6: QA, performance, launch

See `docs/02-implementation-plan.md` for the full roadmap.
