# Right to left

Every part of the system works in Arabic (right to left) as well as English,
from the start. Set the language and direction on `<html>`:

```html
<html lang="ar" dir="rtl">
```

`lang` chooses the fonts and Arabic adjustments (`:lang(ar)`); `dir` chooses
the direction. Set both. A page can contain the other language in a block with
its own `lang` and `dir`.

## 1. Logical properties only

The CSS never says left or right. It says start and end, which follow `dir`:

| Instead of | Write |
|---|---|
| `margin-left`, `padding-right` | `margin-inline-start`, `padding-inline-end` |
| `left: 0`, `right: 0` | `inset-inline-start: 0`, `inset-inline-end: 0` |
| `border-left` | `border-inline-start` |
| `text-align: left` | `text-align: start` |
| `width`, `height` | `inline-size`, `block-size` (where it describes the text axis) |
| `float: left` | flex or grid with `justify-content: start` |

Flex and grid already follow `dir`: a row starts on the right in Arabic.

## 2. What mirrors, and what doesn't

| Mirrors with `dir` | Never mirrors |
|---|---|
| Layout: sidebar side, page head, table columns | The logo and wordmark |
| Chevrons, arrows, "back" and "forward" | The pattern (a fixed geometric figure) |
| Undo, retry, external-link icons | Check marks, clocks, calendars, search, play/pause |
| Progress bars, the split bar, the bullet chart (grow from the start) | Numbers and the digits within them |
| The order of chart categories and time on a column chart | A chart's value axis (up is more in every script) |
| A disclosure's chevron (points the way text reads) | Media timelines, code, maths |
| The pattern's fade (it clears behind the start side, where text begins) | Phone numbers, codes, URLs |

Icons that mirror get `.al-mirror`: `.al-mirror:dir(rtl) { transform: scaleX(-1) }`.
The system's direction rules use `:dir(rtl)`, not `[dir="rtl"] .x`, so they
follow the nearest direction: a `dir="ltr"` block inside an Arabic page (a
code sample, an English quote) doesn't mirror. Likewise a `lang="en"` element
inside an Arabic page gets Latin type metrics back (size, line height,
tracking).

The wordmark doesn't mirror; in Arabic pages it's written in Arabic,
"معامل آرابيسك" (`lang="ar"`, untracked), beside the same mark.

## 3. Bidi isolation

A left-to-right run (a number with its currency, a code, an English name, an
email address) inside Arabic text must be isolated, or punctuation and
symbols around it drift to the wrong side.

| In | Use |
|---|---|
| Markup | `<bdi>£108,000</bdi>`, or `class="al-ltr"` for content that's always LTR (codes, emails) |
| A string (an aria-label, a tooltip, a translated sentence) | U+2066 (LRI) … U+2069 (PDI) around the run |
| User content of unknown direction | `dir="auto"` on the element, or `.al-auto-dir` |
| An input for an LTR value (email, URL, a tax code) | `dir="ltr"` on the input; its label stays in the page's direction |

Examples:

```html
<p>يدفع العرض <bdi>£108,000</bdi> سنويًا.</p>
<p>الرمز <bdi>0T</bdi> يُخضع أجرك كله للضريبة.</p>
```

```js
const text = `راتب ⁦${formatMoney(108000, "GBP", { lang: "ar" })}⁩، ومكافأة 15%`;
```

Without isolation, "راتب £108,000،" can render with the pound sign after the
number; with Arabic-Indic digits ("£١٠٨٬٠٠٠") the drift is worse, since
those digits don't carry the currency sign with them as Western digits do.

## 4. Digits

Arabic can be written with Western digits (123) or Arabic-Indic digits
(١٢٣). Both are correct; it's the reader's preference, so offer it as a
setting and default to Western, which is what most Arabic finance and tech
products use. `js/format.js`:

```js
import { formatNumber, formatMoney, formatPercent, parseNumber } from "./js/format.js";
formatMoney(6010, "GBP", { lang: "ar", numerals: "arab" }); // "£٦٬٠١٠"
formatPercent(0.62, { lang: "ar", numerals: "arab" });      // "٦٢٪؜"
parseNumber("١٠٨٬٠٠٠");                                      // 108000
```

- **Accept either** in inputs: `parseNumber` reads both digit sets, Arabic
  separators (٬ ٫) and "108k".
- **Money writes its short symbol first** in both languages (£6,010), as one
  isolated run, because Arabic locales otherwise spell some symbols out
  ("UK£") and move them.
- Use `inputmode="decimal"` on number inputs so phones show the right keypad.

## 5. Type

See [typography](foundations/typography.md#arabic-adjustments). In short:
larger (×1.08), more leading, no letter-spacing, no uppercase or italic,
Arabic punctuation (، ؛ ؟).

## 6. Testing

Check every screen in all four combinations (light and dark, English and
Arabic). In Arabic, look for:

- the layout mirrored (sidebar on the right, actions at the left end);
- letters joined (any letter-spacing breaks them);
- numbers, amounts and codes whole, with symbols on the right side;
- chevrons pointing the way text reads;
- nothing clipped by the larger size and leading.
