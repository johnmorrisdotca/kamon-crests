// The catalogue: every crest shown, found by its parts, and opened to be drawn.
import fs from "node:fs";

import { expect, test } from "@playwright/test";

import { MANIFEST } from "../dist/manifest.js";

// The Options and Parts folds on the crest card are closed to begin with and stay as they were left: a test that uses a switch or a part chip leaves its fold open.
const options = (page) => page.addInitScript(() => localStorage.setItem("kamon-options", "open"));
const partsOpen = (page) => page.addInitScript(() => localStorage.setItem("kamon-parts", "open"));

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
  await page.getByTestId("filters-toggle").click();
  await page.getByTestId("frame-row").getByRole("button", { name: /^Ring/ }).click();
  const ringed = await page.getByTestId("grid").locator("li").count();
  expect(ringed).toBeGreaterThan(10);
  // The ringed crests grow with the catalogue: some, and far from all.
  expect(ringed).toBeLessThan(MANIFEST.length / 2);
  await page.getByTestId("kind-row").getByRole("button", { name: /^Plants/ }).click();
  await page.getByTestId("motif-row").getByRole("button", { name: /^Paulownia/ }).click();
  // Every ringed paulownia crest the catalogue has, and no other: the family grows as crests land.
  const ringedPaulownia = MANIFEST.filter((record) => record.frame.startsWith("ring-") && record.motifs.some((use) => use.motif === "paulownia")).length;
  await expect(page.getByTestId("grid").locator("li")).toHaveCount(ringedPaulownia);
  await expect(page.getByTestId("tile-maru-ni-gosan-no-kiri")).toBeVisible();
  await page.getByTestId("clear").click();
  expect(await page.getByTestId("grid").locator("li").count()).toBeGreaterThanOrEqual(60);
  await page.getByTestId("count-row").getByRole("button", { name: /^3/ }).click();
  const threes = await page.getByTestId("grid").locator("li button").evaluateAll((tiles) => tiles.map((tile) => tile.dataset.id));
  expect(threes).toEqual(MANIFEST.filter((record) => record.motifs.some((use) => use.count === 3)).map((record) => record.id));
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
  await expect(page.getByTestId("construction-note")).toHaveText(/^[^ぁ-んァ-ヶ一-龠]{30,}$/);
  const crest = page.getByTestId("detail-crest");
  const caption = page.getByTestId("caption");
  await expect(crest.locator("svg style")).toHaveCount(1);
  await expect(caption).toContainText(/Step \d+ of \d+/);
  // Wait for this drawing to finish before checking what the card says.
  await crest.evaluate((e) => e.finished);
  await expect(caption).toHaveText("Finished");
  // Draw it again.
  await page.getByTestId("draw").click();
  await expect(caption).toContainText(/Step|Drawing/);
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
  await partsOpen(page);
  await page.goto("/?open=maru-ni-juji");
  await expect(page.getByTestId("detail")).toBeVisible();
  const motif = page.getByTestId("parts-row").getByRole("button", { name: /Motif: Cross/ });
  await motif.click();
  await expect(motif).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByTestId("part-about")).toContainText("Two bars crossing at right angles.");
  // The ring is faint, the cross is not, and the cross's own guides are there.
  await expect.poll(() => strengths(page)).toEqual(["0.12", "1"]);
  await expect.poll(() => guideCount(page)).toBeGreaterThan(0);
  await motif.click();
  await expect(page.getByTestId("part-about")).toContainText("Press a part");
  await expect.poll(() => strengths(page)).toEqual(["1", "1"]);
  await expect.poll(() => guideCount(page)).toBe(0);
});

