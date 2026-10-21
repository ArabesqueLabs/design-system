# Changelog

All notable changes to the design system. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow
[semantic versioning](https://semver.org/) as described in the README.

## [Unreleased]

## [0.7.0] - 2026-10-21

### Added

- **Attribution** ([spec](docs/components/attribution.md)): the line each
  of the company's products carries, "A product of Arabesque Labs" or "By
  Arabesque Labs" («من منتجات معامل آرابيسك»، «من معامل آرابيسك»), after
  the company's mark, in a quiet pill or plain (`.al-attribution`,
  `--plain`, `--lg`), or after the star alone where it's small (`--star`);
  in React, `Attribution`. As images too, for READMEs, store pages and
  email: `dist/brand/badges/`, each wording in English and Arabic, for light
  and dark grounds, with the mark or the star (`…-star.png`), at 1x and 2x,
  drawn by the component in headless Chrome (`npm run badges`).

## [0.6.0] - 2026-10-19

### Added

- **Arabesque's mark** ([spec](docs/components/brand.md#arabesques-mark)):
  four of the company's tiles, two by two, in the same frame
  (`assets/brand/arabesque-mark.svg`), and its four stars, solid, for
  16–24px (`arabesque-star.svg`). The build writes them in fixed inks to
  `dist/brand/` (`arabesque-mark-ink.svg`, `-reversed.svg`, the stars the
  same) with `arabesque-favicon.svg`, now the icon of the showcase, docs
  and examples; the README shows the mark. A test checks the mark against
  `js/pattern.js`. The company mark, star and favicon are unchanged, and the
  homepage template keeps them. In React, `ArabesqueMark`, and `Lockup`
  takes a `mark` in place of the company's.
- Arabesque's own site (the showcase, docs and examples) has its own
  header lockup: Arabesque's mark and "Arabesque · Design system"
  («آرابيسك · نظام التصميم»). The showcase's hero is headed "Arabesque",
  and its introduction reads "Built by Arabesque Labs to set the standard
  for every product we make. …".

### Changed

