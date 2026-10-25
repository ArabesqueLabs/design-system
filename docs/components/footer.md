# Footer

Who made it, where to go next, and the legal line; quiet, and the same on every page.

**CSS:** [`css/components/footer.css`](../../css/components/footer.css). **Classes:** `.al-footer`, `.al-footer__legal`, `.al-footer__links`, `.al-footer__attribution`.

## Anatomy

```html
<footer class="al-footer">
  <a class="al-lockup" href="/">…</a>
  <ul class="al-footer__links"><li><a href="/privacy">Privacy</a></li></ul>
  <p class="al-footer__legal">© 2026 Arabesque Labs Ltd. Structure. Clarity. Craftsmanship.</p>
</footer>
```

## Variants and sizes

One.

Without the lockup (in React, `lockup={false}`) when the page's header already has it: the legal line takes its place, first, on the links' row and centred with them. Under the legal line, the product's attribution (`.al-footer__attribution`, in React `attribution`): an [attribution](attribution.md), the component or its image for the theme.

## States

Links: muted, accent and underlined on hover.

## Keyboard

Natural order.

## ARIA

`<footer>` at page level is the contentinfo landmark; a list of links may sit in a `nav` with its own name.

## Right to left

Mirrors with the layout.

## Do

- Keep it short.

## Don't

- Repeat the main navigation in full.

## Tokens

`--al-border-hairline`, `--al-color-accent`, `--al-color-line`, `--al-color-text-muted`, `--al-space-2`, `--al-space-4`, `--al-space-5`, `--al-space-8`, `--al-text-sm`, `--al-text-xs`
