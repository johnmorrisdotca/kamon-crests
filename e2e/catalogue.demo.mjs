// The catalogue: every crest shown, found by its parts, and opened to be drawn.
import fs from "node:fs";

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

test("has the player on the card: pause and play, a step back and forward, a scrubber, and the step's caption while held", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("tile-mitsu-icho").click();
  const crest = page.getByTestId("detail-crest");
  const player = page.getByTestId("player");
  // Beside Draw it, Loop, Guides and the speeds, there without being asked for.
  await expect(player).toBeVisible();
  await expect(page.locator(".controls").getByTestId("player")).toHaveCount(1);
  await player.getByRole("button", { name: "Pause" }).click();
  await expect(player.getByRole("button", { name: "Play" })).toBeVisible();
  expect(await crest.evaluate((e) => e.paused)).toBe(true);
  await player.getByRole("button", { name: "Step forward" }).click();
  await expect.poll(() => crest.evaluate((e) => e.at)).toBeGreaterThanOrEqual(0);
  const at = await crest.evaluate((e) => e.at);
  // The caption says the step it is held at, and the scrubber stands on it.
  await expect(page.getByTestId("caption")).toHaveAttribute("data-step", String(at + 1));
  await expect(page.getByTestId("caption")).toContainText(new RegExp(`Step ${at + 1} of \\d+ · \\S`));
  await expect(page.getByTestId("scrub")).toHaveValue(String(at + 1));
  await player.getByRole("button", { name: "Step back" }).click();
  await expect(page.getByTestId("caption")).toHaveAttribute("data-step", String(at));
  const total = Number(await page.getByTestId("scrub").getAttribute("max"));
  await page.getByTestId("scrub").fill(String(total - 1));
  await expect(page.getByTestId("caption")).toContainText("Build it at each other place, clockwise");
  await player.getByRole("button", { name: "Play" }).click();
  await expect(player.getByRole("button", { name: "Pause" })).toBeVisible();
  await expect(page.getByTestId("caption")).toHaveText("Finished", { timeout: 20000 });
  await expect(player.getByRole("button", { name: "Play" })).toBeVisible();
  await expect(page.getByTestId("scrub")).toHaveValue(String(total));
  // The same card, with the same player, from the Complexity tab.
  await page.getByTestId("close").click();
  await page.getByRole("tab", { name: "Complexity" }).click();
  await page.getByTestId("tile-janome").click();
  await expect(player.getByRole("button", { name: "Pause" })).toBeVisible();
  await player.getByRole("button", { name: "Pause" }).click();
  await player.getByRole("button", { name: "Step forward" }).click();
  await expect(page.getByTestId("caption")).toContainText(/Step \d+ of 8/);
});

// The crest's shapes as they are shown: "1" at full strength, "0.12" faint. The guides, which are not filled, are left out.
const strengths = (page) => page.getByTestId("detail-crest").locator("svg > path").evaluateAll((paths) => paths.filter((p) => getComputedStyle(p).fill !== "none").map((p) => getComputedStyle(p).opacity));
const guideCount = (page) => page.getByTestId("detail-crest").locator("svg > path").evaluateAll((paths) => paths.filter((p) => getComputedStyle(p).fill === "none").length);

test("explains a part and shows it alone", async ({ page }) => {
  await page.goto("/?open=maru-ni-juji");
  await expect(page.getByTestId("detail")).toBeVisible();
  const motif = page.getByTestId("parts-row").getByRole("button", { name: /Motif: Cross/ });
  await motif.click();
  await expect(motif).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByTestId("part-about")).toContainText("Two bars crossing at right angles.");
  // The ring is faint, the cross is not, and the cross's own guides are there.
  await expect.poll(() => strengths(page)).toEqual(["0.12", "1"]);
  expect(await guideCount(page)).toBeGreaterThan(0);
  await motif.click();
  await expect(page.getByTestId("part-about")).toContainText("Press a part");
  await expect.poll(() => strengths(page)).toEqual(["1", "1"]);
  expect(await guideCount(page)).toBe(0);
});

