import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import { frontendHost } from "@tracht-digital-solutions/tds-frontend-contract/astro";
import { coreFrontendBase } from "@tracht-digital-solutions/tds-core-frontend/astro";
import { tdsViteBuild } from "@tracht-digital-solutions/tds-shared/astro";

// The customer-portal extension set — customer-facing only. coreFrontendBase injects
// the shared base routes; frontendHost injects each extension's route + virtuals.
import supportTickets from "@tracht-digital-solutions/tds-ext-support-tickets";
import billing from "@tracht-digital-solutions/tds-ext-billing";

const extensions = [supportTickets, billing];

// This product builds as the CUSTOMER target (shell auth-hint key + brand).
process.env.FRONTEND_TARGET = "customer";
process.env.PUBLIC_FRONTEND_TARGET = "customer";
// Login is the central site (auth.tracht-digital.de) — the host bounces there.
// The host defaults PUBLIC_LOGIN_URL; set it in the build env to override (e.g.
// the local tds-auth dev server).

export default defineConfig({
  output: "static",
  integrations: [
    react(),
    coreFrontendBase(),
    // Pass the host shell Layout so every extension route renders inside the
    // full panel chrome (head/CSS/nav), not as a bare unstyled fragment.
    frontendHost({
      extensions,
      layout: "@tracht-digital-solutions/tds-core-frontend/src/layouts/Layout.astro",
    }),
  ],
  trailingSlash: "ignore",
  build: { format: "directory" },
  vite: { build: { ...tdsViteBuild } },
});
