import type { ComponentPropsWithoutRef } from "react";
/** Every icon in the sprite (icons/). */
export declare const iconNames: readonly ["arrow", "arrow-up", "board", "calendar", "check", "chevron", "chevron-down", "close", "copy", "danger", "edit", "external", "file", "info", "language", "mail", "menu", "minus", "more", "plus", "retry", "search", "settings", "sidebar", "success", "theme", "trash", "undo", "warning"];
export type IconName = (typeof iconNames)[number];
export interface IconProps extends Omit<ComponentPropsWithoutRef<"svg">, "children"> {
    name: IconName;
    /** sm 16px, the default 18px, lg 24px. */
    size?: "sm" | "lg";
    /** Mirror in right to left; directional icons do by default. */
    mirror?: boolean;
}
/** A line icon from the sprite. Decoration: name what it's on, not the icon. */
export declare function Icon({ name, size, mirror, className, ...rest }: IconProps): import("react").JSX.Element;
