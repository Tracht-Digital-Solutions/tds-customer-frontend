# Build and deployment

## Server-rendered Node application

The build is `output: "server"` with the Node adapter. Tailwind stays on PostCSS,
`tdsViteBuild` stays spread, and `FRONTEND_TARGET` stays on **both** env vars.

Invariants, each failing silently without it (the test suite pins them):

- **`vite.ssr.noExternal` covers `@tracht-digital-solutions/`.** The production host has no
  GitHub Packages token, so a first-party specifier left in the server bundle is
  `ERR_MODULE_NOT_FOUND` at boot. `pack-release.mjs`'s `verify()` fails the build on one.
- **No page cache, ever.** A portal page belongs to one visitor; `tds-shared/cache` refuses a
  response with `Set-Cookie`. Only the public sites use it.
- **`passthroughImageService()`**, because Astro's default image service is sharp, a native addon
  nothing here needs.
- **`public/.htaccess` never gets `Options +FollowSymLinks`.** Plesk's AllowOverride grant omits
  it, and a disallowed option makes Apache answer every request with 500.
- **`tsconfig.json` excludes `release/`**, the generated application with bundled dependencies.

## Branches and workflows

| Branch | Workflow | Result |
|---|---|---|
| `dev` | `dev.yml` on every push to `main` | Build artifact, **not deployed** |
| `release` | `release.yml`, manual button | Builds, force-pushes `release/` to `release`, pings `DEPLOY_WEBHOOK_URL`; production pulls `release` |

- **The deployed branch is an application** (`app.cjs`, `server/`, `client/` as document root, a
  prebuilt `node_modules`). Pushed at a domain configured for static serving, it takes the portal
  down on every path. That is why `release.yml` has no push trigger.
- After a deploy the Node app needs a restart on the host.
- **The vhost SPA fallback (`try_files … /index.html`) must be gone.** Otherwise every unmatched
  path, including mis-resolved relative API calls, answers 200 with dashboard HTML.

## Secrets

- `PACKAGE_TOKEN` (classic PAT, `read:packages` + repo, SSO-authorised) installs packages and
  pushes the deploy branch.
- `DEPLOY_WEBHOOK_URL` is optional.

## Version

The product version in `package.json` is bumped by hand with composition or config changes.
