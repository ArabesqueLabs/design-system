// The Elements page: every demo on one page, with the system's contents
// beside them, in English (elements/index.html) or Arabic
// (ar/elements/index.html, with Western or Arabic-Indic digits), light or
// dark. Built from the same demos as the example pages, so each is written
// once. Rendered on the server (it reads without JavaScript), then brought to
// life in the browser by client.tsx. The homepage is home.tsx.

import { useMemo, useState } from "react";
import type { Numerals } from "../../js/format.js";
import { ArabesqueProvider, Cluster, Button, useArabesque } from "../../react/src/index.js";
import { formatNumber } from "../../js/format.js";
import { translator } from "./app.js";
import { demos, groups } from "./demos.js";
import { RepoLink, SiteFoot, SiteTop, docPage, pages, type Lang } from "./site.js";

export { chosenNumerals, docPage, type Lang } from "./site.js";

export interface ShowcaseProps {
  lang?: Lang;
  /** From the page to the site's root: "../" for elements/index.html, "../../" for ar/elements/index.html. */
  root?: string;
  /** In Arabic, the digits to start with. */
  numerals?: Numerals;
}

function Count({ t }: { t: (s: string) => string }) {
  const { lang, numerals } = useArabesque();
  return <>{t("{n} elements, each working, in English and Arabic, light and dark.").replace("{n}", formatNumber(demos.length, { lang, numerals }))}</>;
}

export function Showcase({ lang = "en", root = "../", numerals: initialNumerals = "latn" }: ShowcaseProps) {
  const [numerals, setNumerals] = useState<Numerals>(initialNumerals);
  const t = useMemo(() => translator(lang), [lang]);
  const p = pages(lang, root);

  return (
    <ArabesqueProvider lang={lang} numerals={numerals} sprite={`${root}dist/icons.svg`}>
      <SiteTop t={t} lang={lang} root={root} page="elements" numerals={numerals} onNumerals={setNumerals} />

      <main id="main" tabIndex={-1}>
        <div className="al-page al-stack sc-intro">
          <h1 className="sc-intro__title">{t("Elements")}</h1>
          <p className="al-lede"><Count t={t} /></p>
          <Cluster>
            <Button href={p.use}>{t("How to use it")}</Button>
            <RepoLink t={t} />
          </Cluster>
        </div>

        <div className="al-page sc-layout">
          <nav className="sc-toc" aria-label={t("Contents")}>
            <ul>
              {groups.map((g) => (
                <li key={g}>
                  <p className="sc-toc__group">{t(g)}</p>
                  <ul>{demos.filter((d) => d.group === g).map((d) => <li key={d.id}><a href={`#${d.id}`}>{t(d.title)}</a></li>)}</ul>
                </li>
              ))}
            </ul>
          </nav>
          <div className="sc-content">
            {groups.map((g) => (
              // The components start at Actions: #components, as before.
              <section key={g} className="sc-group" id={g === "Actions" ? "components" : slug(g)} aria-labelledby={`group-${slug(g)}`}>
                <h2 id={`group-${slug(g)}`} className="sc-h">{t(g)}</h2>
                {demos.filter((d) => d.group === g).map(({ id, title, lead, spec, Demo }) => (
                  <section key={id} className="sc-component" id={id} aria-labelledby={`${id}-h`}>
                    <h3 id={`${id}-h`}>{t(title)}</h3>
                    <p className="sc-lead">{t(lead)}</p>
                    <div className="sc-example"><Demo t={t} /></div>
                    <p className="sc-spec"><a href={docPage(spec, lang, root)}>{t("Read the spec")}</a> · <a href={`${root}examples/${id}.html`}>{t("On its own page")}</a></p>
                  </section>
                ))}
              </section>
            ))}
          </div>
        </div>
      </main>

      <SiteFoot t={t} lang={lang} root={root} />
    </ArabesqueProvider>
  );
}

const slug = (s: string) => s.toLowerCase().replace(/\W+/g, "-");
