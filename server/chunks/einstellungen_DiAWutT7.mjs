import { Z as __exportAll, d as renderTemplate, f as maybeRenderHead, i as renderComponent, m as addAttribute } from "./server_DN3ZvnwF.mjs";
import { t as createComponent } from "./compiler_CbhQ7lga.mjs";
import { S as toast, _ as FormAlert, a as API_BASE, l as frontendFetch, p as FRONTEND_TARGET, t as $$Layout, x as Spinner } from "./Layout_Dr9rkGQb.mjs";
import { t as apiFetch } from "./api_J-1yv9vr.mjs";
import { t as toast$1 } from "./toast_CwStKRcr.mjs";
import { useEffect, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
//#region node_modules/@tracht-digital-solutions/tds-core-frontend/src/components/CorsSettings.tsx
var ENDPOINT = `${API_BASE}/admin/cors`;
var SOURCE_LABEL = {
	baseline: "fest eingebaut",
	env: ".env des Hosts",
	db: "hier gepflegt"
};
var SOURCE_VARIANT = {
	baseline: "chip--neutral",
	env: "chip--warning",
	db: "chip--info"
};
/**
* *CORS / Freigegebene Origins* — which browser origins may call this API.
*
* It used to live only in `CORS_ALLOWED_ORIGINS` on the host, editable by
* opening a file over SSH on a host whose whole install model is "ohne SSH".
* So in practice the list was whatever the installer wrote once, and adding a
* customer domain or a staging host was not something anybody could do.
*
* Two things this form has to make visible, because getting either wrong is
* silent:
*
* The LAYER each origin comes from. The list is a union of a coded baseline,
* the host's `.env` and the rows edited here — a union, not an override, so
* that nothing saved in a browser can remove the origin that browser is
* running on. Without the layer shown, the entries that cannot be deleted look
* like a bug.
*
* And the REJECTS. The server compares an exact string, so `https://kunde.de/`
* — the standard paste error — unblocks nothing, forever, with no error
* anywhere. The API normalises what it can and hands back what it could not;
* that list is rendered IN FLOW rather than as a toast, because it is text to
* read and act on, not a passing notice.
*/
function CorsSettings() {
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(null);
	const [status, setStatus] = useState(null);
	const [draft, setDraft] = useState("");
	const [rejected, setRejected] = useState([]);
	const [busy, setBusy] = useState(false);
	const load = async () => {
		try {
			const res = await frontendFetch(ENDPOINT);
			if (!res.ok) {
				setError(res.status === 401 || res.status === 403 ? "Nur für Administratoren." : `Origins konnten nicht geladen werden (HTTP ${res.status}).`);
				setLoaded(true);
				return;
			}
			const data = await res.json();
			setStatus(data);
			setDraft((data.custom ?? []).join("\n"));
			setError(null);
		} catch {
			setError("Origins konnten nicht geladen werden — die API ist nicht erreichbar.");
		} finally {
			setLoaded(true);
		}
	};
	useEffect(() => {
		load();
	}, []);
	const save = async () => {
		setBusy(true);
		setRejected([]);
		try {
			const res = await frontendFetch(ENDPOINT, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ origins: draft })
			});
			const data = await res.json().catch(() => null);
			if (!res.ok || !data?.ok) {
				toast.danger(data?.error ? `Speichern fehlgeschlagen (HTTP ${res.status}): ${data.error}` : `Speichern fehlgeschlagen (HTTP ${res.status}).`);
				return;
			}
			setStatus(data);
			setDraft((data.saved ?? []).join("\n"));
			setRejected(data.rejected ?? []);
			if ((data.rejected ?? []).length > 0) toast.warning("Gespeichert — einzelne Einträge wurden abgelehnt.");
			else toast.success("Gespeichert.");
		} catch {
			toast.danger("Speichern fehlgeschlagen — die API ist nicht erreichbar.");
		} finally {
			setBusy(false);
		}
	};
	if (!loaded) return /* @__PURE__ */ jsx(Spinner, {});
	return /* @__PURE__ */ jsxs("div", {
		className: "tds-settings-section__body tds-stack",
		children: [
			/* @__PURE__ */ jsx(FormAlert, { message: error }),
			status && !status.store_available ? /* @__PURE__ */ jsxs("p", {
				className: "tds-alert tds-alert--warning",
				children: [
					"Noch keine Datenbank konfiguriert — es gelten nur die fest eingebauten Origins und die",
					" ",
					/* @__PURE__ */ jsx("code", { children: ".env" }),
					" des Hosts. Eigene Einträge lassen sich erst danach speichern."
				]
			}) : null,
			/* @__PURE__ */ jsx("p", {
				className: "marginalia",
				children: "Nur Browser-Anfragen von diesen Herkünften dürfen die API lesen. Die fest eingebauten Adressen der eigenen Seiten lassen sich nicht entfernen — sonst könnte eine Änderung hier genau die Oberfläche aussperren, die sie zurücknehmen müsste."
			}),
			status ? /* @__PURE__ */ jsx("ul", {
				className: "tds-list",
				children: status.origins.map((row) => /* @__PURE__ */ jsxs("li", {
					className: "tds-list__row",
					children: [/* @__PURE__ */ jsx("code", { children: row.origin }), /* @__PURE__ */ jsx("span", {
						className: `chip ${SOURCE_VARIANT[row.source]}`,
						children: SOURCE_LABEL[row.source]
					})]
				}, `${row.source}-${row.origin}`))
			}) : null,
			/* @__PURE__ */ jsxs("label", {
				className: "block",
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-sm",
					children: "Zusätzliche Origins (eine pro Zeile)"
				}), /* @__PURE__ */ jsx("textarea", {
					className: "field-boxed",
					rows: 4,
					value: draft,
					onChange: (e) => setDraft(e.target.value),
					placeholder: "https://kunde.example\nhttp://localhost:4321",
					spellCheck: false,
					autoComplete: "off"
				})]
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "marginalia",
				children: [
					"Schema, Host und gegebenenfalls Port — kein Pfad und kein Schrägstrich am Ende (",
					/* @__PURE__ */ jsx("code", { children: "https://kunde.example" }),
					", nicht ",
					/* @__PURE__ */ jsx("code", { children: "https://kunde.example/" }),
					"). Verglichen wird exakt, ein knapp danebenliegender Eintrag gibt also dauerhaft nichts frei. Ein",
					/* @__PURE__ */ jsx("code", { children: " *" }),
					" ist nicht möglich: zusammen mit Sitzungs-Cookies verbietet der Standard den Platzhalter."
				]
			}),
			rejected.length > 0 ? /* @__PURE__ */ jsxs("div", {
				className: "tds-alert tds-alert--warning",
				children: [/* @__PURE__ */ jsx("p", { children: "Diese Einträge wurden nicht übernommen:" }), /* @__PURE__ */ jsx("ul", { children: rejected.map((entry) => /* @__PURE__ */ jsxs("li", { children: [
					/* @__PURE__ */ jsx("code", { children: entry.value }),
					" — ",
					entry.reason
				] }, entry.value)) })]
			}) : null,
			/* @__PURE__ */ jsx("div", {
				className: "tds-toolbar",
				children: /* @__PURE__ */ jsx("button", {
					type: "button",
					className: "btn btn-primary",
					onClick: () => void save(),
					disabled: busy,
					children: busy ? /* @__PURE__ */ jsx(Spinner, { size: "sm" }) : "Speichern"
				})
			}),
			/* @__PURE__ */ jsx("p", {
				className: "marginalia",
				children: "Die Änderung gilt sofort für die nächste Anfrage — ein neues Deployment ist nicht nötig."
			})
		]
	});
}
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-core-frontend/src/components/MailSettings.tsx
var NS$3 = `${API_BASE}/admin/settings/mail`;
var STATUS$1 = `${API_BASE}/admin/mail`;
var TEST$1 = `${API_BASE}/admin/mail/test`;
/** Coded defaults, mirrored from the API's `MailConfig`. */
var DEFAULTS$1 = {
	port: "587",
	security: "tls",
	from_email: "no-reply@tracht-digital.de",
	from_name: "Tracht Digital Solutions"
};
/**
* *E-Mail (SMTP)* — the base's own settings section for the one transport every
* composed module sends through (Ticket-Benachrichtigungen, Kontakt-Antworten,
* Live-Chat-Mails …).
*
* Two reads, because they answer different questions: the settings namespace
* holds what is *stored* (and is what this form edits), while `GET /admin/mail`
* reports what actually *sends* — including a transport that comes from the
* host's `MAIL_DSN`. Showing only the former would present an empty form on a
* host that mails perfectly well, and the first "fix" would overwrite a working
* transport.
*
* The password is a secret: it comes back masked and a blank field on save keeps
* the stored value, so it never round-trips through the browser.
*
* The test button exists because saving is not sending. SMTP fails on things no
* form can validate (wrong port, refused relay, bad credentials), and the
* modules that use the mailer send on events an admin cannot trigger at will —
* without this, the first proof that mail works would be a customer not getting
* one. Its failure is rendered IN FLOW, not as a toast: the SMTP server's reply
* is diagnostic text to read, not a passing notice.
*/
function MailSettings() {
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(null);
	const [status, setStatus] = useState(null);
	const [host, setHost] = useState("");
	const [port, setPort] = useState(DEFAULTS$1.port);
	const [security, setSecurity] = useState(DEFAULTS$1.security);
	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");
	const [passwordState, setPasswordState] = useState(null);
	const [fromEmail, setFromEmail] = useState("");
	const [fromName, setFromName] = useState("");
	const [dsn, setDsn] = useState("");
	const [dsnState, setDsnState] = useState(null);
	const [testTo, setTestTo] = useState("");
	const [testError, setTestError] = useState(null);
	const [busy, setBusy] = useState(false);
	const [testing, setTesting] = useState(false);
	const load = async () => {
		try {
			const [settingsRes, statusRes] = await Promise.all([frontendFetch(NS$3), frontendFetch(STATUS$1)]);
			if (!settingsRes.ok) {
				setError(settingsRes.status === 401 || settingsRes.status === 403 ? "Nur für Administratoren." : `Einstellungen konnten nicht geladen werden (HTTP ${settingsRes.status}).`);
				setLoaded(true);
				return;
			}
			const data = await settingsRes.json();
			const map = new Map((data.settings ?? []).map((s) => [s.key, s]));
			setHost(map.get("host")?.value ?? "");
			setPort(map.get("port")?.value || DEFAULTS$1.port);
			setSecurity(map.get("security")?.value || DEFAULTS$1.security);
			setUser(map.get("user")?.value ?? "");
			setPasswordState(map.get("password") ?? null);
			setFromEmail(map.get("from_email")?.value ?? "");
			setFromName(map.get("from_name")?.value ?? "");
			setDsnState(map.get("dsn") ?? null);
			setStatus(statusRes.ok ? await statusRes.json() : null);
			setError(null);
		} catch {
			setError("Einstellungen konnten nicht geladen werden — die API ist nicht erreichbar.");
		} finally {
			setLoaded(true);
		}
	};
	useEffect(() => {
		load();
	}, []);
	const save = async () => {
		setBusy(true);
		try {
			const res = await frontendFetch(NS$3, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ settings: [
					{
						key: "host",
						secret: false,
						value: host.trim()
					},
					{
						key: "port",
						secret: false,
						value: port.trim()
					},
					{
						key: "security",
						secret: false,
						value: security
					},
					{
						key: "user",
						secret: false,
						value: user.trim()
					},
					{
						key: "password",
						secret: true,
						value: password
					},
					{
						key: "from_email",
						secret: false,
						value: fromEmail.trim()
					},
					{
						key: "from_name",
						secret: false,
						value: fromName.trim()
					},
					{
						key: "dsn",
						secret: true,
						value: dsn.trim()
					}
				] })
			});
			if (res.ok) {
				setPassword("");
				setDsn("");
				toast.success("Gespeichert.");
				load();
			} else toast.danger(`Speichern fehlgeschlagen (HTTP ${res.status}).`);
		} catch {
			toast.danger("Speichern fehlgeschlagen — die API ist nicht erreichbar.");
		} finally {
			setBusy(false);
		}
	};
	const sendTest = async () => {
		setTesting(true);
		setTestError(null);
		try {
			const res = await frontendFetch(TEST$1, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ to: testTo.trim() })
			});
			const data = await res.json().catch(() => null);
			if (res.ok && data?.ok) toast.success(`Testmail an ${data.to ?? "die eigene Adresse"} übergeben.`);
			else setTestError(data?.error ? `Versand fehlgeschlagen (HTTP ${res.status}): ${data.error}` : `Versand fehlgeschlagen (HTTP ${res.status}).`);
		} catch {
			setTestError("Versand fehlgeschlagen — die API ist nicht erreichbar.");
		} finally {
			setTesting(false);
		}
	};
	const passwordHint = passwordState?.configured ? `hinterlegt (…${passwordState.last4 ?? "????"})` : "nicht hinterlegt";
	const dsnHint = dsnState?.configured ? `hinterlegt (…${dsnState.last4 ?? "????"})` : "nicht gesetzt";
	const sourceLabel = () => {
		if (!status) return {
			text: "Status unbekannt",
			variant: "warning"
		};
		if (!status.configured) return {
			text: "Kein Versand konfiguriert",
			variant: "danger"
		};
		return status.source === "env" ? {
			text: "Aktiv über MAIL_DSN aus der .env des Hosts",
			variant: "warning"
		} : {
			text: "Aktiv über diese Einstellungen",
			variant: "success"
		};
	};
	if (!loaded) return /* @__PURE__ */ jsx(Spinner, {});
	const state = sourceLabel();
	return /* @__PURE__ */ jsxs("div", {
		className: "tds-settings-section__body tds-stack",
		children: [
			/* @__PURE__ */ jsx(FormAlert, { message: error }),
			/* @__PURE__ */ jsxs("p", {
				className: "tds-row",
				children: [/* @__PURE__ */ jsx("span", {
					className: `status-pill status-pill--${state.variant}`,
					children: state.text
				}), status?.configured ? /* @__PURE__ */ jsxs("span", {
					className: "marginalia",
					children: [
						"Absender: ",
						status.from_name,
						" <",
						status.from_email,
						">"
					]
				}) : null]
			}),
			status?.source === "env" ? /* @__PURE__ */ jsxs("p", {
				className: "marginalia",
				children: [
					"Der Versand läuft derzeit über die ",
					/* @__PURE__ */ jsx("code", { children: "MAIL_DSN" }),
					" auf dem Host. Sobald hier ein Server eingetragen und gespeichert ist, gilt diese Einstellung — die ",
					/* @__PURE__ */ jsx("code", { children: ".env" }),
					" ",
					"bleibt nur noch Rückfallebene."
				]
			}) : null,
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
				children: [
					/* @__PURE__ */ jsxs("label", {
						className: "block",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-sm",
							children: "SMTP-Server"
						}), /* @__PURE__ */ jsx("input", {
							className: "field-boxed",
							type: "text",
							value: host,
							onChange: (e) => setHost(e.target.value),
							placeholder: "smtp.example.net",
							autoComplete: "off"
						})]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "block",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-sm",
							children: "Port"
						}), /* @__PURE__ */ jsx("input", {
							className: "field-boxed",
							type: "number",
							min: "1",
							max: "65535",
							value: port,
							onChange: (e) => setPort(e.target.value),
							placeholder: DEFAULTS$1.port
						})]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "block",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-sm",
							children: "Verschlüsselung"
						}), /* @__PURE__ */ jsxs("select", {
							className: "field-boxed",
							value: security,
							onChange: (e) => setSecurity(e.target.value),
							children: [
								/* @__PURE__ */ jsx("option", {
									value: "tls",
									children: "STARTTLS (Port 587)"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "ssl",
									children: "SSL/TLS (Port 465)"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "none",
									children: "Keine"
								})
							]
						})]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "block",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-sm",
							children: "Benutzername"
						}), /* @__PURE__ */ jsx("input", {
							className: "field-boxed",
							type: "text",
							value: user,
							onChange: (e) => setUser(e.target.value),
							placeholder: "no-reply@example.net",
							autoComplete: "off"
						})]
					})
				]
			}),
			/* @__PURE__ */ jsxs("label", {
				className: "block",
				children: [/* @__PURE__ */ jsxs("span", {
					className: "text-sm",
					children: ["Passwort ", /* @__PURE__ */ jsxs("em", {
						className: "opacity-60",
						children: [
							"(",
							passwordHint,
							")"
						]
					})]
				}), /* @__PURE__ */ jsx("input", {
					className: "field-boxed",
					type: "password",
					value: password,
					onChange: (e) => setPassword(e.target.value),
					placeholder: "leer = bestehendes Passwort behalten",
					autoComplete: "new-password"
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
				children: [/* @__PURE__ */ jsxs("label", {
					className: "block",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-sm",
						children: "Absenderadresse"
					}), /* @__PURE__ */ jsx("input", {
						className: "field-boxed",
						type: "email",
						value: fromEmail,
						onChange: (e) => setFromEmail(e.target.value),
						placeholder: DEFAULTS$1.from_email
					})]
				}), /* @__PURE__ */ jsxs("label", {
					className: "block",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-sm",
						children: "Absendername"
					}), /* @__PURE__ */ jsx("input", {
						className: "field-boxed",
						type: "text",
						value: fromName,
						onChange: (e) => setFromName(e.target.value),
						placeholder: DEFAULTS$1.from_name
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("label", {
				className: "block",
				children: [/* @__PURE__ */ jsxs("span", {
					className: "text-sm",
					children: ["Eigener DSN ", /* @__PURE__ */ jsxs("em", {
						className: "opacity-60",
						children: [
							"(",
							dsnHint,
							")"
						]
					})]
				}), /* @__PURE__ */ jsx("input", {
					className: "field-boxed",
					type: "password",
					value: dsn,
					onChange: (e) => setDsn(e.target.value),
					placeholder: "optional, z. B. sendmail://default",
					autoComplete: "off"
				})]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "marginalia",
				children: "Ein eigener DSN übersteuert die Felder oben und ist nur für Transporte gedacht, die das Formular nicht abbildet. Er kann das Passwort enthalten und wird deshalb wie ein Geheimnis behandelt."
			}),
			/* @__PURE__ */ jsx("div", {
				className: "tds-toolbar",
				children: /* @__PURE__ */ jsx("button", {
					type: "button",
					className: "btn btn-primary",
					onClick: () => void save(),
					disabled: busy,
					children: busy ? /* @__PURE__ */ jsx(Spinner, { size: "sm" }) : "Speichern"
				})
			}),
			/* @__PURE__ */ jsx("hr", {}),
			/* @__PURE__ */ jsx("h3", {
				className: "text-sm",
				children: "Testmail"
			}),
			/* @__PURE__ */ jsx(FormAlert, { message: testError }),
			/* @__PURE__ */ jsxs("div", {
				className: "tds-toolbar",
				children: [/* @__PURE__ */ jsxs("label", {
					className: "block",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-sm",
						children: "Empfänger"
					}), /* @__PURE__ */ jsx("input", {
						className: "field-boxed",
						type: "email",
						value: testTo,
						onChange: (e) => setTestTo(e.target.value),
						placeholder: "leer = eigene Adresse"
					})]
				}), /* @__PURE__ */ jsx("button", {
					type: "button",
					className: "btn btn-ghost",
					onClick: () => void sendTest(),
					disabled: testing || !status?.configured,
					children: testing ? /* @__PURE__ */ jsx(Spinner, { size: "sm" }) : "Testmail senden"
				})]
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "marginalia",
				children: [
					"Der Test verwendet die ",
					/* @__PURE__ */ jsx("strong", { children: "gespeicherte" }),
					" Konfiguration — vorher speichern. Erfolg heißt: der SMTP-Server hat die Mail angenommen."
				]
			})
		]
	});
}
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-ext-billing/islands/BillingSettings.tsx
var api$2 = apiFetch;
var NS$2 = "/admin/settings/billing";
/**
* Stripe settings — secret key + webhook secret + default currency + payment
* term, in the core runtime settings store (admin-only). Secrets come back masked
* (configured + last4); a blank secret on save keeps the existing value.
*/
function BillingSettings() {
	const [loaded, setLoaded] = useState(false);
	const [keyState, setKeyState] = useState(null);
	const [whState, setWhState] = useState(null);
	const [keyInput, setKeyInput] = useState("");
	const [whInput, setWhInput] = useState("");
	const [currency, setCurrency] = useState("EUR");
	const [days, setDays] = useState("14");
	const [status, setStatus] = useState(null);
	const [busy, setBusy] = useState(false);
	const load = async () => {
		const res = await api$2(NS$2).catch(() => null);
		if (res === null) {
			setStatus("Einstellungen konnten nicht geladen werden — die API ist nicht erreichbar.");
			setLoaded(true);
			return;
		}
		if (!res.ok) {
			setStatus(res.status === 403 || res.status === 401 ? "Nur für Administratoren." : `Fehler (HTTP ${res.status}).`);
			setLoaded(true);
			return;
		}
		const d = await res.json();
		const map = new Map((d.settings ?? []).map((s) => [s.key, s]));
		setKeyState(map.get("stripe_secret_key") ?? null);
		setWhState(map.get("stripe_webhook_secret") ?? null);
		setCurrency(map.get("default_currency")?.value || "EUR");
		setDays(map.get("days_until_due")?.value || "14");
		setLoaded(true);
	};
	useEffect(() => {
		load();
	}, []);
	const save = async () => {
		setBusy(true);
		setStatus(null);
		const settings = [
			{
				key: "stripe_secret_key",
				secret: true,
				value: keyInput.trim()
			},
			{
				key: "stripe_webhook_secret",
				secret: true,
				value: whInput.trim()
			},
			{
				key: "default_currency",
				secret: false,
				value: currency.trim().toUpperCase()
			},
			{
				key: "days_until_due",
				secret: false,
				value: days.trim()
			}
		];
		const res = await api$2(NS$2, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ settings })
		}).catch(() => null);
		setBusy(false);
		if (res === null) {
			toast.danger("Speichern fehlgeschlagen — die API ist nicht erreichbar.");
			return;
		}
		if (res.ok) {
			setKeyInput("");
			setWhInput("");
			toast.success("Gespeichert.");
			load();
		} else toast.danger(`Speichern fehlgeschlagen (HTTP ${res.status}).`);
	};
	const hint = (s) => s?.configured ? `konfiguriert (…${s.last4 ?? "????"})` : "nicht konfiguriert";
	if (!loaded) return /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Spinner, {}) });
	return /* @__PURE__ */ jsxs("div", {
		className: "billing-settings space-y-4",
		children: [
			/* @__PURE__ */ jsxs("label", {
				className: "block",
				children: [/* @__PURE__ */ jsxs("span", {
					className: "text-sm",
					children: ["Stripe Secret Key ", /* @__PURE__ */ jsxs("em", {
						className: "opacity-60",
						children: [
							"(",
							hint(keyState),
							")"
						]
					})]
				}), /* @__PURE__ */ jsx("input", {
					className: "field-boxed",
					type: "password",
					value: keyInput,
					onChange: (e) => setKeyInput(e.target.value),
					placeholder: "sk_… (leer = behalten)",
					autoComplete: "off"
				})]
			}),
			/* @__PURE__ */ jsxs("label", {
				className: "block",
				children: [/* @__PURE__ */ jsxs("span", {
					className: "text-sm",
					children: ["Webhook Secret ", /* @__PURE__ */ jsxs("em", {
						className: "opacity-60",
						children: [
							"(",
							hint(whState),
							")"
						]
					})]
				}), /* @__PURE__ */ jsx("input", {
					className: "field-boxed",
					type: "password",
					value: whInput,
					onChange: (e) => setWhInput(e.target.value),
					placeholder: "whsec_… (leer = behalten)",
					autoComplete: "off"
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
				children: [/* @__PURE__ */ jsxs("label", {
					className: "block",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-sm",
						children: "Standard-Währung"
					}), /* @__PURE__ */ jsx("input", {
						className: "field-boxed",
						type: "text",
						maxLength: 3,
						value: currency,
						onChange: (e) => setCurrency(e.target.value),
						placeholder: "EUR"
					})]
				}), /* @__PURE__ */ jsxs("label", {
					className: "block",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-sm",
						children: "Zahlungsziel (Tage)"
					}), /* @__PURE__ */ jsx("input", {
						className: "field-boxed",
						type: "number",
						min: "0",
						value: days,
						onChange: (e) => setDays(e.target.value),
						placeholder: "14"
					})]
				})]
			}),
			status ? /* @__PURE__ */ jsx("p", {
				className: "tds-alert tds-alert--danger",
				role: "alert",
				children: status
			}) : null,
			/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "btn btn-primary",
				onClick: save,
				disabled: busy,
				"aria-busy": busy,
				children: "Speichern"
			})
		]
	});
}
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-ext-billing/islands/Settings.astro
var $$Settings$2 = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<div class="tds-settings-section__body"><h3>Stripe / Rechnungen</h3>${renderComponent($$result, "BillingSettings", BillingSettings, {
		"client:visible": true,
		"client:component-hydration": "visible",
		"client:component-path": "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-ext-billing/islands/BillingSettings.tsx",
		"client:component-export": "default"
	})}</div>`;
}, "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-ext-billing/islands/Settings.astro", void 0);
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-ext-support-tickets/islands/NotificationSettings.tsx
var LABELS = {
	notify_admin_on_new: "Admin bei neuem Ticket benachrichtigen",
	notify_customer_on_status: "Kunde bei Statusänderung benachrichtigen",
	notify_customer_on_reply: "Kunde bei Antwort benachrichtigen"
};
var api$1 = apiFetch;
/**
* Admin notification toggles (checkpoint-4). Reads/writes
* /admin/ticket-settings. Emails also require the core Mailer (MAIL_DSN) + a
* recipient, so a toggle on with no SMTP simply no-ops.
*/
function NotificationSettings() {
	const [toggles, setToggles] = useState(null);
	const [saving, setSaving] = useState(false);
	useEffect(() => {
		api$1("/admin/ticket-settings").then((r) => r.ok ? r.json() : { settings: {} }).then((d) => setToggles(d.settings ?? {})).catch(() => setToggles({}));
	}, []);
	/**
	* The toggle flips optimistically, so the response MUST be checked: this
	* used to `await` the PUT and discard it, which meant a 403 or a 500 left
	* the checkbox showing a setting that was never stored. On failure the
	* optimistic flip is rolled back and the reason is toasted.
	*/
	const save = async (next) => {
		const previous = toggles;
		setToggles(next);
		setSaving(true);
		try {
			const res = await api$1("/admin/ticket-settings", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(next)
			});
			if (res.ok) toast.success("Benachrichtigungen gespeichert.");
			else {
				setToggles(previous);
				toast.danger(`Speichern fehlgeschlagen (HTTP ${res.status}).`);
			}
		} catch {
			setToggles(previous);
			toast.danger("Speichern fehlgeschlagen — die API ist nicht erreichbar.");
		} finally {
			setSaving(false);
		}
	};
	if (toggles === null) return /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Spinner, {}) });
	return /* @__PURE__ */ jsx("fieldset", {
		className: "ticket-settings",
		disabled: saving,
		children: Object.keys(LABELS).map((key) => /* @__PURE__ */ jsxs("label", {
			className: "tds-toggle-row",
			children: [/* @__PURE__ */ jsx("span", { children: LABELS[key] }), /* @__PURE__ */ jsx("input", {
				type: "checkbox",
				checked: Boolean(toggles[key]),
				onChange: (e) => save({
					...toggles,
					[key]: e.target.checked
				})
			})]
		}, key))
	});
}
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-ext-support-tickets/islands/ImapSettings.tsx
var api = apiFetch;
var NS$1 = "/admin/settings/support-tickets";
var STATUS = "/admin/tickets/imap";
var TEST = "/admin/tickets/imap-test";
var POLL = "/admin/tickets/ingest";
/** Coded defaults, mirrored from the API's `ImapConfig`. */
var DEFAULTS = {
	port: "993",
	security: "ssl",
	folder: "INBOX",
	mode: "reply"
};
var MODES = [
	{
		value: "off",
		label: "Aus",
		hint: "Das Postfach wird nicht abgerufen."
	},
	{
		value: "reply",
		label: "Nur Antworten auf bestehende Tickets",
		hint: "Antworten landen am passenden Ticket. Mails ohne Bezug werden verworfen."
	},
	{
		value: "allowlist",
		label: "Neue Tickets nur von erlaubten Absendern",
		hint: "Zusätzlich zu Antworten: Mails der unten gelisteten Adressen und Domains öffnen ein neues Ticket."
	},
	{
		value: "all",
		label: "Neue Tickets von allen Absendern",
		hint: "Jede unbekannte Mail wird zu einem Ticket — auch Spam. Nur für ein Postfach sinnvoll, das ausschließlich Support-Mails empfängt."
	}
];
/**
* *E-Mail-Eingang (IMAP)* — the mailbox the support system reads, and the rule
* that decides what an incoming mail becomes.
*
* Two reads, because they answer different questions: the settings namespace
* holds what is *stored* (and is what this form edits), while
* `GET /admin/tickets/imap` reports what the ingest actually *uses* — including
* a mailbox that still comes from the host's `IMAP_*`. Showing only the former
* would present an empty form on a host whose ingest works, and the first "fix"
* would overwrite a working mailbox.
*
* The password and the ingest token are secrets: they come back masked and a
* blank field on save keeps the stored value, so neither round-trips through
* the browser.
*
* Two actions sit below the form because saving is neither connecting nor
* fetching: IMAP fails on things no form can validate (wrong port, refused
* login, a folder that does not exist), and the poll is the whole point — on a
* host with no cron, "Jetzt abrufen" is how mail becomes tickets at all until
* an external scheduler calls the token-gated route.
*/
function ImapSettings() {
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(null);
	const [status, setStatus] = useState(null);
	const [host, setHost] = useState("");
	const [port, setPort] = useState(DEFAULTS.port);
	const [security, setSecurity] = useState(DEFAULTS.security);
	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");
	const [passwordState, setPasswordState] = useState(null);
	const [folder, setFolder] = useState(DEFAULTS.folder);
	const [mode, setMode] = useState(DEFAULTS.mode);
	const [allowlist, setAllowlist] = useState("");
	const [matchCompany, setMatchCompany] = useState(true);
	const [token, setToken] = useState("");
	const [tokenState, setTokenState] = useState(null);
	const [actionError, setActionError] = useState(null);
	const [busy, setBusy] = useState(false);
	const [testing, setTesting] = useState(false);
	const [polling, setPolling] = useState(false);
	const load = async () => {
		try {
			const [settingsRes, statusRes] = await Promise.all([api(NS$1), api(STATUS)]);
			if (!settingsRes.ok) {
				setError(settingsRes.status === 401 || settingsRes.status === 403 ? "Nur für Administratoren." : `Einstellungen konnten nicht geladen werden (HTTP ${settingsRes.status}).`);
				setLoaded(true);
				return;
			}
			const data = await settingsRes.json();
			const map = new Map((data.settings ?? []).map((s) => [s.key, s]));
			setHost(map.get("imap_host")?.value ?? "");
			setPort(map.get("imap_port")?.value || DEFAULTS.port);
			setSecurity(map.get("imap_security")?.value || DEFAULTS.security);
			setUser(map.get("imap_user")?.value ?? "");
			setPasswordState(map.get("imap_password") ?? null);
			setFolder(map.get("imap_folder")?.value || DEFAULTS.folder);
			setMode(map.get("ingest_mode")?.value || DEFAULTS.mode);
			setAllowlist(map.get("ingest_allowlist")?.value ?? "");
			setMatchCompany(map.get("ingest_match_company")?.value !== "0");
			setTokenState(map.get("ingest_token") ?? null);
			setStatus(statusRes.ok ? await statusRes.json() : null);
			setError(null);
		} catch {
			setError("Einstellungen konnten nicht geladen werden — die API ist nicht erreichbar.");
		} finally {
			setLoaded(true);
		}
	};
	useEffect(() => {
		load();
	}, []);
	const save = async () => {
		setBusy(true);
		try {
			const res = await api(NS$1, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ settings: [
					{
						key: "imap_host",
						secret: false,
						value: host.trim()
					},
					{
						key: "imap_port",
						secret: false,
						value: port.trim()
					},
					{
						key: "imap_security",
						secret: false,
						value: security
					},
					{
						key: "imap_user",
						secret: false,
						value: user.trim()
					},
					{
						key: "imap_password",
						secret: true,
						value: password
					},
					{
						key: "imap_folder",
						secret: false,
						value: folder.trim()
					},
					{
						key: "ingest_mode",
						secret: false,
						value: mode
					},
					{
						key: "ingest_allowlist",
						secret: false,
						value: allowlist.trim()
					},
					{
						key: "ingest_match_company",
						secret: false,
						value: matchCompany ? "1" : "0"
					},
					{
						key: "ingest_token",
						secret: true,
						value: token
					}
				] })
			});
			if (res.ok) {
				setPassword("");
				setToken("");
				toast.success("Gespeichert.");
				load();
			} else toast.danger(`Speichern fehlgeschlagen (HTTP ${res.status}).`);
		} catch {
			toast.danger("Speichern fehlgeschlagen — die API ist nicht erreichbar.");
		} finally {
			setBusy(false);
		}
	};
	const test = async () => {
		setTesting(true);
		setActionError(null);
		try {
			const res = await api(TEST);
			const data = await res.json().catch(() => null);
			if (res.ok && data?.ok) toast.success("Verbindung steht.");
			else setActionError(data?.error ? `Verbindung fehlgeschlagen (HTTP ${res.status}): ${data.error}` : `Verbindung fehlgeschlagen (HTTP ${res.status}).`);
		} catch {
			setActionError("Verbindung fehlgeschlagen — die API ist nicht erreichbar.");
		} finally {
			setTesting(false);
		}
	};
	const pollNow = async () => {
		setPolling(true);
		setActionError(null);
		try {
			const res = await api(POLL, { method: "POST" });
			const data = await res.json().catch(() => null);
			if (!res.ok || !data) {
				setActionError(data?.error ? `Abruf fehlgeschlagen (HTTP ${res.status}): ${data.error}` : `Abruf fehlgeschlagen (HTTP ${res.status}).`);
				return;
			}
			if (!data.polled) {
				setActionError(data.mode === "off" ? "Kein Abruf: Die Annahme steht auf „Aus“." : "Kein Abruf: Es ist kein Postfach hinterlegt.");
				return;
			}
			toast.success(`${data.processed} Mail(s) gelesen — ${data.created} neu, ${data.appended} angehängt, ${data.skipped} übersprungen.`);
			window.dispatchEvent(new CustomEvent("tds:notification"));
		} catch {
			setActionError("Abruf fehlgeschlagen — die API ist nicht erreichbar.");
		} finally {
			setPolling(false);
		}
	};
	const secretHint = (s, verb) => s?.configured ? `hinterlegt (…${s.last4 ?? "????"})` : verb;
	const sourceLabel = () => {
		if (!status) return {
			text: "Status unbekannt",
			variant: "warning"
		};
		if (!status.configured) return {
			text: "Kein Postfach eingerichtet",
			variant: "danger"
		};
		if (!status.polling) return {
			text: "Postfach eingerichtet, Annahme aus",
			variant: "warning"
		};
		return status.source === "env" ? {
			text: "Aktiv über IMAP_* aus der .env des Hosts",
			variant: "warning"
		} : {
			text: "Aktiv über diese Einstellungen",
			variant: "success"
		};
	};
	if (!loaded) return /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Spinner, {}) });
	const state = sourceLabel();
	const activeMode = MODES.find((m) => m.value === mode);
	return /* @__PURE__ */ jsxs("div", {
		className: "tds-stack",
		children: [
			/* @__PURE__ */ jsx(FormAlert, { message: error }),
			/* @__PURE__ */ jsxs("p", {
				className: "tds-row",
				children: [/* @__PURE__ */ jsx("span", {
					className: `status-pill status-pill--${state.variant}`,
					children: state.text
				}), status?.configured ? /* @__PURE__ */ jsxs("span", {
					className: "marginalia",
					children: [
						status.user,
						" @ ",
						status.host,
						":",
						status.port,
						" (",
						status.folder,
						")"
					]
				}) : null]
			}),
			status?.source === "env" ? /* @__PURE__ */ jsxs("p", {
				className: "marginalia",
				children: [
					"Der Abruf läuft derzeit über ",
					/* @__PURE__ */ jsx("code", { children: "IMAP_*" }),
					" aus der ",
					/* @__PURE__ */ jsx("code", { children: ".env" }),
					" des Hosts. Sobald hier ein Postfach eingetragen und gespeichert ist, gilt diese Einstellung — die",
					" ",
					/* @__PURE__ */ jsx("code", { children: ".env" }),
					" bleibt nur noch Rückfallebene."
				]
			}) : null,
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
				children: [
					/* @__PURE__ */ jsxs("label", {
						className: "block",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-sm",
							children: "IMAP-Server"
						}), /* @__PURE__ */ jsx("input", {
							className: "field-boxed",
							type: "text",
							value: host,
							onChange: (e) => setHost(e.target.value),
							placeholder: "imap.example.net",
							autoComplete: "off"
						})]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "block",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-sm",
							children: "Port"
						}), /* @__PURE__ */ jsx("input", {
							className: "field-boxed",
							type: "number",
							min: "1",
							max: "65535",
							value: port,
							onChange: (e) => setPort(e.target.value),
							placeholder: DEFAULTS.port
						})]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "block",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-sm",
							children: "Verschlüsselung"
						}), /* @__PURE__ */ jsxs("select", {
							className: "field-boxed",
							value: security,
							onChange: (e) => setSecurity(e.target.value),
							children: [
								/* @__PURE__ */ jsx("option", {
									value: "ssl",
									children: "SSL/TLS (Port 993)"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "tls",
									children: "STARTTLS (Port 143)"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "none",
									children: "Keine"
								})
							]
						})]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "block",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-sm",
							children: "Ordner"
						}), /* @__PURE__ */ jsx("input", {
							className: "field-boxed",
							type: "text",
							value: folder,
							onChange: (e) => setFolder(e.target.value),
							placeholder: DEFAULTS.folder,
							autoComplete: "off"
						})]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "block",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-sm",
							children: "Benutzername"
						}), /* @__PURE__ */ jsx("input", {
							className: "field-boxed",
							type: "text",
							value: user,
							onChange: (e) => setUser(e.target.value),
							placeholder: "support@example.net",
							autoComplete: "off"
						})]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "block",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "text-sm",
							children: ["Passwort ", /* @__PURE__ */ jsxs("em", {
								className: "opacity-60",
								children: [
									"(",
									secretHint(passwordState, "nicht hinterlegt"),
									")"
								]
							})]
						}), /* @__PURE__ */ jsx("input", {
							className: "field-boxed",
							type: "password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							placeholder: "leer = bestehendes Passwort behalten",
							autoComplete: "new-password"
						})]
					})
				]
			}),
			/* @__PURE__ */ jsx("hr", {}),
			/* @__PURE__ */ jsx("h3", {
				className: "text-sm",
				children: "Annahme eingehender Mails"
			}),
			/* @__PURE__ */ jsxs("label", {
				className: "block",
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-sm",
					children: "Regel"
				}), /* @__PURE__ */ jsx("select", {
					className: "field-boxed",
					value: mode,
					onChange: (e) => setMode(e.target.value),
					children: MODES.map((m) => /* @__PURE__ */ jsx("option", {
						value: m.value,
						children: m.label
					}, m.value))
				})]
			}),
			activeMode ? /* @__PURE__ */ jsx("p", {
				className: "marginalia",
				children: activeMode.hint
			}) : null,
			mode === "allowlist" ? /* @__PURE__ */ jsxs("label", {
				className: "block",
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-sm",
					children: "Erlaubte Absender"
				}), /* @__PURE__ */ jsx("textarea", {
					className: "field-boxed",
					rows: 4,
					value: allowlist,
					onChange: (e) => setAllowlist(e.target.value),
					placeholder: "chef@kunde.de\n@partner.de"
				})]
			}) : null,
			mode === "allowlist" ? /* @__PURE__ */ jsxs("p", {
				className: "marginalia",
				children: [
					"Eine Adresse oder eine ganze Domain je Zeile (Komma geht auch). ",
					/* @__PURE__ */ jsx("code", { children: "@partner.de" }),
					" ",
					"und ",
					/* @__PURE__ */ jsx("code", { children: "partner.de" }),
					" bedeuten dasselbe und schließen Subdomains ein."
				]
			}) : null,
			/* @__PURE__ */ jsxs("label", {
				className: "tds-toggle-row",
				children: [/* @__PURE__ */ jsx("span", { children: "Absender einer bekannten Firma zuordnen" }), /* @__PURE__ */ jsx("input", {
					type: "checkbox",
					checked: matchCompany,
					onChange: (e) => setMatchCompany(e.target.checked)
				})]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "marginalia",
				children: "Stimmt die Absenderadresse mit der E-Mail einer Firma im Firmenverzeichnis überein, wird das Ticket dieser Firma zugeordnet und ist damit auch in deren Portal sichtbar. Sonst bleibt es ein reines Verwaltungs-Ticket."
			}),
			/* @__PURE__ */ jsxs("label", {
				className: "block",
				children: [/* @__PURE__ */ jsxs("span", {
					className: "text-sm",
					children: ["Ingest-Token ", /* @__PURE__ */ jsxs("em", {
						className: "opacity-60",
						children: [
							"(",
							secretHint(tokenState, "nicht gesetzt"),
							")"
						]
					})]
				}), /* @__PURE__ */ jsx("input", {
					className: "field-boxed",
					type: "password",
					value: token,
					onChange: (e) => setToken(e.target.value),
					placeholder: "leer = bestehendes Token behalten",
					autoComplete: "off"
				})]
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "marginalia",
				children: [
					"Nur nötig, wenn ein externer Zeitplan (z. B. ein Cron-Dienst) den Abruf regelmäßig anstoßen soll: ",
					/* @__PURE__ */ jsx("code", { children: "POST /tickets/ingest?token=…" }),
					". Ohne Token ist diese Route abgeschaltet; „Jetzt abrufen\" unten funktioniert davon unabhängig. Dasselbe Token schützt den Kontaktformular-Eingang."
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "tds-toolbar",
				children: /* @__PURE__ */ jsx("button", {
					type: "button",
					className: "btn btn-primary",
					onClick: () => void save(),
					disabled: busy,
					children: busy ? /* @__PURE__ */ jsx(Spinner, { size: "sm" }) : "Speichern"
				})
			}),
			/* @__PURE__ */ jsx("hr", {}),
			/* @__PURE__ */ jsx(FormAlert, { message: actionError }),
			/* @__PURE__ */ jsxs("div", {
				className: "tds-toolbar",
				children: [/* @__PURE__ */ jsx("button", {
					type: "button",
					className: "btn btn-ghost",
					onClick: () => void test(),
					disabled: testing || !status?.configured,
					children: testing ? /* @__PURE__ */ jsx(Spinner, { size: "sm" }) : "Verbindung testen"
				}), /* @__PURE__ */ jsx("button", {
					type: "button",
					className: "btn btn-ghost",
					onClick: () => void pollNow(),
					disabled: polling || !status?.configured,
					children: polling ? /* @__PURE__ */ jsx(Spinner, { size: "sm" }) : "Jetzt abrufen"
				})]
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "marginalia",
				children: [
					"Beide Aktionen verwenden die ",
					/* @__PURE__ */ jsx("strong", { children: "gespeicherte" }),
					" Konfiguration — vorher speichern. Abgerufen werden ungelesene Mails (max. 50 je Durchgang); verarbeitete Mails werden als gelesen markiert."
				]
			})
		]
	});
}
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-ext-support-tickets/islands/Settings.astro
var $$Settings$1 = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<div class="tds-settings-section__body tds-stack"><h3>E-Mail-Benachrichtigungen</h3>${renderComponent($$result, "NotificationSettings", NotificationSettings, {
		"client:visible": true,
		"client:component-hydration": "visible",
		"client:component-path": "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-ext-support-tickets/islands/NotificationSettings.tsx",
		"client:component-export": "default"
	})}<h3>E-Mail-Eingang (IMAP)</h3>${renderComponent($$result, "ImapSettings", ImapSettings, {
		"client:visible": true,
		"client:component-hydration": "visible",
		"client:component-path": "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-ext-support-tickets/islands/ImapSettings.tsx",
		"client:component-export": "default"
	})}</div>`;
}, "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-ext-support-tickets/islands/Settings.astro", void 0);
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-ext-shop/islands/ShopSettings.tsx
var NS = "/admin/settings/shop";
/**
* TDShop settings — the Amazon Product Advertising credentials.
*
* Persisted in the core's runtime settings store (admin-only), so they live in
* the database rather than in `.env` and can be changed without a deploy.
* Secrets come back **masked** (`configured` + `last4`) and a blank secret on
* save keeps the stored value — the raw key never round-trips to the browser.
*
* The module reads them DB-first with an env fallback, and treats all three of
* key/secret/tag as one unit: with any of them missing the sync is simply off,
* rather than half-configured and failing every call with a signature error
* that reads like a code bug.
*/
function ShopSettings() {
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(null);
	const [busy, setBusy] = useState(false);
	const [accessState, setAccessState] = useState(null);
	const [secretState, setSecretState] = useState(null);
	const [accessInput, setAccessInput] = useState("");
	const [secretInput, setSecretInput] = useState("");
	const [partnerTag, setPartnerTag] = useState("");
	const [marketplace, setMarketplace] = useState("www.amazon.de");
	const [stripeKeyState, setStripeKeyState] = useState(null);
	const [stripeHookState, setStripeHookState] = useState(null);
	const [stripeKeyInput, setStripeKeyInput] = useState("");
	const [stripeHookInput, setStripeHookInput] = useState("");
	const [ppSecretState, setPpSecretState] = useState(null);
	const [ppClientId, setPpClientId] = useState("");
	const [ppSecretInput, setPpSecretInput] = useState("");
	const [ppWebhookId, setPpWebhookId] = useState("");
	const [ppSandbox, setPpSandbox] = useState(false);
	const [weroKeyState, setWeroKeyState] = useState(null);
	const [weroHookState, setWeroHookState] = useState(null);
	const [weroPsp, setWeroPsp] = useState("");
	const [weroKeyInput, setWeroKeyInput] = useState("");
	const [weroHookInput, setWeroHookInput] = useState("");
	const [shipFlat, setShipFlat] = useState("");
	const [shipFreeFrom, setShipFreeFrom] = useState("");
	const load = async () => {
		try {
			const res = await apiFetch(NS);
			if (!res.ok) {
				setError(res.status === 401 || res.status === 403 ? "Nur für Administratoren." : `Einstellungen konnten nicht geladen werden (HTTP ${res.status}).`);
				setLoaded(true);
				return;
			}
			const data = await res.json();
			const map = new Map((data.settings ?? []).map((s) => [s.key, s]));
			setAccessState(map.get("amazon_access_key") ?? null);
			setSecretState(map.get("amazon_secret_key") ?? null);
			setPartnerTag(map.get("amazon_partner_tag")?.value ?? "");
			setMarketplace(map.get("amazon_marketplace")?.value ?? "www.amazon.de");
			setStripeKeyState(map.get("stripe_secret_key") ?? null);
			setStripeHookState(map.get("stripe_webhook_secret") ?? null);
			setPpSecretState(map.get("paypal_secret") ?? null);
			setPpClientId(map.get("paypal_client_id")?.value ?? "");
			setPpWebhookId(map.get("paypal_webhook_id")?.value ?? "");
			setPpSandbox((map.get("paypal_sandbox")?.value ?? "") !== "");
			setWeroKeyState(map.get("wero_api_key") ?? null);
			setWeroHookState(map.get("wero_webhook_secret") ?? null);
			setWeroPsp(map.get("wero_psp")?.value ?? "");
			setShipFlat(map.get("shipping_flat_cents")?.value ?? "");
			setShipFreeFrom(map.get("shipping_free_from_cents")?.value ?? "");
			setError(null);
		} catch {
			setError("Keine Verbindung zur API.");
		} finally {
			setLoaded(true);
		}
	};
	useEffect(() => {
		load();
	}, []);
	const save = async () => {
		setBusy(true);
		try {
			const settings = [
				{
					key: "amazon_access_key",
					secret: true,
					value: accessInput.trim()
				},
				{
					key: "amazon_secret_key",
					secret: true,
					value: secretInput.trim()
				},
				{
					key: "amazon_partner_tag",
					secret: false,
					value: partnerTag.trim()
				},
				{
					key: "amazon_marketplace",
					secret: false,
					value: marketplace.trim()
				},
				{
					key: "stripe_secret_key",
					secret: true,
					value: stripeKeyInput.trim()
				},
				{
					key: "stripe_webhook_secret",
					secret: true,
					value: stripeHookInput.trim()
				},
				{
					key: "paypal_client_id",
					secret: false,
					value: ppClientId.trim()
				},
				{
					key: "paypal_secret",
					secret: true,
					value: ppSecretInput.trim()
				},
				{
					key: "paypal_webhook_id",
					secret: false,
					value: ppWebhookId.trim()
				},
				{
					key: "paypal_sandbox",
					secret: false,
					value: ppSandbox ? "1" : ""
				},
				{
					key: "wero_psp",
					secret: false,
					value: weroPsp.trim()
				},
				{
					key: "wero_api_key",
					secret: true,
					value: weroKeyInput.trim()
				},
				{
					key: "wero_webhook_secret",
					secret: true,
					value: weroHookInput.trim()
				},
				{
					key: "shipping_flat_cents",
					secret: false,
					value: shipFlat.trim()
				},
				{
					key: "shipping_free_from_cents",
					secret: false,
					value: shipFreeFrom.trim()
				}
			];
			const res = await apiFetch(NS, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ settings })
			});
			if (!res.ok) {
				toast$1.danger(`Speichern fehlgeschlagen (HTTP ${res.status}).`);
				return;
			}
			setAccessInput("");
			setSecretInput("");
			setStripeKeyInput("");
			setStripeHookInput("");
			setPpSecretInput("");
			setWeroKeyInput("");
			setWeroHookInput("");
			toast$1.success("Gespeichert.");
			await load();
		} catch {
			toast$1.danger("Speichern fehlgeschlagen — keine Verbindung zur API.");
		} finally {
			setBusy(false);
		}
	};
	const hint = (s) => s?.configured ? `konfiguriert (…${s.last4 ?? "????"})` : "nicht konfiguriert";
	if (!loaded) return /* @__PURE__ */ jsx(Spinner, {});
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		error ? /* @__PURE__ */ jsx("div", {
			className: "tds-alert tds-alert--danger",
			children: error
		}) : null,
		/* @__PURE__ */ jsx("div", {
			className: "tds-alert tds-alert--info",
			children: "Ohne diese drei Angaben ist der Angebotsabgleich aus. Der Katalog funktioniert trotzdem — Affiliate-Links sind nicht die API. Nur Preise verschwinden dann nach 24 Stunden von selbst aus der Anzeige, weil sie laut Lizenz nicht länger gezeigt werden dürfen."
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "tds-field-row",
			children: [/* @__PURE__ */ jsxs("label", { children: [
				"Access Key ",
				/* @__PURE__ */ jsxs("em", { children: [
					"(",
					hint(accessState),
					")"
				] }),
				/* @__PURE__ */ jsx("input", {
					className: "field-boxed",
					type: "password",
					autoComplete: "off",
					value: accessInput,
					onChange: (e) => setAccessInput(e.target.value),
					placeholder: "leer lassen = unverändert"
				})
			] }), /* @__PURE__ */ jsxs("label", { children: [
				"Secret Key ",
				/* @__PURE__ */ jsxs("em", { children: [
					"(",
					hint(secretState),
					")"
				] }),
				/* @__PURE__ */ jsx("input", {
					className: "field-boxed",
					type: "password",
					autoComplete: "off",
					value: secretInput,
					onChange: (e) => setSecretInput(e.target.value),
					placeholder: "leer lassen = unverändert"
				})
			] })]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "tds-field-row",
			children: [/* @__PURE__ */ jsxs("label", { children: ["Partner-Tag", /* @__PURE__ */ jsx("input", {
				className: "field-boxed",
				value: partnerTag,
				onChange: (e) => setPartnerTag(e.target.value),
				placeholder: "tds-21"
			})] }), /* @__PURE__ */ jsxs("label", { children: ["Marktplatz", /* @__PURE__ */ jsx("input", {
				className: "field-boxed",
				value: marketplace,
				onChange: (e) => setMarketplace(e.target.value)
			})] })]
		}),
		/* @__PURE__ */ jsx("h3", { children: "Stripe" }),
		/* @__PURE__ */ jsxs("div", {
			className: "tds-alert tds-alert--info",
			children: [
				"Für den Verkauf eigener Leistungen. Ohne diese beiden Schlüssel ist der Kauf aus — der Katalog bleibt davon unberührt. Das Webhook-Secret ist kein Nice-to-have: fehlt es, weist der Webhook ",
				/* @__PURE__ */ jsx("strong", { children: "jede" }),
				" ",
				"Anfrage ab, statt irgendeinen POST als Zahlung zu akzeptieren."
			]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "tds-field-row",
			children: [/* @__PURE__ */ jsxs("label", { children: [
				"Secret Key ",
				/* @__PURE__ */ jsxs("em", { children: [
					"(",
					hint(stripeKeyState),
					")"
				] }),
				/* @__PURE__ */ jsx("input", {
					className: "field-boxed",
					type: "password",
					autoComplete: "off",
					value: stripeKeyInput,
					onChange: (e) => setStripeKeyInput(e.target.value),
					placeholder: "leer lassen = unverändert"
				})
			] }), /* @__PURE__ */ jsxs("label", { children: [
				"Webhook-Secret ",
				/* @__PURE__ */ jsxs("em", { children: [
					"(",
					hint(stripeHookState),
					")"
				] }),
				/* @__PURE__ */ jsx("input", {
					className: "field-boxed",
					type: "password",
					autoComplete: "off",
					value: stripeHookInput,
					onChange: (e) => setStripeHookInput(e.target.value),
					placeholder: "whsec_…"
				})
			] })]
		}),
		/* @__PURE__ */ jsx("h3", { children: "PayPal" }),
		/* @__PURE__ */ jsxs("div", {
			className: "tds-alert tds-alert--info",
			children: [
				"Direkt über Orders v2, nicht über einen zweiten Dienstleister. Die Webhook-ID gehört zu den Zugangsdaten und ist keine Formalität: ohne sie lässt sich ein Ereignis nicht prüfen, und eine Zahlungsart, die eine Zahlung starten, aber nie bestätigen kann, wird deshalb gar nicht erst angeboten. Webhook-Adresse:",
				" ",
				/* @__PURE__ */ jsx("code", { children: "/shop/payment/paypal/webhook" })
			]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "tds-field-row",
			children: [/* @__PURE__ */ jsxs("label", { children: ["Client-ID", /* @__PURE__ */ jsx("input", {
				className: "field-boxed",
				value: ppClientId,
				onChange: (e) => setPpClientId(e.target.value),
				placeholder: "leer = PayPal aus"
			})] }), /* @__PURE__ */ jsxs("label", { children: [
				"Secret ",
				/* @__PURE__ */ jsxs("em", { children: [
					"(",
					hint(ppSecretState),
					")"
				] }),
				/* @__PURE__ */ jsx("input", {
					className: "field-boxed",
					type: "password",
					autoComplete: "off",
					value: ppSecretInput,
					onChange: (e) => setPpSecretInput(e.target.value),
					placeholder: "leer lassen = unverändert"
				})
			] })]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "tds-field-row",
			children: [/* @__PURE__ */ jsxs("label", { children: ["Webhook-ID", /* @__PURE__ */ jsx("input", {
				className: "field-boxed",
				value: ppWebhookId,
				onChange: (e) => setPpWebhookId(e.target.value),
				placeholder: "WH-…"
			})] }), /* @__PURE__ */ jsxs("label", {
				className: "tds-toggle-row",
				children: [/* @__PURE__ */ jsx("input", {
					type: "checkbox",
					checked: ppSandbox,
					onChange: (e) => setPpSandbox(e.target.checked)
				}), "Sandbox statt Live"]
			})]
		}),
		/* @__PURE__ */ jsx("h3", { children: "Wero" }),
		/* @__PURE__ */ jsxs("div", {
			className: "tds-alert tds-alert--warning",
			children: [
				"Noch nicht angeschlossen. Wero läuft über einen Zahlungsdienstleister, und solange hier keiner eingetragen ist, erscheint die Zahlungsart in der Kasse überhaupt nicht — sie lässt sich also nicht versehentlich anbieten. Was zum Fertigstellen fehlt, steht in",
				" ",
				/* @__PURE__ */ jsx("code", { children: "docs/wero-adapter.md" }),
				"."
			]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "tds-field-row",
			children: [/* @__PURE__ */ jsxs("label", { children: ["Dienstleister", /* @__PURE__ */ jsx("input", {
				className: "field-boxed",
				value: weroPsp,
				onChange: (e) => setWeroPsp(e.target.value),
				placeholder: "leer = Wero aus"
			})] }), /* @__PURE__ */ jsxs("label", { children: [
				"API-Schlüssel ",
				/* @__PURE__ */ jsxs("em", { children: [
					"(",
					hint(weroKeyState),
					")"
				] }),
				/* @__PURE__ */ jsx("input", {
					className: "field-boxed",
					type: "password",
					autoComplete: "off",
					value: weroKeyInput,
					onChange: (e) => setWeroKeyInput(e.target.value),
					placeholder: "leer lassen = unverändert"
				})
			] })]
		}),
		/* @__PURE__ */ jsx("div", {
			className: "tds-field-row",
			children: /* @__PURE__ */ jsxs("label", { children: [
				"Webhook-Secret ",
				/* @__PURE__ */ jsxs("em", { children: [
					"(",
					hint(weroHookState),
					")"
				] }),
				/* @__PURE__ */ jsx("input", {
					className: "field-boxed",
					type: "password",
					autoComplete: "off",
					value: weroHookInput,
					onChange: (e) => setWeroHookInput(e.target.value),
					placeholder: "leer lassen = unverändert"
				})
			] })
		}),
		/* @__PURE__ */ jsx("h3", { children: "Versand" }),
		/* @__PURE__ */ jsxs("div", {
			className: "tds-alert tds-alert--info",
			children: [
				"Gilt nur für Bestellungen mit körperlicher Ware; ein Warenkorb aus reinen Leistungen wird nie mit Versand belastet und fragt auch keine Lieferanschrift ab. Beträge in ",
				/* @__PURE__ */ jsx("strong", { children: "Cent" }),
				", netto — die Steuer kommt oben drauf, und zwar mit dem Satz der gelieferten Ware, bei gemischten Sätzen anteilig aufgeteilt (Abschn. 3.10 UStAE). 0 als Pauschale heißt versandkostenfrei."
			]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "tds-field-row",
			children: [/* @__PURE__ */ jsxs("label", { children: ["Pauschale (Cent, netto)", /* @__PURE__ */ jsx("input", {
				className: "field-boxed",
				inputMode: "numeric",
				value: shipFlat,
				onChange: (e) => setShipFlat(e.target.value),
				placeholder: "495"
			})] }), /* @__PURE__ */ jsxs("label", { children: ["Versandfrei ab (Cent, netto)", /* @__PURE__ */ jsx("input", {
				className: "field-boxed",
				inputMode: "numeric",
				value: shipFreeFrom,
				onChange: (e) => setShipFreeFrom(e.target.value),
				placeholder: "0 = keine Grenze"
			})] })]
		}),
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
	] });
}
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-ext-shop/islands/Settings.astro
var $$Settings = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<div class="tds-settings-section__body">${renderComponent($$result, "ShopSettings", ShopSettings, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-ext-shop/islands/ShopSettings.tsx",
		"client:component-export": "default"
	})}</div>`;
}, "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-ext-shop/islands/Settings.astro", void 0);
//#endregion
//#region \0virtual:frontend-settings
var settings = [
	{
		"id": "billing",
		"label": "Stripe / Rechnungen",
		"island": "@tracht-digital-solutions/tds-ext-billing/islands/Settings.astro",
		"order": 10,
		Component: $$Settings$2
	},
	{
		"id": "support-tickets",
		"label": "Support-Tickets",
		"island": "@tracht-digital-solutions/tds-ext-support-tickets/islands/Settings.astro",
		"order": 30,
		Component: $$Settings$1
	},
	{
		"id": "shop",
		"label": "TDShop",
		"island": "@tracht-digital-solutions/tds-ext-shop/islands/Settings.astro",
		"order": 55,
		Component: $$Settings
	}
];
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-core-frontend/src/pages/einstellungen.astro
var einstellungen_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Einstellungen,
	file: () => $$file,
	url: () => $$url
});
var $$Einstellungen = createComponent(($$result, $$props, $$slots) => {
	const showAdminSettings = FRONTEND_TARGET === "admin";
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Einstellungen" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="tds-page"><div class="tds-page__head"><div><p class="tds-page__eyebrow">Konfiguration</p><h1 class="tds-page__title">Einstellungen</h1></div></div>${settings.length === 0 && !showAdminSettings ? renderTemplate`<p class="tds-empty">Keine Einstellungen verfügbar.</p>` : null}<div class="settings-list flex flex-col gap-6">${showAdminSettings ? renderTemplate`<section class="tds-settings-section" data-settings="mail"><h2 class="tds-settings-section__title">E-Mail (SMTP)</h2>${renderComponent($$result, "MailSettings", MailSettings, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-core-frontend/src/components/MailSettings.tsx",
		"client:component-export": "default"
	})}</section>` : null}${showAdminSettings ? renderTemplate`<section class="tds-settings-section" data-settings="cors"><h2 class="tds-settings-section__title">CORS / Freigegebene Origins</h2>${renderComponent($$result, "CorsSettings", CorsSettings, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-core-frontend/src/components/CorsSettings.tsx",
		"client:component-export": "default"
	})}</section>` : null}${settings.map((panel) => {
		const Panel = panel.Component;
		return renderTemplate`<section class="tds-settings-section"${addAttribute(panel.id, "data-settings")}><h2 class="tds-settings-section__title">${panel.label}</h2>${renderComponent($$result, "Panel", Panel, {})}</section>`;
	})}</div></section>` })}`;
}, "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-core-frontend/src/pages/einstellungen.astro", void 0);
var $$file = "/home/runner/work/tds-customer-frontend/tds-customer-frontend/node_modules/@tracht-digital-solutions/tds-core-frontend/src/pages/einstellungen.astro";
var $$url = "/einstellungen";
//#endregion
//#region \0virtual:astro:page:node_modules/@tracht-digital-solutions/tds-core-frontend/src/pages/einstellungen@_@astro
var page = () => einstellungen_exports;
//#endregion
export { page };
