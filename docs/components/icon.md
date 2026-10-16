# Icon

Line icons from the sprite. See [iconography](../foundations/iconography.md).

**CSS:** [`css/components/icon.css`](../../css/components/icon.css). **Classes:** `.al-icon`, `.al-icon--lg`, `.al-icon--sm`.

## Anatomy

```html
<svg class="al-icon" aria-hidden="true"><use href="dist/icons.svg#al-icon-check"></use></svg>
```

## Variants and sizes

Default (18px), `--sm` (16px), `--lg` (24px). `.al-mirror` for directional icons.

The set: arrow, board, calendar, check, chevron, chevron-down, close, copy, danger, edit, external, file, info, language, mail, menu, minus, more, plus, retry, search, settings, sidebar, success, theme, trash, undo, warning. `copy` is for copying (a link, a reference); `mail` for an email address or sending one; `language` beside a language link, where a word alone isn't clear; `chevron-down` for something that opens below (a select, a disclosure).

## States

Takes the colour of its text.

## Keyboard

Not focusable.

## ARIA

`aria-hidden="true"`; the control or text beside it carries the name.

## Right to left

Chevron, arrow, undo, retry, external and sidebar mirror (`.al-mirror`); others don't.

## Do

- Pair status icons with words.

## Don't

- Use an icon alone without an accessible name on its control.

## Tokens

`--al-size-icon`
