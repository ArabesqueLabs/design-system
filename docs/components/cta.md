# Call to action

The page's last word: one line, then what to do.

**CSS:** [`css/components/cta.css`](../../css/components/cta.css). **Classes:** `.al-cta`, `.al-cta__title`, `.al-cta__lede`, `.al-cta__actions`.

## Anatomy

```html
<section class="al-cta al-pattern al-pattern--quiet" aria-labelledby="cta-h">
  <div class="al-pattern__art" aria-hidden="true"></div>
  <h2 class="al-cta__title" id="cta-h">Your next page, built from the same tile.</h2>
  <p class="al-lede al-cta__lede">Start from the template, or take only the parts you need.</p>
  <div class="al-cta__actions">
    <a class="al-button al-button--primary" href="…">Open the template</a>
    <a class="al-button" href="…">Read how to use it</a>
    <div class="al-command al-command--prompt">…npm run build…</div>
  </div>
</section>
```

In React, `CallToAction` (`heading`, `lede`, `actions`, `pattern`).

## Variants and sizes

With the [pattern](pattern.md), quiet, behind it (the default), or without. The actions: one primary, at most one quieter one, and a [command](code.md) if there's one thing to run.

## States

None of its own.

## Keyboard

Tab reaches each action in order: the primary first.

## ARIA

A `section` named by its heading (an `h2`).

## Right to left

Centred; the actions follow the reading direction, so the primary is on the right in Arabic.

## Do

- Say what people will have, in a line ("Your next page, built from the same tile."), not "Get started today!".
- Use it once, at the end of the page.

## Don't

- Offer more than two buttons.
- Repeat the hero's words.

## Tokens

`--al-border-hairline`, `--al-color-line`, `--al-color-surface-sunk`, `--al-font-display`, `--al-leading-heading`, `--al-space-3`, `--al-space-4`, `--al-space-5`, `--al-space-section`, `--al-text-3xl`, `--al-tracking-tight`, `--al-weight-regular`
