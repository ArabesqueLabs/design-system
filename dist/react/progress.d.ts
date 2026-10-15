import type { ComponentPropsWithoutRef, CSSProperties } from "react";
/** Decoration: say what's happening in text beside it ("Loading offers"). */
export declare function Spinner({ className }: {
    className?: string;
}): import("react").JSX.Element;
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
