# Sidebar

The app's sections in a column, collapsible to icons; a scrolling bar along the top under the `md` breakpoint. Used inside `.al-shell` ([layout](../foundations/layout.md)).

**CSS:** [`css/components/sidebar.css`](../../css/components/sidebar.css). **Classes:** `.al-icon`, `.al-sidebar`, `.al-sidebar__collapse`, `.al-sidebar__foot`, `.al-sidebar__label`, `.al-sidebar__link`, `.al-sidebar__nav`.

## Anatomy

```html
<div class="al-shell" data-sidebar="">
  <aside class="al-sidebar">
    <nav class="al-sidebar__nav" aria-label="Sections">
      <a class="al-sidebar__link" href="/board" aria-current="page"><svg class="al-icon" aria-hidden="true">…</svg><span class="al-sidebar__label">Tracking board</span></a>
    </nav>
    <div class="al-sidebar__foot">
      <button type="button" class="al-sidebar__link al-sidebar__collapse" aria-expanded="true">
        <svg class="al-icon al-mirror" aria-hidden="true">…sidebar…</svg><span class="al-sidebar__label">Collapse sidebar</span></button>
    </div>
  </aside>
  <main>…</main>
</div>
```

## Variants and sizes

Full (224px) and collapsed (`data-sidebar="collapsed"` on the shell, 60px). Remember the choice per person.

## States

Hover: text colour, light surface. Current: surface, medium weight, accent edge and icon. Focus: the system outline.

## Keyboard

Tab through links; the collapse button toggles with Enter/Space.

## ARIA

A named `nav`; `aria-current="page"`. Collapsed, labels are visually hidden but still read; add a tooltip (`title` or `data-al-tip`) with the name. The toggle has `aria-expanded` and a label that says what it'll do.

## Right to left

On the right in Arabic, its edge and current-item marker on the start side; the collapse icon mirrors.

## Do

- Keep to seven sections or fewer, settings in the foot.

## Don't

- Hide a section's name without a tooltip.

## Tokens

`--al-border-hairline`, `--al-color-accent`, `--al-color-line`, `--al-color-surface`, `--al-color-surface-sunk`, `--al-color-text`, `--al-color-text-muted`, `--al-radius-sm`, `--al-size-control-sm`, `--al-space-0-5`, `--al-space-1`, `--al-space-2`, `--al-space-3`, `--al-space-5`, `--al-space-6`, `--al-weight-medium`, `--al-z-sticky`
