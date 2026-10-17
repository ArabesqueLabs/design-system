# Colour

Colours are named for their **role**, never their hue: `--al-color-accent`, not
`--al-teal`. A role has one value per theme; components use roles only.
Primitives (`--al-color-cloud-98`, `--al-color-teal-51`…) exist to build roles
and are not used directly in components. Every primitive is used by a role
(`tests/system.test.js` checks it).

## Roles

The values below are the primitives each role points to, from
`tokens/tokens.json`; a percentage is a translucent colour.

| Token | Use it for | Light | Dark |
|---|---|---|---|
| `bg` | The page | cloud 98 | Night (slate 18) |
| `surface` | Cards, panels, inputs, menus, dialogs | white | slate 21 |
| `surface-sunk` | Wells, hover, table head, affixes | cloud 96 | slate 24 |
| `text` | Body text, headings | cloud 21 | Pale (sand 93) |
| `text-muted` | Hints, labels of secondary things, axes; stale figures | cloud 45 | sand 74 |
| `line` | Hairlines: dividers, card borders, table rules | cloud 93 | white 12% |
| `line-strong` | Dividers that need to be seen (selected, dashed frames) | cloud 21 at 40% | white 40% |
| `control` | The border of anything you operate: inputs, buttons, checkboxes | slate 62 | slate 62 |
| `accent` | Primary actions, links, focus, the selected tab; success | teal 51 | Mint (teal 83) |
| `accent-hover` | A primary button, hovered | teal 43 | teal 91 |
| `on-accent` | Text on an accent or danger fill | white | slate 18 |
| `accent-wash` | Selected rows, highlighted totals | teal 12% | mint 12% |
| `focus` | The focus outline | teal 51 | Mint |
| `focus-on-inverse` | The focus outline on the inverse ground (bulk bar, toasts) | Mint | teal 51 |
| `danger`, `danger-wash` | Errors, and actions that destroy | red 54 | red 68 |
| `danger-hover` | A filled danger button, hovered | red 46 | red 78 |
| `warning`, `warning-wash` | Needs attention; unsaved | amber 49 | amber 80 |
| `success`, `success-wash` | Done, saved (the accent) | teal 51 | Mint |
| `info`, `info-wash` | Neutral information | blue 53 | blue 80 |
| `inverse`, `on-inverse` | Toasts, tooltips, the bulk bar | cloud 98 on cloud 21 | slate 18 on Pale |
| `backdrop` | Behind a modal dialog | cloud 21 at 45% | black 60% |
| `chart-1…4` | Chart series, in this order | see below | |
| `chart-0` | The neutral: tracks and grounds, never a series of data | cloud 87 | white 20% |
| `tint-*-bg`, `tint-*-ink` | Tags, highlights, avatars: identity, never status | see `tint.md` | |
| `syntax-*` | Code: keyword, string, number, comment, function, tag, attribute; each says what kind of word it is | purple, green, orange, grey, blue, teal, raspberry (inks) | their pale counterparts |
| `pattern-line` | The tessellation's strands, in ink as on arabesquelabs.com | cloud 21 at 26% | white 20% |
| `pattern-scaffold` | The tiling's polygons: the hero's scaffolding while it draws in, and the construction figure | cloud 21 at 12% | white 10% |
| `pattern-focal` | The hero's focal tile | the accent | the accent |
| `pattern-focal-fill` | Inside the focal tile's star | teal at 16% | mint at 16% |

All tokens are prefixed: `var(--al-color-surface)`.

## Rules

- **Contrast is computed, not judged.** `scripts/build.mjs` measures every pair
  the system relies on, in both themes, and the build fails if any falls short:
  4.5:1 for text, 3:1 for control borders, focus (on every ground it can
  be drawn on, the inverse one too) and chart marks. Translucent
  grounds (washes) are measured on both the page and the surface, and the worse
  counts. The results are in [`../contrast.md`](../contrast.md).
- **Hairlines aren't boundaries.** `line` is decoration (1.3:1), so anything a
  person has to find — an input, a checkbox, a button — is drawn in `control`
  (3:1 or better against every ground).
- **Syntax colour means something.** In code, a colour says what kind of word
  it is (a keyword, a string, a name), the same in every sample on every page,
  so a reader learns it once. Only the `syntax-*` roles colour code, and each
  is measured on the code's ground, the surface and a marked line.
- **Colour is never the only signal.** Every status has an icon and a word
  ("Saved", "Couldn't save"); errors have an icon and text; chart series have a
  key, and their values are in a table or tooltip.
- **Success shares the accent.** Teal is the brand's one colour; "done" and
  "go" are the same idea here. It's always paired with a check icon and a word,
  so it never reads as a mere link.
- **No shadows.** Depth comes from the surface steps (`bg` → `surface` →
  `surface-sunk`) and from borders.
- **One accent per view.** The primary button, the current tab and links share
  it; don't add a second brand colour for emphasis.
- **Washes are tints of their role** (`danger-wash` under a danger notice), and
  only behind text in the same role or `text`.

## Themes

Light is the default. Dark follows `prefers-color-scheme: dark`, and
`data-theme="light|dark"` on `<html>` overrides the system both ways
(`js/theme.js` remembers the choice as `al-theme`). Dark is designed, not
inverted: the accent lightens to Mint, danger and warning lighten to keep
their contrast, and hairlines become translucent white so they sit on any
surface.

With `prefers-contrast: more`, secondary text becomes body text, hairlines
become control borders and focus thickens to 3px (`css/base.css`). With
`forced-colors: active`, components fall back to system colours and keep
their borders and focus (each component's CSS has its own rule where needed).

## Charts

The series colours come from hunt's palette, checked for colour-vision
deficiency (adjacent pairs ≥ 8 ΔE in OKLab under protanopia, deuteranopia and
tritanopia) with the dataviz validator, in each theme against its surface:

| Order | Light | Dark |
|---|---|---|
| 1 green | `#007a5c` | `#3ba888` |
| 2 orange | `#c26300` | `#ca7e31` |
| 3 blue | `#3d73b6` | `#5188cd` |
| 4 raspberry | `#b8336a` | `#d75b8f` |
| 0 track (not data) | cloud 87 | white 20% |

Assign them in this order and never cycle: a fifth series folds into "Other",
which takes the next series colour, not `chart-0`. `chart-0` is too light to
be read as data (it's under 3:1), so it's only for tracks and grounds. In
markup, a mark's series is `data-series="1"` to `"4"` (see `chart.md`).
A series keeps its colour when others are filtered out. Status colours
(danger, warning, success) are never chart series.
