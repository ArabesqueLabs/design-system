# Changelog

All notable changes to the design system. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow
[semantic versioning](https://semver.org/) as described in the README.

## [Unreleased]

### Fixed

- **Dialogs (`js/dialog.js`) don't lose work on a second Escape.** Browsers let
  a page refuse only the first close request; Escape is now handled before the
  browser's close, and a close that gets past anyway reopens the dialog with
  what was typed.
- **Character count (`js/count.js`):** over the limit, the field is
  `aria-invalid="true"` (it was `aria-invalid=""`, which means not invalid,
  and showed no error border); the mark is removed only if the helper set it,
  so a validation error stays. The description states the limit ("You can
  enter up to 120 characters"), not "120 remaining" whatever was typed. A field
  without an id gets one.
- **Tooltips (`js/tooltip.js`)** add to an element's `aria-describedby` and
  put it back, instead of replacing it and then removing it; they can be
  hovered (a 300ms grace while the pointer crosses to the tip, WCAG 1.4.13);
  they follow their target on scroll rather than vanishing; a second
  `initTooltips()` does nothing.
- **Toasts (`js/toast.js`)** with an action have no time limit (WCAG 2.2.1):
  they stay until used, dismissed (a new Dismiss button) or replaced; F6
  moves focus to the action; focus returns where it was afterwards. The live
  region exists before the first message, so it's announced.
- **Focus on the inverse ground** (the bulk bar, toasts) was 1.33:1 in dark; a
  `focus-on-inverse` role fixes it, and the build now measures it.
- **Tailwind:** breakpoints are values (they were `var()`, invalid in a media
  query, so `sm:`, `md:` and `lg:` never applied); `dark:` follows `data-theme`.
- **Charts:** every mark is `role="img"`, named by its value; a chart is one tab
  stop, with arrow keys between marks (`js/chart.js`); "Other" is a series
  colour, not the neutral (1.5:1).
- **Keyboard shortcuts (`js/keys.js`):** Shift is matched (⌘Z no longer fires
  on ⌘⇧Z); on non-Latin layouts keys are matched by position; IME composition
  and key repeat are ignored; single-key shortcuts can be turned off
  (`setShortcutsEnabled`, WCAG 2.1.4).
- **Numbers (`js/format.js`):** regional Arabic (`ar-SA`) is honoured;
  `parseNumber` reads the module's own output (bidi marks, the minus sign,
  currency symbols); a currency code is spaced ("SAR 100"); no "−£0"; amounts
  with fractions show them all ("£12.50"); `signDisplay` and other options
  pass through.
- **Validation (`js/validate.js`):** the icon sprite is found relative to the
  module, not the page; a field that isn't there is an error at setup, not a
  crash on submit; forms without an id get unique ids.
- **Theme (`js/theme.js`):** the comment's no-flash recipe is a classic inline
  script (a module runs after first paint); the module can be imported where
  there's no window.
- **Inputs are 16px on touch screens**, so iOS doesn't zoom into them.
- **Busy buttons:** the spec now says Enter and Space still reach the handler,
  which must check `aria-busy`.
- **Right to left:** direction rules use `:dir(rtl)`, so a `dir="ltr"` block
  inside an Arabic page doesn't mirror; an English element inside an Arabic
  page gets Latin metrics back. Arabic tokens are declared where a language
  is set, not on every element.
- **`[hidden]`** no longer breaks `hidden="until-found"`.
- **Tables:** no sort arrow on `aria-sort="none"`.
- **Fields:** an error's border shows on a changed field too.
- **Contrast:** stale figures are muted (4.5:1), not faded (3.99:1); a
  primary or danger button's hover is a clear step (`accent-hover`,
  `danger-hover`); a danger button's border is solid (it was 2.97:1).
