// The dialog opens before its crest is loaded. Wait for the requested drawing and its controls to settle.
export const settleCard = async (page) => {
  await page.waitForFunction(async () => {
    const card = document.querySelector("#detail[open]");
    const crest = card?.querySelector("#detail-crest[crest]");
    const requested = new URL(window.location.href).searchParams.get("open");
    if (requested === null || crest?.getAttribute("crest") !== requested) return false;

    const ready = crest.ready;
    if (!(await ready)) return false;
    await document.fonts.ready;

    const frame = () => new Promise((resolve) => window.requestAnimationFrame(resolve));
    const positions = () => JSON.stringify(
      [...card.querySelectorAll("#detail-crest > svg, button, select, input, a[href]")]
        .filter((element) => element.getClientRects().length > 0)
        .map((element) => {
          const { x, y, width, height } = element.getBoundingClientRect();
          return [x, y, width, height];
        }),
    );
    await frame();
    const before = positions();
    await frame();

    return card.open && crest.ready === ready && crest.getAttribute("crest") === requested && document.fonts.status === "loaded" && before === positions();
  });
};
