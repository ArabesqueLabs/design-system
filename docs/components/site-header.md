# Site header

A website's top bar: the lockup (home), the page's sections, and the language and theme controls. Under the md breakpoint the sections, the language link and any other tools fold into a menu that drops below the bar, leaving the lockup, the theme button and the menu button. As on arabesquelabs.com. For an app, use the [sidebar](sidebar.md) instead.

**CSS:** [`css/components/site-header.css`](../../css/components/site-header.css). **JS:** [`js/site-header.js`](../../js/site-header.js) (`initSiteHeaders()`). **Classes:** `.al-site-header`, `.al-site-header--sticky`, `.al-site-header__bar`, `.al-site-header__lockup`, `.al-site-header__end`, `.al-site-header__nav`, `.al-site-header__tools`, `.al-site-header__extras`, `.al-site-header__action`, `.al-site-header__toggle`, `.al-site-header__menu`, `.al-site-header__menu-tools`.

## Anatomy

```html
<header class="al-site-header">
  <div class="al-page al-site-header__bar">
    <a class="al-lockup al-site-header__lockup" href="/"><svg class="al-mark" aria-hidden="true">…</svg><span class="al-wordmark" lang="en">Arabesque Labs</span></a>
    <div class="al-site-header__end">
      <nav class="al-site-header__nav" aria-label="Sections"><ul><li><a href="#idea">The idea</a></li>…</ul></nav>
      <div class="al-site-header__tools">
        <div class="al-site-header__extras"><a class="al-language" href="/ar/" hreflang="ar" lang="ar">العربية</a></div>
        <button type="button" class="al-button al-button--icon al-button--quiet" data-theme-toggle aria-label="Switch to dark theme">…</button>
        <button type="button" class="al-button al-button--icon al-button--quiet al-site-header__toggle" data-site-menu-toggle aria-controls="site-menu" aria-expanded="false" aria-label="Menu">
          <svg class="al-icon al-site-header__open" aria-hidden="true">…menu…</svg><svg class="al-icon al-site-header__close" aria-hidden="true">…close…</svg>
        </button>
      </div>
    </div>
  </div>
  <nav class="al-page al-site-header__menu" id="site-menu" aria-label="Sections" hidden>
    <ul>…the same links…</ul>
    <div class="al-site-header__menu-tools">…the same language link and tools…</div>
  </nav>
</header>
<script type="module">
  import { initSiteHeaders } from "./js/site-header.js";
  initSiteHeaders();
</script>
```

## Variants and sizes

One. 5rem tall, 4rem under md. Put it inside a `.al-pattern--hero` section to sit on the hero's pattern. `--sticky` keeps it at the top of the window while the page scrolls, on the page's ground with a hairline under it (not over the hero).

It folds by its own width, not the window's (a container query): in a sidebar or a narrow preview, it shows its menu button there too. Under 30rem (a phone) the lockup drops its product name, keeping the mark and the wordmark.

**With an action** (`.al-site-header__action`, React `action`): the page's one action ("Sign up", "Say hello"), a small primary button after the tools. Unlike them it stays in the bar at every width, so the next step is always one tap away. Under 28rem, to make room, the lockup shows the mark alone; the wordmark stays as the link's name for screen readers.

## States

**Rules:**
- Section links are `--al-color-text-muted`, `--al-color-text` on hover. The current page or section (`aria-current`) is in `--al-color-text`, underlined in the accent.
- The language link ([language link](language-switch.md)) names the other language in that language, with `lang` and `hreflang`; each language has its own address.
- The theme button names what it does ("Switch to dark theme"), and changes its name when pressed (`js/theme.js`). Its half-filled disc turns over in dark.
- Under md, the section links and the extras (the language link and other tools) are hidden and the menu button appears; the menu lists the same links, larger, one per row, with the extras in a row beneath them. The menu button's icon is a cross while the menu is open.

## Keyboard

Tab reaches the lockup, each section link, the language link and tools, the theme button and, under md, the menu button; in the open menu, each link, then the language link and tools. Enter or Space opens and closes the menu; Escape closes it and returns focus to the button; choosing a link closes it.

## ARIA

The bar is a `header` landmark with a `nav` named "Sections" (both navs share it: only one shows at a time). The menu button has `aria-expanded` and `aria-controls`; its name stays "Menu", and its state says whether it's open.

## Right to left

The lockup sits at the start (the right), the tools at the end; the lockup itself doesn't mirror. In Arabic pages the wordmark is written "معامل آرابيسك" ([right to left](../rtl.md)).

## Do

- Keep to three or four sections.
- Put a skip link before it (the React `SiteHeader` has one).

## Don't

- Put more than one action in the bar, or any but the page's main one. A link out (such as GitHub) can go among the tools, which fold into the menu on a phone.

## Tokens

`--al-border-hairline`, `--al-color-accent`, `--al-color-bg`, `--al-color-line`, `--al-color-text`, `--al-color-text-muted`, `--al-duration-base`, `--al-duration-fast`, `--al-ease-standard`, `--al-space-2`, `--al-space-3`, `--al-space-4`, `--al-space-5`, `--al-space-6`, `--al-space-8`, `--al-text-lg`, `--al-z-sticky`
