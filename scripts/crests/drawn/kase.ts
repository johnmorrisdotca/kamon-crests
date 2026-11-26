import type { Builder } from "../../construct/builder.ts";
import { carve, seg, thickSeg, toPath } from "../../construct/compass.ts";
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
