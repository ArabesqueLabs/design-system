# Card, panel and stat

Containers. A card is a bordered surface for one thing; a panel is a page section marked by a rule above, which is all most groupings need; a stat is a figure with its label.

**CSS:** [`css/components/card.css`](../../css/components/card.css). **Classes:** `.al-card`, `.al-card--interactive`, `.al-card--selected`, `.al-card__description`, `.al-card__header`, `.al-panel`, `.al-stat`, `.al-stat__label`, `.al-stat__note`, `.al-stat__value`.

## Anatomy

```html
<article class="al-card">
  <header class="al-card__header"><h3>Production Engineer</h3><p class="al-card__description">Meta · saved today</p></header>
  <p>…</p>
  <div class="al-cluster"><a class="al-button al-button--sm" href="…">Open</a></div>
</article>

<section class="al-panel"><h2>About you</h2>…</section>

<div class="al-stat"><span class="al-stat__label">Take-home, a month</span>
  <span class="al-stat__value"><bdi>£10,075</bdi></span><span class="al-stat__note">a year: <bdi>£120,896</bdi></span></div>
```

## Variants and sizes

`--interactive` (border strengthens on hover; one link inside covers the card), `--selected` (accent border and wash).

## States

Hover (interactive): border to control colour. Focus: on the card's link. Selected: accent. Loading: skeletons inside ([progress](progress.md)).

## Keyboard

A card isn't focusable itself; its link or button is.

## ARIA

Use `article` for a self-contained item, `section` with a heading for a panel. Don't wrap a card with buttons in a link.

## Right to left

Content follows the reading direction; nothing to mirror.

## Do

- Prefer a panel; reach for a card when the thing is one unit people act on.
- Put figures in `<bdi>` with tabular digits.

## Don't

- Nest cards.
- Add shadows.

## Tokens

`--al-border-hairline`, `--al-color-accent`, `--al-color-accent-wash`, `--al-color-control`, `--al-color-line`, `--al-color-line-strong`, `--al-color-surface`, `--al-color-text-muted`, `--al-duration-fast`, `--al-ease-standard`, `--al-font-display`, `--al-leading-tight`, `--al-radius-sm`, `--al-space-1`, `--al-space-3`, `--al-space-4`, `--al-space-5`, `--al-text-2xl`, `--al-text-lg`, `--al-text-sm`, `--al-tracking-none`, `--al-weight-medium`
