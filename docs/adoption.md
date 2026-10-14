# Adoption

How hunt and arabesquelabs.com move onto the system, **one change at a time**,
each change shippable on its own and checked in all four theme × direction
combinations before the next. Nothing here has been done yet: the system was
built without touching either repository.

## Principles

- **Tokens first, then components, then interaction.** Each phase leaves the
  site working and looking (almost) the same.
- **Alias, then rename, then remove.** Old names point at new tokens for a
  release, so nothing breaks while call sites move.
- **One component per change**, with its screenshots in four combinations
  attached to the review.
- **Vendored, pinned.** Each site copies `dist/` at a tagged version (see the
  README's versioning) rather than linking to a moving target.

## hunt

hunt's CSS is plain (`src/web/tokens.css`, `src/web/style.css`, 1,322 lines),
built into the binary. It already uses logical properties and supports Arabic.

### Phase 1: tokens (one change)

Add `dist/tokens.css` before `style.css`, and alias hunt's names to the
system's so `style.css` keeps working:

```css
:root {
  --paper: var(--al-color-bg);
  --card: var(--al-color-surface);
  /* … */
}
```

| hunt today | System token | Note |
|---|---|---|
| `--paper` | `--al-color-bg` | |
| `--card` | `--al-color-surface` | |
| `--sunk` | `--al-color-surface-sunk` | |
| `--ink` | `--al-color-text` | |
| `--muted` | `--al-color-text-muted` | a text colour; ends the clash with the site's `--muted` (a surface) |
| `--line` | `--al-color-line` | hairlines only |
| `--line-strong` | `--al-color-line-strong` | |
| — | `--al-color-control` | **new**: borders of inputs, selects, segmented controls (fixes 1.37:1) |
| `--accent` | `--al-color-accent` | |
| `--accent-ink` | `--al-color-on-accent` | |
| `--accent-wash` | `--al-color-accent-wash` | |
| `--late`, `--late-wash` | `--al-color-danger`, `--al-color-danger-wash` | |
| `--soon`, `--soon-wash` | `--al-color-warning`, `--al-color-warning-wash` | light value darkened to amber 49 (4.9:1 on its wash) |
| — | `--al-color-info`, `--al-color-info-wash` | new, for neutral notices |
| `--backdrop` | `--al-color-backdrop` | |
| `--pattern` | `--al-color-pattern-line` | hunt's scaffold colour has no equivalent: drop it |
| `--viz-0…4` | `--al-color-chart-0…4` | same validated palette |
| `--sans`, `--serif`, `--mono` | `--al-font-sans`, `--al-font-serif`, `--al-font-mono` | gains the Arabic stacks |
| `--radius` | `--al-radius-sm` | |
| `--sidebar` | `--al-size-sidebar` | |

Then, in follow-up changes, replace the aliases in `style.css` with the
system names a section at a time, and delete the aliases. Load the Arabic web
fonts (IBM Plex Sans Arabic, Kufam, Amiri) at the same time, and replace
`[dir="rtl"] * { letter-spacing: 0 !important }` with the system's
`:lang(ar)` rules.

### Phase 2: base and layout

1. Replace hunt's reset and typography with `css/base.css` (via
   `dist/arabesque.css`, whose cascade layers sit under hunt's unlayered CSS,
   so hunt's rules still win while they exist).
2. Map font sizes onto the nine-step scale and paddings onto the spacing
   scale, a file region at a time.
3. Breakpoints: 720px and 640px → `md` (52rem) and `sm` (40rem); 900px → `lg`.

### Phase 3: components, one per change

| hunt today | System | Effect |
|---|---|---|
| `button.primary` | `.al-button.al-button--primary` | |
| `button` (default) | `.al-button` | |
| `.small-button` | `.al-button.al-button--sm` | |
| `.link-button`, `.app-add` | `.al-button.al-button--quiet` | targets grow to 24px |
| `button.danger` | `.al-button.al-button--danger` | |
| `.icon-button`, `button.icon`, `button.close` | `.al-button.al-button--icon` + `aria-label` | |
| `button:disabled` while busy | `aria-busy="true"` | busy no longer looks disabled |
| `p.muted.small`, `.th-hint`, `span.hint` | `.al-hint` (fields) or `.al-muted` | |
| `details.settings-group`, `.th-more`, `.th-fold` | `.al-disclosure` (+ `__value`) | one fold style |
| `.panel` | `.al-panel` | |
| `.app` (bordered card) | `.al-card` | |
| `dialog.ask`, `.wide`, `.import`, `.preview` | `.al-dialog` (+ `--md`) | |
| `.notice` (always red) | `.al-notice` + `--success`, `--warning`, `--danger` | neutral notices stop looking like errors |
| `.badge.active`, `.archived`, `.counter` | `.al-badge--accent`, `.al-badge`, `.al-badge--count` | |
| `.badge.experimental` (uppercase) | `.al-badge--warning`, sentence case | |
| `.tag-chip` (raw oklch colours) | `.al-tag` with a chart colour dot | |
| `.segmented` | `.al-segmented` | gains a 3:1 border |
| `.toast` | `js/toast.js` + `.al-toast` | Undo available everywhere, not only in bulk |
| `.empty` | `.al-empty` with its next action | |
| `.cols`, `.mc-*`, `.hbars`, `.viz-card` | `.al-chart`, `.al-split-bar`, `.al-bullet` | one chart helper set |
| sidebar | `.al-shell`, `.al-sidebar` | |

hunt's `h()` helper and `ltr()` stay; `ltr()` maps onto `.al-ltr` / `<bdi>`.
Its number formatting can move onto `js/format.js` to gain the
Arabic-Indic choice (a new setting under Settings → Language).

### Phase 4: interaction

The audit's hop table ([00-audit.md §6](00-audit.md)) is the plan, one task
per change:

1. Delete → Undo toast instead of the confirm dialog at its 17 call sites;
   keep confirmation for deleting an account and for replacing imports.
2. "Move to…" menu on the board card and the application header.
3. "Add a step" in view mode on the timeline.
4. Settings that save on change, with a save state beside them.
5. The offer toast's "Compare" link straight into the comparison.
6. Save states, changed-field marks and stale markers on the take-home page.

## arabesquelabs.com

A React site compiled with Tailwind v4 and shadcn naming; no Arabic yet.

### Phase 1: tokens

Import `dist/tokens.css` and `dist/tailwind-theme.css` in the site's CSS entry,
so Tailwind utilities resolve to the system's variables, then point shadcn's
names at them:

| Site today | System token |
|---|---|
| `--background` | `--al-color-bg` |
| `--foreground` | `--al-color-text` |
| `--card`, `--popover` | `--al-color-surface` |
| `--muted` | `--al-color-surface-sunk` |
| `--muted-foreground` | `--al-color-text-muted` |
| `--border` | `--al-color-line` |
| `--input` | `--al-color-control` |
| `--primary`, `--accent`, `--ring` | `--al-color-accent`, `--al-color-focus` |
| `--primary-foreground`, `--accent-foreground` | `--al-color-on-accent` |
| `--destructive` | `--al-color-danger` |
| `--chart-1…5` | `--al-color-chart-1…4`, `--al-color-chart-0` |
| `--pattern-line`, `--pattern-scaffold` | `--al-color-pattern-line`; `--al-color-pattern-scaffold` is deprecated (until 0.3): nothing in the system draws construction lines |
| `.dark` class | `data-theme="dark"` on `<html>` (keep `.dark` as an alias for one release) |

### Phase 2: focus and forced colours

Replace Tailwind ring utilities (box-shadow) with the system's outline focus;
add the base layer's forced-colours and reduced-motion rules.

### Phase 3: components and pattern

Swap the hero's pattern for `js/pattern.js` (same geometry, now drawn by
rule), the header and footer for the lockup and `.al-footer`, and buttons for
`.al-button`.

### Phase 4: Arabic

Add `/ar/` with `lang="ar" dir="rtl"`, the Arabic fonts, and copy written in
Arabic; the components need no changes for it.

## Done when

- No colour, size, space or radius in either site that isn't a token.
- No `left`/`right` in either site's CSS outside chart value axes.
- axe reports nothing, in four combinations, on every page.
- The two sites share `dist/`, at the same version.
