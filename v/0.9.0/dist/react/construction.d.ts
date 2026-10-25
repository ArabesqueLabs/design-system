import { type ReactNode } from "react";
export interface ConstructionStep {
    /** What the drawing shows, for screen readers. */
    alt: string;
    title: ReactNode;
    aside?: ReactNode;
}
export interface ConstructionFigureProps {
    /** A slider that redraws steps 2 and 3 at another contact angle. */
    adjustable?: boolean;
    /** Your own words for the three steps; the system's, in the page's language, by default. */
    steps?: [ConstructionStep, ConstructionStep, ConstructionStep];
    className?: string;
    id?: string;
}
export declare function ConstructionFigure({ adjustable, steps, className, id }: ConstructionFigureProps): import("react").JSX.Element;
