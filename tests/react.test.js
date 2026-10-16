// The React layer (react/src) agrees with the rest of the system: the same
// geometry, the same icons, every CSS component covered, its examples all
// in Arabic too, and its build importing the helpers from where they are.
// Read from the sources, so it needs no React.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import AR from "../showcase-ar.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");
const src = readdirSync(join(root, "react/src")).map((f) => read(`react/src/${f}`)).join("\n");

test("the React mark is assets/brand/mark.svg's geometry", () => {
  const paths = (s) => [...s.matchAll(/(?:d=|")(M[\d .\-LZM]+Z)"/g)].map((m) => m[1]);
  assert.deepEqual(paths(read("react/src/brand.tsx")), paths(read("assets/brand/mark.svg")));
});

test("the React icon names are the sprite's", () => {
  const names = JSON.parse(read("react/src/icon.tsx").match(/iconNames = (\[[^\]]+\])/)[1]);
  assert.deepEqual(names, readdirSync(join(root, "icons")).filter((f) => f.endsWith(".svg")).map((f) => f.replace(/\.svg$/, "")).sort());
});

test("every CSS component is written by a React component", () => {
  // At least one of each file's own classes appears in react/src, or in a
  // helper it uses that makes the element itself (a toast, a tooltip).
  const helpers = [...new Set([...src.matchAll(/from "\.\.\/\.\.\/(js\/[\w-]+\.js)"/g)].map((m) => m[1]))].map(read).join("\n");
  const uncovered = readdirSync(join(root, "css/components")).filter((f) => {
    const classes = [...new Set([...read(`css/components/${f}`).replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/\.(al-[\w-]+)/g)].map((m) => m[1]))];
    return !classes.some((c) => src.includes(c) || new RegExp(`["\\s]${c}["\\s]`).test(helpers));
  });
  assert.deepEqual(uncovered, []);
});

test("the built components import the helpers from js/, which exist", () => {
  const built = read("dist/react/index.js");
  const imports = [...built.matchAll(/from "(\.\.\/\.\.\/js\/[\w-]+\.js)"/g)].map((m) => m[1]);
  assert.ok(imports.length > 5, "imports the helpers");
  for (const i of imports) assert.ok(existsSync(join(root, "dist/react", i)), `${i} from dist/react/`);
  assert.doesNotMatch(built, /new URL\("\.\.\/dist\/icons\.svg"/, "a helper bundled in would look for the sprite in the wrong place");
});

test("every sentence the examples write has Arabic", () => {
  // The build checks what renders; this checks what only shows after a click.
  const extra = Object.fromEntries([...read("examples/src/ar.ts").matchAll(/^\s*"(.+)": "/gm)].map((m) => [m[1].replace(/\\"/g, '"'), true]));
  const sources = readdirSync(join(root, "examples/src")).filter((f) => f.endsWith(".tsx")).map((f) => read(`examples/src/${f}`)).join("\n");
  const said = [...sources.matchAll(/\bt\("((?:[^"\\]|\\.)+)"\)/g)].map((m) => m[1].replace(/\\(.)/g, "$1"));
  const missing = [...new Set(said)].filter((s) => !(s in AR) && !(s in extra));
  assert.deepEqual(missing, []);
});

test("the component labels say the same things in English and Arabic", () => {
  const settings = read("react/src/settings.tsx");
  const keys = (name) => [...settings.match(new RegExp(`${name}: Labels = \\{([\\s\\S]*?)\\n\\};`))[1].matchAll(/^\s+(\w+):/gm)].map((m) => m[1]);
  assert.deepEqual(keys("arabicLabels"), keys("englishLabels"));
  // Placeholders survive translation.
  const values = (name) => Object.fromEntries([...settings.match(new RegExp(`${name}: Labels = \\{([\\s\\S]*?)\\n\\};`))[1].matchAll(/^\s+(\w+): "(.*)",$/gm)].map((m) => [m[1], m[2]]));
  const en = values("englishLabels");
  const ar = values("arabicLabels");
  for (const k of Object.keys(en)) {
    const holes = (s) => (s.match(/\{\w+\}/g) || []).sort().join();
    if (!/One$/.test(k)) assert.equal(holes(ar[k]), holes(en[k]), k);
  }
});
