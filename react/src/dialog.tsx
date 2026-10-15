// A native <dialog>, for a decision that needs the person's attention now.
// Opened with js/dialog.js, so it won't close over unsaved changes, and
// focus goes back to what opened it.

import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { openDialog } from "../../js/dialog.js";
import { useArabesque } from "./settings.js";
import { cx, useStableId } from "./util.js";

export interface DialogProps {
  open: boolean;
  /** Closed, with the value of the button that closed it ("cancel" for Escape). */
  onClose: (returnValue: string) => void;
  title: ReactNode;
  children?: ReactNode;
  /**
   * The buttons. Each closes the dialog with its value: <Button value="save" type="submit">.
   * Put the safe choice first, and autoFocus it when the other destroys.
   */
  actions: ReactNode;
  /** Ask before closing over changes to its fields (a form that edits something). */
  guardChanges?: boolean;
  /**
   * Where focus goes when it closes: the button that opened it. Without
   * it, whatever had focus when it opened (Safari doesn't focus a button
   * when it's clicked, so pass it).
   */
  returnFocusTo?: RefObject<HTMLElement | null>;
  /** Wider, for a form. */
  size?: "md";
  id?: string;
  className?: string;
  /** Before the dialog closes with this value: return false to keep it open (to show an error). */
  onSubmit?: (returnValue: string, form: HTMLFormElement) => boolean | void;
}

export function Dialog({ open, onClose, title, children, actions, guardChanges, returnFocusTo, size, id, className, onSubmit }: DialogProps) {
  const { labels } = useArabesque();
  const ref = useRef<HTMLDialogElement>(null);
  const dialogId = useStableId(id, "dialog");
  const close = useRef(onClose);
  close.current = onClose;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) openDialog(d, { opener: returnFocusTo?.current ?? document.activeElement });
    else if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    // js/dialog.js reopens a dialog closed over unsaved changes, after this
    // listener: only a dialog that stays closed has closed.
    const closed = () => queueMicrotask(() => { if (!d.open) close.current(d.returnValue || "cancel"); });
    d.addEventListener("close", closed);
    return () => d.removeEventListener("close", closed);
  }, []);

  return (
    <dialog ref={ref} className={cx("al-dialog", size && `al-dialog--${size}`, className)} id={dialogId} aria-labelledby={`${dialogId}-title`}>
      <form method="dialog" onSubmit={(e) => {
        const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
        if (onSubmit?.(submitter?.value ?? "", e.currentTarget) === false) e.preventDefault();
      }}>
        <h2 className="al-dialog__title" id={`${dialogId}-title`}>{title}</h2>
        <div className="al-dialog__body">{children}</div>
        {guardChanges && (
          <div className="al-dialog__discard" hidden role="alert">
            <p>{labels.discardQuestion}</p>
            <button type="button" className="al-button al-button--sm" data-al-keep="">{labels.keepEditing}</button>
            <button type="button" className="al-button al-button--sm al-button--danger" data-al-discard="">{labels.discardChanges}</button>
          </div>
        )}
        <div className="al-dialog__actions">{actions}</div>
      </form>
    </dialog>
  );
}
