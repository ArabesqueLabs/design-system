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
    /** The page in the other language: a language link before the theme toggle. */
    language?: {
        href: string;
        lang: string;
        label?: string;
    };
    /** Before the theme toggle: anything else. */
    tools?: ReactNode;
    /** Stays at the top of the window while the page scrolls. */
    sticky?: boolean;
    /** Its skip link's target, first in the header; false for none (when the page has its own). Default "#main". */
    skipTo?: string | false;
    /** The theme toggle; on by default. */
    themeToggle?: boolean;
    /** The menu's id; one is made if it's not given. */
    menuId?: string;
    className?: string;
}
export declare function SiteHeader({ home, lockup, links, language, tools, sticky, skipTo, themeToggle, menuId, className }: SiteHeaderProps): import("react").JSX.Element;
/**
 * Light or dark (js/theme.js): named for what it switches to. On a page
 * without React, wire it with the same data-label-* (see templates/home.html).
 */
export declare function ThemeToggle({ className }: {
    className?: string;
}): import("react").JSX.Element;
