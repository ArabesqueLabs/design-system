# Typography

## Families

| Token | Latin | Arabic (falls through) | For |
|---|---|---|---|
| `--al-font-sans` | Jost | IBM Plex Sans Arabic → Noto Sans Arabic → SF Arabic → Geeza Pro | The interface: labels, controls, tables, short text |
| `--al-font-display` | Jost | Kufam → Noto Kufi Arabic → IBM Plex Sans Arabic | Headings and the display size |
| `--al-font-serif` | Newsreader | Amiri → Noto Naskh Arabic → Scheherazade New | Reading: ledes, prose, notes |
| `--al-font-mono` | IBM Plex Mono | (system) | Code, token names |

The Latin face comes first in each stack and has no Arabic glyphs, so each
script falls through to its own face, character by character, with no
`lang` switching needed. In mixed text ("نظام تصميم Arabesque Labs"), each
word gets the right face.

**Why these Arabic faces.** They're already in use (mosab.co.uk/ar, and hunt's
fallbacks), they're free on Google Fonts, and they pair by feeling:

- **IBM Plex Sans Arabic** has Jost's plain, geometric construction and an
  even colour at small sizes, with a 400/500 pair like Jost's. Interface text
  needs legibility at 15–17px first.
- **Kufam** is a geometric Kufi: the same circles-and-straights logic as Jost's
  display sizes, with enough character for headings. Kufic is also the script
  of the geometric tradition the brand draws on.
- **Amiri** is a Naskh in the Bulaq tradition: a bookish, calligraphic text
  face, as Newsreader is for Latin. It's for reading, never for controls.

They're served from the system itself: `fonts/fonts.css` (link it before
`arabesque.css`), with `font-display: swap`, made by `npm run fonts` from
Google Fonts once, so no page sends its visitors to Google. Only the Latin,
Latin Extended and Arabic subsets are kept, and a browser fetches a file only
when the page has a character in its range: an English page never downloads
the Arabic faces. All are under the SIL Open Font License (`fonts/OFL-*.txt`).

## Scale

A fixed scale for the interface, fluid only at the top. Each fixed step is
about 1.13 times the one below. The base is 17px: Jost's x-height is small,
so at 15px it read smaller than most body text on the web.

| Token | Size | For |
|---|---|---|
| `text-xs` | 13px | Captions, key items, axis labels |
| `text-sm` | 15px | Hints, labels, badges, small buttons, tables (compact) |
| `text-base` | 17px | The interface default and body text |
| `text-md` | 19px | Reading text (serif) |
| `text-lg` | 22px | Ledes, figure values |
| `text-xl` | 26px | Section titles, card figures |
| `text-2xl` | 30–40px | Page section headings |
| `text-3xl` | 36–54px | Page titles |
| `text-display` | 44–80px | One per page at most: the hero |

hunt used 47 distinct sizes; these nine replace all of them. If a size you need
isn't here, use the nearest one.

**Fields on touch screens** are 16px at least (`max(1rem, text-base)` under
`pointer: coarse`): iOS zooms the page into any field set smaller. The base
already clears it; the rule stays so a page that lowers the base can't
trigger the zoom. On the smallest sizes: 13px clears every platform's minimum
in Apple's guidelines (11pt on iOS, 10pt on macOS); keep it for captions and
keys, not for anything people must read to act.

**Weights:** 400 (regular) and 500 (medium) carry everything; 600 only for
small labels that must stand out (badges, the count in the bulk bar). Never
bold a whole paragraph.

**Leading:** `leading-tight` (display), `leading-heading`, `leading-ui` (the
default), `leading-prose` (reading text). **Measure:** `--al-size-measure`
(65ch) for anything read as prose.

## Arabic adjustments

Inside `:lang(ar)`, `css/base.css` and the tokens:

- **Size:** every text token is multiplied by `--al-script-scale` (1.08), since
  Arabic at the same nominal size reads smaller than Latin.
- **Leading:** raised on every step (UI 1.45 → 1.65, prose 1.6 → 1.9), for the
  script's ascenders, descenders and marks.
- **Tracking:** always 0. Letter-spacing breaks the joins between letters.
- **No uppercase, no small caps, no italic.** Arabic has none; emphasis is by
  weight. The system uses sentence case everywhere anyway, so nothing needs
  turning off.
- **Punctuation:** Arabic comma ، semicolon ؛ and question mark ؟ in Arabic
  text; Latin punctuation inside Latin fragments.
- **Digits:** Western (123) by default, Arabic-Indic (١٢٣) as a choice;
  `js/format.js` formats both. See [`../rtl.md`](../rtl.md).

The re-declaration of sizes inside `:lang(ar)` is deliberate: a custom
property's `var()` resolves where it's declared, so an Arabic block inside an
English page needs its own values.

## Writing for type

- Sentence case for everything: titles, buttons, tabs, badges.
- Numbers in tables and figures use `font-variant-numeric: tabular-nums`
  (`.al-tabular`, `.al-table__num`), so columns line up.
- Don't set text in the accent colour except links and the selected state.