test("shows each part alone on a crest of one motif and no frame, where every chip once named the same shapes", async ({ page }) => {
  await page.goto("/?open=mitsuba-aoi");
  await expect(page.getByTestId("detail")).toBeVisible();
  const chip = (name) => page.getByTestId("parts-row").getByRole("button", { name });
  const all = (await strengths(page)).length;
  // Count: one leaf of the three, the others not yet turned to their places.
  await chip(/^Count/).click();
  await expect(page.getByTestId("part-about")).toHaveText("3 × Hollyhock: one is drawn, then turned or flipped to its other places.");
  await expect.poll(async () => (await strengths(page)).length).toBe(all / 3);
  expect(new Set(await strengths(page))).toEqual(new Set(["1"]));
  expect(await guideCount(page)).toBeGreaterThan(10);
  // Arrangement: the whole motif, and only the lines it is turned about and mirrored in.
  await chip(/^Arrangement/).click();
  await expect(chip(/^Count/)).toHaveAttribute("aria-pressed", "false");
  await expect(page.getByTestId("part-about")).toContainText("The lines are the places it is turned to, and its mirror lines.");
  await expect.poll(async () => (await strengths(page)).length).toBe(all);
  await expect.poll(() => guideCount(page)).toBe(6);
  // Frame: there is none, the words say so, and the whole crest is faint with nothing to draw.
  await chip(/^Frame/).click();
  await expect(page.getByTestId("part-about")).toContainText("No frame");
  await expect.poll(async () => [...new Set(await strengths(page))]).toEqual(["0.12"]);
  await expect(page.getByTestId("draw-part")).toBeDisabled();
  // Motif: all of it, with every one of its guides.
  await chip(/^Motif/).click();
  await expect.poll(async () => (await strengths(page)).filter((one) => one === "1").length).toBe(all);
  await expect(page.getByTestId("draw-part")).toBeEnabled();
});

test("a part's chip is a button that Enter and Space toggle, and Esc shows the whole crest before it closes the panel", async ({ page }) => {
  await page.goto("/?open=maru-ni-juji");
  const frame = page.getByTestId("parts-row").getByRole("button", { name: /^Frame/ });
  await expect(page.getByTestId("part-actions")).toBeHidden();
  await frame.focus();
  await page.keyboard.press("Enter");
  await expect(frame).toHaveAttribute("aria-pressed", "true");
  await expect.poll(() => strengths(page)).toEqual(["0.12", "1"]);
  await page.keyboard.press("Space");
  await expect(frame).toHaveAttribute("aria-pressed", "false");
  await expect.poll(() => strengths(page)).toEqual(["1", "1"]);
  await page.keyboard.press("Space");
  await expect(frame).toHaveAttribute("aria-pressed", "true");
  await page.keyboard.press("Escape");
  await expect(frame).toHaveAttribute("aria-pressed", "false");
  await expect(page.getByTestId("detail")).toBeVisible();
  await expect.poll(() => strengths(page)).toEqual(["1", "1"]);
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("detail")).toBeHidden();
});

test("draws one part alone: only its steps, and stepping keeps the rest of the crest faint", async ({ page }) => {
  await page.goto("/?open=maru-ni-juji");
  const crest = page.getByTestId("detail-crest");
  await page.getByTestId("parts-row").getByRole("button", { name: /Motif: Cross/ }).click();
  await expect.poll(() => strengths(page)).toEqual(["0.12", "1"]);
  const whole = await page.evaluate(async () => (await (await import("./dist/load.js")).crestSteps("maru-ni-juji")).steps.length);
  const total = Number(await page.getByTestId("scrub").getAttribute("max"));
  expect(total).toBeLessThan(whole);
  // A step back on the still picture: the cross is gone, its guides stay, the ring is still faint.
  await page.getByTestId("step-back").click();
  await page.getByTestId("step-back").click();
  await expect.poll(() => strengths(page)).toEqual(["0.12"]);
  expect(await guideCount(page)).toBeGreaterThan(0);
  await page.getByTestId("draw-part").click();
  await expect(crest.locator("svg style")).toHaveCount(1);
  await expect(page.getByTestId("caption")).toContainText(new RegExp(`Step \\d+ of ${total} · `));
  // The drawing never shows more than the part's steps, and ends back on the part alone with its guides.
  await expect(crest.locator("svg style")).toHaveCount(0, { timeout: 20000 });
  await expect(page.getByTestId("caption")).toContainText(`Step ${total - 1} of ${total} · Fill the cross`);
  await expect.poll(() => strengths(page)).toEqual(["0.12", "1"]);
  expect(await guideCount(page)).toBeGreaterThan(0);
  // Draw it (the whole crest) lets the part go.
  await page.getByTestId("draw").click();
  await expect(page.getByTestId("parts-row").getByRole("button", { name: /Motif: Cross/ })).toHaveAttribute("aria-pressed", "false");
  await expect(page.getByTestId("caption")).toContainText(new RegExp(`of ${whole}`));
});

