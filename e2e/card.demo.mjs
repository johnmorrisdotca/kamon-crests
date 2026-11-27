// The card's layout: no control over another at a desk or on a phone, and the drawing at each size and in the whole window.
import { expect, test } from "@playwright/test";

import { settleCard } from "./card-ready.mjs";

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
    await settleCard(page);
    await page.getByTestId("options").click();
    await page.getByTestId("card-parts").click();
    await page.getByTestId("parts-row").getByRole("button").first().click();
    for (const size of ["S", "M", "L"]) {
      const button = page.getByTestId("view").getByRole("button", { name: size, exact: true });
      await button.click();
      await expect(button).toHaveAttribute("aria-pressed", "true");
      await settleCard(page);
      expect(await overlaps(page), size).toEqual([]);
    }
    // The size of the PNG stands apart from its button, and the row stays inside the card.
    const select = await page.getByTestId("png-size").boundingBox();
    const png = await page.getByTestId("download-png").boundingBox();
    expect(png.y > select.y + select.height || png.x - (select.x + select.width) >= 8).toBe(true);
    expect(png.x + png.width).toBeLessThanOrEqual(viewport.width);
    await page.getByTestId("full").click();
    await expect(page.getByTestId("detail")).toHaveAttribute("data-full", "");
    await settleCard(page);
    expect(await overlaps(page), "full").toEqual([]);
  });
}

// The drawing's box (the crest and its widths key) and every control on the card: none over another, at each drawing size and in the whole window.
for (const [name, viewport] of SIZES) {
  for (const id of ["izutsu", "maru-ni-mitsuba-aoi"]) {
    test(`keeps the widths key beside or below the drawing and clear of the controls, at each drawing size (${name}, ${id})`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto(`/?open=${id}`);
      const card = page.getByTestId("detail");
      const crest = page.getByTestId("detail-crest");
      await settleCard(page);
      const clear = async (label) => {
        // Held on a step that strikes a circle, so that the key is there.
        await crest.evaluate((e) => e.step(4));
        // The size change can redraw the SVG and move the controls. Read their boxes together after layout settles.
        await expect.poll(() => card.evaluate(async (dialog) => {
          await document.fonts.ready;
          const frame = () => new Promise((resolve) => window.requestAnimationFrame(resolve));
          const measure = () => {
            const drawing = dialog.querySelector("#detail-crest > svg[viewBox]");
            const keys = dialog.querySelectorAll("#detail-crest > svg > g[font-size]");
            if (drawing === null || keys.length !== 1) return null;
            const svg = drawing.getBoundingClientRect();
            const key = keys[0].getBoundingClientRect();
            const view = drawing.viewBox.baseVal;
            const scale = Math.min(svg.width / view.width, svg.height / view.height);
            const controls = [...dialog.querySelectorAll("button, select, input, a[href]")].filter((node) => node.getClientRects().length > 0);
            const over = controls.filter((node) => {
              const box = node.getBoundingClientRect();
              return box.left < svg.right && svg.left < box.right && box.top < svg.bottom && svg.top < box.bottom;
            }).map((node) => node.id || node.textContent);

            return { svg: svg.toJSON(), key: key.toJSON(), scale, over };
          };
          await frame();
          const before = measure();
          await frame();
          const after = measure();
          if (after === null || JSON.stringify(before) !== JSON.stringify(after)) return null;
          const { svg, key, scale, over } = after;

          return {
            keyWithinDrawing: key.left >= svg.left - 1 && key.top >= svg.top - 1 && key.right <= svg.right + 1 && key.bottom <= svg.bottom + 1,
            keyOutsideCrest: key.left >= svg.left + 200 * scale - 1 || key.top >= svg.top + 200 * scale - 1,
            controlsOverDrawing: over,
          };
        }), label).toEqual({ keyWithinDrawing: true, keyOutsideCrest: true, controlsOverDrawing: [] });
      };
      for (const size of ["S", "M", "L"]) {
        await page.getByTestId("view").getByRole("button", { name: size, exact: true }).click();
        await expect(card).toHaveAttribute("data-view", size.toLowerCase());
        await settleCard(page);
        await clear(size);
      }
      await page.getByTestId("full").click();
      await expect(card).toHaveAttribute("data-full", "");
      await settleCard(page);
      await clear("full");
    });
  }
}

