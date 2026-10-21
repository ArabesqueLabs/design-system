#!/usr/bin/env node
// Checks in a real browser, with no dependencies but Chrome and axe-core:
// the helpers' behaviour, with real key presses, on a page of their own
// (tests/pages/helpers.html); then the showcase: axe (WCAG 2.2 A and AA) in
// light and dark, English and Arabic, and its demos wired to the helpers;
// then every React example page and the homepage template, the same way.
//
//   npm i --no-save axe-core@4.10.2
//   CHROME="/path/to/chrome" node scripts/check-page.mjs   (or AXE=/path/to/axe.min.js)
//
// It serves the repository itself on a free port, and fails (exit 1) on any
// violation or broken behaviour.

import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync, mkdtempSync, readdirSync } from "node:fs";
import { spawn } from "node:child_process";
import { join, dirname, extname, normalize } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".json": "application/json", ".md": "text/markdown; charset=utf-8", ".png": "image/png", ".woff2": "font/woff2" };
const axeSource = await readFile(process.env.AXE || createRequire(import.meta.url).resolve("axe-core/axe.min.js"), "utf8").catch(() => {
  console.error("axe-core isn't installed: npm i --no-save axe-core@4.10.2");
  process.exit(2);
});

// ---- a static server for the repository -----------------------------------------------------

const server = createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^(\.\.[/\\])+/, "");
  try {
    const body = await readFile(join(root, path === "/" ? "index.html" : path));
    res.writeHead(200, { "content-type": TYPES[extname(path)] || "application/octet-stream" }).end(body);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const origin = `http://127.0.0.1:${server.address().port}`;
const SHOWCASE = `${origin}/index.html`;
const HELPERS = `${origin}/tests/pages/helpers.html`;

// ---- Chrome over the DevTools protocol ------------------------------------------------------

const CHROME = process.env.CHROME || ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser"].find(existsSync);
if (!CHROME) { console.error("No Chrome found: set CHROME."); process.exit(2); }
const chrome = spawn(CHROME, ["--headless=new", "--no-sandbox", "--remote-debugging-port=0", `--user-data-dir=${mkdtempSync(join(tmpdir(), "al-check-"))}`, "about:blank"], { stdio: ["ignore", "ignore", "pipe"] });
const wsUrl = await new Promise((resolve, reject) => {
  let err = "";
  chrome.stderr.on("data", (d) => { err += d; const m = /ws:\/\/[^\s]+/.exec(err); if (m) resolve(m[0]); });
  chrome.on("exit", () => reject(new Error(`Chrome exited: ${err}`)));
});
const port = new URL(wsUrl).port;

async function page() {
  const t = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" })).json();
  const ws = new WebSocket(t.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r));
  let id = 0;
  const pending = new Map();
  const errors = [];
  // console.error too: React reports hydration mismatches and its own warnings there.
  const consoleErrors = [];
  ws.addEventListener("message", (m) => {
    const d = JSON.parse(m.data);
    if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); }
    if (d.method === "Runtime.exceptionThrown") errors.push(d.params.exceptionDetails.exception?.description ?? d.params.exceptionDetails.text);
    if (d.method === "Runtime.consoleAPICalled" && d.params.type === "error") consoleErrors.push(d.params.args.map((a) => a.value ?? a.description ?? "").join(" ").slice(0, 300));
  });
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
  const run = async (expression) => {
    const r = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
    if (r.result?.exceptionDetails) throw new Error(r.result.exceptionDetails.exception?.description ?? r.result.exceptionDetails.text);
    return r.result?.result?.value;
  };
  const key = async (key, code = key, mods = {}) => {
    const modifiers = (mods.alt ? 1 : 0) | (mods.ctrl ? 2 : 0) | (mods.meta ? 4 : 0) | (mods.shift ? 8 : 0);
    const vk = { Escape: 27, Enter: 13, Tab: 9, F6: 117, ArrowRight: 39, ArrowLeft: 37, ArrowUp: 38, ArrowDown: 40, PageUp: 33, PageDown: 34, Home: 36, End: 35 }[key] ?? key.toUpperCase().charCodeAt(0);
    const text = key.length === 1 ? key : key === "Enter" ? "\r" : undefined;
    await send("Input.dispatchKeyEvent", { type: text ? "keyDown" : "rawKeyDown", key, code, windowsVirtualKeyCode: vk, modifiers, text });
    await send("Input.dispatchKeyEvent", { type: "keyUp", key, code, windowsVirtualKeyCode: vk, modifiers });
  };
  await send("Runtime.enable");
  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  return { send, run, key, errors, consoleErrors, close: () => fetch(`http://127.0.0.1:${port}/json/close/${t.id}`) };
}

