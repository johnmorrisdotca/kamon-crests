import { bowedArc, carve, disc, thickArc, thickSeg } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

type Mark = readonly [x: number, y: number, bow?: number];
const p = (x: number, y: number): V => [(x - 176) * .61, (167 - y) * .61];
function loop(points: readonly Mark[]): Region {
  return points.map(([x, y, bow], i) => {
    const [u, v] = points[(i + 1) % points.length];
    return bowedArc(p(x, y), p(u, v), (bow ?? 0) * .61);
  });
}
function line(a: Mark, b: Mark, paper: number): Region {
  const start = p(a[0], a[1]);
  const end = p(b[0], b[1]);
  const arc = bowedArc(start, end, (a[2] ?? 0) * .61);
  return arc.t === "A"
    ? thickArc(arc.c, arc.r, paper, Math.min(arc.a0, arc.a1), Math.max(arc.a0, arc.a1))
    : thickSeg(start, end, paper);
}
const outer = loop([
  [178, 13, 5], [209, 12, 4], [244, 25, 5], [271, 43, 4], [290, 58, 3],
  [303, 81, 4], [316, 102, 4], [325, 128, 4], [330, 166.06, 0],
  [282, 141, 1], [237, 128, 0], [204, 112, 2], [177, 101, 0], [178, 53, 2],
]);
const eyes = [[274, 70, 7.7], [294, 121, 8]];
function outline(paper: number): Region[] {
  const seam = (a: Mark, b: Mark) => line(a, b, paper);
  const eyeCuts = eyes.flatMap(([x, y, r]) => [
    disc(p(x, y), r * .61),
    seam([x - 10, y - 7, 2], [x - 10, y + 10]),
    seam([x - 18, y - 7, 3], [x - 18, y + 12]),
  ]);
  const ribs = [
    seam([190, 59, 3], [242, 54]), seam([191, 68, 2], [244, 65]),
    seam([190, 77, 3], [246, 80]), seam([189, 87, 3], [248, 95]),
    seam([190, 95, 3], [251, 112]), seam([195, 104, 3], [256, 128]),
    seam([195, 38, 2], [214, 23]), seam([204, 45, 2], [232, 28]),
    seam([217, 48, 2], [247, 36]), seam([230, 50, 2], [257, 46]),
    seam([244, 51, -2.8], [253, 128]), seam([252, 52, -2.8], [262, 132]),
  ];
  return carve([outer], [...eyeCuts, ...ribs]);
}

interface KnottedWingOptions extends PartOptions {
  mirror?: boolean;
}
const reach = (330 - 176) * .61;

/** Size is the distance from the body axis to the wide tip. Place that axis. */
export const knottedButterflyWing = definePart<KnottedWingOptions>({
  id: "butterfly-wing-knotted",
  name: { en: "Knotted butterfly wing", ja: "結び蝶の羽" },
  description: {
    en: "Two eye marks lie beyond a pair of arcs, with short ribs crowning a wider fan below.",
    ja: "二本の弧の外に二つの目を置き、短い筋と長い筋を上下に広げます。",
  },
  families: ["cho"],
  sources: [{ frame: 34, page: "L", row: 2, col: 1, label: "上下のむすびてふ" }],
  stock: true,
  sampleSize: reach,
  sampleOptions: { motif: "butterfly" },
  build(c, centre, turn, size, { motif, mirror, keyline, paper = PAPER }) {
    const k = size / reach;
    fillPart(c, motif, outline(paper / k), { k, at: centre, turn, mirror }, keyline);
  },
});
export default knottedButterflyWing;
