# Popover

More about something, when it's asked for: a button opens it beside itself, in a native popover, with a title and a few lines.

**CSS:** [`css/components/popover.css`](../../css/components/popover.css). **Classes:** `.al-popover`, `.al-popover__title`.

## Anatomy

```html
<button class="al-button al-button--sm" popovertarget="tax" aria-expanded="false">What's a tax code?</button>
<div class="al-popover" id="tax" popover role="dialog" aria-labelledby="tax-title">
  <p class="al-popover__title" id="tax-title">Tax code</p>
  <p>It tells your employer how much tax to take from your pay.</p>
  <p><a href="…">Find your tax code</a></p>
</div>
<script type="module">
  import { initPopovers } from "/js/popover.js";
  initPopovers();
</script>
```

In React, `Popover` (`label`, `icon`, `title`). Put the popover right after its button, so Tab goes from one into the other.

## Variants and sizes

Opened by a small button with words, or by an icon button (`info`) named by its label, beside what it explains. Up to 20rem wide.

## States

Open or closed. Open, it sits below its button, at its start, flipping above if there's no room, and follows it while the page scrolls.

## Keyboard

Enter or Space on the button opens and closes it. Tab moves into it and on. Escape closes it, and focus goes back to the button.

## ARIA

The button has `aria-expanded`, kept true by `js/popover.js`. The popover is a non-modal `dialog`, named by its title. A click outside closes it (`popover="auto"`).

## Right to left

It opens at the button's start edge, on the right.

## Do

- A few lines, perhaps a link: what someone needs to answer the question beside it.
- A disclosure instead when the text belongs in the page.

## Don't

- Put actions in it: that's a menu, or a dialog.
- Open it on hover: that's a tooltip, and holds only a name.

## Tokens

`--al-border-hairline`, `--al-color-line-strong`, `--al-color-surface`, `--al-color-text`, `--al-leading-ui`, `--al-radius-sm`, `--al-space-2`, `--al-space-4`, `--al-text-base`, `--al-text-sm`, `--al-weight-semibold`
