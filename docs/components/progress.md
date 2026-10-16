# Loading and progress

Progress shown where the work happens: a spinner in the busy control or region, a skeleton where content will appear, a bar when progress can be measured.

**CSS:** [`css/components/progress.css`](../../css/components/progress.css). **Classes:** `.al-progress`, `.al-skeleton`, `.al-spinner`.

## Anatomy

```html
<button class="al-button al-button--primary" aria-busy="true">Saving offer</button>
<div aria-busy="true"><span class="al-skeleton" style="inline-size:60%"></span> …</div>
<p><span class="al-spinner" aria-hidden="true"></span> Loading offers</p>
<label class="al-label" for="imp">Importing, 60%</label><progress class="al-progress" id="imp" max="100" value="60"></progress>
```

## Variants and sizes

Spinner (unknown duration, short), skeleton (content arriving), bar (measurable).

The spinner is the mark's star: faint, with a bright segment going round its outline. It's the same in a busy button (`aria-busy="true"`) and a saving save state. It's `1.1em`, so it takes the size and colour of the text beside it; set `font-size` for a bigger one.

## States

Under reduced motion the spinner is the whole star, still, and skeletons don't shimmer.

## Keyboard

None.

## ARIA

`aria-busy="true"` on the region; a spinner has text beside it; `<progress>` has a label.

## Right to left

The bar fills from the start (right in Arabic).

## Do

- Show a skeleton in the shape of what's coming.
- Show counts for long work ("12 of 40 files").

## Don't

- Block the whole page with a spinner after the first load.
- Use the spinner alone for a wait of more than a few seconds: say what's happening.

## Tokens

`--al-color-accent`, `--al-color-surface`, `--al-color-surface-sunk`, `--al-radius-full`, `--al-radius-sm`
