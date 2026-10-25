// The pages of a long list, as links: Previous and Next in words, the
// numbers around the current page, the gaps an ellipsis.

import type { MouseEvent } from "react";
import { formatNumber } from "../../js/format.js";
import { Icon } from "./icon.js";
import { fill, useArabesque } from "./settings.js";
import { cx } from "./util.js";

export interface PaginationProps {
  /** The current page, from 1. */
  page: number;
  /** How many pages there are. */
  pages: number;
  /** A page's address. */
  href: (page: number) => string;
  /** Called when a page is followed, for a list that changes in place; call preventDefault() on the event to stay. */
  onNavigate?: (page: number, event: MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

/** Which pages to show, seven at most: the first, the last, and the current one with one each side; a gap is null. */
export function pageRange(page: number, pages: number): (number | null)[] {
  const run = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i);
  if (pages <= 7) return run(1, pages);
  if (page <= 4) return [...run(1, 5), null, pages];
  if (page >= pages - 3) return [1, null, ...run(pages - 4, pages)];
  return [1, null, page - 1, page, page + 1, null, pages];
}

export function Pagination({ page, pages, href, onNavigate, className }: PaginationProps) {
  const { labels, lang, numerals } = useArabesque();
  if (pages < 2) return null;
  const n = (v: number) => formatNumber(v, { lang, numerals });
  const go = (p: number) => onNavigate && ((e: MouseEvent<HTMLAnchorElement>) => onNavigate(p, e));
  return (
    <nav className={cx("al-pagination", className)} aria-label={labels.pagination}>
      <ul>
        {page > 1 && <li><a className="al-pagination__prev" href={href(page - 1)} rel="prev" onClick={go(page - 1)}><Icon name="chevron" size="sm" />{labels.previousPage}</a></li>}
        {pageRange(page, pages).map((p, i) => (
          <li key={p ?? `gap-${i}`}>
            {p === null ? <span className="al-pagination__gap" aria-hidden="true">…</span>
              : <a href={href(p)} aria-label={fill(labels.page, { n: n(p) })} aria-current={p === page ? "page" : undefined} onClick={go(p)}>{n(p)}</a>}
          </li>
        ))}
        {page < pages && <li><a className="al-pagination__next" href={href(page + 1)} rel="next" onClick={go(page + 1)}>{labels.nextPage}<Icon name="chevron" size="sm" /></a></li>}
      </ul>
    </nav>
  );
}
