# Phase 07 — Interactive Glass Folder Hero

## Reference Interpretation

The reference informed only material, depth, and hierarchy:

- Translucent folder as central object
- Project cards emerging from the pocket
- Editorial title separate from the interactive stack
- Frosted glass, rounded forms, luminous background

Not copied: green palette, reference artwork, exact positions, social chrome, floating category clutter.

## Concept

**Luminous Frosted Project Folder** — violet/cyan glass pocket with a two-column Hero:

- **Copy column:** eyebrow, H1, statement, CTAs, explore link
- **Folder column:** compact folder with unique published project cards

Drag is **temporary only**: pull a card to inspect, release, and it springs back to its slot. No reset, return, or persistent inspection states.

## Architecture

```
src/features/home/hero-section.tsx
src/components/hero/folder-scene.tsx
src/components/hero/folder-shell.tsx
src/components/hero/draggable-project-fragment.tsx
src/components/hero/decorative-folder-sheet.tsx
src/lib/motion/folder-layout.ts
src/lib/motion/drag-intent.ts
src/lib/content/hero-fragments.ts
src/styles/folder-hero.css
```

## Interaction Model

States: `stacked` → `dragging` → `returning` → `stacked`

- Release always restores the exact art-directed slot
- Spring: stiffness 420, damping 34, mass 0.72
- Reduced motion: instant return
- `dragMomentum={false}`, `dragElastic={0.06}`
- Click without drag opens the project (8px threshold)

## Data

- One card per unique published project (max 4)
- Single fallback project → one real card + up to two decorative abstract sheets (aria-hidden, not draggable)
- No facet duplication or repeated sample slugs

## Card Content

Cover, title, optional category, index, restrained arrow. Semantic link: `Open project: [title]`.

## Layout

Single centered column on all breakpoints:

1. Eyebrow
2. H1
3. Folder
4. Explore My Work ↓
5. Statement
6. CTAs

Desktop and mobile share the same semantic order. Drag instruction is visually hidden and exposed through `aria-describedby` on the folder scene.

## Folder Geometry

- Shell: `aspect-ratio: 1.28 / 1`, width `min(88vw, 34rem)`
- Back panel with attached tab (`::before`)
- Front pocket: lower 43%, visible top lip
- Cards: portrait 4/5 sheets inserted into the pocket (lower portion hidden)

## Accessibility

- One semantic H1 per locale
- Keyboard-accessible project links with visible focus
- Decorative sheets `aria-hidden`
- No Reset/Return copy in UI or screen-reader instructions

## Theme

Dark/light retain existing tokens. Reduced blur, glow, and borders versus earlier iterations.

## Known Limitations

- Fallback content still uses one sample project
- Real covers/OG art required before launch
- WebKit Playwright may segfault on some macOS hosts (Phase 06)
