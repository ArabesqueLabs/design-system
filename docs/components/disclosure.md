# Disclosure

A native `<details>` for what's secondary, optionally showing what's chosen inside it while closed (the fold with a summary value).

**CSS:** [`css/components/disclosure.css`](../../css/components/disclosure.css). **Classes:** `.al-disclosure`, `.al-disclosure__body`, `.al-disclosure__value`.

## Anatomy

```html
<details class="al-disclosure">
  <summary>Workplace pension <span class="al-disclosure__value">5%, salary sacrifice</span></summary>
  <div class="al-disclosure__body">…fields…</div>
</details>
```

## Variants and sizes

Plain (no value) and with `__value`. Stack several with no gap: each draws a rule above it.

## States

Hover: the summary takes the accent. Focus: the system outline on the summary. Open: the chevron turns down.

## Keyboard

Enter or Space on the summary toggles (native).

## ARIA

Native; nothing to add. The value is inside the summary, so it's read with the name.

## Right to left

The chevron points the way text reads (left in Arabic) and turns down when open; the value sits at the end.

## Do

- Show the current value in the summary, so it can be checked without opening it.
- Fold detail and rarely changed settings.

## Don't

- Fold the primary action, or an error.
- Nest disclosures more than one deep.

## Tokens

`--al-border-hairline`, `--al-color-accent`, `--al-color-line`, `--al-color-text-muted`, `--al-duration-fast`, `--al-ease-standard`, `--al-size-target-min`, `--al-space-2`, `--al-space-3`, `--al-space-4`, `--al-text-sm`, `--al-weight-medium`, `--al-weight-regular`
