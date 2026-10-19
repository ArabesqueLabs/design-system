import type { ComponentPropsWithoutRef, ReactNode } from "react";
export type NoticeKind = "info" | "success" | "warning" | "danger";
export interface NoticeProps extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
    kind?: NoticeKind;
    /** What it's about; its kind's word (Note, Done, Warning, Error) when there's none; null for none at all. */
    title?: ReactNode;
    /** Buttons for what to do about it. */
    actions?: ReactNode;
    /** A Dismiss button, for a notice someone can be done with. Never on an error that isn't fixed. */
    onDismiss?: () => void;
}
/** Danger is an alert (said at once); the rest are status (said when there's a pause). */
export declare function Notice({ kind, title, actions, onDismiss, className, children, ...rest }: NoticeProps): import("react").JSX.Element;
export declare function SideEffect({ className, children, ...rest }: ComponentPropsWithoutRef<"p">): import("react").JSX.Element;
