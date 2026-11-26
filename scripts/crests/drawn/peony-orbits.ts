import type { Builder } from "../../construct/builder.ts";
import {
  DEG, carve, circleThrough, disc, reversed, rotated, shortArc,
  thickArc, toPath,
} from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

type Arc = Extract<Piece, { t: "A" }>;

function arch(from: V, to: V, radius: number, towards: V, width: number): Region {
  const circle = circleThrough(from, to, radius, towards);
  const arc = shortArc(circle, from, to) as Arc;
  return thickArc(circle.c, circle.r, width, Math.min(arc.a0, arc.a1), Math.max(arc.a0, arc.a1));
}

const topRay = (angle: number, distance: number): V => [distance * Math.sin(angle * DEG), distance * Math.cos(angle * DEG)];

export function nejiBotanBuild(c: Builder): void {
  const flankEnd = topRay(-36, 88);
  const flank = circleThrough([0, 0], flankEnd, 78, [-81, 1]);
  const sweep = shortArc(flank, [0, 0], flankEnd) as Arc;
  const finish = reversed(rotated(sweep, -72 * DEG));
  const rim: V[] = [flankEnd, topRay(-24, 92.5), topRay(-13, 94), topRay(-4, 95), topRay(9, 93.5), topRay(20, 90.5), topRay(31, 88.5), topRay(36, 88)];
  const crest = rim.slice(1).map((point, i) => shortArc(circleThrough(rim[i], point, 62, [0, 0]), rim[i], point));
  const firstSeam = thickArc(flank.c, flank.r, 2.7, Math.min(sweep.a0, sweep.a1), Math.max(sweep.a0, sweep.a1));
  const secondSeam = firstSeam.map((piece) => rotated(piece, -72 * DEG));
  const fan = [-27, -20, -13, -6, 1, 8, 15, 22, 29].map((angle, i) => {
    const from = topRay(-10 + i * 6, 10.3);
    const to = topRay(angle, 74 + 4 * Math.sin((i + 1) * Math.PI / 10));
    return arch(from, to, 78 + i * 1.6, [-79, 22], 1.8);
  });
  const band = carve([[sweep, ...crest, finish]], [disc([0, 0], 13.2), firstSeam, secondSeam, ...fan]);

  c.guideCircle(C0, R);
  for (let i = 0; i < 5; i++) c.fill("peony", toPath(band, { k: 1, turn: i * 72 }), "evenodd");
  c.fill("peony", toPath([disc([0, 0], 10.9)], { k: 1 }));
}
