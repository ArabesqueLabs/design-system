import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
export interface CardProps extends Omit<ComponentPropsWithoutRef<"article">, "title"> {
    title?: ReactNode;
    /** The title's heading level, as the page's outline needs it. */
    level?: 2 | 3 | 4;
    description?: ReactNode;
    /** The whole card is one link or button (hover and focus on the card). */
    interactive?: boolean;
    selected?: boolean;
    /** Its actions, at its foot, at the end of the line. */
    footer?: ReactNode;
    /** One word pinned to its corner ("New"). */
    ribbon?: ReactNode;
}
export declare function Card({ title, level, description, interactive, selected, footer, ribbon, className, children, ...rest }: CardProps): import("react").JSX.Element;
export declare function Panel<T extends ElementType = "section">({ as, className, ...rest }: {
    as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as">): import("react").JSX.Element;
export interface StatProps extends ComponentPropsWithoutRef<"div"> {
    label: ReactNode;
    /** The figure, kept whole in either direction. */
    value: ReactNode;
    note?: ReactNode;
}
export interface QuoteProps extends Omit<ComponentPropsWithoutRef<"figure">, "children" | "role"> {
    /** What they said: one paragraph, or several <p>s. The language's own quotation marks go around it. */
    children: ReactNode;
    name: ReactNode;
    /** Their role, and where. */
    role?: ReactNode;
    /** Their picture or initials: an <Avatar>, or an <img alt="">. */
    avatar?: ReactNode;
    /** Above the quote: what it's about, as an eyebrow. */
    eyebrow?: ReactNode;
}
/** What someone said, in their words, then who they are. */
export declare function Quote({ children, name, role, avatar, eyebrow, className, ...rest }: QuoteProps): import("react").JSX.Element;
/** Stats side by side, large, a hairline before each: the figures a page leads with. */
export declare function Stats({ className, ...rest }: ComponentPropsWithoutRef<"div">): import("react").JSX.Element;
export declare function Stat({ label, value, note, className, ...rest }: StatProps): import("react").JSX.Element;
