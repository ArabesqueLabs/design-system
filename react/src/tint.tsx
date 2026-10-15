// Soft colour washes for emphasis and identity.

import type { ComponentPropsWithoutRef } from "react";
import { cx } from "./util.js";

export const tints = ["teal", "green", "yellow", "orange", "pink", "purple", "blue", "cyan"] as const;
export type Tint = (typeof tints)[number];

/** A phrase picked out in a running text. */
export function Highlight({ tint = "teal", className, ...rest }: ComponentPropsWithoutRef<"mark"> & { tint?: Tint }) {
  return <mark className={cx("al-highlight", className)} data-tint={tint} {...rest} />;
}

/** Initials in a tint: decoration beside the name it stands for. */
export function Avatar({ tint = "teal", large, className, ...rest }: ComponentPropsWithoutRef<"span"> & { tint?: Tint; large?: boolean }) {
  return <span className={cx("al-avatar", large && "al-avatar--lg", className)} data-tint={tint} aria-hidden="true" {...rest} />;
}
