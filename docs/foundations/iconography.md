# Iconography

24 line icons (`icons/*.svg`), compiled into one sprite (`dist/icons.svg`):

```html
<svg class="al-icon" aria-hidden="true"><use href="/dist/icons.svg#al-icon-check"></use></svg>
```

## Drawing

- A 24-unit grid with a 2-unit margin; 1.5 stroke; square caps and mitred
  joins, to match the mark's straight, crisp geometry.
- Drawn in `currentColor`, so an icon takes its text's colour, in any theme and
  under forced colours.
- Shown at `--al-size-icon` (18px) beside text; `.al-icon--sm` (16px) inside
  small controls and notes; `.al-icon--lg` (24px) alone.

## Use

- **Decorative icons are hidden** (`aria-hidden="true"`): the text beside them
  carries the meaning.
- **An icon alone in a control** gets its name from the control
  (`aria-label="Edit offer"`), and a tooltip that repeats it.
- **Status icons always come with a word**: `success` (a check in a circle) with
  "Saved", `danger` with the error, `warning` with what needs attention.
- **Don't invent metaphors.** If no icon says it plainly, use a word.

## Mirroring

Icons that point along the reading direction mirror in right-to-left with
`.al-mirror`: **chevron, arrow, undo, retry, external, sidebar**. Everything
else keeps its drawing: a check, a clock, a calendar and a search glass don't
have a direction. Media controls (play, rewind) never mirror; time on a
player runs left to right in Arabic interfaces too.

See [`../../icons/README.md`](../../icons/README.md) for the list and for adding one.

## Imagery

The pattern, the construction figure and real screens of real products are
the imagery. Nothing else stands in for them:

- No stock photos, and no AI-generated illustrations.
- No mosques, domes, arches, crescents or lanterns; no Arabic calligraphy as
  decoration; no Latin letters dressed up to look Arabic; no "Arabian
  nights" styling. The heritage is in the geometry, used as it's made.
- No circuit boards, glowing code or curly-bracket clichés for "software".
