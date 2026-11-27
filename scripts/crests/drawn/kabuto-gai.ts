import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleThrough, shortArc, thickArc, disc, moved, rotated, vmul, toPath } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";

const curve = (from: V, to: V, radius: number, centreSide: V) => shortArc(circleThrough(from, to, radius, centreSide), from, to);

const tip: V = [0, -104];
const leftLip: V = [-19, -99];
const rightLip: V = [19, -99];
const leftShoulder: V = [-23, -67];
const rightShoulder: V = [23, -67];
const hinge: V = [0, 0];
const shell: Region = [
  curve(hinge, leftShoulder, 152, [121, -63]),
  curve(leftShoulder, leftLip, 61, [42, -82]),
  curve(leftLip, tip, 26, [0, -82]),
  curve(tip, rightLip, 26, [0, -82]),
  curve(rightLip, rightShoulder, 61, [-42, -82]),
  curve(rightShoulder, hinge, 152, [-121, -63]),
];

const growthCentre: V = [0, -1];
const cuts = [15, 23, 31, 40, 50, 61, 72, 83, 94].map((radius) =>
  thickArc(growthCentre, radius, 2.1, 246 * DEG, 294 * DEG));
const joint: V = [0, 22];

// The print has a high hinge. Rear shells are shorter, while the near shells extend past the lower lip.
const lengths = [1, 1, 0.98, 0.94, 0.88, 0.73, 0.62, 0.6, 0.62, 0.73, 0.88, 0.94, 0.98, 1];

const scale = (piece: Piece, factor: number): Piece => piece.t === "L"
  ? { t: "L", a: vmul(piece.a, factor), b: vmul(piece.b, factor) }
  : { ...piece, c: vmul(piece.c, factor), r: piece.r * factor };

const placed = (region: Region, index: number): Region => {
  const angle = index * 360 * DEG / lengths.length;
  return region.map((piece) => moved(rotated(scale(piece, lengths[index]), angle), joint));
};

const profiles = lengths.map((_, index) => placed(shell, index));
const frontToBack = [0, 1, 13, 2, 12, 3, 11, 4, 10, 5, 9, 6, 8, 7];

export function kabutoGaiBuild(c: Builder): void {
  c.precision(3);
  // The nearest shells cover the scallops behind them, with a fine seam along the overlap.
  for (const index of [7, 8, 9, 10, 11, 12, 13, 0, 1, 2, 3, 4, 5, 6]) {
    const ahead = frontToBack.slice(0, frontToBack.indexOf(index)).filter((other) => {
      const between = Math.abs(other - index);
      return Math.min(between, lengths.length - between) <= 2;
    });
    const clearances = ahead.flatMap((other) => [
      profiles[other],
      ...profiles[other].flatMap((piece) => piece.t === "A" ? [thickArc(piece.c, piece.r, 2.2, piece.a0, piece.a1)] : []),
    ]);
    const ribs = index % 2 === 0 ? [] : cuts.map((cut) => placed(cut, index));
    c.fill("shell", toPath(carve([profiles[index]], [...clearances, ...ribs]), { k: 1 }), "evenodd");
  }
  c.fill("shell", toPath([disc(joint, 1.8)], { k: 1 }));
}
