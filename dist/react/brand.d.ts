import type { ComponentPropsWithoutRef, ReactNode } from "react";
export declare const MARK_PATHS: string[];
/** The mark, in the current colour. Decoration beside the wordmark; alone, give it a `title`. */
export declare function Mark({ title, className, ...rest }: ComponentPropsWithoutRef<"svg"> & {
    title?: string;
}): import("react").JSX.Element;
/** The name, in the page's language: "Arabesque Labs", or "معامل آرابيسك" in Arabic. */
export declare function Wordmark({ className }: {
    className?: string;
}): import("react").JSX.Element;
/** The star at the mark's centre (assets/brand/star.svg). */
export declare const STAR_PATH: string;
/** The mark's star alone, solid: for 16–24px, where the frame would clog. */
export declare function Star({ title, className, ...rest }: ComponentPropsWithoutRef<"svg"> & {
    title?: string;
}): import("react").JSX.Element;
export interface LockupProps extends ComponentPropsWithoutRef<"a"> {
    /** The mark over the wordmark: for a splash or print. */
    stacked?: boolean;
    /** A product's name after the wordmark ("hunt", "Design system"). */
    product?: ReactNode;
    /** In place of the wordmark: the company's legal name in a footer, say. */
    name?: ReactNode;
}
/** The mark beside the wordmark: a link with an href, otherwise just the lockup. */
export declare function Lockup({ product, name, stacked, href, className, ...rest }: LockupProps): import("react").JSX.Element;
