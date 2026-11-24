// Draws crests from their definitions into a PNG to look at while writing them.
//   node scripts/preview.ts out.png 8851 [ids…] [--size 300] [--cols 6]
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import process from "node:process";

import { chromium } from "@playwright/test";

import { ALL } from "./crests/index.ts";
import { staticSvg } from "../src/render.ts";
import { make } from "./construct/make.ts";

const args = process.argv.slice(2);
const out = args.shift() ?? "preview.png";
args.shift(); // a port is asked for, and none is opened: this only draws
const flag = (name: string, fallback: number): number => {
  const at = args.indexOf(`--${name}`);
  if (at < 0) return fallback;
  const value = Number(args[at + 1]);
  args.splice(at, 2);

  return value;
};
const size = flag("size", 300);
const cols = flag("cols", 6);
const guides = args.includes("--guides");
const ids = args.filter((a) => !a.startsWith("--"));
const chosen = ids.length === 0 ? ALL : ALL.filter((c) => ids.some((i) => c.id.includes(i)));
const cells = chosen.map((def) => `<figure><div class="p">${staticSvg(make(def), { guides })}</div><figcaption>${def.id}</figcaption></figure>`).join("");
const html = `<!doctype html><meta charset="utf-8"><style>body{margin:0;background:#f3efe4;color:#1b1b1b;font:11px system-ui}main{display:grid;grid-template-columns:repeat(${cols},${size}px);gap:12px;padding:12px}figure{margin:0;text-align:center}.p svg{width:${size}px;height:${size}px;background:#fff;display:block}figcaption{margin-top:2px}</style><main>${cells}</main>`;
mkdirSync(dirname(out), { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: cols * (size + 12) + 12, height: 400 }, deviceScaleFactor: 1 });
await page.setContent(html);
const png = await page.screenshot({ fullPage: true });
writeFileSync(out, png);
await browser.close();
console.log(`${chosen.length} crests -> ${out}`);
