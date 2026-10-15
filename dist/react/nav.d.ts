import { type ReactNode } from "react";
export interface TabItem {
    id: string;
    label: ReactNode;
    /** A count beside the label. */
    count?: ReactNode;
    content: ReactNode;
}
export interface TabsProps {
    /** What the tabs are views of ("Take-home pay"). */
    label: string;
    tabs: TabItem[];
    /** The tab shown first; the first by default. */
    defaultTab?: string;
    id?: string;
    className?: string;
}
/** Tabs (ARIA APG, automatic activation): arrow keys along the reading direction, Home, End. */
export declare function Tabs({ label, tabs, defaultTab, id, className }: TabsProps): import("react").JSX.Element;
export interface NavLink {
    label: ReactNode;
    href: string;
    /** The page this is. */
    current?: boolean;
    count?: ReactNode;
}
/** Links between pages, looking like tabs: the current one is aria-current="page". */
export declare function SectionNav({ label, links, className }: {
    label: string;
    links: NavLink[];
    className?: string;
}): import("react").JSX.Element;
