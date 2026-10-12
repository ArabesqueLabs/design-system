# Charts

Columns, a split bar and a bullet chart, in plain HTML and CSS. Thin marks in the chart colours, one value axis, a key, a tooltip on every mark, and the numbers also available as text.

**CSS:** [`css/components/chart.css`](../../css/components/chart.css). **Classes:** `.al-bullet`, `.al-bullet__bar`, `.al-bullet__label`, `.al-bullet__row`, `.al-bullet__target`, `.al-bullet__track`, `.al-bullet__value`, `.al-c0`, `.al-c1`, `.al-c2`, `.al-c3`, `.al-c4`, `.al-chart`, `.al-chart__axis`, `.al-chart__bar`, `.al-chart__grid`, `.al-chart__marker`, `.al-chart__plot`, `.al-chart__seg`, `.al-chart__slot`, `.al-chart__slots`, `.al-chart__stack`, `.al-chart__target`, `.al-key`, `.al-key__item`, `.al-less`, `.al-more`, `.al-split-bar`, `.al-split-bar__part`, `.al-split-bar__track`, `.al-swatch`, `.al-swatch--line`, `.al-swatch--target`.

## Anatomy

Columns (grouped; `.al-chart__stack`/`__seg` for stacked):
```html
<div class="al-chart">
  <div class="al-chart__plot">
    <span class="al-chart__grid" style="inset-block-end: 66.7%"><span>£100k</span></span>
    <div class="al-chart__slots"><div class="al-chart__slot">
      <span class="al-chart__bar al-c1" style="block-size: 80.6%" tabindex="0" data-al-tip="£120,900|Offer A, Year 1"></span>
    </div></div>
    <span class="al-chart__target" style="inset-block-end: 56%" tabindex="0" data-al-tip="£84,000|What you want"></span>
  </div>
  <div class="al-chart__axis"><span>Year 1</span></div>
  <div class="al-key"><span class="al-key__item"><span class="al-swatch al-c1"></span>Offer A</span></div>
</div>
```
Split bar (parts of a whole):
```html
<div class="al-split-bar">
  <div class="al-split-bar__track" role="img" aria-label="Take-home pay 62%, Tax, NI and loans 32%, …">
    <span class="al-split-bar__part al-c1" style="inline-size: 62%" tabindex="0" data-al-tip="£71,597 · 62%|Take-home pay"></span>
  </div>
  <div class="al-key">…</div>
</div>
```
Bullet (each against a target):
```html
<div class="al-bullet"><div class="al-bullet__row">
  <span class="al-bullet__label">Offer A</span>
  <span class="al-bullet__track"><span class="al-bullet__bar al-c1" style="inline-size: 84%"></span>
    <span class="al-bullet__target" style="inset-inline-start: 58%"></span></span>
  <span class="al-bullet__value"><b>£10,075</b> <span class="al-more">+£3,075 more</span></span>
</div></div>
```

## Variants and sizes

Series classes `.al-c1…4` in order, `.al-c0` for "other"/track. Marker (`__marker`) and target line (`__target`). Swatches for lines (`--line`) and targets (`--target`). `.al-more`/`.al-less` for differences (with a sign and a word).

## States

Marks are focusable and show a tooltip on hover and focus.

## Keyboard

Tab through marks; each shows its value.

## ARIA

A title above; a split bar is `role="img"` with an `aria-label` of its parts; give columns a table view or ensure every mark's tooltip carries its value.

## Right to left

Categories and time run with the reading direction; split and bullet bars grow from the start; the value axis stays vertical and numbers keep their order.

## Do

- Assign colours in the fixed order and keep them when series are filtered.
- Label differences in words ("more", "short"), not colour alone.
- Keep text in text colours, never the series colour.

## Don't

- Two value axes.
- More than four series; fold the rest into "Other".
- Status colours as series.

## Tokens

`--al-border-hairline`, `--al-color-chart-0`, `--al-color-chart-1`, `--al-color-chart-2`, `--al-color-chart-3`, `--al-color-chart-4`, `--al-color-danger`, `--al-color-line`, `--al-color-success`, `--al-color-surface`, `--al-color-text`, `--al-color-text-muted`, `--al-radius-md`, `--al-space-1`, `--al-space-1-5`, `--al-space-2`, `--al-space-3`, `--al-space-4`, `--al-text-sm`, `--al-text-xs`
