// The one menu every page of the demo shows: the same pages in the same order with the current one marked, and a Menu button
// that opens the language, the table cloth, Help, and the GitHub and npm links.
import { expect, test } from "@playwright/test";

import { WORDS } from "../demo/words.js";

const PAGES = [
  ["/", "demo"],
  ["/api.html", "api"],
  ["/coverage/", "coverage"],
  ["/book/", "book"],
  ["/samurai/", "samurai"],
  ["/build/", "build"],
];
const ORDER = ["demo", "docs", "api", "coverage", "book", "samurai", "build", "help"];
const SAY = { demo: "pageBack", docs: "pageDocs", api: "pageApi", coverage: "pageCoverage", book: "pageBook", samurai: "pageSamurai", build: "pageBuild", help: "pageHelp" };

for (const [path, here] of PAGES) {
  test(`${path} shows the same pages in the same order, with this one marked`, async ({ page }) => {
    await page.goto(`${path}?lang=en`);
    const links = page.getByTestId("site-nav").locator("a[data-page]");
    await expect(links).toHaveCount(ORDER.length);
    await expect(links).toHaveText(ORDER.map((name) => WORDS.en[SAY[name]]));
    expect(await links.evaluateAll((nodes) => nodes.map((node) => node.dataset.page))).toEqual(ORDER);
    // Exactly one is the current page, and it is this one.
    await expect(page.getByTestId("site-nav").locator('[aria-current="page"]')).toHaveCount(1);
    await expect(page.getByTestId("site-nav").locator(`a[data-page="${here}"]`)).toHaveAttribute("aria-current", "page");
    // The same links go to the same places from every page.
    const where = await links.evaluateAll((nodes) => Object.fromEntries(nodes.map((node) => [node.dataset.page, new URL(node.href).pathname])));
    expect(where).toMatchObject({ demo: "/", api: "/api.html", coverage: "/coverage/", book: "/book/", samurai: "/samurai/", build: "/build/" });
    expect(await links.evaluateAll((nodes) => nodes.filter((node) => ["docs", "help"].includes(node.dataset.page)).map((node) => node.href))).toEqual([
      "https://github.com/johnmorrisdotca/kamon-crests/tree/main/docs/guides",
      "https://github.com/johnmorrisdotca/kamon-crests/blob/main/docs/guides/draw-a-crest.md",
    ]);
  });
}

test("says the pages and the Menu in Japanese, on every page", async ({ page }) => {
  for (const [path] of PAGES) {
    await page.goto(`${path}?lang=ja`);
    await expect(page.getByTestId("site-nav").locator("a[data-page]")).toHaveText(ORDER.map((name) => WORDS.ja[SAY[name]]));
    await expect(page.getByTestId("menu-button")).toHaveText(WORDS.ja.menu);
  }
});

