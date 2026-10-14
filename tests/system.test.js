// The system's own rules, checked from its sources: what a stylelint config
// would enforce, with no dependencies.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { tile } from "../js/pattern.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");
const cssFiles = ["css/base.css", "css/layout.css", "css/utilities.css", ...readdirSync(join(root, "css/components")).filter((f) => f.endsWith(".css")).map((f) => `css/components/${f}`)];
const strip = (css) => css.replace(/\/\*[\s\S]*?\*\//g, "");

test("no physical left or right in css/: logical properties only", () => {
  const physical = /(?:margin|padding|border)-(?:left|right)\b|(?<![-\w])(?:left|right)\s*:|text-align:\s*(?:left|right)|float:\s*(?:left|right)|clear:\s*(?:left|right)/;
  for (const f of cssFiles) {
    strip(read(f)).split("\n").forEach((line, i) => assert.ok(!physical.test(line), `${f}:${i + 1}: ${line.trim()}`));
  }
});

test("every --al- custom property css/ uses is a token", () => {
  // Tokens, and the few a component sets for its own use (--al-stack-gap).
  const declared = (css) => [...css.matchAll(/(--al-[\w-]+)\s*:/g)].map((m) => m[1]);
  const defined = new Set([...declared(read("dist/tokens.css")), ...cssFiles.flatMap((f) => declared(strip(read(f))))]);
  for (const f of cssFiles) {
    // Without a fallback, that is: var(--al-cluster-gap, …) is a setting a page may give.
    for (const [, name] of strip(read(f)).matchAll(/var\((--al-[\w-]+)\s*\)/g)) {
      assert.ok(defined.has(name), `${f}: ${name} isn't defined in tokens`);
    }
  }
});

test("every token reference resolves", () => {
  const tokens = JSON.parse(read("tokens/tokens.json"));
  const paths = new Set();
  (function walk(node, path) {
    if (node && typeof node === "object" && "$value" in node) { paths.add(path.join(".")); return; }
    for (const [k, v] of Object.entries(node)) if (!k.startsWith("$") && v && typeof v === "object") walk(v, [...path, k]);
  })(tokens, []);
  const refs = [...JSON.stringify(tokens).matchAll(/"\{([^}]+)\}"/g)].map((m) => m[1]);
  for (const r of refs) assert.ok(paths.has(r), `no token ${r}`);
});

test("every primitive is used by a role", () => {
  const tokens = JSON.parse(read("tokens/tokens.json"));
  const text = JSON.stringify(tokens.semantic) + JSON.stringify(tokens.component);
  for (const [family, shades] of Object.entries(tokens.primitive.color)) {
    if (family.startsWith("$")) continue;
    if ("$value" in shades) { assert.ok(text.includes(`{primitive.color.${family}}`), `primitive.color.${family} is unused`); continue; }
    for (const shade of Object.keys(shades).filter((k) => !k.startsWith("$"))) {
      assert.ok(text.includes(`{primitive.color.${family}.${shade}}`), `primitive.color.${family}.${shade} is unused`);
    }
  }
});

test("one @keyframes of each name", () => {
  const seen = new Map();
  for (const f of cssFiles) {
    for (const [, name] of strip(read(f)).matchAll(/@keyframes\s+([\w-]+)/g)) {
      assert.ok(!seen.has(name), `@keyframes ${name} in ${seen.get(name)} and ${f}`);
      seen.set(name, f);
    }
  }
});

test("the Tailwind theme's breakpoints are values, not var()", () => {
  const tw = read("dist/tailwind-theme.css");
  assert.match(tw, /--breakpoint-sm: 40rem;/);
  assert.doesNotMatch(tw, /--breakpoint-[\w-]+: var\(/);
});

test("the pattern's tile repeats at side × (1 + √2)", () => {
  const { d, period } = tile(32, 67.5);
  assert.equal(Math.round(period * 1000) / 1000, Math.round(32 * (1 + Math.SQRT2) * 1000) / 1000);
  assert.match(d, /^M[\d.\- ]+L/);
});

test("nothing kept 'until' a version outlives it", () => {
  // A deprecation says when it goes ("kept until 0.3"). Once the package
  // reaches that version, the release must have removed it.
  const [major, minor] = JSON.parse(read("package.json")).version.split(".").map(Number);
  const files = [
    ...cssFiles, "tokens/tokens.json", "README.md",
    ...readdirSync(join(root, "js")).filter((f) => f.endsWith(".js")).map((f) => `js/${f}`),
    ...readdirSync(join(root, "docs"), { recursive: true }).filter((f) => f.endsWith(".md")).map((f) => `docs/${f}`),
  ];
  const overdue = [];
  for (const f of files) {
    read(f).split("\n").forEach((line, i) => {
      for (const [, a, b] of line.matchAll(/\buntil (\d+)\.(\d+)\b/gi)) {
        if (major > Number(a) || (major === Number(a) && minor >= Number(b))) overdue.push(`${f}:${i + 1}: ${line.trim()}`);
      }
    });
  }
  assert.deepEqual(overdue, []);
});

test("every component spec, and the README, has its Arabic translation, and no other", () => {
  const specs = (dir) => readdirSync(join(root, dir)).filter((f) => f.endsWith(".md")).sort();
  assert.deepEqual(specs("docs/components/ar"), specs("docs/components"));
  assert.deepEqual(specs("ar"), ["README.md"]);
});

test("every relative link in the README and the component specs, English and Arabic, resolves", () => {
  const broken = [];
  const files = [".", "ar", "docs/components", "docs/components/ar"].map((dir) => [dir, dir === "." ? ["README.md"] : readdirSync(join(root, dir)).filter((x) => x.endsWith(".md"))]);
  for (const [dir, list] of files) {
    for (const f of list) {
      // Links outside code: fenced blocks and inline code are dropped first.
      const text = read(`${dir}/${f}`).replace(/```[\s\S]*?```/g, "").replace(/`[^`\n]*`/g, (m) => (m.includes("](") ? m : ""));
      for (const [, href] of text.matchAll(/\]\(([^)\s]+)\)/g)) {
        if (/^(https?:|#|mailto:)/.test(href)) continue;
        const target = join(root, dir, href.split("#")[0]);
        try { readFileSync(target); } catch { broken.push(`${dir}/${f}: ${href}`); }
      }
    }
  }
  assert.deepEqual(broken, []);
});
