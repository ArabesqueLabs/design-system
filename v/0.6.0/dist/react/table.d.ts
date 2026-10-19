import type { ReactNode } from "react";
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
export declare function Table({ label, columns, rows, compact, interactive, caption, className }: TableProps): import("react").JSX.Element;
