// The card's layout: no control over another at a desk or on a phone, and the drawing at each size and in the whole window.
import { expect, test } from "@playwright/test";

const SIZES = [
  ["desk", { width: 1280, height: 900 }],
  ["phone", { width: 390, height: 844 }],
];
// Every control on the card that can be seen, as a box; two that share any area overlap.
const overlaps = (page) =>
  page.locator("#detail").evaluate((card) => {
    const boxes = [...card.querySelectorAll("button, select, input, a[href]")].filter((node) => node.getClientRects().length > 0).map((node) => [node.id || node.textContent, node.getBoundingClientRect()]);
    const found = [];
    for (const [i, [a, one]] of boxes.entries()) for (const [b, other] of boxes.slice(i + 1)) if (one.left < other.right && other.left < one.right && one.top < other.bottom && other.top < one.bottom) found.push(`${a} / ${b}`);
    return found;
  });
const box = (page) => page.getByTestId("detail-crest").locator("svg").boundingBox();

for (const [name, viewport] of SIZES) {
  test(`keeps every control on the card clear of the others, at each drawing size (${name})`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/?open=maru-ni-mitsuba-aoi");
    await expect(page.getByTestId("detail")).toBeVisible();
    await page.getByTestId("parts-row").getByRole("button").first().click();
    for (const size of ["S", "M", "L"]) {
      await page.getByTestId("view").getByRole("button", { name: size, exact: true }).click();
      expect(await overlaps(page), size).toEqual([]);
    }
    // The size of the PNG stands apart from its button, and the row stays inside the card.
    const select = await page.getByTestId("png-size").boundingBox();
    const png = await page.getByTestId("download-png").boundingBox();
    expect(png.y > select.y + select.height || png.x - (select.x + select.width) >= 8).toBe(true);
    expect(png.x + png.width).toBeLessThanOrEqual(viewport.width);
    await page.getByTestId("full").click();
    expect(await overlaps(page), "full").toEqual([]);
  });
}

test("draws the crest small, medium or large as a vector, and remembers the size for the session", async ({ page }) => {
  await page.setViewportSize(SIZES[0][1]);
  await page.goto("/?open=maru-ni-mitsuba-aoi");
  const view = page.getByTestId("view");
  await expect(view.getByRole("button", { name: "S", exact: true })).toHaveAttribute("aria-pressed", "true");
  const widths = [];
  for (const size of ["S", "M", "L"]) {
    await view.getByRole("button", { name: size, exact: true }).click();
    widths.push(Math.round((await box(page)).width));
  }
  expect(widths).toEqual([300, 480, 640]);
  // An SVG drawn in the page, never a picture stretched: sharp at any size.
  await expect(page.getByTestId("detail-crest").locator("svg[viewBox] path").first()).toBeAttached();
  await expect(page.getByTestId("detail-crest").locator("img, canvas")).toHaveCount(0);
  await page.reload();
  await expect(view.getByRole("button", { name: "L", exact: true })).toHaveAttribute("aria-pressed", "true");
  expect(Math.round((await box(page)).width)).toBe(640);
});

test("makes Large the screen's width on a phone", async ({ page }) => {
  await page.setViewportSize(SIZES[1][1]);
  await page.goto("/?open=maru-ni-mitsuba-aoi");
  await page.getByTestId("view").getByRole("button", { name: "L", exact: true }).click();
  const drawn = await box(page);
  expect(Math.round(drawn.x)).toBe(0);
  expect(Math.round(drawn.width)).toBe(390);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

for (const [name, viewport] of SIZES) {
  test(`fills the window with the drawing, its player and its caption, and Esc leaves (${name})`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/?open=maru-ni-mitsuba-aoi");
    const before = await box(page);
    await page.getByTestId("full").click();
    const card = await page.getByTestId("detail").boundingBox();
    expect([card.x, card.y, card.width, card.height]).toEqual([0, 0, viewport.width, viewport.height]);
    const drawn = await box(page);
    expect(drawn.width).toBeGreaterThan(before.width);
    // As large as the window allows: the full width on a phone, most of the height at a desk.
    expect(Math.round(drawn.width)).toBeGreaterThanOrEqual(name === "phone" ? viewport.width : viewport.height * 0.75);
    expect(drawn.y + drawn.height).toBeLessThanOrEqual(viewport.height);
    await expect(page.getByTestId("caption")).toBeInViewport({ ratio: 1 });
    await expect(page.getByTestId("player")).toBeInViewport({ ratio: 1 });
    await expect(page.getByTestId("close")).toBeHidden();
    await expect(page.getByTestId("download-png")).toBeHidden();
    await page.keyboard.press("Escape");
    await expect(page.getByTestId("close")).toBeVisible();
    await expect(page.getByTestId("detail")).toBeVisible();
    expect(Math.round((await box(page)).width)).toBe(Math.round(before.width));
  });
}

test("a quick second tap on a button presses it again and never zooms the page on a phone", async ({ page }) => {
  await page.goto("/?open=kikyo");
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).touchAction)).toBe("manipulation");
});
