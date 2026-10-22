import type { ComponentPropsWithoutRef, ReactNode } from "react";
/** Where a page sits: each level a link; the last is the page itself (a link, or its title without an href). */
export declare function Breadcrumbs({ items, className }: {
    items: {
        label: ReactNode;
        href?: string;
    }[];
    className?: string;
}): import("react").JSX.Element;
/** Back to the previous step of a flow. */
export declare function BackLink({ children, className, ...rest }: ComponentPropsWithoutRef<"a">): import("react").JSX.Element;
