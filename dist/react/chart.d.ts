import { type ReactNode } from "react";
/** A chart series colour, 1–4 (0 is the neutral one, for "Other"). */
export type Series = "0" | "1" | "2" | "3" | "4";
export interface ChartFigureProps {
    title: ReactNode;
    /** What the chart shows, in a sentence: read first, and all some people need. */
    summary?: ReactNode;
    children: ReactNode;
    className?: string;
}
/** A chart in a card, with its title and a one-sentence summary. */
export declare function ChartFigure({ title, summary, children, className }: ChartFigureProps): import("react").JSX.Element;
export interface ColumnChartProps {
    /** Along the axis: ["Year 1", "Year 2", …]. */
    categories: string[];
    series: {
        name: string;
        series: Series;
        values: number[];
    }[];
    /** The top of the scale. */
    max: number;
    /** Grid lines, labelled: [0, 50000, 100000]. */
    grid?: number[];
    /** A line across the columns: what's wanted. */
    target?: {
        value: number;
        name: string;
    };
    /** A value as it's shown: "£120,900". */
    format: (value: number) => string;
    /** A grid line's label, shorter: "£100k". */
    formatAxis?: (value: number) => string;
}
/** Grouped columns: each category's value for each series, with a key. */
export declare function ColumnChart({ categories, series, max, grid, target, format, formatAxis }: ColumnChartProps): import("react").JSX.Element;
export interface SplitBarProps {
    /** What the whole is ("Where a year's pay goes"). */
    label: string;
    parts: {
        name: string;
        series: Series;
        value: number;
    }[];
    format: (value: number) => string;
    /** A share as it's shown: "62%". */
    formatPercent: (fraction: number) => string;
}
/** The parts of a whole, in one bar, with a key. */
export declare function SplitBar({ label, parts, format, formatPercent }: SplitBarProps): import("react").JSX.Element;
export interface BulletChartProps {
    rows: {
        name: string;
        series: Series;
        value: number;
    }[];
    /** What's wanted, marked on every row. */
    target: {
        value: number;
        name: string;
    };
    max: number;
    format: (value: number) => string;
    /** How a row compares with the target: "+£3,075 more", "−£500 short". */
    formatDiff: (diff: number) => string;
}
/** Each row's value against one target. */
export declare function BulletChart({ rows, target, max, format, formatDiff }: BulletChartProps): import("react").JSX.Element;