test("shows each part alone on a crest of one motif and no frame, where every chip once named the same shapes", async ({ page }) => {
  await partsOpen(page);
  await page.goto("/?open=mitsuba-aoi");
  await expect(page.getByTestId("detail")).toBeVisible();
  const chip = (name) => page.getByTestId("parts-row").getByRole("button", { name });
  // The card draws a moment after it opens: wait for the crest before counting its shapes, or a slow phone reads none.
  await expect.poll(async () => (await strengths(page)).length).toBeGreaterThan(0);
  const all = (await strengths(page)).length;
  // Count: one leaf of the three, the others not yet turned to their places.
  await chip(/^Count/).click();
  await expect(page.getByTestId("part-about")).toHaveText("3 × Hollyhock: one is drawn, then turned or flipped to its other places.");
  await expect.poll(async () => (await strengths(page)).length).toBe(all / 3);
  expect(new Set(await strengths(page))).toEqual(new Set(["1"]));
  await expect.poll(() => guideCount(page)).toBeGreaterThan(10);
  // Arrangement: the whole motif on its own guides, and the six lines it is turned about and mirrored in.
  await chip(/^Arrangement/).click();
  await expect(chip(/^Count/)).toHaveAttribute("aria-pressed", "false");
  await expect(page.getByTestId("part-about")).toContainText("The lines are the places it is turned to, and its mirror lines.");
  await expect.poll(async () => (await strengths(page)).length).toBe(all);
  await expect.poll(() => guideCount(page)).toBeGreaterThan(6);
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
  await partsOpen(page);
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
  await partsOpen(page);
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
  await expect.poll(() => guideCount(page)).toBeGreaterThan(0);
  await page.getByTestId("draw-part").click();
  await expect(crest.locator("svg style")).toHaveCount(1);
  await expect(page.getByTestId("caption")).toContainText(new RegExp(`Step \\d+ of ${total} · `));
  // The drawing never shows more than the part's steps, and ends back on the part alone with its guides.
  await expect(crest.locator("svg style")).toHaveCount(0, { timeout: 20000 });
  await expect(page.getByTestId("caption")).toContainText(`Step ${total - 1} of ${total} · Fill the cross`);
  await expect.poll(() => strengths(page)).toEqual(["0.12", "1"]);
  await expect.poll(() => guideCount(page)).toBeGreaterThan(0);
  // Draw it (the whole crest) lets the part go.
  await page.getByTestId("draw").click();
  await expect(page.getByTestId("parts-row").getByRole("button", { name: /Motif: Cross/ })).toHaveAttribute("aria-pressed", "false");
  await expect(page.getByTestId("caption")).toContainText(new RegExp(`of ${whole}`));
});

test("keeps the parts under a Parts button: closed to begin with, opened by a press, and kept as it was left", async ({ page }) => {
  await page.goto("/?open=maru-ni-mitsuba-aoi");
  await expect(page.getByTestId("detail")).toBeVisible();
  const toggle = page.getByTestId("card-parts");
  await expect(toggle).toHaveText("Parts");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toHaveAttribute("aria-controls", "card-parts-panel");
  await expect(page.getByTestId("card-parts-panel")).toBeHidden();
  await expect(page.getByTestId("parts-row")).toBeHidden();
  await expect(page.getByTestId("part-about")).toBeHidden();
  // The keyboard reaches it and shows where it is.
  await toggle.focus();
  expect(await toggle.evaluate((node) => getComputedStyle(node).outlineStyle)).not.toBe("none");
  await page.keyboard.press("Enter");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByTestId("parts-row")).toBeVisible();
  await expect(page.getByTestId("part-about")).toContainText("Press a part");
  // Kept as it was left, on this device.
  await page.goto("/?open=maru-ni-mitsuba-aoi");
  await expect(page.getByTestId("card-parts")).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByTestId("parts-row")).toBeVisible();
  await page.getByTestId("card-parts").click();
  await page.goto("/?open=maru-ni-mitsuba-aoi");
  await expect(page.getByTestId("card-parts")).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByTestId("parts-row")).toBeHidden();
});

test("opens the Parts panel for a part named in the address, and for a part pressed or tapped, without remembering that", async ({ page }) => {
  await page.goto("/?open=maru-ni-mitsuba-aoi&part=count");
  await expect(page.getByTestId("detail")).toBeVisible();
  const pressedChip = page.locator('#parts-row [aria-pressed="true"]');
  await expect(pressedChip).toHaveCount(1);
  await expect(pressedChip).toContainText("Count");
  await expect(page.getByTestId("card-parts")).toHaveAttribute("aria-expanded", "true");
  await expect(pressedChip).toBeVisible();
  await expect(page.getByTestId("part-about")).toBeVisible();
  await expect(page.getByTestId("more-part")).toBeVisible();
  // Closing the panel puts the whole crest back, so no part stays shown alone behind a closed panel.
  await page.getByTestId("card-parts").click();
  await expect(page.getByTestId("card-parts")).toHaveAttribute("aria-expanded", "false");
  await expect(pressedChip).toHaveCount(0);
  await expect.poll(async () => (await strengths(page)).every((one) => one === "1")).toBe(true);
  // A name that is no part leaves the panel as it was.
  await page.goto("/?open=maru-ni-mitsuba-aoi&part=nothing");
  await expect(page.getByTestId("detail")).toBeVisible();
  await expect(page.getByTestId("card-parts")).toHaveAttribute("aria-expanded", "false");
  // What the address opened was not what the toggle keeps: it is still closed on the next visit.
  await page.goto("/?open=maru-ni-mitsuba-aoi&part=frame");
  await expect(page.getByTestId("card-parts")).toHaveAttribute("aria-expanded", "true", { timeout: 15000 });
  await page.goto("/?open=maru-ni-mitsuba-aoi");
  await expect(page.getByTestId("card-parts")).toHaveAttribute("aria-expanded", "false");
});

