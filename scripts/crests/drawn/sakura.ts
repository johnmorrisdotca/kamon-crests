// Cherry blossoms measured from frame 37 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, carve, carveWhere, circleThrough, disc, inside, mirrored, reversedRun, seg, shortArc, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

const PART = "cherry";
const TURNS = [0, 72, 144, 216, 288];
const ORIGIN: V = [0, 0];
const HALF = 36 * DEG;
const polygon = (points: V[]): Region => points.map((p, i) => seg(p, points[(i + 1) % points.length]));

const struck = (from: V, to: V, radius: number, hint: V) => shortArc(circleThrough(from, to, radius, hint), from, to);

/** Two cap arcs meet at the shallow notch. The flanks taper towards the round heart. */
const cherryPetal = (notch: number, width: number, cap: number): Region => {
  const foot: V = [0, 10];
  const shoulder: V = [-width, 69];
  const cleft: V = [0, notch];
  const left = [struck(foot, shoulder, 103, [58, 84]), struck(shoulder, cleft, cap, [-20, 56])];
  return [...left, ...reversedRun(left.map(mirrored))];
};

/** Each petal stops at the same two ruled divisions. The round heart has its own white margin. */
const frontPetal = (outline: Region, gap: number, centre: number): Region[] => {
  const rise = Math.sin(HALF);
  const across = Math.cos(HALF);
  const apex: V = [0, gap / rise];
  const far = apex[1] + (100 * across) / rise;
  return carveWhere([
    ...outline, ...disc(ORIGIN, centre), seg(apex, [-100, far]), seg(apex, [100, far]),
  ], (point) => inside(outline, point) && point[1] * rise - Math.abs(point[0]) * across > gap && Math.hypot(...point) > centre);
};

const arrow = polygon([[-1.1, 12], [1.1, 12], [1.1, 38], [5.2, 44], [0, 51], [-5.2, 44], [-1.1, 38]]);

export const sakuraBuild = (c: Builder): void => {
  c.precision(3);
  const k = 0.98;
  const petal = carve(frontPetal(cherryPetal(83, 43, 27), 0.95, 14.5), [arrow]);
  c.guideCircle(C0, 96);
  c.guideSpokes(5, 0, 96);
  for (const turn of TURNS) c.fill(PART, toPath(petal, { k, turn }));
  c.fill(PART, toPath([disc(ORIGIN, 12.2)], { k }));
};
