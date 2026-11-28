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

// A leaf stands over each notch of the star, at the print's size: a broad body of two circles, seven teeth round its outer half with three
// of them at the tip, and a short foot. Each tooth is two equal bowed arcs from the body to a point, and the teeth are a mirrored set.
const LEAF_OUT = 71;
const BODY: readonly (readonly [x: number, y: number, r: number])[] = [[0, LEAF_OUT, 22.5], [0, LEAF_OUT - 9, 20]];
const TEETH: readonly (readonly [turn: number, reach: number])[] = [[0, 31.5], [35, 35], [-35, 35], [70, 36], [-70, 36], [105, 33], [-105, 33]];
const TOOTH_ROOT = 20;
const TOOTH_OPEN = 17.5;
const TOOTH_BOW = 1;

const tooth = (turn: number, reach: number): Region => {
  const from = (r: number, a: number): V => vadd(out(r, a), [0, LEAF_OUT]);
  const left = from(TOOTH_ROOT, turn - TOOTH_OPEN);
  const right = from(TOOTH_ROOT, turn + TOOTH_OPEN);
  const tip = from(reach, turn);

  // The edges bow inwards a little, so the tooth is slightly hollow-sided.
  return [bowedArc(left, tip, -TOOTH_BOW), bowedArc(tip, right, -TOOTH_BOW), seg(right, left)];
};

/** The leaf's foot narrows down towards the notch of the star, between two of the small lozenges. */
const foot = (): Region => {
  const corners: V[] = [[-9, LEAF_OUT - 12], [9, LEAF_OUT - 12], [3, INNER + 9], [-3, INNER + 9]];

  return corners.map((corner, i) => seg(corner, corners[(i + 1) % 4]));
};

const leaf = (): Region[] => carve([...BODY.map(([x, y, r]) => disc([x, y], r)), ...TEETH.map(([turn, reach]) => tooth(turn, reach)), foot()], []);

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
