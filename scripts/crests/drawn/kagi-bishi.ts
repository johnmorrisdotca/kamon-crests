import type { Builder } from "../../construct/builder.ts";
import { DEG, angleOf, carve, circleThrough, disc, lineLine, seg, shortArc, thickArc, thickSeg, toPath, vadd, vmul, vsub, vunit } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
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

/** One spiral key in a ring, with open cord loops and two tassels. */
export const maruNiHitotsuKagiBuild = (c: Builder): void => {
  c.precision(3);
  c.ring("ring-medium");
  const corners: V[] = [[21, -65], [21, 50], [-47, 50], [-47, 9], [-10, 9], [-10, 29], [-29, 29]];
  const edge = [...railSide(corners, 3.7), ...railSide(corners, -3.7).reverse()];
  const body: Region = edge.map((point, i) => seg(point, edge[(i + 1) % edge.length]));
  const eye = disc([21, -63], 1.35);
  c.fill("key", toPath(carve([body, disc(corners[0], 3.7)], [eye]), { k: 1 }), "evenodd");

  const ribbon = (from: V, to: V, radius: number, pick: V, width: number): Region => {
    const { c: centre } = circleThrough(from, to, radius, pick);
    const first = angleOf(centre, from);
    const sweep = (angleOf(centre, to) - first + 3 * Math.PI) % (2 * Math.PI) - Math.PI;

    return thickArc(centre, radius, width, first, first + sweep);
  };
  const shaftGap = thickSeg([21, -70], [21, 3], 10.1);
  const leftCords = [
    thickArc([-32, -36], 23, 3.4, 68 * DEG, 268 * DEG),
    ribbon([-33, -59], [-25, -58], 16, [-29, -43], 3.4),
    thickArc([-17, -27], 15.5, 3.6, 58 * DEG, 227 * DEG),
    ribbon([-28, -38], [17, -59], 58, [1, -4], 3.6),
    ribbon([-25, -14], [-3, -26], 55, [6, 28], 3.4),
  ];
  const rightOval = carve([
    thickSeg([21, -28], [40, -30], 26),
    disc([40, -30], 13),
  ], [
    thickSeg([20, -28], [40, -30], 18),
    disc([40, -30], 9),
  ]);
  const rightCords = [
    ribbon([46, -21], [51, 8], 50, [2, -2], 3.3),
    ribbon([26, -37], [44, -24], 24, [42, -45], 3.4),
  ];
  const tie = [
    thickArc([3, -4], 13, 3.1, 3 * DEG, 215 * DEG),
    thickArc([6, -15], 12.4, 3.3, 21 * DEG, 240 * DEG),
    ribbon([-1, -21], [15, -28], 28, [9, 0], 3.3),
    thickSeg([15, -22], [29, -22], 4.3),
  ];
  c.fill("key", toPath(carve(leftCords, [shaftGap]), { k: 1 }), "evenodd");
  c.fill("key", toPath(carve(rightCords, [shaftGap]), { k: 1 }), "evenodd");
  c.fill("key", toPath(rightOval, { k: 1 }), "evenodd");
  c.fill("key", toPath(carve(tie, [thickSeg([19, -64], [23, -28], 8.9)]), { k: 1 }), "evenodd");

  c.fill("key", toPath([thickSeg([15, -57], [20, -62], 2.8)], { k: 1 }));
  const brushLeft: V = [-8.5, 20];
  const brushRight: V = [8.5, 20];
  const brush: Region = [
    seg([-3.6, 3], brushLeft),
    shortArc(circleThrough(brushLeft, brushRight, 9.2, [0, 11]), brushLeft, brushRight),
    seg(brushRight, [3.6, 3]),
    seg([3.6, 3], [-3.6, 3]),
  ];
  const shades = [-5, -2, 2, 5].map((x) => thickSeg([x * 1.1, 26], [x * 0.5, 9.5], 1.15));
  const tassel = carve([
    disc([0, 0], 4.7),
    brush,
  ], shades);
  c.fill("key", toPath(tassel, { k: 1, at: [51, 8], turn: -8 }), "evenodd");
  c.fill("key", toPath(tassel, { k: 0.95, at: [-25, -57], turn: 111 }), "evenodd");
};
