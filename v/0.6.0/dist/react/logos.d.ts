import type { ComponentPropsWithoutRef, ReactNode } from "react";
export interface LogosProps extends Omit<ComponentPropsWithoutRef<"ul">, "children"> {
    /** What the list is ("Who builds with it"): its name, for screen readers, when no heading names it. */
    label?: string;
    /** Each logo: an <img alt="Their name">, an SVG with a <title>, or a <LogoWordmark>. */
    logos: ReactNode[];
}
export declare function Logos({ label, logos, className, ...rest }: LogosProps): import("react").JSX.Element;
/** A name set in type, with an icon if you like: for a logo you don't have as a file. */
export declare function LogoWordmark({ className, ...rest }: ComponentPropsWithoutRef<"span">): import("react").JSX.Element;
