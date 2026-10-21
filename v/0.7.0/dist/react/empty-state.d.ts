import type { ComponentPropsWithoutRef, ReactNode } from "react";
export interface EmptyStateProps extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
    /** Why there's nothing here. */
    title: ReactNode;
    text?: ReactNode;
    /** The next action: one button. */
    action?: ReactNode;
}
export declare function EmptyState({ title, text, action, className, ...rest }: EmptyStateProps): import("react").JSX.Element;
