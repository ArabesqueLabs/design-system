// The page's last word: one line, then what to do.

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Pattern } from "./pattern.js";
import { cx, useStableId } from "./util.js";

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
export function CallToAction({ heading, lede, actions, pattern = true, id, className, ...rest }: CallToActionProps) {
  const headingId = useStableId(id ? `${id}-h` : undefined, "cta");
  const body = (
    <>
      <h2 className="al-cta__title" id={headingId}>{heading}</h2>
      {lede && <p className="al-lede al-cta__lede">{lede}</p>}
      <div className="al-cta__actions">{actions}</div>
    </>
  );
  return pattern
    ? <Pattern quiet className={cx("al-cta", className)} id={id} aria-labelledby={headingId} {...rest}>{body}</Pattern>
    : <section className={cx("al-cta", className)} id={id} aria-labelledby={headingId} {...rest}>{body}</section>;
}
