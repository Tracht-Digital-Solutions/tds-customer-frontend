# Agent notes — tds-customer-frontend

The **customer portal product** (`app.tracht-digital.de`). A standalone Astro app that
composes the shared core frontend **host** (`@tracht-digital-solutions/tds-core-frontend`)
with the **customer-facing extension set**, at build time, into one static `dist/`. This
repo owns only the composition + deploy pipeline — the shell, base pages, and features live
in published packages.

> Read the root `C:\Projects\TDS-LP\CLAUDE.md` for the big picture and shared gotchas, and
> `MIGRATION-STATUS.md` for how this product (partially) replaces the legacy `tds-customer-legacy-frontend`.

## Mental model

- **Assembled at build time from GitHub Packages** — no app source beyond `astro.config.mjs`
  + config:
  - `coreFrontendBase()` (host package) injects the base pages + shell + pre-paint auth gate.
  - `frontendHost({ extensions })` injects each extension's route + virtual modules.
  - `FRONTEND_TARGET=customer` selects the customer auth-hint prefix (`tds_customer_*`), the
    brand suffix ("Portal"), and — since host 0.13.0 / tds-shared 0.15.0 — the **accent hue**:
    the host emits `<html data-frontend="customer">` and `surfaces/panel.css` paints this
    product **teal** (the management panel reads navy), so a user with both open knows which
    surface they are on. That is the only visual difference between the two products; it is
    one token block in tds-shared, not anything this repo configures.
- **Extension set:** `support-tickets` + `billing` (the customer-facing invoice pay-link /
  own-invoice view; admins draft invoices in the admin frontend). Projects, documents and
  messages get added here as those extensions ship — see `MIGRATION-STATUS.md` for what's
  still owned by the legacy `tds-customer-legacy-frontend(-api)`.
- **Cross-frontend SSO:** the session cookie is `Domain=.tracht-digital.de`, so a principal with
  access is signed into this portal *and* the admin frontend by one login. The per-target hint
  key prefix keeps a stale admin hint from revealing the portal.
- **To change the shell or a base page, edit the *host* package and release it, then repin
  here.** Never fork base UI into this repo.

## Gotchas

Same as `tds-admin-frontend`: `npm install --no-package-lock`; extensions pinned `^0.1.x`;
Tailwind `@source` scan lives in the host; `PACKAGE_TOKEN` required, `DEPLOY_WEBHOOK_URL`
optional.

## Build & deploy

```bash
npm install --no-package-lock   # host + extensions from GitHub Packages (needs NPM_TOKEN)
npm run dev
npm run build                   # → dist/  (FRONTEND_TARGET=customer)
```

- **`dev` branch** — auto-built on push to `main` (`dev.yml`), not deployed.
- **`release` branch** — the manual button (`release.yml`): builds, force-pushes `dist/` to
  `release`, pings `DEPLOY_WEBHOOK_URL`. The production host pulls `release`.

## Tests

`npm run test:run` (vitest). This repo has no `src/` — its whole job is one
composition decision, so `test/composition.test.ts` tests that decision against
the **real installed extension manifests**, not fixtures.

- `composeExtensions()` runs over the actual portal set and must not throw. It
  hard-errors on any duplicate extension id, nav id, widget id or route — the FE
  twin of the shared-`phinxlog` rule — but normally only during a full product
  build.
- Every nav entry must target a route some extension or the host actually
  serves, or it is a 404 in the shipped portal.
- **`FRONTEND_TARGET` must stay `customer` on both env vars.** Flipping it to
  `admin` would give the portal the admin auth-hint prefix (`tds_admin_*`), so a
  stale admin hint could reveal the portal shell before `/me` answers. Verified:
  the flip fails the suite.
- **`frontendHost` must keep its `layout` option**, or every extension page
  ships as a bare unstyled fragment with no `<head>`.
- **The portal set stays a strict subset.** Admin-only tooling — website/blog
  CMS, lexware, the contact inbox, tools, customers, time-tracker — must never
  be composed here. Importing one fails the suite.
- Imports, `dependencies` and the array handed to `frontendHost` must agree in
  all three directions.

## Version

Bump `package.json` `version` on any composition/config/doc change, committed with the code.
