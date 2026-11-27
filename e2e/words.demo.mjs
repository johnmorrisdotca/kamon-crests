// The page's words: in English and in Japanese, nothing a person reads is a key of a word table instead of the word.
import { expect, test } from "@playwright/test";

import { WORDS } from "../demo/words.js";
import { FAMILY_WORDS } from "../scripts/family-template.mjs";

const KEYS = new Set([WORDS.en, WORDS.ja, FAMILY_WORDS.en, FAMILY_WORDS.ja].flatMap((words) => Object.keys(words)));
const isKey = (text) => /^[a-z]+(_[a-z]+)+$/.test(text) || KEYS.has(text);

// Every text a person can see, and every label, placeholder and tip a person can be told.
const said = (page) =>
  page.evaluate(() => {
    const texts = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node !== null; node = walker.nextNode()) {
      const text = node.textContent.trim();
      if (text !== "" && node.parentElement.closest("script, style") === null && node.parentElement.checkVisibility()) texts.push(text);
    }
    for (const name of ["aria-label", "placeholder", "title"]) for (const node of document.querySelectorAll(`[${name}]`)) texts.push(node.getAttribute(name).trim());

    return texts;
  });

for (const lang of ["en", "ja"]) {
  test(`shows words and never a word's key, in ${lang}`, async ({ page }) => {
    const errors = [];
    page.on("console", (message) => message.type() === "error" && errors.push(message.text()));
    page.on("pageerror", (error) => errors.push(String(error)));
    await page.goto(`/?lang=${lang}`);
    await expect(page.locator('main[data-ready="true"]')).toBeAttached();
    await expect(page.locator("header [data-help-switch]")).toHaveText(FAMILY_WORDS[lang].help);
    await expect(page.locator('footer [data-say="family_board"]')).toHaveText(FAMILY_WORDS[lang].family_board);
    const texts = await said(page);
    for (const tab of ["samurai", "latest", "book", "complexity", "parts", "catalogue"]) {
      await page.locator(`[data-tab="${tab}"]`).click();
      texts.push(...(await said(page)));
    }
    await page.getByTestId("tile-maru-ni-juji").click();
    await expect(page.getByTestId("detail")).toBeVisible();
    await expect(page.getByTestId("caption")).not.toHaveText("");
    texts.push(...(await said(page)));
    expect(texts.length).toBeGreaterThan(200);
    expect(texts.filter(isKey)).toEqual([]);
    expect(errors).toEqual([]);
  });
}
