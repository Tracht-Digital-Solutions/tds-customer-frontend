# Testing

`npm run test:run` runs vitest. There is no `src/`; `test/composition.test.ts` tests the
composition against the **real installed extension manifests**, not fixtures.

| Assertion | Why |
|---|---|
| `composeExtensions()` over the actual portal set doesn't throw | It fails hard on duplicate ids or routes, normally only in a full product build |
| Every nav entry targets a served route | Otherwise it's a 404 in the shipped portal |
| `FRONTEND_TARGET` is `customer` on both env vars | `admin` would use the `tds_admin_*` hint prefix, so a stale admin hint could reveal the portal shell |
| `frontendHost` keeps its `layout` option | Without it every extension page ships as a bare fragment |
| The set is a strict subset (allowlist) | Importing admin-only tooling fails the suite |
| Imports, `dependencies` and the `extensions` array agree in all three directions | Missing pieces fail only the clean CI install or silently drop a feature |
| SSR invariants (`noExternal`, no page cache, passthrough images, `.htaccess`) | See [deployment.md](deployment.md) |
