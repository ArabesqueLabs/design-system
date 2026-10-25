# Rating

A rating from one to five: as radios, drawn as the mark's star, each named in words ("3 of 5"); or shown, as a picture named with its value.

**CSS:** [`css/components/rating.css`](../../css/components/rating.css). **Classes:** `.al-rating`, `.al-rating__star`, `.al-rating__star--on`.

## Anatomy

```html
<fieldset class="al-fieldset">
  <legend>How was your visit?</legend>
  <div class="al-rating">
    <label class="al-rating__star"><input type="radio" name="visit" value="1"><span class="al-visually-hidden">1 of 5</span></label>
    …
  </div>
</fieldset>

<!-- shown, not asked -->
<span class="al-rating" role="img" aria-label="4 of 5">
  <span class="al-rating__star al-rating__star--on"></span> … <span class="al-rating__star"></span>
</span>
```

In React, `Rating` (`legend`, `value`, `onChange`, `max`) and `RatingValue` (`value`, `max`).

## Variants and sizes

Asked (radios) or shown (`role="img"`). Five by default; any small number. Each star is a 28px target.

## States

The chosen star and those before it are filled in the accent; the rest are outlines in the control colour. Pointing at a star (with a mouse) fills up to it, to show what choosing it would give. Focus outlines the focused star.

## Keyboard

As radios: Tab reaches the group, the arrow keys move and choose, Space chooses.

## ARIA

A fieldset whose legend asks the question. Each radio is named "3 of 5", in the page's digits, not by the star. A rating shown is one picture, named with its value; its stars are presentation.

## Right to left

The first star is at the start, on the right; the stars fill from the right.

## Do

- Say what the numbers mean nearby when it isn't obvious ("1 is poor, 5 is excellent").
- Show how many ratings an average comes from.

## Don't

- Ask for a rating where a question with words would tell you more.
- Show half stars: round, and say the exact value in words beside it.

## Tokens

`--al-border-focus`, `--al-color-accent`, `--al-color-control`, `--al-color-focus`, `--al-radius-sm`
