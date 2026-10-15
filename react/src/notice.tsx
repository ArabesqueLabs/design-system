// A notice is a message in the page, in four kinds; a side-effect note says
// what else a change will change, before it's made.

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Icon } from "./icon.js";
import { cx } from "./util.js";

export type NoticeKind = "info" | "success" | "warning" | "danger";

export interface NoticeProps extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
  kind?: NoticeKind;
  title?: ReactNode;
  /** Buttons for what to do about it. */
  actions?: ReactNode;
}

/** Danger is an alert (said at once); the rest are status (said when there's a pause). */
export function Notice({ kind = "info", title, actions, className, children, ...rest }: NoticeProps) {
  return (
    <div className={cx("al-notice", kind !== "info" && `al-notice--${kind}`, className)} role={kind === "danger" ? "alert" : "status"} {...rest}>
      <Icon name={kind} />
      <div className="al-notice__body">
        {title && <p className="al-notice__title">{title}</p>}
        {typeof children === "string" ? <p>{children}</p> : children}
        {actions && <div className="al-notice__actions">{actions}</div>}
      </div>
    </div>
  );
}

export function SideEffect({ className, children, ...rest }: ComponentPropsWithoutRef<"p">) {
  return (
    <p className={cx("al-side-effect", className)} {...rest}>
      <Icon name="info" size="sm" />
      <span>{children}</span>
    </p>
  );
}
