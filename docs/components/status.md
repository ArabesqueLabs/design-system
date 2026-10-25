# Status

A state in a word ("Online", "Degraded", "Down"), with a dot before it in the state's colour. The word is the meaning; the dot repeats it.

**CSS:** [`css/components/status.css`](../../css/components/status.css). **Classes:** `.al-status`, `.al-status--danger`, `.al-status--info`, `.al-status--live`, `.al-status--success`, `.al-status--warning`.

## Anatomy

```html
<span class="al-status al-status--success">Online</span>
<span class="al-status al-status--info al-status--live">Deploying</span>
<!-- the dot alone, the word for screen readers -->
<span class="al-status al-status--success"><span class="al-visually-hidden">Online</span></span>
```

In React, `Status` (`tone`, `live`, `dotOnly`).

## Variants and sizes

Neutral (the default, muted), `--success`, `--warning`, `--danger`, `--info`. `--live` pulses the dot, for something happening now. One size, the small text.

## States

Static; `--live` pulses, and is still with reduced motion.

## Keyboard

Not focusable.

## ARIA

The word is the status. With the dot alone, the word is visually hidden inside it, so it's read in place. When a status changes while the page is open and it matters now, say so in a live region too (a toast, or the region's own `role="status"`).

## Right to left

The dot is at the start, on the right.

## Do

- One word, or two: what it is now, not what happened.
- A badge for a label on a thing ("Beta"); a status for the state of a running thing.

## Don't

- Use the dot alone where there's no word nearby, or in a tooltip, to say it.
- Pulse more than one thing on a page.

## Tokens

`--al-color-danger`, `--al-color-info`, `--al-color-success`, `--al-color-text-muted`, `--al-color-warning`, `--al-ease-standard`, `--al-radius-full`, `--al-space-1-5`, `--al-text-sm`
