// The Build page: a reader composes a crest from the package's own drawings, a frame, a motif, how many, how they are set out and which way
// it turns, in a row of tabs with their chips under; the crest draws itself, is named in English and Japanese, says which crest of the
// catalogue has the same parts, and can be kept as SVG. The crest and its choices stand on one screen, and nothing spills past it.
import fs from "node:fs";

import { expect, test } from "@playwright/test";

import { WORDS } from "../demo/words.js";
import { FAMILY_WORDS } from "../scripts/family-template.mjs";

const open = async (page, query = "") => {
  await page.goto(`/build/${query}`);
  await expect(page.locator('main[data-ready="true"]')).toBeAttached();
  await expect(page.getByTestId("bld-pic").locator("svg")).toHaveCount(1);
};
const tab = (page, name) => page.getByTestId(`bld-tab-${name}`);
const chip = (page, value) => page.locator(`#bld-chips [data-value="${value}"]`);

test("shows the crest drawing itself, named in both languages, with the five choices in a row", async ({ page }) => {
  await open(page);
  await expect(page.getByTestId("bld-name")).toHaveText("Plum bowl, three clustered in a medium ring");
  await expect(page.getByTestId("bld-name-other")).toHaveText("丸に三つ盛り梅鉢");
  // It draws itself with the construction animation every crest uses: styles and keyframes, and the guides rubbed out at the end.
  await expect(page.getByTestId("bld-pic").locator("svg style")).toContainText("@keyframes");
  await expect(page.getByTestId("bld-tabs").locator("[role=tab]")).toHaveCount(5);
  await expect(tab(page, "frame")).toContainText("Medium ring");
  await expect(tab(page, "motif")).toContainText("Plum blossom");
  await expect(tab(page, "count")).toContainText("3");
  await expect(tab(page, "arrangement")).toContainText("In a ring");
  await page.getByTestId("bld-finished").click();
  await expect(page.getByTestId("bld-pic").locator("svg style")).toHaveCount(0);
  await page.getByTestId("bld-draw").click();
  await expect(page.getByTestId("bld-pic").locator("svg style")).toContainText("@keyframes");
});

test("changes the crest and its name with each choice: frame, motif, count, arrangement", async ({ page }) => {
  await open(page);
  await tab(page, "frame").click();
  await chip(page, "none").click();
  await expect(page.getByTestId("bld-name-other")).toHaveText("三つ盛り梅鉢");
  await tab(page, "motif").click();
  await page.locator('#bld-chips [data-value="animal"]').click();
  await page.locator('#bld-chips [data-value="rabbit"]').click();
  await expect(page.getByTestId("bld-name")).toHaveText("Rabbit, three clustered");
  await expect(page.getByTestId("bld-name-other")).toHaveText("三つ盛り兎");
  await tab(page, "count").click();
  await chip(page, "5").click();
  await expect(page.getByTestId("bld-name-other")).toHaveText("五つ盛り兎");
  await tab(page, "arrangement").click();
  await chip(page, "radial").click();
  await expect(page.getByTestId("bld-name-other")).toHaveText("五つ巡り兎");
  // A pair has a count of two: choosing it moves the count there.
  await chip(page, "facing").click();
  await expect(page.getByTestId("bld-name")).toHaveText("Rabbit, a facing pair");
  await expect(tab(page, "count")).toContainText("2");
  await expect(page).toHaveURL(/arr=facing/);
});

test("says when the parts are a crest of the catalogue, links its card and names its houses", async ({ page }) => {
  await open(page, "?frame=none&motif=karahana&count=3&arr=ring");
  await expect(page.getByTestId("bld-name-other")).toHaveText("三つ盛り唐花");
  const match = page.getByTestId("bld-match");
  await expect(match).toHaveAttribute("data-found", "mitsumori-karahana");
  await expect(match).toContainText("The catalogue has a crest with these parts: Three clustered arabesque flowers");
  await expect(match).toContainText("No house is recorded for it.");
  await page.getByTestId("bld-match-mitsumori-karahana").click();
  await expect(page).toHaveURL(/\?open=mitsumori-karahana/);
  await expect(page.getByTestId("detail-title")).toBeVisible();
});

test("is that very crest when one copy is drawn the way the catalogue draws it, and new when nothing has its parts", async ({ page }) => {
  await open(page, "?frame=ring-medium&motif=plum&count=1&arr=single");
  const match = page.getByTestId("bld-match");
  await expect(match).toHaveAttribute("data-found", "maru-ni-ume-bachi");
  await expect(match).toHaveAttribute("data-same", "true");
  await expect(match).toContainText("This is a crest in the catalogue: Plum bowl in a circle");
  await open(page, "?frame=ring-medium&motif=plum&count=3&arr=ring");
  await expect(page.getByTestId("bld-match")).toContainText("Not in the catalogue yet");
});

