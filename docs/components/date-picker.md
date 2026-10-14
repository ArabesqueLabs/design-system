# Date picker

A field for a date near today (a due date, an appointment), typed or chosen from a calendar. Unlike the browser's `<input type="date">`, whose calendar and format follow the browser's language rather than the page's, it's in the page's language: in Arabic, Arabic month and day names, the week from Saturday, the digits the person chose, and a grid that runs from the right. For a date people already know (a birthday), use the [date input](date-input.md).

**CSS:** [`css/components/date-picker.css`](../../css/components/date-picker.css). **JS:** [`js/datepicker.js`](../../js/datepicker.js). **Classes:** `.al-date-picker`, `.al-date-picker__toggle`, and, drawn by the helper, `__dialog`, `__head`, `__title`, `__prev`, `__next`, `__grid`.

## Anatomy

```html
<div class="al-field">
  <label class="al-label" for="due">Due date</label>
  <span class="al-hint" id="due-hint">For example, <span data-al-date-example="2026-11-30">30/11/2026</span></span>
  <div class="al-date-picker">
    <input class="al-input" id="due" name="due" value="2026-11-30" aria-describedby="due-hint" data-al-date-picker>
    <button type="button" class="al-button al-button--icon al-date-picker__toggle" aria-label="Choose date">
      <svg class="al-icon" aria-hidden="true"><use href="/dist/icons.svg#al-icon-calendar"></use></svg>
    </button>
  </div>
</div>
```

```js
import { initDatePickers } from "./js/datepicker.js";
const [due] = initDatePickers(document, {
  numerals: () => settings.digits,                      // "latn" or "arab"
  labels: { previous: "Previous month", next: "Next month" },
});
due.value;        // "2026-11-30"
due.refresh();    // after the language or digits change
```

- The **value** is an ISO date (`2026-11-30`), in a hidden field that takes the input's `name`, so a form sends the same whatever the language. The input shows it as it's written: "30/11/2026", "٣٠/١١/٢٠٢٦".
- **The hint's example** (`data-al-date-example`) is written the way the field writes dates, in the same digits.
- **The calendar** is a modal `<dialog>` placed under the field: the month and year as its title, previous and next month buttons, and a grid of days.
- **Limits:** `data-min` and `data-max` (ISO) on the input. Days outside them can't be chosen.

## Variants and sizes

One. The field is 16rem at most: a date is short.

## States

- **Chosen** day: the accent fill. **Today**: a ring and semibold, so it doesn't look chosen. **Out of range**: muted and struck through, `aria-disabled="true"`.
- **Invalid:** what's typed isn't a date (or 31 April): the value is empty, and the field's error comes from validation (`js/validate.js`), saying which part is wrong.

## Keyboard

In the field: type the date, day first, in either digit set (`30/11/2026`, `٣٠/١١/٢٠٢٦`, `30-11-26`). Alt+↓ opens the calendar, as it does for a select.

In the calendar (the APG date picker dialog):

| Key | Does |
|---|---|
| ← → | The day before or after, along the reading direction (in right to left, ← is the next day) |
| ↑ ↓ | The same day a week before or after |
| Home, End | The first and last day of the week, as the language's week runs |
| Page Up, Page Down | The same day a month before or after (or the month's last day) |
| Shift + Page Up, Page Down | A year before or after |
| Enter, Space | Choose the day, close, and return focus to the button |
| Escape | Close without changing anything; focus returns to the button |
| Tab | Between the month buttons and the grid; the grid is one tab stop |

A click outside closes it. Nothing auto-advances while typing.

## ARIA

- The calendar is a `<dialog>` opened with `showModal()`, named by its month title. The title is `aria-live="polite"`, so a new month is announced.
- The grid is `role="grid"`, named by the title. Column headers are the weekdays' full names (shown short, or a letter where the short names are long, as in Arabic). Each day is a gridcell named by its full date ("Monday, 30 November 2026"), with `aria-selected`, and `aria-current="date"` on today.
- The toggle and month buttons have names in the page's language (`aria-label`; the month buttons' come from `labels`).

## Right to left

- The calendar is drawn in the language of the field (its nearest `lang`), and gets that `lang` and its direction: in Arabic, the week's first day (Saturday, from the browser's locale data) is at the right.
- **Gregorian**, with the Arabic month names the browser has (نوفمبر), even where a locale's default calendar is another (ar-SA).
- Digits: Western by default, Arabic-Indic when `numerals` says so. Typed dates are read in either, and in Persian digits.
- The month buttons point the way the reading goes: "previous" points right in Arabic.
- A date written in Arabic reads right to left: day, month, year, with the day at the right. The bidi marks the browser puts in keep it that way; parsing ignores them.

## Do

- Use it for dates near today, where a calendar helps.
- Put an example in the hint, with `data-al-date-example`, so it's written as the field writes dates.
- Validate on submit, and say which part is wrong.

## Don't

- Use it for a birthday: a calendar is a slow way to reach 1990. Use the [date input](date-input.md).
- Use `<input type="date">` where the page is in Arabic: its calendar is in the browser's language.
- Store the date as a moment (midnight in a time zone): it's a day.

## Tokens

`--al-color-surface`, `--al-color-surface-sunk`, `--al-color-accent`, `--al-color-accent-hover`, `--al-color-on-accent`, `--al-color-control`, `--al-color-focus`, `--al-color-text-muted`, `--al-size-control-sm`, `--al-size-control-md`, `--al-space-2`, `--al-space-3`, `--al-radius-sm`
