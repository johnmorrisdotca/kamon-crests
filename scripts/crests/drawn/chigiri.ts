import type { Builder } from "../../construct/builder.ts";
import { carve, seg, thickSeg, toPath } from "../../construct/compass.ts";
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

/**
 * 角切り千切 (frame 11, left r2c2): three corner-cut rings, one above two, their facing corners nearly meeting. In the book's
 * pixels: each ring's outside 113 across and 100 high, its flat top 39 long and its upright sides 26; its inside 74 across and
 * 66 high, its top 33 and its sides 25. The lower rings stand 81 to either side of the upper one and 73 below it.
 */
const octagon = (cx: number, cy: number, half: number, high: number, top: number, side: number): Region =>
  polygon([[cx - top, cy + high], [cx + top, cy + high], [cx + half, cy + side], [cx + half, cy - side], [cx + top, cy - high], [cx - top, cy - high], [cx - half, cy - side], [cx - half, cy + side]]);

export const kakugiriChigiriBuild = (c: Builder): void => {
  const [across, down] = [81, 73];
  const middle = down / 2;
  const centres: V[] = [[0, middle], [-across, middle - down], [across, middle - down]];
  // The lower rings' outer side corners are the farthest points.
  const placing = { k: R / Math.hypot(across + 56.5, middle + 13) };
  c.guideCircle(C0, R);
  for (const [x, y] of centres) c.fill("weaving-beam", toPath(carve([octagon(x, y, 56.5, 50, 19.5, 13)], [octagon(x, y, 37, 33, 16.5, 12.5)]), placing));
};
