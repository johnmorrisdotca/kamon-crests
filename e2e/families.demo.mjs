// The books' order: every crest in its own tile, family by family under a header, with the plain crest before its variants; the option that
// groups the frame variants and nothing else; the card's row of variants; a family's name finds the family first; the Coverage page's order.
import { expect, test } from "@playwright/test";

import { MANIFEST } from "../dist/manifest.js";

const ids = (page) => page.getByTestId("grid").locator("li button").evaluateAll((tiles) => tiles.map((tile) => tile.dataset.id));

test("shows every crest on its own tile, in the books' order: the plain crest before its crest in a circle", async ({ page }) => {
  await page.goto("/");
  const shown = await ids(page);
  expect(shown).toEqual(MANIFEST.map((record) => record.id));
  const at = (id) => shown.indexOf(id);
  // The id sort put 丸に… first: the bug the order fixes.
  expect(at("sagari-fuji")).toBeLessThan(at("maru-ni-sagari-fuji"));
  expect(at("tachibana")).toBeLessThan(at("maru-ni-tachibana"));
  // A family's other forms stand before its ringed twin, so the two are no longer neighbours once the family grows.
  expect(at("tachibana") + 1).toBe(at("maru-ni-tachibana"));
  await expect(page.getByTestId("count")).toHaveText(`${shown.length} of ${shown.length} crests`);
  // Each tile carries its catalogue number.
  await expect(page.getByTestId("tile-mitsuba-aoi")).toContainText("No. 1");
  await expect(page.getByTestId("tile-sagari-fuji")).toContainText(`No. ${MANIFEST.find((record) => record.id === "sagari-fuji").no}`);
});

test("puts each family under a light header: its name in both languages, its reading and how many crests; nothing folds", async ({ page }) => {
  await page.goto("/");
  const fuji = page.getByTestId("family-fuji");
  await expect(fuji.locator("header")).toContainText("Wisteria");
  await expect(fuji.locator("header")).toContainText("藤（ふじ）");
  // The family grows as crests land: the header counts what the manifest holds.
  const wisteria = MANIFEST.filter((record) => record.family === "fuji").length;
  await expect(fuji.locator("header")).toContainText(`${wisteria} crests`);
  await expect(fuji.locator("li")).toHaveCount(wisteria);
  await expect(page.getByTestId("family-janome").locator("header")).toContainText("1 crest");
  // The chapters stand in the books' order, and the families in each by reading.
  const heads = await page.locator(".chapter-head").allTextContents();
  expect(heads.map((text) => text.split(" · ")[0])).toEqual(["Plants", "Animals", "Nature and sky", "Objects and tools", "Buildings", "Patterns and shapes", "Characters and writing"]);
  const families = await page.locator(".family-head h4 > span").allTextContents();
  expect(families.slice(0, 3)).toEqual(["Aoi (hollyhock leaf)", "Hemp", "Ginkgo"]);
  expect(families.indexOf("Balloon flower")).toBeLessThan(families.indexOf("Chrysanthemum"));
  await expect(page.locator("details")).toHaveCount(0);
  // In Japanese the header names the family in Japanese first.
  await page.goto("/?lang=ja");
  await expect(page.getByTestId("family-fuji").locator("header")).toContainText("藤（ふじ）");
  await expect(page.getByTestId("family-fuji").locator("header")).toContainText(`${MANIFEST.filter((record) => record.family === "fuji").length}件`);
  await expect(page.getByTestId("tile-mitsuba-aoi")).toContainText("No.1");
});

