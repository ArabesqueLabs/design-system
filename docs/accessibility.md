# Accessibility

WCAG 2.2 AA is the floor, not the goal. The system makes the accessible way
the default way: if you use the components as specified, most of this list is
already true.

## What the system guarantees

- **Contrast is computed.** Every text pair is at least 4.5:1 and every
  control border, focus outline and chart mark at least 3:1, in both themes;
  the build fails otherwise ([contrast.md](contrast.md)). The pairs are the
  ones components actually draw: focus on every ground it can sit on
  (including the inverse ground of the bulk bar and toasts, which has its own
  focus colour), hover fills under their text, washes under text and links.
- **Focus is always visible**: a 2px outline in the focus colour, offset 2px
  (on fields, inset, with the border in the accent too). It's an outline, not
  a shadow, so it survives forced colours.
- **Targets are at least 24×24px** (2.5.8), including quiet text buttons and
  table actions; 44px on touch-first surfaces with `--al-size-target-touch`.
- **Reduced motion** turns every transition and animation off.
- **Forced colours** keep borders, focus and states visible with system colours.
- **More contrast** (`prefers-contrast: more`) strengthens secondary text,
  hairlines and focus.
- **Colour is never the only signal.** States have words and icons; chart
  series have a key and values in text.
- **Text resizes to 200%** and reflows at 320px without horizontal scrolling
  (tables scroll in their own focusable region).

## Every page

- [ ] `<html lang dir>` set; a `lang` on any block in the other language.
- [ ] One `<h1>`; headings in order, never chosen for their size.
- [ ] Landmarks: `header`, `nav` (named if more than one), `main`, `footer`.
- [ ] `.al-skip-link` to `main` as the first focusable element.
- [ ] A unique `<title>`: page, then product.
- [ ] Works with the keyboard alone, in a sensible order, with no traps.
- [ ] Checked in light and dark, English and Arabic, at 320px, at 200% zoom,
      with forced colours, and with axe (no violations).
- [ ] Before a release: the [screen reader checks](screen-readers.md), with
      VoiceOver and NVDA, in English and Arabic.

## Per component

**Button** ([spec](components/button.md))
- [ ] A `<button>` for actions, an `<a href>` for navigation; never a `div`.
- [ ] Its name says what it does; an icon-only button has `aria-label`.
- [ ] Unavailable: `aria-disabled="true"` with the reason nearby; busy: `aria-busy="true"`, label kept.

**Field** ([spec](components/field.md))
- [ ] A visible `<label for>`; placeholder only as an example.
- [ ] Hint and error tied with `aria-describedby`; `aria-invalid="true"` on error.
- [ ] The error says how to fix it, and appears next to the field, not only in a summary.
- [ ] `autocomplete` and `inputmode` set where they apply.
- [ ] Related fields in a `<fieldset>` with a `<legend>`.

**Date picker** ([spec](components/date-picker.md))
- [ ] The date can be typed as well as chosen; the hint gives an example written as the field writes it.
- [ ] The calendar is in the page's language and direction, a modal dialog named by its month; Escape closes it and focus returns to its button.
- [ ] Each day is named by its full date; the chosen day is `aria-selected`, today `aria-current="date"`.

**Checkbox, radio, switch** ([spec](components/choice.md))
- [ ] Native inputs; the label wraps or points to the input, so it's the target.
- [ ] Radios grouped in a `fieldset`/`legend`; a switch has `role="switch"` and applies at once.

**Segmented control** ([spec](components/segmented.md))
- [ ] Radios (in a form) or buttons with `aria-pressed` (a view switch), in a named `role="group"`.

**Disclosure** ([spec](components/disclosure.md))
- [ ] A native `<details>`/`<summary>`; the summary value is inside the summary, so it's read with it.

**Card and panel, page head** ([card](components/card.md), [page head](components/page-head.md))
- [ ] An interactive card has one link or button covering it, not nested controls inside a link.
- [ ] The page head's title is the page's `h1`.

**Tabs and section nav** ([spec](components/nav.md))
- [ ] Links between pages: `aria-current="page"`. In-page tabs: `tablist`/`tab`/`tabpanel`, `aria-selected`, arrow keys (`js/tabs.js`).

**Sidebar** ([spec](components/sidebar.md))
- [ ] A named `nav`; current page `aria-current="page"`.
- [ ] Collapsed: names stay in the accessible tree (visually hidden) and show as tooltips; the toggle has `aria-expanded`.

**Table** ([spec](components/table.md))
- [ ] A `<caption>` or a name; `<th scope>` for headers.
- [ ] A wide table's wrapper is `role="region"`, named, and `tabindex="0"`.
- [ ] Sortable headers are buttons, with `aria-sort` on the `th`.

**Badge and tag** ([spec](components/badge.md))
- [ ] The text says the status; a count badge has words for screen readers ("3 unread").
- [ ] A tag's remove button names the tag ("Remove tag Fintech").

**Notice** ([spec](components/notice.md))
- [ ] An icon and a title word for its kind.
- [ ] `role="status"` for news; `role="alert"` only for errors that block.

**Toast** ([spec](components/toast.md))
- [ ] One polite live region; never the only copy of an error or of anything essential.
- [ ] Stays 6s with an action (4s without), pauses on hover and focus; Undo reachable by keyboard.

**Dialog** ([spec](components/dialog.md))
- [ ] Native `<dialog>` with `showModal()`; `aria-labelledby` its title.
- [ ] Focus goes to the first field, or the least destructive button; Escape closes; focus returns to the opener.

**Menu** ([spec](components/menu.md))
- [ ] The button has `aria-haspopup="menu"` and `aria-expanded`; items are `role="menuitem"`.
- [ ] Arrow keys, Home/End, Escape (returns focus), Tab closes.

**Tooltip** ([spec](components/tooltip.md))
- [ ] On hover and focus; dismissable with Escape; hoverable; never essential (WCAG 1.4.13).

**Empty, loading, progress** ([empty](components/empty-state.md), [progress](components/progress.md))
- [ ] Empty states offer the next action.
- [ ] Busy regions have `aria-busy="true"`; spinners have a text name; a `<progress>` has a label.

**Save state, side effects, rollback, stale** ([spec](components/save-state.md))
- [ ] The save state is a `role="status"` region, in words.
- [ ] A rollback note is `role="alert"`, and focus moves to its Retry.
- [ ] A stale figure is marked in text ("Working out again…"), not only dimmed.

**Bulk bar** ([spec](components/bulk-bar.md))
- [ ] A named region; the count is in text; every action names its count.

**Keyboard shortcuts** ([spec](components/kbd.md))
- [ ] Listed on `?`; single-key shortcuts only outside text fields, and can be turned off (WCAG 2.1.4).

**Charts** ([spec](components/chart.md))
- [ ] A title, a key for two or more series, and the values in a table or in tooltips on focusable marks.
- [ ] A split bar has `role="img"` and an `aria-label` listing its parts.

**Brand and pattern** ([brand](components/brand.md), [pattern](components/pattern.md))
- [ ] The lockup has one accessible name ("Arabesque Labs"); the mark is `aria-hidden`.
- [ ] The pattern is `aria-hidden` and never behind body text at full strength.
