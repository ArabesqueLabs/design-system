import { type ReactNode } from "react";
export interface BackToTopProps {
    /** Where it goes; "#top", the top of the page, by default. */
    href?: string;
    /** Its words; "Back to top" by default, in the page's language. */
    children?: ReactNode;
    className?: string;
}
/** Put it once, last in the page, after the footer. */
export declare function BackToTop({ href, children, className }: BackToTopProps): import("react").JSX.Element;
