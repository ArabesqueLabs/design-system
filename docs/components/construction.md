# Construction figure

How the pattern is made, in three steps, each read as software: tile the plane (modules), draw the strands at a fixed angle (interfaces), remove the scaffolding (the system). As on arabesquelabs.com. An optional slider redraws steps 2 and 3 at another contact angle.

**CSS:** [`css/components/construction.css`](../../css/components/construction.css). **Classes:** `.al-construction`, `.al-construction__steps`, `.al-construction__art`, `.al-construction__title`, `.al-construction__num`, `.al-construction__aside`, `.al-construction__control`.

## Anatomy

```html
<figure class="al-construction" data-construction>
  <ol class="al-construction__steps">
    <li>
      <div class="al-construction__art" data-construction-step="1" role="img" aria-label="Octagons and squares tiling a square."></div>
      <p class="al-construction__title"><span class="al-construction__num"><bdi>1</bdi></span> Tile the plane with simple shapes.</p>
      <p class="al-construction__aside">In software: modules.</p>
    </li>
    …steps 2 and 3…
  </ol>
</figure>
<script type="module">
  import { initConstruction } from "./js/pattern.js";
  initConstruction();
</script>
```

## Variants and sizes

Without a slider (as on the site), or with one: add a `.al-construction__control` holding a labelled `<input type="range" min="45" max="78.75" step="0.5" value="67.5" data-construction-angle>` and an `<output data-construction-value>`. Each panel is a framed square on the surface, at most 16rem wide; the steps sit side by side and wrap on narrow screens.

## States

**Rules:**
- Step 1: the tiling in `--al-color-pattern-scaffold`.
- Step 2: the tiling, with the strands in `--al-color-accent`.
- Step 3: the strands alone, in `--al-color-text`.
- With the slider, steps 2 and 3 follow its angle; step 1 doesn't depend on it. The mark and the hero stay at 67.5°.
- Numbers are real sequence markers, in the accent with tabular figures.

## Keyboard

The slider, if there is one, is a native range input: arrows move it 0.5°, Page Up and Page Down further, Home and End to its ends.

## ARIA

Each panel is `role="img"` with an `aria-label` that says what it shows. The slider has a visible label, and its value is said as degrees (`aria-valuetext`).

## Right to left

The steps run from the right. The drawings never mirror.

## Do

- Use it once, where a page explains the name or the method.
- Write the asides in the page's language ("في البرمجيات: الوحدات.").

## Don't

- Number things with it that aren't steps.

## Tokens

`--al-color-pattern-scaffold`, `--al-color-accent`, `--al-color-text`, `--al-color-text-muted`, `--al-color-line`, `--al-color-surface`, `--al-font-serif`, `--al-leading-prose`, `--al-border-hairline`, `--al-space-3`, `--al-space-4`, `--al-space-5`, `--al-space-6`, `--al-space-8`, `--al-size-target-min`
