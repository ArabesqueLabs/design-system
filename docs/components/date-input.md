# Date input

Three fields for a date people already know (a birthday, an issue date). For a date near today that people choose, use a native date picker instead.

**CSS:** [`css/components/date-input.css`](../../css/components/date-input.css). **Classes:** `.al-date-input`, `.al-date-input__year`, `.al-field`, `.al-input`.

## Anatomy

```html
<fieldset class="al-fieldset" role="group" aria-describedby="dob-hint">
  <legend>Date of birth</legend>
  <span class="al-hint" id="dob-hint">For example, 27 3 1990</span>
  <div class="al-date-input">
    <div class="al-field"><label class="al-label" for="dob-day">Day</label>
      <input class="al-input" id="dob-day" inputmode="numeric" autocomplete="bday-day"></div>
    <div class="al-field"><label class="al-label" for="dob-month">Month</label>
      <input class="al-input" id="dob-month" inputmode="numeric" autocomplete="bday-month"></div>
    <div class="al-field al-date-input__year"><label class="al-label" for="dob-year">Year</label>
      <input class="al-input" id="dob-year" inputmode="numeric" autocomplete="bday-year"></div>
  </div>
</fieldset>
```

## Variants and sizes

One. The year field is wider (`.al-date-input__year`).

## States

Invalid: one error for the group, above the fields, and `aria-invalid` only on the fields that are wrong.

## Keyboard

Three tab stops, in reading order. Don't auto-advance between fields.

## ARIA

A fieldset with a legend; each field has its own visible label. The hint is on the group.

## Right to left

The order follows the locale, not the direction: day, month, year in both English (UK) and Arabic. The row's visual order mirrors.

## Do

- Check that the date exists (no 31 April) and say which part is wrong.
- Store date-only values as dates, not as midnight in a time zone.

## Don't

- Use for dates near today, where a calendar helps.
- Use `type="number"`: it adds spinners and drops leading zeros.

## Tokens

`--al-space-3`
