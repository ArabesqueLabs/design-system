# Charts

Columns, a split bar and a bullet chart, in plain HTML and CSS. Thin marks in the chart colours, one value axis, a key, a tooltip on every mark, and the numbers also available as text.

**CSS:** [`css/components/chart.css`](../../css/components/chart.css). **JS:** [`js/chart.js`](../../js/chart.js) (`initChartKeys`), with [`js/tooltip.js`](../../js/tooltip.js). **Classes:** `.al-bullet`, `.al-bullet__bar`, `.al-bullet__diff--less`, `.al-bullet__diff--more`, `.al-bullet__label`, `.al-bullet__row`, `.al-bullet__target`, `.al-bullet__track`, `.al-bullet__value`, `.al-chart`, `.al-chart__axis`, `.al-chart__bar`, `.al-chart__grid`, `.al-chart__marker`, `.al-chart__plot`, `.al-chart__seg`, `.al-chart__slot`, `.al-chart__slots`, `.al-chart__stack`, `.al-chart__target`, `.al-key`, `.al-key__item`, `.al-split-bar`, `.al-split-bar__part`, `.al-split-bar__track`, `.al-swatch`, `.al-swatch--line`, `.al-swatch--target`; colour with `data-series`.

## Anatomy

Every mark is `role="img"`, named by its value and what it is, with the same words as its tooltip. `initChartKeys` makes the chart one tab stop.

Columns (grouped; `.al-chart__stack`/`__seg` for stacked):
```html
<div class="al-chart">
  <div class="al-chart__plot">
    <span class="al-chart__grid" style="inset-block-end: 66.7%" aria-hidden="true"><span>£100k</span></span>
    <div class="al-chart__slots"><div class="al-chart__slot">
      <span class="al-chart__bar" data-series="1" style="block-size: 80.6%" role="img"
            aria-label="£120,900 Offer A, Year 1" data-al-tip="£120,900|Offer A, Year 1"></span>
    </div></div>
    <span class="al-chart__target" style="inset-block-end: 56%" role="img"
          aria-label="£84,000 What you want" data-al-tip="£84,000|What you want"></span>
  </div>
  <div class="al-chart__axis" aria-hidden="true"><span>Year 1</span></div>
  <div class="al-key"><span class="al-key__item"><span class="al-swatch" data-series="1"></span>Offer A</span></div>
</div>
<script type="module">
  import { initChartKeys } from "./js/chart.js";
  initChartKeys(document.querySelector(".al-chart__plot"));
</script>
```
Split bar (parts of a whole):
```html
<div class="al-split-bar">
  <div class="al-split-bar__track" role="group" aria-label="Where a year's pay goes">
    <span class="al-split-bar__part" data-series="1" style="inline-size: 62%" role="img"
          aria-label="£71,597 · 62% Take-home pay" data-al-tip="£71,597 · 62%|Take-home pay"></span>
  </div>
  <div class="al-key">…</div>
</div>
```
Bullet (each against a target):
```html
<div class="al-bullet"><div class="al-bullet__row">
  <span class="al-bullet__label">Offer A</span>
  <span class="al-bullet__track"><span class="al-bullet__bar" data-series="1" style="inline-size: 84%" role="img"
        aria-label="£10,075 Offer A" data-al-tip="£10,075|Offer A"></span>
    <span class="al-bullet__target" style="inset-inline-start: 58%"></span></span>
  <span class="al-bullet__value"><b>£10,075</b> <span class="al-bullet__diff--more">+£3,075 more</span></span>
</div></div>
```

## Variants and sizes

Series `data-series="1"` to `"4"`, in order. `data-series="0"` is the neutral, for tracks and grounds only: it's too light to be read as data, so "Other" takes the next series colour. Marker (`__marker`) and target line (`__target`). Swatches for lines (`--line`) and targets (`--target`). `.al-bullet__diff--more` and `--less` for differences (with a sign and a word).

## States

Marks show their tooltip on hover and on focus; it stays while the pointer is over it.

## Keyboard

One tab stop per chart (`initChartKeys`); the arrow keys move from mark to mark, along the reading direction, and Home and End go to the ends. Each mark says its value as it's reached.

## ARIA

A title above, and a summary sentence worked out from the data. Each mark is `role="img"` with its value and what it is as its name; the tooltip doesn't repeat it as a description. The grid and axis labels are `aria-hidden`. A split bar's track is a `role="group"` named by the chart's title. For anything people compare closely, give the numbers in a table too.

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
- `data-series="0"` (the neutral) for data.

## Tokens

`--al-border-hairline`, `--al-color-chart-0`, `--al-color-chart-1`, `--al-color-chart-2`, `--al-color-chart-3`, `--al-color-chart-4`, `--al-color-danger`, `--al-color-line`, `--al-color-success`, `--al-color-surface`, `--al-color-text`, `--al-color-text-muted`, `--al-radius-md`, `--al-space-1`, `--al-space-1-5`, `--al-space-2`, `--al-space-3`, `--al-space-4`, `--al-text-sm`, `--al-text-xs`
