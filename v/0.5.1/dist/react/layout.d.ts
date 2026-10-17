import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
type Box<T extends ElementType> = {
    as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as">;
/** The page's measure and gutters. */
export declare function Page<T extends ElementType = "div">({ as, className, ...rest }: Box<T>): import("react").JSX.Element;
export interface SectionProps extends Omit<ComponentPropsWithoutRef<"section">, "title"> {
    /** Its heading (an h2), which names the section as a landmark. Give it an id to link to. */
    heading?: ReactNode;
    lede?: ReactNode;
    /** A few words above the heading: which part of the page this is. */
    eyebrow?: ReactNode;
    /** Before the eyebrow: the section's number among the page's ("01"). */
    index?: ReactNode;
}
/**
 * A band of the page: the section spacing, a hairline from the one before,
 * and, with a heading, its heading and lede inside the page's measure.
 */
export declare function Section({ heading, lede, eyebrow, index, id, className, children, ...rest }: SectionProps): import("react").JSX.Element;
/** A few words above a heading, in the accent; index numbers the part ("01"). Put it with its heading in an <hgroup>. */
export declare function Eyebrow({ index, className, children, ...rest }: ComponentPropsWithoutRef<"p"> & {
    index?: ReactNode;
}): import("react").JSX.Element;
/** Children one under another, evenly spaced. */
export declare function Stack<T extends ElementType = "div">({ as, gap, className, ...rest }: Box<T> & {
    gap?: "tight" | "loose";
}): import("react").JSX.Element;
/** Children in a row that wraps. */
export declare function Cluster<T extends ElementType = "div">({ as, justify, className, ...rest }: Box<T> & {
    justify?: "between" | "end";
}): import("react").JSX.Element;
/** Columns that fill the row, each at least the grid's minimum. */
export declare function Grid<T extends ElementType = "div">({ as, className, ...rest }: Box<T>): import("react").JSX.Element;
/** Two columns that stack under the md breakpoint. */
export declare function Split<T extends ElementType = "div">({ as, className, ...rest }: Box<T>): import("react").JSX.Element;
/** Text for screen readers only. */
export declare function VisuallyHidden({ className, ...rest }: ComponentPropsWithoutRef<"span">): import("react").JSX.Element;
/** The first thing on the page: a link past the header to the content. */
export declare function SkipLink({ href, children, className, ...rest }: ComponentPropsWithoutRef<"a">): import("react").JSX.Element;
/** Text of either direction, kept whole inside text of the other (a name, an amount). */
export declare function Bdi({ children }: {
    children?: ReactNode;
}): import("react").JSX.Element;
export {};
