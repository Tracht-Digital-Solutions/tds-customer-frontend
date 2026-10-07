# Architecture

## Everything is assembled at build time from GitHub Packages

There is no app source here beyond `astro.config.mjs` and configuration.

- **`coreFrontendBase()`** (host package) injects the base pages, the shell and the pre-paint
  auth gate. Sign-in is the central auth site.
- **`frontendHost({ extensions })`** injects each extension's routes and virtual modules.
- **`FRONTEND_TARGET=customer`** selects the customer auth-hint prefix (`tds_customer_*`) and
  the brand suffix ("Portal"). The host emits `<html data-frontend="customer">`, which matches no
  rule today: the portal renders the **base** panel (navy), and the admin product is the one that
  deviates (burgundy). The marker stays explicit at no cost.

## Extension set (allowlist)

`support-tickets`, `billing` (own invoices and the pay link; admins draft invoices in the admin
product), `projects`, `documents`, `messages` and `shop`.

The set is an **allowlist** in `test/composition.test.ts`; a new extension is added there on
purpose. Admin-only tooling (website/blog CMS, lexware, the contact inbox, tools, customers,
time-tracker) must never be composed here.

## `/wiki` is the customer wiki

FAQs and handbooks, no API reference. The same route exists in both products and branches on
`FRONTEND_TARGET` inside the host's `pages/wiki.astro`; the nav calls it *Hilfe*.

Content comes from the database through the public `/help/*` routes and is edited in the admin
product under *Wiki-Inhalte*. The owning extension (`tds-ext-live-chat-cta`) is **not** composed
here and doesn't need to be: the page is base code calling a public API, like the shared
`LiveChatCta` island the shell already mounts.

## Cross-frontend single sign-on

The session cookie is `Domain=.tracht-digital.de`, so one login signs a principal into this
portal and the admin product. The per-target hint prefix keeps a stale admin hint from revealing
the portal shell before `/me` answers.

## One tds-shared, decided here

The host takes tds-shared as a peer. `npm ls @tracht-digital-solutions/tds-shared` must show
exactly one version.

## Shell behaviour lives in the host and tds-shared

- **Navigation is app-like** (`ClientRouter`, prefetch, persisted shell regions). Drawer state and
  theme survive route changes; cached data may stay visible with the shared stale treatment.
- **One toast stack.** The shell mounts `ToastHost` once; extensions only raise toasts.
- **Mobile behaviour comes from tds-shared** (`.tds-table` scrolls below 40rem, `.tds-page__head`
  stacks, 44 px chips, safe-area clearance). This portal is the surface most often opened on a
  phone. Don't add wrappers or breakpoints here.
- Tailwind scans extension packages via `@source` in the host. Don't add a competing one.

Fix any of these in the host or tds-shared and repin.

## Version pins

Each extension is pinned to its current `0.MINOR.x` line. A release this product should pick up
must stay in that line.
