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
/** The width of the crest's own 200 by 200 square, without the widths key's room beside or below it. */
const square = (page) =>
  page.getByTestId("detail-crest").evaluate((e) => {
    // Between drawings (a reload, a new size) there is a moment with no SVG: none yet, so the poll asks again.
    const svg = e.querySelector("svg[viewBox]");
    if (svg === null) return 0;
    const [, , w, h] = svg.getAttribute("viewBox").split(" ").map(Number);
    const rect = svg.getBoundingClientRect();

    return 200 * Math.min(rect.width / w, rect.height / h);
  });

for (const [name, viewport] of SIZES) {
  test(`keeps every control on the card clear of the others, at each drawing size (${name})`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/?open=maru-ni-mitsuba-aoi");
    await expect(page.getByTestId("detail")).toBeVisible();
    await page.getByTestId("options").click();
    await page.getByTestId("card-parts").click();
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

// The drawing's box (the crest and its widths key) and every control on the card: none over another, at each drawing size and in the whole window.
for (const [name, viewport] of SIZES) {
  for (const id of ["izutsu", "maru-ni-mitsuba-aoi"]) {
    test(`keeps the widths key beside or below the drawing and clear of the controls, at each drawing size (${name}, ${id})`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto(`/?open=${id}`);
      await expect(page.getByTestId("detail")).toBeVisible();
      const crest = page.getByTestId("detail-crest");
      const clear = async (label) => {
        // Held on a step that strikes a circle, so that the key is there.
        await crest.evaluate((e) => e.step(4));
        await expect(crest.locator("svg > g[font-size]")).toHaveCount(1);
        const svg = await crest.locator("svg").boundingBox();
        const key = await crest.locator("svg > g[font-size]").boundingBox();
        // The key is inside the drawing's own box, in the margin and not over the crest's square, and the box is clear of every control.
        expect(key.x).toBeGreaterThanOrEqual(svg.x - 1);
        expect(key.y).toBeGreaterThanOrEqual(svg.y - 1);
        expect(key.x + key.width).toBeLessThanOrEqual(svg.x + svg.width + 1);
        expect(key.y + key.height).toBeLessThanOrEqual(svg.y + svg.height + 1);
        const square = await crest.evaluate((e) => {
          const view = e.querySelector("svg").viewBox.baseVal;
          const box = e.querySelector("svg").getBoundingClientRect();
          const scale = Math.min(box.width / view.width, box.height / view.height);

          return { right: box.x + 200 * scale, bottom: box.y + 200 * scale };
        });
        expect(key.x >= square.right - 1 || key.y >= square.bottom - 1, `${label}: the key stands over the crest's square`).toBe(true);
        const over = await page.locator("#detail").evaluate((card, rect) => {
          const boxes = [...card.querySelectorAll("button, select, input, a[href]")].filter((node) => node.getClientRects().length > 0).map((node) => [node.id || node.textContent, node.getBoundingClientRect()]);

          return boxes.filter(([, one]) => one.left < rect.x + rect.width && rect.x < one.right && one.top < rect.y + rect.height && rect.y < one.bottom).map(([id]) => id);
        }, svg);
        expect(over, label).toEqual([]);
      };
      for (const size of ["S", "M", "L"]) {
        await page.getByTestId("view").getByRole("button", { name: size, exact: true }).click();
        await clear(size);
      }
      await page.getByTestId("full").click();
      await clear("full");
    });
  }
}

test("draws the crest small, medium or large as a vector, large to begin with at a desk, and remembers the size for the session", async ({ page }) => {
  await page.setViewportSize(SIZES[0][1]);
  await page.goto("/?open=maru-ni-mitsuba-aoi");
  const view = page.getByTestId("view");
  await expect(view.getByRole("button", { name: "L", exact: true })).toHaveAttribute("aria-pressed", "true");
  // A new size can move the widths key (beside the crest or below it), and the drawing is drawn again: wait for it.
  const sizes = {};
  for (const size of ["S", "M", "L"]) {
    await view.getByRole("button", { name: size, exact: true }).click();
    await expect(view.getByRole("button", { name: size, exact: true })).toHaveAttribute("aria-pressed", "true");
    await expect.poll(async () => Math.round(await square(page))).toBeGreaterThan(0);
    await page.waitForTimeout(300);
    sizes[size] = Math.round(await square(page));
  }
  expect(sizes.S).toBe(200);
  expect(sizes.M).toBeGreaterThan(sizes.S);
  expect(sizes.L).toBeGreaterThanOrEqual(sizes.M);
  // Large is as wide as the picture's column allows, never wider.
  const column = await page.locator(".stage-pic").boundingBox();
  expect(sizes.L).toBeLessThanOrEqual(column.width);
  expect(sizes.L).toBeGreaterThan(column.width * 0.6);
  // An SVG drawn in the page, never a picture stretched: sharp at any size.
  await expect(page.getByTestId("detail-crest").locator("svg[viewBox] path").first()).toBeAttached();
  await expect(page.getByTestId("detail-crest").locator("img, canvas")).toHaveCount(0);
  await view.getByRole("button", { name: "M", exact: true }).click();
  await page.reload();
  await expect(view.getByRole("button", { name: "M", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect.poll(async () => Math.round(await square(page))).toBe(sizes.M);
});

test("lays the card out at a desk with the picture filling its column and the text beside it, no empty block under either", async ({ page }) => {
  await page.setViewportSize(SIZES[0][1]);
  await page.goto("/?open=mitsuba-aoi");
  await expect(page.getByTestId("detail")).toBeVisible();
  const pic = await page.locator(".stage-pic").boundingBox();
  const card = await page.getByTestId("detail").boundingBox();
  // The picture is a large share of the card's width (45 to 55 per cent of it), a box close to square.
  expect(pic.width / card.width).toBeGreaterThan(0.4);
  expect(pic.width / card.width).toBeLessThan(0.6);
  expect(pic.height / pic.width).toBeGreaterThan(0.7);
  // Its size row is directly under it.
  const row = await page.getByTestId("view").boundingBox();
  expect(row.y - (pic.y + pic.height)).toBeLessThan(24);
  expect(Math.abs(row.x - pic.x)).toBeLessThan(2);
  // The right column starts level with the picture: caption, then the player, the speed row, the two folds and then how it is constructed.
  const caption = await page.getByTestId("caption").boundingBox();
  expect(caption.x).toBeGreaterThan(pic.x + pic.width);
  expect(Math.abs(caption.y - pic.y)).toBeLessThan(30);
  const order = [];
  for (const id of ["caption", "player", "speed", "options", "card-parts", "construction-note"]) order.push((await page.getByTestId(id).boundingBox()).y);
  expect(order).toEqual([...order].sort((a, b) => a - b));
  const options = await page.getByTestId("options").boundingBox();
  const parts = await page.getByTestId("card-parts").boundingBox();
  expect(Math.abs(options.y - parts.y)).toBeLessThan(4);
  const note = await page.getByTestId("construction-note").boundingBox();
  expect(note.x).toBeGreaterThan(pic.x + pic.width);
  // Opening a fold pushes the text down and covers nothing.
  await page.getByTestId("options").click();
  await page.getByTestId("card-parts").click();
  expect(await overlaps(page)).toEqual([]);
  const moved = await page.getByTestId("construction-note").boundingBox();
  expect(moved.y).toBeGreaterThan(note.y);
  const panel = await page.getByTestId("options-panel").boundingBox();
  expect(panel.y + panel.height).toBeLessThanOrEqual(moved.y);
  // The picture stays in its column, and in sight whatever the text beside it does.
  const after = await page.locator(".stage-pic").boundingBox();
  expect([after.x, after.width, after.height]).toEqual([pic.x, pic.width, pic.height]);
  await expect(page.locator(".stage-pic")).toBeInViewport();
});

test("stacks the card on a phone in one column, in reading order, with no sideways scroll", async ({ page }) => {
  await page.setViewportSize(SIZES[1][1]);
  await page.goto("/?open=mitsuba-aoi");
  await expect(page.getByTestId("detail")).toBeVisible();
  await expect(page.getByTestId("detail-crest").locator("svg")).toHaveCount(1);
  const order = [];
  for (const id of ["detail-title", "variants", "detail-crest", "view", "caption", "player", "speed", "options", "card-parts", "construction-note"]) {
    await expect(page.getByTestId(id), id).toBeVisible();
    const box = await page.getByTestId(id).boundingBox();
    order.push(box.y);
    expect(box.x + box.width, id).toBeLessThanOrEqual(SIZES[1][1].width);
  }
  expect(order).toEqual([...order].sort((a, b) => a - b));
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(SIZES[1][1].width);
  expect(await page.getByTestId("detail").evaluate((node) => node.scrollWidth - node.clientWidth)).toBeLessThanOrEqual(0);
});

test("says a crest's note on its card, in the page's language, and shows none for a crest that has none", async ({ page }) => {
  await page.goto("/?open=maru-ni-hidari-manji");
  const note = page.getByTestId("crest-note");
  await expect(note).toHaveText("The manji (卍) is a Buddhist sign used as a Japanese family crest for centuries; it is unrelated to the Nazi swastika.");
  await page.goto("/?open=maru-ni-hidari-manji&lang=ja");
  await expect(note).toHaveText("卍（まんじ）は仏教のしるしで、古くから日本の家紋に使われてきました。ナチスのハーケンクロイツとは関係がありません。");
  await page.goto("/?open=janome");
  await expect(page.getByTestId("detail")).toBeVisible();
  await expect(note).toBeHidden();
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
    // The widths key may move (below the drawing on a phone, beside it at a desk): the drawing is drawn again, and then fills the window.
    await expect.poll(async () => Math.round((await box(page))?.width ?? 0)).toBeGreaterThanOrEqual(name === "phone" ? viewport.width : viewport.height * 0.75);
    const drawn = await box(page);
    expect(drawn.width).toBeGreaterThan(before.width);
    expect(drawn.y + drawn.height).toBeLessThanOrEqual(viewport.height);
    await expect(page.getByTestId("caption")).toBeInViewport({ ratio: 1 });
    await expect(page.getByTestId("player")).toBeInViewport({ ratio: 1 });
    await expect(page.getByTestId("close")).toBeHidden();
    await expect(page.getByTestId("download-png")).toBeHidden();
    await page.keyboard.press("Escape");
    await expect(page.getByTestId("close")).toBeVisible();
    await expect(page.getByTestId("detail")).toBeVisible();
    await expect.poll(async () => Math.round((await box(page))?.width ?? 0)).toBe(Math.round(before.width));
  });
}

test("a quick second tap on a button presses it again and never zooms the page on a phone", async ({ page }) => {
  await page.goto("/?open=kikyo");
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).touchAction)).toBe("manipulation");
});
