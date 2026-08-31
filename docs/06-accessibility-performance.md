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

## Performance Architecture (Phase 1)

- Server Components by default
- Client Components only for theme, locale, Studio
- Dynamic import for Sanity Studio
- Image formats: AVIF, WebP via `next/image` config
- Local font loading (Phase 3)
- Lazy loading below fold (Phase 4)
- No global state libraries

## Production Targets (Not Yet Verified)

| Metric | Target  |
| ------ | ------- |
| LCP    | < 2.5s  |
| INP    | < 200ms |
| CLS    | < 0.1   |

Measure on production-like build in Phase 6 only.
