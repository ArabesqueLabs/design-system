import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
export interface CardProps extends Omit<ComponentPropsWithoutRef<"article">, "title"> {
    title?: ReactNode;
    /** The title's heading level, as the page's outline needs it. */
    level?: 2 | 3 | 4;
    description?: ReactNode;
    /** The whole card is one link or button (hover and focus on the card). */
    interactive?: boolean;
    selected?: boolean;
}
export declare function Card({ title, level, description, interactive, selected, className, children, ...rest }: CardProps): import("react").JSX.Element;
export declare function Panel<T extends ElementType = "section">({ as, className, ...rest }: {
    as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as">): import("react").JSX.Element;
export interface StatProps extends ComponentPropsWithoutRef<"div"> {
    label: ReactNode;
    /** The figure, kept whole in either direction. */
    value: ReactNode;
    note?: ReactNode;
}
export declare function Stat({ label, value, note, className, ...rest }: StatProps): import("react").JSX.Element;
