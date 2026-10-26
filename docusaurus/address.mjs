// A document's address on the site, from its path in the repository: the
// Docusaurus build's (docs/ at /docs/, docs/components/ar/ at /ar/docs/components/),
// number prefixes dropped (00-audit.md at audit/), a README as its folder.
// For scripts/sync.mjs, scripts/site.mjs (the old pages' redirects),
// scripts/build-react.mjs and examples/src/site.tsx (the links to them).

/** "docs/components/ar/button.md" → "/ar/docs/components/button/". */
export function docAddress(file) {
  const rel = file.replace(/^docs\//, "");
  const ar = rel.startsWith("components/ar/");
  const path = (ar ? rel.replace("components/ar/", "components/") : rel).replace(/\.md$/, "")
    .split("/").map((s) => s.replace(/^\d+-/, "")).join("/").replace(/(^|\/)README$/, "");
  return `${ar ? "/ar" : ""}/docs/${path}${path ? "/" : ""}`;
}
