import type { Builder } from "../../construct/builder.ts";
import { arcA, carve, circleThrough, disc, lineLine, pieceEnd, pieceStart, reversedRun, seg, shortArc, thickSeg, toPath, vadd, vlen, vmul, vsub, vunit } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const railSide = (points: V[], inset: number): V[] => {
  const lines = points.slice(1).map((to, i): [V, V] => {
    const from = points[i];
    const along = vunit(vsub(to, from));
    const across = vmul([-along[1], along[0]], inset);

    return [vadd(from, across), vadd(to, across)];
  });
  const corners = lines.slice(1).map((line, i) => lineLine(...lines[i], ...line));

  return [lines[0][0], ...corners, lines[lines.length - 1][1]];
};

export const kagiBishiBuild = (c: Builder): void => {
  const onLozenge = ([u, v]: V): V => [u + v, (u - v) * 0.8];
  const corners: V[] = [[44, -44], [-44, -44], [-44, 26], [26, 26], [26, -10], [-10, -10], [-10, 10]];
  const rail = corners.map(onLozenge);
  const boundary = [...railSide(rail, 2.8), ...railSide(rail, -2.8).reverse()];
  const body: Region = boundary.map((p, i) => seg(p, boundary[(i + 1) % boundary.length]));
  const grip = thickSeg(rail[0], onLozenge([-6, -44]), 10);
  const pin = disc(onLozenge([38, -44]), 1.8);
  const key = carve([body, grip], [pin]);

  c.guideCircle(C0, R);
  for (const turn of [0, 180]) c.fill("key", toPath(key, { k: 1, turn }), "evenodd");
};

const leftNormal = ([x, y]: V): V => [-y, x];

/** Round the route on tangent circles before taking the two constant-width cord edges. */
const cordBand = (knots: V[], width: number): Region => {
  const route: Region = [];
  let pen = knots[0];
  for (let i = 1; i < knots.length - 1; i += 1) {
    const joint = knots[i];
    const incoming = vsub(knots[i - 1], joint);
    const outgoing = vsub(knots[i + 1], joint);
    const back = vunit(incoming);
    const ahead = vunit(outgoing);
    const run = Math.min(vlen(incoming), vlen(outgoing)) * 0.44;
    const from = vadd(joint, vmul(back, run));
    const to = vadd(joint, vmul(ahead, run));
    const centre = lineLine(from, vadd(from, leftNormal(back)), to, vadd(to, leftNormal(ahead)));
    route.push(seg(pen, from), shortArc({ c: centre, r: vlen(vsub(from, centre)) }, from, to));
    pen = to;
  }
  route.push(seg(pen, knots[knots.length - 1]));

  const side = (piece: Piece, offset: number): Piece => {
    if (piece.t === "A") {
      const inward = piece.a1 > piece.a0 ? 1 : -1;
      return arcA(piece.c, piece.r - inward * offset, piece.a0, piece.a1);
    }
    const move = vmul(leftNormal(vunit(vsub(piece.b, piece.a))), offset);
    return seg(vadd(piece.a, move), vadd(piece.b, move));
  };
  const left = route.map((piece) => side(piece, width / 2));
  const right = reversedRun(route.map((piece) => side(piece, -width / 2)));
  const end = (run: Region): V => pieceEnd(run[run.length - 1]);
  return [...left, seg(end(left), pieceStart(right[0])), ...right, seg(end(right), pieceStart(left[0]))];
};

/** One spiral key in a ring, with open cord loops and two tassels. */
export const maruNiHitotsuKagiBuild = (c: Builder): void => {
  c.precision(3);
  c.ring("ring-medium");
  const corners: V[] = [[21, -65], [21, 50], [-47, 50], [-47, 9], [-10, 9], [-10, 29], [-29, 29]];
  const edge = [...railSide(corners, 3.7), ...railSide(corners, -3.7).reverse()];
  const body: Region = edge.map((point, i) => seg(point, edge[(i + 1) % edge.length]));
  const eye = disc([21, -63], 1.35);
  const paper = 1.15;
  const width = 3.45;
  const right: V[] = [[51, 8], [49.5, -5], [47, -17], [45, -31], [36, -40], [25, -41],
    [11, -36], [-2, -28], [-8, -18], [-3, -10], [7, -13], [20, -21]];
  const left: V[] = [[-25, -57], [-41, -53], [-54, -44], [-57, -31], [-54, -19], [-43, -12],
    [-31, -11], [-19, -17], [-4, -24], [10, -28], [20, -23]];
  const knot: V[] = [[24, -12], [15, -1], [5, 1], [-4, -5], [-5, -13], [0, -20],
    [11, -22], [25, -23], [36, -24], [45, -28]];
  const eyeRun: V[] = [[20, -62], [11, -58], [-2, -52], [-17, -42], [-28, -29], [-33, -17],
    [-30, -10], [-21, -11], [-11, -17], [1, -21]];
  const routes = [right, left, knot, eyeRun];
  const filled = routes.map((points) => cordBand(points, width));
  const clear = routes.map((points) => cordBand(points, width + 2 * paper));
  const knots = [disc([1, -21], 3.7), disc([20, -22], 4.9), disc([45, -28], 3.7)];
  const knotOver = carve([clear[2]], knots);
  const rightOverLeft = carve([clear[0]], [knots[1]]);
  const fill = (regions: Region[]): void => c.fill("key", toPath(regions, { k: 1 }), "evenodd");
  c.group(() => {
    fill(carve([body, disc(corners[0], 3.7)], [eye, ...clear]));
    fill(carve([filled[3]], [clear[0], clear[1], ...knotOver]));
    fill(carve([filled[1]], [...rightOverLeft, ...knotOver]));
    fill(carve([filled[0]], knotOver));
    fill([filled[2]]);
  });

  const brushLeft: V = [-8.5, 20];
  const brushRight: V = [8.5, 20];
  const brush: Region = [
    seg([-3.6, 3], brushLeft),
    shortArc(circleThrough(brushLeft, brushRight, 9.2, [0, 11]), brushLeft, brushRight),
    seg(brushRight, [3.6, 3]),
    seg([3.6, 3], [-3.6, 3]),
  ];
  const shades = [-5, -2, 2, 5].map((x) => thickSeg([x * 1.1, 26], [x * 0.5, 9.5], paper));
  const tassel = carve([
    disc([0, 0], 4.7),
    brush,
  ], shades);
  c.fill("key", toPath(tassel, { k: 1, at: [51, 8], turn: -8 }), "evenodd");
  c.fill("key", toPath(tassel, { k: 1, at: [-25, -57], turn: 111 }), "evenodd");
};
