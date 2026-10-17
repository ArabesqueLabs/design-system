// On this page: the page's sections, the one being read marked (js/toc.js).

import { useEffect, useRef, type ReactNode } from "react";
import { initToc } from "../../js/toc.js";
import { useArabesque } from "./settings.js";
import { cx } from "./util.js";

export interface OnThisPageProps {
  /** Each section: "#its-heading-id" and its heading's words. */
  links: { href: string; label: ReactNode }[];
  /** Its title; "On this page" by default. */
  title?: ReactNode;
  className?: string;
}

export function OnThisPage({ links, title, className }: OnThisPageProps) {
  const { labels } = useArabesque();
  const ref = useRef<HTMLElement>(null);
  useEffect(() => { if (ref.current) initToc(ref.current.parentNode ?? document); }, []);
  return (
    <nav ref={ref} className={cx("al-toc", className)} aria-label={labels.onThisPage}>
      <p className="al-toc__title" aria-hidden="true">{title ?? labels.onThisPage}</p>
      <ul>{links.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}</ul>
    </nav>
  );
}
