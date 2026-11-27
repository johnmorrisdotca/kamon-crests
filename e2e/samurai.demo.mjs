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

test("shows finished crests without pointer action, including below the fold", async ({ page }) => {
  const stepRequests = [];
  page.on("request", (request) => {
    if (/\/steps\//.test(new URL(request.url()).pathname)) stepRequests.push(request.url());
  });
  await page.goto("/?tab=samurai");
  const panel = page.locator("#samurai-panel");
  const pictures = panel.locator("kamon-crest");
  const total = SAMURAI.reduce((count, { crests }) => count + crests.length, 0);
  await expect(pictures.locator("svg")).toHaveCount(total);
  await expect(panel.locator("kamon-crest[animate]")).toHaveCount(0);
  expect(await pictures.evaluateAll((elements) => elements.every((element) => element.at === -1))).toBe(true);
  expect(stepRequests).toEqual([]);
});

test("keeps a Samurai crest painted while its hover preview loads and starts", async ({ page }, testInfo) => {
  test.skip(testInfo.project.use.hasTouch === true, "This checks mouse hover.");
  const steps = /\/steps\/mitsuba-aoi\.js$/;
  let releaseSteps;
  const held = new Promise((resolve) => { releaseSteps = resolve; });
  await page.route(steps, async (route) => {
    await held;
    await route.continue();
  });
  try {
    await page.goto("/?tab=samurai");
    const tile = page.getByTestId("sam-tokugawa-ieyasu").getByTestId("sam-crest-mitsuba-aoi");
    const picture = tile.locator("kamon-crest");
    const svg = picture.locator("svg");
    await expect(svg).toBeVisible();
    const finished = await svg.innerHTML();
    const request = page.waitForRequest(steps);
    await tile.hover();
    await request;
    expect(await svg.innerHTML()).toBe(finished);

    const tab = page.getByRole("tab", { name: "Samurai" });
    await tab.hover();
    const response = page.waitForResponse(steps);
    releaseSteps();
    await response;
    await expect(picture).not.toHaveAttribute("animate", "");
    expect(await svg.innerHTML()).toBe(finished);

    await picture.evaluate((element) => {
      element.blankFrames = 0;
      const sample = () => {
        const showsInk = Array.from(element.querySelectorAll("svg path")).some((path) => {
          const style = getComputedStyle(path);
          const filled = style.fill !== "none" && Number(style.fillOpacity) > 0;
          const stroked = style.stroke !== "none" && Number(style.strokeOpacity) > 0 && (style.strokeDasharray === "none" || parseFloat(style.strokeDashoffset) < 1);
          return Number(style.opacity) > 0 && (filled || stroked);
        });
        if (!showsInk) element.blankFrames += 1;
        element.previewFrame = globalThis.requestAnimationFrame(sample);
      };
      element.previewFrame = globalThis.requestAnimationFrame(sample);
    });
    await tile.hover();
    await expect(picture).toHaveAttribute("animate", "");
    await expect(svg.locator("style")).toContainText("@keyframes");
    await tab.hover();
    await expect(picture).not.toHaveAttribute("animate", "");
    expect(await svg.innerHTML()).toBe(finished);
    expect(await picture.evaluate((element) => {
      globalThis.cancelAnimationFrame(element.previewFrame);
      return element.blankFrames;
    })).toBe(0);
  } finally {
    releaseSteps();
  }
});

test("previews a Samurai crest on keyboard focus and restores the finished crest on blur", async ({ page }) => {
  await page.goto("/?tab=samurai");
  const tile = page.getByTestId("sam-oda-nobunaga").getByTestId("sam-crest-oda-mokko");
  const picture = tile.locator("kamon-crest");
  await expect(picture.locator("svg")).toBeAttached();
  await page.keyboard.press("Tab");
  await tile.focus();
  await expect(picture).toHaveAttribute("animate", "");
  await expect.poll(() => picture.evaluate((element) => element.at)).toBeGreaterThanOrEqual(0);
  await expect(page.locator("#samurai kamon-crest[animate]")).toHaveCount(1);
  await page.getByRole("tab", { name: "Samurai" }).focus();
  await expect(picture).not.toHaveAttribute("animate", "");
  await expect.poll(() => picture.evaluate((element) => element.at)).toBe(-1);
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

test("filters Samurai by clan and crest, restores the URL state and clears the choices", async ({ page }) => {
  await page.goto("/?tab=samurai&q=Tokugawa&lang=en");
  const panel = page.getByRole("tabpanel", { name: "Samurai" });
  const total = new Set(SAMURAI.flatMap(({ crests }) => crests)).size;
  await expect(panel.getByTestId("search")).toHaveValue("Tokugawa");
  await expect(panel.locator(".sam-card")).toHaveCount(1);
  await expect(panel.getByTestId("sam-tokugawa-ieyasu")).toBeVisible();
  await expect(panel.getByTestId("count")).toHaveText(`1 of ${total} crests`);
  await expect(panel.getByTestId("filters-toggle")).toHaveAttribute("aria-expanded", "false");
  await panel.getByTestId("filters-toggle").click();
  await panel.getByTestId("kind-row").getByRole("button", { name: /^Plants/ }).click();
  await expect(page).toHaveURL((url) => url.searchParams.get("kind") === "plant" && url.searchParams.get("q") === "Tokugawa");
  await page.reload();
  await expect(panel.getByTestId("active-filters")).toContainText("Plants");
  await expect(panel.getByTestId("count")).toHaveText(`1 of ${total} crests`);
  await panel.getByTestId("clear").click();
  await expect(panel.getByTestId("count")).toHaveText(`${total} of ${total} crests`);
  await expect(panel.locator(".sam-card")).toHaveCount(SAMURAI.length);
  await expect(page).toHaveURL((url) => !url.searchParams.has("kind") && !url.searchParams.has("q"));
});
