import { DEG, arcA, carve, carveWhere, inside, onCircle, pieceEnd, pieceStart, reversedRun, seg, thickSeg, vadd, vdist, vmul } from "../../construct/compass.ts";
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

interface CordTwist {
  /** Desired distance between cuts along the cord, in crest units. */
  pitch?: number;
  /** Tilt in degrees from a cut directly across the cord. */
  angle?: number;
}

interface CordBandOptions extends PartOptions {
  /** The physical width of the entire cord, in crest units. */
  width?: number;
  /** Successive runs continue along the previous run's tangent. */
  runs?: readonly CordRun[];
  /** Split the cord down its middle with the crest's paper width. */
  seam?: boolean;
  /** Repeat ruled paper cuts inside the two running edges. */
  twist?: CordTwist;
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

/** Space the cuts by distance along the joined runs, including across their tangent joins. */
function twistCuts(path: Piece[], size: number, width: number, paper: number, { pitch = 1.4 * width, angle = 32 }: CordTwist): Region[] {
  const tilt = angle * DEG;
  if (!Number.isFinite(pitch) || !Number.isFinite(angle) || Math.abs(angle) >= 90 || pitch * Math.cos(tilt) <= paper || width <= 2 * paper) {
    throw new Error("cord-band: twist cuts need room between their running edges and neighbours");
  }
  const count = Math.floor(size / pitch);
  if (count === 0) return [];
  const lengths = path.map((run) => run.t === "L" ? vdist(run.a, run.b) : run.r * Math.abs(run.a1 - run.a0));
  let runIndex = 0;
  let lengthBefore = 0;
  const cuts = Array.from({ length: count }, (_, i) => {
    const distance = (i + .5) * size / count;
    while (runIndex + 1 < path.length && distance > lengthBefore + lengths[runIndex]) {
      lengthBefore += lengths[runIndex];
      runIndex += 1;
    }
    const run = path[runIndex];
    const along = (distance - lengthBefore) / lengths[runIndex];
    let centre: V;
    let tangent: number;
    if (run.t === "L") {
      centre = vadd(vmul(run.a, 1 - along), vmul(run.b, along));
      tangent = Math.atan2(run.b[1] - run.a[1], run.b[0] - run.a[0]);
    } else {
      const sweep = run.a1 - run.a0;
      const at = run.a0 + along * sweep;
      centre = onCircle(run.c, run.r, at);
      tangent = at + Math.sign(sweep) * Math.PI / 2;
    }
    const across = tangent + Math.PI / 2 + tilt;
    const reach = width / Math.cos(tilt);
    return thickSeg(onCircle(centre, -reach, across), onCircle(centre, reach, across), paper);
  });
  const inset = width / 2 - paper;
  const field = band(path, inset, -inset);
  return carveWhere([...field, ...cuts.flat()], (p) => inside(field, p) && cuts.some((cut) => inside(cut, p)));
}

/** Size is the cord's length along its centreline; the centre is its first attachment. */
export const cordBand = definePart<CordBandOptions>({
  id: "cord-band",
  name: { en: "Cord band", ja: "紐" },
  description: {
    en: "A cord of even width follows tangent runs between its attachments. A seam or repeated oblique paper cuts mark the strands.",
    ja: "まっすぐな線と弧を接線でつないで幅のそろった紐を作ります。中央の白い筋や等間隔の斜めの切り込みで綱目を表します。",
  },
  families: ["ogi", "tsuzumi", "kagi", "fukuro", "ikari"],
  sources: [
    { frame: 36, page: "R", row: 2, col: 1, label: "ぬさあふぎ" },
    { frame: 22, page: "R", row: 3, col: 3, label: "紐付つづみ" },
    { frame: 17, page: "R", row: 3, col: 3, label: "丸ニ一ッかぎ" },
    { frame: 7, page: "R", row: 4, col: 4, label: "一ッつないかり" },
    { frame: 7, page: "R", row: 2, col: 4, label: "三ッつないかり" },
  ],
  stock: true,
  sampleSize: 159,
  sampleOptions: { motif: "anchor", width: 9, twist: {}, runs: [{ length: 1 }, { length: 3, bend: 180 }, { length: 1 }] },
  build(c, centre, turn, size, { motif, keyline, paper = PAPER, width = size * .055, runs = [{ length: 1 }], seam = false, twist }) {
    if (!Number.isFinite(width) || width <= 0 || (seam && width <= paper)) {
      throw new Error("cord-band: the width must be positive and leave ink beside the seam");
    }
    const path = centreline(size, runs);
    const ink = seam
      ? [band(path, width / 2, paper / 2), band(path, -paper / 2, -width / 2)]
      : [band(path, width / 2, -width / 2)];
    const cuts = twist === undefined ? [] : twistCuts(path, size, width, paper, twist);
    fillPart(c, motif, cuts.length === 0 ? ink : carve(ink, cuts), { k: 1, at: centre, turn }, keyline);
  },
});

export default cordBand;
