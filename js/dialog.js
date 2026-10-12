// Dialogs that don't lose work (from Apple's HIG): if closing would throw
// away what someone typed, the dialog doesn't close; a bar inside it asks
// to keep editing or discard. Never a second dialog on top.
//
//   <dialog class="al-dialog" id="edit">
//     <form method="dialog"> …fields…
//       <div class="al-dialog__discard" hidden role="alert">
//         <p>Discard your changes?</p>
//         <button type="button" class="al-button al-button--sm" data-al-keep>Keep editing</button>
//         <button type="button" class="al-button al-button--sm al-button--danger" data-al-discard>Discard changes</button>
//       </div>
//       <div class="al-dialog__actions"><button class="al-button" value="cancel">Cancel</button> …
//
//   import { openDialog } from "./js/dialog.js";
//   openDialog(document.getElementById("edit"));

const snapshot = (form) => JSON.stringify([...new FormData(form)].map(([k, v]) => [k, String(v)]));

export function openDialog(dialog, { opener = document.activeElement } = {}) {
  const form = dialog.querySelector("form");
  const bar = dialog.querySelector(".al-dialog__discard");
  const start = form ? snapshot(form) : "";
  const dirty = () => form && snapshot(form) !== start;
  if (bar) bar.hidden = true;

  if (!dialog.dataset.alGuard) {
    dialog.dataset.alGuard = "on";
    const ask = (e) => {
      if (!dialog.alDirty?.() || !bar) return;
      e.preventDefault();
      bar.hidden = false;
      bar.querySelector("[data-al-keep]")?.focus();
    };
    dialog.addEventListener("cancel", ask);
    dialog.addEventListener("click", (e) => {
      const b = e.target.closest("button[value='cancel']");
      if (b) ask(e);
    });
    bar?.querySelector("[data-al-keep]")?.addEventListener("click", () => {
      bar.hidden = true;
      dialog.querySelector("input, select, textarea")?.focus();
    });
    bar?.querySelector("[data-al-discard]")?.addEventListener("click", () => {
      form?.reset();
      dialog.close("cancel");
    });
    dialog.addEventListener("close", () => dialog.alOpener?.focus?.());
  }
  dialog.alDirty = dirty;
  dialog.alOpener = opener;
  dialog.showModal();
}
