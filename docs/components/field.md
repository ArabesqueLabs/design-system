# Field

A form control with its label, hint and error. Covers text, number and money (with currency), select, combobox (`datalist`), date and textarea, and fieldset/legend.

**CSS:** [`css/components/field.css`](../../css/components/field.css). **Classes:** `.al-affix`, `.al-affix__text`, `.al-error`, `.al-field`, `.al-field__changed`, `.al-fieldset`, `.al-hint`, `.al-input`, `.al-input--number`, `.al-label`, `.al-label__optional`, `.al-select`, `.al-textarea`, `.al-range`.

## Anatomy

```html
<div class="al-field">
  <label class="al-label" for="salary">Gross salary <span class="al-label__optional">(before tax)</span></label>
  <div class="al-affix">
    <select class="al-select" aria-label="Currency"><option>GBP</option></select>
    <input class="al-input al-input--number" id="salary" inputmode="decimal" aria-describedby="salary-hint" value="108,000">
    <span class="al-affix__text">a year</span>
  </div>
  <p class="al-hint" id="salary-hint">Type 108000, 108k or ١٠٨٬٠٠٠.</p>
</div>
```
Label → control → hint → error, in that order. The error goes under the control:
```html
<input class="al-input" id="code" aria-invalid="true" aria-describedby="code-error">
<p class="al-error" id="code-error"><svg class="al-icon al-icon--sm" aria-hidden="true">…danger…</svg>A tax code is like 1257L, K475 or BR. Check your payslip.</p>
```

## Variants and sizes

| Control | Markup |
|---|---|
| Text | `<input class="al-input">` |
| Number, money | `.al-input--number` (tabular, LTR), `inputmode="decimal"`, in `.al-affix` with a currency select or symbol and a period |
| Select | `<select class="al-select">` |
| Combobox | `<input class="al-input" list="companies">` + `<datalist>`; a hint says what happens to a new value |
| Date | The [date picker](date-picker.md) for a date near today; the [date input](date-input.md) for one people know. `<input type="date">` only where the page is never in Arabic: its calendar follows the browser's language |
| Textarea | `<textarea class="al-textarea">`, resizes vertically |
| Fieldset | `<fieldset class="al-fieldset"><legend>…` around related fields and all radio groups |
| Optional | `<span class="al-label__optional">(optional)</span>` in the label; required fields aren't marked |
| Changed, not saved | `data-changed` on `.al-field`, and `<p class="al-field__changed">Changed, not saved</p>` |

**Sizes:** 40px, 44px on coarse pointers.

**Range** (`.al-range`, in React `Range`, inside a `Field`): a value along a scale, with the value itself beside it in an `<output>`, in the page's digits and with its unit ("40%", "£1,200"). The slider's `aria-valuetext` says the same, so the output is hidden from screen readers. It runs from the right in right to left. For a value that has to be exact, a number field.

```html
<div class="al-field">
  <label class="al-label" for="budget">Budget, a month</label>
  <div class="al-range"><input type="range" id="budget" min="0" max="2000" step="50" value="1200" aria-valuetext="£1,200"><output for="budget" aria-hidden="true">£1,200</output></div>
</div>
```

An icon at the start of a field says what goes in (`.al-input-icon`, from [search](search.md); in React, `Input`'s `icon`); the label still names it.

## States

| State | How |
|---|---|
| Hover | Border to text colour |
| Focus | Border and a 2px outline in the focus colour, on any focus (typing always shows where) |
| Invalid | `aria-invalid="true"`: danger border, thicker on the start side, plus the error text |
| Disabled | `disabled`: dimmed. Prefer `readonly` (sunk background) for values people should see and copy |
| Changed | Warning edge on the start side and "Changed, not saved" |
| Loading | Not on the field: show it beside the form ([save-state](save-state.md)) |

## Keyboard

Native. Tab order follows the visual order; validation runs on blur or submit, never on each keystroke while typing the first time.

## ARIA

`<label for>` always. `aria-describedby` lists the hint and the error ids. `aria-invalid` only when there's an error. An affix's select needs its own `aria-label`. Use `autocomplete` tokens (`email`, `given-name`) where they apply.

## Right to left

Numbers and dates stay LTR inside the field (`direction: ltr`), aligned to the end in Arabic so they sit where the eye expects. Affixes swap sides with the layout. Accept Arabic-Indic digits and separators (`parseNumber` in `js/format.js`).

## Do

- Keep the label visible; use the placeholder only for an example.
- Say how to fix an error, in the person's terms.
- Group money with its currency and period, so "108,000" is never ambiguous.

## Don't

- Mark required fields with an asterisk; mark the optional ones.
- Clear what was typed when showing an error.
- Use a select for fewer than four options; use radios or a segmented control.

## Tokens

`--al-border-focus`, `--al-border-hairline`, `--al-color-accent`, `--al-color-control`, `--al-color-danger`, `--al-color-focus`, `--al-color-surface`, `--al-color-surface-sunk`, `--al-color-text`, `--al-color-text-muted`, `--al-color-warning`, `--al-duration-fast`, `--al-ease-standard`, `--al-field-height`, `--al-field-padding-inline`, `--al-field-radius`, `--al-leading-ui`, `--al-size-target-min`, `--al-size-target-touch`, `--al-space-1`, `--al-space-1-5`, `--al-space-2`, `--al-space-3`, `--al-text-base`, `--al-text-sm`, `--al-text-xs`, `--al-weight-medium`, `--al-weight-regular`
