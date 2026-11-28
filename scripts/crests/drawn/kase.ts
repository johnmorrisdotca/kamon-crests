import type { Builder } from "../../construct/builder.ts";
import { carve, rotated, seg, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const polygon = (points: V[]): Region => points.map((p, i) => seg(p, points[(i + 1) % points.length]));

const eye = ([x, y]: V, h: number): Region =>
  polygon([[x - h, y - h], [x + h, y - h], [x + h, y + h], [x - h, y + h]]);

export const kaseBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  c.guideSpokes(4, 0, R);
  const upper = thickSeg([0, -84], [0, 84], 76);
  const across = thickSeg([-84, 0], [84, 0], 76);
  const holes: V[] = [[-28, -28], [-28, 28], [28, 28], [28, -28]];
  const drawn = carve([upper, across], holes.map((at) => eye(at, 9.3)));

  c.fill("skein-frame", toPath(drawn, { k: 1 }), "evenodd");
};

/**
 * 角桛 (frame 16, right r1c4): a cross whose four arms end in crossbars, with a square ring set corner-up over it; inside the ring
 * the four corners between the arms are open. In the book's pixels: the ring's corners 113.75 out and its inside's 79.4; the arms
 * 36.8 wide; the crossbars from 114 to 145 out and 152 long (the book's upright ones a little thinner and shorter than its level
 * ones, here the same).
 */
export const kakuKaseBuild = (c: Builder): void => {
  const [ring, inside, arm, barIn, barOut, barHalf] = [113.75, 79.4, 18.4, 114, 145, 76];
  const diamond = (r: number): Region => polygon([[0, r], [r, 0], [0, -r], [-r, 0]]);
  const turns = [0, 90, 180, 270].map((deg) => (deg * Math.PI) / 180);
  const turn = (region: Region, a: number): Region => region.map((p) => rotated(p, a));
  const bar = polygon([[-barHalf, barIn], [-barHalf, barOut], [barHalf, barOut], [barHalf, barIn]]);
  const open = polygon([[arm, arm], [arm, inside - arm], [inside - arm, arm]]);
  const ink = [diamond(ring), thickSeg([0, -barOut], [0, barOut], 2 * arm), thickSeg([-barOut, 0], [barOut, 0], 2 * arm), ...turns.map((a) => turn(bar, a))];
  c.guideCircle(C0, R);
  c.fill("skein-frame", toPath(carve(ink, turns.map((a) => turn(open, a))), { k: R / Math.hypot(barHalf, barOut) }));
};