test("finds more crests with a part from its chip", async ({ page }) => {
  await page.goto("/?open=mitsuba-aoi");
  await page.getByTestId("parts-row").getByRole("button", { name: /^Motif/ }).click();
  await expect(page.getByTestId("more-part")).toHaveText("More crests with this part");
  await expect(page.getByTestId("more-part")).toHaveAttribute("href", "?kind=plant&motif=hollyhock");
  await page.getByTestId("more-part").click();
  await expect(page.getByTestId("detail")).toBeHidden();
  await expect(page).toHaveURL(/motif=hollyhock/);
  const ids = await page.getByTestId("grid").locator("li button").evaluateAll((tiles) => tiles.map((tile) => tile.dataset.id));
  expect(ids).toEqual(["maru-ni-mitsuba-aoi", "mitsuba-aoi"]);
  await page.getByTestId("tile-maru-ni-mitsuba-aoi").click();
  await page.getByTestId("parts-row").getByRole("button", { name: /^Count/ }).click();
  await expect(page.getByTestId("more-part")).toHaveAttribute("href", "?count=3");
  await page.getByTestId("parts-row").getByRole("button", { name: /^Frame/ }).click();
  await expect(page.getByTestId("more-part")).toHaveAttribute("href", "?frame=ring");
  await page.getByTestId("more-part").click();
  await expect(page.getByTestId("frame-row").getByRole("button", { name: /^Ring/ })).toHaveAttribute("aria-pressed", "true");
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

test("says a crest's counts on its card, in English and in Japanese", async ({ page }) => {
  await page.goto("/?open=janome");
  await expect(page.getByTestId("stats")).toHaveText("Complexity 29 · Simple · Circles 2 · Ruled lines 0 · Arcs 2 · Steps 8 · Compass widths 2 · Fills 1 · Symmetry any turn, mirror");
  await page.goto("/?lang=ja&open=mitsuba-aoi");
  await expect(page.getByTestId("stats")).toContainText(/^複雑さ 77・名人・円 \d+・直線 \d+・弧 \d+・手順 \d+・コンパス幅 \d+種・塗り 9・対称 3回対称・線対称$/);
});

test("the Centres, Widths and Fill switches: dots and numbers on the underdrawing, line art with the fill off, kept for the session, and the downloads follow", async ({ page }) => {
  await page.goto("/?open=katabami");
  const crest = page.getByTestId("detail-crest");
  await expect(crest.locator("svg")).toHaveCount(1);
  for (const name of ["centres", "widths", "fill", "compass-arm"]) await expect(page.getByTestId(name)).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByTestId("compass-arm")).toHaveText("Compass arm");
  // Held on the first circle: its centre is marked with a dot and its width's number, and the compass arm stands from that centre, its dot bold.
  await crest.evaluate((e) => e.step(1));
  await expect(crest.locator("svg > circle")).not.toHaveCount(0);
  await expect(crest.locator('svg > g[stroke-width=".5"] > path')).toHaveCount(1);
  await expect(crest.locator('svg > g[stroke-width=".5"] > circle')).toHaveCount(1);
  // The Compass arm switch takes it away, and nothing else; on again for the rest.
  await page.getByTestId("compass-arm").click();
  await expect(page.getByTestId("compass-arm")).toHaveAttribute("aria-pressed", "false");
  await expect(crest).toHaveAttribute("compass-arm", "off");
  await crest.evaluate((e) => e.step(1));
  await expect(crest.locator('svg > g[stroke-width=".5"]')).toHaveCount(0);
  await expect(crest.locator("svg > circle")).not.toHaveCount(0);
  await page.getByTestId("compass-arm").click();
  await crest.evaluate((e) => e.step(1));
  await expect(crest.locator('svg > g[stroke-width=".5"]')).toHaveCount(1);
  await expect(crest.locator("svg > text").first()).toHaveText("1");
  await expect(page.getByTestId("caption")).toContainText("Underdrawing: set the compass to width 1, put its point on 1, strike the circle");
  await page.getByTestId("centres").click();
  await expect(crest.locator("svg > circle")).toHaveCount(0);
  await expect(crest.locator("svg > text")).not.toHaveCount(0);
  await page.getByTestId("widths").click();
  await expect(crest.locator("svg > text")).toHaveCount(0);
  // The fill off: the finished crest is its own outlines, unfilled.
  await page.getByTestId("fill").click();
  await expect(page.getByTestId("fill")).toHaveAttribute("aria-pressed", "false");
  await crest.evaluate((e) => e.step(999));
  const fills = () => crest.locator("svg path").evaluateAll((paths) => [...new Set(paths.map((p) => getComputedStyle(p).fill))]);
  expect(await fills()).toEqual(["none"]);
  const [download] = await Promise.all([page.waitForEvent("download"), page.getByTestId("download-svg").click()]);
  const saved = fs.readFileSync(await download.path(), "utf8");
  expect(saved).toContain('<path fill="none" stroke="currentColor" stroke-width=".6" d="');
  expect(saved).not.toMatch(/<path d="/);
  // Played, it is traced and never filled; and the choice is still there after the page is loaded again.
  await page.getByTestId("draw").click();
  await expect(crest.locator("svg style")).toHaveCount(1);
  expect(await fills()).toEqual(["none"]);
  await page.reload();
  await expect(page.getByTestId("fill")).toHaveAttribute("aria-pressed", "false");
  await expect(page.getByTestId("centres")).toHaveAttribute("aria-pressed", "false");
  await expect(page.getByTestId("detail-crest")).toHaveAttribute("fill", "off");
  await page.getByTestId("fill").click();
  await expect(page.getByTestId("detail-crest")).not.toHaveAttribute("fill", "off");
});
