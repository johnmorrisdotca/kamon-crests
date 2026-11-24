// The catalogue: every crest shown, found by its parts, and opened to be drawn.
import { expect, test } from "@playwright/test";

test("shows every crest, and the count says so", async ({ page }) => {
  await page.goto("/");
  const total = await page.getByTestId("grid").locator("li").count();
  expect(total).toBeGreaterThanOrEqual(60);
  await expect(page.getByTestId("count")).toHaveText(`${total} of ${total} crests`);
  await expect(page.getByTestId("tile-mitsuba-aoi").locator("kamon-crest svg")).toBeVisible();
});

test("finds a crest by its clan in English and its name in Japanese", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("search").fill("tokugawa");
  expect(await page.getByTestId("grid").locator("li").count()).toBeGreaterThanOrEqual(2);
  await expect(page.getByTestId("tile-mitsuba-aoi")).toBeVisible();
  await expect(page.getByTestId("tile-maru-ni-mitsuba-aoi")).toBeVisible();
  await page.getByTestId("search").fill("桐");
  await expect(page.getByTestId("tile-gosan-no-kiri")).toBeVisible();
});

test("narrows by parts: a ring, a kind, a motif and a count", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("frame-row").getByRole("button", { name: /^Ring/ }).click();
  const ringed = await page.getByTestId("grid").locator("li").count();
  expect(ringed).toBeGreaterThan(10);
  expect(ringed).toBeLessThan(40);
  await page.getByTestId("kind-row").getByRole("button", { name: /^Plants/ }).click();
  await page.getByTestId("motif-row").getByRole("button", { name: /^Paulownia/ }).click();
  await expect(page.getByTestId("grid").locator("li")).toHaveCount(1);
  await expect(page.getByTestId("tile-maru-ni-gosan-no-kiri")).toBeVisible();
  await page.getByTestId("clear").click();
  expect(await page.getByTestId("grid").locator("li").count()).toBeGreaterThanOrEqual(60);
  await page.getByTestId("count-row").getByRole("button", { name: /^3/ }).click();
  const threes = await page.getByTestId("grid").locator("li").count();
  expect(threes).toBeGreaterThan(8);
  expect(threes).toBeLessThan(40);
});

test("says so when no crest has all of the parts", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("search").fill("zzzzqq");
  await expect(page.getByTestId("empty")).toBeVisible();
  await expect(page.getByTestId("grid").locator("li")).toHaveCount(0);
});

test("opens a crest, draws it step by step, and ends on the finished crest", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("tile-maru-ni-juji").click();
  await expect(page.getByTestId("detail")).toBeVisible();
  await expect(page.getByTestId("detail-title")).toHaveText("Cross in a circle");
  await expect(page.getByTestId("detail-other")).toContainText("丸に十字");
  const crest = page.getByTestId("detail-crest");
  await expect(crest.locator("svg style")).toHaveCount(1);
  await expect(page.getByTestId("caption")).toContainText(/Step \d+ of \d+/);
  // The caption names what is being drawn, and the drawing ends.
  await expect(page.getByTestId("caption")).toHaveText("Finished", { timeout: 20000 });
  // Draw it again.
  await page.getByTestId("draw").click();
  await expect(page.getByTestId("caption")).toContainText(/Step|Drawing/);
});

test("pauses the drawing, steps it and scrubs it, with the step's caption", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("tile-mitsu-icho").click();
  const crest = page.getByTestId("detail-crest");
  const bar = crest.locator(".kamon-controls");
  await expect(bar).toBeVisible();
  await bar.getByRole("button", { name: "Pause" }).click();
  await expect(bar.getByRole("button", { name: "Play" })).toBeVisible();
  await bar.getByRole("button", { name: "Step forward" }).click();
  await expect(bar.locator("span")).not.toHaveText("");
  const at = await crest.evaluate((e) => e.at);
  // The panel's caption and the controls' own say the same step.
  await expect(page.getByTestId("caption")).toHaveAttribute("data-step", String(at + 1));
  await expect(page.getByTestId("caption")).toContainText(`Step ${at + 1} of`);
  await expect(bar.locator("span")).toContainText(`${at + 1}/`);
  const total = Number(await bar.locator("input").getAttribute("max"));
  await bar.locator("input").evaluate((input, to) => {
    input.value = to;
    input.dispatchEvent(new window.Event("input", { bubbles: true }));
  }, String(total - 1));
  await expect(page.getByTestId("caption")).toContainText("Turn it to its other places");
  await bar.getByRole("button", { name: "Play" }).click();
  await expect(page.getByTestId("caption")).toHaveText("Finished", { timeout: 20000 });
});

test("explains a part and shows it alone", async ({ page }) => {
  await page.goto("/?open=maru-ni-juji");
  await expect(page.getByTestId("detail")).toBeVisible();
  await page.getByTestId("parts-row").getByRole("button", { name: /Motif: Cross/ }).click();
  await expect(page.getByTestId("part-about")).toContainText("Two bars crossing at right angles.");
  const opacities = await page.getByTestId("detail-crest").locator("svg > path").evaluateAll((paths) => paths.filter((p) => !/-g\d*(\s|$)/.test(p.getAttribute("class") ?? "")).map((p) => p.style.opacity));
  expect(opacities).toContain("0.12");
  expect(opacities).toContain("");
  await page.getByTestId("parts-row").getByRole("button", { name: /Motif: Cross/ }).click();
  await expect(page.getByTestId("part-about")).toContainText("Press a part");
});

test("shows who uses a crest today, with its source and the day it was read, and none where none is stated", async ({ page }) => {
  await page.goto("/?open=igeta");
  const user = page.getByTestId("user").first();
  await expect(user).toContainText("Sumitomo Group");
  await expect(user).toContainText("Company");
  await expect(user.locator("a")).toHaveAttribute("href", /sumitomo\.gr\.jp/);
  await expect(user).toContainText("read 2026-11-24");
  await page.goto("/?open=janome");
  await expect(page.getByTestId("used-by")).toContainText("No present-day user is recorded");
});

test("finds the crests that have a user today", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("used-row").getByRole("button", { name: /^Has a user/ }).click();
  await expect(page.getByTestId("tile-igeta")).toBeVisible();
  expect(await page.getByTestId("grid").locator("li").count()).toBeLessThan(10);
});

test("switches to Japanese and back, naming crests and parts in each", async ({ page }) => {
  await page.goto("/?lang=ja");
  await expect(page.getByTestId("tile-mitsuba-aoi")).toContainText("三つ葉葵");
  await expect(page.getByTestId("count")).toContainText("件");
  await page.getByTestId("tile-mitsuba-aoi").click();
  await expect(page.getByTestId("detail-title")).toHaveText("三つ葉葵");
  await expect(page.getByTestId("parts-row")).toContainText("図柄: 葵");
  await page.getByTestId("close").click();
  await page.goto("/?lang=en");
  await expect(page.getByTestId("tile-mitsuba-aoi")).toContainText("Three hollyhock leaves");
});

test("keeps the choices in the address", async ({ page }) => {
  await page.goto("/?kind=animal&count=1");
  const ids = await page.getByTestId("grid").locator("li button").evaluateAll((tiles) => tiles.map((tile) => tile.dataset.id));
  expect(ids).toEqual(expect.arrayContaining(["usagi", "tonbo"]));
  await expect(page.getByTestId("kind-row").getByRole("button", { name: /^Animals/ })).toHaveAttribute("aria-pressed", "true");
});
