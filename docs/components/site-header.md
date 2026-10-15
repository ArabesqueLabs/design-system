# Site header

A website's top bar: the lockup (home), the page's sections, and the language and theme controls. Under the md breakpoint the sections fold into a menu that drops below the bar. As on arabesquelabs.com. For an app, use the [sidebar](sidebar.md) instead.

**CSS:** [`css/components/site-header.css`](../../css/components/site-header.css). **JS:** [`js/site-header.js`](../../js/site-header.js) (`initSiteHeaders()`). **Classes:** `.al-site-header`, `.al-site-header__bar`, `.al-site-header__lockup`, `.al-site-header__end`, `.al-site-header__nav`, `.al-site-header__tools`, `.al-site-header__toggle`, `.al-site-header__menu`.

## Anatomy

```html
<header class="al-site-header">
  <div class="al-page al-site-header__bar">
    <a class="al-lockup al-site-header__lockup" href="/"><svg class="al-mark" aria-hidden="true">…</svg><span class="al-wordmark" lang="en">Arabesque Labs</span></a>
    <div class="al-site-header__end">
      <nav class="al-site-header__nav" aria-label="Sections"><ul><li><a href="#idea">The idea</a></li>…</ul></nav>
      <div class="al-site-header__tools">
        <a href="/ar/" hreflang="ar" lang="ar">العربية</a>
        <button type="button" class="al-button al-button--icon al-button--quiet" data-theme-toggle aria-label="Switch to dark theme">…</button>
        <button type="button" class="al-button al-button--icon al-button--quiet al-site-header__toggle" data-site-menu-toggle aria-controls="site-menu" aria-expanded="false" aria-label="Menu">…</button>
      </div>
    </div>
  </div>
  <nav class="al-page al-site-header__menu" id="site-menu" aria-label="Sections" hidden><ul>…the same links…</ul></nav>
</header>
<script type="module">
  import { initSiteHeaders } from "./js/site-header.js";
  initSiteHeaders();
</script>
```

## Variants and sizes

One. 5rem tall, 4rem under md. Put it inside a `.al-pattern--hero` section to sit on the hero's pattern.

## States

**Rules:**
- Section links are `--al-color-text-muted`, `--al-color-text` on hover and for the current section (`aria-current`).
- The language link names the other language in that language, with `lang` and `hreflang`; each language has its own address.
- The theme button names what it does ("Switch to dark theme"), and changes its name when pressed (`js/theme.js`).
- Under md, the section links are hidden and the menu button appears; the menu lists the same links, larger, one per row.

## Keyboard

Tab reaches the lockup, each section link, the language link, the theme button and, under md, the menu button. Enter or Space opens and closes the menu; Escape closes it and returns focus to the button; choosing a link closes it.

## ARIA

The bar is a `header` landmark with a `nav` named "Sections" (both navs share it: only one shows at a time). The menu button has `aria-expanded` and `aria-controls`; its name stays "Menu", and its state says whether it's open.

## Right to left

The lockup sits at the start (the right), the tools at the end; the lockup itself doesn't mirror. In Arabic pages the wordmark is written "معامل آرابيسك" ([right to left](../rtl.md)).

## Do

- Keep to three or four sections.
- Put a skip link before it.

## Don't

- Put actions other than language and theme in the bar; the page's main action belongs in the hero.

## Tokens

`--al-color-text`, `--al-color-text-muted`, `--al-color-accent`, `--al-color-line`, `--al-text-lg`, `--al-border-hairline`, `--al-duration-fast`, `--al-ease-standard`, `--al-space-2`, `--al-space-4`, `--al-space-6`, `--al-space-8`
