/**
 * Verification screenshots (CLAUDE.md gate): every route at 390 / 768 / 1440 px,
 * plus scroll positions through the home journey at desktop width.
 * Usage: node scripts/screenshot.mjs [baseURL]   (default http://localhost:4173)
 */
import { chromium } from "playwright";
import { mkdirSync } from "fs";

const BASE = process.argv[2] ?? "http://localhost:4173";
const OUT = "screenshots";
mkdirSync(OUT, { recursive: true });

const ROUTES = [
  ["home", "/"],
  ["work", "/work"],
  ["work-detail", "/work/instagram-dm-engine"],
  ["book", "/book"],
  ["quantum", "/quantum"],
  ["blog-post", "/blog/quantum-computing-plain-language"],
  ["service-page", "/services/ai-agents"],
  ["legal", "/legal/privacy"],
  ["404", "/nope"],
];
const WIDTHS = [390, 768, 1440];

const browser = await chromium.launch();
const errors = [];

for (const width of WIDTHS) {
  const page = await browser.newPage({
    viewport: { width, height: width < 500 ? 844 : 900 },
  });
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`[${width}] ${msg.text()}`);
  });
  page.on("pageerror", (err) => errors.push(`[${width}] PAGEERROR ${err.message}`));

  for (const [name, path] of ROUTES) {
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    await page.waitForTimeout(1600); // let intro + entrance animations settle
    await page.screenshot({ path: `${OUT}/${name}-${width}.png` });
  }

  // journey scroll positions (desktop only)
  if (width === 1440) {
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await page.waitForTimeout(1800);
    const total = await page.evaluate(
      () => document.body.scrollHeight - window.innerHeight
    );
    for (let i = 1; i <= 8; i++) {
      await page.evaluate((y) => window.scrollTo(0, y), (total * i) / 8);
      await page.waitForTimeout(1100);
      await page.screenshot({ path: `${OUT}/journey-${i}-1440.png` });
    }
  }
  await page.close();
}

await browser.close();

if (errors.length) {
  console.log("CONSOLE ERRORS FOUND:");
  for (const e of errors) console.log("  " + e);
  process.exitCode = 1;
} else {
  console.log("No console errors. Screenshots in ./screenshots");
}
