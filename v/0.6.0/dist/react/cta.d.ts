import type { ComponentPropsWithoutRef, ReactNode } from "react";
export interface CallToActionProps extends Omit<ComponentPropsWithoutRef<"section">, "title"> {
    /** One line: what they'll have ("Your next page, built from the same tile."). An h2. */
    heading: ReactNode;
    lede?: ReactNode;
    /** The primary action, then a quieter one; a <Command> if there's one thing to run. */
    actions: ReactNode;
    /** The pattern, quiet, behind it; on by default. */
    pattern?: boolean;
}
/** One per page, at its end. */
export declare function CallToAction({ heading, lede, actions, pattern, id, className, ...rest }: CallToActionProps): import("react").JSX.Element;
