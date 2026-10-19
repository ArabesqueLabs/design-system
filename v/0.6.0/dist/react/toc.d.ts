import { type ReactNode } from "react";
export interface OnThisPageProps {
    /** Each section: "#its-heading-id" and its heading's words. */
    links: {
        href: string;
        label: ReactNode;
    }[];
    /** Its title; "On this page" by default. */
    title?: ReactNode;
    className?: string;
}
export declare function OnThisPage({ links, title, className }: OnThisPageProps): import("react").JSX.Element;
