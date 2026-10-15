import type { ReactNode } from "react";
import { formatNumber } from "../../js/format.js";
import { fill, useArabesque } from "./settings.js";
import { cx } from "./util.js";

export interface BulkBarProps {
  /** How many are selected; with none, there's no bar. */
  count: number;
  /** What can be done to all of them: small buttons that say how many ("Archive 3"). */
  actions: ReactNode;
  onClear: () => void;
  className?: string;
}

/** Once things are selected: how many, what can be done to all of them, and a way to clear. */
export function BulkBar({ count, actions, onClear, className }: BulkBarProps) {
  const { labels, lang, numerals } = useArabesque();
  if (count < 1) return null;
  const text = fill(labels.selected, { n: formatNumber(count, { lang, numerals }) });
  return (
    <div className={cx("al-bulk-bar", className)} role="region" aria-label={text}>
      <span className="al-bulk-bar__count">{text}</span>
      {actions}
      <button type="button" className="al-button al-button--sm al-button--quiet" onClick={onClear}>{labels.clearSelection}</button>
    </div>
  );
}
