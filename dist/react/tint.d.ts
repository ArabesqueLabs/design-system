import type { ComponentPropsWithoutRef, ReactNode } from "react";
export declare const tints: readonly ["teal", "green", "yellow", "orange", "pink", "purple", "blue", "cyan"];
export type Tint = (typeof tints)[number];
/** A phrase picked out in a running text. */
export declare function Highlight({ tint, className, ...rest }: ComponentPropsWithoutRef<"mark"> & {
    tint?: Tint;
}): import("react").JSX.Element;
export interface AvatarProps extends ComponentPropsWithoutRef<"span"> {
    tint?: Tint;
    /** 24px, 32px (the default), 48px or 64px. */
    size?: "sm" | "md" | "lg" | "xl";
    /** The same as size="lg". */
    large?: boolean;
    /** An organisation or a workspace, not a person. */
    square?: boolean;
}
/** Initials in a tint: decoration beside the name it stands for. */
export declare function Avatar({ tint, size, large, square, className, ...rest }: AvatarProps): import("react").JSX.Element;
export interface AvatarStackProps {
    /** Who they are, in words, for screen readers ("Shared with Sam, Lina and 3 others"). */
    label: string;
    /** Avatars, a few. */
    children: ReactNode;
    /** How many more, written as it's shown ("+3"). */
    more?: string;
    className?: string;
}
/** Who's on something: their avatars overlapping, then how many more. */
export declare function AvatarStack({ label, children, more, className }: AvatarStackProps): import("react").JSX.Element;
