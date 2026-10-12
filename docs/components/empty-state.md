# Empty state

Why there's nothing here, and the next action. Never a dead end.

**CSS:** [`css/components/empty-state.css`](../../css/components/empty-state.css). **Classes:** `.al-empty`, `.al-empty__text`, `.al-empty__title`.

## Anatomy

```html
<div class="al-empty">
  <p class="al-empty__title">No offers yet</p>
  <p class="al-empty__text">Work one out in the calculator, then save it to compare it with others.</p>
  <a class="al-button al-button--primary" href="/calc">Open the calculator</a>
</div>
```

## Variants and sizes

First use (explain and invite), no results (say what was searched and offer to clear filters), cleared ("All done").

## States

None.

## Keyboard

The action is the next stop.

## ARIA

Plain content; announce "No results" through a status region when it follows a search.

## Right to left

Mirrors.

## Do

- Offer exactly one next action.

## Don't

- Show an illustration in place of an explanation.

## Tokens

`--al-border-hairline`, `--al-color-line-strong`, `--al-color-text-muted`, `--al-radius-sm`, `--al-size-measure`, `--al-space-3`, `--al-space-5`, `--al-space-8`, `--al-text-lg`, `--al-tracking-none`, `--al-weight-medium`
