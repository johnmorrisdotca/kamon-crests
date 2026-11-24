// <kamon-crest> in a real browser: the finished crest, the colour, the animation, the replay, and less motion.
import { expect, test } from "@playwright/test";

const host = async (page, markup) => {
  await page.goto("/");
  await page.evaluate(async (html) => {
    document.body.insertAdjacentHTML("beforeend", `<div id="host">${html}</div>`);
  }, markup);
};

test("draws the finished crest in the page's colour, sized by the page", async ({ page }) => {
  await host(page, '<div style="color:#8a1c1c"><kamon-crest id="a" crest="mitsuba-aoi" size="120" loading="eager"></kamon-crest></div><kamon-crest id="c" crest="janome" color="#1c4f8a" loading="eager"></kamon-crest>');
  const crest = page.locator("#a");
  await expect(crest.locator("svg")).toBeVisible();
  expect(await crest.evaluate((e) => getComputedStyle(e).width)).toBe("120px");
  expect(await crest.locator("svg path").first().evaluate((p) => getComputedStyle(p).fill)).toBe("rgb(138, 28, 28)");
  expect(await crest.getAttribute("role")).toBe("img");
  expect(await crest.getAttribute("aria-label")).toBe("Three hollyhock leaves");
  expect(await crest.locator("svg style").count()).toBe(0);
  await expect(page.locator("#c svg")).toBeVisible();
  expect(await page.locator("#c svg path").first().evaluate((p) => getComputedStyle(p).fill)).toBe("rgb(28, 79, 138)");
});

test("names the crest in Japanese for a Japanese page, and by its own label when given", async ({ page }) => {
  await host(page, '<kamon-crest id="a" crest="mitsuba-aoi" lang="ja" loading="eager"></kamon-crest><kamon-crest id="b" crest="janome" label="a ring" loading="eager"></kamon-crest>');
  await expect(page.locator("#a svg")).toBeVisible();
  expect(await page.locator("#a").getAttribute("aria-label")).toBe("三つ葉葵");
  expect(await page.locator("#b").getAttribute("aria-label")).toBe("a ring");
});

test("takes the id loosely, and says nothing is drawn for an id that is not one", async ({ page }) => {
  const warnings = [];
  page.on("console", (message) => message.type() === "warning" && warnings.push(message.text()));
  await host(page, '<kamon-crest id="a" crest="Maru Ni Juji" loading="eager"></kamon-crest><kamon-crest id="b" crest="no-such" loading="eager"></kamon-crest>');
  await expect(page.locator("#a svg")).toBeVisible();
  await expect(page.locator("#b")).toHaveAttribute("data-missing", "");
  expect(warnings.join("\n")).toContain('no crest for the id "no-such"');
});

test("plays the construction when animate is set, and ends on the finished crest", async ({ page }) => {
  await host(page, '<kamon-crest id="a" crest="maru-ni-juji" animate speed="4" loading="eager"></kamon-crest>');
  const crest = page.locator("#a");
  await expect(crest.locator("svg style")).toHaveCount(1);
  expect(await crest.locator("svg path").count()).toBeGreaterThan(3);
  await crest.evaluate((e) => e.finished);
  const state = await crest.locator("svg path").evaluateAll((paths) => paths.map((p) => ({ cls: p.getAttribute("class") ?? "", o: getComputedStyle(p).opacity, fo: getComputedStyle(p).fillOpacity, so: getComputedStyle(p).strokeOpacity })));
  const guides = state.filter((p) => /-g\d/.test(p.cls));
  const shapes = state.filter((p) => !/-g\d/.test(p.cls));
  expect(guides.length).toBeGreaterThan(2);
  for (const guide of guides) expect(Number(guide.o)).toBe(0);
  for (const shape of shapes) expect(shape.so === "1" || shape.fo === "1").toBe(true);
});

test("replays on a click, with a fresh drawing", async ({ page }) => {
  await host(page, '<kamon-crest id="a" crest="janome" animate speed="4" loading="eager"></kamon-crest>');
  const crest = page.locator("#a");
  await crest.evaluate((e) => e.finished);
  const first = await crest.locator("svg style").evaluate((s) => s.textContent);
  await crest.click();
  await expect.poll(async () => crest.locator("svg style").evaluate((s) => s.textContent)).not.toBe(first);
});

