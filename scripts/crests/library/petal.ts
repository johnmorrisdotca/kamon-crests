import { arcA, carve, disc, mirrored, onCircle, reversedRun, seg, shortArc, thickSeg } from "../../construct/compass.ts";
import type { Circle, Region, V } from "../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

interface PetalOptions extends PartOptions {
  /** Choose the broad plum cap or the tapered bellflower cap. */
  tip?: "rounded" | "pointed";
  /** Full shoulder width divided by the length. */
  width?: number;
  /** Cut a short white ray near the base. */
  stamen?: boolean;
}

const root: V = [0, -.5];
const tip: V = [0, .5];

function tangentFromRoot({ c, r }: Circle): number {
  const dx = root[0] - c[0];
  const dy = root[1] - c[1];

  return Math.atan2(dy, dx) + Math.acos(r / Math.hypot(dx, dy));
}

function roundedPetal(width: number): Region {
  const radius = width / 2;
  const crown: Circle = { c: [0, .5 - radius], r: radius };
  const right = tangentFromRoot(crown);
  const left = Math.PI - right;

  return [seg(root, onCircle(crown.c, radius, right)), arcA(crown.c, radius, right, left), seg(onCircle(crown.c, radius, left), root)];
}

function pointedPetal(width: number): Region {
  const shoulder: Circle = { c: [width * 18 / 84, Math.min(.08, (1 - width) * .3)], r: width * 24 / 84 };
  const angle = .65 * width;
  const join = onCircle(shoulder.c, shoulder.r, angle);
  const dx = tip[0] - join[0];
  const dy = tip[1] - join[1];
  // The flatter circle shares the shoulder's normal at the join and also passes through the tip.
  const radius = -(dx * dx + dy * dy) / (2 * (dx * Math.cos(angle) + dy * Math.sin(angle)));
  const centre = onCircle(join, -radius, angle);
  const start = onCircle(shoulder.c, shoulder.r, tangentFromRoot(shoulder));
  const right = [seg(root, start), shortArc(shoulder, start, join), shortArc({ c: centre, r: radius }, join, tip)];

  return [...right, ...reversedRun(right.map(mirrored))];
}

const rayBase: V = [0, -.28];
const rayTip: V = [0, -.1];

/** Size is the length from the petal's root to its tip. */
export const petal = definePart<PetalOptions>({
  id: "petal",
  name: { en: "Flower petal", ja: "花びら" },
  description: { en: "Two ruled sides meet a round cap or tangent shoulders with a pointed tip.", ja: "定規で引いた両側から、丸い先、または丸い肩を通ってとがった先へつなぎます。" },
  families: ["ume", "kikyo"],
  sources: [
    { frame: 24, page: "L", row: 2, col: 4, label: "八重むめ" },
    { frame: 40, page: "R", row: 1, col: 4, label: "土岐ききやう" },
  ],
  stock: true,
  sampleSize: 144,
  sampleOptions: { motif: "plum", stamen: true },
  build(c, centre, turn, size, { motif, keyline, tip = "rounded", width = .72, stamen = false, paper = PAPER }) {
    if (!Number.isFinite(width) || width <= 0 || width >= 1) throw new Error("petal: width must be between zero and one");
    const outline = tip === "rounded" ? roundedPetal(width) : pointedPetal(width);
    const line = paper / size;
    const ink = stamen
      ? carve([outline], [thickSeg(rayBase, rayTip, line), disc(rayBase, line / 2), disc(rayTip, line / 2)])
      : [outline];
    fillPart(c, motif, ink, { k: size, at: centre, turn }, keyline);
  },
});

export default petal;
