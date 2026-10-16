import type { ComponentPropsWithoutRef, ReactNode } from "react";
export type NoticeKind = "info" | "success" | "warning" | "danger";
export interface NoticeProps extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
    kind?: NoticeKind;
    title?: ReactNode;
    /** Buttons for what to do about it. */
    actions?: ReactNode;
}
/** Danger is an alert (said at once); the rest are status (said when there's a pause). */
export declare function Notice({ kind, title, actions, className, children, ...rest }: NoticeProps): import("react").JSX.Element;
export declare function SideEffect({ className, children, ...rest }: ComponentPropsWithoutRef<"p">): import("react").JSX.Element;
