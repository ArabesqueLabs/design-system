// Progress shown where the work happens: a spinner in the busy control or
// region, a skeleton where content will appear, a bar when it can be measured.

import type { ComponentPropsWithoutRef, CSSProperties } from "react";
import { cx } from "./util.js";

/** Decoration: say what's happening in text beside it ("Loading offers"). */
export function Spinner({ className }: { className?: string }) {
  return <span className={cx("al-spinner", className)} aria-hidden="true" />;
}

/** A line where content will appear; put the region it's in aria-busy. */
export function Skeleton({ width, className }: { width?: CSSProperties["inlineSize"]; className?: string }) {
  return <span className={cx("al-skeleton", className)} style={width != null ? { inlineSize: width } : undefined} />;
}

export interface ProgressProps extends Omit<ComponentPropsWithoutRef<"progress">, "value" | "max"> {
  value: number;
  max?: number;
}

/** A measured bar: give it a <label> that says how far ("Importing, 60%"). */
export function Progress({ value, max = 100, className, ...rest }: ProgressProps) {
  return <progress className={cx("al-progress", className)} value={value} max={max} {...rest} />;
}
