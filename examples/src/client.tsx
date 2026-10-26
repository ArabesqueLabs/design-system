// In the browser: the page, from its data-example. The example pages aren't
// prerendered (the numbers in Arabic come from Intl, which differs between
// Node versions, and the build must give the same files wherever it runs);
// the showcase is, in its page's language, so it reads without JavaScript,
// and is rendered again here, in Arabic in the digits the person chose.

import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { ExampleEmbed, ExamplePage, Gallery } from "./app.js";
import { demos } from "./demos.js";
import { Showcase, chosenNumerals } from "./showcase.js";
import { Homepage } from "./home.js";

/** For the page check (scripts/check-page.mjs): React has rendered and run its effects. Renders nothing. */
function Ready() {
  useEffect(() => { document.documentElement.dataset.ready = "yes"; }, []);
  return null;
}

/**
 * Embedded (?embed): the demo alone, in the language and theme it's asked
 * for, saying how tall it is to the page it's in. That page can change the
 * theme with a message ({ theme: "dark" }), and each message is answered
 * with the height. The theme isn't remembered: the page around it chose.
 */
function embedded() {
  const q = new URLSearchParams(location.search);
  if (!q.has("embed")) return undefined;
  const lang = q.get("lang") === "ar" ? "ar" : "en";
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.body.classList.add("ex-embedded");
  const theme = (t: unknown) => { if (t === "light" || t === "dark") document.documentElement.dataset.theme = t; };
  theme(q.get("theme"));
  const height = () => parent.postMessage({ arabesqueDemo: location.pathname, height: Math.ceil(document.body.getBoundingClientRect().height) }, "*");
  // Any message is answered with the height too: the page may have missed
  // the first, sent before it was listening.
  addEventListener("message", (e) => { if (e.source === parent) { theme(e.data?.theme); height(); } });
  new ResizeObserver(height).observe(document.body);
  return lang;
}

const id = document.body.dataset.example;
const embed = embedded();
const demo = demos.find((x) => x.id === id);
const root = document.getElementById("root");
const ar = document.documentElement.lang === "ar";
const page = id === "showcase" ? <Showcase lang={ar ? "ar" : "en"} root={ar ? "../../" : "../"} numerals={ar ? chosenNumerals() : "latn"} />
  : id === "home" ? <Homepage lang={ar ? "ar" : "en"} root={ar ? "../" : ""} numerals={ar ? chosenNumerals() : "latn"} />
  : id === "index" ? <Gallery /> : demo && (embed ? <ExampleEmbed demo={demo} lang={embed} /> : <ExamplePage demo={demo} />);
if (root) createRoot(root).render(<>{page}<Ready /></>);
