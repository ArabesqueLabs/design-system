# Tints: highlight, tag and avatar

Soft colour washes for emphasis and identity: a highlighted phrase, a tag's colour, an avatar's background. Tints decorate; they never carry meaning on their own.

**CSS:** [`css/components/tint.css`](../../css/components/tint.css). **Classes:** `.al-highlight`, `.al-tag`, `.al-avatar`, `.al-avatar--lg`, `.al-avatar--sm`, `.al-avatar--xl`, `.al-avatar--square`, `.al-avatars`, `.al-badge`; colour set with `data-tint`.

## Anatomy

```html
<mark class="al-highlight" data-tint="teal">accessible</mark>
<span class="al-avatar" data-tint="yellow" aria-hidden="true">MI</span>
```

## Variants and sizes

One per `data-tint` value shown in the Tints section of the Elements page.

Avatars come in four sizes: `--sm` (24px), the default (32px), `--lg` (48px) and `--xl` (64px); in React, `size`. `--square` is for an organisation or a workspace, not a person. An `<img class="al-avatar" alt="">` is a picture, cropped to fill. Stacked, in `.al-avatars` (in React, `AvatarStack`), they overlap, each ringed in the ground they sit on (`--al-avatars-ring`, the surface by default), then how many more ("+3"); the stack says who in visually hidden text ("Shared with Lina, Sam, Yusuf and 3 others").

## States

Static.

## Keyboard

Not focusable.

## ARIA

`<mark>` for highlights. An avatar beside a visible name is `aria-hidden`; on its own, give it the person's name.

## Right to left

Follows the reading direction.

## Do

- Pair every tint with words.
- Keep text on a tint at the contrast checked in `docs/contrast.md`.

## Don't

- Use a tint as a status; use a badge's word.
- Highlight more than a few phrases on a page.

## Tokens

`--al-avatars-ring`, `--al-color-surface`, `--al-color-surface-sunk`, `--al-color-text`, `--al-color-tint-blue-bg`, `--al-color-tint-blue-ink`, `--al-color-tint-cyan-bg`, `--al-color-tint-cyan-ink`, `--al-color-tint-green-bg`, `--al-color-tint-green-ink`, `--al-color-tint-orange-bg`, `--al-color-tint-orange-ink`, `--al-color-tint-pink-bg`, `--al-color-tint-pink-ink`, `--al-color-tint-purple-bg`, `--al-color-tint-purple-ink`, `--al-color-tint-teal-bg`, `--al-color-tint-teal-ink`, `--al-color-tint-yellow-bg`, `--al-color-tint-yellow-ink`, `--al-radius-full`, `--al-radius-sm`, `--al-text-lg`, `--al-text-sm`, `--al-text-xl`, `--al-text-xs`, `--al-weight-semibold`
