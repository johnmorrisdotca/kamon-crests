// The Build page: a reader composes a crest from the package's own drawings, a frame, a motif, how many, how they are set out and which way
// it turns, in a row of tabs with their chips under; the crest draws itself, is named in English and Japanese, says which crest of the
// catalogue has the same parts, and can be kept as SVG. The crest and its choices stand on one screen, and nothing spills past it.
import fs from "node:fs";

import { expect, test } from "@playwright/test";

import { WORDS } from "../demo/words.js";
import { FAMILY_WORDS } from "../scripts/family-template.mjs";

const open = async (page, query = "") => {
  await page.goto(`/build/${query}`);
  await expect(page.locator('main[data-ready="true"]')).toBeAttached();
  await expect(page.getByTestId("bld-pic").locator("svg")).toHaveCount(1);
};
const tab = (page, name) => page.getByTestId(`bld-tab-${name}`);
const chip = (page, value) => page.locator(`#bld-chips [data-value="${value}"]`);

test("shows the crest drawing itself, named in both languages, with the five choices in a row", async ({ page }) => {
  await open(page);
  await expect(page.getByTestId("bld-name")).toHaveText("Plum bowl, three clustered in a medium ring");
  await expect(page.getByTestId("bld-name-other")).toHaveText("丸に三つ盛り梅鉢");
  // It draws itself with the construction animation every crest uses: styles and keyframes, and the guides rubbed out at the end.
  await expect(page.getByTestId("bld-pic").locator("svg style")).toContainText("@keyframes");
  await expect(page.getByTestId("bld-tabs").locator("[role=tab]")).toHaveCount(5);
  await expect(tab(page, "frame")).toContainText("Medium ring");
  await expect(tab(page, "motif")).toContainText("Plum blossom");
  await expect(tab(page, "count")).toContainText("3");
  await expect(tab(page, "arrangement")).toContainText("In a ring");
  await page.getByTestId("bld-finished").click();
  await expect(page.getByTestId("bld-pic").locator("svg style")).toHaveCount(0);
  await page.getByTestId("bld-draw").click();
  await expect(page.getByTestId("bld-pic").locator("svg style")).toContainText("@keyframes");
});

test("draws the crest again only when the crest changes, never when only browsing the tabs, the kinds or the language", async ({ page }) => {
  await open(page, "?frame=ring-thin&motif=line&count=1&arr=single");
  const pic = page.getByTestId("bld-pic");
  const drawn = async () => Number(await pic.getAttribute("data-drawn"));
  await pic.locator("svg").evaluate((node) => (node.dataset.same = "yes"));
  const before = await drawn();
  const [english, japanese] = [await page.getByTestId("bld-name").innerText(), await page.getByTestId("bld-name-other").innerText()];
  // Every step tab, every kind of motif, the language and back: the picture is not touched.
  for (const name of ["motif", "count", "arrangement", "turn", "frame", "motif"]) await tab(page, name).click();
  for (const kind of ["plant", "animal", "object", "shape", "sky", "plant"]) await page.locator(`#bld-chips [data-value="${kind}"]`).click();
  await page.getByTestId("menu-button").click();
  await page.getByRole("button", { name: "日本語" }).click();
  await expect(page.getByTestId("bld-name")).toHaveText(japanese);
  await page.getByRole("button", { name: "English" }).click();
  await expect(page.getByTestId("bld-name")).toHaveText(english);
  expect(await drawn()).toBe(before);
  await expect(pic.locator("svg")).toHaveAttribute("data-same", "yes");
  // Choosing what is already chosen changes nothing either; choosing another motif draws the new crest once.
  await tab(page, "frame").click();
  await chip(page, "ring-thin").click();
  expect(await drawn()).toBe(before);
  await tab(page, "motif").click();
  await page.locator('#bld-chips [data-value="plum"]').click();
  await expect.poll(drawn).toBe(before + 1);
  await expect(pic.locator("svg")).not.toHaveAttribute("data-same", "yes");
});

