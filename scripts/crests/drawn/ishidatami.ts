// Ruled paving-stone patterns from frame 7 of the 1892 crest book.
import { RING_GAP } from "../../construct/builder.ts";
import type { Builder } from "../../construct/builder.ts";
import { C0, CX, CY, R, add, ngon, poly, turn } from "../../construct/geo.ts";
import type { Pt } from "../../construct/geo.ts";

export const ishidatamiGurumaBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  c.guideSpokes(8, 0, R);
  const side = R / Math.SQRT2;
  const halfGap = 0.85;
  const diagonalGap = halfGap * Math.SQRT2;
  // One square as seen between its own leading edge and the next square, an eighth of a turn further around.
  // The narrow gaps follow its radial side and both ruled edges of the next square.
  const tile: Pt[] = [
    [halfGap, -side],
    [side, -side],
    [side, side * (1 - Math.SQRT2) - diagonalGap],
    [side / Math.SQRT2, -side / Math.SQRT2 - diagonalGap],
    [halfGap, -halfGap - diagonalGap],
  ];
  const face = tile.map((p) => add(C0, p));
  for (let i = 0; i < 8; i += 1) c.fill("paving-square", poly(face.map((p) => turn(p, 45 * i))));
};

export const sumitateKokonotsuIshidatamiBuild = (c: Builder): void => {
  c.precision(3);
  const half = R / Math.hypot(3, 2);
  const centres = [-2 * half, 0, 2 * half];
  for (const x of centres) c.guideLine([CX + x, CY - R], [CX + x, CY + R]);
  for (const y of centres) c.guideLine([CX - R, CY + y], [CX + R, CY + y]);
  for (const dy of centres) {
    for (const dx of centres) c.fill("paving-square", ngon(4, half, 0, [CX + dx, CY + dy]));
  }
};

export const mitsuIshiBuild = (c: Builder): void => {
  const halfSide = (R - 2) / Math.hypot(3, 2);
  const halfDiagonal = halfSide * Math.SQRT2;
  const centres: Pt[] = [[CX, CY - halfSide], [CX - 2 * halfSide, CY + halfSide], [CX + 2 * halfSide, CY + halfSide]];
  for (const centre of centres) c.fill("paving-square", ngon(4, halfDiagonal, 45, centre));
};

export const maruNiMitsuIshiBuild = (c: Builder): void => {
  const reach = c.ring("ring-medium") - RING_GAP;
  const seam = 1.3 / Math.SQRT2;
  const half = (reach * 0.88 - seam) / 2;
  const offset = half + seam;
  const level = CY + reach * 0.08;
  const centres: Pt[] = [[CX, level - offset], [CX - offset, level], [CX + offset, level]];
  for (const centre of centres) c.fill("paving-square", ngon(4, half, 0, centre));
};