test("finds more crests with a part from its chip", async ({ page }) => {
  await partsOpen(page);
  await page.goto("/?open=mitsuba-aoi");
  await page.getByTestId("parts-row").getByRole("button", { name: /^Motif/ }).click();
  await expect(page.getByTestId("more-part")).toHaveText("More crests with this part");
  await expect(page.getByTestId("more-part")).toHaveAttribute("href", "?kind=plant&motif=hollyhock");
  await page.getByTestId("more-part").click();
  await expect(page.getByTestId("detail")).toBeHidden();
  await expect(page).toHaveURL(/motif=hollyhock/);
  const ids = await page.getByTestId("grid").locator("li button").evaluateAll((tiles) => tiles.map((tile) => tile.dataset.id));
  // Every hollyhock crest the catalogue has, in its order: the family grows as crests land.
  expect(ids).toEqual(MANIFEST.filter((record) => record.motifs.some((use) => use.motif === "hollyhock")).map((record) => record.id));
  expect(ids[0]).toBe("mitsuba-aoi");
  expect(ids).toContain("maru-ni-mitsuba-aoi");
  await page.getByTestId("tile-maru-ni-mitsuba-aoi").click();
  await page.getByTestId("parts-row").getByRole("button", { name: /^Count/ }).click();
  await expect(page.getByTestId("more-part")).toHaveAttribute("href", "?count=3");
  await page.getByTestId("parts-row").getByRole("button", { name: /^Frame/ }).click();
  await expect(page.getByTestId("more-part")).toHaveAttribute("href", "?frame=ring");
  await page.getByTestId("more-part").click();
  await page.getByTestId("filters-toggle").click();
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
  await page.getByTestId("filters-toggle").click();
  await page.getByTestId("used-row").getByRole("button", { name: /^Has a user/ }).click();
  await expect(page.getByTestId("tile-igeta")).toBeVisible();
  await expect(page.getByTestId("grid").locator("li")).toHaveCount(MANIFEST.filter(({ usedBy }) => usedBy.length > 0).length);
});

test("switches to Japanese and back, naming crests and parts in each", async ({ page }) => {
  await page.goto("/?lang=ja");
  await expect(page.getByTestId("tile-mitsuba-aoi")).toContainText("三つ葉葵");
  await expect(page.getByTestId("count")).toContainText("件");
  await page.getByTestId("tile-mitsuba-aoi").click();
  await expect(page.getByTestId("detail-title")).toHaveText("三つ葉葵");
  await expect(page.getByTestId("parts-row")).toContainText("図柄: 葵");
  await expect(page.getByTestId("construction-note")).toHaveText(/[ぁ-んァ-ヶ一-龠]。$/);
  await page.getByTestId("close").click();
  await page.goto("/?lang=en");
  await expect(page.getByTestId("tile-mitsuba-aoi")).toContainText("Three hollyhock leaves");
});

test("keeps the choices in the address", async ({ page }) => {
  await page.goto("/?kind=animal&count=1");
  const ids = await page.getByTestId("grid").locator("li button").evaluateAll((tiles) => tiles.map((tile) => tile.dataset.id));
  expect(ids).toEqual(expect.arrayContaining(["usagi", "tonbo"]));
  await page.getByTestId("filters-toggle").click();
  await expect(page.getByTestId("kind-row").getByRole("button", { name: /^Animals/ })).toHaveAttribute("aria-pressed", "true");
});

