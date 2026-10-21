#!/usr/bin/env node
// The social card: the picture shown when a page of the site is shared (its
// Open Graph and X card image, scripts/build-react.mjs's head()), 1200×630,
// in English and in Arabic. Drawn by the system itself (dist/arabesque.css,
// its fonts, its dark theme, the pattern from js/pattern.js, the attribution
// line) in headless Chrome (chrome.mjs):
//
//   dist/brand/social/card-en.png, card-ar.png
//
//   node scripts/social.mjs        (after `npm run build`)
//
// No version on it: sites keep a shared page's picture for weeks. Run it when
// the brand or the words change; the images are kept, as the rest of dist/ is.

import { mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { tile } from "../js/pattern.js";
import { withChrome } from "./chrome.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "dist/brand/social");

// The marks as the logo pack draws them, without their titles: decoration beside the words.
const mark = (file) => readFileSync(join(root, "assets/brand", file), "utf8")
  .replace(/<title[^>]*>[\s\S]*?<\/title>|<desc[^>]*>[\s\S]*?<\/desc>/g, "")
  .replace(/ role="img" aria-labelledby="[^"]*"/, ' class="al-mark" aria-hidden="true"')
  .replace(/ width="\d+" height="\d+"/, "");

const WORDS = {
  en: {
    name: "Arabesque",
    product: "Design system",
    title: "One design system for every Arabesque Labs product.",
    lede: "Accessible, and written for left to right and right to left from the start.",
    by: "A product of",
    company: "Arabesque Labs",
  },
  ar: {
    name: "آرابيسك",
    product: "نظام التصميم",
    title: "نظام تصميم واحد لكل منتجات معامل آرابيسك.",
    lede: "سهل الوصول، ومكتوب من اليسار إلى اليمين ومن اليمين إلى اليسار منذ البداية.",
    by: "من منتجات",
    company: "معامل آرابيسك",
  },
};

// The tessellation at a card's scale, as drawPattern draws it in a page.
const { d, period } = tile(48);
const pattern = `<svg xmlns="http://www.w3.org/2000/svg"><defs><pattern id="p" width="${period}" height="${period}" patternUnits="userSpaceOnUse"><path d="${d}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="miter" stroke-linecap="square"/></pattern></defs><rect width="100%" height="100%" fill="url(#p)"/></svg>`;

const page = (lang) => {
  const w = WORDS[lang];
  return `<!doctype html>
<html lang="${lang}" dir="${lang === "ar" ? "rtl" : "ltr"}" data-theme="dark">
<head><meta charset="utf-8">
<link rel="stylesheet" href="${pathToFileURL(join(root, "fonts/fonts.css"))}">
<link rel="stylesheet" href="${pathToFileURL(join(root, "dist/arabesque.css"))}">
<style>
  html, body { margin: 0; }
  .card {
    box-sizing: border-box; inline-size: 1200px; block-size: 630px; padding: 72px 80px;
    display: flex; flex-direction: column; justify-content: space-between;
    background: var(--al-color-bg); color: var(--al-color-text);
  }
  .card .al-lockup { font-size: 34px; }
  .card__words { max-inline-size: 760px; display: flex; flex-direction: column; gap: 24px; }
  .card__title { margin: 0; font-family: var(--al-font-display); font-weight: var(--al-weight-regular); font-size: 60px; line-height: 1.12; letter-spacing: var(--al-tracking-tight); text-wrap: balance; }
  .card__lede { margin: 0; font-size: 26px; line-height: 1.4; color: var(--al-color-text-muted); text-wrap: pretty; }
  .card__foot { display: flex; align-items: center; justify-content: space-between; }
  .card__site { font-size: 22px; color: var(--al-color-text-muted); }
  .card .al-attribution { font-size: 20px; }
</style>
</head><body>
<div class="card al-pattern">
  <div class="al-pattern__art" aria-hidden="true">${pattern}</div>
  <span class="al-lockup">${mark("arabesque-mark.svg")}<span class="al-wordmark" lang="${lang}">${w.name}</span><span class="al-lockup__product">${w.product}</span></span>
  <div class="card__words">
    <p class="card__title">${w.title}</p>
    <p class="card__lede">${w.lede}</p>
  </div>
  <div class="card__foot">
    <span class="card__site" dir="ltr">design.arabesquelabs.com</span>
    <span class="al-attribution">${mark("mark.svg")}<span>${w.by} <span class="al-attribution__name" lang="${lang}">${w.company}</span></span></span>
  </div>
</div>
</body></html>`;
};

mkdirSync(out, { recursive: true });
await withChrome(async (shoot) => {
  for (const lang of ["en", "ar"]) await shoot(page(lang), join(out, `card-${lang}.png`), { width: 1200, height: 630 });
});
console.log("social: card-en.png and card-ar.png in dist/brand/social");