test("offers a turn only where the motif is not the same mirrored", async ({ page }) => {
  await open(page, "?frame=none&motif=tomoe&count=3&arr=radial&tab=turn");
  await expect(page.getByTestId("bld-name-other")).toHaveText("三つ巡り左巴");
  await expect(chip(page, "mirror")).toBeEnabled();
  await chip(page, "mirror").click();
  await expect(page.getByTestId("bld-name-other")).toHaveText("三つ巡り右巴");
  await expect(page.getByTestId("bld-name")).toHaveText("Right tomoe, three turned about the centre");
  await open(page, "?frame=none&motif=plum&count=1&arr=single&tab=turn");
  await expect(chip(page, "mirror")).toBeDisabled();
  await expect(page.getByTestId("bld-about")).toContainText("looks the same mirrored");
});

test("keeps the crest as an SVG file named in both languages", async ({ page }) => {
  await open(page, "?frame=ring-thin&motif=bellflower&count=3&arr=rows");
  const [download] = await Promise.all([page.waitForEvent("download"), page.getByTestId("bld-download").click()]);
  expect(download.suggestedFilename()).toBe("kamon-ring-thin-bellflower-rows-3.svg");
  const svg = fs.readFileSync(await download.path(), "utf8");
  expect(svg).toContain('width="100mm"');
  expect(svg).toMatch(/<title>Bellflower, three side by side in a thin ring \/ 丸に三つ並び桔梗<\/title>/);
  expect(svg).not.toContain("currentColor");
  expect(svg).not.toContain("@keyframes");
});

test("has the crest, its name and its choices on one screen, and nothing spills past it", async ({ page }) => {
  await open(page);
  for (const name of ["frame", "motif", "count", "arrangement", "turn"]) {
    await tab(page, name).click();
    await page.locator(".fam-panel").evaluate((node) => window.scrollTo(0, node.getBoundingClientRect().top + window.scrollY - 8));
    const box = async (selector) => page.locator(selector).first().boundingBox();
    const [pic, tabs, chips, height] = [await box("#bld-pic"), await box("#bld-tabs, .bld-tabs"), await box("#bld-chips"), page.viewportSize().height];
    expect(pic.y).toBeGreaterThanOrEqual(0);
    expect(tabs.y + tabs.height).toBeLessThanOrEqual(height);
    expect(chips.y + Math.min(chips.height, 120)).toBeLessThanOrEqual(height);
  }
  const wide = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(wide).toBeLessThanOrEqual(0);
});

test("follows the page's language, and its header links to it from the catalogue", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('a[href="build/"]')).toBeVisible();
  await page.locator('a[href="build/"]').click();
  await expect(page).toHaveURL(/\/build\/$/);
  await open(page, "?lang=ja");
  await expect(page.locator("#bld-title")).toHaveText(WORDS.ja.bld_title);
  await expect(page.getByTestId("bld-name")).toHaveText("丸に三つ盛り梅鉢");
  await expect(page.getByTestId("bld-name-other")).toHaveText("Plum bowl, three clustered in a medium ring");
  await expect(tab(page, "count")).toContainText("三");
});

for (const lang of ["en", "ja"]) {
  test(`shows words and never a word's key, in ${lang}`, async ({ page }) => {
    const KEYS = new Set([WORDS.en, WORDS.ja, FAMILY_WORDS.en, FAMILY_WORDS.ja].flatMap((words) => Object.keys(words)));
    const errors = [];
    page.on("console", (message) => message.type() === "error" && errors.push(message.text()));
    page.on("pageerror", (error) => errors.push(String(error)));
    await open(page, `?lang=${lang}`);
    const texts = [];
    for (const name of ["frame", "motif", "count", "arrangement", "turn"]) {
      await tab(page, name).click();
      texts.push(...(await page.evaluate(() => {
        const found = [];
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        for (let node = walker.nextNode(); node !== null; node = walker.nextNode()) if (node.textContent.trim() !== "" && node.parentElement.closest("script, style") === null) found.push(node.textContent.trim());
        for (const attribute of ["aria-label", "title"]) for (const node of document.querySelectorAll(`[${attribute}]`)) found.push(node.getAttribute(attribute).trim());
        return found;
      })));
    }
    expect(texts.length).toBeGreaterThan(40);
    expect(texts.filter((text) => /^[a-z]+(_[a-z]+)+$/.test(text) || KEYS.has(text))).toEqual([]);
    expect(errors).toEqual([]);
  });
}
