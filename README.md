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
- The host keeps the shell mounted across internal navigation, prefetches likely
  destinations and preserves the selected theme + drawer state. Cached data can
  remain visible while it refreshes instead of blanking the page.
- The extension set is the customer-facing subset: support tickets, billing,
  projects, documents and messages.

To change the shell/base pages: edit the **host** package and release it, then
repin here.

## Bind it to an API

Three values decide which API this product talks to. All three have a
production default, so a production build sets **nothing**.

| Variable | Default | What it is |
|---|---|---|
| `PUBLIC_API_BASE` | `https://api.tracht-digital.de` | Gateway origin, **no** path. Every extension call resolves against it. |
| `PUBLIC_AUTH_API_URL` | `https://api.tracht-digital.de/auth` | `tds-auth-api`, **with** the gateway's `/auth` prefix. Session check (`GET /me`) and renewal (`POST /refresh`). |
| `PUBLIC_LOGIN_URL` | `https://auth.tracht-digital.de` | The central login site. Logged-out visitors land there with `?next=<absolute return URL>`. |

Template: `.env.example` → `.env` (gitignored). For a local stack:

```ini
PUBLIC_API_BASE=http://localhost:8080
PUBLIC_AUTH_API_URL=http://localhost:8080/auth
PUBLIC_LOGIN_URL=http://localhost:4326
```

### Build time, not run time

**These values are compiled into the bundle.** Pointing a deployed portal at a
different API means building and deploying again; there is no switch on the
host.

That is deliberate, and it is the opposite of what the public sites do — they
pair with an API at run time through `/install`. `PUBLIC_API_BASE` is rendered
as `<meta name="tds-api-base">` by the host shell
(`tds-core-frontend-pkg/src/layouts/Layout.astro`), and `runtimeConfig()` in
`tds-shared/api` **gives up as soon as that meta tag is present**, so a panel
never fetches `tds-runtime.json`. Without that brake every single navigation
would fire a guaranteed 404 for a file only the public sites have.

### The check that actually matters

A wrong `PUBLIC_API_BASE` does not break the portal — it empties it, quietly.
So after deploying, look at the browser's network panel once:

- does `/me` go to the **absolute** API origin rather than relative to the
  portal's own host?
- does it answer `200` with `Access-Control-Allow-Origin: <this portal's
  origin>` and `Access-Control-Allow-Credentials: true`?

Without that CORS header the browser discards the response **before any code
sees it**. There is no server-side error, nothing in any log, and the UI shows
precisely what it shows when there is genuinely no data. The origin has to be
listed in the backends' `CORS_ALLOWED_ORIGINS` or added in the admin panel
under *Einstellungen → CORS*; the two layers are unioned, not overridden.

## Develop

```bash
npm install --no-package-lock   # host + extensions from GitHub Packages (needs NPM_TOKEN)
npm run dev
npm run type-check              # release/ is excluded: it is generated output
npm run build                   # → dist/, then postbuild packs release/
cd release && node app.cjs      # run the deployable tree exactly as the host does
```

## Deploy

The portal is server-rendered (`@astrojs/node`, standalone, under Plesk's
Passenger) since 2026-08-25, so **the deployed branch is an application, not a
folder of files**: `app.cjs`, `server/`, `client/` (the document root), a
prebuilt `node_modules/` and `tmp/`. `scripts/pack-release.mjs` from tds-shared
assembles it as a `postbuild` and refuses to produce a tree that could not start.

- **`dev` branch** — auto-built on every push to `main` (`dev.yml`), not deployed.
- **`release` branch** — the manual button (`release.yml`): builds, force-pushes
  `release/` to `release`, pings `DEPLOY_WEBHOOK_URL`. The production host pulls
  `release`.

Host setup is in `tds-gateway-api/DEPLOY-PLESK.md` §3.2. Three things it is easy
to get wrong, each of which fails quietly:

- **Document Root must end in `/client`.** Pointed at the application root,
  `server/entry.mjs` and `node_modules/` become web-fetchable.
- **The startup file must be `app.cjs`.** Everything here is `"type": "module"`,
  so a `.js` file is ESM and Passenger's `require()` dies with `ERR_REQUIRE_ESM`
  — visible only in the app log.
- **A deploy must restart the app** (`mkdir -p tmp && touch tmp/restart.txt` as
  the deployment action). Astro code-splits its server routes into
  content-hashed chunks loaded on first request; replacing the tree under a live
  process 500s every route that was not already loaded.

There is deliberately **no page cache** here, unlike the three public sites: a
portal page belongs to one visitor.

Secrets: `PACKAGE_TOKEN` (install + push branch), `DEPLOY_WEBHOOK_URL` (optional).
