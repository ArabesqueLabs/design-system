# Checkbox, radio and switch

Native checkboxes and radios in the accent colour, and a switch for settings that take effect at once.

**CSS:** [`css/components/choice.css`](../../css/components/choice.css). **Classes:** `.al-choice`, `.al-choice__hint`, `.al-choice__text`, `.al-choices`, `.al-choices--inline`, `.al-switch`.

## Anatomy

```html
<fieldset class="al-fieldset">
  <legend>Student loans</legend>
  <div class="al-choices">
    <label class="al-choice"><input type="checkbox" checked> <span class="al-choice__text">Plan 2</span></label>
    <label class="al-choice"><input type="checkbox">
      <span class="al-choice__text">Postgraduate loan <span class="al-choice__hint">6% of income over £21,000</span></span></label>
  </div>
</fieldset>
<label class="al-choice"><input type="checkbox" role="switch" class="al-switch" checked> <span class="al-choice__text">Show grants</span></label>
```

## Variants and sizes

| Kind | Use |
|---|---|
| Checkbox | Independent yes/no options, in a form that's saved |
| Radio | One of several, always in a `fieldset` with a `legend`; one is chosen by default where there's a sensible one |
| Switch | A setting that applies the moment it's flipped (no Save) |

`.al-choices` stacks them; `.al-choices--inline` puts short ones in a row.

## States

Hover follows the native control. Focus: the system outline. Checked: accent fill (switch: accent track, knob to the end). Mixed: a "Select all" checkbox whose items are some checked and some not shows a dash (the input's `indeterminate`, set from script; `aria-checked` isn't needed on a native checkbox). Disabled: `disabled`, dimmed, with the reason nearby. Invalid: the fieldset gets an `.al-error` under its legend.

## Keyboard

Space toggles a checkbox or switch; arrow keys move between radios in a group (native).

## ARIA

The `<label>` wraps the input, so the whole row is the target (24px minimum). A switch is `<input type="checkbox" role="switch">`. Hints are inside the label, so they're read with it.

## Right to left

The control sits at the start (right in Arabic); the switch's knob travels to the end (left in Arabic), using logical insets.

## Do

- Use a switch only when the change applies at once, and show "Saved" beside it.
- Write labels as statements ("Show grants"), not questions.

## Don't

- Use a switch in a form that needs Save.
- Use a single checkbox for a choice between two named options; use radios.

## Tokens

`--al-border-hairline`, `--al-color-accent`, `--al-color-control`, `--al-color-on-accent`, `--al-color-surface-sunk`, `--al-color-text-muted`, `--al-duration-fast`, `--al-ease-standard`, `--al-radius-full`, `--al-size-target-min`, `--al-space-0-5`, `--al-space-1`, `--al-space-2`, `--al-space-5`, `--al-text-base`, `--al-text-sm`
