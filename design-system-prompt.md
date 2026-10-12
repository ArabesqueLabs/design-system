# Prompt: the Arabesque Labs design system

Paste everything below the line into Claude Code, started in
`~/workspace/arabesque-design-system/`.

---

You are a senior design-systems engineer. Create the **Arabesque Labs design
system** in this directory (`~/workspace/arabesque-design-system/`), so that
arabesquelabs.com, hunt (hunt.mosab.me) and future products share one
coherent, accessible, bidirectional foundation. Work in two phases, and stop
after Phase 1 for my review.

## Sources: read these first, in this order of authority

1. **Brand assets**, the final identity: `~/Dropbox/Arabesque Labs/Brand/Logo Pack/`
   (README.txt, `01-vector/*.svg`). Brand colours: Ink #1A202E, Teal #136555,
   Cream #EFEFEB, Night #0E121A, Pale #E8E7E3, Mint #7CDCB9.
2. **Live code**, what's shipped:
   - `~/workspace/arabesquelabs.com/index.html` (static HTML, compiled Tailwind,
     oklch tokens: `--background`, `--foreground`, `--accent`, `--pattern-line`…).
   - `~/workspace/hunt/src/web/tokens.css`, `style.css` and `site/*.css` (the same
     tokens; a full app UI: forms, tables, dialogs, charts, sidebar, Arabic RTL).
3. **Brand rules**, the concept, voice, motion and "never" list:
   `loveable/loveable-knowledge-settings.md` here. Its hex colours are an older
   draft: where they disagree with 1–2, sources 1–2 win.

The concept to carry through: **the mark is one tile; every surface is its
tessellation** (Hankin's polygons-in-contact on the 4.8.8 tiling, contact angle
67.5°). Calm, precise, plain British English, sentence case, no hype.

## Requirements

