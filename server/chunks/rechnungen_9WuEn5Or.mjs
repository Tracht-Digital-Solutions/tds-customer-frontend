import { a as renderComponent, f as renderTemplate, o as Fragment$2, p as maybeRenderHead, q as __exportAll } from "./server_DImolUTM.mjs";
import { t as createComponent } from "./compiler_6xAN3quJ.mjs";
import { k as apiFetch, t as $$Layout, x as Spinner } from "./Layout_FA0S8snJ.mjs";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region node_modules/@tracht-digital-solutions/tds-ext-billing/islands/BillingPortal.tsx
var euros = (cents, currency) => new Intl.NumberFormat("de-DE", {
	style: "currency",
	currency
}).format(cents / 100);
/** `2026-10-07…` → `07.10.2026`, without a time-zone round trip. */
var day = (iso) => iso ? iso.slice(0, 10).split("-").reverse().join(".") : "—";
var STATUS = {
	open: {
		label: "Offen",
		tone: "warning"
	},
	paid: {
		label: "Bezahlt",
		tone: "success"
	},
	void: {
		label: "Storniert",
		tone: "muted"
	},
	uncollectible: {
		label: "Uneinbringlich",
		tone: "danger"
	}
};
/** The date line of a phone card. */
var dueLabel = (inv) => inv.status === "paid" ? inv.paid_at ? `Bezahlt am ${day(inv.paid_at)}` : "Bezahlt" : inv.due_date ? `Fällig am ${day(inv.due_date)}` : `Vom ${day(inv.created_at)}`;
/** Due date in the past and still open. */
var overdue = (inv) => inv.status === "open" && inv.due_date !== null && inv.due_date.slice(0, 10) < (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
function BillingPortal() {
	const [invoices, setInvoices] = useState(null);
	const [error, setError] = useState(null);
	useEffect(() => {
		let alive = true;
		(async () => {
			const res = await apiFetch("/billing/invoices").catch(() => null);
			if (!alive) return;
			if (res === null) setError("Rechnungen konnten nicht geladen werden — die Verbindung ist unterbrochen. Bitte später erneut versuchen.");
			else if (res.status === 403) setError("Ihr Zugang enthält keine Berechtigung für Rechnungen. Ihr Firmen-Administrator kann sie freigeben.");
			else if (!res.ok) setError(`Rechnungen konnten nicht geladen werden (HTTP ${res.status}).`);
			else setInvoices((await res.json()).invoices ?? []);
		})();
		return () => {
			alive = false;
		};
	}, []);
	if (error) return /* @__PURE__ */ jsx("p", {
		className: "tds-alert tds-alert--danger",
		role: "alert",
		children: error
	});
	if (invoices === null) return /* @__PURE__ */ jsxs("p", {
		className: "tds-empty",
		"aria-busy": "true",
		children: [/* @__PURE__ */ jsx(Spinner, {}), " Rechnungen werden geladen …"]
	});
	if (invoices.length === 0) return /* @__PURE__ */ jsx("p", {
		className: "tds-empty",
		children: "Noch keine Rechnungen. Sobald wir Ihnen eine Rechnung stellen, finden Sie sie hier."
	});
	const open = invoices.filter((i) => i.status === "open");
	const openTotal = open.reduce((sum, i) => sum + i.total_cents, 0);
	return /* @__PURE__ */ jsxs("div", {
		className: "tds-stack",
		children: [
			open.length > 0 ? /* @__PURE__ */ jsx("p", {
				className: "tds-alert tds-alert--warning",
				role: "status",
				children: /* @__PURE__ */ jsxs("span", { children: [
					open.length === 1 ? "1 offene Rechnung" : `${open.length} offene Rechnungen`,
					" über",
					" ",
					/* @__PURE__ */ jsx("strong", { children: euros(openTotal, open[0].currency) }),
					"."
				] })
			}) : /* @__PURE__ */ jsx("p", {
				className: "tds-alert tds-alert--success",
				role: "status",
				children: "Alle Rechnungen sind bezahlt."
			}),
			/* @__PURE__ */ jsx("div", {
				className: "sm:hidden",
				children: /* @__PURE__ */ jsx("ul", {
					className: "tds-stack",
					"aria-label": "Rechnungen",
					children: invoices.map((inv) => {
						const s = STATUS[inv.status] ?? {
							label: inv.status,
							tone: "muted"
						};
						const late = overdue(inv);
						return /* @__PURE__ */ jsxs("li", {
							className: "tds-card tds-stack p-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ jsxs("p", {
											className: "font-semibold tabular-nums",
											children: ["#", inv.id]
										}), inv.description ? /* @__PURE__ */ jsx("p", {
											className: "text-sm opacity-70",
											children: inv.description
										}) : null]
									}), /* @__PURE__ */ jsx("span", {
										className: `status-pill status-pill--${late ? "danger" : s.tone}`,
										children: late ? "Überfällig" : s.label
									})]
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "flex items-baseline justify-between gap-3",
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-sm opacity-70",
										children: dueLabel(inv)
									}), /* @__PURE__ */ jsx("strong", {
										className: "tabular-nums",
										children: euros(inv.total_cents, inv.currency)
									})]
								}),
								inv.hosted_invoice_url ? /* @__PURE__ */ jsx("a", {
									className: `${inv.status === "open" ? "btn btn-primary" : "btn btn-ghost"} w-full justify-center`,
									href: inv.hosted_invoice_url,
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": `${inv.status === "open" ? "Rechnung bezahlen" : "Rechnung ansehen"}: #${inv.id} (neuer Tab)`,
									children: inv.status === "open" ? "Bezahlen" : "Ansehen"
								}) : null
							]
						}, inv.id);
					})
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "hidden sm:block overflow-x-auto",
				children: /* @__PURE__ */ jsxs("table", {
					className: "tds-table",
					children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
						/* @__PURE__ */ jsx("th", {
							scope: "col",
							children: "Rechnung"
						}),
						/* @__PURE__ */ jsx("th", {
							scope: "col",
							children: "Datum"
						}),
						/* @__PURE__ */ jsx("th", {
							scope: "col",
							children: "Fällig"
						}),
						/* @__PURE__ */ jsx("th", {
							scope: "col",
							className: "text-right",
							children: "Betrag"
						}),
						/* @__PURE__ */ jsx("th", {
							scope: "col",
							children: "Status"
						}),
						/* @__PURE__ */ jsx("th", {
							scope: "col",
							children: /* @__PURE__ */ jsx("span", {
								className: "sr-only",
								children: "Aktion"
							})
						})
					] }) }), /* @__PURE__ */ jsx("tbody", { children: invoices.map((inv) => {
						const s = STATUS[inv.status] ?? {
							label: inv.status,
							tone: "muted"
						};
						const late = overdue(inv);
						return /* @__PURE__ */ jsxs("tr", { children: [
							/* @__PURE__ */ jsxs("th", {
								scope: "row",
								children: [/* @__PURE__ */ jsxs("span", {
									className: "tabular-nums",
									children: ["#", inv.id]
								}), inv.description ? /* @__PURE__ */ jsx("span", {
									className: "block text-sm opacity-70",
									children: inv.description
								}) : null]
							}),
							/* @__PURE__ */ jsx("td", {
								className: "tabular-nums",
								children: day(inv.created_at)
							}),
							/* @__PURE__ */ jsx("td", {
								className: "tabular-nums",
								children: inv.status === "paid" ? inv.paid_at ? `bezahlt ${day(inv.paid_at)}` : "bezahlt" : day(inv.due_date)
							}),
							/* @__PURE__ */ jsx("td", {
								className: "tabular-nums text-right",
								children: euros(inv.total_cents, inv.currency)
							}),
							/* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("span", {
								className: `status-pill status-pill--${late ? "danger" : s.tone}`,
								children: late ? "Überfällig" : s.label
							}) }),
							/* @__PURE__ */ jsx("td", { children: inv.hosted_invoice_url ? /* @__PURE__ */ jsx("a", {
								className: inv.status === "open" ? "btn btn-primary" : "btn btn-ghost",
								href: inv.hosted_invoice_url,
								target: "_blank",
								rel: "noopener noreferrer",
								"aria-label": `${inv.status === "open" ? "Rechnung bezahlen" : "Rechnung ansehen"}: #${inv.id} (neuer Tab)`,
								children: inv.status === "open" ? "Bezahlen" : "Ansehen"
							}) : null })
						] }, inv.id);
					}) })]
				})
			}),
			/* @__PURE__ */ jsx("p", {
				className: "marginalia",
				children: "Bezahlt wird sicher über Stripe; der Status aktualisiert sich nach Zahlungseingang automatisch."
			})
		]
	});
}
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-ext-billing/pages/Index.astro
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="tds-page"><div class="tds-page__head"><h1 class="tds-page__title">Rechnungen</h1></div>${renderTemplate`${renderComponent($$result, "Fragment", Fragment$2, {}, { "default": ($$result) => renderTemplate`<p class="tds-page__lede">Ihre Rechnungen im Überblick — offene bezahlen Sie direkt online.</p>${renderComponent($$result, "BillingPortal", BillingPortal, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-ext-billing/islands/BillingPortal.tsx",
		"client:component-export": "default"
	})}` })}`}</section>`;
}, "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-ext-billing/pages/Index.astro", void 0);
//#endregion
//#region node_modules/.tds-frontend/routes/rechnungen.astro
var rechnungen_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Rechnungen,
	file: () => $$file,
	url: () => void 0
});
var $$Rechnungen = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Rechnungen" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Page", $$Index, {})}` })}`;
}, "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/.tds-frontend/routes/rechnungen.astro", void 0);
var $$file = "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/.tds-frontend/routes/rechnungen.astro";
//#endregion
//#region \0virtual:astro:page:node_modules/.tds-frontend/routes/rechnungen@_@astro
var page = () => rechnungen_exports;
//#endregion
export { page };
