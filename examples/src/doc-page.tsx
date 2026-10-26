// A document of the design system's (the README, the guides, the specs) as
// a page of its own: the site header, what's on the page, the document, the
// footer. Rendered on the server by scripts/build-react.mjs, from the
// Markdown; the helpers wire the header in the page.

import { ArabesqueMark, ArabesqueProvider, BackToTop, Lockup, OnThisPage, SiteHeader, TextLink } from "../../react/src/index.js";
import { REPO, onGitHub } from "./repo.js";
import { SiteFooter } from "./site.js";
import { translator } from "./app.js";

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
  en: { name: "Arabesque", product: "Design system", elements: "Elements", examples: "Examples", docs: "Docs", source: "View this page on GitHub" },
  ar: { name: "آرابيسك", product: "نظام التصميم", elements: "العناصر", examples: "الأمثلة", docs: "التوثيق", source: "اعرض هذه الصفحة على GitHub" },
};

export function DocPage({ d }: { d: DocInput }) {
  const w = WORDS[d.lang];
  const docs = `${d.up}${d.lang === "ar" ? "ar/" : ""}docs/`;
  return (
    <ArabesqueProvider lang={d.lang} sprite={`${d.up}dist/icons.svg`}>
      <SiteHeader sticky home={`${d.up}${d.lang === "ar" ? "ar/" : ""}index.html`} menuId="site-menu" lockup={<Lockup className="al-site-header__lockup" href={`${d.up}${d.lang === "ar" ? "ar/" : ""}index.html`} mark={<ArabesqueMark />} name={<span className="al-wordmark" lang={d.lang}>{w.name}</span>} product={w.product} />}
        links={[{ label: w.elements, href: `${d.up}${d.lang === "ar" ? "ar/" : ""}elements/index.html` }, { label: w.examples, href: `${d.up}examples/index.html` }, { label: w.docs, href: docs }]}
        language={d.other ? { href: d.other.href, lang: d.other.lang } : undefined}
        tools={<TextLink muted external href={REPO}><span lang="en">GitHub</span></TextLink>} />
      <div className="al-page dp-layout">
        {d.toc.length > 1 && <OnThisPage className="dp-toc" links={d.toc.map((h) => ({ href: `#${h.id}`, label: h.text }))} />}
        <main id="main" tabIndex={-1} className="dp-main">
          <article className="al-prose dp-doc" dangerouslySetInnerHTML={{ __html: d.html }} />
          <p className="dp-source"><TextLink muted external href={onGitHub(d.source)}>{w.source}</TextLink></p>
        </main>
      </div>
      <SiteFooter t={translator(d.lang)} lang={d.lang} root={d.up} />
      <BackToTop />
    </ArabesqueProvider>
  );
}
