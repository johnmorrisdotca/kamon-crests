import { DEG, arcA, carve, carveWhere, inside, lineLine, onCircle, pieceEnd, pieceStart, reversedRun, seg, thickSeg, vadd, vdist, vmul } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

interface CordRun {
  /** This run's share of the total length, in any consistent unit. */
  length: number;
  /** Clockwise change in heading, in degrees. Omit for a straight run. */
  bend?: number;
  /** Clockwise corner before this straight run, in degrees. Both adjoining runs must be straight. */
  mitre?: number;
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
  return runs.map(({ length, bend = 0, mitre = 0 }, index) => {
    if (!Number.isFinite(length) || length <= 0 || !Number.isFinite(bend) || Math.abs(bend) >= 360) {
      throw new Error("cord-band: a run needs a positive length and a bend under 360 degrees");
    }
    if (!Number.isFinite(mitre) || Math.abs(mitre) >= 180 || (mitre !== 0 && (index === 0 || bend !== 0 || (runs[index - 1].bend ?? 0) !== 0))) {
      throw new Error("cord-band: a mitre under 180 degrees must join two straight runs");
    }
    heading -= mitre * DEG;
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

/** A mitre is where the two ruled offset edges of a corner meet. */
function side(runs: Piece[], corners: number[], distance: number): Piece[] {
  const edges = runs.map((run) => offset(run, distance));
  for (const i of corners) {
    const before = edges[i - 1];
    const after = edges[i];
    if (before.t !== "L" || after.t !== "L") throw new Error("cord-band: each mitre needs two ruled edges");
    const point = lineLine(before.a, before.b, after.a, after.b);
    if (!point.every(Number.isFinite)) throw new Error("cord-band: the mitre edges must meet");
    edges[i - 1] = seg(before.a, point);
    edges[i] = seg(point, after.b);
  }
  for (const i of corners) {
    for (const index of [i - 1, i]) {
      const run = runs[index];
      const edge = edges[index];
      if (run.t === "L" && edge.t === "L" &&
          (edge.b[0] - edge.a[0]) * (run.b[0] - run.a[0]) + (edge.b[1] - edge.a[1]) * (run.b[1] - run.a[1]) <= 0) {
        throw new Error("cord-band: a mitre is too wide for its adjoining runs");
      }
    }
  }
  return edges;
}

function band(runs: Piece[], corners: number[], left: number, right: number): Region {
  const forward = side(runs, corners, left);
  const back = reversedRun(side(runs, corners, right));
  return [
    ...forward,
    seg(pieceEnd(forward[forward.length - 1]), pieceStart(back[0])),
    ...back,
    seg(pieceEnd(back[back.length - 1]), pieceStart(forward[0])),
  ];
}

/** Space the cuts by distance along the joined runs, including across their tangent joins. */
function twistCuts(path: Piece[], corners: number[], size: number, width: number, paper: number, { pitch = 1.4 * width, angle = 32 }: CordTwist): Region[] {
  const tilt = angle * DEG;
  if (!Number.isFinite(pitch) || !Number.isFinite(angle) || Math.abs(angle) >= 90 || pitch * Math.cos(tilt) <= paper || width <= 2 * paper) {
    throw new Error("cord-band: twist cuts need room between their running edges and neighbours");
  }
  const count = Math.floor(size / pitch);
  if (count === 0) return [];
  const lengths = path.map((run) => run.t === "L" ? vdist(run.a, run.b) : run.r * Math.abs(run.a1 - run.a0));
  const inset = width / 2 - paper;
  const mitres = corners.map((index) => lengths.slice(0, index).reduce((sum, span) => sum + span, 0));
  // Leave the ruled corner clear when either end of an oblique cut would reach it.
  const clearance = inset * Math.abs(Math.tan(tilt)) + paper / (2 * Math.cos(tilt));
  const positions = Array.from({ length: count }, (_, i) => (i + .5) * size / count)
    .filter((distance) => !mitres.some((corner) => Math.abs(distance - corner) <= clearance));
  const reach = (mitres.length === 0 ? width : inset + (paper / 2) * Math.abs(Math.sin(tilt))) / Math.cos(tilt);
  let runIndex = 0;
  let lengthBefore = 0;
  const cuts = positions.map((distance) => {
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
    return thickSeg(onCircle(centre, -reach, across), onCircle(centre, reach, across), paper);
  });
  const field = band(path, corners, inset, -inset);
  return carveWhere([...field, ...cuts.flat()], (p) => inside(field, p) && cuts.some((cut) => inside(cut, p)));
}

/** Size is the cord's length along its centreline; the centre is its first attachment. */
export const cordBand = definePart<CordBandOptions>({
  id: "cord-band",
  name: { en: "Cord band", ja: "紐" },
  description: {
    en: "A cord of even width follows tangent runs or ruled mitres. A seam or repeated oblique paper cuts mark the strands.",
    ja: "直線と弧を接線でつなぎ、角では直線を交わらせて、幅のそろった紐を作ります。白い筋や斜めの切り込みで綱目を表します。",
  },
  families: ["ogi", "tsuzumi", "kagi", "fukuro", "ikari"],
  sources: [
    { frame: 36, page: "R", row: 2, col: 1, label: "ぬさあふぎ" },
    { frame: 22, page: "R", row: 3, col: 3, label: "紐付つづみ" },
    { frame: 17, page: "R", row: 3, col: 3, label: "丸ニ一ッかぎ" },
    { frame: 7, page: "R", row: 4, col: 4, label: "一ッつないかり" },
    { frame: 7, page: "R", row: 2, col: 4, label: "三ッつないかり" },
    { frame: 16, page: "R", row: 3, col: 2, label: "角ちがひ" },
    { frame: 21, page: "L", row: 1, col: 1, label: "糸に宝結び" },
    { frame: 21, page: "L", row: 4, col: 1, label: "角たから結" },
  ],
  stock: true,
  sampleSize: 159,
  sampleOptions: { motif: "knot", width: 9, twist: {}, runs: [{ length: 1 }, { length: 2, mitre: 90 }, { length: 1, mitre: 90 }] },
  build(c, centre, turn, size, { motif, keyline, paper = PAPER, width = size * .055, runs = [{ length: 1 }], seam = false, twist }) {
    if (!Number.isFinite(width) || width <= 0 || (seam && width <= paper)) {
      throw new Error("cord-band: the width must be positive and leave ink beside the seam");
    }
    const path = centreline(size, runs);
    const corners = runs.flatMap(({ mitre }, index) => mitre ? [index] : []);
    const ink = seam
      ? [band(path, corners, width / 2, paper / 2), band(path, corners, -paper / 2, -width / 2)]
      : [band(path, corners, width / 2, -width / 2)];
    const cuts = twist === undefined ? [] : twistCuts(path, corners, size, width, paper, twist);
    fillPart(c, motif, cuts.length === 0 ? ink : carve(ink, cuts), { k: 1, at: centre, turn }, keyline);
  },
});

export default cordBand;
