// The site header's menu under the md breakpoint: a disclosure. The button
// says whether it's open (aria-expanded); Escape closes it and returns focus
// to the button; choosing a link closes it.

/** Wire every `.al-site-header`'s `[data-site-menu-toggle]` to the menu it controls. */
export function initSiteHeaders(root = document) {
  for (const button of root.querySelectorAll(".al-site-header [data-site-menu-toggle]")) {
    if (button.dataset.alWired !== undefined) continue;
    button.dataset.alWired = "";
    const menu = document.getElementById(button.getAttribute("aria-controls"));
    if (!menu) continue;
    const set = (open) => {
      menu.hidden = !open;
      button.setAttribute("aria-expanded", String(open));
    };
    set(false);
    button.addEventListener("click", () => set(menu.hidden));
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) set(false); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !menu.hidden) { set(false); button.focus(); }
    });
  }
}
