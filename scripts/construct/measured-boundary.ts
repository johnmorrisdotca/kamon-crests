import { circleThrough, seg, shortArc } from "./compass.ts";
import type { Piece, Region, V } from "./compass.ts";

function edge(a: V, through: V, b: V): Piece {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const chord = Math.hypot(dx, dy);
  const normal: V = [-dy / chord, dx / chord];
  const middle: V = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const offset: V = [through[0] - middle[0], through[1] - middle[1]];
  const rise = offset[0] * normal[0] + offset[1] * normal[1];
  if (Math.abs(rise) < .4) return seg(a, b);

  const height = (offset[0] ** 2 + offset[1] ** 2 - (chord / 2) ** 2) / (2 * rise);
  const hint: V = [middle[0] + height * normal[0], middle[1] + height * normal[1]];
  const radius = Math.max(Math.ceil(chord / 2), Math.round(Math.hypot(chord / 2, height)));

  return shortArc(circleThrough(a, b, radius, hint), a, b);
}

/** Turns measured endpoints and one point in each run into a closed outline of compass arcs and lines. */
export function measuredBoundary(first: V, runs: readonly (readonly [V, V])[]): Region {
  return runs.map(([middle, end], index) => edge(index === 0 ? first : runs[index - 1][1], middle, end));
}
