// On the server (scripts/build-react.mjs): the homepage template, as HTML;
// and every example page, to find any sentence with no Arabic (the pages
// themselves render in the browser).

import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { ArabesqueProvider } from "../../react/src/index.js";
import { copy, Home } from "../../templates/react/home.js";
import { ExamplePage, Gallery, missingArabic, usedArabic } from "./app.js";
import { Showcase } from "./showcase.js";
import { DocPage, type DocInput } from "./doc-page.js";
import { demos } from "./demos.js";

export { REPO } from "./repo.js";

export interface Page { file: string; title: string; lang: string; body: string; example?: string; description?: string }

/** A document's page: everything inside <body>. */
export const renderDoc = (d: DocInput): string => renderToStaticMarkup(<DocPage d={d} />);

export function render(): { pages: Page[]; templates: Page[]; showcase: { en: string; ar: string }; missing: string[]; used: string[] } {
  const missing = new Set<string>();
  const pages: Page[] = [
    { file: "examples/index.html", title: "Examples · Arabesque", lang: "en", example: "index", body: renderToString(<Gallery />) },
    ...demos.map((d) => ({ file: `examples/${d.id}.html`, title: `${d.title} · Arabesque`, lang: "en", example: d.id, description: d.lead, body: renderToString(<ExamplePage demo={d} missing={missing} />) })),
  ];
  // The templates are static: no React in the page, the helpers wire it.
  const templates: Page[] = (["en", "ar"] as const).map((lang) => ({
    file: lang === "en" ? "templates/home.html" : "templates/ar/home.html",
    title: copy[lang].title,
    description: copy[lang].description,
    lang,
    body: renderToStaticMarkup(<ArabesqueProvider lang={lang} sprite={lang === "en" ? "../dist/icons.svg" : "../../dist/icons.svg"}><Home c={copy[lang]} /></ArabesqueProvider>),
  }));
  // The showcase, in English (index.html) and in Arabic (ar/index.html).
  const showcase = { en: renderToString(<Showcase />), ar: renderToString(<Showcase lang="ar" root="../" />) };
  for (const s of missingArabic) missing.add(s);
  return { pages, templates, showcase, missing: [...missing].sort(), used: [...usedArabic].sort() };
}
