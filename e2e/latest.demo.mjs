import { expect, test } from "@playwright/test";

test("opens Latest with the keyboard, keeps the URL and shows older releases on request", async ({ page }) => {
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
  const versions = await releases.evaluateAll((groups) => groups.map((group) => group.dataset.version));
  if (versions[0] === "Unreleased") await expect(releases.first().getByRole("heading")).toHaveText("Unreleased, on the way");
  const published = versions.filter((version) => version !== "Unreleased");
  expect(published).toHaveLength(10);
  expect(published).toEqual([...published].sort((a, b) => b.localeCompare(a, "en", { numeric: true })));
  const older = page.getByRole("button", { name: "Show older" });
  await older.click();
  expect(await releases.count()).toBeGreaterThan(versions.length);
  await expect(releases.nth(versions.length).getByRole("heading")).toBeFocused();
  await page.reload();
  await expect(tab).toHaveAttribute("aria-selected", "true");
  await expect(releases).toHaveCount(versions.length);
});

test("opens the regular crest card from a Latest row", async ({ page }) => {
  await page.goto("/?tab=latest");
  const first = page.getByTestId("latest-panel").locator(".latest-row").first();
  const id = await first.getAttribute("data-id");
  const name = await first.locator(".latest-name").textContent();
  await expect(first.locator("kamon-crest")).toHaveAttribute("size", "72");
  await expect(first.locator("kamon-crest svg")).toBeVisible();
  await first.press("Enter");
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
  await expect(row.locator(".latest-note[lang=en]")).toHaveText(/[A-Za-z]/);
  await expect(panel.locator(".latest-tag-new").first()).toHaveText("新規");
  await expect(panel.locator(".latest-tag-redrawn").first()).toHaveText("描き直し");
  // Which releases are in sight changes with every release: a fixed crest is named so wherever one shows.
  const fixed = panel.locator(".latest-tag-fixed");
  if ((await fixed.count()) > 0) await expect(fixed.first()).toHaveText("修正");
  await expect(page.getByRole("button", { name: "以前の更新を表示" })).toBeAttached();
});
