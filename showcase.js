// The showcase: renders the token specimens, wires the examples to the
// system's helpers, and switches English ↔ Arabic (with dir) and light ↔
// dark. Arabic is a catalogue keyed by each English text, as hunt does it.

import { setTheme, currentTheme } from "./js/theme.js";
import { toast } from "./js/toast.js";
import { openDialog } from "./js/dialog.js";
import { initCharacterCounts } from "./js/count.js";
import { initSearch } from "./js/search.js";
import { renderModifierKeys, onShortcut, setShortcutsEnabled, shortcutsEnabled } from "./js/keys.js";
import { initMenus } from "./js/menu.js";
import { initTabs } from "./js/tabs.js";
import { initTooltips } from "./js/tooltip.js";
import { drawPattern } from "./js/pattern.js";
import { formatMoney, formatNumber, formatPercent } from "./js/format.js";
import { validateOnSubmit } from "./js/validate.js";
import { initChartKeys } from "./js/chart.js";
import { initDatePickers } from "./js/datepicker.js";

const html = document.documentElement;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const el = (tag, attrs = {}, ...kids) => {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") e.className = v;
    else if (k === "style") e.style.cssText = v;
    else if (k.startsWith("on")) e.addEventListener(k.slice(2), v);
    else e.setAttribute(k, v);
  }
  e.append(...kids.flat().filter((x) => x != null));
  return e;
};
const icon = (name, cls = "") => {
  const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  s.setAttribute("class", `al-icon ${cls}`.trim());
  s.setAttribute("aria-hidden", "true");
  const u = document.createElementNS("http://www.w3.org/2000/svg", "use");
  u.setAttribute("href", `dist/icons.svg#al-icon-${name}`);
  s.append(u);
  return s;
};

// ---- Arabic ------------------------------------------------------------------------------

// Loaded with the Arabic (showcase-ar.js), only when it's needed.
let AR = {};
const loadArabic = async () => {
  if (!Object.keys(AR).length) AR = (await import("./showcase-ar.js")).default;
};
const original = new WeakMap();
const ATTRS = ["aria-label", "placeholder", "title", "data-al-tip"];
let lang = html.lang === "ar" ? "ar" : "en";
// Arabic's digits are a preference: Western (the default) or Arabic-Indic.
let numerals = "latn";
try { numerals = localStorage.getItem("al-showcase-numerals") === "arab" ? "arab" : "latn"; } catch {}
const INDIC = "٠١٢٣٤٥٦٧٨٩";
// Arabic-Indic digits don't carry "£" with them as Western digits do, so each amount is isolated.
const digits = (s) => (lang === "ar" && numerals === "arab" ? s.replace(/\d/g, (d) => INDIC[d]).replace(/(\d|[٠-٩]),(?=[\d٠-٩])/g, "$1٬").replace(/([٠-٩])\.(?=[٠-٩])/g, "$1٫").replace(/−?\p{Sc}[٠-٩٬٫]+/gu, "⁦$&⁩") : s);
const T = (s) => (lang === "ar" ? AR[s] ?? s : s);

