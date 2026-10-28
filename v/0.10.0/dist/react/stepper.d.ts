import type { ReactNode } from "react";
export interface StepperProps {
    /** The steps' names, in order. */
    steps: ReactNode[];
    /** The current step, from 1; those before it are done. */
    current: number;
    /** A done step's address, to go back to it. */
    href?: (step: number) => string | undefined;
    className?: string;
}
export declare function Stepper({ steps, current, href, className }: StepperProps): import("react").JSX.Element;
