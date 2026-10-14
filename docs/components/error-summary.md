# Error summary

When a form is submitted with problems: a list at the top of the form, each problem a link to its field. It is shown even for one error.

**CSS:** [`css/components/error-summary.css`](../../css/components/error-summary.css). **Classes:** `.al-error-summary`, `.al-error-summary__list`, `.al-error-summary__title`, `.al-icon`.

## Anatomy

```html
<div class="al-error-summary" tabindex="-1" role="alert" aria-labelledby="f-error-title">
  <h2 class="al-error-summary__title" id="f-error-title">There is a problem</h2>
  <ul class="al-error-summary__list">
    <li><a href="#name">Enter your full name</a></li>
  </ul>
</div>
```

## Variants and sizes

One. `js/validate.js` builds it, and the matching inline errors, for you.

## States

Appears on submit, never while typing. Removed on the next submit that succeeds.

## Keyboard

Focus moves to the summary on submit. Each link focuses its field and scrolls so the label is in view.

## ARIA

`role="alert"` with the heading as its name. The page title gains "Error: " while errors are shown. Each field gets `aria-invalid` and its message in `aria-describedby`.

## Right to left

Follows the reading direction.

## Do

- Use the same words in the summary and beside the field.
- Say what to do ("Enter…", "Choose…"), not what's wrong.

## Don't

- Validate on blur or while typing.
- Disable the submit button until the form is valid.

## Tokens

`--al-border-focus`, `--al-border-focus-offset`, `--al-color-danger`, `--al-color-focus`, `--al-color-surface`, `--al-color-text`, `--al-radius-sm`, `--al-space-1`, `--al-space-2`, `--al-space-4`, `--al-space-5`, `--al-text-lg`, `--al-tracking-none`, `--al-weight-medium`
