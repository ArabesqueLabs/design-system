import { type ComponentPropsWithoutRef, type MouseEvent, type ReactNode } from "react";
export interface ErrorSummaryProps {
    /** Each problem, linked to its field (href "#field-id"). */
    errors: {
        href: string;
        message: ReactNode;
    }[];
    title?: ReactNode;
    /** Takes focus when it appears, so it's read at once: on by default (off for one shown as an example). */
    autoFocus?: boolean;
    id?: string;
    className?: string;
}
/**
 * When a form is submitted with problems: a list at the top of the form.
 * It takes focus when it appears, so it's read at once.
 */
export declare function ErrorSummary({ errors, title, autoFocus, id, className }: ErrorSummaryProps): import("react").JSX.Element | null;
export interface SearchProps extends Omit<ComponentPropsWithoutRef<"input">, "type"> {
    /** The visible label ("Search items"). */
    label: ReactNode;
    id?: string;
}
/** A search field with a visible label, a search icon and Clear (js/search.js). Results are yours to announce. */
export declare function Search({ label, id, className, onChange, ...rest }: SearchProps): import("react").JSX.Element;
export interface SummaryRow {
    key: ReactNode;
    value: ReactNode;
    /** A Change link to where it's answered; its text says what changes, for screen readers. */
    change?: {
        href: string;
        what: string;
        onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
    };
}
/** Facts as key–value pairs, each optionally with Change. */
export declare function SummaryList({ rows, className }: {
    rows: SummaryRow[];
    className?: string;
}): import("react").JSX.Element;
export interface ConfirmationProps extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
    title: ReactNode;
    children?: ReactNode;
    /** Takes focus when it appears, so it's read: on by default. */
    autoFocus?: boolean;
}
/** Says something's been done, gives a reference, and what happens next follows it. */
export declare function Confirmation({ title, children, autoFocus, className, ...rest }: ConfirmationProps): import("react").JSX.Element;
