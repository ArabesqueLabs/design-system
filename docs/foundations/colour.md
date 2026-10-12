# Colour

Colours are named for their **role**, never their hue: `--al-color-accent`, not
`--al-teal`. A role has one value per theme; components use roles only.
Primitives (`--al-color-sand-95`, `--al-color-teal-46`…) exist to build roles
and are not used directly in components.

## Roles

| Token | Use it for | Light | Dark |
|---|---|---|---|
| `bg` | The page | Cream (sand 95) | Night (slate 18) |
| `surface` | Cards, panels, inputs, menus, dialogs | sand 98 | slate 21 |
| `surface-sunk` | Wells, hover, table head, affixes | sand 92 | slate 24 |
| `text` | Body text, headings | Ink (slate 25) | Pale (sand 93) |
| `text-muted` | Hints, labels of secondary things, axes | slate 45 | sand 74 |
| `line` | Hairlines: dividers, card borders, table rules | sand 88 | white 12% |
| `line-strong` | Dividers that need to be seen (selected, dashed frames) | ink 45% | white 40% |
| `control` | The border of anything you operate: inputs, buttons, checkboxes | slate 62 | slate 62 |
| `accent` | Primary actions, links, focus, the selected tab; success | Teal | Mint |
| `on-accent` | Text on an accent fill | sand 98 | slate 18 |
| `accent-wash` | Selected rows, highlighted totals | teal 10% | mint 12% |
| `focus` | The focus outline | Teal | Mint |
| `danger`, `danger-wash` | Errors, and actions that destroy | red 52 | red 68 |
| `warning`, `warning-wash` | Needs attention; unsaved | amber 49 | amber 80 |
| `success`, `success-wash` | Done, saved (the accent) | Teal | Mint |
| `info`, `info-wash` | Neutral information | blue 48 | blue 80 |
| `inverse`, `on-inverse` | Toasts, tooltips, the bulk bar | Ink on Cream | Pale on Night |
| `backdrop` | Behind a modal dialog | ink 45% | black 60% |
| `chart-0…4` | Chart series, in this order; 0 is "other" | see below | |
| `pattern-line`, `pattern-scaffold` | The tessellation's strands and its guide lines | ink 22% / 10% | white 16% / 8% |

All tokens are prefixed: `var(--al-color-surface)`.

## Rules

- **Contrast is computed, not judged.** `scripts/build.mjs` measures every pair
  the system relies on, in both themes, and the build fails if any falls short:
  4.5:1 for text, 3:1 for control borders, focus and chart marks. Translucent
  grounds (washes) are measured on both the page and the surface, and the worse
  counts. The results are in [`../contrast.md`](../contrast.md).
- **Hairlines aren't boundaries.** `line` is decoration (1.3:1), so anything a
  person has to find — an input, a checkbox, a button — is drawn in `control`
  (3:1 or better against every ground).
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
| 0 other / track | sand 82 | white 20% |

Assign them in this order and never cycle: a fifth series folds into "Other".
A series keeps its colour when others are filtered out. Status colours
(danger, warning, success) are never chart series.
