import { Z as __exportAll, d as renderTemplate, i as renderComponent } from "./server_DN3ZvnwF.mjs";
import { t as createComponent } from "./compiler_CbhQ7lga.mjs";
import { _ as FormAlert, a as API_BASE, l as frontendFetch, t as $$Layout, x as Spinner } from "./Layout_Dr9rkGQb.mjs";
import "./_virtual_frontend-modules_DPoy_BAB.mjs";
import { useEffect, useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-shared/dist/markdown/index.js
function escapeHtml(s) {
	return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function safeHref(url) {
	const u = url.trim();
	return /^(https?:\/\/|mailto:|\/|#)/i.test(u) ? u : null;
}
function inlineMd(escaped) {
	return escaped.replace(/`([^`]+)`/g, (_m, c) => `<code>${c}</code>`).replace(/\*\*([^*]+)\*\*/g, (_m, c) => `<strong>${c}</strong>`).replace(/(^|[^*])\*([^*]+)\*/g, (_m, pre, c) => `${pre}<em>${c}</em>`).replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, text, url) => {
		const href = safeHref(url);
		return href ? `<a href="${href}" rel="noopener" target="_blank">${text}</a>` : m;
	});
}
function renderMarkdown(src) {
	const lines = src.replace(/\r\n/g, "\n").split("\n");
	const out = [];
	let inFence = false;
	let fenceBuf = [];
	let listBuf = [];
	let paraBuf = [];
	const flushList = () => {
		if (listBuf.length) {
			out.push(`<ul>${listBuf.map((li) => `<li>${inlineMd(escapeHtml(li))}</li>`).join("")}</ul>`);
			listBuf = [];
		}
	};
	const flushPara = () => {
		if (paraBuf.length) {
			out.push(`<p>${inlineMd(escapeHtml(paraBuf.join(" ")))}</p>`);
			paraBuf = [];
		}
	};
	for (const line of lines) {
		if (line.trim().startsWith("```")) {
			if (inFence) {
				out.push(`<pre><code>${escapeHtml(fenceBuf.join("\n"))}</code></pre>`);
				fenceBuf = [];
				inFence = false;
			} else {
				flushPara();
				flushList();
				inFence = true;
			}
			continue;
		}
		if (inFence) {
			fenceBuf.push(line);
			continue;
		}
		const heading = /^(#{1,4})\s+(.*)$/.exec(line);
		if (heading) {
			flushPara();
			flushList();
			const level = heading[1].length;
			out.push(`<h${level}>${inlineMd(escapeHtml(heading[2]))}</h${level}>`);
			continue;
		}
		const li = /^[-*]\s+(.*)$/.exec(line);
		if (li) {
			flushPara();
			listBuf.push(li[1]);
			continue;
		}
		if (line.trim() === "") {
			flushPara();
			flushList();
			continue;
		}
		flushList();
		paraBuf.push(line.trim());
	}
	if (inFence) out.push(`<pre><code>${escapeHtml(fenceBuf.join("\n"))}</code></pre>`);
	flushPara();
	flushList();
	return out.join("\n");
}
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-core-frontend/src/components/HelpCenter.tsx
/** Anchor-safe id, so an answer can be linked to directly. */
var faqAnchor = (entry) => `faq-${entry.id}`;
function HelpCenter({ lang = "de" }) {
	const [faqs, setFaqs] = useState(null);
	const [articles, setArticles] = useState(null);
	const [failed, setFailed] = useState(false);
	const [q, setQ] = useState("");
	useEffect(() => {
		let alive = true;
		const load = async () => {
			try {
				const [f, a] = await Promise.all([frontendFetch(`${API_BASE}/help/faqs?lang=${lang}`), frontendFetch(`${API_BASE}/help/articles?lang=${lang}`)]);
				if (!alive) return;
				setFaqs(f.ok ? (await f.json()).faqs ?? [] : []);
				setArticles(a.ok ? (await a.json()).articles ?? [] : []);
				if (!f.ok && !a.ok && f.status !== 404) setFailed(true);
			} catch {
				if (alive) {
					setFaqs([]);
					setArticles([]);
					setFailed(true);
				}
			}
		};
		load();
		return () => {
			alive = false;
		};
	}, [lang]);
	const query = q.trim().toLowerCase();
	const groups = useMemo(() => {
		if (!faqs) return [];
		const matching = faqs.filter((e) => !query || `${e.question} ${e.answer} ${e.category ?? ""}`.toLowerCase().includes(query));
		const byCategory = /* @__PURE__ */ new Map();
		for (const entry of matching) {
			const key = entry.category?.trim() || "Allgemein";
			byCategory.set(key, [...byCategory.get(key) ?? [], entry]);
		}
		return [...byCategory.entries()];
	}, [faqs, query]);
	const shownArticles = useMemo(() => (articles ?? []).filter((a) => !query || a.title.toLowerCase().includes(query)), [articles, query]);
	if (faqs === null || articles === null) return /* @__PURE__ */ jsx("p", {
		role: "status",
		children: /* @__PURE__ */ jsx(Spinner, {})
	});
	const empty = faqs.length === 0 && articles.length === 0;
	return /* @__PURE__ */ jsxs("div", {
		className: "help-center",
		children: [
			failed && /* @__PURE__ */ jsx("p", {
				className: "tds-alert tds-alert--warning",
				children: "Die Hilfeinhalte konnten gerade nicht geladen werden. Bitte später erneut versuchen."
			}),
			!empty && /* @__PURE__ */ jsx("div", {
				className: "tds-toolbar",
				children: /* @__PURE__ */ jsx("input", {
					className: "field-boxed",
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Frage oder Handbuch suchen …",
					"aria-label": "Hilfe durchsuchen"
				})
			}),
			empty ? /* @__PURE__ */ jsx("p", {
				className: "tds-empty",
				children: "Hier sind noch keine Inhalte hinterlegt. Bei Fragen erreichen Sie uns jederzeit über den Support."
			}) : /* @__PURE__ */ jsxs(Fragment$1, { children: [
				/* @__PURE__ */ jsx("h2", {
					className: "mt-6 mb-3 text-lg font-semibold",
					children: "Häufige Fragen"
				}),
				groups.length === 0 ? /* @__PURE__ */ jsx("p", {
					className: "tds-empty",
					children: "Keine Frage passt zur Suche."
				}) : groups.map(([category, entries]) => /* @__PURE__ */ jsxs("section", {
					className: "mb-5",
					children: [groups.length > 1 && /* @__PURE__ */ jsx("h3", {
						className: "mb-2 text-sm font-semibold opacity-70",
						children: category
					}), /* @__PURE__ */ jsx("div", {
						className: "tds-stack",
						children: entries.map((entry) => /* @__PURE__ */ jsxs("details", {
							id: faqAnchor(entry),
							className: "tds-card p-4",
							children: [/* @__PURE__ */ jsx("summary", {
								className: "cursor-pointer font-semibold",
								children: entry.question
							}), /* @__PURE__ */ jsx("div", {
								className: "mt-3 flex flex-col gap-2 text-sm opacity-80",
								children: entry.answer.split(/\n{2,}|\n/).map((p, i) => p.trim() ? /* @__PURE__ */ jsx("p", { children: p.trim() }, i) : null)
							})]
						}, entry.id))
					})]
				}, category)),
				/* @__PURE__ */ jsx("h2", {
					className: "mt-8 mb-3 text-lg font-semibold",
					children: "Handbücher"
				}),
				shownArticles.length === 0 ? /* @__PURE__ */ jsx("p", {
					className: "tds-empty",
					children: "Kein Handbuch passt zur Suche."
				}) : /* @__PURE__ */ jsx("div", {
					className: "tds-stack",
					children: shownArticles.map((article) => /* @__PURE__ */ jsx(Article, {
						article,
						lang
					}, article.slug))
				})
			] })
		]
	});
}
/**
* One handbook. The body is fetched when it is first opened, not with the list:
* an article is markdown of arbitrary length, and shipping every one of them to
* draw a list of headings is the difference between a page that opens and one
* that stalls.
*/
function Article({ article, lang }) {
	const [body, setBody] = useState(null);
	const [state, setState] = useState("idle");
	const load = async () => {
		if (body !== null || state === "loading") return;
		setState("loading");
		try {
			const res = await frontendFetch(`${API_BASE}/help/articles/${encodeURIComponent(article.slug)}?lang=${lang}`);
			if (!res.ok) {
				setState("failed");
				return;
			}
			setBody((await res.json()).article ?? null);
			setState("idle");
		} catch {
			setState("failed");
		}
	};
	return /* @__PURE__ */ jsxs("details", {
		id: `artikel-${article.slug}`,
		className: "tds-card p-4",
		onToggle: (e) => {
			if (e.currentTarget.open) load();
		},
		children: [/* @__PURE__ */ jsx("summary", {
			className: "cursor-pointer font-semibold",
			children: article.title
		}), /* @__PURE__ */ jsxs("div", {
			className: "mt-3",
			children: [
				state === "loading" && /* @__PURE__ */ jsx("p", {
					role: "status",
					children: /* @__PURE__ */ jsx(Spinner, { size: "sm" })
				}),
				state === "failed" && /* @__PURE__ */ jsx(FormAlert, { message: "Dieses Handbuch konnte nicht geladen werden." }),
				body && /* @__PURE__ */ jsx("div", {
					className: "tds-prose text-sm",
					dangerouslySetInnerHTML: { __html: renderMarkdown(body.body_markdown) }
				})
			]
		})]
	});
}
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-core-frontend/src/pages/wiki.astro
var wiki_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Wiki,
	file: () => $$file,
	url: () => $$url
});
var $$Wiki = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Hilfe" }, { "default": ($$result) => renderTemplate`<section class="tds-page"><div class="tds-page__head"><div><p class="tds-page__eyebrow">Wiki</p><h1 class="tds-page__title">Hilfe & Handbücher</h1><p class="tds-page__lede max-w-2xl">Antworten auf häufige Fragen und Anleitungen zur Bedienung Ihrer Software. Finden Sie hier nicht, was Sie suchen, hilft Ihnen der Support gern weiter.</p></div></div>${renderComponent($$result, "HelpCenter", HelpCenter, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-core-frontend/src/components/HelpCenter.tsx",
		"client:component-export": "default"
	})}</section>` })}`}`;
}, "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-core-frontend/src/pages/wiki.astro", void 0);
var $$file = "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-core-frontend/src/pages/wiki.astro";
var $$url = "/wiki";
//#endregion
//#region \0virtual:astro:page:node_modules/@tracht-digital-solutions/tds-core-frontend/src/pages/wiki@_@astro
var page = () => wiki_exports;
//#endregion
export { page };