test("plays the crest with the card's player: restart, step back and forward, play and pause, a scrubber and the speed", async ({ page }) => {
  await open(page, "?frame=ring-medium&motif=plum&count=1&arr=single");
  const scrub = page.getByTestId("bld-scrub");
  const total = Number(await scrub.getAttribute("max"));
  expect(total).toBeGreaterThan(3);
  await expect(page.getByTestId("bld-toggle")).toHaveAccessibleName("Pause");
  // Pause holds it on a step, and says which in the caption; the scrubber stands on it.
  await page.getByTestId("bld-toggle").click();
  await expect(page.getByTestId("bld-toggle")).toHaveAccessibleName("Play");
  await page.getByTestId("bld-forward").click();
  const at = Number(await scrub.inputValue());
  await expect(page.getByTestId("bld-caption")).toContainText(`Step ${at} of ${total}`);
  await page.getByTestId("bld-forward").click();
  await expect(scrub).toHaveValue(String(at + 1));
  await page.getByTestId("bld-back").click();
  await page.getByTestId("bld-back").click();
  await expect(scrub).toHaveValue(String(at - 1));
  await scrub.fill(String(total));
  await expect(page.getByTestId("bld-pic").locator("svg style")).toHaveCount(0);
  await expect(page.getByTestId("bld-finished")).toHaveAttribute("aria-pressed", "true");
  // Play from the last step draws it again from the start; the restart button does the same from anywhere.
  await page.getByTestId("bld-toggle").click();
  await expect(page.getByTestId("bld-pic").locator("svg style")).toContainText("@keyframes");
  await page.getByTestId("bld-toggle").click();
  await page.getByTestId("bld-restart").click();
  await expect(page.getByTestId("bld-toggle")).toHaveAccessibleName("Pause");
  // The speed is one of 0.5×, 1× and 2×.
  const speed = page.getByTestId("bld-speed");
  await expect(speed.locator("button")).toHaveText(["0.5×", "1×", "2×"]);
  await speed.getByRole("button", { name: "2×" }).click();
  await expect(speed.getByRole("button", { name: "2×" })).toHaveAttribute("aria-pressed", "true");
  await expect(speed.getByRole("button", { name: "1×" })).toHaveAttribute("aria-pressed", "false");
  // 2× makes every animation half as long as at 1×.
  const lengths = async () => page.getByTestId("bld-pic").locator("svg style").evaluate((node) => node.textContent.match(/animation:[^;}]*?([\d.]+)s/g)?.slice(0, 3).join("|") ?? "");
  const fast = await lengths();
  await speed.getByRole("button", { name: "0.5×" }).click();
  expect(await lengths()).not.toBe(fast);
});

test("has an Animate switch, remembered on this device: off, every change shows the finished crest at once", async ({ page }) => {
  await open(page, "?frame=ring-medium&motif=plum&count=1&arr=single");
  const animate = page.getByTestId("bld-animate");
  await expect(animate).toHaveText("Animate");
  await expect(animate).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByTestId("bld-pic").locator("svg style")).toContainText("@keyframes");
  await animate.click();
  await expect(animate).toHaveAttribute("aria-pressed", "false");
  await tab(page, "count").click();
  await chip(page, "3").click();
  await expect(page.getByTestId("bld-name-other")).toHaveText("丸に三つ盛り梅鉢");
  await expect(page.getByTestId("bld-pic").locator("svg style")).toHaveCount(0);
  await expect(page.getByTestId("bld-finished")).toHaveAttribute("aria-pressed", "true");
  // Drawing again still draws it, on request; and the choice is there after a reload.
  await page.getByTestId("bld-draw").click();
  await expect(page.getByTestId("bld-pic").locator("svg style")).toContainText("@keyframes");
  await open(page, "?frame=ring-medium&motif=plum&count=1&arr=single");
  await expect(page.getByTestId("bld-animate")).toHaveAttribute("aria-pressed", "false");
  await expect(page.getByTestId("bld-pic").locator("svg style")).toHaveCount(0);
  await page.getByTestId("bld-animate").click();
  await expect(page.getByTestId("bld-animate")).toHaveAttribute("aria-pressed", "true");
});

test("changes the crest and its name with each choice: frame, motif, count, arrangement", async ({ page }) => {
  await open(page);
  await tab(page, "frame").click();
  await chip(page, "none").click();
  await expect(page.getByTestId("bld-name-other")).toHaveText("三つ盛り梅鉢");
  await tab(page, "motif").click();
  await page.locator('#bld-chips [data-value="animal"]').click();
  await page.locator('#bld-chips [data-value="rabbit"]').click();
  await expect(page.getByTestId("bld-name")).toHaveText("Rabbit, three clustered");
  await expect(page.getByTestId("bld-name-other")).toHaveText("三つ盛り兎");
  await tab(page, "count").click();
  await chip(page, "5").click();
  await expect(page.getByTestId("bld-name-other")).toHaveText("五つ盛り兎");
  await tab(page, "arrangement").click();
  await chip(page, "radial").click();
  await expect(page.getByTestId("bld-name-other")).toHaveText("五つ兎");
  // A pair has a count of two: choosing it moves the count there.
  await chip(page, "facing").click();
  await expect(page.getByTestId("bld-name")).toHaveText("Rabbit, a facing pair");
  await expect(tab(page, "count")).toContainText("2");
  await expect(page).toHaveURL(/arr=facing/);
});

