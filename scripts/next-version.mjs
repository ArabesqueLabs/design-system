#!/usr/bin/env node
// The next version, from what the changelog's Unreleased section says
// changed, following the README's versioning:
//
//   Removed                    → major (minor before 1.0, as semver allows for 0.x)
//   Added, Changed, Deprecated → minor (and any other heading but these and Fixed)
//   Fixed, Security only       → patch
//   nothing under Unreleased   → no release
//
//   node scripts/next-version.mjs                 → "0.3.0", or nothing
//   node scripts/next-version.mjs --bump major    → the next major, whatever the changelog says
//
// The release PR workflow (.github/workflows/release-pr.yml) uses it; a
// release:major, release:minor or release:patch label on that PR is passed
// as --bump.

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/** The Unreleased section's headings ("Added", "Fixed"…) that have entries under them. */
export function unreleasedKinds(changelog) {
  const m = /## \[Unreleased\]\n([\s\S]*?)(?=\n## \[|$)/.exec(changelog);
  if (!m) return [];
  const kinds = [];
  for (const [, kind, body] of m[1].matchAll(/### ([^\n]+)\n([\s\S]*?)(?=\n### |$)/g)) {
    if (/^\s*[-*] /m.test(body)) kinds.push(kind.trim());
  }
  return kinds;
}

/** The kind of bump the kinds call for: "major", "minor", "patch", or null for none. */
export function bumpFor(kinds, version) {
  if (!kinds.length) return null;
  const major = Number(version.split(".")[0]);
  if (kinds.includes("Removed")) return major >= 1 ? "major" : "minor";
  if (kinds.some((k) => k !== "Fixed" && k !== "Security")) return "minor";
  return "patch";
}

/** version bumped: bump("0.2.0", "minor") → "0.3.0". */
export function bump(version, kind) {
  const [major, minor, patch] = version.split(".").map(Number);
  if (kind === "major") return `${major + 1}.0.0`;
  if (kind === "minor") return `${major}.${minor + 1}.0`;
  if (kind === "patch") return `${major}.${minor}.${patch + 1}`;
  throw new Error(`no bump called ${kind}`);
}

/** The next version, or null if there's nothing to release. A forced bump still needs something unreleased. */
export function nextVersion(changelog, version, force) {
  const kind = bumpFor(unreleasedKinds(changelog), version);
  if (!kind) return null;
  return bump(version, force || kind);
}

// Run as a script: print the next version, or nothing.
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const root = join(dirname(fileURLToPath(import.meta.url)), "..");
  const i = process.argv.indexOf("--bump");
  const force = i > 0 ? process.argv[i + 1] : undefined;
  if (force && !["major", "minor", "patch"].includes(force)) {
    console.error(`--bump is major, minor or patch, not ${force}`);
    process.exit(1);
  }
  const { version } = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  const next = nextVersion(readFileSync(join(root, "CHANGELOG.md"), "utf8"), version, force);
  if (next) console.log(next);
}
