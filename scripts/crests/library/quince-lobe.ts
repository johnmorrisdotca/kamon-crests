import { carveWhere, disc, seg } from "../../construct/compass.ts";
import type { Circle, Region, V } from "../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

interface QuinceLobeOptions extends PartOptions {
  /** Radius of the opening in crest units. */
  innerRadius?: number;
  /** Number of equally spaced lobes in the assembled frame. */
  count?: number;
}

/** The outer circle, paired round shoulders and ruled sides of a single quince lobe. */
export function quinceLobeGeometry(radius: number, innerRadius: number, count: number, shoulder: Circle, halfPaper: number): Region[] {
  const halfTurn = Math.PI / count;
  const adjacent = (side: number) => {
    const at = (distance: number): V => [
      side * (distance * Math.sin(halfTurn) - halfPaper * Math.cos(halfTurn)),
      distance * Math.cos(halfTurn) + halfPaper * Math.sin(halfTurn),
    ];
    return seg(at(radius / 50), at(radius + radius / 10));
  };
  const right = disc(shoulder.c, shoulder.r);
  const left = disc([-shoulder.c[0], shoulder.c[1]], shoulder.r);
  const inside = ([x, y]: V, side: number): number => -side * x * Math.cos(halfTurn) + y * Math.sin(halfTurn);
  const beyondShoulder = ([x, y]: V) => Math.abs(x) * shoulder.c[1] > y * shoulder.c[0]
    && !(Math.hypot(Math.abs(x) - shoulder.c[0], y - shoulder.c[1]) < shoulder.r);

  return carveWhere([
    ...disc([0, 0], radius), ...disc([0, 0], innerRadius), ...right, ...left, adjacent(1), adjacent(-1),
  ], (p) => {
    const reach = Math.hypot(...p);
    return reach < radius && reach > innerRadius && inside(p, 1) > halfPaper && inside(p, -1) > halfPaper && !beyondShoulder(p);
  });
}

/** Size is the outside radius of the assembled frame. Place its centre. */
export const quinceLobe = definePart<QuinceLobeOptions>({
  id: "quince-lobe",
  name: { en: "Rounded quince lobe", ja: "木瓜の丸い外形" },
  description: {
    en: "Round shoulders join the outer arc to two ruled sides with one paper line between neighbouring lobes.",
    ja: "丸い肩で外の弧と二本の直線をつなぎ、隣り合う形の間に白いすき間を残します。",
  },
  families: ["mokko"],
  sources: [{ frame: 28, page: "R", row: 4, col: 3, label: "うりニあげは蝶" }],
  stock: true,
  sampleSize: 96,
  sampleOptions: { motif: "frame" },
  build(c, centre, turn, size, { motif, count = 5, innerRadius = size * .6935, paper = PAPER, keyline }) {
    if (!Number.isInteger(count) || count < 3) throw new Error("quince-lobe: at least three lobes are needed");
    if (!Number.isFinite(innerRadius) || innerRadius <= 0 || innerRadius >= size) {
      throw new Error("quince-lobe: the opening must fit inside the outside radius");
    }
    const shoulder: Circle = { c: [.3 * size, .72 * size], r: .22 * size };
    const ink = quinceLobeGeometry(size, innerRadius, count, shoulder, paper / 2);
    fillPart(c, motif, ink, { k: 1, at: centre, turn }, keyline);
  },
});
export default quinceLobe;
