// Progress shown where the work happens: a spinner in the busy control or
// region, a skeleton where content will appear, a bar when it can be measured.

import type { ComponentPropsWithoutRef, CSSProperties } from "react";
import { useArabesque } from "./settings.js";
import { cx } from "./util.js";

export interface SpinnerProps {
  /**
   * Said by screen readers, as a polite status, when there's no text beside
   * it: true for "Loading" in the page's language, or your own words.
   * Without it, the spinner is decoration: say what's happening beside it.
   */
  label?: string | true;
  className?: string;
}

/** The mark's star, faint, with a segment going round it. Sized and coloured by its text. */
export function Spinner({ label, className }: SpinnerProps) {
  const { labels } = useArabesque();
  const star = <span className={cx("al-spinner", className)} aria-hidden="true" />;
  if (!label) return star;
  return <span role="status">{star}<span className="al-visually-hidden">{label === true ? labels.loading : label}</span></span>;
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
