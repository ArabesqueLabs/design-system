# Brand: mark, wordmark, lockup

The mark (one tile of the pattern, in a square frame) beside the wordmark. Built from the logo pack's SVGs (`assets/brand/`), never redrawn.

**CSS:** [`css/components/brand.css`](../../css/components/brand.css). **Classes:** `.al-lockup`, `.al-lockup__product`, `.al-mark`, `.al-wordmark`.

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

## Variants and sizes

Lockup (mark + wordmark), lockup with product (· hunt), mark alone (favicons, avatars). Size with `font-size` on the lockup; the mark is 1.5em.

## States

One colour: the text colour (Ink on light, Pale on dark); never the accent, never a gradient.

## Keyboard

As a link, it's focusable.

## ARIA

One accessible name: "Arabesque Labs"; the mark is `aria-hidden`.

## Right to left

Never mirrors. In Arabic pages the wordmark stays Latin (`lang="en"`, keeps its tracking); the lockup sits at the start (right).

## Do

- Keep clear space of a quarter of the mark's size around it.
- Use the SVGs as they are.

## Don't

- Redraw, rotate, recolour per section, outline or put the mark on a busy ground (including the pattern at full strength).

## Tokens

`--al-color-text`, `--al-color-text-muted`, `--al-font-display`, `--al-text-lg`, `--al-weight-medium`, `--al-weight-regular`
