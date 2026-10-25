# List

Things of one kind, one to a row, hairlines between: notifications, an inbox, results, a record's files.

**CSS:** [`css/components/list.css`](../../css/components/list.css). **Classes:** `.al-list`, `.al-list--flush`, `.al-list__description`, `.al-list__end`, `.al-list__item`, `.al-list__text`, `.al-list__title`.

## Anatomy

```html
<ul class="al-list" role="list" aria-label="Notifications">
  <li>
    <a class="al-list__item" href="…">
      <span class="al-status al-status--info"><span class="al-visually-hidden">Unread</span></span>
      <span class="al-list__text">
        <span class="al-list__title">Lina approved your request</span>
        <span class="al-list__description">The team can start on Monday.</span>
      </span>
      <span class="al-list__end">2 min</span>
    </a>
  </li>
</ul>
```

In React, `List` (`rows`: `title`, `description`, `start`, `end`, `href`, `current`, `disabled`; `flush`, `label`).

## Variants and sizes

Bordered (the default), or `--flush`, with no border of its own, inside a card, a popover or a menu. A row is a link (`a.al-list__item`) or not (`div.al-list__item`). It may start with an avatar, an icon or a status, and end with a value, a time or one small action.

## States

A linked row: the sunk surface on hover, the focus outline inside its edge. The one that's open: a bar in the accent at its start, on the accent wash, and `aria-current`. Unavailable: dimmed, and not reachable (say why nearby).

## Keyboard

Each linked row is one tab stop; nothing inside it is focusable on its own.

## ARIA

A list (`role="list"`, which some screen readers drop when the bullets are styled away), named when nothing near says what it is. A linked row's text is its name, so keep it short; the description is read after. A status with no visible word says it in hidden text.

## Right to left

Follows the reading direction: the start item on the right, the end item on the left; the current row's bar on the right.

## Do

- One line of title, one of description; the description truncates.
- A table when people compare values across rows.

## Don't

- Put several actions in a row: open it, and act there, or use a menu at its end.
- Mix kinds of thing in one list.

## Tokens

`--al-border-focus`, `--al-border-hairline`, `--al-color-accent`, `--al-color-accent-wash`, `--al-color-line`, `--al-color-surface`, `--al-color-surface-sunk`, `--al-color-text`, `--al-color-text-muted`, `--al-radius-sm`, `--al-size-control-md`, `--al-space-0-5`, `--al-space-3`, `--al-space-4`, `--al-text-sm`, `--al-weight-medium`
