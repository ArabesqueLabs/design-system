# Breadcrumbs and back link

Breadcrumbs show where a page sits in the hierarchy; a back link returns to the previous step of a flow. They answer different questions, so a page uses one or the other, rather than both.

**CSS:** [`css/components/breadcrumbs.css`](../../css/components/breadcrumbs.css). **Classes:** `.al-back-link`, `.al-breadcrumbs`.

## Anatomy

```html
<nav class="al-breadcrumbs" aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/settings">Settings</a></li>
    <li><a href="/settings/team" aria-current="page">Team</a></li>
  </ol>
</nav>

<a class="al-back-link" href="/step-2">Back</a>
```

## Variants and sizes

Breadcrumbs: a trail of ancestors ending at the current page. Back link: a single link to the previous step.

## States

Links show the underline on hover; the current page carries `aria-current="page"`. The separator is drawn in CSS, so it is never read aloud.

## Keyboard

Each link is a tab stop. Nothing else.

## ARIA

A `<nav>` named "Breadcrumb", with an ordered list. Don't put the separator in the text.

## Right to left

The trail runs right to left and the separator mirrors; the back link's arrow points to the start side.

## Do

- Use breadcrumbs for hierarchy, a back link for the previous step in a flow.
- On narrow screens, keep the parent and the current page and collapse the middle; never truncate the current page's name mid-word.

## Don't

- Use breadcrumbs as the main navigation.
- Make the back link depend on browser history; link to the actual previous step.

## Tokens

`--al-color-text`, `--al-color-text-muted`, `--al-size-target-min`, `--al-space-1`, `--al-space-2`, `--al-text-sm`
