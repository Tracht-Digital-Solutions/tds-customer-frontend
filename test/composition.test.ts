import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { composeExtensions } from "@tracht-digital-solutions/tds-frontend-contract";
import type { ExtensionManifest } from "@tracht-digital-solutions/tds-frontend-contract";

import supportTickets from "@tracht-digital-solutions/tds-ext-support-tickets";
import billing from "@tracht-digital-solutions/tds-ext-billing";
import messages from "@tracht-digital-solutions/tds-ext-messages";
import projects from "@tracht-digital-solutions/tds-ext-projects";
import documents from "@tracht-digital-solutions/tds-ext-documents";

/**
 * This repo has no source of its own — it makes exactly one decision: which
 * extensions the customer portal composes, and how the host is wired around
 * them. So that is what is tested, against the REAL installed manifests.
 *
 * The failures these catch are all silent at build time:
 *
 *  - a cross-extension id / nav / widget / route collision (the contract
 *    hard-errors, but only during a full product build),
 *  - `frontendHost` losing its `layout` option — the documented "frontend has
 *    no formatting" bug: extension pages then ship as bare fragments with no
 *    `<head>`,
 *  - **the target flipping to `admin`**, which would give the portal the admin
 *    auth-hint prefix and let a stale admin hint reveal it,
 *  - an extension imported but missing from `dependencies`, or from the array
 *    actually handed to `frontendHost`.
 */

const EXTENSIONS: ExtensionManifest[] = [supportTickets, billing, messages, projects, documents];

const config = readFileSync(new URL("../astro.config.mjs", import.meta.url), "utf8");
const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8")) as {
  dependencies: Record<string, string>;
  scripts: Record<string, string>;
};

/** astro.config with comments stripped — it documents these traps in prose. */
const configCode = config
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/(^|[^:])\/\/.*$/gm, "$1");

describe("the extension set composes", () => {
  it("composes without a collision", () => {
    expect(() => composeExtensions(EXTENSIONS)).not.toThrow();
  });

  it("fills every composition slot", () => {
    const composed = composeExtensions(EXTENSIONS);
    for (const slot of ["routes", "nav", "widgets", "permissions", "settings"] as const) {
      expect(composed[slot], `slot ${slot}`).toBeInstanceOf(Array);
    }
    expect(composed.routes.length).toBeGreaterThan(0);
  });

  it("has globally unique extension ids", () => {
    const ids = EXTENSIONS.map((e) => e.id);
    expect(new Set(ids).size, `duplicate among: ${ids.join(", ")}`).toBe(ids.length);
  });

  it("has globally unique route patterns", () => {
    const patterns = composeExtensions(EXTENSIONS).routes.map((r) => r.pattern);
    expect(new Set(patterns).size, `duplicate among: ${patterns.join(", ")}`).toBe(
      patterns.length,
    );
  });

  it("has globally unique nav ids and hrefs", () => {
    const { nav } = composeExtensions(EXTENSIONS);
    const ids = nav.map((n) => n.id);
    const hrefs = nav.map((n) => n.href);
    expect(new Set(ids).size, `duplicate nav id among: ${ids.join(", ")}`).toBe(ids.length);
    expect(new Set(hrefs).size, `duplicate nav href among: ${hrefs.join(", ")}`).toBe(
      hrefs.length,
    );
  });

  it("has globally unique widget ids", () => {
    const ids = composeExtensions(EXTENSIONS).widgets.map((w) => w.id);
    expect(new Set(ids).size, `duplicate among: ${ids.join(", ")}`).toBe(ids.length);
  });

  it("points every nav entry at a composed route", () => {
    // A nav link to a route nobody injected is a 404 in the shipped portal.
    const { nav, routes } = composeExtensions(EXTENSIONS);
    const patterns = new Set(routes.map((r) => r.pattern));
    const BASE = new Set(["/", "/users", "/einstellungen", "/wiki"]);
    for (const entry of nav) {
      const target = entry.href.split("?")[0]!;
      expect(
        patterns.has(target) || BASE.has(target),
        `nav "${entry.id}" links to ${entry.href}, which no extension or base route serves`,
      ).toBe(true);
    }
  });

  it("does not collide with the host's own base routes", () => {
    const BASE = ["/", "/users", "/einstellungen", "/wiki"];
    const patterns = composeExtensions(EXTENSIONS).routes.map((r) => r.pattern);
    for (const base of BASE) {
      expect(patterns, `extension route shadows the base route ${base}`).not.toContain(base);
    }
  });

  it("gives every route an entrypoint in its own package", () => {
    for (const route of composeExtensions(EXTENSIONS).routes) {
      expect(route.entrypoint, `route ${route.pattern}`).toMatch(
        /^@tracht-digital-solutions\/tds-ext-/,
      );
      expect(route.entrypoint.endsWith(".astro")).toBe(true);
    }
  });

  it("provides both languages for every i18n key", () => {
    const { i18n } = composeExtensions(EXTENSIONS);
    expect(Object.keys(i18n.de).sort()).toEqual(Object.keys(i18n.en).sort());
  });
});