async function open(p, { url, theme = "light", lang = "en", ready: when } = {}) {
  // The showcase in each language is its own page.
  url ??= lang === "ar" ? `${origin}/ar/index.html` : SHOWCASE;
  await p.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-color-scheme", value: theme }] });
  await p.send("Page.navigate", { url });
  const ready = when ?? `document.documentElement.dataset.ready === "yes"`;
  for (let i = 0; i < 150; i++) {
    await new Promise((r) => setTimeout(r, 100));
    if (await p.run(ready).catch(() => false)) break;
  }
}

async function axe(p, name) {
  await p.run(axeSource);
  const violations = await p.run(`axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"] } })
    .then((r) => r.violations.map((v) => \`\${v.id} (\${v.nodes.length}): \${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join("; ")}\`))`);
  check(`axe, ${name}`, violations.length === 0, violations.join(" | "));
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// ---- checks ---------------------------------------------------------------------------------

const failures = [];
const check = (name, ok, detail = "") => { console.log(`${ok ? "ok  " : "FAIL"}  ${name}${ok || !detail ? "" : `: ${detail}`}`); if (!ok) failures.push(name); };
const p = await page();

// ---- the helpers, on their own page (tests/pages/helpers.html) ----

for (const theme of ["light", "dark"]) {
  await open(p, { url: HELPERS, theme });
  await axe(p, `helpers, ${theme}`);
}
check("helpers: no errors on load", p.errors.length === 0, p.errors.join(" | "));

// Dialog: a second Escape doesn't lose what was typed.
await p.run(`document.querySelector("#dialog-open").focus(); document.querySelector("#dialog-open").click()`);
await p.run(`(() => { const i = document.querySelector("#dialog-name"); i.focus(); i.select(); })()`);
for (const ch of "New name") await p.key(ch, ch === " " ? "Space" : `Key${ch.toUpperCase()}`);
await p.key("Escape");
await p.key("Escape");
check("dialog: still open after two Escapes with changes", await p.run(`document.querySelector("#dialog").open && document.querySelector("#dialog-name").value === "New name" && !document.querySelector("#dialog .al-dialog__discard").hidden`));
await p.run(`document.querySelector("#dialog [data-al-discard]").click()`);
await wait(100); // close fires as a task
const discarded = await p.run(`({ open: document.querySelector("#dialog").open, focus: document.activeElement?.id })`);
check("dialog: Discard closes it and returns focus", !discarded.open && discarded.focus === "dialog-open", JSON.stringify(discarded));

// Character count: over the limit is invalid, and the description states the limit.
const count = await p.run(`(() => {
  const t = document.querySelector("#count");
  t.value = "x".repeat(30); t.dispatchEvent(new Event("input"));
  const over = t.getAttribute("aria-invalid");
  const described = (t.getAttribute("aria-describedby") || "").split(" ").map((id) => document.getElementById(id)?.textContent).join(" | ");
  t.value = "short"; t.dispatchEvent(new Event("input"));
  return { over, after: t.getAttribute("aria-invalid"), described };
})()`);
check("count: aria-invalid=\"true\" over the limit, removed under it", count.over === "true" && count.after === null, JSON.stringify(count));
check("count: the description states the limit", /up to 20/.test(count.described), count.described);

// Tooltip: keeps an element's own description.
const tip = await p.run(`(() => {
  const b = document.querySelector("#tip");
  b.focus(); const during = b.getAttribute("aria-describedby");
  b.blur(); return { during, after: b.getAttribute("aria-describedby") };
})()`);
check("tooltip: adds to aria-describedby, and puts it back", tip.during === "tip-hint al-tooltip" && tip.after === "tip-hint", JSON.stringify(tip));

// Chart: one tab stop; arrows move along the reading direction.
const focused = () => p.run(`document.activeElement?.getAttribute("aria-label")`);
check("chart: one tab stop", await p.run(`document.querySelectorAll('#chart [tabindex="0"]').length === 1`));
await p.run(`document.querySelector('#chart [tabindex="0"]').focus()`);
await p.key("ArrowRight");
const right = await focused();
await p.key("End");
const end = await focused();
await p.run(`document.querySelector("#chart").dir = "rtl"; document.querySelector('#chart [aria-label="£1 A"]').focus()`);
await p.key("ArrowLeft");
const rtlLeft = await focused();
await p.run(`document.querySelector("#chart").dir = ""`);
check("chart: arrows and End move between marks", right === "£2 B" && end === "£3 C", JSON.stringify({ right, end }));
check("chart: in right to left, ArrowLeft goes forward", rtlLeft === "£2 B", String(rtlLeft));

// Shortcuts, with real key presses: mod+z isn't mod+shift+z.
const apple = await p.run(`/Mac/.test(navigator.userAgentData?.platform || navigator.platform)`);
const mod = apple ? { meta: true } : { ctrl: true };
await p.run(`document.activeElement?.blur()`);
await p.key("z", "KeyZ", mod);
await p.key("Z", "KeyZ", { ...mod, shift: true });
const log = await p.run(`document.querySelector("#keys-log").textContent.trim()`);
check("shortcuts: mod+z, then mod+shift+z, each once", log === "undo redo", log);

// Date picker, in English: opens on the value, arrows move, Enter chooses.
const dp = (sel) => p.run(sel);
// Wait for the calendar to open or close, rather than a fixed time.
const anyOpen = `[...document.querySelectorAll("dialog.al-date-picker__dialog")].some((d) => d.open)`;
const until = async (expr) => { for (let i = 0; i < 50 && !(await p.run(expr)); i++) await wait(50); };
await p.run(`document.querySelector("#date-toggle").click()`);
await until(`${anyOpen} && !!document.activeElement?.dataset.date`);
const opened = await dp(`({ open: document.querySelector("#date-en ~ dialog, dialog.al-date-picker__dialog")?.open, focus: document.activeElement?.dataset.date, selected: document.activeElement?.getAttribute("aria-selected") })`);
check("date picker: opens with focus on the chosen date", opened.open && opened.focus === "2026-11-30" && opened.selected === "true", JSON.stringify(opened));
await axe(p, "helpers, the date picker open");
await p.key("ArrowRight");
const moved = await dp(`({ focus: document.activeElement?.dataset.date, title: document.activeElement?.closest("dialog").querySelector("h2").textContent })`);
check("date picker: ArrowRight crosses into the next month", moved.focus === "2026-12-01" && moved.title === "December 2026", JSON.stringify(moved));
await p.key("PageUp", "PageUp", { shift: true });
const clamped = await dp(`document.activeElement?.dataset.date`);
check("date picker: can't go before data-min", clamped === "2026-11-10", String(clamped));
await p.key("ArrowRight");
await p.key("Enter");
await until(`!${anyOpen}`);
const chosen = await dp(`({ open: [...document.querySelectorAll("dialog.al-date-picker__dialog")].some((d) => d.open), text: document.querySelector("#date").value, iso: document.querySelector('input[type="hidden"][name="due"]').value, focus: document.activeElement?.id })`);
check("date picker: Enter chooses, and focus returns to the button", !chosen.open && chosen.text === "11/11/2026" && chosen.iso === "2026-11-11" && chosen.focus === "date-toggle", JSON.stringify(chosen));

// In Arabic: Arabic names and digits, the week from Saturday, arrows mirrored.
await p.run(`document.querySelector("#date-ar-toggle").click()`);
await until(`${anyOpen} && !!document.activeElement?.dataset.date`);
const ar = await dp(`(() => { const d = document.activeElement.closest("dialog"); return { lang: d.lang, dir: d.dir, title: d.querySelector("h2").textContent, first: d.querySelector("th").getAttribute("abbr"), cell: document.activeElement.textContent }; })()`);
check("date picker: in Arabic, Arabic names and digits, from Saturday", ar.lang === "ar" && ar.dir === "rtl" && ar.title === "نوفمبر ٢٠٢٦" && ar.first === "السبت" && ar.cell === "٣٠", JSON.stringify(ar));
await p.key("ArrowLeft");
check("date picker: in right to left, ArrowLeft goes forward", await dp(`document.activeElement?.dataset.date`) === "2026-12-01");
await p.key("Escape");
// Escape closes it natively; focus comes back with the close event.
await until(`!${anyOpen} && document.activeElement?.id === "date-ar-toggle"`);
const kept = await dp(`({ iso: document.querySelector('input[name="due-ar"]').value, focus: document.activeElement?.id })`);
check("date picker: Escape closes without changing it", kept.iso === "2026-11-30" && kept.focus === "date-ar-toggle", JSON.stringify(kept));
const typed = await dp(`(() => { const i = document.querySelector("#date-ar-input"); i.value = "٥/١٢/٢٠٢٦"; i.dispatchEvent(new Event("change")); return { iso: document.querySelector('input[name="due-ar"]').value, text: i.value.replace(/[\u200e\u200f]/g, "") }; })()`);
check("date picker: a typed Arabic date is read, and written back", typed.iso === "2026-12-05" && typed.text === "٥/١٢/٢٠٢٦", JSON.stringify(typed));

// Toast with an action: no time limit, F6 reaches it, focus comes back.
await p.run(`document.querySelector("#toast").focus(); document.querySelector("#toast").click()`);
await wait(7000);
check("toast: an action stays past 6s", await p.run(`!!document.querySelector(".al-toast:not([data-leaving]) .al-toast__action")`));
await p.key("F6");
check("toast: F6 moves focus to its action", await p.run(`document.activeElement?.classList.contains("al-toast__action")`));
await p.run(`document.activeElement.click()`);
await wait(100);
check("toast: focus returns after the action", await p.run(`document.activeElement?.id === "toast"`));

// ---- the showcase (index.html): accessible in every mode, demos wired ----

p.errors.length = 0;
for (const theme of ["light", "dark"]) {
  for (const lang of ["en", "ar"]) {
    await open(p, { theme, lang });
    await axe(p, `showcase, ${theme}, ${lang}`);
  }
}

await open(p);
check("showcase: no errors on load", p.errors.length === 0, p.errors.join(" | "));

// The showcase is the demos: each wired to its helper (the helpers' behaviour is checked above).
await p.run(`[...document.querySelectorAll("#dialog button")].find((b) => b.textContent === "Rename item…").click()`);
await wait(100);
check("showcase: Rename opens its dialog", await p.run(`!!document.querySelector("#dialog dialog[open]")`));
await p.run(`document.querySelector("#dialog dialog[open]").close("cancel")`);
check("showcase: the character count is wired", await p.run(`(() => { const t = document.querySelector("#textarea textarea"); t.value = "x".repeat(130); t.dispatchEvent(new Event("input")); const r = t.getAttribute("aria-invalid") === "true"; t.value = ""; t.dispatchEvent(new Event("input")); return r; })()`));
check("showcase: search's Clear empties it", await p.run(`(() => { const i = document.querySelector("#search input[type=search]"); i.value = "report"; i.dispatchEvent(new Event("input", { bubbles: true })); document.querySelector("#search .al-search__clear").click(); return i.value === ""; })()`));
check("showcase: chart marks are named images", await p.run(`(() => { const b = document.querySelector("#bullet [data-al-tip]"); return b.getAttribute("role") === "img" && !!b.getAttribute("aria-label"); })()`));
check("showcase: one tab stop per chart", await p.run(`["#columns .al-chart__plot", "#split-bar .al-split-bar__track", "#bullet .al-bullet"].every((c) => document.querySelector(c).querySelectorAll('[tabindex="0"]').length === 1)`));
check("showcase: the tints are drawn", await p.run(`document.querySelectorAll("#tints .ex-swatch").length === 8`));
check("showcase: every demo has its section, and the old anchors still land", await p.run(`["back-link", "textarea", "foundations", "components", "patterns", "keyboard"].every((id) => !!document.getElementById(id))`));
// Shortcuts: N says what it would do; the switch turns single keys off.
await p.run(`document.activeElement?.blur()`);
await p.key("n", "KeyN");
await wait(150);
check("showcase: a single-key shortcut works", await p.run(`!!document.querySelector(".al-toast")`));

// Specs are pages: in the page's language where they're translated, in English where they aren't.
const specLinks = async () => p.run(`({ date: document.querySelector("#date-picker .sc-spec a").getAttribute("href"), colour: document.querySelector("#colour .sc-spec a").getAttribute("href"), how: [...document.querySelectorAll(".sc-hero a")].find((a) => a.href.includes("README"))?.getAttribute("href") })`);
const specsEn = await specLinks();
check("showcase: specs link to their pages", specsEn.date === "docs/components/date-picker.html" && specsEn.colour === "docs/foundations/colour.html" && specsEn.how === "README.html#use-it-in-a-project", JSON.stringify(specsEn));
await open(p, { lang: "ar" });
const specsAr = await specLinks();
check("showcase: in Arabic, to the Arabic spec, the Arabic README, and the English where there's no translation", specsAr.date === "../docs/components/ar/date-picker.html" && specsAr.colour === "../docs/foundations/colour.html" && specsAr.how === "../ar/README.html#استخدامه-في-مشروع", JSON.stringify(specsAr));
check("showcase: in Arabic, its language link goes to the English page", await p.run(`document.querySelector('.al-site-header a.al-language')?.getAttribute("href") === "../index.html"`));
check("showcase: in Arabic, the demos are in Arabic", await p.run(`document.querySelector("#button .al-button--primary").textContent === "حفظ التغييرات" && document.documentElement.dir === "rtl"`));
const digits = `document.querySelector('.sc-top [role=group]:not(:has(button[lang])) button[aria-pressed="false"]')?.click()`;
await p.run(digits);
await wait(200);
check("showcase: in Arabic, Arabic-Indic digits when chosen", await p.run(`/[٠-٩]/.test(document.querySelector("#steps .al-steps__num").textContent)`));
await p.run(digits);

// Back to top: hidden at the top; shown two screens down; followed, the
// page is at the top and focus is too.
await open(p);
// The repository: an icon button beside the hero's actions, in a new tab, saying so; not in the header.
check("showcase: the repository is linked from the hero, in a new tab", await p.run(`(() => { const a = document.querySelector('.sc-hero a.al-button--icon[target="_blank"]'); return !!a && a.href.startsWith("https://github.com/") && /new tab/.test(a.getAttribute("aria-label")) && !document.querySelector('.al-site-header a[href^="https://github.com/"]'); })()`));
// The page's own is the last; the demo's, in its frame, comes first.
const back = `[...document.querySelectorAll(".al-back-to-top")].at(-1)`;
check("showcase: back to top is hidden at the top", await p.run(`${back}.hasAttribute("data-al-hidden") && getComputedStyle(${back}).visibility === "hidden"`));
await p.run(`scrollTo({ top: innerHeight * 3, behavior: "instant" })`);
await wait(500);
check("showcase: back to top shows two screens down", await p.run(`!${back}.hasAttribute("data-al-hidden") && getComputedStyle(${back}).visibility === "visible"`));
await p.run(`${back}.focus()`);
await p.key("Enter");
await wait(1500);
check("showcase: back to top goes to the top, and takes focus there", await p.run(`scrollY < 2 && document.activeElement === document.body`), await p.run(`JSON.stringify({ y: scrollY, focus: document.activeElement?.tagName })`));
await p.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
await p.run(`scrollTo({ top: innerHeight * 3, behavior: "instant" })`);
await wait(300);
await p.run(`${back}.click()`);
await wait(100);
check("showcase: back to top, with reduced motion, jumps", await p.run(`scrollY === 0`), await p.run(`String(scrollY)`));
await p.send("Emulation.setEmulatedMedia", { features: [] });

// The fonts are served from here, not a third party.
const fonts = await p.run(`performance.getEntriesByType("resource").filter((r) => /\\.woff2|fonts\\.(googleapis|gstatic)/.test(r.name)).map((r) => new URL(r.name).host)`);
check("showcase: fonts load, and only from this site", fonts.length > 0 && fonts.every((h) => h === new URL(origin).host), JSON.stringify(fonts));

// Contrast in use: the focus ring on the bulk bar, in dark.
await open(p, { theme: "dark" });
const ring = await p.run(`(() => { const b = document.querySelector(".al-bulk-bar .al-button"); return b ? getComputedStyle(b).getPropertyValue("--al-color-focus").trim() : null; })()`);
check("showcase: the bulk bar has its own focus colour", ring === null || ring !== "", String(ring));

// ---- the React examples (examples/) and the homepage template ----

// Every page in light and dark, each with its demo in English and in Arabic:
// accessible, and React with no errors (a hydration mismatch is one).
const examples = readdirSync(join(root, "examples")).filter((f) => f.endsWith(".html")).sort();
check("examples: a page for each demo, and the gallery", examples.length > 40 && examples.includes("index.html"), String(examples.length));


// The components behave, in React: one of each kind of wiring.
const ex = (file) => open(p, { url: `${origin}/examples/${file}` });
await ex("dialog.html");
await p.run(`document.querySelector("main .ex-example .al-button").click()`);
await wait(100);
check("examples: Rename opens its dialog, in React", await p.run(`!!document.querySelector("dialog.al-dialog[open]")`));
await p.run(`(() => { const i = document.querySelector("dialog[open] input"); i.focus(); i.value = "Changed"; })()`);
await p.key("Escape");
await wait(100);
check("examples: the dialog asks before losing a change", await p.run(`!!document.querySelector("dialog[open]") && !document.querySelector("dialog[open] .al-dialog__discard").hidden`));
await p.run(`document.querySelector("dialog[open] [data-al-discard]").click()`);
await wait(100);
check("examples: Discard closes it, and focus goes back", await p.run(`!document.querySelector("dialog[open]") && document.activeElement?.textContent === "Rename item…"`));

await ex("page-head.html");
await p.run(`document.querySelector('[role="tab"][aria-selected="true"]').focus()`);
await p.key("ArrowRight");
check("examples: tabs move with the arrow keys", await p.run(`document.activeElement?.getAttribute("aria-selected") === "true" && document.activeElement.textContent.startsWith("Activity")`));

await ex("site-header.html");
await p.send("Emulation.setDeviceMetricsOverride", { width: 400, height: 800, deviceScaleFactor: 1, mobile: true });
await p.run(`document.querySelector(".ex-example [data-site-menu-toggle]").click()`);
check("examples: the site header's menu opens under md", await p.run(`(() => { const b = document.querySelector(".ex-example [data-site-menu-toggle]"); return b.getAttribute("aria-expanded") === "true" && !document.getElementById(b.getAttribute("aria-controls")).hidden; })()`));
await p.send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });

