// A notice is a message in the page, in four kinds; a side-effect note says
// what else a change will change, before it's made.

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Icon } from "./icon.js";
import { useArabesque } from "./settings.js";
import { cx } from "./util.js";

export type NoticeKind = "info" | "success" | "warning" | "danger";

export interface NoticeProps extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
  kind?: NoticeKind;
  /** What it's about; its kind's word (Note, Done, Warning, Error) when there's none; null for none at all. */
  title?: ReactNode;
  /** Buttons for what to do about it. */
  actions?: ReactNode;
  /** A Dismiss button, for a notice someone can be done with. Never on an error that isn't fixed. */
  onDismiss?: () => void;
}

const WORD = { info: "noticeInfo", success: "noticeSuccess", warning: "noticeWarning", danger: "noticeDanger" } as const;

/** Danger is an alert (said at once); the rest are status (said when there's a pause). */
export function Notice({ kind = "info", title, actions, onDismiss, className, children, ...rest }: NoticeProps) {
  const { labels } = useArabesque();
  const heading = title === undefined ? labels[WORD[kind]] : title;
  return (
    <div className={cx("al-notice", kind !== "info" && `al-notice--${kind}`, className)} role={kind === "danger" ? "alert" : "status"} {...rest}>
      <Icon name={kind} />
      <div className="al-notice__body">
        {heading != null && <p className="al-notice__title">{heading}</p>}
        {typeof children === "string" ? <p>{children}</p> : children}
        {actions && <div className="al-notice__actions">{actions}</div>}
      </div>
      {onDismiss && (
        <button type="button" className="al-button al-button--icon al-button--quiet al-notice__dismiss" aria-label={labels.dismiss} data-al-tip={labels.dismiss} onClick={onDismiss}>
          <Icon name="close" />
        </button>
      )}
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
