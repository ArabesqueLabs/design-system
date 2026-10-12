# Motion

Motion only ever **answers something a person did**: a disclosure opening, a
toast arriving, a theme changing. Nothing moves by itself, loops (except a
spinner while something is busy) or plays on load.

| Token | Value | For |
|---|---|---|
| `duration-fast` | 150ms | Feedback: hover, press, focus, a field's state |
| `duration-base` | 250ms | Disclosure, a toast entering, theme change, sidebar |
| `duration-slow` | 400ms | Large surfaces only (a dialog's backdrop); rare |
| `ease-standard` | cubic-bezier(.2, 0, 0, 1) | Things arriving or changing |
| `ease-exit` | cubic-bezier(.4, 0, 1, 1) | Things leaving |

## Rules

- **Short and purposeful.** If a person waits on an animation, it's too long.
- **Animate opacity and transform**, so motion is cheap and never shifts
  layout. (The skeleton's shimmer, a background position, is the one
  exception, and it stops under reduced motion.)
- **Reduced motion means none.** Under `prefers-reduced-motion: reduce`,
  `css/base.css` brings every transition and animation to an instant; the
  spinner becomes a still dotted ring; skeletons stop shimmering; nothing
  scrolls smoothly.
- **The pattern never moves.** It's a texture, not an illustration.
- **Direction-aware.** Anything that moves sideways mirrors in right-to-left;
  a toast rises into place, which reads the same in both directions.
