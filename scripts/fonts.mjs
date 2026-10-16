#!/usr/bin/env node
// Fetches the system's typefaces once, to serve them from here:
// fonts/*.woff2 and fonts/fonts.css. A page that links fonts.css sends its
// visitors to no one else (Google's CDN logs each visitor's address).
//
// IBM Plex comes from IBM's own releases (github.com/IBM/plex, at a release
// tag): its licence reserves
// the name "Plex", which a subset made by anyone else couldn't keep. Sans
// Arabic is IBM's complete file, unchanged (unicode-range only limits which
// characters the browser uses it for); Mono is IBM's own subsets. The rest
// come from Google Fonts, whose licences reserve no names.
//
//   node scripts/fonts.mjs
//
// Only the Latin, Latin Extended and Arabic subsets are kept; each is
// fetched by a browser only when a page has a character in its range. All
// the faces are under the SIL Open Font License 1.1 (fonts/README.md).

import { writeFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "fonts");

// The families, styles and weights the system uses (docs/foundations/typography.md).
const FAMILIES = [
  "Amiri:ital,wght@0,400;0,700;1,400",
  "Jost:wght@400;500;600",
  "Kufam:wght@400;500;600",
  "Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400",
];
const SUBSETS = new Set(["latin", "latin-ext", "arabic"]);

// IBM Plex, from IBM's repository, at these release tags.
const ibm = (pkg, version) => `https://raw.githubusercontent.com/IBM/plex/${encodeURIComponent(`@ibm/${pkg}@${version}`)}/packages/${pkg}`;
const PLEX_ARABIC = ibm("plex-sans-arabic", "1.1.0");
const PLEX_MONO = ibm("plex-mono", "2.5.0");
// The Arabic characters, as Google's arabic subsets have them: what Plex Sans
// Arabic is used for (the system's Latin is Jost's).
const ARABIC_RANGE = "U+0600-06FF, U+0750-077F, U+0870-0891, U+0897-08E1, U+08E3-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC, U+102E0-102FB, U+10E60-10E7E, U+10EC2-10EC7, U+10EC9-10EEE, U+10EF0-10EFF, U+1EE00-1EE03, U+1EE05-1EE1F, U+1EE21-1EE22, U+1EE24, U+1EE27, U+1EE29-1EE32, U+1EE34-1EE37, U+1EE39, U+1EE3B, U+1EE42, U+1EE47, U+1EE49, U+1EE4B, U+1EE4D-1EE4F, U+1EE51-1EE52, U+1EE54, U+1EE57, U+1EE59, U+1EE5B, U+1EE5D, U+1EE5F, U+1EE61-1EE62, U+1EE64, U+1EE67-1EE6A, U+1EE6C-1EE72, U+1EE74-1EE77, U+1EE79-1EE7C, U+1EE7E, U+1EE80-1EE89, U+1EE8B-1EE9B, U+1EEA1-1EEA3, U+1EEA5-1EEA9, U+1EEAB-1EEBB, U+1EEF0-1EEF1";
// Plex Mono's subsets the system keeps (not Cyrillic), as IBM splits them.
const MONO_SUBSETS = ["Latin1", "Latin2", "Latin3", "Pi"];
// Google sends woff2 to a browser that says it reads it.
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";

const url = `https://fonts.googleapis.com/css2?${FAMILIES.map((f) => `family=${f}`).join("&")}&display=swap`;
const res = await fetch(url, { headers: { "user-agent": UA } });
if (!res.ok) throw new Error(`${url}: ${res.status}`);
const css = await res.text();

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

