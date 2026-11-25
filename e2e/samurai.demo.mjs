// The Samurai page: every samurai is a card with their crests, each drawn crest opens its card in the catalogue, a crest still to
// draw links to its issue, the words follow the page's language, and nothing spills past the screen.
import { expect, test } from "@playwright/test";

test("shows each samurai with their crests, drawn ones opening the catalogue and wanted ones linking to an issue", async ({ page }) => {
  await page.goto("/samurai/");
  const cards = page.locator("#samurai > li");
  expect(await cards.count()).toBeGreaterThanOrEqual(12);
  const nobunaga = page.getByTestId("sam-oda-nobunaga");
  await expect(nobunaga).toContainText("Oda Nobunaga");
  await expect(nobunaga).toContainText("織田信長");
  const quince = nobunaga.getByTestId("sam-crest-oda-mokko");
  await expect(quince).toHaveAttribute("href", /\.\.\/\?open=oda-mokko$/);
  await expect(quince.locator("kamon-crest svg")).toHaveCount(1);
  const wanted = page.getByTestId("sam-uesugi-kenshin").getByTestId("sam-wanted");
  await expect(wanted).toHaveAttribute("href", /^https:\/\/github\.com\/johnmorrisdotca\/kamon-crests\/issues/);
  await expect(page.getByTestId("sam-ashikaga-takauji").getByTestId("sam-wanted")).toHaveAttribute("href", /\/issues\/4$/);
  await quince.click();
  await expect(page).toHaveURL(/\?open=oda-mokko/);
  await expect(page.getByTestId("detail-title")).toBeVisible();
});

test("follows the page's language, and fits the screen", async ({ page }) => {
  await page.goto("/samurai/?lang=ja");
  await expect(page.locator("#sam-title")).toHaveText("武将と家紋");
  await expect(page.getByTestId("sam-tokugawa-ieyasu").locator("h3 span")).toHaveText("徳川家康");
  const wide = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(wide).toBeLessThanOrEqual(0);
});

test("the catalogue's header links to the Samurai page and to the guide for helping draw", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('a[href="samurai/"]')).toBeVisible();
  await expect(page.locator('a[href$="docs/guides/draw-a-crest.md"]')).toBeVisible();
});
