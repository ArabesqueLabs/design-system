// Layout (css/layout.css) and the utilities a page needs from React.

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { useArabesque } from "./settings.js";
import { cx, useStableId } from "./util.js";

type Box<T extends ElementType> = { as?: T } & Omit<ComponentPropsWithoutRef<T>, "as">;

/** The page's measure and gutters. */
export function Page<T extends ElementType = "div">({ as, className, ...rest }: Box<T>) {
  const C = as ?? "div";
  return <C className={cx("al-page", className)} {...rest} />;
}

export interface SectionProps extends Omit<ComponentPropsWithoutRef<"section">, "title"> {
  /** Its heading (an h2), which names the section as a landmark. Give it an id to link to. */
  heading?: ReactNode;
  lede?: ReactNode;
  /** A few words above the heading: which part of the page this is. */
  eyebrow?: ReactNode;
  /** Before the eyebrow: the section's number among the page's ("01"). */
  index?: ReactNode;
}

/**
 * A band of the page: the section spacing, a hairline from the one before,
 * and, with a heading, its heading and lede inside the page's measure.
 */
export function Section({ heading, lede, eyebrow, index, id, className, children, ...rest }: SectionProps) {
  const headingId = useStableId(id ? `${id}-h` : undefined, "section");
  if (heading == null) return <section className={cx("al-section", className)} id={id} {...rest}>{children}</section>;
  return (
    <section className={cx("al-section", className)} id={id} aria-labelledby={headingId} {...rest}>
      <div className="al-page al-stack">
        {eyebrow != null
          ? <hgroup className="al-section__head"><Eyebrow index={index}>{eyebrow}</Eyebrow><h2 className="al-section__title" id={headingId}>{heading}</h2></hgroup>
          : <h2 className="al-section__title" id={headingId}>{heading}</h2>}
        {lede && <p className="al-lede al-section__lede">{lede}</p>}
        {children}
      </div>
    </section>
  );
}

/** A few words above a heading, in the accent; index numbers the part ("01"). Put it with its heading in an <hgroup>. */
export function Eyebrow({ index, className, children, ...rest }: ComponentPropsWithoutRef<"p"> & { index?: ReactNode }) {
  return <p className={cx("al-eyebrow", className)} {...rest}>{index != null && <><span className="al-eyebrow__index">{index}</span>{" "}</>}{children}</p>;
}

/** Children one under another, evenly spaced. */
export function Stack<T extends ElementType = "div">({ as, gap, className, ...rest }: Box<T> & { gap?: "tight" | "loose" }) {
  const C = as ?? "div";
  return <C className={cx("al-stack", gap && `al-stack--${gap}`, className)} {...rest} />;
}

/** Children in a row that wraps. */
export function Cluster<T extends ElementType = "div">({ as, justify, className, ...rest }: Box<T> & { justify?: "between" | "end" }) {
  const C = as ?? "div";
  return <C className={cx("al-cluster", justify && `al-cluster--${justify}`, className)} {...rest} />;
}

/** Columns that fill the row, each at least the grid's minimum. */
export function Grid<T extends ElementType = "div">({ as, className, ...rest }: Box<T>) {
  const C = as ?? "div";
  return <C className={cx("al-grid", className)} {...rest} />;
}

/** Two columns that stack under the md breakpoint. */
export function Split<T extends ElementType = "div">({ as, className, ...rest }: Box<T>) {
  const C = as ?? "div";
  return <C className={cx("al-split", className)} {...rest} />;
}

/** Text for screen readers only. */
export function VisuallyHidden({ className, ...rest }: ComponentPropsWithoutRef<"span">) {
  return <span className={cx("al-visually-hidden", className)} {...rest} />;
}

/** The first thing on the page: a link past the header to the content. */
export function SkipLink({ href = "#main", children, className, ...rest }: ComponentPropsWithoutRef<"a">) {
  const { labels } = useArabesque();
  return <a className={cx("al-skip-link", className)} href={href} {...rest}>{children ?? labels.skipToContent}</a>;
}

/** Text of either direction, kept whole inside text of the other (a name, an amount). */
export function Bdi({ children }: { children?: ReactNode }) {
  return <bdi>{children}</bdi>;
}
