# Arabesque Labs design system: audit and decisions (Phase 1)

What exists today, what's rough, and what the system will decide, for review
before anything is built. Paths are relative to `~/workspace/`. Line numbers
are as of 12 October 2026.

## 1. Sources, and which one wins

| Source | Holds | Status |
|---|---|---|
| Brand Logo Pack (`~/Dropbox/Arabesque Labs/Brand/Logo Pack/`) | Mark, star, wordmark (outlined SVG); six brand colours | **Final.** Ink #1A202E, Teal #136555, Cream #EFEFEB, Night #0E121A, Pale #E8E7E3, Mint #7CDCB9 |
| arabesquelabs.com (`arabesquelabs.com/index.html`) | Compiled Tailwind v4, shadcn-style token names, oklch values | **Live.** Same values as hunt |
| hunt (`hunt/src/web/tokens.css`, `style.css`) | Tokens plus a full app interface: about 1,300 lines of CSS, Arabic RTL | **Live.** Same values, its own names |
| Lovable notes (`arabesque-design-system/loveable/`) | Concept, voice, motion, the "never" list, pattern geometry | **Rules: keep. Colours: superseded** (#0D6B66, #F1F2EE… are an older draft) |

The two live sources agree on every value. They differ only in names, and in
how dark mode is switched: the site uses a `.dark` class, hunt uses
`[data-theme]` plus `prefers-color-scheme`.

## 2. Inventory

### Colour (the same values in both live sources)

| Role | hunt | arabesquelabs.com | Light | Dark | Brand |
|---|---|---|---|---|---|
| Page | `--paper` | `--background` | oklch(95.1% .005 100) | oklch(18.2% .017 265) | Cream / Night |
| Surface | `--card` | `--card` | oklch(98.2% .003 100) | oklch(21.2% .018 265) | |
| Sunk / muted surface | `--sunk` | `--muted` | oklch(92.5% .006 100) | oklch(24.2% .018 265) | |
| Text | `--ink` | `--foreground` | oklch(24.5% .028 265) | oklch(92.8% .006 100) | Ink / Pale |
| Secondary text | `--muted` | `--muted-foreground` | oklch(44.5% .022 265) | oklch(73.5% .012 100) | |
| Hairline | `--line` | `--border` | oklch(87.8% .006 100) | white / .12 | |
| Accent | `--accent` | `--accent`, `--ring` | oklch(45.5% .079 176) | oklch(82.5% .105 168) | Teal / Mint |
| On accent | `--accent-ink` | `--accent-foreground` | oklch(97.5% .004 100) | oklch(18.2% .017 265) | |
| Danger | `--late` | `--destructive` | oklch(52% .19 27) | oklch(68% .17 25) | |
| Warning | `--soon` | — | oklch(52% .11 75) | oklch(80% .12 85) | |
| Pattern | `--pattern` | `--pattern-line`, `--pattern-scaffold` | differ slightly | | |
| Charts | `--viz-0…4` (hex) | `--chart-1…5` (oklch) | **two different palettes** | | |

Note that hunt's `--muted` is a text colour, while the site's `--muted` is a
surface. The same name means different things.

### Type, space, shape, motion

- **Families:** Jost 400/500 (UI, headings) and Newsreader (body, asides) in
  both. hunt falls back to SF Arabic, Geeza Pro and Noto for Arabic; the site
  has no Arabic.
- **Font sizes:** hunt uses **47 distinct values** (0.6875rem to 4.5rem;
  0.8rem, 0.82rem, 0.8125rem and 0.85rem all appear). The body is set in px
  (`style.css:5`, `15px/1.5`) while everything else is rem. The site uses
  Tailwind's default scale.
- **Spacing:** hunt has **91 distinct padding values** and about 20 distinct
  gaps; the top three are 0.5rem, 0.4rem and 0.75rem. The site uses
  Tailwind's 0.25rem step.
- **Radius:** 2px everywhere (`--radius`; the site's `.125rem`), except 4px for
  chart ends, 50% for avatars and one 999px.
- **Breakpoints in hunt:** 52rem (×7), 720px (×5), 64rem (×4), 900px, 640px,
  40rem. Six values in two units.
- **Motion:** 0.15s by default (site) and 0.15–0.4s (hunt). Both honour
  `prefers-reduced-motion`, which hunt applies in only two places.

### Components (hunt; counts are uses across its scripts)

| Kind | Variants today | Uses |
|---|---|---|
| Buttons | `button` (default), `.primary`, `.danger`, `.small-button`, `.link-button`, `.app-add`, `.icon-button`, `button.icon`, `button.close`, `button.add-card`, `.segmented button`, `.th-views a` | primary 32, small 35, link 22, danger 21 |
| Secondary text / hints | `p.muted.small` (65), `.th-hint` (12), `span.hint` (3), `.small` | |
| Folds | `details.settings-group` (14), `details.th-more`, `details.th-fold` (custom marker), `.th-workings`, `.th-full` | |
| Containers | `.panel` (top rule), `.app` (bordered card), `.viz-card`, `dialog.ask`, `dialog.wide`, `dialog.import`, `dialog.preview` | |
| Feedback | `toast()` (108 calls; Undo only in bulk), `ask()` (15), `confirmDelete` (17), `.notice` (18, always styled as danger) | |
| Badges | `.badge.active`, `.archived`, `.counter`, `.experimental`, `.nav-badge`, `.tag-chip` (6 colours) | |
| Charts | `.hbars`, `.cols`, heat cells (Stats); `.mc-*` columns, split bar, bullet chart (Take-home) | two helper sets |

### arabesquelabs.com

- One 337KB page plus the privacy page, compiled from React with shadcn.
- Landmarks are present (`header`, `nav`, `main`, `footer`), and so is
  `lang="en"`.
- Focus rings come from Tailwind's ring utilities (a box-shadow).
- There's no Arabic or `dir`, and no forced-colors handling.

## 3. Rough edges

1. **Too many button kinds (12) with no clear order of importance.** Secondary
   actions appear as a bordered default button, `.small-button`, `.link-button`
   (0.75rem, muted, underlined) and `.app-add` (accent text), sometimes side by
   side. See `style.css:95–103, 184, 229, 253, 413, 644, 1036`.
2. **Disabled and busy are the same state.** `button:disabled` dims the button
   and sets `cursor: progress` (`style.css:97`), so it can't tell people "not
   allowed" apart from "working on it".
3. **Notices are always red.** `.notice` uses the danger colour
   (`style.css:196`), so neutral and informational notices read as errors.
4. **Four dialog variants** repeat their padding and heading styles
   (`style.css:215–224, 318, 357–359`).
5. **Three fold styles.** Settings groups use a −/+ marker, `.th-more` uses the
   native triangle, and `.th-fold` draws its own ▸/◂ marker (`style.css:1176–1181`).
6. **Uppercase badge.** `.badge.experimental` (`style.css:1145`) is uppercase at
   0.65rem, which goes against the brand's "no all-caps labels" rule, and
   uppercase means nothing in Arabic.
7. **Colours hard-coded outside the tokens.** `#fff` in previews and toasts
   (`style.css:313, 397, 410, 465, 1122`), the tag colours in raw oklch
   (`503–508`), a decorative shadow (`1110`), and chart colours in hex
   (`772–776`).
8. **Units mixed:** a px body (15px) with rem everywhere else, px and rem
   breakpoints, and 47 font sizes.
9. **The two sites share no code.** The same values are typed twice, under
   different names.

## 4. Accessibility findings

Contrast was computed from oklch, with translucent colours blended in sRGB as
browsers do.

| Pair | Light | Dark |
|---|---|---|
| Text on page / surface | 14.1 / 15.4 | 15.2 / 14.3 |
| Secondary text on page / surface / sunk | 6.6 / 7.2 / 6.1 | 8.0 / 7.5 / 7.0 |
| Accent on page | 6.1 | 11.4 |
| On-accent on accent (primary button) | 6.5 | 11.4 |
| Danger on page | 5.3 | 6.0 |
| Warning on page | 4.9 | 10.0 |
| Warning on its wash (Experimental badge) | 4.7 | 4.7 |
| **Form control border on surface** (`--line`) | **1.37** ✗ | **1.42** ✗ |
| Control border on hover (`--line-strong`) | 2.76 ✗ | 3.81 ✓ |

- **All text passes AA in both themes.** No colour needs to change for text.
- **Fails WCAG 1.4.11 (non-text contrast).** Text fields, selects and the
  segmented control are outlined at 1.37:1. They need 3:1 to be identifiable.
  Hairline separators are decorative and may stay faint.
- **Focus goes missing in two places.** Inputs set `outline: none` and show
  focus with a 1px box-shadow (`style.css:92`), and `tbody tr:focus` sets
  `outline: none` (`338`). Box-shadows vanish in Windows high-contrast mode
  (forced-colors), so focus disappears there.
- **No `forced-colors` rules** anywhere, so custom controls (segmented control,
  switch, chart marks, badges) lose their boundaries.
- **Targets under 24×24px (WCAG 2.5.8).** `.link-button` (0.75rem, no padding;
  used for Edit, Remove, Delete and Clear) and `.app-add`.
- **Reduced motion** covers two cases only (the toasts' fade and the
  confetti). It needs a global rule.
- **Missing name.** The Experimental badge's `title` is the only place that
  explains it, and `title` isn't reliably read aloud.

## 5. RTL findings

hunt is already mostly logical-property CSS. The exceptions:

- **Toasts and chart peak labels** are centred with `left: 50%` plus
  `translateX` (`style.css:463, 817`). This happens to look right in RTL, but
  should use `inset-inline-start`, or `margin-inline: auto` with no transform.
- **Letter-spacing is reset with `[dir="rtl"] * { letter-spacing: 0 !important }`**
  (`1065`). This is keyed to direction, not language, so a Latin product name
  inside Arabic loses its tracking. It should be `:lang(ar)`.
- **Mirroring is ad hoc:** `.flip-rtl`, `.sub-mark` and the fold marker each
  have their own rule.
- **No Arabic web font is loaded.** It depends on whatever the system has, so
  Windows and Linux readers get different results.
- **Numbers inside Arabic** go through the `ltr()` helper (good). There's no
  CSS equivalent for markup that isn't built in JS.

The arabesquelabs.com site has no RTL support yet.

## 6. Steps for common tasks (hunt), and proposals

| Task | Today | Proposed |
|---|---|---|
| Log an interview step | Open application → **Edit** (the whole page goes into edit mode) → Add a step → fill in → **Save** (5) | "Add a step" on the timeline in view mode, saving on Enter (3) |
| Move a process to another stage | Drag on the board; or open → Edit → choose a stage → Save (4) | A "Move to…" menu on the card and in the application's header (2), with Undo |
| Delete anything | Delete → confirm dialog → Delete (3, at 17 places) | Delete → done, with an Undo toast (1). Confirm only what's irreversible (an account, an import that replaces everything) |
| Change one setting | Group → Edit → change → Save (4) | Toggles and selects save on change, with "Saved" shown beside them (2); multi-field forms keep Save |
| Save and compare an offer | Calculator → Save as an offer → name and company → Save → Offers tab (5) | The same, but the toast's "Compare" link goes straight to the Offers tab with it ticked (4) |
| Add an application from a link | New → paste link → wait → review → Save (5) | Paste a posting link anywhere on the board to start the same flow (4) |

These are proposals for hunt's later adoption. The system supplies the parts:
inline add, a save-state indicator, toast with undo, and a "Move to" menu.

## 7. Decisions (for your review)

1. **Token names follow Tailwind v4's namespaces**, so one set of CSS
   variables serves hunt as plain CSS and arabesquelabs.com as a Tailwind
   theme. That means `--color-*`, `--font-*`, `--text-*`, `--spacing`,
   `--radius-*`, `--ease-*`, `--breakpoint-*`. There are three layers:
   - **primitives** (`--color-ink-900`, `--color-teal-600`…, oklch, with the
     brand hex in a comment);
   - **semantic roles** (`--color-bg`, `--color-surface`, `--color-surface-sunk`,
     `--color-text`, `--color-text-muted`, `--color-line`, `--color-control`,
     `--color-accent`, `--color-on-accent`, `--color-accent-wash`,
     `--color-focus`, `--color-danger`, `--color-warning`, `--color-success`,
     `--color-chart-1…4`, `--color-pattern-line`, `--color-pattern-scaffold`);
   - **component tokens**, kept few.

   `adoption.md` will map hunt's and the site's current names onto these,
   which ends the `--muted` clash.
2. **Keep every text colour.** They all pass. **Add `--color-control`**
   (about oklch 62% in light, 53% in dark; to be confirmed by the build's
   contrast report) for form control borders, to reach 3:1.
3. **Success uses the accent colour, always with an icon and a word.** A second
   green beside the teal brand would compete with it. Danger and warning keep
   their current values. Info uses the text colour on the sunk surface.
4. **One chart palette:** hunt's validated `--viz-1…4` (green, orange, blue,
   raspberry) becomes `--color-chart-1…4`, replacing the site's `--chart-*`.
   It's checked for colour blindness in both themes.
5. **Type: one scale of 9 steps** replaces the 47 sizes.

   | Step | Size |
   |---|---|
   | xs | 0.75rem |
   | sm | 0.8125rem |
   | base (app) | 0.9375rem |
   | md (reading) | 1.0625rem |
   | lg | 1.25rem |
   | xl | 1.5rem |
   | 2xl | clamp(1.75rem → 2.25rem) |
   | 3xl | clamp(2rem → 3rem) |
   | display | clamp(2.5rem → 4.75rem) |

   - **Root size:** stays 16px; the app's body text is `base` (15px), set in
     rem.
   - **Reading text:** Newsreader at `md` for prose.
   - **Line heights:** UI 1.45, prose 1.6, headings 1.1–1.2.
6. **Arabic fonts**, all free on Google Fonts:
   - **Readex Pro** for Arabic UI and headings. It's geometric like Jost and
     designed for legibility in both scripts.
   - **Noto Naskh Arabic** for Arabic body text, pairing with Newsreader.
   - **Arabic sizing** (applied with `:lang(ar)`): about 1.08× the Latin size,
     line-height +0.15, no letter-spacing, and no uppercase anywhere.
   - **Alternatives:** IBM Plex Sans Arabic (more neutral) or Noto Kufi Arabic
     (more geometric, less readable at small sizes).
7. **Spacing:** a 4px base step with 12 named values (0, 2, 4, 6, 8, 12, 16,
   20, 24, 32, 48, 64px, written as `--spacing-*` in rem), plus fluid section
   padding for the website. The 91 padding values map onto these.
8. **Shape:**
   - **Radius:** `--radius-sm` 2px (controls, cards: the brand's crisp edge)
     and `--radius-md` 4px (chart ends, toasts), plus `--radius-full`.
   - **Elevation:** no shadows; use borders and surface steps. Dialogs and
     toasts get a 1px line and the surface colour (the decorative shadow at
     `style.css:1110` goes).
9. **Breakpoints:** three, all in rem: `--breakpoint-sm` 40rem (phone
   layouts), `--breakpoint-md` 52rem (sidebar becomes a top bar), and
   `--breakpoint-lg` 64rem (two-column results). They replace the six.
10. **Motion:**
    - **Durations:** 150ms for feedback and 250ms for theme and disclosure.
      Only the website's hero is allowed a slow sequence.
    - **Easing:** one curve, `cubic-bezier(.2, 0, 0, 1)`.
    - **Reduced motion:** a global rule removes transitions and animations.
11. **Buttons, five kinds instead of twelve:**
    - **primary:** one per view;
    - **secondary:** bordered;
    - **quiet:** text only, with a padded 24px minimum target, replacing
      `.link-button` and `.app-add`;
    - **danger:** names what it destroys;
    - **icon:** has an accessible name.

    Two sizes, default and small. `aria-disabled` is kept separate from a busy
    state (`aria-busy` plus an inline spinner), so the two can't be confused.
12. **Focus everywhere is a 2px `--color-focus` outline with a 2px offset.**
    Inputs keep the outline and also change their border colour. There are no
    box-shadow focus rings, so focus survives forced-colors.
13. **Folds:** one `details` style with a summary value on the trailing side.
    The marker is a chevron that mirrors in RTL and rotates when open, and
    stays still under reduced motion.
14. **Notices:** info, success, warning and danger, each with an icon and a
    visible title word. The danger colour is used only for real errors.
15. **Feedback rules:** undo beats confirmation; there's a save-state indicator
    (unsaved, saving, saved, failed with retry); side-effect notes appear
    before an action; stale results are marked. These are written up in
    `interaction.md` and demonstrated in the showcase.
16. **Badges are sentence case** and at least 0.75rem. "Experimental" is
    explained in visible text, or with `aria-describedby`, not just a `title`.
17. **Bidirectional rules:**
    - logical properties only;
    - **mirrored with `dir`:** chevrons, arrows, the sidebar, progress bars and
      the fold marker;
    - **never mirrored:** the mark, the pattern, numbers, chart value axes,
      media controls and the clock;
    - a `.ltr` / `<bdi>` utility to isolate numbers and money in markup;
    - typographic rules keyed on `:lang(ar)`, not `[dir=rtl]`.
18. **Dark mode:** follow `prefers-color-scheme`, with a `[data-theme]`
    override. The site's `.dark` class maps to it in `adoption.md`.
19. **Built on standards, not invented:**
    - **reset:** modern-normalize;
    - **keyboard and ARIA patterns:** the W3C's ARIA Authoring Practices;
    - **form and error patterns:** the GOV.UK Design System, for behaviour and
      wording, not looks;
    - **fluid scales:** Utopia's method;
    - **native elements first:** `<dialog>`, `<details>`, `popover`, and
      `<input type=date>`.

## 8. Questions for you

1. **Arabic fonts:** Readex Pro for UI and Noto Naskh Arabic for body (my
   pick), or IBM Plex Sans Arabic for UI if you'd prefer something more neutral?
2. **Success colour:** is it fine for success to share the brand teal, or do
   you want a separate green?
3. **Prefix:** the plan uses Tailwind's namespaces with no prefix
   (`--color-bg`). If these tokens may one day sit beside a third-party
   library's, an `--al-` prefix avoids clashes, at the cost of mapping it in
   the Tailwind theme. Which do you prefer?
4. **Scope of the first build:** all the components in the prompt, or the
   foundations plus the ten that hunt uses most (button, field, fold, panel,
   table, toast, dialog, notice, badge, segmented control) first?

## 9. Review outcome (12 October 2026)

Direction: build a **generic, principled design system** first. The existing
sites are evidence, not constraints; they'll be brought onto the system later.
Answers to the open questions:

1. **Arabic fonts:** taken from the fonts already in use: hunt's system
   fallbacks, and mosab.co.uk/ar (Amiri, Kufam, IBM Plex Sans Arabic, Noto
   Kufi/Sans Arabic, Scheherazade New). The stacks are:

   | Role | Stack |
   |---|---|
   | Interface | Jost, then **IBM Plex Sans Arabic** → Noto Sans Arabic → SF Arabic → Geeza Pro |
   | Headings | Jost, then **Kufam** → Noto Kufi Arabic → IBM Plex Sans Arabic |
   | Reading | Newsreader, then **Amiri** → Noto Naskh Arabic → Scheherazade New |
   | Code | IBM Plex Mono |

   Latin comes first in each stack and has no Arabic glyphs, so each script
   falls through to its own face. This replaces the Readex Pro and Noto Naskh
   Arabic proposal in section 7.
2. **Success colour:** the brand teal, always with an icon and a word, so
   colour is never the only signal (your answer: sharing it is fine).
3. **Prefix:** `--al-` on every token and `al-` on every class, so the system
   can sit beside anything. The Tailwind theme is generated as a mapping
   (`--color-bg: var(--al-color-bg)`).
4. **Scope:** the full component set.

Section 7's decisions stand, except where these answers change them (1, 3).
