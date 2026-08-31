# Reference Analysis — Phase 3

Four reference images were inspected at the start of Phase 3. They are **direction references only** — not production assets and not copied literally.

## Reference 1 — Xebec / Create + Brand Intelligence

**Transferable observations**

- Composition: centered focal element with extreme negative space; corner metadata at small scale.
- Hierarchy: one primary word ("Create") vs tiny bracketed metadata.
- Color: near-black violet ground; electric violet volumetric beam; white primary type.
- Lighting: soft cone radiating from a vertical axis; glow stays behind text.
- Surface: thin glowing pill outline; glass-like restraint.
- Typography: bold sans display + uppercase tracked metadata.
- Density: very low; editorial poster feel.

**Appropriate for portfolio:** hero central glow, fine grid, metadata eyebrows, pill CTAs.

**Do not copy:** exact "+ Create" UI, Xebec branding, beam geometry.

## Reference 2 — Thank You / 3D Characters

**Transferable observations**

- Hierarchy: gradient display type (violet → cyan) at massive scale; tiny tracked secondary text.
- Lighting: rim light and ambient color pools (magenta left, cyan right).
- Atmosphere: dark void with colored atmosphere, not flat grey.
- Density: character cluster as focal mass; footer as thin functional row.

**Appropriate for portfolio:** gradient accent on key words sparingly; dual-tone ambient backgrounds; footer social row.

**Do not copy:** 3D characters, "Thank You" composition, meme-adjacent tone.

## Reference 3 — RYZE / Systems over Services

**Transferable observations**

- Bilingual stacking: English display + Arabic subline with equal dignity.
- Surface: three glass tiles; center tile luminous, neighbors dimmed.
- Interaction cue: touch/hover focal point with light response.
- Grid: implied structure through aligned tiles and bracket labels.
- Typography: wide metallic/display "SYSTEMS" vs lowercase supporting line.

**Appropriate for portfolio:** bilingual hero stacking, glass cards, touch-ready focus states, bracket labels.

**Do not copy:** hand photography, RYZE logo, tile icons.

## Reference 4 — Feature Grid / Prospect & Personalize

**Transferable observations**

- Grid: asymmetric 3+2 card layout with consistent gutters.
- Cards: dark elevated surfaces, bottom-edge violet glow, fine border.
- Typography: gradient section heading; white card titles; muted body.
- Hierarchy: section title → intro paragraph → card grid.
- Density: moderate; each card one idea.

**Appropriate for portfolio:** project grid glow, capability cards, tools scroller cards, section headers.

**Do not copy:** SaaS product illustrations, pipeline UI mockups, exact card art.

## Combined Design Rationale

The portfolio implementation translates these references into an **original "Luminous Systems" language**:

1. **Structured darkness** — `#111017` grounds (never pure black) with fine line grids.
2. **Living light** — section-specific violet gradients at 12–28% opacity behind content.
3. **Editorial type** — large display titles, small uppercase metadata, comfortable Arabic line height.
4. **Glass surfaces** — 1px borders, subtle backdrop blur on navigation when scrolled.
5. **Disciplined grids** — 12/8/4 columns, deterministic project card sizes from CMS.
6. **Restraint** — cyan and gradients used as signals, not decoration everywhere.

The result supports an art-director portfolio: work-first, technically refined, bilingual, and distinct from generic developer templates.

## Motion Boundary (Phase 03 vs 04)

| Phase 03                                            | Phase 04                                 |
| --------------------------------------------------- | ---------------------------------------- |
| Static luminous gradients                           | Scroll-linked thread transitions         |
| Nav surface on scroll                               | Lenis smooth scroll                      |
| Basic card hover/focus                              | 6px lift, edge light, shared transitions |
| CSS section reveals (optional, reduced-motion safe) | Active card tracking                     |
