import type { ComponentPropsWithoutRef } from "react";
import { useArabesque } from "./settings.js";
import { cx } from "./util.js";

/** Every icon in the sprite (icons/). */
export const iconNames = ["arrow", "arrow-up", "board", "calendar", "check", "chevron", "chevron-down", "close", "copy", "danger", "edit", "external", "file", "info", "language", "mail", "menu", "minus", "more", "plus", "retry", "search", "settings", "sidebar", "success", "theme", "trash", "undo", "warning"] as const;
export type IconName = (typeof iconNames)[number];

/** Directional icons, which mirror in right to left. */
const MIRRORED = new Set<IconName>(["chevron", "arrow", "undo", "retry", "external", "sidebar"]);

export interface IconProps extends Omit<ComponentPropsWithoutRef<"svg">, "children"> {
  name: IconName;
  /** sm 16px, the default 18px, lg 24px. */
  size?: "sm" | "lg";
  /** Mirror in right to left; directional icons do by default. */
  mirror?: boolean;
}

/** A line icon from the sprite. Decoration: name what it's on, not the icon. */
export function Icon({ name, size, mirror = MIRRORED.has(name), className, ...rest }: IconProps) {
  const { sprite } = useArabesque();
  return (
    <svg className={cx("al-icon", size && `al-icon--${size}`, mirror && "al-mirror", className)} aria-hidden="true" focusable="false" {...rest}>
      <use href={`${sprite}#al-icon-${name}`} />
    </svg>
  );
}
