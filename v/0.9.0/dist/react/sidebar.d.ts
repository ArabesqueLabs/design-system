import { type ReactNode } from "react";
import { type IconName } from "./icon.js";
export interface SidebarLink {
    label: string;
    href: string;
    icon: IconName;
    current?: boolean;
}
export interface ShellProps {
    /** The sections' name ("Sections"). */
    label?: string;
    links: SidebarLink[];
    /** At the foot, above Collapse: Settings, say. */
    footLinks?: SidebarLink[];
    /** Starts collapsed to icons. */
    defaultCollapsed?: boolean;
    /** Told when it's collapsed or expanded, to remember it. */
    onCollapsedChange?: (collapsed: boolean) => void;
    /** The menu's id, under md; one is made if it's not given. */
    menuId?: string;
    /** The page's content, beside the sidebar. */
    children?: ReactNode;
    className?: string;
}
/** The app shell: the sidebar, and the page beside it. */
export declare function Shell({ label, links, footLinks, defaultCollapsed, onCollapsedChange, menuId, children, className }: ShellProps): import("react").JSX.Element;
