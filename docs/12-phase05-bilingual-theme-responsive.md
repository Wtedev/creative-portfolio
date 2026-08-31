# Phase 05 — Bilingual, Theme & Responsive Quality

Audit-and-fix notes for locale, theme, and responsive behavior. Complements [04-design-system-foundation.md](./04-design-system-foundation.md) and [05-motion-plan.md](./05-motion-plan.md).

## Locale routing

| Route                      | Behavior                                            |
| -------------------------- | --------------------------------------------------- |
| `/en`, `/ar`               | Homepage; `lang` + `dir` set on first server render |
| `/[locale]/project/[slug]` | Case study; language switch preserves slug          |
| Invalid locale             | App not-found                                       |
| `/studio`                  | Outside locale tree; no Lenis / site motion         |

### Language switch preservation

`LocaleSwitcher` builds href via `buildLocaleSwitchHref(pathname, search, hash)` so:

- Homepage section hashes (`#work`) survive locale changes.
- Project slugs survive locale changes.
- Safe query strings are preserved.

Theme preference is stored under `portfolio-theme` and is independent of locale.

## Arabic copy conventions

- Feminine professional voice preserved (`مخرجة فنية ومطوّرة إبداعية`).
- Nav label for capabilities aligned with section title: **ما أقدمه**.
- Proficiency `comfortable` → **متمكنة** (not literal “مريحة”).
- Slash-heavy eyebrow uses a middle dot: `مستقلة · متاحة…`.
- UI chrome (nav, errors, tools categories, preview banner) is fully localized.
- CMS free-text categories/services may remain English until content is authored bilingually.

## Arabic typography

- Arabic body uses relaxed line-height (`1.7`).
- Display headings: no English letter-spacing tightening; no forced uppercase on labels.
- Brand in header: wrap allowed; no `nowrap` clipping at 320px.
- Hero title max width relaxed for Arabic (`~22ch`).
- Fonts: Manrope + IBM Plex Sans Arabic via `next/font/google` until licensed local WOFF2 files are provided.

## Mixed direction & numerals

- Emails, LinkedIn URLs, and years use `dir="ltr"` / `.u-ltr` isolation where needed.
- **Years and footer year use Latin digits in both locales** (`ar-SA-u-nu-latn`) for technical readability.
- Process step indices remain Latin padded digits (`01`–`04`).
- Project artwork, video, and media are never mirrored in RTL.
- Directional UI arrows (`.text-link--inline::after`, tools scroller glyphs) flip with `dir`.

## RTL icon decisions

| Element           | Behavior                                                  |
| ----------------- | --------------------------------------------------------- |
| Inline text links | CSS `→` / `←` via `[dir='rtl']`                           |
| Tools prev/next   | Glyphs swap based on track `direction`                    |
| Back to work      | Uses `.text-link--inline` (no hard-coded arrow in markup) |
| Media order       | Unchanged in RTL                                          |

## Theme initialization & persistence

1. `:root` ships dark color tokens as FOUC-safe defaults.
2. `@media (prefers-color-scheme: light)` adjusts `:root` before hydration.
3. `[data-theme='light'|'dark']` overrides after `next-themes` applies stored preference.
4. Storage key: `portfolio-theme`.
5. Theme color transition ≈ 240ms (`--theme-transition`); disabled under reduced motion.
6. Preference persists across reload, locale switch, and project routes.

## Responsive breakpoints

| Range      | Columns / notes                                             |
| ---------- | ----------------------------------------------------------- |
| ≤767px     | 4-col mobile; single-column work; static luminous intensity |
| 768–1023px | 8-col tablet                                                |
| ≥1024px    | 12-col desktop; full nav                                    |

Capability queries (not width alone) gate hover card lift and pointer-linked light: `(hover: hover) and (pointer: fine)`.

## Long-content rules

- Brand and titles may wrap; overflow-wrap enabled on prose and cards.
- Tool cards clamp to `calc(100vw - 2.5rem)`.
- Prototype iframe min-height uses `min(420px, 70svh)`.
- Missing optional CMS fields hide cleanly (facts, captions, LinkedIn).

## Issues found and fixed (Phase 05)

- Theme FOUC from missing `:root` colors.
- Locale switch dropped hash/query.
- Mobile menu lacked body scroll lock and focus trap.
- Hard-coded English: Home, preview banner, unsupported block, LinkedIn label, tools categories.
- Physical back arrows in project nav.
- Tools scroller EN “left/right” labels and fragile RTL scroll metrics.
- Card year not locale-formatted.
- Arabic nav/section label mismatch; proficiency wording.
- Header brand `nowrap` overflow risk.

## Known remaining limitations

- Fallback project categories/services/metric free-text still English until CMS bilingual content exists.
- Local licensed WOFF2 files not yet committed.
- Formal Lighthouse / SEO pass remains Phase 06.
- Full CMS-driven bilingual category taxonomy not yet modeled (message map covers tool categories only).
