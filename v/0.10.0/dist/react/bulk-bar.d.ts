import type { ReactNode } from "react";
export interface BulkBarProps {
    /** How many are selected; with none, there's no bar. */
    count: number;
    /** What can be done to all of them: small buttons that say how many ("Archive 3"). */
    actions: ReactNode;
    onClear: () => void;
    className?: string;
}
/** Once things are selected: how many, what can be done to all of them, and a way to clear. */
export declare function BulkBar({ count, actions, onClear, className }: BulkBarProps): import("react").JSX.Element | null;
