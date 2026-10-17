import { type ReactNode, type RefObject } from "react";
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
export declare function Dialog({ open, onClose, title, children, actions, guardChanges, returnFocusTo, size, id, className, onSubmit }: DialogProps): import("react").JSX.Element;
