# Layout

Pages are composed from a few primitives (`css/layout.css`), all written with
logical properties, so they mirror with `dir` without extra rules.

| Class | Does |
|---|---|
| `.al-page` | The content column: centred, capped at `--al-size-page`, with the fluid gutter |
| `.al-section` | A website section: fluid space above and below; a hairline between two |
| `.al-stack` | Children one under another, spaced by `--al-stack-gap` (`--tight`, `--loose`) |
| `.al-cluster` | Children in a wrapping row (`--end`, `--between`) |
| `.al-grid` | As many columns of at least `--al-grid-min` (16rem) as fit |
| `.al-split` | A narrow column beside a wide one; stacked under `md` |
| `.al-measure` | Caps a block at the reading width |
| `.al-shell` | The app shell: sidebar and main; `data-sidebar="collapsed"` |

## Rules

- **Gap, not margin.** Components have no outer margin; their container spaces
  them. That's what keeps components reusable.
- **Reflow, don't break.** Content works from 320px wide (WCAG 1.4.10) with
  no horizontal page scroll. A wide table scrolls inside its own region
  (`.al-table-wrap`), never the page.
- **Logical properties only.** `margin-inline-start`, `inset-inline-end`,
  `padding-block`, `text-align: start`. Never `left`, `right`, `margin-left` or
  `float: left`. The one exception is a value axis on a chart, which stays put.
- **Text drives size.** Sizes are in rem so the layout follows the reader's
  font size; containers grow with their content rather than clipping it.
- **The primary action is never folded away.** Progressive disclosure hides
  detail, not the thing the page is for.
