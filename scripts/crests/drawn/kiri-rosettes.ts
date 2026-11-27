import { C0, R } from "../../construct/geo.ts";
import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleThrough, disc, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Piece, V } from "../../construct/compass.ts";
import { paulowniaLeaf } from "./kiri.ts";

export function hanaKiriGurumaBuild(c: Builder): void {
  c.precision(2);
  c.guideSpokes(6, 0, R);
  const leaves = paulowniaLeaf(false);
  for (const turn of [0, 60, 120, 180, 240, 300]) {
    const theta = turn * DEG;
    const at: V = [7.4 * Math.sin(theta), 7.4 * Math.cos(theta)];
    c.fill("paulownia", toPath(leaves, { k: 0.94, at, turn: turn + 180 }));
  }
  c.fill("paulownia", toPath([disc([0, 0], 10.6)], { k: 1 }));
}

export function mukaiKiriBishiBuild(c: Builder): void {
  c.precision(2);
  c.guideCircle(C0, R);
  const joint: V = [0, 33];
  const tip: V = [-94, 0];
  const shoulder: V = [-36, 44];
  const curve = (from: V, to: V, radius: number, towards: V): Piece =>
    shortArc(circleThrough(from, to, radius, towards), from, to);
  const outline = [
    curve(joint, shoulder, 42, [-25, 3]),
    curve(shoulder, tip, 93, [0, -43]),
    curve(tip, joint, 137, [-88, 119]),
  ];
  const line = (from: V, to: V, radius: number, towards: V, width: number) => {
    const edge = curve(from, to, radius, towards) as Extract<Piece, { t: "A" }>;

    return thickArc(edge.c, edge.r, width, Math.min(edge.a0, edge.a1), Math.max(edge.a0, edge.a1));
  };
  const lobe = carve([outline], [
    line([-87, 4], [-7, 32], 128, [-86, 125], 2.3),
    line([-69, 12], [-56, 29], 45, [-33, -6], 1.9),
    line([-54, 18], [-42, 35], 48, [-18, 0], 1.9),
    line([-39, 23], [-28, 37], 31, [-15, 14], 1.9),
  ]);
  const heart = paulowniaLeaf(true);
  const bud = [disc([0, 4.5], 4.2), disc([4.3, 2.2], 3.6), disc([-4.3, 2.2], 3.6)];
  const stem = thickSeg([0, -11.5], [0, 8.5], 2.8);
  for (const turn of [0, 180]) {
    const sign = turn === 0 ? 1 : -1;
    const at: V = [0, 33 * sign];
    c.fill("paulownia", toPath(heart, { k: 0.51, at, turn: turn + 180 }));
    for (const mirror of [false, true]) {
      c.fill("paulownia", toPath(lobe, { k: 1, turn, mirror }), "evenodd");
    }
    const flowerAt: V = [0, 22 * sign];
    c.fill("paulownia", toPath(carve([...bud, stem], []), { k: 1, at: flowerAt, turn: turn + 180 }));
    c.fill("paulownia", toPath([disc([0, 0], 4.9)], { k: 1, at }));
  }
}
