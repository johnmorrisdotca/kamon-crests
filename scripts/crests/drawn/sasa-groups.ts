import type { Builder } from "../../construct/builder.ts";
import { carve, circleThrough, disc, mirrored, reversedRun, shortArc, thickSeg, toPath } from "../../construct/compass.ts";
import { C0 } from "../../construct/geo.ts";
import type { Region, V } from "../../construct/compass.ts";
import { kumaiZasaBuild } from "./sasa.ts";

const bend = (start: V, end: V, radius: number, centre: V) =>
  shortArc(circleThrough(start, end, radius, centre), start, end);

function almond(start: V, end: V, radius: number): Region {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const middle: V = [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2];

  return [
    bend(start, end, radius, [middle[0] + dy, middle[1] - dx]),
    bend(end, start, radius, [middle[0] - dy, middle[1] + dx]),
  ];
}

const motif = "bamboo-grass";
const thirds = [0, 120, 240];

export function maruNiFutoKyumaiZasaBuild(c: Builder): void {
  const room = c.ring("ring-medium");
  const outer = room - 2.5;
  const inside = outer - 5.9;
  c.guideCircle(C0, outer);
  c.guideCircle(C0, inside);
  c.fill("frame", toPath([disc([0, 0], outer), disc([0, 0], inside)], { k: 1 }), "evenodd");
  kumaiZasaBuild(c, motif, inside - 1.35);
}
