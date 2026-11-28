import { bowedArc, carve, circleThrough, mirrored, moved, reversedRun, shortArc, thickArc, thickSeg } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

// The three arcs of the left half of the leaf in 松葉葵.
const edge = (a: V, b: V, radius: number, hint: V) => shortArc(circleThrough(a, b, radius, hint), a, b);
const half = [
  edge([0, 38], [-30, 1], 75, [34, 0]),
  edge([-30, 1], [-23, -23], 18, [-15, -8]),
  edge([-23, -23], [0, -16], 18, [-11, -12]),
];
const outline = [...half, ...reversedRun(half.map(mirrored))];
const sourceSize = 61;
const centre: V = [0, -7.5];

// The small leaf retains the four bowed veins nearest the edge of each half.
const veins = [
  [[0, -9], [21, -14], 1.55],
  [[0, -4], [25.6, 2.5], 1.85],
  [[0, 6.8], [17.7, 14.5], 1.45],
  [[0, 18], [9.1, 25.9], .95],
] as const;

/** Size is measured from the pointed tip to the bottom marks of the rounded lobes. */
export const leafHollyhock = definePart<PartOptions>({
  id: "leaf-hollyhock",
  name: { en: "Veined hollyhock leaf", ja: "葉脈のある葵の葉" },
  description: {
    en: "Two rounded lobes join a pointed blade. Four pairs of bowed veins grow from its midrib.",
    ja: "二つの丸い耳が先のとがった葉につながり、主脈から四組の曲がった葉脈を伸ばします。",
  },
  families: ["aoi"],
  sources: [
    { frame: 31, page: "L", row: 1, col: 1, label: "松葉あふひ" },
    { frame: 37, page: "R", row: 1, col: 1, label: "三ツあふひ" },
  ],
  stock: true,
  sampleSize: 140,
  sampleOptions: { motif: "hollyhock" },
  build(c, at, turn, size, { motif, keyline, paper = PAPER }) {
    const k = size / sourceSize;
    const line = paper / k;
    if (line >= 4) throw new Error("leaf-hollyhock: the paper width must fit inside the blade");
    const ribs = veins.flatMap(([from, to, rise]): Region[] => {
      const arc = bowedArc([from[0], from[1]], [to[0], to[1]], rise);
      if (arc.t !== "A") throw new Error("leaf-hollyhock: a vein must be a bowed arc");
      const cut = thickArc(arc.c, arc.r, line, Math.min(arc.a0, arc.a1), Math.max(arc.a0, arc.a1));
      return [cut, cut.map(mirrored)];
    });
    const ink = carve([outline], [thickSeg([0, -13], [0, 32.7], line), ...ribs]);
    fillPart(c, motif, ink.map((loop) => loop.map((piece) => moved(piece, centre))), { k, at, turn }, keyline);
  },
});

export default leafHollyhock;
