import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "./util.js";

export interface DisclosureProps extends Omit<ComponentPropsWithoutRef<"details">, "title"> {
  /** What's inside, in a few words. */
  summary: ReactNode;
  /** What's chosen inside, shown while it's closed: "5%, salary sacrifice". */
  value?: ReactNode;
}

/** Disclosures one under another (questions and answers): a hairline under the last too. */
export function DisclosureGroup({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
  return <div className={cx("al-disclosure-group", className)} {...rest} />;
}

/** A native <details>, for what's secondary. */
export function Disclosure({ summary, value, className, children, ...rest }: DisclosureProps) {
  return (
    <details className={cx("al-disclosure", className)} {...rest}>
      <summary>{summary}{value != null && <> <span className="al-disclosure__value">{value}</span></>}</summary>
      <div className="al-disclosure__body">{children}</div>
    </details>
  );
}
