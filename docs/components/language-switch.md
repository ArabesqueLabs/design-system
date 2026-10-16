# Language link

The same page in the other language: named in that language ("العربية", "English"), marked with its `lang` and `hreflang`. Each language has its own address (`/` and `/ar/`).

**CSS:** [`css/components/language.css`](../../css/components/language.css). **Classes:** `.al-language`.

## Anatomy

```html
<!-- on the English page -->
<a class="al-language" href="/ar/" hreflang="ar" lang="ar">العربية</a>
<!-- on the Arabic page -->
<a class="al-language" href="/" hreflang="en" lang="en">English</a>
```

## Variants and sizes

One. It sits in the [site header](site-header.md)'s tools, before the theme button, with a 44px target. With more than two languages, list them all, each named in its own language.

## States

`--al-color-text-muted`, `--al-color-text` on hover. Focus: the system outline.

## Keyboard

Enter follows it.

## ARIA

`lang` on the link, so a screen reader says the name in that language; `hreflang` says the page it leads to is in it. Give the pages `<link rel="alternate" hreflang="…">` to each other in their heads, too.

## Right to left

It sits in the header's tools, at the end: the left in Arabic.

## Do

- Link to the same page in the other language, not the other language's home page.
- Keep the switch where it is on every page.

## Don't

- Use a flag: languages aren't countries.
- Translate the name ("Arabic" on the English page): people look for their own language, written in it.

## Tokens

`--al-color-text`, `--al-color-text-muted`, `--al-size-target-min`, `--al-space-1-5`, `--al-space-2`