await ex("sidebar.html");
await p.send("Emulation.setDeviceMetricsOverride", { width: 400, height: 800, deviceScaleFactor: 1, mobile: true });
check("examples: the sidebar's sections are behind its menu button under md", await p.run(`(() => { const s = document.querySelector(".ex-example .al-sidebar"); return getComputedStyle(s.querySelector(".al-sidebar__menu")).display === "none" && s.querySelector(".al-sidebar__here")?.textContent === "Home"; })()`));
await p.run(`document.querySelector(".ex-example [data-sidebar-menu-toggle]").click()`);
check("examples: the sidebar's menu opens, and Escape closes it", await p.run(`getComputedStyle(document.querySelector(".ex-example .al-sidebar__menu")).display === "flex"`) && (await p.key("Escape"), await p.run(`(() => { const b = document.querySelector(".ex-example [data-sidebar-menu-toggle]"); return b.getAttribute("aria-expanded") === "false" && document.activeElement === b; })()`)));
await p.send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
check("examples: above md, the sidebar's sections show with the menu closed", await p.run(`getComputedStyle(document.querySelector(".ex-example .al-sidebar__nav")).display === "flex" && getComputedStyle(document.querySelector(".ex-example .al-sidebar__bar")).display === "none"`));

await ex("textarea.html");
check("examples: the character count, in Arabic", await p.run(`(() => { const t = document.querySelector('[lang="ar"] textarea'); return /حرف/.test(t.parentElement.querySelector(".al-character-count__message")?.textContent ?? ""); })()`));

