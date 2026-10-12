# Table

For comparing values: numbers line up, the total stands out, asides recede. A wide table scrolls inside its own region, never the page.

**CSS:** [`css/components/table.css`](../../css/components/table.css). **Classes:** `.al-num`, `.al-table`, `.al-table--compact`, `.al-table--interactive`, `.al-table-wrap`.

## Anatomy

```html
<div class="al-table-wrap" role="region" aria-label="Take-home pay, by period" tabindex="0">
  <table class="al-table">
    <thead><tr><th scope="col">What</th><th scope="col" class="al-num">Year</th><th scope="col" class="al-num">Month</th></tr></thead>
    <tbody>
      <tr><th scope="row">Gross pay</th><td class="al-num">£108,000</td><td class="al-num">£9,000</td></tr>
      <tr><th scope="row">Income tax</th><td class="al-num">−£32,232</td><td class="al-num">−£2,686</td></tr>
      <tr class="is-total"><th scope="row">Take-home pay</th><td class="al-num">£71,597</td><td class="al-num">£5,966</td></tr>
      <tr class="is-aside"><th scope="row">Employer's National Insurance</th><td class="al-num">£15,450</td><td class="al-num">£1,288</td></tr>
    </tbody>
  </table>
</div>
```

## Variants and sizes

| Class | Use |
|---|---|
| `.al-num` | Numeric cells and their headers: end-aligned, tabular, unbroken |
| `tr.is-sub` | A subtotal |
| `tr.is-total` | The total: semibold, accent wash, rule above |
| `tr.is-aside` | Context that isn't part of the sum: muted, smaller |
| `--compact` | Tighter rows for dense data |
| `--interactive` | Rows highlight on hover (rows that open something) |
| `aria-selected` on `tr` | Selected rows, with the bulk bar |

## States

Hover (interactive): sunk. Selected: accent wash. Sorted: `aria-sort` on the `th`, an arrow on its button. Focus: the wrapper (to scroll) and any controls. Loading: skeleton rows.

## Keyboard

Tab reaches the scroll region (arrow keys scroll it) and any controls. Sort buttons with Enter/Space.

## ARIA

`<th scope>` for headers; a `<caption>` or the region's `aria-label`. Sortable headers are buttons inside the `th`, with `aria-sort` on the `th`.

## Right to left

Columns run right to left; numbers keep their own LTR order and align to the end (left in Arabic).

## Do

- Use a minus sign (−) for deductions.
- Keep units in the header ("Year"), not every cell.

## Don't

- Use a table for layout.
- Truncate numbers.

## Tokens

`--al-border-focus`, `--al-border-hairline`, `--al-color-accent-wash`, `--al-color-focus`, `--al-color-line`, `--al-color-line-strong`, `--al-color-surface-sunk`, `--al-color-text-muted`, `--al-size-target-min`, `--al-space-1`, `--al-space-1-5`, `--al-space-2`, `--al-space-3`, `--al-text-base`, `--al-text-sm`, `--al-text-xs`, `--al-weight-medium`, `--al-weight-regular`, `--al-weight-semibold`