- **The wordmark** isn't tracked when it's written in Arabic.
- **Showcase:** the Rename dialog, the character count, search's Clear and
  Escape, and the keyboard shortcuts work (their helpers weren't loaded);
  spec links inside the spec reader load once, and Raw opens the raw file;
  focus doesn't drop to the page after archiving; the count badge and the
  loading region say their words in text, not an `aria-label` on a `span`;
  the date of birth's hint reaches its fields; two words of the Arabic intro
  no longer run together. The Arabic catalogue loads only for Arabic.
- **Ask, check, confirm:** Continue no longer submits answers into the address;
  it validates with an error summary, then shows the answers to check, each
  with Change, then the confirmation. Send can't be pressed twice.
- **Delete dialog:** the typed confirmation is now checked; the dialog stays
  open with an error until it matches, the safer action has first focus,
  Enter in the field means Delete, and focus returns to the trigger.
- **Save state:** Undo after Discard restores the discarded value; Discard
  returns to the last saved value, not a fixed one; a save that finishes after
  a newer edit no longer marks it "Saved".
- **Stale result:** the figure is recalculated (a labelled demo: the amount
  over 12 months), and an older calculation can't clear the stale mark for a newer input.
- **Charts:** titles and summaries now describe the data shown, and the
  summaries are worked out from it.
- **Spec reader:** the dialog is named by its title, code blocks that scroll
  are keyboard-focusable, and focus returns to the link that opened it.
- **Docs:** the colour roles table matches the tokens (it described the old
  palette); counts and lists in the README and here are current.

### Added

- Tokens: `accent-hover`, `danger-hover`, `focus-on-inverse`,
  `pattern.side-narrow`; the pattern tokens are read by `js/pattern.js`.
- `js/chart.js` (`initChartKeys`); `.d.ts` types beside every helper.
- Charts: `data-series="0"` to `"4"`. Tables: `.al-table__num`,
  `.al-table__row--sub`, `--total`, `--aside`. Bullet: `.al-bullet__diff--more`,
  `--less`. Toast: `.al-toast__dismiss` and `dismissLabel`. Count: `limit`.
  Keys: `setShortcutsEnabled`, `shortcutsEnabled`, `titles`.
- The contrast check covers 112 pairs (56 per theme): hover fills, the danger
  fill, washes under muted text and links, controls and focus on sunk
  surfaces, focus on the inverse ground, chart marks on the page.
- Tests: `npm test` (helpers, and the system's rules: logical properties only,
  every `var()` a token, every primitive used, one `@keyframes` each) and
  `scripts/check-page.mjs` (axe in light, dark, English and Arabic; the
  helpers with real key presses), in CI.
- `prepare`, `style` and `sideEffects` in `package.json`; `dist/` is committed.
- **Released versions at their own URL:** `npm run release -- <version>`
  copies `dist/`, `fonts/` and `js/` to `v/<version>/`, which never changes
  (CI fails if it does) and is cached for a year (`_headers`). Link
  `/v/0.2.0/dist/arabesque.css` from a site, not `/dist/`.
- **Self-hosted fonts:** `fonts/fonts.css` and the faces (Latin, Latin
  Extended and Arabic subsets, with their OFL licences), from `npm run
  fonts`. The showcase no longer loads anything from Google.
- The build fails if a rule sets a colour on a background the contrast check
  doesn't measure, or if `arabesque.css` is over 24 KB gzipped; tokens can be
  `$deprecated`, which the CSS says beside them.
- `tests/pages/helpers.html`: the helpers checked on a page of their own, so
  the showcase's demos can change without breaking their checks; chart keys
  (and their direction in right to left) and shortcuts are checked with real
  key presses.
- [`docs/screen-readers.md`](docs/screen-readers.md): what to listen for with
  VoiceOver and NVDA, in English and Arabic, before a release.
- Specs: character count, breadcrumbs, confirmation, date input, error
  summary, phase banner, search, summary list, task list;
  `docs/principles.md`, `docs/patterns.md`.

### Deprecated

- `--al-color-pattern-scaffold`: nothing in the system draws construction
  lines, but hunt aliases it; until 0.3.
- `.al-c0` to `.al-c4` (use `data-series`), `.al-more` and `.al-less` (use
  `.al-bullet__diff--more` and `--less`), `.al-num`, `tr.is-sub`,
  `tr.is-total`, `tr.is-aside` (use `.al-table__num` and
  `.al-table__row--*`). They still work, until 0.3.

### Removed

- Tokens nothing used: 14 primitives from the old palette (sand 98, 95, 92,
  88, 82; cloud 99; slate 25, 45, 56; teal 46; red 52; amber 70; blue 48;
  black), `space.px`, `duration.slow`, `z.raised`, `z.overlay`,
  `component.focus.ring` (use `--al-border-focus` and `--al-color-focus`). `--al-tint-bg` and `--al-tint-ink` are now private to
  the tint component (`--_tint-bg`, `--_tint-ink`).
- Working notes (`loveable/`, `design-system-prompt.md`) are no longer
  published with the site.

## [0.1.0] - 2026-10-12

The first version.

### Added

- **Tokens** (`tokens/tokens.json`, W3C DTCG): primitives, semantic roles and
  component tokens, with dark and Arabic modes. 168 tokens (each `$value` leaf;
  the build prints the count).
- **Build** (`scripts/build.mjs`, no dependencies): `dist/tokens.css`,
  `dist/tailwind-theme.css` (Tailwind v4), `dist/tokens.json`,
  `dist/arabesque.css` (everything, in cascade layers), `dist/icons.svg`, and
  `docs/contrast.md`; fails if any of the 86 measured colour pairs (43 per theme) is short of
  its WCAG minimum.
- **CSS:** base (reset, type, focus, reduced motion, forced colours, more
  contrast, `:lang(ar)`), layout primitives, utilities, and 36 components.
- **JavaScript helpers** (optional, no dependencies): theme, toast, menu, tabs,
  tooltip, positioning, number formatting with an Arabic-Indic choice, and
  the pattern.
- **24 icons** and the brand mark, star and wordmark from the logo pack.
- **Docs:** the audit, foundations, interaction, accessibility, right to left,
  adoption, and a spec for every component.
- **Showcase** (`index.html`): every token and component in light and dark,
  English and Arabic, with the pending states working.
