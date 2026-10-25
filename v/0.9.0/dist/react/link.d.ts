import type { ComponentProps } from "react";
export interface TextLinkProps extends ComponentProps<"a"> {
    /** On to a next step: an arrow along the reading direction. */
    arrow?: boolean;
    /** To another site: opens in a new tab, with its icon, and says so. */
    external?: boolean;
    /** For footers and legal lines. */
    muted?: boolean;
}
export declare function TextLink({ arrow, external, muted, className, children, ...rest }: TextLinkProps): import("react").JSX.Element;