test("says a crest's counts on its card, in English and in Japanese", async ({ page }) => {
  await page.goto("/?open=janome");
  await expect(page.getByTestId("stats")).toHaveText("Complexity 29 · Simple · Circles 2 · Ruled lines 0 · Arcs 2 · Steps 8 · Compass widths 2 · Fills 1 · Symmetry any turn, mirror");
  await page.goto("/?lang=ja&open=mitsuba-aoi");
  await expect(page.getByTestId("stats")).toContainText(/^複雑さ 82・達人・円 \d+・直線 \d+・弧 \d+・手順 \d+・コンパス幅 \d+種・塗り 9・対称 3回対称・線対称$/);
});

test("the Centres, Widths and Fill switches: dots and numbers on the underdrawing, line art with the fill off, kept for the session, and the downloads follow", async ({ page }) => {
  await options(page);
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
  // The first circle is the outer one, the widest (the field is set out before anything inside it).
  await expect(crest.locator("svg > text").first()).toHaveText("5");
  await expect(page.getByTestId("caption")).toContainText("Underdrawing: set the compass to width 5, put its point on 5, strike the circle");
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
  // A file for drawing programs: the colour is written in (Illustrator does not read currentColor), and it has a printed size.
  expect(saved).not.toContain("currentColor");
  expect(saved).toMatch(/<path fill="none" stroke="rgba?\([^)]*\)" stroke-width=".6" d="/);
  expect(saved).toContain('width="100mm" height="100mm"');
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

test("the Widths key switch: a ruler beside the drawing with the width the compass is set to marked bold, off with the switch, and kept for the session", async ({ page }) => {
  await options(page);
  // The key stands beside a small drawing at a desk (it goes below a medium or large one, which fills the column).
  await page.addInitScript(() => window.sessionStorage.setItem("kamon-view", "s"));
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/?open=izutsu");
  const crest = page.getByTestId("detail-crest");
  const key = crest.locator("svg > g[font-size]");
  await expect(page.getByTestId("widths-key")).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByTestId("widths-key")).toHaveText("Widths key");
  // The element has no key unless asked; the page asks for it.
  await expect(crest).toHaveAttribute("widths-key", "on");
  // Held on a step that strikes a circle: the key is a ruler, with the width the compass is set to marked in bold.
  await expect(crest.locator("svg style")).toHaveCount(1);
  await expect(async () => {
    await crest.evaluate((e) => e.step(3));
    await expect(key).toHaveCount(1, { timeout: 1000 });
  }).toPass();
  await expect(key.locator('g[font-weight="bold"] text')).toHaveCount(1);
  expect(Number(await key.locator('g[font-weight="bold"] text').textContent())).toBeGreaterThan(0);
  // The box is as wide as the crest's square and the key, and the crest keeps its size: the square is the same either way.
  const wide = await crest.locator("svg").boundingBox();
  const square = await crest.evaluate((e) => e.querySelector("svg path").getBoundingClientRect().width);
  await page.getByTestId("widths-key").click();
  await expect(page.getByTestId("widths-key")).toHaveAttribute("aria-pressed", "false");
  await expect(crest).not.toHaveAttribute("widths-key", /./);
  await expect(async () => {
    await crest.evaluate((e) => e.step(3));
    await expect(key).toHaveCount(0, { timeout: 1000 });
  }).toPass();
  const narrow = await crest.locator("svg").boundingBox();
  // The ruler stands upright beside the crest: a narrow margin, so the crest stays near the middle.
  expect(wide.width).toBeGreaterThan(narrow.width * 1.08);
  expect(wide.width).toBeLessThan(narrow.width * 1.25);
  expect(Math.round(narrow.height)).toBe(Math.round(wide.height));
  expect(Math.abs((await crest.evaluate((e) => e.querySelector("svg path").getBoundingClientRect().width)) - square)).toBeLessThan(1);
  // Kept for the session, and on again with the next press.
  await page.reload();
  await expect(page.getByTestId("widths-key")).toHaveAttribute("aria-pressed", "false");
  await page.getByTestId("widths-key").click();
  await expect(crest).toHaveAttribute("widths-key", "on");
});

test("a crest of many widths keeps one ruler: the drawing is no taller than the square and the ruler below it", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/?open=agehacho");
  const crest = page.getByTestId("detail-crest");
  await expect(page.getByTestId("widths-key")).toHaveAttribute("aria-pressed", "true");
  await expect(crest).toHaveAttribute("widths-key", "below");
  await expect(crest.locator("svg style")).toHaveCount(1);
  await expect(async () => {
    await crest.evaluate((e) => e.step(3));
    await expect(crest.locator('svg > g[font-size] g[font-weight="bold"] text')).toHaveCount(1, { timeout: 1000 });
  }).toPass();
  const box = await crest.locator("svg").boundingBox();
  expect(box.height / box.width).toBeCloseTo(226 / 200, 2);
});

test("the caption keeps one height through every step, so the buttons under it never move", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/?open=mitsuba-aoi");
  const crest = page.getByTestId("detail-crest");
  await expect(crest.locator("svg style")).toHaveCount(1);
  const total = Number(await page.locator("#scrub").getAttribute("max"));
  expect(total).toBeGreaterThan(20);
  const heights = new Set();
  const tops = new Set();
  for (let at = 0; at < total; at += 1) {
    await crest.evaluate((e, at) => e.step(at), at);
    await expect(page.getByTestId("caption")).toHaveAttribute("data-step", String(at + 1));
    heights.add(Math.round((await page.getByTestId("caption").boundingBox()).height));
    tops.add(Math.round((await page.getByTestId("draw").boundingBox()).y));
  }
  expect(heights.size).toBe(1);
  expect(tops.size).toBe(1);
});

