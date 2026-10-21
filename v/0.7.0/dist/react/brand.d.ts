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
/** Arabesque's mark: four of the mark's tiles, two by two (assets/brand/arabesque-mark.svg; a test checks they agree). */
export declare const ARABESQUE_MARK_PATH = "M4.69 -4.69L2.75 0L4.69 4.69L0 2.75L-4.69 4.69L-2.75 0L-4.69 -4.69L0 -2.75L4.69 -4.69Z M4.69 27.31L2.75 32L4.69 36.69L0 34.75L-4.69 36.69L-2.75 32L-4.69 27.31L0 29.25L4.69 27.31Z M4.69 59.31L2.75 64L4.69 68.69L0 66.75L-4.69 68.69L-2.75 64L-4.69 59.31L0 61.25L4.69 59.31Z M36.69 -4.69L34.75 0L36.69 4.69L32 2.75L27.31 4.69L29.25 0L27.31 -4.69L32 -2.75L36.69 -4.69Z M32 16L24 19.31L27.31 27.31L19.31 24L16 32L12.69 24L4.69 27.31L8 19.31L0 16L8 12.69L4.69 4.69L12.69 8L16 0L19.31 8L27.31 4.69L24 12.69L32 16Z M36.69 27.31L34.75 32L36.69 36.69L32 34.75L27.31 36.69L29.25 32L27.31 27.31L32 29.25L36.69 27.31Z M32 48L24 51.31L27.31 59.31L19.31 56L16 64L12.69 56L4.69 59.31L8 51.31L0 48L8 44.69L4.69 36.69L12.69 40L16 32L19.31 40L27.31 36.69L24 44.69L32 48Z M36.69 59.31L34.75 64L36.69 68.69L32 66.75L27.31 68.69L29.25 64L27.31 59.31L32 61.25L36.69 59.31Z M68.69 -4.69L66.75 0L68.69 4.69L64 2.75L59.31 4.69L61.25 0L59.31 -4.69L64 -2.75L68.69 -4.69Z M64 16L56 19.31L59.31 27.31L51.31 24L48 32L44.69 24L36.69 27.31L40 19.31L32 16L40 12.69L36.69 4.69L44.69 8L48 0L51.31 8L59.31 4.69L56 12.69L64 16Z M68.69 27.31L66.75 32L68.69 36.69L64 34.75L59.31 36.69L61.25 32L59.31 27.31L64 29.25L68.69 27.31Z M64 48L56 51.31L59.31 59.31L51.31 56L48 64L44.69 56L36.69 59.31L40 51.31L32 48L40 44.69L36.69 36.69L44.69 40L48 32L51.31 40L59.31 36.69L56 44.69L64 48Z M68.69 59.31L66.75 64L68.69 68.69L64 66.75L59.31 68.69L61.25 64L59.31 59.31L64 61.25L68.69 59.31Z";
/** Arabesque's mark, in the current colour: where the design system stands alone. Decoration beside its name; alone, give it a `title`. */
export declare function ArabesqueMark({ title, className, ...rest }: ComponentPropsWithoutRef<"svg"> & {
    title?: string;
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
    /** In place of the mark: `<ArabesqueMark />` for the design system's own lockup. */
    mark?: ReactNode;
}
/** The mark beside the wordmark: a link with an href, otherwise just the lockup. */
export declare function Lockup({ product, name, mark, stacked, href, className, ...rest }: LockupProps): import("react").JSX.Element;
export interface AttributionProps extends ComponentPropsWithoutRef<"a"> {
    /** "product": "A product of Arabesque Labs" (the default); "by": "By Arabesque Labs". */
    wording?: "product" | "by";
    /** The words alone, without the pill: inline in a line of text. */
    plain?: boolean;
    /** A step larger, for an about page. */
    large?: boolean;
    /** The star alone in place of the mark: where the line is small, under 24px for the mark. */
    star?: boolean;
}
/**
 * The line each of the company's products carries: "A product of Arabesque
 * Labs" or "By Arabesque Labs", after the mark (or the star, with `star`), in
 * the page's language. A link to the company's site (its Arabic one, in
 * Arabic), unless `href` says where.
 */
export declare function Attribution({ wording, plain, large, star, href, className, ...rest }: AttributionProps): import("react").JSX.Element;
