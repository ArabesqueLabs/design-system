# Stepper

Where a person is in a flow of three to six steps: each step named, the done ones ticked, the current one marked, and "Step 2 of 4" in words.

**CSS:** [`css/components/stepper.css`](../../css/components/stepper.css). **Classes:** `.al-stepper`, `.al-stepper__count`, `.al-stepper__name`, `.al-stepper__num`.

## Anatomy

```html
<nav class="al-stepper" aria-label="Progress">
  <p class="al-stepper__count">Step 2 of 4</p>
  <ol>
    <li data-done><svg class="al-icon al-icon--sm" aria-hidden="true">…</svg><a href="…"><span class="al-stepper__name">Your details</span><span class="al-visually-hidden"> (done)</span></a></li>
    <li aria-current="step"><span class="al-stepper__num" aria-hidden="true">2</span><span><span class="al-stepper__name">Contact</span></span></li>
    <li><span class="al-stepper__num" aria-hidden="true">3</span><span><span class="al-stepper__name">Payment</span></span></li>
    …
  </ol>
</nav>
```

In React, `Stepper` (`steps`, `current`, `href`).

## Variants and sizes

One. Done steps may be links back. Under 40rem only the current step's name shows; the others keep theirs for screen readers.

## States

Done: a bar in the accent above, a tick. Current: a bar in the accent, the name in bold. To come: a muted bar, a number.

## Keyboard

Only the links back to done steps are focusable.

## ARIA

A `nav` named "Progress"; the current step has `aria-current="step"`, and a done step says "(done)" in hidden text. "Step 2 of 4" is said first.

## Right to left

The first step is at the start, on the right. Numbers are in the page's digits.

## Do

- Name steps by what's asked in them ("Payment"), short.
- Keep the same steps from start to end; a step that may be skipped stays, and says so.

## Don't

- Use it for a long or branching job: that's a task list.
- Use it to show stages of how something is done: that's Steps.

## Tokens

`--al-color-accent`, `--al-color-line-strong`, `--al-color-text`, `--al-color-text-muted`, `--al-space-1-5`, `--al-space-2`, `--al-text-sm`, `--al-weight-semibold`