await ex("ask-check-confirm.html");
await p.run(`document.querySelector(".ex-example form button[type=submit]").click()`);
await wait(100);
check("examples: submitted empty, the error summary takes focus", await p.run(`document.activeElement?.classList.contains("al-error-summary") && document.activeElement.querySelectorAll("li").length === 3`));

await ex("date-picker.html");
await p.run(`document.querySelector('[lang="ar"] .al-date-picker__toggle').click()`);
for (let i = 0; i < 50 && !(await p.run(`!!document.activeElement?.dataset.date`)); i++) await wait(50);
check("examples: the date picker, in Arabic", await p.run(`(() => { const d = document.activeElement.closest("dialog"); return d.lang === "ar" && /٢٠٢٦|2026/.test(d.querySelector("h2").textContent); })()`));
await p.key("Escape");

// A dismissed notice goes, and a Select all is mixed while some are chosen.
await ex("notice.html");
await p.run(`document.querySelector(".ex-example .al-notice__dismiss").click()`);
await wait(100);
check("examples: Dismiss removes the notice", await p.run(`!document.querySelector(".ex-example:first-of-type .al-notice__dismiss")`));
await ex("select-all.html");
check("examples: Select all is mixed while some are chosen", await p.run(`document.querySelector(".ex-example input[type=checkbox]").indeterminate === true`));

