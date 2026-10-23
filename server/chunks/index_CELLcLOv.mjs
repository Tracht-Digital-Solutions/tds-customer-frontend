import { $ as _coercedDate, G as array, J as literal, K as boolean, Q as union, U as ZodDate, W as _enum, X as object, Y as number, Z as string, a as renderComponent, et as __exportAll, f as renderTemplate, h as addAttribute, p as maybeRenderHead, q as discriminatedUnion } from "./server_Cdzh4AE6.mjs";
import { n as createComponent } from "./compiler_CX02AaCz.mjs";
import { B as toast, S as SkeletonText, T as SummaryMetric, b as ProductCard, h as $$Icon, k as apiFetch, n as hueForKey, q as renderScript, r as widgetIcon, t as $$Layout, x as Skeleton } from "./Layout_B15-S-Qp.mjs";
import { t as Alert } from "./chunk-S5MXGWAS_x1E9P-4b.mjs";
import { n as PORTAL_PERMISSIONS, t as PERMISSION_KEY_PATTERN } from "./chunk-N6TATNUU_BMwXaq9u.mjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
// node_modules/zod/v4/classic/coerce.js
function date(params) {
	return _coercedDate(ZodDate, params);
}
// node_modules/@tracht-digital-solutions/tds-ext-projects/islands/WidgetBody.tsx
/** "Aktive Projekte" widget body — the active-project count from `/projects/summary`. */
function ActiveProjectsCount() {
	return /* @__PURE__ */ jsx(SummaryMetric, {
		endpoint: "/projects/summary",
		value: (d) => Number(d.active ?? 0)
	});
}
// node_modules/@tracht-digital-solutions/tds-ext-projects/widgets/Widget.astro
var $$Widget$5 = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<article class="tds-widget"><h3 class="tds-widget__title">Aktive Projekte</h3>${renderComponent($$result, "ActiveProjectsCount", ActiveProjectsCount, {
		"client:visible": true,
		"client:component-hydration": "visible",
		"client:component-path": "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-ext-projects/islands/WidgetBody.tsx",
		"client:component-export": "default"
	})}</article>`;
}, "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-ext-projects/widgets/Widget.astro", void 0);
// node_modules/@tracht-digital-solutions/tds-ext-support-tickets/islands/WidgetBody.tsx
/** "Offene Tickets" widget body — the open-ticket count from `/tickets/summary`. */
function OpenTicketsCount() {
	return /* @__PURE__ */ jsx(SummaryMetric, {
		endpoint: "/tickets/summary",
		value: (d) => Number(d.open ?? 0)
	});
}
// node_modules/@tracht-digital-solutions/tds-ext-support-tickets/widgets/Widget.astro
var $$Widget$4 = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<article class="tds-widget"><h3 class="tds-widget__title">Offene Tickets</h3>${renderComponent($$result, "OpenTicketsCount", OpenTicketsCount, {
		"client:visible": true,
		"client:component-hydration": "visible",
		"client:component-path": "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-ext-support-tickets/islands/WidgetBody.tsx",
		"client:component-export": "default"
	})}</article>`;
}, "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-ext-support-tickets/widgets/Widget.astro", void 0);
// node_modules/@tracht-digital-solutions/tds-ext-billing/islands/WidgetBody.tsx
/** Billing widget body — the open-invoice count from `/billing/summary`. */
function WidgetBody$1() {
	return /* @__PURE__ */ jsx(SummaryMetric, {
		endpoint: "/billing/summary",
		value: (d) => d.open,
		caption: (d) => d.configured === false ? "Stripe nicht konfiguriert" : d.open === 1 ? "offene Rechnung" : "offene Rechnungen",
		children: (d) => /* @__PURE__ */ jsx("a", {
			className: "link-underline text-sm inline-flex items-center min-h-11 self-start",
			href: "/rechnungen",
			children: d.open > 0 ? "Jetzt ansehen und bezahlen" : "Alle Rechnungen"
		})
	});
}
// node_modules/@tracht-digital-solutions/tds-ext-billing/widgets/Widget.astro
var $$Widget$3 = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<article class="tds-widget"><h3 class="tds-widget__title">Offene Rechnungen</h3>${renderComponent($$result, "WidgetBody", WidgetBody$1, {
		"client:visible": true,
		"client:component-hydration": "visible",
		"client:component-path": "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-ext-billing/islands/WidgetBody.tsx",
		"client:component-export": "default"
	})}</article>`;
}, "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-ext-billing/widgets/Widget.astro", void 0);
// node_modules/@tracht-digital-solutions/tds-ext-messages/islands/WidgetBody.tsx
/** "Neue Nachrichten" widget body — the unread count from `/messages/summary`. */
function UnreadMessagesCount() {
	return /* @__PURE__ */ jsx(SummaryMetric, {
		endpoint: "/messages/summary",
		value: (d) => Number(d.unread ?? 0)
	});
}
// node_modules/@tracht-digital-solutions/tds-ext-messages/widgets/Widget.astro
var $$Widget$2 = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<article class="tds-widget"><h3 class="tds-widget__title">Neue Nachrichten</h3>${renderComponent($$result, "UnreadMessagesCount", UnreadMessagesCount, {
		"client:visible": true,
		"client:component-hydration": "visible",
		"client:component-path": "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-ext-messages/islands/WidgetBody.tsx",
		"client:component-export": "default"
	})}</article>`;
}, "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-ext-messages/widgets/Widget.astro", void 0);
// node_modules/@tracht-digital-solutions/tds-ext-documents/islands/WidgetBody.tsx
/** "Dokumente" widget body — the document count from `/documents/summary`. */
function DocumentCount() {
	return /* @__PURE__ */ jsx(SummaryMetric, { endpoint: "/documents/summary" });
}
// node_modules/@tracht-digital-solutions/tds-ext-documents/widgets/Widget.astro
var $$Widget$1 = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<article class="tds-widget"><h3 class="tds-widget__title">Dokumente</h3>${renderComponent($$result, "DocumentCount", DocumentCount, {
		"client:visible": true,
		"client:component-hydration": "visible",
		"client:component-path": "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-ext-documents/islands/WidgetBody.tsx",
		"client:component-export": "default"
	})}</article>`;
}, "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-ext-documents/widgets/Widget.astro", void 0);
// node_modules/@tracht-digital-solutions/tds-ext-shop/islands/WidgetBody.tsx
/**
* Shop widget body. Leads with the published count; the two numbers under it
* are the ones that need work (no own text yet, stale prices). A failure reads
* `—` — a zero would be a number the reader has no reason to doubt.
*/
function WidgetBody() {
	return /* @__PURE__ */ jsx(SummaryMetric, {
		endpoint: "/shop/summary",
		value: (d) => d.published,
		children: (d) => /* @__PURE__ */ jsxs("ul", {
			className: "tds-list",
			children: [/* @__PURE__ */ jsxs("li", {
				className: "tds-list__row",
				children: [/* @__PURE__ */ jsx("span", { children: "Ohne eigenen Text" }), /* @__PURE__ */ jsx("span", { children: d.unwritten })]
			}), /* @__PURE__ */ jsxs("li", {
				className: "tds-list__row",
				children: [/* @__PURE__ */ jsx("span", { children: "Preise veraltet" }), /* @__PURE__ */ jsx("span", { children: d.stalePrices })]
			})]
		})
	});
}
// node_modules/@tracht-digital-solutions/tds-ext-shop/widgets/Widget.astro
var $$Widget = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<article class="tds-widget"><h3 class="tds-widget__title">TDShop</h3>${renderComponent($$result, "WidgetBody", WidgetBody, {
		"client:visible": true,
		"client:component-hydration": "visible",
		"client:component-path": "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-ext-shop/islands/WidgetBody.tsx",
		"client:component-export": "default"
	})}</article>`;
}, "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-ext-shop/widgets/Widget.astro", void 0);
// node_modules/@tracht-digital-solutions/tds-ext-shop/islands/SyncBody.tsx
/**
* The offer-sync widget.
*
* It exists for one state that has no other symptom: **Amazon has withdrawn
* API access.** That happens when qualifying sales stop, and nothing about it
* looks broken — the shop keeps working, the links keep working, prices simply
* stop appearing as each quote passes its 24-hour life. Without this widget
* the first sign would be someone noticing, weeks later, that the catalogue
* has no prices.
*
* So a revoked queue is rendered as a persistent in-flow alert, not a toast: a
* toast disappears while it is being read, and this is a standing condition
* somebody has to act on.
*/
function SyncBody() {
	const [status, setStatus] = useState(null);
	const [failed, setFailed] = useState(false);
	const [busy, setBusy] = useState(false);
	const load = useCallback(async () => {
		try {
			const res = await apiFetch("/shop/sync/status");
			if (!res.ok) throw new Error(String(res.status));
			setStatus(await res.json());
			setFailed(false);
		} catch {
			setFailed(true);
		}
	}, []);
	useEffect(() => {
		load();
	}, [load]);
	const run = async () => {
		setBusy(true);
		try {
			const res = await apiFetch("/shop/sync/enqueue", { method: "POST" });
			if (!res.ok) throw new Error(String(res.status));
			const result = await res.json();
			if (result.stopped === "revoked") toast.danger("Amazon lehnt den Zugang weiterhin ab — Zugangsdaten und Partnerprogramm prüfen.");
			else toast.success(`${result.ok} Angebote aktualisiert, ${result.failed} fehlgeschlagen.`);
			await load();
		} catch (err) {
			toast.danger(`Abgleich fehlgeschlagen (${err instanceof Error ? err.message : "unbekannt"}).`);
		} finally {
			setBusy(false);
		}
	};
	if (failed) return /* @__PURE__ */ jsx("p", {
		className: "tds-widget__metric",
		children: "—"
	});
	if (!status) return /* @__PURE__ */ jsx(Skeleton, {
		width: "6ch",
		height: "1.75rem"
	});
	if (!status.configured) return /* @__PURE__ */ jsxs("p", { children: [
		"Nicht konfiguriert. Zugangsdaten unter ",
		/* @__PURE__ */ jsx("strong", { children: "Einstellungen → TDShop" }),
		"."
	] });
	const pending = (status.queue.pending ?? 0) + (status.queue.error ?? 0);
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		status.revoked ? /* @__PURE__ */ jsx(Alert, { children: "Amazon hat den API-Zugang entzogen. Der Katalog läuft weiter, aber Preise verschwinden nach 24 Stunden aus der Anzeige. Prüfen, ob das Partnerprogramm noch aktiv ist, dann hier erneut anstoßen." }) : null,
		/* @__PURE__ */ jsx("p", {
			className: "tds-widget__metric",
			children: pending
		}),
		/* @__PURE__ */ jsxs("ul", {
			className: "tds-list",
			children: [/* @__PURE__ */ jsxs("li", {
				className: "tds-list__row",
				children: [/* @__PURE__ */ jsx("span", { children: "Wartend" }), /* @__PURE__ */ jsx("span", { children: pending })]
			}), /* @__PURE__ */ jsxs("li", {
				className: "tds-list__row",
				children: [/* @__PURE__ */ jsx("span", { children: "Zuletzt aktualisiert" }), /* @__PURE__ */ jsx("span", { children: status.lastRun?.items_ok ?? 0 })]
			})]
		}),
		/* @__PURE__ */ jsx("div", {
			className: "tds-toolbar",
			children: /* @__PURE__ */ jsx("button", {
				type: "button",
				className: "btn btn-ghost",
				onClick: () => void run(),
				disabled: busy,
				"aria-busy": busy,
				children: "Jetzt abgleichen"
			})
		})
	] });
}
// node_modules/@tracht-digital-solutions/tds-ext-shop/widgets/SyncWidget.astro
var $$SyncWidget = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<article class="tds-widget"><h3 class="tds-widget__title">Angebotsabgleich</h3>${renderComponent($$result, "SyncBody", SyncBody, {
		"client:visible": true,
		"client:component-hydration": "visible",
		"client:component-path": "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-ext-shop/islands/SyncBody.tsx",
		"client:component-export": "default"
	})}</article>`;
}, "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-ext-shop/widgets/SyncWidget.astro", void 0);
// node_modules/@tracht-digital-solutions/tds-shared/dist/schemas/index.js
var HeadingBlock = object({
	type: literal("heading"),
	level: union([literal(2), literal(3)]),
	text: string().max(300)
});
var ParagraphBlock = object({
	type: literal("paragraph"),
	text: string().max(5e3)
});
var ListBlock = object({
	type: literal("list"),
	ordered: boolean(),
	items: array(string().max(2e3)).max(100)
});
var QuoteBlock = object({
	type: literal("quote"),
	text: string().max(2e3),
	cite: string().max(200).optional().nullable()
});
var CodeBlock = object({
	type: literal("code"),
	lang: string().max(30),
	code: string().max(2e4)
});
var ImageBlock = object({
	type: literal("image"),
	url: string().max(600),
	alt: string().max(300),
	caption: string().max(300).optional().nullable()
});
var DividerBlock = object({ type: literal("divider") });
var CalloutBlock = object({
	type: literal("callout"),
	variant: _enum([
		"info",
		"warn",
		"tip"
	]),
	text: string().max(3e3)
});
var ButtonBlock = object({
	type: literal("button"),
	label: string().max(120),
	href: string().max(600),
	style: _enum(["primary", "ghost"])
});
var VideoBlock = object({
	type: literal("video"),
	provider: _enum(["youtube", "vimeo"]),
	url: string().max(600)
});
var AdsenseBlock = object({
	type: literal("adsense"),
	placement: literal("inline"),
	slot: string().max(60).optional().nullable()
});
var CustomBlock = object({
	type: literal("custom"),
	snippetId: number().int().positive()
});
var ProductBlock = object({
	type: literal("product"),
	slug: string().max(120),
	/** `card` = full product card, `inline` = one compact row, `list` = card + all offers. */
	variant: _enum([
		"card",
		"inline",
		"list"
	])
});
var BlogBlockSchema = discriminatedUnion("type", [
	HeadingBlock,
	ParagraphBlock,
	ListBlock,
	QuoteBlock,
	CodeBlock,
	ImageBlock,
	DividerBlock,
	CalloutBlock,
	ButtonBlock,
	VideoBlock,
	AdsenseBlock,
	CustomBlock,
	ProductBlock
]);
object({
	version: literal(1),
	blocks: array(BlogBlockSchema).min(1).max(400)
});
var ALLOWED_SCHEMES = [
	"http:",
	"https:",
	"mailto:",
	"tel:"
];
function isSafeHref(value) {
	const trimmed = value.trim();
	if (trimmed === "") return false;
	let url;
	try {
		url = new URL(trimmed);
	} catch {
		return false;
	}
	return ALLOWED_SCHEMES.includes(url.protocol);
}
var SafeHref = string().max(600).refine((v) => v.trim() === "" || isSafeHref(v), { message: "href" });
var LinkItem = object({
	label: string().max(120),
	href: SafeHref,
	/** One short line under the label, e.g. "Mo–Fr, 8–17 Uhr". */
	note: string().max(160).optional().nullable(),
	/**
	* Which glyph the renderer draws. A closed vocabulary, not a free string:
	* an icon name the renderer does not know renders as nothing at all, and the
	* editor should not be able to produce that state.
	*/
	icon: _enum([
		"link",
		"phone",
		"mail",
		"map",
		"calendar",
		"download",
		"shop",
		"chat"
	]).optional().nullable()
});
var LinksBlock = object({
	type: literal("links"),
	/** Optional heading above the group. */
	label: string().max(120).optional().nullable(),
	items: array(LinkItem).max(30)
});
var HeadingBlock2 = object({
	type: literal("heading"),
	text: string().max(160)
});
var TextBlock = object({
	type: literal("text"),
	text: string().max(2e3)
});
var DividerBlock2 = object({ type: literal("divider") });
var HoursRow = object({
	/** "Mo–Do" — free text, because business reality does not fit an enum. */
	days: string().max(60),
	/** "08:00–17:00" or "geschlossen". */
	time: string().max(60)
});
var HoursBlock = object({
	type: literal("hours"),
	label: string().max(120).optional().nullable(),
	rows: array(HoursRow).max(14)
});
var SocialItem = object({
	network: _enum([
		"linkedin",
		"xing",
		"instagram",
		"facebook",
		"youtube",
		"github",
		"whatsapp",
		"website"
	]),
	href: SafeHref
});
var SocialsBlock = object({
	type: literal("socials"),
	items: array(SocialItem).max(12)
});
var CardBlockSchema = discriminatedUnion("type", [
	LinksBlock,
	HeadingBlock2,
	TextBlock,
	HoursBlock,
	SocialsBlock,
	DividerBlock2
]);
object({
	version: literal(1),
	blocks: array(CardBlockSchema).max(60)
});
var ShopOfferSchema = object({
	id: number().int().positive(),
	kind: _enum(["own", "affiliate"]),
	network: _enum([
		"amazon",
		"awin",
		"belboon",
		"digistore",
		"direct"
	]),
	/** Merchant-facing label ("Amazon", "Hetzner"), already localised by the API. */
	merchant: string().max(120),
	/** The outbound URL, affiliate tag already appended by the API. */
	url: string().max(1e3),
	/** Net-of-nothing gross price in minor units; null when we have no quote. */
	priceCents: number().int().nonnegative().nullable(),
	currency: string().length(3).default("EUR"),
	/**
	* When {@link priceCents} was last confirmed, ISO-8601. Null means "never
	* fetched" — which is not the same as a stale price and renders differently:
	* a never-fetched offer simply shows no price, a stale one shows why.
	*/
	priceCheckedAt: string().datetime({ offset: true }).nullable(),
	availability: _enum([
		"in_stock",
		"out_of_stock",
		"unknown"
	]).default("unknown"),
	position: number().int().nonnegative().default(0)
});
var ShopProductRefSchema = object({
	slug: string().max(120),
	lang: _enum(["de", "en"]),
	title: string().max(200),
	teaser: string().max(400),
	category: string().max(60),
	imageUrl: string().max(1e3).nullable(),
	/** Absolute URL of the product page on the shop site. */
	url: string().max(1e3),
	offers: array(ShopOfferSchema).max(20).default([])
});
ShopProductRefSchema.extend({
	/** Blocks JSON or markdown, same dual format as a blog post body. */
	body: string(),
	bodyFormat: _enum(["markdown", "blocks"]).default("blocks"),
	tags: array(string().max(60)).max(20).default([]),
	metaDescription: string().max(300).nullable(),
	publishedAt: string().datetime({ offset: true }).nullable(),
	updatedAt: string().datetime({ offset: true }).nullable(),
	machineTranslated: boolean().default(false)
});
object({
	key: string().max(60),
	/** Heading shown above the slot, already localised. Null renders no heading. */
	heading: string().max(120).nullable(),
	/**
	* The legally required advertising label ("Anzeige" / "Advertisement").
	*
	* Served rather than hard-coded so the label is right in both languages and
	* cannot be forgotten by a consumer — see `ProductCard`, which refuses to
	* render an affiliate offer without one.
	*/
	label: string().max(60),
	products: array(ShopProductRefSchema).max(12).default([])
});
function emptyPlacement(key, lang = "de") {
	return {
		key,
		heading: null,
		label: lang === "de" ? "Anzeige" : "Advertisement",
		products: []
	};
}
object({
	name: string().min(2, "name"),
	email: string().email("email"),
	company: string().optional(),
	subject: string().max(200).optional(),
	message: string().min(20, "message"),
	consent: literal(true, { error: () => ({ message: "consent" }) }),
	website: string().max(0).optional()
});
object({
	slug: string().min(3).max(120).regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers and hyphens only."),
	lang: _enum(["de", "en"]).default("de"),
	category: string().min(2).max(40),
	title: string().min(4).max(200),
	excerpt: string().min(10).max(400),
	body: string().min(20),
	/** Storage format of `body`. `markdown` keeps the legacy single-string path. */
	bodyFormat: _enum(["markdown", "blocks"]).default("markdown"),
	coverHint: string().max(400).optional().nullable(),
	publishedAt: date().optional().nullable(),
	draft: boolean().default(false),
	/** Per-post ad rendering mode (blog only). Mirrors the PHP validator. */
	adsMode: _enum([
		"default",
		"off",
		"auto",
		"manual"
	]).default("default"),
	/**
	* auth-api `app_user.id` of the author. Admins may set any eligible author;
	* for a non-admin blog author the server forces it to themselves. Null /
	* omitted leaves the post unassigned. The PHP validator mirrors this.
	*/
	authorId: number().int().positive().optional().nullable()
});
object({
	name: string().min(1).max(200),
	slug: string().min(1).max(120).regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers and hyphens only."),
	avatarUrl: string().max(500).optional().nullable(),
	bio: string().max(500).optional().nullable(),
	active: boolean().default(true)
});
object({
	email: string().email().optional(),
	password: string().min(1).optional(),
	token: string().min(1).optional()
});
_enum(PORTAL_PERMISSIONS);
var PermissionKeySchema = string().regex(PERMISSION_KEY_PATTERN, "expected <resource>:<action>");
var MembershipSchema = object({
	companyId: number().int().positive().optional(),
	/** @deprecated legacy name for `companyId`; removed in the follow-up release. */
	customerId: number().int().positive().optional(),
	permissions: array(PermissionKeySchema).max(128).default([]),
	/** Ids of the groups assigned to this user IN this company. */
	groupIds: array(number().int().positive()).default([]),
	/** Whether this membership may manage the company's own users. */
	isCompanyAdmin: boolean().default(false),
	/**
	* The most this membership may ever be granted, `null` = inherit the
	* company policy. Platform-admin only — a company admin cannot raise it.
	*/
	permissionCeiling: array(PermissionKeySchema).nullish(),
	/**
	* Rights withheld from THIS person even where an assigned group grants
	* them — the per-person override of the group's decision.
	*
	* Not the same field as `permissionCeiling`, and the difference is easy to
	* lose: the ceiling is the platform admin's limit on what a company admin
	* may ever hand out; this is the ordinary decision about one person, which
	* a company admin owns. A right can be inside the ceiling and denied; it
	* cannot be outside the ceiling and granted.
	*
	* Unlike the ceiling there is no null/empty distinction — an empty deny
	* list and no deny list say the same thing — so this defaults to `[]`
	* rather than being nullish.
	*/
	permissionDenies: array(PermissionKeySchema).max(128).default([])
}).refine((m) => m.companyId !== void 0 || m.customerId !== void 0, { message: "companyId is required" }).transform((m) => ({
	...m,
	companyId: m.companyId ?? m.customerId
}));
object({
	email: string().email(),
	name: string().min(1).max(200).optional().nullable(),
	password: string().min(12).optional(),
	isAdmin: boolean().default(false),
	isSupportAgent: boolean().default(false),
	/** Grants blog-authoring access (see `AppUser.isBlogAuthor`). */
	isBlogAuthor: boolean().default(false),
	/** Author bio shown on the public blog author page. */
	bio: string().max(500).optional().nullable(),
	memberships: array(MembershipSchema).optional(),
	/** @deprecated use `memberships` — kept as a single-company fallback. */
	customerId: number().int().positive().optional().nullable(),
	/** @deprecated use `memberships`. */
	permissions: array(PermissionKeySchema).max(128).default([]),
	status: _enum(["active", "disabled"]).default("active")
});
object({
	email: string().email().optional(),
	name: string().min(1).max(200).optional().nullable(),
	isAdmin: boolean().optional(),
	isSupportAgent: boolean().optional(),
	/** Grants blog-authoring access (see `AppUser.isBlogAuthor`). */
	isBlogAuthor: boolean().optional(),
	/** Author bio shown on the public blog author page. */
	bio: string().max(500).optional().nullable(),
	memberships: array(MembershipSchema).optional(),
	/** @deprecated use `memberships`. */
	customerId: number().int().positive().optional().nullable(),
	/** @deprecated use `memberships`. */
	permissions: array(PermissionKeySchema).max(128).optional(),
	status: _enum(["active", "disabled"]).optional()
});
var TICKET_PRIORITIES = [
	"low",
	"normal",
	"high",
	"urgent"
];
var TICKET_TYPES = [
	"question",
	"bug",
	"feature",
	"other"
];
var TicketPrioritySchema = _enum(TICKET_PRIORITIES);
var TicketTypeSchema = _enum(TICKET_TYPES);
object({
	subject: string().min(3).max(200),
	description: string().min(10).max(1e4),
	priority: TicketPrioritySchema.default("normal"),
	type: TicketTypeSchema.default("question"),
	projectId: number().int().positive().optional().nullable()
});
object({
	body: string().min(1).max(1e4),
	isInternal: boolean().default(false)
});
// node_modules/@tracht-digital-solutions/tds-ext-shop/islands/PicksBody.tsx
var PLACEMENT_KEY = "panel-dashboard";
/**
* Product placement in the customer portal dashboard.
*
* Renders the shared `ProductCard`, which carries the advertising label and the
* price-freshness rule itself — this island decides nothing about either, and
* that is deliberate: three surfaces render this card, and a rule re-decided
* per surface is a rule that eventually differs on one of them.
*
* ### Empty is a normal state here, not an error
*
* A slot with nothing in it renders NOTHING — no heading, no empty-state card,
* no "no recommendations yet". This is advertising inside somebody's working
* dashboard; an empty box explaining that there is no advertising is worse than
* the absence it describes. The widget therefore collapses to null, and the
* dashboard closes over the gap.
*
* Returning null was not enough on its own: `widgets/PicksWidget.astro` draws
* the card and its "Empfehlungen" heading around this island, so an empty slot
* still left an empty titled card on every portal dashboard (seen 2026-10-07).
* An empty placement therefore hides the dashboard slot it sits in.
*/
function PicksBody() {
	const [placement, setPlacement] = useState(null);
	const [loading, setLoading] = useState(true);
	const marker = useRef(null);
	const empty = !loading && (!placement || placement.products.length === 0);
	useEffect(() => {
		if (!empty) return;
		const box = marker.current?.closest(".widget-slot") ?? marker.current?.closest(".tds-widget");
		if (box) box.hidden = true;
	}, [empty]);
	useEffect(() => {
		let alive = true;
		(async () => {
			try {
				const res = await apiFetch(`/content/shop/placement/${PLACEMENT_KEY}?lang=de`);
				if (!res.ok) throw new Error(String(res.status));
				const json = await res.json();
				if (alive) setPlacement(json);
			} catch {
				if (alive) setPlacement(emptyPlacement(PLACEMENT_KEY));
			} finally {
				if (alive) setLoading(false);
			}
		})();
		return () => {
			alive = false;
		};
	}, []);
	if (loading) return /* @__PURE__ */ jsx(SkeletonText, { lines: 2 });
	if (empty || !placement) return /* @__PURE__ */ jsx("span", {
		ref: marker,
		hidden: true
	});
	const attribute = (url, lang) => `${url}?source=customer&placement=${PLACEMENT_KEY}&lang=${lang}`;
	return /* @__PURE__ */ jsx("div", {
		className: "tds-product-strip",
		children: placement.products.map((product) => /* @__PURE__ */ jsx(ProductCard, {
			product: {
				...product,
				offers: product.offers.map((o) => ({
					...o,
					url: attribute(o.url, product.lang)
				}))
			},
			variant: "card",
			lang: product.lang,
			affiliateLabel: placement.label
		}, product.slug))
	});
}
// node_modules/@tracht-digital-solutions/tds-ext-shop/widgets/PicksWidget.astro
var $$PicksWidget = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<article class="tds-widget"><h3 class="tds-widget__title">Empfehlungen</h3>${renderComponent($$result, "PicksBody", PicksBody, {
		"client:visible": true,
		"client:component-hydration": "visible",
		"client:component-path": "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-ext-shop/islands/PicksBody.tsx",
		"client:component-export": "default"
	})}</article>`;
}, "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-ext-shop/widgets/PicksWidget.astro", void 0);
// \0virtual:frontend-widgets
var widgets = [
	{
		"id": "projects-active",
		"title": "Aktive Projekte",
		"island": "@tracht-digital-solutions/tds-ext-projects/widgets/Widget.astro",
		"size": "sm",
		"permission": "projects:read",
		"dataEndpoint": "/projects/summary",
		"order": 5,
		Component: $$Widget$5
	},
	{
		"id": "tickets-open",
		"title": "Offene Tickets",
		"island": "@tracht-digital-solutions/tds-ext-support-tickets/widgets/Widget.astro",
		"size": "sm",
		"permission": "tickets:read",
		"dataEndpoint": "/tickets/summary",
		"order": 10,
		Component: $$Widget$4
	},
	{
		"id": "billing-open",
		"title": "Offene Rechnungen",
		"island": "@tracht-digital-solutions/tds-ext-billing/widgets/Widget.astro",
		"size": "sm",
		"permission": "invoices:read",
		"dataEndpoint": "/billing/summary",
		"order": 10,
		Component: $$Widget$3
	},
	{
		"id": "messages-unread",
		"title": "Neue Nachrichten",
		"island": "@tracht-digital-solutions/tds-ext-messages/widgets/Widget.astro",
		"size": "sm",
		"permission": "messages:read",
		"dataEndpoint": "/messages/summary",
		"order": 20,
		Component: $$Widget$2
	},
	{
		"id": "documents-count",
		"title": "Dokumente",
		"island": "@tracht-digital-solutions/tds-ext-documents/widgets/Widget.astro",
		"size": "sm",
		"permission": "documents:read",
		"dataEndpoint": "/documents/summary",
		"order": 30,
		Component: $$Widget$1
	},
	{
		"id": "shop-summary",
		"title": "TDShop",
		"island": "@tracht-digital-solutions/tds-ext-shop/widgets/Widget.astro",
		"size": "sm",
		"permission": "shop:read",
		"dataEndpoint": "/shop/summary",
		"order": 45,
		Component: $$Widget
	},
	{
		"id": "shop-sync",
		"title": "Angebotsabgleich",
		"island": "@tracht-digital-solutions/tds-ext-shop/widgets/SyncWidget.astro",
		"size": "sm",
		"permission": "shop:sync",
		"dataEndpoint": "/shop/sync/status",
		"order": 46,
		Component: $$SyncWidget
	},
	{
		"id": "shop-picks",
		"title": "Empfehlungen",
		"island": "@tracht-digital-solutions/tds-ext-shop/widgets/PicksWidget.astro",
		"size": "md",
		"order": 90,
		Component: $$PicksWidget
	}
];
// node_modules/@tracht-digital-solutions/tds-core-frontend/src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Dashboard" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="tds-page"><div class="tds-page__head"><div><p class="tds-page__eyebrow">Übersicht</p><h1 class="tds-page__title">Dashboard</h1></div><div class="tds-toolbar" data-dashboard-toolbar><button type="button" class="btn btn-ghost" data-dashboard-edit hidden>Anpassen</button><button type="button" class="btn btn-primary" data-dashboard-save hidden>Speichern</button><button type="button" class="btn btn-ghost" data-dashboard-cancel hidden>Abbrechen</button></div></div><h2 class="sr-only">Kacheln</h2><div class="dashboard-grid" data-dashboard-grid>${widgets.map((widget) => {
		const Widget = widget.Component;
		const title = widget.title ?? widget.id;
		return renderTemplate`<section class="widget-slot"${addAttribute(widget.id, "data-widget")}${addAttribute(widget.size, "data-size")}${addAttribute(title, "data-label")}${addAttribute(widget.permission, "data-reveal-permission")}${addAttribute(widget.permission !== void 0, "hidden")}${addAttribute(`--tds-widget-hue: ${hueForKey(widget.id)}`, "style")}><div class="widget-slot__controls"><span class="widget-slot__handle" title="Ziehen zum Sortieren" aria-hidden="true">⠿</span><button type="button" class="btn btn-ghost widget-slot__move" data-widget-move="up"${addAttribute(`${title} nach vorne schieben`, "aria-label")}>${renderComponent($$result, "Icon", $$Icon, {
			"name": "chevron-up",
			"size": 16
		})}</button><button type="button" class="btn btn-ghost widget-slot__move" data-widget-move="down"${addAttribute(`${title} nach hinten schieben`, "aria-label")}>${renderComponent($$result, "Icon", $$Icon, {
			"name": "chevron-down",
			"size": 16
		})}</button><label class="widget-slot__toggle"><input type="checkbox" data-widget-visible checked><span>${title}</span></label></div><span class="widget-slot__icon" aria-hidden="true">${renderComponent($$result, "Icon", $$Icon, {
			"name": widgetIcon(widget.id),
			"size": 16
		})}</span>${renderComponent($$result, "Widget", Widget, {})}</section>`;
	})}</div></section><style>
    .widget-slot__controls { display: none; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; }
    .dashboard-grid.is-editing .widget-slot__controls { display: flex; }
    .dashboard-grid.is-editing .widget-slot {
      outline: 1px dashed color-mix(in srgb, var(--color-primary, #050f68) 40%, transparent);
      outline-offset: 4px; border-radius: 0.5rem;
    }
    .dashboard-grid.is-editing .widget-slot.is-hidden { opacity: 0.45; }
    .dashboard-grid.is-editing .widget-slot.is-dragging { opacity: 0.5; }
    .widget-slot.is-hidden { display: none; }
    /* Not permitted (WidgetManifest.permission): gone in edit mode too, and its
       island never hydrates — \`client:visible\` waits for a box that never comes,
       so no 403 is even requested. */
    .widget-slot[hidden] { display: none !important; }
    .dashboard-grid.is-editing .widget-slot.is-hidden { display: block; }
    .widget-slot__handle { cursor: grab; user-select: none; font-size: 1.1rem; line-height: 1; }
    .widget-slot__toggle { display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.9rem; }
    /* The drag handle is the mouse affordance and nothing else — HTML5 drag
       and drop does not exist on a touch screen, and it is unreachable by
       keyboard either way. These two buttons are the real control; the drag
       stays because it is the faster gesture where it works. */
    .widget-slot__move { padding: 0.25rem 0.4rem; }
    @media (pointer: coarse) { .widget-slot__handle { display: none; } }
    /* The hue icon is absolutely positioned to the SLOT's top-right (the
       .tds-widget markup belongs to each extension and is not touched), so
       once edit mode reveals the controls row above the widget the icon would
       overlay it. Edit mode is chrome, not the finished view — drop it. */
    .dashboard-grid.is-editing .widget-slot__icon { display: none; }
  </style>${renderScript($$result, "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-core-frontend/src/pages/index.astro?astro&type=script&index=0&lang.ts")}` })}`;
}, "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-core-frontend/src/pages/index.astro", void 0);
var $$file = "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-core-frontend/src/pages/index.astro";
// \0virtual:astro:page:node_modules/@tracht-digital-solutions/tds-core-frontend/src/pages/index@_@astro
var page = () => pages_exports;
export { page };
