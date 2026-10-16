import { type ComponentPropsWithoutRef, type ReactNode } from "react";
export interface PatternProps extends ComponentPropsWithoutRef<"section"> {
    /** No mask: for a band with no text on it. */
    full?: boolean;
    /** Fainter, with no mask: for a small area with nothing on it (an empty state, a card). */
    quiet?: boolean;
}
/** Texture behind a band: masked away behind the text at the start. */
export declare function Pattern({ full, quiet, className, children, ...rest }: PatternProps): import("react").JSX.Element;
export interface HeroProps extends ComponentPropsWithoutRef<"section"> {
    /** Draw in once on load (never under reduced motion). */
    animate?: boolean;
}
/**
 * The hero: one quiet line across the section, one focal tile in the
 * accent, and its caption (<HeroCaption>, wherever the layout puts it).
 * Redrawn, without the animation, when the page's language changes.
 */
export declare function Hero({ animate, className, children, ...rest }: HeroProps): import("react").JSX.Element;
/** What the focal tile is; placed by the hero beside it. */
export declare function HeroCaption({ children, className }: {
    children?: ReactNode;
    className?: string;
}): import("react").JSX.Element;