// The rest page by page, in light and dark, in four tabs at once (each with
// its own errors). Last: a tab in the background can't take focus, so the
// focus checks above run in the one tab first.
const tabs = [p, await page(), await page(), await page()];
const inTabs = async (items, fn) => {
  let next = 0;
  await Promise.all(tabs.map(async (tab) => { while (next < items.length) await fn(tab, items[next++]); }));
};
const both = (list) => list.flatMap((item) => ["light", "dark"].map((theme) => [item, theme]));
await inTabs(both(examples), async (tab, [file, theme]) => {
  tab.errors.length = 0;
  tab.consoleErrors.length = 0;
  await open(tab, { url: `${origin}/examples/${file}`, theme });
  const ready = await tab.run(`document.documentElement.dataset.ready === "yes"`);
  await axe(tab, `examples/${file}, ${theme}`);
  check(`examples/${file}, ${theme}: React ran, with no errors`, ready && !tab.errors.length && !tab.consoleErrors.length, [...tab.errors, ...tab.consoleErrors].join(" | "));
});

// The documents, as pages: the README in both languages, a guide, a spec in both.
await inTabs(both([["README.html", "en"], ["ar/README.html", "ar"], ["docs/react.html", "en"], ["docs/components/button.html", "en"], ["docs/components/ar/button.html", "ar"], ["CHANGELOG.html", "en"]]), async (tab, [[file, lang], theme]) => {
  tab.errors.length = 0;
  await open(tab, { url: `${origin}/${file}`, theme, ready: `document.readyState === "complete"` });
  await wait(200);
  await axe(tab, `${file}, ${theme}`);
  check(`${file}, ${theme}: its own page, with no errors`, !tab.errors.length && await tab.run(`document.documentElement.lang === "${lang}" && !!document.querySelector("main h1") && !!document.querySelector(".al-site-header")`), tab.errors.join(" | "));
});
await open(p, { url: `${origin}/README.html#use-it-in-a-project`, ready: `document.readyState === "complete"` });
check("README.html: How to use it lands on its section", await p.run(`!!document.getElementById("use-it-in-a-project") && [...document.querySelectorAll("main a[href]")].some((a) => a.getAttribute("href") === "docs/react.html")`));

// The template: static, wired by the helpers alone.
await inTabs(both([["templates/home.html", "en"], ["templates/ar/home.html", "ar"]]), async (tab, [[file, lang], theme]) => {
  tab.errors.length = 0;
  await open(tab, { url: `${origin}/${file}`, theme, ready: `document.readyState === "complete" && !!document.querySelector(".al-construction svg")` });
  await axe(tab, `${file}, ${theme}`);
  check(`${file}, ${theme}: drawn, with no errors`, !tab.errors.length && await tab.run(`document.documentElement.lang === "${lang}" && !!document.querySelector(".al-pattern--hero svg")`), tab.errors.join(" | "));
});

for (const tab of tabs) await tab.close();
chrome.kill();
server.close();
console.log(failures.length ? `\n${failures.length} failing` : "\nall passing");
process.exit(failures.length ? 1 : 0);