/** Put the page in a language: text, attributes, lang and dir. */
function translate(root = document.body) {
  // Update company wordmark across the entire page
  for (const wm of root.querySelectorAll(".al-wordmark")) {
    if (lang === "ar") {
      wm.lang = "ar";
      wm.textContent = "معامل آرابيسك";
    } else {
      wm.lang = "en";
      wm.textContent = "Arabesque Labs";
    }
  }

  // Translate datalist options (like Group one, Group two, Group three)
  for (const opt of root.querySelectorAll("datalist option")) {
    if (!opt.dataset.alEnVal) opt.dataset.alEnVal = opt.value;
    const en = opt.dataset.alEnVal;
    opt.value = lang === "ar" ? AR[en] ?? en : en;
  }

  // Sample values in fields (data-t-value), while they're still the sample.
  for (const inp of root.querySelectorAll("[data-t-value]")) {
    if (!inp.dataset.alEnVal) inp.dataset.alEnVal = inp.value;
    const en = inp.dataset.alEnVal;
    if (inp.value === en || inp.value === AR[en]) inp.value = lang === "ar" ? AR[en] ?? en : en;
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (n.parentElement?.closest('.al-wordmark, [lang]:not(html), script, style, kbd, code') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
  });
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (!original.has(n)) original.set(n, n.textContent);
    const en = original.get(n);
    const key = en.trim();
    if (!key) continue;
    const text = lang === "ar" && AR[key] ? en.replace(key, AR[key]) : en;
    // Figures (in <bdi> or a numeric cell) take the chosen digits.
    const figure = n.parentElement.closest("bdi, .al-table__num, .al-stat__value") && !n.parentElement.closest("[data-numerals]");
    n.textContent = figure ? digits(text) : text;
  }
  for (const e of root.querySelectorAll(ATTRS.map((a) => `[${a}]`).join(","))) {
    if (e.closest('[lang="en"]:not(html)')) continue;
    for (const a of ATTRS) {
      if (!e.hasAttribute(a)) continue;
      // data-al-en-aria-label and so on: the English, kept to switch back.
      const k = `alEn${a.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase())}`;
      if (!e.dataset[k]) e.dataset[k] = e.getAttribute(a);
      const en = e.dataset[k];
      e.setAttribute(a, lang === "ar" ? AR[en] ?? en : en);
    }
  }
  document.title = T("Arabesque Labs design system");
}
async function setLanguage(next) {
  if (next === "ar") await loadArabic();
  lang = next;
  html.lang = next;
  html.dir = next === "ar" ? "rtl" : "ltr";
  try { localStorage.setItem("al-showcase-lang", next); } catch {}
  for (const b of $$("[data-lang]")) b.setAttribute("aria-pressed", String(b.dataset.lang === next));
  translate();
  drawType();
  drawCharts();
  redrawCounts();
  redrawDates();
}
let redrawCounts = () => {};
let redrawDates = () => {};

// ---- theme --------------------------------------------------------------------------------

const themeButton = $("[data-theme-toggle]");
const drawThemeButton = () => {
  const en = currentTheme() === "dark" ? "Switch to light theme" : "Switch to dark theme";
  themeButton.dataset["alEnAriaLabel"] = en;
  themeButton.setAttribute("aria-label", T(en));
};
themeButton.addEventListener("click", () => { setTheme(currentTheme() === "dark" ? "light" : "dark"); drawThemeButton(); });

// ---- specimens ----------------------------------------------------------------------------

const ROLES = [
  ["bg", "The page"], ["surface", "Cards, panels, inputs"], ["surface-sunk", "Wells, hover, info"],
  ["text", "Body text"], ["text-muted", "Secondary text"], ["line", "Hairlines"], ["control", "Control borders"],
  ["accent", "Actions, focus, success"], ["on-accent", "Text on accent"], ["danger", "Errors, destroying"],
  ["warning", "Needs attention"], ["info", "Information"], ["inverse", "Toasts, tooltips"],
  ["chart-1", "Chart, first series"], ["chart-2", "Chart, second series"], ["chart-3", "Chart, third series"], ["chart-4", "Chart, fourth series"],
];
$("[data-swatches]").append(...ROLES.map(([name, role]) => el("div", { class: "sc-swatch" },
  el("span", { class: "sc-swatch__chip", style: `background: var(--al-color-${name})` }),
  el("code", { class: "sc-swatch__name", lang: "en", dir: "ltr" }, `--al-color-${name}`),
  el("span", { class: "sc-swatch__role" }, role))));

// Google Fonts' sample sentence for each script (its "tester" text, from the
// Universal Declaration of Human Rights), so the faces read as they do there.
const SAMPLE = {
  en: "Whereas disregard and contempt for human rights have resulted",
  ar: "ولما كان تناسي حقوق الإنسان وازدراؤها قد أفضيا إلى أعمال همجية",
};
// Each row in the page's language: the English sentence, or the Arabic.
const typeRows = () => ["display", "3xl", "2xl", "xl", "lg", "md", "base", "sm", "xs"].map((step) => el("div", { class: "sc-type__row" },
  el("code", { lang: "en", dir: "ltr" }, step),
  el("span", { style: `font-size: var(--al-text-${step}); font-family: var(--al-font-${["display", "3xl", "2xl", "xl"].includes(step) ? "display" : step === "md" ? "serif" : "sans"})` },
    lang === "ar" ? el("span", { lang: "ar", dir: "rtl" }, SAMPLE.ar) : el("span", { lang: "en", dir: "ltr" }, SAMPLE.en))));
function drawType() { $("[data-type-scale]").replaceChildren(...typeRows()); }
drawType();

