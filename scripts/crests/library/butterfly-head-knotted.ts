import { bowedArc, carve, disc } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

type Mark = readonly [x: number, y: number, bow?: number];
const p = (x: number, y: number): V => [(x - 176) * .61, (104 - y) * .61];
function loop(points: readonly Mark[]): Region {
  return points.map(([x, y, bow], i) => {
    const [u, v] = points[(i + 1) % points.length];
    return bowedArc(p(x, y), p(u, v), (bow ?? 0) * .61);
  });
}
const face = carve([loop([
  [160, 96, 3], [177, 91, 3], [194, 96, 3], [195, 113, 3],
  [176, 118, 3], [157, 113, 3],
])], [disc(p(163, 105), 3.3), disc(p(189, 105), 3.3)]);
const height = (118 - 91) * .61;
const eyes = [p(163, 105), p(189, 105)];
const radius = 3.3;

/** Size is the height of the head. The placement is between the eyes. */
export const knottedButterflyHead = definePart<PartOptions>({
  id: "butterfly-head-knotted",
  name: { en: "Knotted butterfly head", ja: "結び蝶の頭" },
  description: {
    en: "Two small ringed eyes sit in the rounded head.",
    ja: "丸い頭に輪の目を二つ置きます。",
  },
  families: ["cho"],
  sources: [{ frame: 34, page: "L", row: 2, col: 1, label: "上下のむすびてふ" }],
  stock: true,
  sampleSize: 63,
  sampleOptions: { motif: "butterfly" },
  build(c, centre, turn, size, { motif, paper = PAPER, keyline }) {
    const k = size / height;
    const pupil = radius - paper / k;
    if (pupil <= 0) throw new Error("butterfly-head-knotted: the paper is too wide for the eyes");
    fillPart(c, motif, [...face, ...eyes.map((eye) => disc(eye, pupil))], { k, at: centre, turn }, keyline);
  },
});
export default knottedButterflyHead;
