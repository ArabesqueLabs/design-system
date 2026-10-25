// The head every page of the site shares (scripts/build-react.mjs's head()),
// checked in the pages the build wrote: each has its address, says how it
// shows when shared, and points at its other language's page, which points
// back.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");
const SITE = "https://design.arabesquelabs.com/";

// Every page but the templates (a product's homepage, not the site's): the
// homepage and the Elements page in each language, the examples, and the documents' pages.
const pages = [
  "index.html", "ar/index.html", "elements/index.html", "ar/elements/index.html", "ar/README.html", "README.html", "CHANGELOG.html", "templates/README.html",
  ...readdirSync(join(root, "examples")).filter((f) => f.endsWith(".html")).map((f) => `examples/${f}`),
  ...readdirSync(join(root, "docs"), { recursive: true }).filter((f) => f.endsWith(".html")).map((f) => `docs/${f}`),
];
const meta = (html, key) => html.match(new RegExp(`<meta (?:property|name)="${key}" content="([^"]*)">`))?.[1];
/** The file an address on the site serves: /README is README.html, /ar/ is ar/index.html. */
const fileOf = (url) => {
  const path = url.slice(SITE.length);
  return path === "" || path.endsWith("/") ? `${path}index.html` : `${path}.html`;
};

test("every page has its address, and says how it shows when shared", () => {
  for (const page of pages) {
    const html = read(page);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)">/)?.[1];
    assert.ok(canonical?.startsWith(SITE), `${page}: canonical`);
    assert.equal(fileOf(canonical), page, `${page}: its canonical address serves it`);
    for (const key of ["og:title", "og:description", "og:url", "og:image", "og:image:alt", "twitter:card", "twitter:title", "twitter:image"]) {
      assert.ok(meta(html, key), `${page}: ${key}`);
    }
    assert.equal(meta(html, "og:url"), canonical, `${page}: og:url is its address`);
    const image = meta(html, "og:image");
    assert.ok(existsSync(join(root, image.slice(SITE.length))), `${page}: ${image} exists`);
    const data = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)[1]);
    assert.equal(data["@context"], "https://schema.org", `${page}: schema.org`);
    assert.ok(data["@graph"].some((n) => n.url === canonical), `${page}: its schema.org page is it`);
  }
});

test("a page in both languages points at the other, which points back", () => {
  for (const page of pages) {
    const html = read(page);
    const alternates = Object.fromEntries([...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">/g)].map((m) => [m[1], m[2]]));
    if (!Object.keys(alternates).length) continue;
    assert.deepEqual(Object.keys(alternates).sort(), ["ar", "en", "x-default"], page);
    assert.equal(alternates["x-default"], alternates.en, `${page}: x-default is the English`);
    const lang = html.match(/<html lang="(\w+)"/)[1];
    assert.equal(fileOf(alternates[lang]), page, `${page}: its own language's address is it`);
    const other = fileOf(alternates[lang === "ar" ? "en" : "ar"]);
    assert.ok(existsSync(join(root, other)), `${page}: ${other} exists`);
    assert.ok(read(other).includes(`hreflang="${lang}" href="${alternates[lang]}"`), `${other} points back at ${page}`);
  }
});

test("the showcase says which version it is, linked to its changelog section", () => {
  const { version } = JSON.parse(read("package.json"));
  for (const page of ["index.html", "ar/index.html"]) {
    const link = read(page).match(new RegExp(`<a href="([^"]*CHANGELOG\\.html)#([^"]+)"><bdi dir="ltr">${version.replace(/\./g, "\\.")}</bdi></a>`));
    assert.ok(link, `${page}: version ${version}`);
    assert.ok(read("CHANGELOG.html").includes(`id="${link[2]}"`), `${page}: CHANGELOG.html#${link[2]}`);
  }
});