// One face per file: Google declares a variable file once per weight, so
// its weights are joined into a range.
const byFile = new Map();
for (const [, subset, body] of css.matchAll(/\/\* ([a-z-]+) \*\/\s*@font-face \{([^}]*)\}/g)) {
  if (!SUBSETS.has(subset)) continue;
  const get = (prop) => new RegExp(`${prop}: ([^;]+);`).exec(body)?.[1];
  const remote = /url\(([^)]+)\)/.exec(get("src"))[1];
  const face = byFile.get(remote) ?? { subset, family: get("font-family").replace(/'/g, ""), style: get("font-style"), weights: [], range: get("unicode-range") };
  face.weights.push(...get("font-weight").split(" ").map(Number));
  byFile.set(remote, face);
}
const slug = (f) => `${f.family.toLowerCase().replace(/ /g, "-")}-${f.subset}${f.style === "italic" ? "-italic" : ""}`;
const count = new Map();
for (const f of byFile.values()) count.set(slug(f), (count.get(slug(f)) ?? 0) + 1);
const files = new Map(); // remote url → local name
const faces = [];
for (const [remote, f] of byFile) {
  const [lo, hi] = [Math.min(...f.weights), Math.max(...f.weights)];
  const weight = lo === hi ? `${lo}` : `${lo} ${hi}`;
  // The weight is in the name only where a family has a file per weight.
  const name = `${slug(f)}${count.get(slug(f)) > 1 ? `-${lo}` : ""}.woff2`;
  files.set(remote, name);
  faces.push(`/* ${f.subset} */
@font-face {
  font-family: "${f.family}";
  font-style: ${f.style};
  font-weight: ${weight};
  font-display: swap;
  src: url("./${name}") format("woff2");
  unicode-range: ${f.range};
}`);
}

// IBM Plex Sans Arabic: IBM's complete files, one per weight.
for (const [weight, style] of [[400, "Regular"], [500, "Medium"], [600, "SemiBold"]]) {
  const name = `ibm-plex-sans-arabic-${weight}.woff2`;
  files.set(`${PLEX_ARABIC}/fonts/complete/woff2/IBMPlexSansArabic-${style}.woff2`, name);
  faces.push(`/* arabic, IBM's complete file */
@font-face {
  font-family: "IBM Plex Sans Arabic";
  font-style: normal;
  font-weight: ${weight};
  font-display: swap;
  src: url("./${name}") format("woff2");
  unicode-range: ${ARABIC_RANGE};
}`);
}
// IBM Plex Mono: IBM's own subsets, with IBM's ranges.
const monoCss = await (await fetch(`${PLEX_MONO}/fonts/split/woff2/IBMPlexMono-Regular.css`)).text();
for (const subset of MONO_SUBSETS) {
  const range = new RegExp(`Subset: ${subset} \\*/\\s*@font-face \\{[^}]*unicode-range: ([^;}]+)`).exec(monoCss)?.[1]?.trim();
  if (!range) throw new Error(`IBM Plex Mono: no ${subset} subset`);
  const name = `ibm-plex-mono-${subset.toLowerCase()}.woff2`;
  files.set(`${PLEX_MONO}/fonts/split/woff2/IBMPlexMono-Regular-${subset}.woff2`, name);
  faces.push(`/* ${subset}, IBM's subset */
@font-face {
  font-family: "IBM Plex Mono";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("./${name}") format("woff2");
  unicode-range: ${range};
}`);
}

let bytes = 0;
for (const [remote, name] of files) {
  const r = await fetch(remote);
  if (!r.ok) throw new Error(`${remote}: ${r.status}`);
  const buf = Buffer.from(await r.arrayBuffer());
  bytes += buf.length;
  writeFileSync(join(out, name), buf);
}

// The OFL asks that the licence travel with the fonts: each family's, from
// where its fonts come from (IBM's repository, or the google/fonts one).
const LICENCES = { Amiri: "amiri", "IBM Plex Mono": "ibmplexmono", "IBM Plex Sans Arabic": "ibmplexsansarabic", Jost: "jost", Kufam: "kufam", Newsreader: "newsreader" };
const LICENCE_FROM = { ibmplexmono: `${PLEX_MONO}/LICENSE.txt`, ibmplexsansarabic: `${PLEX_ARABIC}/LICENSE.txt` };
for (const [family, dir] of Object.entries(LICENCES)) {
  const r = await fetch(LICENCE_FROM[dir] ?? `https://raw.githubusercontent.com/google/fonts/main/ofl/${dir}/OFL.txt`);
  if (!r.ok) throw new Error(`licence for ${family}: ${r.status}`);
  writeFileSync(join(out, `OFL-${dir}.txt`), await r.text());
}
writeFileSync(join(out, "README.md"), `# Fonts

Generated by \`scripts/fonts.mjs\`: don't edit. Each family is under the SIL
Open Font License 1.1; its licence, with its copyright, is beside it
(\`OFL-*.txt\`). IBM Plex is IBM's own files, from its releases: its licence
reserves the name "Plex", so it's only subset as IBM subsets it. The rest are
Google Fonts'.

| Family | From | Licence |
|---|---|---|
${Object.entries(LICENCES).map(([f, d]) => `| ${f} | ${d.startsWith("ibmplex") ? "IBM (github.com/IBM/plex, @ibm/plex-" + (d === "ibmplexmono" ? "mono@2.5.0" : "sans-arabic@1.1.0") + ")" : "Google Fonts"} | [OFL-${d}.txt](OFL-${d}.txt) |`).join("\n")}
`);

writeFileSync(join(out, "fonts.css"), `/* Arabesque Labs design system: the typefaces, served from here.
   Generated by scripts/fonts.mjs (IBM Plex from IBM, the rest from Google
   Fonts): don't edit. SIL Open Font
   License 1.1 (OFL-*.txt). Link it before arabesque.css:
   <link rel="stylesheet" href="/fonts/fonts.css"> */

${faces.join("\n")}
`);
console.log(`fonts: ${faces.length} faces, ${files.size} files, ${(bytes / 1024).toFixed(0)} KB`);