$("[data-space-scale]").append(...["1", "2", "3", "4", "5", "6", "8", "12", "16"].map((n) => el("div", { class: "sc-space__row" },
  el("code", { lang: "en", dir: "ltr" }, `--al-space-${n}`),
  el("span", { class: "sc-space__bar", style: `inline-size: var(--al-space-${n})` }))));

const ICONS = ["check", "close", "chevron", "arrow", "plus", "minus", "info", "success", "warning", "danger", "undo", "retry", "more", "search", "external", "edit", "trash", "menu", "sidebar", "theme", "calendar", "settings", "file", "board"];
const MIRRORED = new Set(["chevron", "arrow", "undo", "retry", "external", "sidebar"]);
$("[data-icons]").append(...ICONS.map((n) => el("li", {}, icon(n, MIRRORED.has(n) ? "al-mirror" : ""), el("span", { lang: "en" }, n))));

$("[data-motion-demo]").addEventListener("click", () => $("[data-motion-target]").classList.toggle("is-moved"));

// ---- brand --------------------------------------------------------------------------------

fetch("assets/brand/mark.svg").then((r) => r.text()).then((svg) => {
  const clean = svg.replace(/<title[^>]*>[\s\S]*?<\/title>|<desc[^>]*>[\s\S]*?<\/desc>/g, "").replace(/role="img"|aria-labelledby="[^"]*"/g, "").replace(/width="64" height="64"/, 'width="100%" height="100%" aria-hidden="true" focusable="false"');
  for (const m of $$('[data-brand="mark"]')) m.innerHTML = clean;
});
for (const p of $$("[data-pattern]")) drawPattern(p);

// ---- feedback examples ----------------------------------------------------------------------

// Toasts, with their Dismiss in the page's language.
const say = (message, options = {}) => toast(message, { dismissLabel: T("Dismiss"), ...options });

// Rename: a dialog that doesn't lose what was typed (js/dialog.js).
const renameDialog = $("#rename");
$('[data-dialog-open="rename"]').addEventListener("click", (e) => { translate(renameDialog); openDialog(renameDialog, { opener: e.currentTarget }); });

$("[data-toast]").addEventListener("click", () => say(T("Process archived"), { action: T("Undo"), onAction: () => say(T("Process restored")) }));
// Deleting asks for the word "delete" to be typed; until it matches, the
// dialog stays open with an error beside the field. Nothing is deleted.
const confirmDialog = $("#confirm");
const confirmOpener = $('[data-dialog-open="confirm"]');
const confirmInput = $("#confirm-word");
const confirmError = $("#confirm-word-error");
const resetConfirm = () => {
  confirmInput.value = "";
  confirmError.hidden = true;
  confirmInput.removeAttribute("aria-invalid");
  confirmInput.setAttribute("aria-describedby", "confirm-word-hint");
};
confirmOpener.addEventListener("click", () => { resetConfirm(); confirmDialog.showModal(); });
// Enter in the field means the action it's for, not the first button (Keep).
confirmInput.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" || e.isComposing) return;
  e.preventDefault();
  confirmDialog.querySelector("form").requestSubmit(confirmDialog.querySelector('button[value="delete"]'));
});
confirmDialog.querySelector("form").addEventListener("submit", (e) => {
  if (e.submitter?.value !== "delete") return;
  if (confirmInput.value.trim().toLocaleLowerCase() === T("delete")) return;
  e.preventDefault();
  confirmError.hidden = false;
  confirmInput.setAttribute("aria-invalid", "true");
  confirmInput.setAttribute("aria-describedby", "confirm-word-hint confirm-word-error");
  confirmInput.focus();
});
confirmDialog.addEventListener("close", () => {
  if (confirmDialog.returnValue === "delete") say(T("Account deleted (not really: this is an example)"));
  resetConfirm();
  confirmOpener.focus();
});

// The sidebar's collapse.
const shell = $("[data-sidebar-demo]");
$("[data-collapse]").addEventListener("click", (e) => {
  const collapsed = shell.dataset.sidebar !== "collapsed";
  if (collapsed) shell.dataset.sidebar = "collapsed"; else delete shell.dataset.sidebar;
  const b = e.currentTarget;
  b.setAttribute("aria-expanded", String(!collapsed));
  const label = b.querySelector(".al-sidebar__label");
  const en = collapsed ? "Expand sidebar" : "Collapse sidebar";
  label.textContent = T(en);
  original.set(label.firstChild, en);
  for (const a of $$(".al-sidebar__link", shell)) {
    const name = a.querySelector(".al-sidebar__label")?.textContent;
    if (collapsed && name) a.setAttribute("title", name); else a.removeAttribute("title");
  }
});

