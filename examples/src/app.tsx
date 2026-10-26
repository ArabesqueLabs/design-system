// An example page (a demo, in English and then in Arabic), and the gallery
// of them all, rendered in the browser by client.tsx.

import AR from "../../showcase-ar.js";
import { ArabesqueMark, ArabesqueProvider, BackToTop, Badge, BackLink, Hero, HeroCaption, Lockup, PhaseBanner, SiteHeader, TextLink } from "../../react/src/index.js";
import { REPO, onGitHub } from "./repo.js";
import { extra } from "./ar.js";
import { demos, groups, type Demo, type T } from "./demos.js";
import { docAddress } from "../../docusaurus/address.mjs";

const SPRITE = "../dist/icons.svg";
const catalogue: Record<string, string> = { ...(AR as Record<string, string>), ...extra };

/** Every sentence given in Arabic so far: the build keeps only these in the bundle's catalogue. */
export const usedArabic = new Set<string>();
/** And every sentence asked for in Arabic that has none (the build fails on any). */
export const missingArabic = new Set<string>();

/** English as written, or its Arabic; a sentence with no Arabic is noted in `missing`. */
export const translator = (lang: "en" | "ar", missing?: Set<string>): T => (s) => {
  if (lang === "en") return s;
  const ar = catalogue[s];
  if (ar === undefined) { missing?.add(s); missingArabic.add(s); } else usedArabic.add(s);
  return ar ?? s;
};

/** The site header, as on the Elements page and the docs; `gallery` on the examples' own index. */
const Top = ({ gallery }: { gallery?: boolean }) => (
  <SiteHeader sticky menuId="site-menu" lockup={<Lockup className="al-site-header__lockup" href="../index.html" mark={<ArabesqueMark />} name={<span className="al-wordmark" lang="en">Arabesque</span>} product="Design system" />}
    links={[{ label: "Elements", href: "../elements/index.html" }, { label: "Examples", href: "index.html", current: gallery }, { label: "Docs", href: "../docs/" }]}
    tools={<TextLink muted external href={REPO}><span lang="en">GitHub</span></TextLink>} />
);

export function ExamplePage({ demo, missing }: { demo: Demo; missing?: Set<string> }) {
  const { Demo: Shown } = demo;
  return (
    <ArabesqueProvider sprite={SPRITE}>
      <Top />
      <main id="main" tabIndex={-1} className="al-page ex-main">
        <BackLink href="index.html">All components</BackLink>
        <h1 className="ex-title">{demo.title}</h1>
        <p className="al-lede">{demo.lead}</p>
        <p className="ex-spec"><a href={`..${docAddress(demo.spec)}`}>Read the spec</a> · <a href={`../elements/index.html#${demo.id}`}>On the Elements page</a> · <TextLink external href={onGitHub("examples/src/demos.tsx")}>The demo&apos;s source</TextLink></p>
        <section className="ex-example" aria-labelledby="en-h">
          <h2 className="ex-h" id="en-h">English</h2>
          <Shown t={translator("en")} />
        </section>
        <section className="ex-example" lang="ar" dir="rtl" aria-labelledby="ar-h">
          <h2 className="ex-h" id="ar-h">العربية، من اليمين إلى اليسار</h2>
          <ArabesqueProvider lang="ar" sprite={SPRITE}>
            <Shown t={translator("ar", missing)} />
          </ArabesqueProvider>
        </section>
      </main>
      <BackToTop />
    </ArabesqueProvider>
  );
}

/**
 * The demo alone, in one language, for the documents' site to show beside
 * its spec (examples/<id>.html?embed&lang=ar&theme=dark, in an iframe:
 * docusaurus/src/components/Demo).
 */
export function ExampleEmbed({ demo, lang }: { demo: Demo; lang: "en" | "ar" }) {
  const { Demo: Shown } = demo;
  return (
    <ArabesqueProvider lang={lang} sprite={SPRITE}>
      <main className="ex-embed">
        <Shown t={translator(lang)} />
      </main>
    </ArabesqueProvider>
  );
}

export function Gallery() {
  return (
    <ArabesqueProvider sprite={SPRITE}>
      <Top gallery />
      <Hero className="ex-cover">
        <div className="al-page ex-cover__body">
          <h1 className="al-display ex-cover__title">Every component, working.</h1>
          <p className="al-lede ex-cover__lede">Each page runs the React components (<code>react/</code>) in English and in Arabic, right to left, in light and dark. They write the same markup as the CSS and the Elements page.</p>
          <HeroCaption />
        </div>
      </Hero>
      <main id="main" tabIndex={-1} className="al-page ex-main">
        <PhaseBanner phase={<Badge tone="warning">Experimental</Badge>}>The React components are new in 0.4. <a href="../docs/react/">How to use them</a>.</PhaseBanner>
        <section className="ex-group" aria-labelledby="pages-h">
          <h2 className="ex-group__h" id="pages-h">Pages</h2>
          <ul className="ex-group__list" role="list">
            <li><a href="../templates/home.html">The studio homepage</a> <span className="al-muted">rendered from <code>templates/react/home.tsx</code>; <a href="../templates/ar/home.html" lang="ar" hrefLang="ar">بالعربية</a></span></li>
            <li><a href="../index.html">The homepage</a> <span className="al-muted">what Arabesque is for, and a few elements working together; <a href="../ar/index.html" lang="ar" hrefLang="ar">بالعربية</a></span></li>
            <li><a href="../elements/index.html">The elements</a> <span className="al-muted">every component on one page, in plain HTML; <a href="../ar/elements/index.html" lang="ar" hrefLang="ar">بالعربية</a></span></li>
          </ul>
        </section>
        {groups.map((g) => (
          <section key={g} className="ex-group" aria-labelledby={`${g}-h`.replace(/\W/g, "-")}>
            <h2 className="ex-group__h" id={`${g}-h`.replace(/\W/g, "-")}>{g}</h2>
            <ul className="ex-group__list" role="list">
              {demos.filter((x) => x.group === g).map((x) => <li key={x.id}><a href={`${x.id}.html`}>{x.title}</a> <span className="al-muted">{x.lead}</span></li>)}
            </ul>
          </section>
        ))}
      </main>
      <BackToTop />
    </ArabesqueProvider>
  );
}
