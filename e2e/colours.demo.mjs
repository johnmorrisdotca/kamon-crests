// Colouring the crest: the ink and the paper of the drawing, chosen on the crest card and on the Build page, applied live, never
// drawing the crest again, and written into the downloaded SVG; and the one Options fold, with the Parts fold beside it, that keeps the card's colours and rare switches out of sight.
import fs from "node:fs";
import { URLSearchParams } from "node:url";

import { expect, test } from "@playwright/test";

import { WORDS } from "../demo/words.js";

const SWITCHES = ["guides", "centres", "widths", "fill", "compass-arm", "widths-key", "ink-draw", "full-build", "exits", "invert"];

const openCard = async (page, query = "?open=maru-ni-mitsuba-aoi") => {
  const id = new URLSearchParams(query).get("open");
  await page.goto(`/${query}`, { waitUntil: "domcontentloaded" });
  const card = page.getByTestId("detail");
  const crest = card.getByTestId("detail-crest").and(page.locator(`[crest=${JSON.stringify(id)}]`));
  // The dialog opens before the requested crest has been loaded and drawn.
  expect(await crest.evaluate((e) => e.ready), `${id} was drawn`).toBe(true);
  await expect(card).toBeVisible();
  await expect(crest.locator("svg")).toHaveCount(1);
};
const saved = async (page, testid) => {
  const [download] = await Promise.all([page.waitForEvent("download"), page.getByTestId(testid).click()]);
  return fs.readFileSync(await download.path(), "utf8");
};
const colour = (locator, property) => locator.evaluate((node, name) => getComputedStyle(node)[name], property);

test("keeps the colours and the card's rare switches under one Options fold, closed to begin with, and the playback, size and full screen rows in sight", async ({ page }) => {
  await openCard(page);
  const fold = page.getByTestId("options");
  await expect(fold).toHaveText("Options");
  await expect(fold).toHaveAttribute("aria-expanded", "false");
  await expect(fold).toHaveAttribute("aria-controls", "options-panel");
  for (const name of [...SWITCHES, "colours", "colours-reset", "ink-8a1c1c", "paper-ffffff"]) await expect(page.getByTestId(name)).toBeHidden();
  for (const name of ["draw", "step-back", "play-pause", "step-forward", "loop", "scrub", "speed", "view", "full", "options", "card-parts"]) await expect(page.getByTestId(name)).toBeVisible();
  // Exactly two folds on the card: Options and Parts.
  await expect(page.locator("#detail [aria-expanded]")).toHaveCount(2);
  await fold.click();
  await expect(fold).toHaveAttribute("aria-expanded", "true");
  for (const name of [...SWITCHES, "colours", "colours-reset"]) await expect(page.getByTestId(name)).toBeVisible();
  // The colours are at the top of the panel, above the switches.
  const panel = await page.getByTestId("options-panel").boundingBox();
  const colours = await page.getByTestId("colours").boundingBox();
  const guides = await page.getByTestId("guides").boundingBox();
  expect(colours.y).toBeLessThan(guides.y);
  expect(colours.y - panel.y).toBeLessThan(8);
  // It stays as it was left, on this device.
  await openCard(page);
  await expect(page.getByTestId("options")).toHaveAttribute("aria-expanded", "true");
  await page.getByTestId("options").click();
  await openCard(page);
  await expect(page.getByTestId("options")).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByTestId("guides")).toBeHidden();
});

test("keeps working for a person who had the fold open when it was called Advanced", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("kamon-advanced", "open"));
  await openCard(page);
  await expect(page.getByTestId("options")).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByTestId("colours")).toBeVisible();
  // Closing it is remembered, and wins over the old key.
  await page.getByTestId("options").click();
  await openCard(page);
  await expect(page.getByTestId("options")).toHaveAttribute("aria-expanded", "false");
});

test("opens the Options fold from the keyboard, and shows where the focus is", async ({ page }) => {
  await openCard(page);
  const fold = page.getByTestId("options");
  await fold.focus();
  expect(await fold.evaluate((node) => getComputedStyle(node).outlineStyle)).not.toBe("none");
  await page.keyboard.press("Enter");
  await expect(fold).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByTestId("colours")).toBeVisible();
  await page.keyboard.press("Space");
  await expect(fold).toHaveAttribute("aria-expanded", "false");
});

