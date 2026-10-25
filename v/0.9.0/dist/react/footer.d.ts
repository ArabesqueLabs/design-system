import type { ComponentPropsWithoutRef, ReactNode } from "react";
export interface FooterProps extends ComponentPropsWithoutRef<"footer"> {
    /** In place of the lockup; false for none. */
    lockup?: ReactNode;
    links?: {
        label: ReactNode;
        href: string;
    }[];
    /** The legal line: the company, its number, ©. */
    legal?: ReactNode;
    /** Under the legal line: the product's attribution (an <Attribution>). */
    attribution?: ReactNode;
}
/** Who made it, where to go next, and the legal line: quiet, and the same on every page. */
export declare function Footer({ lockup, links, legal, attribution, className, children, ...rest }: FooterProps): import("react").JSX.Element;
