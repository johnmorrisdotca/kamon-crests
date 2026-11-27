import { WEIGHT } from "../construct/builder.ts";
import { DEG, carve, disc, onCircle, toPath, type V } from "../construct/compass.ts";
import { C0, R } from "../construct/geo.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const kasaneMitsuBoshi = defineCrest({
  id: "kasane-mitsu-boshi",
  name: { en: "Three overlapping stars", ja: "重ね三つ星" },
  reading: "かさねみつぼし",
  romaji: "kasane mitsu boshi",
  frame: "none",
  motifs: [{ motif: "star", count: 3, arrangement: "stacked" }],
  families: [],
  aliases: ["重ね三ッ星"],
  source: cell(9, "left page, row 3, fourth column from the right: 重ね三ッ星", "左頁、三段目、右から四列目「重ね三ッ星」"),
  measured: "The outline shows three same-size discs with centres almost a radius from the middle. Their seams make a cyclic overlap: the top disc covers the lower left, the lower left covers the lower right, and the lower right covers the top.",
  construction: {
    en: "Strike three equal circles on the corners of a triangle. Each disc passes over one neighbour and under the other, with a narrow white seam at the overlap.",
    ja: "三角形の頂点に同じ大きさの円を三つ打ちます。星は片方のとなりに重なり、もう片方の下に入り、重なりに細い白線を残します。",
  },
  build(c) {
    const centre: V = [0, 0];
    const radius = R / 2;
    const centres = [90, -30, -150].map((angle) => onCircle(centre, radius, angle * DEG));
    c.guideCircle(C0, R);
    c.guideCircle(C0, radius);
    centres.forEach((at, i) => {
      const next = centres[(i + 1) % centres.length];
      const region = carve([disc(at, radius)], [disc(next, radius + WEIGHT.thread)]);
      c.fill("star", toPath(region, { k: 1 }));
    });
  },
});
