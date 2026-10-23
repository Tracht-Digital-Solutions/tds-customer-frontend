import { a as renderComponent, et as __exportAll, f as renderTemplate, o as Fragment$2, p as maybeRenderHead } from "./server_Cdzh4AE6.mjs";
import { n as createComponent } from "./compiler_CX02AaCz.mjs";
import { B as toast, C as Spinner, K as formatIsoDay, M as describeFailureFrom, N as sendJson, U as formatCents, k as apiFetch, t as $$Layout } from "./Layout_B15-S-Qp.mjs";
import { t as Alert } from "./chunk-S5MXGWAS_x1E9P-4b.mjs";
import { t as copyText } from "./chunk-2NLUY6RS_DPKKyizg.mjs";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
// node_modules/@tracht-digital-solutions/tds-ext-referrals/islands/format.ts
/** Shared formatting and wire types for the Empfehlungen islands. */
var euros = (cents) => formatCents(cents);
/** `2026-10-07…` → `07.10.2026`, without a time-zone round trip. */
var day = (iso) => formatIsoDay(iso);
var percent = (value) => value === null ? "—" : `${new Intl.NumberFormat("de-DE", { maximumFractionDigits: 2 }).format(value)} %`;
/** Explicit map — never interpolate a chip class (Tailwind cannot extract it). */
var STATUS = {
	claimed: {
		label: "Genannt",
		chip: "chip chip--info"
	},
	pending: {
		label: "Wartet",
		chip: "chip chip--warning"
	},
	approved: {
		label: "Fällig",
		chip: "chip chip--success"
	},
	paid: {
		label: "Ausgezahlt",
		chip: "chip chip--neutral"
	},
	rejected: {
		label: "Abgelehnt",
		chip: "chip chip--danger"
	},
	reversed: {
		label: "Storniert",
		chip: "chip chip--danger"
	}
};
var statusOf = (s) => STATUS[s] ?? {
	label: s,
	chip: "chip chip--neutral"
};
var VIA = {
	link: "Empfehlungslink",
	code: "Code an der Kasse",
	named: "Vom Kunden genannt",
	manual: "Von Hand erfasst"
};
var TAX = {
	private: "Privatperson",
	small_business: "Kleinunternehmer (§ 19 UStG)",
	vat: "Umsatzsteuerpflichtig"
};
/** The wait line a partner or operator reads next to a pending commission. */
var waitLabel = (c) => {
	if (c.status !== "pending") return null;
	if (!c.source_paid) return "Wartet auf Zahlung des Auftrags";
	return c.approve_after ? `Fällig ab ${day(c.approve_after)}` : "Wartet";
};
/** The API's `{error}` text, or the status (tds-shared `describeFailureFrom`). */
var errorText = (res, fallback) => describeFailureFrom(res, fallback);
// node_modules/@tracht-digital-solutions/tds-ext-referrals/islands/ReferralsPortal.tsx
/**
* The partner's own view in the customer portal: their link and code, what
* they brought in, what is due, and where the money goes. Bound to the
* signed-in user (`GET /referrals/me`), never to the active company.
*/
function ReferralsPortal() {
	const [me, setMe] = useState(null);
	const [error, setError] = useState(null);
	const load = async () => {
		const res = await apiFetch("/referrals/me").catch(() => null);
		if (res === null) setError("Die Übersicht konnte nicht geladen werden — die Verbindung ist unterbrochen. Bitte später erneut versuchen.");
		else if (res.status === 404) setError("Ihr Zugang ist noch keinem Partnerkonto zugeordnet. Bitte melden Sie sich bei uns, dann schalten wir es frei.");
		else if (res.status === 403) setError("Ihr Zugang enthält keine Berechtigung für das Empfehlungsprogramm.");
		else if (!res.ok) setError(await errorText(res, "Die Übersicht konnte nicht geladen werden"));
		else {
			setError(null);
			setMe(await res.json());
		}
	};
	useEffect(() => {
		load();
	}, []);
	if (error) return /* @__PURE__ */ jsx(Alert, { children: error });
	if (me === null) return /* @__PURE__ */ jsxs("p", {
		className: "tds-empty",
		"aria-busy": "true",
		children: [/* @__PURE__ */ jsx(Spinner, {}), " Wird geladen …"]
	});
	const { partner, commissions, totals, settings } = me;
	return /* @__PURE__ */ jsxs("div", {
		className: "tds-stack tds-stack--loose",
		children: [
			partner.status === "paused" ? /* @__PURE__ */ jsx(Alert, {
				tone: "warning",
				children: "Ihr Partnerkonto ist pausiert. Neue Empfehlungen werden gerade nicht gezählt."
			}) : null,
			/* @__PURE__ */ jsx(ShareCard, {
				partner,
				settings
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "tds-row",
				children: [
					/* @__PURE__ */ jsx(Figure, {
						label: "Wartet",
						value: euros(totals.pending),
						hint: `Fällig ${settings.hold_days} Tage nach Zahlung`
					}),
					/* @__PURE__ */ jsx(Figure, {
						label: "Fällig",
						value: euros(totals.approved),
						hint: "Kommt mit der nächsten Auszahlung"
					}),
					/* @__PURE__ */ jsx(Figure, {
						label: "Ausgezahlt",
						value: euros(totals.paid),
						hint: `${me.payouts.length} Auszahlung${me.payouts.length === 1 ? "" : "en"}`
					})
				]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "tds-stack",
				"aria-labelledby": "ref-list",
				children: [/* @__PURE__ */ jsx("h2", {
					id: "ref-list",
					className: "text-lg font-semibold",
					children: "Ihre Vermittlungen"
				}), commissions.length === 0 ? /* @__PURE__ */ jsx("p", {
					className: "tds-empty",
					children: "Noch keine Vermittlungen. Sobald jemand über Ihren Link oder Code bestellt, erscheint es hier."
				}) : /* @__PURE__ */ jsx("ul", {
					className: "tds-list",
					"aria-label": "Vermittlungen",
					children: commissions.map((c) => {
						const s = statusOf(c.status);
						return /* @__PURE__ */ jsxs("li", {
							className: "tds-list__row",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ jsx("p", {
									className: "font-semibold",
									children: c.description ?? "Auftrag"
								}), /* @__PURE__ */ jsxs("p", {
									className: "marginalia",
									children: [
										day(c.created_at),
										" · ",
										VIA[c.via] ?? c.via,
										waitLabel(c) ? ` · ${waitLabel(c)}` : ""
									]
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "tds-row",
								children: [/* @__PURE__ */ jsx("span", {
									className: s.chip,
									children: s.label
								}), /* @__PURE__ */ jsx("strong", {
									className: "tabular-nums",
									children: euros(c.commission_cents)
								})]
							})]
						}, c.id);
					})
				})]
			}),
			/* @__PURE__ */ jsx(PayoutDetails, {
				partner,
				onSaved: (p) => setMe({
					...me,
					partner: p
				})
			}),
			settings.terms_url ? /* @__PURE__ */ jsxs("p", {
				className: "marginalia",
				children: [
					"Es gelten unsere",
					" ",
					/* @__PURE__ */ jsx("a", {
						href: settings.terms_url,
						target: "_blank",
						rel: "noopener noreferrer",
						children: "Partnerbedingungen"
					}),
					"."
				]
			}) : null
		]
	});
}
function Figure({ label, value, hint }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "tds-card p-4 tds-stack tds-stack--tight",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "marginalia",
				children: label
			}),
			/* @__PURE__ */ jsx("strong", {
				className: "text-2xl tabular-nums",
				children: value
			}),
			/* @__PURE__ */ jsx("span", {
				className: "marginalia",
				children: hint
			})
		]
	});
}
function ShareCard({ partner, settings }) {
	const copy = async (text, what) => {
		if (await copyText(text)) toast.success(`${what} kopiert.`);
		else toast.danger(`${what} konnte nicht kopiert werden. Bitte markieren und von Hand kopieren.`);
	};
	return /* @__PURE__ */ jsxs("section", {
		className: "tds-card p-4 tds-stack",
		"aria-labelledby": "ref-share",
		children: [
			/* @__PURE__ */ jsx("h2", {
				id: "ref-share",
				className: "text-lg font-semibold",
				children: "Ihr Empfehlungslink"
			}),
			/* @__PURE__ */ jsxs("p", { children: [
				"Sie erhalten ",
				/* @__PURE__ */ jsx("strong", { children: percent(partner.rate_percent) }),
				" vom Nettobetrag jedes bezahlten Auftrags, den Sie vermitteln. Ein Link gilt ",
				settings.link_days,
				" Tage."
			] }),
			/* @__PURE__ */ jsxs("label", {
				className: "tds-field-row",
				children: [/* @__PURE__ */ jsx("span", { children: "Link" }), /* @__PURE__ */ jsx("input", {
					className: "field-boxed",
					type: "text",
					readOnly: true,
					value: partner.link,
					onFocus: (e) => e.currentTarget.select()
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "tds-toolbar",
				children: [/* @__PURE__ */ jsx("button", {
					type: "button",
					className: "btn btn-primary",
					onClick: () => void copy(partner.link, "Link"),
					children: "Link kopieren"
				}), /* @__PURE__ */ jsxs("button", {
					type: "button",
					className: "btn btn-ghost",
					onClick: () => void copy(partner.code, "Code"),
					children: [
						"Code ",
						partner.code,
						" kopieren"
					]
				})]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "marginalia",
				children: "Ohne Link geht es auch: An der Kasse gibt man Ihren Code ein. Für Aufträge außerhalb des Shops reicht es, wenn der Kunde Ihren Namen nennt."
			})
		]
	});
}
function PayoutDetails({ partner, onSaved }) {
	const [name, setName] = useState(partner.payout_name ?? "");
	const [iban, setIban] = useState("");
	const [tax, setTax] = useState(partner.tax_status ?? "");
	const [vatId, setVatId] = useState(partner.vat_id ?? "");
	const [busy, setBusy] = useState(false);
	const [problem, setProblem] = useState(null);
	const save = async () => {
		setBusy(true);
		setProblem(null);
		const res = await sendJson("/referrals/me/payout-details", "PUT", {
			payout_name: name,
			iban,
			tax_status: tax,
			vat_id: vatId
		}).catch(() => null);
		setBusy(false);
		if (res === null) {
			toast.danger("Speichern fehlgeschlagen — die API ist nicht erreichbar.");
			return;
		}
		if (!res.ok) {
			setProblem(await errorText(res, "Speichern fehlgeschlagen"));
			return;
		}
		setIban("");
		onSaved(await res.json());
		toast.success("Auszahlungsdaten gespeichert.");
	};
	return /* @__PURE__ */ jsxs("section", {
		className: "tds-card p-4 tds-stack",
		"aria-labelledby": "ref-payout",
		children: [
			/* @__PURE__ */ jsx("h2", {
				id: "ref-payout",
				className: "text-lg font-semibold",
				children: "Auszahlung"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "marginalia",
				children: "Wir überweisen fällige Provisionen und schicken Ihnen eine Abrechnung."
			}),
			/* @__PURE__ */ jsxs("label", {
				className: "tds-field-row",
				children: [/* @__PURE__ */ jsx("span", { children: "Kontoinhaber" }), /* @__PURE__ */ jsx("input", {
					className: "field-boxed",
					type: "text",
					value: name,
					onChange: (e) => setName(e.target.value),
					autoComplete: "name"
				})]
			}),
			/* @__PURE__ */ jsxs("label", {
				className: "tds-field-row",
				children: [/* @__PURE__ */ jsxs("span", { children: ["IBAN ", /* @__PURE__ */ jsxs("em", {
					className: "marginalia",
					children: [
						"(",
						partner.iban_masked ? `hinterlegt: ${partner.iban_masked}` : "noch keine",
						")"
					]
				})] }), /* @__PURE__ */ jsx("input", {
					className: "field-boxed",
					type: "text",
					value: iban,
					onChange: (e) => setIban(e.target.value),
					placeholder: partner.iban_masked ? "leer = behalten" : "DE…",
					autoComplete: "off",
					inputMode: "text"
				})]
			}),
			/* @__PURE__ */ jsxs("label", {
				className: "tds-field-row",
				children: [/* @__PURE__ */ jsx("span", { children: "Steuerstatus" }), /* @__PURE__ */ jsxs("select", {
					className: "field-boxed",
					value: tax,
					onChange: (e) => setTax(e.target.value),
					children: [/* @__PURE__ */ jsx("option", {
						value: "",
						children: "Bitte wählen"
					}), Object.keys(TAX).map((k) => /* @__PURE__ */ jsx("option", {
						value: k,
						children: TAX[k]
					}, k))]
				})]
			}),
			tax === "vat" ? /* @__PURE__ */ jsxs("label", {
				className: "tds-field-row",
				children: [/* @__PURE__ */ jsx("span", { children: "USt-IdNr." }), /* @__PURE__ */ jsx("input", {
					className: "field-boxed",
					type: "text",
					value: vatId,
					onChange: (e) => setVatId(e.target.value)
				})]
			}) : null,
			/* @__PURE__ */ jsx(Alert, { children: problem }),
			/* @__PURE__ */ jsx("div", {
				className: "tds-toolbar",
				children: /* @__PURE__ */ jsx("button", {
					type: "button",
					className: "btn btn-primary",
					onClick: () => void save(),
					disabled: busy,
					"aria-busy": busy,
					children: "Speichern"
				})
			})
		]
	});
}
// node_modules/@tracht-digital-solutions/tds-ext-referrals/pages/Index.astro
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="tds-page"><div class="tds-page__head"><h1 class="tds-page__title">${"Weiterempfehlen"}</h1></div>${renderTemplate`${renderComponent($$result, "Fragment", Fragment$2, {}, { "default": ($$result) => renderTemplate`<p class="tds-page__lede">Empfehlen Sie uns weiter. Für jeden bezahlten Auftrag, den Sie vermitteln, erhalten Sie eine Provision.</p>${renderComponent($$result, "ReferralsPortal", ReferralsPortal, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-ext-referrals/islands/ReferralsPortal.tsx",
		"client:component-export": "default"
	})}` })}`}</section>`;
}, "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-ext-referrals/pages/Index.astro", void 0);
// node_modules/.tds-frontend/routes/empfehlungen.astro
var empfehlungen_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Empfehlungen,
	file: () => $$file,
	url: () => void 0
});
var $$Empfehlungen = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Empfehlungen" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Page", $$Index, {})}` })}`;
}, "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/.tds-frontend/routes/empfehlungen.astro", void 0);
var $$file = "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/.tds-frontend/routes/empfehlungen.astro";
// \0virtual:astro:page:node_modules/.tds-frontend/routes/empfehlungen@_@astro
var page = () => empfehlungen_exports;
export { page };
