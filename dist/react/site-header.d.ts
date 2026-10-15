import { type ReactNode } from "react";
export interface SiteHeaderLink {
    label: ReactNode;
    href: string;
    current?: boolean;
}
export interface SiteHeaderProps {
    /** Where the lockup goes: the home page. */
    home?: string;
    /** In place of the lockup. */
    lockup?: ReactNode;
    links: SiteHeaderLink[];
    /** Before the theme toggle: the language link, say. */
    tools?: ReactNode;
    /** The theme toggle; on by default. */
    themeToggle?: boolean;
    /** The menu's id; one is made if it's not given. */
    menuId?: string;
    className?: string;
}
export declare function SiteHeader({ home, lockup, links, tools, themeToggle, menuId, className }: SiteHeaderProps): import("react").JSX.Element;
/**
 * Light or dark (js/theme.js): named for what it switches to. On a page
 * without React, wire it with the same data-label-* (see templates/home.html).
 */
export declare function ThemeToggle({ className }: {
    className?: string;
}): import("react").JSX.Element;
