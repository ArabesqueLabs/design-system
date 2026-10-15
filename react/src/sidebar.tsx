// The app's sections in a column, collapsible to icons; a scrolling bar
// along the top under md.

import { useState, type ReactNode } from "react";
import { Icon, type IconName } from "./icon.js";
import { useArabesque } from "./settings.js";
import { cx } from "./util.js";

export interface SidebarLink {
  label: string;
  href: string;
  icon: IconName;
  current?: boolean;
}

export interface ShellProps {
  /** The sections' name ("Sections"). */
  label?: string;
  links: SidebarLink[];
  /** At the foot, above Collapse: Settings, say. */
  footLinks?: SidebarLink[];
  /** Starts collapsed to icons. */
  defaultCollapsed?: boolean;
  /** Told when it's collapsed or expanded, to remember it. */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** The page's content, beside the sidebar. */
  children?: ReactNode;
  className?: string;
}

/** The app shell: the sidebar, and the page beside it. */
export function Shell({ label, links, footLinks = [], defaultCollapsed = false, onCollapsedChange, children, className }: ShellProps) {
  const { labels } = useArabesque();
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  // Collapsed, the name shows as a tooltip; it's still the link's name.
  const link = (l: SidebarLink) => (
    <a key={l.href + l.label} className="al-sidebar__link" href={l.href} aria-current={l.current ? "page" : undefined} title={collapsed ? l.label : undefined}>
      <Icon name={l.icon} /><span className="al-sidebar__label">{l.label}</span>
    </a>
  );
  const toggle = () => { setCollapsed(!collapsed); onCollapsedChange?.(!collapsed); };
  return (
    <div className={cx("al-shell", className)} data-sidebar={collapsed ? "collapsed" : ""}>
      <aside className="al-sidebar">
        <nav className="al-sidebar__nav" aria-label={label ?? labels.sections}>
          {links.map(link)}
        </nav>
        <div className="al-sidebar__foot">
          {footLinks.map(link)}
          <button type="button" className="al-sidebar__link al-sidebar__collapse" aria-expanded={!collapsed} onClick={toggle}>
            <Icon name="sidebar" /><span className="al-sidebar__label">{collapsed ? labels.expandSidebar : labels.collapseSidebar}</span>
          </button>
        </div>
      </aside>
      {children}
    </div>
  );
}
