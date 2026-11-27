// The dialog opens before its crest is loaded. Wait for the requested drawing and its controls to settle.
// A named view also gets the width of the crest's own square from the settled SVG.
export const settleCard = async (page, view = null) => {
  const settled = await page.waitForFunction(async (requestedView) => {
    const card = document.querySelector("#detail[open]");
    const crest = card?.querySelector("#detail-crest[crest]");
    const requested = new URL(window.location.href).searchParams.get("open");
    if (requested === null || crest?.getAttribute("crest") !== requested) return false;

    const ready = crest.ready;
    if (!(await ready)) return false;
    await document.fonts.ready;

    const frame = () => new Promise((resolve) => window.requestAnimationFrame(resolve));
    const bounds = (element) => {
      const { x, y, width, height } = element.getBoundingClientRect();
      return [x, y, width, height];
    };
    const measure = () => {
      if (requestedView !== null && card.dataset.view !== requestedView) return null;
      const svg = crest.querySelector("svg[viewBox]");
      if (svg === null) return null;
      const drawing = bounds(svg);
      const [, , width, height] = drawing;
      const viewBox = svg.viewBox.baseVal;
      if (width <= 0 || height <= 0 || viewBox.width <= 0 || viewBox.height <= 0) return null;

      const controls = [...card.querySelectorAll("button, select, input, a[href]")]
        .filter((element) => element.getClientRects().length > 0)
        .map(bounds);
      const layout = JSON.stringify([drawing, viewBox.width, viewBox.height, controls]);
      return { svg, layout, square: 200 * Math.min(width / viewBox.width, height / viewBox.height) };
    };
    await frame();
    const before = measure();
    if (before === null) return false;
    await frame();
    const after = measure();

    if (!card.open || crest.ready !== ready || crest.getAttribute("crest") !== requested || document.fonts.status !== "loaded") return false;
    if (after === null || before.svg !== after.svg || before.layout !== after.layout) return false;
    return requestedView === null ? true : after.square;
  }, view);
  if (view !== null) return settled.jsonValue();
};
