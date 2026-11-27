import type { Builder } from "../../construct/builder.ts";
import { DEG, carveWhere, disc, onPage, rotated, seg, toPath, vdist } from "../../construct/compass.ts";
import type { Placing, Region, V } from "../../construct/compass.ts";
import { C0, R, circle, polar } from "../../construct/geo.ts";
import { HANABISHI_FOUR } from "./hanabishi.ts";

const shellPart = "tortoise-shell";
const blossomPart = "flower-lozenge";

const lowerEdge = (height: number): Region => {
  const side = 150 / Math.sqrt(3);
  return [seg([-150, height + side], [0, height]), seg([0, height], [150, height + side])];
};

const shellBand = (low: number, high: number): Region[] => carveWhere(
  [...disc([0, 0], R), ...lowerEdge(low), ...lowerEdge(high)],
  ([x, y]) => Math.hypot(x, y) < R && y - Math.abs(x) / Math.sqrt(3) > low && y - Math.abs(x) / Math.sqrt(3) < high,
);

/** The printed flowers are trimmed where they reach the circle outside the three cut shell bands. */
function croppedPetals(c: Builder, rotation: number): void {
  const reach = 47;
  const k = reach / 100;
  const centre = polar(91, rotation, [0, 0]);
  const placement: Placing = { k, at: [centre[0], -centre[1]], turn: rotation + 180 };
  const field: V = [0, 91 / k];
  const fieldRadius = 92.8 / k;
  const { lobes, stamen } = HANABISHI_FOUR;
  const outline = [...disc([0, 0], 64), ...disc([0, 0], 12), ...lobes.flatMap((lobe) => disc(lobe.c, lobe.r)), ...stamen.flatMap((edge) => disc(edge.c, edge.r))];
  const wedge = [seg([-140, -139], [140, 141]), seg([140, -139], [-140, 141])];
  c.guideCircle(onPage([0, 0], placement), 12 * k);
  c.guideCircle(C0, 92.8);
  for (const angle of [0, -90, 90]) {
    const a = angle * DEG;
    const petals = carveWhere(
      [...outline, ...wedge, ...disc(field, fieldRadius).map((piece) => rotated(piece, -a))],
      (p) => {
        if (p[1] <= Math.abs(p[0]) + 1 || vdist(p, [0, 0]) <= 12) return false;
        if (vdist(p, [0, 0]) >= 64 && !lobes.some((lobe) => vdist(p, lobe.c) <= lobe.r)) return false;
        if (stamen.every((edge) => vdist(p, edge.c) < edge.r)) return false;
        const [x, y] = p;
        return vdist([x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)], field) < fieldRadius;
      },
    );
    if (petals.length > 0) c.fill(blossomPart, toPath(petals.map((loop) => loop.map((piece) => rotated(piece, a))), placement));
  }
  const centreMark = carveWhere([...disc([0, 0], 10), ...disc(field, fieldRadius)], (p) => vdist(p, [0, 0]) <= 10 && vdist(p, field) < fieldRadius);
  c.fill(blossomPart, toPath(centreMark, placement));
}

export function mitsuwariKumiawaseKikkoBuild(c: Builder): void {
  // Preserve the compass centres of the short clipped flower arcs.
  c.precision(3);
  c.guideCircle(C0, R);
  c.guideCircle(C0, 93);
  c.fill(shellPart, circle(C0, R).join(circle(C0, 93)), "evenodd");
  const stripes = [...shellBand(25, 29), ...shellBand(33, 37), ...shellBand(41, 43.5)];
  for (const angle of [0, 120, 240]) c.fill(shellPart, toPath(stripes, { k: 1, turn: angle }), "evenodd");
  for (const angle of [0, 120, 240]) croppedPetals(c, angle);
}
