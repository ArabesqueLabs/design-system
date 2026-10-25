# Pagination

The pages of a long list, as links: Previous and Next in words, the numbers around the current page, the gaps an ellipsis.

**CSS:** [`css/components/pagination.css`](../../css/components/pagination.css). **Classes:** `.al-pagination`, `.al-pagination__gap`, `.al-pagination__prev`.

## Anatomy

```html
<nav class="al-pagination" aria-label="Pagination">
  <ul>
    <li><a class="al-pagination__prev" href="?page=5" rel="prev"><svg class="al-icon al-icon--sm al-mirror" aria-hidden="true">…</svg>Previous</a></li>
    <li><a href="?page=1" aria-label="Page 1">1</a></li>
    <li><span class="al-pagination__gap" aria-hidden="true">…</span></li>
    <li><a href="?page=6" aria-label="Page 6" aria-current="page">6</a></li>
    …
    <li><a class="al-pagination__next" href="?page=7" rel="next">Next<svg class="al-icon al-icon--sm al-mirror" aria-hidden="true">…</svg></a></li>
  </ul>
</nav>
```

In React, `Pagination` (`page`, `pages`, `href`, `onNavigate`); `pageRange(page, pages)` gives the numbers it shows.

## Variants and sizes

One. Seven numbers at most: the first, the last, the current page and one each side, the gaps as an ellipsis. With seven pages or fewer, all of them. Say how many results there are, and which, above the list ("Results 101 to 120 of 240"), not in the pagination.

## States

The current page is inverted (text on its colour), and says so in the markup. A link's hover is the sunk surface. On the first page there's no Previous, on the last no Next: not a disabled link, no link.

## Keyboard

Links, in order: Tab reaches each.

## ARIA

A `nav` named "Pagination". Each number is named "Page 6"; the current one has `aria-current="page"`. The ellipsis is hidden. Previous and Next are `rel="prev"` and `rel="next"`.

## Right to left

The order follows the reading direction: Previous at the start, on the right. The chevrons mirror. Numbers are in the page's digits.

## Do

- Make each page an address of its own, so it can be linked to and the browser's Back works.
- When a list changes in place, move focus to the start of the list and say what changed.

## Don't

- Use it for a list people read to the end: load more, or show it all.
- Hide Previous and Next behind icons alone.

## Tokens

`--al-color-bg`, `--al-color-surface-sunk`, `--al-color-text`, `--al-color-text-muted`, `--al-radius-sm`, `--al-size-control-sm`, `--al-space-1`, `--al-space-2`, `--al-text-sm`, `--al-weight-semibold`