test("shows the finished crest at once when the reader asks for less motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await host(page, '<kamon-crest id="a" crest="janome" animate loading="eager"></kamon-crest>');
  const crest = page.locator("#a");
  await expect(crest.locator("svg")).toBeVisible();
  expect(await crest.locator("svg style").count()).toBe(0);
  expect(await crest.locator("svg path").count()).toBe(1);
});

test("draws again when an attribute changes, and from a property", async ({ page }) => {
  await host(page, '<kamon-crest id="a" crest="janome" loading="eager"></kamon-crest>');
  const crest = page.locator("#a");
  await expect(crest.locator("svg")).toBeVisible();
  const before = await crest.locator("svg path").first().getAttribute("d");
  await crest.evaluate((e) => {
    e.crest = "kuyo";
  });
  await expect.poll(async () => crest.locator("svg path").first().getAttribute("d")).not.toBe(before);
  expect(await crest.evaluate((e) => e.crest)).toBe("kuyo");
  expect(await crest.evaluate((e) => e.animate)).toBe(false);
});

// ---- Pause, play, step: the API, the controls and the keys ----
const shown = (crest) => crest.locator("svg path").count();
const scrub = (range, value) =>
  range.evaluate((input, to) => {
    input.value = to;
    input.dispatchEvent(new window.Event("input", { bubbles: true }));
  }, String(value));
const events = (crest) =>
  crest.evaluate((e) => {
    window.heard = [];
    for (const name of ["kamon-play", "kamon-pause", "kamon-step", "kamon-end"]) e.addEventListener(name, (event) => window.heard.push({ name, ...event.detail }));
  });

test("pause() holds the animation where it is, and play() goes on from there to the end", async ({ page }) => {
  await host(page, '<kamon-crest id="a" crest="maru-ni-juji" animate speed="0.5" loading="eager"></kamon-crest>');
  const crest = page.locator("#a");
  await expect(crest.locator("svg style")).toHaveCount(1);
  await events(crest);
  await expect.poll(() => crest.evaluate((e) => e.at)).toBeGreaterThanOrEqual(1);
  await crest.evaluate((e) => e.pause());
  expect(await crest.evaluate((e) => e.paused)).toBe(true);
  const held = await crest.evaluate((e) => e.at);
  expect(await crest.locator("svg path").first().evaluate((p) => getComputedStyle(p).animationPlayState)).toBe("paused");
  // Held: the step and a guide's dash do not move.
  const dash = () => crest.locator("svg path").evaluateAll((paths) => paths.map((p) => getComputedStyle(p).strokeDashoffset + getComputedStyle(p).opacity).join(" "));
  // The hold takes effect on the next frame.
  await page.waitForTimeout(100);
  const before = await dash();
  await page.waitForTimeout(700);
  expect(await dash()).toBe(before);
  expect(await crest.evaluate((e) => e.at)).toBe(held);
  expect(await page.evaluate(() => window.heard)).toEqual([{ name: "kamon-pause", crest: "maru-ni-juji", step: held, steps: expect.any(Number) }]);
  // On from there, faster, to the finished crest.
  await crest.evaluate((e) => {
    e.speed = 8;
  });
  await expect(crest.locator("svg style")).toHaveCount(1);
  await crest.evaluate((e) => e.pause());
  const again = await crest.evaluate((e) => e.at);
  await crest.evaluate((e) => {
    void e.play();
  });
  expect(await crest.evaluate((e) => e.paused)).toBe(false);
  await expect.poll(() => crest.evaluate((e) => e.at)).toBeGreaterThan(again);
  await expect.poll(() => page.evaluate(() => window.heard.some((one) => one.name === "kamon-end")), { timeout: 15000 }).toBe(true);
  expect(await page.evaluate(() => window.heard.filter((one) => one.name === "kamon-play").length)).toBe(1);
});

