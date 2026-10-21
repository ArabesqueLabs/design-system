# Back to top

On a long page, a link back up: in the corner at the end of the line, once the page has scrolled two screens.

**CSS:** [`css/components/back-to-top.css`](../../css/components/back-to-top.css). **JS:** [`js/back-to-top.js`](../../js/back-to-top.js) (`initBackToTop()`). **Classes:** `.al-back-to-top`.

## Anatomy

```html
<a class="al-back-to-top" href="#top">
  <svg class="al-icon" aria-hidden="true"><use href="dist/icons.svg#al-icon-arrow-up"></use></svg>
  Back to top
</a>
<script type="module">
  import { initBackToTop } from "./js/back-to-top.js";
  initBackToTop();
</script>
```

Put it once, last in the page, after the footer, so it's the last thing Tab reaches. In React, `<BackToTop />` (`href`, and its words as children; "Back to top" in the page's language by default).

## Variants and sizes

One. Fixed in the corner at the end of the line (bottom right in English, bottom left in Arabic), `--al-space-4` from the edges, at least 44px tall, in `--al-text-sm`. For a page more than about three screens long: a document, a spec, a showcase. A short page doesn't need it, and it never shows there: it waits until the page has scrolled two screens.

## States

Hidden at the top of the page; it fades in once the page has scrolled two screens, and out again near the top. Hover darkens its border; focus has the focus ring. Without JavaScript it's always shown, and still works: `#top` is the top of the page.

## Keyboard

Tab reaches it last; Enter goes to the top, and moves focus there too, so the next Tab is the page's first link (its skip link), not whatever came after this.

## ARIA

A link, named by its words; the arrow is `aria-hidden`. Hidden, it's `visibility: hidden`, so it's out of the tab order and the accessibility tree.

## Right to left

In the corner at the end of the line: bottom left. The arrow points up, so it never mirrors.

## Motion

The page scrolls up smoothly, unless the person has asked for reduced motion: then it jumps. The link's fade is the standard duration, and is removed with all motion under reduced motion.

## Do

- Use it on long pages only; it's the way back from the bottom, not navigation.
- Keep the words: "Back to top" says what it does. An arrow alone needs a tooltip to be understood.

## Don't

- Put two on a page.
- Cover the page's own controls with it: a toast, a bulk action bar or a chat button in the same corner takes precedence; move or leave out this one.

## Tokens

`--al-border-focus`, `--al-border-hairline`, `--al-color-focus`, `--al-color-line-strong`, `--al-color-surface`, `--al-color-text`, `--al-color-text-muted`, `--al-duration-base`, `--al-ease-exit`, `--al-ease-standard`, `--al-radius-full`, `--al-space-2`, `--al-space-4`, `--al-text-sm`, `--al-z-sticky`
