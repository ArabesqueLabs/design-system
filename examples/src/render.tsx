// On the server (scripts/build-react.mjs): the homepage template, as HTML;
// and every example page, to find any sentence with no Arabic (the pages
// themselves render in the browser).

import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { ArabesqueProvider } from "../../react/src/index.js";
import { copy, Home } from "../../templates/react/home.js";
import { ExamplePage, Gallery } from "./app.js";
import { demos } from "./demos.js";

export interface Page { file: string; title: string; lang: string; body: string; example?: string; description?: string }

export function render(): { pages: Page[]; templates: Page[]; missing: string[] } {
  const missing = new Set<string>();
  const pages: Page[] = [
    { file: "examples/index.html", title: "Examples · Arabesque Labs design system", lang: "en", example: "index", body: renderToString(<Gallery />) },
    ...demos.map((d) => ({ file: `examples/${d.id}.html`, title: `${d.title} · Arabesque Labs design system`, lang: "en", example: d.id, description: d.lead, body: renderToString(<ExamplePage demo={d} missing={missing} />) })),
  ];
  // The templates are static: no React in the page, the helpers wire it.
  const templates: Page[] = (["en", "ar"] as const).map((lang) => ({
    file: lang === "en" ? "templates/home.html" : "templates/ar/home.html",
    title: copy[lang].title,
    description: copy[lang].description,
    lang,
    body: renderToStaticMarkup(<ArabesqueProvider lang={lang} sprite={lang === "en" ? "../dist/icons.svg" : "../../dist/icons.svg"}><Home c={copy[lang]} /></ArabesqueProvider>),
  }));
  return { pages, templates, missing: [...missing].sort() };
}
