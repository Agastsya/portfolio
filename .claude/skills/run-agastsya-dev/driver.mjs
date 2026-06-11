#!/usr/bin/env node
/**
 * Driver for the agastsya.dev portfolio (Vite + React SPA).
 *
 * Launches the Vite dev server (unless --url is given), drives the page with
 * Playwright using the locally installed Google Chrome (channel "chrome" —
 * no browser download needed), exercises one real user flow, and drops
 * screenshots next to this script in shots/.
 *
 * Usage:
 *   node .claude/skills/run-agastsya-dev/driver.mjs            # full smoke run
 *   node .claude/skills/run-agastsya-dev/driver.mjs --url http://localhost:5173
 *   node .claude/skills/run-agastsya-dev/driver.mjs --keep     # leave server running
 */
import { chromium } from "playwright-core";
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..", "..");
const shots = join(here, "shots");
mkdirSync(shots, { recursive: true });

const args = process.argv.slice(2);
const argUrl = args.includes("--url") ? args[args.indexOf("--url") + 1] : null;
const keep = args.includes("--keep");
const PORT = 5199;

let server = null;
async function startServer() {
  server = spawn("npx", ["vite", "--port", String(PORT), "--strictPort"], {
    cwd: root, stdio: ["ignore", "pipe", "pipe"],
  });
  const url = `http://localhost:${PORT}/`;
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(url);
      if (r.ok) return url;
    } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("vite dev server did not come up on " + url);
}

const fail = (msg) => { console.error("FAIL: " + msg); process.exitCode = 1; };

try {
  const url = argUrl ?? (await startServer());
  console.log("target:", url);

  const browser = await chromium.launch({ channel: "chrome", headless: true });

  // --- desktop pass -------------------------------------------------------
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(url, { waitUntil: "networkidle" });

  // sanity: hero rendered
  const h1 = await page.locator("h1").first().textContent();
  if (!/can't afford/i.test(h1 ?? "")) fail("hero h1 not found, got: " + h1);

  await page.screenshot({ path: join(shots, "desktop-hero.png") });

  // scroll through the page so IntersectionObserver reveals + counters fire
  await page.evaluate(async () => {
    const step = window.innerHeight / 2;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
  });

  // real user flow: type into the terminal widget and check the response
  await page.locator("#dashboard input").scrollIntoViewIfNeeded();
  await page.locator("#dashboard input").fill("wins");
  await page.locator("#dashboard input").press("Enter");
  const termOut = await page.locator("#dashboard").textContent();
  if (!termOut?.includes("Microsoft Hackmania")) fail("terminal 'wins' command gave no output");

  await page.locator("#projects").scrollIntoViewIfNeeded();
  await page.waitForTimeout(900); // let reveal transitions settle
  await page.screenshot({ path: join(shots, "desktop-projects.png") });

  await page.locator("#dashboard").scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  await page.screenshot({ path: join(shots, "desktop-dashboard.png") });

  // three.js art bands (warp + orbit scenes)
  await page.locator(".art-band").first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  await page.screenshot({ path: join(shots, "desktop-band-warp.png") });
  await page.locator(".art-band").nth(1).scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  await page.screenshot({ path: join(shots, "desktop-band-planets.png") });

  // --- mobile pass --------------------------------------------------------
  const mob = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mob.goto(url, { waitUntil: "networkidle" });
  await mob.screenshot({ path: join(shots, "mobile-hero.png") });

  await browser.close();
  console.log(process.exitCode ? "DONE WITH FAILURES" : "OK — screenshots in " + shots);
} finally {
  if (server && !keep) server.kill("SIGTERM");
  if (server && keep) { console.log("dev server left running on port " + PORT); server.unref(); }
}