test("says Options in Japanese, and a switch in the fold still works", async ({ page }) => {
  await openCard(page, "?open=maru-ni-mitsuba-aoi&lang=ja");
  await expect(page.getByTestId("options")).toHaveText(WORDS.ja.options);
  await page.getByTestId("options").click();
  await page.getByTestId("guides").click();
  await expect(page.getByTestId("guides")).toHaveAttribute("aria-pressed", "false");
});

test("colours the crest on the card live: ink and paper by swatch or by a colour of one's own, never drawing it again, and Reset", async ({ page }) => {
  await openCard(page);
  await page.getByTestId("options").click();
  const crest = page.getByTestId("detail-crest");
  await crest.locator("svg").evaluate((node) => (node.dataset.same = "yes"));
  const plainInk = await colour(crest, "color");
  await expect(page.getByTestId("colours-reset")).toBeDisabled();
  await page.getByTestId("ink-8a1c1c").click();
  await expect(page.getByTestId("ink-8a1c1c")).toHaveAttribute("aria-pressed", "true");
  expect(await colour(crest, "color")).toBe("rgb(138, 28, 28)");
  await page.getByTestId("paper-e6d3a3").click();
  expect(await colour(crest, "backgroundColor")).toBe("rgb(230, 211, 163)");
  await page.getByTestId("ink-field").fill("#336699");
  expect(await colour(crest, "color")).toBe("rgb(51, 102, 153)");
  await expect(page.getByTestId("ink-8a1c1c")).toHaveAttribute("aria-pressed", "false");
  // Applied live: the drawing on the page is the one that was there, not drawn again.
  await expect(crest.locator("svg")).toHaveAttribute("data-same", "yes");
  await expect(page.getByTestId("colours-reset")).toBeEnabled();
  await page.getByTestId("colours-reset").click();
  expect(await colour(crest, "color")).toBe(plainInk);
  expect(await colour(crest, "backgroundColor")).toBe("rgba(0, 0, 0, 0)");
  await expect(page.getByTestId("colours-reset")).toBeDisabled();
});

test("saves the chosen colours in the card's SVG: the ink as the colour, the paper as a square behind it only when one was chosen", async ({ page }) => {
  await openCard(page);
  await page.getByTestId("options").click();
  const plain = await saved(page, "download-svg");
  expect(plain).not.toMatch(/<rect width="200" height="200"/);
  await page.getByTestId("ink-field").fill("#336699");
  expect(await saved(page, "download-svg")).toContain("rgb(51, 102, 153)");
  expect(await saved(page, "download-svg")).not.toMatch(/<rect width="200" height="200"/);
  await page.getByTestId("paper-e6d3a3").click();
  const coloured = await saved(page, "download-svg");
  expect(coloured).toContain("rgb(51, 102, 153)");
  expect(coloured).toContain('<rect width="200" height="200" fill="#e6d3a3"/>');
  expect(coloured).not.toContain("currentColor");
  // With the fill off (line art) the paper is there too.
  await page.getByTestId("fill").click();
  expect(await saved(page, "download-svg")).toContain('<rect width="200" height="200" fill="#e6d3a3"/>');
  await page.getByTestId("colours-reset").click();
  expect(await saved(page, "download-svg")).not.toMatch(/<rect width="200" height="200"/);
});

test("names every swatch and field in the page's language", async ({ page }) => {
  for (const lang of ["en", "ja"]) {
    await openCard(page, `?open=maru-ni-mitsuba-aoi&lang=${lang}`);
    await page.getByTestId("options").click();
    await expect(page.locator("#ink-label")).toHaveText(WORDS[lang].ink);
    await expect(page.locator("#paper-label")).toHaveText(WORDS[lang].paper);
    await expect(page.getByTestId("ink-8a1c1c")).toHaveAccessibleName(WORDS[lang].colour_red);
    await expect(page.getByTestId("paper-ffffff")).toHaveAccessibleName(WORDS[lang].colour_white);
    await expect(page.getByTestId("ink-field")).toHaveAccessibleName(WORDS[lang].ink_pick);
    await expect(page.getByTestId("colours-reset")).toHaveText(WORDS[lang].colours_reset);
    await page.evaluate(() => localStorage.clear());
  }
});

