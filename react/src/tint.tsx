// Soft colour washes for emphasis and identity.

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "./util.js";

export const tints = ["teal", "green", "yellow", "orange", "pink", "purple", "blue", "cyan"] as const;
export type Tint = (typeof tints)[number];

/** A phrase picked out in a running text. */
export function Highlight({ tint = "teal", className, ...rest }: ComponentPropsWithoutRef<"mark"> & { tint?: Tint }) {
  return <mark className={cx("al-highlight", className)} data-tint={tint} {...rest} />;
}

export interface AvatarProps extends ComponentPropsWithoutRef<"span"> {
  tint?: Tint;
  /** 24px, 32px (the default), 48px or 64px. */
  size?: "sm" | "md" | "lg" | "xl";
  /** The same as size="lg". */
  large?: boolean;
  /** An organisation or a workspace, not a person. */
  square?: boolean;
}

/** Initials in a tint: decoration beside the name it stands for. */
export function Avatar({ tint = "teal", size, large, square, className, ...rest }: AvatarProps) {
  const s = size ?? (large ? "lg" : "md");
  return <span className={cx("al-avatar", s !== "md" && `al-avatar--${s}`, square && "al-avatar--square", className)} data-tint={tint} aria-hidden="true" {...rest} />;
}

export interface AvatarStackProps {
  /** Who they are, in words, for screen readers ("Shared with Sam, Lina and 3 others"). */
  label: string;
  /** Avatars, a few. */
  children: ReactNode;
  /** How many more, written as it's shown ("+3"). */
  more?: string;
  className?: string;
}

/** Who's on something: their avatars overlapping, then how many more. */
export function AvatarStack({ label, children, more, className }: AvatarStackProps) {
  return (
    <span className={cx("al-avatars", className)}>
      {children}
      {more && <span className="al-avatar" aria-hidden="true"><bdi>{more}</bdi></span>}
      <span className="al-visually-hidden">{label}</span>
    </span>
  );
}
