# Icons

Line icons on a 24-unit grid: 1.5 stroke, square ends, mitred corners, drawn
in `currentColor`. `scripts/build.mjs` gathers them into `dist/icons.svg` as
`<symbol id="al-icon-NAME">`; use them as

```html
<svg class="al-icon" aria-hidden="true"><use href="dist/icons.svg#al-icon-check"></use></svg>
```

**Mirror in right-to-left** (add `al-mirror`): arrow, chevron, external, retry, sidebar, undo. They point
along the reading direction. Everything else stays as drawn.

Never: a crescent or moon (the theme icon is a half-filled disc), mosques,
arches or lanterns.
