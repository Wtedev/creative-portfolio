# Phase 06 — Production Readiness and Launch Guide

This document records the Phase 06 audit results and the steps required to launch the bilingual portfolio safely.

## What Phase 06 Verified

- Production build succeeds without Sanity credentials (fallback fixtures).
- Core routes render in EN/AR with localized metadata, canonicals, and hreflang alternates.
- Robots and sitemap exclude `/studio` and `/api/`.
- Preview/draft routes are not indexed when draft mode is enabled.
- Structured data uses only CMS/fallback facts (`Person`, `WebSite`, `CreativeWork`).
- Motion, Lenis, and Luminous Thread pause when the document is hidden.
- Hydration mismatches from reduced-motion DOM branching were removed.
- Locale-specific font loading reduces transferred font bytes per route.
- Security headers are applied to public routes (not Studio).
- Preview redirect paths are sanitized against open redirects.

## Required User-Provided Content Before Launch

Replace all placeholder content marked with `[Sample]`, `[Placeholder]`, or `[تجريبي]`:

1. Real professional name, bio, location, and availability.
2. Real email and LinkedIn URL in site settings and contact.
3. Published project media, OG images, and case-study blocks.
4. Portrait image for the About section.
5. Branded default social image (1200×630 recommended).
6. Per-project OG images where case-study sharing matters.

The site is **not fully launchable** until these are replaced. Fallback fixtures remain intentionally marked as sample content.

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

| Variable                         | Scope       | Purpose                          |
| -------------------------------- | ----------- | -------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`  | Public      | Sanity project ID                |
| `NEXT_PUBLIC_SANITY_DATASET`     | Public      | Dataset name                     |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Public      | API version                      |
| `SANITY_API_READ_TOKEN`          | Server only | Draft/preview reads              |
| `SANITY_PREVIEW_SECRET`          | Server only | Authorizes preview entry         |
| `NEXT_PUBLIC_SITE_URL`           | Public      | Canonical URLs, sitemap, OG URLs |

**Never** expose `SANITY_API_READ_TOKEN` or `SANITY_PREVIEW_SECRET` to the browser.

Before launch, set `NEXT_PUBLIC_SITE_URL` to the production origin (for example `https://your-domain.com`). Localhost canonicals are expected during local measurement but must be replaced for production SEO.

## Sanity Setup

1. Create a Sanity project and add credentials to `.env.local`.
2. Configure CORS for the production domain and `http://localhost:3000` during development.
3. Open `/studio` and publish site settings, about, contact, capabilities, tools, and projects.
4. Configure Presentation preview using the production `NEXT_PUBLIC_SITE_URL`.
5. Set preview URL to `/api/draft-mode/enable?secret=…&slug=…&locale=…`.

See `docs/09-sanity-setup.md` and `docs/07-cms-editor-guide.md`.

## Preview Configuration

Preview requires both `SANITY_PREVIEW_SECRET` and `SANITY_API_READ_TOKEN`.

- Draft pages emit `noindex` metadata.
- Preview JSON-LD is omitted on draft views.
- Redirect targets are limited to `/en` and `/ar` paths.

## Build and Test Commands

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
pnpm start
```

Optional:

```bash
pnpm audit
```

## Deployment (Provider-Neutral)

1. Connect the repository to your hosting provider.
2. Set all environment variables in the provider dashboard (not in the repo).
3. Use `pnpm build` as the build command and `pnpm start` as the start command.
4. Ensure Node.js 20+ and pnpm 11+ match local development.
5. Add the production domain to Sanity CORS origins.

Do **not** commit `.env.local`, Lighthouse output, Playwright reports, or `.next`.

## Post-Deployment Smoke Tests

Verify manually or with Playwright against production:

- `/en`, `/ar`
- `/en/project/[slug]`, `/ar/project/[slug]`
- `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`
- Theme toggle persistence
- Locale switcher preserving slug/hash
- Mobile menu keyboard trap and scroll lock
- Reduced-motion static experience
- `/studio` setup or authenticated Studio access

## Rollback

- Redeploy the previous successful build artifact or git tag.
- If a CMS publish caused regressions, revert the Sanity document revision instead of redeploying frontend code.

## Content Editor Checklist

- [ ] Site settings SEO title/description localized in EN and AR
- [ ] Social image uploaded (1200×630)
- [ ] Projects set to **Published** only when ready
- [ ] Cover alt text filled for every project image
- [ ] Case-study blocks reviewed in both locales
- [ ] Contact email and LinkedIn verified

## Accessibility Check

- Keyboard-only navigation across header, cards, tools scroller, and contact links
- Screen reader pass in EN and AR (VoiceOver/NVDA)
- 200% zoom without loss of content
- Contrast review in light and dark themes

## Performance Notes

Local production measurements (Aug 2026, localhost, fallback content):

| Route                        | Perf | A11y | SEO | BP  | LCP  | CLS   | TBT  |
| ---------------------------- | ---- | ---- | --- | --- | ---- | ----- | ---- |
| `/en`                        | 90   | 100  | 92  | 100 | 3.7s | 0.002 | 40ms |
| `/ar`                        | 88   | 100  | 92  | 100 | 3.8s | 0     | 40ms |
| `/en/project/sample-project` | 92   | 100  | 92  | 100 | 3.4s | 0.002 | 50ms |

### After Phase 06 fixes (same environment)

| Route                        | Perf | A11y | SEO | BP  | LCP  | CLS   | TBT  |
| ---------------------------- | ---- | ---- | --- | --- | ---- | ----- | ---- |
| `/en`                        | 92   | 100  | 92  | 100 | 3.4s | 0.002 | 40ms |
| `/ar`                        | 88   | 100  | 92  | 100 | 3.8s | 0     | 40ms |
| `/en/project/sample-project` | 92   | 100  | 92  | 100 | 3.4s | 0.002 | 40ms |

Primary local LCP bottleneck: render-blocking Google Fonts (~166–210KB transferred). Homepage LCP element is typography, not imagery. Locale-specific font class application and hydration fixes improved `/en` LCP from 3.7s to 3.4s; full sub-2.5s LCP requires local WOFF2 files or fewer weights on production CDN edge caching.

Lighthouse SEO score on localhost reflects localhost canonical validation; production domain resolves this.

## Fonts

Licensed local WOFF2 files were not supplied. The site uses `next/font/google` (Manrope + IBM Plex Sans Arabic). To migrate:

1. Add files under `public/fonts/` per `docs/04-design-system-foundation.md`.
2. Switch `src/lib/fonts.ts` to `next/font/local`.
3. Re-run Lighthouse after migration.

## Social and OG Images

- Default OG image: site settings `socialImage` or `seo.ogImage`
- Project OG image: project `ogImage` field
- Missing images omit OG image tags rather than fabricating artwork

## Analytics and Cookie Consent

No analytics are installed. If analytics are added later, decide consent requirements based on jurisdiction and provider before enabling tracking scripts.

## CSP

A strict Content Security Policy is intentionally deferred until the production domain, Sanity CDN, and embed providers are finalized. Security headers (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`) are enabled on public routes.

## Missing Launch Inputs Summary

- [ ] Production domain in `NEXT_PUBLIC_SITE_URL`
- [ ] Real contact details
- [ ] Real project media and OG images
- [ ] Branded default social image asset
- [ ] Optional local font files
- [ ] Sanity production dataset populated
- [ ] Studio authentication strategy for production
