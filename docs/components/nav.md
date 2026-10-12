# Tabs and section nav

Tabs between views of one thing, and section navigation between pages; they look the same, and differ in markup.

**CSS:** [`css/components/nav.css`](../../css/components/nav.css). **Classes:** `.al-tab`, `.al-tab__count`, `.al-tabpanel`, `.al-tabs`.

## Anatomy

Links between pages:
```html
<nav aria-label="Offers"><div class="al-tabs">
  <a class="al-tab" href="/calc" aria-current="page">Calculator</a>
  <a class="al-tab" href="/offers">Offers <span class="al-tab__count">3</span></a>
</div></nav>
```
In-page tabs (`js/tabs.js`, `initTabs()`):
```html
<div class="al-tabs" role="tablist" aria-label="Take-home pay">
  <button class="al-tab" role="tab" id="t1" aria-controls="p1" aria-selected="true">Calculator</button>
  <button class="al-tab" role="tab" id="t2" aria-controls="p2" aria-selected="false" tabindex="-1">Offers</button>
</div>
<div class="al-tabpanel" role="tabpanel" id="p1" aria-labelledby="t1">…</div>
```

## Variants and sizes

With counts (`__count`). Scrolls sideways when there are too many to fit.

## States

Hover: text colour. Current/selected: text colour and a 2px accent underline. Focus: the system outline.

## Keyboard

Section nav: Tab. Tabs: Tab enters the selected tab; Left/Right (reversed in RTL) move and select; Home/End jump.

## ARIA

`aria-current="page"` for links; `tablist`/`tab`/`tabpanel` with `aria-selected`, `aria-controls`, roving `tabindex` for tabs.

## Right to left

Order follows the reading direction; arrow keys follow it too.

## Do

- Use tabs for views of the same thing; links for different pages.

## Don't

- Use tabs for steps in a sequence.
- Hide a count's meaning: "Offers 3" reads naturally; give a bare number words in `aria-label` if needed.

## Tokens

`--al-border-hairline`, `--al-color-accent`, `--al-color-line`, `--al-color-text`, `--al-color-text-muted`, `--al-size-control-md`, `--al-space-1`, `--al-space-1-5`, `--al-space-2`, `--al-space-3`, `--al-space-5`, `--al-text-xs`, `--al-weight-medium`
