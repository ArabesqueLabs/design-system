// Charts in plain HTML and CSS: columns, a split bar and a bullet chart.
// Each mark is a named image with its value and what it is, a tooltip
// says the same, and the chart is one tab stop with arrow keys between
// marks (js/chart.js). Values are formatted by you, in the page's
// language and digits (js/format.js).

import { useEffect, useRef, type ReactNode } from "react";
import { initChartKeys } from "../../js/chart.js";
import { useTooltips } from "./tooltip.js";
import { cx } from "./util.js";

/** A chart series colour, 1–4 (0 is the neutral one, for "Other"). */
export type Series = "0" | "1" | "2" | "3" | "4";

/** An amount kept whole in either direction inside text and attributes (LRI … PDI, what <bdi> does). */
const iso = (s: string) => `⁦${s}⁩`;

function useChartKeys<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useTooltips();
  // After every render: the marks may have changed.
  useEffect(() => { if (ref.current) initChartKeys(ref.current); });
  return ref;
}

const Mark = ({ className, series, value, what, style }: { className: string; series: Series; value: string; what: string; style: Record<string, string> }) => (
  <span className={className} data-series={series} style={style} role="img" aria-label={`${value} ${what}`} data-al-tip={`${value}|${what}`} />
);

const Key = ({ items, children }: { items: { name: ReactNode; series: Series; after?: ReactNode }[]; children?: ReactNode }) => (
  <div className="al-key">
    {items.map((it, i) => <span key={i} className="al-key__item"><span className="al-swatch" data-series={it.series} />{it.name}{it.after}</span>)}
    {children}
  </div>
);

export interface ChartFigureProps {
  title: ReactNode;
  /** What the chart shows, in a sentence: read first, and all some people need. */
  summary?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** A chart in a card, with its title and a one-sentence summary. */
export function ChartFigure({ title, summary, children, className }: ChartFigureProps) {
  return (
    <figure className={cx("al-card al-stack al-stack--tight", className)}>
      <figcaption className="al-stack al-stack--tight">
        <span className="al-chart__title">{title}</span>
        {summary && <span className="al-chart__summary">{summary}</span>}
      </figcaption>
      {children}
    </figure>
  );
}

export interface ColumnChartProps {
  /** Along the axis: ["Year 1", "Year 2", …]. */
  categories: string[];
  series: { name: string; series: Series; values: number[] }[];
  /** The top of the scale. */
  max: number;
  /** Grid lines, labelled: [0, 50000, 100000]. */
  grid?: number[];
  /** A line across the columns: what's wanted. */
  target?: { value: number; name: string };
  /** A value as it's shown: "£120,900". */
  format: (value: number) => string;
  /** A grid line's label, shorter: "£100k". */
  formatAxis?: (value: number) => string;
}

/** Grouped columns: each category's value for each series, with a key. */
export function ColumnChart({ categories, series, max, grid = [], target, format, formatAxis = format }: ColumnChartProps) {
  const plot = useChartKeys<HTMLDivElement>();
  const pc = (v: number) => `${(100 * v) / max}%`;
  return (
    <div className="al-chart">
      <div className="al-chart__plot" ref={plot}>
        {grid.map((v) => <span key={v} className="al-chart__grid" style={{ insetBlockEnd: pc(v) }} aria-hidden="true"><span>{iso(formatAxis(v))}</span></span>)}
        <div className="al-chart__slots">
          {categories.map((c, i) => (
            <div key={c} className="al-chart__slot">
              {series.map((s) => <Mark key={s.name} className="al-chart__bar" series={s.series} value={iso(format(s.values[i] ?? 0))} what={`${s.name}, ${c}`} style={{ blockSize: pc(s.values[i] ?? 0) }} />)}
            </div>
          ))}
        </div>
        {target && <span className="al-chart__target" style={{ insetBlockEnd: pc(target.value) }} role="img" aria-label={`${iso(format(target.value))} ${target.name}`} data-al-tip={`${iso(format(target.value))}|${target.name}`} />}
      </div>
      <div className="al-chart__axis" aria-hidden="true">{categories.map((c) => <span key={c}>{c}</span>)}</div>
      <Key items={series.map((s) => ({ name: s.name, series: s.series }))}>
        {target && <span className="al-key__item"><span className="al-swatch al-swatch--target" />{`${target.name}: ${iso(format(target.value))}`}</span>}
      </Key>
    </div>
  );
}

export interface SplitBarProps {
  /** What the whole is ("Where a year's pay goes"). */
  label: string;
  parts: { name: string; series: Series; value: number }[];
  format: (value: number) => string;
  /** A share as it's shown: "62%". */
  formatPercent: (fraction: number) => string;
}

/** The parts of a whole, in one bar, with a key. */
export function SplitBar({ label, parts, format, formatPercent }: SplitBarProps) {
  const track = useChartKeys<HTMLDivElement>();
  const total = parts.reduce((a, p) => a + p.value, 0) || 1;
  return (
    <div className="al-split-bar">
      <div className="al-split-bar__track" role="group" aria-label={label} ref={track}>
        {parts.map((p) => <Mark key={p.name} className="al-split-bar__part" series={p.series} value={`${iso(format(p.value))} · ${iso(formatPercent(p.value / total))}`} what={p.name} style={{ inlineSize: `${(100 * p.value) / total}%` }} />)}
      </div>
      <Key items={parts.map((p) => ({ name: `${p.name} `, series: p.series, after: <b>{iso(formatPercent(p.value / total))}</b> }))} />
    </div>
  );
}

export interface BulletChartProps {
  rows: { name: string; series: Series; value: number }[];
  /** What's wanted, marked on every row. */
  target: { value: number; name: string };
  max: number;
  format: (value: number) => string;
  /** How a row compares with the target: "+£3,075 more", "−£500 short". */
  formatDiff: (diff: number) => string;
}

/** Each row's value against one target. */
export function BulletChart({ rows, target, max, format, formatDiff }: BulletChartProps) {
  const chart = useChartKeys<HTMLDivElement>();
  return (
    <div className="al-bullet" ref={chart}>
      {rows.map((r) => {
        const diff = r.value - target.value;
        return (
          <div key={r.name} className="al-bullet__row">
            <span className="al-bullet__label">{r.name}</span>
            <span className="al-bullet__track">
              <Mark className="al-bullet__bar" series={r.series} value={iso(format(r.value))} what={r.name} style={{ inlineSize: `${(100 * r.value) / max}%` }} />
              <span className="al-bullet__target" style={{ insetInlineStart: `${(100 * target.value) / max}%` }} />
            </span>
            <span className="al-bullet__value"><b>{iso(format(r.value))}</b> <span className={diff >= 0 ? "al-bullet__diff--more" : "al-bullet__diff--less"}>{formatDiff(diff)}</span></span>
          </div>
        );
      })}
      <div className="al-key"><span className="al-key__item"><span className="al-swatch al-swatch--target" />{`${target.name}: ${iso(format(target.value))}`}</span></div>
    </div>
  );
}
