// A website's top bar: the lockup, the sections, language and theme; under
// md, the sections, the language link and the tools fold into a menu
// (js/site-header.js).

import { useEffect, useRef, useState, type ReactNode } from "react";
import { initSiteHeaders } from "../../js/site-header.js";
import { currentTheme, setTheme, type Theme } from "../../js/theme.js";
import { Lockup } from "./brand.js";
import { Icon } from "./icon.js";
import { LanguageLink } from "./language.js";
import { SkipLink } from "./layout.js";
import { useArabesque } from "./settings.js";
import { cx, useStableId } from "./util.js";

export interface SiteHeaderLink {
  label: ReactNode;
  href: string;
  current?: boolean;
}

export interface SiteHeaderProps {
  /** Where the lockup goes: the home page. */
  home?: string;
  /** In place of the lockup. */
  lockup?: ReactNode;
  links: SiteHeaderLink[];
  /** The page in the other language: a language link before the theme toggle. */
  language?: { href: string; lang: string; label?: string };
  /** Before the theme toggle: anything else. Folds into the menu under md. */
  tools?: ReactNode;
  /** The page's one action ("Sign up"), as a small button: it stays in the bar at every width. */
  action?: ReactNode;
  /** Stays at the top of the window while the page scrolls. */
  sticky?: boolean;
  /** Its skip link's target, first in the header; false for none (when the page has its own). Default "#main". */
  skipTo?: string | false;
  /** The theme toggle; on by default. */
  themeToggle?: boolean;
  /** The menu's id; one is made if it's not given. */
  menuId?: string;
  className?: string;
}

const LinkList = ({ links }: { links: SiteHeaderLink[] }) => (
  <ul>{links.map((l) => <li key={l.href}><a href={l.href} aria-current={l.current ? "page" : undefined}>{l.label}</a></li>)}</ul>
);

export function SiteHeader({ home = "/", lockup, links, language, tools, action, sticky, skipTo = "#main", themeToggle = true, menuId, className }: SiteHeaderProps) {
  const { labels } = useArabesque();
  const ref = useRef<HTMLElement>(null);
  const menu = useStableId(menuId, "site-menu");
  useEffect(() => { if (ref.current) initSiteHeaders(ref.current.parentNode ?? document); }, []);
  const extras = (language || tools) && <>{language && <LanguageLink {...language} />}{tools}</>;
  return (
    <header ref={ref} className={cx("al-site-header", sticky && "al-site-header--sticky", className)}>
      {skipTo !== false && <SkipLink href={skipTo} />}
      <div className="al-page al-site-header__bar">
        {lockup ?? <Lockup className="al-site-header__lockup" href={home} />}
        <div className="al-site-header__end">
          <nav className="al-site-header__nav" aria-label={labels.sections}><LinkList links={links} /></nav>
          <div className="al-site-header__tools">
            {extras && <div className="al-site-header__extras">{extras}</div>}
            {action && <div className="al-site-header__action">{action}</div>}
            {themeToggle && <ThemeToggle />}
            <button type="button" className="al-button al-button--icon al-button--quiet al-site-header__toggle" data-site-menu-toggle="" aria-controls={menu} aria-expanded="false" aria-label={labels.menu}>
              <Icon name="menu" className="al-site-header__open" /><Icon name="close" className="al-site-header__close" />
            </button>
          </div>
        </div>
      </div>
      <nav className="al-page al-site-header__menu" id={menu} aria-label={labels.sections} hidden>
        <LinkList links={links} />
        {extras && <div className="al-site-header__menu-tools">{extras}</div>}
      </nav>
    </header>
  );
}

/**
 * Light or dark (js/theme.js): named for what it switches to. On a page
 * without React, wire it with the same data-label-* (see templates/home.html).
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { labels } = useArabesque();
  const [theme, setThemeState] = useState<Theme | null>(null);
  useEffect(() => setThemeState(currentTheme()), []);
  const next: Theme = theme === "dark" ? "light" : "dark";
  return (
    <button type="button" className={cx("al-button al-button--icon al-button--quiet", className)} data-theme-toggle="" data-label-dark={labels.switchToDark} data-label-light={labels.switchToLight}
      aria-label={next === "dark" ? labels.switchToDark : labels.switchToLight}
      onClick={() => { setTheme(next); setThemeState(next); }}>
      <Icon name="theme" />
    </button>
  );
}
