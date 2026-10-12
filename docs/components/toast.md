# Toast

Says what just happened, briefly, without blocking; offers Undo when it can be undone. `js/toast.js`.

**CSS:** [`css/components/toast.css`](../../css/components/toast.css). **Classes:** `.al-toast`, `.al-toast__action`, `.al-toaster`.

## Anatomy

```js
import { toast } from "./js/toast.js";
toast("Process archived", { action: "Undo", onAction: () => restore() });
```
Renders `.al-toaster` (one polite live region, created on first use) holding `.al-toast` with a message and an optional `.al-toast__action`.

## Variants and sizes

With an action (stays 6s) or without (4s); `timeout` overrides.

## States

Enters rising and fading in; leaves fading. Pauses while hovered or focused.

## Keyboard

The action is a button in the tab order; focus stops the timer.

## ARIA

`role="status"`, `aria-live="polite"`: read when it appears, without interrupting.

## Right to left

Centred at the bottom; text in the page direction.

## Do

- Past tense: "Process archived".
- Undo for anything reversible, instead of asking first.

## Don't

- Put errors that need fixing only in a toast; they belong by the field or in a notice.
- Show a toast for something the person can already see happened.

## Tokens

`--al-border-focus`, `--al-color-inverse`, `--al-color-on-inverse`, `--al-duration-base`, `--al-ease-exit`, `--al-ease-standard`, `--al-radius-md`, `--al-radius-sm`, `--al-size-target-min`, `--al-space-2`, `--al-space-3`, `--al-space-4`, `--al-space-5`, `--al-text-base`, `--al-weight-semibold`, `--al-z-toast`
