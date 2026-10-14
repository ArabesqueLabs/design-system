# Character count

A limit on a text field, said as what's left ("You have 12 characters remaining") and, once over, by how much ("You have 8 characters too many"). Typing past the limit is allowed, so a paste isn't cut; the field shows the error instead.

**CSS:** [`css/components/character-count.css`](../../css/components/character-count.css). **JS:** [`js/count.js`](../../js/count.js) (`initCharacterCounts`). **Classes:** `.al-character-count__message` (made by the helper).

## Anatomy

```html
<div class="al-field">
  <label class="al-label" for="desc">Description</label>
  <span class="al-hint" id="desc-hint">A sentence or two is enough.</span>
  <textarea class="al-textarea" id="desc" data-al-maxlength="120" aria-describedby="desc-hint"></textarea>
</div>
<script type="module">
  import { initCharacterCounts } from "./js/count.js";
  const redraw = initCharacterCounts(document, {
    words: (left) => left >= 0 ? `You have ${left} characters remaining` : `You have ${-left} characters too many`,
    limit: (max) => `You can enter up to ${max} characters`,
  });
  // after a language change: redraw();
</script>
```

The helper adds, after the field: the visible message (`aria-hidden`, as it changes with every key), a polite live region, and a visually hidden description of the limit, which joins the field's `aria-describedby`.

## Variants and sizes

On a textarea or a text input. `words` and `limit` give the messages in the page's language (and digits); the defaults are English.

## States

Under the limit: muted. Over it: the message in the danger colour, and the field `aria-invalid="true"` with its error border. The helper removes `aria-invalid` again only if it set it, so a validation error from `js/validate.js` stays.

## Keyboard

Nothing of its own.

## ARIA

The field is described by its hint and by the limit ("You can enter up to 120 characters"), read once on focus. What's left is announced a second after typing stops, through the live region, so it doesn't talk over every key.

## Right to left

Follows the reading direction; numbers in the page's digits.

## Do

- Say the limit in the hint too, if it matters before people start.
- Count what the server counts (characters, not bytes).

## Don't

- Use `maxlength`: it silently cuts what's pasted.
- Announce on every keystroke.

## Tokens

`--al-color-danger`, `--al-color-text-muted`, `--al-text-sm`, `--al-weight-medium`