describe("host wiring", () => {
  it("passes the shell Layout to frontendHost", () => {
    // Omitting `layout` ships every extension page as a bare unstyled fragment
    // with no <head> — contract 1.4.0 fixed this; the option must stay.
    expect(configCode).toMatch(/frontendHost\(\s*\{[\s\S]*?layout:/);
    expect(configCode).toContain("tds-core-frontend/src/layouts/Layout.astro");
  });

  it("registers the base host alongside the extension host", () => {
    expect(configCode).toContain("coreFrontendBase()");
    expect(configCode).toMatch(/frontendHost\(/);
  });

  it("builds as the CUSTOMER target on both env vars", () => {
    // If this flipped to admin the portal would adopt the admin auth-hint
    // prefix, and a stale admin hint could reveal it before /me answers.
    expect(configCode).toMatch(/process\.env\.FRONTEND_TARGET\s*=\s*"customer"/);
    expect(configCode).toMatch(/process\.env\.PUBLIC_FRONTEND_TARGET\s*=\s*"customer"/);
    expect(configCode).not.toMatch(/=\s*"admin"/);
  });

  it("stays a static build — there is no Node on the production host", () => {
    expect(configCode).toMatch(/output:\s*"static"/);
    expect(configCode).not.toMatch(/output:\s*"server"/);
  });

  it("spreads the shared tdsViteBuild preset", () => {
    expect(configCode).toMatch(/\.\.\.tdsViteBuild/);
    expect(configCode).not.toMatch(/cssTarget\s*:/);
  });

  it("runs Tailwind through PostCSS, never the Vite plugin", () => {
    expect(configCode).not.toMatch(/@tailwindcss\/vite/);
    expect(pkg.dependencies["@tailwindcss/postcss"]).toBeDefined();
    expect(pkg.dependencies["@tailwindcss/vite"]).toBeUndefined();
  });
});

describe("declared vs. composed extensions", () => {
  const importedSpecifiers = [
    ...configCode.matchAll(/from "(@tracht-digital-solutions\/tds-ext-[^"]+)"/g),
  ].map((m) => m[1] as string);

  it("imports every extension it composes", () => {
    expect(importedSpecifiers).toHaveLength(EXTENSIONS.length);
  });

  it("declares every imported extension as a dependency", () => {
    // A missing dependency works locally (hoisted node_modules) and fails the
    // clean CI install.
    for (const spec of importedSpecifiers) {
      expect(pkg.dependencies[spec], `${spec} is imported but not in dependencies`).toBeDefined();
    }
  });

  it("composes every extension it depends on", () => {
    const deps = Object.keys(pkg.dependencies).filter((d) =>
      d.startsWith("@tracht-digital-solutions/tds-ext-"),
    );
    for (const dep of deps) {
      expect(importedSpecifiers, `${dep} is a dependency but never composed`).toContain(dep);
    }
  });

  it("adds every imported extension to the array passed to frontendHost", () => {
    const arrayMatch = /const extensions\s*=\s*\[([^\]]*)\]/.exec(configCode);
    expect(arrayMatch, "no `const extensions = [...]` found").not.toBeNull();
    const names = arrayMatch![1]!.split(",").map((s) => s.trim()).filter(Boolean);
    expect(names).toHaveLength(EXTENSIONS.length);
  });

  it("keeps the portal's extension set a subset of the admin's", () => {
    // The portal is deliberately the smaller surface; admin-only tooling
    // (CMS, lexware, contact inbox, tools) must not leak into it.
    const ADMIN_ONLY = [
      "tds-ext-website-cms",
      "tds-ext-blog-cms",
      "tds-ext-lexware",
      "tds-ext-contact-tickets",
      "tds-ext-tools",
      "tds-ext-customers",
      "tds-ext-time-tracker",
    ];
    for (const name of ADMIN_ONLY) {
      expect(
        importedSpecifiers.some((s) => s.endsWith(name)),
        `${name} is admin-only but composed into the customer portal`,
      ).toBe(false);
    }
  });

  it("pins the host and the contract", () => {
    expect(pkg.dependencies["@tracht-digital-solutions/tds-core-frontend"]).toBeDefined();
    expect(pkg.dependencies["@tracht-digital-solutions/tds-frontend-contract"]).toBeDefined();
  });
});

describe("build commands", () => {
  it("exposes the scripts the release workflow runs", () => {
    for (const script of ["build", "type-check", "test:run"]) {
      expect(pkg.scripts[script], `missing npm script: ${script}`).toBeDefined();
    }
  });
});
