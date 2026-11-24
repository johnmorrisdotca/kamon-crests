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
  expect(await page.locator("#c svg path").first().evaluate((p) => getComputedStyle(p).stroke)).toBe("rgb(28, 79, 138)");
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
