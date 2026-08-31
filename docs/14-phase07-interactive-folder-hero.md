# Phase 07 — Interactive Glass Folder Hero

## Reference Interpretation

The attached reference informed only:

- Central folder metaphor as a container for creative work
- Layered project fragments emerging from a translucent pocket
- Editorial title hierarchy above a controlled central composition
- Relationship between title, folder, and selected work

Intentionally **not** copied:

- Exact typography, green/blue treatment, pill labels, metadata strip
- Card arrangement, reference artwork, and creator composition
- Brand marks and social chrome on the folder face

## Original Concept

**Luminous Glass Project Folder** — a violet/cyan glass pocket belonging to the existing Luminous Systems direction. Fragments represent Ideas → Direction → Systems → Experiences. Visitors may drag sheets to inspect them, return them to the pocket, or open case studies directly.

## Architecture

```
src/features/home/hero-section.tsx          Server Component (copy + data)
src/components/hero/folder-scene.tsx        Client orchestration
src/components/hero/folder-shell.tsx        Decorative CSS folder layers
src/components/hero/draggable-project-fragment.tsx
src/components/hero/folder-reset-control.tsx
src/lib/motion/folder-layout.ts             Positions / clamp helpers
src/lib/motion/drag-intent.ts               Click-versus-drag threshold
src/lib/content/hero-fragments.ts           Published-project mapping
src/styles/folder-hero.css
```

## Drag State Model

States per fragment: `stacked` → `dragging` → `inspecting` | `returning` → `stacked`.

- Drop near the pocket returns to stack
- Drop elsewhere settles into a safe inspection offset
- Reset restores deterministic art-directed slots
- Locale/route changes reset the scene
- Continuous coordinates use Motion transforms; React state holds discrete status only

## Click Versus Drag

Movement threshold: **8px** (`drag-intent.ts`). Genuine drags suppress link navigation. Keyboard and unmodified clicks still open the case study via an explicit project link inside each fragment.

## Keyboard / Touch / Reduced Motion

- Keyboard: focusable project links; Enter opens the case study; Reset is a labeled button
- Touch / narrow: drag disabled; shallow static stack; page scroll preserved (`touch-action: pan-y`)
- Reduced motion: no springs/momentum; static stack with links and Reset

## Arabic Treatment

Does not italicize Arabic. `مخرجة فنية` uses heavier weight; `ومطوّرة إبداعية` uses secondary weight/color. IBM Plex Sans Arabic only.

## Font Decision

| Role               | Face                    | Source                   | Notes                                   |
| ------------------ | ----------------------- | ------------------------ | --------------------------------------- |
| English expressive | **Fraunces** italic 500 | `next/font/google` (OFL) | Loaded only on `en` routes with Manrope |
| English technical  | Manrope                 | existing                 | Sans line of the H1                     |
| Arabic             | IBM Plex Sans Arabic    | existing                 | No new Arabic display face              |

License: SIL Open Font License via Google Fonts. Italic-only subset minimizes extra bytes. Remeasure LCP after deploy; if fonts regress further, fall back to system serif and keep Fraunces optional.

## Data Contract

`HeroProjectFragment` fields only. Source: published `ProjectSummary[]` from the content provider. With a single fallback project, the folder pads to four **editorial facet sheets** (Idea / Direction / System / Experience) that share the real project slug — not invented case studies.

## Theme

Dark: aubergine glass, violet border, cyan sheen. Light: frosted pale-violet surface, stronger borders, reduced glow. Backdrop-filter has opaque fallback.

## Performance Notes

Local production spot check after Phase 07 (localhost, fallback content):

| Metric        | Phase 06 `/en` | Phase 07 `/en`         |
| ------------- | -------------- | ---------------------- |
| Performance   | 92             | 86                     |
| Accessibility | 100            | 98→fixed heading order |
| LCP           | 3.4s           | ~3.9s                  |

Primary cost: Fraunces italic + folder client JS. Acceptable for the interaction; remotes with local WOFF2 and CDN caching should recover. No video or multi-priority LCP images were added.

## Known Limitations

- Fallback content still uses one sample project (facet sheets share that slug)
- Real covers/OG art still required before launch
- WebKit Playwright binary may still segfault on some macOS hosts (see Phase 06)
