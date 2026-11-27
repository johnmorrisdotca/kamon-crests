import { DEG, arcA, onCircle, pieceEnd, pieceStart, reversedRun, seg, vadd, vmul } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

interface CordRun {
  /** This run's share of the total length, in any consistent unit. */
  length: number;
  /** Clockwise change in heading, in degrees. Omit for a straight run. */
  bend?: number;
}

interface CordBandOptions extends PartOptions {
  /** The physical width of the entire cord, in crest units. */
  width?: number;
  /** Successive runs continue along the previous run's tangent. */
  runs?: readonly CordRun[];
  /** Split the cord down its middle with the crest's paper width. */
  seam?: boolean;
}

function centreline(size: number, runs: readonly CordRun[]): Piece[] {
  const total = runs.reduce((sum, { length }) => sum + length, 0);
  if (!Number.isFinite(total) || total <= 0) throw new Error("cord-band: give the cord a positive run length");

  let heading = Math.PI / 2;
  let start: V = [0, 0];
  return runs.map(({ length, bend = 0 }) => {
    if (!Number.isFinite(length) || length <= 0 || !Number.isFinite(bend) || Math.abs(bend) >= 360) {
      throw new Error("cord-band: a run needs a positive length and a bend under 360 degrees");
    }
    const span = length / total * size;
    const sweep = bend * DEG;
    let run: Piece;
    if (sweep === 0) {
      run = seg(start, onCircle(start, span, heading));
    } else {
      const radius = span / Math.abs(sweep);
      const normal = Math.sign(sweep) * Math.PI / 2;
      const circle = onCircle(start, radius, heading - normal);
      run = arcA(circle, radius, heading + normal, heading + normal - sweep);
    }
    start = pieceEnd(run);
    heading -= sweep;
    return run;
  });
}

/** Positive offsets are to the left of travel. */
function offset(run: Piece, distance: number): Piece {
  if (run.t === "A") {
    const radius = run.r + Math.sign(run.a0 - run.a1) * distance;
    if (radius <= 0) throw new Error("cord-band: a bend is tighter than the width of the cord");
    return arcA(run.c, radius, run.a0, run.a1);
  }
  const angle = Math.atan2(run.b[1] - run.a[1], run.b[0] - run.a[0]);
  const shift = vmul([-Math.sin(angle), Math.cos(angle)], distance);
  return seg(vadd(run.a, shift), vadd(run.b, shift));
}

function band(runs: Piece[], left: number, right: number): Region {
  const forward = runs.map((run) => offset(run, left));
  const back = reversedRun(runs.map((run) => offset(run, right)));
  return [
    ...forward,
    seg(pieceEnd(forward[forward.length - 1]), pieceStart(back[0])),
    ...back,
    seg(pieceEnd(back[back.length - 1]), pieceStart(forward[0])),
  ];
}

/** Size is the cord's length along its centreline; the centre is its first attachment. */
export const cordBand = definePart<CordBandOptions>({
  id: "cord-band",
  name: { en: "Cord band", ja: "紐" },
  description: {
    en: "A ruled or curved cord of even width follows tangent runs between its square-cut attachments.",
    ja: "まっすぐな線と弧を接線でつないで幅のそろった紐を作り、両端を取り付けます。",
  },
  families: ["ogi", "tsuzumi", "kagi", "fukuro"],
  sources: [
    { frame: 36, page: "R", row: 2, col: 1, label: "ぬさあふぎ" },
    { frame: 22, page: "R", row: 3, col: 3, label: "紐付つづみ" },
    { frame: 17, page: "R", row: 3, col: 3, label: "丸ニ一ッかぎ" },
  ],
  stock: true,
  sampleSize: 159,
  sampleOptions: { motif: "fan", width: 9, seam: true, runs: [{ length: 1 }, { length: 3, bend: 180 }, { length: 1 }] },
  build(c, centre, turn, size, { motif, keyline, paper = PAPER, width = size * .055, runs = [{ length: 1 }], seam = false }) {
    if (!Number.isFinite(width) || width <= 0 || (seam && width <= paper)) {
      throw new Error("cord-band: the width must be positive and leave ink beside the seam");
    }
    const path = centreline(size, runs);
    const ink = seam
      ? [band(path, width / 2, paper / 2), band(path, -paper / 2, -width / 2)]
      : [band(path, width / 2, -width / 2)];
    fillPart(c, motif, ink, { k: 1, at: centre, turn }, keyline);
  },
});

export default cordBand;
