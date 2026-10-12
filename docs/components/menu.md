# Menu

Actions on one thing, behind a button ("More", "Move to…"), in a native popover. `js/menu.js` (`initMenus()`) implements the ARIA APG menu button.

**CSS:** [`css/components/menu.css`](../../css/components/menu.css). **Classes:** `.al-menu`, `.al-menu__item`, `.al-menu__item--danger`, `.al-menu__label`, `.al-menu__separator`.

## Anatomy

```html
<button type="button" class="al-button" aria-haspopup="menu" aria-expanded="false" popovertarget="move-menu">Move to… <svg class="al-icon al-mirror" aria-hidden="true">…chevron…</svg></button>
<div class="al-menu" id="move-menu" popover role="menu" aria-label="Move to">
  <button type="button" class="al-menu__item" role="menuitem">Applied</button>
  <button type="button" class="al-menu__item" role="menuitem">Interviewing</button>
  <hr class="al-menu__separator">
  <button type="button" class="al-menu__item al-menu__item--danger" role="menuitem">Archive</button>
</div>
```

## Variants and sizes

Items, `menuitemradio`/`menuitemcheckbox` with `aria-checked` (a check at the end), group labels (`__label`), separators, danger items (last).

## States

Hover and focus: sunk background; focus adds an inset outline. Opens under its button (above if there's no room), following it while open.

## Keyboard

Enter/Space/Down opens and focuses the first item; Up/Down move, Home/End jump; Enter chooses; Escape closes and returns focus to the button; Tab closes.

## ARIA

Button: `aria-haspopup="menu"`, `aria-expanded`. Menu: `role="menu"`, named. Items: `role="menuitem"`.

## Right to left

Aligned to the button's start edge (right in Arabic).

## Do

- Put destructive items last, after a separator.
- Use "Move to…" for one-step moves instead of an edit form.

## Don't

- Hide the primary action in a menu.
- Use a menu for navigation; use links.

## Tokens

`--al-border-focus`, `--al-border-hairline`, `--al-color-accent`, `--al-color-danger`, `--al-color-focus`, `--al-color-line`, `--al-color-surface`, `--al-color-surface-sunk`, `--al-color-text`, `--al-color-text-muted`, `--al-radius-sm`, `--al-size-control-sm`, `--al-space-1`, `--al-space-1-5`, `--al-space-2`, `--al-space-3`, `--al-text-xs`
