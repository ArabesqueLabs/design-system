import { type ReactNode } from "react";
export interface PhaseBannerProps {
    /** The phase, as a badge: <Badge tone="warning">Experimental</Badge>. */
    phase: ReactNode;
    /** What it means, and where to say what they think. */
    children: ReactNode;
    className?: string;
}
/** Tells people a service is new or experimental, and where to say what they think. */
export declare function PhaseBanner({ phase, children, className }: PhaseBannerProps): import("react").JSX.Element;
export interface AnnouncementProps {
    /** Names it, so its dismissal is remembered (js/announcement.js); a new message needs a new id. */
    id: string;
    /** One line of news, with its link. */
    children: ReactNode;
    className?: string;
}
/** Above everything: one line of news, dismissed for good with its button. */
export declare function Announcement({ id, children, className }: AnnouncementProps): import("react").JSX.Element;
