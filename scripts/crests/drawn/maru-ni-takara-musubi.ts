import type { Builder } from "../../construct/builder.ts";
import { DEG, arcA, carve, mirrored, pieceEnd, pieceStart, rotated, thickSeg } from "../../construct/compass.ts";
import type { Piece, V } from "../../construct/compass.ts";
import { cordBand } from "../library/cord-band.ts";
import { fillPart } from "../library/layers.ts";
import { PAPER } from "../library/part.ts";

const motif = "knot";
const width = 10;
const slope = .8;
const spacing = 32;
const normal = Math.hypot(1, slope);
const turn = Math.atan2(1, -slope);
type Arc = Extract<Piece, { t: "A" }>;

// These arcs touch the diagonal courses exactly where those courses end.
const outer = arcA([(spacing + 15.2 * normal) / slope, 0], 15.2, turn, -turn) as Arc;
const corner: V = [21, 21 * slope + spacing / 2];
const cap = arcA(corner, spacing / (2 * normal), turn, turn - Math.PI) as Arc;
const left = mirrored(outer) as Arc;
const back = rotated(cap, Math.PI) as Arc;
const positive: [V, V][] = [
  [pieceEnd(left), pieceStart(cap)],
  [pieceEnd(back), pieceEnd(cap)],
  [pieceStart(back), pieceStart(outer)],
];
const courses = [...positive, ...positive.map(([a, b]): [V, V] => [[-a[0], a[1]], [-b[0], b[1]]])];

/** At each crossing the first course passes over the second. */
const crossings: [number, number][] = [[0, 5], [4, 0], [0, 3], [3, 1], [1, 4], [5, 1], [2, 5], [4, 2], [2, 3]];

function round(c: Builder, arc: Arc): void {
  const sweep = arc.a1 - arc.a0;
  const heading = arc.a0 + Math.sign(sweep) * Math.PI / 2;
  cordBand.build(c, pieceStart(arc), 90 - heading / DEG, Math.abs(sweep) * arc.r, {
    motif, width, paper: PAPER, runs: [{ length: 1, bend: -sweep / DEG }],
  });
}

export const maruNiTakaraMusubiBuild = (c: Builder): void => {
  c.precision(3);
  c.ring("ring-thin");
  c.group(() => {
    for (const [i, [a, b]] of courses.entries()) {
      const over = crossings.filter(([, under]) => under === i).map(([index]) =>
        thickSeg(...courses[index], width + 2 * PAPER));
      fillPart(c, motif, carve([thickSeg(a, b, width)], over), { k: 1 });
    }
    for (const arc of [outer, left, cap, back, mirrored(cap), mirrored(back)]) round(c, arc as Arc);
  });
};
