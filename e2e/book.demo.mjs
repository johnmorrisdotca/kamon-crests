import { expect, test } from "@playwright/test";

import { settleCard } from "./card-ready.mjs";

import { WORDS } from "../demo/words.js";

const book = async (page) => {
  await page.goto("/?tab=book&lang=en");
  return JSON.parse(await page.locator("#book-data").textContent()).cells;
};
const id = ({ frame, page, row, col }) => `cell-${frame}-${page}-${row}-${col}`;
const grid = (page) => page.getByTestId("book-grid");
const ndl = (frame) => `https://dl.ndl.go.jp/pid/780550/1/${frame}`;

test("the old Book address preserves the frame, page and cell in the Book tab", async ({ page }) => {
  const cells = await book(page);
  const cell = cells.find(({ frame, page }) => frame === 39 && page === "R");
  await page.goto(`/book/?frame=39&page=R&lang=en#${id(cell)}`);
  await expect(page.getByRole("tab", { name: WORDS.en.pageBook })).toHaveAttribute("aria-selected", "true");
  const url = new URL(page.url());
  expect(url.pathname).toBe("/");
  expect(url.searchParams.get("tab")).toBe("book");
  expect(url.searchParams.get("frame")).toBe("39");
  expect(url.searchParams.get("page")).toBe("R");
  expect(url.hash).toBe(`#${id(cell)}`);
  await expect(grid(page).locator(`#${id(cell)}`)).toBeFocused();
});

test("frame and page controls preserve the positions printed in the book", async ({ page }) => {
  const cells = await book(page);
  const { frame } = cells.find((cell) => cell.page === "R" && cells.some((left) => left.frame === cell.frame && left.page === "L"));
  await page.getByRole("button", { name: `Frame ${frame}`, exact: true }).click();
  await page.getByRole("button", { name: WORDS.en.book_page_L }).click();
  const expected = cells.filter((cell) => cell.frame === frame && cell.page === "L").sort((a, b) => a.row - b.row || a.col - b.col);
  const items = grid(page).locator("li");
  await expect(items).toHaveCount(expected.length);
  expect(await items.evaluateAll((nodes) => nodes.map((node) => node.id))).toEqual(expected.map(id));
  const boxes = await items.evaluateAll((nodes) => nodes.map((node) => {
    const { x, y } = node.getBoundingClientRect();
    return [x, y, Number(node.dataset.row), Number(node.dataset.col)];
  }));
  for (const [x, y, row, col] of boxes) {
    for (const [otherX, otherY, otherRow, otherCol] of boxes) {
      if (row === otherRow && col < otherCol) expect(x).toBeGreaterThan(otherX);
      if (row < otherRow) expect(y).toBeLessThan(otherY);
    }
  }
  const source = page.getByRole("link", { name: WORDS.en.book_source });
  await expect(source).toHaveAttribute("href", ndl(frame));
  await expect(source).toHaveAttribute("target", "_blank");
  await expect(items.first().locator(".book-cell-source")).toHaveAttribute("href", ndl(frame));
  await expect(items.first().locator(".book-cell-source")).toContainText(`Frame ${frame}, ${WORDS.en.book_page_L}, row`);
});

test("the frame strip has one tab stop and supports arrow navigation", async ({ page }) => {
  const cells = await book(page);
  const [first, next] = [...new Set(cells.map(({ frame }) => frame))];
  const strip = page.locator("#book-frames");
  const selected = strip.getByRole("button", { name: `Frame ${first}`, exact: true });
  await selected.focus();
  await expect(strip.locator('button[tabindex="0"]')).toHaveCount(1);
  await page.keyboard.press("ArrowRight");
  const second = strip.getByRole("button", { name: `Frame ${next}`, exact: true });
  await expect(second).toBeFocused();
  await expect(second).toHaveAttribute("aria-pressed", "true");
});

