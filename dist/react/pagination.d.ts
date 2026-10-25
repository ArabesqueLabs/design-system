import type { MouseEvent } from "react";
export interface PaginationProps {
    /** The current page, from 1. */
    page: number;
    /** How many pages there are. */
    pages: number;
    /** A page's address. */
    href: (page: number) => string;
    /** Called when a page is followed, for a list that changes in place; call preventDefault() on the event to stay. */
    onNavigate?: (page: number, event: MouseEvent<HTMLAnchorElement>) => void;
    className?: string;
}
/** Which pages to show, seven at most: the first, the last, and the current one with one each side; a gap is null. */
export declare function pageRange(page: number, pages: number): (number | null)[];
export declare function Pagination({ page, pages, href, onNavigate, className }: PaginationProps): import("react").JSX.Element | null;
