// What the site's own pages share: the homepage (index.html, ar/index.html)
// and the Elements page (elements/, ar/elements/). Its header, with the
// digits to choose in Arabic; its footer; where each page is from another;
// and the repository's link.

import type { ReactNode } from "react";
import type { Numerals } from "../../js/format.js";
import { ArabesqueMark, BackToTop, Button, Lockup, SegmentedButtons, SiteHeader, useArabesque, useTooltips } from "../../react/src/index.js";
import { REPO, onGitHub } from "./repo.js";
import { docAddress } from "../../docusaurus/address.mjs";

export type Lang = "en" | "ar";
export type T = (s: string) => string;

const NUMERALS = "al-showcase-numerals";

/** The digits the person chose last time, in Arabic, if they chose. */
export function chosenNumerals(): Numerals {
  try {
    return localStorage.getItem(NUMERALS) === "arab" ? "arab" : "latn";
  } catch {
    return "latn";
  }
}

const remember = (v: Numerals) => { try { localStorage.setItem(NUMERALS, v); } catch { /* private mode: not remembered */ } };

/**
 * A document's page, in the language when it's translated (component specs
 * and the README are): docs/ in the Docusaurus site's (/docs/, /ar/docs/),
 * the others beside them (README.html).
 */
export function docPage(md: string, lang: Lang, from = ""): string {
  const ar = lang === "ar";
  if (md.startsWith("docs/")) return `${from}${docAddress(ar && /^docs\/components\/[^/]+$/.test(md) ? md.replace("docs/components/", "docs/components/ar/") : md).slice(1)}`;
  if (ar && md === "README.md") return `${from}ar/README.html`;
  return `${from}${md.replace(/\.md$/, ".html")}`;
}

/** The site's pages, from a page `root` away from the site's root ("", "../", "../../"). */
export const pages = (lang: Lang, root: string) => {
  const ar = lang === "ar" ? "ar/" : "";
  return {
    home: `${root}${ar}index.html`,
    elements: `${root}${ar}elements/index.html`,
    examples: `${root}examples/index.html`,
    readme: docPage("README.md", lang, root),
    docs: `${root}${ar}docs/`,
    use: lang === "ar" ? `${root}ar/README.html#استخدامه-في-مشروع` : `${root}README.html#use-it-in-a-project`,
  };
};

/**
 * The repository, as an icon button: GitHub's mark, drawn here (the
 * system's icons are line icons, and have no brands), opening in a new tab,
 * and saying so.
 */
export function RepoLink({ t }: { t: T }) {
  const { labels } = useArabesque();
  useTooltips();
  return (
    <Button href={REPO} target="_blank" rel="noopener" className="al-button--icon sc-repo" aria-label={`${t("Source on GitHub")} ${labels.newTab}`} data-al-tip={t("Source on GitHub")}>
      <svg className="al-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path fill="currentColor" stroke="none" d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" />
      </svg>
    </Button>
  );
}

export interface SiteTopProps {
  t: T;
  lang: Lang;
  root: string;
  /** Which of the site's pages this is. */
  page: "home" | "elements";
  numerals: Numerals;
  onNumerals: (n: Numerals) => void;
}

/** The site's header, sticky: the lockup home, the sections, the other language, and in Arabic the digits. */
export function SiteTop({ t, lang, root, page, numerals, onNumerals }: SiteTopProps) {
  const p = pages(lang, root);
  const other = pages(lang === "ar" ? "en" : "ar", root);
  return (
    <SiteHeader sticky className="sc-top" menuId="site-menu"
      lockup={<Lockup className="al-site-header__lockup" href={page === "home" ? "#main" : p.home} mark={<ArabesqueMark />} name={<span className="al-wordmark" lang={lang}>{t("Arabesque")}</span>} product={t("Design system")} />}
      links={[{ label: t("Elements"), href: p.elements, current: page === "elements" }, { label: t("Examples"), href: p.examples }, { label: t("Docs"), href: p.docs }]}
      language={{ href: other[page], lang: lang === "ar" ? "en" : "ar" }}
      tools={lang === "ar" ? (
        <SegmentedButtons label={t("Numerals")} value={numerals} onChange={(v) => { onNumerals(v); remember(v); }}
          options={[{ value: "latn", label: <bdi>123</bdi> }, { value: "arab", label: <bdi>١٢٣</bdi>, ariaLabel: t("Arabic-Indic numerals") }]} />
      ) : undefined} />
  );
}

/**
 * "A product of Arabesque Labs": the attribution badge with the star
 * (dist/brand/badges/), as hunt's footer has it: its dark pill on the light
 * theme, its light one on the dark, swapped by the CSS (.sc-attribution).
 */
