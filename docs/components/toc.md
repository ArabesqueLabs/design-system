# On this page

A page's sections, beside it, with the one being read marked as it scrolls.

**CSS:** [`css/components/toc.css`](../../css/components/toc.css). **JS:** [`js/toc.js`](../../js/toc.js) (`initToc()`). **Classes:** `.al-toc`, `.al-toc__title`.

## Anatomy

```html
<nav class="al-toc" aria-label="On this page">
  <p class="al-toc__title" aria-hidden="true">On this page</p>
  <ul>
    <li><a href="#anatomy">Anatomy</a></li>
    <li><a href="#keyboard">Keyboard</a></li>
  </ul>
</nav>
<script type="module">
  import { initToc } from "./js/toc.js";
  initToc();
</script>
```

In React, `OnThisPage` (`links`, `title`).

## Variants and sizes

One. Beside the content, sticky, in a column of about 13rem; above the content, and not sticky, under md. For a long page with four or more sections, such as a document or a spec.

## States

Each link has a line at its start; the section being read (the last whose heading has passed the top quarter of the window) is marked: its line in the accent, its words in the text colour. Hover: the text colour.

## Keyboard

Tab reaches each link; Enter goes to its section.

## ARIA

A `nav` named "On this page"; the title is the same words, so it's hidden from screen readers. The marked link has `aria-current="true"`.

## Right to left

The lines are at the start of each link, on the right in Arabic.

## Do

- Link every `h2`, in order, in the headings' own words.

## Don't

- Use it for a short page; the headings are enough.
- Nest more than one level.

## Tokens

`--al-color-accent`, `--al-color-line`, `--al-color-text`, `--al-color-text-muted`, `--al-space-1`, `--al-space-3`, `--al-space-6`, `--al-text-sm`, `--al-weight-medium`
