import type { Builder } from "../../construct/builder.ts";
import { seg, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const polygon = (points: V[]): Region => points.map((point, i) => seg(point, points[(i + 1) % points.length]));

const joined = polygon([
    [0, 61], [39, 24], [25, 11], [33, 3], [49, 15],
    [88, -22], [46, -61], [8, -25], [25, -8], [17, -2],
    [0, -18], [-17, -2], [-25, -8], [-8, -25], [-46, -61],
    [-88, -22], [-49, 15], [-33, 3], [-25, 11], [-39, 24],
]);

export const mitsuChigiriBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  c.fill("weaving-beam", toPath([joined], { k: 1 }));
};

export const maruNiChigaiChigiriBuild = (c: Builder): void => {
  c.ring("ring-thin");
  const front = polygon([[25, 78], [83, 13], [31, 7], [13, -9], [-9, -30],
    [-25, -78], [-83, -13], [-31, -7], [-13, 9], [9, 30]]);
  const backPoints: V[] = [[-25, 78], [-83, 13], [-31, 7], [-23, 1], [-2, 22], [-9, 30]];
  const back = polygon(backPoints);
  const otherBack = polygon(backPoints.map(([x, y]) => [-x, -y]));
  c.fill("weaving-beam", toPath([front, back, otherBack], { k: 1 }));
};

export const maruNiMitsuChigiriBuild = (c: Builder): void => {
  c.ring("ring-medium");
  c.fill("weaving-beam", toPath([joined], { k: 0.73 }));
};

export const kakeMitsuChigiriBuild = (c: Builder): void => {
  const diamond = (width: number): Region => polygon([[0, width], [width, 0], [0, -width], [-width, 0]]);
  const frame = [diamond(40), diamond(28)];
  const positions: V[] = [[0, 26], [-49, -22], [49, -22]];
  const links = [-1, 1].flatMap((side) => [
    thickSeg([side * 21.9, 11.6], [side * 34.1, -0.4], 4),
    thickSeg([side * 14.9, 4.4], [side * 27.1, -7.6], 4),
  ]);

  c.guideCircle(C0, R);
  c.fill("weaving-beam", toPath(links, { k: 1 }));
  for (const at of positions) c.fill("weaving-beam", toPath(frame, { k: 1, at }), "evenodd");
};
