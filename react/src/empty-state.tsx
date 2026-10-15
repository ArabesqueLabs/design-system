import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "./util.js";

export interface EmptyStateProps extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
  /** Why there's nothing here. */
  title: ReactNode;
  text?: ReactNode;
  /** The next action: one button. */
  action?: ReactNode;
}

export function EmptyState({ title, text, action, className, ...rest }: EmptyStateProps) {
  return (
    <div className={cx("al-empty", className)} {...rest}>
      <p className="al-empty__title">{title}</p>
      {text && <p className="al-empty__text">{text}</p>}
      {action}
    </div>
  );
}
