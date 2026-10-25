import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { type IconName } from "./icon.js";
export type StatusTone = "neutral" | "success" | "warning" | "danger" | "info";
export interface StatusProps extends ComponentPropsWithoutRef<"span"> {
    tone?: StatusTone;
    /** Something happening now: the dot pulses. */
    live?: boolean;
    /** The word only for screen readers, the dot alone on screen (in a crowded row where the word is said nearby, or in a tooltip). */
    dotOnly?: boolean;
}
/** A state in a word ("Online"), with a dot before it in the state's colour. */
export declare function Status({ tone, live, dotOnly, className, children, ...rest }: StatusProps): import("react").JSX.Element;
export interface TimelineEvent {
    /** When: a <time> with its dateTime, written as people say it ("2 hours ago", "4 Jan"). */
    time: ReactNode;
    title: ReactNode;
    body?: ReactNode;
    /** An icon in the marker; a dot without one. */
    icon?: IconName;
    tone?: "accent" | "success" | "warning" | "danger";
}
/** What happened, each event at its time, along a line. */
export declare function Timeline({ events, className }: {
    events: TimelineEvent[];
    className?: string;
}): import("react").JSX.Element;
export interface ListRow {
    title: ReactNode;
    description?: ReactNode;
    /** Before the text: an <Avatar>, an <Icon>, a <Status dotOnly>. */
    start?: ReactNode;
    /** After it: a value, a time, one small action. */
    end?: ReactNode;
    /** The row opens this: a link from edge to edge. */
    href?: string;
    /** The one open now. */
    current?: boolean;
    disabled?: boolean;
}
export interface ListProps {
    rows: ListRow[];
    /** No border of its own: inside a card, a popover or a menu. */
    flush?: boolean;
    /** The list's name, when nothing on the page says what it is. */
    label?: string;
    className?: string;
}
/** Things of one kind, one to a row, hairlines between. */
export declare function List({ rows, flush, label, className }: ListProps): import("react").JSX.Element;