test("says when the parts are a crest of the catalogue, links its card and names its houses", async ({ page }) => {
  await open(page, "?frame=none&motif=karahana&count=3&arr=ring");
  await expect(page.getByTestId("bld-name-other")).toHaveText("三つ盛り唐花");
  const match = page.getByTestId("bld-match");
  await expect(match).toHaveAttribute("data-found", "mitsumori-karahana");
  await expect(match).toContainText("The catalogue has a crest with these parts: Three clustered arabesque flowers");
  await expect(match).toContainText("No house is recorded for it.");
  await page.getByTestId("bld-match-mitsumori-karahana").click();
  await expect(page).toHaveURL(/\?open=mitsumori-karahana/);
  await expect(page.getByTestId("detail-title")).toBeVisible();
});

test("is that very crest when one copy is drawn the way the catalogue draws it, and new when nothing has its parts", async ({ page }) => {
  await open(page, "?frame=ring-medium&motif=plum&count=1&arr=single");
  const match = page.getByTestId("bld-match");
  await expect(match).toHaveAttribute("data-found", "maru-ni-ume-bachi");
  await expect(match).toHaveAttribute("data-same", "true");
  await expect(match).toContainText("This is a crest in the catalogue: Plum bowl in a circle");
  await open(page, "?frame=ring-medium&motif=plum&count=3&arr=ring");
  await expect(page.getByTestId("bld-match")).toContainText("Not in the catalogue yet");
});

test("says it is a combination of your own under every name that is not a crest of the catalogue, in both languages", async ({ page }) => {
  for (const [query, ja] of [["frame=ring-medium&motif=plum&count=3&arr=ring", "丸に三つ盛り梅鉢"], ["frame=none&motif=rabbit&count=5&arr=radial", "五つ兎"], ["frame=none&motif=manji&count=1&arr=single&turn=mirror", "右万字"], ["frame=ring-thin&motif=cross&count=4&arr=rows", ""]]) {
    await open(page, `?${query}&lang=en`);
    await expect(page.getByTestId("bld-match")).toHaveAttribute("data-found", "");
    await expect(page.getByTestId("bld-match")).toContainText("Not in the catalogue yet: a combination of your own.");
    await open(page, `?${query}&lang=ja`);
    await expect(page.getByTestId("bld-match")).toContainText("家紋一覧にはまだない、自分だけの組み合わせです。");
    if (ja !== "") await expect(page.getByTestId("bld-name")).toHaveText(ja);
  }
});

test("offers a turn only where the motif is not the same mirrored", async ({ page }) => {
  await open(page, "?frame=none&motif=tomoe&count=3&arr=radial&tab=turn");
  await expect(page.getByTestId("bld-name-other")).toHaveText("左三つ巴");
  await expect(chip(page, "mirror")).toBeEnabled();
  await chip(page, "mirror").click();
  await expect(page.getByTestId("bld-name-other")).toHaveText("右三つ巴");
  await expect(page.getByTestId("bld-name")).toHaveText("Right tomoe, three turned about the centre");
  await open(page, "?frame=none&motif=plum&count=1&arr=single&tab=turn");
  await expect(chip(page, "mirror")).toBeDisabled();
  await expect(page.getByTestId("bld-about")).toContainText("looks the same mirrored");
});

test("keeps the crest as an SVG file named in both languages", async ({ page }) => {
  await open(page, "?frame=ring-thin&motif=bellflower&count=3&arr=rows");
  const [download] = await Promise.all([page.waitForEvent("download"), page.getByTestId("bld-download").click()]);
  expect(download.suggestedFilename()).toBe("kamon-ring-thin-bellflower-rows-3.svg");
  const svg = fs.readFileSync(await download.path(), "utf8");
  expect(svg).toContain('width="100mm"');
  expect(svg).toMatch(/<title>Bellflower, three side by side in a thin ring \/ 丸に三つ並び桔梗<\/title>/);
  expect(svg).not.toContain("currentColor");
  expect(svg).not.toContain("@keyframes");
});

test("has the crest, its name and its choices on one screen, and nothing spills past it", async ({ page }) => {
  await open(page);
  for (const name of ["frame", "motif", "count", "arrangement", "turn"]) {
    await tab(page, name).click();
    await page.locator(".fam-panel").evaluate((node) => window.scrollTo(0, node.getBoundingClientRect().top + window.scrollY - 8));
    const box = async (selector) => page.locator(selector).first().boundingBox();
    const [pic, tabs, chips, height] = [await box("#bld-pic"), await box("#bld-tabs, .bld-tabs"), await box("#bld-chips"), page.viewportSize().height];
    expect(pic.y).toBeGreaterThanOrEqual(0);
    expect(tabs.y + tabs.height).toBeLessThanOrEqual(height);
    expect(chips.y + Math.min(chips.height, 120)).toBeLessThanOrEqual(height);
  }
  const wide = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(wide).toBeLessThanOrEqual(0);
});