- **Efficient interaction, with every consequence visible.** This is the
  system's main principle: the fewest steps to get something done, actions
  that say exactly what they do, and side effects shown before they happen
  and while they're pending.
  - **Minimal hops:**
    - Edit in place where it's safe.
    - Sensible defaults, remembered choices, and figures that update as
      people type rather than "Calculate" buttons.
    - Bulk actions where people act on many things.
    - Keyboard paths, and no dead ends: every empty or error state offers the
      next action.
    - Reveal details progressively, but never hide the primary action.
  - **Clear actions:**
    - Labels are verb + object ("Save offer", "Archive 3 processes"), never "OK",
      "Submit" or "Yes".
    - One primary action per view or dialog. Destructive actions look different
      and name what they destroy.
  - **Side effects, before and during:**
    - Before confirming, state what else will change ("This also removes it
      from 2 offers"; "Adds Stripe to your companies").
    - Prefer undo over "Are you sure?" for anything reversible. Confirm only
      what can't be undone, and say why.
    - Show pending and unsaved state: a changed field, "Saving…" then "Saved",
      or "Unsaved changes" with a save and discard action.
    - Optimistic updates roll back visibly on failure, with the reason and a
      retry.
    - Recalculated figures show which input changed them; stale figures are
      marked, not silently replaced.
    - Async work shows progress where it happens, not only in a global spinner.
- **Accessibility, WCAG 2.2 AA as a floor:**
  - Contrast is computed (not eyeballed) for every text/UI pair in both themes;
    non-text UI at least 3:1.
  - Visible `:focus-visible`, and targets at least 24×24px.
  - Respect `prefers-reduced-motion`, `forced-colors` and `prefers-contrast`.
  - Colour is never the only signal.
  - Semantic HTML first; ARIA only where HTML can't say it.
- **Bidirectional from the start** (English LTR and Arabic RTL):
  - CSS logical properties and values only. No `left`/`right`/`margin-left`; use
    `inset-inline-*`, `margin-inline-*`, `text-align: start` and so on.
  - Mirroring rules: what flips with `dir` (chevrons, arrows, progress, sidebar)
    and what never does (logo, pattern, media controls, charts' value axes,
    numbers).
  - Bidi isolation for numbers, money, codes and LTR fragments inside RTL text
    (`<bdi>`, `unicode-bidi: isolate`, as hunt's `ltr()` helper does).
  - An Arabic type pairing that matches Jost and Newsreader in weight and
    feeling, free on Google Fonts. Justify the choice.
  - Arabic adjustments: larger size or line-height, no letter-spacing, no
    `text-transform: uppercase`, correct punctuation (، ؛ ؟), and
    Western/Arabic-Indic numerals as a choice.
- **Light and dark themes:** follow `prefers-color-scheme`, with a
  `data-theme="light|dark"` override. Light is the default.
- **No framework lock-in:** plain CSS custom properties and plain HTML. A small
  Node script is allowed to build outputs from the tokens. No runtime JS
  dependency for styling.

## Phase 1: audit and decisions (then stop)

Write `docs/00-audit.md`:

- **Inventory:** what exists in the three sources. Tokens, type, spacing values,
  radii, components and their variants, icons, charts (hunt's `--viz-*`
  palette), patterns.
- **Rough edges:** every inconsistency, with file and line. For example:
  - several button styles (`primary`, `small-button`, `link-button`, `app-add`);
  - several hint styles (`.hint`, `.th-hint`, `p.muted.small`);
  - two fold styles (`.th-more`, `.th-fold`);
  - one-off spacing and font sizes, and colours hard-coded outside tokens;
  - where RTL or focus breaks.
- **Hops:** for 5–8 common tasks in hunt (add an application, move a process,
  log a step, save and compare offers, change a setting), count the clicks
  and screens today, and propose fewer.
- **Decisions:**
  - token naming, and the primitive → semantic → component layers;
  - the type scale (Latin and Arabic), spacing scale, radii, borders, elevation
    (borders and hairlines, not shadows);
  - motion durations and easings, breakpoints, and layout widths;
  - the component list.

  Keep it to one line of reasoning each. Where the sources disagree, say which
  value you picked and why.

Stop and wait for my review.

## Phase 2: build it

Write all of this into this directory:

1. `tokens/tokens.json`: the single source of truth, in W3C Design Tokens (DTCG)
   format, in three layers: primitives (oklch, plus hex for the brand colours),
   semantic roles (background, surface, sunk, text, muted, line, accent, focus,
   danger, warning, success, chart 1–4, pattern line and scaffold), and
   component tokens.
2. `scripts/build.mjs` (Node, no dependencies) generates:
   - `dist/tokens.css`: `:root` light, dark under
     `@media (prefers-color-scheme: dark)` with `:root:not([data-theme=light])`,
     and `[data-theme=dark]`;
   - `dist/tailwind-theme.css`: a Tailwind v4 `@theme` block mapping onto the same
     variables, for arabesquelabs.com;
   - `docs/contrast.md`: every foreground/background pair in both themes, with its
     computed ratio, pass or fail.
3. `css/`, one file per layer:
   - `base.css`: reset, typography, `:lang(ar)`, focus and selection;
   - `layout.css`: page, stack, cluster, grid, sidebar shell;
   - `components/*.css`: one file per component;
   - `utilities.css`: kept small.
4. Components, each with a spec in `docs/components/<name>.md`. A spec covers
   anatomy, variants, sizes and states (hover, focus, active, disabled,
   invalid, loading), keyboard behaviour, ARIA, RTL notes, do/don't, and the
   tokens it uses. At least:
   - **Actions:** buttons (primary; secondary as a text link; quiet; danger;
     sizes), links, and icon buttons, with accessible names.
   - **Form fields:** text, number and money (with currency), select, combobox
     (`datalist`), checkbox, radio, switch, segmented control, date, and textarea.
     Each comes with its label, hint and error message, plus fieldset and legend.
   - **Disclosure:** details/summary, and the fold with a summary value (as in
     hunt's take-home page).
   - **Containers:** card and panel, page head, tabs and section nav, the
     sidebar (full and collapsed), and the footer.
   - **Data display:** table (numeric columns, total and aside rows, responsive
     overflow), badge (including "Experimental"), tag, and stat tile.
   - **Feedback:** notice and alert (info, success, warning, danger), toast
     with undo, dialog (confirmation rules: when to confirm, when to offer undo
     instead), empty state with its next action, skeleton or loading state,
     and tooltip.
   - **Pending and side effects:** the save-state indicator (unsaved, saving,
     saved, failed + retry), a dirty-field marker, an inline side-effect note
     ("This will also…"), an optimistic-update rollback, and a stale-result
     marker.
   - **Bulk and quick actions:** selection with a bulk action bar, and
     keyboard shortcuts with a discoverable list.
   - **Charts:** columns, a split bar and a bullet chart. Hunt's palette was
     checked for colour-blind safety, and that has to hold.
   - **Brand:** the mark, wordmark and lockups (built from the logo pack SVGs,
     never redrawn), and the pattern background with its rules (period,
     strokes, opacity per theme, masking behind text, reduced-motion state).
5. `docs/`:
   - foundations (colour, type, space, motion, iconography, layout, writing
     style);
   - `interaction.md`: the efficiency principles above as rules with
     examples. They cover hops, defaults, action labels, undo vs confirm, and
     how pending and failed states and side effects are shown;
   - `accessibility.md`: a checklist per component;
   - `rtl.md`: the bidi rules, with examples;
   - `adoption.md`: how hunt and arabesquelabs.com move onto the system, one
     change at a time, with the class and token renames.
6. `index.html`: a single static showcase built only from `dist/` and `css/`. It
   shows every token and component in all four combinations of light/dark ×
   LTR/RTL, with toggles that are remembered. Its Arabic copy is real Arabic,
   not lorem ipsum.
7. `README.md`: what this is, how to build it, how to use it in a project, and
   the versioning policy (semver, and a changelog in `CHANGELOG.md`).

## Verify before you finish

- Run the build, and confirm `docs/contrast.md` has no failing pair.
- Open `index.html` in headless Chrome and check each theme × direction:
  - no horizontal scroll at 360px;
  - focus is visible on every interactive element;
  - axe-core reports no violations (load it from cdnjs);
  - with `forced-colors` emulated, controls are still visible.
- Look at the screenshots yourself, especially Arabic: mirrored layout, joined
  letters, isolated numbers.
- In the showcase, demonstrate the pending states working: a save going
  through unsaved → saving → saved, a failure with retry, and a destructive
  action undone from its toast.
- Summarise what you built, what you deliberately left out, and anything that
  needs my decision.

Don't change the hunt or arabesquelabs.com repositories. Adopting the system is
a separate job, which `docs/adoption.md` plans. Don't commit; I'll review and
commit myself.
