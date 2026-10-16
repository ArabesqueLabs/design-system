// The showcase (index.html): every demo on one page, with the system's
// contents beside them, in English or Arabic (Western or Arabic-Indic
// digits), light or dark. Built from the same demos as the example pages, so
// each is written once. Rendered on the server in English (it reads without
// JavaScript), then brought to life in the browser by client.tsx.

import { useEffect, useMemo, useState } from "react";
import type { Numerals } from "../../js/format.js";
import {
  ArabesqueProvider, Badge, Button, Cluster, Footer, Hero, HeroCaption, Highlight, Lockup, PhaseBanner, SegmentedButtons, SkipLink, ThemeToggle,
} from "../../react/src/index.js";
import { translator } from "./app.js";
import { demos, groups } from "./demos.js";

export type Lang = "en" | "ar";

const KEYS = { lang: "al-showcase-lang", numerals: "al-showcase-numerals" };
const store = (key: string, value: string) => { try { localStorage.setItem(key, value); } catch { /* private mode: not remembered */ } };

/** What the person chose last time, if they chose. */
export function chosen(): { lang: Lang; numerals: Numerals } {
  try {
    return { lang: localStorage.getItem(KEYS.lang) === "ar" ? "ar" : "en", numerals: localStorage.getItem(KEYS.numerals) === "arab" ? "arab" : "latn" };
  } catch {
    return { lang: "en", numerals: "latn" };
  }
}

/** A document's page, in the language when it's translated (component specs and the README are). */
export function docPage(md: string, lang: Lang, from = ""): string {
  const html = md.replace(/\.md$/, ".html");
  if (lang !== "ar") return `${from}${html}`;
  if (md === "README.md") return `${from}ar/README.html`;
  return /^docs\/components\/[^/]+$/.test(md) ? `${from}${html.replace("docs/components/", "docs/components/ar/")}` : `${from}${html}`;
}

export function Showcase({ initial = { lang: "en", numerals: "latn" } }: { initial?: { lang: Lang; numerals: Numerals } }) {
  const [lang, setLang] = useState<Lang>(initial.lang);
  const [numerals, setNumerals] = useState<Numerals>(initial.numerals);
  const t = useMemo(() => translator(lang), [lang]);

  // The page follows: its language and direction, and its title.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = t("Arabesque Labs design system");
  }, [lang, t]);

  return (
    <ArabesqueProvider lang={lang} numerals={numerals} sprite="dist/icons.svg">
      <SkipLink />
      <header className="sc-top">
        <div className="al-page sc-top__inner">
          <Lockup href="#main" product={t("Design system")} />
          <Cluster className="sc-top__controls">
            {lang === "ar" && (
              <SegmentedButtons label={t("Numerals")} value={numerals} onChange={(v) => { setNumerals(v); store(KEYS.numerals, v); }}
                options={[{ value: "latn", label: <bdi>123</bdi> }, { value: "arab", label: <bdi>١٢٣</bdi>, ariaLabel: t("Arabic-Indic numerals") }]} />
            )}
            <SegmentedButtons label={t("Language")} value={lang} onChange={(v) => { setLang(v); store(KEYS.lang, v); }}
              options={[{ value: "en", label: "English", lang: "en" }, { value: "ar", label: "العربية", lang: "ar" }]} />
            <ThemeToggle />
          </Cluster>
        </div>
        <div className="al-page">
          <PhaseBanner phase={<Badge tone="warning">{t("Experimental")}</Badge>}>
            {t("This design system is new, and is actively being evolved.")} <a href={docPage("CHANGELOG.md", lang)}>{t("Check the changelog")}</a>.
          </PhaseBanner>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <Hero className="sc-hero">
          <div className="al-page al-stack">
            <h1 className="al-display sc-hero__title">{t("One tile, a whole system.")}</h1>
            <p className="al-lede">
              {t("The tokens, components and patterns every Arabesque Labs product is built from:")} <Highlight tint="teal">{t("accessible")}</Highlight> {t("to WCAG 2.2 AA, written for")} <Highlight tint="yellow">{t("left-to-right and right-to-left")}</Highlight> {t("alike, and designed so people get things done in")} <Highlight tint="pink">{t("the fewest steps")}</Highlight>{t(", seeing every consequence.")}
            </p>
            <Cluster>
              <Button variant="primary" href="#components">{t("See the components")}</Button>
              <Button href={lang === "ar" ? "ar/README.html#استخدامه-في-مشروع" : "README.html#use-it-in-a-project"}>{t("How to use it")}</Button>
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
                    <p className="sc-spec"><a href={docPage(spec, lang)}>{t("Read the spec")}</a> · <a href={`examples/${id}.html`}>{t("On its own page")}</a></p>
                  </section>
                ))}
              </section>
            ))}
          </div>
        </div>
      </main>

      <div className="al-page">
        <Footer links={[
          { label: t("Principles"), href: docPage("docs/principles.md", lang) },
          { label: t("Interaction"), href: docPage("docs/interaction.md", lang) },
          { label: t("Patterns"), href: docPage("docs/patterns.md", lang) },
          { label: t("Accessibility"), href: docPage("docs/accessibility.md", lang) },
          { label: t("Right to left"), href: docPage("docs/rtl.md", lang) },
          { label: t("React"), href: docPage("docs/react.md", lang) },
        ]} legal={t("© 2026 Arabesque Labs Ltd. Structure. Clarity. Craftsmanship.")} />
      </div>
    </ArabesqueProvider>
  );
}

const slug = (s: string) => s.toLowerCase().replace(/\W+/g, "-");