// Pending: unsaved → saving → saved, or failed with Retry; the figure stale meanwhile.
// The saved value is the baseline. Each edit makes a new revision; a save only
// marks "Saved" if nothing has changed since it started, so a slow save can't
// claim a newer edit. Discard goes back to the baseline; Undo brings back the
// exact draft that was discarded.
const state = $("[data-save-state]");
const amount = $("[data-pending-input]");
const figure = $("[data-stale-figure]");
const figureValue = $("[data-stale-value]");
const staleNote = $("[data-stale-note]");
const setState = (s, text) => {
  state.dataset.state = s;
  state.replaceChildren(document.createTextNode(T(text)));
  original.set(state.firstChild, text);
};
let baseline = amount.value;
let revision = 0;
let figureRequest = 0;
// A documented demo calculation, not a pricing rule: the amount over 12 months.
const parseAmount = (v) => Number(String(v).replace(/[^\d.]/g, "")) || 0;
// Kept in English with Western digits, as the page is written, so translate() can redo the digits.
const drawFigure = () => {
  const en = formatMoney(parseAmount(amount.value) * 12, "GBP");
  figureValue.textContent = digits(en);
  original.set(figureValue.firstChild, en);
};
const recalculate = () => {
  const id = ++figureRequest;
  figure.classList.add("al-stale");
  staleNote.hidden = false;
  setTimeout(() => {
    if (id !== figureRequest) return; // a newer input owns the figure now
    drawFigure();
    figure.classList.remove("al-stale");
    staleNote.hidden = true;
  }, 900);
};
const edited = () => {
  revision++;
  if (amount.value === baseline) setState("saved", "Saved"); else setState("unsaved", "Unsaved changes");
  recalculate();
};
amount.addEventListener("input", edited);
const save = (ok) => {
  const draft = amount.value;
  const rev = revision;
  setState("saving", "Saving…");
  setTimeout(() => {
    if (rev !== revision) return; // edited while saving: still unsaved
    if (ok) { baseline = draft; setState("saved", "Saved"); return; }
    setState("failed", "Couldn't save");
    state.append(" ", el("button", { type: "button", class: "al-button al-button--quiet al-button--sm", onclick: () => save(true) }, T("Retry")));
  }, 900);
};
$("[data-save]").addEventListener("click", () => save(true));
$("[data-save-fail]").addEventListener("click", () => save(false));
$("[data-discard]").addEventListener("click", () => {
  const draft = amount.value;
  if (draft === baseline) return;
  amount.value = baseline;
  edited();
  say(T("Changes discarded"), { action: T("Undo"), onAction: () => { amount.value = draft; edited(); } });
});

// Ask, check, confirm. Checked on submit, with an error summary; then the
// answers to check, each with Change; then a confirmation. Nothing is sent
// anywhere, and nothing goes into the address.
const flow = $("[data-flow]");
const ask = $("#ask", flow);
const steps = { ask, check: $('[data-step="check"]', flow), done: $('[data-step="done"]', flow) };
const show = (name, focus) => {
  for (const [k2, node] of Object.entries(steps)) node.hidden = k2 !== name;
  focus?.focus();
};
const contactValue = () => ask.querySelector('input[name="contact"]:checked')?.value ?? "";
validateOnSubmit(ask, [
  { field: "#ask-name", check: (v) => (v.trim() ? "" : T("Enter your full name")) },
  { field: "#ask-email", check: (v) => (!v.trim() ? T("Enter your email address") : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : T("Enter an email address in the correct format, like name@example.com")) },
  { field: "#ask-contact-email", check: () => (contactValue() ? "" : T("Choose how we should contact you")) },
], {
  title: () => T("There is a problem"),
  prefix: () => T("Error:"),
  onValid: () => {
    const answers = [
      ["Full name", $("#ask-name").value.trim(), "#ask-name"],
      ["Email address", $("#ask-email").value.trim(), "#ask-email"],
      ["How should we contact you?", T(contactValue()), "#ask-contact-email"],
    ];
    $("[data-answers]", flow).replaceChildren(...answers.map(([label, value, target]) => el("div", { class: "al-summary-list__row" },
      el("dt", { class: "al-summary-list__key" }, T(label)),
      el("dd", { class: "al-summary-list__value" }, el("bdi", {}, value)),
      el("dd", { class: "al-summary-list__actions" }, el("a", { href: target, onclick: (e) => {
        e.preventDefault();
        show("ask");
        (ask.querySelector('input[name="contact"]:checked') && target === "#ask-contact-email" ? ask.querySelector('input[name="contact"]:checked') : $(target)).focus();
      } }, T("Change"), el("span", { class: "al-visually-hidden" }, ` ${T(label).toLocaleLowerCase()}`))))));
    show("check", $("h4", steps.check));
  },
});
$("[data-send]", flow).addEventListener("click", (e) => {
  e.currentTarget.disabled = true; // no second request
  show("done", $(".al-confirmation", steps.done));
});
$("[data-restart]", flow).addEventListener("click", () => {
  ask.reset();
  $("[data-send]", flow).disabled = false;
  show("ask", $("#ask-name"));
});

