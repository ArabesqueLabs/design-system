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
// the rest of dist/ is. Node 22+ (for its WebSocket). No packages.

import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "dist/brand/badges");
const PORT = 9357;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function chrome() {
  if (process.env.CHROME) return process.env.CHROME;
  const mac = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  if (existsSync(mac)) return mac;
  for (const name of ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser"]) {
    if (spawnSync("which", [name]).status === 0) return name;
  }
  throw new Error("no Chrome or Chromium found: set CHROME to one");
}

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
const work = mkdtempSync(join(tmpdir(), "badges-"));
const browser = spawn(chrome(), ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
  `--remote-debugging-port=${PORT}`, `--user-data-dir=${join(work, "profile")}`, "--no-first-run", "about:blank"], { stdio: "ignore" });
try {
  let target;
  for (let i = 0; i < 50 && !target; i++) {
    try { target = (await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()).find((t) => t.type === "page"); } catch {}
    if (!target) await sleep(200);
  }
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r));
  let id = 0;
  const waiting = new Map();
  ws.addEventListener("message", (m) => { const msg = JSON.parse(m.data); if (msg.id && waiting.has(msg.id)) { waiting.get(msg.id)(msg); waiting.delete(msg.id); } });
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; waiting.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
  const evaluate = async (expression) => (await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true })).result.result.value;
  await send("Page.enable");
  await send("Emulation.setDefaultBackgroundColorOverride", { color: { r: 0, g: 0, b: 0, a: 0 } });

  let made = 0;
  for (const wording of Object.keys(WORDS)) {
    for (const lang of ["en", "ar"]) {
      for (const theme of ["light", "dark"]) {
        for (const mark of ["mark", "star"]) {
          const name = `${wording}-${lang}-${theme}${mark === "star" ? "-star" : ""}`;
          const file = join(work, `${name}.html`);
          writeFileSync(file, page(wording, lang, theme, mark));
          for (const scale of [1, 2]) {
            await send("Emulation.setDeviceMetricsOverride", { width: 600, height: 200, deviceScaleFactor: scale, mobile: false });
            await send("Page.navigate", { url: pathToFileURL(file).href });
            await sleep(300);
            await evaluate("document.fonts.ready.then(() => true)");
            const box = await evaluate(`(() => { const r = document.getElementById("badge").getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; })()`);
            const shot = await send("Page.captureScreenshot", { format: "png", clip: { x: Math.floor(box.x), y: Math.floor(box.y), width: Math.ceil(box.width + box.x % 1), height: Math.ceil(box.height + box.y % 1), scale: 1 } });
            writeFileSync(join(out, `${name}${scale === 2 ? "@2x" : ""}.png`), Buffer.from(shot.result.data, "base64"));
            made++;
          }
        }
      }
    }
  }
  ws.close();
  console.log(`badges: ${made} images in dist/brand/badges`);
} finally {
  browser.kill();
  try { rmSync(work, { recursive: true, force: true, maxRetries: 5 }); } catch {}
}