test("opens the Menu with one tap: the language, the five cloths, Help, GitHub and npm; and closes it again", async ({ page }) => {
  await page.goto("/?lang=en");
  const button = page.getByTestId("menu-button");
  const panel = page.getByTestId("menu-panel");
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await expect(panel).toBeHidden();
  // The cloth patches are no longer in the header's row: they are in the Menu.
  await expect(page.locator("header .cloth")).toBeHidden();
  await button.click();
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await expect(panel).toBeVisible();
  await expect(panel.locator("[data-cloth]")).toHaveCount(5);
  await expect(panel.locator("[data-lang]")).toHaveText(["English", "日本語"]);
  await expect(panel.locator("[data-help-switch]")).toBeVisible();
  await expect(panel.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", /github\.com\/johnmorrisdotca\/kamon-crests$/);
  await expect(panel.getByRole("link", { name: "npm" })).toHaveAttribute("href", /npmjs\.com\/package\/@johnmorrisdotca\/kamon-crests/);
  // Escape closes it and gives the focus back to the button.
  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
  await expect(button).toBeFocused();
  // So does a press anywhere else.
  await button.click();
  await expect(panel).toBeVisible();
  await page.getByRole("heading", { name: "Kamon Crests" }).click();
  await expect(panel).toBeHidden();
});

test("changes the language and the cloth from the Menu, and both stay on the next page", async ({ page }) => {
  await page.goto("/?lang=en");
  await page.getByTestId("menu-button").click();
  await page.getByTestId("menu-panel").locator('[data-lang="ja"]').click();
  await expect(page.getByTestId("menu-button")).toHaveText(WORDS.ja.menu);
  await expect(page.locator("html")).toHaveAttribute("lang", "ja");
  await page.getByTestId("menu-panel").locator('[data-cloth="black"]').click();
  await expect(page.locator("html")).toHaveAttribute("data-cloth", "black");
  await expect(page.getByTestId("menu-panel").locator('[data-cloth="black"]')).toHaveAttribute("aria-checked", "true");
  await page.getByTestId("site-nav").locator('a[data-page="build"]').click();
  await expect(page).toHaveURL(/\/build\//);
  await expect(page.locator("html")).toHaveAttribute("lang", "ja");
  await expect(page.locator("html")).toHaveAttribute("data-cloth", "black");
});

test("reaches every control of the Menu by keyboard, and keeps the panel inside the window", async ({ page, browserName }) => {
  // Safari does not Tab to buttons unless its settings say so; the controls are real buttons and links, and Chromium shows the order.
  test.skip(browserName === "webkit", "Safari's Tab skips buttons by default");
  await page.goto("/build/?lang=en");
  await page.getByTestId("menu-button").focus();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("menu-panel")).toBeVisible();
  const order = [];
  for (let i = 0; i < 12; i += 1) {
    await page.keyboard.press("Tab");
    order.push(await page.evaluate(() => document.activeElement?.dataset.lang ?? document.activeElement?.dataset.cloth ?? document.activeElement?.textContent?.trim()));
    if (order.at(-1) === "npm") break;
  }
  expect(order).toEqual(["en", "ja", "green", "blue", "red", "black", "wood", "Help", "GitHub", "npm"]);
  // Tabbing out of the Menu closes it.
  await page.keyboard.press("Tab");
  await expect(page.getByTestId("menu-panel")).toBeHidden();
  await page.getByTestId("menu-button").click();
  const box = await page.getByTestId("menu-panel").boundingBox();
  const width = page.viewportSize().width;
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(width);
});

test("all five cloth swatches fit and stay tappable when a phone switches languages", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/?lang=en");
  await page.getByTestId("menu-button").click();
  const panel = page.getByTestId("menu-panel");
  const patches = panel.locator("button[data-cloth]");
  await expect(patches).toHaveCount(5);

  for (const lang of ["en", "ja", "en"]) {
    await panel.locator(`button[data-lang="${lang}"]`).click();
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(panel).toBeInViewport({ ratio: 1 });
    const boxes = await patches.evaluateAll((nodes) => nodes.map((node) => {
      const { left, right, top, bottom, width, height } = node.getBoundingClientRect();
      const centerX = (left + right) / 2;
      const centerY = (top + bottom) / 2;
      // The rounded corners clip the hit area nearest the corners of the bounding box.
      const inset = Math.max(2, Math.ceil(parseFloat(getComputedStyle(node).borderTopLeftRadius) / 2));
      const points = [
        [centerX, centerY],
        [left + 2, centerY], [right - 2, centerY],
        [centerX, top + 2], [centerX, bottom - 2],
        [left + inset, top + inset], [right - inset, top + inset],
        [left + inset, bottom - inset], [right - inset, bottom - inset],
      ];
      const blocked = points.filter(([x, y]) => document.elementFromPoint(x, y)?.closest("button[data-cloth]") !== node);
      return { left, right, top, bottom, width, height, cloth: node.dataset.cloth, blocked };
    }));
    for (const [index, box] of boxes.entries()) {
      expect(box.width).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeGreaterThanOrEqual(44);
      expect(box.blocked, `${lang} ${box.cloth} swatch hit targets`).toEqual([]);
      for (const other of boxes.slice(index + 1)) {
        const overlap = box.left < other.right && box.right > other.left && box.top < other.bottom && box.bottom > other.top;
        expect(overlap).toBe(false);
      }
    }
    for (const patch of await patches.all()) {
      await patch.click();
      await expect(patch).toHaveAttribute("aria-checked", "true");
    }
  }
});
