import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleThrough, disc, onCircle, seg, shortArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const eye = (centre: V, reach: number): Region[] => [disc(centre, reach), disc(centre, reach * 0.42)];

export const nanatsuJanomeBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  c.guideSpokes(6, 0, R);
  c.fill("snake-eye", toPath(eye([0, 0], 32), { k: 1 }), "evenodd");
  const outer = eye([0, 61], 29);
  for (const turn of [0, 60, 120, 180, 240, 300]) c.fill("snake-eye", toPath(outer, { k: 1, turn }), "evenodd");
};

/** Five pierced eyes overlap their neighbours in a clockwise turn. */
export const itsutsuNejiJanomeBuild = (c: Builder): void => {
  c.precision(3);
  const centre: V = [0, 48];
  const reach = 48;
  const [outer, hole] = eye(centre, reach);
  const next = onCircle([0, 0], centre[1], 18 * DEG);
  const overlap = disc(next, reach + .9);
  const layer = carve([outer], [hole, overlap]);
  c.guideCircle(C0, R);
  for (const turn of [0, 72, 144, 216, 288]) c.fill("snake-eye", toPath(layer, { k: 1, turn }));
};

export const kenUmeJanomeBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const centre: V = [0, 66];
  const outerEye = [disc(centre, 30), disc(centre, 12)];
  const hub = [disc([0, 0], 23), disc([0, 0], 6)];
  const stem = thickSeg([0, 21.5], [0, 38], 5.5);
  const foot: V = [3.4, 21.5];
  const shoulder: V = [16, 89.5];
  const tip: V = [0, R];
  const reflected = ([x, y]: V): V => [-x, y];
  const leftShoulder = reflected(shoulder);
  const leftFoot = reflected(foot);
  const rightEdge = circleThrough(foot, shoulder, 171, [175, 43]);
  const leftEdge = { c: reflected(rightEdge.c), r: rightEdge.r };
  const sword: Region = [
    shortArc(rightEdge, foot, shoulder),
    seg(shoulder, tip),
    seg(tip, leftShoulder),
    shortArc(leftEdge, leftShoulder, leftFoot),
    seg(leftFoot, foot),
  ];
  c.fill("snake-eye", toPath(hub, { k: 1 }), "evenodd");
  const places = [0, 72, 144, 216, 288];
  for (const turn of places) {
    c.group(() => {
      c.fill("snake-eye", toPath([stem], { k: 1, turn }));
      c.fill("snake-eye", toPath(outerEye, { k: 1, turn }), "evenodd");
    });
  }
  // Draw the five eyes and the five blades as separate clockwise runs.
  for (const turn of places) c.fill("sword", toPath([sword], { k: 1, turn: turn + 36 }));
};
