#!/usr/bin/env node
// The attribution badge as images, for where the component can't go: a
// README, a package or app store page, an email, a slide. Each wording, in
// English and Arabic, for light grounds and dark, with the mark or the star,
// drawn by the component itself (dist/arabesque.css, with the system's
// fonts) in headless Chrome, on a transparent ground, at 1x and 2x:
//
//   dist/brand/badges/{product-of,by}-{en,ar}-{light,dark}[-star].png, and @2x
//
//   node scripts/badges.mjs        (after `npm run build`; needs Chrome or
//                                   Chromium, CHROME= to say where)
//
// Run it when the component or the brand changes; the images are kept, as
// the rest of dist/ is. Chrome is driven by chrome.mjs.

import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { withChrome } from "./chrome.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "dist/brand/badges");

// The mark and the star, as react/src/brand.tsx's Mark and Star draw them.
const MARK_PATHS = [
  "M9.37 -9.37L5.49 0L9.37 9.37L0 5.49L-9.37 9.37L-5.49 0L-9.37 -9.37L0 -5.49Z M73.37 -9.37L69.49 0L73.37 9.37L64 5.49L54.63 9.37L58.51 0L54.63 -9.37L64 -5.49Z M9.37 54.63L5.49 64L9.37 73.37L0 69.49L-9.37 73.37L-5.49 64L-9.37 54.63L0 58.51Z M73.37 54.63L69.49 64L73.37 73.37L64 69.49L54.63 73.37L58.51 64L54.63 54.63L64 58.51Z",
  "M64 32L48 38.63L54.63 54.63L38.63 48L32 64L25.37 48L9.37 54.63L16 38.63L0 32L16 25.37L9.37 9.37L25.37 16L32 0L38.63 16L54.63 9.37L48 25.37Z",
];
const STAR = "M64 32L48 38.63L54.63 54.63L38.63 48L32 64L25.37 48L9.37 54.63L16 38.63L0 32L16 25.37L9.37 9.37L25.37 16L32 0L38.63 16L54.63 9.37L48 25.37Z";
const WORDS = {
  "product-of": { en: "A product of", ar: "من منتجات" },
  by: { en: "By", ar: "من" },
};
const NAME = { en: "Arabesque Labs", ar: "معامل آرابيسك" };

const MARKS = {
  mark: `<svg class="al-mark" viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="3.2" stroke-linejoin="miter">` +
    MARK_PATHS.map((d) => `<path d="${d}"/>`).join("") + `<rect x="1.6" y="1.6" width="60.8" height="60.8"/></g></svg>`,
  star: `<svg class="al-mark" viewBox="0 0 64 64" aria-hidden="true"><path d="${STAR}" fill="currentColor"/></svg>`,
};

const badge = (wording, lang, mark) =>
  `<span class="al-attribution al-attribution--lg${mark === "star" ? " al-attribution--star" : ""}" id="badge">${MARKS[mark]}` +
  `<span>${WORDS[wording][lang]} <span class="al-attribution__name" lang="${lang}">${NAME[lang]}</span></span></span>`;

const page = (wording, lang, theme, mark) => `<!doctype html>
<html lang="${lang}" dir="${lang === "ar" ? "rtl" : "ltr"}" data-theme="${theme}">
<head><meta charset="utf-8">
<link rel="stylesheet" href="${pathToFileURL(join(root, "fonts/fonts.css"))}">
<link rel="stylesheet" href="${pathToFileURL(join(root, "dist/arabesque.css"))}">
<style>html, body { background: transparent !important; margin: 0; } body { padding: 8px; display: inline-block; }</style>
</head><body>${badge(wording, lang, mark)}</body></html>`;

mkdirSync(out, { recursive: true });
let made = 0;
await withChrome(async (shoot) => {
  for (const wording of Object.keys(WORDS)) {
    for (const lang of ["en", "ar"]) {
      for (const theme of ["light", "dark"]) {
        for (const mark of ["mark", "star"]) {
          const name = `${wording}-${lang}-${theme}${mark === "star" ? "-star" : ""}`;
          for (const scale of [1, 2]) {
            await shoot(page(wording, lang, theme, mark), join(out, `${name}${scale === 2 ? "@2x" : ""}.png`), { width: 600, height: 200, scale, clip: "badge" });
            made++;
          }
        }
      }
    }
  }
});
console.log(`badges: ${made} images in dist/brand/badges`);
