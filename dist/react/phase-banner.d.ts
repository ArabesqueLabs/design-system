import type { ReactNode } from "react";
export interface PhaseBannerProps {
    /** The phase, as a badge: <Badge tone="warning">Experimental</Badge>. */
    phase: ReactNode;
    /** What it means, and where to say what they think. */
    children: ReactNode;
    className?: string;
}
/** Tells people a service is new or experimental, and where to say what they think. */
export declare function PhaseBanner({ phase, children, className }: PhaseBannerProps): import("react").JSX.Element;
