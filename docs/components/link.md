# Text link

A link that stands on its own, beside a primary button or after a paragraph ("See how we build"): underlined in the accent, with an arrow when it goes on to a next step, or an icon when it leaves the site.

**CSS:** [`css/components/link.css`](../../css/components/link.css). **Classes:** `.al-link`, `.al-link--arrow`, `.al-link--muted`.

## Anatomy

```html
<a class="al-link al-link--arrow" href="#approach">See how we build <svg class="al-icon al-mirror" aria-hidden="true">…arrow…</svg></a>

<a class="al-link" href="https://example.com" target="_blank" rel="noopener">The guidance
  <svg class="al-icon al-mirror" aria-hidden="true">…external…</svg><span class="al-visually-hidden">(opens in a new tab)</span></a>

<a class="al-link al-link--muted" href="/privacy">Privacy notice</a>
```

## Variants and sizes

| Variant | Use |
|---|---|
| Plain | A link on its own |
| `--arrow` | On to a next step: the second action beside a primary button |
| External | To another site: the external icon, a new tab, and "(opens in a new tab)" for screen readers |
| `--muted` | Footers and legal lines |

It takes the size of the text around it. Links inside running text need none of this: they're underlined by the base styles.

## States

Hover: the accent colour and a thicker underline; the arrow moves 3px along the reading direction (not under reduced motion). Focus: the system outline. Visited links look the same.

## Keyboard

Enter follows it.

## ARIA

A native `<a href>`. Its text says where it goes. The icons are `aria-hidden`; an external link adds "(opens in a new tab)" as visually hidden text.

## Right to left

The arrow and the external icon mirror (`.al-mirror`), and the arrow moves to the left on hover. Isolate a Latin run inside Arabic link text (an address, a name) with `<bdi>`.

## Do

- Pair one primary button with a text link for the second action, on a marketing page.
- Name the destination: "See how we build", "Read the privacy notice".

## Don't

- Write "click here" or "learn more".
- Open a new tab for a link on the same site.

## Tokens

`--al-color-accent`, `--al-color-text`, `--al-color-text-muted`, `--al-duration-fast`, `--al-ease-standard`
