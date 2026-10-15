// In the browser: the page, from its data-example. Not prerendered: the
// numbers in Arabic come from Intl, which differs between Node versions, and
// the build must give the same files wherever it runs.

import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { ExamplePage, Gallery } from "./app.js";
import { demos } from "./demos.js";

/** For the page check (scripts/check-page.mjs): React has rendered and run its effects. Renders nothing. */
function Ready() {
  useEffect(() => { document.documentElement.dataset.ready = "yes"; }, []);
  return null;
}

const id = document.body.dataset.example;
const demo = demos.find((x) => x.id === id);
const root = document.getElementById("root");
if (root) createRoot(root).render(<>{id === "index" ? <Gallery /> : demo && <ExamplePage demo={demo} />}<Ready /></>);
