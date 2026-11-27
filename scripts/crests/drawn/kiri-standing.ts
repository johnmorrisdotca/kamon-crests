import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleThrough, disc, mirrored, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { paulowniaLeaf } from "./kiri.ts";

const arc = (from: V, to: V, radius: number, hint: V): Piece => shortArc(circleThrough(from, to, radius, hint), from, to);

const ribbon = (from: V, to: V, radius: number, hint: V, width: number): Region => {
  const curve = arc(from, to, radius, hint) as Extract<Piece, { t: "A" }>;

  return thickArc(curve.c, curve.r, width, Math.min(curve.a0, curve.a1), Math.max(curve.a0, curve.a1));
};

const pointAt = (radius: number, angle: number): V => [radius * Math.sin(angle * DEG), radius * Math.cos(angle * DEG)];

function standingLeaves(c: Builder, joint: V): void {
  const sides = paulowniaLeaf(false);
  for (const sign of [-1, 1]) {
    c.fill("paulownia", toPath(sides, { k: 0.96, at: [joint[0] + 3 * sign, joint[1]], turn: -64 * sign }));
  }
  c.fill("paulownia", toPath(paulowniaLeaf(true), { k: 1.02, at: [joint[0], joint[1] - 3] }));
  c.fill("paulownia", toPath([disc(joint, 9)], { k: 1 }));
}

export function uzumiKiriBuild(c: Builder): void {
  c.precision(2);
  c.guideCircle(C0, R);
  const bulbs = [0, 72, 144, 216, 288].map((turn) => disc(pointAt(12.1, turn), 9.6));
  const side = ribbon([0, -8], [9, 6], 24, [16, -12], 2.1);
  const channels = [side, side.map(mirrored), thickSeg([0, -8], [0, 12.7], 2.0)];
  const bloom = carve(bulbs, channels);
  for (const x of [-51.5, 0, 51.5]) {
    const y = x === 0 ? 48 : 42;
    c.group(() => {
      c.fill("paulownia", toPath([thickSeg([x * 0.84, 9], [x, y - 14], 4.25)], { k: 1 }));
      c.fill("paulownia", toPath(bloom, { k: x === 0 ? 1.12 : 0.97, at: [x, y] }), "evenodd");
    });
  }
  standingLeaves(c, [0, 4.5]);
}
