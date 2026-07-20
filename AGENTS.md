# Agent notes — tds-customer-panel

The **customer portal product** (`app.tracht-digital.de`). A standalone Astro app that
composes the shared core panel **host** (`@tracht-digital-solutions/tds-core-panel-frontend`)
with the **customer-facing extension set**, at build time, into one static `dist/`. This
repo owns only the composition + deploy pipeline — the shell, base pages, and features live
in published packages.

> Read the root `C:\Projects\TDS-LP\CLAUDE.md` for the big picture and shared gotchas, and
> `MIGRATION-STATUS.md` for how this product (partially) replaces the legacy `tds-customer`.

## Mental model

- **Assembled at build time from GitHub Packages** — no app source beyond `astro.config.mjs`
  + config:
  - `corePanelBase()` (host package) injects the base pages + shell + pre-paint auth gate.
  - `panelHost({ extensions })` injects each extension's route + virtual modules.
  - `PANEL_TARGET=customer` selects the customer auth-hint prefix (`tds_customer_*`) + brand
    ("Portal").
- **Extension set:** currently just `support-tickets` (customer-facing subset). Projects,
  invoices (`billing`), documents and messages get added here as those extensions ship — see
  `MIGRATION-STATUS.md` for what's still owned by the legacy `tds-customer(-api)`.
- **Cross-panel SSO:** the session cookie is `Domain=.tracht-digital.de`, so a principal with
  access is signed into this portal *and* the admin panel by one login. The per-target hint
  key prefix keeps a stale admin hint from revealing the portal.
- **To change the shell or a base page, edit the *host* package and release it, then repin
  here.** Never fork base UI into this repo.

## Gotchas

Same as `tds-admin-panel`: `npm install --no-package-lock`; extensions pinned `^0.1.x`;
Tailwind `@source` scan lives in the host; `PACKAGE_TOKEN` required, `DEPLOY_WEBHOOK_URL`
optional.

## Build & deploy

```bash
npm install --no-package-lock   # host + extensions from GitHub Packages (needs NPM_TOKEN)
npm run dev
npm run build                   # → dist/  (PANEL_TARGET=customer)
```

- **`dev` branch** — auto-built on push to `main` (`dev.yml`), not deployed.
- **`release` branch** — the manual button (`release.yml`): builds, force-pushes `dist/` to
  `release`, pings `DEPLOY_WEBHOOK_URL`. The production host pulls `release`.

## Version

Bump `package.json` `version` on any composition/config/doc change, committed with the code.
