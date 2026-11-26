// Further knot eyes measured from frames 19 and 20 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { carve, seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { R } from "../../construct/geo.ts";
import { diamond, eye, eyesOnAxes, layout } from "./meyui.ts";

const polygon = (points: V[]): Region => points.map((point, i) => seg(point, points[(i + 1) % points.length]));
const turns = [0, 90, 180, 270];

export const kakeYotsumeBuild = (c: Builder): void => {
  layout(c);
  for (const at of eyesOnAxes(53)) {
    const nested = eye(at, R - 53, 34).join(diamond(at, 17)).join(diamond(at, 8));
    c.fill("knot-eye", nested, "evenodd");
  }
};

export const yotsumeKuzushiBuild = (c: Builder): void => {
  c.precision(3);
  layout(c);
  const upright = polygon([[0, 3], [0, R], [46, 49]]);
  const side = R * Math.SQRT1_2;
  const crosswise = polygon([[3, 0], [side, 0], [side, side - 3]]);
  const uprightOpening = polygon([[-3, 37], [17, 53], [-3, 69]]);
  const crosswiseOpening = polygon([[27, 30], [47, 49], [47, 32]]);
  const blades = [...carve([upright], [uprightOpening]), ...carve([crosswise], [crosswiseOpening])];

  for (const turn of turns) c.fill("knot-eye", toPath(blades, { k: 1, turn }));
};
