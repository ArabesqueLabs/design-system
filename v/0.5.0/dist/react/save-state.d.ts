import type { ComponentPropsWithoutRef, ReactNode } from "react";
export type SaveStatus = "unsaved" | "saving" | "saved" | "failed";
export interface SaveStateProps {
    state: SaveStatus;
    /** With state "failed": a Retry button. */
    onRetry?: () => void;
    /** In place of the built-in words. */
    children?: ReactNode;
    className?: string;
}
/** A polite status: unsaved → saving → saved, or failed with Retry. */
export declare function SaveState({ state, onRetry, children, className }: SaveStateProps): import("react").JSX.Element;
/** Something put back after a change to it failed: why, and Retry. Goes inside the item (it gets .al-rolled-back). */
export declare function RollbackNote({ children, onRetry, className }: {
    children: ReactNode;
    onRetry?: () => void;
    className?: string;
}): import("react").JSX.Element;
/** A result that no longer matches its inputs, while it's worked out again. */
export declare function Stale({ stale, className, ...rest }: ComponentPropsWithoutRef<"div"> & {
    stale: boolean;
}): import("react").JSX.Element;
export declare function StaleNote({ hidden, children, className }: {
    hidden?: boolean;
    children?: ReactNode;
    className?: string;
}): import("react").JSX.Element;