test("Group by motif is off to begin with, kept in the address, and groups only the frame variants under the plain crest", async ({ page }) => {
  await page.goto("/");
  const group = page.getByTestId("grouped-row").getByRole("button", { name: "Group by motif" });
  await expect(group).toHaveAttribute("aria-pressed", "false");
  const all = await ids(page);
  await group.click();
  await expect(page).toHaveURL(/grouped=1/);
  await expect(group).toHaveAttribute("aria-pressed", "true");
  const shown = await ids(page);
  const hidden = all.filter((id) => !shown.includes(id));
  // Exactly the frame variants whose plain crest is shown are folded in, each into the tile of its base; nothing else is left out.
  const frames = MANIFEST.filter((record) => record.variantKind === "frame");
  expect(hidden.sort()).toEqual(frames.map((record) => record.id).sort());
  for (const id of ["maru-ni-sagari-fuji", "maru-ni-tachibana", "kikko-ni-katabami", "maru-ni-katabami"]) await expect(page.getByTestId(`tile-${id}`)).toHaveCount(0);
  await expect(page.getByTestId("tile-sagari-fuji").locator(".in-frames")).toHaveText("+1 in frames");
  await expect(page.getByTestId("tile-katabami").locator(".in-frames")).toHaveText("+2 in frames");
  await expect(page.getByTestId("tile-janome").locator(".in-frames")).toHaveCount(0);
  // The composites keep their own tiles: other motifs added, another count, another arrangement, and a ring of upright bars.
  for (const id of ["fuji-no-maru", "ichimonji-mitsuboshi", "hinomaru-ogi", "mukai-hashiai-karigane", "narabi-ya", "kaku-kuyo", "hidari-mitsu-tomoe", "maru-ni-tate-futatsu-hikiryo", "maru-ni-hitotsu-hikiryo", "maru-ni-kiku", "sasa-rindo"]) await expect(page.getByTestId(`tile-${id}`)).toBeVisible();
  for (const record of MANIFEST.filter((one) => one.variantKind !== "frame")) expect(shown, record.id).toContain(record.id);
  // The count still says how many crests there are, and the header how many in the family.
  await expect(page.getByTestId("count")).toHaveText(`${all.length} of ${all.length} crests`);
  await expect(page.getByTestId("family-fuji").locator("header")).toContainText(`${MANIFEST.filter((record) => record.family === "fuji").length} crests`);
  // Grouped, only the frame variants fold under their plain crest: the ringed hanging wisteria is the one that does.
  await expect(page.getByTestId("family-fuji").locator("li")).toHaveCount(MANIFEST.filter((record) => record.family === "fuji").length - 1);
  // Kept: the address brings it back, and a press ungroups.
  await page.reload();
  await expect(page.getByTestId("grouped-row").getByRole("button", { name: "Group by motif" })).toHaveAttribute("aria-pressed", "true");
  expect(await ids(page)).toEqual(shown);
  await page.getByTestId("grouped-row").getByRole("button", { name: "Group by motif" }).click();
  expect(await ids(page)).toEqual(all);
  await expect(page).not.toHaveURL(/grouped/);
});

test("never hides a crest under a plain crest that is not in the list: narrowed to rings, the ringed crests keep their tiles", async ({ page }) => {
  await page.goto("/?grouped=1&frame=ring");
  const shown = await ids(page);
  expect(shown).toContain("maru-ni-sagari-fuji");
  expect(shown).toContain("maru-ni-tachibana");
  expect(shown).toEqual(MANIFEST.filter((record) => record.frame.startsWith("ring-")).map((record) => record.id));
  await expect(page.locator(".in-frames")).toHaveCount(0);
});

test("opens the card with a row of the family's crests, the current one marked, and a tap shows another without closing the card", async ({ page }) => {
  await page.goto("/?open=sagari-fuji");
  await expect(page.getByTestId("detail")).toBeVisible();
  const row = page.getByTestId("variants");
  await expect(page.getByTestId("variants-block")).toBeVisible();
  await expect(page.getByTestId("variants-block").getByRole("heading", { name: "Variants" })).toBeVisible();
  expect(await row.locator("button").evaluateAll((tiles) => tiles.map((tile) => tile.dataset.id))).toEqual(MANIFEST.filter((record) => record.family === "fuji").map((record) => record.id));
  await expect(page.getByTestId("variant-sagari-fuji")).toHaveAttribute("aria-current", "true");
  await expect(page.getByTestId("variant-maru-ni-sagari-fuji")).not.toHaveAttribute("aria-current", "true");
  await expect(page.getByTestId("detail-family")).toHaveText(/^No\. \d+ · Wisteria · 藤（ふじ）$/);
  await expect(row.locator("kamon-crest svg").first()).toBeVisible();
  await page.getByTestId("variant-maru-ni-sagari-fuji").click();
  await expect(page.getByTestId("detail")).toBeVisible();
  await expect(page.getByTestId("detail-title")).toHaveText("Hanging wisteria in a circle");
  await expect(page).toHaveURL(/open=maru-ni-sagari-fuji/);
  await expect(page.getByTestId("variant-maru-ni-sagari-fuji")).toHaveAttribute("aria-current", "true");
  await expect(page.getByTestId("variant-sagari-fuji")).not.toHaveAttribute("aria-current", "true");
  await expect(page.getByTestId("detail-crest")).toHaveAttribute("crest", "maru-ni-sagari-fuji");
  // A crest still being redrawn has no steps to play, and says so; one drawn by construction plays.
  await expect(page.getByTestId("caption")).toContainText(/Step \d+ of \d+|Being redrawn/);
  // Pressing the current one does nothing; the card's controls still work after a switch.
  await page.getByTestId("variant-maru-ni-sagari-fuji").click();
  await expect(page.getByTestId("detail-title")).toHaveText("Hanging wisteria in a circle");
  await expect(page.getByTestId("parts-row").getByRole("button", { name: /^Frame/ })).toBeVisible();
  // A crest that is alone in its family has no row to show.
  await page.getByTestId("close").click();
  await page.goto("/?open=janome");
  await expect(page.getByTestId("detail")).toBeVisible();
  await expect(page.getByTestId("variants-block")).toBeHidden();
});