test("draws the crest small, medium or large as a vector, large to begin with at a desk, and remembers the size for the session", async ({ page }) => {
  await page.setViewportSize(SIZES[0][1]);
  await page.goto("/?open=maru-ni-mitsuba-aoi");
  const view = page.getByTestId("view");
  await settleCard(page);
  await expect(view.getByRole("button", { name: "L", exact: true })).toHaveAttribute("aria-pressed", "true");
  // A new size can move the widths key (beside the crest or below it), and the drawing is drawn again: wait for it.
  const sizes = {};
  for (const size of ["S", "M", "L"]) {
    const button = view.getByRole("button", { name: size, exact: true });
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await settleCard(page);
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
  const medium = view.getByRole("button", { name: "M", exact: true });
  await medium.click();
  await expect(medium).toHaveAttribute("aria-pressed", "true");
  await settleCard(page);
  await page.reload();
  await settleCard(page);
  await expect(medium).toHaveAttribute("aria-pressed", "true");
  await expect.poll(async () => Math.round(await square(page))).toBe(sizes.M);
});

test("lays the card out at a desk with the picture filling its column and the text beside it, no empty block under either", async ({ page }) => {
  await page.setViewportSize(SIZES[0][1]);
  await page.goto("/?open=mitsuba-aoi");
  await expect(page.getByTestId("detail")).toBeVisible();
  await expect(page.getByTestId("detail-crest")).toHaveAttribute("crest", "mitsuba-aoi");
  const pic = await page.locator(".stage-pic").boundingBox();
  // The box is as tall as it will ever be from the first moment: it never grows when the first step is drawn (the widths key's room is kept from the start).
  await expect(page.getByTestId("detail-crest").locator("svg")).toHaveCount(1);
  await expect(page.getByTestId("caption")).toHaveAttribute("data-step", /\d+/);
  expect(await page.locator(".stage-pic").boundingBox()).toEqual(pic);
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
  await settleCard(page);
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
  await page.goto("/?open=maru-ni-hidari-manji", { waitUntil: "domcontentloaded" });
  await settleCard(page);
  const note = page.getByTestId("crest-note");
  await expect(note).toHaveText("The manji (卍) is a Buddhist sign used as a Japanese family crest for centuries; it is unrelated to the Nazi swastika.");
  await page.goto("/?open=maru-ni-hidari-manji&lang=ja", { waitUntil: "domcontentloaded" });
  await settleCard(page);
  await expect(note).toHaveText("卍（まんじ）は仏教のしるしで、古くから日本の家紋に使われてきました。ナチスのハーケンクロイツとは関係がありません。");
  await page.goto("/?open=janome", { waitUntil: "domcontentloaded" });
  await settleCard(page);
  await expect(page.getByTestId("detail")).toBeVisible();
  await expect(note).toBeHidden();
});

test("makes Large the screen's width on a phone", async ({ page }) => {
  await page.setViewportSize(SIZES[1][1]);
  await page.goto("/?open=maru-ni-mitsuba-aoi");
  const crest = page.getByTestId("detail-crest");
  await settleCard(page);
  await page.getByTestId("view").getByRole("button", { name: "L", exact: true }).click();
  await expect(page.getByTestId("detail")).toHaveAttribute("data-view", "l");
  await settleCard(page);
  const width = SIZES[1][1].width;
  await expect.poll(() => crest.evaluate((element, screenWidth) => {
    const svg = element.querySelector("svg");
    if (svg === null) return null;
    const drawn = svg.getBoundingClientRect();
    return { x: Math.round(drawn.x), width: Math.round(drawn.width), overflow: document.documentElement.scrollWidth > screenWidth };
  }, width)).toEqual({ x: 0, width, overflow: false });
});

for (const [name, viewport] of SIZES) {
  test(`fills the window with the drawing, its player and its caption, and Esc leaves (${name})`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/?open=maru-ni-mitsuba-aoi");
    await settleCard(page);
    const before = await box(page);
    await page.getByTestId("full").click();
    await expect(page.getByTestId("detail")).toHaveAttribute("data-full", "");
    await settleCard(page);
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
    await settleCard(page);
    await expect(page.getByTestId("detail")).toBeVisible();
    await expect.poll(async () => Math.round((await box(page))?.width ?? 0)).toBe(Math.round(before.width));
  });
}

test("a quick second tap on a button presses it again and never zooms the page on a phone", async ({ page }) => {
  await page.goto("/?open=kikyo");
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).touchAction)).toBe("manipulation");
});
