#!/usr/bin/env node
// Writes the Docusaurus site's pages from the repository's documents:
//
//   docs/**/*.md                    → docs/ (English, at /docs/)
//   docs/components/ar/*.md         → i18n/ar/docusaurus-plugin-content-docs/current/components/
//                                     (Arabic, at /ar/docs/), with the English of every
//                                     document not translated beside them
//   the order of docs/components/README.md's table → sidebar.json
//   Arabesque's mark and favicon, from dist/brand/ → static/
//   links to examples/ and what it loads → .site/ (for npm run docs, where
//                                     the specs' demos come from: docusaurus.config.js)
//
// docs/ stays the source: it's what GitHub shows, and what products link
// to. Both outputs are ignored by git and written again on every start and
// build. Each page's links are rewritten for where it now is: to another
// document in the same language, as a relative .md link (Docusaurus checks
// it); to a document in the other language, or to one of the site's own
// pages (the README, the changelog, the examples), by its full address on
// the site, which src/theme/MDXComponents/A makes an ordinary link; to any
// other file (CSS, JavaScript, sources), on GitHub.

import { copyFileSync, mkdirSync, symlinkSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, posix } from "node:path";
import { fileURLToPath } from "node:url";
import { docAddress } from "../address.mjs";
import catalogue from "../../showcase-ar.js";

const here = join(dirname(fileURLToPath(import.meta.url)), "..");
const root = join(here, "..");
const SITE = "https://design.arabesquelabs.com";
const REPO = "https://github.com/ArabesqueLabs/design-system";
const OUT = { en: join(here, "docs"), ar: join(here, "i18n/ar/docusaurus-plugin-content-docs/current") };

// The documents outside docs/ that the site has as pages (scripts/build-react.mjs).
const PAGES = { "README.md": "/README", "ar/README.md": "/ar/README", "CHANGELOG.md": "/CHANGELOG", "templates/README.md": "/templates/README" };

const files = readdirSync(join(root, "docs"), { recursive: true })
  .filter((f) => f.endsWith(".md"))
  .map((f) => posix.join("docs", f.split("\\").join("/")))
  .sort();
const isDoc = new Set(files);
// The English documents with a translation.
const translated = new Set(files.filter((f) => f.startsWith("docs/components/ar/")).map((f) => f.replace("components/ar/", "components/")));

/** Where a document goes: its language, and its path in that language's tree. */
function place(file) {
  const rel = file.slice("docs/".length);
  return rel.startsWith("components/ar/") ? { lang: "ar", rel: rel.replace("components/ar/", "components/") } : { lang: "en", rel };
}

