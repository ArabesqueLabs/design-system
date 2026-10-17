import type { ComponentPropsWithoutRef, ReactNode } from "react";
export interface DisclosureProps extends Omit<ComponentPropsWithoutRef<"details">, "title"> {
    /** What's inside, in a few words. */
    summary: ReactNode;
    /** What's chosen inside, shown while it's closed: "5%, salary sacrifice". */
    value?: ReactNode;
}
/** Disclosures one under another (questions and answers): a hairline under the last too. */
export declare function DisclosureGroup({ className, ...rest }: ComponentPropsWithoutRef<"div">): import("react").JSX.Element;
/** A native <details>, for what's secondary. */
export declare function Disclosure({ summary, value, className, children, ...rest }: DisclosureProps): import("react").JSX.Element;
