// Tooltips for anything with data-al-tip ("value|what it is"): shown on
// hover and on keyboard focus, hidden on leaving, on blur and on Escape;
// it stays while the pointer is over it (WCAG 1.4.13). The text is also
// the element's accessible description, so it isn't only seen.
import { place } from "./position.js";

let tip;
let shownFor = null;
function element() {
  if (tip?.isConnected) return tip;
  tip = document.createElement("div");
  tip.className = "al-tooltip";
  tip.setAttribute("role", "tooltip");
  tip.id = "al-tooltip";
  tip.hidden = true;
  document.body.append(tip);
  return tip;
}
function show(target) {
  const el = element();
  const [value, what] = target.dataset.alTip.split("|");
  el.replaceChildren(...[Object.assign(document.createElement("b"), { textContent: value }), what ? ` ${what}` : ""].filter(Boolean));
  el.hidden = false;
  shownFor = target;
  target.setAttribute("aria-describedby", "al-tooltip");
  place(el, target, { side: "above" });
}
function hide() {
  if (tip) tip.hidden = true;
  shownFor?.removeAttribute("aria-describedby");
  shownFor = null;
}
export function initTooltips(root = document) {
  root.addEventListener("pointerover", (e) => { const t = e.target.closest("[data-al-tip]"); if (t) show(t); });
  root.addEventListener("pointerout", (e) => { if (shownFor && !shownFor.contains(e.relatedTarget) && !tip?.contains(e.relatedTarget)) hide(); });
  root.addEventListener("focusin", (e) => { const t = e.target.closest("[data-al-tip]"); if (t) show(t); });
  root.addEventListener("focusout", hide);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") hide(); });
  addEventListener("scroll", hide, { capture: true, passive: true });
}
