# Dialog

A native `<dialog>`, for a decision that needs the person's attention now. Confirmation dialogs are only for what can't be undone.

**CSS:** [`css/components/dialog.css`](../../css/components/dialog.css). **JS:** [`js/dialog.js`](../../js/dialog.js) (`openDialog`), for dialogs with fields. **Classes:** `.al-dialog`, `.al-dialog--md`, `.al-dialog__actions`, `.al-dialog__body`, `.al-dialog__discard`, `.al-dialog__inner`, `.al-dialog__title`.

## Anatomy

```html
<dialog class="al-dialog" id="confirm" aria-labelledby="confirm-title">
  <form method="dialog">
    <h2 class="al-dialog__title" id="confirm-title">Delete your account?</h2>
    <div class="al-dialog__body">
      <p>This deletes your account and everything in it: 12 applications, 3 offers and 40 files. It can't be undone.</p>
      <div class="al-field"><label class="al-label" for="confirm-word">To confirm, type delete</label>
        <input class="al-input" id="confirm-word" autocomplete="off" spellcheck="false"></div>
    </div>
    <div class="al-dialog__actions">
      <button class="al-button" value="cancel" autofocus>Keep my account</button>
      <button class="al-button al-button--danger al-button--primary" value="delete">Delete account and data</button>
    </div>
  </form>
</dialog>
```
Open with `dialog.showModal()`. Check the typed word on submit, and keep the dialog open, with an error by the field, until it matches; make Enter in the field mean the action it's for (by default, Enter submits with the first button, which is the safe one).

A dialog with fields that shouldn't lose what was typed: open it with `openDialog`, and give it a discard bar.

```html
<dialog class="al-dialog" id="rename" aria-labelledby="rename-title">
  <form method="dialog">
    <h2 class="al-dialog__title" id="rename-title">Rename item</h2>
    <div class="al-dialog__body">…fields…</div>
    <div class="al-dialog__discard" hidden role="alert">
      <p>Discard your changes?</p>
      <button type="button" class="al-button al-button--sm" data-al-keep>Keep editing</button>
      <button type="button" class="al-button al-button--sm al-button--danger" data-al-discard>Discard changes</button>
    </div>
    <div class="al-dialog__actions">
      <button class="al-button" value="cancel">Cancel</button>
      <button class="al-button al-button--primary" value="save">Save name</button>
    </div>
  </form>
</dialog>
<script type="module">
  import { openDialog } from "./js/dialog.js";
  button.addEventListener("click", () => openDialog(document.getElementById("rename"), { opener: button }));
</script>
```

## Variants and sizes

`--md` (768px) for forms and previews; default 480px.

## States

Opens with a short rise; the backdrop dims the page. With `openDialog`, closing (Escape, Cancel) while something has changed shows the discard bar instead; Keep editing goes back to the fields, Discard resets them and closes.

## Keyboard

Focus moves into the dialog (first field, or the least destructive button, with `autofocus`); Tab stays inside; Escape closes; focus returns to the opener. With `openDialog`, Escape is handled before the browser's own close: browsers let a page refuse only the first close request, so a second Escape would otherwise close a dialog with unsaved work.

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
