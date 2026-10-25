import type { ComponentPropsWithoutRef, CSSProperties } from "react";
export interface SpinnerProps {
    /**
     * Said by screen readers, as a polite status, when there's no text beside
     * it: true for "Loading" in the page's language, or your own words.
     * Without it, the spinner is decoration: say what's happening beside it.
     */
    label?: string | true;
    className?: string;
}
/** The mark's star, faint, with a segment going round it. Sized and coloured by its text. */
export declare function Spinner({ label, className }: SpinnerProps): import("react").JSX.Element;
/** A line where content will appear; put the region it's in aria-busy. */
export declare function Skeleton({ width, className }: {
    width?: CSSProperties["inlineSize"];
    className?: string;
}): import("react").JSX.Element;
export interface ProgressProps extends Omit<ComponentPropsWithoutRef<"progress">, "value" | "max"> {
    value: number;
    max?: number;
}
/** A measured bar: give it a <label> that says how far ("Importing, 60%"). */
export declare function Progress({ value, max, className, ...rest }: ProgressProps): import("react").JSX.Element;
