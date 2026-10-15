# Steps

A numbered sequence: the stages of how something is done ("Discover, Design, Build, Refine"). A rule above each stage, its number in the accent, a title and a short paragraph. As on arabesquelabs.com.

**CSS:** [`css/components/steps.css`](../../css/components/steps.css). **Classes:** `.al-steps`, `.al-steps__num`, `.al-steps__title`, `.al-steps__body`.

## Anatomy

```html
<ol class="al-steps">
  <li>
    <p class="al-steps__num"><bdi>1</bdi></p>
    <h3 class="al-steps__title">Discover</h3>
    <p class="al-steps__body">Start with the real problem, not the assumed solution.</p>
  </li>
  …
</ol>
```

## Variants and sizes

One. As many columns as fit at 13rem or more each: four across a wide page, then two, then one.

## States

**Rules:**
- The rule above each stage is `--al-color-line-strong`; the number is `--al-color-accent`, tabular; the body is serif in `--al-color-text-muted`, at most 30ch.
- Use a heading level that fits the page's outline (`h3` under a section's `h2`).

## Keyboard

None; links inside follow the reading order.

## ARIA

An ordered list, so the sequence and count are announced; the visible number repeats it for sighted readers.

## Right to left

The stages run from the right; numbers are isolated in `<bdi>` so the chosen digits sit correctly.

## Do

- Keep each stage to a title and two or three sentences.

## Don't

- Use it for things that aren't a sequence (features, values): use a plain list or cards.
- Use it for the steps of a task someone is doing now: use the task list.

## Tokens

`--al-color-line-strong`, `--al-color-accent`, `--al-color-text-muted`, `--al-font-display`, `--al-font-serif`, `--al-text-sm`, `--al-text-xl`, `--al-weight-medium`, `--al-leading-heading`, `--al-leading-prose`, `--al-border-hairline`, `--al-space-3`, `--al-space-4`, `--al-space-5`, `--al-space-8`, `--al-space-12`
