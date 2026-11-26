// Takes the pictures the README shows, from the built demo in `site/`: `pnpm pictures` (builds the demo, then runs this).
// The shared part is readme-pictures-lib.mjs, the same file in every package of the family. The page is served to a browser
// without a port, never fetched from the live site, and is the same each run. It waits on the page saying it is ready.
// Output: docs/images/<hero|catalogue|construction|parts|search|used|element>-<desk|phone>-<light|dark>.webp.
import { writeFileSync } from "node:fs";

import { STAMP, drawingsStamp } from "./drawings-stamp.mjs";
import { takePictures } from "./readme-pictures-lib.mjs";

const READY = 'main[data-ready="true"]';

// A strip of one crest at six moments of its construction, made in the page from the package's own animated SVG, each frame
// held still at its time. Motion is reduced for every shot, so this asks for it back.
const strip = async (page, id, times) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.evaluate(
    async ({ id, times }) => {
      const { crestSteps } = await import("./dist/load.js");
      const { animatedSvg, durationOf, stepAt, stepCaption } = await import("./dist/animate.js");
      const construction = await crestSteps(id);
      const total = durationOf(construction);
      const holder = document.createElement("div");
      holder.id = "strip";
      holder.style.cssText = "display:flex;flex-wrap:wrap;gap:14px;justify-content:center;padding:18px;background:var(--surface);color:var(--ink);border:1px solid var(--rule);border-radius:16px;font-family:var(--font)";
      document.querySelector("main").prepend(holder);
      times.forEach((fraction, i) => {
        const t = fraction * (total - 0.3);
        const cell = document.createElement("figure");
        cell.style.cssText = "margin:0;width:150px;display:grid;gap:6px;justify-items:center;text-align:center";
        const box = document.createElement("div");
        box.style.cssText = "width:150px;height:150px";
        box.innerHTML = animatedSvg(construction, { id: `f${i}` });
        holder.append(cell);
        cell.append(box);
        // Hold each animation at its moment, then write what it shows as plain styles and let it go: a screenshot fast-forwards a running one.
        for (const animation of box.getAnimations({ subtree: true })) {
          animation.pause();
          animation.currentTime = t * 1000;
          const target = animation.effect.target;
          const look = getComputedStyle(target);
          for (const property of ["opacity", "fill-opacity", "stroke-opacity", "stroke-dashoffset"]) target.style.setProperty(property, look.getPropertyValue(property));
          animation.cancel();
        }
        const at = stepAt(construction, t);
        const caption = document.createElement("figcaption");
        caption.style.cssText = "font-size:.78rem;line-height:1.3;min-height:2.6em";
        caption.textContent = fraction >= 1 ? "Finished" : at < 0 ? "Start" : `${at + 1}. ${stepCaption(construction.steps[at], construction, "en")}`;
        cell.append(caption);
      });
    },
    { id, times },
  );
};