// An optimistic archive: the row goes at once, with Undo; if the server
// says no, it comes back where it was, marked, with why and Retry.
const archive = (li, fails) => {
  const list = li.parentElement;
  const next = li.nextElementSibling;
  li.querySelector(".al-rollback-note")?.remove();
  li.classList.remove("al-rolled-back");
  // Focus doesn't go down with the row: it moves to the next row's action, or the one before.
  const neighbour = (next || li.previousElementSibling)?.querySelector("button");
  if (li.contains(document.activeElement)) (neighbour || list).focus();
  li.remove();
  const name = li.querySelector("span").textContent;
  if (!fails) {
    say(T("Archived {name}").replace("{name}", name), { action: T("Undo"), onAction: () => { list.insertBefore(li, next); li.querySelector("button")?.focus(); } });
    return;
  }
  setTimeout(() => {
    list.insertBefore(li, next);
    li.classList.add("al-rolled-back");
    const note = el("p", { class: "al-rollback-note", role: "alert" }, icon("danger", "al-icon--sm"),
      el("span", {}, T("Couldn't archive {name}: the server didn't answer. It's back where it was.").replace("{name}", name)),
      el("button", { type: "button", class: "al-button al-button--sm", onclick: () => archive(li, false) }, T("Retry")));
    li.append(note);
    note.querySelector("button").focus();
  }, 900);
};
for (const b of $$("[data-archive], [data-archive-fail]")) b.addEventListener("click", () => archive(b.closest("li"), b.hasAttribute("data-archive-fail")));

// ---- charts --------------------------------------------------------------------------------