test("step(n) holds the drawing with steps 0 to n done, from the empty page to the finished crest", async ({ page }) => {
  await host(page, '<kamon-crest id="a" crest="mitsu-icho" animate speed="8" loading="eager"></kamon-crest>');
  const crest = page.locator("#a");
  await expect(crest.locator("svg")).toBeVisible();
  await events(crest);
  const steps = await page.evaluate(async () => (await import("./dist/steps/mitsu-icho.js")).default.steps);
  const guides = steps.filter((step) => step.op === "guide").length;
  expect(await crest.evaluate((e) => e.step(-1))).toBe(-1);
  expect(await shown(crest)).toBe(0);
  expect(await crest.evaluate((e) => e.step(0))).toBe(0);
  expect(await shown(crest)).toBe(1);
  expect(await crest.locator("svg style").count()).toBe(0);
  // Every guide struck, nothing drawn; then the unit; then the unit turned to its other places.
  expect(await crest.evaluate((e, n) => e.step(n), guides - 1)).toBe(guides - 1);
  expect(await shown(crest)).toBe(guides);
  const turn = steps.findIndex((step) => step.op === "turn");
  await crest.evaluate((e, n) => e.step(n), turn - 1);
  const unit = await shown(crest);
  await crest.evaluate((e, n) => e.step(n), turn);
  expect(await crest.locator("svg > path").count()).toBe(unit + steps[turn].shapes.length);
  // The turn strikes the leaf's circles and lines again at each of the two other places.
  expect(await crest.locator("svg > g[transform]").count()).toBe(2);
  expect(await crest.locator("svg > g[transform] > path").count()).toBeGreaterThan(guides);
  // Past the end is the finished crest: the guides rubbed out.
  expect(await crest.evaluate((e) => e.step(999))).toBe(steps.length - 1);
  expect(await crest.evaluate((e) => [e.at, e.paused])).toEqual([steps.length - 1, true]);
  const finished = await page.evaluate(async () => (await import("./dist/crests/mitsu-icho.js")).default);
  expect(await shown(crest)).toBe((finished.match(/<path/g) ?? []).length);
  const heard = await page.evaluate(() => window.heard.filter((one) => one.name === "kamon-step"));
  expect(heard.every((one) => one.steps === steps.length)).toBe(true);
  expect(heard.map((one) => one.step)).toEqual([-1, 0, guides - 1, turn - 1, turn, steps.length - 1]);
  // play() from a held step goes on with the next one.
  await crest.evaluate((e, n) => e.step(n), turn - 1);
  await crest.evaluate((e) => {
    void e.play();
  });
  await expect(crest.locator("svg style")).toHaveCount(1);
  expect(await crest.evaluate((e) => e.at)).toBeGreaterThanOrEqual(turn - 1);
  expect(await crest.locator("svg").getAttribute("style")).toMatch(/--kamon-at:\s*-[\d.]+s/);
});

test("controls: play and pause, step back and forward, a scrubber, and the caption while held", async ({ page }) => {
  await host(page, '<kamon-crest id="a" crest="maru-ni-juji" size="240" animate controls speed="0.5" loading="eager"></kamon-crest>');
  const crest = page.locator("#a");
  const bar = crest.locator(".kamon-controls");
  await expect(bar).toBeVisible();
  expect(await crest.getAttribute("role")).toBe("group");
  const toggle = bar.locator('button[data-do="toggle"]');
  const range = bar.locator("input[type=range]");
  const caption = bar.locator("span");
  await expect(toggle).toHaveAttribute("aria-label", "Pause");
  await expect(caption).toHaveText("");
  const total = Number(await range.getAttribute("max"));
  expect(total).toBeGreaterThan(5);
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-label", "Play");
  expect(await crest.evaluate((e) => e.paused)).toBe(true);
  // A click on the controls never replays the drawing.
  await expect(crest.locator("svg style")).toHaveCount(1);
  await bar.getByRole("button", { name: "Step forward" }).click();
  await expect(caption).not.toHaveText("");
  const at = await crest.evaluate((e) => e.at);
  await expect(caption).toHaveText(new RegExp(`^${at + 1}/${total} · \\S`));
  await expect(range).toHaveValue(String(at + 1));
  await bar.getByRole("button", { name: "Step back" }).click();
  await expect(range).toHaveValue(String(at));
  expect(await crest.evaluate((e) => e.at)).toBe(at - 1);
  // The scrubber goes to any step: 0 is the empty page, the last is the finished crest.
  await scrub(range, 0);
  await expect.poll(() => shown(crest)).toBe(0);
  await expect(caption).toHaveText("");
  await scrub(range, total);
  await expect(caption).toHaveText(new RegExp(`^${total}/${total} · Rub out the guides$`));
  // Play from the last step starts again.
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-label", "Pause");
  await expect(crest.locator("svg style")).toHaveCount(1);
  await expect.poll(() => crest.evaluate((e) => e.at)).toBeLessThan(total - 1);
  // In Japanese on a Japanese page.
  await host(page, '<kamon-crest id="j" crest="janome" size="240" lang="ja" animate controls loading="eager"></kamon-crest>');
  await expect(page.locator("#j .kamon-controls button").first()).toHaveAttribute("aria-label", "前の手順");
  await page.locator('#j .kamon-controls button[data-do="toggle"]').click();
  await page.locator("#j .kamon-controls button").nth(2).click();
  await expect(page.locator("#j .kamon-controls span")).toContainText("コンパスで円を描く");
});

