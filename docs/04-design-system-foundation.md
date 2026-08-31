# Design System Foundation

Phase 3 implements the **Luminous Systems** visual direction. Reference analysis: [11-reference-analysis.md](./11-reference-analysis.md).

## Principles

- The work is the interface; motion and light support readability
- Semantic CSS variables (`--color-*`), never hard-coded theme colors in components
- Logical properties for RTL
- No pure `#000` or `#fff`
- Luminous overlays stay behind content at ~12–28% opacity

## Color Tokens

Applied via `[data-theme='dark']` and `[data-theme='light']` in `src/styles/tokens.css`.

| Role       | Token                    | Dark         | Light        |
| ---------- | ------------------------ | ------------ | ------------ |
| Background | `--color-background`     | `#111017`    | `#F3F1F5`    |
| Surface    | `--color-surface`        | `#191721`    | `#EAE7ED`    |
| Card       | `--color-card`           | `#201B2A`    | `#F8F6F9`    |
| Text       | `--color-text`           | `#F1EEF4`    | `#1A1820`    |
| Secondary  | `--color-text-secondary` | `#B9B3C2`    | `#625D69`    |
| Accent     | `--color-accent`         | `#9A6CFF`    | `#7047D9`    |
| Cyan       | `--color-accent-cyan`    | `#58D6F7`    | `#087F9C`    |
| Glow       | `--color-glow`           | violet alpha | violet alpha |

## Typography

| Role    | Source                                              |
| ------- | --------------------------------------------------- |
| English | Manrope via `next/font/google` (`src/lib/fonts.ts`) |
| Arabic  | IBM Plex Sans Arabic via `next/font/google`         |

Fluid scale in `src/styles/typography.css`. Body targets 16–20px with ~55–72 character prose widths.

## Grid & Spacing

- Max width: `90rem` (1440px)
- Columns: 4 / 8 / 12 at mobile / tablet / desktop
- Spacing scale: `--space-2` (8px) through `--space-10` (144px)
- Section scroll offset: `--scroll-offset` for fixed navigation

Files: `src/styles/grid.css`, `src/styles/components.css`.

## Luminous Thread (Phase 3 foundation)

Static section gradients in `src/styles/luminous.css`:

- Hero: central radial + fine grid
- Work: localized project glow
- Tools: horizontal band
- About: quiet reading light
- Contact: focused CTA glow

Scroll-linked transitions belong to Phase 4.

## Component Hierarchy

```
components/
  navigation/site-header.tsx
  layout/site-footer.tsx
  ui/ (container, section, button, tools-scroller, placeholder-media)
features/
  home/ (hero, selected-work, process)
  projects/project-card.tsx
  capabilities/, tools/, about/, contact/
```

## Motion Boundary

Phase 3: nav surface, button/menu feedback, basic card hover/focus.  
Phase 4: scroll-linked thread, card choreography, route transitions.

Tokens: `--motion-fast` (160ms) through `--motion-section` (800ms), `--ease-out`.

## Theme Integration

`next-themes` sets `data-theme` on `<html>`. Both themes are intentionally art-directed—not inverted copies.

## Accessibility

- Focus rings via `--focus-ring`
- Decorative luminous layers use pseudo-elements (no AT exposure)
- `prefers-reduced-motion` disables transitions in `utilities.css`

## Known Limitations

- Local WOFF2 font files not committed; Google Fonts loaded through `next/font`
- Portfolio media remains neutral placeholders until CMS assets are supplied
