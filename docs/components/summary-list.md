# Summary list

Facts as key–value pairs, each optionally with a Change link: the "check your answers" step, or a record's details.

**CSS:** [`css/components/summary-list.css`](../../css/components/summary-list.css). **Classes:** `.al-summary-list`, `.al-summary-list__actions`, `.al-summary-list__key`, `.al-summary-list__row`, `.al-summary-list__row--no-actions`, `.al-summary-list__value`.

## Anatomy

```html
<dl class="al-summary-list">
  <div class="al-summary-list__row">
    <dt class="al-summary-list__key">Full name</dt>
    <dd class="al-summary-list__value">…</dd>
    <dd class="al-summary-list__actions"><a href="#name">Change<span class="al-visually-hidden"> full name</span></a></dd>
  </div>
  <div class="al-summary-list__row al-summary-list__row--no-actions">…</div>
</dl>
```

## Variants and sizes

Rows with actions and read-only rows (`--no-actions`). Under the `sm` breakpoint the key stacks above the value.

## States

Static. Change links return to the question with the answer kept.

## Keyboard

Each Change link is a tab stop.

## ARIA

A definition list. Each Change link has a unique accessible name, completed by visually hidden text.

## Right to left

Columns mirror; values that are codes or emails sit in `<bdi>`.

## Do

- Show answers exactly as the person gave them.
- Mark read-only facts by leaving out the action, not by greying them.

## Don't

- Use it to compare values across items; that's a table.

## Tokens

`--al-border-hairline`, `--al-color-line`, `--al-space-1`, `--al-space-3`, `--al-space-5`, `--al-weight-medium`
