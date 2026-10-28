import type { ComponentPropsWithoutRef } from "react";
import type { Tint } from "./tint.js";
export type BadgeTone = "neutral" | "accent" | "success" | "warning" | "danger" | "info" | "outline";
export interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
    tone?: BadgeTone;
    /** A count ("3"), with what it counts for screen readers ("unread"). */
    count?: boolean;
    /** A soft colour of its own (a tint) instead of a tone. */
    tint?: Tint;
}
export declare function Badge({ tone, count, tint, className, ...rest }: BadgeProps): import("react").JSX.Element;
export interface TagProps {
    children: string;
    /** Its colour: a chart series colour or a tint. */
    color?: string;
    tint?: Tint;
    /** A Remove button, named "Remove tag …". */
    onRemove?: () => void;
    className?: string;
}
export declare function Tag({ children, color, tint, onRemove, className }: TagProps): import("react").JSX.Element;