test("the Parts tab lines up every card's button at the bottom, and says 1 crest, not 1 crests", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/?tab=parts");
  await page.getByRole("button", { name: "Plants", exact: true }).click();
  const cards = page.locator("#parts-grid > li");
  await expect(cards.first()).toBeVisible();
  const rows = await cards.evaluateAll((all) => all.map((card) => ({ top: Math.round(card.getBoundingClientRect().top), bottom: Math.round(card.querySelector("button").getBoundingClientRect().bottom) })));
  // Cards in one row: their buttons end at the same height.
  const byRow = new Map();
  for (const one of rows) byRow.set(one.top, [...(byRow.get(one.top) ?? []), one.bottom]);
  for (const bottoms of byRow.values()) expect(new Set(bottoms).size).toBe(1);
  await expect(page.locator("#parts-grid button", { hasText: /^Show 1 crests$/ })).toHaveCount(0);
  await expect(page.locator("#parts-grid button", { hasText: /^Show 1 crest$/ }).first()).toBeVisible();
});

test("the Draw the ink and Every place in full switches: on and off as they should be, kept for the session, and the longer steps are counted", async ({ page }) => {
  await options(page);
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/?open=maru-ni-kikyo");
  const crest = page.getByTestId("detail-crest");
  await expect(page.getByTestId("ink-draw")).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByTestId("ink-draw")).toHaveText("Draw the ink");
  await expect(crest).toHaveAttribute("ink-draw", "on");
  await expect(page.getByTestId("full-build")).toHaveAttribute("aria-pressed", "false");
  await expect(page.getByTestId("full-build")).toHaveText("Every place in full");
  const steps = async () => crest.evaluate(async (e) => (await e.step(Infinity), e.at + 1));
  const short = await steps();
  await page.getByTestId("full-build").click();
  await expect(page.getByTestId("full-build")).toHaveAttribute("aria-pressed", "true");
  await expect(crest).toHaveAttribute("full-build", "on");
  await expect.poll(steps).toBeGreaterThan(short * 2);
  // The scrubber counts the steps, and a place's step is captioned with the place.
  await expect(page.getByTestId("scrub")).toHaveAttribute("max", String(await steps()));
  await crest.evaluate((e) => e.step(60));
  await expect(page.getByTestId("caption")).toContainText(/Place \d of 5, clockwise: /);
  await page.getByTestId("ink-draw").click();
  await expect(page.getByTestId("ink-draw")).toHaveAttribute("aria-pressed", "false");
  await expect(crest).not.toHaveAttribute("ink-draw", /./);
  await page.reload();
  await expect(page.getByTestId("full-build")).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByTestId("ink-draw")).toHaveAttribute("aria-pressed", "false");
  await page.getByTestId("full-build").click();
  await page.getByTestId("ink-draw").click();
  await expect(crest).not.toHaveAttribute("full-build", "on");
  await expect(crest).toHaveAttribute("ink-draw", "on");
});