test("keeps the card's variants clear of its other controls, at a desk and on a phone", async ({ page }) => {
  await page.goto("/?open=sagari-fuji");
  await expect(page.getByTestId("variants-block")).toBeVisible();
  const clear = await page.locator("#detail").evaluate((card) => {
    const boxes = [...card.querySelectorAll("button, select, input, a[href]")].filter((node) => node.getClientRects().length > 0).map((node) => [node.dataset.id ?? node.id ?? node.textContent, node.getBoundingClientRect()]);
    const found = [];
    for (const [i, [a, one]] of boxes.entries()) for (const [b, other] of boxes.slice(i + 1)) if (one.left < other.right && other.left < one.right && one.top < other.bottom && other.top < one.bottom) found.push(`${a} over ${b}`);
    return found;
  });
  expect(clear).toEqual([]);
});

test("ranks a family's crests first, the plain form leading, when its name is searched", async ({ page }) => {
  await page.goto("/");
  for (const word of ["fuji", "藤", "wisteria"]) {
    await page.getByTestId("search").fill(word);
    // The family's crests lead in the manifest's order, however many it has.
    const family = MANIFEST.filter((record) => record.family === "fuji").map((record) => record.id);
    expect((await ids(page)).slice(0, family.length), word).toEqual(family);
    expect(family[0]).toBe("sagari-fuji");
  }
  await page.getByTestId("search").fill("kiri");
  expect((await ids(page))[0]).toBe("gosan-no-kiri");
});

test("lists the Coverage page's families in the books' order, with most missing first as an option, and a family's crests in the books' order", async ({ page }) => {
  await page.goto("/coverage/");
  const names = async () => {
    // The list stops at the first 24 families until it is asked for all of them.
    const more = page.getByTestId("families-more");
    if ((await more.getAttribute("aria-pressed")) === "false") await more.click();
    return page.getByTestId("families").locator("button .cov-name").allTextContents();
  };
  await expect(page.getByTestId("order-row").getByRole("button", { name: "As the books have them" })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByTestId("families-hint")).toHaveText("In the order of the books: by reading.");
  const books = await names();
  expect(books.indexOf("Aoi (hollyhock leaf)")).toBeLessThan(books.indexOf("Balloon flower"));
  expect(books.indexOf("Balloon flower")).toBeLessThan(books.indexOf("Chrysanthemum"));
  expect(books[0]).not.toBe("Chrysanthemum");
  await page.getByTestId("order-row").getByRole("button", { name: "Most missing first" }).click();
  await expect(page).toHaveURL(/order=missing/);
  await expect(page.getByTestId("families-hint")).toHaveText("The most still to draw first.");
  expect((await names())[0]).not.toBe("Aoi (hollyhock leaf)");
  await page.goto("/coverage/?ch=plants&order=missing");
  // Which family has the most still to draw changes as crests land: only that it is not the books' first.
  expect((await names())[0]).not.toBe("Aoi (hollyhock leaf)");
  await page.goto("/coverage/?ch=plants&fam=plants%2F%E8%97%A4&status=drawn");
  const drawn = await page.getByTestId("grid").locator("li .tile").evaluateAll((tiles) => tiles.map((tile) => tile.dataset.testid));
  expect(drawn).toEqual(expect.arrayContaining(["cov-tile-sagari-fuji", "cov-tile-maru-ni-sagari-fuji", "cov-tile-fuji-no-maru"]));
  expect(drawn.indexOf("cov-tile-sagari-fuji")).toBeLessThan(drawn.indexOf("cov-tile-maru-ni-sagari-fuji"));
});
