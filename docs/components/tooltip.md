# Tooltip

A short label for an icon button or a chart mark, on hover and focus. `js/tooltip.js` (`initTooltips()`).

**CSS:** [`css/components/tooltip.css`](../../css/components/tooltip.css). **Classes:** `.al-tooltip`.

## Anatomy

```html
<button class="al-button al-button--icon" aria-label="Copy link" data-al-tip="Copy link|to this offer">…</button>
<span class="al-chart__bar al-c1" tabindex="0" data-al-tip="£120,900|Offer A, Year 1"></span>
```
`value|what`: the part before `|` is shown bold.

## Variants and sizes

One.

## States

Appears on hover and focus; above its target, flipping below if there's no room.

## Keyboard

Shows on focus; Escape hides it.

## ARIA

Never the only source of a name: the control has its own `aria-label`; the tooltip repeats it visually. It's hoverable and persistent (WCAG 1.4.13).

## Right to left

Text in the page direction; numbers isolated.

## Do

- Use for icon-only buttons and chart marks.

## Don't

- Put anything essential or interactive in a tooltip; use a disclosure.

## Tokens

`--al-color-inverse`, `--al-color-on-inverse`, `--al-leading-ui`, `--al-radius-sm`, `--al-space-1-5`, `--al-space-2`, `--al-text-sm`, `--al-weight-semibold`, `--al-z-toast`