test("a still crest's parts answer a tap: it shows that part alone, as its chip does; a second tap, or play, shows the whole crest", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/?open=maru-ni-mitsu-gashiwa");
  const crest = page.getByTestId("detail-crest");
  await expect(crest.locator("svg style")).toHaveCount(1);
  // Stop on the finished crest.
  const total = Number(await page.locator("#scrub").getAttribute("max"));
  await crest.evaluate((e, at) => e.step(at), total - 1);
  await expect(page.getByTestId("play-pause")).toHaveAttribute("aria-label", "Play");
  const pressedChip = page.locator('#parts-row [aria-pressed="true"]');
  await expect(pressedChip).toHaveCount(0);
  // Parts is closed to begin with; a tap on a leaf opens it, so the pressed chip and its words are in sight.
  await expect(page.getByTestId("card-parts-panel")).toBeHidden();
  // A leaf: the motif's chip is pressed and its words show.
  const leaf = await crest.evaluate((e) => {
    const shapes = [...e.querySelectorAll("svg path[fill-rule], svg path:not([fill=\"none\"])")];
    const box = e.getBoundingClientRect();
    const pick = shapes.map((node) => node.getBoundingClientRect()).find((r) => r.width > 10 && r.width < box.width * 0.5);
    return { x: pick.x + pick.width / 2, y: pick.y + pick.height / 2 };
  });
  await page.mouse.click(leaf.x, leaf.y);
  await expect(pressedChip).toHaveCount(1);
  await expect(pressedChip).toContainText("Motif");
  await expect(page.getByTestId("card-parts-panel")).toBeVisible();
  await expect(pressedChip).toBeVisible();
  await expect(page.getByTestId("card-parts")).toHaveAttribute("aria-expanded", "true");
  // The same tap again lets it go.
  await page.mouse.click(leaf.x, leaf.y);
  await expect(pressedChip).toHaveCount(0);
  // Picked again, then play: the whole crest plays.
  await page.mouse.click(leaf.x, leaf.y);
  await expect(pressedChip).toHaveCount(1);
  await page.getByTestId("play-pause").click();
  await expect(pressedChip).toHaveCount(0);
});

test("the keyboard drives the player, and a click on the playing crest pauses it", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/?open=hira-yotsume");
  const crest = page.getByTestId("detail-crest");
  await expect(crest.locator("svg style")).toHaveCount(1);
  const play = page.getByTestId("play-pause");
  // Playing at first; a click on the crest holds it.
  await expect(play).toHaveAttribute("aria-label", "Pause");
  await crest.click();
  await expect(play).toHaveAttribute("aria-label", "Play");
  // Space plays again, Space pauses.
  await page.keyboard.press(" ");
  await expect(play).toHaveAttribute("aria-label", "Pause");
  await page.keyboard.press(" ");
  await expect(play).toHaveAttribute("aria-label", "Play");
  // End is the last step; Left steps back one; Right steps on one.
  const caption = page.getByTestId("caption");
  const total = Number(await page.locator("#scrub").getAttribute("max"));
  await page.keyboard.press("End");
  await expect(caption).toHaveAttribute("data-step", String(total));
  await page.keyboard.press("ArrowLeft");
  await expect(caption).toHaveAttribute("data-step", String(total - 1));
  await page.keyboard.press("ArrowRight");
  await expect(caption).toHaveAttribute("data-step", String(total));
  // Home draws from the start.
  await page.keyboard.press("Home");
  await expect(play).toHaveAttribute("aria-label", "Pause");
});

test("the drawing's numbers, like the buttons' words, cannot be selected", async ({ page }) => {
  await options(page);
  await page.goto("/?open=izutsu");
  const crest = page.getByTestId("detail-crest");
  await expect(crest.locator("svg style")).toHaveCount(1);
  expect(await crest.locator("svg").evaluate((svg) => getComputedStyle(svg).userSelect || getComputedStyle(svg).webkitUserSelect)).toBe("none");
  expect(await page.getByTestId("guides").evaluate((button) => getComputedStyle(button).userSelect || getComputedStyle(button).webkitUserSelect)).toBe("none");
});

