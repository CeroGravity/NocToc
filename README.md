# NocToc

A streaming-service front end — browse trending titles, watch trailers, and curate a
personal watchlist. Built as a ground-up **Next.js 16 App Router** rebuild with a
security-first data layer.

> **Live demo:** _add your Vercel URL here_

---

## Stack

| Concern        | Choice                                              |
| -------------- | --------------------------------------------------- |
| Framework      | Next.js 16 (App Router, RSC) · React 19             |
| Styling        | Tailwind CSS v4 (CSS-first `@theme`) · shadcn/ui · Radix |
| State          | Zustand (auth, modal, watchlist stores)             |
| Auth & data    | Firebase Auth · Cloud Firestore                     |
| Movie data     | TMDB (server-only)                                  |
| Video          | Self-hosted trailers via Video.js, YouTube fallback |
| Notifications  | sonner                                              |

## Features

- **Hero banner** — random featured title from live TMDB trending, layered scrims, CTAs.
- **Genre rows** — horizontally-scrollable cards, fetched server-side and resilient
  (`Promise.allSettled` — one failing genre never blanks the page).
- **Title modal** — trailer playback with a strict fallback chain:
  self-hosted `.mp4` → YouTube (privacy `youtube-nocookie` embed) → backdrop → surface.
- **Watchlist** — Firestore-backed, real-time via `onSnapshot`, with optimistic
  add/remove that reverts on write failure.
- **Browse pages** — `/tv`, `/movies`, `/new` category views.
- **Auth** — email/password sign-up & sign-in, route-group guard, seeded avatars.

## Architecture

```
src/app/
  (app)/            ← authenticated shell: guarded ONCE in the group layout
    layout.tsx        AuthGuard › ListProvider › Header + {page} + MovieModal
    page.tsx          home (banner + rows)   [force-dynamic]
    tv | movies | new | my-list
  login | signup    ← public, outside the group (no header, no guard)
  api/trailer/[id]  ← server route: resolves a YouTube trailer key (keeps TMDB key server-side)

src/lib/tmdb.ts     ← "server-only" data layer; the TMDB key never reaches the client
src/lib/images.ts   ← client-safe image URL helper (shared by server + client)
src/store/*         ← Zustand: useAuthStore, useModalStore, useListStore
```

The app shell lives behind a **single `AuthGuard`** at the route-group layout, so every
authenticated route is protected once rather than per-page. Public auth pages sit outside
the group.

## Security (AppSec notes)

This was built with a defensive posture; the highlights a reviewer might care about:

- **Secret isolation.** The TMDB key is `TMDB_API_KEY` (no `NEXT_PUBLIC_` prefix) and the
  data layer imports `"server-only"`, so the key is provably absent from the client bundle.
  Trailer lookups go through a server route handler rather than a client-side TMDB call.
- **Firestore least-privilege.** Rules ([`firestore.rules`](./firestore.rules)) are
  deny-by-default with per-user isolation:
  `allow read, write: if request.auth != null && request.auth.uid == userId`.
  No rule exposes another user's `myList` subtree — cross-user reads are rejected at the
  database layer.
- **Content-Security-Policy** + HSTS, `X-Frame-Options: DENY`, `nosniff`,
  `Referrer-Policy`, and a locked-down `Permissions-Policy` (camera/mic/geo denied), all
  set in [`next.config.ts`](./next.config.ts). The CSP whitelists exactly the origins the
  app needs (TMDB images, DiceBear avatars, Firebase auth/Firestore, YouTube embeds).
- **Documented CSP tradeoff.** `script-src` keeps `'unsafe-inline'` (Next injects a small
  inline bootstrap; nonce-based CSP would force every static route dynamic) and
  `'unsafe-eval'` is **dev-only** — it is stripped from the production policy.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev                  # http://localhost:3000
```

### Environment variables

| Variable                                   | Notes                              |
| ------------------------------------------ | ---------------------------------- |
| `TMDB_API_KEY`                             | TMDB v3 key — **server-side only** |
| `NEXT_PUBLIC_FIREBASE_API_KEY`             | Firebase web config                |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`         |                                    |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID`          |                                    |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`      |                                    |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` |                                    |
| `NEXT_PUBLIC_FIREBASE_APP_ID`              |                                    |

Firebase web config values are public by design (protected by Security Rules); the TMDB
key is the one true secret and is kept off the client.

### Firebase setup

1. Create a Firebase project; enable **Email/Password** auth.
2. Create a **Cloud Firestore** database (production mode).
3. Publish the rules from [`firestore.rules`](./firestore.rules).

## Scripts

```bash
npm run dev     # dev server
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Self-hosted trailers

Drop an `.mp4` in `public/trailers/` and register it in `src/lib/trailers.ts`
(`LOCAL_TRAILERS` by TMDB id, or `AMBIENT_TRAILER` for a shared hero loop). A local file
always takes priority over the YouTube fallback.
