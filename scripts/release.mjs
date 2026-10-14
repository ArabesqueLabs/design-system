#!/usr/bin/env node
// Cuts a release: node scripts/release.mjs 0.2.0
//
//   - moves the changelog's Unreleased entries under the version, dated today
//   - sets the version in package.json
//   - builds, and copies dist/, fonts/ and js/ to v/<version>/, which is then never
//     changed: sites link https://design.arabesquelabs.com/v/<version>/dist/arabesque.css
//     and upgrade when they choose (_headers caches it for a year)
//
// It changes files only; committing and tagging are left to you.

import { readFileSync, writeFileSync, existsSync, cpSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const at = (p) => join(root, p);
const fail = (msg) => { console.error(msg); process.exit(1); };

const version = process.argv[2];
if (!/^\d+\.\d+\.\d+$/.test(version ?? "")) fail("usage: node scripts/release.mjs <major.minor.patch>");

const pkg = JSON.parse(readFileSync(at("package.json"), "utf8"));
const newer = (a, b) => {
  const [x, y] = [a, b].map((v) => v.split(".").map(Number));
  const i = x.findIndex((n, j) => n !== y[j]);
  return i !== -1 && x[i] > y[i];
};
if (!newer(version, pkg.version)) fail(`${version} isn't newer than ${pkg.version}`);
if (existsSync(at(`v/${version}`))) fail(`v/${version} already exists: a released version is never rebuilt`);

const log = readFileSync(at("CHANGELOG.md"), "utf8");
const m = /## \[Unreleased\]\n([\s\S]*?)(?=\n## \[)/.exec(log);
if (!m || !m[1].trim()) fail("the changelog's Unreleased section is empty: nothing to release");
const today = new Date().toISOString().slice(0, 10);
writeFileSync(at("CHANGELOG.md"), log.replace("## [Unreleased]\n", `## [Unreleased]\n\n## [${version}] - ${today}\n`));

// Only the version line, so the file keeps its own layout.
writeFileSync(at("package.json"), readFileSync(at("package.json"), "utf8").replace(/("version":\s*)"[^"]*"/, `$1"${version}"`));

execFileSync(process.execPath, [at("scripts/build.mjs")], { stdio: "inherit" });

// dist/, fonts/ and js/ side by side, as in the repo, so the helpers' relative URLs
// (validate.js finds ../dist/icons.svg) still resolve.
cpSync(at("dist"), at(`v/${version}/dist`), { recursive: true });
cpSync(at("js"), at(`v/${version}/js`), { recursive: true });
cpSync(at("fonts"), at(`v/${version}/fonts`), { recursive: true });

const files = readdirSync(at(`v/${version}`), { recursive: true }).length;
console.log(`
v/${version}/: ${files} files. Then:
  npm run check
  commit, with the message "Release ${version}"
  git tag v${version} && git push --tags
  deploy (the site serves v/${version}/)`);
