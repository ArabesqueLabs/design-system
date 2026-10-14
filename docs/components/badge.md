# Badge and tag

A badge is a short status beside something ("Active", "Experimental", a count). A tag is a label people add and remove.

**CSS:** [`css/components/badge.css`](../../css/components/badge.css). **Classes:** `.al-badge`, `.al-badge--accent`, `.al-badge--count`, `.al-badge--danger`, `.al-badge--info`, `.al-badge--outline`, `.al-badge--success`, `.al-badge--warning`, `.al-tag`, `.al-tag__remove`.

## Anatomy

```html
<span class="al-badge al-badge--warning">Experimental</span>
<span class="al-badge al-badge--count">3<span class="al-visually-hidden"> unread</span></span>
<span class="al-tag" style="--al-tag-color: var(--al-color-chart-1)">Dream job
  <button type="button" class="al-tag__remove" aria-label="Remove tag Dream job">×</button></span>
```

## Variants and sizes

Badges: neutral (default), `--accent`, `--success`, `--warning`, `--danger`, `--info`, `--outline`, `--count`. Tags take a dot colour from `--al-tag-color` (a chart colour).

## States

Badges are static. A tag's remove button: danger on hover, the outline on focus, a 24px target.

## Keyboard

Only the tag's remove button is focusable.

## ARIA

The words are the status; a count says its noun in visually hidden text (an `aria-label` on a `span` isn't read: a span has no role to name). The remove button names its tag.

## Right to left

Follow the reading direction; the tag's dot sits at the start.

## Do

- Sentence case, one or two words.
- "Experimental" for features that may change, with a sentence nearby saying what that means.

## Don't

- Uppercase.
- Use colour alone to distinguish badges; the word is the meaning.

## Tokens

`--al-border-focus`, `--al-border-hairline`, `--al-color-accent`, `--al-color-accent-wash`, `--al-color-chart-0`, `--al-color-danger`, `--al-color-danger-wash`, `--al-color-focus`, `--al-color-info`, `--al-color-info-wash`, `--al-color-line`, `--al-color-line-strong`, `--al-color-success`, `--al-color-success-wash`, `--al-color-surface`, `--al-color-surface-sunk`, `--al-color-text`, `--al-color-text-muted`, `--al-color-warning`, `--al-color-warning-wash`, `--al-radius-sm`, `--al-size-target-min`, `--al-space-1`, `--al-space-1-5`, `--al-space-2`, `--al-tag-color`, `--al-text-sm`, `--al-text-xs`, `--al-weight-medium`
