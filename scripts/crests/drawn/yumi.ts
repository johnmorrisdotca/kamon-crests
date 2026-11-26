import type { Builder } from "../../construct/builder.ts";
import { seg, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const polygon = (points: V[]): Region => points.map((point, i) => seg(point, points[(i + 1) % points.length]));

export const itsutsuYumiBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  c.guideSpokes(5, 0, R);
  const bow = polygon([[0, 0], [-11, 17], [-17, 43], [-16, 63], [-10, 76], [0, 91],
    [-4, 73], [-9, 61], [-10, 44], [-7, 20]]);
  const upperMark = polygon([[-13.4, 59], [-10.2, 59], [-10.3, 62], [-13.3, 62]]);
  const lowerMark = polygon([[-13.3, 46], [-11, 46], [-11, 49], [-13.5, 49]]);
  const thread = thickSeg([0, 0], [0, 88], 2.2);
  for (const turn of [0, 72, 144, 216, 288]) {
    c.fill("bow", toPath([bow, upperMark, lowerMark], { k: 1, turn }), "evenodd");
    c.fill("bow", toPath([thread], { k: 1, turn }));
  }
};
