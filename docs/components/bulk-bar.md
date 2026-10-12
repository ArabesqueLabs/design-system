# Bulk action bar

Once things are selected: how many, what can be done to all of them, and a way to clear. Sticks to the bottom of the view.

**CSS:** [`css/components/bulk-bar.css`](../../css/components/bulk-bar.css). **Classes:** `.al-bulk-bar`, `.al-bulk-bar__count`, `.al-button`, `.al-button--quiet`.

## Anatomy

```html
<div class="al-bulk-bar" role="region" aria-label="3 selected">
  <span class="al-bulk-bar__count">3 selected</span>
  <button type="button" class="al-button al-button--sm">Move 3 to…</button>
  <button type="button" class="al-button al-button--sm">Archive 3</button>
  <button type="button" class="al-button al-button--sm al-button--quiet">Clear selection</button>
</div>
```

## Variants and sizes

One. Appears when the first item is selected; disappears when the selection is cleared.

## States

Buttons adapt to the inverse surface.

## Keyboard

Reachable in the tab order after the list; Escape clears the selection (the app wires this).

## ARIA

A named region whose name updates with the count. Selection itself: checkboxes in rows, or `aria-selected` on rows.

## Right to left

Count at the start, actions at the end.

## Do

- Name the count in every action ("Archive 3").
- Make bulk actions undoable with one toast.

## Don't

- Hide bulk actions in a menu when there are three or fewer.

## Tokens

`--al-color-inverse`, `--al-color-on-inverse`, `--al-radius-md`, `--al-space-2`, `--al-space-3`, `--al-space-4`, `--al-weight-semibold`, `--al-z-sticky`
