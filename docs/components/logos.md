# Logo wall

Who uses it: their marks in one colour, as many to a row as fit.

**CSS:** [`css/components/logos.css`](../../css/components/logos.css). **Classes:** `.al-logos`, `.al-logos__wordmark`.

## Anatomy

```html
<ul class="al-logos" aria-label="Who builds with it">
  <li><img src="organisation-a.svg" alt="Organisation A"></li>
  <li><svg role="img" aria-labelledby="org-b"><title id="org-b">Organisation B</title>…</svg></li>
  <li><span class="al-logos__wordmark">Organisation C</span></li>
</ul>
```

In React, `Logos` (`label`, `logos`) and `LogoWordmark`.

## Variants and sizes

Logos as images (shown in grey), as SVG (drawn in `currentColor`, the muted text colour), or as a wordmark in type with an icon, for a logo you don't have as a file. Up to 2rem tall; as many to a row as fit at 9rem.

## States

None: still. Never a scrolling marquee.

## Keyboard

None, unless a logo links to its story; then Tab reaches each link.

## ARIA

A list, named (`aria-label`) when no heading names it. Each image's `alt` is the name, not "logo"; an SVG has `role="img"` and a `<title>`.

## Right to left

The list follows the reading direction. Logos and wordmarks keep their own script and direction (`lang`).

## Do

- Show only those who've agreed to be shown.
- Keep them the same height, so none shouts.

## Don't

- Animate them across the page.
- Mix logos in their colours with logos in grey.

## Tokens

`--al-color-text-muted`, `--al-font-display`, `--al-space-6`, `--al-space-8`, `--al-text-lg`, `--al-tracking-tight`, `--al-weight-medium`
