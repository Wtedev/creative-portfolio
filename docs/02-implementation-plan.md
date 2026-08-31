# Implementation Plan

## Phase 1 — Foundation ✅ (Current)

**Objective:** Technical foundation, typed content model, placeholder UI, tests, and documentation.

**Deliverables:** Next.js scaffold, i18n, themes, tokens, Sanity schemas, fallback content, routes, SEO/a11y/test foundations.

**Dependencies:** None.

**Risks:** Route-group layout complexity with `/studio` outside locale tree.

**Acceptance criteria:** All verification commands pass; bilingual routes work; fallback content loads without Sanity.

**Testing:** Unit tests for locale/theme/content; E2E smoke tests for core routes.

---

## Phase 2 — CMS and Admin Experience

**Objective:** Connect Sanity, finalize Studio UX, preview, and publishing workflow.

**Deliverables:**

- Sanity project connection and seed migration path
- Studio field groups, previews, validation polish
- Visual preview (Presentation tool)
- Draft/published perspectives
- `/studio` authentication strategy
- Remove or gate fallback content toggle

**Dependencies:** Phase 1; Sanity credentials from user.

**Risks:** Preview URL configuration; bilingual field validation edge cases; duplicate order validation in Studio.

**Acceptance criteria:** Editors can create/edit/publish all document types; preview matches frontend blocks; app prefers CMS over fallback when configured.

**Testing:** Studio smoke tests; content integration tests against Sanity mock or test dataset.

---

## Phase 3 — Visual System and Homepage

**Objective:** Apply Luminous Systems art direction to homepage sections.

**Deliverables:**

- Reference analysis (requires 4 attached reference images at phase start)
- Grid system, typography scale finalization
- Hero, work cards, capabilities, tools, process, about, contact, footer
- Light and dark art direction parity
- Local font files (Manrope Variable, IBM Plex Sans Arabic)

**Dependencies:** Phase 2 content available; reference images attached in Cursor.

**Risks:** Over-design before content parity; performance impact from effects.

**Acceptance criteria:** Homepage matches approved direction; contrast passes WCAG AA; no pure black/white.

**Testing:** Visual review checklist; responsive breakpoints; theme parity.

---

## Phase 4 — Projects, Case Studies and Motion

**Objective:** Case-study block renderer, project transitions, smooth scroll.

**Deliverables:**

- Project card system with `cardSize` variants
- Portable Text and media block renderer
- Lenis smooth scroll (native anchors remain fallback)
- Scroll-linked lighting (subtle)
- Shared project transitions
- `prefers-reduced-motion` alternatives

**Dependencies:** Phase 3 visual system; CMS block content.

**Risks:** Motion performance; RTL scroll behavior; heavy media.

**Acceptance criteria:** All block types render correctly in EN/AR; reduced motion disables non-essential animation.

**Testing:** Block renderer unit tests; E2E project navigation; performance spot checks.

---

## Phase 5 — Bilingual and Responsive Polish

**Status:** Complete (see `docs/12-phase05-bilingual-theme-responsive.md`).

**Objective:** Full Arabic typography and RTL validation; responsive behavior.

**Deliverables:**

- Arabic line lengths, numerals, punctuation
- Mobile/tablet layouts for all sections
- Content parity audit (EN/AR independently edited)
- Locale switcher and metadata parity
- Theme FOUC mitigation and persistence verification

**Dependencies:** Phases 3–4.

**Risks:** RTL grid mirroring bugs; mixed-direction text in CMS fields.

**Acceptance criteria:** Arabic pages feel native, not translated; all sections usable on mobile.

**Testing:** RTL E2E suite; manual Arabic content review with native speaker.

---

## Phase 6 — QA, Performance, SEO and Launch

**Objective:** Production readiness.

**Deliverables:**

- Performance profiling (LCP < 2.5s, INP < 200ms, CLS < 0.1 targets)
- Image/video optimization pipeline
- Accessibility audit (WCAG 2.2 AA)
- Cross-browser testing
- Final SEO (structured data, OG images)
- Analytics decision
- Deployment checklist

**Dependencies:** All prior phases.

**Risks:** CMS media size; third-party embeds; analytics consent.

**Acceptance criteria:** Production build passes audit checklist; launch runbook complete.

**Testing:** Lighthouse CI; full Playwright regression; manual QA sign-off.
