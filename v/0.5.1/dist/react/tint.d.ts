import type { ComponentPropsWithoutRef } from "react";
export declare const tints: readonly ["teal", "green", "yellow", "orange", "pink", "purple", "blue", "cyan"];
export type Tint = (typeof tints)[number];
/** A phrase picked out in a running text. */
export declare function Highlight({ tint, className, ...rest }: ComponentPropsWithoutRef<"mark"> & {
    tint?: Tint;
}): import("react").JSX.Element;
/** Initials in a tint: decoration beside the name it stands for. */
export declare function Avatar({ tint, large, className, ...rest }: ComponentPropsWithoutRef<"span"> & {
    tint?: Tint;
    large?: boolean;
}): import("react").JSX.Element;
