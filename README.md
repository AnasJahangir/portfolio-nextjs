# Anas Jahangir — Portfolio (Next.js)

A brand-new, modern and simple portfolio for Anas Jahangir, Full-Stack Developer.
Built with **Next.js 15 (App Router)**, **React 19**, **Tailwind CSS 4** and
**framer-motion** animations. The backend lives inside the same Next.js app
(API routes), with **Turso (libSQL)** as the database — Turso never sleeps or
pauses, so the site stays up even with no traffic.

No Supabase anywhere. No obfuscated code.

## Sections

Hero, About, Experience, Featured Projects, Archive / More Projects, Services,
Testimonials (hidden when empty — no fake testimonials), Contact form, and an
`/admin` panel to manage all content.

## Run locally

```bash
npm install
cp .env.example .env   # fill in your values (optional — the site works without them)
npm run dev            # http://localhost:3000
```

Without Turso credentials the site renders from built-in seed data (real projects
and experience) in read-only mode, and `/admin` shows a "database not
connected" notice.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `TURSO_DATABASE_URL` | Yes, for live data | e.g. `libsql://your-db.turso.io` |
| `TURSO_AUTH_TOKEN` | Yes, for live data | Turso auth token |
| `ADMIN_PASSWORD` | Yes, for /admin | Password for the admin panel |
| `ADMIN_JWT_SECRET` | No | JWT signing secret (defaults to `ADMIN_PASSWORD`) |
| `RESEND_API_KEY` | No | Contact-form email notifications via Resend |
| `CONTACT_TO_EMAIL` | No | Where contact notifications go (default `anasjahangir00@gmail.com`) |
| `BLOB_READ_WRITE_TOKEN` | No | Image uploads in /admin via Vercel Blob |

## Turso setup (free, never pauses)

```bash
# Install the Turso CLI, then:
turso auth login
turso db create portfolio
turso db show portfolio --url        # -> TURSO_DATABASE_URL
turso db tokens create portfolio     # -> TURSO_AUTH_TOKEN
```

Tables are created automatically on first use (`CREATE TABLE IF NOT EXISTS`).

## Deploy to Vercel

```bash
vercel
# then set the env vars above in the Vercel dashboard:
# Project Settings → Environment Variables
```

For image uploads, create a Blob store in the Vercel dashboard and set
`BLOB_READ_WRITE_TOKEN`. Without it, cover images can still be added by
pasting an image URL in /admin.

## API routes

- `GET /api/projects` — featured projects
- `GET /api/archive` — archive projects
- `GET /api/jobs` — experience
- `GET /api/testimonials` — testimonials
- `POST /api/contact` — contact form (saves to DB, sends Resend email if configured)
- `/api/admin/*` — login, session, CRUD for all five tables, image upload

## Scripts

```bash
npm run dev      # development server
npm run build    # production build
npm run start    # serve the production build
npm run lint     # lint
```

## Replacing project screenshots

Drop real screenshots in `public/images/` and update the cover image in
`/admin` (or edit `src/lib/seed.js`). Until then, projects use
`/images/project-placeholder.svg`.
