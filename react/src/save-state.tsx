// Pending changes: whether a change is kept, an optimistic change that
// failed and was put back, and a result that no longer matches its inputs.

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Icon } from "./icon.js";
import { Spinner } from "./progress.js";
import { useArabesque } from "./settings.js";
import { cx } from "./util.js";

export type SaveStatus = "unsaved" | "saving" | "saved" | "failed";

export interface SaveStateProps {
  state: SaveStatus;
  /** With state "failed": a Retry button. */
  onRetry?: () => void;
  /** In place of the built-in words. */
  children?: ReactNode;
  className?: string;
}

/** A polite status: unsaved → saving → saved, or failed with Retry. */
export function SaveState({ state, onRetry, children, className }: SaveStateProps) {
  const { labels } = useArabesque();
  return (
    <span className={cx("al-save-state", className)} role="status" data-state={state}>
      {children ?? labels[state]}
      {state === "failed" && onRetry && <> <button type="button" className="al-button al-button--quiet al-button--sm" onClick={onRetry}>{labels.retry}</button></>}
    </span>
  );
}

/** Something put back after a change to it failed: why, and Retry. Goes inside the item (it gets .al-rolled-back). */
export function RollbackNote({ children, onRetry, className }: { children: ReactNode; onRetry?: () => void; className?: string }) {
  const { labels } = useArabesque();
  return (
    <p className={cx("al-rollback-note", className)} role="alert">
      <Icon name="danger" size="sm" />
      <span>{children}</span>
      {onRetry && <button type="button" className="al-button al-button--sm" onClick={onRetry}>{labels.retry}</button>}
    </p>
  );
}

/** A result that no longer matches its inputs, while it's worked out again. */
export function Stale({ stale, className, ...rest }: ComponentPropsWithoutRef<"div"> & { stale: boolean }) {
  return <div className={cx(stale && "al-stale", className)} {...rest} />;
}

export function StaleNote({ hidden, children, className }: { hidden?: boolean; children?: ReactNode; className?: string }) {
  const { labels } = useArabesque();
  return <p className={cx("al-stale-note", className)} hidden={hidden}><Spinner />{children ?? labels.workingOut}</p>;
}
