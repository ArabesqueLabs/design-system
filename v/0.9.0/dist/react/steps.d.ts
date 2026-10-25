import type { ReactNode } from "react";
export interface Step {
    title: ReactNode;
    body?: ReactNode;
}
export interface StepsProps {
    steps: Step[];
    /** The titles' heading level, as the page's outline needs it. */
    level?: 2 | 3 | 4;
    className?: string;
}
/** A numbered sequence: the stages of how something is done. Only for real sequences. */
export declare function Steps({ steps, level, className }: StepsProps): import("react").JSX.Element;
