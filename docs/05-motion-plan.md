# Motion Plan

## Installed (Phase 1)

- **Motion** (`motion`) — React animation library
- **Lenis** — smooth scroll

Neither is wired into the UI yet. Native anchor scrolling remains the default.

## Phase 4 Implementation

### Smooth Scroll

- Lenis wraps main scroll container
- Native `#anchor` links must work without Lenis (progressive enhancement)
- Disable Lenis when `prefers-reduced-motion: reduce`

### Section Motion

- Hero entrance (subtle opacity + translate)
- Work card hover/focus states (not hover-only)
- Section reveal on scroll (Intersection Observer + Motion)

### Scroll-Linked Effects

- Subtle background luminance shifts tied to scroll progress
- No constant visual noise or performance-heavy parallax

### Project Transitions

- Shared element transition from work card to case-study hero (view transitions API or Motion layout)

### Reduced Motion

All motion must have a static alternative:

```css
@media (prefers-reduced-motion: reduce) {
  /* already in utilities.css */
}
```

Runtime check before initializing Lenis and scroll-linked lighting.

## Performance Guardrails

- No WebGL in initial release
- No heavy background video
- Dynamic import for motion modules
- Target INP < 200ms
