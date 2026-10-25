# Brand: mark, wordmark, lockup

The mark (one tile of the pattern, in a square frame) beside the wordmark. Built from the logo pack's SVGs (`assets/brand/`), never redrawn.

**CSS:** [`css/components/brand.css`](../../css/components/brand.css). **Classes:** `.al-lockup`, `.al-lockup--stacked`, `.al-lockup__product`, `.al-mark`, `.al-wordmark`.

## Anatomy

```html
<a class="al-lockup" href="/" aria-label="Arabesque Labs">
  <svg class="al-mark" aria-hidden="true">…assets/brand/mark.svg…</svg>
  <span class="al-wordmark" lang="en">Arabesque Labs</span>
</a>
<!-- with a product -->
<span class="al-lockup"><svg class="al-mark" aria-hidden="true">…</svg><span class="al-wordmark" lang="en">Arabesque Labs</span><span class="al-lockup__product">hunt</span></span>
```
Inline `mark.svg` so it takes `currentColor`; `star.svg` and `wordmark.svg` are also in `assets/brand/`.

For where the live mark can't go (email, slides, documents), the build writes fixed-colour copies to `dist/brand/`: `mark-ink.svg` and `star-ink.svg` for light grounds, `mark-reversed.svg` and `star-reversed.svg` for dark ones, in the text colour of each theme. `favicon.svg` is the star that changes ink with the system's light or dark setting: use it as a site's icon.

## Variants and sizes

| Variant | Use |
|---|---|
| Lockup (mark + wordmark) | Headers |
| With a product (· hunt) | A product's own header |
| Stacked (`.al-lockup--stacked`): the mark over the wordmark | A splash, print |
| Mark alone | Where the name is already there: a footer, an app icon |
| The star alone (`star.svg`, `dist/brand/favicon.svg`) | At 16–24px, where the frame would clog |

Size with `font-size` on the lockup; the mark is 1.5em (2.5em stacked). The mark is never smaller than 16px, the lockup never narrower than 120px; below 24px, use the star.

## Arabesque's mark

The design system has a mark of its own: four of the company's tiles, two by two, in the same square frame (`assets/brand/arabesque-mark.svg`). Where four corners meet, a whole star appears that no single tile has. It's drawn from the same rule as the mark (the tiling at half the mark's scale), and a test checks it against `js/pattern.js`; its stroke is 2.4 units to the mark's 3.2, so four tiles in one frame don't look heavier than one.

| Variant | Use |
|---|---|
| Arabesque's mark (`arabesque-mark.svg`; `dist/brand/arabesque-mark-ink.svg`, `-reversed.svg`) | Where Arabesque stands alone: its README, its package and repository pages, a talk |
| Its four stars, solid, no frame (`arabesque-star.svg`; `dist/brand/arabesque-star-ink.svg`, `-reversed.svg`) | At 16–24px |
| Its favicon (`dist/brand/arabesque-favicon.svg`) | The icon of Arabesque's own pages: the elements, the docs, the examples |

Beside it, the name is "Arabesque" (in Arabic «آرابيسك»), in the wordmark's face and tracking. Its size limits and clear space are the mark's. Arabesque's own site (the elements, the docs, the examples) has it in its header: the mark, "Arabesque" and the product name, "Arabesque · Design system" («آرابيسك · نظام التصميم»). In React: `<Lockup mark={<ArabesqueMark />} name={…"Arabesque"…} product="Design system" />`. Arabesque Labs' own sites and products keep the company lockup.

## States

One colour: the text colour (Ink on light, Pale on dark); never the accent, never a gradient.

## Keyboard

As a link, it's focusable.

## ARIA

One accessible name: "Arabesque Labs"; the mark is `aria-hidden`.

## Right to left

Never mirrors. In Arabic pages the wordmark is written in Arabic, "معامل آرابيسك", with `lang="ar"` and no tracking (`--al-tracking-wide` is 0 in Arabic); the mark stays the same, and the lockup sits at the start (right). In English it's "Arabesque Labs", tracked.

## Do

- Keep clear space of a quarter of the mark's size around it.
- Use the SVGs as they are.

## Don't

- Redraw, rotate, recolour per section, outline or put the mark on a busy ground (including the pattern at full strength).
- Mistake the hero's teal focal tile for the logo: it's a cell of the pattern. The logo is always one colour.
- Mirror the lockup in right to left: it's a fixed image, at the start as a unit.

## Tokens

`--al-color-text`, `--al-color-text-muted`, `--al-font-display`, `--al-text-lg`, `--al-tracking-wide`, `--al-weight-medium`, `--al-weight-regular`
