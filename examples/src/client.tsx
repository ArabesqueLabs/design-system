// In the browser: the page, from its data-example. The example pages aren't
// prerendered (the numbers in Arabic come from Intl, which differs between
// Node versions, and the build must give the same files wherever it runs);
// the showcase is, in its page's language, so it reads without JavaScript,
// and is rendered again here, in Arabic in the digits the person chose.

import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { ExamplePage, Gallery } from "./app.js";
import { demos } from "./demos.js";
import { Showcase, chosenNumerals } from "./showcase.js";

/** For the page check (scripts/check-page.mjs): React has rendered and run its effects. Renders nothing. */
function Ready() {
  useEffect(() => { document.documentElement.dataset.ready = "yes"; }, []);
  return null;
}

const id = document.body.dataset.example;
const demo = demos.find((x) => x.id === id);
const root = document.getElementById("root");
const ar = document.documentElement.lang === "ar";
const page = id === "showcase" ? <Showcase lang={ar ? "ar" : "en"} root={ar ? "../" : ""} numerals={ar ? chosenNumerals() : "latn"} />
  : id === "index" ? <Gallery /> : demo && <ExamplePage demo={demo} />;
if (root) createRoot(root).render(<>{page}<Ready /></>);
