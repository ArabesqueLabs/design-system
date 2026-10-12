// Validation, the GOV.UK way: check on submit (not while people type), and
// when something's wrong, show an error summary at the top of the form,
// listing each error as a link to its field, focus it, and put "Error: " at
// the start of the page title. Beside each field, the same message, with a
// hidden "Error:" for screen readers. Shown even for one error.
//
//   import { validateOnSubmit } from "./js/validate.js";
//   validateOnSubmit(form, [
//     { field: "#name", check: (v) => v.trim() ? "" : "Enter the project name" },
//     { field: "#email", check: (v) => /.+@.+\..+/.test(v) ? "" : "Enter an email address in the correct format, like name@example.com" },
//   ], { onValid: (form) => save(form) });
//
// Give the form `novalidate`, so the browser's own bubbles don't compete.

const icon = '<svg class="al-icon al-icon--sm" aria-hidden="true"><use href="__SPRITE__#al-icon-danger"></use></svg>';

export function validateOnSubmit(form, checks, {
  onValid,
  title = "There is a problem",
  prefix = "Error:",
  sprite = "dist/icons.svg",
} = {}) {
  const fieldOf = (c) => (typeof c.field === "string" ? form.querySelector(c.field) : c.field);
  const text = (x) => (typeof x === "function" ? x() : x);
  // The title without our prefix (the prefix may be translated meanwhile).
  const untitled = () => document.title.replace(`${text(prefix)} `, "");

  function clear() {
    form.querySelector(":scope > .al-error-summary")?.remove();
    for (const c of checks) {
      const input = fieldOf(c);
      const id = `${input.id}-error`;
      document.getElementById(id)?.remove();
      input.removeAttribute("aria-invalid");
      const ids = (input.getAttribute("aria-describedby") || "").split(" ").filter((x) => x && x !== id);
      if (ids.length) input.setAttribute("aria-describedby", ids.join(" ")); else input.removeAttribute("aria-describedby");
    }
    document.title = untitled();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clear();
    const errors = [];
    for (const c of checks) {
      const input = fieldOf(c);
      const message = c.check(input.value, input);
      if (message) errors.push({ input, message });
    }
    if (!errors.length) { onValid?.(form); return; }

    for (const { input, message } of errors) {
      const p = document.createElement("p");
      p.className = "al-error";
      p.id = `${input.id}-error`;
      p.innerHTML = icon.replace("__SPRITE__", sprite);
      const hidden = Object.assign(document.createElement("span"), { className: "al-visually-hidden", textContent: `${text(prefix)} ` });
      p.append(hidden, message);
      // After the hint, before the control's wrapper ends: under the label and hint.
      const field = input.closest(".al-field, .al-fieldset") || input.parentElement;
      const control = input.closest(".al-affix, .al-search, .al-date-input, .al-choices") || input;
      (field.contains(control) ? control : input).before(p);
      input.setAttribute("aria-invalid", "true");
      input.setAttribute("aria-describedby", [input.getAttribute("aria-describedby"), p.id].filter(Boolean).join(" "));
    }

    const summary = document.createElement("div");
    summary.className = "al-error-summary";
    summary.tabIndex = -1;
    summary.setAttribute("role", "alert");
    summary.setAttribute("aria-labelledby", `${form.id || "form"}-error-title`);
    const h = document.createElement("h2");
    h.className = "al-error-summary__title";
    h.id = `${form.id || "form"}-error-title`;
    h.innerHTML = icon.replace("__SPRITE__", sprite).replace("al-icon--sm", "");
    h.append(text(title));
    const list = document.createElement("ul");
    list.className = "al-error-summary__list";
    for (const { input, message } of errors) {
      const a = document.createElement("a");
      a.href = `#${input.id}`;
      a.textContent = message;
      // Focus the field, and scroll so its label is in view too.
      a.addEventListener("click", (ev) => {
        ev.preventDefault();
        (input.closest(".al-field, .al-fieldset") || input).scrollIntoView({ block: "start" });
        input.focus({ preventScroll: true });
      });
      const li = document.createElement("li");
      li.append(a);
      list.append(li);
    }
    summary.append(h, list);
    form.prepend(summary);
    document.title = `${text(prefix)} ${untitled()}`;
    summary.focus();
  });

  return { clear };
}
