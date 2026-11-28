import {
  angleOf, arcTo, carve, disc, mirrored, onCircle, reversedRun, seg, tangentCircle, thickSeg, touch, vdist,
} from "../../construct/compass.ts";
import type { Circle, Region, V } from "../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

interface SnowLobeOptions extends PartOptions {
  /** Radius of the circle the petal seats on, in crest units. */
  seatRadius?: number;
  /** Cut the cell's rounded opening along the centre of the petal. */
  slot?: boolean;
  /** Width of that structural opening in crest units. */
  slotWidth?: number;
}

const crown: Circle = { c: [0, .317], r: .225 };
const shoulder: Circle = { c: [.255, .245], r: .23 };
const cove = tangentCircle(crown, 1, shoulder, 1, .043, [.16, .50]);
const crownTop = onCircle(crown.c, crown.r, Math.PI / 2);
const crownTouch = touch(crown, cove);
const shoulderTouch = touch(shoulder, cove);

function outline(radius: number): Region {
  const seat: Circle = { c: [0, -radius], r: radius };
  const rightRoot = onCircle(seat.c, radius, Math.acos(.31 / radius));
  const leftRoot: V = [-rightRoot[0], rightRoot[1]];
  const lean = Math.acos(shoulder.r / vdist(shoulder.c, rightRoot));
  const flankTouch = onCircle(shoulder.c, shoulder.r, angleOf(shoulder.c, rightRoot) + lean);
  const right: Region = [
    arcTo(crown, crownTop, crownTouch, false),
    arcTo(cove, crownTouch, shoulderTouch, true),
    arcTo(shoulder, shoulderTouch, flankTouch, false),
    seg(flankTouch, rightRoot),
  ];
  return [...reversedRun(right.map(mirrored)), ...right, arcTo(seat, rightRoot, leftRoot, true)];
}

/** Size is the petal's width. The centre is the middle of its seat on the wheel. */
export const snowLobe = definePart<SnowLobeOptions>({
  id: "snow-lobe",
  name: { en: "Three-lobed snow petal", ja: "雪輪の三つ山弁" },
  description: {
    en: "A wide cap of three bumps joins two ruled flanks and sits on a circular foot, with an optional rounded opening.",
    ja: "三つの丸い山を二本の直線と円弧の足でつなぐ幅広い弁で、丸い抜きを入れられます。",
  },
  families: ["yukiwa"],
  sources: [
    { frame: 15, page: "L", row: 4, col: 1, label: "ゆきわ" },
    { frame: 41, page: "L", row: 2, col: 1, label: "花ぐるまゆきわ" },
  ],
  stock: true,
  sampleSize: 132,
  sampleOptions: { motif: "snow-ring" },
  build(c, centre, turn, size, { motif, keyline, seatRadius = .82 * size, slot = true, slotWidth = .104 * size }) {
    const radius = seatRadius / size;
    const width = slotWidth / size;
    if (!Number.isFinite(radius) || radius < .48) {
      throw new Error("snow-lobe: the seating radius must be at least .48 of the width");
    }
    if (slot && (!Number.isFinite(width) || width <= 0 || width >= .18)) {
      throw new Error("snow-lobe: the opening width must be between zero and .18 of the petal width");
    }
    const body = outline(radius);
    const foot: V = [0, .076];
    const tip: V = [0, .274];
    const ink = slot
      ? carve([body], [thickSeg(foot, tip, width), disc(foot, width / 2), disc(tip, width / 2)])
      : [body];
    fillPart(c, motif, ink, { k: size, at: centre, turn }, keyline);
  },
});

export default snowLobe;
