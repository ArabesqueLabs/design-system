import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { unreleasedKinds, bumpFor, bump, nextVersion } from "../scripts/next-version.mjs";

const log = (unreleased) => `# Changelog\n\n## [Unreleased]\n${unreleased}\n## [0.2.0] - 2026-10-14\n\n### Fixed\n\n- Old.\n`;

test("the kinds are the Unreleased headings with entries", () => {
  assert.deepEqual(unreleasedKinds(log("\n### Added\n\n- A thing.\n\n### Fixed\n\n- A bug.\n")), ["Added", "Fixed"]);
  assert.deepEqual(unreleasedKinds(log("\n### Added\n\n### Fixed\n\n- A bug.\n")), ["Fixed"]);
  assert.deepEqual(unreleasedKinds(log("\n")), []);
  // Released sections don't count.
  assert.deepEqual(unreleasedKinds(log("\n")).includes("Fixed"), false);
});

test("Removed is a minor before 1.0, a major after", () => {
  assert.equal(bumpFor(["Removed", "Fixed"], "0.2.0"), "minor");
  assert.equal(bumpFor(["Removed"], "1.4.2"), "major");
});

test("Added, Changed and Deprecated are minor; Fixed and Security alone, a patch", () => {
  assert.equal(bumpFor(["Added"], "1.0.0"), "minor");
  assert.equal(bumpFor(["Changed", "Fixed"], "1.0.0"), "minor");
  assert.equal(bumpFor(["Deprecated"], "1.0.0"), "minor");
  assert.equal(bumpFor(["Fixed"], "1.0.0"), "patch");
  assert.equal(bumpFor(["Fixed", "Security"], "1.0.0"), "patch");
  assert.equal(bumpFor([], "1.0.0"), null);
});

test("bumps reset what's below them", () => {
  assert.equal(bump("0.2.3", "major"), "1.0.0");
  assert.equal(bump("0.2.3", "minor"), "0.3.0");
  assert.equal(bump("0.2.3", "patch"), "0.2.4");
});

test("a forced bump overrides the changelog, but nothing unreleased is no release", () => {
  assert.equal(nextVersion(log("\n### Fixed\n\n- A bug.\n"), "0.2.0", "major"), "1.0.0");
  assert.equal(nextVersion(log("\n"), "0.2.0", "major"), null);
});

test("this changelog has an Unreleased section the script reads", () => {
  const changelog = readFileSync(new URL("../CHANGELOG.md", import.meta.url), "utf8");
  assert.match(changelog, /^## \[Unreleased\]$/m);
  // Right after a release it's empty, and there's nothing to release.
  const released = changelog.replace(/## \[Unreleased\]\n[\s\S]*?(?=\n## \[)/, "## [Unreleased]\n");
  assert.equal(nextVersion(released, "0.3.0"), null);
});