test("colours the crest on the Build page from under its Options fold, never drawing it again, and keeps the colours for the next crest, closed fold or not", async ({ page }) => {
  await page.goto("/build/?frame=ring-medium&motif=plum&count=1&arr=single");
  await expect(page.locator('main[data-ready="true"]')).toBeAttached();
  const pic = page.getByTestId("bld-pic");
  const drawn = async () => Number(await pic.getAttribute("data-drawn"));
  const before = await drawn();
  // The colours are under the page's Options fold, closed to begin with.
  await expect(page.getByTestId("bld-colours")).toBeHidden();
  await page.getByTestId("bld-options").click();
  await page.getByTestId("bld-ink-1d3a6b").click();
  expect(await colour(pic, "color")).toBe("rgb(29, 58, 107)");
  await page.getByTestId("bld-paper-f3efe4").click();
  expect(await colour(pic.locator("svg"), "backgroundColor")).toBe("rgb(243, 239, 228)");
  await page.getByTestId("bld-paper-field").fill("#102030");
  expect(await colour(pic.locator("svg"), "backgroundColor")).toBe("rgb(16, 32, 48)");
  expect(await drawn()).toBe(before);
  // A new crest is drawn in the colours that were chosen.
  await page.getByTestId("bld-tab-count").click();
  await page.locator('#bld-chips [data-value="3"]').click();
  await expect.poll(drawn).toBe(before + 1);
  expect(await colour(pic, "color")).toBe("rgb(29, 58, 107)");
  const file = await saved(page, "bld-download");
  expect(file).toContain("rgb(29, 58, 107)");
  expect(file).toContain('<rect width="200" height="200" fill="#102030"/>');
  // Closing the fold keeps the colours.
  await page.getByTestId("bld-options").click();
  await expect(page.getByTestId("bld-colours")).toBeHidden();
  expect(await colour(pic, "color")).toBe("rgb(29, 58, 107)");
  expect(await saved(page, "bld-download")).toContain('<rect width="200" height="200" fill="#102030"/>');
  await page.getByTestId("bld-options").click();
  await page.getByTestId("bld-colours-reset").click();
  expect(await saved(page, "bld-download")).not.toMatch(/<rect width="200" height="200"/);
  await expect(page.getByTestId("bld-colours-reset")).toBeDisabled();
});

test("keeps the colour rows clear of the controls and inside the screen, on the card and on the Build page", async ({ page }) => {
  await openCard(page);
  const inside = async (testid) => {
    const box = await page.getByTestId(testid).boundingBox();
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(page.viewportSize().width);
  };
  await page.getByTestId("options").click();
  await inside("colours");
  await inside("options-panel");
  await page.goto("/build/");
  await expect(page.locator('main[data-ready="true"]')).toBeAttached();
  await page.getByTestId("bld-options").click();
  await inside("bld-colours");
  await inside("bld-options-panel");
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0);
});

test("colours chosen under Options still colour the crest and the downloaded SVG after the fold is closed again", async ({ page }) => {
  await openCard(page);
  await page.getByTestId("options").click();
  await page.getByTestId("ink-1d3a6b").click();
  await page.getByTestId("paper-f3efe4").click();
  await page.getByTestId("options").click();
  await expect(page.getByTestId("colours")).toBeHidden();
  expect(await colour(page.getByTestId("detail-crest"), "color")).toBe("rgb(29, 58, 107)");
  const file = await saved(page, "download-svg");
  expect(file).toContain("rgb(29, 58, 107)");
  expect(file).toContain('<rect width="200" height="200" fill="#f3efe4"/>');
});

test("keeps the Options and Parts buttons in a row on a desk, wrapping on a phone, and the panels inside the screen, in each cloth", async ({ page }) => {
  for (const cloth of ["green", "blue", "red", "black", "wood"]) {
    await openCard(page, `?open=maru-ni-mitsuba-aoi&cloth=${cloth}`);
    await expect(page.locator("html")).toHaveAttribute("data-cloth", cloth);
    const one = await page.getByTestId("options").boundingBox();
    const two = await page.getByTestId("card-parts").boundingBox();
    for (const box of [one, two]) {
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(page.viewportSize().width);
    }
    const sameRow = Math.abs(one.y - two.y) < 4;
    const wide = page.viewportSize().width >= 1000;
    if (wide) expect(sameRow).toBe(true);
    await page.getByTestId("options").click();
    await page.getByTestId("card-parts").click();
    for (const name of ["options-panel", "card-parts-panel"]) {
      const box = await page.getByTestId(name).boundingBox();
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(page.viewportSize().width);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0);
    await page.evaluate(() => localStorage.clear());
  }
});
