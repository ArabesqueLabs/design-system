# Notice and side-effect note

A notice is a message in the page, in four kinds. A side-effect note says what else an action will change, before it's taken.

**CSS:** [`css/components/notice.css`](../../css/components/notice.css). **Classes:** `.al-icon`, `.al-notice`, `.al-notice--danger`, `.al-notice--success`, `.al-notice--warning`, `.al-notice__actions`, `.al-notice__body`, `.al-notice__title`, `.al-side-effect`.

## Anatomy

```html
<div class="al-notice al-notice--warning" role="status">
  <svg class="al-icon" aria-hidden="true">…warning…</svg>
  <div class="al-notice__body">
    <p class="al-notice__title">Check your tax code</p>
    <p>0T taxes all of your pay. These figures would give 507T.</p>
    <div class="al-notice__actions"><button type="button" class="al-button al-button--sm">Use 507T</button></div>
  </div>
</div>

<p class="al-side-effect"><svg class="al-icon al-icon--sm" aria-hidden="true">…info…</svg>
  <span>Changing the rate also updates <strong>2 saved offers</strong>.</span></p>
```

## Variants and sizes

| Kind | Icon | Use |
|---|---|---|
| Info (default) | info | Context: which rates are used |
| `--success` | success | Something's done and stays true |
| `--warning` | warning | Needs attention, not blocking |
| `--danger` | danger | An error; only for errors |

## States

Static; may carry actions.

## Keyboard

Its actions are in the tab order.

## ARIA

`role="status"` for news that arrives; `role="alert"` only for blocking errors. Present on load: no role needed.

## Right to left

The status edge and icon sit at the start.

## Do

- Lead with a title word that names the situation.
- Offer the fix as an action in the notice.
- Put side-effect notes beside the control that causes them, with counts.

## Don't

- Use danger for anything but errors.
- Stack more than two notices; merge them.

## Tokens

`--al-color-danger`, `--al-color-danger-wash`, `--al-color-info`, `--al-color-info-wash`, `--al-color-line-strong`, `--al-color-success`, `--al-color-success-wash`, `--al-color-text`, `--al-color-text-muted`, `--al-color-warning`, `--al-color-warning-wash`, `--al-radius-sm`, `--al-space-1`, `--al-space-2`, `--al-space-3`, `--al-space-4`, `--al-text-sm`, `--al-weight-medium`, `--al-weight-semibold`