// Amounts go into text and attributes, so they're isolated as strings
// (LRI … PDI, what <bdi> does in markup): with Arabic-Indic digits, "£"
// would otherwise drift to the far side of the number.
const iso = (s) => `\u2066${s}\u2069`;
const money = (v) => iso(formatMoney(v, "GBP", { lang, numerals }));
const k = (v) => iso(`£${formatNumber(Math.round(v / 1000), { lang, numerals })}k`);
// A mark: its series colour, and its value and what it is, as its name and its tooltip.
const mark = (cls, series, value, what, attrs = {}) => el("span", {
  class: cls, "data-series": series, role: "img", "aria-label": `${value} ${what}`, "data-al-tip": `${value}|${what}`, ...attrs,
});
function drawCharts() {
  // Columns: take-home a year for three offers, four years, against a target.
  const years = ["Year 1", "Year 2", "Year 3", "Year 4"];
  const series = [["Offer A", "1", [120900, 107600, 107600, 107600]], ["Offer B", "2", [92600, 92600, 92600, 92600]], ["Offer C", "3", [98000, 101000, 104000, 107000]]];
  const want = 84000;
  const top = 150000;
  const always = series.filter(([, , values]) => values.every((v) => v >= want)).length;
  $("[data-summary-columns]").textContent = T("{n} of {total} offers are at or above what you want, {want}, in every year.")
    .replace("{n}", formatNumber(always, { lang, numerals })).replace("{total}", formatNumber(series.length, { lang, numerals })).replace("{want}", money(want));
  const pc = (v) => `${(100 * v) / top}%`;
  const columns = el("div", { class: "al-chart" },
    el("div", { class: "al-chart__plot" },
      [0, 50000, 100000, 150000].map((v) => el("span", { class: "al-chart__grid", style: `inset-block-end: ${pc(v)}`, "aria-hidden": "true" }, el("span", {}, k(v)))),
      el("div", { class: "al-chart__slots" }, years.map((y, i) => el("div", { class: "al-chart__slot" },
        series.map(([name, c, values]) => mark("al-chart__bar", c, money(values[i]), `${T(name)}, ${T(y)}`, { style: `block-size: ${pc(values[i])}` }))))),
      el("span", { class: "al-chart__target", style: `inset-block-end: ${pc(want)}`, role: "img", "aria-label": `${money(want)} ${T("What you want")}`, "data-al-tip": `${money(want)}|${T("What you want")}` })),
    el("div", { class: "al-chart__axis", "aria-hidden": "true" }, years.map((y) => el("span", {}, digits(T(y))))),
    el("div", { class: "al-key" },
      series.map(([name, c]) => el("span", { class: "al-key__item" }, el("span", { class: "al-swatch", "data-series": c }), T(name))),
      el("span", { class: "al-key__item" }, el("span", { class: "al-swatch al-swatch--target" }), `${T("What you want")}: ${money(want)}`)));
  $("[data-chart-columns]").replaceChildren(columns);
  initChartKeys(columns.querySelector(".al-chart__plot"));

  // Split: where a year's pay goes. "Other" is a series too, so it has a colour of its own.
  const parts = [["Take-home pay", "1", 71597], ["Tax, NI and loans", "2", 36402], ["Your pension", "3", 5400], ["Other", "4", 1200]];
  const total = parts.reduce((a, p) => a + p[2], 0);
  const pct = (v) => formatPercent(v / total, { lang, numerals });
  const largest = parts.reduce((a, p) => (p[2] > a[2] ? p : a));
  $("[data-summary-split]").textContent = T("{part} is the largest part: {pct} of {total}.")
    .replace("{part}", T(largest[0])).replace("{pct}", pct(largest[2])).replace("{total}", money(total));
  const track = el("div", { class: "al-split-bar__track", role: "group", "aria-label": T("Where a year's pay goes") },
    parts.map(([n, c, v]) => mark("al-split-bar__part", c, `${money(v)} · ${pct(v)}`, T(n), { style: `inline-size: ${(100 * v) / total}%` })));
  $("[data-chart-split]").replaceChildren(el("div", { class: "al-split-bar" }, track,
    el("div", { class: "al-key" }, parts.map(([n, c, v]) => el("span", { class: "al-key__item" }, el("span", { class: "al-swatch", "data-series": c }), `${T(n)} `, el("b", {}, pct(v)))))));
  initChartKeys(track);

  // Bullet: each offer's take-home a month against what you want.
  const rows = [["Offer A", "1", 10075], ["Offer B", "2", 7718], ["Offer C", "3", 8167]];
  const target = 7000;
  const max = 12000;
  const above = rows.filter(([, , v]) => v >= target).length;
  const lowest = rows.reduce((a, r) => (r[2] < a[2] ? r : a));
  const gap = lowest[2] - target;
  $("[data-summary-bullet]").textContent = (above === rows.length ? T("All {total} are at or above what you want; the lowest, {name}, is {diff} more.") : T("{n} of {total} are at or above what you want; the lowest, {name}, is {diff} short."))
    .replace("{n}", formatNumber(above, { lang, numerals })).replace("{total}", formatNumber(rows.length, { lang, numerals })).replace("{name}", T(lowest[0])).replace("{diff}", iso(formatMoney(Math.abs(gap), "GBP", { lang, numerals })));
  const bullet = el("div", { class: "al-bullet" },
    rows.map(([n, c, v]) => {
      const diff = v - target;
      return el("div", { class: "al-bullet__row" },
        el("span", { class: "al-bullet__label" }, T(n)),
        el("span", { class: "al-bullet__track" },
          mark("al-bullet__bar", c, money(v), T(n), { style: `inline-size: ${(100 * v) / max}%` }),
          el("span", { class: "al-bullet__target", style: `inset-inline-start: ${(100 * target) / max}%` })),
        el("span", { class: "al-bullet__value" }, el("b", {}, money(v)), " ",
          el("span", { class: diff >= 0 ? "al-bullet__diff--more" : "al-bullet__diff--less" }, `${iso(`${diff >= 0 ? "+" : "−"}${formatMoney(Math.abs(diff), "GBP", { lang, numerals })}`)} ${T(diff >= 0 ? "more" : "short")}`)));
    }),
    el("div", { class: "al-key" }, el("span", { class: "al-key__item" }, el("span", { class: "al-swatch al-swatch--target" }), `${T("What you want")}: ${money(target)}`)));
  $("[data-chart-bullet]").replaceChildren(bullet);
  initChartKeys(bullet);
}

