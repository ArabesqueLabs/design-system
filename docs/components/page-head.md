# Page head

The page's title, and on the trailing side what applies to the whole page: its settings, views and primary action.

**CSS:** [`css/components/page-head.css`](../../css/components/page-head.css). **Classes:** `.al-page-head`, `.al-page-head__end`, `.al-page-head__lede`.

## Anatomy

```html
<div class="al-page-head">
  <h1>Take-home pay</h1> <span class="al-badge al-badge--warning">Experimental</span>
  <div class="al-page-head__end">
    <label class="al-label" for="year">Tax year</label> <select class="al-select" id="year">…</select>
  </div>
  <p class="al-page-head__lede">The calculator works out what you'd keep as you type.</p>
</div>
```

## Variants and sizes

With or without a lede and an end group. Tabs usually follow it ([nav](nav.md)).

## States

None of its own.

## Keyboard

Natural order: title, badge, end controls.

## ARIA

The title is the page's `h1`.

## Right to left

The end group moves to the left in Arabic. Under `md` it drops below the title.

## Do

- Keep the page's primary action here, never folded away.

## Don't

- Put more than three controls in the end group; move the rest into the page.

## Tokens

`--al-border-hairline`, `--al-color-line`, `--al-color-text-muted`, `--al-size-measure`, `--al-space-3`, `--al-space-4`, `--al-space-6`, `--al-text-3xl`
