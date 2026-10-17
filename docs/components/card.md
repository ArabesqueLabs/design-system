# Card, panel, stats and quote

Containers. A card is a bordered surface for one thing; a panel is a page section marked by a rule above, which is all most groupings need; a stat is a figure with its label, stats a row of them, and a quote what someone said.

**CSS:** [`css/components/card.css`](../../css/components/card.css). **Classes:** `.al-card`, `.al-card--interactive`, `.al-card--selected`, `.al-card__description`, `.al-card__header`, `.al-panel`, `.al-stat`, `.al-stat__label`, `.al-stat__note`, `.al-stat__value`, `.al-stats`, `.al-quote`, `.al-quote__by`, `.al-quote__name`, `.al-quote__role`.

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

<div class="al-stats">
  <div class="al-stat"><span class="al-stat__label">Components</span><span class="al-stat__value"><bdi>42</bdi></span></div>
  <div class="al-stat"><span class="al-stat__label">Contrast pairs measured</span><span class="al-stat__value"><bdi>112</bdi></span><span class="al-stat__note">none failing</span></div>
</div>
```

## Variants and sizes

`--interactive` (border strengthens on hover; one link inside covers the card), `--selected` (accent border and wash).

**Stats**: the figures a page or section leads with, side by side and larger (`--al-text-3xl`), each after a hairline, with no box; as many to a row as fit at 12rem, one under another on a phone. Two to four of them.

**Quote** (React `Quote`): what someone said, in their words, then who they are, in a `<figure>`: the words in a `<blockquote>` (in the serif, with the language's own quotation marks around them), the person in the `<figcaption>`, with their picture or initials ([avatar](tint.md)). An [eyebrow](../foundations/layout.md) above can say what it's about. Two or three in a grid; never a carousel.

```html
<figure class="al-quote">
  <blockquote><p>What they said, in their own words.</p></blockquote>
  <figcaption class="al-quote__by"><span class="al-avatar" data-tint="pink" aria-hidden="true"></span>
    <span><span class="al-quote__name">Their name</span><span class="al-quote__role">Their role, at their organisation</span></span></figcaption>
</figure>
```

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
- Say what each figure counts, and since when, in its label or note.

## Don't

- Nest cards.
- Add shadows.
- Quote anyone without their permission, or edit their words beyond trimming.
- Use stats for figures nobody acts on, or round them past meaning ("10× better").

## Tokens

`--al-border-hairline`, `--al-color-accent`, `--al-color-accent-wash`, `--al-color-control`, `--al-color-line`, `--al-color-line-strong`, `--al-color-surface`, `--al-color-text-muted`, `--al-duration-fast`, `--al-ease-standard`, `--al-font-display`, `--al-font-serif`, `--al-leading-prose`, `--al-leading-tight`, `--al-radius-sm`, `--al-space-1`, `--al-space-2`, `--al-space-3`, `--al-space-4`, `--al-space-5`, `--al-space-6`, `--al-text-2xl`, `--al-text-3xl`, `--al-text-lg`, `--al-text-md`, `--al-text-sm`, `--al-tracking-none`, `--al-weight-medium`
