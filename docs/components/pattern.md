# Pattern

The tessellation of the mark's tile, drawn by rule as SVG (`js/pattern.js`). Two forms: **texture**, behind a band; and **the hero**, across the top of a site with one focal tile in the accent, as on arabesquelabs.com.

**CSS:** [`css/components/pattern.css`](../../css/components/pattern.css). **Classes:** `.al-pattern`, `.al-pattern--full`, `.al-pattern--hero`, `.al-pattern--quiet`, `.al-pattern__art`, `.al-pattern__caption`.

## Anatomy

Texture:

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

The hero:

```html
<section class="al-pattern al-pattern--hero">
  <div class="al-pattern__art" aria-hidden="true" data-pattern-hero></div>
  …header, heading, lede, actions…
  <p class="al-pattern__caption" data-pattern-caption>This tile is our mark. Everything around it follows from the same rule.</p>
</section>
<script type="module">
  import { drawHero } from "./js/pattern.js";
  for (const el of document.querySelectorAll("[data-pattern-hero]")) drawHero(el, { animate: true });
</script>
```

## Variants and sizes

- **Texture, masked** (default): fades out from the trailing side towards the start, where text begins.
- **Texture, `--full`**: no mask, for a band with no text on it.
- **Quiet, `--quiet`**: no mask and fainter (`--al-color-pattern-quiet`, ink at 14%, white at 10% in dark), for a small area with nothing on it: an empty state, a card's corner.
- **As a file**: where the pattern can't be drawn (email, slides, a static page), the build writes one seamless repeat to `dist/patterns/`: `tile.svg` and `tile-dark.svg` (the texture's colour, for light and dark grounds), `tile-quiet.svg` and `tile-quiet-dark.svg`. Use one as a `background-image`, behind a fade where text is near.
- **The hero, `--hero`**: for the one section that introduces a site. One quiet line across the whole section, and one octagon, the focal tile, about three quarters across and half way down: its star filled and outlined in the accent, its octagon outlined at reduced opacity. The caption sits under the focal tile, its rule starting at the tile's centre. Under the md breakpoint, where the text takes the whole width, there's no focal tile and no caption.

## States

**Rules:**
- Geometry: the 4.8.8 tiling (octagons and squares), strands leaving each edge's midpoint at the contact angle `--al-pattern-contact-angle` (67.5°), meeting on each vertex's bisector; one repeat is side·(1+√2). Both forms read their geometry from the tokens.
- Texture: side `--al-pattern-side` (32px; `--al-pattern-side-narrow`, 22px, under md), stroke `--al-pattern-stroke` (1.25px).
- Hero: side `--al-pattern-hero-side` (46px; `--al-pattern-hero-side-narrow`, 30px, under md), strands `--al-pattern-hero-stroke` (1px), the focal star `--al-pattern-focal-stroke` (1.6px) in `--al-color-pattern-focal` over `--al-color-pattern-focal-fill`.
- Both draw their strands in `--al-color-pattern-line` (quiet texture in `--al-color-pattern-quiet`): ink at 26% (white at 20% in dark), light enough for the hero's heading and lede to sit on. In the hero they fall to a fifth of that behind the start side, where the heading and lede are, and come back in full towards the focal tile; under md, where the text takes the whole width, they're at a third everywhere. Keep body copy out of the hero.
- Texture never moves. The hero may draw itself in once when the page loads (`animate: true`), the way it's constructed: the tiling appears as scaffolding (`--al-color-pattern-scaffold`), the strands draw outwards from the focal tile over 1.8 seconds, then the scaffolding fades and the focal tile and caption appear. It's the one motion that plays on load, and it never plays under reduced motion.
- `drawHero` redraws when the section's width changes; call it again after switching `dir`.
- Both are hidden under forced colours.

## Keyboard

None.

## ARIA

The art is `aria-hidden="true"`: it's decoration. The caption is ordinary text, in the page's language.

## Right to left

The geometry never mirrors; the layout does. Texture's mask clears behind the start side in both directions. The hero's focal tile moves to a quarter across, and its caption's rule runs towards the trailing side.

## Do

- Use texture on bands and large empty areas, faded behind text.
- Use the hero once, on the section that introduces a site or product, with the heading and lede on the leading side and the caption saying what the teal tile is.

## Don't

- Put body copy over either, draw either by hand, or use a raster image of the pattern.
- Use the hero more than once on a page, or animate texture.

## Tokens

`--al-color-pattern-line`, `--al-color-pattern-quiet`, `--al-color-pattern-scaffold`, `--al-color-pattern-focal`, `--al-color-pattern-focal-fill`, `--al-color-accent`, `--al-color-text-muted`, `--al-pattern-side`, `--al-pattern-side-narrow`, `--al-pattern-stroke`, `--al-pattern-contact-angle`, `--al-pattern-hero-side`, `--al-pattern-hero-side-narrow`, `--al-pattern-hero-stroke`, `--al-pattern-focal-stroke`, `--al-space-3`, `--al-space-12`, `--al-text-sm`, `--al-leading-prose`, `--al-border-hairline`, `--al-ease-standard`
