#!/usr/bin/env node
// Builds the site, design.arabesquelabs.com, into _site/ (wrangler.jsonc's
// build, before every deploy and wrangler dev):
//
//   the repository, as it is      less .assetsignore's paths, and docs/'s
//                                 Markdown (GitHub has it)
//   docs/, ar/docs/               the documents, with Docusaurus (docusaurus/):
//                                 English, and the Arabic
//   _redirects                    each document's old page (docs/…/*.html) to its new one
//
// Everything else is committed as built (scripts/build.mjs and
// build-react.mjs), so it's copied as it is. Docusaurus's packages are its
// own (docusaurus/package-lock.json), installed here when they're missing.

import { execFileSync } from "node:child_process";
import { cpSync, existsSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { docAddress } from "../docusaurus/address.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const at = (p) => join(root, p);
const out = at("_site");
const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const run = (args, cwd) => execFileSync(npm, args, { cwd, stdio: "inherit" });

// The documents.
const docusaurus = at("docusaurus");
if (!existsSync(join(docusaurus, "node_modules/@docusaurus/core"))) run(["ci", "--no-fund", "--no-audit"], docusaurus);
run(["run", "build"], docusaurus);

// The repository's top level, less what isn't the site's: .assetsignore's
// paths (each a top-level name, a folder with its slash), the documents'
// sources and the site's own build.
const ignored = new Set(readFileSync(at(".assetsignore"), "utf8").split("\n")
  .map((l) => l.trim()).filter((l) => l && !l.startsWith("#")).map((l) => l.replace(/\/$/, "")));
for (const skip of ["docs", "docusaurus", "_site", ".assetsignore", "_redirects"]) ignored.add(skip);
rmSync(out, { recursive: true, force: true });
for (const name of readdirSync(root)) {
  if (!ignored.has(name)) cpSync(at(name), join(out, name), { recursive: true });
}
cpSync(join(docusaurus, "build/ar"), join(out, "ar/docs"), { recursive: true });
cpSync(join(docusaurus, "build"), join(out, "docs"), { recursive: true, filter: (src) => src !== join(docusaurus, "build/ar") });

// The documents' old pages, each to its new one: docs/components/button.html
// to /docs/components/button/, the Arabic (docs/components/ar/button.html)
// to /ar/docs/components/button/, and each without its .html, as the site
// served them.
const redirects = [];
for (const f of readdirSync(at("docs"), { recursive: true }).map((f) => f.split("\\").join("/")).filter((f) => f.endsWith(".md")).sort()) {
  const old = `/docs/${f.replace(/\.md$/, "")}`;
  const to = docAddress(`docs/${f}`);
  redirects.push(`${old}.html ${to} 301`);
  // /docs/components/button goes to /docs/components/button/ by itself.
  if (`${old}/` !== to) redirects.push(`${old} ${to} 301`);
}
writeFileSync(join(out, "_redirects"), `# Written by scripts/site.mjs: the documents' old pages.\n${redirects.join("\n")}\n`);

console.log(`site: _site/, with the documents at docs/ and ar/docs/, and ${redirects.length} redirects`);
