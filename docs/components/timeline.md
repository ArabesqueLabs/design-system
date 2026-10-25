# Timeline

What happened, each event at its time, along a line down the start edge: a record's history or an activity feed.

**CSS:** [`css/components/timeline.css`](../../css/components/timeline.css). **Classes:** `.al-timeline`, `.al-timeline__body`, `.al-timeline__event`, `.al-timeline__marker`, `.al-timeline__time`, `.al-timeline__title`.

## Anatomy

```html
<ol class="al-timeline">
  <li>
    <span class="al-timeline__marker" data-tone="success" aria-hidden="true"><svg class="al-icon al-icon--sm">…</svg></span>
    <div class="al-timeline__event">
      <span class="al-timeline__time"><time datetime="2026-10-25T09:40">Today, 09:40</time></span>
      <p class="al-timeline__title">Request approved</p>
      <div class="al-timeline__body">By Lina Haddad. The team can start.</div>
    </div>
  </li>
  …
</ol>
```

In React, `Timeline` (`events`: `time`, `title`, `body`, `icon`, `tone`).

## Variants and sizes

A marker with an icon, or (empty) a dot. Its colour: muted by default, or `data-tone` `accent`, `success`, `warning`, `danger`, which repeat what the title says.

## States

Static.

## Keyboard

Only what's inside an event (a link) is focusable.

## ARIA

An ordered list. The marker is decoration, hidden; the title says what happened, so the tone is never the only sign of it. Each time is a `<time>` with its `datetime`.

## Right to left

The line and the markers are at the start, on the right.

## Do

- Newest first, unless the order of events is the point.
- Times as people say them ("Yesterday, 16:05"), the exact time in `datetime`.

## Don't

- Use it for steps still to come: that's a stepper or a task list.

## Tokens

`--al-border-hairline`, `--al-color-accent`, `--al-color-danger`, `--al-color-line-strong`, `--al-color-success`, `--al-color-surface`, `--al-color-text-muted`, `--al-color-warning`, `--al-radius-full`, `--al-space-1`, `--al-space-3`, `--al-space-6`, `--al-text-sm`, `--al-weight-medium`
