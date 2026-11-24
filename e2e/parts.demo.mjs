// The glossary of parts, and the element on its own.
import { expect, test } from "@playwright/test";

test("lists the parts of a kind with their Japanese, reading and what they are, and finds their crests", async ({ page }) => {
  await page.goto("/?tab=parts&group=object");
  const tomoe = page.getByTestId("part-tomoe");
  await expect(tomoe).toContainText("巴");
  await expect(tomoe).toContainText("ともえ");
  await tomoe.getByRole("button", { name: /Show 3 crests/ }).click();
  await expect(page.getByTestId("catalogue-panel")).toBeVisible();
  await expect(page.getByTestId("grid").locator("li")).toHaveCount(3);
});

test("shows no long page of fold-open sections: no details element anywhere", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("details")).toHaveCount(0);
});
