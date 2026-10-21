// The showcase: every demo on one page, with the system's contents beside
// them, in English (index.html) or Arabic (ar/index.html, with Western or
// Arabic-Indic digits), light or dark. Built from the same demos as the
// example pages, so each is written once. Rendered on the server (it reads
// without JavaScript), then brought to life in the browser by client.tsx.

import { useMemo, useState } from "react";
import type { Numerals } from "../../js/format.js";
import {
  ArabesqueMark, ArabesqueProvider, BackToTop, Badge, Button, Cluster, Footer, Hero, HeroCaption, Lockup, PhaseBanner, SegmentedButtons, SiteHeader, TextLink, useArabesque, useTooltips,
} from "../../react/src/index.js";
import { RELEASE, REPO } from "./repo.js";
import { translator } from "./app.js";
import { demos, groups } from "./demos.js";

export type Lang = "en" | "ar";

const NUMERALS = "al-showcase-numerals";

/** The digits the person chose last time, in Arabic, if they chose. */
export function chosenNumerals(): Numerals {
  try {
    return localStorage.getItem(NUMERALS) === "arab" ? "arab" : "latn";
  } catch {
    return "latn";
  }
}

/** A document's page, in the language when it's translated (component specs and the README are). */
export function docPage(md: string, lang: Lang, from = ""): string {
  const html = md.replace(/\.md$/, ".html");
  if (lang !== "ar") return `${from}${html}`;
  if (md === "README.md") return `${from}ar/README.html`;
  return /^docs\/components\/[^/]+$/.test(md) ? `${from}${html.replace("docs/components/", "docs/components/ar/")}` : `${from}${html}`;
}

/**
 * The repository, as an icon button beside the hero's actions: GitHub's
 * mark, drawn here (the system's icons are line icons, and have no brands),
 * opening in a new tab, and saying so.
 */
function RepoLink({ t }: { t: (s: string) => string }) {
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

export interface ShowcaseProps {
  lang?: Lang;
  /** From the page to the site's root: "" for index.html, "../" for ar/index.html. */
  root?: string;
  /** In Arabic, the digits to start with. */
  numerals?: Numerals;
}

export function Showcase({ lang = "en", root = "", numerals: initialNumerals = "latn" }: ShowcaseProps) {
  const [numerals, setNumerals] = useState<Numerals>(initialNumerals);
  const t = useMemo(() => translator(lang), [lang]);
  const changelog = docPage("CHANGELOG.md", lang, root);

  return (
    <ArabesqueProvider lang={lang} numerals={numerals} sprite={`${root}dist/icons.svg`}>
      <SiteHeader sticky className="sc-top" menuId="site-menu" lockup={<Lockup className="al-site-header__lockup" href="#main" mark={<ArabesqueMark />} name={<span className="al-wordmark" lang={lang}>{t("Arabesque")}</span>} product={t("Design system")} />}
        links={[{ label: t("Showcase"), href: "index.html", current: true }, { label: t("Examples"), href: `${root}examples/index.html` }, { label: t("Using it"), href: docPage("README.md", lang, root) }]}
        language={lang === "ar" ? { href: "../index.html", lang: "en" } : { href: "ar/index.html", lang: "ar" }}
        tools={lang === "ar" ? (
          <SegmentedButtons label={t("Numerals")} value={numerals} onChange={(v) => { setNumerals(v); try { localStorage.setItem(NUMERALS, v); } catch { /* private mode: not remembered */ } }}
            options={[{ value: "latn", label: <bdi>123</bdi> }, { value: "arab", label: <bdi>١٢٣</bdi>, ariaLabel: t("Arabic-Indic numerals") }]} />
        ) : undefined} />
      <div className="al-page">
        <PhaseBanner phase={<Badge tone="warning">{t("Experimental")}</Badge>}>
          {t("Arabesque is new, and is actively being evolved.")} {t("This is version")} <a href={`${changelog}#${RELEASE.changelog}`}><bdi dir="ltr">{RELEASE.version}</bdi></a>. <a href={changelog}>{t("Check the changelog")}</a>.
        </PhaseBanner>
      </div>

      <main id="main" tabIndex={-1}>
        <Hero className="sc-hero">
          <div className="al-page al-stack">
            <h1 className="al-display sc-hero__title">{t("Arabesque")}</h1>
            <p className="al-lede">
              {t("A design system built by")} <TextLink href="https://arabesquelabs.com/">{t("Arabesque Labs")}</TextLink> {t("to set the standard for every product we make. Written for left-to-right and right-to-left alike, and designed so people get things done in the fewest steps, seeing every consequence.")}
            </p>
            <Cluster>
              <Button variant="primary" href="#components">{t("See the components")}</Button>
              <Button href={lang === "ar" ? `${root}ar/README.html#استخدامه-في-مشروع` : `${root}README.html#use-it-in-a-project`}>{t("How to use it")}</Button>
              <RepoLink t={t} />
            </Cluster>
            <HeroCaption />
          </div>
        </Hero>

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

      <div className="al-page">
        <Footer links={[
          { label: t("Principles"), href: docPage("docs/principles.md", lang, root) },
          { label: t("Interaction"), href: docPage("docs/interaction.md", lang, root) },
          { label: t("Patterns"), href: docPage("docs/patterns.md", lang, root) },
          { label: t("Accessibility"), href: docPage("docs/accessibility.md", lang, root) },
          { label: t("Right to left"), href: docPage("docs/rtl.md", lang, root) },
          { label: t("React"), href: docPage("docs/react.md", lang, root) },
          { label: t("Source on GitHub"), href: REPO },
        ]} legal={t("© 2026 Arabesque Labs Ltd. Structure. Clarity. Craftsmanship.")} />
      </div>
      <BackToTop />
    </ArabesqueProvider>
  );
}

const slug = (s: string) => s.toLowerCase().replace(/\W+/g, "-");