/** A link in `file`, rewritten for where the page now is: in its own language's tree, or `lang`'s. */
function link(file, target, lang = place(file).lang) {
  if (/^([a-z]+:|#)/i.test(target)) return target;
  const [path, hash = ""] = target.split(/(?=#)/);
  let to = posix.normalize(posix.join(posix.dirname(file), path));
  // From the English in the Arabic tree, to the translation where there is one.
  if (lang === "ar" && place(file).lang === "en" && translated.has(to)) to = to.replace("docs/components/", "docs/components/ar/");
  if (isDoc.has(to)) {
    const from = { ...place(file), lang };
    const dest = place(to);
    if (from.lang === dest.lang || (lang === "ar" && !translated.has(to))) {
      const rel = posix.relative(posix.dirname(from.rel), dest.rel);
      return (rel.startsWith(".") ? rel : `./${rel}`) + hash;
    }
    return SITE + docAddress(to) + hash;
  }
  if (PAGES[to]) return SITE + PAGES[to] + hash;
  if (to.endsWith(".html")) return SITE + "/" + to + hash;
  return `${REPO}/blob/main/${to}${hash}`;
}

/** The Markdown's links rewritten, outside code (fenced and inline). */
function rewrite(file, md, lang) {
  return md.split(/(^```[\s\S]*?^```$)/m).map((part, i) => i % 2 ? part
    : part.split(/(`[^`\n]*`)/).map((bit, j) => j % 2 ? bit
      : bit.replace(/\]\(([^)\s]+)\)/g, (m, target) => `](${link(file, target, lang)})`)).join("")).join("");
}

// The demos (examples/src/demos.tsx), by the spec each is for: a spec's page
// shows them working (src/remark/specs.mjs).
const demosOf = new Map();
const source = readFileSync(join(root, "examples/src/demos.tsx"), "utf8");
const QUOTED = String.raw`"((?:[^"\\]|\\.)*)"`;
for (const [, id, title, spec] of [
  ...source.matchAll(new RegExp(String.raw`^  d\("([\w-]+)", ${QUOTED}, "[^"]*", ${QUOTED.replace("(", "(?:")}, "([\w-]+)"`, "gm")),
].map(([m, id, title, spec]) => [m, id, title, `docs/components/${spec}.md`]).concat(
  [...source.matchAll(new RegExp(String.raw`^  \{ id: "([\w-]+)", title: ${QUOTED}, .*?spec: "(docs/[^"]+)"`, "gm"))],
)) {
  const t = JSON.parse(`"${title}"`);
  demosOf.set(spec, [...(demosOf.get(spec) ?? []), { id, title: t }]);
}

// The tokens' tables need the page's width: no "On this page" beside them.
const WIDE = new Set(["docs/tokens.md"]);

/** A page's front matter: where it's edited, and for a spec, how to lay it out. */
function frontMatter(file, lang) {
  const english = lang === "ar" ? file.replace("docs/components/ar/", "docs/components/") : file;
  const demos = (demosOf.get(english) ?? []).map((d) => ({ id: d.id, title: lang === "ar" ? catalogue[d.title] ?? d.title : d.title }));
  const spec = /^docs\/components\/(ar\/)?[^/]+\.md$/.test(file) && !file.endsWith("README.md");
  return [
    `custom_edit_url: ${REPO}/blob/main/${file}`,
    // spec: the specs' layout (src/remark/specs.mjs), in this language.
    ...(spec || demos.length ? [`spec: ${lang}`] : []),
    ...(demos.length ? [`demos: ${JSON.stringify(demos)}`] : []),
    ...(WIDE.has(english) ? ["hide_table_of_contents: true"] : []),
  ].join("\n");
}

for (const dir of Object.values(OUT)) rmSync(dir, { recursive: true, force: true });
for (const file of files) {
  const { lang, rel } = place(file);
  const md = readFileSync(join(root, file), "utf8");
  const out = join(OUT[lang], rel);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, `---\n${frontMatter(file, lang)}\n---\n\n${rewrite(file, md)}`);
  // Untranslated, it's the English in Arabic too: in the Arabic tree, or
  // Docusaurus can't link it to the translations (nor them to it).
  if (lang === "en" && !translated.has(file)) {
    const copy = join(OUT.ar, rel);
    mkdirSync(dirname(copy), { recursive: true });
    writeFileSync(copy, `---\n${frontMatter(file, "en")}\n---\n\n${rewrite(file, md, "ar")}`);
  }
}

// The components in the order of the index's table, then any it doesn't list.
const index = readFileSync(join(root, "docs/components/README.md"), "utf8");
const listed = [...index.matchAll(/^\| \[[^\]]+\]\(([a-z0-9-]+)\.md\)/gm)].map((m) => m[1]);
const all = files.filter((f) => /^docs\/components\/[^/]+\.md$/.test(f) && !f.endsWith("README.md")).map((f) => posix.basename(f, ".md"));
const components = [...new Set([...listed.filter((c) => all.includes(c)), ...all])].map((c) => `components/${c}`);
writeFileSync(join(here, "sidebar.json"), JSON.stringify({ components }, null, 2) + "\n");

// The navbar's mark, in each ink, and the favicon.
mkdirSync(join(here, "static"), { recursive: true });
for (const f of ["arabesque-favicon.svg", "arabesque-mark-ink.svg", "arabesque-mark-reversed.svg"]) copyFileSync(join(root, "dist/brand", f), join(here, "static", f));

// The example pages, and what they load, for the dev server to serve under
// the base URL (all of the repository would clash with Docusaurus's own
// index.html).
rmSync(join(here, ".site"), { recursive: true, force: true });
mkdirSync(join(here, ".site"));
for (const dir of ["examples", "dist", "fonts", "js"]) symlinkSync(join(root, dir), join(here, ".site", dir), "dir");

console.log(`docs: ${files.length} documents (${files.filter((f) => place(f).lang === "ar").length} in Arabic), ${components.length} components in the sidebar`);