export function ProductBadge({ lang, root }: { lang: Lang; root: string }) {
  const { labels } = useArabesque();
  const ar = lang === "ar";
  const alt = ar ? "من منتجات معامل آرابيسك" : "A product of Arabesque Labs";
  const [w, h] = ar ? [247, 37] : [253, 35];
  const img = (pill: "dark" | "light", on: "light" | "dark") => (
    <img className={`sc-attribution__on-${on}`} src={`${root}dist/brand/badges/product-of-${lang}-${pill}-star@2x.png`} width={w} height={h} alt={alt} />
  );
  // The company's own site: in a new tab, saying so.
  return <a className="sc-attribution" href={ar ? "https://arabesquelabs.com/ar/" : "https://arabesquelabs.com"} target="_blank" rel="noopener">{img("dark", "light")}{img("light", "dark")}<span className="al-visually-hidden"> {labels.newTab}</span></a>;
}

/** A link to another site, in a new tab, saying so. */
function Out({ href, children, ...rest }: { href: string; children: ReactNode; lang?: string; dir?: string }) {
  const { labels } = useArabesque();
  return <a href={href} target="_blank" rel="noopener" {...rest}>{children}<span className="al-visually-hidden"> {labels.newTab}</span></a>;
}

/**
 * The site's footer, as hunt's (careerhunt.app): what Arabesque is, with
 * the attribution badge, beside three columns of links; then who made it,
 * and its licences: MIT for the code, and the marks not licensed
 * (NOTICE.md). The same on the homepage, the Elements page and the
 * documents' pages.
 */
export function SiteFooter({ t, lang, root }: { t: T; lang: Lang; root: string }) {
  const p = pages(lang, root);
  const ar = lang === "ar";
  const columns: [string, [ReactNode, string][]][] = [
    ["Arabesque", [[t("Elements"), p.elements], [t("Examples"), p.examples], [t("Templates"), `${root}templates/README.html`], [t("Changelog"), docPage("CHANGELOG.md", lang, root)]]],
    ["Guides", [[t("Docs"), p.docs], [t("Principles"), docPage("docs/principles.md", lang, root)], [t("Interaction"), docPage("docs/interaction.md", lang, root)], [t("Patterns"), docPage("docs/patterns.md", lang, root)],
      [t("Accessibility"), docPage("docs/accessibility.md", lang, root)], [t("Right to left"), docPage("docs/rtl.md", lang, root)], [t("React"), docPage("docs/react.md", lang, root)]]],
    ["Project", [[<span key="g" lang="en">GitHub</span>, REPO], [t("Report a problem"), `${REPO}/issues`], [t("Licences"), onGitHub("NOTICE.md")], [t("Contact"), "mailto:hello@arabesquelabs.com"]]],
  ];
  return (
    <div className="al-page">
      <footer className="al-footer sc-foot">
        <div className="sc-foot__about">
          <a className="sc-foot__brand" href={p.home}><ArabesqueMark /><span className="al-wordmark" lang={lang}>{t("Arabesque")}</span></a>
          <p className="sc-foot__blurb">{t("The Arabesque Labs design system: accessible, written for right to left and left to right alike, and built for the fewest steps.")}</p>
          <ProductBadge lang={lang} root={root} />
        </div>
        <nav className="sc-foot__cols" aria-label={t("More about Arabesque")}>
          {columns.map(([heading, links]) => (
            <div key={heading}>
              <h2>{t(heading)}</h2>
              <ul className="al-footer__links">{links.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ul>
            </div>
          ))}
        </nav>
        <div className="al-footer__legal">
          <p>{t("Made with ♥ by")} <Out href="https://mosab.co.uk">{t("Mosab")}</Out> {t("at")} <Out href={ar ? "https://arabesquelabs.com/ar/" : "https://arabesquelabs.com"}>{t("Arabesque Labs")}</Out> | © <bdi>2026</bdi></p>
          <p>{t("Open source, under the")} <Out href={onGitHub("LICENSE")} lang="en" dir="ltr">MIT</Out>{t(" licence.")} {t("The Arabesque and Arabesque Labs logos and marks aren't: they're the property of Arabesque Labs Ltd., all rights reserved.")} <a href={onGitHub("NOTICE.md")}>{t("What each licence covers")}</a></p>
        </div>
      </footer>
    </div>
  );
}

/** The site's footer, and back to top. */
export function SiteFoot({ t, lang, root, children }: { t: T; lang: Lang; root: string; children?: ReactNode }) {
  return (
    <>
      {children}
      <SiteFooter t={t} lang={lang} root={root} />
      <BackToTop />
    </>
  );
}
