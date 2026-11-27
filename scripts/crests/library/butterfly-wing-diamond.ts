import { bowedArc, carve, disc, thickArc, thickSeg } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

type Mark = readonly [x: number, y: number, bow?: number];
const p = (x: number, y: number): V => [(x - 187.5) * .62, (154 - y) * .62];

function outline(marks: readonly Mark[]): Region {
  return marks.map(([x, y, bow], i) => {
    const [u, v] = marks[(i + 1) % marks.length];
    return bowedArc(p(x, y), p(u, v), (bow ?? 0) * .62);
  });
}
function line(a: Mark, b: Mark, paper: number): Region {
  const start = p(a[0], a[1]);
  const end = p(b[0], b[1]);
  const arc = bowedArc(start, end, (a[2] ?? 0) * .62);
  return arc.t === "A"
    ? thickArc(arc.c, arc.r, paper, Math.min(arc.a0, arc.a1), Math.max(arc.a0, arc.a1))
    : thickSeg(start, end, paper);
}
const wing = outline([
  [188.5, 26, 4], [212, 33, 3], [233, 47, 3], [250, 65, 4], [265, 81, 4],
  [291, 87, 2], [314, 105, 3], [329, 127, 2], [342, 153.08, -1],
  [295, 148, 2], [262, 145, 1], [229, 135, 2], [208, 128, 1], [188.5, 125, 0],
]);
function cutWing(paper: number) {
  const cut = (a: Mark, b: Mark) => line(a, b, paper);
  const cuts = [
    cut([199, 48, 2], [215, 36]), cut([203, 55, 2], [228, 45]),
    cut([205, 62, 3], [239, 56]), cut([205, 69, 2], [247, 67]),
    cut([206, 78, 2.5], [251, 77]), cut([208, 87, 2.8], [244, 87]),
    cut([209, 97, 3], [246, 98]), cut([209, 107, 2.5], [249, 109]),
    cut([210, 117, 2.5], [253, 122]), cut([213, 125, 2.7], [259, 134]),
    cut([249, 83, -5], [270, 137]), cut([259, 84, -4], [280, 140]),
    disc(p(271, 101), 4.05), disc(p(294, 128), 4.25),
    cut([278, 98, 2.2], [278, 110]), cut([302, 125, 2.5], [304, 138]),
  ];
  return carve([wing], cuts);
}

interface DiamondWingOptions extends PartOptions {
  mirror?: boolean;
}
const reach = (342 - 187.5) * .62;

/** Size is the span from the body axis to the wing’s outer point. */
export const diamondButterflyWing = definePart<DiamondWingOptions>({
  id: "butterfly-wing-diamond",
  name: { en: "Diamond butterfly wing", ja: "蝶菱の羽" },
  description: {
    en: "A scalloped wing tapers to the side of a diamond, with two eyes and curved ribs.",
    ja: "弧をつないだ羽を菱の先へ向けて細くし、二つの目と細い筋を入れます。",
  },
  families: ["cho"],
  sources: [{ frame: 34, page: "L", row: 4, col: 1, label: "ふせんてふひし" }],
  stock: true,
  sampleSize: reach,
  sampleOptions: { motif: "butterfly" },
  build(c, centre, turn, size, { motif, mirror, keyline, paper = PAPER }) {
    const k = size / reach;
    fillPart(c, motif, cutWing(paper / k), { k, at: centre, turn, mirror }, keyline);
  },
});
export default diamondButterflyWing;