test("keys: space holds it and lets it go on, the arrows step, and Enter draws it again", async ({ page }) => {
  await host(page, '<kamon-crest id="a" crest="maru-ni-juji" animate speed="0.5" loading="eager"></kamon-crest>');
  const crest = page.locator("#a");
  await expect(crest.locator("svg style")).toHaveCount(1);
  await expect.poll(() => crest.evaluate((e) => e.at)).toBeGreaterThanOrEqual(1);
  await crest.focus();
  // The first key loads the controls' code, so each key is waited for.
  await page.keyboard.press("Space");
  await expect.poll(() => crest.evaluate((e) => e.paused)).toBe(true);
  const at = await crest.evaluate((e) => e.at);
  await page.keyboard.press("ArrowRight");
  await expect.poll(() => crest.evaluate((e) => e.at)).toBe(at + 1);
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("ArrowLeft");
  await expect.poll(() => crest.evaluate((e) => e.at)).toBe(at - 1);
  await expect(crest.locator("svg style")).toHaveCount(0);
  await page.keyboard.press("Space");
  await expect(crest.locator("svg style")).toHaveCount(1);
  await expect.poll(() => crest.evaluate((e) => e.paused)).toBe(false);
  await page.keyboard.press("Space");
  await expect.poll(() => crest.evaluate((e) => e.paused)).toBe(true);
  await page.keyboard.press("Enter");
  await expect.poll(() => crest.evaluate((e) => e.paused)).toBe(false);
});

test("isolate(part) shows one part alone, held still, and clear() shows the whole crest again", async ({ page }) => {
  await host(page, '<kamon-crest id="a" crest="maru-ni-mitsuba-aoi" loading="eager"></kamon-crest>');
  const crest = page.locator("#a");
  await expect(crest.locator("svg")).toHaveCount(1);
  const look = () => crest.locator("svg > path").evaluateAll((paths) => ({ full: paths.filter((p) => !p.hasAttribute("opacity")).length, faint: paths.filter((p) => p.getAttribute("opacity") === ".12").length, guides: paths.filter((p) => p.getAttribute("opacity") === ".55").length }));
  const whole = await look();
  expect(whole).toMatchObject({ faint: 0, guides: 0 });
  // The frame: the ring and its two circles, the leaves faint.
  const at = await crest.evaluate((e) => e.isolate("frame"));
  expect(await look()).toEqual({ full: 1, faint: whole.full - 1, guides: 2 });
  expect(await crest.evaluate((e) => [e.at, e.paused])).toEqual([at, true]);
  // One leaf of the three, then the turn as the next step.
  await crest.evaluate((e) => e.isolate("hollyhock", "count"));
  expect(await look()).toMatchObject({ full: (whole.full - 1) / 3, faint: 1 });
  await crest.evaluate((e) => e.step(e.at + 1));
  expect(await look()).toMatchObject({ full: whole.full - 1, faint: 1 });
  // The lines of the arrangement in place of the leaf's own guides: three spokes and three mirror lines.
  await crest.evaluate((e) => e.isolate("hollyhock", "arrangement"));
  expect(await look()).toEqual({ full: whole.full - 1, faint: 1, guides: 6 });
  // Playing draws only that part, and ends with the rest still faint.
  await crest.evaluate((e) => e.step(-1).then(() => void e.play()));
  await expect(crest.locator("svg style")).toHaveCount(1);
  expect(await crest.locator("svg > path[opacity]").count()).toBe(1);
  expect(await crest.evaluate((e) => e.clear())).toBeGreaterThan(at);
  expect(await look()).toEqual(whole);
  // A new crest lets the part go.
  await crest.evaluate((e) => e.isolate("frame"));
  await crest.evaluate((e) => ((e.crest = "janome"), e.ready));
  await expect(crest.locator("svg > path")).toHaveCount(1);
  expect(await crest.locator("svg > path[opacity]").count()).toBe(0);
});

test("steps through a still drawing for a reader who asks for less motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await host(page, '<kamon-crest id="a" crest="janome" animate loading="eager"></kamon-crest>');
  const crest = page.locator("#a");
  await expect(crest.locator("svg")).toBeVisible();
  expect(await crest.evaluate((e) => e.step(0))).toBe(0);
  expect(await shown(crest)).toBe(1);
  expect(await crest.locator("svg style").count()).toBe(0);
});