// ---- spec reader modal ---------------------------------------------------------------------

let markedParser = null;
async function loadMarked() {
  if (markedParser) return markedParser;
  try {
    const mod = await import("https://cdn.jsdelivr.net/npm/marked@15.0.12/lib/marked.esm.js");
    markedParser = mod.marked;
    return markedParser;
  } catch {
    return null;
  }
}

function initSpecReader() {
  const dialog = document.createElement("dialog");
  dialog.className = "al-dialog sc-spec-modal";
  dialog.id = "sc-spec-modal";
  dialog.setAttribute("aria-labelledby", "sc-spec-modal-title");
  dialog.innerHTML = `
    <div class="sc-spec-modal__head">
      <div class="sc-spec-modal__title-wrap">
        <h2 class="sc-spec-modal__title" id="sc-spec-modal-title" data-spec-title>Spec</h2>
        <span class="sc-spec-modal__path" data-spec-path></span>
      </div>
      <div class="al-cluster">
        <a href="#" target="_blank" class="al-button al-button--sm al-button--quiet" data-spec-raw>Raw</a>
        <button type="button" class="al-button al-button--sm" data-spec-close aria-label="Close">
          <svg class="al-icon al-icon--sm" aria-hidden="true"><use href="dist/icons.svg#al-icon-close"></use></svg>
          <span data-spec-close-text>Close</span>
        </button>
      </div>
    </div>
    <div class="sc-spec-modal__body" data-spec-body></div>
  `;
  document.body.appendChild(dialog);

  const titleEl = dialog.querySelector("[data-spec-title]");
  const pathEl = dialog.querySelector("[data-spec-path]");
  const rawBtn = dialog.querySelector("[data-spec-raw]");
  const closeBtn = dialog.querySelector("[data-spec-close]");
  const closeText = dialog.querySelector("[data-spec-close-text]");
  const bodyEl = dialog.querySelector("[data-spec-body]");

  let opener = null;
  closeBtn.addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => { opener?.focus?.(); opener = null; });

  // A click that wants the browser's own behaviour (a new tab, a download) is left to it.
  const browserClick = (e) => e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
  // A path relative to this page, whatever page linked to it.
  const fromPage = (u) => {
    const here = new URL(".", location.href);
    return u.origin === here.origin && u.pathname.startsWith(here.pathname) ? u.pathname.slice(here.pathname.length) : u.href;
  };

  // In Arabic, a document opens in Arabic where it's translated: a file's
  // translation is beside it, in ar/ (README.md → ar/README.md,
  // docs/components/button.md → docs/components/ar/button.md). Where there's
  // none, the English opens.
  const inLanguage = (path) => {
    if (lang !== "ar" || /(^|\/)ar\//.test(path) || /^[a-z]+:/.test(path)) return path;
    const at = path.lastIndexOf("/");
    return `${path.slice(0, at + 1)}ar/${path.slice(at + 1)}`;
  };

  async function openSpec(url, { fallback } = {}) {
    rawBtn.href = url;
    pathEl.textContent = url.replace(/^[./]+/, "");
    
    const fileBase = url.split("/").pop().replace(/\.md$/, "");
    const title = fileBase.charAt(0).toUpperCase() + fileBase.slice(1).replace(/-/g, " ");
    titleEl.textContent = T(title);
    
    rawBtn.textContent = T("Raw");
    closeText.textContent = T("Close");
    closeBtn.setAttribute("aria-label", T("Close"));

    bodyEl.innerHTML = `<p class="al-hint">${T("Loading spec…")}</p>`;
    if (!dialog.open) { opener = document.activeElement; dialog.showModal(); }

    try {
      const res = await fetch(url);
      if (!res.ok && fallback) return openSpec(fallback);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const md = await res.text();
      
      const parser = await loadMarked();
      // Without the parser (offline, say), the spec as plain text: still readable.
      const html = parser ? parser.parse(md) : `<pre class="sc-spec-modal__plain">${md.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</pre>`;
      bodyEl.innerHTML = html;
      // The spec is in its own language, whatever the page's (and the page's
      // translation passes it by).
      const arabic = /(^|\/)ar\/[^/]+\.md$/.test(url);
      bodyEl.lang = arabic ? "ar" : "en";
      bodyEl.dir = arabic ? "rtl" : "ltr";
      // Code that scrolls sideways must be reachable from the keyboard.
      for (const pre of bodyEl.querySelectorAll("pre")) { pre.tabIndex = 0; pre.setAttribute("role", "region"); pre.setAttribute("aria-label", T("Code example")); }

      const h1 = bodyEl.querySelector("h1");
      if (h1 && h1.textContent.trim()) {
        titleEl.textContent = T(h1.textContent.trim());
      }

      for (const a of bodyEl.querySelectorAll("a")) {
        const href = a.getAttribute("href");
        if (!href) continue;
        if (href.endsWith(".md")) {
          a.addEventListener("click", (e) => {
            if (browserClick(e)) return;
            // Handled here, not again by the page's own spec links.
            e.preventDefault();
            e.stopPropagation();
            openSpec(fromPage(new URL(href, new URL(url, location.href))));
          });
        } else if (!href.startsWith("#") && !href.startsWith("http")) {
          a.setAttribute("target", "_blank");
        }
      }
    } catch {
      bodyEl.innerHTML = `<p class="al-badge al-badge--danger">${T("Couldn't load spec")}</p>`;
    }
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href$=".md"]:not([data-spec-raw])');
    if (!a || browserClick(e) || !a.getAttribute("href")) return;
    e.preventDefault();
    const path = fromPage(new URL(a.getAttribute("href"), location.href));
    openSpec(inLanguage(path), { fallback: path });
  });
}

