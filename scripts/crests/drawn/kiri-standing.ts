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

function roundedBud(at: V, size: number): Region[] {
  const [x, y] = at;

  return [
    disc([x, y + size], 6.8 * size),
    disc([x + 3.9 * size, y - 2.8 * size], 5.3 * size),
    disc([x - 3.9 * size, y - 2.8 * size], 5.3 * size),
    disc([x, y + 5.4 * size], 4.6 * size),
  ];
}

function floweringSpike(x: number, foot: number, height: number, tiers: number[], size: number, reach: number): Region[] {
  const body = [thickSeg([x, foot], [x, height], 3.85), ...roundedBud([x, height - 2], 1.1 * size)];
  for (const tier of tiers) {
    for (const side of [-1, 1]) {
      const end: V = [x + reach * side, tier + 9];
      const bend = ribbon([x, tier - 4], end, 41, [x + 10 * side, tier + 35], 2.6);
      body.push(bend, ...roundedBud(end, size));
    }
  }

  return carve(body, []);
}

export function oribeKiriBuild(c: Builder): void {
  c.precision(2);
  c.guideCircle(C0, R);
  const shoots = [
    floweringSpike(0, 9, 79.8, [28, 44, 62], 1, 22.7),
    floweringSpike(-58, 0, 60, [25, 40], 0.88, 15.1),
    floweringSpike(58, 0, 56, [24, 38], 0.87, 15.1),
  ];
  for (const shoot of shoots) c.fill("paulownia", toPath(shoot, { k: 1 }), "evenodd");
  standingLeaves(c, [0, 4]);
}
