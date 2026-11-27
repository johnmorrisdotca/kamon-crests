import { expect } from "@playwright/test";

// The dialog opens before its crest is loaded. Wait for the requested drawing and its controls to settle.
// A named view also gets the width of the crest's own square from the settled SVG.
export const settleCard = async (page, view = null, minimum = 1) => {
  const card = page.locator("#detail[open]");
  let settled = null;
  // Playwright's browser-side waitForFunction stops as soon as an async predicate returns its Promise.
  await expect.poll(async () => {
    settled = await card.evaluate(async (dialog, { view, minimum }) => {
      const crest = dialog.querySelector("#detail-crest[crest]");
      const requested = new URL(window.location.href).searchParams.get("open");
      if (requested === null || crest?.getAttribute("crest") !== requested) return null;

      const ready = crest.ready;
      if (!(await ready)) return null;
      await document.fonts.ready;

      const frame = () => new Promise((resolve) => window.requestAnimationFrame(resolve));
      const bounds = (element) => {
        const { x, y, width, height } = element.getBoundingClientRect();
        return [x, y, width, height];
      };
      const measure = () => {
        if (view !== null && dialog.dataset.view !== view) return null;
        const svg = crest.querySelector("svg[viewBox]");
        if (svg === null) return null;
        const drawing = bounds(svg);
        const [, , width, height] = drawing;
        const viewBox = svg.viewBox.baseVal;
        if (width <= 0 || height <= 0 || viewBox.width <= 0 || viewBox.height <= 0) return null;
        const square = 200 * Math.min(width / viewBox.width, height / viewBox.height);
        if (!Number.isFinite(square) || square < minimum) return null;

        const controls = [...dialog.querySelectorAll("button, select, input, a[href]")]
          .filter((element) => element.getClientRects().length > 0)
          .map(bounds);
        const layout = JSON.stringify([drawing, viewBox.width, viewBox.height, controls]);
        return { svg, layout, square };
      };
      await frame();
      const before = measure();
      if (before === null) return null;
      await frame();
      const after = measure();

      if (!dialog.open || crest.ready !== ready || crest.getAttribute("crest") !== requested || document.fonts.status !== "loaded") return null;
      if (after === null || before.svg !== after.svg || before.layout !== after.layout) return null;
      return { square: after.square };
    }, { view, minimum });
    return settled;
  }, { timeout: 0, message: "the crest card has a settled drawing and controls" }).toEqual({ square: expect.any(Number) });
  return settled.square;
};
