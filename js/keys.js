// Keyboard shortcuts that follow the platform (from Apple's HIG): ⌘ on
// Apple devices, Ctrl elsewhere, and the standard meanings kept (⌘Z
// undo, ⌘S save, ⌘K or / search, Escape to dismiss). Single-key
// shortcuts never fire while typing in a field (WCAG 2.1.4).
//
//   <kbd class="al-kbd" data-al-mod></kbd> <kbd class="al-kbd">K</kbd>
//   renderModifierKeys();                      // fills [data-al-mod] with ⌘ or Ctrl
//   onShortcut("mod+k", () => search.focus());
//   onShortcut("?", () => shortcuts.showModal());

export const isApple = () => /Mac|iPhone|iPad|iPod/.test(navigator.userAgentData?.platform || navigator.platform || "");
export const modifierLabel = () => (isApple() ? "⌘" : "Ctrl");

export function renderModifierKeys(root = document) {
  for (const k of root.querySelectorAll("[data-al-mod]")) {
    k.textContent = modifierLabel();
    k.setAttribute("title", isApple() ? "Command" : "Control");
  }
}

const typing = (el) => el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));

/** combo: "mod+k", "shift+?", "/", "escape". Returns a function that removes it. */
export function onShortcut(combo, handler, { target = document } = {}) {
  const parts = combo.toLowerCase().split("+");
  const key = parts.pop();
  const wantMod = parts.includes("mod");
  const listener = (e) => {
    const mod = isApple() ? e.metaKey : e.ctrlKey;
    if (mod !== wantMod || e.altKey) return;
    if (e.key.toLowerCase() !== key) return;
    if (!wantMod && key.length === 1 && typing(e.target)) return;
    e.preventDefault();
    handler(e);
  };
  target.addEventListener("keydown", listener);
  return () => target.removeEventListener("keydown", listener);
}
