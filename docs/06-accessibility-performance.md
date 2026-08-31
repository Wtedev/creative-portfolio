# Accessibility and Performance

## Accessibility (Phase 1)

| Requirement                                                       | Status |
| ----------------------------------------------------------------- | ------ |
| Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`) | ✅     |
| Skip to content link                                              | ✅     |
| Visible keyboard focus                                            | ✅     |
| Accessible theme toggle                                           | ✅     |
| Accessible locale switcher                                        | ✅     |
| Alt-text fields in CMS schemas                                    | ✅     |
| `prefers-reduced-motion` CSS                                      | ✅     |
| No hover-only interactions                                        | ✅     |
| No custom cursor                                                  | ✅     |

## Phase 6 Audit Targets

- WCAG 2.2 AA contrast on all text
- Screen reader walkthrough (VoiceOver, NVDA)
- Keyboard-only navigation test
- Arabic screen reader validation

Phase 06 verified automated accessibility at 100 on representative routes (local Lighthouse, fallback content). Manual screen-reader sign-off remains recommended before launch.

## Performance Architecture (Phase 1)

- Server Components by default
- Client Components only for theme, locale, Studio
- Dynamic import for Sanity Studio
- Image formats: AVIF, WebP via `next/image` config
- Local font loading (Phase 3)
- Lazy loading below fold (Phase 4)
- No global state libraries

## Production Targets (Verified Locally — Phase 06)

| Metric | Target  | Local prod result (fallback, localhost) |
| ------ | ------- | --------------------------------------- |
| LCP    | < 2.5s  | 3.4–3.9s (font-bound; see launch guide) |
| INP    | < 200ms | Lab proxy TBT 40–50ms                   |
| CLS    | < 0.1   | 0–0.024                                 |

See `docs/13-phase06-production-readiness.md` for before/after notes and production remeasurement steps.
