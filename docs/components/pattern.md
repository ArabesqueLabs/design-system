# Pattern

The tessellation of the mark's tile, as background texture. `js/pattern.js` draws it by rule as SVG.

**CSS:** [`css/components/pattern.css`](../../css/components/pattern.css). **Classes:** `.al-pattern`, `.al-pattern--full`, `.al-pattern__art`.

## Anatomy

```html
<section class="al-pattern">
  <div class="al-pattern__art" aria-hidden="true" data-pattern></div>
  …content…
</section>
<script type="module">
  import { drawPattern } from "./js/pattern.js";
  for (const el of document.querySelectorAll("[data-pattern]")) drawPattern(el);
</script>
```

## Variants and sizes

Masked (default: fades out from the trailing side towards the start, where text begins) and `--full` (no mask: for a band with no text on it).

## States

**Rules:**
- Geometry: the 4.8.8 tiling (octagons and squares), side `--al-pattern-side` (32px), strands leaving each edge's midpoint at the contact angle (67.5°), meeting on each vertex's bisector; one repeat is side·(1+√2).
- Stroke: `--al-pattern-stroke` (1.25px) in `--al-color-pattern-line` (ink 22% in light, white 16% in dark); the scaffold in `pattern-scaffold`.
- Never moves; still under reduced motion by definition.
- Hidden under forced colours.

## Keyboard

None.

## ARIA

`aria-hidden="true"`; it's decoration.

## Right to left

The geometry never mirrors; the mask does, so the pattern clears behind the start side in both directions.

## Do

- Use on heroes and large empty areas, faded behind text.

## Don't

- Put it behind body text at full strength, animate it, or draw it by hand.

## Tokens

`--al-color-pattern-line`
