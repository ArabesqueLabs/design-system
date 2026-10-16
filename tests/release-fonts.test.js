// A release's fonts: its own fonts.css and licences, the faces once in a shared set.
import { test } from "node:test";
import assert from "node:assert/strict";
import { cpSync, existsSync, mkdtempSync, readFileSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { releaseFonts } from "../scripts/release-fonts.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("two releases with the same faces share one copy of them", () => {
  const dir = mkdtempSync(join(tmpdir(), "al-fonts-"));
  cpSync(join(root, "fonts"), join(dir, "fonts"), { recursive: true });
  const a = releaseFonts(dir, "9.0.0");
  const b = releaseFonts(dir, "9.1.0");
  assert.equal(a, b);
  const faces = readdirSync(join(dir, "fonts")).filter((f) => f.endsWith(".woff2"));
  assert.deepEqual(readdirSync(join(dir, "v", a)).sort(), faces.sort());
  for (const v of ["9.0.0", "9.1.0"]) {
    const own = readdirSync(join(dir, "v", v, "fonts"));
    assert.ok(!own.some((f) => f.endsWith(".woff2")), `${v} has no faces of its own`);
    assert.ok(own.includes("OFL-jost.txt"), `${v} has the licences`);
    // Every face it names is in the shared set, by the path the release's fonts.css gives.
    const css = readFileSync(join(dir, "v", v, "fonts", "fonts.css"), "utf8");
    const urls = [...css.matchAll(/url\("([^"]+)"\)/g)].map((m) => m[1]);
    assert.ok(urls.length > 10);
    for (const u of urls) assert.ok(existsSync(join(dir, "v", v, "fonts", u)), u);
  }
});
