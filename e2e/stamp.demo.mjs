// The built site's addresses: every local script and stylesheet says which build it is from, so that a browser which kept a
// file of the last build never runs it under the page of this one.
import fs from "node:fs";
import path from "node:path";

import { expect, test } from "@playwright/test";

const files = fs.readdirSync("site", { recursive: true }).map(String);
const read = (name) => fs.readFileSync(path.join("site", name), "utf8");

test("stamps every local import, script and stylesheet of the built site, all with the one build", () => {
  const stamps = new Set();
  const bare = [];
  let stamped = 0;
  const hold = (name, address) => {
    const stamp = /\?v=([\w.-]+)$/.exec(address)?.[1];
    if (stamp === undefined) return bare.push(`${name}: ${address}`);
    stamps.add(stamp);
    stamped += 1;
  };
  for (const name of files.filter((one) => one.endsWith(".js"))) {
    // Any quoted address of a script beside this one, wherever it stands: an import is one, however it is written.
    for (const [, address] of read(name).matchAll(/["'`](\.\.?\/[^"'`\s]*\.js[^"'`\s]*)["'`]/g)) hold(name, address);
  }
  for (const name of files.filter((one) => one.endsWith(".html"))) {
    for (const [tag] of read(name).matchAll(/<(?:script|link)\b[^>]*>/g)) {
      const address = /\s(?:src|href)="([^"]*)"/.exec(tag)?.[1];
      if (address !== undefined && !/^([a-z]+:|\/\/)/.test(address)) hold(name, address);
    }
  }
  expect(bare).toEqual([]);
  expect(stamped).toBeGreaterThan(60);
  expect([...stamps]).toHaveLength(1);
});

test("asks for no script or stylesheet without its stamp, on the page, in a card and in the API reference", async ({ page, baseURL }) => {
  const asked = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.origin === new URL(baseURL).origin && /\.(js|css)$/.test(url.pathname)) asked.push(url);
  });
  await page.goto("/");
  await page.getByTestId("tile-mitsu-icho").click();
  await expect(page.getByTestId("detail")).toBeVisible();
  await page.getByTestId("draw").click();
  await expect(page.getByTestId("detail-crest").locator("svg style")).toBeAttached();
  await page.goto("/api.html");
  expect(asked.filter((url) => !url.searchParams.has("v")).map((url) => url.pathname)).toEqual([]);
  expect(asked.map((url) => url.pathname)).toEqual(expect.arrayContaining(["/demo.js", "/words.js", "/dist/animate.js", "/dist/load.js", "/dist/steps/mitsu-icho.js", "/family.css", "/kamon.css", "/api.css"]));
  expect(new Set(asked.map((url) => url.searchParams.get("v"))).size).toBe(1);
});
