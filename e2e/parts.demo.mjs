// The glossary of parts, and the element on its own.
import { expect, test } from "@playwright/test";

test("lists the parts of a kind with their Japanese, reading and what they are, and finds their crests", async ({ page }) => {
  await page.goto("/?tab=parts&group=object");
  const tomoe = page.getByTestId("part-tomoe");
  await expect(tomoe).toContainText("巴");
  await expect(tomoe).toContainText("ともえ");
  const show = tomoe.getByRole("button", { name: /Show \d+ crests/ });
  const many = Number((await show.textContent()).match(/\d+/)[0]);
  expect(many, "the tomoe crests: left and right three-comma, in a ring, one and two comma").toBeGreaterThanOrEqual(5);
  await show.click();
  await expect(page.getByTestId("catalogue-panel")).toBeVisible();
  await expect(page.getByTestId("grid").locator("li")).toHaveCount(many);
});

test("shows no long page of fold-open sections: no details element anywhere", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("details")).toHaveCount(0);
});
