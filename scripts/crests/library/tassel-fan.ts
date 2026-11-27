import { arcA, carve, disc, mirrored, onCircle, reversedRun, seg, thickSeg } from "../../construct/compass.ts";
import type { Circle, Piece, Region } from "../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

interface TasselOptions extends PartOptions {
  /** A fringed fan or a rounded pendant, as printed in the source cell. */
  finish?: "fringe" | "drop";
}

/** Connect the ordered circles by their outer tangents, including the cap of each shoulder. */
function outside(circles: Circle[]): Region {
  const right: Piece[] = [];
  let first = 0;
  let previous = 0;
  for (let i = 0; i < circles.length - 1; i += 1) {
    const upper = circles[i];
    const lower = circles[i + 1];
    const slope = (lower.r - upper.r) / (upper.c[1] - lower.c[1]);
    if (Math.abs(slope) >= 1) throw new Error("tassel-fan: the bell is too short for its shoulders");
    const angle = Math.asin(slope);
    if (i === 0) first = angle;
    else right.push(arcA(upper.c, upper.r, previous, angle));
    right.push(seg(onCircle(upper.c, upper.r, angle), onCircle(lower.c, lower.r, angle)));
    previous = angle;
  }
  const top = circles[0];
  const bottom = circles[circles.length - 1];
  return [
    ...right,
    arcA(bottom.c, bottom.r, previous, -Math.PI - previous),
    ...reversedRun(right.map(mirrored)),
    arcA(top.c, top.r, Math.PI - first, first),
  ];
}

/** Size is the full length from knot to hem. Place the centre at the cord-end knot. */
export const tasselFan = definePart<TasselOptions>({
  id: "tassel-fan",
  name: { en: "Knotted tassel", ja: "結び房" },
  description: {
    en: "A small knot hangs above a flared fringe or a rounded pendant. A paper-width line sets the knot off from the body.",
    ja: "小さな結び目の下に扇形の房か丸い飾りを下げ、結び目との間に一定の幅の白い線を残します。",
  },
  families: ["ogi", "tsuzumi"],
  sources: [
    { frame: 36, page: "R", row: 2, col: 1, label: "ぬさあふぎ" },
    { frame: 36, page: "R", row: 2, col: 2, label: "筥あふぎ" },
    { frame: 22, page: "R", row: 3, col: 3, label: "紐付つづみ" },
  ],
  stock: true,
  sampleSize: 84,
  sampleOptions: { motif: "fan" },
  build(c, centre, turn, size, { motif, keyline, paper = PAPER, finish = "fringe" }) {
    if (paper >= size * .12) throw new Error("tassel-fan: the paper line is too wide for this tassel");
    const knot = size * .11;
    const neck = size * .14;
    const throat: Circle = { c: [0, -knot - paper - neck], r: neck };
    const foot = size * (finish === "drop" ? .105 : .265);
    const toe: Circle = { c: [0, knot + foot - size], r: foot };
    const shape = finish === "drop"
      ? outside([throat, { c: [0, -.555 * size], r: .265 * size }, toe])
      : outside([throat, toe]);
    const ink = [disc([0, 0], knot)];
    if (finish === "drop") {
      ink.push(shape);
    } else {
      const side = thickSeg([.053 * size, -.405 * size], [.143 * size, -.79 * size], paper);
      const mid = thickSeg([0, -.408 * size], [0, -.83 * size], paper);
      ink.push(...carve([shape], [side, side.map(mirrored), mid]));
    }
    fillPart(c, motif, ink, { k: 1, at: centre, turn }, keyline);
  },
});

export default tasselFan;