// ---- start ---------------------------------------------------------------------------------

for (const b of $$("[data-lang]")) b.addEventListener("click", () => setLanguage(b.dataset.lang));
const drawNumerals = () => { for (const b of $$("[data-numerals]")) b.setAttribute("aria-pressed", String(b.dataset.numerals === numerals)); };
for (const b of $$("[data-numerals]")) b.addEventListener("click", () => {
  numerals = b.dataset.numerals;
  try { localStorage.setItem("al-showcase-numerals", numerals); } catch {}
  drawNumerals();
  translate();
  drawCharts();
  redrawCounts();
  redrawDates();
});
drawNumerals();
drawCharts();
drawThemeButton();
initMenus();
initTabs();
initTooltips();
initSpecReader();
initSearch();

// Date picker, in the page's language and digits.
const datePickers = initDatePickers(document, {
  numerals: () => (lang === "ar" ? numerals : "latn"),
  labels: () => ({ previous: T("Previous month"), next: T("Next month") }),
});
redrawDates = () => datePickers.forEach((p) => p.refresh());

// Character count, in the page's language and digits.
const COUNT = {
  left: ["You have {n} character remaining", "You have {n} characters remaining"],
  over: ["You have {n} character too many", "You have {n} characters too many"],
};
redrawCounts = initCharacterCounts(document, {
  words: (left) => T(COUNT[left >= 0 ? "left" : "over"][Math.abs(left) === 1 ? 0 : 1]).replace("{n}", formatNumber(Math.abs(left), { lang, numerals })),
  limit: (max) => T("You can enter up to {n} characters").replace("{n}", formatNumber(max, { lang, numerals })),
});

// Shortcuts: ⌘ or Ctrl as the platform has it; single keys can be turned off.
renderModifierKeys();
onShortcut("n", () => say(T("New item (an example: nothing is added)")));
onShortcut("/", () => $("#sr-q").focus());
onShortcut("mod+k", () => say(T("Command menu (an example: there isn't one here)")));
onShortcut("?", () => { $("#keyboard").scrollIntoView({ block: "start" }); $("#sc-shortcuts").focus(); });
const shortcutSwitch = $("#sc-shortcuts");
shortcutSwitch.checked = shortcutsEnabled();
shortcutSwitch.addEventListener("change", () => setShortcutsEnabled(shortcutSwitch.checked));

setLanguage(lang);

