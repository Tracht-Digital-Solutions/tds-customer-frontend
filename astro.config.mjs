import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import { panelHost } from "@tracht-digital-solutions/tds-panel-contract/astro";
import { corePanelBase } from "@tracht-digital-solutions/tds-core-panel-frontend/astro";
import { tdsViteBuild } from "@tracht-digital-solutions/tds-shared/astro";

// The customer-portal extension set — customer-facing only. corePanelBase injects
// the shared base routes; panelHost injects each extension's route + virtuals.
import supportTickets from "@tracht-digital-solutions/tds-ext-support-tickets";

const extensions = [supportTickets];

// This product builds as the CUSTOMER target (shell auth-hint key + brand).
process.env.PANEL_TARGET = "customer";
process.env.PUBLIC_PANEL_TARGET = "customer";

export default defineConfig({
  output: "static",
  integrations: [react(), corePanelBase(), panelHost({ extensions })],
  trailingSlash: "ignore",
  build: { format: "directory" },
  vite: { build: { ...tdsViteBuild } },
});