test("follows the page's language, and its header links to it from the catalogue", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('a[href="build/"]')).toBeVisible();
  await page.locator('a[href="build/"]').click();
  await expect(page).toHaveURL(/\/build\/$/);
  await open(page, "?lang=ja");
  await expect(page.locator("#bld-title")).toHaveText(WORDS.ja.bld_title);
  await expect(page.getByTestId("bld-name")).toHaveText("丸に三つ盛り梅鉢");
  await expect(page.getByTestId("bld-name-other")).toHaveText("Plum bowl, three clustered in a medium ring");
  await expect(tab(page, "count")).toContainText("三");
});

for (const lang of ["en", "ja"]) {
  test(`shows words and never a word's key, in ${lang}`, async ({ page }) => {
    const KEYS = new Set([WORDS.en, WORDS.ja, FAMILY_WORDS.en, FAMILY_WORDS.ja].flatMap((words) => Object.keys(words)));
    const errors = [];
    page.on("console", (message) => message.type() === "error" && errors.push(message.text()));
    page.on("pageerror", (error) => errors.push(String(error)));
    await open(page, `?lang=${lang}`);
    const texts = [];
    for (const name of ["frame", "motif", "count", "arrangement", "turn"]) {
      await tab(page, name).click();
      texts.push(...(await page.evaluate(() => {
        const found = [];
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        for (let node = walker.nextNode(); node !== null; node = walker.nextNode()) if (node.textContent.trim() !== "" && node.parentElement.closest("script, style") === null) found.push(node.textContent.trim());
        for (const attribute of ["aria-label", "title"]) for (const node of document.querySelectorAll(`[${attribute}]`)) found.push(node.getAttribute(attribute).trim());
        return found;
      })));
    }
    expect(texts.length).toBeGreaterThan(40);
    expect(texts.filter((text) => /^[a-z]+(_[a-z]+)+$/.test(text) || KEYS.has(text))).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("keeps the colours under an Options fold, closed to begin with, with the player, Animate, Draw again, Show finished and Download in sight", async ({ page }) => {
  await open(page);
  const fold = page.getByTestId("bld-options");
  await expect(fold).toHaveText(WORDS.en.options);
  await expect(fold).toHaveAttribute("aria-expanded", "false");
  await expect(fold).toHaveAttribute("aria-controls", "bld-options-panel");
  for (const name of ["bld-colours", "bld-colours-reset", "bld-ink-8a1c1c", "bld-paper-ffffff"]) await expect(page.getByTestId(name)).toBeHidden();
  for (const name of ["bld-draw", "bld-finished", "bld-download", "bld-animate", "bld-toggle", "bld-scrub", "bld-options"]) await expect(page.getByTestId(name)).toBeVisible();
  // The keyboard opens it, and the focus shows.
  await fold.focus();
  expect(await fold.evaluate((node) => getComputedStyle(node).outlineStyle)).not.toBe("none");
  await page.keyboard.press("Enter");
  await expect(fold).toHaveAttribute("aria-expanded", "true");
  for (const name of ["bld-colours", "bld-colours-reset", "bld-ink-8a1c1c", "bld-paper-ffffff"]) await expect(page.getByTestId(name)).toBeVisible();
  // Kept as it was left, on this device, and apart from the card's own Options.
  await open(page);
  await expect(page.getByTestId("bld-options")).toHaveAttribute("aria-expanded", "true");
  await page.goto("/?open=maru-ni-mitsuba-aoi");
  await expect(page.getByTestId("options")).toHaveAttribute("aria-expanded", "false");
  await open(page);
  await page.getByTestId("bld-options").click();
  await open(page);
  await expect(page.getByTestId("bld-options")).toHaveAttribute("aria-expanded", "false");
});

test("says Options in Japanese on the Build page", async ({ page }) => {
  await open(page, "?lang=ja");
  await expect(page.getByTestId("bld-options")).toHaveText(WORDS.ja.options);
  await page.getByTestId("bld-options").click();
  await expect(page.getByTestId("bld-colours")).toBeVisible();
  await expect(page.getByTestId("bld-ink-8a1c1c")).toHaveAccessibleName(WORDS.ja.colour_red);
});