await takePictures({
  only: ["hero", "catalogue", "construction", "parts", "search", "used", "element", "large"],
  shots: [
    // The catalogue from the top of the page: the header, the tabs, the filters and the first crests. On a phone, in Japanese.
    {
      subject: "hero",
      views: ["desk", "phone"],
      url: "/?lang=en&help=off&kind=plant",
      ready: READY,
      height: 900,
      async prepare(page, { view }) {
        if (view === "phone") {
          await page.goto("http://kamon-crests.test/?lang=ja&help=off");
          await page.waitForSelector(READY);
        }
        await page.evaluate(() => window.scrollTo(0, 0));
      },
    },
    // Preview the first twelve plant families, up to six crests each, to keep the picture within its budget as the catalogue grows.
    {
      subject: "catalogue",
      views: ["desk"],
      url: "/?lang=en&help=off",
      ready: READY,
      target: "#grid",
      async prepare(page) {
        await page.evaluate(() => {
          [...document.querySelectorAll("#grid .chapter-head")].slice(1).forEach((head) => (head.nextElementSibling?.remove(), head.remove()));
          [...document.querySelectorAll("#grid .family-list > .family")].slice(12).forEach((family) => family.remove());
          for (const grid of document.querySelectorAll("#grid .family > .grid")) {
            [...grid.children].slice(6).forEach((tile) => tile.remove());
          }
        });
      },
    },
    // One crest's construction at six moments: the layout, the shapes traced and filled, the guides rubbed out.
    {
      subject: "construction",
      views: ["desk"],
      url: "/?lang=en&help=off",
      ready: READY,
      target: "#strip",
      async prepare(page) {
        await strip(page, "maru-ni-hidari-mitsu-tomoe", [0.1, 0.3, 0.5, 0.65, 0.8, 1]);
      },
    },
    // A crest's parts: the frame, the motif, how many and how arranged; the motif pressed, so that it shows alone.
    {
      subject: "parts",
      views: ["desk"],
      url: "/?lang=en&help=off&open=maru-ni-hidari-mitsu-tomoe",
      ready: '#detail[open] #parts-row [data-part]',
      target: "#detail",
      height: 1000,
      async prepare(page) {
        await page.locator('#parts-row [data-kind="part_frame"]').click();
        await page.waitForFunction(() => document.querySelector("#part-about").textContent.includes("circle"));
      },
    },
    // Searching by parts: ringed crests with a plant for a motif, on a phone.
    { subject: "search", views: ["phone"], url: "/?lang=en&help=off&frame=ring&kind=plant", ready: READY },
    // Who uses a crest today, with the public page that says so.
    {
      subject: "used",
      views: ["desk"],
      url: "/?lang=en&help=off&open=igeta",
      ready: "#detail[open] [data-testid=user]",
      target: "#detail",
      height: 1000,
    },
    // A few crests large, to look at the drawing: the lines, the curves, the veins.
    {
      subject: "large",
      views: ["desk"],
      url: "/?lang=en&help=off",
      ready: READY,
      target: "#host",
      async prepare(page) {
        await page.evaluate(async () => {
          const holder = document.createElement("div");
          holder.id = "host";
          holder.style.cssText = "display:flex;flex-wrap:wrap;gap:16px;align-items:center;justify-content:center;padding:20px;background:var(--surface);color:var(--ink);border:1px solid var(--rule);border-radius:16px";
          for (const id of ["mitsuba-aoi", "goshichi-no-kiri", "juroku-yae-giku", "maru-ni-hidari-mitsu-tomoe"]) {
            const element = document.createElement("kamon-crest");
            element.setAttribute("crest", id);
            element.setAttribute("size", "250");
            element.setAttribute("loading", "eager");
            holder.append(element);
          }
          document.querySelector("main").prepend(holder);
          await Promise.all([...holder.children].map((element) => element.ready));
        });
      },
    },
    // The element, in the page's colours and at any size.
    {
      subject: "element",
      views: ["desk"],
      url: "/?lang=en&help=off",
      ready: READY,
      target: "#host",
      async prepare(page) {
        await page.evaluate(async () => {
          const holder = document.createElement("div");
          holder.id = "host";
          holder.style.cssText = "display:flex;flex-wrap:wrap;gap:22px;align-items:center;justify-content:center;padding:24px;background:var(--surface);color:var(--ink);border:1px solid var(--rule);border-radius:16px";
          const cells = [["mitsuba-aoi", 120, "inherit"], ["maru-ni-kikyo", 120, "#2b5f9e"], ["sasa-rindo", 120, "#2f7a4f"], ["maru-ni-juji", 120, "#b5452c"], ["goshichi-no-kiri", 84, "#8a6d1d"], ["kuyo", 56, "inherit"], ["janome", 32, "inherit"], ["agehacho", 84, "#6b3f8a"], ["kikko", 56, "#b5452c"]];
          for (const [id, size, color] of cells) {
            const element = document.createElement("kamon-crest");
            element.setAttribute("crest", id);
            element.setAttribute("size", String(size));
            element.setAttribute("loading", "eager");
            if (color !== "inherit") element.setAttribute("color", color);
            holder.append(element);
          }
          document.querySelector("main").prepend(holder);
          await Promise.all([...holder.children].map((element) => element.ready));
        });
      },
    },
  ],
});

// The drawings these pictures show: a test fails when a crest is redrawn and the pictures are not taken again.
writeFileSync(STAMP, `${drawingsStamp()}\n`);
