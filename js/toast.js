// Toast: say what just happened, briefly, in one polite live region; offer
// an action (Undo) when there's one. It stays 4s, or 6s with an action, and
// waits while it's hovered or focused. Errors that need fixing belong in
// the page (a notice by the field), not only here.
//   import { toast } from "./js/toast.js";
//   toast("Process archived", { action: "Undo", onAction: () => restore() });

let region;
function toaster() {
  if (region?.isConnected) return region;
  region = document.createElement("div");
  region.className = "al-toaster";
  region.setAttribute("role", "status");
  region.setAttribute("aria-live", "polite");
  document.body.append(region);
  return region;
}

/** Show a toast; returns a function that dismisses it. */
export function toast(message, { action, onAction, timeout } = {}) {
  const el = document.createElement("div");
  el.className = "al-toast";
  const text = document.createElement("span");
  text.textContent = message;
  el.append(text);
  let dismiss;
  if (action) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "al-toast__action";
    button.textContent = action;
    button.addEventListener("click", () => { dismiss(); onAction?.(); });
    el.append(button);
  }
  toaster().append(el);
  const wait = timeout ?? (action ? 6000 : 4000);
  let timer;
  const start = () => { timer = setTimeout(dismiss, wait); };
  const stop = () => clearTimeout(timer);
  el.addEventListener("pointerenter", stop);
  el.addEventListener("pointerleave", start);
  el.addEventListener("focusin", stop);
  el.addEventListener("focusout", start);
  dismiss = () => {
    stop();
    el.dataset.leaving = "";
    setTimeout(() => el.remove(), 250);
  };
  start();
  return dismiss;
}
