# Search

A search field with a visible label, a search icon and a Clear button.

**CSS:** [`css/components/search.css`](../../css/components/search.css). **Classes:** `.al-icon`, `.al-input`, `.al-search`, `.al-search__clear`.

## Anatomy

```html
<form role="search">
  <label class="al-label" for="q">Search items</label>
  <div class="al-search">
    <svg class="al-icon" aria-hidden="true"><use href="dist/icons.svg#al-icon-search"></use></svg>
    <input class="al-input" id="q" type="search" autocomplete="off">
    <button type="button" class="al-search__clear" aria-label="Clear search" hidden>…</button>
  </div>
</form>
```

## Variants and sizes

One size; suggestions with a native `<datalist>` for simple free text.

## States

Clear shows only when there is text. Loading: a spinner in the results region, not in the field. No results: say so and what to try. Error: say it couldn't search, with Retry.

## Keyboard

Escape clears the field. Enter submits. Don't act on keystrokes while an IME is composing (check `event.isComposing`).

## ARIA

`role="search"` on the form; results are announced through a polite live region with a count in words.

## Right to left

The icon sits at the start and Clear at the end; both mirror.

## Do

- Keep the label visible, even if it's short.
- Keep what was typed when results fail to load.

## Don't

- Use the placeholder as the label.
- Treat a datalist as a full combobox: it can't show rich options or load results as you type.

## Tokens

`--al-border-focus`, `--al-color-focus`, `--al-color-text`, `--al-color-text-muted`, `--al-radius-sm`, `--al-size-control-sm`, `--al-size-icon`, `--al-space-1`, `--al-space-3`
