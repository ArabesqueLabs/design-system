# Phase banner

Tells people a service is new or experimental, and where to say what they think.

**CSS:** [`css/components/phase-banner.css`](../../css/components/phase-banner.css). **Classes:** `.al-phase-banner`, `.al-phase-banner__text`.

## Anatomy

```html
<div class="al-phase-banner">
  <span class="al-badge al-badge--warning">Experimental</span>
  <p class="al-phase-banner__text">This is new. <a href="…">Tell us what you think</a>.</p>
</div>
```

## Variants and sizes

One: a badge and a sentence, under the header.

## States

Static.

## Keyboard

Only the link is focusable.

## ARIA

The badge's word carries the meaning, not its colour.

## Right to left

The badge sits at the start.

## Do

- Say what the phase means for people (it may change, data may be reset).
- Link to a real feedback destination, or leave the link out.

## Don't

- Keep it once the service is stable.
- Use it for marketing messages.

## Tokens

`--al-border-hairline`, `--al-color-line`, `--al-color-text-muted`, `--al-space-1`, `--al-space-2`, `--al-space-3`, `--al-text-sm`
