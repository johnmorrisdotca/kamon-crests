import { expect, test } from "@playwright/test";

import { settleCard } from "./card-ready.mjs";

test("opens Latest with the keyboard and keeps the chosen release in the URL", async ({ page }) => {
  await page.goto("/");
  const catalogue = page.getByRole("tab", { name: "Catalogue" });
  const tab = page.getByRole("tab", { name: "Latest" });
  await catalogue.focus();
  const steps = await catalogue.locator("xpath=..").getByRole("tab").evaluateAll((tabs) => tabs.findIndex((one) => one.textContent.trim() === "Latest"));
  expect(steps).toBeGreaterThan(0);
  for (let step = 0; step < steps; step += 1) await page.keyboard.press("ArrowRight");
  await expect(tab).toBeFocused();
  await expect(tab).toHaveAttribute("aria-selected", "true");
  await expect(page).toHaveURL(/tab=latest/);
  await expect(page.getByTestId("catalogue-panel")).toBeHidden();

  const releases = page.getByTestId("latest-panel").locator(".latest-release");
  const listed = await page.evaluate(async () => (await import("/latest-data.js")).releases.map(({ version }) => version));
  const choices = page.getByRole("group", { name: "Crest releases" }).getByRole("button");
  await expect(choices).toHaveCount(listed.length);
  await expect(releases).toHaveCount(1);
  await expect(releases).toHaveAttribute("data-version", listed[0]);
  if (listed[0] === "Unreleased") await expect(releases.getByRole("heading")).toHaveText("Unreleased, on the way");
  await choices.nth(1).click();
  await expect(releases).toHaveCount(1);
  await expect(releases).toHaveAttribute("data-version", listed[1]);
  await expect(page).toHaveURL((url) => url.searchParams.get("release") === listed[1]);
  await expect(releases.getByRole("heading")).toBeFocused();
  await page.reload();
  await expect(tab).toHaveAttribute("aria-selected", "true");
  await expect(releases).toHaveAttribute("data-version", listed[1]);
});

test("opens the regular crest card from a Latest row", async ({ page }) => {
  await page.goto("/?tab=latest");
  const first = page.getByTestId("latest-panel").locator(".latest-row").first();
  const id = await first.getAttribute("data-id");
  const name = await first.locator(".latest-name").textContent();
  await expect(first.locator("kamon-crest")).toHaveAttribute("size", "72");
  await expect(first.locator("kamon-crest svg")).toBeVisible();
  await first.press("Enter");
  await settleCard(page);
  await expect(page.getByTestId("detail")).toBeVisible();
  await expect(page.getByTestId("detail-title")).toHaveText(name);
  await expect(page).toHaveURL(new RegExp(`tab=latest&open=${id}$`));
  await page.getByTestId("close").click();
  await expect(first).toBeFocused();
  await expect(page.getByTestId("latest-panel")).toBeVisible();
});

test("localizes the release list in Japanese and fits each cloth without horizontal scrolling", async ({ page }) => {
  const panel = page.getByTestId("latest-panel");
  for (const cloth of ["green", "blue", "red", "black", "wood"]) {
    await page.goto(`/?tab=latest&lang=ja&cloth=${cloth}`);
    await expect(page.getByRole("tab", { name: "最新" })).toHaveAttribute("aria-selected", "true");
    const root = page.locator("html");
    await expect(root).toHaveAttribute("data-cloth", cloth);
    expect(await root.evaluate((node) => node.scrollWidth)).toBeLessThanOrEqual(await root.evaluate((node) => node.clientWidth));
  }
  const row = panel.locator(".latest-row").first();
  await expect(row.locator(".latest-name")).toHaveAttribute("lang", "ja");
  await expect(row.locator(".latest-other [lang=ja]")).toHaveText(/[ぁ-ゖ]/);
  await expect(row.locator(".latest-other [lang=en]")).toHaveText(/[A-Za-z]/);
  await expect(row.locator(".latest-note[lang=ja]")).toHaveText(/[ぁ-ゖ]/);
  await expect(panel.locator(".latest-note[lang=en]")).toHaveCount(0);
  const labels = { new: "新規", redrawn: "描き直し", fixed: "修正" };
  await expect(row.locator(".latest-tag")).toHaveText(labels[await row.getAttribute("data-status")]);
  await expect(page.getByRole("group", { name: "家紋の更新履歴" })).toBeVisible();
});

test("uses the shared Latest search, keeps the entry order and clears the filters", async ({ page }) => {
  await page.goto("/?tab=latest&lang=en");
  const panel = page.getByTestId("latest-panel");
  const { totals, entries, picked } = await page.evaluate(async () => {
    const { releases } = await import("/latest-data.js");
    const { MANIFEST } = await import("/dist/manifest.js");
    const published = new Set(releases.flatMap(({ entries }) => entries.map(({ id }) => id)));
    const ringed = new Set(MANIFEST.filter(({ frame }) => frame.startsWith("ring-")).map(({ id }) => id));
    const picked = releases.find(({ entries }) => entries.some(({ id }) => ringed.has(id)));
    return { totals: [published.size, Array.from(published).filter((id) => ringed.has(id)).length], entries: picked.entries.filter(({ id }) => ringed.has(id)).map(({ id }) => id), picked: picked.version };
  });
  await expect(panel.getByTestId("count")).toHaveText(`${totals[0]} of ${totals[0]} crests`);
  await expect(panel.getByTestId("filters-toggle")).toHaveAttribute("aria-expanded", "false");
  await panel.getByTestId("filters-toggle").click();
  await panel.getByTestId("frame-row").getByRole("button", { name: /^Ring/ }).click();
  await expect(page).toHaveURL((url) => url.searchParams.get("frame") === "ring");
  await expect(panel.getByTestId("count")).toHaveText(`${totals[1]} of ${totals[0]} crests`);
  await expect(panel.locator(".latest-release")).toHaveAttribute("data-version", picked);
  expect(await panel.locator(".latest-row").evaluateAll((rows) => rows.map((row) => row.dataset.id))).toEqual(entries);
  await panel.getByTestId("search").fill("zzzznomatchingcrest");
  await expect(panel.getByTestId("count")).toHaveText(`0 of ${totals[0]} crests`);
  await expect(panel.getByTestId("empty")).toBeVisible();
  await panel.getByTestId("clear").click();
  await expect(page).toHaveURL((url) => !url.searchParams.has("frame") && !url.searchParams.has("q"));
  await expect(panel.getByTestId("count")).toHaveText(`${totals[0]} of ${totals[0]} crests`);
});
