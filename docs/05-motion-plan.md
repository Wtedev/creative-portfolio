# Motion Plan — Implemented (Phase 04)

See also [04-design-system-foundation.md](./04-design-system-foundation.md) and [11-reference-analysis.md](./11-reference-analysis.md).

## Stack

| Layer          | Implementation                                                             |
| -------------- | -------------------------------------------------------------------------- |
| Smooth scroll  | Lenis (`src/components/motion/lenis-provider.tsx`)                         |
| UI motion      | Motion for React via `LazyMotion` + `domAnimation`                         |
| CSS motion     | Tokens in `tokens.css`, card choreography in `components.css`              |
| Reduced motion | `MotionConfig reducedMotion="user"`, CSS `@media (prefers-reduced-motion)` |

Lenis and scroll-linked effects are **disabled** when reduced motion is requested. Studio routes are outside the site layout and do not load Lenis.

## Motion Categories

### Functional (160–300ms)

- Navigation surface on scroll
- Button / theme / locale feedback
- Project-card hover lift (6px), edge light, media scale (2–3%)
- Tools scroller controls
- Mobile menu open/close

### Narrative (600–800ms)

- Hero and section `RevealOnView` (opacity + 16px translate, once)
- Selected Work stagger (50ms increments, disabled with reduced motion)
- Case-study block reveals
- Card → case-study `layoutId` continuity on cover media

### Atmospheric

- Scroll-linked **Luminous Thread** (`luminous-thread.tsx`) updates CSS variables `--thread-x`, `--thread-y`, `--thread-opacity`
- Optional fine-pointer blend (8% max) on desktop only
- Mobile/tablet: simplified static section gradients from Phase 03 remain; thread opacity reduced

## Card → Case Study Continuity

**Approach:** Motion `layoutId={`project-cover-${slug}`}` on card media and project hero media, wrapped in `LayoutGroup` at site level.

- Progressive enhancement: navigation works without animation
- Reduced motion: no shared layout animation; media renders immediately
- No View Transitions API (avoided for App Router stability)

## Luminous Thread Sections

| Section | Anchor behavior              |
| ------- | ---------------------------- |
| Hero    | Central light (~26% opacity) |
| Work    | Localized left bias          |
| Tools   | Horizontal band              |
| About   | Quieter (~12%)               |
| Contact | Focused CTA glow (~24%)      |

IntersectionObserver drives section state; decorative layer uses `aria-hidden`.

## Client Boundaries

| Client component                        | Scope                              |
| --------------------------------------- | ---------------------------------- |
| `ClientMotionShell`                     | Path-aware motion wrapper          |
| `SiteMotionProvider`                    | Lenis + LayoutGroup + MotionConfig |
| `LuminousThread`                        | Homepage only                      |
| `ProjectCardMedia` / `ProjectHeroMedia` | Shared layout continuity           |
| `RevealOnView`                          | Scroll reveals                     |
| `ToolsScroller`                         | Horizontal controls                |
| `SiteHeader`                            | Nav + scroll spy                   |
| `CaseStudyVideo` / `CaseStudyPrototype` | Media activation                   |

Server Components remain default for pages, sections, and block rendering shell.

## Case Study Blocks

All approved CMS block types render in `case-study-blocks.tsx`:

- Portable Text via `@portabletext/react`
- Responsive images via `ProjectCoverMedia` + Sanity URL helper
- Video with controls, reduced-motion autoplay guard
- Prototype embed with provider allowlist + explicit activation
- Before/after: accessible side-by-side (no drag-only slider)
- Unknown blocks: non-destructive fallback

## Next Project

Deterministic order from published projects (`sortProjectsByOrder`). Wraps from last → first. Draft/archived excluded.

## Performance Guardrails

- Transform/opacity only for motion
- No React state updates per scroll frame in Luminous Thread (CSS vars + rAF for pointer)
- Lazy iframe loading for prototypes
- `prefers-reduced-motion`: no Lenis, no lift/scale, no stagger, static thread

## Phase 05 Boundary

Full bilingual/theme/responsive audit, formal performance audit, and advanced parallax remain Phase 05–06.
