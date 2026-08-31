# Content Model — Phase 2

## Architecture

```text
Sanity CMS → GROQ queries → typed adapter → content provider → features/UI
                     ↘ fallback fixtures (when not configured / unavailable)
```

Locale selection happens in the UI via `getLocalizedValue()` — both languages are preserved in the data layer.

## Singleton documents

| Schema                | ID                               | Purpose                             |
| --------------------- | -------------------------------- | ----------------------------------- |
| `about`               | `singleton-about`                | Bio, portrait, CV                   |
| `contactAvailability` | `singleton-contact-availability` | Contact section, hiring state, CTAs |
| `siteSettings`        | `singleton-site-settings`        | Global copy, SEO, theme default     |

## Project

See Phase 2 field groups: Basics, Homepage Card, Case Study, Credits & Outcome, SEO & Sharing, Publishing.

**Card sizes:** `standard`, `wide`, `hero`

**Editorial status:** `draft`, `ready`, `published`, `archived`

Public site filters: `status == "published"` unless preview mode is active.

## Tool

**Categories:** `direction`, `design`, `build`, `motion`, `ai`

**Proficiency:** `working`, `comfortable`, `exploring`

## Contact & Availability

**Availability states:** `available`, `selected-opportunities`, `unavailable`

Includes bilingual heading, body, CTA labels, email, LinkedIn, location.

## Case-study blocks

All blocks support controlled bilingual fields. See schemas in `src/sanity/schemas/blocks/case-study.ts` and types in `src/types/project.ts`.

Unknown block types map safely without crashing the page.

## Bilingual objects

| Object                  | Use              |
| ----------------------- | ---------------- |
| `localizedString`       | Short copy       |
| `localizedText`         | Paragraphs       |
| `localizedStringArray`  | Capability items |
| `localizedBlockContent` | Portable Text    |

Validation requires both English and Arabic for public required fields.

## Publication rules

- Homepage projects: published only, ordered by `order`, then `year`, then English title
- Project detail: published slug required; preview may show draft editorial states
- Tools/capabilities: `visible == true`
- Sitemap: published project slugs only

## Content provider

`src/lib/content/provider.ts` exposes:

- `getPortfolioContent()`
- `getProjectBySlug(slug, { preview })`
- `getProjectDetail(slug, { preview })`
- `getPublishedProjects({ preview })`

Returns `source: 'sanity' | 'fallback'` and optional `error` metadata.
