# Segmented control

One of two to five short options, all visible at once.

**CSS:** [`css/components/segmented.css`](../../css/components/segmented.css). **Classes:** `.al-segmented`, `.al-segmented--fill`.

## Anatomy

As a form choice (radios):
```html
<fieldset class="al-fieldset"><legend>Start from</legend>
  <div class="al-segmented">
    <label><input type="radio" name="from" checked> Gross pay offered</label>
    <label><input type="radio" name="from"> Desired take-home pay</label>
  </div>
</fieldset>
```
As a view switch (buttons):
```html
<div class="al-segmented" role="group" aria-label="Language">
  <button type="button" aria-pressed="true">English</button>
  <button type="button" aria-pressed="false" lang="ar">العربية</button>
</div>
```

## Variants and sizes

Default (fits its content) and `--fill` (stretches, equal segments). One size (32px).

## States

Hover: sunk background. Chosen: filled in the text colour (not the accent, so it doesn't compete with the primary action). Focus: the outline around the segment.

## Keyboard

Radios: arrow keys move and choose. Buttons: Tab to each, Space or Enter.

## ARIA

Radios in a fieldset with a legend; or buttons with `aria-pressed` in a `role="group"` with `aria-label`.

## Right to left

Segments follow the reading order.

## Do

- Use for views and short, mutually exclusive choices.

## Don't

- Use for more than five options or long labels; use a select.
- Use for actions; segments choose, they don't do.

## Tokens

`--al-border-focus`, `--al-border-hairline`, `--al-color-bg`, `--al-color-control`, `--al-color-focus`, `--al-color-surface`, `--al-color-surface-sunk`, `--al-color-text`, `--al-color-text-muted`, `--al-radius-sm`, `--al-size-control-sm`, `--al-space-3`, `--al-text-sm`, `--al-weight-medium`
