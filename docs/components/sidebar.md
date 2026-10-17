# Sidebar

The app's sections in a column, collapsible to icons. Under the `md` breakpoint it becomes a bar along the top, with the current section's name and a menu button; the sections and the foot drop below it, as the [site header](site-header.md)'s menu does. Used inside `.al-shell` ([layout](../foundations/layout.md)).

**CSS:** [`css/components/sidebar.css`](../../css/components/sidebar.css). **JS:** [`js/sidebar.js`](../../js/sidebar.js) (`initSidebars()`). **Classes:** `.al-icon`, `.al-sidebar`, `.al-sidebar__bar`, `.al-sidebar__here`, `.al-sidebar__toggle`, `.al-sidebar__menu`, `.al-sidebar__collapse`, `.al-sidebar__foot`, `.al-sidebar__label`, `.al-sidebar__link`, `.al-sidebar__nav`.

## Anatomy

```html
<div class="al-shell" data-sidebar="">
  <aside class="al-sidebar">
    <div class="al-sidebar__bar">
      <span class="al-sidebar__here">Tracking board</span>
      <button type="button" class="al-button al-button--icon al-button--quiet al-sidebar__toggle" data-sidebar-menu-toggle aria-controls="sidebar-menu" aria-expanded="false" aria-label="Menu">
        <svg class="al-icon al-sidebar__open" aria-hidden="true">…menu…</svg><svg class="al-icon al-sidebar__close" aria-hidden="true">…close…</svg>
      </button>
    </div>
    <div class="al-sidebar__menu" id="sidebar-menu">
      <nav class="al-sidebar__nav" aria-label="Sections">
        <a class="al-sidebar__link" href="/board" aria-current="page"><svg class="al-icon" aria-hidden="true">…</svg><span class="al-sidebar__label">Tracking board</span></a>
      </nav>
      <div class="al-sidebar__foot">
        <button type="button" class="al-sidebar__link al-sidebar__collapse" aria-expanded="true">
          <svg class="al-icon al-mirror" aria-hidden="true">…sidebar…</svg><span class="al-sidebar__label">Collapse sidebar</span></button>
      </div>
    </div>
  </aside>
  <main>…</main>
</div>
<script type="module">
  import { initSidebars } from "./js/sidebar.js";
  initSidebars();
</script>
```

The bar shows only under `md`; above it, `.al-sidebar__menu` steps aside (`display: contents`), so the nav and the foot sit in the column as before. Put the current section's name in `.al-sidebar__here`, so a phone says where you are without opening the menu.

## Variants and sizes

Full (224px) and collapsed (`data-sidebar="collapsed"` on the shell, 60px). Remember the choice per person. Under `md` there's one: the menu shows every name, collapsed or not, and Collapse is hidden.

## States

Hover: text colour, light surface. Current: surface, medium weight, accent edge and icon. Focus: the system outline.

Under `md`, closed: the bar alone. Open: the sections, one per row and taller to tap, then the foot under its rule; the menu button's icon is a cross. A long menu scrolls, the bar staying at its top.

## Keyboard

Tab through links; the collapse button toggles with Enter/Space. Under `md`, the menu button opens and closes the menu with Enter or Space; Escape closes it and returns focus to the button; choosing a link closes it.

## ARIA

A named `nav`; `aria-current="page"`. Collapsed, labels are visually hidden but still read; add a tooltip (`title` or `data-al-tip`) with the name. The toggle has `aria-expanded` and a label that says what it'll do. The menu button has `aria-expanded` and `aria-controls`; its name stays "Menu", and its state says whether it's open.

## Right to left

On the right in Arabic, its edge and current-item marker on the start side; the collapse icon mirrors.

## Do

- Keep to seven sections or fewer, settings in the foot.
- Load `js/sidebar.js`: without it, the menu stays closed on a phone.

## Don't

- Hide a section's name without a tooltip.

## Tokens

`--al-border-hairline`, `--al-color-accent`, `--al-color-line`, `--al-color-surface`, `--al-color-surface-sunk`, `--al-color-text`, `--al-color-text-muted`, `--al-radius-sm`, `--al-size-control-md`, `--al-size-control-sm`, `--al-space-0-5`, `--al-space-1`, `--al-space-2`, `--al-space-3`, `--al-space-5`, `--al-space-6`, `--al-weight-medium`, `--al-z-sticky`
