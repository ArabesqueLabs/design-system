// A release's fonts, without a copy of the font files in every release.
//
// The faces rarely change, and they're most of a release's weight (1.1 MB),
// so their files are kept once per set: v/_fonts/<hash>/, the hash of the
// files themselves. A release's own fonts/ has its fonts.css, pointing there,
// and the licences. Released files never change, so a set, once written,
// is shared by every release with the same faces, and cached for good.
//
//   v/0.4.0/fonts/fonts.css   url("../../_fonts/3f9c…/jost-latin.woff2")
//   v/_fonts/3f9c…/jost-latin.woff2

import { createHash } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/** Write v/<version>/fonts/ from fonts/, its faces in the shared set; returns the set's folder. */
export function releaseFonts(root, version) {
  const from = join(root, "fonts");
  const faces = readdirSync(from).filter((f) => f.endsWith(".woff2")).sort();
  const hash = createHash("sha256");
  for (const f of faces) hash.update(f).update(readFileSync(join(from, f)));
  const set = `_fonts/${hash.digest("hex").slice(0, 12)}`;
  const shared = join(root, "v", set);
  if (!existsSync(shared)) {
    mkdirSync(shared, { recursive: true });
    for (const f of faces) copyFileSync(join(from, f), join(shared, f));
  }
  const own = join(root, "v", version, "fonts");
  mkdirSync(own, { recursive: true });
  for (const f of readdirSync(from).filter((x) => !x.endsWith(".woff2"))) {
    if (f === "fonts.css") continue;
    copyFileSync(join(from, f), join(own, f));
  }
  const css = readFileSync(join(from, "fonts.css"), "utf8").replace(/url\("\.\/([\w.-]+\.woff2)"\)/g, (_, f) => `url("../../${set}/${f}")`);
  writeFileSync(join(own, "fonts.css"), css);
  return set;
}
