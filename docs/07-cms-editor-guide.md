# CMS Editor Guide

## Studio access

Visit `/studio` after configuring `.env.local`. Without credentials, a setup guide appears — the public site still works with fallback fixtures.

## Navigation

1. **Projects** — filtered views (All, Featured, Published, Draft/In Progress, Archived)
2. **Tools**
3. **Capabilities**
4. **About** — singleton
5. **Contact & Availability** — singleton
6. **Site Settings** — singleton

## Editorial workflow for projects

1. **Basics** — bilingual title, slug, client, year, role, categories, services
2. **Homepage Card** — cover, alt text, short description, card size, accent color, featured, order
3. **Case Study** — reorder approved blocks only
4. **Credits & Outcome** — accurate credits and verified results
5. **SEO & Sharing** — bilingual SEO fields and OG image
6. **Publishing** — set editorial status

### Editorial status

| Status           | Public site |
| ---------------- | ----------- |
| Draft            | Hidden      |
| Ready for Review | Hidden      |
| Published        | Visible     |
| Archived         | Hidden      |

Sanity's document draft state and this editorial status field are related but not identical. Only **Published** projects appear publicly (except in authorized preview).

## Adding a project

1. Projects → All Projects → Create
2. Complete **Basics** and **Homepage Card**
3. Build the case study from approved block types
4. Add credits and outcomes — never invent metrics
5. Complete SEO fields
6. Set status to **Ready for Review**, then **Published** when approved

## Case-study blocks

Editors may reorder but not invent layouts. Approved blocks:

Rich Text, Full-width Image, Image Pair, Image Grid, Video, Before/After, Design Principle, Quote, Metrics, Prototype Embed, Caption, Credits.

Use bilingual fields for all public copy. Arabic is edited independently — not auto-translated.

## Singleton documents

| Area                   | Stable ID                        |
| ---------------------- | -------------------------------- |
| About                  | `singleton-about`                |
| Contact & Availability | `singleton-contact-availability` |
| Site Settings          | `singleton-site-settings`        |

These open directly from Studio — do not create duplicates.

## Tools and capabilities

- Reorder with the **Order** field
- Hide with **Visible** instead of deleting
- Tools use fixed categories: direction, design, build, motion, ai

## Preview

When preview credentials are configured:

1. Use the **Preview** tool in Studio, or
2. Visit `/api/draft-mode/enable?secret=…&locale=en&slug=…`

Exit preview via `/api/draft-mode/disable`.

## Media

See `docs/10-media-guide.md` for dimensions, formats, alt text, and video guidance.

## Removing fallback content

Once Sanity is live and verified, fallback fixtures in `src/content/fallback/` can be removed or kept for local offline development only.
