import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
type Box<T extends ElementType> = {
    as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as">;
/** The page's measure and gutters. */
export declare function Page<T extends ElementType = "div">({ as, className, ...rest }: Box<T>): import("react").JSX.Element;
/** A band of the page, with the section spacing. */
export declare function Section<T extends ElementType = "section">({ as, className, ...rest }: Box<T>): import("react").JSX.Element;
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
