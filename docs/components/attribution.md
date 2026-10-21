# Attribution

The line each of the company's products carries: "A product of Arabesque Labs", or "By Arabesque Labs", after the mark. In a product's footer, its about page, its README.

**CSS:** [`css/components/attribution.css`](../../css/components/attribution.css). **Classes:** `.al-attribution`, `.al-attribution--plain`, `.al-attribution--lg`, `.al-attribution--star`, `.al-attribution__name`. **Images:** `dist/brand/badges/` (made by `npm run badges`).

## Anatomy

```html
<a class="al-attribution" href="https://arabesquelabs.com">
  <svg class="al-mark" viewBox="0 0 64 64" aria-hidden="true">…assets/brand/mark.svg…</svg>
  <span>A product of <span class="al-attribution__name" lang="en">Arabesque Labs</span></span>
</a>
```

In React, `<Attribution />`: `wording="product"` (the default) or `"by"`, `plain`, `large`, `star`, and `href` (the company's site unless said: its Arabic one, in Arabic).

The mark is the company's, framed, at 2em: 26px at the default size, never under the 24px the [Brand](brand.md) page asks of it. Where the line has to be smaller than that, the star variant (`.al-attribution--star`, in React `star`) puts the star alone, solid, in its place, at 1.25em, as the favicon does.

## Variants and sizes

| Variant | Use |
|---|---|
| "A product of Arabesque Labs" (`wording="product"`) | A product with a name of its own: hunt, in its footer or about page |
| "By Arabesque Labs" (`wording="by"`) | Where space is short, or the thing is smaller than a product: a tool, a template, a talk |
| The pill (the default) | On its own: a footer's corner, an about page, under a README's title |
| Plain (`.al-attribution--plain`) | Inside a line of text, or a footer that already has its own lines |
| Large (`.al-attribution--lg`) | An about page, a splash |
| Star (`.al-attribution--star`) | Where the line is small: a dense footer, a status bar, set below `--al-text-xs` |

It's sized with the text: `--al-text-xs`, or `--al-text-sm` large; the mark is 2em, the star 1.25em.

### As an image

For a README, a package or store page, an email or a slide, where the component can't go: `dist/brand/badges/`, each wording in English and Arabic, for light and dark grounds, with the mark or the star, at 1x and 2x, on a transparent ground.

| File | |
|---|---|
| `product-of-en-light.png`, `…@2x.png` | "A product of Arabesque Labs", for a light ground |
| `product-of-en-dark.png`, `…@2x.png` | The same, for a dark ground |
| `by-en-light.png`, `by-en-dark.png` (and `@2x`) | "By Arabesque Labs" |
| `product-of-ar-…`, `by-ar-…` | In Arabic: «من منتجات معامل آرابيسك», «من معامل آرابيسك» |
| `…-star.png`, `…-star@2x.png` (`product-of-en-light-star.png`, …) | Each of these with the star in place of the mark |

On GitHub, a `<picture>` shows the one that suits the reader's theme:

```html
<a href="https://arabesquelabs.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="dist/brand/badges/product-of-en-dark@2x.png">
    <img src="dist/brand/badges/product-of-en-light@2x.png" alt="A product of Arabesque Labs" height="41">
  </picture>
</a>
```

They're drawn by the component itself, in headless Chrome, with the system's fonts: run `npm run badges` after `npm run build` when it changes.

## States

As a link: hover darkens its border and underlines the name; focus has the focus ring.

## Keyboard

As a link, it's focusable.

## ARIA

Its text is its name ("A product of Arabesque Labs"); the mark is `aria-hidden`. As an image, its `alt` says the same.

## Right to left

In Arabic it reads «من منتجات معامل آرابيسك» or «من معامل آرابيسك», the mark at the start (right), and links to the company's Arabic site. The mark itself never mirrors.

## Do

- Put it once, where people look for who made something: the footer, the about page.
- Link it to the company's site.

## Don't

- Recolour it, or put it on a busy ground.
- Shrink the mark under 24px: there, use the star.
- Put both wordings on one page.

## Tokens

`--al-border-focus`, `--al-border-hairline`, `--al-color-focus`, `--al-color-line-strong`, `--al-color-surface`, `--al-color-text`, `--al-color-text-muted`, `--al-font-display`, `--al-font-sans`, `--al-radius-full`, `--al-text-sm`, `--al-text-xs`, `--al-tracking-wide`, `--al-weight-medium`
