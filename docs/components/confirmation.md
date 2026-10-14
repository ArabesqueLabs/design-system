# Confirmation

Says that something has been done, gives a reference when there is one, and says what happens next. It ends a flow.

**CSS:** [`css/components/confirmation.css`](../../css/components/confirmation.css). **Classes:** `.al-confirmation`, `.al-confirmation__body`, `.al-confirmation__title`.

## Anatomy

```html
<div class="al-confirmation" tabindex="-1">
  <h2 class="al-confirmation__title">Request sent</h2>
  <p class="al-confirmation__body">Your reference <strong><bdi>…</bdi></strong></p>
</div>
<h2>What happens next</h2>
<p>…</p>
```

## Variants and sizes

One: a coloured panel with the title and, optionally, a reference.

## States

Static. On arrival, focus moves to the panel (`tabindex="-1"`) and the page title changes to say what was done.

## Keyboard

Not focusable by Tab; focus is moved to it once, programmatically.

## ARIA

The heading names the outcome. A reference is in `<bdi>` so it keeps its order in Arabic.

## Right to left

Text aligns to the start; the reference is isolated.

## Do

- Say what happened in the title, in the past tense.
- Only promise next steps that are true for the product; take them from the service, not the design system.
- Disable the send action once pressed, so the request can't be sent twice.

## Don't

- Show a confirmation before the work has actually succeeded.
- Show a made-up reference in production.

## Tokens

`--al-color-accent`, `--al-color-on-accent`, `--al-leading-heading`, `--al-radius-sm`, `--al-space-2`, `--al-space-6`, `--al-space-8`, `--al-text-2xl`, `--al-text-lg`, `--al-weight-semibold`
