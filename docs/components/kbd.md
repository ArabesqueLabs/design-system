# Keyboard keys and shortcuts

Keys, and the list of shortcuts that `?` opens.

**CSS:** [`css/components/kbd.css`](../../css/components/kbd.css). **Classes:** `.al-kbd`, `.al-shortcuts`.

## Anatomy

```html
<dl class="al-shortcuts">
  <dt><kbd class="al-kbd">n</kbd></dt><dd>New application</dd>
  <dt><kbd class="al-kbd">/</kbd></dt><dd>Search</dd>
  <dt><kbd class="al-kbd">?</kbd></dt><dd>Show the shortcuts</dd>
</dl>
```

## Variants and sizes

A key; a combination (`<kbd class="al-kbd">Ctrl</kbd> <kbd class="al-kbd">K</kbd>`).

## States

None.

## Keyboard

Single-key shortcuts work only when focus isn't in a text field, and can be turned off: offer `setShortcutsEnabled()` from `js/keys.js` as a setting (WCAG 2.1.4); it's remembered. `onShortcut` matches Shift exactly (⌘Z isn't ⌘⇧Z), except for symbols typed with it ("?"); ignores key repeat and IME composition; and on a non-Latin layout, matches the key by its position, so ⌘K and / work with an Arabic keyboard.

## ARIA

`<kbd>` is enough; put the list in a [dialog](dialog.md) titled "Keyboard shortcuts".

## Right to left

Keys keep their Latin labels; the list mirrors.

## Do

- Make every shortcut discoverable from `?` and from the tooltip of the button it triggers.

## Don't

- Make a shortcut the only way to do something.

## Tokens

`--al-border-hairline`, `--al-color-line-strong`, `--al-color-surface`, `--al-font-mono`, `--al-radius-sm`, `--al-space-1`, `--al-space-2`, `--al-space-5`, `--al-text-xs`
