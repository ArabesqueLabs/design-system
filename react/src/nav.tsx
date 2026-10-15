// Tabs between views of one thing (js/tabs.js), and section navigation
// between pages. They look the same, and differ in markup.

import { useEffect, useRef, type ReactNode } from "react";
import { initTabs } from "../../js/tabs.js";
import { useStableId } from "./util.js";

export interface TabItem {
  id: string;
  label: ReactNode;
  /** A count beside the label. */
  count?: ReactNode;
  content: ReactNode;
}

export interface TabsProps {
  /** What the tabs are views of ("Take-home pay"). */
  label: string;
  tabs: TabItem[];
  /** The tab shown first; the first by default. */
  defaultTab?: string;
  id?: string;
  className?: string;
}

/** Tabs (ARIA APG, automatic activation): arrow keys along the reading direction, Home, End. */
export function Tabs({ label, tabs, defaultTab, id, className }: TabsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const base = useStableId(id, "tabs");
  const first = defaultTab ?? tabs[0]?.id;
  useEffect(() => { if (ref.current) initTabs(ref.current); }, []);
  return (
    <div ref={ref} className={className}>
      <div className="al-tabs" role="tablist" aria-label={label}>
        {tabs.map((t) => (
          <button key={t.id} type="button" className="al-tab" role="tab" id={`${base}-${t.id}-tab`} aria-controls={`${base}-${t.id}`} aria-selected={t.id === first} tabIndex={t.id === first ? 0 : -1}>
            {t.label}{t.count != null && <> <span className="al-tab__count">{t.count}</span></>}
          </button>
        ))}
      </div>
      {tabs.map((t) => (
        <div key={t.id} className="al-tabpanel" role="tabpanel" id={`${base}-${t.id}`} aria-labelledby={`${base}-${t.id}-tab`} hidden={t.id !== first} tabIndex={0}>{t.content}</div>
      ))}
    </div>
  );
}

export interface NavLink {
  label: ReactNode;
  href: string;
  /** The page this is. */
  current?: boolean;
  count?: ReactNode;
}

/** Links between pages, looking like tabs: the current one is aria-current="page". */
export function SectionNav({ label, links, className }: { label: string; links: NavLink[]; className?: string }) {
  return (
    <nav aria-label={label} className={className}>
      <div className="al-tabs">
        {links.map((l) => (
          <a key={l.href} className="al-tab" href={l.href} aria-current={l.current ? "page" : undefined}>
            {l.label}{l.count != null && <> <span className="al-tab__count">{l.count}</span></>}
          </a>
        ))}
      </div>
    </nav>
  );
}