test("a drawing opens its crest card in the Book tab and links back to the cell", async ({ page }) => {
  const cells = await book(page);
  const drawn = cells.find(({ status, ourId }) =>
    status === "drawn" && cells.filter((cell) => cell.ourId === ourId).length === 1,
  );
  await page.goto(`/?tab=book&lang=en&frame=${drawn.frame}&page=${drawn.page}`);
  const tile = page.locator(`#${id(drawn)} .book-crest-link`);
  await tile.focus();
  await expect(tile).toBeFocused();
  await page.keyboard.press("Enter");
  await settleCard(page);
  await expect(page.getByRole("dialog")).toBeVisible();
  expect(new URL(page.url()).searchParams.get("tab")).toBe("book");
  await expect(page.locator("#detail-crest")).toHaveAttribute("crest", drawn.ourId);
  const back = page.getByTestId("detail-book").getByRole("link", { name: WORDS.en.book_card, exact: true });
  await expect(back).toBeVisible();
  await back.click();
  expect(new URL(page.url()).hash).toBe(`#${id(drawn)}`);
  await expect(grid(page).locator(`#${id(drawn)}`)).toBeFocused();
});

test("family, status and search narrow the book and survive reload", async ({ page }) => {
  const cells = await book(page);
  const picked = cells.find(({ status, family, reading }) => status === "drawn" && family && reading);
  const status = page.locator("#book-status");
  const family = page.locator("#book-family");
  const search = page.locator("#book-search");
  await status.selectOption("drawn");
  await family.selectOption(picked.family);
  await search.fill(picked.reading);
  await expect.poll(() => new URL(page.url()).searchParams.get("q")).toBe(picked.reading);
  const url = new URL(page.url());
  const params = url.searchParams;
  expect(params.get("family")).toBe(picked.family);
  expect(params.get("status")).toBe("drawn");
  expect(params.get("q")).toBe(picked.reading);
  const selected = cells.filter(({ frame, page, status, family, reading }) =>
    frame === Number(params.get("frame")) && page === params.get("page") && status === "drawn" && family === picked.family && reading.includes(picked.reading),
  );
  expect(selected.length).toBeGreaterThan(0);
  expect(await grid(page).locator("li").evaluateAll((nodes) => nodes.map((node) => node.id))).toEqual(selected.map(id));

  await page.reload();
  await expect(family).toHaveValue(picked.family);
  await expect(status).toHaveValue("drawn");
  await expect(search).toHaveValue(picked.reading);
  await expect(grid(page).locator("li")).toHaveCount(selected.length);
  await search.fill("00000000000");
  await expect(page.getByText(WORDS.en.book_empty)).toBeVisible();
  await expect(page.locator("#book-totals")).toContainText("0 cells");
});

test("Japanese labels, source location and status appear together", async ({ page }) => {
  const cells = await book(page);
  const held = cells.find((cell) => cell.status === "held");
  await page.goto(`/?tab=book&lang=ja&frame=${held.frame}&page=${held.page}&status=held`);
  await expect(page.locator("html")).toHaveAttribute("lang", "ja");
  await expect(page.getByRole("heading", { name: WORDS.ja.book_title })).toBeVisible();
  await expect(page.getByRole("button", { name: `${held.frame}コマ目`, exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("link", { name: WORDS.ja.book_source })).toHaveAttribute("href", ndl(held.frame));
  const tile = grid(page).locator(`#${id(held)}`);
  await expect(tile.locator(".book-status")).toHaveText(WORDS.ja.book_status_held);
  await expect(tile.locator(".book-cell-source")).toHaveText(`${held.frame}コマ目・${WORDS.ja[`book_page_${held.page}`]}・上から${held.row}段目・右から${held.col}列目`);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(await page.evaluate(() => window.innerWidth));
});

test("applies all five cloths to the book grid", async ({ page }) => {
  await book(page);
  await page.getByTestId("menu-button").click();
  const patches = page.getByTestId("menu-panel").locator("[data-cloth]");
  await expect(patches).toHaveCount(5);
  const backgrounds = new Set();
  for (const patch of await patches.all()) {
    await patch.click();
    await expect(patch).toHaveAttribute("aria-checked", "true");
    backgrounds.add(await grid(page).evaluate((node) => getComputedStyle(node).backgroundImage));
  }
  expect(backgrounds.size).toBe(5);
});
