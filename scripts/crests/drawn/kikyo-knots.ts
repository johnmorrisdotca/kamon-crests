import { WEIGHT } from "../../construct/builder.ts";
import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleThrough, disc, lineLine, mirrored, rotated, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

const BELLFLOWER = "bellflower";
const polar = (reach: number, angle: number): V => [reach * Math.cos(angle * DEG), reach * Math.sin(angle * DEG)];

export function itsutsuKikyoGumiBuild(c: Builder): void {
  const tip: V = [0, 96];
  const notch = polar(55, 54);
  const gap = WEIGHT.thread / 2;
  const [alongX, alongY] = polar(1, 54);
  const displaced: V = [-gap * alongY, gap * alongX];
  const shoulder = lineLine(displaced, [displaced[0] + alongX, displaced[1] + alongY], notch, tip);
  const root: V = [0, gap / alongX];
  const otherShoulder: V = [-shoulder[0], shoulder[1]];
  const petal = [seg(root, otherShoulder), seg(otherShoulder, tip), seg(tip, shoulder), seg(shoulder, root)];

  for (let i = 0; i < 5; i += 1) c.fill(BELLFLOWER, toPath([petal], { k: 1, turn: 72 * i }));
}

function pointedBandOutline(offset: number, peak: number) {
  const shoulder = peak - offset / Math.sqrt(3);
  const points: V[] = [[0, peak], [offset, shoulder], [offset, -shoulder], [0, -peak], [-offset, -shoulder], [-offset, shoulder]];

  return points.map((point, i) => seg(point, points[(i + 1) % points.length]));
}

export function mutsuMusubiKikyoBuild(c: Builder): void {
  const outside = 29;
  const inside = 16;
  const middle = (outside + inside) / 2;
  const outline = pointedBandOutline(outside, 96);
  const opening = pointedBandOutline(inside, 81);
  const underBandWidth = outside - inside + 2 * WEIGHT.hair;
  // Cut only where the next band passes above this one. The other crossing stays whole.
  const crossings = [-middle, middle].map((x) =>
    thickSeg([x, -58], [x, 58], underBandWidth).map((edge) => rotated(edge, -60 * DEG))
  );
  const star = Array.from({ length: 12 }, (_, i) => polar(i % 2 === 0 ? 24 : 16, 30 * i));
  const centreOpening = star.map((point, i) => seg(point, star[(i + 1) % star.length]));
  const band = carve([outline], [opening, ...crossings, centreOpening]);
  for (let i = 0; i < 3; i += 1) c.fill(BELLFLOWER, toPath(band, { k: 1, turn: 60 * i }), "evenodd");
}

function seam(from: V, to: V, r: number, on: V): Region {
  const circle = circleThrough(from, to, r, on);
  const bound = shortArc(circle, from, to);
  if (bound.t !== "A") throw new Error("The seam must lie on a circle");

  return thickArc(circle.c, circle.r, WEIGHT.thread, bound.a0, bound.a1);
}

export function kikyoBishiBuild(c: Builder): void {
  const top: V = [0, 74];
  const right: V = [96, 0];
  const bottom: V = [0, -74];
  const left: V = [-96, 0];
  const diamond = [seg(top, right), seg(right, bottom), seg(bottom, left), seg(left, top)];
  const neck: V = [12, 61];
  const shoulder: V = [26, 22];
  const upperRight = [
    seam(neck, shoulder, 105, [-74, 10]),
    seam(shoulder, [0, 0], 35, [-2, 28]),
    seam(shoulder, [93, 0], 135, [63, 120]),
    disc(shoulder, WEIGHT.thread / 2),
  ];
  const upper = [
    ...upperRight, ...upperRight.map((cut) => cut.map(mirrored)),
    seam([-29, 61], [29, 61], 45, [0, 84]),
    thickSeg([0, 60], [0, 45], WEIGHT.thread),
    thickSeg([19, 58], [25, 48], WEIGHT.thread),
    thickSeg([-19, 58], [-25, 48], WEIGHT.thread),
  ];
  const lower = upper.map((cut) => cut.map((edge) => rotated(edge, Math.PI)));
  c.fill(BELLFLOWER, toPath(carve([diamond], [...upper, ...lower]), { k: 1 }), "evenodd");
}
