# Dialog

A native `<dialog>`, for a decision that needs the person's attention now. Confirmation dialogs are only for what can't be undone.

**CSS:** [`css/components/dialog.css`](../../css/components/dialog.css). **Classes:** `.al-dialog`, `.al-dialog--md`, `.al-dialog__actions`, `.al-dialog__body`, `.al-dialog__inner`, `.al-dialog__title`.

## Anatomy

```html
<dialog class="al-dialog" id="confirm" aria-labelledby="confirm-title">
  <form method="dialog">
    <h2 class="al-dialog__title" id="confirm-title">Delete your account?</h2>
    <div class="al-dialog__body">
      <p>This deletes your account and everything in it: 12 applications, 3 offers and 40 files. It can't be undone.</p>
      <div class="al-field"><label class="al-label" for="confirm-email">Type your email address to confirm</label>
        <input class="al-input" id="confirm-email" type="email" dir="ltr" autocomplete="off"></div>
    </div>
    <div class="al-dialog__actions">
      <button class="al-button" value="cancel">Keep my account</button>
      <button class="al-button al-button--danger al-button--primary" value="delete">Delete account and data</button>
    </div>
  </form>
</dialog>
```
Open with `dialog.showModal()`.

## Variants and sizes

`--md` (768px) for forms and previews; default 480px.

## States

Opens with a short rise; the backdrop dims the page.

## Keyboard

Focus moves into the dialog (first field, or the least destructive button); Tab stays inside; Escape closes; focus returns to the opener (native).

## ARIA

`aria-labelledby` the title. The native modal makes the rest of the page inert.

## Right to left

Actions sit at the end (left in Arabic), primary last.

## Do

- **Confirm only the irreversible**: say what will be lost, how much, and that it can't be undone.
- Name both buttons by outcome: "Keep my account", "Delete account and data".
- For severe actions, ask for a deliberate input.

## Don't

- Confirm anything reversible; do it and offer Undo.
- Open a dialog from a dialog.

## Tokens

`--al-border-hairline`, `--al-color-backdrop`, `--al-color-line`, `--al-color-surface`, `--al-color-text`, `--al-duration-base`, `--al-ease-standard`, `--al-radius-sm`, `--al-size-dialog-md`, `--al-size-dialog-sm`, `--al-space-2`, `--al-space-3`, `--al-space-4`, `--al-space-6`, `--al-text-xl`
