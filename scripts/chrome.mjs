// Headless Chrome, driven over its DevTools protocol, for the scripts that
// draw the brand's images from the system itself (badges.mjs, social.mjs):
// a page written to a file, loaded with the system's CSS and fonts, and
// photographed on a transparent ground. Needs Chrome or Chromium (CHROME= to
// say where) and Node 22+ (for its WebSocket). No packages.

import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const PORT = 9357;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function binary() {
  if (process.env.CHROME) return process.env.CHROME;
  const mac = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  if (existsSync(mac)) return mac;
  for (const name of ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser"]) {
    if (spawnSync("which", [name]).status === 0) return name;
  }
  throw new Error("no Chrome or Chromium found: set CHROME to one");
}

/**
 * Starts Chrome, gives `draw` a `shoot(html, png, { width, height, scale, clip })`
 * (clip: the id of the element to crop to, or the whole viewport), and stops
 * Chrome when it's done.
 */
export async function withChrome(draw) {
  const work = mkdtempSync(join(tmpdir(), "arabesque-chrome-"));
  const browser = spawn(binary(), ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
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

    let n = 0;
    const shoot = async (html, png, { width, height, scale = 1, clip }) => {
      const file = join(work, `page-${++n}.html`);
      writeFileSync(file, html);
      await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: scale, mobile: false });
      await send("Page.navigate", { url: pathToFileURL(file).href });
      await sleep(300);
      await evaluate("document.fonts.ready.then(() => true)");
      const box = clip
        ? await evaluate(`(() => { const r = document.getElementById(${JSON.stringify(clip)}).getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; })()`)
        : { x: 0, y: 0, width, height };
      const shot = await send("Page.captureScreenshot", { format: "png", clip: { x: Math.floor(box.x), y: Math.floor(box.y), width: Math.ceil(box.width + box.x % 1), height: Math.ceil(box.height + box.y % 1), scale: 1 } });
      writeFileSync(png, Buffer.from(shot.result.data, "base64"));
    };
    await draw(shoot);
    ws.close();
  } finally {
    browser.kill();
    try { rmSync(work, { recursive: true, force: true, maxRetries: 5 }); } catch {}
  }
}