test("Invert cuts the crest out of a disc of its colour, keeps the ruler's colour, and comes off again", async ({ page }) => {
  await options(page);
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/?open=izutsu");
  const crest = page.getByTestId("detail-crest");
  await expect(crest.locator("svg style")).toHaveCount(1);
  await expect(page.getByTestId("invert")).toHaveAttribute("aria-pressed", "false");
  await page.getByTestId("invert").click();
  await expect(crest).toHaveAttribute("invert", "on");
  await expect(crest.locator("svg > circle[data-disc]")).toHaveCount(1);
  // The disc is drawn in the crest's colour, the crest in the page's, the ruler in the crest's.
  const [ink, paper, ruler] = await crest.evaluate((e) => [
    getComputedStyle(e.querySelector("svg > circle[data-disc]")).fill,
    getComputedStyle(e.querySelector("svg > path:not([data-disc]), svg > g:not([font-size])")).color,
    getComputedStyle(e.querySelector("svg > g[font-size]")).color,
  ]);
  expect(ink).not.toBe(paper);
  expect(ruler).toBe(ink);
  // A new step draws again, inverted still.
  await crest.evaluate((e) => e.step(3));
  await expect(crest.locator("svg > circle[data-disc]")).toHaveCount(1);
  await expect(crest.locator("svg > g[font-size]")).toHaveCount(1);
  await page.getByTestId("invert").click();
  await expect(crest).not.toHaveAttribute("invert", /./);
  await expect(crest.locator("svg > circle[data-disc]")).toHaveCount(0);
  await expect(crest.locator("svg > [data-disc]")).toHaveCount(0);
  await expect(crest.locator("svg[data-inverted]")).toHaveCount(0);
});

test("Invert's disc ends at a ringed crest's ring, so no light rim shows outside it", async ({ page }) => {
  await options(page);
  await page.goto("/?open=maru-ni-tachi-aoi");
  const crest = page.getByTestId("detail-crest");
  await expect(crest.locator("svg style")).toHaveCount(1);
  await page.getByTestId("invert").click();
  const [disc, ring] = await crest.evaluate((e) => {
    const r = Number(e.querySelector("svg > circle[data-disc]").getAttribute("r"));
    // The ring's outer edge, from its own outline: the farthest of its points from the centre.
    const outer = Math.max(...Array.from(e.querySelectorAll("svg > path[class*='-s']"), (p) => {
      const box = p.getBBox();
      return Math.max(100 - box.x, box.x + box.width - 100, 100 - box.y, box.y + box.height - 100);
    }));
    return [r, outer];
  });
  expect(disc).toBeLessThanOrEqual(ring);
  expect(disc).toBeGreaterThan(ring - 1);
});

test("Invert, on or off, mid-drawing or finished, leaves the drawing where it is", async ({ page }) => {
  await options(page);
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/?open=izutsu");
  const crest = page.getByTestId("detail-crest");
  await expect(crest.locator("svg style")).toHaveCount(1);
  // How far in the drawing's animations are: the least of them, since a part that starts again starts at 0.
  const least = () => crest.evaluate((e) => Math.min(...e.querySelector("svg").getAnimations({ subtree: true }).map((a) => Number(a.currentTime))));
  await page.waitForTimeout(1500);
  for (let i = 0; i < 2; i++) {
    const before = await least();
    expect(before).toBeGreaterThan(1000);
    await page.getByTestId("invert").click();
    await page.waitForTimeout(100);
    expect(await least()).toBeGreaterThanOrEqual(before);
  }
});

test("speed, guides and loop take the drawing on from where it is, never back to step 1", async ({ page }) => {
  await options(page);
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/?open=juroku-yae-giku");
  const crest = page.getByTestId("detail-crest");
  await expect(crest.locator("svg style")).toHaveCount(1);
  const caption = page.getByTestId("caption");
  const stepNow = async () => Number(await caption.getAttribute("data-step"));
  // Held on a step well in: each control leaves it there.
  const total = Number(await page.locator("#scrub").getAttribute("max"));
  await crest.evaluate((e, at) => e.step(at), Math.floor(total / 2));
  await page.waitForTimeout(300);
  const held = await stepNow();
  expect(held).toBeGreaterThan(5);
  for (const press of [() => page.locator('#speed button[data-value="2"]').click(), () => page.getByTestId("guides").click(), () => page.getByTestId("guides").click(), () => page.getByTestId("loop").click(), () => page.getByTestId("loop").click()]) {
    await press();
    await page.waitForTimeout(200);
    expect(await stepNow()).toBe(held);
  }
  // Playing from step 40: a speed change goes on from there, not from the first steps.
  await page.getByTestId("play-pause").click();
  await page.waitForTimeout(600);
  await page.locator('#speed button[data-value="1"]').click();
  await page.waitForTimeout(400);
  expect(await stepNow()).toBeGreaterThanOrEqual(held);
});