- **A larger type scale** ([typography](docs/foundations/typography.md#scale)):
  the base is 17px (was 15), and every step moves with it, about 1.13 apart:
  `text-xs` 13px (was 12), `sm` 15 (13), `md` 19 (17), `lg` 22 (20), `xl` 26
  (24), `2xl` 30–40 (28–36), `3xl` 36–54 (32–48), `display` 44–80 (40–76).
  Arabic stays 1.08 times each. Token names are unchanged, so pages grow with
  no markup change; check anything sized around a fixed width of text.

- The design system is called **Arabesque**: the README (English and
  Arabic), page titles ("Button · Arabesque"), the showcase, the package's
  description and the generated files' headers say so. The writing guide
  has a new section, [Names](docs/foundations/writing.md#names): Arabesque
  for the system, Arabesque Labs for the company. Package name, repository,
  domain, files, classes and tokens are unchanged.

## [0.5.1] - 2026-10-17

### Fixed

- **Sidebar** ([spec](docs/components/sidebar.md), React `Shell`): on a
  phone its links scrolled sideways in a row, so sections past the edge of
  the screen, the current one among them, were out of sight. Under md it's
  now a bar with the current section's name and a menu button; the sections
  and the foot drop below it, one per row, as the site header's menu does.
  New classes: `.al-sidebar__bar`, `.al-sidebar__here`,
  `.al-sidebar__toggle`, `.al-sidebar__menu` (which wraps the nav and the
  foot), and a `menuId` on `Shell`. `js/sidebar.js` (`initSidebars()`)
  wires the menu button, and `js/nav-menu.js` (`wireNavMenu()`) is the menu
  button the sidebar and the site header now share. Upgrading HTML by hand:
  add the bar, wrap the nav and the foot in the menu, and load
  `js/sidebar.js`; without it, the menu stays closed on a phone.
- The showcase's introduction says the system is built by Arabesque Labs to
  set the standard for its products, in one plain sentence, without the
  highlights.

## [0.5.0] - 2026-10-17

### Added

- **Code and command** (`.al-code`, `.al-command`, `js/copy.js`,
  [spec](docs/components/code.md); React `CodeBlock` and `Command`): code to
  read or copy, always left to right, in one language or several (tabs),
  with the lines that matter marked; and a command, one line to paste with a
  `$` that's never copied. The copy button says "Copied", and a status
  region tells screen readers; if the clipboard is refused, the code is
  selected instead. New labels: `copy`, `copied`, `copyFailed`.
- **Syntax colour** (`--al-color-syntax-*`, `.al-syntax-*`, `js/highlight.js`):
  seven roles (keyword, string, number, comment, function, tag, attribute),
  each measured at 4.5:1 on the code's ground, the surface and a marked line,
  in both themes; comments are italic too. `js/highlight.js` colours
  JavaScript, TypeScript and JSX, HTML, CSS, JSON and the shell, in
  `CodeBlock` (`language`) and in any `<pre><code class="language-…">`
  (`highlightCode()`), the docs' own samples included. The colour rules say
  it: in code, a colour means what kind of word it is.
- **Feature tabs** (`.al-feature-tabs`, React `FeatureTabs`,
  [spec](docs/components/nav.md)): a column of tabs, each a name and a line,
  beside what the chosen one shows; `js/tabs.js` moves with up and down in a
  vertical tab list.
- **Logo wall** (`.al-logos`, React `Logos` and `LogoWordmark`,
  [spec](docs/components/logos.md)).
- **Quote** (`.al-quote`, React `Quote`, [spec](docs/components/card.md)).
- **Call to action** (`.al-cta`, React `CallToAction`,
  [spec](docs/components/cta.md)): the page's last word, on the quiet pattern.
- **Announcement** (`.al-announcement`, `js/announcement.js`, React
  `Announcement`, [spec](docs/components/phase-banner.md)): one line of news
  above everything; dismissing it is remembered. New label: `announcement`.
- **On this page** (`.al-toc`, `js/toc.js`, React `OnThisPage`,
  [spec](docs/components/toc.md)): the sections beside a page, the one being
  read marked as it scrolls; the docs use it. New label: `onThisPage`.
- **Disclosure group** (`.al-disclosure-group`, React `DisclosureGroup`), and
  the [questions and answers](docs/patterns.md#questions-and-answers) and
  [product page](docs/patterns.md#a-products-page) patterns.
- **Menu items with a description** (`.al-menu__item--described`,
  `.al-menu__description`; `description` in React).
- **Site header action** (`.al-site-header__action`; `action` in React): the
  page's one action, in the bar at every width.
- [Writing](docs/foundations/writing.md): headings as plain claims, the
  lead-in heading, eyebrows and closing lines.
- **Stats** (`.al-stats`, React `Stats`, [spec](docs/components/card.md)): the
  figures a page leads with, side by side and large, a hairline before each,
  with no boxes.
- **Eyebrow** (`.al-eyebrow`, `.al-section__head`, React `Eyebrow` and
  `Section`'s `eyebrow` and `index`,
  [layout](docs/foundations/layout.md)): a few words above a section's
  heading, in the accent, numbered if you like ("01"); sentence case.

### Changed

- `arabesque.css`'s size budget is 27 KB gzipped (was 26), for code with
  syntax colour and a product page's parts.
- **Site header** ([spec](docs/components/site-header.md)): under md, the
  language link and the other tools fold into the menu with the sections, so
  the bar keeps the lockup, the theme button and the menu button, and the
  menu button can no longer be pushed off a phone's screen. The menu button
  shows a cross while the menu is open; under 30rem the lockup drops its
  product name. New classes: `.al-site-header__extras`,
  `.al-site-header__menu-tools`.
- The showcase and the examples use the site header, so on a phone their
  sections, language and GitHub links are behind a menu button.

## [0.4.1] - 2026-10-16

### Changed

- IBM Plex Sans Arabic and IBM Plex Mono are IBM's own files, from its
  releases, not Google Fonts' subsets: their licence reserves the name
  "Plex", so a subset made by anyone else couldn't keep it. Sans Arabic is
  the complete file per weight (used for Arabic, as before), so it's larger;
  Mono is IBM's own subsets. `fonts/` has IBM's licences with them, and its
  README says where each family comes from.

## [0.4.0] - 2026-10-16

### Added

- **The hero** (`drawHero` in `js/pattern.js`, `.al-pattern--hero`,
  [spec](docs/components/pattern.md)), as on arabesquelabs.com: one quiet line
  across the section, and one octagon, the focal tile, in the accent, with
  its caption beneath. It can draw itself in once on load: the tiling as
  scaffolding, the strands from the focal tile outwards, then the scaffolding
  fades and the focal tile and caption appear. Never under reduced motion.
  Mirrors in right to left; under md there's no focal tile. The showcase's
  hero uses it.
- **Construction figure** (`initConstruction`, `drawConstruction`,
  `css/components/construction.css`, [spec](docs/components/construction.md)):
  how the pattern is made, in three steps read as software, as on the site;
  an optional contact-angle slider redraws steps 2 and 3.
- **Steps** (`css/components/steps.css`, [spec](docs/components/steps.md)): a
  numbered sequence, such as the four build stages.
- **Site header** (`css/components/site-header.css`, `js/site-header.js`,
  [spec](docs/components/site-header.md)): a website's top bar with the
  lockup, sections, language and theme, folding into a menu under md.
- **Templates** ([`templates/`](templates/README.md)): the studio homepage,
  in English and Arabic, assembled from the system.
- `cells()` in `js/pattern.js`: every cell of the tiling over an area, as SVG
  paths.
- Tokens: `--al-color-pattern-scaffold` (back, now that something draws it),
  `-pattern-focal` and `-pattern-focal-fill`; `--al-pattern-hero-side` (46px),
  `-hero-side-narrow` (30px), `-hero-stroke` (1px) and `-focal-stroke` (1.6px).
- Every component spec above, in Arabic too.
- **React components** (`@arabesquelabs/design-system/react`, `dist/react/`
  with types, from `react/src/`; [guide](docs/react.md)): every component,
  one module per spec, writing the spec's markup and using the helpers in
  `js/` for behaviour, so `arabesque.css` styles them and pages without
  React are unchanged. `ArabesqueProvider` gives them the page's language
  (their own labels, in English and Arabic), digits and sprite. Fields join
  up their label, hint and error by themselves. React 19 or later, an
  optional peer dependency.
- **Examples** ([`examples/`](examples/index.html)): every component working,
  in React, a page each, in English and then in Arabic, right to left, with
  a gallery; and the "ask, check, confirm" pattern. Checked in Chrome with
  axe in light and dark.
- The homepage template in React ([`templates/react/home.tsx`](templates/react/home.tsx)):
  `templates/home.html` and `templates/ar/home.html` are now rendered from
  it, its words in both languages in one place.
- **Text link** (`.al-link`, `--arrow`, `--muted`, `TextLink`,
  [spec](docs/components/link.md)): a link on its own, underlined in the
  accent; an arrow (mirrored, moving a little on hover) on to a next step;
  for another site, its icon, a new tab and "(opens in a new tab)".
- **Language link** (`.al-language`, `LanguageLink`,
  [spec](docs/components/language-switch.md)): the page in the other
  language, named in it, with `lang` and `hreflang`. The homepage template's
  own `.tp-lang` is gone.
- Notice: a Dismiss button (`.al-notice__dismiss`, `onDismiss`); in React,
  its kind's word as the title when it has none (Note, Done, Warning, Error).
- Site header: `--sticky`; the current page underlined in the accent; in
  React, `language`, `sticky` and a skip link (`skipTo`).
- Pattern: `--quiet` (`--al-color-pattern-quiet`, a new token), a faint field
  for a small area with nothing on it.
- Lockup: `--stacked`, the mark over the wordmark; in React, `Star`, the
  mark's star alone.
- Brand files and pattern tiles, built from the tokens: `dist/brand/`
  (`mark-ink.svg`, `mark-reversed.svg`, `star-ink.svg`, `star-reversed.svg`,
  and `favicon.svg`, which follows the system's light or dark) and
  `dist/patterns/` (`tile.svg`, `tile-dark.svg`, `tile-quiet.svg`,
  `tile-quiet-dark.svg`). The showcase, examples and templates use the new
  favicon.
- Icons: `chevron-down`, `copy`, `language`, `mail`.
- Checkbox: mixed ("Select all"), the input's `indeterminate`; in React,
  `indeterminate`.
- React: `Section` takes a `heading` and `lede`; without a provider, the
  components follow `<html lang>`.
- React: `ErrorSummary` takes `autoFocus` (on by default), off for a summary
  shown as an example, so the page doesn't jump to it.
- Every document as a page: the README (and its translation), the
  changelog and `docs/` are rendered beside their Markdown (`README.html`,
  `docs/react.html`…), with the site header, what's on the page, and links
  between them. The showcase's "How to use it" goes to the README's "Use it
  in a project", in the page's language, instead of a dialog.
- The repository is public: [ArabesqueLabs/design-system](https://github.com/ArabesqueLabs/design-system),
  linked from the showcase (its top bar and footer), the example pages
  (and each demo's source), every document's page (its header, and the
  document itself on GitHub), the README and `package.json`.
- Writing: never invent facts, even as placeholders; no hype; Arabic written
  as Arabic. Iconography: what imagery is, and what never is.

### Changed

- **The spinner is the mark's star**: faint, with a bright segment going
  round its outline; still under reduced motion. Busy buttons and the save
  state's Saving use it. Its markup (`<span class="al-spinner">`) is the
  same.
- The hero's strands fall to a fifth of their strength behind the heading
  and lede, and to a third under md, so the text reads clearly; they're in
  full towards the focal tile.
- The site header folds by its own width (a container query), not the
  window's, so it works in a sidebar or a narrow preview.
- The theme toggle's half-filled disc turns over in dark.
- **The showcase is built from the demos** (`examples/src/showcase.tsx`):
  each example is written once, for the showcase and its own page. The
  foundations (colour, tints, type, space, motion, icons) are demos too, and
  the tints section, which was empty, shows each tint. `showcase.js` is gone;
  `index.html` is generated, in English, and React takes it over in the
  browser. Its anchors are as before.
- "Read the spec" goes to the spec's page, in Arabic where it's translated,
  instead of a dialog; the showcase no longer loads a Markdown parser from a
  CDN.
- Releases keep their font files once per set of faces, in
  `v/_fonts/<hash>/`, shared by every release with the same faces; a
  release's `fonts/fonts.css` points there. Earlier releases are as they were.
- `arabesque.css`'s size budget is 26 KB gzipped (was 24).

- `--al-color-pattern-line` is ink at 26% (white at 20% in dark), as on
  arabesquelabs.com, instead of teal at 24% (white at 16%).
- Motion: the hero's one-time draw-in is the one motion allowed on load
  ([motion](docs/foundations/motion.md)). Texture still never moves.

## [0.3.0] - 2026-10-14

### Added

- **Date picker** (`js/datepicker.js`, `css/components/date-picker.css`,
  [spec](docs/components/date-picker.md)): a field for a date near today,
  typed or chosen from a calendar in the page's language, where the browser's
  `<input type="date">` follows the browser's. In Arabic: Arabic month and
  day names, the week from Saturday, Western or Arabic-Indic digits, a grid
  that runs from the right, and arrow keys that follow it. The APG date
  picker dialog's keyboard; typed dates read in either digit set; the value
  an ISO date in a hidden field; `data-min`, `data-max`; Gregorian only. In
  the showcase, it replaces the date input section's native date field.
- **The component specs and the README in Arabic** (`docs/components/ar/`,
  all 38, and `ar/README.md`): in Arabic, the showcase's spec reader opens a
  document's translation, which sits beside it in `ar/` (the English where
  there's none), each with a link to its original. Code, classes and
  tokens stay as they are. A test fails if a spec has no translation, or a
  relative link in either language is broken.
- A test that fails if anything marked "kept until" a version is still
  there once the package reaches it.

### Changed

- Showcase: the type scale's samples are Google Fonts' own sentences, from
  the Universal Declaration of Human Rights: the English one in English, the
  Arabic one in Arabic.
- README: the deprecation example is "kept until X.Y", so the test for
  overdue deprecations doesn't catch the README itself at 0.3.0.
- Spec reader: inline code keeps its order in Arabic text (`--sm`, not
  `sm--`), and code blocks are no longer squashed to a line.
- The field spec's date row points to the date picker and date input; a
  misplaced sentence no longer splits the table spec's variants table.

- README: before 1.0, a minor version removes what the previous minor
  deprecated (it said a major would).

### Removed

- The names 0.2.0 deprecated:
  - `.al-c0` to `.al-c4`: use `data-series="0"` to `"4"`.
  - `.al-more`, `.al-less`: use `.al-bullet__diff--more`, `--less`.
  - `.al-num`: use `.al-table__num`.
  - `tr.is-sub`, `tr.is-total`, `tr.is-aside`: use `.al-table__row--sub`,
    `--total`, `--aside`.
  - `--al-color-pattern-scaffold`: use `--al-color-pattern-line`, or a
    colour of your own (nothing in the system draws construction lines).

## [0.2.0] - 2026-10-14

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
