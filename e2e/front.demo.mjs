import { expect, test } from "@playwright/test";

import { WORDS } from "../demo/words.js";

const tabs = [
  ["catalogue", WORDS.en.tab_catalogue],
  ["samurai", WORDS.en.pageSamurai],
  ["latest", WORDS.en.tab_latest],
  ["book", WORDS.en.pageBook],
  ["complexity", WORDS.en.tab_complexity],
  ["parts", WORDS.en.tab_parts],
];

test("lists six tabs in order, with a shareable address and the selected view on reload", async ({ page }) => {
  await page.goto("/?lang=en");
  const items = page.getByTestId("tabs").getByRole("tab");
  await expect(items).toHaveText(tabs.map(([, name]) => name));
  for (const [id, name] of tabs) {
    const tab = page.getByRole("tab", { name, exact: true });
    await tab.click();
    await expect(tab).toHaveAttribute("aria-selected", "true");
    expect(new URL(page.url()).searchParams.get("tab") ?? "catalogue").toBe(id);
    await page.reload();
    await expect(tab).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("tabpanel", { name, exact: true })).toBeVisible();
  }
});

test("keeps the Book search and the catalogue search independent", async ({ page }) => {
  await page.goto("/?q=hollyhock&frame=ring&lang=en");
  const book = page.getByRole("tab", { name: WORDS.en.pageBook });
  const catalogue = page.getByRole("tab", { name: WORDS.en.tab_catalogue });
  await book.click();
  await expect(page.locator("#book-search")).toHaveValue("");
  await expect(page.getByTestId("book-grid")).toBeVisible();
  const label = await page.getByTestId("book-grid").locator(".book-label").first().textContent();
  await page.locator("#book-search").fill(label);
  expect(new URL(page.url()).searchParams.get("q")).toBe(label);
  await catalogue.click();
  await expect(page.getByTestId("search")).toHaveValue("hollyhock");
  expect(new URL(page.url()).searchParams.get("frame")).toBe("ring");
  await book.click();
  await expect(page.locator("#book-search")).toHaveValue(label);
  expect(new URL(page.url()).searchParams.get("q")).toBe(label);
});

test("folds filters by default, remembers the fold, and lets a closed chip be removed", async ({ page }) => {
  await page.goto("/?frame=ring&lang=en");
  const toggle = page.getByTestId("filters-toggle");
  const panel = page.getByTestId("catalogue-filters");
  const chips = page.getByTestId("active-filters");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(panel).toBeHidden();
  await expect(chips.getByRole("button", { name: "Remove filter Ring" })).toBeVisible();
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(panel).toBeVisible();
  await page.reload();
  await expect(panel).toBeVisible();
  await toggle.click();
  await chips.getByRole("button", { name: "Remove filter Ring" }).click();
  await expect(toggle).toBeFocused();
  await expect(chips).toBeHidden();
  expect(new URL(page.url()).searchParams.has("frame")).toBe(false);
  await page.reload();
  await expect(panel).toBeHidden();
});

test("draws one catalogue tile on mouse hover or keyboard focus and puts back its finished crest", async ({ page }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch === true, "This checks mouse hover.");
  await page.goto("/?q=janome&lang=en");
  const tile = page.getByTestId("tile-janome");
  const picture = tile.locator("kamon-crest");
  await expect(picture.locator("svg")).toBeVisible();
  await expect(picture).not.toHaveAttribute("animate", "");
  await tile.hover();
  await expect(picture).toHaveAttribute("animate", "");
  await expect.poll(() => picture.evaluate((element) => element.at)).toBeGreaterThanOrEqual(0);
  await expect(page.locator("#grid kamon-crest[animate]")).toHaveCount(1);
  await expect(picture).not.toHaveAttribute("animate", "", { timeout: 15000 });
  await expect.poll(() => picture.evaluate((element) => element.at)).toBe(-1);

  await page.getByTestId("search").hover();
  await page.keyboard.press("Tab");
  await tile.focus();
  await expect(tile).toBeFocused();
  await expect(picture).toHaveAttribute("animate", "");
  await page.getByTestId("filters-toggle").focus();
  await expect(picture).not.toHaveAttribute("animate", "");
  await expect.poll(() => picture.evaluate((element) => element.at)).toBe(-1);
});

test("leaves the finished catalogue crest in place under reduced motion", async ({ page }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch === true, "This checks mouse hover as well as keyboard focus.");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/?q=janome&lang=en");
  const tile = page.getByTestId("tile-janome");
  const picture = tile.locator("kamon-crest");
  await expect(picture.locator("svg")).toBeVisible();
  const previews = [];
  page.on("request", (request) => {
    if (/\/steps\/janome\.js/.test(request.url())) previews.push(request.url());
  });
  await tile.hover();
  await page.keyboard.press("Tab");
  await tile.focus();
  // Give a forbidden preview the full hover dwell in which to ask for the steps.
  await expect(page.waitForRequest(/\/steps\/janome\.js/, { timeout: 650 })).rejects.toThrow(/Timeout/);
  expect(previews).toEqual([]);
  await expect(picture).not.toHaveAttribute("animate", "");
  expect(await picture.evaluate((element) => element.at)).toBe(-1);
});
