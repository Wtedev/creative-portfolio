# Sanity Setup

## 1. Create or connect a project

1. Sign in at [sanity.io/manage](https://www.sanity.io/manage)
2. Create a project (or reuse an existing one)
3. Note the **Project ID** and **Dataset** name

## 2. Configure environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable                         | Public | Required     | Purpose                             |
| -------------------------------- | ------ | ------------ | ----------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`  | Yes    | Yes          | Sanity project ID                   |
| `NEXT_PUBLIC_SANITY_DATASET`     | Yes    | Yes          | Dataset (default: `production`)     |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Yes    | No           | API version (default: `2024-01-01`) |
| `NEXT_PUBLIC_SITE_URL`           | Yes    | Recommended  | SEO, sitemap, preview origin        |
| `SANITY_API_READ_TOKEN`          | **No** | Preview only | Server-only read token              |
| `SANITY_PREVIEW_SECRET`          | **No** | Preview only | Authorizes `/api/draft-mode/enable` |

Never commit `.env.local`. Never expose server-only tokens in client bundles.

## 3. CORS configuration

In Sanity Manage → API → CORS origins, add:

- `http://localhost:3000` (development)
- Your production domain when deploying

Allow credentials if using authenticated preview.

## 4. Run Studio

```bash
pnpm dev
```

Visit `/studio`. With valid public variables, the embedded Studio loads. Without them, a setup screen appears and the public site uses fallback fixtures.

## 5. Fallback mode

When `NEXT_PUBLIC_SANITY_PROJECT_ID` is missing:

- Public routes use `src/content/fallback/`
- `/studio` shows setup instructions
- Production build succeeds

When Sanity is configured but unreachable:

- Development logs a server error
- Provider marks source as `fallback` with `error: unavailable`
- Public pages do not expose tokens or internal errors

## 6. Preview mode

Preview requires **both**:

- `SANITY_API_READ_TOKEN`
- `SANITY_PREVIEW_SECRET`

Enable preview:

```text
/api/draft-mode/enable?secret=YOUR_SECRET&locale=en&slug=project-slug
```

Disable preview:

```text
/api/draft-mode/disable?redirect=/en
```

The Presentation tool in Studio uses these routes. Unpublished projects are visible only while draft mode is enabled.

## 7. Singleton documents

Stable IDs (see `src/sanity/constants/singletons.ts`):

| Document               | ID                               |
| ---------------------- | -------------------------------- |
| About                  | `singleton-about`                |
| Contact & Availability | `singleton-contact-availability` |
| Site Settings          | `singleton-site-settings`        |

Open these directly from Studio navigation.
