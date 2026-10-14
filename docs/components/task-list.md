# Task list

The parts of a long job, each with its status, so people can do them in any order and see what's left.

**CSS:** [`css/components/task-list.css`](../../css/components/task-list.css). **Classes:** `.al-task-list`, `.al-task-list__hint`, `.al-task-list__item`, `.al-task-list__name`, `.al-task-list__status`.

## Anatomy

```html
<ul class="al-task-list">
  <li class="al-task-list__item">
    <span class="al-task-list__name"><a href="…">Add your details</a></span>
    <span class="al-task-list__status al-badge al-badge--success">Done</span>
  </li>
  <li class="al-task-list__item">
    <span class="al-task-list__name">Review and send</span>
    <span class="al-task-list__hint">Finish the other tasks first</span>
    <span class="al-task-list__status al-badge al-badge--outline">Can't start yet</span>
  </li>
</ul>
```

## Variants and sizes

Statuses: Not started, In progress, Done, Can't start yet (with a hint saying why).

## States

A task that can't start yet isn't a link at all, rather than a disabled link. Done tasks stay links, so people can change them.

## Keyboard

Each available task is a tab stop.

## ARIA

Status is in words; a summary above says progress in words ("2 of 4 done").

## Right to left

Status sits at the end and mirrors.

## Do

- Say why a task isn't available.
- Let people re-enter finished tasks.

## Don't

- Use colour alone for status.
- Force an order unless one task truly depends on another.

## Tokens

`--al-border-hairline`, `--al-color-accent`, `--al-color-line`, `--al-color-surface-sunk`, `--al-color-text-muted`, `--al-space-1`, `--al-space-3`, `--al-space-4`, `--al-text-sm`, `--al-weight-medium`
