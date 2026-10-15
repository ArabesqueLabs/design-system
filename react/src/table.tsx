// For comparing values: numbers line up, the total stands out, asides recede.

import type { ReactNode } from "react";
import { cx } from "./util.js";

export interface TableColumn {
  label: ReactNode;
  /** A column of numbers: aligned on the trailing side, tabular. */
  numeric?: boolean;
}

export interface TableRow {
  /** The row's header: what the row is. */
  head: ReactNode;
  cells: ReactNode[];
  /** total stands out, sub is indented under the row before, aside recedes. */
  kind?: "total" | "sub" | "aside";
  key?: string;
}

export interface TableProps {
  /** The region's name, said when it's reached (it scrolls sideways on its own). */
  label: string;
  columns: TableColumn[];
  rows: TableRow[];
  compact?: boolean;
  /** Rows that are links or can be chosen: hover on the row. */
  interactive?: boolean;
  caption?: ReactNode;
  className?: string;
}

export function Table({ label, columns, rows, compact, interactive, caption, className }: TableProps) {
  const num = (i: number) => (columns[i]?.numeric ? "al-table__num" : undefined);
  return (
    <div className="al-table-wrap" role="region" aria-label={label} tabIndex={0}>
      <table className={cx("al-table", compact && "al-table--compact", interactive && "al-table--interactive", className)}>
        {caption && <caption>{caption}</caption>}
        <thead><tr>{columns.map((c, i) => <th key={i} scope="col" className={num(i)}>{c.label}</th>)}</tr></thead>
        <tbody>
          {rows.map((r, j) => (
            <tr key={r.key ?? j} className={r.kind && `al-table__row--${r.kind}`}>
              <th scope="row">{r.head}</th>
              {r.cells.map((c, i) => <td key={i} className={num(i + 1)}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
