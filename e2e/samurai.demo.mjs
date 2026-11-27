// The Samurai tab: every samurai is a card with their crests, each drawn crest opens its card in the catalogue, a crest still to
// draw links to its issue, the words follow the page's language, and nothing spills past the screen.
import { expect, test } from "@playwright/test";

import { SAMURAI } from "../scripts/samurai.mjs";

test("shows each samurai with their crests, drawn ones opening their cards in the tab and wanted ones linking to an issue", async ({ page }) => {
  await page.goto("/samurai/");
  const cards = page.locator("#samurai > li");
  await expect(cards).toHaveCount(SAMURAI.length);
  const nobunaga = page.getByTestId("sam-oda-nobunaga");
  await expect(nobunaga).toContainText("Oda Nobunaga");
  await expect(nobunaga).toContainText("織田信長");
  await expect(nobunaga.getByRole("link", { name: /Wikipedia/ })).toHaveAttribute("href", /wikipedia\.org/);
  const quince = nobunaga.getByTestId("sam-crest-oda-mokko");
  await expect(quince).toHaveAttribute("href", /\?tab=samurai&open=oda-mokko/);
  await expect(quince.locator("kamon-crest svg")).toHaveCount(1);
  const wanted = page.getByTestId("sam-uesugi-kenshin").getByTestId("sam-wanted");
  await expect(wanted).toHaveAttribute("href", /^https:\/\/github\.com\/johnmorrisdotca\/kamon-crests\/issues/);
  await expect(page.getByTestId("sam-ashikaga-takauji").getByTestId("sam-wanted")).toHaveAttribute("href", /\/issues\/4$/);
  await quince.click();
  await expect(page).toHaveURL(/tab=samurai.*open=oda-mokko|open=oda-mokko.*tab=samurai/);
  await expect(page.getByTestId("detail-title")).toBeVisible();
});

test("follows the page's language, and fits the screen", async ({ page }) => {
  await page.goto("/samurai/?lang=ja");
  await expect(page.locator("#sam-title")).toHaveText("武将と家紋");
  const url = new URL(page.url());
  expect(url.pathname).toBe("/");
  expect(url.searchParams.get("tab")).toBe("samurai");
  expect(url.searchParams.get("lang")).toBe("ja");
  await expect(page.getByTestId("sam-tokugawa-ieyasu").locator("h3 span")).toHaveText("徳川家康");
  const wide = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(wide).toBeLessThanOrEqual(0);
});

test("Samurai is a front-page tab and the header still links to the guide for helping draw", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Samurai" }).click();
  await expect(page.getByRole("tabpanel", { name: "Samurai" })).toBeVisible();
  await expect(page).toHaveURL(/tab=samurai/);
  await expect(page.locator('a[href$="docs/guides/draw-a-crest.md"]')).toBeVisible();
});
