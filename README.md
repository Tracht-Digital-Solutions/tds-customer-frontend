# tds-customer-frontend

The **customer portal** product (`app.tracht-digital.de`). A standalone Astro app
that composes the shared **core frontend host**
(`@tracht-digital-solutions/tds-core-frontend`) with the **customer-facing
extension set**. Deployed from this repo's own `dev` / `release` branches.

## How it works

Assembled at build time from published packages — this repo owns only the
composition + deploy pipeline:

- `astro.config.mjs`:
  - `coreFrontendBase()` (host package) injects the shared base routes + shell/auth
    gate; `frontendHost({ extensions })` injects each extension's route + virtuals.
  - `FRONTEND_TARGET = customer` selects the customer auth-hint key (`tds_customer_*`)
    + brand ("Portal"). The session cookie is shared
    (`Domain=.tracht-digital.de`), so a principal with access is SSO'd across the
    admin frontend + this portal.
- The extension set: currently `support-tickets` (customer-facing only). Add the
  billing / projects / documents / messages extensions here as they ship.

To change the shell/base pages: edit the **host** package and release it, then
repin here.

## Develop

```bash
npm install --no-package-lock   # host + extensions from GitHub Packages (needs NPM_TOKEN)
npm run dev
npm run build                   # → dist/  (the deployed artifact)
```

## Deploy

- **`dev` branch** — auto-built on every push to `main` (`dev.yml`), not deployed.
- **`release` branch** — the manual button (`release.yml`): builds, force-pushes
  `dist/` to `release`, pings `DEPLOY_WEBHOOK_URL`. The production host pulls
  `release`.

Secrets: `PACKAGE_TOKEN` (install + push branch), `DEPLOY_WEBHOOK_URL` (optional).
