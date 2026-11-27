import {
  arcA, circleThrough, onCircle, pieceEnd, pieceStart, reversed, reversedRun, seg, shortArc, thickArc, thickSeg,
  vadd, vmul, vsub, vunit,
} from "../../../construct/compass.ts";
import type { Piece, Region, V } from "../../../construct/compass.ts";

interface Station {
  point: V;
  tangent: V;
}

const HALF_WIDTH = .086;
const STATIONS = [0, .23, .480, .74, 1];
const dot = (a: V, b: V): number => a[0] * b[0] + a[1] * b[1];
const normal = ([x, y]: V): V => [-y, x];

function tangentArc(from: Station, to: V): Piece {
  const chord = vsub(to, from.point);
  const across = normal(from.tangent);
  const rise = dot(chord, across);
  if (Math.abs(rise) < 1e-8) return seg(from.point, to);
  const offset = dot(chord, chord) / (2 * rise);
  return shortArc({ c: vadd(from.point, vmul(across, offset)), r: Math.abs(offset) }, from.point, to);
}

/** Interpolate the two prescribed normals with exactly tangent compass arcs. */
function join(a: Station, b: Station): Piece[] {
  const chord = vsub(b.point, a.point);
  const square = dot(chord, chord);
  const along = dot(chord, vadd(a.tangent, b.tangent));
  const distance = square / (along + Math.sqrt(
    along * along + 2 * (1 - dot(a.tangent, b.tangent)) * square,
  ));
  const meeting = vmul(vadd(vadd(a.point, b.point), vmul(vsub(a.tangent, b.tangent), distance)), .5);
  return [tangentArc(a, meeting), reversed(tangentArc({ point: b.point, tangent: vmul(b.tangent, -1) }, meeting))];
}

function lensRadius(length: number): number {
  const width = length * HALF_WIDTH;
  return length * length / (8 * width) + width / 2;
}

function straightLeaf(root: V, tip: V, paper: number): { outline: Region; midrib: Region } {
  const chord = vsub(tip, root);
  const radius = lensRadius(Math.hypot(...chord));
  const mid = vmul(vadd(root, tip), .5);
  const n = normal(vunit(chord));
  const side = (a: V, b: V, sign: number): Piece =>
    shortArc(circleThrough(a, b, radius, vadd(mid, vmul(n, sign * radius))), a, b);
  return {
    outline: [side(root, tip, -1), side(tip, root, 1)],
    midrib: thickSeg(vadd(root, vmul(chord, .09)), vadd(root, vmul(chord, .91)), paper),
  };
}

/** Place one orchid lens, or bend its axis while retaining the same flank width at each station. */
export function orchidLeaf(root: V, tip: V, paper: number, bow?: V): { outline: Region; midrib: Region } {
  const chord = vsub(tip, root);
  const chordLength = Math.hypot(...chord);
  const n = normal(vunit(chord));
  const mid = vmul(vadd(root, tip), .5);
  const rise = bow ? dot(vsub(bow, mid), n) : 0;
  if (Math.abs(rise) < .4) return straightLeaf(root, tip, paper);

  const signedRadius = chordLength * chordLength / (8 * rise) + rise / 2;
  const centre = vadd(mid, vmul(n, rise - signedRadius));
  const radius = Math.abs(signedRadius);
  const axis = shortArc({ c: centre, r: radius }, root, tip) as Extract<Piece, { t: "A" }>;
  const sweep = axis.a1 - axis.a0;
  const length = Math.abs(sweep) * radius;
  const width = length * HALF_WIDTH;
  const guideRadius = lensRadius(length);

  const flank = (sign: number): Region => {
    const stations = STATIONS.map((t): Station => {
      const angle = axis.a0 + t * sweep;
      const radial: V = [Math.cos(angle), Math.sin(angle)];
      const along = vmul(normal(radial), Math.sign(sweep));
      const station = (t - .5) * length;
      const span = Math.sqrt(guideRadius * guideRadius - station * station);
      const offset = t === 0 || t === 1 ? 0 : width - guideRadius + span;
      const point = onCircle(centre, radius + sign * offset, angle);
      const tangent = vunit(vadd(
        vmul(along, 1 + sign * offset / radius),
        vmul(radial, -sign * station / span),
      ));
      return { point, tangent };
    });
    return stations.slice(1).flatMap((station, i) => join(stations[i], station));
  };

  const first = axis.a0 + .09 * sweep;
  const last = axis.a0 + .91 * sweep;
  return {
    outline: [...flank(1), ...reversedRun(flank(-1))],
    midrib: thickArc(centre, radius, paper, Math.min(first, last), Math.max(first, last)),
  };
}

/** Strike a parallel circle at the paper width. Join the leaf's two real corners with round ends. */
export function orchidPaper(outline: Region, paper: number): Region {
  const orientation = Math.sign(outline.reduce((twiceArea, edge) => {
    const a = pieceStart(edge);
    const b = pieceEnd(edge);
    const circularSegment = edge.t === "A"
      ? edge.r * edge.r * (edge.a1 - edge.a0 - Math.sin(edge.a1 - edge.a0))
      : 0;
    return twiceArea + a[0] * b[1] - a[1] * b[0] + circularSegment;
  }, 0));
  const parallel = outline.map((edge): Piece => {
    if (edge.t === "A") {
      const radius = edge.r + orientation * Math.sign(edge.a1 - edge.a0) * paper;
      return arcA(edge.c, radius, edge.a0, edge.a1);
    }
    const shift = vmul(normal(vunit(vsub(edge.b, edge.a))), -orientation * paper);
    return seg(vadd(edge.a, shift), vadd(edge.b, shift));
  });
  return parallel.flatMap((edge, index) => {
    const a = pieceEnd(edge);
    const b = pieceStart(parallel[(index + 1) % parallel.length]);
    if (Math.hypot(...vsub(a, b)) < 1e-7) return [edge];
    return [edge, shortArc({ c: pieceEnd(outline[index]), r: paper }, a, b)];
  });
}
