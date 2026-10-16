// A document of the design system's (the README, the guides, the specs) as
// a page of its own: the site header, what's on the page, the document, the
// footer. Rendered on the server by scripts/build-react.mjs, from the
// Markdown; the helpers wire the header in the page.

import { ArabesqueProvider, Footer, Lockup, SiteHeader, TextLink } from "../../react/src/index.js";
import { REPO, onGitHub } from "./repo.js";

export interface DocInput {
  lang: "en" | "ar";
  title: string;
  /** The document, as HTML. */
  html: string;
  /** Its sections (the h2s), for "On this page". */
  toc: { id: string; text: string }[];
  /** From the page to the repository's root: "", "../", "../../". */
  up: string;
  /** The same document in the other language, if it's translated. */
  other?: { href: string; lang: "en" | "ar" };
  /** The document's path, from the root (README.md), for its source link. */
  source: string;
}

const WORDS = {
  en: { product: "Design system", showcase: "Showcase", examples: "Examples", docs: "Using it", onPage: "On this page", source: "View this page on GitHub", legal: "Arabesque Labs Ltd." },
  ar: { product: "نظام التصميم", showcase: "صفحة العرض", examples: "الأمثلة", docs: "دليل الاستخدام", onPage: "في هذه الصفحة", source: "اعرض هذه الصفحة على GitHub", legal: "Arabesque Labs Ltd." },
};

export function DocPage({ d }: { d: DocInput }) {
  const w = WORDS[d.lang];
  const readme = d.lang === "ar" ? `${d.up}ar/README.html` : `${d.up}README.html`;
  return (
    <ArabesqueProvider lang={d.lang} sprite={`${d.up}dist/icons.svg`}>
      <SiteHeader home={`${d.up}index.html`} menuId="site-menu" lockup={<Lockup className="al-site-header__lockup" href={`${d.up}index.html`} product={w.product} />}
        links={[{ label: w.showcase, href: `${d.up}index.html` }, { label: w.examples, href: `${d.up}examples/index.html` }, { label: w.docs, href: readme, current: d.source.endsWith("README.md") && !d.source.includes("/") || d.source === "ar/README.md" }]}
        language={d.other ? { href: d.other.href, lang: d.other.lang } : undefined}
        tools={<TextLink muted external href={REPO}><span lang="en">GitHub</span></TextLink>} />
      <div className="al-page dp-layout">
        {d.toc.length > 1 && (
          <nav className="dp-toc" aria-label={w.onPage}>
            <p className="dp-toc__title">{w.onPage}</p>
            <ul>{d.toc.map((h) => <li key={h.id}><a href={`#${h.id}`}>{h.text}</a></li>)}</ul>
          </nav>
        )}
        <main id="main" tabIndex={-1} className="dp-main">
          <article className="al-prose dp-doc" dangerouslySetInnerHTML={{ __html: d.html }} />
          <p className="dp-source"><TextLink muted external href={onGitHub(d.source)}>{w.source}</TextLink></p>
        </main>
      </div>
      <div className="al-page">
        <Footer lockup={<Lockup name={<span lang="en" dir="ltr">{w.legal}</span>} />} />
      </div>
    </ArabesqueProvider>
  );
}
