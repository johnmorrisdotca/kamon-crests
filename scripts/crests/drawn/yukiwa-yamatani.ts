// The mountain-and-valley snow ring in the 1892 book: six jagged leaves about a star of six lozenges. Coordinates are the page's, from its middle.
import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { DEG, bowedArc, carve, disc, seg, toPath, vadd, vmul } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { PAPER } from "../library/part.ts";

const SNOW = "snow-ring";
/** The point `r` out from the middle, `turn` degrees clockwise from upright. */
const out = (r: number, turn: number): V => [r * Math.sin(turn * DEG), r * Math.cos(turn * DEG)];

// The star: six lozenges with one corner each at the middle. Their side corners stand 27 out and their points 27 times the root of three.
const INNER = 27;
const POINT = INNER * Math.sqrt(3);
const lozenge = (): Region => {
  const corners = [[0, 0], out(INNER, -30), out(POINT, 0), out(INNER, 30)] as V[];

  return corners.map((corner, i) => seg(corner, corners[(i + 1) % 4]));
};

// A small lozenge stands beyond each point of the star.
const BEAD_OUT = 58;
const bead = (): Region => {
  const corners: V[] = [[0, BEAD_OUT - 9], [-7, BEAD_OUT], [0, BEAD_OUT + 9], [7, BEAD_OUT]];

  return corners.map((corner, i) => seg(corner, corners[(i + 1) % 4]));
};

// A leaf stands over each notch of the star: a round body with six teeth and a wedge-shaped foot. Each tooth is two equal bowed arcs from
// the body to a point, and the teeth are a mirrored set about the leaf's axis.
const LEAF_OUT = 71;
const BODY = 15;
const TEETH: readonly (readonly [turn: number, reach: number])[] = [[33, 34], [-33, 34], [78, 40], [-78, 40], [122, 36], [-122, 36]];
const TOOTH_ROOT = 2;
const TOOTH_HALF = 14;
const TOOTH_BOW = 1.2;

const tooth = (turn: number, reach: number): Region => {
  const at: V = [0, LEAF_OUT];
  const place = (p: V): V => {
    const a = -turn * DEG;

    return vadd([p[0] * Math.cos(a) - p[1] * Math.sin(a), p[0] * Math.sin(a) + p[1] * Math.cos(a)], at);
  };
  const left = place([-TOOTH_HALF, TOOTH_ROOT]);
  const right = place([TOOTH_HALF, TOOTH_ROOT]);
  const tip = place([0, reach]);

  // The edges bow inwards a little, so the tooth is slightly hollow-sided.
  return [bowedArc(left, tip, -TOOTH_BOW), bowedArc(tip, right, -TOOTH_BOW), seg(right, left)];
};

/** The leaf's foot narrows down into the notch of the star. */
const foot = (): Region => {
  const corners: V[] = [[-9, LEAF_OUT - 3], [9, LEAF_OUT - 3], [3, INNER + 5], [-3, INNER + 5]];

  return corners.map((corner, i) => seg(corner, corners[(i + 1) % 4]));
};

const leaf = (): Region[] => carve([disc([0, LEAF_OUT], BODY), ...TEETH.map(([turn, reach]) => tooth(turn, reach)), foot()], []);

export function yamataniNoYukiwaBuild(c: Builder): void {
  c.precision(3);
  const k = R / 103;
  const gap = PAPER * 1.2 / k;
  const sixth = Array.from({ length: 6 }, (_, i) => 60 * i);
  c.guideCircle(C0, R);
  c.guideCircle(C0, INNER * k);
  c.guideCircle(C0, POINT * k);
  // The lozenges stand a paper line apart: each is drawn a little smaller and moved out along its own axis.
  for (const turn of sixth) c.fill(SNOW, toPath([lozenge()], { k: k * (1 - gap / INNER), at: vmul(out(gap * 1.15, turn + 30), k), turn: turn + 30 }));
  for (const turn of sixth) c.fill(SNOW, toPath([bead()], { k, turn: turn + 30 }));
  for (const turn of sixth) c.fill(SNOW, toPath(leaf(), { k, turn }));
}
