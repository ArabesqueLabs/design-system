# Space and shape

## Space

One 4px step (`--al-space-1` = 0.25rem), with two half-steps for fine
adjustments:

| Token | Value | Typical use |
|---|---|---|
| `space-0-5` | 2px | Between an icon and its badge |
| `space-1` | 4px | Inside badges; between a label and its control |
| `space-1-5` | 6px | Between an icon and its text |
| `space-2` | 8px | Between items in a tight stack; hint below a field |
| `space-3` | 12px | Between controls in a cluster; field padding |
| `space-4` | 16px | The default gap; card padding (small) |
| `space-5` | 20px | Card padding |
| `space-6` | 24px | Between groups in a form |
| `space-8` | 32px | Between sections in an app view |
| `space-12`, `space-16` | 48px, 64px | Large separations on a website |
| `space-section` | 48–144px, fluid | Above and below a website section |
| `space-gutter` | 16–64px, fluid | The page's side padding |

hunt had 91 distinct paddings; spacing now comes from this list only. Space
is set by **layout primitives** (`.al-stack`, `.al-cluster`, `.al-grid`) through
`gap`, not by margins on components, so a component never pushes on what's
around it.

## Shape

- **Radius:** `radius-sm` (2px) on everything: buttons, inputs, cards, dialogs.
  `radius-md` (4px) only for the rounded data-end of a chart bar.
  `radius-full` for pills (switches, counts, avatars).
- **Borders:** `border-hairline` (1px) everywhere; `border-focus` (2px) for the
  focus outline, the selected tab underline and status edges.
- **No shadows**, anywhere. The only exception is none.

## Sizes

| Token | Value | For |
|---|---|---|
| `size-control-md` | 40px | Buttons and fields |
| `size-control-sm` | 32px | Small buttons and dense tables |
| `size-target-min` | 24px | The minimum for any target (WCAG 2.5.8) |
| `size-target-touch` | 44px | Touch-first surfaces (mobile toolbars) |
| `size-icon` | 18px | Icons beside text |
| `size-measure` | 65ch | Reading width |
| `size-page` | 1200px | The page's content width |
| `size-dialog-sm`, `-md` | 480px, 768px | Dialog widths |
| `size-sidebar`, `-collapsed` | 224px, 60px | The app sidebar |

## Breakpoints

Three, all in rem so they follow the reader's font size: `sm` 40rem (640px),
`md` 52rem (832px), `lg` 64rem (1024px). Most layout needs none of them:
`.al-grid` reflows by its minimum column width. hunt's six breakpoints in two
units collapse onto these three.
