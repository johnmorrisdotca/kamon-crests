// The Complexity tab: every crest ranked by what there is to draw, with its counts under it.
import { expect, test } from "@playwright/test";

const scores = (page) => page.getByTestId("grid").locator(".tile:not(.redrawing) .counts").evaluateAll((lines) => lines.map((line) => Number(/\d+/.exec(line.textContent)[0])));

test("ranks every crest from the simplest, each with its counts under it, and folds nothing away", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("grid").locator(".counts")).toHaveCount(0);
  const all = await page.getByTestId("grid").locator("li").count();
  await page.getByRole("tab", { name: "Complexity" }).click();
  await expect(page).toHaveURL(/tab=complexity/);
  await expect(page.getByRole("tab", { name: "Complexity" })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByTestId("blurb")).toContainText("from the simplest to the most complex");
  await expect(page.getByTestId("grid").locator("li")).toHaveCount(all);
  await expect(page.getByTestId("grid").locator(".counts")).toHaveCount(all);
  await expect(page.getByTestId("tile-janome").locator(".counts")).toHaveText("Score 4 · Circles 2 · Ruled lines 0 · Arcs 2 · Steps 8");
  expect(await page.getByTestId("grid").locator("li button").first().getAttribute("data-id")).toBe("janome");
  const ranked = await scores(page);
  expect(ranked).toEqual([...ranked].sort((a, b) => a - b));
  // The twelve crests still traced from the book are greyed, say so, and come last.
  const redrawing = await page.getByTestId("grid").locator("li button").evaluateAll((tiles) => tiles.map((tile) => tile.classList.contains("redrawing")));
  expect(redrawing.filter(Boolean)).toHaveLength(12);
  expect(redrawing.slice(-12).every(Boolean)).toBe(true);
  await expect(page.getByTestId("tile-tachibana").locator(".note")).toHaveText("Being redrawn");
  await page.getByRole("tab", { name: "Catalogue" }).click();
  await expect(page.getByTestId("grid").locator(".redrawing")).toHaveCount(0);
  await expect(page.locator("details")).toHaveCount(0);
});

test("ranks by any count, either way, and narrows by the parts chips", async ({ page }) => {
  await page.goto("/?tab=complexity");
  await page.getByTestId("sort-row").getByRole("button", { name: "Circles" }).click();
  await page.getByTestId("order-row").getByRole("button", { name: "Most complex first" }).click();
  await expect(page).toHaveURL(/by=circles/);
  await expect(page).toHaveURL(/order=desc/);
  const circles = await page.getByTestId("grid").locator(".tile:not(.redrawing) .counts").evaluateAll((lines) => lines.map((line) => Number(/Circles (\d+)/.exec(line.textContent)[1])));
  expect(circles.length).toBeGreaterThan(40);
  expect(circles).toEqual([...circles].sort((a, b) => b - a));
  await page.getByTestId("frame-row").getByRole("button", { name: /^Ring/ }).click();
  await page.getByTestId("count-row").getByRole("button", { name: /^3/ }).click();
  const ids = await page.getByTestId("grid").locator("li button").evaluateAll((tiles) => tiles.map((tile) => tile.dataset.id));
  expect(ids.length).toBeGreaterThan(3);
  expect(ids.length).toBeLessThan(circles.length);
  for (const id of ids) expect(id).toMatch(/^maru-ni-/);
  // The choices stay when the view changes, and come back from the address.
  await page.getByRole("tab", { name: "Catalogue" }).click();
  await expect(page.getByTestId("grid").locator("li")).toHaveCount(ids.length);
  await expect(page.getByTestId("sort-row")).toBeHidden();
  await page.goto("/?tab=complexity&by=steps&order=desc&lang=ja");
  await expect(page.getByRole("tab", { name: "複雑さ" })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByTestId("sort-row").getByRole("button", { name: "手順" })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByTestId("tile-janome").locator(".counts")).toHaveText("複雑さ 4・手順 8・円 2・直線 0・弧 2");
});

test("opens a ranked crest's card and draws it", async ({ page }) => {
  await page.goto("/?tab=complexity");
  await page.getByTestId("tile-mikazuki").click();
  await expect(page.getByTestId("detail")).toBeVisible();
  await expect(page.getByTestId("stats")).toContainText("Circles 2");
  await expect(page.getByTestId("caption")).toContainText(/Step \d+ of \d+/);
  await expect(page.getByTestId("caption")).toHaveText("Finished", { timeout: 20000 });
});
